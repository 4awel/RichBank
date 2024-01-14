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
<<<<<<< HEAD

    Пишем код, отом сливаем лучший!!!

=======
    <main style="height: 90vh; display: flex; justify-content: center; align-items: center;">
        <form class="container-login" @submit="sendData" style="padding: 60px 100px 60px 100px;">
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
>>>>>>> devolop
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

.container-login {
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    border-radius: 20px;
    padding: 45px 70px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
}

input {
    border-radius: 20px;
    border: none;
    background-color: rgba(86, 173, 127, 0.527);
    padding: 10px;
}

button {
    background-color: rgb(83, 177, 125);
    border-radius: 20px;
    padding: 10px;
}

button:hover {
    background-color: rgb(72, 134, 100);
}

a:hover {
    color: rgb(83, 177, 125);
}

</style>