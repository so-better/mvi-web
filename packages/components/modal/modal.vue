<template>
	<m-overlay ref="overlay" :show="show" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding"
	 :z-index="zIndex" @click.self="hide" :color="overlayColor" :timeout="timeout" :local="local">
		<div class="mvi-modal" :style="modalStyle" v-on="listeners">
			<transition :name="'mvi-modal-'+animation"  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
			@before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
				<!-- 弹出层 -->
				<div v-if="firstShow" v-show="modalShow" class="mvi-modal-wrapper" :style="wrapperStyle">
					<div class="mvi-modal-times" @click="hideModal" v-if="showTimes && (iconType || iconUrl)" :style="'color:'+(timesColor?timesColor:'')">
						<m-icon :type="iconType" :url="iconUrl" :spin="iconSpin" />
					</div>
					<div ref="header" :class="titleCls" 
					v-if="$slots.title || title" :style="headerStyle" >
						<slot name="title" v-if="$slots.title"></slot>
						<span v-html="title" v-else-if="title"></span>
					</div>
					<div ref="content" :class="'mvi-modal-content'+(contentClass?' '+contentClass:'')" v-if="$slots.default || content" :style="'padding:'+(contentPadding?'':'0')">
						<slot v-if="$slots.default"></slot>
						<span v-html="content" v-else-if="content"></span>
					</div>
					<div ref="footer" :class="'mvi-modal-footer'+(footerClass?' '+footerClass:'')" v-if="$slots.footer || footer" :style="'padding:'+(footerPadding?'':'0')">
						<slot name="footer" v-if="$slots.footer"></slot>
						<span class="mvi-modal-footer-text" v-html="footer" v-else-if="footer"></span>
					</div>
				</div>
			</transition>
		</div>
	</m-overlay>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-modal",
		data(){
			return {
				modalShow:false,//模态框是否显示
				firstShow:false,//模态框是否渲染
			}
		},
		model:{
			prop:'show',
			event:'model-change'
		},
		props:{
			title:{//模态框标题
				type:String,
				default:""
			},
			titleClass:{//标题额外样式
				type:String,
				default:null
			},
			content:{//模态框内容
				type:String,
				default:""
			},
			contentClass:{//内容额外样式
				type:String,
				default:null
			},
			footer:{//尾注信息
				type:String,
				default:null
			},
			footerClass:{//尾注额外样式
				type:String,
				default:null
			},
			showTimes:{//是否显示关闭图标
				type:Boolean,
				default:false
			},
			timesIcon:{//自定义关闭按钮
				type:[String,Object],
				default:"times"
			},
			show:{//显示与否
				type:Boolean,
				default:false
			},
			timeout:{
				type:Number,
				default:300
			},
			closable:{//点击背景遮罩是否关闭
				type:Boolean,
				default:false
			},
			overlayColor:{//遮罩层颜色
				type:String,
				default:null
			},
			modalColor:{//模态框背景色
				type:String,
				default:null
			},
			color:{//模态框字体颜色
				type:String,
				default:null
			},
			zIndex:{//遮罩层z-index
				type:Number,
				default:900
			},
			width:{//弹窗显示的宽度
				type:String,
				default:null
			},
			footerPadding:{//尾注内边距
				type:Boolean,
				default:true
			},
			contentPadding:{//主体内边距
				type:Boolean,
				default:true
			},
			headerPadding:{//头部内边距
				type:Boolean,
				default:true
			},
			radius:{//模态框圆角
				type:String,
				default:null
			},
			local:{//是否局部
				type:Boolean,
				default:false
			},
			animation:{
				type:String,
				default:'scale'//'narrow','scale','translate-top','translate-bottom','translate-left','translate-right'
			},
			titleEllipsis:{
				type:Boolean,
				default:false
			},
			timesColor:{
				type:String,
				default:null
			},
			usePadding:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			iconType() {
				var t = null;
				if ($util.isObject(this.timesIcon)) {
					if (typeof(this.timesIcon.type) == "string") {
						t = this.timesIcon.type;
					}
				} else if (typeof(this.timesIcon) == "string") {
					t = this.timesIcon;
				}
				return t;
			},
			iconUrl() {
				var url = null;
				if ($util.isObject(this.timesIcon)) {
					if (typeof(this.timesIcon.url) == "string") {
						url = this.timesIcon.url;
					}
				}
				return url;
			},
			iconSpin() {
				var spin = false;
				if ($util.isObject(this.timesIcon)) {
					if (typeof(this.timesIcon.spin) == "boolean") {
						spin = this.timesIcon.spin;
					}
				}
				return spin;
			},
			modalStyle(){
				var style = {};
				if(this.width){
					style.width = this.width;
				}
				style.zIndex = this.zIndex + 10;
				return style;
			},
			wrapperStyle(){
				var style = {};
				if(this.radius){
					style.borderRadius = this.radius;
				}
				if(this.modalColor){
					style.background = this.modalColor;
				}
				if(this.color){
					style.color = this.color;
				}
				if(this.local){
					style.maxHeight = this.$el.parentNode.offsetHeight * 0.96 + 'px';
				}else{
					style.maxHeight = window.innerHeight * 0.96 + 'px';
				}
				style.transition = 'all '+ this.timeout + 'ms';
				style.webkitTransition = 'all '+this.timeout + 'ms';
				return style;
			},
			titleCls(){
				var cls = 'mvi-modal-title';
				if(this.titleEllipsis){
					cls += ' mvi-modal-title-ellipsis';
				}
				if(this.titleClass){
					cls += ' ' + this.titleClass;
				}
				return cls;
			},
			headerStyle(){
				var style = {};
				//主体存在
				if(this.$slots.default || this.content){
					style.paddingBottom = '0';
				}
				if(!this.headerPadding){
					style.padding = '0';
				}
				return style;
			}
		},
		methods:{
			//遮罩层显示前
			overlayShow(el){
				if(!this.firstShow){
					this.firstShow = true;
				}
				this.modalShow = true;
			},
			//遮罩层隐藏之前
			overlayHide(){
				this.modalShow = false;
			},
			//点击遮罩层关闭
			hide(){
				if(this.closable){
					this.hideModal();
				}
			},
			//点击关闭按钮
			hideModal(){
				this.$emit('update:show',false);
				this.$emit('model-change',false);
			},
			//弹出层显示前
			beforeEnter(el){
				this.$emit('show',el);
			},
			//弹出层显示时
			enter(el){
				this.$emit('showing',el);
			},
			//弹出层显示后
			afterEnter(el){
				this.$emit('shown',el);
			},
			//弹出层隐藏前
			beforeLeave(el){
				this.$emit('hide',el);
			},
			//弹出层隐藏时
			leave(el){
				this.$emit('hidding',el);
			},
			//弹出层隐藏后
			afterLeave(el){
				this.$emit('hidden',el);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-modal{
		display:block;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: 0;
		padding: 0;
		width: 6rem;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		background: transparent;
		font-size: @font-size-default;
		color: @font-color-default;
	}
	.mvi-modal-wrapper{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: column;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
		width: 100%;
		background: @bg-color-default;
		font-size: @font-size-default;
		color: @font-color-default;
		border-radius: @radius-default;
		box-shadow: @boxshadow-basic;
		position: relative;
	}
	
	.mvi-modal-title{
		display: block;
		width: 100%;
		font-weight: bold;
		font-size: @font-size-h6;
		padding: @mp-lg @mp-md;
		
		&.mvi-modal-title-ellipsis{
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	
	.mvi-modal-times{
		position: absolute;
		right: @mp-md;
		top: @mp-md;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		color: @font-color-mute;
		font-size:@font-size-small;
		cursor: pointer;
	}
	
	.mvi-modal-content{
		display: block;
		padding: @mp-lg @mp-md;
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		border-radius: inherit;
		font-size: @font-size-default;
	}
	
	.mvi-modal-footer{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: center;
		border-top: 1px solid @border-color;
		padding: @mp-sm @mp-md;
		text-align: right;
		
		&>.mvi-modal-footer-text{
			opacity: .6;
		}
	}
	
	.mvi-modal-narrow-enter{
		transform: translate3d(0,0,0) scale(1.5);
		opacity: 0;
	}
	
	.mvi-modal-scale-enter,.mvi-modal-scale-leave-to,.mvi-modal-narrow-leave-to{
		transform:translate3d(0,0,0) scale(0.5);
		opacity: 0;
	}
	
	.mvi-modal-translate-bottom-enter,.mvi-modal-translate-bottom-leave-to{
		transform:translateY(1rem);
		opacity: 0;
	}
	
	.mvi-modal-translate-top-enter,.mvi-modal-translate-top-leave-to{
		transform:translateY(-1rem);
	}
	
	.mvi-modal-translate-left-enter,.mvi-modal-translate-left-leave-to{
		transform:translateX(-1rem);
	}
	
	.mvi-modal-translate-right-enter,.mvi-modal-translate-right-leave-to{
		transform:translateX(1rem);
	}
</style>
