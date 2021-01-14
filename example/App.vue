<template>
	<div id="app" class="mvi-p-4">
		<div class="mvi-mb-4">
			<m-button @click="change">Button</m-button>
		</div>
		<div class="mvi-ml-20" style="position: relative" id="root">
		    <m-button id="btn" type="success" @click="show=!show">Button</m-button>
		    <m-layer v-model="show" ref="layer" target="#btn" root="#root" width="3rem" placement="bottom" closable
			show-triangle>
		        <div class="mvi-p-2" style="height: 4rem;">
					这是一个悬浮层
				</div>
		    </m-layer>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			date: new Date(),
			value: '',
			active: 0,
			disabled:false,
			types: ['info', 'warn', 'primary', 'success', 'error', 'default']
		}
	},
	mounted() {
		
	},
	methods: {
		change() {
			this.show = !this.show
		}
	}
};
</script>

<style lang="less">
#app {
	height: 100%;
	overflow: auto;
	position: relative;
}
</style>
