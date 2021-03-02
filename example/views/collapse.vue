<template>
	<div>
		<m-collapse v-model="value" accordion no-wrap open-arrow="arrow-down" close-arrow="arrow-up" :timeout="800">
		    <m-collapse-item title="标题1标题1标题1标题1标题1标题1标题1标题1" label="这是一个简单的标题这是一个简单的标题这是一个简单的标题这是一个简单的标题这是一个简单的标题">
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
		name:'demo-collapse',
		data(){
			return {
				value:0
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
