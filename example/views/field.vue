<template>
	<div>
		<m-field append="user" v-model="value" placeholder="请输入" prefix="user"></m-field>
	</div>
</template>

<script>
	export default {
		name:'demo-field',
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
