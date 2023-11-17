import '@/assets/scss/main.scss'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/Router'

import Home from '@/components/Home.vue'
import Board from '@/components/Game/Board.vue'
import Card from '@/components/Game/Card.vue'
import Button from '@/components/UI/Button.vue'
import GameEndModal from "@/components/Game/GameEndModal.vue";

Vue.config.productionTip = false

Vue.component('Home', Home)
Vue.component('Board', Board)
Vue.component('Card', Card)
Vue.component('Button', Button)
Vue.component('GameEndModal', GameEndModal)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
