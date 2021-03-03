<template>
	<div><m-picker :options="options" title="picker" title-class="mvi-text-bold mvi-text-success"></m-picker></div>
</template>

<script>
export default {
	name: 'demo-picker',
	data() {
		return {
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 0 //设置默认选项序列
			}
		};
	}
};
</script>

<style scoped lang="less"></style>
