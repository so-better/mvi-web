<template>
	<div class="mvi-editor" v-on="listeners">
		<div class="mvi-editor-menus">
			<div class="mvi-editor-menu" v-for="(item,index) in computedMenuKeys" :key="'mvi-editor-menu-'+index" v-if="showMenu(item)"
			:data-id="'mvi-editor-menu-'+_uid+'-'+index">
				<div @click="clickTriggerLayer(item)" :mvi-editor-key="item" class="mvi-editor-menu-item" 
				:data-id="'mvi-editor-menu-item-'+_uid+'-'+index">
					<m-icon :type="icons[item]" />
				</div>
				<transition name="mvi-editor-layer" v-if="isSelect(item)">
					<m-layer v-if="selectShows[item]" :root="`[data-id='mvi-editor-menu-${_uid}-${index}']`" 
					:target="`[data-id='mvi-editor-menu-item-${_uid}-${index}']`"
					:placement="placement" :fixed="fixed" :z-index="zIndex" offset="0rem" :style="layerStyle" class="mvi-editor-layer">
						<div v-if="item=='backColor' || item == 'foreColor'" class="mvi-editor-layer-colors">
							<div class="mvi-editor-color" :style="'background-color:'+el.value" v-for="(el,i) in computedMenus[item]" 
							:key="'mvi-editor-color-'+i" @click="select(item,el)"></div>
						</div>
						<div v-else class="mvi-editor-layer-wrapper">
							<div @click="select(item,el)" unselectable="off" class="mvi-editor-select-item" v-text="el.label" 
							v-for="(el,i) in computedMenus[item]" :key="'mvi-editor-menu-select-'+i"></div>
						</div>
					</m-layer>
				</transition>
			</div>
		</div>
		<div :class="contentClass" :contenteditable="!disabled" :style="contentStyle" v-html="value"></div>
	</div>
</template>

