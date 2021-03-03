<template>
	<div>
		<p>{{color}}</p>
		<m-color-picker v-model="color" hex></m-color-picker>
	</div>
</template>

<script>
	export default {
		name:'demo-colorPicker',
		data(){
			return {
				color:'rgba(0,0,0,.5)'
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
