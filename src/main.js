import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueRouter from 'vue-router';
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import NetworkView from './views/NetworkView.vue'

Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)

const pinia = createPinia()
const router = new VueRouter({
  routes: [
    { path: '/', component: HomeView },
    {path: '/about', component: AboutView },
    { path: '/network', component: NetworkView }
  ]
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  pinia,
  router
}).$mount('#app')
