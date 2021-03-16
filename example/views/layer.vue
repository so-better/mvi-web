<template>
	<div>
		<div style="position: relative" id="root">
		    <m-button @click="showLayer" id="btn" type="success">Button</m-button>
		    <m-layer v-model="show" ref="layer" target="#btn" root="#root" wrapper-class="mvi-text-white" show-triangle	
			border-color="#0b73de" background="#0b73de" closable>
				<p class="mvi-p-4">这是一个悬浮层</p>
		    </m-layer>
		</div>
	</div>
</template>

<script>
	export default {
		name:'demo-layer',
		data(){
			return {
				show:false
			}
		},
		methods:{
			showLayer(){
				this.show = !this.show
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
