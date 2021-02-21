<template>
	<div id="app">
		<div style="height: 10rem;"></div>
		<m-button style="margin-left:5.4rem;margin-top:1rem;" id="btn" @click="change">Button</m-button>
		<m-layer v-model="show" root="#app" target="#btn" placement="left-end" show-triangle width="3rem">
			<div style="height: 3rem;"></div>
		</m-layer>
		<div style="height: 20rem;"></div>
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
