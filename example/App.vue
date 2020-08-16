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
			:menus="{
				op:[
					{
						label:'清空内容',
						value:'deleteAll',
						icon:'check-square'
					},
					{
						label:'弹出一个框',
						value:'alert',
						icon:'check-square'
					}
				]
			}"
			
			:menuIcons="{
				op:'success'
			}"
			
			:tooltips="{
				op:'自定义操作'
			}"
			
			@custom="customAction"
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
			value: '<p>风萧萧兮易水寒，壮士一去兮不复还</p>'
		};
	},
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
		},
		customAction(e){
			console.log(this.$refs.editor.getSelectNode())
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
