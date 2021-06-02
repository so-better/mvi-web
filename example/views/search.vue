<template>
	<div>
		<m-search v-model="value" placeholder="请输入..." label="搜索" round :left-icon="{type:'search',color:'#ff3300'}" clearable showCancel style="background-color: #000;color: #fff;" color="#fff" background="#000"></m-search>
	</div>
</template>

<script>
	export default {
		name:'demo-search',
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
