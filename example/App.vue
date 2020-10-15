<template>
	<div id="app" ref="app" style="padding: 2.4rem;">
		<m-button @click="change" type="success" id="el">
			Button
		</m-button>
		<div id="top" style="width: 100%;height: 4rem;border: 1px solid #ccc;overflow: auto;">
			<div style="height: 40rem;"></div>
		</div>
		<pre id="pre">该方法用于获取元素的指定css样式值，不论是外联css文件的样式还是内联style标签的样式还是style属性上的样式，包括即使是默认样式，也都能获取，只要该样式值是元素当前生效的样式即可。该方法包含两个参数，第一个参数表示指定的元素，如果不是元素节点类型则默认为document.body，第二个参数表示想要获取的CSS样式名称。</pre>
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
				active: 2
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				this.$util.setScrollTop({
					el:document.getElementById("top"),
					number:1200,
					time:400
				})
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
