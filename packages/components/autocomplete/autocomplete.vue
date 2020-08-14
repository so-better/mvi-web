<template>
	<div :data-id="'mvi-autocomplete-'+_uid" :class="autocompleteClass" :style="autocompleteStyle" :disabled="disabled">
		<m-icon v-if="leftIconType ||　leftIconUrl" :type="leftIconType" :url="leftIconUrl" :spin="leftIconSpin" 
		class="mvi-autocomplete-left-icon" @click="leftClick"/>
		<input v-on="listeners" @input="input" :value="value" type="text" :placeholder="placeholder" :class="targetClass" :name="name"
		:data-id="'mvi-autocomplete-target-'+_uid" ref="target" @focus="inputFocus" :disabled="disabled" autocomplete="off"/>
		<m-icon @click="doClear" v-if="clearable" v-show="showClearIcon" :class="clearClass" type="times-o" />
		<m-icon class="mvi-autocomplete-right-icon" :type="rightIconType" :url="rightIconUrl" :spin="rightIconSpin" 
		v-if="rightIconType ||　rightIconUrl" @click="rightClick" />
		<transition name="mvi-autocomplete">
			<m-layer v-show="focus && computedFilter.length!=0" :target="`[data-id='mvi-autocomplete-target-${_uid}']`" :root="`[data-id='mvi-autocomplete-${_uid}']`" 
			:placement="placement" :offset="offset" :fixed="fixed" class="mvi-autocomplete-menu" :z-index="zIndex" ref="layer"
			:style="layerStyle">
				<div class="mvi-autocomplete-list" v-for="(item,index) in computedFilter" :key="'mvi-autocomplete-list-'+index" v-text="item"
				@click="doSelect(item)" @mouseenter="listEnter" @mouseleave="listLeave"></div>
			</m-layer>
		</transition>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:'m-autocomplete',
		data(){
			return {
				focus:false,
				target:null
			}
		},
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			value:{//输入框的值
				type:[String,Number],
				default:''
			},
			placeholder:{//占位符
				type:String,
				default:''
			},
			size:{//组件大小
				type:String,
				default:'medium',
				validator(value){
					return ['medium','large'].includes(value)
				}
			},
			list:{//可选值数组
				type:Array,
				default:function(){
					return [];
				}
			},
			activeType:{//激活样式
				type:String,
				default:'info',
				validator(value){
					return ['info','success','warn','error','primary'].includes(value)
				}
			},
			activeColor:{//激活颜色
				type:String,
				default:null
			},
			filterMethod:{//过滤方法
				type:[Function,Boolean],
				default:false
			},
			clearable:{//是否启用清除图标
				type:Boolean,
				default:false
			},
			disabled:{//是否禁用
				type:Boolean,
				default:false
			},
			placement:{//layer位置
				type:String,
				default:'bottom-start'
			},
			fixed:{//layer的fixed
				type:Boolean,
				default:false
			},
			width:{//layer的width
				type:String,
				default:null
			},
			zIndex:{//layer的z-index
				type:Number,
				default:400
			},
			height:{//layer最大高度
				type:String,
				default:null
			},
			offset:{//layer的offset
				type:String,
				default:'0.1rem'
			},
			name:{//原生name
				type:String,
				default:null
			},
			hoverClass:{//layer层列表悬浮样式
				type:String,
				default:null
			},
			leftIcon:{//左侧图标
				type:[String,Object],
				default:null
			},
			rightIcon:{//右侧图标
				type:[String,Object],
				default:null
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			leftIconType() {
				var t = null;
				if ($util.isObject(this.leftIcon)) {
					if (typeof(this.leftIcon.type) == "string") {
						t = this.leftIcon.type;
					}
				} else if (typeof(this.leftIcon) == "string") {
					t = this.leftIcon;
				}
				return t;
			},
			leftIconUrl() {
				var url = null;
				if ($util.isObject(this.leftIcon)) {
					if (typeof(this.leftIcon.url) == "string") {
						url = this.leftIcon.url;
					}
				}
				return url;
			},
			leftIconSpin() {
				var spin = false;
				if ($util.isObject(this.leftIcon)) {
					if (typeof(this.leftIcon.spin) == "boolean") {
						spin = this.leftIcon.spin;
					}
				}
				return spin;
			},
			rightIconType() {
				var t = null;
				if ($util.isObject(this.rightIcon)) {
					if (typeof(this.rightIcon.type) == "string") {
						t = this.rightIcon.type;
					}
				} else if (typeof(this.rightIcon) == "string") {
					t = this.rightIcon;
				}
				return t;
			},
			rightIconUrl() {
				var url = null;
				if ($util.isObject(this.rightIcon)) {
					if (typeof(this.rightIcon.url) == "string") {
						url = this.rightIcon.url;
					}
				}
				return url;
			},
			rightIconSpin() {
				var spin = false;
				if ($util.isObject(this.rightIcon)) {
					if (typeof(this.rightIcon.spin) == "boolean") {
						spin = this.rightIcon.spin;
					}
				}
				return spin;
			},
			showClearIcon(){
				if(this.value &&　this.focus){
					return true;
				}else{
					return false;
				}
			},
			layerStyle(){
				var style = {};
				if(this.height){
					style.maxHeight = this.height;
				}
				if(this.width){
					style.width = this.width;
				}else if(this.target){
					style.width = this.$refs.target.offsetWidth + 'px';
				}
				return style;
			},
			computedFilter(){
				if(typeof(this.filterMethod) == 'function'){
					return this.filterMethod(this.value,this.list);
				}else if(this.filterMethod){
					return this.defaultFilter();
				}else{
					return this.list;
				}
			},
			targetClass(){
				var cls = '';
				if(this.clearable){
					if(this.rightIconType ||　this.rightIconUrl){
						cls += ' mvi-autocomplete-right2';
					}else{
						cls += ' mvi-autocomplete-right';
					}
				}else{
					if(this.rightIconType ||　this.rightIconUrl){
						cls += ' mvi-autocomplete-right';
					}
				}
				if(this.leftIconType || this.leftIconUrl){
					cls += ' mvi-autocomplete-left';
				}
				return cls;
			},
			autocompleteClass(){
				var cls = 'mvi-autocomplete mvi-autocomplete-'+this.size;
				if(this.activeType && !this.activeColor && this.focus){
					cls += ' mvi-autocomplete-'+this.activeType;
				}
				return cls;
			},
			autocompleteStyle(){
				var style = {};
				if(this.activeColor && this.focus){
					style.borderColor = this.activeColor;
				}
				return style;
			},
			clearClass(){
				var cls = 'mvi-autocomplete-clear';
				if(this.rightIconType || this.rightIconUrl){
					cls += ' mvi-autocomplete-clear2';
				}
				return cls;
			}
		},
		mounted() {
			this.target = this.$refs.target;
			window.addEventListener('click',this.hideForWindow);
		},
		methods:{
			rightClick(e){
				if(this.disabled){
					return;
				}
				this.$emit('right-click',e)
			},
			leftClick(e){
				if(this.disabled){
					return;
				}
				this.$emit('left-click',e)
			},
			listEnter(e){
				if(this.hoverClass){
					$util.addClass(e.currentTarget,this.hoverClass);
				}
			},
			listLeave(e){
				if(this.hoverClass){
					$util.removeClass(e.currentTarget,this.hoverClass);
				}
			},
			input(event){
				if(this.disabled){
					return;
				}
				this.focus = true;
				this.$nextTick(()=>{
					this.$refs.layer.reset();
				})
				this.$emit('model-change',event.currentTarget.value);
				this.$emit('update:value',event.currentTarget.value)
			},
			inputFocus(){
				if(this.disabled){
					return;
				}
				this.focus = true;
				this.$nextTick(()=>{
					this.$refs.layer.reset();
				})
			},
			doClear(){
				if(this.disabled){
					return;
				}
				this.$emit('model-change','');
				this.$emit('update:value','')
				event.currentTarget.value = '';
				this.$nextTick(()=>{
					this.$refs.target.focus();
				})
			},
			hideForWindow(event){
				if($util.isContains(this.$el,event.target)){
					return;
				}
				this.focus = false;
			},
			doSelect(item){
				this.$emit('model-change',item);
				this.$emit('update:value',item);
				this.focus = false;
			},
			//默认过滤方法
			defaultFilter(){
				var arr = [];
				var length = this.list.length;
				for(var i = 0;i<length;i++){
					if(this.list[i].includes(this.value)){
						arr.push(this.list[i]);
					}
				}
				return arr;
			}
		},
		beforeDestroy(){
			window.removeEventListener('click',this.hideForWindow);
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-autocomplete{
		display: block;
		width: 100%;
		border-radius: @radius-default;
		color: @font-color-default;
		position: relative;
		border: 1px solid @border-color;
		background-color: #fff;
		transition: border-color 600ms;
		-webkit-transition: border-color 600ms;
		-ms-transition: border-color 600ms;
		-moz-transition: border-color 600ms;
		
		&.mvi-autocomplete-info{
			border-color: @info-normal;
		}
		&.mvi-autocomplete-success{
			border-color: @success-normal;
		}
		&.mvi-autocomplete-primary{
			border-color: @primary-normal;
		}
		&.mvi-autocomplete-warn{
			border-color: @warn-normal;
		}
		&.mvi-autocomplete-error{
			border-color: @error-normal;
		}
		
		input{
			display: block;
			width: 100%;
			margin: 0;
			padding: 0;
			border: none;
			border-radius: inherit;
			background-color: inherit;
			color: inherit;
			font-size: inherit;
			vertical-align: middle;
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
		
		//输入框大小
		&.mvi-autocomplete-medium>input{
			height: @medium-height;
			font-size: @font-size-default;
			padding: 0 @mp-sm;
			
			&.mvi-autocomplete-right{
				padding-right: @mp-md*2;
			}
			&.mvi-autocomplete-right2{
				padding-right: @mp-md*4;
			}
			&.mvi-autocomplete-left{
				padding-left: @mp-md*2;
			}
		}
		&.mvi-autocomplete-large>input{
			height: @large-height;
			font-size: @font-size-h6;
			padding: 0 @mp-md;
			
			&.mvi-autocomplete-right{
				padding-right: @mp-lg*2;
			}
			&.mvi-autocomplete-right2{
				padding-right: @mp-lg*4;
			}
			&.mvi-autocomplete-left{
				padding-left: @mp-lg*2;
			}
		}
		
		//左侧图标
		.mvi-autocomplete-left-icon{
			position: absolute;
			top: 50%;
			left: @mp-sm;
			transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			cursor: pointer;
		}
		
		//右侧图标
		.mvi-autocomplete-right-icon{
			position: absolute;
			top: 50%;
			right: @mp-sm;
			transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			cursor: pointer;
		}
		
		//清除图标
		.mvi-autocomplete-clear{
			position: absolute;
			top: 50%;
			right: @mp-sm;
			transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			opacity: .5;
			cursor: pointer;
		}
		
		&.mvi-autocomplete-medium>.mvi-autocomplete-clear,
		&.mvi-autocomplete-mdeium>.mvi-autocomplete-left-icon,
		&.mvi-autocomplete-mdeium>.mvi-autocomplete-right-icon{
			font-size: @font-size-default;
		}
		
		&.mvi-autocomplete-large>.mvi-autocomplete-clear,
		&.mvi-autocomplete-large>.mvi-autocomplete-left-icon,
		&.mvi-autocomplete-large>.mvi-autocomplete-right-icon{
			font-size: @font-size-h6;
		}
		
		&.mvi-autocomplete-medium .mvi-autocomplete-clear2{
			right: @mp-md*2+@mp-sm;
		}
		
		&.mvi-autocomplete-large .mvi-autocomplete-clear2{
			right: @mp-lg*2+@mp-sm;
		}
	
		&[disabled]{
			opacity: .6;
		}
	}
	
	.mvi-autocomplete-enter-active,.mvi-autocomplete-leave-active{
		transition: transform 200ms,opacity 200ms;
		-webkit-transition: transform 200ms,opacity 200ms;
		-moz-transition: transform 200ms,opacity 200ms;
		-ms-transition: transform 200ms,opacity 200ms;
	}
	
	.mvi-autocomplete-enter,.mvi-autocomplete-leave-to{
		transform: translateY(0.4rem);
		opacity: 0;
	}
	
	//悬浮层
	.mvi-autocomplete-menu{
		display: block;
		background-color: inherit;
		color: inherit;
		padding: @mp-xs 0;
		border-radius: @radius-default;
		border: 1px solid rgba(0,0,0,.1);
		box-shadow: 0 0.04rem 0.24rem 0 rgba(0,0,0,.1);
		overflow: auto;
		overflow-x: hidden;
		
		.mvi-autocomplete-list{
			padding: @mp-sm;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.mvi-autocomplete-list:hover{
			cursor: pointer;
			background-color: @bg-color-default;
		}
	}
</style>
