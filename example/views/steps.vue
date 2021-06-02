<template>
	<div>
		<m-button class="mvi-mb-2" @click="active=(active<3?++active:0)">Button</m-button>
		<m-steps  :active="active"  background="#ebedf0">
			<m-step>买家下单</m-step>
			<m-step>商家接单</m-step>
			<m-step>买家提货</m-step>
			<m-step>交易完成</m-step>
		</m-steps>
	</div>
</template>

<script>
export default {
	name: 'demo-steps',
	data() {
		return {
			active:0
		};
	}
};
</script>

<style scoped lang="less"></style>
