<template>
	<div v-on="listeners" :disabled="disabled" :class="computedClass" :style="computedStyle" @click="setActive">
		<div class="mvi-tabbar-item-child">
			<span class="mvi-tabbar-icon" v-if="iconType || iconUrl" :style="'margin-bottom:'+(name?'':'0px')">
				<m-icon :type="iconType" :url="iconUrl" :spin="iconSpin"/>
			</span>
			<span class="mvi-tabbar-name" v-text="name"></span>
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-tabbar-item",
		inject:['tabbar'],
		props:{
			icon:{
				type:[String,Object],
				default:null
			},
			name:{
				type:String,
				default:null
			},
			value:{
				type:[String,Number],
				default:null
			},
			disabled:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners);
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
			computedClass(){
				var cls = "mvi-tabbar-item";
				if(this.value == this.tabbar.value){
					cls += " mvi-tabbar-item-active";
				}
				if(this.name && (this.iconType||this.iconUrl)){
					cls += " mvi-tabbar-item-small";
				}else if(this.iconType||this.iconUrl){
					cls += " mvi-tabbar-item-large";
				}
				if(this.tabbar.active && !this.disabled && this.value != this.tabbar.value){
					cls += " mvi-tabbar-active";
				}
				return cls;
			},
			computedStyle(){
				var style = {};
				//激活
				if(this.value===this.tabbar.value){
					if(this.tabbar.activeColor){
						style.color = this.tabbar.activeColor;
					}
				}else {
					if(this.tabbar.inactiveColor){
						style.color = this.tabbar.inactiveColor;
					}
				}
				return style;
			}
		},
		methods:{
			setActive(){
				this.tabbar.itemClick(this.value);
				if(this.disabled){
					return;
				}
				if(this.tabbar.value === this.value){
					return;
				}
				this.tabbar.getActiveValue(this.value);
			},
			
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-tabbar-item{
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content:center;
		align-items: center;
		vertical-align: middle;
		font-size: @font-size-default;
		height: 100%;
		padding: 0 @mp-sm;
		cursor: pointer;
	}
	
	.mvi-tabbar-item-small{
		font-size: @font-size-small;
	}
	
	.mvi-tabbar-item-child{
		display: flex;
		display: -webkit-flex;
		justify-content:flex-start;
		align-items: center;
		flex-direction: column;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
		vertical-align: middle;
	}
	
	.mvi-tabbar-item-large{
		font-size: @font-size-h6;
	}
	
	.mvi-tabbar-item.mvi-tabbar-item-active{
		color: @info-normal;
	}
	
	.mvi-tabbar-icon{
		display: block;
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
	}
	
	.mvi-tabbar-item-small .mvi-tabbar-icon .mvi-icon-url{
		width: .32rem;
		height: .32rem;
	}
	
	.mvi-tabbar-item-large .mvi-tabbar-icon .mvi-icon-url{
		width: .42rem;
		height: .42rem;
	}
	
	.mvi-tabbar-name{
		display: block;
		width: 100%;
		text-align: center;
	}
	.mvi-tabbar-active:active::before{
		.mvi-active();
	}
	
	.mvi-tabbar-item[disabled]{
		opacity: .5;
	}
</style>
