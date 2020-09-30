<template>
	<div id="app" ref="app">
		<m-button @click="change" :loading="show" type="success">
			Button
			<template v-slot:load>
				<m-icon type="load-b" spin class="mvi-mr-1" /> LOADING...
			</template>
		</m-button>
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
				this.show = true;
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
