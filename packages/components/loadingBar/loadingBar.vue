<template>
	<transition name="mvi-progress" @after-leave="afterLeave">
		<div v-on="listeners" v-show="show" class="mvi-loading-bar" :style="barStyle"></div>
	</transition>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-loading-bar",
		data(){
			return {
				show:false,
				color:null,
				zIndex:3000
			}
		},
		computed:{
			computedColor(){
				if(typeof(this.color) == 'string' && this.color){
					return this.color;
				}else{
					return null;
				}
			},
			computedZIndex(){
				if($util.isNumber(this.zIndex)){
					return this.zIndex;
				}else{
					return null;
				}
			},
			barStyle(){
				let style = {};
				if(this.computedColor){
					style.background = this.computedColor;
				}
				if(this.computedZIndex){
					style.zIndex = this.computedZIndex;
				}
				return style;
			},
			listeners(){
				return Object.assign({},this.$listeners);
			}
		},
		methods:{
			afterLeave(el){
				this.$el.remove();
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-loading-bar{
		position: fixed;
		left: 0;
		top: 0;
		width: 70%;
		height: 0.04rem;
		background-color:@success-normal;
		z-index: 3000;
	}
	
	.mvi-progress-enter-active{
		transition: opacity 300ms, width 4000ms ease-out;
		-ms-transition: opacity 300ms,width 4000ms ease-out;
		-moz-transition: opacity 300ms,width 4000ms ease-out;
		-webkit-transition: opacity 300ms,width 4000ms ease-out;
	}
	
	.mvi-progress-enter{
		width: 0;
		opacity: 0;
	}
	
	.mvi-progress-leave-active{
		transition: opacity 300ms 2000ms, width 2000ms ease;
		-ms-transition: opacity 300ms 2000ms,width 2000ms ease;
		-moz-transition: opacity 300ms 2000ms,width 2000ms ease;
		-webkit-transition: opacity 300ms 2000ms,width 2000ms ease;
	}
	.mvi-progress-leave-to{
		opacity: 0;
		width: 100%;
	}
</style>
