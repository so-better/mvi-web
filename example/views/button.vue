<template>
	<div>
		<p>
			<m-button class="mvi-m-1">按钮</m-button>
			<m-button class="mvi-m-1" type="primary">按钮</m-button>
			<m-button class="mvi-m-1" type="info">按钮</m-button>
			<m-button class="mvi-m-1" type="success">按钮</m-button>
			<m-button class="mvi-m-1" type="warn">按钮</m-button>
			<m-button class="mvi-m-1" type="error">按钮</m-button>
		</p>
		<p>
			<m-button class="mvi-m-1" type="success" round>按钮</m-button>
			<m-button class="mvi-m-1" type="success" square>按钮</m-button>
		</p>
		<p>
			<m-button class="mvi-m-1" type="success" size="mini">按钮</m-button>
			<m-button class="mvi-m-1" type="success" size="small">按钮</m-button>
			<m-button class="mvi-m-1" type="success" size="large">按钮</m-button>
		</p>
		<p>
			<m-button class="mvi-m-1" disabled>按钮</m-button>
			<m-button class="mvi-m-1" tag="div">DIV按钮</m-button>
		</p>
		<p>
			<m-button class="mvi-m-1" loading load-text="正在加载...">按钮</m-button>
			<m-button loading class="mvi-m-1">
				<template v-slot:loading>
					<m-icon type="load-a" spin></m-icon>
				</template>
			</m-button>
		</p>
		<p>
			<m-button class="mvi-my-1" form-control>按钮</m-button>
		</p>
		<p>
			<m-button class="mvi-m-1" plain type="primary">按钮</m-button>
			<m-button class="mvi-m-1" plain type="info">按钮</m-button>
			<m-button class="mvi-m-1" plain plain type="success">按钮</m-button>
			<m-button class="mvi-m-1" plain type="warn">按钮</m-button>
			<m-button class="mvi-m-1" plain type="error">按钮</m-button>
			<m-button class="mvi-m-1" color="#ff3300">按钮</m-button>
			<m-button class="mvi-m-1" color="#ff3300" plain>按钮</m-button>
		</p>
	</div>
</template>

<script>
	export default {
		name:'demo-button',
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>
