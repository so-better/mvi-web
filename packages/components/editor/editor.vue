<template>
	<div class="mvi-editor" v-on="listeners">
		<div class="mvi-editor-menus">
			<m-editor-item v-if="showMenuItem(item)" v-for="(item,index) in computedMenuKeys" :key="'mvi-editor-menu-'+index"
			:value="item" :menu="computedMenus[item]"></m-editor-item>
		</div>
		<div class="mvi-editor-body">
			<div ref="content" @blur="saveRange" :class="contentClass" :contenteditable="!disabled" :style="contentStyle" v-html="value"></div>
		</div>
	</div>
</template>

<script>
import $util from '../../util/util.js'
import editorItem from "./edotir-item"
export default {
	name: 'm-editor',
	data() {
		return {
			range:null,//选区
			defaultLayerProps:{//默认菜单浮层配置
				fixed:false,//是否fixed
				placement:'bottom-start',//位置
				zIndex:400,//浮层z-index
			},
			defaultMenus: {//默认菜单配置
				undo:true, //撤销
				redo:true,//恢复
				tag: [//标签
					{
						label:'H1',
						value:'h1'
					},
					{
						label:'H2',
						value:'h2'
					},
					{
						label:'H3',
						value:'h3'
					},
					{
						label:'H4',
						value:'h4'
					},
					{
						label:'H5',
						value:'h5'
					},
					{
						label:'H6',
						value:'h6'
					},
					{
						label:'段落',
						value:'p'
					}
				], 
				fontSize: [//字号
					{
						label: '12px',
						value: '0.24rem'
					},
					{
						label: '14px',
						value: '0.28rem'
					},
					{
						label: '16px',
						value: '0.32rem'
					},
					{
						label: '20px',
						value: '0.4rem'
					},
					{
						label: '30px',
						value: '0.6rem'
					},
					{
						label: '40px',
						value: '0.8rem'
					}
				], 
				fontFamily: ['PingFang SC', 'Helvetica Neue', 'kaiTi', 'Microsoft YaHei', 'Arial', 'sans-serif'], //字体
				bold:true,//加粗
				italic:true,//斜体 
				underline:true,//下划线
				strikeThrough:true,//删除线 
				subscript:true,//下标
				superscript: true,//上标
				foreColor: [//字体颜色
					'#333',
					'#ff0000',
					'#505050',
					'#808080',
					'#bbb',
					'#ddd',
					'#eee',
					'#f7f7f7',
					'#0a9455',
					'#03a8f3',
					'#ec1a0a',
					'#f90',
					'#07C160',
					'#0b73de',
					'#e2e7ea',
					'#c3ebff',
					'#c2fdc4',
					'#ffd6b6',
					'#1eacf3',
					'#f9cec3'
				], 
				backColor: [//背景色
					'#505050',
					'#808080',
					'#bbb',
					'#ddd',
					'#eee',
					'#f7f7f7',
					'#0a9455',
					'#03a8f3',
					'#ec1a0a',
					'#f90',
					'#07C160',
					'#0b73de',
					'#e2e7ea',
					'#c3ebff',
					'#c2fdc4',
					'#ffd6b6',
					'#1eacf3',
					'#f9cec3'
				], 
				list: [//列表
					{
						label: '有序列表',
						value: 'ol'
					},
					{
						label: '无序列表',
						value: 'ul'
					}
				],
				justify: [//对齐方式
					{
						label: '左对齐',
						value: 'left'
					},
					{
						label: '居中对齐',
						value: 'center'
					},
					{
						label: '右对齐',
						value: 'right'
					},
					{
						label: '两端对齐',
						value: 'justify'
					}
				],
				quote:true,//引用
				link: [{//链接
					label:'插入链接',
					value:'link'
				}],
				image: [//插入图片
					{
						label:'本地上传',
						value:'upload'
					},
					{
						label:'网络图片',
						value:'remote'
					}
				], 
				video: [//插入视频
					{
						label:'本地上传',
						value:'upload'
					},
					{
						label:'网络视频',
						value:'remote'
					}
				], 
				table: [//插入表格
					{
						label:'插入表格',
						value:'table'
					}
				], 
				code:true,//插入代码 
			},
			defaultTooltips:{//默认的工具提示内容
				undo:'撤销',
				redo:'重做',
				tag:'标签',
				fontSize:'字号',
				fontFamily:'字体',
				bold:'加粗',
				italic:'斜体',
				underline:'下划线',
				strikeThrough:'删除线',
				subscript:'下标',
				superscript:'上标',
				foreColor:'字体颜色',
				backColor:'背景色',
				list:'列表',
				justify:'对齐方式',
				quote:'引用',
				link:'插入链接',
				image:'插入图片',
				video:'插入视频',
				table:'插入表格',
				code:'插入代码'
			},
			defaultTooltipProps:{//默认工具提示组件参数配置
				placement:'bottom',
				timeout:400,
				color:'#333',
				textColor:'#fff',
				borderColor:'#333'
			},
			defaultUploadImageProps:{//默认上传图片配置
				multiple:false,//是否多选
				allowedFileType:['jpg','png','JPG','PNG','JPEG','jpeg','gif','GIF'],//限定格式
				accept:'image',//限制类型
				minSize:-1,//限制单个图片最小值，单位kb
				maxSize:-1,//限定单个图片最大值，单位kb
				minLength:-1,//多选时选择图片的最小数量
				maxLength:-1,//多选时选择图片的最大数量
			},
			defaultUploadVideoProps:{//默认上传视频配置
				multiple:false,//是否多选
				allowedFileType:['mp4','MP4','avi','AVI','WAV','wav'],//限定格式
				accept:'video',//限制类型
				minSize:-1,//限制单个视频最小值，单位kb
				maxSize:-1,//限定单个视频最大值，单位kb
				minLength:-1,//多选时选择视频的最小数量
				maxLength:-1,//多选时选择视频的最大数量
			},
			defaultVideoShowProps:{//视频显示设置
				autoplay:true,//视频是否自动播放
				muted:true,//视频静音
				controls:false,//是否显示控制器
				loop:false,//是否循环
			}
		}
	},
	model: {
		prop: 'value',
		event: 'model-change'
	},
	props: {
		//值
		value: {
			type: String,
			default: ''
		},
		//占位符
		placeholder: {
			type: String,
			default: ''
		},
		//初始高度
		height: {
			type: String,
			default: null
		},
		//编辑区域高度是否自动变化
		autoHeight: {
			type: Boolean,
			default: false
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//菜单配置
		menus: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//菜单项浮层参数
		layerProps:{
			type:Object,
			default:function(){
				return {}
			}
		},
		//触发悬浮层显现的方式
		trigger: {
			type: String,
			default: 'click',
			validator(value) {
				return ['hover', 'click'].includes(value);
			}
		},
		//本地上传文件是否使用base64
		useBase64:{
			type:Boolean,
			default:true
		},
		//提示内容配置
		tooltips:{
			type:Object,
			default:function(){
				return {}
			}
		},
		//提示组件参数配置
		tooltipProps:{
			type:Object,
			default:function(){
				return {}
			}
		},
		//自定义上传图片配置
		uploadImageProps:{
			type:Object,
			default:function(){
				return {}
			}
		},
		//自定义上传视频配置
		uploadVideoProps:{
			type:Object,
			default:function(){
				return {}
			}
		},
		//自定义上传图片出错回调
		uploadImageError:{
			type:Function
		},
		//自定义上传视频出错回调
		uploadVideoError:{
			type:Function
		},
		//自定义视频显示设置
		videoShowProps:{
			type:Object,
			default:function(){
				return {}
			}
		}
	},
	computed: {
		listeners() {
			return Object.assign({}, this.$listeners);
		},
		//是否显示指定菜单项
		showMenuItem(){
			return key=>{
				if(typeof(this.computedMenus[key]) == 'boolean'){
					return this.computedMenus[key];
				}else if (Array.isArray(this.computedMenus[key])){
					return this.computedMenus[key].length > 0;
				}else {
					return false;
				}
			}
		},
		//菜单配置值
		computedMenus() {
			var menus = {};
			Object.keys(this.defaultMenus).forEach(key => {
				//数组
				if (Array.isArray(this.defaultMenus[key])) {
					var newArray = [];
					this.defaultMenus[key].forEach(item => {
						if ($util.isObject(item) && item.label && item.value) {
							newArray.push({
								label: item.label,
								value: item.value
							})
						} else if (typeof item == 'string' || $util.isNumber(item)) {
							newArray.push({
								label: item,
								value: item
							})
						}
					});
					menus[key] = newArray;
				}else if(typeof(this.defaultMenus[key]) == 'boolean'){//非数组情况只能是布尔值
					menus[key] = this.defaultMenus[key];
				}
			});
			return menus;
		},
		//菜单配置项所有的键数组
		computedMenuKeys() {
			return Object.keys(this.computedMenus);
		},
		//编辑区域样式类
		contentClass() {
			var cls = 'mvi-editor-content';
			if (this.autoHeight) {
				cls += ' mvi-editor-content-auto';
			}
			return cls;
		},
		//编辑区域样式
		contentStyle() {
			var style = {};
			if (this.autoHeight) {
				if (this.height) {
					style.minHeight = this.height;
				}
			} else {
				if (this.height) {
					style.height = this.height;
				}
			}
			return style;
		}
	},
	provide(){
		return {
			editor:this
		}
	},
	components:{
		mEditorItem:editorItem
	},
	mounted() {
		this.init()
		console.log(this.computedMenus)
	},
	methods: {
		//初始化
		init() {
			//将自定义的菜单项浮层配置与默认配置整合
			Object.assign(this.defaultLayerProps,this.layerProps)
			//将自定义的菜单栏配置与默认配置整合
			Object.assign(this.defaultMenus, this.menus)
			//将自定义的提示内容与默认提示整合
			Object.assign(this.defaultTooltips,this.tooltips)
			//将自定义的工具提示组件参数与默认工具提示组件参数整合
			Object.assign(this.defaultTooltipProps,this.tooltipProps)
			//将自定义上传图片配置参数与默认上传图片配置参数整合
			Object.assign(this.defaultUploadImageProps,this.uploadImageProps)
			//将自定义上传视频配置参数与默认上传视频配置参数整合
			Object.assign(this.defaultUploadVideoProps,this.uploadVideoProps)
			//定义段落分隔符
			document.execCommand('defaultParagraphSeparator', false, 'p');
			//使用css
			document.execCommand('styleWithCSS', false, true);
		},
		//对外提供的用以插入图片的api
		insertImage(url){
			document.execCommand('insertHtml',false,`<img src="${url}" class="mvi-editor-image" />`)
		},
		//对外提供的用以插入视频的api
		insertVideo(url){
			var video = $util.string2dom(`<video src="${url}" class="mvi-editor-video"></video>`);
			if(this.defaultVideoShowProps.muted){
				video.setAttribute('muted','muted')
			}
			if(this.defaultVideoShowProps.loop){
				video.setAttribute('loop','loop')
			}
			if(this.defaultVideoShowProps.controls){
				video.setAttribute('controls','controls')
			}
			if(this.defaultVideoShowProps.autoplay){
				video.setAttribute('autoplay','autoplay')
			}
			document.execCommand('insertHtml',false,video.outerHTML)
		},
		//保存选区
		saveRange() {
			this.range = null;
			var selection = window.getSelection();
			if(selection.getRangeAt && selection.rangeCount){
				this.range = selection.getRangeAt(0)
			}
		},
		//恢复选区
		restoreRange(){
			var selection = window.getSelection();
			selection.removeAllRanges();
			if(this.range){
				selection.addRange(this.range)
			}
		}
	},
	
};
</script>

<style lang="less">
	.mvi-editor-image{
		display: inline-block;
		width: auto;
		height: auto;
		max-width: 100%;
	}
	
	.mvi-editor-video{
		display: inline-block;
		width: auto;
		height: auto;
		max-width: 100%;
	}
</style>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-editor {
	display: block;
	position: relative;
	width: 100%;
}

.mvi-editor-menus {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
	-webkit-flex-wrap: wrap;
}

.mvi-editor-body{
	display: block;
	position: relative;
	padding: @mp-sm;
	width: 100%;
	
	.mvi-editor-content {
		display: block;
		position: relative;
		width: 100%;
		border: 1px solid @border-color;
		height: 8rem;
		background-color: #fff;
		border-radius: @radius-default;
		margin: 0;
		padding: @mp-sm;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: @font-size-default;
		color: @font-color-default;
		
		&.mvi-editor-content-auto {
			height: auto;
			min-height: 8rem;
			overflow: hidden;
		}
	
	}
}
</style>
