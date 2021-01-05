<template>
	<transition name="mvi-overlay-fade" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" 
	@before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" >
		<div v-on="listeners" @click.self="closeOverlay" :class="'mvi-overlay'+(local?' mvi-overlay-local':' mvi-overlay-global')" 
		v-show="overlayShow" :style="overlayStyle">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-overlay",
		data(){
			return {
				overlayShow:false,
				scrollTop:0,//父级元素滚动条距离
				overflow:'',//父级元素overflow
				paddingRight:0,//父级元素右侧内边距
				hasScroll:false,//是否含有滚动条
			}
		},
		model:{
			prop:'show',
			event:'model-change'
		},
		props: {
			zIndex: {//遮罩层z-index
				type: Number,
				default: 800,
			},
			color:{//遮罩层颜色
				type:String,
				default:null
			},
			show: {
				type: Boolean,
				default: false
			},
			fade: {
				type: Boolean,
				default: true
			},
			timeout: {
				type: Number,
				default: 300,
				validator(value){
					return value>=0;
				}
			},
			closable: {
				type: Boolean,
				default: false
			},
			local:{
				type:Boolean,
				default:false
			},
			usePadding:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			show(newValue){
				this.overlayShow = newValue;
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners);
			},
			overlayStyle(){
				var style = {};
				if(this.zIndex){
					style.zIndex = this.zIndex;
				}
				if(this.color){
					style.background = this.color;
				}
				return style;
			}
		},
		mounted() {
			//初始化时是否显示遮罩层
			this.overlayShow = this.show;
			window.addEventListener('resize',this.resize);
		},
		methods: {
			//窗口改变时改变遮罩层宽高
			resize(e){
				if(this.local){
					if(this.$el.offsetParent){
						this.$el.style.width = this.$el.offsetParent.clientWidth + 'px';
						this.$el.style.height = this.$el.offsetParent.clientHeight + 'px';
					}
				}else{
					this.$el.style.width = window.innerWidth + 'px';
					this.$el.style.height = window.innerHeight + 'px';
				}
			},
			//transition钩子函数：组件显示之前
			beforeEnter(el){
				if(this.fade){
					el.style.transition = 'opacity '+this.timeout+'ms';
					el.style.webkitTransition = 'opacity '+this.timeout+'ms';
				}
				this.$emit('show',el);
			},
			//transition钩子函数：组件显示
			enter(el){
				//局部遮罩且父级定位元素存在且元素含滚动条(文档高度大于可视高度)
				if(this.local && this.$el.offsetParent && ($util.getScrollHeight(this.$el.offsetParent) > this.$el.offsetParent.clientHeight)){
					if(this.usePadding){
						//获取滚动条宽度
						var scrollWidth = this.$el.offsetParent.offsetWidth - this.$el.offsetParent.clientWidth - parseFloat($util.getCssStyle(this.$el.offsetParent,'border-right-width'))
						//记录原先右侧内边距的值
						this.paddingRight = parseFloat($util.getCssStyle(this.$el.offsetParent,'padding-right'));
						//设置右侧内边距值
						this.$el.offsetParent.style.setProperty('padding-right',this.paddingRight+scrollWidth+'px','important');
					}
					//记录滚动条距离
					this.scrollTop = $util.getScrollTop(this.$el.offsetParent);
					//记录overflow值
					this.overflow = $util.getCssStyle(this.$el.offsetParent,'overflow');
					//设置overflow为hidden
					this.$el.offsetParent.style.setProperty('overflow','hidden','important');
					//设置遮罩层距离顶部的距离
					this.$el.style.top = this.scrollTop + 'px';
					//记录含有滚动条
					this.hasScroll = true;
				}
				if(this.local){
					if(this.$el.offsetParent){
						this.$el.style.width = this.$el.offsetParent.clientWidth + 'px';
						this.$el.style.height = this.$el.offsetParent.clientHeight + 'px';
					}
				}else{
					this.$el.style.width = window.innerWidth + 'px';
					this.$el.style.height = window.innerHeight + 'px';
				}
				this.$emit('showing',el);
			},
			//组件显示之后
			afterEnter(el){
				this.$emit('shown',el);
			},
			//组件隐藏之前
			beforeLeave(el){
				this.$emit('hide',el);
			},
			//组件隐藏时
			leave(el){
				if(this.local && this.$el.offsetParent && this.hasScroll){
					if(this.usePadding){
						this.$el.offsetParent.style.setProperty('padding-right',this.paddingRight+'px','important');
					}
					this.$el.offsetParent.style.setProperty('overflow',this.overflow,'important');
					this.hasScroll = false;
				}
				this.$emit('hidding',el);
			},
			//组件隐藏之后
			afterLeave(el){
				if(this.fade){
					el.style.transition = '';
					el.style.webkitTransition = '';
				}
				this.$emit('hidden',el);
			},
			//点击遮罩关闭此遮罩
			closeOverlay() {
				if (this.closable) {
					this.$emit('update:show',false);
					this.$emit('model-change',false);
				}
			}
		},
		beforeDestroy() {
			if(this.fade){
				this.$el.style.transition = '';
				this.$el.style.webkitTransition = '';
			}
			window.removeEventListener('resize',this.resize);
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-overlay {
		display: block;
		background-color: @overlay;
		overflow: hidden;
		touch-action: none;
		-ms-touch-action: none;
		top: 0;
		left: 0;
	}
	
	.mvi-overlay-local{
		position: absolute;
	}
	
	.mvi-overlay-global{
		position: fixed;
	}

	.mvi-overlay-fade-enter,
	.mvi-overlay-fade-leave-to {
		opacity: 0;
	}
	
	.mvi-overlay-fade-enter-to,
	.mvi-overlay-fade-leave {
		opacity: 1;
	}
</style>