<script>
	import $util from "../../util/util.js"
	export default {
		name: 'm-editor',
		data() {
			return {
				basicMenus: { //默认菜单配置
					undo: true, //撤销
					redo: true, //重复
					tag: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'], //标签
					fontSize: [1,2,3,4,5,6,7], //字号
					fontFamily: ['PingFang SC', 'Helvetica Neue', 'Helvetica', 'Microsoft YaHei', 'Arial', 'sans-serif'], //字体
					bold: true, //加粗
					italic: true, //斜体
					underline: true, //下划线
					strikeThrough: true, //删除线
					subscript:true,//下标
					superscript:true,//上标
					foreColor: ['#505050','#808080','#bbb','#ddd','#eee','#f7f7f7','#0a9455','#03a8f3','#ec1a0a','#f90','#07C160','#0b73de',
					'#e2e7ea','#c3ebff','#c2fdc4','#ffd6b6','#1eacf3','#f9cec3'], //字体颜色
					backColor: ['#505050','#808080','#bbb','#ddd','#eee','#f7f7f7','#0a9455','#03a8f3','#ec1a0a','#f90','#07C160','#0b73de',
					'#e2e7ea','#c3ebff','#c2fdc4','#ffd6b6','#1eacf3','#f9cec3'], //背景色
					list: [ //列表
						{
							label: '有序列表',
							value: 'ol'
						}, {
							label: '无序列表',
							value: 'ul'
						}
					], //插入链接
					justify: [//对齐方式
						{
							label:'左对齐',
							value:'left',
						},
						{
							label:'居中对齐',
							value:'center'
						},
						{
							label:'右对齐',
							value:'right'
						},
						{
							label:'两端对齐',
							value:'justify'
						}
					],
					quote: true, //引用
					image: true, //插入图片
					link: true, //链接
					table: true, //插入表格
					video: true, //插入视频
					code: true //插入代码
				},
				icons: {//菜单图标
					undo:'undo',
					redo:'redo',
					tag: 'font-title',
					bold: 'bold',
					fontSize: 'font-size',
					fontFamily: 'font',
					italic: 'italic',
					underline: 'underline',
					strikeThrough: 'strikethrough',
					subscript:'subscript',
					superscript:'superscript',
					foreColor: 'color-picker',
					backColor: 'brush',
					link: 'link',
					list: 'ul',
					justify: 'align-justify',
					quote:'quote',
					image:'image',
					table:'table-alt',
					video:'video',
					code:'code'	
				},
				selectShows:{}
			}
		},
		model: {
			prop: 'value',
			event: 'model-change'
		},
		props: {
			value: { //值
				type: String,
				default: ''
			},
			placeholder: { //占位符
				type: String,
				default: ''
			},
			height: { //初始高度
				type: String,
				default: null
			},
			autoHeight: { //高度是否自动变化
				type: Boolean,
				default: false
			},
			disabled: { //是否禁用
				type: Boolean,
				default: false
			},
			menus: { //菜单配置
				type: Object,
				default: function() {
					return {}
				}
			},
			placement:{//菜单选择浮层位置
				type:String,
				default:'bottom'
			},
			fixed:{//菜单选择浮层是否为fixed
				type:Boolean,
				default:false
			},
			zIndex:{//菜单选择浮层z-index值
				type:Number,
				default:400
			},
			layerWidth:{//菜单选择浮层宽度
				type:String,
				default:null
			},
			//触发悬浮层显现的方式
			trigger:{
				type:String,
				default:'click'
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners)
			},
			//是否显示指定菜单
			showMenu() {
				return key => {
					if (typeof(this.computedMenus[key]) == 'boolean') {
						return this.computedMenus[key]
					} else if (Array.isArray(this.computedMenus[key])) {
						return this.computedMenus[key].length > 0
					}
				}
			},
			//是否为下拉选择
			isSelect() {
				return key => {
					if (Array.isArray(this.computedMenus[key])) {
						return true;
					}else {
						return false;
					}
				}
			},
			//菜单配置值
			computedMenus() {
				var menus = {}
				Object.keys(this.basicMenus).forEach(key => {
					if (typeof(this.basicMenus[key]) == 'boolean') { //布尔值
						menus[key] = this.basicMenus[key]
					} else if (Array.isArray(this.basicMenus[key])) { //数组
						var newArray = [];
						this.basicMenus[key].forEach(item => {
							if (typeof item == 'string' || $util.isNumber(item)) {
								newArray.push({
									label: item,
									value: item
								})
							} else if ($util.isObject(item)) {
								newArray.push({
									label: item.label,
									value: item.value
								})
							}
						})
						menus[key] = newArray;
					}
				})
				return menus;
			},
			//菜单配置项所有的键数组
			computedMenuKeys() {
				return Object.keys(this.computedMenus)
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
			},
			//浮层样式
			layerStyle(){
				var style = {};
				if(this.layerWidth){
					style.width = this.layerWidth;
				}
				return style;
			}
		},
		created() {
			this.init();
		},
		mounted() {
			if(this.trigger == 'click'){
				window.addEventListener('click',this.hideLayerForWindow);
			}
			console.log(this.computedMenus)
		},
		methods: {
			//初始化
			init(){
				//将自定义的值配置到基本配置中去，进行覆盖
				Object.assign(this.basicMenus, this.menus);
				//设置每个有下拉选择的菜单项的下拉框默认不显示
				this.computedMenuKeys.forEach((key,index)=>{
					if(Array.isArray(this.computedMenus[key])){
						this.$set(this.selectShows,key,false)
					}
				})
				//定义段落分隔符
				document.execCommand('defaultParagraphSeparator',false,'p');
				//使用css
				document.execCommand('styleWithCSS',false,true)
			},
			//点击显示/关闭悬浮层
			clickTriggerLayer(key){
				if(this.disabled){
					return;
				}
				if(this.isSelect(key)){//开启下拉
					if(this.trigger == 'click'){
						this.$set(this.selectShows,key,!this.selectShows[key]);
					}
				}else {//直接设置
					switch (key){
						case 'undo'://撤销
							document.execCommand('undo')
							break;
						case 'redo'://重做
							document.execCommand('redo')
							break;
						case 'bold'://加粗
							document.execCommand('bold')
							break;
						case 'italic'://斜体
							document.execCommand('italic')
							break;
						case 'underline'://下划线
							document.execCommand('underline')
							break;
						case 'strikeThrough'://删除线
							document.execCommand('strikeThrough')
							break;
						case 'subscript'://下标
							document.execCommand('subscript')
							break;
						case 'superscript'://上标
							document.execCommand('superscript')
							break;
						default:
							break;
					}
				}
			},
			//选择
			select(key,value){
				console.log(key,value)
				switch (key){
					case 'tag'://设置dom标签
						document.execCommand('formatBlock',false,value.value)
						break;
					case 'fontSize'://设置字号
						document.execCommand('fontSize',false,value.value);
						break;
					case 'fontFamily'://设置字体
						document.execCommand('fontName',false,value.value)
						break;
					case 'list'://设置列表
						if(value.value == 'ol'){//有序列表
							document.execCommand('insertOrderedList')
						}else {//无序列表
							document.execCommand('insertUnorderedList')
						}
						break;
					case 'justify'://对齐方式
						if(value.value == 'left'){
							document.execCommand('justifyLeft')
						}else if(value.value == 'center'){
							document.execCommand('justifyCenter')
						}else if(value.value == 'right'){
							document.execCommand('justifyRight')
						}else if(value.value == 'justify'){
							document.execCommand('justifyFull')
						}
						break;
					case 'foreColor'://字体颜色
						document.execCommand('foreColor',false,value.value)
						break;
					case 'backColor'://背景色
						document.execCommand('hiliteColor',false,value.value)
						break;
				}
			},
			//点击窗口隐藏浮窗
			hideLayerForWindow(event){
				var dataKey = event.target.getAttribute('mvi-editor-key');
				Object.keys(this.selectShows).forEach(key=>{
					if(dataKey){
						if(key != dataKey){
							this.$set(this.selectShows,key,false)
						}
					}else{
						this.$set(this.selectShows,key,false)
					}
				})
			}
		},
		beforeDestroy() {
			if(this.trigger == 'click'){
				window.removeEventListener('click',this.hideLayerForWindow);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

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

		.mvi-editor-menu {
			position: relative;
			margin: @mp-xs;
			
			.mvi-editor-menu-item{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: @mp-xs;
				margin: 0;
				color: @font-color-sub;
				font-size: @font-size-default;
				transition: color 200ms;
				-webkit-transition: color 200ms;
				position: relative;
				user-select:none;
				-webkit-user-select:none;
				-moz-user-select: none;
				-ms-user-select: none;
				
				&:hover {
					cursor: pointer;
					color: @font-color-default;
				}
				
				&>.mvi-icon{
					pointer-events: none;
					touch-action: none;
				}
			}
			
			.mvi-editor-layer{
				width: calc(2.6rem + 2px);
				background-color:transparent;
				padding-top: @mp-sm;
				
				.mvi-editor-layer-wrapper{
					display: block;
					width: 100%;
					height: auto;
					background-color: #fff;
					box-shadow: @boxshadow-basic;
					-webkit-box-shadow: @boxshadow-basic;
					border: 1px solid @bg-color-dark;
					border-radius: @radius-default;
					padding: @mp-xs 0;
					
					.mvi-editor-select-item{
						display: block;
						width: 100%;
						font-size: @font-size-default;
						color: @font-color-sub;
						text-align: center;
						padding: @mp-xs 0;
						user-select:none;
						-webkit-user-select:none;
						-moz-user-select: none;	
						-ms-user-select: none;
						
						&:hover{
							cursor: pointer;
							background-color: @bg-color-default;
						}
					}
				}
				
				.mvi-editor-layer-colors{
					display: flex;
					display: -webkit-flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					-webkit-flex-wrap: wrap;
					-ms-flex-wrap: wrap;
					align-items: center;
					width: 100%;
					height: auto;
					background-color: #fff;
					box-shadow: @boxshadow-basic;
					-webkit-box-shadow: @boxshadow-basic;
					border: 1px solid @bg-color-dark;
					border-radius: @radius-default;
					padding: @mp-xs;
					
					.mvi-editor-color{
						display: block;
						margin: @mp-xs;
						width:@mini-height;
						height: @mini-height/2;
						border: 1px solid @border-color;
						border-radius: @radius-default/2;
						user-select:none;
						-webkit-user-select:none;
						-moz-user-select: none;	
						-ms-user-select: none;
						
						&:hover{
							cursor: pointer;
						}
					}
				}
			}
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

		&.mvi-editor-content-auto {
			height: auto;
			min-height: 8rem;
			overflow: hidden;
		}
	}
	
	.mvi-editor-layer-enter-active,.mvi-editor-layer-leave-active{
		transition: transform 100ms,opacity 100ms;
		-webkit-transition: transform 100ms,opacity 100ms;
		-moz-transition: transform 100ms,opacity 100ms;
		-ms-transition: transform 100ms,opacity 100ms;
	}
	
	.mvi-editor-layer-enter,.mvi-editor-layer-leave-to{
		transform: translateY(0.2rem);
		opacity: 0;
	}
</style>
