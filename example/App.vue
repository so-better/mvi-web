<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<m-button type="success" @click="change" plain>Button</m-button>
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
