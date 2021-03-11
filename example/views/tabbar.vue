<template>
	<div>
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
					icon:'home'
				},
				{
					value: 1,
					name: '附近',
					icon:'map'
				},
				{
					value: 2,
					name: '我的',
					icon:'user'
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
