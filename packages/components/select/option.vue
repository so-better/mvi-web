<template>
	<div v-on="listeners" :class="'mvi-option mvi-option-'+this.select.size" :style="optionStyle" @click="optionClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
		<span class="mvi-option-label" v-text="label"></span>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:'m-option',
		props:{
			value:{
				type:[String,Number],
				default:null
			},
			label:{
				type:[String,Number],
				default:null
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			optionStyle(){
				var style = {};
				return style;
			}
		},
		inject:['select'],
		created() {
			this.select.children.push(this);
		},
		methods:{
			optionClick(){
				this.select.$emit('model-change',this.value);
				this.select.$emit('update:value',this.value);
				this.select.trigger();
			},
			mouseEnter(e){
				if(this.select.hoverClass){
					$util.addClass(e.currentTarget,this.select.hoverClass);
				}
			},
			mouseLeave(e){
				if(this.select.hoverClass){
					$util.removeClass(e.currentTarget,this.select.hoverClass);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	.mvi-option{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		
		&.mvi-option-medium{
			padding: @mp-sm @mp-md;
			font-size: @font-size-default;
		}
		
		&.mvi-option-large{
			font-size: @font-size-h6;
			padding: @mp-md @mp-lg;
		}
		
		
		.mvi-option-label{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	.mvi-option:hover{
		cursor: pointer;
		background-color: @bg-color-default;
	}
</style>
