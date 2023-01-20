import Vue from 'vue'
import App from './App.vue'
import { router } from "./routes/index.js";
import { store } from './store/index.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookies from "vue-cookies"

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Viewer)
Vue.use(VueSidebarMenu)
//쿠키를 사용한다.
Vue.use(VueCookies);

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
