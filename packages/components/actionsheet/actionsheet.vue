<template>
	<m-popup :show="show" @click.native.self="hide" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout"
	 placement="bottom" :round="round" :local="local" :use-padding="usePadding" v-on="listeners">
		<div class="mvi-acionsheet">
			<div class="mvi-acionsheet-title" v-if="title" :style="{color:(titleColor?titleColor:'')}">
				<span v-text="title"></span>
			</div>
			<div class="mvi-acionsheet-list">
				<div :class="itemClass(item)" v-for="(item,index) in options" :key="'action-'+index" :style="itemStyle(item)"
				 :disabled="itemDisabled(item)" @click="doSelect(item,index)">
					<m-loading color="#bbb" v-if="(item.loading?item.loading:false)"></m-loading>
					<div class="mvi-acionsheet-content" v-else-if="item.label||item.sub || iconType(item.icon) || iconUrl(item.icon)">
						<m-icon data-placement="left" v-if="(iconType(item.icon) || iconUrl(item.icon)) && item.placement!='right'"
						 :type="iconType(item.icon)" :url="iconUrl(item.icon)" :spin="iconSpin(item.icon)" />
						<span v-if="item.label" v-text="item.label"></span>
						<span v-if="item.sub" class="mvi-acionsheet-item-sub" v-text="item.sub"></span>
						<m-icon data-placement="right" v-if="(iconType(item.icon) || iconUrl(item.icon)) && item.placement=='right'"
						 :type="iconType(item.icon)" :url="iconUrl(item.icon)" :spin="iconSpin(item.icon)" />
					</div>
				</div>
			</div>
			<div class="mvi-acionsheet-divider"></div>
			<div :class="'mvi-acionsheet-button'+(cancelActive?' mvi-acionsheet-active':'')" v-if="showCancel" v-text="cancelText"
			 @click="doCancel" :style="'color:'+(cancelColor?cancelColor:'')"></div>
		</div>
	</m-popup>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-actionsheet",
		model: {
			prop: 'show',
			event: 'model-change'
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			overlayColor: {
				type: String,
				default: null
			},
			zIndex: {
				type: Number,
				default: 900
			},
			timeout: {
				type: Number,
				default: 400
			},
			round: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: null
			},
			titleColor:{
				type:String,
				default:null
			},
			closable: {
				type: Boolean,
				default: true
			},
			options: {
				type: Array,
				default: function() {
					return []
				}
			},
			showCancel: {
				type: Boolean,
				default: true
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			cancelColor: {
				type: String,
				default: null
			},
			cancelActive: { //取消按钮是否显示点击态
				type: Boolean,
				default: true
			},
			optionActive: { //列表选项是否显示点击态
				type: Boolean,
				default: true
			},
			local: { //是否局部显示
				type: Boolean,
				default: false
			},
			selectClose: { //选择完是否自动关闭
				type: Boolean,
				default: true
			},
			usePadding:{//局部显示时是否考虑滚动条影响
				type:Boolean,
				default: false
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners)
			},
			iconType() {
				return (icon) => {
					var t = null;
					if ($util.isObject(icon)) {
						if (typeof(icon.type) == "string") {
							t = icon.type;
						}
					} else if (typeof(icon) == "string") {
						t = icon;
					}
					return t;
				}
			},
			iconUrl() {
				return (icon) => {
					var url = null;
					if ($util.isObject(icon)) {
						if (typeof(icon.url) == "string") {
							url = icon.url;
						}
					}
					return url;
				}
			},
			iconSpin() {
				return (icon) => {
					var spin = false;
					if ($util.isObject(icon)) {
						if (typeof(icon.spin) == "boolean") {
							spin = icon.spin;
						}
					}
					return spin;
				}
			},
			itemClass() {
				return (item) => {
					var cls = "mvi-acionsheet-item";
					if (item.class) {
						cls += ' ' + item.class;
					}
					if (this.optionActive && !item.loading && !item.disabled) {
						cls += ' mvi-acionsheet-active';
					}
					return cls;
				}
			},
			itemStyle(){
				return (item)=>{
					var style = {};
					if(item.color && !this.itemDisabled(item)){
						style.color = item.color;
					}
					return style;
				}
			},
			itemDisabled(){
				return (item)=>{
					if(typeof(item.disabled) == 'boolean'){
						return item.disabled;
					}else{
						return false;
					}
				}
			}
		},
		methods: {
			//点击遮罩关闭
			hide(event) {
				if (this.closable) {
					this.doCancel();
				}
			},
			//取消
			doCancel() {
				this.$emit('update:show', false);
				this.$emit('model-change', false);
			},
			//点击选项
			doSelect(item, index) {
				if (item.disabled || item.loading) {
					return;
				}
				if (this.selectClose) {
					this.$emit('update:show', false);
					this.$emit('model-change', false);
				}
				this.$emit('select', {
					item: Object.assign({}, item),
					index: index
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	//菜单
	.mvi-acionsheet {
		display: block;
		width: 100%;
		position: relative;
	}

	//标题
	.mvi-acionsheet-title {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		font-size: @font-size-small;
		color: @font-color-sub;
		padding: 0 @mp-md;

		&>span {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	//选项列表
	.mvi-acionsheet-list {
		display: block;
		width: 100%;
	}

	//列表项
	.mvi-acionsheet-item {
		display: flex;
		display: -webkit-flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		font-size: @font-size-default;
		color: @font-color-default;
		padding: 0 @mp-md;
		cursor: pointer;
	}

	.mvi-acionsheet-active:active::before {
		.mvi-active();
	}

	.mvi-acionsheet-item[disabled] {
		color: @font-color-mute;
	}

	.mvi-acionsheet-content {
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		vertical-align: middle;

		.mvi-icon {
			font-size: 0.8em;
			margin-right: @mp-xs;
			margin-left: 0;
		}

		.mvi-icon[data-placement='right'] {
			margin-left: @mp-xs;
			margin-right: 0;
		}

		&>span {
			vertical-align: middle;
		}

	}

	.mvi-acionsheet-item-sub {
		font-size: @font-size-small;
		margin-left: @mp-xs;
		opacity:.6;
	}

	.mvi-acionsheet-item:last-child {
		border-bottom: none;
	}

	.mvi-acionsheet-divider {
		display: block;
		width: 100%;
		height: 0.3rem;
		background-color: #eee;
	}

	.mvi-acionsheet-button {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: @medium-height;
		font-size: @font-size-h6;
		color: @font-color-default;
	}
</style>
