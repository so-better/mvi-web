import RemFit from "rem-fit"
var remFit = new RemFit(24, true);
remFit.set();
window.addEventListener('resize', () => {
	remFit.set()
})
