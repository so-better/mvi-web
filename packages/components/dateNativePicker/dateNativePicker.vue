<template>
	<input @blur="selectDateForIOS" @change="selectDateForAndroid" v-on="listeners" class="mvi-date-native-picker" 
	:type="dateType" :value="dateValue"/>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name:"m-date-native-picker",
		model:{
			prop:'value',
			event:'model-change'
		},
		props:{
			type:{//选择的类型
				type:String,
				default:'date',
				validator(value){
					return ['date','datetime','month','time'].includes(value)
				}
			},
			value:{
				type:Date,
				default:null
			},
			max:{
				type:Date,
				default:null
			},
			min:{
				type:Date,
				default:null
			}
		},
		computed:{
			listeners(){
				return Object.assign({},this.$listeners)
			},
			dateValue(){
				if(this.value){
					if(this.type == 'date'){
						var year = this.value.getFullYear();
						var month = (this.value.getMonth()+1)<10?'0'+(this.value.getMonth()+1):this.value.getMonth()+1;
						var date = this.value.getDate()<10?'0'+this.value.getDate():this.value.getDate();
						return year+"-"+month+"-"+date;
					}else if(this.type == 'datetime'){
						var year = this.value.getFullYear();
						var month = (this.value.getMonth()+1)<10?'0'+(this.value.getMonth()+1):this.value.getMonth()+1;
						var date = this.value.getDate()<10?'0'+this.value.getDate():this.value.getDate();
						var hour = this.value.getHours()<10?'0'+this.value.getHours():this.value.getHours();
						var minutes = this.value.getMinutes()<10?'0'+this.value.getMinutes():this.value.getMinutes();
						return year+"-"+month+"-"+date+"T"+hour+":"+minutes;
					}else if(this.type == 'month'){
						var year = this.value.getFullYear();
						var month = (this.value.getMonth()+1)<10?'0'+(this.value.getMonth()+1):this.value.getMonth()+1;
						return year+"-"+month;
					}else if(this.type == 'time'){
						var hour = this.value.getHours()<10?'0'+this.value.getHours():this.value.getHours();
						var minutes = this.value.getMinutes()<10?'0'+this.value.getMinutes():this.value.getMinutes();
						return hour+":"+minutes;
					}
				}else{
					return '';
				}
			},
			dateType(){
				if(this.type == 'datetime'){
					return 'datetime-local';
				}else{
					return this.type;
				}
			}
		},
		methods:{
			//触发日期选择弹窗
			trigger(){
				if($util.judgeAccessTerminalBrowser('ios')){
					this.$el.focus();
				}else{
					this.$el.click();
				}
			},
			//IOS下选择日期
			selectDateForIOS(){
				if($util.judgeAccessTerminalBrowser('ios')){
					var date = this.dateParse(this.$el.value);
					if(date){
						if(this.min){
							var minTime = this.min.getTime();
							if(date.getTime() < minTime){
								this.$emit('error','选择的时间不在范围');
								return;
							}
						}
						if(this.max){
							var maxTime = this.max.getTime();
							if(date.getTime() > maxTime){
								this.$emit('error','选择的时间不在范围')
								return;
							}
						}
						
					}
					this.$emit('update:value',date);
					this.$emit('model-change',date);
				}
			},
			//安卓系统下选择日期
			selectDateForAndroid(){
				if(!$util.judgeAccessTerminalBrowser('ios')){
					var date = this.dateParse(this.$el.value);
					if(date){
						if(this.min){
							var minTime = this.min.getTime();
							if(date.getTime() < minTime){
								this.$emit('error','选择的时间不在范围');
								return;
							}
						}
						if(this.max){
							var maxTime = this.max.getTime();
							if(date.getTime() > maxTime){
								this.$emit('error','选择的时间不在范围')
								return;
							}
						}
					}
					this.$emit('update:value',date);
					this.$emit('model-change',date);
				}
			},
			//解析方法
			dateParse(value){
				if(value){
					if(this.type == 'date'){
						var obj = this.dateParseDate(value);
						var d = new Date();
						d.setFullYear(obj.year);
						d.setMonth(obj.month-1);
						d.setDate(obj.date);
						return d;
					}else if(this.type == 'datetime'){
						var dateArray = value.split('T');
						var dateObj = this.dateParseDate(dateArray[0]);
						var timeObj = this.dateParseTime(dateArray[1]);
						var d = new Date();
						d.setFullYear(dateObj.year);
						d.setMonth(dateObj.month - 1);
						d.setDate(dateObj.date);
						d.setHours(timeObj.hour);
						d.setMinutes(timeObj.min);
						return d;
					}else if(this.type == 'month'){
						var obj = this.dateParseDate(value);
						var d = new Date();
						d.setFullYear(obj.year);
						d.setMonth(obj.month-1);
						return d;
					}else if(this.type == 'time'){
						var obj = this.dateParseTime(value);
						var d = new Date();
						d.setHours(obj.hour);
						d.setMinutes(obj.min);
						return d;
					}
				}else{
					return null;
				}
				
			},
			//解析时间(格式如22:22)
			dateParseTime(value){
				var dateArray = value.split(':');
				var hour = dateArray[0];
				var min = dateArray[1];
				return {hour,min};
			},
			//解析日期(格式如2019-01-20)
			dateParseDate(value){
				var dateArray = value.split('-');
				var year = Number(dateArray[0]);//年份
				var month = Number(dateArray[1]);//月份
				var date = Number(dateArray[2]);//日期
				return {year,month,date};
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-date-native-picker{
		width: 0;
		height: 0;
		opacity: 0;
		border: none;
		min-width: 0;
		max-width: 0;
		position: relative;
	}
</style>
