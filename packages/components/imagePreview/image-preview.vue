<template>
	<m-overlay :show="show" v-on="listeners" color="#000" :fade="false" @showing="overlayShowing" :local="local" :z-index="zIndex"
	:use-padding="usePadding">
		<m-swiper v-if="firstShow" class="mvi-image-preview-swiper" :initial-slide="active" show-indicators ref="swiper" 
		width="100%" height="100%" @change="swiperChange" @mousedown="mouseDown" @mouseup="mouseUp" :show-control="showControl" :fade="fade"
		:control-class="controlClass">
			<m-swiper-slide v-for="(item,index) in images" :key="'image-'+index">
				<div class="mvi-image-preview-container">
					<m-image @click="closeOverlay" class="mvi-image-preview" :src="item" fit="contain"></m-image>
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
				start:0,
				end:0
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
			local:{//是否局部显示
				type:Boolean,
				default:false
			},
			zIndex:{//z-index值
				type:Number,
				default:5000
			},
			fade:{//是否使用渐变
				type:Boolean,
				default:false
			},
			showControl:{//是否显示控制器
				type:Boolean,
				default:false
			},
			controlClass:{//控制器额外样式
				type:String,
				default:null
			},
			usePadding:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners)
			}
		},
		methods: {
			//遮罩层显示时
			overlayShowing() {
				if (!this.firstShow) {
					this.firstShow = true;
				}
			},
			mouseDown(event){
				this.start = event.pageX;
			},
			mouseUp(event){
				this.end = event.pageX;
			},
			closeOverlay(e) {
				if(this.start != this.end){
					return;
				}
				this.$emit('model-change', false);
				this.$emit('update:show', false);
			},
			swiperChange(active){
				this.$emit('change',active);
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-image-preview-swiper {
		background-color: #000;
		
		.mvi-image-preview-container{
			padding: 0 @mp-xs;
			display: block;
			width: 100%;
			height: 100%;
		}
		
		.mvi-image-preview {
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
		padding:@mp-md @mp-sm;
	}
</style>
