import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
// import './registerServiceWorker'
import VueSession from 'vue-session'
import MultiFiltersPlugin from './MultiFilters'
import excel from 'vue-excel-export'



import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';
import axios from 'axios'
import VueAxios from 'vue-axios'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'echarts-gl'
import VueHtmlToPaper from 'vue-html-to-paper';
import DisableAutocomplete from 'vue-disable-autocomplete';

//Vue.use(DisableAutocomplete);
 
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import VueAutosuggest from "vue-autosuggest";

import jwt from 'jsonwebtoken';
Object.defineProperty(Vue.prototype, '$jwt', { value: jwt });


//import io from 'socket.io-client';
//const socket = io('https://b.contitouch.co.zw');
//const socket = io('')
//Object.defineProperty(Vue.prototype, '$socket', { value: socket });

Vue.use(VueAutosuggest);
 
Vue.use(VueSweetalert2);

 
Vue.use(VueHtmlToPaper, options);
 
Vue.use(VueAxios, axios)

Vue.component("vue-tel-input", VueTelInput);

Vue.use(VueSession)
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.use(MultiFiltersPlugin);
Vue.use(excel)
// register component to use
Vue.component('v-chart', ECharts)

Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
