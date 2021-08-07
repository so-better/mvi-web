<template>
	<transition :name="box_animation" @after-enter="afterEnter" @after-leave="afterLeave">
		<div v-show="show" v-on="listeners" :class="msgBoxClass" v-html="msgBox_message" :style="msgBoxStyle"></div>
	</transition>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:'m-msgbox',
		data(){
			return {
				show:false,
				message:null,//提示文本
				animation:null,//动画效果
				timeout:null,//自动关闭的时间
				callback:null,//回调函数
				zIndex:null,//z-index值
				background:null,//背景色
				color:null//字体颜色
			}
		},
		computed:{
			msgBox_message(){
				if(typeof this.message == "string"){
					return this.message;
				}else if($util.isObject(this.message)){
					return JSON.stringify(this.message);
				}else {
					return String(this.message);
				}
			},
			msgBox_animation(){
				if(typeof this.animation == "string" && this.animation){
					return this.animation;
				}else{
					return 'fade';
				}
			},
			msgBox_timeout(){
				if($util.isNumber(this.timeout) && this.timeout > 0){
					return this.timeout;
				}else{
					return 1500;
				}
			},
			msgBox_callback(){
				if(typeof this.callback == "function"){
					return this.callback;
				}else{
					return function(){};
				}
			},
			msgBox_zIndex(){
				if($util.isNumber(this.zIndex)){
					return this.zIndex;
				}else{
					return 1100;
				}
			},
			msgBox_background(){
				if(typeof this.background == 'string' &&　this.background){
					return this.background;
				}else{
					return null;
				}
			},
			msgBox_color(){
				if(typeof this.color == 'string' &&　this.color){
					return this.color;
				}else{
					return null;
				}
			},
			box_animation(){
				return 'mvi-msgbox-'+this.msgBox_animation;
			},
			listeners(){
				return Object.assign({},this.$listeners);
			},
			msgBoxStyle(){
				let style = {};
				style.zIndex = this.msgBox_zIndex;
				if(this.msgBox_background){
					style.backgroundColor = this.msgBox_background;
				}
				if(this.msgBox_color){
					style.color = this.msgBox_color;
				}
				return style;
			},
			msgBoxClass(){
				let cls = ['mvi-msgbox'];
				if(this.animation == 'translate'){
					cls.push('mvi-msgbox-translate');
				}
				return cls;
			}
		},
		mounted() {
			this.show = true;
		},
		methods:{
			//完全显示后
			afterEnter(el){
				if(this.msgBox_timeout>0){
					setTimeout(()=>{
						this.show = false;
					},this.msgBox_timeout)
				}
			},
			//完全隐藏后
			afterLeave(el){
				this.$el.remove();
				this.msgBox_callback();
				this.$destroy();
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-msgbox{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		display: block;
		width: auto;
		height: auto;
		max-width: 90%;
		word-wrap: break-word;
		border-radius: @radius-default;
		overflow: hidden;
		border: none;
		text-align: center;
		font-size: @font-size-default;
		line-height: 1.5;
		padding: @mp-sm @mp-lg;
		background-color: rgba(0,0,0,.7);
		color: #fff;
		box-shadow: @boxshadow;
		-webkit-box-shadow: @boxshadow;
		
		&.mvi-msgbox-translate{
			top: auto;
			bottom: 0;
			transform: translate(-50%,calc(-50% - 3rem));
		}
	}
	
	//渐入效果
	.mvi-msgbox-fade-enter,.mvi-msgbox-fade-leave-to{
		opacity: 0;
	}
	.mvi-msgbox-fade-enter-active,.mvi-msgbox-fade-leave-active{
		transition: opacity 300ms;
		-ms-transition: opacity 300ms;
		-moz-transition: opacity 300ms;
		-webkit-transition: opacity 300ms;
	}
	
	//缩放效果
	.mvi-msgbox-scale-enter{
		opacity: 0;
		transform: translate3d(-50%,-50%,0) scale(0.5);
	}
	.mvi-msgbox-scale-leave-to{
		opacity: 0;
	}
	.mvi-msgbox-scale-enter-active,.mvi-msgbox-scale-leave-active{
		transition: transform 300ms,opacity 300ms;
		-ms-transition: transform 300ms,opacity 300ms;
		-moz-transition: transform 300ms,opacity 300ms;
		-webkit-transition:transform 300ms,opacity 300ms;
	}
	
	//平移效果
	.mvi-msgbox-translate-enter{
		opacity: 0;
		transform: translate(-50%,-50%) !important;
	}
	.mvi-msgbox-translate-enter-active{
		transition: transform 300ms,opacity 300ms;
		-ms-transition: transform 300ms,opacity 300ms;
		-moz-transition: transform 300ms,opacity 300ms;
		-webkit-transition:transform 300ms,opacity 300ms;
	}
	.mvi-msgbox-translate-leave-to{
		opacity: 0;
	}
	.mvi-msgbox-translate-leave-active{
		transition: opacity 300ms;
		-ms-transition: opacity 300ms;
		-moz-transition: opacity 300ms;
		-webkit-transition: opacity 300ms;
	}
</style>
