import $util from "../../util/util.js"
class Prevent {
	constructor(el) {
		this.$el = el
	}
	
	init(){
		this.doPrevent(this.$el)
		this.$el.querySelectorAll('*').forEach((el,index)=>{
			this.doPrevent(el)
		})
	}
	
	doPrevent(el){
		if($util.getScrollHeight(el) == el.clientHeight){
			return;
		}
		var startY = 0;
		var startY2 = 0;
		var endY = 0;
		el.addEventListener('touchstart',event=>{
			event.stopPropagation()
			startY = event.touches[0].pageY;
			startY2 = startY;
		})
		
		el.addEventListener('touchmove',event=>{
			event.stopPropagation()
			if($util.getScrollTop(el) != 0){
				return;
			}
			var endY = event.touches[0].pageY;
			var move = endY - startY; //每一次移动的偏移量
			var move2 = endY - startY2; //距离第一次触摸时的偏移量
			startY = endY;
			//总偏移量小于0为手指向上滑动，元素向下滚动，不禁用
			if (move2 <= 0) {
				startY2 = startY;
				return;
			}
			if(event.cancelable){
				event.preventDefault();
			}
		})
	}
	
}

export default Prevent