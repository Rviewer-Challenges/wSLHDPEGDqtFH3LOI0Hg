import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home.vue";
import Board from "@/components/Game/Board.vue";

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/play/:difficulty',
		name: 'game',
		props: true,
		component: Board
	},
]

const Router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default Router
