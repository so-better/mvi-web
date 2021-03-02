<template>
	<div>
		<m-circle-progress size="4rem" stroke-width=".4rem" :clock-wise="false" v-model="value" :max="1100" :min="100" show-tip></m-circle-progress>
	</div>
</template>

<script>
	export default {
		name:'demo-circleProgress',
		data(){
			return {
				value:800
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
