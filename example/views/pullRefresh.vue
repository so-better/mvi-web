<template>
	<div>
		<m-pull-refresh v-model="refresh" @refresh="change" :distance="2" :pulling-icon="{color:'#ff3300'}"></m-pull-refresh>
	</div>
</template>

<script>
export default {
	name:'demo-pullRefresh',
	data(){
		return {
			refresh:false
		}
	},
	methods:{
		change(){
			setTimeout(()=>{
				this.refresh = false;//取消刷新状态
				this.$msgbox('刷新完成');
			},3000)
		}
	}
}
</script>

<style scoped lang="less"></style>
