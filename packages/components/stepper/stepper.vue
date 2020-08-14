<template>
	<div :class="'mvi-stepper mvi-stepper-'+size" v-on="listeners">
		<div :disabled="disabledMinus || arrivalMin || disabled" :class="'mvi-stepper-minus'+((!(disabledMinus || arrivalMin || disabled) && active)?' mvi-stepper-active':'')" v-if="showMinus" :style="minusStyle" @click="doMinus">
			<m-icon type="minus" />
		</div>
		<div :disabled="disabledInput" class="mvi-stepper-input" :style="inputStyle" v-if="showInput">
			<input ref="input" :value="inputValue" :disabled="disabled || disabledInput" type="text" @input="input" :style="inputElStyle">
		</div>
		<div :disabled="disabledPlus || arrivalMax || disabled" :class="'mvi-stepper-plus'+((!(disabledPlus || arrivalMax || disabled) && active)?' mvi-stepper-active':'')" v-if="showPlus" :style="plusStyle" @click="doPlus">
			<m-icon type="plus" />
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-stepper",
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			value:{
				type:[String,Number],
				default:0
			},
			step:{
				type:Number,
				default:1
			},
			size:{
				type:String,
				default:'medium',
				validator(value){
					return ['small','medium','large'].includes(value)
				}
			},
			min:{
				type:Number,
				default:null
			},
			max:{
				type:Number,
				default:null
			},
			digit:{//显示小数位数
				type:Number,
				default:0
			},
			disabled:{
				type:Boolean,
				default:false
			},
			disabledPlus:{
				type:Boolean,
				default:false
			},
			disabledMinus:{
				type:Boolean,
				default:false
			},
			disabledInput:{
				type:Boolean,
				default:false
			},
			showPlus:{
				type:Boolean,
				default:true
			},
			showMinus:{
				type:Boolean,
				default:true
			},
			showInput:{
				type:Boolean,
				default:true
			},
			inputWidth:{//输入框宽度
				type:String,
				default:null
			},
			background:{//按钮与输入框的背景色
				type:String,
				default:null
			},
			color:{//按钮与输入框的字体颜色
				type:String,
				default:null
			},
			active:{//是否显示点击态
				type:Boolean,
				default:true
			},
			inputAlign:{//输入框数字对齐方式
				type:String,
				default:'center',
				validator(value){
					return ['left','center','right'].includes(value)
				}
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			arrivalMin(){
				if(this.min != null){
					return this.value<=this.min;
				}else{
					return false;
				}
			},
			arrivalMax(){
				if(this.max != null){
					return this.value>=this.max;
				}else{
					return false;
				}
			},
			inputStyle(){
				var style = {};
				if(this.inputWidth){
					style.width = this.inputWidth;
				}
				if(this.color){
					style.color = this.color;
				}
				if(this.background){
					style.backgroundColor = this.background;
				}
				return style;
			},
			inputElStyle(){
				var style = {};
				if(this.inputAlign){
					style.textAlign = this.inputAlign;
				}
				return style;
			},
			minusStyle(){
				var style = {};
				if(this.color){
					style.color = this.color;
				}
				if(this.background){
					style.backgroundColor = this.background;
				}
				return style;
			},
			plusStyle(){
				var style = {};
				if(this.color){
					style.color = this.color;
				}
				if(this.background){
					style.backgroundColor = this.background;
				}
				return style;
			},
			inputValue(){
				if($util.isNumber(this.value)){
					return this.value;
				}else if(typeof(this.value) == 'string' &&　this.value){
					var value = this.value.replace(/\D/g, '');
					if(value){
						return Number(value);
					}else{
						return 0;
					}
				}else{
					return 0;
				}
			}
		},
		methods:{
			//减法
			doMinus(){
				if(this.disabled){
					return;
				}
				if(this.disabledMinus){
					return;
				}
				if(this.inputValue <= this.min && this.min != null){
					return;
				}
				var value = this.inputValue - this.step;
				if(this.min != null){
					value = value<=this.min?this.min:value;
				}
				value = Number(value.toFixed(this.digit));
				this.$emit('update:value',value);
				this.$emit('model-change',value);
			},
			//加法
			doPlus(){
				if(this.disabled){
					return;
				}
				if(this.disabledPlus){
					return;
				}
				if(this.inputValue >= this.max && this.max != null){
					return;
				}
				var value = this.inputValue + this.step;
				if(this.max != null){
					value = value>=this.max?this.max:value;
				}
				value = Number(value.toFixed(this.digit));
				this.$emit('update:value',value);
				this.$emit('model-change',value);
			},
			//输入框输入
			input(){
				if(this.disabled){
					return;
				}
				if(this.disabledInput){
					return;
				}
				var value = this.$refs.input.value;
				//过滤非数字字符
				value = value.replace(/\D/g, '');
				if(!value){
					value = '0';
				}
				this.$refs.input.value = value;
				
				value = Number(Number(value).toFixed(this.digit));
				if(value <= this.min && this.min != null){
					this.$refs.input.value = this.min;
					value = this.min;
				}
				if(value >= this.max && this.max != null){
					this.$refs.input.value = this.max;
					value = this.max;
				}
				this.$emit('update:value',value);
				this.$emit('model-change',value);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-stepper{
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}
	
	.mvi-stepper-minus,.mvi-stepper-plus{
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		background-color: @bg-color-dark;
		border-radius: @radius-default;
		color: @font-color-sub;
		position: relative;
		cursor: pointer;
		
		&[disabled]{
			opacity: .5;
		}
	}
	
	.mvi-stepper-minus{
		margin-right: @mp-xs;
	}
	
	.mvi-stepper-active:active::before{
		.mvi-active();
	}
	
	.mvi-stepper-small>.mvi-stepper-minus,.mvi-stepper-small>.mvi-stepper-plus{
		width: @small-height;
		height: @small-height;
		font-size: @font-size-small;
	}
	
	.mvi-stepper-medium>.mvi-stepper-minus,.mvi-stepper-medium>.mvi-stepper-plus{
		width:@medium-height;
		height:@medium-height;
		font-size: @font-size-default;
	}
	
	.mvi-stepper-large>.mvi-stepper-minus,.mvi-stepper-large>.mvi-stepper-plus{
		width:@large-height;
		height:@large-height;
		font-size: @font-size-h6;
	}
	.mvi-stepper-input{
		min-width: 0;
		background-color: @bg-color-dark;
		margin-right: @mp-xs;
		border-radius: @radius-default;
		width: 1.5rem;
		color: @font-color-sub;
		
		&>input{
			position: relative;
			display: block;
			background-color: transparent;
			height: 100%;
			width: 100%;
			min-width: 0;
			color: inherit;
			font-size: inherit;
			border: none;
			border-radius: @radius-default;
			font-family: @font-family;
			background-image: none;
			margin: 0;
			font-size: @font-size-default;
			vertical-align: middle;
			&::-webkit-input-placeholder,&::placeholder{
				color: inherit;
				opacity: .5;
				vertical-align: middle;
				font-family: inherit;
				font-size: inherit;
			}
			
			&[disabled]{
				background-color: inherit;
				color: inherit;
				opacity:.5;
			}
		}
		
		
		&[disabled]{
			opacity: .5;
		}
	}
	.mvi-stepper-small>.mvi-stepper-input{
		height: @small-height;
		font-size: @font-size-small;
	}
	.mvi-stepper-medium>.mvi-stepper-input{
		height: @medium-height;
		font-size: @font-size-default;
	}
	.mvi-stepper-large>.mvi-stepper-input{
		height: @large-height;
		font-size: @font-size-h6;
	}
</style>
