<template>
	<div>
		<m-button @click="autoplay=!autoplay">Button</m-button>
		<m-button @click="initialSlide = 3">Button</m-button>
		<m-swiper ref="swiper" width="7.5rem" height="4rem" :initial-slide="initialSlide" :interval="1000" show-controls @change="change" @before-change="beforeChange"  show-indicators loop  :autoplay="autoplay">
			<m-swiper-slide>
				<div style="width: 100%;height: 100%;" class="mvi-flex-center mvi-bg-error">1</div>
			</m-swiper-slide>
			<m-swiper-slide>
				<div style="width: 100%;height: 100%;" class="mvi-flex-center mvi-bg-success">2</div>
			</m-swiper-slide>
			<m-swiper-slide>
				<div style="width: 100%;height: 100%;" class="mvi-flex-center mvi-bg-info">3</div>
			</m-swiper-slide>
			<m-swiper-slide>
				<div style="width: 100%;height: 100%;" class="mvi-flex-center mvi-bg-warn">4</div>
			</m-swiper-slide>
			<!-- <template v-slot:indicators="data">
				<p style="position: absolute;z-index: 1000;bottom: 0;">{{data}}</p>
			</template> -->
		</m-swiper>
	</div>
</template>

<script>
export default {
	name: 'demo-swiper',
	data() {
		return {
			autoplay:false,
			initialSlide:1
		};
	},
	methods:{
		change(value){
			console.log('change，改变后的序列：'+value)
		},
		beforeChange(value){
			console.log('beforeChange，改变前的序列：'+value)
		}
	}
};
</script>

<style scoped lang="less"></style>
