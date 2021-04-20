<template>
	<m-overlay class="mvi-toast-overlay" @hidden="toastHidden" :show="show" :use-padding="toastUsePadding"
	:zIndex="toastZIndex" :local="toastLocal" fade>
		<div :class="['mvi-toast',toastMessage?'':'mvi-toast-iconless']" :style="toastStyle" v-on="listeners">
			<div class="mvi-toast-icon">
				<m-loading :color="toastColor?toastColor:'#fff'" v-if="toastType=='loading' && (!toastIcon.type && !toastIcon.url)" :type="0" :size="toastIcon.size"/>
				<m-icon v-else :type="toastIcon.type" :url="toastIcon.url" :spin="toastIcon.spin" :size="toastIcon.size" />
			</div>
			<div v-if="toastMessage" class="mvi-toast-message" v-html="toastMessage"></div>
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
				message:null,//显示文本
				timeout:null,//弹窗自动关闭的时间，默认不自动关闭
				background:null,//弹窗背景色
				color:null,//弹窗字体颜色
				zIndex:null,//z-index
				callback:null,//回调函数
				local:null,//是否局部
				usePadding:null,//是否考虑右内边距
				icon:null,//自定义显示的图标
				size:null,//图标大小
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
				//默认图标
				let icon = {
					type:this.defaultIconType,
					url:null,
					spin:false,
					size:'0.72rem'
				}
				if(typeof this.icon == 'string' && this.icon){
					icon.type = this.icon;
				} else if($util.isObject(this.icon)){
					if(typeof this.icon.type == 'string' && this.icon.type){
						icon.type = this.icon.type;
					}
					if(typeof this.icon.url == 'string' && this.icon.url){
						icon.url = this.icon.url;
					}
					if(typeof this.icon.spin == 'boolean'){
						icon.spin = this.icon.spin;
					}
					if(typeof this.icon.size == 'string' && this.icon.size){
						icon.size = this.icon.size;
					}
				}
				return icon;
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
			},
			defaultIconType(){
				if(this.toastType == 'success'){
					return "success";
				}else if(this.toastType == 'error'){
					return "error-o";
				}else if(this.toastType == 'info'){
					return "info-o";
				}else if(this.toastType == 'loading'){
					return null;
				}
			},
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
	
	.mvi-toast-overlay{
		background-color: rgba(0,10,20,.05);
	}
	
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
		min-width: 3rem;
		max-width: 90%;
		margin: 0;
		padding: @mp-md;
		border-radius: @radius-default;
		box-shadow: @boxshadow;
		-webkit-box-shadow: @boxshadow;
		background-color: rgba(0,0,0,.85);
		word-break: keep-all;
		word-wrap: break-word;
		color: #fff;
		
		&.mvi-toast-iconless{
			justify-content: center;
			align-items: center;
			padding: 0;
			width: 2.4rem;
			min-width: 2.4rem;
			max-width: 2.4rem;
			height: 1.8rem;
		}
	}
	
	.mvi-toast-icon{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	
	.mvi-toast-message{
		display: block;
		width: 100%;
		text-align: center;
		font-size: @font-size-default;
		margin-top: @mp-sm;
	}
</style>
