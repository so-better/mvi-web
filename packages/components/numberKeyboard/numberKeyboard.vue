<template>
	<m-overlay ref="overlay" :show="show" @show="overlayShow" @hide="overlayHide" :z-index="zIndex" :color="overlayColor" 
	:timeout="timeout" @click.self="hide" :local="local" :use-padding="usePadding">
		<transition name="mvi-keyboard" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave"
		@after-leave="afterLeave" @leave="leave" @enter="enter">
			<div ref="keyboard" class="mvi-number-keyboard" v-if="firstShow" v-show="keyboardShow" :style="boardStyle" v-on="listeners">
				<div class="mvi-number-keyboard-left">
					<div :class="leftNumberClass(item)" v-for="(item,index) in numbers" :key="'number-'+index" v-text="item" 
					@click="numberClick(item)" v-if="showDecimal?true:(item != '.')" :data-decimal="''+showDecimal"></div>
				</div>
				<div class="mvi-number-keyboard-right" v-if="showComplete || showDelete">
					<div :disabled="deleteDisabeld" :class="deleteBtnClass" @click="deleteClick" v-if="showDelete">
						<slot name="delete" v-if="$slots.delete"></slot>
						<span v-text="deleteText" v-else></span>
					</div>
					<div :disabled="(promiseEmpty?false:completeDisabled)" :class="completeBtnClass" @click="completeClick" v-if="showComplete">
						<slot name="complete" v-if="$slots.complete"></slot>
						<span v-text="completeText"></span>
					</div>
				</div>
			</div>
		</transition>
	</m-overlay>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-number-keyboard",
		data(){
			return {
				firstShow:false,//第一次显示进行渲染
				keyboardShow:false,//键盘是否显示
				
				numbers:['1','2','3','4','5','6','7','8','9','0','.'],
			}
		},
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			showDecimal:{//是否显示小数点
				type:Boolean,
				default:true
			},
			showDelete:{//是否显示删除按钮
				type:Boolean,
				default:true
			},
			showComplete:{//是否显示完成按钮
				type:Boolean,
				default:true
			},
			show:{//是否显示键盘
				type:Boolean,
				default:false
			},
			value:{//当前输入的值
				type:[String,Number],
				default:''
			},
			zIndex:{//zIndex
				type:Number,
				default:850
			},
			timeout:{//动画时长
				type:Number,
				default:500,
			},
			closable:{//点击背景是否可关闭
				type:Boolean,
				default:false
			},
			maxlength:{//输入值最大长度
				type:Number,
				default:-1
			},
			deleteText:{//删除按钮文字
				type:String,
				default:'删除'
			},
			completeText:{//完成按钮文字
				type:String,
				default:'完成'
			},
			completeClass:{//完成按钮样式
				type:String,
				default:null
			},
			deleteClass:{//删除按钮样式
				type:String,
				default:null
			},
			promiseEmpty:{//空值时完成按钮是否可点击
				type:Boolean,
				default:false
			},
			active:{//是否显示点击态
				type:Boolean,
				default:true
			},
			local:{//局部显示
				type:Boolean,
				default:false
			},
			overlayColor:{//遮罩层颜色
				type:String,
				default:'rgba(0,0,0,.02)'
			},
			usePadding:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			computedValue(){
				if($util.isNumber(this.value)){
					if(this.value == 0){
						return '';
					}else{
						return this.value.toString();
					}
				}else{
					if(this.value.startsWith('.')){
						return this.value.substr(1);
					}else{
						return this.value;
					}
				}
			},
			boardStyle(){
				var style = {};
				style.transition = 'all '+ this.timeout + 'ms';
				style.webkitTransition = 'all '+this.timeout + 'ms';
				style.zIndex = this.zIndex + 10;
				return style;
			},
			deleteDisabeld(){
				if(this.value === ''){
					return true;
				}else{
					return false;
				}
			},
			completeDisabled(){
				if(this.value === ''){
					return true;
				}else{
					return false;
				}
			},
			leftNumberClass(){
				return (item)=>{
					var cls = 'mvi-number-keyboard-left-number';
					if(item == 0){
						cls += ' mvi-number-keyboard-number-zero';
					}
					if(this.active){
						cls += ' mvi-number-keyboard-active';
					}
					return cls;
				}
			},
			deleteBtnClass(){
				var cls = 'mvi-number-keyboard-delete';
				if(this.showDelete && !this.showComplete){
					cls += ' mvi-number-keyboard-hide';
				}
				if(this.deleteClass){
					cls += ' '+this.deleteClass;
				}
				if(this.active && !this.deleteDisabeld){
					cls += ' mvi-number-keyboard-active';
				}
				return cls;
			},
			completeBtnClass(){
				var cls = 'mvi-number-keyboard-complete';
				if(this.showComplete && !this.showDelete){
					cls += ' mvi-number-keyboard-hide';
				}
				if(this.completeClass){
					cls += ' '+this.completeClass;
				}
				if(this.active && !(this.promiseEmpty?false:this.completeDisabled)){
					cls += ' mvi-number-keyboard-active';
				}
				return cls;
			}
		},
		methods:{
			//遮罩层显示前
			overlayShow(el){
				if(!this.firstShow){
					this.firstShow = true;
				}
				this.keyboardShow = true;
			},
			//遮罩层隐藏前
			overlayHide(el){
				this.keyboardShow = false;
			},
			//数字点击
			numberClick(item){
				if(this.computedValue.length >= this.maxlength && this.maxlength>0){
					return;
				}
				if(item == '.'){
					if(this.computedValue.includes('.')){
						return;
					}
				}
				this.$emit('update:value',this.computedValue+item);
				this.$emit('model-change',this.computedValue+item);
				this.$emit('input',item);
			},
			//删除点击
			deleteClick(){
				if(this.deleteDisabeld){
					return;
				}
				var value = $util.deleteStr(this.computedValue,this.computedValue.length-1,1);
				this.$emit('update:value',value);
				this.$emit('model-change',value);
				this.$emit('delete',value);
			},
			//完成点击
			completeClick(){
				if(this.completeDisabled && !this.promiseEmpty){
					return;
				}
				this.$emit('complete',this.value);
				this.hideKeyboard();
			},
			//点击遮罩层关闭
			hide(){
				if(this.closable){
					this.hideKeyboard();
				}
			},
			//关闭
			hideKeyboard(){
				this.$emit('update:show',false);
			},
			//弹出层显示前
			beforeEnter(el){
				this.$emit('show',el);
			},
			//弹出层显示时
			enter(el){
				this.$emit('showing',el);
			},
			//弹出层显示后
			afterEnter(el){
				this.$emit('shown',el);
			},
			//弹出层隐藏前
			beforeLeave(el){
				this.$emit('hide',el);
			},
			//弹出层隐藏时
			leave(el){
				this.$emit('hidding',el);
			},
			//弹出层隐藏后
			afterLeave(el){
				this.$emit('hidden',el);
			}
		}
	}
