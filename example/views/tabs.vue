<template>
	<div>
		<m-tabs v-model="active" border offset=".4rem" flex="start">
			<m-tab disabled title="标签一标签一标签一标签一" icon="user" placement="right"><p>愿你三冬暖，愿你春不寒；愿你天黑有灯，下雨有伞。愿你路上有良人相伴。愿你三冬暖，愿你春不寒；愿你天黑有灯，下雨有伞。愿你路上有良人相伴。</p></m-tab>
			<m-tab :icon="{type:'success',color:'#ff3300'}" title="标签二"><p>待我君临天下，许你四海为家。待我了无牵挂，许你浪迹天涯。待我半生戎马。</p></m-tab>
			<m-tab title="标签三"><p>我跨过山，涉过水，见过万物复苏，周而复始，如今山是你，水也是你。</p></m-tab>
			<m-tab title="标签四"><p>纵然，从此一别两宽，各自欢喜，你也曾写进了他的生命里，虽非经久不衰，却最浓墨重彩。</p></m-tab>
		</m-tabs>
	</div>
</template>

<script>
export default {
	name: 'demo-tabs',
	data() {
		return {
			active:0
		};
	}
};
</script>

<style scoped lang="less"></style>
