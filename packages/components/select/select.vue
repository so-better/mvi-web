<template>
	<div :data-id="'mvi-select-'+_uid" v-on="listeners" :class="selectClass" :disabled="disabled">
		<div :data-id="'mvi-select-target-'+_uid" :class="targetClass" :style="targetStyle"
		ref="target" @click="trigger" :disabled="disabled">
			<span class="mvi-select-label" :data-placeholder="placeholder" v-text="selectLabel"></span>
			<!-- 下拉图标 -->
			<m-icon :class="iconClass" :type="icon" :style="iconStyle" />
		</div>
		<transition name="mvi-select">
			<m-layer v-show="focus" :target="`[data-id='mvi-select-target-${_uid}']`" :root="`[data-id='mvi-select-${_uid}']`" :placement="placement"
			:offset="offset" :fixed="fixed" class="mvi-select-menu" :data-placement="placement" :style="layerStyle" :z-index="zIndex" ref="layer">
				<slot></slot>
			</m-layer>
		</transition>
		<input type="hidden" :value="value" :name="name" />
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:'m-select',
		model:{
			prop:'value',
			event:'model-change'
		},
		data(){
			return {
				focus:false,//是否点击达到了获取焦点效果
				target:null,
				children:[],//存放option组件
			}
		},
		props:{
			value:{//选择的值
				type:[String,Number],
				default:null
			},
			placeholder:{//占位符
				type:String,
				default:''
			},
			size:{//尺寸
				type:String,
				default:'medium',
				validator(value){
					return ['small','medium','large'].includes(value)
				}
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
			offset:{//layer的offset
				type:String,
				default:'0.1rem'
			},
			activeType:{//输入框激活样式
				type:String,
				default:'info',
				validator(value){
					return ['info','success','warn','primary','error'].includes(value)
				}
			},
			activeColor:{//输入框激活颜色
				type:String,
				default:null
			},
			disabled:{//是否禁用
				type:Boolean,
				default:false
			},
			height:{//layer最大高度
				type:String,
				default:null
			},
			icon:{//下拉图标
				type:String,
				default:'caret-down'
			},
			iconColor:{//下拉图标的颜色
				type:String,
				default:null
			},
			name:{//原生name属性
				type:String,
				default:null
			},
			hoverClass:{//layer层列表悬浮样式
				type:String,
				default:null
			},
			round:{//是否圆角
				type:Boolean,
				default:false
			},
			square:{//是否方形
				type:Boolean,
				default:false
			}
		},
		provide(){
			return {
				select:this
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			layerStyle(){
				var style = {};
				if(this.width){
					style.width = this.width;
				}else if(this.target){
					style.width = this.$refs.target.offsetWidth + 'px';
				}
				if(this.height){
					style.maxHeight = this.height;
				}
				return style;
			},
			selectClass(){
				var cls = 'mvi-select mvi-select-'+this.size;
				if(this.round){
					cls += ' mvi-select-round'
				}else if(this.square){
					cls += ' mvi-select-square'
				}
				return cls;
			},
			targetClass(){
				var cls = 'mvi-select-target';
				if(this.activeType && !this.activeColor && this.focus){
					cls += ' mvi-select-'+this.activeType;
				}
				return cls;
			},
			targetStyle(){
				var style = {};
				if(this.activeColor && this.focus){
					style.borderColor = this.activeColor;
				}
				return style;
			},
			selectLabel(){
				for(var i = 0;i<this.children.length;i++){
					if(this.children[i].value === this.value){
						return this.children[i].label;
					}
				}
				return '';
			},
			iconClass(){
				var cls = 'mvi-select-icon';
				if(this.focus){
					cls += ' mvi-select-active';
				}
				return cls;
			},
			iconStyle(){
				var style = {};
				if(this.iconColor){
					style.color = this.iconColor;
				}
				return style;
			}
		},
		mounted() {
			this.target = this.$refs.target;
			window.addEventListener('click',this.hideForWindow);
		},
		methods:{
			trigger(){
				if(this.disabled){
					return;
				}
				this.focus = !this.focus;
				if(this.focus){
					this.$nextTick(()=>{
						this.$refs.layer.reset();
					})
				}
			},
			hideForWindow(event){
				if($util.isContains(this.$el,event.target)){
					return;
				}
				this.focus = false;
			}
		},
		beforeDestroy() {
			window.removeEventListener('click',this.hideForWindow)
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	.mvi-select{
		display: block;
		width: 100%;
		position: relative;
		font-family: @font-family;
		color: @font-color-default;
		border-radius: @radius-default;
		background-color: #fff;

		//大小
		&.mvi-select-small{
			
			.mvi-select-target{
				height: @small-height;
				font-size: @font-size-small;
				padding: 0 @mp-sm*3 0 @mp-sm;
			}
			
			.mvi-select-icon{
				right: @mp-sm;
				font-size: @font-size-small;
			}
		}
		
		&.mvi-select-medium{
			
			.mvi-select-target{
				height: @medium-height;
				font-size: @font-size-default;
				padding: 0 @mp-md*3 0 @mp-md;
			}
			
			.mvi-select-icon{
				right: @mp-md;
				font-size: @font-size-default;
			}
		}
		
		&.mvi-select-large{
			
			.mvi-select-target{
				height: @large-height;
				font-size: @font-size-h6;
				padding: 0 @mp-lg*3 0 @mp-lg;
			}
			
			.mvi-select-icon{
				right: @mp-lg;
				font-size: @font-size-h6;
			}
		}
		
		&.mvi-select-round{
			border-radius: @radius-round;
		}
		
		.mvi-select-square{
			border-radius: 0;
		}
		
		&[disabled]{
			opacity: .6;
		}
	}
	
	.mvi-select-target{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		width: 100%;
		background-color:inherit;
		border: 1px solid @border-color;
		border-radius: inherit;
		transition: border-color 600ms;
		-webkit-transition: border-color 600ms;
		-ms-transition: border-color 600ms;
		-moz-transition: border-color 600ms;
		cursor: pointer;
		color: inherit;
		
		//输入框样式
		&.mvi-select-info{
			border-color: @info-normal;
		}
		&.mvi-select-success{
			border-color: @success-normal;
		}
		&.mvi-select-primary{
			border-color: @primary-normal;
		}
		&.mvi-select-warn{
			border-color: @warn-normal;
		}
		&.mvi-select-error{
			border-color: @error-normal;
		}
		
		&[disabled]{
			background-color: inherit;
			color: inherit;
		}
	}
	
	.mvi-select-label{
		position: relative;
		vertical-align: middle;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.mvi-select-icon{
		position: absolute;
		top: auto;
		color: inherit;
		opacity: .6;
		transition: transform 200ms;
		-ms-transition: transform 200ms;
		-webkit-transition: transform 200ms;
		-moz-transition: transform 200ms;
		
		&.mvi-select-active{
			transform: rotate(180deg);
		}
	}

	
	//placeholder样式
	.mvi-select-label:empty::before{
		position: relative;
		content: attr(data-placeholder);
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		opacity: .5;
		vertical-align: middle;
	}

	.mvi-select-menu{
		display: block;
		background-color: inherit;
		color: inherit;
		padding: 0;
		border-radius: @radius-default;
		border: 1px solid rgba(0,0,0,.1);
		box-shadow: 0 0.04rem 0.24rem 0 rgba(0,0,0,.1);
		overflow: auto;
		overflow-x: hidden;
		padding: @mp-xs 0;
	}
	
	.mvi-select-enter-active,.mvi-select-leave-active{
		transition: transform 200ms,opacity 200ms;
		-webkit-transition: transform 200ms,opacity 200ms;
		-moz-transition: transform 200ms,opacity 200ms;
		-ms-transition: transform 200ms,opacity 200ms;
	}
	
	.mvi-select-enter,.mvi-select-leave-to{
		transform: translateY(0.4rem);
		opacity: 0;
	}
</style>
