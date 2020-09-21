<template>
	<div id="app" ref="app">
		<p>{{value}}</p>
		<m-button @click="change" type="info">Button</m-button>
		<m-field readonly></m-field>
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
				list:['elementUI','iView','bootstrap','mvi','amazeUI']
			}
		},
		mounted() {

		},
		methods: {
			change(value) {
				console.log(value)
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
	}

	.mvi-msgbox-lk-enter,
	.mvi-msgbox-lk-leave-to {
		opacity: 0 !important;
		transform: translate(-50%, -50%) scale(2) !important;
	}

	.mvi-msgbox-lk-enter-active,
	.mvi-msgbox-lk-leave-active {
		transition: all 500ms !important;
	}
</style>
