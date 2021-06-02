<template>
	<div>
		<div class="container">
			<router-link class="el" tag="div" v-for="(item,index) in componentKeys" :key="'cmp-'+index" v-text="item" :to="'/'+item"></router-link>
		</div>
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
	.container{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		width: 100%;
	}
	.el{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		font-size: .24rem;
		font-weight: 500;
		
		&:nth-child(3n-2){
			border-left: 1px solid #ddd;
		}
		
		&:nth-child(-n + 3){
			border-top: 1px solid #ddd;
		}
		
		&:active{
			background-color: #EBEDF0;
			cursor: pointer;
		}
	}
</style>
