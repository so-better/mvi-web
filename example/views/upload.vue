<template>
	<div>
		<m-button v-upload="options">Button</m-button>
		<m-button @click="getFiles">获取选择的文件</m-button>
		<m-button @click="clearFiles">清空</m-button>
		<div>
			<p v-for="(item,index) in files" :key="'file-'+index" v-text="item.name"></p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-upload',
		data(){
			return {
				files:[],
				upload:null,
				options:{
					//accept:'image',
					//allowedFileType:['jpg'],
					//multiple:true,
					//maxLength:2,
					extra:{
						name:'lk'
					},
					select:(files,extra)=>{
						console.log(files,extra)
						this.files = files
					},
					error:(state,message,file)=>{
						console.log(state,message,file)
					},
					ready:Upload=>{
						this.upload = Upload
					}
				}
			}
		},
		methods:{
			getFiles(){
				console.log(this.upload.getFiles())
			},
			clearFiles(){
				this.upload.clear()
				this.upload.setEnabled()
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
