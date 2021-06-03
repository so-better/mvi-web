<template>
	<div>
		<m-button @click="show=!show" form-control>预览</m-button>
		<m-image-preview :error-icon="{type:'image',color:'#ff3300',size:'1rem'}" show-control v-model="show" :images="images" :descriptions="descriptions"></m-image-preview>
	</div>
</template>

<script>
	export default {
		name:'demo-imagePreview',
		data(){
			return {
				show:false,
				images:['https://www.mvi-web.cn/resources/blogImages/GhNI2330sHbh18vtJwExnekB.jfif','https://www.mvi-web.cn/resources/blogImages/AF9ZISEyqfssnEQ_jCE_hPf8.jfif2'],
				descriptions:['我寄愁心与明月,随风直到夜郎西','飞机起飞咯！！！']
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
