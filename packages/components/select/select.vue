<template>
	<div :data-id="'mvi-select-' + _uid" v-on="listeners" :class="selectClass" :disabled="disabled">
		<div :data-id="'mvi-select-target-' + _uid" :class="targetClass" :style="targetStyle" ref="target" @click="trigger" :disabled="disabled">
			<span :class="'mvi-select-label' + (selectLabel ? '' : ' mvi-select-label-placeholder')" :data-placeholder="placeholder" v-html="selectLabel"></span>
			<!-- 下拉图标 -->
			<m-icon :class="iconClass" :type="icon" />
		</div>
		<m-layer
			v-model="focus"
			:target="`[data-id='mvi-select-target-${_uid}']`"
			:root="`[data-id='mvi-select-${_uid}']`"
			:placement="placement"
			:offset="offset"
			:fixed="fixed"
			:fixed-auto="fixedAuto"
			:z-index="zIndex"
			closable
			:show-triangle="false"
			:wrapper-class="wrapperClass"
			:animation="animation"
			:timeout="timeout"
			shadow
			:border="false"
			@show="layerShow"
			ref="layer"
		>
			<div class="mvi-select-menu" ref="menu" :style="menuStyle">
				<div
					:class="'mvi-option mvi-option-' + size"
					@click="optionClick(item)"
					@mouseenter="mouseEnter($event, item)"
					@mouseleave="mouseLeave($event, item)"
					v-for="(item, index) in options"
					:key="'mvi-select-option-' + index"
				>
					<div class="mvi-option-value" v-html="item.label"></div>
					<m-icon v-if="isSelect(item)" :type="selectedIconType" :spin="selectedIconSpin" :size="selectedIconSize" :url="selectedIconUrl" />
				</div>
			</div>
		</m-layer>
		<input type="hidden" :value="value" :name="name" />
	</div>
</template>

