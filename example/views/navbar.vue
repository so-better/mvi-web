<template>
	<div>
		<m-navbar class="mvi-mb-4" border title="淘宝网首页" left-text="返回" left-icon="angle-left" right-text="退出" right-icon="logout"></m-navbar>
		<m-navbar class="mvi-mb-4" border left-text="返回" left-icon="angle-left" title="淘宝网首页淘宝网首页淘宝网首页淘宝网首页淘宝网首页"></m-navbar>
		<m-navbar border left-text="返回" left-icon="angle-left">
			<template v-slot:title>
				<input class="input" placeholder="搜索..." v-model="value" />
			</template>
		</m-navbar>
	</div>
</template>

<script>
	export default {
		name:'demo-navbar',
		data(){
			return {
				value:''
			}
		}
	}
</script>

<style scoped lang="less">
	.input{
		appearance: none;
		display: block;
		width: 100%;
		height: .64rem;
		border-radius: 999rem;
		border:none;
		background-color: #EBEDF0;
		font-size: .28rem;
		text-align: center;
	}
</style>
