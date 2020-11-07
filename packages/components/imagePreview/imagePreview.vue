<template>
	<m-overlay :show="show" v-on="listeners" color="#000" :fade="false" @showing="overlayShowing" :local="local" :z-index="zIndex"
	 :use-padding="usePadding">
		<m-swiper v-if="firstShow" class="mvi-image-preview-swiper" :initial-slide="active" show-indicators ref="swiper"
		 width="100%" height="100%" @change="swiperChange" @mousedown="mouseDown" @mouseup="mouseUp" :show-control="showControl"
		 :fade="fade" :touchable="!isDoubleTouch" :control-class="controlClass" @wheel="wheelImage" @touchstart="prviewTouchStart"
		 @touchmove="previewTouchMove" @touchend="previewTouchend">
			<m-swiper-slide v-for="(item,index) in images" :key="'image-'+index">
				<div class="mvi-image-preview-container" ref="previews">
					<m-image @click="closeOverlay" class="mvi-image-preview" :src="item" fit="response" ref="images"></m-image>
				</div>
			</m-swiper-slide>
			<template v-slot:indicators="data">
				<div class="mvi-image-preview-page" v-if="showPage">
					<slot name="page" :total="data.total" :current="data.active" v-if="$scopedSlots.page"></slot>
					<div v-else>
						<span v-text="data.active+1"></span>
						<span>/</span>
						<span v-text="data.total"></span>
					</div>
				</div>
				<div v-if="$scopedSlots.descriptions || descriptions.length>0" class="mvi-image-preview-footer">
					<slot name="descriptions" :total="data.total" :current="data.active" v-if="$scopedSlots.descriptions"></slot>
					<div v-else-if="descriptions.length>0" class="mvi-image-preview-description" v-text="descriptions[data.active]"></div>
				</div>
			</template>
		</m-swiper>

	</m-overlay>
</template>

<script>
	export default {
		name: "m-image-preview",
		data() {
			return {
				firstShow: false,
				start: 0,
				end: 0,
				current: 0,
				isDoubleTouch:false,//是否双指触摸
				touchDistance:0,//双指触点距离
			}
		},
		model: {
			prop: 'show',
			event: 'model-change'
		},
		props: {
			show: { //是否显示
				type: Boolean,
				default: false
			},
			images: { //图片数组
				type: Array,
				default: function() {
					return [];
				}
			},
			descriptions: { //图片描述
				type: Array,
				default: function() {
					return []
				}
			},
			active: { //默认显示的图片序列
				type: Number,
				default: 0
			},
			showPage: { //是否显示页码
				type: Boolean,
				default: true
			},
			local: { //是否局部显示
				type: Boolean,
				default: false
			},
			zIndex: { //z-index值
				type: Number,
				default: 5000
			},
			fade: { //是否使用渐变
				type: Boolean,
				default: false
			},
			showControl: { //是否显示控制器
				type: Boolean,
				default: false
			},
			controlClass: { //控制器额外样式
				type: String,
				default: null
			},
			usePadding: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners)
			}
		},
		mounted() {
			this.current = this.active;
		},
		methods: {
			//遮罩层显示时
			overlayShowing() {
				if (!this.firstShow) {
					this.firstShow = true;
				}
			},
			//pc端鼠标按下
			mouseDown(event) {
				this.start = event.pageX;
			},
			//pc端鼠标松开
			mouseUp(event) {
				this.end = event.pageX;
			},
			//关闭遮罩
			closeOverlay(e) {
				if (this.start != this.end) {
					return;
				}
				this.$refs.images.forEach((image)=>{
					image.$el.style.width = '';
				})
				this.$emit('model-change', false);
				this.$emit('update:show', false);
			},
			//图片变更
			swiperChange(active) {
				this.current = active;
				this.$refs.images.forEach((image)=>{
					image.$el.style.width = '';
				})
				this.$emit('change', active);
			},
			//滚轮
			wheelImage(event) {
				var deltaY = event.deltaY; //正值向下滚，负值向上滚
				var el = this.$refs.images[this.current].$el; //图片元素
				var container = this.$refs.previews[this.current]; //容器元素
				if (deltaY > 0) { //向下滚，缩小图片
					if(el.offsetWidth <= container.offsetWidth / 4){
						return;
					}
					el.style.width = el.offsetWidth * 0.8 + 'px';
				} else { //向上滚，放大图片
					if(el.offsetWidth >= container.offsetWidth * 4){
						return;
					}
					el.style.width = el.offsetWidth * 1.2 + 'px';
				}
			},
			//双指触摸事件
			prviewTouchStart(event){
				if(event.touches.length == 2){
					this.isDoubleTouch = true;
					this.touchDistance = this.getDistance(event.touches[0],event.touches[1]);
				}
			},
			//双指移动事件
			previewTouchMove(event){
				if(event.touches.length == 2 && this.isDoubleTouch){
					if(event.cancelable){
						event.preventDefault()
					}
					var el = this.$refs.images[this.current].$el; //图片元素
					var container = this.$refs.previews[this.current]; //容器元素
					var distance = this.getDistance(event.touches[0],event.touches[1])
					if(distance < this.touchDistance){//缩小
						if(el.offsetWidth <= container.offsetWidth / 4){
							return;
						}
					}else {//放大
						if(el.offsetWidth >= container.offsetWidth * 4){
							return;
						}
					}
					el.style.width = el.offsetWidth +　(distance - this.touchDistance) + 'px';
					this.touchDistance = distance;
				}
			},
			//双指触摸松开事件
			previewTouchend(event){
				if(this.isDoubleTouch){
					setTimeout(()=>{
						this.isDoubleTouch = false;
					},300)
				}
			},
			//获取两点间距离
			getDistance(p1, p2){
				var x = p2.pageX - p1.pageX;
				var y = p2.pageY - p1.pageY;
				return Math.sqrt((x * x) + (y * y));
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";

	.mvi-image-preview-swiper {
		background-color: #000;

		.mvi-image-preview-container {
			padding: 0 @mp-xs;
			display: block;
			width: 100%;
			height: 100%;
			position: relative;
			overflow: hidden;
		}

		.mvi-image-preview {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 100%;
		}
	}

	.mvi-image-preview-page {
		position: absolute;
		display: block;
		color: #fff;
		top: 0;
		left: 0;
		width: 100%;
		padding: @mp-sm 0;
		text-align: center;
		background-color: rgba(0, 0, 0, .6);
		z-index: 20;

		span+span {
			margin-left: @mp-xs;
		}
	}

	.mvi-image-preview-footer {
		display: block;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .6);
		color: #fff;
		z-index: 20;
	}

	.mvi-image-preview-description {
		padding: @mp-md @mp-sm;
	}
</style>
