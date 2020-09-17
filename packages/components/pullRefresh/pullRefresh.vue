<template>
	<div class="mvi-pull-refresh" v-on="listeners">
		<div v-show="elShow" ref="refresh" :class="'mvi-pull-refresh-el'+(refresh?' mvi-pull-refresh-el-done':'')" :style="elStyle">
			<slot name="el" v-if="$scopedSlots.el" :status="status"></slot>
			<m-icon v-if="!$scopedSlots.el" :type="icon.type" :spin="icon.spin" />
			<span v-if="!$scopedSlots.el" class="mvi-pull-refresh-text" v-text="message"></span>
		</div>
		<div class="mvi-pull-refresh-body" :style="'height:'+(height?height:'')" ref="body" 
		@touchstart="startPull" @touchmove="onPull" @touchend="pulled" @mousedown="startPull2">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-pull-refresh",
		data(){
			return {
				elShow:true,//是否显示
				amount:0,//计数点
				amountMax:8,//计数点最大值
				startY:0,//垂直起点
				startY2:0,//第一次垂直起点
				status:0,//0表示还没触发下拉，1表示触发下拉了但是还没松手，2表示已经松手正在刷新，3表示刷新完成
				transformY:0,//垂直偏移距离
				hasTouch:false,//是否触摸了
				canTouch:false,//是否可以触摸
				mouseDown:false,//是否按下鼠标了
			}
		},
		model:{
			prop:'refresh',
			event:'model-change'
		},
		props:{
			pullingText:{//下拉文案
				type:String,
				default:'下拉刷新'
			},
			loosingText:{
				type:String,
				default:'释放刷新'
			},
			loadingText:{//刷新时显示的文本
				type:String,
				default:'正在刷新'
			},
			refresh:{//是否刷新
				type:Boolean,
				default:false
			},
			pullingIcon:{
				type:[String,Object],
				default:'arrow-down'
			},
			loosingIcon:{
				type:[String,Object],
				default:'arrow-up'
			},
			loadingIcon:{
				type:[String,Object],
				default:'load-e'
			},
			disabled:{
				type:Boolean,
				default:false
			},
			color:{
				type:String,
				default:null
			},
			pullingColor:{
				type:String,
				default:null
			},
			loosingColor:{
				type:String,
				default:null
			},
			loadingColor:{
				type:String,
				default:null
			},
			height:{
				type:String,
				default:null
			},
			zIndex:{
				type:Number,
				default:4000
			},
			distance:{//下拉触发刷新的距离值
				type:Number,
				default:1
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			elStyle(){
				var style = {};
				style.transform = 'translateY('+this.transformY+'px)';
				if(this.color){
					style.color = this.color;
				}
				if(this.pullingColor && this.status == 0){
					style.color = this.pullingColor;
				}else if(this.loosingColor && this.status == 1){
					style.color = this.loosingColor;
				}else if(this.loadingColor && this.status == 2){
					style.color = this.loadingColor;
				}
				if(this.zIndex){
					style.zIndex = this.zIndex;
				}
				return style;
			},
			icon(){
				if(this.status == 0){
					return {
						type:this.pullingIconType,
						spin:this.pullingIconSpin,
						url:this.pullingIconUrl
					}
				}else if(this.status == 1){
					return {
						type:this.loosingIconType,
						spin:this.loosingIconSpin,
						url:this.loosingIconUrl
					}
				}else if(this.status == 2){
					return {
						type:this.loadingIconType,
						spin:this.loadingIconSpin,
						url:this.loadingIconUrl
					}
				}
			},
			message(){
				if(this.status == 0){
					return this.pullingText;
				}else if(this.status == 1){
					return this.loosingText;
				}else if(this.status == 2){
					return this.loadingText;
				}
			},
			pullingIconType() {
				var t = null;
				if ($util.isObject(this.pullingIcon)) {
					if (typeof(this.pullingIcon.type) == "string") {
						t = this.pullingIcon.type;
					}
				} else if (typeof(this.pullingIcon) == "string") {
					t = this.pullingIcon;
				}
				return t;
			},
			pullingIconUrl() {
				var url = null;
				if ($util.isObject(this.pullingIcon)) {
					if (typeof(this.pullingIcon.url) == "string") {
						url = this.pullingIcon.url;
					}
				}
				return url;
			},
			pullingIconSpin() {
				var spin = false;
				if ($util.isObject(this.pullingIcon)) {
					if (typeof(this.pullingIcon.spin) == "boolean") {
						spin = this.pullingIcon.spin;
					}
				}
				return spin;
			},
			loosingIconType() {
				var t = null;
				if ($util.isObject(this.loosingIcon)) {
					if (typeof(this.loosingIcon.type) == "string") {
						t = this.loosingIcon.type;
					}
				} else if (typeof(this.loosingIcon) == "string") {
					t = this.loosingIcon;
				}
				return t;
			},
			loosingIconUrl() {
				var url = null;
				if ($util.isObject(this.loosingIcon)) {
					if (typeof(this.loosingIcon.url) == "string") {
						url = this.loosingIcon.url;
					}
				}
				return url;
			},
			loosingIconSpin() {
				var spin = false;
				if ($util.isObject(this.loosingIcon)) {
					if (typeof(this.loosingIcon.spin) == "boolean") {
						spin = this.loosingIcon.spin;
					}
				}
				return spin;
			},
			loadingIconType() {
				var t = null;
				if ($util.isObject(this.loadingIcon)) {
					if (typeof(this.loadingIcon.type) == "string") {
						t = this.loadingIcon.type;
					}
				} else if (typeof(this.loadingIcon) == "string") {
					t = this.loadingIcon;
				}
				return t;
			},
			loadingIconUrl() {
				var url = null;
				if ($util.isObject(this.loadingIcon)) {
					if (typeof(this.loadingIcon.url) == "string") {
						url = this.loadingIcon.url;
					}
				}
				return url;
			},
			loadingIconSpin() {
				var spin = true;
				if ($util.isObject(this.loadingIcon)) {
					if (typeof(this.loadingIcon.spin) == "boolean") {
						spin = this.loadingIcon.spin;
					}
				}
				return spin;
			},
		},
		mounted() {
			this.statusInit();
			document.body.addEventListener('mousemove',this.onPull2);
			document.body.addEventListener('mouseup',this.pulled2);
		},
		watch:{
			refresh(newValue){
				this.changeStatus();
			}
		},
		methods:{
			//开始下拉(移动端)
			startPull(event){
				if(this.canTouch && !this.disabled){
					this.hasTouch = true;
					this.startY = event.touches[0].pageY;//元素按下时的位置
					this.startY2 = this.startY;//元素按下的位置，此数值不会变更
				}
			},
			//开始下拉(PC端)
			startPull2(event){
				if(this.canTouch && !this.disabled){
					this.hasTouch = true;
					this.mouseDown = true;
					this.startY = event.pageY;//元素按下时的位置
					this.startY2 = this.startY;//元素按下的位置，此数值不会变更
				}
			},
			//下拉过程(移动端)
			onPull(event){
				if(!this.canTouch || this.disabled){
					return;
				}
				//不在元素顶部时禁止
				if($util.getScrollTop(this.$refs.body) != 0){
					this.startY = event.touches[0].pageY;
					this.startY2 = this.startY;
					return;
				}
				var endY = event.touches[0].pageY;
				var move = endY - this.startY;//每一次移动的偏移量
				var move2 = endY - this.startY2;//距离第一次触摸时的偏移量
				this.startY = endY;
				//总偏移量小于0位向上滑动，是禁止的
				if(move2 < 0){
					return;
				}
				
				if(event.cancelable){
					event.preventDefault();
				}
				
				if($util.getScrollTop(this.$refs.body) == 0 && move2>0){
					this.elShow = true;
				}
				//当计数小于最大计数量时，每次移动计数+1
				if(this.amount < this.amountMax){
					this.amount++;
				}
				//元素移动距离
				var y = this.transformY + move/this.amount;
				
				//如果移动距离大于distance指定的距离，则变为可释放状态
				if(y > $util.rem2px(this.distance)){
					this.status = 1;
				}else{
					this.status = 0;
				}
				//改变元素位置
				this.transformY = y;
			},
			//下拉过程(PC端)
			onPull2(event){
				if(!this.canTouch || this.disabled){
					return;
				}
				if(!this.mouseDown){
					return;
				}
				//不在元素顶部时禁止
				if($util.getScrollTop(this.$refs.body) != 0){
					return;
				}
				var endY = event.pageY;
				var move = endY - this.startY;//每一次移动的偏移量
				var move2 = endY - this.startY2;//距离第一次触摸时的偏移量
				this.startY = endY;
				
				//总偏移量小于0位向上滑动，是禁止的
				if(move2 < 0){
					return;
				}
				
				if(event.cancelable){
					event.preventDefault();
				}
				
				if($util.getScrollTop(this.$refs.body) == 0 && move2>0){
					this.elShow = true;
				}
				//当计数小于最大计数量时，每次移动计数+1
				if(this.amount < this.amountMax){
					this.amount++;
				}
				//元素移动距离
				var y = this.transformY + move/this.amount;
				
				//如果移动距离大于distance指定的距离，则变为可释放状态
				if(y > $util.rem2px(this.distance)){
					this.status = 1;
				}else{
					this.status = 0;
				}
				//改变元素位置
				this.transformY = y;
			},
			//下拉结束释放(移动端)
			pulled(event){
				if(!this.canTouch || this.disabled){
					return;
				}
				//当下拉结束时，判断状态是否为释放可加载状态，如果是，则更改refresh值，变为加载状态
				if(this.status == 1 && this.refresh == false){
					this.$emit('model-change',true);
					this.$emit('update:refresh',true);
				}else if(this.status != 1 && this.refresh == true){
					this.$emit('model-change',false);
					this.$emit('update:refresh',false);
				}else {
					this.changeStatus();
				}
			},
			//下拉结束释放(PC端)
			pulled2(event){
				if(!this.canTouch || this.disabled){
					return;
				}
				if(!this.mouseDown){
					return;
				}
				this.mouseDown = false;
				//当下拉结束时，判断状态是否为释放可加载状态，如果是，则更改refresh值，变为加载状态
				if(this.status == 1 && this.refresh == false){
					this.$emit('model-change',true);
					this.$emit('update:refresh',true);
				}else if(this.status != 1 && this.refresh == true){
					this.$emit('model-change',false);
					this.$emit('update:refresh',false);
				}else {
					this.changeStatus();
				}
			},
			//根据refresh的值改变状态
			changeStatus(){
				if(this.disabled){
					return;
				}
				if(this.refresh){//refresh值为true时状态变为加载状态
					this.status = 2;
					this.canTouch = false;
					this.$emit('refresh');
					if(!this.hasTouch){//非触摸下拉的
						this.elShow = true;
						this.$refs.refresh.style.transition = 'all 300ms';
						this.$refs.refresh.style.webkitTransition = 'all 300ms';
						this.$nextTick(()=>{
							setTimeout(()=> {
								this.transformY = $util.rem2px(this.distance);
								setTimeout(()=>{
									this.$refs.refresh.style.transition = '';
									this.$refs.refresh.style.webkitTransition = '';
								},300)
							}, 10);
						})
					}
				}else{//refresh值为false时状态变为下拉前状态，数据恢复初始化
					this.amount = 0;
					this.amountMax = 4;
					this.startY = 0;
					this.startY2 = 0;
					this.hasTouch = false;
					this.$refs.refresh.style.transition = 'all 300ms';
					this.$refs.refresh.style.webkitTransition = 'all 300ms';
					setTimeout(()=> {
						this.transformY = -this.$refs.refresh.offsetHeight;
						setTimeout(()=>{
							this.$refs.refresh.style.transition = '';
							this.$refs.refresh.style.webkitTransition = '';
							this.status = 0;
							this.elShow = false;
							this.canTouch = true;
						},300)
					}, 10);
				}
			},
			//初始化
			statusInit(){
				this.amount = 0;
				this.amountMax = 4;
				this.startY = 0;
				this.startY2 = 0;
				this.hasTouch = false;
				this.transformY = -this.$refs.refresh.offsetHeight;
				this.status = 0;
				this.elShow = false;
				this.canTouch = true;
			}
		},
		beforeDestroy() {
			document.body.removeEventListener('mousemove',this.onPull2);
			document.body.removeEventListener('mouseup',this.pulled2);
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-pull-refresh{
		display: block;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.mvi-pull-refresh-el{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		color: @font-color-mute;
		position: absolute;
		width: 100%;
		top:0;
		left: 0;
	}
	
	.mvi-pull-refresh-text{
		margin-left: @mp-xs;
	}
	
	.mvi-pull-refresh-body{
		width: 100%;
		overflow: auto;
		overflow-x: hidden;
	}
</style>
