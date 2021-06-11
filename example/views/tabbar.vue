<template>
	<div>
		<m-tabbar flex="center" offset="1rem" v-model="index" :tabs="tabs"></m-tabbar>
		<m-tabbar @item-click="itemClick" border active-color="#0b73de" fixed v-model="index" :tabs="tabs"></m-tabbar>
	</div>
</template>

<script>
export default {
	name: 'demo-tabbar',
	data() {
		return {
			index: 0,
			tabs: [
				{
					value: 0,
					name: '首页',
					icon:{
						type:'home'
					},
					route:'/'
				},
				{
					value: 1,
					name: '单元格',
					icon:'map',
					route:'/cell'
				},
				{
					value: 2,
					name: '按钮',
					icon:'user',
					route:'/button'
				}
			]
		}
	},
	methods:{
		itemClick(value){
			this.$msgbox(value)
		}
	}
};
</script>

<style scoped lang="less"></style>
