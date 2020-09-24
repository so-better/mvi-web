<template>
	<div id="app" ref="app">
		<m-view style="overflow: auto;">
			<div style="height: 4rem;border: 1px solid #0A9455;overflow: auto;">
				<div style="height: 1rem;margin-bottom: 1rem;background-color: #29A329;" v-for="(item,index) in new Array(20)">{{index}}</div>
			</div>
			<div style="height: 1rem;margin-bottom: 1rem;background-color: #29A329;" v-for="(item,index) in new Array(20)">{{index}}</div>
		</m-view>
		<!-- <m-pull-refresh v-model="show" @refresh="change">
			<m-button type="info" @click="show=true">Button</m-button>
			<div style="height: 4rem;border: 1px solid #0A9455;overflow: auto;">
				<div style="height: 1rem;margin-bottom: 1rem;background-color: #29A329;" v-for="(item,index) in new Array(20)">{{index}}</div>
			</div>
			<div style="height: 1rem;margin-bottom: 1rem;background-color: #29A329;" v-for="(item,index) in new Array(20)">{{index}}</div>
		</m-pull-refresh> -->
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
		overflow: hidden;
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
