<template>
	<div class="mvi-p-4">
		<m-button @click="show">Button</m-button>
	</div>
</template>

<script>
	export default {
		name:'demo-msgbox',
		data(){
			return {
				
			}
		},
		methods:{
			show(){
				this.$msgbox({
					message:'this is a msgbox',
					background:'#ebedf0',
					color:'#333',
					animation:'translate'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
