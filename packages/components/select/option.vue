<template>
	<div v-on="listeners" :class="'mvi-option mvi-option-'+this.select.size" @click="optionClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
		<div class="mvi-option-value">
			<slot></slot>
		</div>
		<m-icon v-if="isSelect" :type="iconType" :spin="iconSpin" :size="iconSize" :url="iconUrl" />
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
			},
			isSelect(){
				if(this.select.multiple && this.select.showSelectIcon && this.select.value.includes(this.value)){
					return true;
				}else {
					return false;
				}
			},
			iconType(){
				var type = null;
				if ($util.isObject(this.select.selectedIcon)) {
					if (typeof(this.select.selectedIcon.type) == "string") {
						type = this.select.selectedIcon.type;
					}
				} else if (typeof(this.select.selectedIcon) == "string") {
					type = this.select.selectedIcon;
				}
				return type;
			},
			iconSize(){
				var size = null;
				if ($util.isObject(this.select.selectedIcon)) {
					if (typeof(this.select.selectedIcon.size) == "string") {
						size = this.select.selectedIcon.size;
					}
				}
				return size;
			},
			iconUrl(){
				var url = null;
				if ($util.isObject(this.select.selectedIcon)) {
					if (typeof(this.select.selectedIcon.url) == "string") {
						url = this.select.selectedIcon.url;
					}
				}
				return url;
			},
			iconSpin(){
				var spin = false;
				if ($util.isObject(this.select.selectedIcon)) {
					if (typeof(this.select.selectedIcon.spin) == "boolean") {
						spin = this.select.selectedIcon.spin;
					}
				}
				return spin;
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
		justify-content: space-between;
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
	
	.mvi-option-value{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>
