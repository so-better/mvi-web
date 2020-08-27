<template>
	<div id="app" style="padding: .4rem;" ref="app">
		<div class="mvi-mb-10">
			<m-button type="success" @click="change">Button</m-button>
		</div>
		<div style="width:6rem;">
			<m-field v-model="value" round placeholder="请输入内容" clearable></m-field>
			<m-autocomplete v-model="value" :list="list" clearable></m-autocomplete>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				html: '',
				text: '',
				date: new Date(),
				value: '',
				active:-1,
				list:['ElementUI','iView','Vueifty','MVI','BootStrap','layUI']
			};
		},
		mounted() {

		},
		methods: {
			change(value) {
				console.log(value)
			},
			input(res) {
				console.log(res);
			}
		}
	};
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
		background-color: #fff;
	}
</style>
