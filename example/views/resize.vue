<template>
	<div>
		<div v-resize.draggableX="options" style="position: absolute;width: 2rem;height: 2rem;border: 1px solid #ccc;"></div>
	</div>
</template>

<script>
	export default {
		name:'demo-resize',
		data(){
			return {
				options:{
					draggableX:false,
					draggableY:true
				}
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
