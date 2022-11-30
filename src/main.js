import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import NetworkView from './views/NetworkView.vue'
import PhishingView from './views/PhishingView'
import MalwareView from './views/MalwareView'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/network', component: NetworkView },
    { path: '/phishing', component: PhishingView },
    { path: '/malware', component: MalwareView}
  ]
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
