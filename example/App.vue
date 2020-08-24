<template>
	<div id="app" style="padding: .4rem 0.4rem;" ref="app">
		<div class="mvi-mb-10"><m-button type="success" @click="change">Button</m-button></div>
		<m-editor :value="value" placeholder="请输入" trigger="hover" :menus="{custom:true,codeView:true}" :menu-icons="{custom:'ul'}" 
		:tooltips="{custom:'有序列表'}" @custom="customAction">
			
		</m-editor>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			html: '',
			text: '',
			date:new Date(),
			value: '<p>风萧萧兮易水寒，壮士一去兮不复还</p>',
			menus:{
				image:[
					{
						label:'上传图片',
						value:'upload'
					}
				]
			}
		};
	},
	mounted() {
		// this.html = this.$refs.editor.html;
		// this.text = this.$refs.editor.text;
	},
	methods: {
		change(value) {
			console.log(this.$refs.editor.html)
			console.log(this.$refs.editor.text)
		},
		input(res) {
			console.log(res);
		},
		customAction(e){
			console.log(e)
			if(e.key == 'custom'){
				document.execCommand('insertOrderedList');
			}
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
