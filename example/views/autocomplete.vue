<template>
	<div class="mvi-p-2">
		<m-autocomplete class="mvi-mb-2" size="small" placeholder="请输入" v-model="value" :list="list"></m-autocomplete>
		<m-autocomplete class="mvi-mb-2" placeholder="请输入" v-model="value" :list="list" filter-method clearable
		height="2rem" left-icon="calendar" right-icon="arrow-down" @left-click="leftClick" @right-click="rightClick"
		@select="select"></m-autocomplete>
		<m-autocomplete class="mvi-mb-2" size="large" placeholder="请输入" v-model="value" :list="list" disabled></m-autocomplete>
		<m-modal show>
			<m-autocomplete fixed fixed-auto class="mvi-mb-2" size="small" placeholder="请输入" v-model="value" :list="list"></m-autocomplete>
		</m-modal>
	</div>
</template>

<script>
	export default {
		name:'demo-autocomplete',
		data(){
			return {
				value:'',
				list:['高铁','高加索','梵高','美利坚','风车','美滋滋']
			}
		},
		methods:{
			leftClick(){
				this.$msgbox('点了左侧图标')
			},
			rightClick(){
				this.$msgbox('点了右侧图标')
			},
			select(value){
				this.$msgbox('选择的值：'+value)
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
