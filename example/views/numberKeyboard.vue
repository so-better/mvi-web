<template>
	<div>
		<p>{{value}}</p>
		<m-button @click="show=!show">数字键盘</m-button>
		<m-number-keyboard closable calibration v-model="value" :show.sync="show"></m-number-keyboard>
	</div>
</template>

<script>
	export default {
		name:'',
		data(){
			return {
				show:false,
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
