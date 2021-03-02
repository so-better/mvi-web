<template>
	<div>
		<m-swipe-cell ref="swipeCell" @open="open" @close="close">
			<!-- 左侧隐藏区域，需要右滑显示 -->
			<template v-slot:left>
				<div style="background-color: #ff3300;width:.88rem;height: 100%;color: #fff;" class="mvi-flex-center">添加</div>
			</template>
			<!-- 右侧隐藏区域，需要左滑显示 -->
			<template v-slot:right>
				<div style="background-color: #ff3300;width:.88rem;height: 100%;color: #fff;" class="mvi-flex-center">删除</div>
			</template>
			<!-- 主内容 -->
			<m-cell title="标题" arrow="angle-right" content="内容"></m-cell>
		</m-swipe-cell>
	</div>
</template>

<script>
export default {
	name: 'demo-swipeCell',
	data() {
		return {};
	},
	methods:{
		open(placement){
			console.log(placement)
		},
		close(placement){
			console.log(placement)
		}
	}
};
</script>

<style scoped lang="less"></style>
