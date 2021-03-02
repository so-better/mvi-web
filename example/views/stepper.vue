<template>
	<div class="mvi-p-4">
		<m-stepper v-model="value" input-width="3rem" background="#ff3300" color="#fff"></m-stepper>
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
