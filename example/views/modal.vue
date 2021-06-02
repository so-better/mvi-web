<template>
	<div>
		<m-button @click="show=!show">Button</m-button>
		<m-modal v-model="show" radius="0.4rem" show-times :times-icon="{color:'#ff3300'}" title-class="mvi-text-center" closable title="Modal" content="this is a modal" :footer="new Date().toLocaleString()"></m-modal>
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
