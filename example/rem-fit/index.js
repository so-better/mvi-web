import RemFit from "rem-fit"
var remFit = new RemFit(20, true);
remFit.set();
window.addEventListener('resize', () => {
	remFit.set()
})
