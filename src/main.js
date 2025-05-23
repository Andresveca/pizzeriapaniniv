import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBank, faBuilding, faPencil, faPhone, faPlus, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
//import { create } from 'core-js/core/object';

//createApp(App).use(router).mount('#app')

library.add(faUser);
library.add(faPhone);
library.add(faPlus);
library.add(faTrash);
library.add(faPencil);
library.add(faTag);
library.add(faBank);
library.add(faBuilding);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')  