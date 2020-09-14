<template>
	<div id="app" style="padding: .4rem;" ref="app">
		<div class="mvi-mb-10">
			<m-button type="success" @click="change">Button</m-button>
		</div>
		<div v-scroll="options" style="width: 100%;height: 4rem;overflow: auto;position: relative;">
			<div style="width: 100%;height: 40rem;"></div>
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
				value: '1',
				index: 0,
				active: -1,
				options:{
					bottom(el){
						console.log('到底部了')
					}
				}
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				this.show = true
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
