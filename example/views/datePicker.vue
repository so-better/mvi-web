<template>
	<div>
		{{date.toLocaleString()}}
		<m-date-picker title="选择日期" v-model="date" mode="date" @confirm="change"></m-date-picker>
		<m-date-picker v-model="date" mode="datetime" @confirm="change"></m-date-picker>
		<m-date-picker v-model="date" mode="time" @confirm="change"></m-date-picker>
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
		},
		methods:{
			change(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
