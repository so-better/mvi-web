<template>
	<div id="app">
		<m-cell border title="标题" content="这是一个cell单元格"></m-cell>
		<m-cell title="标题" content="这是一个cell单元格"></m-cell>
		<m-button @click="$util.copyText('卧槽')">复制</m-button>
		<m-input v-model="value"></m-input>
	</div>
</template>
<script>
export default {
	data() {
		return {
			value:''
		};
	},
	mounted() {
		//console.log(this.$util.matchingText('1799-04-09','date'))
		//console.log(this.$util.matchingText('2021/03/19','date'))
		//console.log(this.$util.matchingText('2021.03.19','date'))
		//console.log(this.$util.matchingText('2021年03月03日','date'))
	}
};
</script>
<style lang="less">
html {
	font-size: 50px;
}
#app {
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	position: relative;
	width: 100%;
}
</style>
