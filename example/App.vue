<template>
	<div id="app" ref="app">
		<m-pull-refresh v-model="show" @refresh="change">
			{{show}}
			<m-button type="info" @click="show=true">Button</m-button>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eeeeee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
			<div style="height: 1rem;background-color: #eee;margin-bottom: 1rem;"></div>
		</m-pull-refresh>
		
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
				list: ['elementUI', 'iView', 'bootstrap', 'mvi', 'amazeUI']
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				setTimeout(()=>{
					this.show = false;
				},2000)
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
