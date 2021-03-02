<template>
	<div>
		<m-swiper ref="swiper" width="7.5rem" height="4rem">
			<m-swiper-slide class="mvi-flex-center mvi-bg-error">1</m-swiper-slide>
			<m-swiper-slide class="mvi-flex-center mvi-bg-success">2</m-swiper-slide>
			<m-swiper-slide class="mvi-flex-center mvi-bg-info">3</m-swiper-slide>
			<m-swiper-slide class="mvi-flex-center mvi-bg-warn">4</m-swiper-slide>
		</m-swiper>
	</div>
</template>

<script>
export default {
	name: 'demo-swiper',
	data() {
		return {};
	}
};
</script>

<style scoped lang="less"></style>
