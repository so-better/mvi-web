<template>
	<div>
		<m-button @click="show=!show">Button</m-button>
		<m-dropdown v-model="value" round :show.sync="show" :options="options"></m-dropdown>
	</div>
</template>

<script>
export default {
	name: 'demo-dropdown',
	data() {
		return {
			value: 0,
			show: false,
			options: [
				{
					label: '选项A',
					value: 0
				},
				{
					label: '选项B',
					value: 1
				},
				{
					label: '选项C',
					value: 2
				},
				{
					label: '选项D',
					value: 3
				}
			]
		};
	}
};
</script>

<style scoped lang="less"></style>
