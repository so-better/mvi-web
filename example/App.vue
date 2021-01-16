<template>
	<div id="app">
		<div class="mvi-mb-4"><m-button @click="change">Button</m-button></div>
		<m-collapse v-model="active" accordion>
		    <m-collapse-item title="标题1" label="这是一个简单的标题">
		        风萧萧兮易水寒
		    </m-collapse-item>
		    <m-collapse-item title="标题2" label="这是一个简单的标题" content="风萧萧兮易水寒,壮士一去兮不复还"></m-collapse-item>
		    <m-collapse-item title="标题3" label="这是一个简单的标题">
		        <div class="mvi-bg-error" v-prop="0.5"></div>
		    </m-collapse-item>
		</m-collapse>
	</div>
</template>

<script>
export default {
	data() {
		return {
			arr: [1],
			show: false,
			date: null,
			value: '',
			active: 0,
			disabled: false,
			types: ['info', 'warn', 'primary', 'success', 'error', 'default'],
			placement: 'bottom',
			list: ['MVI', 'Bootstrap', 'Vue'],
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享给QQ好友'
				},
				{
					label: '分享到QQ空间'
				}
			]
		};
	},
	mounted() {},
	methods: {
		change() {
			this.show = !this.show;
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
