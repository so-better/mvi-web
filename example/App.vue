<template>
	<div id="app" ref="app">
		<m-button @click="change" type="success">
			Button
		</m-button>
		<div style="height: 20rem;"></div>
		<m-button form-control>这里是底部</m-button>
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
				value: 0,
				index: 0,
				active: 2,
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
						icon:'file'
					},
					{
						value: 3,
						name: '我的',
						icon:'user'
					}
				]
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {

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
