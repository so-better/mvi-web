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
					type:'success',
					message:'支付成功',
					timeout:1000
				})
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
