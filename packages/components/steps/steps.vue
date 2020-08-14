<template>
	<div v-on="listeners" :class="'mvi-steps'+(vertical?' mvi-steps-vertical':'')"
	:style="'background-color:'+(background?background:'')">
		<slot></slot>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-steps",
		data(){
			return {
				children:[]
			}
		},
		props:{
			active:{//当前步骤
				type:Number,
				default:0
			},
			vertical:{//是否垂直
				type:Boolean,
				default:false
			},
			activeColor:{//激活状态的颜色
				type:String,
				default:null
			},
			inactiveColor:{//未激活状态的颜色
				type:String,
				default:null
			},
			activeIcon:{//激活状态的图标
				type:[String,Object],
				default:'success-o'
			},
			inactiveIcon:{//未激活状态的图标
				type:[String,Object],
				default:null
			},
			background:{//背景色
				type:String,
				default:null
			}
		},
		provide(){
			return {
				steps:this
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			activeIconType() {
				var t = null;
				if ($util.isObject(this.activeIcon)) {
					if (typeof(this.activeIcon.type) == "string") {
						t = this.activeIcon.type;
					}
				} else if (typeof(this.activeIcon) == "string") {
					t = this.activeIcon;
				}
				return t;
			},
			activeIconUrl() {
				var url = null;
				if ($util.isObject(this.activeIcon)) {
					if (typeof(this.activeIcon.url) == "string") {
						url = this.activeIcon.url;
					}
				}
				return url;
			},
			activeIconSpin() {
				var spin = false;
				if ($util.isObject(this.activeIcon)) {
					if (typeof(this.activeIcon.spin) == "boolean") {
						spin = this.activeIcon.spin;
					}
				}
				return spin;
			},
			inactiveIconType() {
				var t = null;
				if ($util.isObject(this.inactiveIcon)) {
					if (typeof(this.inactiveIcon.type) == "string") {
						t = this.inactiveIcon.type;
					}
				} else if (typeof(this.inactiveIcon) == "string") {
					t = this.inactiveIcon;
				}
				return t;
			},
			inactiveIconUrl() {
				var url = null;
				if ($util.isObject(this.inactiveIcon)) {
					if (typeof(this.inactiveIcon.url) == "string") {
						url = this.inactiveIcon.url;
					}
				}
				return url;
			},
			inactiveIconSpin() {
				var spin = false;
				if ($util.isObject(this.inactiveIcon)) {
					if (typeof(this.inactiveIcon.spin) == "boolean") {
						spin = this.inactiveIcon.spin;
					}
				}
				return spin;
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-steps{
		display: flex;
		display: -webkit-flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: @mp-sm;
		background-color: #fff;
	}
	
	.mvi-steps.mvi-steps-vertical{
		flex-direction: column;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
	}
</style>
