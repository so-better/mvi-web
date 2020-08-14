<template>
	<div v-on="listeners" ref="image" class="mvi-image" :style="'border-radius:'+(round?'50%':'')">
		<!-- 加载失败 -->
		<div v-if="error&&showError" class="mvi-image-error" ref="error">
			<slot name="error" v-if="$slots.error"></slot>
			<m-icon v-else class="mvi-image-error-icon" :style="'font-size:'+iconSize" type="image-error" />
		</div>
		<!-- 加载中 -->
		<div v-else-if="loading&&showLoading" class="mvi-image-loading">
			<slot name="loading" v-if="$slots.loading"></slot>
			<m-icon v-else class="mvi-image-loading-icon" :style="'font-size:'+iconSize" type="image-alt" />
		</div>
		<!-- 加载成功 -->
		<img @load="loadSuccess" @error="loadError" v-show="show" :src="(lazyLoad?lazySrc:src)" :alt="showError?'':alt"
		 :class="imgClass">
	</div>
</template>
<script>
	import $util from "../../util/util"
	import Spy from "../spy/spy"
	export default {
		name: "m-image",
		data() {
			return {
				error: false, //是否加载失败
				loading: true, //是否正在加载中
				lazySrc: "", //延迟加载显示的图片地址
			}
		},
		props: {
			src: {
				type: String,
				default: ""
			},
			fit: {
				type: String,
				default: "fill",
				validator(value) {
					return ['fill', 'cover', 'contain', 'response', 'none'].includes(value);
				}
			},
			alt: {
				type: String,
				default: ""
			},
			showError: {
				type: Boolean,
				default: true
			},
			showLoading: {
				type: Boolean,
				default: true
			},
			lazyLoad: { //是否启用延迟加载
				type: Boolean,
				default: false
			},
			root: { //延迟加载时定义滚动的根元素ID，如"#el"，如果不设置则默认为窗口滚动
				type: String,
				default: null
			},
			iconSize: {
				type: String,
				default: '.5rem'
			},
			round: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners);
			},
			//是否显示图片
			show() {
				if (!this.loading) {
					return true;
				} else {
					return false;
				}
			},
			//图片类
			imgClass() {
				if (this.fit == 'contain') {
					return 'mvi-image-contain';
				} else if (this.fit == 'cover') {
					return 'mvi-image-cover';
				} else if (this.fit == 'none') {
					return 'mvi-image-none';
				} else if (this.fit == 'response') {
					return 'mvi-image-response';
				} else {
					return 'mvi-image-fill';
				}
			}
		},
		mounted() {
			if(this.lazyLoad){
				this.lazyloadFun();
			}
		},
		methods: {
			//延时加载方法
			lazyloadFun() {
				var root = null;
				if (typeof(this.root) == 'string' && this.root) {
					root = document.body.querySelector(this.root);
				} else if ($util.isElement(this.root)) {
					root = this.root;
				}
				//延时加载
				var spy = new Spy(this.$refs.image, {
					el: root, //根元素
					beforeEnter: (el) => { //图片进入可视端口时加载
						this.lazySrc = this.src;
					}
				})
				spy.init();
			},
			//图片加载成功
			loadSuccess(e) {
				this.error = false;
				this.loading = false;
				this.$emit('success', e.target)
			},
			//图片加载失败
			loadError(e) {
				this.loading = false;
				this.error = true;
				this.$emit('error', e.target)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	.mvi-image {
		display: inline-block;
		overflow: hidden;
		position: relative;
	}

	.mvi-image>img {
		display: block;
		margin: 0;
		padding: 0;
		border-radius: inherit;
		width: 100%;
		height: 100%;
	}

	.mvi-image>img.mvi-image-contain {
		object-fit: contain;
	}

	.mvi-image>img.mvi-image-cover {
		object-fit: cover;
	}

	.mvi-image>img.mvi-image-fill {
		object-fit: fill;
	}

	.mvi-image>img.mvi-image-none {
		object-fit: none;
	}

	.mvi-image>img.mvi-image-response {
		object-fit: scale-down;
	}

	.mvi-image-error,
	.mvi-image-loading {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: @bg-color-dark;
		color: @font-color-sub;
	}
</style>
