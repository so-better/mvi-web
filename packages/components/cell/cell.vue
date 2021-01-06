<template>
	<div v-on="listeners" :class="cellClass">
		<div class="mvi-cell-item">
			<m-icon :class="'mvi-cell-icon'+(iconClass?' '+iconClass:'')" v-if="iconType||iconUrl" :type="iconType" :url="iconUrl"
			 :spin="iconSpin"  :size="iconSize"/>
			<div :class="'mvi-cell-title'+(noWrap?' mvi-cell-nowrap':'')">
				<slot name="title" v-if="$slots.title"></slot>
				<span v-else v-text="title" :class="(titleClass?' '+titleClass:'')"></span>
			</div>
			<div :class="'mvi-cell-content'+(noWrap?' mvi-cell-nowrap':'')" v-if="$slots.content || content">
				<slot name="content" v-if="$slots.content"></slot>
				<span v-else-if="content" v-text="content" :class="(contentClass?' '+contentClass:'')"></span>
			</div>
			<m-icon :class="'mvi-cell-arrow'+(arrowClass?' '+arrowClass:'')"
			 v-if="arrowType||arrowUrl" :type="arrowType" :url="arrowUrl" :spin="arrowSpin" :size="arrowSize" />
		</div>
		<div :class="'mvi-cell-label'+(labelClass?' '+labelClass:'')" v-if="label || $slots.label" :style="labelTextStyle">
			<slot name="label" v-if="$slots.label"></slot>
			<span v-text="label" v-else-if="label"></span>
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-cell",
		props: {
			icon: {
				type: [String, Object],
				default: null
			},
			title: {
				type: String,
				default: null
			},
			content: {
				type: String,
				default: null
			},
			label: {
				type: String,
				default: null
			},
			border: {
				type: Boolean,
				default: null
			},
			arrow: {
				type: [String, Object],
				default: null
			},
			titleClass: {
				type: String,
				default: null
			},
			contentClass: {
				type: String,
				default: null
			},
			iconClass: {
				type: String,
				default: null
			},
			arrowClass: {
				type: String,
				default: null
			},
			labelClass: {
				type: String,
				default: null
			},
			active: {
				type: Boolean,
				default: null
			},
			ellipsis: {
				type: [Boolean, Number],
				default: null
			},
			noWrap:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners);
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
				var spin = false;
				if ($util.isObject(this.icon)) {
					if (typeof(this.icon.spin) == "boolean") {
						spin = this.icon.spin;
					}
				}
				return spin;
			},
			iconSize() {
				var size = null;
				if ($util.isObject(this.icon)) {
					if (typeof(this.icon.size) == "string") {
						size = this.icon.size;
					}
				}
				return size;
			},
			arrowType() {
				var t = null;
				if ($util.isObject(this.arrow)) {
					if (typeof(this.arrow.type) == "string") {
						t = this.arrow.type;
					}
				} else if (typeof(this.arrow) == "string") {
					t = this.arrow;
				}
				return t;
			},
			arrowUrl() {
				var url = null;
				if ($util.isObject(this.arrow)) {
					if (typeof(this.arrow.url) == "string") {
						url = this.arrow.url;
					}
				}
				return url;
			},
			arrowSpin() {
				var spin = false;
				if ($util.isObject(this.arrow)) {
					if (typeof(this.arrow.spin) == "boolean") {
						spin = this.arrow.spin;
					}
				}
				return spin;
			},
			arrowSize() {
				var size = null;
				if ($util.isObject(this.arrow)) {
					if (typeof(this.arrow.size) == "string") {
						size = this.arrow.size;
					}
				}
				return size;
			},
			computedActive() {
				if (typeof(this.active) == "boolean") {
					return this.active;
				} else if (typeof(this.$parent.active) == "boolean") {
					return this.$parent.active;
				} else {
					return true;
				}
			},
			computedBorder() {
				if (typeof(this.border) == "boolean") {
					return this.border;
				} else if (typeof(this.$parent.border) == "boolean") {
					return this.$parent.border;
				} else {
					return false;
				}
			},
			labelTextStyle() {
				var style = {};
				if (this.ellipsis) { //如果ellipsis不是false
					style.display = '-webkit-box';
					style.textOverflow = 'ellipsis';
					style.webkitBoxOrient = 'vertical';
					style.overflow = 'hidden';
					if (typeof(this.ellipsis) == "boolean") { //true
						style.webkitLineClamp = 3;
					} else {
						style.webkitLineClamp = this.ellipsis;

					}
				}
				return style;
			},
			cellClass(){
				var cls = 'mvi-cell';
				if(this.computedBorder){
					cls += ' mvi-cell-border';
				}
				if(this.computedActive){
					cls += ' mvi-cell-active';
				}
				return cls;
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-cell {
		display: block;
		width: 100%;
		background-color: #fff;
		color: @font-color-default;
		padding: @mp-sm;
		position: relative;
	}
	
	.mvi-cell-active:active::before{
		.mvi-active();
	}
	
	.mvi-cell.mvi-cell-border::after {
		position: absolute;
		content: "";
		height: 1px;
		background-color:@border-color;
		width: calc(100% - @mp-sm);
		left: @mp-sm;
		bottom: 0;
		box-sizing: content-box;
	}

	.mvi-cell-item {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		padding: 0;
		position: relative;
		overflow: hidden;
	}
	
	.mvi-cell-icon {
		margin-right: @mp-xs;
		line-height: 1.5;
	}

	.mvi-cell-title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		font-size: @font-size-default;
		word-wrap:break-word;
	}

	.mvi-cell-content {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		width: 100%;
		text-align: right;
		vertical-align: middle;
		overflow: hidden;
		word-wrap:break-word;
		color: @font-color-sub;
	}
	
	.mvi-cell-nowrap{
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 1;
	}

	.mvi-cell-arrow {
		margin-left: @mp-xs;
		color: @font-color-sub;
		line-height: 1.5;
	}

	.mvi-cell-label {
		width: 100%;
		margin-top: @mp-xs;
		font-size: @font-size-small;
		color: @font-color-mute;
		word-wrap:break-word;
	}
</style>
