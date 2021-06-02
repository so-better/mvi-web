<template>
	<div>
		<m-select class="mvi-mb-2" size="small" v-model="value2" :options="options" placeholder="请选择"></m-select>
		
		<m-select square class="mvi-mb-2" disabled v-model="value2" :options="options" placeholder="请选择"></m-select>
		
		<m-select class="mvi-mb-2" icon="angle-down" :selected-icon="{color:'#ff3300',type:'success-o'}" round active-type="success" size="large" v-model="value" :options="options" placeholder="请选择" multiple :filter-method="filter"></m-select>
		<m-modal >
			<m-select fixed fixed-auto class="mvi-mb-2" size="small" v-model="value2" :options="options" placeholder="请选择"></m-select>
		</m-modal>
	</div>
</template>

<script>
	export default {
		name:'demo-select',
		data(){
			return {
				value:[],
				value2:-1,
				options:[{
					label:'高铁',
					value:0
				},{
					label:'火车',
					value:1
				},{
					label:'动车',
					value:2
				},{
					label:'汽车',
					value:3
				},{
					label:'邮轮',
					value:4
				},{
					label:'飞机',
					value:5
				}]
			}
		},
		methods:{
			filter(value){
				return value.length>0?value.toString():''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
