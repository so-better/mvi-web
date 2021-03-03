<template>
	<div>
		<m-page v-model="pageCurrent" :total="total" :over-number="3"></m-page>
	</div>
</template>

<script>
	export default {
		name:'demo-page',
		data(){
			return {
				pageCurrent:1,
				total:100
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
