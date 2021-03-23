<template>
	<div id="app"><router-view></router-view></div>
</template>
<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted() {
			//console.log(this.$util.matchingText('1799-04-09','date'))
			//console.log(this.$util.matchingText('2021/03/19','date'))
			//console.log(this.$util.matchingText('2021.03.19','date'))
			//console.log(this.$util.matchingText('2021年03月03日','date'))
		}
	}
</script>
<style lang="less">
#app {
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	position: relative;
	width: 100%;
}
</style>
