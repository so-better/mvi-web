<template>
	<div>
		<m-calendar v-model="date" view="date"></m-calendar>
	</div>
</template>

<script>
	export default {
		name:'demo-calendar',
		data(){
			return {
				date:new Date()
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
