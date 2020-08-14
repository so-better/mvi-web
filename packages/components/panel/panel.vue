<template>
	<div class="mvi-panel" v-on="listeners">
		<div :class="'mvi-panel-header'+(($slots.default || content)?' mvi-panel-header-border':'')" v-if="$slots.title || title">
			<slot name="title" v-if="$slots.title"></slot>
			<span v-else v-text="title"></span>
		</div>
		<div class="mvi-panel-content" v-if="$slots.default || content">
			<slot v-if="$slots.default"></slot>
			<span v-else v-text="content"></span>
		</div>
		<div :class="'mvi-panel-footer'+(($slots.default || content || $slots.title || title)?' mvi-panel-footer-border':'')" 
		v-if="$slots.footer || footer">
			<slot name="footer" v-if="$slots.footer"></slot>
			<span v-else v-text="footer"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"m-panel",
		props:{
			title:{
				type:String,
				default:null
			},
			content:{
				type:String,
				default:null
			},
			footer:{
				type:String,
				default:null
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../css/mvi-basic.less";
	
	.mvi-panel{
		display: block;
		position: relative;
		width: 100%;
		border: 1px solid @border-color;
		background-color: #fff;
	}
	
	.mvi-panel-header,.mvi-panel-content,.mvi-panel-footer{
		position: relative;
		display: block;
		width: 100%;
		line-height: 1.5;
		padding:@mp-sm;
	}
	
	.mvi-panel-header{
		font-size: @font-size-default;
		color: @font-color-default;
	}
	
	.mvi-panel-header.mvi-panel-header-border{
		border-bottom: 1px solid @border-color;
	}
	
	.mvi-panel-content{
		font-size: @font-size-default;
		color: @font-color-sub;
	}
	
	.mvi-panel-footer{
		font-size: @font-size-small;
		color: @font-color-mute;
		text-align: right;
	}
	
	
	.mvi-panel-footer.mvi-panel-footer-border{
		border-top: 1px solid @border-color;
	}
</style>
