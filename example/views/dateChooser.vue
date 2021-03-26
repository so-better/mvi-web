<template>
	<div>
		<p>{{date}}</p>
		<m-date-chooser v-model="date" width="8rem" show-triangle border border-color="#ddd" :shadow="false">
		    <m-button type="primary" form-control>选择日期</m-button>
		</m-date-chooser>
		<m-modal show>
			<m-date-chooser fixed fixed-auto v-model="date" width="8rem" show-triangle border border-color="#ddd" :shadow="false">
			    <m-button type="primary" form-control>选择日期</m-button>
			</m-date-chooser>
		</m-modal>
	</div>
</template>

<script>
	export default {
		name:'demo-dateChooser',
		data(){
			return {
				date:new Date()
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
