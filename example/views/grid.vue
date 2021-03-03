<template>
	<div>
		<m-row>
		    <m-col :md="{span:20}" :span="4" v-prop="0.5" class="mvi-bg-success"></m-col>
		    <m-col :span="4" v-prop="0.5" class="mvi-bg-error" :offset="4"></m-col>
		    <m-col :span="4" v-prop="0.5" class="mvi-bg-info" :offset="4"></m-col>
		</m-row>
	</div>
</template>

<script>
	export default {
		name:'demo-grid',
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
