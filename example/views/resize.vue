<template>
	<div>
		<div v-resize.draggableX="options" style="position: absolute;width: 2rem;height: 2rem;border: 1px solid #DDDDDD;"></div>
	</div>
</template>

<script>
	export default {
		name:'demo-resize',
		data(){
			return {
				options:{
					draggableX:false,
					draggableY:false
				}
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
