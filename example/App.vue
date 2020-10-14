<template>
	<div id="app" ref="app" style="padding: .4rem;">
		<m-button @click="change" type="success">
			Button
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
				options: [{
						label: '分享到朋友圈',
						sub:'tencent'
					},
					{
						label: '分享给QQ好友',
					},
					{
						label: '分享到QQ空间',
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			change(value) {
				this.show = true;
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
