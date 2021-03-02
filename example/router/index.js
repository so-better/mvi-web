import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

import components from "../../packages/components"

let routes = [{
	path:'/',
	name:'home',
	component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
}]
Object.keys(components).forEach(item=>{
	routes.push({
		path: '/'+item,
		name: item,
		component: () => import('../views/'+item+'.vue')
	})
})

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes: routes
})

export default router