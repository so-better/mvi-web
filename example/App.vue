<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<m-button type="success" @click="change" plain>Button</m-button>
		<m-row>
			<m-col  :xs="{span:20}" :sm="{span:4}" style="height: 1rem;" class="mvi-bg-success"></m-col>
		</m-row>
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
