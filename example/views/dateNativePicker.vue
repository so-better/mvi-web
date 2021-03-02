<template>
	<div>
		<m-button @click="open">{{date.toLocaleString()}}</m-button>
		<m-date-native-picker type="time" ref="date" v-model="date"></m-date-native-picker>
	</div>
</template>

<script>
	export default {
		name:'demo-dateNativePicker',
		data(){
			return {
				date:new Date()
			}
		},
		methods:{
			open(){
				this.$refs.date.trigger()
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
