<template>
	<div v-on="listeners" class="mvi-view" @touchstart="doPreventStart" @touchmove="doPreventMove">
		<slot></slot>
	</div>
</template>

<script>
	import $util from "../../util/util.js"
	export default {
		name:'m-view',
		data(){
			return {
				startY:0,
				startY2:0
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			}
		},
		methods:{
			//触摸开始
			doPreventStart(event){
				event.stopPropagation()
				this.startY = event.touches[0].pageY;
				this.startY2 = this.startY;
			},
			//触摸滚动
			doPreventMove(event){
				event.stopPropagation()
				var el = this.getScrollEl(event.target);
				if($util.getScrollTop(el) != 0){
					return;
				}
				var endY = event.touches[0].pageY;
				var move = endY - this.startY; //每一次移动的偏移量
				var move2 = endY - this.startY2; //距离第一次触摸时的偏移量
				this.startY = endY;
				//总偏移量小于0为手指向上滑动，元素向下滚动，不禁用
				if (move2 <= 0) {
					this.startY2 = this.startY;
					return;
				}
				if(event.cancelable){
					event.preventDefault();
				}
			},
			//获取触摸元素最近的滚动容器
			getScrollEl(el){
				if(el === this.$el){
					return this.$el;
				}
				if($util.getScrollHeight(el) > el.clientHeight){
					return el;
				}
				return this.getScrollEl(el.parentNode);
			}
		}
	}
</script>

<style lang="less" scoped>
	.mvi-view{
		display: block;
		width: 100%;
		height: 100vh;
	}
</style>
