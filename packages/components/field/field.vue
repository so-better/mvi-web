<template>
	<div :class="fieldClass" :disabled="disabled">
		<div class="mvi-field-outer mvi-field-outer-left" v-if="outerLeftType || outerLeftUrl || $slots.outerLeft" :style="outerStyle" @click="outerLeftClick">
			<slot v-if="$slots.outerLeft" name="outerLeft"></slot>
			<m-icon v-else-if="outerLeftType || outerLeftUrl" :type="outerLeftType" :url="outerLeftUrl" :spin="outerLeftSpin" />
		</div>
		<div :class="fieldBodyClass" :style="fieldBodyStyle">
			<div class="mvi-field-inner mvi-field-inner-left" v-if="innerLeftType || innerLeftUrl || $slots.innerLeft" @click="innerLeftClick">
				<slot v-if="$slots.innerLeft" name="innerLeft"></slot>
				<m-icon v-else-if="innerLeftType || innerLeftUrl" :type="innerLeftType" :url="innerLeftUrl" :spin="innerLeftSpin" />
			</div>
			<input ref="input" :disabled="disabled" class="mvi-field-input" :style="inputStyle" :type="computedType" :placeholder="placeholder" :value="computedValue"
			@focus="inputFocus" @blur="inputBlur" @input="doInput" :maxlength="maxlength">
			<div class="mvi-field-inner mvi-field-inner-right" v-if="innerRightType || innerRightUrl || $slots.innerRight" @click="innerRightClick">
				<slot v-if="$slots.innerRight" name="innerRight"></slot>
				<m-icon v-else-if="innerRightType || innerRightUrl" :type="innerRightType" :url="innerRightUrl" :spin="innerRightSpin" />
			</div>
		</div>
		<div class="mvi-field-outer mvi-field-outer-right" v-if="outerRightType || outerRightUrl || $slots.outerRight" :style="outerStyle" @click="outerRightClick">
			<slot v-if="$slots.outerRight" name="outerRight"></slot>
			<m-icon v-else-if="outerRightType || outerRightUrl" :type="outerRightType" :url="outerRightUrl" :spin="outerRightSpin" />
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:'m-field',
		model:{
			prop:'value',
			event:'model-change'
		},
		data(){
			return {
				focus:false
			}
		},
		props:{
			//是否禁用
			disabled:{
				type:Boolean,
				default:false
			},
			//输入框的值
			value:{
				type:[String,Number],
				default:''
			},
			//输入框的占位符
			placeholder:{
				type:String,
				default:''
			},
			//输入框类型
			type:{
				type:String,
				default:'text'
			},
			//输入框大小
			size:{
				type:String,
				default:'medium',
				validator(value){
					return ['medium','large'].includes(value)
				}
			},
			//输入框最大字符长度
			maxlength:{
				type:Number,
				default:-1
			},
			//输入框是否圆角
			round:{
				type:Boolean,
				default:false
			},
			//输入框是否方形
			square:{
				type:Boolean,
				default:false
			},
			//左侧内图标
			innerLeft:{
				type:[String,Object],
				default:null
			},
			//右侧内图标
			innerRight:{
				type:[String,Object],
				default:null
			},
			//左侧外图标
			outerLeft:{
				type:[String,Object],
				default:null
			},
			//右侧外图标
			outerRight:{
				type:[String,Object],
				default:null
			},
			//点击样式
			activeType:{
				type:String,
				default:'info',
				validator(value){
					return ['info','success','warn','primary','error']
				}
			},
			//点击颜色
			activeColor:{
				type:String,
				default:null
			},
			//外侧背景色
			outerBackground:{
				type:String,
				default:null
			},
			//外侧字体颜色
			outerColor:{
				type:String,
				default:null
			},
			//自定义边框颜色
			borderColor:{
				type:String,
				default:null
			}
		},
		computed:{
			//outer外侧样式
			outerStyle(){
				var style = {}
				if(this.outerBackground){
					style.backgroundColor = this.outerBackground
				}
				if(this.outerColor){
					style.color = this.outerColor
				}
				return style
			},
			//输入框样式
			inputStyle(){
				var style = {}
				if(this.$slots.innerLeft || this.innerLeftType || this.innerLeftUrl){
					style.paddingLeft = 0;
				}
				if(this.$slots.innerRight || this.innerRightType || this.innerRightUrl){
					style.paddingRight = 0;
				}
				return style
			},
			//输入框父容器样式
			fieldBodyStyle(){
				var style = {}
				if(this.focus){
					if(this.activeColor){
						style.borderColor = this.activeColor
					}
				}else {
					if(this.borderColor){
						style.borderColor = this.borderColor
					}
				}
				return style
			},
			//输入框父容器样式类
			fieldBodyClass(){
				var cls = 'mvi-field-body';
				if(this.outerLeftType || this.outerLeftUrl || this.$slots.outerLeft){
					cls += ' mvi-field-body-left';
				}
				if(this.outerRightType || this.outerRightUrl || this.$slots.outerRight){
					cls += ' mvi-field-body-right';
				}
				if(!this.activeColor && this.activeType && this.focus){
					cls += ' mvi-field-body-'+this.activeType
				}
				return cls;
			},
			//输入框组件样式类
			fieldClass(){
				var cls = 'mvi-field mvi-field-'+this.size;
				if(this.round){
					cls += ' mvi-field-round';
				}else if(this.square){
					cls += ' mvi-field-square';
				}
				return cls
			},
			//输入框的类型
			computedType(){
				if(this.type == 'number'){
					return 'text'
				}else{
					return this.type
				}
			},
			//输入框的值
			computedValue(){
				var value = this.value.toString();
				if(this.type == 'number' || this.type == 'tel'){
					value = value.replace(/\D/g, '');
					if(this.maxlength > 0 && value.length>this.maxlength){
						value = value.substr(0, this.maxlength);
					}
				} else {
					value = value.toString();
					if(this.maxlength > 0 && value.length>this.maxlength){
						value = value.substr(0, this.maxlength);
					}
				}
				if(this.value !== value){
					this.$emit('update:value', value);
					this.$emit('model-change', value);
				}
				return value;
			},
			outerLeftType() {
				var t = null;
				if ($util.isObject(this.outerLeft)) {
					if (typeof(this.outerLeft.type) == "string") {
						t = this.outerLeft.type;
					}
				} else if (typeof(this.outerLeft) == "string") {
					t = this.outerLeft;
				}
				return t;
			},
			outerLeftUrl() {
				var url = null;
				if ($util.isObject(this.outerLeft)) {
					if (typeof(this.outerLeft.url) == "string") {
						url = this.outerLeft.url;
					}
				}
				return url;
			},
			outerLeftSpin() {
				var spin = false;
				if ($util.isObject(this.outerLeft)) {
					if (typeof(this.outerLeft.spin) == "boolean") {
						spin = this.outerLeft.spin;
					}
				}
				return spin;
			},
			outerRightType() {
				var t = null;
				if ($util.isObject(this.outerRight)) {
					if (typeof(this.outerRight.type) == "string") {
						t = this.outerRight.type;
					}
				} else if (typeof(this.outerRight) == "string") {
					t = this.outerRight;
				}
				return t;
			},
			outerRightUrl() {
				var url = null;
				if ($util.isObject(this.outerRight)) {
					if (typeof(this.outerRight.url) == "string") {
						url = this.outerRight.url;
					}
				}
				return url;
			},
			outerRightSpin() {
				var spin = false;
				if ($util.isObject(this.outerRight)) {
					if (typeof(this.outerRight.spin) == "boolean") {
						spin = this.outerRight.spin;
					}
				}
				return spin;
			},
			innerLeftType() {
				var t = null;
				if ($util.isObject(this.innerLeft)) {
					if (typeof(this.innerLeft.type) == "string") {
						t = this.innerLeft.type;
					}
				} else if (typeof(this.innerLeft) == "string") {
					t = this.innerLeft;
				}
				return t;
			},
			innerLeftUrl() {
				var url = null;
				if ($util.isObject(this.innerLeft)) {
					if (typeof(this.innerLeft.url) == "string") {
						url = this.innerLeft.url;
					}
				}
				return url;
			},
			innerLeftSpin() {
				var spin = false;
				if ($util.isObject(this.innerLeft)) {
					if (typeof(this.innerLeft.spin) == "boolean") {
						spin = this.innerLeft.spin;
					}
				}
				return spin;
			},
			innerRightType() {
				var t = null;
				if ($util.isObject(this.innerRight)) {
					if (typeof(this.innerRight.type) == "string") {
						t = this.innerRight.type;
					}
				} else if (typeof(this.innerRight) == "string") {
					t = this.innerRight;
				}
				return t;
			},
			innerRightUrl() {
				var url = null;
				if ($util.isObject(this.innerRight)) {
					if (typeof(this.innerRight.url) == "string") {
						url = this.innerRight.url;
					}
				}
				return url;
			},
			innerRightSpin() {
				var spin = false;
				if ($util.isObject(this.innerRight)) {
					if (typeof(this.innerRight.spin) == "boolean") {
						spin = this.innerRight.spin;
					}
				}
				return spin;
			},
		},
		methods:{
			//输入框获取焦点
			inputFocus(){
				this.focus = true;
			},
			//输入框失去焦点
			inputBlur(){
				this.focus = false;
			},
			//输入框实时输入
			doInput(event){
				var value = this.$refs.input.value;
				//数字类型或者电话类型会过滤非数字字符
				if(this.type == 'number' || this.type == 'tel'){
					value = value.replace(/\D/g, '');
					this.$refs.input.value = value;
				}
				//如果设置了maxlength，则进行字符串截取
				if (this.maxlength > 0) {
					if (value.length > this.maxlength) {
						value = value.substr(0, this.maxlength);
						this.$refs.input.value = value;
					}
				}
				this.$emit('update:value', value);
				this.$emit('model-change', value);
			},
			//点击左外侧元素
			outerLeftClick(){
				this.$emit('outer-left-click',this.value)
			},
			//点击左内侧元素
			innerLeftClick(){
				this.$emit('inner-left-click',this.value)
			},
			//点击右外侧元素
			outerRightClick(){
				this.$emit('outer-right-click',this.value)
			},
			//点击右内侧元素
			innerRightClick(){
				this.$emit('inner-right-click',this.value)
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-field{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border-radius: @radius-default;
		color: @font-color-default;
		background-color: #fff;
		
		&.mvi-field-medium{
			font-size: @font-size-default;
			height: @medium-height;
			
			.mvi-field-input{
				padding: 0 @mp-sm;
			}
			
			.mvi-field-outer,.mvi-field-inner{
				padding: 0 @mp-md;
			}
			
		}
		
		&.mvi-field-large{
			font-size: @font-size-h6;
			height: @large-height;
			
			.mvi-field-input{
				padding: 0 @mp-md;
			}
			
			.mvi-field-outer,.mvi-field-inner{
				padding: 0 @mp-xs*3.4;
			}
		}
		
		&.mvi-field-round{
			border-radius: @radius-round;
			
			.mvi-field-outer-left{
				border-top-left-radius: @radius-round;
				border-bottom-left-radius: @radius-round;
			}
			
			.mvi-field-outer-right{
				border-top-right-radius: @radius-round;
				border-bottom-right-radius: @radius-round;
			}
			
			.mvi-field-body-left{
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
			
			.mvi-field-body-right{
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
		
		&.mvi-field-square{
			border-radius: 0;
			
			.mvi-field-outer-right{
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
			
			.mvi-field-body-left,.mvi-field-body-right{
				border-radius: 0;
			}
		}
	
		&[disabled]{
			opacity: .6;
		}
	}
	
	.mvi-field-outer{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: @border-color;
		
		&:hover{
			cursor: pointer;
		}
	}
	
	.mvi-field-body{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: inherit;
		border-radius: inherit;
		border: 1px solid @border-color;
		transition: border-color 600ms;
		-webkit-transition: border-color 600ms;
		-ms-transition: border-color 600ms;
		-moz-transition: border-color 600ms;
		
		.mvi-field-inner{
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			
			&:hover{
				cursor: pointer;
			}
			
			&.mvi-field-inner-left{
				border-top-left-radius: inherit;
				border-bottom-left-radius: inherit;
			}
			
			&.mvi-field-inner-right{
				border-top-right-radius: inherit;
				border-bottom-right-radius: inherit;
			}
		}
		
		.mvi-field-input{
			display: block;
			width: 100%;
			flex: 1;
			margin: 0;
			padding: 0;
			border: none;
			border-radius: inherit;
			background-color: inherit;
			color: inherit;
			font-size: inherit;
			vertical-align: middle;
			height: 100%;
			
			&::-webkit-input-placeholder,&::placeholder,&::-moz-placeholder,&:-ms-input-placeholder{
				color: inherit;
				font-family: inherit;
				font-size: inherit;
				opacity: .6;
				vertical-align: middle;
			}
			
			&[disabled]{
				background-color: inherit;
				color: inherit;
			}
		}
		
		&.mvi-field-body-info{
			border-color: @info-normal;
		}
		
		&.mvi-field-body-success{
			border-color: @success-normal;
		}
		
		&.mvi-field-body-warn{
			border-color: @warn-normal;
		}
		
		&.mvi-field-body-primary{
			border-color: @primary-normal;
		}
		
		&.mvi-field-body-error{
			border-color: @error-normal;
		}
	}
</style>
