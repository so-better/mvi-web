<template>
	<div class="mvi-p-4">
		<m-radio :value="0" class="mvi-m-2" v-model="checked"></m-radio>
		<m-radio :value="1" class="mvi-m-2" v-model="checked" fill-color="#ff3300"></m-radio>
		<m-radio :value="2" class="mvi-m-2" v-model="checked" fill-color="#fff" icon-color="#333"></m-radio>
		<m-radio :value="3" class="mvi-m-2" v-model="checked" icon-type="check-square"></m-radio>
		<m-radio :value="4" class="mvi-m-2" v-model="checked" icon-size="1rem"></m-radio>
		<m-radio :value="5" class="mvi-m-2" v-model="checked" label="China" label-size="1rem" label-color="#ff3300"></m-radio>
	</div>
</template>

<script>
	export default {
		name:'demo-radio',
		data(){
			return {
				checked:0,
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
