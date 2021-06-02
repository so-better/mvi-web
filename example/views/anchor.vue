<template>
	<div>
		<m-button v-anchor="options" form-control>查看详情</m-button>
		<div style="margin: 20rem 0;" id="target">
			十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。
			夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。
		</div>
	</div>
</template>

<script>
export default {
	name: 'demo-anchor',
	data() {
		return {
			options: {
				target: '#target',
				root: '#app',
				time: 400,
				distance:2,
				callback: () => {
					this.$msgbox('定位结束');
				}
			}
		};
	}
};
</script>

<style></style>
