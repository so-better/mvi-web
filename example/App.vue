<template>
	<div id="app">
		<m-button id="btn" @click="change">Button</m-button>
		<m-field v-model="value" type="textarea" :autosize="{minRows:3,maxRows:10}"></m-field>
	</div>
</template>

<script>
export default {
	data() {
		return {
			arr: [1],
			show: false,
			date: new Date(),
			value: '',
			active: 1,
			disabled: false,
			types: ['info', 'warn', 'primary', 'success', 'error', 'default'],
			placement: 'bottom',
			list: ['MVI', 'Bootstrap', 'Vue'],
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 2 //设置默认选项序列
			},
			images:['https://www.mvi-web.cn/resources/blogImages/KdnnVU16mC4UYjROoAya5025.jfif','https://www.mvi-web.cn/resources/blogImages/MLPDRICUjWWSWDW3OcLtRQ_p.jfif','https://www.mvi-web.cn/resources/blogImages/oQmx45AeZhuaAvrnTLBn6V6p.jfif'],
			descriptions:['风萧萧兮易水寒，壮士一去兮不复还','十年生死两茫茫，不思量自难忘']
		};
	},
	mounted() {
		
	},
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
	overflow-x: hidden;
	position: relative;
}

.scale-enter,.scale-leave-to{
	opacity: 0;
	transform: scale(0.6) translateX(0.5rem);
}
</style>
