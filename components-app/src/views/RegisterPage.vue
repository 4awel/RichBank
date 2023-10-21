<script>

import axios from 'axios';
export default {
    data() {
        return {
            firstPassword: '',
            secondPassword: '',
            email: ''
        }
    },
    methods: {
        async sendData() {
            await axios.post('/register/user', {
                firstPassword: this.firstPassword,
                secondPassword: this.secondPassword,
                email: this.email
            });
        }
    }
}

</script>

<template>
    <main style="height: 90vh; display: flex; justify-content: center; align-items: center;">
        <form @submit="sendData" style="padding: 60px 100px 60px 100px;">
                <button type="submit" class="btn-reg">
                    Зарегестрироваться
                </button>
            <input style="padding: 10px; margin: 4px;" v-model="firstPassword" type="password" placeholder="Введите пароль">
            <label for="password">
                Повторите пароль
            </label>
            <input style="padding: 10px; margin: 4px;" v-model="secondPassword" type="password" placeholder="Введите пароль">
            <label for="password">
                Придумайте пароль
            </label>
            <input style="padding: 10px; margin: 4px;" v-model="email" type="text" placeholder="Введите логин">
            <label for="login">
                Логин
            </label>
            <h2 style="font-size: 32px; text-align: center;">Регистрация</h2>
        </form>
    </main>
</template>

<style scoped>

.btn-reg {
    padding: 12px;
    margin: 4px;
    background-color: rgb(61, 170, 110);
    border-radius: 20px;
}

.btn-reg:hover {
    background-color:  rgb(56, 138, 93);
}

</style>