<template>
	<div class="mvi-p-4">
		<p>{{value}}</p>
		<m-stepper v-model="value" input-width="3rem" :min="6"></m-stepper>
		<m-stepper v-model="value" input-width="3rem" :digit="1" :step="0.5"></m-stepper>
	</div>
</template>

<script>
	export default {
		name:'demo-stepper',
		data(){
			return {
				value:0
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
