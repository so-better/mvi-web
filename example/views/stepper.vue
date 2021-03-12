<template>
	<div class="mvi-p-4">
		<p>{{value}}</p>
		<div class="mvi-mb-4">
			<m-stepper v-model="value" :digit="4" :step="0.2"></m-stepper>
		</div>
		<div>
			<p>{{value1}}</p>
			<m-stepper border background="#fff" v-model="value1" :digit="1" :step="0.5"></m-stepper>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-stepper',
		data(){
			return {
				value:0.1,
				value1:1,
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
