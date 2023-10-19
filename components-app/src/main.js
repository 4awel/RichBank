// Requst as server
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

// All Vue
import { createApp } from 'vue'
import App from './App.vue'

import './assets/style.css';
import router from './router'

// Render into HTML
createApp(App).use(router).mount('#app')
