<template>
	<div id="app" style="" ref="app">
		<div class="mvi-mb-10">
			<m-button type="success" @click="change">Button</m-button>
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
				index: 0,
				active: -1,
				tabs: [{
						value: 0,
						name: '首页',
						icon:'home'
					},
					{
						value: 1,
						name: '附近',
						icon:'map'
					},
					{
						value: 2,
						name: '关注',
						icon:'check-o'
					},
					{
						value: 3,
						name: '我的',
						icon:'user-o'
					}
				],
				list: ['ElementUI', 'iView', 'Vueifty', 'MVI', 'BootStrap', 'layUI']
			};
		},
		mounted() {

		},
		methods: {
			change(value) {
				console.log(value)
				this.$alert({
					animation:'scale',
					message:'这是一个提示框'
				})
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
	}
</style>
