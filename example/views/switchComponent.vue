<template>
	<div class="mvi-p-10">
		<m-switch size="1rem" active-color="#ff3300" inactive-color="#ebedf0" v-model="checked"></m-switch>
	</div>
</template>

<script>
	export default {
		name:'demo-switch',
		data(){
			return {
				checked:false
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
