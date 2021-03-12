<template>
	<div>
		<m-navbar style="background-color: #0000FF;color: #fff;" class="mvi-mb-4" border title="淘宝网" left-icon="angle-left"></m-navbar>
		<m-navbar class="mvi-mb-4" border title="淘宝网" left-icon="angle-left" left-text="返回"></m-navbar>
		<m-navbar class="mvi-mb-4" border title="淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网" left-icon="angle-left" left-text="返回" right-icon="user-alt"></m-navbar>
		<m-navbar class="mvi-mb-4" border title="淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网" left-icon="angle-left" left-text="返回" right-text="退出" right-icon="logout"></m-navbar>
		<m-navbar class="mvi-mb-4" border  title="淘宝网" right-icon="logout"></m-navbar>
		<m-navbar class="mvi-mb-4" border  title="淘宝网" right-icon="logout" left-icon="angle-left"></m-navbar>
		<m-navbar class="mvi-mb-4" border  title="淘宝网" right-icon="logout" right-text="退出"></m-navbar>
		<m-navbar class="mvi-mb-4" border  title="淘宝网" right-icon="logout" right-text="退出" left-icon="angle-left"
		@left-click="doClick" @title-click="doClick" @right-click="doClick"></m-navbar>
		<m-navbar class="mvi-mb-4" border left-icon="angle-left" right-icon="logout"></m-navbar>
		<m-navbar class="mvi-mb-4" border left-text="返回" left-icon="angle-left" right-icon="logout"></m-navbar>
		<m-navbar class="mvi-mb-4" border left-icon="angle-left" right-icon="logout" right-text="退出"></m-navbar>
		<m-navbar class="mvi-mb-4" border left-icon="angle-left">
			<template v-slot:right>
				<m-button size="mini" type="primary">主页</m-button>
			</template>
		</m-navbar>
		<m-navbar class="mvi-mb-4" border title="淘宝网">
			<template v-slot:left>
				<m-button size="mini" type="primary"><m-icon type="angle-left"></m-icon>返回</m-button>
			</template>
		</m-navbar>
		<m-navbar class="mvi-mb-4" border left-text="返回" left-icon="angle-left" right-icon="logout" right-text="退出"></m-navbar>
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
		},
		methods:{
			doClick(){
				this.$msgbox('click')
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
