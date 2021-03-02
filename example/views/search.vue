<template>
	<div>
		<m-search v-model="value" placeholder="请输入..." label="搜索" round left-icon="search" clearable showCancel></m-search>
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
