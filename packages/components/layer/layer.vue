<template>
	<div v-on="listeners" :class="'mvi-layer'+(fixed?' mvi-layer-fixed':'')" :style="layerStyle">
		<slot></slot>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: 'm-layer',
		props: {
			target: {
				type: String,
				default: null
			},
			root:{
				type:String,
				default:null
			},
			placement: {
				type: String,
				default: 'bottom',
				validator(value) {
					return ['top', 'left', 'right', 'bottom', 'top-start',
						'top-end', 'left-start', 'left-end', 'right-start', 'right-end', 'bottom-start',
						'bottom-end'
					].includes(value)
				}
			},
			offset:{
				type:String,
				default:'0.2rem'
			},
			zIndex:{
				type:Number,
				default:null
			},
			fixed:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			listeners(){
				return Object.assign({},this.$listeners);
			},
			layerStyle(){
				var style = {};
				if(this.zIndex){
					style.zIndex = this.zIndex;
				}
				return style;
			}
		},
		mounted(){
			this.reset();
			window.addEventListener('resize',this.reset)
		},
		methods: {
			//重置位置
			reset(){
				if(!$util.isElement(this.$el)){
					return;
				}
				if(this.fixed){
					var pt = this.getTargetEl().getBoundingClientRect();//获取绑定元素相对视窗的位置信息
					if(this.placement == 'bottom' || this.placement == 'bottom-start' || this.placement == 'bottom-end'){
						this.$el.style.top = `calc(${pt.bottom}px + ${this.offset})`;
						if(this.placement == 'bottom'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'bottom-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'bottom-end'){
							this.$el.style.left = pt.right - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'top' || this.placement == 'top-start' || this.placement == 'top-end'){
						this.$el.style.bottom = `calc(${document.body.clientHeight - pt.top}px + ${this.offset})`;
						if(this.placement == 'top'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'top-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'top-end'){
							this.$el.style.left = pt.right - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'left' || this.placement == 'left-start' || this.placement == 'left-end'){
						this.$el.style.right = `calc(${document.body.clientWidth - pt.left}px + ${this.offset})`;
						if(this.placement == 'left'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'left-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'left-end'){
							this.$el.style.top = pt.bottom - this.$el.offsetHeight + 'px';
						}
					}else if(this.placement == 'right' || this.placement == 'right-start' || this.placement == 'right-end'){
						this.$el.style.left = `calc(${pt.right}px + ${this.offset})`;
						if(this.placement == 'right'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'right-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'right-end'){
							this.$el.style.top = pt.bottom - this.$el.offsetHeight + 'px';
						}
					}
				}else{
					var pt = $util.getElementPoint(this.getTargetEl(),this.getRootEl())
					if(this.placement == 'bottom' || this.placement == 'bottom-start' || this.placement == 'bottom-end'){
						this.$el.style.top = `calc(${pt.top + this.getTargetEl().offsetHeight}px + ${this.offset})`;
						if(this.placement == 'bottom'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'bottom-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'bottom-end'){
							this.$el.style.left = this.getTargetEl().offsetWidth + pt.left - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'top' || this.placement == 'top-start' || this.placement == 'top-end'){
						this.$el.style.bottom = `calc(${this.getRootEl().offsetHeight - pt.top}px + ${this.offset})`;
						if(this.placement == 'top'){
							this.$el.style.left = pt.left + this.getTargetEl().offsetWidth/2 - this.$el.offsetWidth/2 + 'px';
						}else if(this.placement == 'top-start'){
							this.$el.style.left = pt.left + 'px';
						}else if(this.placement == 'top-end'){
							this.$el.style.left = this.getTargetEl().offsetWidth + pt.left - this.$el.offsetWidth + 'px';
						}
					}else if(this.placement == 'left' || this.placement == 'left-start' || this.placement == 'left-end'){
						this.$el.style.right = `calc(${this.getRootEl().offsetWidth - pt.left}px + ${this.offset})`;
						if(this.placement == 'left'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'left-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'left-end'){
							this.$el.style.top = this.getTargetEl().offsetHeight + pt.top - this.$el.offsetHeight + 'px';
						}
					}else if(this.placement == 'right' || this.placement == 'right-start' || this.placement == 'right-end'){
						this.$el.style.left = `calc(${pt.left + this.getTargetEl().offsetWidth}px + ${this.offset})`;
						if(this.placement == 'right'){
							this.$el.style.top = pt.top + this.getTargetEl().offsetHeight/2 - this.$el.offsetHeight/2 + 'px';
						}else if(this.placement == 'right-start'){
							this.$el.style.top = pt.top + 'px';
						}else if(this.placement == 'right-end'){
							this.$el.style.top = this.getTargetEl().offsetHeight + pt.top - this.$el.offsetHeight + 'px';
						}
					}
					
				}
			},
			//获取绑定的元素
			getTargetEl(){
				if(this.target){
					return document.body.querySelector(this.target) || document.body;
				}else{
					return document.body;
				}
			},
			//获取根元素
			getRootEl(){
				if(this.fixed){
					return null;
				}
				if(this.root){
					return document.body.querySelector(this.root) || document.body;
				}else{
					return document.body;
				}
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize',this.reset);
		}
	}
</script>

<style scoped lang="less">
	.mvi-layer{
		position: absolute;
		z-index: 400;
		
		&.mvi-layer-fixed{
			position: fixed;
		}
	}
</style>
