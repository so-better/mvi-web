<template>
	<div id="app" style="padding: .4rem 6rem;" ref="app">
		<m-button type="success" @click="change">Button</m-button>
		{{date.toLocaleDateString()}}
		<m-date-chooser v-model="date" ref="chooser">
			<m-button>选择日期</m-button>
		</m-date-chooser>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date:new Date('2020/08/13 10:30:00'),
				startDate:new Date('2020/08/13 10:04:00'),
				endDate:new Date('2020/08/13 11:10:00')
			};
		},
		computed: {},
		mounted() {
			
		},
		methods: {
			change(value) {
				//this.$refs.chooser.show = true;
			}
		}
	};
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
	}
</style>
