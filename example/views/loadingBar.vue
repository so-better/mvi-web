<template>
	<div>
		<m-button class="mvi-m-2" @click="show">显示加载进度条</m-button>
		<m-button class="mvi-m-2" @click="hide">结束加载进度条</m-button>
	</div>
</template>

<script>
	export default {
		name:'demo-loadingBar',
		data(){
			return {
				
			}
		},
		methods:{
			show(){
				this.$showLoadingBar()
			},
			hide(){
				this.$hideLoadingBar()
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
