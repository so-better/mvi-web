<template>
	<div>
		{{date.toLocaleString()}}
		<m-date-picker title="选择日期" v-model="date" mode="date"></m-date-picker>
		<m-date-picker v-model="date" mode="datetime"></m-date-picker>
		<m-date-picker v-model="date" mode="time"></m-date-picker>
	</div>
</template>

<script>
	export default {
		name:'demo-datePicker',
		data(){
			return {
				date:new Date(),
				startDate:new Date(2021,11,22)
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
