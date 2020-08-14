<template>
	<label :class="'mvi-switch'+(checked?' mvi-switch-checked':'')" :style="switchStyle" v-on="listeners"
	 :disabled="disabled">
		<span :class="'mvi-switch-el'+(checked?' mvi-switch-el-checked':'')" :style="elStyle">
			<m-icon v-if="loading" :type="iconType" :spin="iconSpin" :url="iconUrl" :style="loadStyle"/>
		</span>
		<input @change="change" type="checkbox" :checked="checked" :disabled="disabled || loading"/>
	</label>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-switch",
		model: {
			prop: 'checked',
			event: 'model-change'
		},
		props: {
			checked: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: '0.4rem'
			},
			activeColor: { //开关打开时背景色
				type: String,
				default: null
			},
			inactiveColor: { //开关关闭时背景色
				type: String,
				default: null
			},
			icon: {
				type: [String, Object],
				default: 'load-e'
			},
			iconColor: {
				type: String,
				default: null
			},
			iconSize: {
				type: String,
				default: null
			}
		},
		methods: {
			//更改状态
			change(event) {
				var check = event.target.checked;
				this.$emit('update:checked', check);
				this.$emit('model-change', check)
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners)
			},
			iconType() {
				var t = null;
				if ($util.isObject(this.icon)) {
					if (typeof(this.icon.type) == "string") {
						t = this.icon.type;
					}
				} else if (typeof(this.icon) == "string") {
					t = this.icon;
				}
				return t;
			},
			iconUrl() {
				var url = null;
				if ($util.isObject(this.icon)) {
					if (typeof(this.icon.url) == "string") {
						url = this.icon.url;
					}
				}
				return url;
			},
			iconSpin() {
				var spin = true;
				if ($util.isObject(this.icon)) {
					if (typeof(this.icon.spin) == "boolean") {
						spin = this.icon.spin;
					}
				}
				return spin;
			},
			switchStyle() {
				var style = {};
				if (this.inactiveColor && !this.checked) {
					style.backgroundColor = this.inactiveColor;
				}
				if (this.activeColor && this.checked) {
					style.backgroundColor = this.activeColor;
				}
				if (this.size) {
					style.width = `calc(${this.size} * 2)`;
				}
				return style;
			},
			elStyle() {
				var style = {};
				if (this.activeColor) {
					style.color = this.activeColor;
				}
				if (this.size) {
					style.width = this.size;
					style.height = this.size;
					style.fontSize = this.size;
				}
				return style;
			},
			loadStyle() {
				var style = {};
				if (this.iconColor) {
					style.color = this.iconColor;
				}
				if (this.iconSize) {
					style.fontSize = this.iconSize;
				}
				return style;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	.mvi-switch {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		background-color: #fff;
		border-radius: @radius-round;
		border: 1px solid rgba(0, 0, 0, .05);
		transition: background-color 300ms;
		-webkit-transition: background-color 300ms;
		cursor: pointer;
		&>input[type="checkbox"]{
			display: none;
			width: 0;
			height: 0;
			opacity: 0;
		}
		
		&>input[type="checkbox"][disabled]{
			pointer-events: none;
		}
	}

	.mvi-switch[disabled] {
		opacity: .5;
	}

	.mvi-switch.mvi-switch-checked {
		background-color: @info-normal;
	}

	.mvi-switch-el {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		font-size: @font-size-h6;
		color: @info-normal;
		width: .4rem;
		height: .4rem;
		border-radius: @radius-circle;
		box-shadow: @boxshadow-basic;
		background-color: #fff;
		margin: 0;
		padding: 0;
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		-webkit-transform: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		;
	}

	.mvi-switch-el.mvi-switch-el-checked {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
	}
</style>
