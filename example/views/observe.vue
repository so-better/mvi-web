<template>
	<div>
		<m-button :loading="loading" v-observe="options" @click="change">Button</m-button>
	</div>
</template>

<script>
	export default {
		name:'demo-observe',
		data(){
			return {
				loading:false,
				color:'#0b73de',
				options:{
					childList:true,
					subtree:true,
					attributeNames:['style'],
					childNodesChange:(addNodes,removeNodes)=>{
						console.log(addNodes,removeNodes)
					},
					
				}
			}
		},
		methods:{
			change(){
				this.loading = true;
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
