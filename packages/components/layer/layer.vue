<template>
	<transition :name="(animation?animation:'mvi-layer')" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @leave="leave"
	@before-leave="beforeLeave" @after-leave="afterLeave">
		<div v-if="firstShow" v-show="layerShow" v-on="listeners" :class="'mvi-layer'+(fixed?' mvi-layer-fixed':'')" :style="layerStyle">
			<div :class="wrapperCls" :style="wrapperStyle">
				<m-triangle v-if="showTriangle" ref="triangle" class="mvi-layer-triangle" :placement="trianglePlacement" :background="background" :border-color="(border&&borderColor?borderColor:background)" size="0.14rem"></m-triangle>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: 'm-layer',
		data(){
			return {
				layerShow:false,
				firstShow:false
			}
		},
		model:{
			prop:'show',
			event:'model-change'
		},
		props: {
			//是否显示悬浮层
			show:{
				type:Boolean,
				default:false
			},
			//悬浮层触发元素
			target: {
				type: String,
				default: null
			},
			//悬浮层定位父元素
			root:{
				type:String,
				default:null
			},
			//悬浮层相对于触发元素的位置
			placement: {
				type: String,
				default: 'bottom',
				validator(value) {
					return ['top', 'left', 'right', 'bottom', 'top-start',
						'top-end', 'left-start', 'left-end', 'right-start', 'right-end', 'bottom-start',
						'bottom-end'
					].includes(value)
				}
			},
			//悬浮层主体距离触发元素的距离
			offset:{
				type:String,
				default:'0.2rem'
			},
			//悬浮层的z-index
			zIndex:{
				type:Number,
				default:null
			},
			//悬浮层是否为fixed模式
			fixed:{
				type:Boolean,
				default:false
			},
			//悬浮层的宽度
			width:{
				type:String,
				default:null
			},
			//悬浮层的主体额外样式
			wrapperClass:{
				type:String,
				default:null
			},
			//悬浮层显示与隐藏动画时长
			timeout:{
				type:Number,
				default:200
			},
			//点击触发元素和悬浮层以外的元素是否关闭悬浮层
			closable:{
				type:Boolean,
				default:false
			},
			//是否显示三角
			showTriangle:{
				type:Boolean,
				default:false
			},
			//自定义动画
			animation:{
				type:String,
				default:null
			},
			//是否显示阴影
			shadow:{
				type:Boolean,
				default:true
			},
			//是否显示边框
			border:{
				type:Boolean,
				default:false
			},
			//边框颜色
			borderColor:{
				type:String,
				default:'#eee'
			},
			//背景色
			background:{
				type:String,
				default:'#fff'
			}
		},
		watch:{
			placement(newValue){
				this.reset();
				this.resetTriangle()
			},
			show(newValue){
				if(newValue){
					if(!this.firstShow){
						this.firstShow = true;
					}
				}
				this.layerShow = newValue;
			}
		},
		computed: {
			listeners(){
				return Object.assign({},this.$listeners);
			},
			trianglePlacement(){
				if(this.placement == 'bottom-start' || this.placement == 'bottom' || this.placement == 'bottom-end'){
					return 'top'
				}else if(this.placement == 'top-start' || this.placement == 'top' || this.placement == 'top-end'){
					return 'bottom'
				}else if(this.placement == 'left-start' || this.placement == 'left' || this.placement == 'left-end'){
					return 'right'
				}else if(this.placement == 'right-start' || this.placement == 'right' || this.placement == 'right-end'){
					return 'left'
				}
			},
			wrapperCls(){
				var cls = 'mvi-layer-wrapper';
				if(this.shadow){
					cls += ' mvi-layer-shadow';
				}
				if(this.border){
					cls += ' mvi-layer-border';
				}
				if(this.wrapperClass){
					cls += ' '+this.wrapperClass;
				}
				return cls;
			},
			wrapperStyle(){
				var style = {}
				if(this.border && this.borderColor){
					style.borderColor = this.borderColor;
				}
				if(this.background){
					style.background = this.background;
				}
				return style;
			},
			layerStyle(){
				var style = {};
				if(this.zIndex){
					style.zIndex = this.zIndex;
				}
				if(this.width){
					style.width = this.width;
				}
				if(this.timeout){
					style.transition = 'transform ' + this.timeout + 'ms,opacity ' + this.timeout + 'ms';
					style.webkitTransition = 'transform ' + this.timeout + 'ms,opacity ' + this.timeout + 'ms';
				}
				if(!this.showTriangle){
					if(this.placement == 'bottom-start' || this.placement == 'bottom' || this.placement == 'bottom-end'){
						style.paddingTop = this.offset;
					}else if(this.placement == 'top-start' || this.placement == 'top' || this.placement == 'top-end'){
						style.paddingBottom = this.offset;
					}else if(this.placement == 'left-start' || this.placement == 'left' || this.placement == 'left-end'){
						style.paddingRight = this.offset;
					}else if(this.placement == 'right-start' || this.placement == 'right' || this.placement == 'right-end'){
						style.paddingLeft = this.offset;
					}
				}
				return style;
			}
		},
		mounted() {
			//初始化时是否显示
			if(this.show){
				if(!this.firstShow){
					this.firstShow = true;
				}
				this.layerShow = this.show;
			}
		},
		methods: {
			//点击他处关闭悬浮层
			hideLayer(event){
				if($util.isContains(this.$el,event.target) || $util.isContains(this.getTargetEl(),event.target)){
					return;
				}
				this.$emit('update:show',false);
				this.$emit('model-change',false);
			},
			//悬浮层显示前
			beforeEnter(el){
				this.$emit('show',el)
			},
			//悬浮层显示时
			enter(el){
				this.$nextTick(()=>{
					this.reset();
					this.resetTriangle();
					window.addEventListener('resize',this.reset);
					window.addEventListener('resize',this.resetTriangle);
					if(this.closable){
						window.addEventListener('click',this.hideLayer);
					}
					this.$emit('showing',el)
				})
			},
			//悬浮层显示后
			afterEnter(el){
				this.$emit('shown',el)
			},
			//悬浮层隐藏前
			beforeLeave(el){
				this.$emit('hide',el)
			},
			//悬浮层隐藏时
			leave(el){
				window.removeEventListener('resize',this.reset)
				window.removeEventListener('resize',this.resetTriangle)
				if(this.closable){
					window.removeEventListener('click',this.hideLayer)
				}
				this.$emit('hidding',el)
			},
			//悬浮层隐藏后
			afterLeave(el){
				this.$emit('hidden',el)
			},
			//重置位置
			reset(){
				if(!$util.isElement(this.$el)){
					return;
				}
				if(this.fixed){
					var pt = this.getTargetEl().getBoundingClientRect();//获取绑定元素相对视窗的位置信息
					if(this.placement == 'bottom' || this.placement == 'bottom-start' || this.placement == 'bottom-end'){
						this.$el.style.top = pt.bottom + 'px';
						if(this.placement == 'bottom'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'bottom-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'bottom-end'){
							this.$el.style.left = pt.right - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'top' || this.placement == 'top-start' || this.placement == 'top-end'){
						this.$el.style.bottom = (document.body.clientHeight - pt.top) + 'px';
						if(this.placement == 'top'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'top-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'top-end'){
							this.$el.style.left = pt.right - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'left' || this.placement == 'left-start' || this.placement == 'left-end'){
						this.$el.style.right = (document.body.clientWidth - pt.left) + 'px';
						if(this.placement == 'left'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'left-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'left-end'){
							this.$el.style.top = pt.bottom - this.$el.offsetHeight + 'px';
						}
					}else if(this.placement == 'right' || this.placement == 'right-start' || this.placement == 'right-end'){
						this.$el.style.left = pt.right + 'px';
						if(this.placement == 'right'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'right-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'right-end'){
							this.$el.style.top = pt.bottom - this.$el.offsetHeight + 'px';
						}
					}
				}else{
					var pt = $util.getElementPoint(this.getTargetEl(),this.getRootEl())
					if(this.placement == 'bottom' || this.placement == 'bottom-start' || this.placement == 'bottom-end'){
						this.$el.style.top = (pt.top + this.getTargetEl().offsetHeight) + 'px';
						if(this.placement == 'bottom'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'bottom-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'bottom-end'){
							this.$el.style.left = this.getTargetEl().offsetWidth + pt.left - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'top' || this.placement == 'top-start' || this.placement == 'top-end'){
						this.$el.style.bottom = (this.getRootEl().offsetHeight - pt.top) + 'px';
						if(this.placement == 'top'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'top-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'top-end'){
							this.$el.style.left = this.getTargetEl().offsetWidth + pt.left - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'left' || this.placement == 'left-start' || this.placement == 'left-end'){
						this.$el.style.right = (this.getRootEl().offsetWidth - pt.left) + 'px';
						if(this.placement == 'left'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'left-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'left-end'){
							this.$el.style.top = this.getTargetEl().offsetHeight + pt.top - this.$el.offsetHeight + 'px';
						}
					}else if(this.placement == 'right' || this.placement == 'right-start' || this.placement == 'right-end'){
						this.$el.style.left = (pt.left + this.getTargetEl().offsetWidth) + 'px';
						if(this.placement == 'right'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'right-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'right-end'){
							this.$el.style.top = this.getTargetEl().offsetHeight + pt.top - this.$el.offsetHeight + 'px';
						}
					}
					
				}
				
				//设置offset
				if(this.showTriangle){
					if(this.placement == 'bottom-start' || this.placement == 'bottom' || this.placement == 'bottom-end'){
						this.$el.style.paddingTop = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
					}else if(this.placement == 'top-start' || this.placement == 'top' || this.placement == 'top-end'){
						this.$el.style.paddingBottom = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
					}else if(this.placement == 'left-start' || this.placement == 'left' || this.placement == 'left-end'){
						this.$el.style.paddingRight = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
					}else if(this.placement == 'right-start' || this.placement == 'right' || this.placement == 'right-end'){
						this.$el.style.paddingLeft = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
					}
				}
			},
			//重置三角位置
			resetTriangle(){
				if(!this.showTriangle){
					return;
				}
				if(this.placement == 'bottom-start'){
					this.$refs.triangle.$el.style.top = 'auto';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.bottom = '100%';
					this.$refs.triangle.$el.style.left = (this.getTargetEl().offsetWidth / 2 - this.$refs.triangle.$el.offsetWidth /2)+ 'px';
				}else if(this.placement == 'bottom'){
					this.$refs.triangle.$el.style.top = 'auto';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.bottom = '100%';
					this.$refs.triangle.$el.style.left = (this.$el.offsetWidth/2 - this.$refs.triangle.$el.offsetWidth /2) + 'px';
				}else if(this.placement == 'bottom-end'){
					this.$refs.triangle.$el.style.top = 'auto';
					this.$refs.triangle.$el.style.left = 'auto';
					this.$refs.triangle.$el.style.bottom = '100%';
					this.$refs.triangle.$el.style.right = (this.getTargetEl().offsetWidth / 2 - this.$refs.triangle.$el.offsetWidth /2) + 'px';
				}else if(this.placement == 'top-start'){
					this.$refs.triangle.$el.style.top = '100%';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.bottom = 'auto';
					this.$refs.triangle.$el.style.left = (this.getTargetEl().offsetWidth / 2 - this.$refs.triangle.$el.offsetWidth /2)+ 'px';
				}else if(this.placement == 'top'){
					this.$refs.triangle.$el.style.top = '100%';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.bottom = 'auto';
					this.$refs.triangle.$el.style.left = (this.$el.offsetWidth/2 - this.$refs.triangle.$el.offsetWidth /2) + 'px';
				}else if(this.placement == 'top-end'){
					this.$refs.triangle.$el.style.top = '100%';
					this.$refs.triangle.$el.style.left = 'auto';
					this.$refs.triangle.$el.style.bottom = 'auto';
					this.$refs.triangle.$el.style.right = (this.getTargetEl().offsetWidth / 2 - this.$refs.triangle.$el.offsetWidth /2) + 'px';
				}else if(this.placement == 'left-start'){
					this.$refs.triangle.$el.style.left = '100%';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.top = (this.getTargetEl().offsetHeight / 2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.bottom = 'auto';
				}else if(this.placement == 'left'){
					this.$refs.triangle.$el.style.left = '100%';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.top = (this.$el.offsetHeight/2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.bottom = 'auto';
				}else if(this.placement == 'left-end'){
					this.$refs.triangle.$el.style.left = '100%';
					this.$refs.triangle.$el.style.right = 'auto';
					this.$refs.triangle.$el.style.bottom = (this.getTargetEl().offsetHeight / 2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.top = 'auto';
				}else if(this.placement == 'right-start'){
					this.$refs.triangle.$el.style.right = '100%';
					this.$refs.triangle.$el.style.left = 'auto';
					this.$refs.triangle.$el.style.top = (this.getTargetEl().offsetHeight / 2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.bottom = 'auto';
				}else if(this.placement == 'right'){
					this.$refs.triangle.$el.style.right = '100%';
					this.$refs.triangle.$el.style.left = 'auto';
					this.$refs.triangle.$el.style.top = (this.$el.offsetHeight/2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.bottom = 'auto';
				}else if(this.placement == 'right-end'){
					this.$refs.triangle.$el.style.right = '100%';
					this.$refs.triangle.$el.style.left = 'auto';
					this.$refs.triangle.$el.style.bottom = (this.getTargetEl().offsetHeight / 2 - this.$refs.triangle.$el.offsetHeight /2) + 'px';
					this.$refs.triangle.$el.style.top = 'auto';
				}
			},
			//获取绑定的元素
			getTargetEl(){
				if(this.target){
					return document.body.querySelector(this.target) || document.body;
				}else{
					return document.body;
				}
			},
			//获取根元素
			getRootEl(){
				if(this.fixed){
					return null;
				}
				if(this.root){
					return document.body.querySelector(this.root) || document.body;
				}else{
					return document.body;
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	.mvi-layer{
		position: absolute;
		z-index: 400;
		
		&.mvi-layer-fixed{
			position: fixed;
		}
		
		.mvi-layer-wrapper{
			display: block;
			position: relative;
			width: 100%;
			color: @font-color-default;
			border-radius: @radius-default;	
			
			&.mvi-layer-shadow{
				box-shadow: 0 0.04rem 0.24rem 0 rgba(0,0,0,.1);
				-webkit-box-shadow: 0 0.04rem 0.24rem 0 rgba(0,0,0,.1);
			}
			
			&.mvi-layer-border{
				border: 1px solid #eee;
			}
			
			.mvi-layer-triangle{
				position: absolute;
			}
		}
	}

	.mvi-layer-enter,.mvi-layer-leave-to{
		opacity: 0;
		transform: translateY(.6rem);
	}
</style>
