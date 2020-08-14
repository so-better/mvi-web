<template>
	<m-overlay color="rgba(10,20,30,.2)" @hidden="toastHidden" :show="show" :use-padding="toastUsePadding"
	:zIndex="toastZIndex" :local="toastLocal">
		<div class="mvi-toast" :style="toastStyle" v-on="listeners">
			<div v-if="toastIcon" class="mvi-toast-icon" :style="'margin-bottom:'+(toastMessage?'':'0')">
				<m-loading v-if="toastType=='loading'" :type="0" :size="loadingSize"/>
				<m-icon v-else :type="iconType" class="mvi-toast-icon-icon" />
			</div>
			<div v-if="toastMessage" class="mvi-toast-message" v-html="toastMessage"
			:style="'margin-top:'+(toastIcon?'':'0')"></div>
		</div>
	</m-overlay>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-toast",
		data(){
			return {
				show:false,
				amounts:0,//计数
				timers:[],//计时器
				typeArray:['success','error','loading','info'],
				type:null,//弹窗类型，取值为success/error/loading/info
				icon:null,//是否显示图标,style不同，则显示的图标不同，默认为true，即显示图标，如果不显示图标，那么style将无意义
				message:null,//显示文本
				timeout:null,//弹窗自动关闭的时间，默认不自动关闭
				background:null,//弹窗背景色
				color:null,//弹窗字体颜色
				zIndex:null,//z-index
				callback:null,//回调函数
				local:null,//是否局部
				usePadding:null,//是否考虑右内边距
				loadingSize:"0.6rem"
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners);
			},
			toastUsePadding(){
				if(typeof(this.usePadding) == 'boolean'){
					return this.usePadding;
				}else{
					return false;
				}
			},
			toastType(){
				if(this.typeArray.includes(this.type)){
					return this.type;
				}else{
					return "info";
				}
			},
			toastIcon(){
				if(typeof(this.icon) == "boolean"){
					return this.icon;
				}else{
					return true;
				}
			},
			toastMessage(){
				if(typeof(this.message) == "string"){
					return this.message;
				}else if($util.isObject(this.message)){
					return JSON.stringify(this.message);
				}else if($util.isNumber(this.message)){
					return this.message.toString();
				}else if(this.message){
					return String(this.message);
				}else{
					return '';
				}
			},
			toastTimeout(){
				if($util.isNumber(this.timeout) && this.timeout>0){
					return this.timeout;
				}else{
					return -1;
				}
			},
			toastCallback(){
				if(typeof(this.callback) == "function"){
					return this.callback;
				}else{
					return function(){};
				}
			},
			iconType(){
				if(this.toastType == 'success'){
					return "success-o-alt";
				}else if(this.toastType == 'error'){
					return "error-o-alt";
				}else if(this.toastType == 'info'){
					return "info-o-alt";
				}
			},
			toastZIndex(){
				if($util.isNumber(this.zIndex)){
					return this.zIndex;
				}else{
					return 1100;
				}
			},
			toastLocal(){
				if((typeof(this.local) == 'string' && this.local) || $util.isElement(this.local)){
					return true;
				}else{
					return false;
				}
			},
			toastBackground(){
				if(typeof(this.background) == 'string' && this.background){
					return this.background;
				}else{
					return null;
				}
			},
			toastColor(){
				if(typeof(this.color) == 'string' && this.color){
					return this.color;
				}else{
					return null;
				}
			},	
			toastStyle(){
				var style = {};
				style.zIndex = this.toastZIndex;
				if(this.toastBackground){
					style.backgroundColor = this.toastBackground;
				}
				if(this.toastColor){
					style.color = this.toastColor;
				}
				return style;
			}
		},
		watch:{
			amounts(newValue){
				if(this.toastTimeout>0){
					var timer = setTimeout(()=>{
						this.show = false;
					},this.toastTimeout)
					this.timers.push(timer);
				}
			}
		},
		methods:{
			//toast完全关闭后触发的方法
			toastHidden(){
				this.$el.remove();//移除元素
				this.clearTimer();
				this.toastCallback();//回调
			},
			//清除所有的计时器
			clearTimer(){
				this.timers.forEach(function(item){
					clearTimeout(item);
				})
				this.timers = [];
			}
		}
		
	}
</script>

<style scoped lang="less">	
	@import "../../css/mvi-basic.less";
	
	.mvi-toast{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: column;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		min-width: 2.2rem;
		max-width: 90%;
		margin: 0;
		padding: @mp-md @mp-md*2;
		border-radius: @radius-default;
		box-shadow: @boxshadow-light;
		-webkit-box-shadow: @boxshadow-light;
		background-color: rgba(0,0,0,.7);
		word-break: keep-all;
		word-wrap: break-word;
		color: #fff;
	}
	
	.mvi-toast.mvi-toast-noMessage{
		padding:@mp-sm*2; 
	}
	
	.mvi-toast-icon{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	
	.mvi-toast-message{
		width: 100%;
		text-align: center;
		font-size: @font-size-default;
		margin-top: @mp-md;
	}
	
	.mvi-toast-icon-icon{
		font-size:@font-size-h1;
	}
	
	.mvi-fade-enter,.mvi-fade-leave-to{
		opacity: 0;
	}
</style>
