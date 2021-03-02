<template>
	<div>
		<m-button v-spy="options" form-control style="margin: 20rem 0;">按钮</m-button>
	</div>
</template>

<script>
export default {
	name: 'demo-spy',
	data() {
		return {
			options: {
				el: '#app',
				beforeEnter: el => {
					console.log('元素开始进入视图');
				},
				enter: el => {
					console.log('元素完全进入视图');
				},
				beforeLeave: el => {
					console.log('元素开始离开视图');
				},
				leave: el => {
					console.log('元素完全离开视图');
				}
			}
		};
	}
};
</script>

<style scoped lang="less"></style>
