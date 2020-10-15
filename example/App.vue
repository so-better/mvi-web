<template>
	<div id="app" ref="app" style="padding: 1rem;">
		<div>
			<m-button class="mvi-m-2" v-for="(item,index) in types" :key="'btn-'+item" :type="item">Button</m-button>
		</div>
		<div>
			<m-button class="mvi-m-2" v-for="(item,index) in types" :key="'btn-'+item" plain :type="item">Button</m-button>
		</div>
		<div>
			<m-button class="mvi-m-2" color="#eac3f1" sub-color="#ca37e4">Button</m-button>
			<m-button class="mvi-m-2" color="#ca37e4" sub-color="#eac3f1">Button</m-button>
			<m-button class="mvi-m-2" color="#b190ea" sub-color="#864bef">Button</m-button>
			<m-button class="mvi-m-2" color="#864bef" sub-color="#b190ea">Button</m-button>
		</div>
		<div>
			<m-button class="mvi-m-2" color="#ca37e4" sub-color="#eac3f1" plain>Button</m-button>
			<m-button class="mvi-m-2" color="#864bef" sub-color="#b190ea" plain>Button</m-button>
		</div>
		<div>
			<m-button class="mvi-m-2" type="success" loading>Button</m-button>
			<m-button class="mvi-m-2" type="success" loading>
				Button
				<template v-slot:load>
					<m-icon type="load-a" spin/>
					<span class="mvi-ml-1">LOADING...</span>
				</template>
			</m-button>
			<m-button class="mvi-m-2" type="success" loading>
				Button
				<template v-slot:load>
					<m-icon type="load-b" spin/>
					<span class="mvi-ml-1">正在全速加载中...</span>
				</template>
			</m-button>
			<m-button class="mvi-m-2" type="success" loading>
				Button
				<template v-slot:load>
					<m-icon type="load-c" spin/>
					<span class="mvi-ml-1">LOADING...</span>
				</template>
			</m-button>
			<m-button class="mvi-m-2" type="success"  loading>
				Button
				<template v-slot:load>
					<m-icon type="load-d" spin/>
					<span class="mvi-ml-1">LOADING...</span>
				</template>
			</m-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				date: new Date(),
				value: '',
				active:0,
				types:['info','warn','primary','success','error','default']
			}
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
	}
</style>
