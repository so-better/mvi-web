<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<m-button @click="showColumns" plain>Button</m-button>
		<m-table :data="components" :columns="columns"></m-table>
		<m-page v-model="pageCurrent" @model-change="getComponents" :total="pageObject.pageCounts" simple></m-page>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date: new Date(),
				value: 'ff000',
				active: 0,
				types: ['info', 'warn', 'primary', 'success', 'error', 'default'],
				columns: [{
						key: 'component_order',
						value: '序列',
						sortable:true
					},
					{
						key: 'component_name',
						value: '组件名称',
					},
					{
						key: 'component_id',
						value: 'ID'
					}
				],
				components:[],
				pageSize:10,
				pageCurrent:1,
				order1:'component_order',
				order2:'asc',
				pageObject:{},
				token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE2MDM3OTI1NTUsImV4cCI6MTYwNTA4ODU1NX0.yRuxIS6VjNECK2vHCT1bijyVU-zFFz0rXvSc64ijvDk'
			}
		},
		mounted() {
			this.getComponents()
		},
		methods: {
			showColumns(){
				var component = this.components[1];
				component.hidden = component.hidden?false:true;
				this.$set(this.components,1,component)
			},
			sortAsc(column,value) {
				this.order2 = 'asc',
				this.pageCurrent = 1;
				this.getComponents()
			},
			sortDesc(column,value){
				this.order2 = 'desc';
				this.pageCurrent = 1;
				this.getComponents()
			},
			getComponents(){
				this.$ruax.defaults.headers = {
					authorization:this.token
				}
				this.$ruax.post('https://www.mvi-web.cn/api/admin/component/getComponents',{
					pageCurrent:this.pageCurrent,
					pageSize:this.pageSize,
					order1:this.order1,
					order2:this.order2
				}).then(result=>{
					if(result.state == 100){
						this.components = result.data.components;
						this.pageObject = result.data.pageObject;
					}
				})
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
	}
</style>
