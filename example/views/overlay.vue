<template>
	<div>
		<m-button form-control @click="show=!show">Button</m-button>
		<div style="position: relative;width: 6rem;height: 6rem;border: 1px solid #DDDDDD;">
			<m-overlay local :timeout="3000" color="rgba(10,20,50,.6)" closable v-model="show"></m-overlay>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-overlay',
		data(){
			return {
				show:false
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