<script>
import $util from '../../util/util';
export default {
	name: 'm-select',
	model: {
		prop: 'value',
		event: 'model-change'
	},
	data() {
		return {
			focus: false, //是否点击达到了获取焦点效果
			target: null
		};
	},
	props: {
		//选项
		options: {
			type: Array,
			default: []
		},
		//选择的值
		value: {
			type: [String, Number, Array],
			default: null
		},
		//占位符
		placeholder: {
			type: String,
			default: ''
		},
		//尺寸
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large'].includes(value);
			}
		},
		//layer位置
		placement: {
			type: String,
			default: 'bottom-start'
		},
		//layer的fixed
		fixed: {
			type: Boolean,
			default: false
		},
		//layer适配transform父容器
		fixedAuto:{
			type:Boolean,
			default:false
		},
		//layer的width
		width: {
			type: String,
			default: null
		},
		//layer的z-index
		zIndex: {
			type: Number,
			default: 400
		},
		//layer的offset
		offset: {
			type: String,
			default: '0.1rem'
		},
		//layer最大高度
		height: {
			type: String,
			default: null
		},
		//layer的额外样式
		wrapperClass: {
			type: String,
			default: null
		},
		//layer显示与隐藏动画
		animation: {
			type: String,
			default: null
		},
		//layer动画时长
		timeout: {
			type: Number,
			default: 300
		},
		//输入框激活样式
		activeType: {
			type: String,
			default: 'info',
			validator(value) {
				return ['info', 'success', 'warn', 'primary', 'error'].includes(value);
			}
		},
		//输入框激活颜色
		activeColor: {
			type: String,
			default: null
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//下拉图标
		icon: {
			type: String,
			default: 'caret-down'
		},
		//原生name属性
		name: {
			type: String,
			default: null
		},
		//layer层列表悬浮样式
		hoverClass: {
			type: String,
			default: null
		},
		//是否圆角
		round: {
			type: Boolean,
			default: false
		},
		//是否方形
		square: {
			type: Boolean,
			default: false
		},
		//是否多选
		multiple: {
			type: Boolean,
			default: false
		},
		//选择时显示内容的过滤方法
		filterMethod: {
			type: Function,
			default: null
		},
		//是否显示已选择的icon
		showSelectIcon: {
			type: Boolean,
			default: true
		},
		//已选择标志icon
		selectedIcon: {
			type: [String, Object],
			default: 'success'
		}
	},
	computed: {
		listeners() {
			return Object.assign({}, this.$listeners);
		},
		menuStyle() {
			var style = {};
			if (this.height) {
				style.maxHeight = this.height;
			}
			return style;
		},
		selectClass() {
			var cls = 'mvi-select mvi-select-' + this.size;
			if (this.round) {
				cls += ' mvi-select-round';
			} else if (this.square) {
				cls += ' mvi-select-square';
			}
			return cls;
		},
		targetClass() {
			var cls = 'mvi-select-target';
			if (this.activeType && !this.activeColor && this.focus) {
				cls += ' mvi-select-' + this.activeType;
			}
			return cls;
		},
		targetStyle() {
			var style = {};
			if (this.activeColor && this.focus) {
				style.borderColor = this.activeColor;
			}
			return style;
		},
		iconClass() {
			var cls = 'mvi-select-icon';
			if (this.focus) {
				cls += ' mvi-select-active';
			}
			return cls;
		},
		selectLabel() {
			if (this.multiple) {
				var labels = [];
				this.options.forEach((item, index) => {
					if (this.value.includes(item.value)) {
						labels.push(item.label);
					}
				});
				if (typeof this.filterMethod == 'function') {
					return this.filterMethod(labels);
				} else {
					return labels.join(' ');
				}
			} else {
				var label = '';
				this.options.forEach((item, index) => {
					if (item.value == this.value) {
						label = item.label;
					}
				});
				if (typeof this.filterMethod == 'function') {
					return this.filterMethod(label);
				} else {
					return label;
				}
			}
		},
		isSelect() {
			return item => {
				if (this.multiple && this.showSelectIcon && this.value.includes(item.value)) {
					return true;
				} else {
					return false;
				}
			};
		},
		selectedIconType() {
			var type = null;
			if ($util.isObject(this.selectedIcon)) {
				if (typeof this.selectedIcon.type == 'string') {
					type = this.selectedIcon.type;
				}
			} else if (typeof this.selectedIcon == 'string') {
				type = this.selectedIcon;
			}
			return type;
		},
		selectedIconSize() {
			var size = null;
			if ($util.isObject(this.selectedIcon)) {
				if (typeof this.selectedIcon.size == 'string') {
					size = this.selectedIcon.size;
				}
			}
			return size;
		},
		selectedIconUrl() {
			var url = null;
			if ($util.isObject(this.selectedIcon)) {
				if (typeof this.selectedIcon.url == 'string') {
					url = this.selectedIcon.url;
				}
			}
			return url;
		},
		selectedIconSpin() {
			var spin = false;
			if ($util.isObject(this.selectedIcon)) {
				if (typeof this.selectedIcon.spin == 'boolean') {
					spin = this.selectedIcon.spin;
				}
			}
			return spin;
		}
	},
	methods: {
		//layer显示前进行宽度设置
		layerShow() {
			if (this.width) {
				this.$refs.menu.style.width = this.width;
			} else {
				this.$refs.menu.style.width = this.$refs.target.offsetWidth + 'px';
			}
		},
		//鼠标移入选项
		mouseEnter(e, item) {
			if (this.hoverClass) {
				$util.addClass(e.currentTarget, this.hoverClass);
			}
		},
		//鼠标移出选项
		mouseLeave(e, item) {
			if (this.hoverClass) {
				$util.removeClass(e.currentTarget, this.hoverClass);
			}
		},
		//点击选项
		optionClick(item) {
			if (this.multiple) {
				var arr = this.value;
				if (arr.includes(item.value)) {
					arr.splice(this.getIndexOfArray(arr, item.value), 1);
				} else {
					arr.push(item.value);
				}
				this.$emit('model-change', arr);
				this.$emit('update:value', arr);
			} else {
				this.$emit('model-change', item.value);
				this.$emit('update:value', item.value);
			}
			this.trigger();
		},
		trigger() {
			if (this.disabled) {
				return;
			}
			this.focus = !this.focus;
		},
		getIndexOfArray(arr, value) {
			var index = 0;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == value) {
					index = i;
					break;
				}
			}
			return index;
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-select {
	display: block;
	width: 100%;
	position: relative;
	font-family: @font-family;
	color: @font-color-default;
	border-radius: @radius-default;
	background-color: #fff;

	//大小
	&.mvi-select-small {
		.mvi-select-target {
			height: @small-height;
			font-size: @font-size-small;
			padding: 0 @mp-sm*3 0 @mp-sm;
		}

		.mvi-select-icon {
			right: @mp-sm;
			font-size: @font-size-small;
		}
	}

	&.mvi-select-medium {
		.mvi-select-target {
			height: @medium-height;
			font-size: @font-size-default;
			padding: 0 @mp-md*3 0 @mp-md;
		}

		.mvi-select-icon {
			right: @mp-md;
			font-size: @font-size-default;
		}
	}

	&.mvi-select-large {
		.mvi-select-target {
			height: @large-height;
			font-size: @font-size-h6;
			padding: 0 @mp-lg*3 0 @mp-lg;
		}

		.mvi-select-icon {
			right: @mp-lg;
			font-size: @font-size-h6;
		}
	}

	&.mvi-select-round {
		border-radius: @radius-round;
	}

	.mvi-select-square {
		border-radius: 0;
	}

	&[disabled] {
		opacity: 0.6;
	}
}

