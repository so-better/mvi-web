<template>
	<div v-on="listeners" :class="'mvi-option mvi-option-'+this.select.size" @click="optionClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
		<slot></slot>
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
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			label(){
				var html = '';
				this.$slots.default.forEach((item,index)=>{
					if(item && $util.isElement(item.elm)){
						html += item.elm.outerHTML;
					}else {
						html += item.text;
					}
				})
				return html;
			}
		},
		inject:['select'],
		created() {
			this.select.childrenOptions.push(this)
		},
		methods:{
			optionClick(){
				if(this.select.multiple){
					var arr = this.select.value;
					if(arr.includes(this.value)){
						arr.splice(this.getIndexOfArray(arr,this.value),1);
					}else{
						arr.push(this.value)
					}
					this.select.$emit('model-change',arr);
					this.select.$emit('update:value',arr);
				}else{
					this.select.$emit('model-change',this.value);
					this.select.$emit('update:value',this.value);
				}
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
			},
			getIndexOfArray(arr,value){
				var index = 0;
				for(var i = 0;i<arr.length;i++){
					if(arr[i] == value){
						index = i;
						break;
					}
				}
				return index;
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
		
		&.mvi-option-small{
			padding: @mp-xs @mp-sm;
			font-size: @font-size-small;
		}
		
		&.mvi-option-medium{
			padding: @mp-sm @mp-md;
			font-size: @font-size-default;
		}
		
		&.mvi-option-large{
			font-size: @font-size-h6;
			padding: @mp-md @mp-lg;
		}
	}
	
	.mvi-option:hover{
		cursor: pointer;
		background-color: @bg-color-default;
	}
</style>
