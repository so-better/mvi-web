<template>
	<div id="app" ref="app" style="padding: 1rem;">
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date: new Date(),
				value: 'ff000',
				active:0,
				types:['info','warn','primary','success','error','default']
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
