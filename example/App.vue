<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<m-button form-control @click="show=!show">Modal</m-button>
		<m-button form-control @click="change(0)">Confirm</m-button>
		<m-button form-control @click="change(1)">Alert</m-button>
		<m-button form-control @click="change(2)">Prompt</m-button>
		<m-image-preview :images="images" show></m-image-preview>
		<m-modal v-model="show" closable title="Modal" show-times title-class="mvi-text-center" content="这是一个模态框,不是一个Dialog!" footer="作者:长安月下"></m-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date: new Date(),
				value: 'ff000',
				active:0,
				types:['info','warn','primary','success','error','default'],
				images:[
										'https://www.mvi-web.cn/resources/blogImages/image-1594004696016.jpg',
										'https://www.mvi-web.cn/resources/blogImages/image-1594004502750.jpg',
										'https://www.mvi-web.cn/resources/blogImages/image-1594004501547.jpg',
				                   		'https://www.mvi-web.cn/resources/blogImages/image-1594004698047.jpg',
				                   		'https://www.mvi-web.cn/resources/blogImages/image-1594004700828.jpg',
				                   		'https://www.mvi-web.cn/resources/blogImages/image-1594004501469.jpg'
									],
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				if(value==0){
					this.$confirm({
						title:'在微信中打开链接吗？',
						message:'',
						callback:(r)=>{
							console.log(r)
						}
					})
				}else if(value == 1){
					this.$alert({
						title:'在微信中打开链接吗？',
						message:'',
						callback:(r)=>{
							console.log(r)
						}
					})
				}else {
					this.$prompt({
						title:'在微信中打开链接吗？',
						message:'',
						callback:(r)=>{
							console.log(r)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
	}
</style>