</script>

<style lang="less" scoped >
	@import "../../css/mvi-basic.less";
	
	.mvi-number-keyboard{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		user-select: none;
		-webkit-user-select: none;
	}
	
	.mvi-number-keyboard-left{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		flex: 1;
	}
	
	.mvi-number-keyboard-left-number{
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: calc(~'1/3 * 100%');
		height: 1.2rem;
		border-top: 1px solid @border-color;
		border-right: 1px solid @border-color;
		margin: 0;
		padding: 0;
		font-weight: bold;
		cursor: pointer;
	}
	
	.mvi-number-keyboard-left-number.mvi-number-keyboard-number-zero{
		width: calc(~'2/3 * 100%');
	}
	
	.mvi-number-keyboard-left-number.mvi-number-keyboard-number-zero[data-decimal="false"]{
		width: 100%;
	}
	
	.mvi-number-keyboard-right{
		display: block;
		height: 100%;
		width: 2.1rem;
	}
	
	.mvi-number-keyboard-delete{
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height:2.4rem;
		background-color: @bg-color-dark;
		font-weight: bold;
		cursor: pointer;
		border-top: 1px solid @border-color;
	}
	
	.mvi-number-keyboard-complete{
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height:2.4rem;
		background-color: @primary-normal;
		color: #fff;
		font-weight: bold;
		cursor: pointer;
		border-top: 1px solid @border-color;
	}
	
	.mvi-number-keyboard-hide{
		height: 4.8rem;
	}
	
	.mvi-keyboard-enter,.mvi-keyboard-leave-to{
		transform: translateY(100%);
	}
	
	.mvi-number-keyboard-active:active::before{
		.mvi-active();
	}
	
	.mvi-number-keyboard-delete[disabled]::before,
	.mvi-number-keyboard-complete[disabled]::before{
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		background-color: #fff;
		opacity: .4;
		box-sizing: content-box;
		-webkit-box-sizing: content-box;
	}
</style>
