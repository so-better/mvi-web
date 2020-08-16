<template>
	<div id="app" style="padding: .4rem 0.4rem;" ref="app">
		<div class="mvi-mb-10"><m-button type="success" @click="change">Button</m-button></div>
		{{ html }}
		<div>{{ text }}</div>
		<m-editor
			ref="editor"
			:value="value"
			height="4rem"
			placeholder="请输入内容"
		></m-editor>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			html: '',
			text: '',
			value: ''
		};
	},
	computed: {},
	mounted() {
		this.html = this.$refs.editor.html;
		this.text = this.$refs.editor.text;
	},
	methods: {
		change(value) {
			this.html = this.$refs.editor.html;
			this.text = this.$refs.editor.text;
		},
		input(res) {
			console.log(res);
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
