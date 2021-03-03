<template>
	<div>
		<m-button @click="show=!show">Button</m-button>
		<m-transition-slide :expand="show">
		    <div style="width: 100%;height: 4rem;background-color: #ff3300;"></div>
		</m-transition-slide>
	</div>
</template>

<script>
	export default {
		name:'demo-transitionSlide',
		data(){
			return {
				show:true
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
