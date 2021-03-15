<template>
	<div>
		<m-button @click="autoplay=!autoplay">Button</m-button>
		<m-button @click="initialSlide = 3">Button</m-button>
		<m-swiper ref="swiper" width="7.5rem" height="4rem" fade show-indicators show-control @change="change">
			<m-swiper-slide  v-for="(item,index) in slides" :key="'slide-'+index">
				<img :src="item" style="width: 100%;height: 100%;" />
			</m-swiper-slide>
		</m-swiper>
	</div>
</template>

<script>
export default {
	name: 'demo-swiper',
	data() {
		return {
			autoplay:false,
			initialSlide:0,
			slides:['https://www.mvi-web.cn/resources/blogImages/AF9ZISEyqfssnEQ_jCE_hPf8.jfif','https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif'],
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
