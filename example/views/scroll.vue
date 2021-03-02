<template>
	<div>
		<div style="width: 100%;height: 6rem;border: 1px solid #000000;overflow: auto;" v-scroll="options"><div style="height: 30rem;"></div></div>
	</div>
</template>

<script>
export default {
	name: 'demo-scroll',
	data() {
		return {
			options:{
				top: el => {
					console.log('到达顶部');
				},
				bottom: el => {
					console.log('到达底部');
				}
			}
		};
	}
};
</script>

<style scoped lang="less"></style>
