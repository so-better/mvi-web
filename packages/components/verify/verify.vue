<template>
	<div class="mvi-verify" v-on="listeners" @click="doRefresh">
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
	import $util from "../../util/util"
	export default {
		name: "m-verify",
		data() {
			return {
				value: [],
			}
		},
		props: {
			number: { //验证码个数
				type: Number,
				default: 4
			},
			codes: { //验证码取值数组
				type: Array,
				default: function() {
					return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
						"V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
						"r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					]
				}
			},
			fontSize: { //验证码字体大小
				type: Number,
				default: 0.5
			},
			space: { //验证码每个字符之间的间距，单位rem
				type: Number,
				default: 0.5
			},
			offset: { //验证码在水平方向上距离中间区域的向左偏移值，单位rem
				type: Number,
				default: 1
			},
			lineCounts: { //线条数目
				type: Number,
				default: 10
			},
			clickRefresh:{//点击验证码是否刷新
				type:Boolean,
				default:true
			}
		},
		computed: {
			listeners() {
				return Object.assign({}, this.$listeners);
			}
		},
		mounted() {
			this.draw();
		},
		methods: {
			//点击刷新验证码
			doRefresh(){
				if(this.clickRefresh){
					this.draw();
				}
			},
			//绘制方法
			draw() {
				var context = this.$refs.canvas.getContext("2d"); //获取到canvas画图的环境
				var canvas_width = this.$el.offsetWidth;
				var canvas_height = this.$el.offsetHeight;
				this.$refs.canvas.width = canvas_width;
				this.$refs.canvas.height = canvas_height;
				//清除画布
				context.clearRect(0,0,canvas_width,canvas_height);
				var length = this.codes.length; //获取到数组的长度
				for (var i = 0; i < this.number; i++) {
					var j = Math.floor(Math.random() * length); //获取到随机的索引值
					var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
					var txt = this.codes[j]; //得到随机的一个内容
					this.value[i] = txt.toLowerCase();
					var x = canvas_width / 2 - $util.rem2px(this.offset) + i * $util.rem2px(this.space); //文字在canvas上的x坐标
					var y = canvas_height / 2 + Math.random() * $util.rem2px(0.2); //文字在canvas上的y坐标
					context.font = "bold " + $util.rem2px(this.fontSize) + "px Consolas";
					context.translate(x, y);
					context.rotate(deg);
					context.fillStyle = this.getColors();
					context.fillText(txt, 0, 0);
					context.rotate(-deg);
					context.translate(-x, -y);
				}
				for (var i = 0; i < this.lineCounts; i++) { //验证码上显示线条
					context.strokeStyle = this.getColors();
					context.beginPath();
					context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
					context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
					context.stroke();
				}
				this.$emit('change', this.value.join(''));
			},
			//获取随机颜色
			getColors() {
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				return "rgb(" + r + "," + g + "," + b + ")";
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/mvi-basic.less";
	
	.mvi-verify {
		display: block;
		width: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		overflow: hidden;
		cursor: pointer;
	}

	.mvi-verify>canvas {
		display: block;
		width: 100%;
	}
</style>
