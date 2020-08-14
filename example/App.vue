<template>
	<div id="app" style="padding: .4rem 0.4rem;" ref="app">
		<div class="mvi-mb-10"><m-button type="success" @click="change">Button</m-button></div>
		<m-editor v-model="value" placeholder="请输入文章内容" >
			
		</m-editor>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value:'<p>鲜衣怒马少年时</p><p>一日看尽长安花</p>'
			};
		},
		computed: {},
		mounted() {
			
		},
		methods: {
			change(value) {
				this.show = true;
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
