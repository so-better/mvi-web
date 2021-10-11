<template>
	<div v-on="listeners" class="mvi-loading-bar" :style="barStyle"></div>
</template>

<script>
	import $dap from "dap-util"
	export default {
		name: "m-loading-bar",
		data() {
			return {
				//透明度变化时间
				opacityTime: 300, 
				//进场时宽度变化时间
				widthEnterTime: 4000, 
				//离开时宽度变化时间
				widthLeaveTime: 2000, 
				//颜色
				color: null,
				//层级
				zIndex: 3000,
				//回调函数
				callback: null,
				//离开计时器
				timer:null,
				//是否已经触发开始
				hasTriggerEnter:false,
				//是否已经触发离开
				hasTriggerLeave:false
			}
		},
		computed: {
			computedColor() {
				if (typeof this.color == 'string' && this.color) {
					return this.color
				} else {
					return null
				}
			},
			computedZIndex() {
				if ($dap.number.isNumber(this.zIndex)) {
					return this.zIndex
				} else {
					return null
				}
			},
			computedCallback() {
				if (typeof this.callback == 'function' && this.callback) {
					return this.callback
				} else {
					return function() {}
				}
			},
			barStyle() {
				let style = {}
				if (this.computedColor) {
					style.background = this.computedColor
				}
				if (this.computedZIndex) {
					style.zIndex = this.computedZIndex
				}
				return style
			},
			listeners() {
				return Object.assign({}, this.$listeners)
			}
		},
		methods: {
			//进入
			enter() {
				if(this.timer){
					clearTimeout(this.timer)
					this.timer = null
				}
				this.removeTransition()
				this.$el.style.width = 0
				//单纯的刷新浏览器重绘
				const width = this.$el.offsetWidth
				this.addTransition('enter')
				this.$el.style.width = window.innerWidth * 0.9 + 'px'
				this.$el.style.opacity = 1
				this.hasTriggerEnter = true
				this.hasTriggerLeave = false
			},
			//离开
			leave() {
				if(!this.hasTriggerEnter || this.hasTriggerLeave){
					return
				}
				this.hasTriggerLeave = true
				this.addTransition('leave')
				this.$el.style.width = window.innerWidth + 'px'
				this.$el.style.opacity = 0
				this.timer = setTimeout(() => {
					//移除元素
					this.$el.remove()
					//触发回调
					this.computedCallback()
					//恢复标识
					this.hasTriggerEnter = false
					this.hasTriggerLeave = false
				}, this.widthLeaveTime + this.opacityTime)
			},
			//添加动画
			addTransition(type) {
				//进入动画
				if (type == 'enter') {
					this.$el.style.transition =
						`opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`
					this.$el.style.webkitTransition =
						`opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`
				} else if (type == 'leave') {
					this.$el.style.transition =
						`opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`
					this.$el.style.webkitTransition =
						`opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`
				}
				//单纯的刷新浏览器
				const width = this.$el.offsetWidth
			},
			//移除动画
			removeTransition() {
				this.$el.style.transition = ''
				this.$el.style.webkitTransition = ''
				//单纯的刷新浏览器
				const width = this.$el.offsetWidth
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	.mvi-loading-bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 0;
		opacity: 0;
		height: 0.04rem;
		background-color: @success-normal;
		z-index: 3000;
	}
</style>
