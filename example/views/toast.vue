<template>
	<div>
		<m-button class="mvi-m-2" @click="toast">Button</m-button>
	</div>
</template>

<script>
	export default {
		name:'demo-toast',
		data(){
			return {
				
			}
		},
		methods:{
			toast(){
				this.$showToast({
					background:'#ebedf0',
					color:'#333',
					message:'Hello World',
					timeout:1500
				})
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
