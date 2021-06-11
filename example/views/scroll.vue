<template>
	<div>
		<div class="container" v-scroll="options">
			<div class="scroll">
				<m-button form-control type="success" class="top">顶部</m-button>
				<m-button form-control type="success" class="bottom">底部</m-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'demo-scroll',
	data() {
		return {
			options:{
				top: el => {
					this.$msgbox('到达顶部')
					console.log('到达顶部');
				},
				bottom: el => {
					this.$msgbox('到达底部')
					console.log('到达底部');
				}
			}
		};
	}
};
</script>

<style scoped lang="less">
	.container{
		display: block;
		width: 100%;
		height: 6rem;
		border: 1px solid #000000;
		overflow: auto;
		position: relative;
	}
	
	.scroll{
		height: 30rem;
		display: block;
		width: 100%;
		position: relative;
	}
	
	.top{
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.bottom{
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
