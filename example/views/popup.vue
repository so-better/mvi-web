<template>
	<div>
		<m-button form-control @click="show=!show">Button</m-button>
		<div style="position: relative;width: 100%;height: 6rem;border: 1px solid #DDDDDD;">
			<m-popup v-model="show" closable width="3rem" local ></m-popup>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-popup',
		data(){
			return {
				show:false
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
