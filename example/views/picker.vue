<template>
	<div><m-picker :options="options" title="picker" title-class="mvi-text-bold mvi-text-success"></m-picker></div>
</template>

<script>
export default {
	name: 'demo-picker',
	data() {
		return {
			options: [
				{
					values: ['mvi', 'elementUI', 'iView', 'vant'],
					defaultIndex: 0
				},
				{
					values: ['上午', '晚上', '下午'],
					defaultIndex: 1
				}
			]
		};
	}
};
</script>

<style scoped lang="less"></style>
