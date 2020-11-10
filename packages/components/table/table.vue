<template>
	<div v-on="listeners" :class="'mvi-table'+(outBorder?' mvi-table-border':'')">
		<div class="mvi-table-header" v-if="columnsData.length!=0">
			<table cellpadding="0" cellspacing="0">
				<colgroup>
					<col :style="colgroupStyle(index)" v-for="(item,index) in columnsData" :key="'table-header-group-'+index" />
				</colgroup>
				<tr ref="headRow">
					<td :class="'mvi-table-header-td'+(rowBorder?' mvi-table-header-td-border':'')+(headClass?' '+headClass:'')" v-for="(item,index) in columnsData"
					 :key="'table-column-'+index">
						<div>
							<m-checkbox v-if="item.key=='checkbox'" icon-size="0.24rem" :class="(item.value?'mvi-table-checkbox':'')"
							 :checked.sync="selectAll" @model-change="allSelect" :icon-type="(item.iconType?item.iconType:'success')"
							 :icon-color="(item.iconColor?item.iconColor:null)" :fill-color="(item.fillColor?item.fillColor:null)"></m-checkbox>
							<span v-if="item.value" v-html="item.value"></span>
							<span class="mvi-table-sortable" v-if="item.sortable">
								<m-icon @click="sortAsc(item)" :class="'mvi-table-sortable-icon'+(active==0?' mvi-table-sortable-icon-active':'')"
								 type="caret-up" />
								<m-icon @click="sortDesc(item)" :class="'mvi-table-sortable-icon'+(active==1?' mvi-table-sortable-icon-active':'')"
								 type="caret-down" />
							</span>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div v-if="loading" class="mvi-table-loading">
			<div>
				<m-loading color="#c8c9cc" size="0.3rem"></m-loading>
				<div class="mvi-table-loading-text" v-html="loadingMsg"></div>
			</div>
		</div>
		<div v-else-if="sortData.length == 0" class="mvi-table-no-data" v-html="noDataMsg"></div>
		<div v-else class="mvi-table-body" :style="bodyStyle">
			<table cellpadding="0" cellspacing="0">
				<colgroup>
					<col :style="colgroupStyle(index)" v-for="(item,index) in columnsData" :key="'table-body-group-'+index" />
				</colgroup>
				<tbody>
					<tr v-for="(item,index) in sortData" :key="'table-data-'+index" :class="(item.className?item.className:'')
					+((stripe&&(index%2==1))?' mvi-table-stripe':'')">
						<td :class="(rowBorder?'mvi-table-body-td-border':'')
						+((item.cellClassName&&item.cellClassName[item2.key])?' '+item.cellClassName[item2.key]:'')
						+(item2.className?' '+item2.className:'') + (cellClass(item,index,item2,index2)?' '+cellClass(item,index,item2,index2):'')"
						 v-for="(item2,index2) in columnsData" :key="'table-column-data-'+index2" @click="cellClick($event,item,index,item2,index2)">
							<m-checkbox v-if="item2.key=='checkbox'" icon-size="0.24rem" v-model="checkRows" :value="index" :icon-type="(item2.iconType?item2.iconType:'success')"
							 @model-change="selectCheck" :icon-color="(item2.iconColor?item2.iconColor:null)" :fill-color="(item2.fillColor?item2.fillColor:null)"
							 :disabled="(item.checkDisabled?true:false)"></m-checkbox>
							<slot name="custom" :row="item" :column="item2" :row-index="index" :column-index="index2" v-if="(item2.key=='custom') && ($scopedSlots.custom)"></slot>
							<span v-else v-html="textFilter(item,item2)"></span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-table",
		data() {
			return {
				headRow: null, //表头行
				active: -1, //排序图标的激活序列
				checkRows: [], //选择的列
				selectAll: false,
				sortData:[],//渲染在表格上的数据
			}
		},
		props: {
			data: { //表格内容数据
				type: Array,
				default: function() {
					return [];
				}
			},
			columns: { //表格头数据
				type: Array,
				default: function() {
					return [];
				}
			},
			outBorder: { //是否显示外边框
				type: Boolean,
				default: false
			},
			rowBorder: { //是否显示行边框
				type: Boolean,
				default: false
			},
			stripe: { //是否显示条纹
				type: Boolean,
				default: false
			},
			height: { //设置表格主体高度，固定表格头部
				type: String,
				default: null
			},
			cellClass: { //自定义单元格样式
				type: Function,
				default: function() {

				}
			},
			noDataMsg: { //无数据的文本提示
				type: String,
				default: "暂时没有数据"
			},
			loading: { //是否加载状态
				type: Boolean,
				default: false
			},
			loadingMsg: { //加载时的文本提示
				type: String,
				default: "正在加载数据..."
			},
			headClass:{//表头样式
				type:String,
				default:null
			},
			customSortAsc:{//自定义升序排序
				type:Function,
				default:null
			},
			customSortDesc:{//自定义降序排序
				type:Function,
				default:null
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners);
			},
			bodyStyle() {
				var style = {};
				if (this.height) {
					style.height = this.height;
					style.overflow = 'auto';
				}
				return style;
			},
			colgroupStyle() {
				return index => {
					var style = {};
					if ($util.isElement(this.headRow)) {
						var cols = this.headRow.querySelectorAll(".mvi-table-header-td");
						var width = cols[index]?cols[index].offsetWidth:0;
						style.width = width + 'px';
					}
					return style;
				}
			},
			columnsData() {
				var arr = [];
				this.columns.forEach((column) => {
					if (!column.hidden) {
						arr.push(column);
					}
				})
				return arr;
			},
			textFilter() {
				return (item, item2) => {
					var text = item[item2.key];
					if (typeof(item2.filter) == 'function') {
						text = item2.filter(item[item2.key]);
					}
					return text;
				}
			}
		},
		watch:{
			data(newValue){
				this.sortData = this.getSortData();
			}
		},
		created() {
			this.sortData = this.getSortData()
		},
		mounted() {
			this.headRow = this.$refs.headRow;
		},
		methods: {
			//点击单元格
			cellClick(event, item, index, item2, index2) {
				this.$emit('cell-click', {
					row: item,
					rowIndex: index,
					column: item2,
					columnIndex: index2
				});
			},
			//选择单个复选框
			selectCheck(value) {
				event.stopPropagation();
				var length = 0;
				for (var i = 0; i < this.sortData.length; i++) {
					if (!this.sortData[i].checkDisabled) {
						length++;
					}
				}
				if (this.checkRows.length == length) {
					this.selectAll = true;
				} else {
					this.selectAll = false;
				}
				this.$emit('check', this.checkRows);
			},
			//复选框全选
			allSelect(value) {
				this.checkRows = [];
				if (value) { //全选
					for (var i = 0; i < this.sortData.length; i++) {
						if (!this.sortData[i].checkDisabled) {
							this.checkRows.push(i);
						}
					}
				} else {
					this.checkRows = [];
				}
				this.$emit('check', this.checkRows);
			},
			//升序排序
			sortAsc(column) {
				this.active = 0;
				if(typeof this.customSortAsc == 'function' && this.customSortAsc){
					this.customSortAsc(column,this.sortData)
				}else {
					this.sortData = this.sortData.sort(function(a, b) {
						var str1 = a[column.key].toString();
						var str2 = b[column.key].toString();
						return str1.localeCompare(str2, 'zh-CN')
					})
					this.$emit('sort-asc', this.sortData);
				}
			},
			//降序排序
			sortDesc(column) {
				this.active = 1;
				if(typeof this.customSortDesc == 'function' && this.customSortDesc){
					this.customSortDesc(column,this.sortData)
				}else {
					this.sortData = this.sortData.sort(function(a, b) {
						var str1 = a[column.key].toString();
						var str2 = b[column.key].toString();
						return -str1.localeCompare(str2, 'zh-CN')
					})
					this.$emit('sort-desc', this.sortData);
				}
			},
			//根据data获取sortData
			getSortData(){
				var arr = [];
				this.data.forEach((row) => {
					if (!row.hidden) {
						arr.push(row);
					}
				})
				return arr;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";

	.mvi-table {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		background-color: #fff;
	}

	.mvi-table-border {
		border: 1px solid @border-color;
		border-radius: @radius-default;
	}

	.mvi-table-header {
		display: block;
		width: 100%;
		background-color: @bg-color-dark;
		border-top-left-radius: @radius-default;
		border-top-right-radius: @radius-default;
		border-bottom: 1px solid @border-color;

		table {
			width: 100%;
			border-collapse: collapse;
		}

		td.mvi-table-header-td {
			padding: @mp-sm;
			text-align: center;
			font-size: @font-size-default;
			color: @font-color-default;
			font-weight: bold;

			&>div {
				display: inline-flex;
				display: -webkit-inline-flex;
				justify-content: flex-start;
				align-items: center;
				height: 100%;
				vertical-align: middle;
			}

			.mvi-table-sortable {
				display: inline-flex;
				display: -webkit-inline-flex;
				justify-content: space-between;
				flex-direction: column;
				-ms-flex-direction: column;
				-webkit-flex-direction: column;
				margin-left: @mp-xs;
				color: @font-color-mute;
				height: 100%;

				.mvi-table-sortable-icon {
					font-size: 0.6em;
					width: 100%;
					margin-bottom: 0;
				}

				.mvi-table-sortable-icon.mvi-table-sortable-icon-active {
					color: @info-normal;
				}
			}

		}

		td.mvi-table-header-td.mvi-table-header-td-border {
			border: 1px solid @border-color;
			border-bottom: none;
			border-top: none;
		}

		tr>td.mvi-table-header-td.mvi-table-header-td-border:first-child {
			border-left: none;
		}

		tr>td.mvi-table-header-td.mvi-table-header-td-border:last-child {
			border-right: none;
		}

		.mvi-table-checkbox {
			margin-right: @mp-xs/2;
		}

	}

	.mvi-table-body {
		display: block;
		width: 100%;

		table {
			width: 100%;
			border-collapse: collapse;
		}

		tr.mvi-table-stripe {
			background-color: @bg-color-default;
		}

		td {
			padding: @mp-sm;
			text-align: center;
			font-size: @font-size-default;
			color: @font-color-default;
			border-bottom: 1px solid @border-color;
		}

		tr:last-child>td {
			border-bottom: none;
		}

		td.mvi-table-body-td-border {
			border-left: 1px solid @border-color;
			border-right: 1px solid @border-color;
		}

		tr>td.mvi-table-body-td-border:first-child {
			border-left: none;
		}

		tr>td.mvi-table-body-td-border:last-child {
			border-right: none;
		}
	}

	.mvi-table-loading {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		padding: @mp-lg 0;

		&>div {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			align-items: center;
		}

		.mvi-table-loading-text {
			color: @font-color-mute;
			font-size: @font-size-small;
			margin-left: @mp-xs;
		}
	}

	.mvi-table-no-data {
		display: block;
		width: 100%;
		text-align: center;
		padding: @mp-lg 0;
		color: @font-color-mute;
		font-size: @font-size-small;
	}
</style>
