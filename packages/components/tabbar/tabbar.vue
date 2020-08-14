<template>
	<div v-on="listeners" :class="'mvi-tabbar'+(border?' mvi-tabbar-border':'')+(fixed?' mvi-tabbar-fixed':'')"
	:style="'z-index'+(fixed?zIndex:'')">
		<m-tabbar-item v-for="(item,index) in tabs" :key="'tab-'+index" :name="item.name" :value="item.value" 
		:icon="item.icon" :disabled="item.disabled"></m-tabbar-item>
	</div>
</template>

<script>
	import mTabItem from "./tabbarItem"
	
	export default {
		name:"m-tabbar",
		components:{
			'm-tabbar-item':mTabItem
		},
		provide(){
			return {
				'tabbar':this
			};
		},
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			value:{
				type:[String,Number],
				default:null,
			},
			tabs:{
				type:Array,
				default:function(){
					return [];
				}
			},
			fixed:{
				type:Boolean,
				default:false
			},
			border:{
				type:Boolean,
				default:false
			},
			zIndex:{
				type:Number,
				default:400
			},
			activeColor:{
				type:String,
				default:null
			},
			inactiveColor:{
				type:String,
				default:null
			},
			active:{
				type:Boolean,
				default:true
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners);
			}
		},
		methods:{
			//tab切换
			getActiveValue(value){
				this.$emit('update:value',value);
				this.$emit('model-change',value);
			},
			//点击tab
			itemClick(value){
				this.$emit('item-click',value);
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-tabbar{
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		padding: 0;
		height: @medium-height;
		background-color: #fff;
		color: @font-color-default;
	}
	
	.mvi-tabbar.mvi-tabbar-border{
		border-top: 1px solid @border-color;
	}
	
	.mvi-tabbar-fixed{
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
