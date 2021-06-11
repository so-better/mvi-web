<template>
	<div>
		<m-button @click="show=!show">Button</m-button>
		<m-modal v-model="show" radius="0.3rem" closable title="Modal" content="this is a modal" :footer="new Date().toLocaleString()"></m-modal>
	</div>
</template>

<script>
	export default {
		name:'demo-modal',
		data(){
			return {
				show:false
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
