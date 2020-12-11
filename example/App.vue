<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<m-button type="success" @click="change" plain>Button</m-button>
		<m-button type="success" @click="show=true;active=2" plain>Button</m-button>
		<m-image-preview v-model="show" :images="['https://www.mvi-web.cn/resources/blogImages/image-1594004700828.jpg','https://res.32gamepay.com/res/messageBoard/202012/messageBoardActivity/356a8791-fbcb-4053-b043-6a83d2b62249.jpg','https://res.32gamepay.com/res/messageBoard/202012/messageBoardActivity/e224b722-284f-4c9e-98e4-72b4ca354263.jpg']" :active="active"></m-image-preview>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date: new Date(),
				value: 'ff000',
				active: 0,
				types: ['info', 'warn', 'primary', 'success', 'error', 'default']
			}
		},
		mounted() {
			
		},
		methods: {
			change(){
				this.show = true;
				this.active = 1
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
