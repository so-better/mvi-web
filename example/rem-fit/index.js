import RemFit from "rem-fit"
var remFit = new RemFit(7.5, true);
remFit.set();
window.addEventListener('resize', () => {
	remFit.set()
})
