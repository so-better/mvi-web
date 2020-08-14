<template>
	<div class="mvi-calendar" v-on="listeners">
		<!-- 日期视图 -->
		<div v-if="view=='date'" class="mvi-calendar-date">
			<div class="mvi-calendar-date-header">
				<div class="mvi-calendar-date-header-item" v-for="(item,index) in weekText" :key="'week-'+index" v-text="item"></div>
			</div>
			<div ref="list" class="mvi-calendar-date-list">
				<div v-for="(item,index) in new Array(6)" :key="'row-'+index" class="mvi-calendar-date-row">
					<div class="mvi-calendar-date-day" v-for="(item2,index2) in days.slice(index*7,index*7+7)" :key="'date-'+index2">
						<div :disabled="!item2.currentMonth" :class="'mvi-calendar-date-day-item'+((nonCurrentClick?(active):(active&&item2.currentMonth))?' mvi-calendar-active':'')
						+dateNowClass(item2)+dateCurrentClass(item2)" v-text="item2.date.getDate()" @click="onDateClick(item2)"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 月视图 -->
		<div v-if="view=='month'" class="mvi-calendar-month">
			<div class="mvi-calendar-month-row" v-for="(item,index) in new Array(3)" :key="'monthRow-'+index">
				<div class="mvi-calendar-month-m" v-for="(item2,index2) in months.slice(index*4,index*4+4)" :key="'month-'+index2">
					<div :class="'mvi-calendar-month-item'+(active?' mvi-calendar-active':'')+monthNowClass(item2)+monthCurrentClass(item2)" v-text="item2.text"
					@click="onMonthClick(item2)"></div>
				</div>
			</div>
		</div>
		<!-- 年视图 -->
		<div v-if="view=='year'">
			<div class="mvi-calendar-year-row" v-for="(item,index) in new Array(3)" :key="'yearRow'+index">
				<div class="mvi-calendar-year-y" v-for="(item2,index2) in years.slice(index*4,index*4+4)" :key="'year-'+index2">
					<div :class="'mvi-calendar-year-item'+((!(item2.year<startYear || item2.year>endYear) && active)?' mvi-calendar-active':'')+ yearNowClass(item2)+yearCurrentClass(item2)" v-text="item2.year" 
					@click="onYearClick(item2)" :disabled="item2.year<startYear || item2.year>endYear"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-calendar",
		props:{
			//指定显示的日期
			date:{
				type:Date,
				default:function(){
					return new Date();
				}
			},
			//视图类型
			view:{
				type:String,
				default:"date",
				validator(value){
					return ['year','month','date'].includes(value);
				}
			},
			//月份面板显示的月份数组文字
			monthText:{
				type:Array,
				default:function(){
					return ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
				},
				validator(value){
					if(value.length != 12){
						return false;
					}
					for(var i = 0;i<value.length;i++){
						if(typeof(value[i])!="string"){
							return false;
						}
					}
					return true;
				}
			},
			//头部显示的星期数组
			weekText:{
				type:Array,
				default:function(){
					return ['日','一','二','三','四','五','六'];
				},
				validator(value){
					if(value.length != 7){
						return false;
					}
					return true;
				}
			},
			//开始年
			startYear:{
				type:Number,
				default:1970
			},
			//结束年
			endYear:{
				type:Number,
				default:2099
			},
			//当前日期显示样式
			nowClass:{
				type:[String,Object],
				default:null
			},
			//指定日期显示样式
			currentClass:{
				type:[String,Object],
				default:null
			},
			//非本月日期是否可以点击
			nonCurrentClick:{
				type:Boolean,
				default:false
			},
			//点击态
			active:{
				type:Boolean,
				default:true
			}
		},
		model:{
			prop:'date',
			event:'model-change'
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners);
			},
			//显示在年份面板上的年数组
			years(){
				var arry = [];
				var current_year = this.date.getFullYear();//获取指定的年份
				//指定日期所在年份所在数组的序列,12个值为一个数组
				var index = Math.floor((current_year - this.startYear)/12);
				for(var i = this.startYear+index*12;i<this.startYear+index*12+12;i++){
					var date = new Date();
					date.setFullYear(i);
					date.setMonth(this.date.getMonth());
					date.setDate(this.date.getDate());
					arry.push({
						date:date,
						year:i,
						now:i==new Date().getFullYear(),
						current:i==current_year,
					})
				}
				return arry;
			},
			//显示在月份面板上的月数组
			months(){
				var arry = [];
				for(var i = 0;i<12;i++){
					var date = new Date();
					date.setFullYear(this.date.getFullYear());
					date.setMonth(i);
					date.setDate(this.date.getDate());
					arry.push({
						date:date,
						year:this.date.getFullYear(),
						month:i+1,
						text:this.monthText[i],
						now:((i+1==new Date().getMonth()+1) && (this.date.getFullYear()==new Date().getFullYear())),
						current:((i+1==this.date.getMonth()+1)),
					})
				}
				return arry;
			},
			//显示在日期面板上的日期数组
			days(){
				//获取指定日期的总天数
				var total = $util.getDays(this.date.getFullYear(),this.date.getMonth()+1);
				var arry = [];
				for(var i = 0;i<total;i++){
					arry.push({
						date:this.getSpecifiedDate(i+1),
						now: this.isNow(i+1),
						current:this.isCurrent(i+1),
						currentMonth:true
					})
				}
				//在数组中添加上个月末的几天
				var fd = this.getSpecifiedDate(1);
				var week = fd.getDay();//获取1号是周几
				var pd = fd;
				for(var i = 0;i<week;i++){
					var prevDate = $util.showTime(pd,-1);//获取前一天
					arry.unshift({
						date:prevDate,
						now: false,
						current:false,
						currentMonth:false
					});
					pd = prevDate;
				}
				//在数组中添加下个月初的几天
				var ld = this.getSpecifiedDate(total);
				var length = arry.length;
				for(var i = length;i<35;i++){
					var nextDate = $util.showTime(ld,1);//获取后一天
					arry.push({
						date:nextDate,
						now: false,
						current:false,
						currentMonth:false
					})
					ld = nextDate;
				}
				return arry;
			},
			//年视图指定年份样式
			yearCurrentClass(){
				return (item)=>{
					var str = "";
					if(item.current){//指定年
						if(typeof(this.currentClass) == "string" && this.currentClass){
							str = " " + this.currentClass;
						}else if(typeof(this.currentClass) == "object" && this.currentClass && typeof(this.currentClass.year)=="string" && this.currentClass.year){
							str = " " + this.currentClass.year;
						}else{
							str = " mvi-calendar-year-current";
						}
					}
					return str;
				}
			},
			//月视图指定月份样式
			monthCurrentClass(){
				return (item)=>{
					var str = "";
					if(item.current){//指定月
						if(typeof(this.currentClass) == "string" && this.currentClass){
							str = " " + this.currentClass;
						}else if(typeof(this.currentClass) == "object" && this.currentClass && typeof(this.currentClass.month)=="string" && this.currentClass.month){
							str = " " + this.currentClass.month;
						}else{
							str = " mvi-calendar-month-current";
						}
					}
					return str;
				}
			},
			//日期视图指定日期样式
			dateCurrentClass(item){
				return (item)=>{
					var str = "";
					if(item.current){//指定日期
						if(typeof(this.currentClass) == "string" && this.currentClass){
							str = " " + this.currentClass;
						}else if(typeof(this.currentClass) == "object" && this.currentClass && typeof(this.currentClass.date)=="string" && this.currentClass.date){
							str = " " + this.currentClass.date;
						}else{
							str = " mvi-calendar-date-current";
						}
					}
					return str;
				}
			},
			//年视图当前年份样式
			yearNowClass(item){
				return (item)=>{
					var ync = "";
					if(item.now){//当前年
						if(typeof(this.nowClass) == "string" && this.nowClass){
							ync = " " + this.nowClass;
						}else if(typeof(this.nowClass) == "object" && this.nowClass && typeof(this.nowClass.year)=="string" && this.nowClass.year){
							ync = " " + this.nowClass.year;
						}else{
							ync = " mvi-calendar-year-now";
						}
					}
					return ync;
				}
			},
			//月视图当前月份样式
			monthNowClass(){
				return (item)=>{
					var mnc = "";
					if(item.now){//当前月
						if(typeof(this.nowClass) == "string" && this.nowClass){
							mnc = " " + this.nowClass;
						}else if($util.isObject(this.nowClass) && typeof(this.nowClass.month)=="string" && this.nowClass.month){
							mnc = " " + this.nowClass.month;
						}else{
							mnc = " mvi-calendar-month-now";
						}
					}
					return mnc;
				}
			},
			//日期视图当前日期样式
			dateNowClass(item){
				return (item)=>{
					var dnc = "";
					if(item.now){//当前月
						if(typeof(this.nowClass) == "string"){
							dnc = " " + this.nowClass;
						}else if($util.isObject(this.nowClass) && typeof(this.nowClass.date)=="string" && this.nowClass.date){
							dnc = " " + this.nowClass.date;
						}else{
							dnc = " mvi-calendar-date-now";
						}
					}
					return dnc;
				}
			},
		},
		methods:{
			//判断是否是今天
			isNow(date){
				var now = new Date();
				if(this.date.getFullYear() == now.getFullYear()
				&& this.date.getMonth()== now.getMonth() && date == now.getDate()){
					return true;
				}else{
					return false;
				}
			},
			//判断是否是指定日期
			isCurrent(date){
				if(this.date.getDate() == date){
					return true;
				}else{
					return false;
				}
			},
			//获取某个日期是星期几
			getWeek(date){
				var fullDate = new Date();
				fullDate.setFullYear(this.date.getFullYear());
				fullDate.setMonth(this.date.getMonth());
				fullDate.setDate(date);
				return fullDate.getDay();
			},
			//获取本月指定日期
			getSpecifiedDate(index){
				var fullDate = new Date();
				fullDate.setFullYear(this.date.getFullYear());
				fullDate.setMonth(this.date.getMonth());
				fullDate.setDate(index);
				return fullDate;
			},
			//日期视图点击事件
			onDateClick(item){
				//如果非本月且非本月日期不可点击
				if(!item.currentMonth && !this.nonCurrentClick){
					return;
				}
				this.$emit('update:date',item.date);
				this.$emit('model-change',item.date);
				this.$emit('date-click',item);
			},
			//月份视图点击事件
			onMonthClick(item){
				this.$emit('update:date',item.date);
				this.$emit('model-change',item.date);
				this.$emit('month-click',item);
			},
			//年视图点击事件
			onYearClick(item){
				if(item.year < this.startYear || item.year > this.endYear){
					return;
				}
				this.$emit('update:date',item.date);
				this.$emit('model-change',item.date);
				this.$emit('year-click',item);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-calendar{
		display: block;
		width: 100%;
		padding:@mp-xs;
		background-color: #fff;
		border-radius: @radius-default;
		color: @font-color-default;
	}

	.mvi-calendar-month,.mvi-calendar-year{
		display: block;
		width: 100%;
	}
	.mvi-calendar-month-row,.mvi-calendar-year-row{
		display: flex;
		display: -webkit-flex;
		width: 100%;
		justify-content: space-between;
	}
	.mvi-calendar-month-m,.mvi-calendar-year-y{
		width: 25%;
		display: block;
		text-align: center;
		vertical-align: middle;
		padding: @mp-xs;
	}
	.mvi-calendar-month-item,.mvi-calendar-year-item{
		display: inline-block;
		position: relative;
		padding: @mp-xs @mp-sm;
		font-size: @font-size-small;
		border-radius: @radius-default;
		cursor: pointer;
	}
	
	.mvi-calendar-month-item.mvi-calendar-month-now,.mvi-calendar-year-item.mvi-calendar-year-now{
		color: @info-normal;
	}
	
	.mvi-calendar-month-item.mvi-calendar-month-current,.mvi-calendar-year-item.mvi-calendar-year-current{
		color: @info-normal;
		font-weight: bold;
	}
	.mvi-calendar-date{
		display: table;
		border-collapse: collapse;
		width: 100%;
		vertical-align: middle;
	}
	.mvi-calendar-date-header{
		margin: 0;
		padding: 0;
		width: 100%;
		display: table-header-group;
		font-weight: bold;
		vertical-align: middle;
	}
	.mvi-calendar-date-header>.mvi-calendar-date-header-item{
		display: table-cell;
		padding: @mp-xs;
		text-align: center;
		line-height: 1.5;
		font-size: @font-size-default;
	}
	.mvi-calendar-date-list{
		width: 100%;
		display: table-row-group;
		vertical-align: middle;
		padding:@mp-sm 0;
	}
	.mvi-calendar-date-row{
		margin: 0;
		padding: 0;
		display: table-row;
		width: 100%;
		position: relative;
		vertical-align: middle;
	}
	.mvi-calendar-date-day{
		position: relative;
		display: table-cell;
		text-align: center;
		line-height: 1.5;
		vertical-align: middle;
	}
	.mvi-calendar-date-day-item{
		position: relative;
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		width: @medium-height;
		height: @medium-height;
		border-radius: @radius-circle;
		font-size: @font-size-default;
		cursor: pointer;
	}
	.mvi-calendar-date-day-item.mvi-calendar-date-now{
		color: @info-normal;
	}
	.mvi-calendar-date-day-item.mvi-calendar-date-current{
		background-color: @info-normal;
		color: #fff;
	}
	
	//点击
	.mvi-calendar-date-day-item.mvi-calendar-active:active::before{
		.mvi-active();
	}
	.mvi-calendar-month-item.mvi-calendar-active:active::before{
		.mvi-active();
	}
	.mvi-calendar-year-item.mvi-calendar-active:active::before{
		.mvi-active();
	}
	//禁用
	.mvi-calendar-date-day-item[disabled],
	.mvi-calendar-year-item[disabled]{
		opacity: .5;
	}
</style>
