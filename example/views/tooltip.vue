<template>
	<div class="mvi-p-4">
		<m-tooltip class="mvi-mb-4" title="这是一个工具提示组件">
		    <m-button type="primary">工具提示</m-button>
		</m-tooltip>
		<m-tooltip class="mvi-mb-4" title="这是一个工具提示组件" block color="#fff" text-color="#333" border-color="#ddd"
		fixed offset="1rem">
		    <m-button type="primary" form-control>工具提示</m-button>
		</m-tooltip>
		<m-tooltip class="mvi-mb-4" title="这是一个工具提示组件" block :show-triangle="false">
		    <m-button type="primary" form-control>工具提示</m-button>
		</m-tooltip>
	</div>
</template>

<script>
	export default {
		name:'demo-tooltip',
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
