<template>
	<div class="mvi-tooltip" v-on="listeners">
		<div @click="clickShowTooltip" @mouseenter="hoverShowTooltip" @mouseleave="hoverHideToolTip" class="mvi-tooltip-toggle" ref="toggle">
			<slot></slot>
		</div>
		<transition name="mvi-tooltip">
			<div v-show="show" v-if="firstShow" class="mvi-tooltip-wrapper" :data-placement="placement" :style="wrapperStyle" ref="wrapper">
				<div class="mvi-tooltip-content" ref="content" :style="contentStyle">
					<m-triangle :placement="trianglePlacemnet" :size="size" :background="(color?color:'#333')" :border-color="(borderColor?borderColor:'#333')" :style="triangleStyle"></m-triangle>
					<slot v-if="$slots.title" name="title"></slot>
					<span v-else v-text="title"></span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-tooltip",
		data(){
			return {
				size:'0.14rem',
				show:false,
				firstShow:false,
				offset:'',
			}
		},
		props:{
			title:{
				type:String,
				default:""
			},
			placement:{
				type:String,
				default:"bottom",
				validator(value){
					return ['bottom','bottom-start','bottom-end',
							'top','top-start','top-end',
							'left','right'].indexOf(value)>-1;
				}
			},
			disabled:{
				type:Boolean,
				default:false
			},
			timeout:{
				type:Number,
				default:400
			},
			borderColor:{
				type:String,
				default:null
			},
			color:{
				type:String,
				default:null
			},
			textColor:{
				type:String,
				default:null
			},
			trigger:{
				type:String,
				default:'click',
				validator(value){
					return ['hover','click','custom'].includes(value)
				}
			}
		},
		computed:{
			trianglePlacemnet(){
				if(this.placement == "bottom" || this.placement == "bottom-start" || this.placement == "bottom-end"){
					return "top";
				}else if(this.placement == "top" || this.placement == "top-start" || this.placement == "top-end"){
					return "bottom";
				}else if(this.placement == "left"){
					return "right";
				}else if(this.placement == "right"){
					return "left";
				}
			},
			listeners(){
				return Object.assign({},this.$listeners);
			},
			wrapperStyle(){
				var style = {};
				style.transition = 'opacity '+this.timeout+'ms';
				style.webkitTransition = 'opacity '+this.timeout+'ms';
				return style;
			},
			contentStyle(){
				var style = {};
				if(this.color){
					style.backgroundColor = this.color;
				}
				if(this.textColor){
					style.color = this.textColor;
				}
				if(this.borderColor){
					style.borderColor = this.borderColor;
				}
				return style;
			},
			triangleStyle(){
				var style = {};
				if(this.placement == 'bottom'){
					style.left = `calc(50% - ${this.size})`;
					style.bottom = '100%';
					style.right = 'auto';
					style.top = 'auto';
				}else if(this.placement == 'top'){
					style.left = `calc(50% - ${this.size})`;
					style.top = '100%';
					style.right = 'auto';
					style.bottom = 'auto';
				}else if(this.placement == 'left'){
					style.top = `calc(50% - ${this.size})`;
					style.left = '100%';
					style.right = 'auto';
					style.bottom = 'auto';
				}else if(this.placement == 'right'){
					style.top = `calc(50% - ${this.size})`;
					style.right = '100%';
					style.left = 'auto';
					style.bottom = 'auto';
				}else if(this.placement == 'bottom-start' || this.placement == 'bottom-end'){
					style.left = this.offset;
					style.bottom = '100%';
					style.right = 'auto';
					style.top = 'auto';
				}else if(this.placement == 'top-start' || this.placement == 'top-end'){
					style.left = this.offset;
					style.top = '100%';
					style.right = 'auto';
					style.bottom = 'auto';
				}
				return style;
			}
		},
		mounted() {
			document.documentElement.addEventListener('click',this.hideListener);
		},
		watch:{
			placement(newValue){
				if(this.firstShow && this.show){
					this.setOffset();
				}
			}
		},
		methods:{
			setOffset(){
				//设置三角形箭头的偏移
				if(this.placement == "bottom-start" || this.placement == "top-start"){
					this.offset = `calc(${this.$refs.toggle.offsetWidth/2}px - ${this.size}/2)`;
				}else if(this.placement == "bottom-end" || this.placement == "top-end"){
					this.offset = `calc(${this.$refs.content.offsetWidth-this.$refs.toggle.offsetWidth/2}px - ${this.size}/2)`;
				}
			},
			//鼠标进入显示
			hoverShowTooltip(){
				if(this.trigger == 'hover'){
					this.showTooltip();
				}
			},
			//鼠标移出隐藏
			hoverHideToolTip(){
				if(this.trigger == 'hover'){
					this.hideTooltip();
				}
			},
			//点击显示工具提示
			clickShowTooltip(){
				if(this.trigger === 'click'){
					if(this.show){
						this.hideTooltip();
					}else{
						this.showTooltip();
					}
				}
			},
			//显示
			showTooltip(){
				if(this.disabled){
					return;
				}
				this.show = true;
				if(!this.firstShow){
					this.firstShow = true;
				}
				this.$nextTick(()=>{
					this.setOffset();
				})
			},
			//隐藏
			hideTooltip(){
				if(this.disabled){
					return;
				}
				this.show = false;
			},
			//点击屏幕隐藏
			hideListener(e){
				if(e.target == this.$el || $util.isContains(this.$el,e.target)){
					return;
				}
				this.hideTooltip();
			}
		},
		beforeDestroy() {
			document.documentElement.removeEventListener('click',this.hideListener);
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-tooltip{
		display: inline-block;
		position: relative;
	}
	
	.mvi-tooltip-toggle{
		position: relative;
		display: inline-block;
	}
	
	.mvi-tooltip-wrapper{
		position: absolute;
		z-index: 20;
		display: block;
	}
	
	.mvi-tooltip-content{
		position: relative;
		display: block;
		background-color: #333;
		padding: @mp-sm;
		color: #fff;
		border-radius: @radius-default;
		font-size: @font-size-small;
		border: 1px solid @font-color-default;
		margin: 0;
		white-space: nowrap;
		line-height: 1;
		
		&>.mvi-triangle{
			position: absolute;
		}
	}
	
	.mvi-tooltip-wrapper[data-placement="bottom"]{
		padding-top: @mp-sm;
		top:100%;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}
	
	.mvi-tooltip-wrapper[data-placement="bottom-start"]{
		padding-top: @mp-sm;
		top: 100%;
		left: 0;
	}
	
	.mvi-tooltip-wrapper[data-placement="bottom-end"]{
		padding-top: @mp-sm;
		top: 100%;
		right: 0;
	}
	
	.mvi-tooltip-wrapper[data-placement="top"]{
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		padding-bottom: @mp-sm;
	}
	
	.mvi-tooltip-wrapper[data-placement="top-start"]{
		bottom: 100%;
		left: 0;
		padding-bottom: @mp-sm;
	}
	
	.mvi-tooltip-wrapper[data-placement="top-end"]{
		bottom: 100%;
		right: 0;
		padding-bottom: @mp-sm;
	}
	
	.mvi-tooltip-wrapper[data-placement="left"]{
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		padding-right: @mp-sm;
	}
	
	.mvi-tooltip-wrapper[data-placement="right"]{
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		padding-left: @mp-sm;
	}
	
	.mvi-tooltip-enter,.mvi-tooltip-leave-to{
		opacity: 0;
	}
</style>
