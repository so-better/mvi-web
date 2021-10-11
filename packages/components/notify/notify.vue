<template>
	<transition name="mvi-notify" @after-leave="afterLeave">
		<div v-show="show" :class="['mvi-notify','mvi-notify-'+computedType]" :style="notifyStyle" v-on="listeners">
			<div class="mvi-notify-content">
				<m-icon v-if="iconType || iconUrl" :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize"
					:color="iconColor" />
				<span v-text="computedMessage"></span>
			</div>
		</div>
	</transition>
</template>

<script>
	import $dap from "dap-util"
	import mIcon from "../icon/icon"
	export default {
		name: "m-notify",
		data() {
			return {
				//计数
				amounts: 0, 
				//计时器实例数组
				timers: [], 
				//是否显示
				show: false, 
				//提示类型
				type: null,
				//展示文案
				message: null, 
				//字体颜色
				color: null, 
				//背景色
				background: null, 
				//z-index
				zIndex: null, 
				//自动关闭时长
				timeout: null, 
				//回调函数
				callback: null, 
				//图标
				icon: null
			}
		},
		computed: {
			//类型
			computedType() {
				let arry = ['success', 'info', 'primary', 'error', 'warn']
				if (arry.includes(this.type)) {
					return this.type
				} else {
					return 'success'
				}
			},
			//消息文本
			computedMessage() {
				if (typeof this.message == "string") {
					return this.message
				} else if ($dap.common.isObject(this.message)) {
					return JSON.stringify(this.message)
				} else {
					return String(this.message)
				}
			},
			//自定义文字颜色
			computedColor() {
				if (typeof this.color == "string") {
					return this.color
				} else {
					return null
				}
			},
			//自定义背景色
			computedBackground() {
				if (typeof this.background == "string") {
					return this.background
				} else {
					return null
				}
			},
			//自定义zIndex
			computedZIndex() {
				if ($dap.number.isNumber(this.zIndex)) {
					return this.zIndex
				} else {
					return 1100
				}
			},
			//自动关闭时间
			computedTimeout() {
				if ($dap.number.isNumber(this.timeout) && this.timeout > 0) {
					return this.timeout
				} else {
					return 1500
				}
			},
			//回调函数
			computedCallback() {
				if (typeof this.callback == "function") {
					return this.callback
				} else {
					return function() {}
				}
			},
			//图标类型
			iconType() {
				let type = null
				if ($dap.common.isObject(this.icon)) {
					if (typeof this.icon.type == "string") {
						type = this.icon.type
					}
				} else if (typeof this.icon == "string") {
					type = this.icon
				}
				return type
			},
			//图标url
			iconUrl() {
				let url = null
				if ($dap.common.isObject(this.icon)) {
					if (typeof this.icon.url == "string") {
						url = this.icon.url
					}
				}
				return url
			},
			//图标是否旋转
			iconSpin() {
				let spin = false
				if ($dap.common.isObject(this.icon)) {
					if (typeof this.icon.spin == "boolean") {
						spin = this.icon.spin
					}
				}
				return spin
			},
			//图标大小
			iconSize() {
				let size = null
				if ($dap.common.isObject(this.icon)) {
					if (typeof this.icon.size == "string") {
						size = this.icon.size
					}
				}
				return size
			},
			//图标颜色
			iconColor() {
				let color = null
				if ($dap.common.isObject(this.icon)) {
					if (typeof this.icon.color == "string") {
						color = this.icon.color
					}
				}
				return color
			},
			//通知样式
			notifyStyle() {
				let style = {}
				style.zIndex = this.computedZIndex
				if (this.computedBackground) {
					style.backgroundColor = this.computedBackground
				}
				if (this.computedColor) {
					style.color = this.computedColor
				}
				return style
			},
			listeners() {
				return Object.assign({}, this.$listeners)
			}
		},
		components: {
			mIcon
		},
		watch: {
			amounts(newValue) {
				if (this.computedTimeout > 0) {
					let timer = setTimeout(() => {
						this.show = false
					}, this.computedTimeout)
					this.timers.push(timer)
				}
			}
		},
		methods: {
			//完全隐藏后
			afterLeave(el) {
				this.$el.remove()
				this.clearTimer()
				this.computedCallback()
				this.amounts = 0
			},
			//清除所有的计时器
			clearTimer() {
				this.timers.forEach(item => {
					clearTimeout(item)
				})
				this.timers = []
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	.mvi-notify {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: @small-height;
		position: fixed;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0 @mp-sm;
	}

	.mvi-notify-success {
		background-color: @success-normal;
		color: #fff;
	}

	.mvi-notify-info {
		background-color: @info-normal;
		color: #fff;
	}

	.mvi-notify-primary {
		background-color: @primary-normal;
		color: #fff;
	}

	.mvi-notify-error {
		background-color: @error-normal;
		color: #fff;
	}

	.mvi-notify-warn {
		background-color: @warn-normal;
		color: #fff;
	}

	.mvi-notify-content {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;

		&>.mvi-icon {
			margin-right: @mp-sm;
		}

		&>span {
			vertical-align: middle;
		}
	}

	.mvi-notify-enter-active,
	.mvi-notify-leave-active {
		transition: all 300ms;
		-webkit-transition: all 300ms;
		-moz-transition: all 300ms;
		-ms-transition: all 300ms;
	}

	.mvi-notify-enter,
	.mvi-notify-leave-to {
		opacity: 0;
		transform: translateY(-100%);
		-webkit-transform: translateY(-100%);
		-moz-transform: translateY(-100%);
		-ms-transform: translateY(-100%);
	}
</style>