.mvi-select-target {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	width: 100%;
	background-color: inherit;
	border: 1px solid @border-color;
	border-radius: inherit;
	transition: border-color 600ms;
	-webkit-transition: border-color 600ms;
	-ms-transition: border-color 600ms;
	-moz-transition: border-color 600ms;
	cursor: pointer;
	color: inherit;

	//输入框样式
	&.mvi-select-info {
		border-color: @info-normal;
	}
	&.mvi-select-success {
		border-color: @success-normal;
	}
	&.mvi-select-primary {
		border-color: @primary-normal;
	}
	&.mvi-select-warn {
		border-color: @warn-normal;
	}
	&.mvi-select-error {
		border-color: @error-normal;
	}

	&[disabled] {
		background-color: inherit;
		color: inherit;
	}
}

.mvi-select-label {
	position: relative;
	vertical-align: middle;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	//placeholder样式
	&.mvi-select-label-placeholder::before {
		position: relative;
		content: attr(data-placeholder);
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		opacity: 0.5;
		vertical-align: middle;
	}
}

.mvi-select-icon {
	position: absolute;
	top: auto;
	color: inherit;
	opacity: 0.6;
	transition: transform 200ms;
	-ms-transition: transform 200ms;
	-webkit-transition: transform 200ms;
	-moz-transition: transform 200ms;

	&.mvi-select-active {
		transform: rotate(180deg);
	}
}

.mvi-select-menu {
	display: block;
	padding: 0;
	overflow: auto;
	overflow-x: hidden;
	padding: @mp-xs 0;
}

.mvi-option {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;

	&.mvi-option-small {
		padding: @mp-xs @mp-sm;
		font-size: @font-size-small;
	}

	&.mvi-option-medium {
		padding: @mp-sm @mp-md;
		font-size: @font-size-default;
	}

	&.mvi-option-large {
		font-size: @font-size-h6;
		padding: @mp-md @mp-lg;
	}
}

.mvi-option:hover {
	cursor: pointer;
	background-color: @bg-color-default;
}

.mvi-option-value {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
