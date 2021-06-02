<template>
	<div>
		<m-button @click="showNotify">Button</m-button>
	</div>
</template>

<script>
	export default {
		name:'demo-notify',
		data(){
			return {
				
			}
		},
		methods:{
			showNotify(){
				this.$showNotify({
					type:'error',
					message:'你的账号当前在另一终端登录，若非本人操作，请及时更改密码',
					icon:{
						type:'error-o'
					},
					timeout:3000
				})
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
