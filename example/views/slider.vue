<template>
	<div>
		<p>{{value}}</p>
		<m-slider style="height: 7rem;" square bar-height=".4rem" v-model="value" vertical active-color="#ff3300"  :min="100" :max="1100"></m-slider>
	</div>
</template>

<script>
	export default {
		name:'demo-slider',
		data(){
			return {
				value:400
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
