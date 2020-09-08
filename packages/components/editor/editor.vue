<template>
	<div class="mvi-editor">
		<div class="mvi-editor-menus" :style="{border:(border?'':'none')}" v-if="showMenus" :disabled="disabled">
			<m-editor-item
				v-if="showMenuItem(item)"
				v-for="(item, index) in computedMenuKeys"
				:key="'mvi-editor-menu-' + index"
				:value="item"
				:menu="computedMenus[item]"
				ref="menu"
			></m-editor-item>
		</div>
		<div class="mvi-editor-body">
			<div v-if="codeViewShow" v-text="computedValue" key="code" :contenteditable="!disabled" :style="codeViewStyle"
			:class="codeViewClass" ref="codeView" @input="codeViewInput" @keydown="tabDown" v-on="listeners"></div>
			<div v-else ref="content" @click="changeActive" @input="contentInput" :class="contentClass" key="content" @keydown="tabDown"
			:contenteditable="!disabled" :style="contentStyle" v-html="computedValue" :data-placeholder="placeholder" v-on="listeners"></div>
		</div>
	</div>
</template>

<script>
import $util from '../../util/util.js';
import editorItem from './edotir-item';
export default {
	name: 'm-editor',
	data() {
		return {
			range: null, //选区
			codeViewShow:false,//源码是否显示
			html:'',//html内容
			text:'',//text内容
			defaultLayerProps: {//默认菜单浮层配置
				fixed: false, //是否fixed
				placement: 'bottom-start', //位置
				zIndex: 400 //浮层z-index
			},
			defaultMenus: {//默认菜单配置
				undo: true, //撤销
				redo: true, //恢复
				removeFormat:true,//移除格式
				selectAll:true,//全选
				divider:true,//分割线
				tag: [
					//标签
					{
						label: 'H1',
						value: 'h1'
					},
					{
						label: 'H2',
						value: 'h2'
					},
					{
						label: 'H3',
						value: 'h3'
					},
					{
						label: 'H4',
						value: 'h4'
					},
					{
						label: 'H5',
						value: 'h5'
					},
					{
						label: 'H6',
						value: 'h6'
					},
					{
						label: '段落',
						value: 'p'
					}
				],
				fontSize: [
					//字号
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
				bold: true, //加粗
				italic: true, //斜体
				underline: true, //下划线
				strikeThrough: true, //删除线
				subscript: true, //下标
				superscript: true, //上标
				foreColor: [//字体颜色
					'#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF',
					'#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF',
					'#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
					'#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
					'#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
					'#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B',
					'#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
					'#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
				],
				backColor: [//背景色
					'#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF',
					'#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF',
					'#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
					'#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
					'#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
					'#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B',
					'#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
					'#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
				],
				list: [//列表
					{
						label: '有序列表',
						value: 'ol',
						icon:'ol'
					},
					{
						label: '无序列表',
						value: 'ul',
						icon:'ul'
					}
				],
				justify: [//对齐方式
					{
						label: '左对齐',
						value: 'left',
						icon: 'align-left'
					},
					{
						label: '居中对齐',
						value: 'center',
						icon:'align-center'
					},
					{
						label: '右对齐',
						value: 'right',
						icon: 'align-right'
					},
					{
						label: '两端对齐',
						value: 'justify',
						icon: 'align-justify'
					}
				],
				quote: true, //引用
				link: [//链接
					{			
						label: '插入链接',
						value: 'link'
					}
				],
				image: [//插入图片
					{
						label: '本地上传',
						value: 'upload'
					},
					{
						label: '网络图片',
						value: 'remote'
					}
				],
				video: [//插入视频
					{
						label: '本地上传',
						value: 'upload'
					},
					{
						label: '网络视频',
						value: 'remote'
					}
				],
				table: [//插入表格
					{
						label: '插入表格',
						value: 'table'
					}
				],
				code: true ,//插入代码
				codeView:false,//显示源码
			},
			defaultTooltips: {//默认的工具提示内容
				undo: '撤销',
				redo: '恢复',
				removeFormat:'清除格式',
				selectAll:'全选',
				divider:'分割线',
				tag: '标签',
				fontSize: '字号',
				fontFamily: '字体',
				bold: '加粗',
				italic: '斜体',
				underline: '下划线',
				strikeThrough: '删除线',
				subscript: '下标',
				superscript: '上标',
				foreColor: '字体颜色',
				backColor: '背景色',
				list: '列表',
				justify: '对齐方式',
				quote: '引用',
				link: '插入链接',
				image: '插入图片',
				video: '插入视频',
				table: '插入表格',
				code: '插入代码',
				codeView:'显示源码'
			},
			defaultTooltipProps: {//默认工具提示组件参数配置
				placement: 'bottom',
				timeout: 400,
				color: '#333',
				textColor: '#fff',
				borderColor: '#333'
			},
			defaultUploadImageProps: {//默认上传图片配置
				multiple: false, //是否多选
				allowedFileType: ['jpg', 'png', 'JPG', 'PNG', 'JPEG', 'jpeg', 'gif', 'GIF'], //限定格式
				accept: 'image', //限制类型
				minSize: -1, //限制单个图片最小值，单位kb
				maxSize: -1, //限定单个图片最大值，单位kb
				minLength: -1, //多选时选择图片的最小数量
				maxLength: -1 //多选时选择图片的最大数量
			},
			defaultUploadVideoProps: {//默认上传视频配置
				multiple: false, //是否多选
				allowedFileType: ['mp4', 'MP4', 'avi', 'AVI', 'WAV', 'wav'], //限定格式
				accept: 'video', //限制类型
				minSize: -1, //限制单个视频最小值，单位kb
				maxSize: -1, //限定单个视频最大值，单位kb
				minLength: -1, //多选时选择视频的最小数量
				maxLength: -1 //多选时选择视频的最大数量
			},
			defaultVideoShowProps: {//视频显示设置
				autoplay: true, //视频是否自动播放
				muted: true, //视频静音
				controls: false, //是否显示控制器
				loop: false //是否循环
			},
			defaultMenuIcons:{//默认菜单项图标
				undo:'undo',
				redo:'redo',
				removeFormat:'clear',
				selectAll:'check',
				divider:'divider',
				tag:'font-title',
				bold:'bold',
				fontSize:'font-size',
				fontFamily:'font',
				italic:'italic',
				underline:'underline',
				strikeThrough:'strikethrough',
				subscript:'subscript',
				superscript:'superscript',
				foreColor:'color-picker',
				backColor:'brush',
				link:'link',
				list:'ul',
				justify:'align-justify',
				quote:'quote',
				image:'image',
				table:'table-alt',
				video:'video',
				code:'code',
				codeView:'eye'
			}
		};
	},
	props: {
		//值
		value: {
			type: String,
			default: ''
		},
		//是否自动获取焦点
		autofocus:{
			type:Boolean,
			default:false
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
		//是否显示菜单栏
		showMenus:{
			type:Boolean,
			default:true
		},
		//编辑区域边框是否显示
		border:{
			type:Boolean,
			default:true
		},
		//菜单配置
		menus: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//菜单项浮层参数
		layerProps: {
			type: Object,
			default: function() {
				return {};
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
		useBase64: {
			type: Boolean,
			default: true
		},
		//是否使用tooltip
		useTooltip:{
			type:Boolean,
			default:true
		},
		//提示内容配置
		tooltips: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//提示组件参数配置
		tooltipProps: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//自定义上传图片配置
		uploadImageProps: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//自定义上传视频配置
		uploadVideoProps: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//自定义上传图片出错回调
		uploadImageError: {
			type: Function
		},
		//自定义上传视频出错回调
		uploadVideoError: {
			type: Function
		},
		//自定义视频显示设置
		videoShowProps: {
			type: Object,
			default: function() {
				return {};
			}
		},
		//自定义菜单项图标
		menuIcons:{
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
		showMenuItem() {
			return key => {
				if (typeof this.computedMenus[key] == 'boolean') {
					return this.computedMenus[key];
				} else if (Array.isArray(this.computedMenus[key])) {
					return this.computedMenus[key].length > 0;
				} else {
					return false;
				}
			};
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
							var obj = {
								label:item.label,
								value:item.value
							}
							if(item.icon){
								obj.icon = item.icon;
							}
							newArray.push(obj);
						} else if (typeof item == 'string' || $util.isNumber(item)) {
							newArray.push({
								label: item,
								value: item
							});
						}
					});
					menus[key] = newArray;
				} else if (typeof this.defaultMenus[key] == 'boolean') {
					//非数组情况只能是布尔值
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
			if((this.html == '<p><br></p>' || this.html == '')){
				cls += ' mvi-editor-content-empty';
			}
			return cls;
		},
		//源码视图样式类
		codeViewClass(){
			var cls = 'mvi-editor-codeview';
			if (this.autoHeight) {
				cls += ' mvi-editor-codeview-auto';
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
			if(!this.border){
				style.border = 'none';
			}
			return style;
		},
		//源码视图样式
		codeViewStyle(){
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
		},
		//编辑器初始值
		computedValue(){
			if(this.value == '' || this.value == '<br>' || this.value == '<p></p>'){
				return '<p><br></p>'
			}else {
				return this.value;
			}
		}
	},
	provide() {
		return {
			editor: this
		};
	},
	components: {
		mEditorItem: editorItem
	},
	watch:{
		computedValue(newValue){
			this.html = newValue;
			var el = $util.string2dom(`<div>${newValue}</div>`);
			this.text = el.innerText;
			this.$emit('change',{
				html:this.html,
				text:this.text
			})
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		//初始化
		init() {
			//将自定义的菜单项浮层配置与默认配置整合
			this.defaultLayerProps = this.initOption(this.defaultLayerProps,this.layerProps)
			//将自定义的菜单栏配置与默认配置整合
			this.defaultMenus = this.initOption(this.defaultMenus,this.menus)
			//将自定义的提示内容与默认提示整合
			this.defaultTooltips = this.initOption(this.defaultTooltips, this.tooltips)
			//将自定义的工具提示组件参数与默认工具提示组件参数整合
			this.defaultTooltipProps = this.initOption(this.defaultTooltipProps, this.tooltipProps)
			//将自定义上传图片配置参数与默认上传图片配置参数整合
			this.defaultUploadImageProps = this.initOption(this.defaultUploadImageProps, this.uploadImageProps)
			//将自定义上传视频配置参数与默认上传视频配置参数整合
			this.defaultUploadVideoProps = this.initOption(this.defaultUploadVideoProps, this.uploadVideoProps)
			//将自定义的视频配置参数与默认的视频配置参数整合
			this.defaultVideoShowProps = this.initOption(this.defaultVideoShowProps,this.videoShowProps)
			//将自定义的菜单项图标配置与默认的菜单项图标配置整合
			this.defaultMenuIcons = this.initOption(this.defaultMenuIcons,this.menuIcons)
			//定义段落分隔符
			document.execCommand('defaultParagraphSeparator', false, 'p');
			//使用css
			document.execCommand('styleWithCSS', false, true);
			//初始化赋值
			this.html = this.$refs.content.innerHTML;
			this.text = this.$refs.content.innerText;
			if(this.autofocus){
				this.collapseToEnd();
			}
		},
		//对外提供的用以插入图片的api
		insertImage(url) {
			if(this.disabled){
				return
			}
			document.execCommand('insertHtml', false, `<img src="${url}" class="mvi-editor-image" />`);
		},
		//对外提供的用以插入视频的api
		insertVideo(url) {
			if(this.disabled){
				return
			}
			var video = $util.string2dom(`<video src="${url}" class="mvi-editor-video"></video>`);
			if (this.defaultVideoShowProps.muted) {
				video.setAttribute('muted', 'muted');
			}
			if (this.defaultVideoShowProps.loop) {
				video.setAttribute('loop', 'loop');
			}
			if (this.defaultVideoShowProps.controls) {
				video.setAttribute('controls', 'controls');
			}
			if (this.defaultVideoShowProps.autoplay) {
				video.setAttribute('autoplay', 'autoplay');
			}
			document.execCommand('insertHtml', false, video.outerHTML);
		},
		//对外提供的用以清除内容的api
		empty(){
			if(this.disabled){
				return
			}
			if(this.$refs.content){
				this.$refs.content.innerHTML = '<p><br></p>';
				this.html = this.$refs.content.innerHTML;
				this.text = this.$refs.content.innerText;
			}else if(this.$refs.codeView){
				this.$refs.codeView.innerText = '<p><br></p>';
				this.html = this.$refs.codeView.innerText;
				var el = $util.string2dom(`<div>${this.$refs.codeView.innerText}</div>`);
				this.text = el.innerText;
			}
			this.$emit('change',{
				html:this.html,
				text:this.text
			})
		},
		//保存选区
		saveRange() {
			if(this.disabled){
				return
			}
			this.range = null;
			var selection = window.getSelection();
			if (selection.getRangeAt && selection.rangeCount) {
				this.range = selection.getRangeAt(0);
			}
		},
		//恢复选区
		restoreRange() {
			if(this.disabled){
				return
			}
			var selection = window.getSelection();
			selection.removeAllRanges();
			if (this.range) {
				selection.addRange(this.range);
			}
		},
		//将编辑区域光标移至最后
		collapseToEnd(){
			if(this.disabled){
				return
			}
			var el = null;
			if(this.$refs.content){
				el = this.$refs.content;	
			}else if(this.$refs.codeView){
				el = this.$refs.codeView;
			}
			el.focus();
			var selection = window.getSelection(); 	
			selection.selectAllChildren(el); 
			selection.collapseToEnd();
		},
		//根据选区获取节点
		getSelectNode(){
			if(this.disabled){
				return
			}
			if(!this.range){
				return null;
			}
			var node = this.range.commonAncestorContainer;
			if($util.isElement(node)){
				return node;
			}else {
				return node.parentNode;
			}
		},
		//改变菜单项激活状态
		changeActive(){
			if(this.disabled){
				return
			}
			if(!this.showMenus){
				return
			}
			this.saveRange();
			var node = this.getSelectNode();
			this.$refs.menu.forEach((item)=>{
				switch (item.value) {
					case 'bold':
						if($util.getCssStyle(node,'font-weight') == 'bold'
						|| $util.getCssStyle(node,'font-weight') == '700'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'italic':
						if($util.getCssStyle(node,'font-style') == 'italic'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'underline':
						if($util.getCssStyle(node,'text-decoration-line') == 'underline'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'strikeThrough':
						if($util.getCssStyle(node,'text-decoration-line') == 'line-through'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'subscript':
						if($util.getCssStyle(node,'vertical-align') == 'sub'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'superscript':
						if($util.getCssStyle(node,'vertical-align') == 'super'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'link':
						if(node.tagName.toUpperCase() == 'A'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'quote':
						if(node.tagName.toUpperCase() == 'BLOCKQUOTE'){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'table':
						var tables = this.$refs.content.querySelectorAll('table[mvi-editor-insert-table]');
						var flag = false;
						for(var i = 0;i<tables.length;i++){
							if($util.isContains(tables[i],node)){
								flag = true;
								break;
							}
						}
						if(flag){
							item.menuActive = true;
						}else {
							item.menuActive = false;
						}
						break;
					case 'code':
						var pres = this.$refs.content.querySelectorAll('pre');
						var flag = false;
						for(var i = 0;i<pres.length;i++){
							if($util.isContains(pres[i],node)){
								flag = true;
							}
						}
						if(flag){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
					case 'codeView':
						if(this.codeViewShow){
							item.menuActive = true;
						}else{
							item.menuActive = false;
						}
						break;
				}
			})
		},
		//输入框输入
		contentInput(){
			if(this.disabled){
				return;
			}
			if(!this.$refs.content){
				return;
			}
			if(this.$refs.content.innerHTML == ''){
				this.$refs.content.innerHTML = '<p><br></p>'
			}
			this.changeActive();
			this.html = this.$refs.content.innerHTML;
			this.text = this.$refs.content.innerText;
			this.$emit('change',{
				html:this.html,
				text:this.text
			})
		},
		//源码视图输入
		codeViewInput(){
			if(this.disabled){
				return;
			}
			if(!this.$refs.codeView){
				return;
			}
			if(this.$refs.codeView.innerText == ''){
				this.$refs.codeView.innerText = '<p><br></p>';
				this.collapseToEnd();
			}
			this.html = this.$refs.codeView.innerText;
			var el = $util.string2dom(`<div>${this.$refs.codeView.innerText}</div>`);
			this.text = el.innerText;
			this.$emit('change',{
				html:this.html,
				text:this.text
			})
		},
		//tab键按下禁用默认事件
		tabDown(event){
			if(this.disabled){
				return
			}
			if(event.keyCode == 9){
				event.preventDefault();
				document.execCommand('insertHtml',false,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
			}
		},
		//初始化对象参数方法
		initOption(defaultObj,propObj){
			var obj = {}
			Object.assign(obj,defaultObj)
			Object.assign(obj,propObj)
			return obj
		}
	}
};
</script>

<style lang="less">
.mvi-editor-image {
	display: inline-block;
	width: auto;
	height: auto;
	max-width: 100%;
}

.mvi-editor-video {
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
	background-color: #fff;
	margin-bottom: @mp-sm;
	border: 1px solid @border-color;
	border-radius: @radius-default;
}

.mvi-editor-body{
	display: block;
	position: relative;
	width: 100%;
	
	.mvi-editor-codeview{
		display: block;
		position: relative;
		width: 100%;
		border: 1px solid #000;
		height: 8rem;
		background-color: #000;
		border-radius: @radius-default;
		margin: 0;
		padding: @mp-sm;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: @font-size-default;
		color: #fff;
		font-family: Consolas;
		
		&.mvi-editor-codeview-auto {
			height: auto;
			min-height: 8rem;
			overflow: hidden;
		}
	}
	
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
		
		&.mvi-editor-content-empty::before{
			position: absolute;
			top: @mp-sm;
			left: @mp-sm;
			content: attr(data-placeholder);
			font-size: inherit;
			color: inherit;
			opacity: .5;
			line-height: inherit;
			vertical-align: middle;
		}
	}
}
</style>
