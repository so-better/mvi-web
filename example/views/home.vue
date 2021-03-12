<template>
	<div>
		<router-link class="el" tag="div" v-for="(item,index) in componentKeys" :key="'cmp-'+index" v-text="item" :to="'/'+item"></router-link>
	</div>
</template>

<script>
	import components from "../../packages/components"
	export default {
		name:'home',
		computed:{
			componentKeys(){
				return Object.keys(components)
			}
		}
	}
</script>

<style lang="less" scoped>
	.el{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: .88rem;
		border-bottom: 1px solid #ddd;
		
		&:active{
			background-color: #EBEDF0;
			cursor: pointer;
		}
		
		&:last-child{
			border-bottom: none;
		}
	}
</style>
