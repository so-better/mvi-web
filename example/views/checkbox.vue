<template>
	<div class="mvi-p-4">
		<m-checkbox class="mvi-m-2" v-model="checked" disabled></m-checkbox>
		<m-checkbox class="mvi-m-2" v-model="checked" fill-color="#ff3300"></m-checkbox>
		<m-checkbox class="mvi-m-2" v-model="checked" fill-color="#fff" icon-color="#333"></m-checkbox>
		<m-checkbox class="mvi-m-2" v-model="checked" icon-type="check-square"></m-checkbox>
		<m-checkbox class="mvi-m-2" v-model="checked" icon-size="1rem"></m-checkbox>
		<m-checkbox class="mvi-m-2" v-model="checked" label="China" label-size="1rem" label-color="#ff3300"></m-checkbox>
	</div>
</template>

<script>
	export default {
		name:'demo-checkbox',
		data(){
			return {
				checked:false,
				arr:[0,1]
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
