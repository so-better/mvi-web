<template>
	<div>
		<div id="container" style="width: 7rem;height: 7rem;border: 1px solid #FF0000;">
			<div style="width: 1rem;height: 1rem;border: 1px solid #000000;" v-drag="options"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-drag',
		data(){
			return {
				options:{
					container:'#container',
					mode:'out',
					ready:data=>{
						console.log(data)
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
