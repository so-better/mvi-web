<template>
	<div>
		<m-image style="background-color: #000000;" width="100%" height="3rem" src="https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif"
		fit="response"></m-image>
		<m-image style="background-color: #000000;" width="100%" height="3rem" src="https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif"
		fit="cover"></m-image>
		<m-image style="background-color: #000000;" width="100%" height="3rem" src="https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif"
		fit="contain"></m-image>
		<m-image style="background-color: #000000;" width="100%" height="3rem" src="https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif"
		fit="none"></m-image>
		<m-image width="100%" height="3rem" src="" :error-icon="{size:'1rem'}"></m-image>
		<m-image width="100%" height="3rem" src="" :show-error="false" alt="图片加载失败"></m-image>
		<m-image width="100%" height="3rem" src="https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif" :load-icon="{size:'1rem'}" ref="image" @success="loadImage"></m-image>
	</div>
</template>

<script>
	export default {
		name:'demo-image',
		data(){
			return {
				
			}
		},
		methods:{
			loadImage(){
				this.$refs.image.loading = true;
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
