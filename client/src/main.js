import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import 'boxicons'
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap';

import { variables } from '../site.config'
import { getNerds } from './utils/apiData'
import './registerServiceWorker'
import router from './router'
import { darkMode } from './utils'

import './scss/index.scss'

dayjs.locale('nl-be');
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    data () {
        return {
            title: 'Friedays',
            ...variables,
            nerds: null,
            myOrders: []
        }
    },
    router,
    async mounted () {
        darkMode().init();
        
        this.nerds = await getNerds();
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl)
        })
        
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl, {
                trigger: 'focus'
            })
        })
    }
}).$mount('#app')
