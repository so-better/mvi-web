<template>
	<div>
		<m-button @click="alert" class="mvi-m-2">ALERT</m-button>
		<m-button @click="confirm" class="mvi-m-2">CONFIRM</m-button>
		<m-button @click="prompt" class="mvi-m-2">PROMPT</m-button>
	</div>
</template>

<script>
export default {
	name: 'demo-dialog',
	methods: {
		alert() {
			this.$alert({
				title: '合作条款',
				message:
					'十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。',
				btnText: 'I agree',
				btnColor:'#ff3300',
			});
		},
		confirm() {
			this.$confirm({
				title: '合作条款',
				message:
					'十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。',
				btnText: ['我同意','不同意'],
				btnColor:['#ff3300','#333']
			});
		},
		prompt() {
			this.$prompt({
				title: '温馨提示',
				message:'请输入密码',
				value:'z1983127',
				type:'password',
				placeholder:'密码',
				autofocus:true,
				clearable:true,
				align:'center',
				mode:'numeric'
			});
		}
	}
};
</script>

<style scoped lang="less"></style>
