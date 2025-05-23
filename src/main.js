import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBank, faBullding, faPencil, faPhone, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { create } from 'core-js/core/object';

createApp(App).use(router).mount('#app')

library.add(faUser, faPhone, faPlus, faTrash, faPencil, faBank, faBullding);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')