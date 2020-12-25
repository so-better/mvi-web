<template>
	<m-popup :show="show" @click.native.self="hide" :popup-color="backgroundColor" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" :placement="placement" :round="round" v-on="listeners" :local="local" :use-padding="usePadding">
		<div class="mvi-dropdown">
			<div :disabled="itemDisabled(item)" :class="dropdownItemClass(item,index)" v-for="(item,index) in options" :key="'item-'+index" 
			@click="doSelect(item,index)" :style="dropdownItemStyle(item,index)">
				<div class="mvi-dropdown-item-label">
					<m-icon v-if="item.icon" :type="iconType(item.icon)" :url="iconUrl(item.icon)" 
					:spin="iconSpin(item.icon)" class="mvi-dropdown-icon" />
					<span class="mvi-dropdown-label-text" v-text="(item.label?item.label:'')"></span>
				</div>
				<div v-if="equalValue(item,index)" class="mvi-dropdown-item-checked" :data-placement="placement">
					<m-icon :type="selectIconType" :url="selectIconUrl" :spin="selectIconSpin" />
				</div>
			</div>
		</div>
	</m-popup>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-dropdown",
		data(){
			return {
				oldIndex:null
			}
		},
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			value:{//默认选中的选项
				type:[String,Number],
				default:null
			},
			activeColor:{//菜单列表选中的颜色
				type:String,
				default:null
			},
			options:{//列表参数,含label,value,disabled,class,icon
				type:Array,
				default:function(){
					return [];
				}
			},
			itemClass:{//列表项额外的class
				type:String,
				default:null
			},
			selectClose:{//选择完毕后是否关闭
				type:Boolean,
				default:true
			},
			selectIcon:{//自定义右侧选中的图标
				type:[String,Object],
				default:'success'
			},
			show:{
				type:Boolean,
				default:false
			},
			overlayColor:{
				type:String,
				default:null
			},
			zIndex:{
				type:Number,
				default:900
			},
			timeout:{
				type:Number,
				default:400
			},
			round:{
				type:Boolean,
				default:false
			},
			placement:{
				type:String,
				default:'top',
				
			},
			closable:{
				type:Boolean,
				default:true
			},
			local:{
				type:Boolean,
				default:false
			},
			active:{//是否显示点击态
				type:Boolean,
				default:true
			},
			usePadding:{//局部显示时是否考虑滚动条影响
				type:Boolean,
				default: false
			},
			backgroundColor:{//背景色
				type:String,
				default:null
			},
			inactiveColor:{//未选中列表颜色
				type:String,
				default:null
			},
			disabledColor:{//禁用时列表颜色
				type:String,
				default:null
			},
			borderColor:{//下边框颜色
				type:String,
				default:null
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			selectIconType() {
				var t = null;
				if ($util.isObject(this.selectIcon)) {
					if (typeof(this.selectIcon.type) == "string") {
						t = this.selectIcon.type;
					}
				} else if (typeof(this.selectIcon) == "string") {
					t = this.selectIcon;
				}
				return t;
			},
			selectIconUrl() {
				var url = null;
				if ($util.isObject(this.selectIcon)) {
					if (typeof(this.selectIcon.url) == "string") {
						url = this.selectIcon.url;
					}
				}
				return url;
			},
			selectIconSpin() {
				var spin = false;
				if ($util.isObject(this.selectIcon)) {
					if (typeof(this.selectIcon.spin) == "boolean") {
						spin = this.selectIcon.spin;
					}
				}
				return spin;
			},
			iconType(){
				return (icon)=>{
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
				return (icon)=>{
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
				return (icon)=>{
					var spin = false;
					if ($util.isObject(icon)) {
						if (typeof(icon.spin) == "boolean") {
							spin = icon.spin;
						}
					}
					return spin;
				}
			},
			//判断是否选中项
			equalValue(){
				return (item,index)=>{
					//比较value
					if((typeof(item.value) == 'string' && item.value) || $util.isNumber(item.value)){
						return this.value === item.value;
					}else{
						return this.value === index;
					}
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
			},
			dropdownItemStyle(){
				return (item,index)=>{
					var style = {}
					if(this.borderColor){
						style.borderBottomColor = this.borderColor;
					}
					if(this.itemDisabled(item)){
						style.color = '#bbb';
						if(this.disabledColor){
							style.color = this.disabledColor;
						}
					}else {
						//激活选中情况下
						if(this.equalValue(item,index)){
							if(this.activeColor){
								style.color = this.activeColor;
							}
						}else {
							if(this.inactiveColor){
								style.color = this.inactiveColor;
							}
						}
					}
					return style;
				}
			},
			dropdownItemClass(){
				return (item,index)=>{
					var cls = 'mvi-dropdown-item';
					if(this.itemClass){
						if(item.class){
							cls += ' '+item.class;
						}else{
							cls += ' '+this.itemClass;
						}
					}else{
						if(item.class){
							cls += ' '+item.class;
						}
					}
					if(this.equalValue(item,index)){
						cls += ' mvi-dropdown-checked';
					}
					if(this.active && !item.disabled){
						cls += ' mvi-dropdown-active';
					}
					return cls;
				}
				return cls;
			}
		},
		mounted() {
			this.oldIndex = this.value;
		},
		methods:{
			//点击遮罩关闭
			hide(){
				if (this.closable) {
					this.doCancel();
				}
			},
			//取消
			doCancel() {
				this.$emit('update:show', false);
			},
			//选择
			doSelect(item,index){
				if(item.disabled){
					return;
				}
				//点击的是已选择的选项
				if(this.valueFilter(item.value,index) === this.oldIndex){
					this.$emit('select',{
						item:Object.assign({},item),
						index:index
					});
					if(this.selectClose){
						this.doCancel();
					}
				}else{
					this.$emit('update:value',this.valueFilter(item.value,index));
					this.$emit('model-change',this.valueFilter(item.value,index));
					this.$emit('select',{
						item:Object.assign({},item),
						index:index
					});
					if(this.selectClose){
						this.doCancel();
					}
					this.oldIndex = this.valueFilter(item.value,index);
				}
			},
			//获取当前选择的value值
			valueFilter(value,index){
				if((typeof(value) == 'string' && value) || $util.isNumber(value)){
					return value;
				}else{
					return index;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-dropdown{
		display: block;
		width: 100%;
		position: relative;
		color: @font-color-default;
	}
	
	.mvi-dropdown-item{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		width: 100%;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		padding: 0 @mp-sm;
		font-size: @font-size-default;
		cursor: pointer;
	}
	.mvi-dropdown-active:active::before{
		.mvi-active();
	}
	
	.mvi-dropdown-checked>.mvi-dropdown-item-checked,
	.mvi-dropdown-checked>.mvi-dropdown-item-label{
		color: @info-normal;
	}
	
	.mvi-dropdown-item:last-child{
		border-bottom: none;
	}
	
	.mvi-dropdown-item-label{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;
		transition: color 200ms;
		-webkit-transition: color 200ms;
		-ms-transition: color 200ms;
		-moz-transition: color 200ms;
	}
	
	.mvi-dropdown-label-text{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.mvi-dropdown-item-checked{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		padding-left: @mp-sm;
		height: 100%;
		transition: color 200ms;
		-webkit-transition: color 200ms;
		-ms-transition: color 200ms;
		-moz-transition: color 200ms;
	}
	
	.mvi-dropdown-item-checked[data-placement='left'],
	.mvi-dropdown-item-checked[data-placement='right']{
		margin-left: @mp-lg*5;
	}
	
	.mvi-dropdown-icon{
		margin-right: @mp-xs;
	}
</style>
