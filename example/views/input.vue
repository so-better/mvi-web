<template>
	<div>
		<m-input left-icon="user" right-icon="check" border v-model="value" placeholder="请输入内容..." label="内容"></m-input>
		<m-input class="mvi-mt-2" disabled v-model="value" placeholder="请输入内容..." label="内容"></m-input>
		<m-input left-icon="user" required class="mvi-mt-2" clearable autofocus v-model="value" placeholder="请输入内容..." label="内容"></m-input>
		<m-input v-model="value" type="textarea" :rows="4" placeholder="请输入内容..." :maxlength="200" show-word-limit label="内容"></m-input>
		<m-input v-model="value" type="textarea" autosize placeholder="请输入内容..." :maxlength="200" show-word-limit label="内容"></m-input>
		<m-input :left-icon="{type:'calendar',color:'#ff3300'}" v-model="value1" placeholder="请输入内容..." label="日期" type="date" :date.sync="date"></m-input>
	</div>
</template>

<script>
	export default {
		name:'demo-input',
		data(){
			return {
				value:'',
				value1:'',
				date:null
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
