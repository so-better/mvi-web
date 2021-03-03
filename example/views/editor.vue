<template>
	<div>
		<m-editor v-model="value"></m-editor>
	</div>
</template>

<script>
	export default {
		name:'demo-editor',
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
