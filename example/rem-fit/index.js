import RemFit from "rem-fit"
var remFit = new RemFit(30, true);
remFit.set();
window.addEventListener('resize', () => {
	remFit.set()
})
