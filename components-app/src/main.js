// Requst as server
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

// All Vue
import { createApp } from 'vue'
import { Bar } from 'vue-chartjs'
import App from './App.vue'

import './assets/style.css';
import router from './router'

import component from '@/components/UI'
const app = createApp(App);

component.forEach(component => {
    app.component(component.name, component)
})

// Render into HTML
app
    .use(router)
    .mount('#app')
