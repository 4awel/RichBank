import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './views/MainPage.vue';
import PaymentPage from './views/PaymentPage.vue';
import HistoryPage from './views/HistoryPage.vue';
import ProfilePage from './views/ProfilePage.vue';
import LoginPage from './views/LoginPage.vue';
import CardPage from './views/CardPage.vue';
import RegisterPage from './views/RegisterPage.vue';

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            name: 'main',
            path: '/main',
            component: MainPage
        },
        {
            name: 'payment',
            path: '/payment',
            component: PaymentPage
        },
        {
            name: 'history',
            path: '/history',
            component: HistoryPage
        },
        {
            name: 'profile',
            path: '/profile',
            component: ProfilePage
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        {
            name: 'addcard',
            path: '/addcard',
            component: CardPage
        },
        {
            name: 'register',
            path: '/register',
            component: RegisterPage
        }
    ]
})