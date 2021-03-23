<template>
	<div>
		<m-modal local show title="模态框">
			<div style="position: relative;padding-left: 2rem;" id="root">
				<div style="position: relative;" id="root2">
					<m-button @click="showLayer" id="btn" type="success">Button</m-button>
					<m-layer fixed-auto v-model="show" fixed ref="layer" target="#btn" wrapper-class="mvi-text-white" show-triangle	
					border-color="#0b73de" background="#0b73de" closable>
						<p class="mvi-p-4">这是一个悬浮层</p>
					</m-layer>
				</div>
			</div>
		</m-modal>
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
