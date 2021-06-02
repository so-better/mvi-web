<template>
	<div>
		<m-editor v-model="value"></m-editor>
		<m-modal show>
			<m-editor v-model="value" :tooltip-props="{fixed:true,fixedAuto:true}" :layer-props="{fixed:true,fixedAuto:true}"></m-editor>
		</m-modal>
	</div>
</template>

<script>
	export default {
		name:'demo-editor',
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
