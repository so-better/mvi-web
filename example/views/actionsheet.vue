<template>
	<div>
		<m-button @click="show = !show">动作列表</m-button>
		<m-actionsheet size="large" v-model="show" :options="options"></m-actionsheet>
	</div>
</template>

<script>
export default {
	name: 'demo-actionsheet',
	data() {
		return {
			show: false,
			options: [
				{
					label: '分享到朋友圈',
					sub:'LOL',
					disabled:true
				},
				{
					label: '分享给QQ好友分享给QQ好友分享给QQ好友分享给QQ好友分享给QQ好友',
					icon:{
						type:'user',
					},
					color:'#109828',
					sub:'share',
				},
				{
					label: '分享到QQ空间'
				}
			]
		};
	}
};
</script>

<style scoped lang="less"></style>
