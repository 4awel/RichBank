<script>
import axios from 'axios';
    export default {
        data() {
            return {
                email: '',
                password: '',
                alertErr: false,
            }
        },
      mounted() {
      },
        methods: {
          async sendData() {
                if (this.email == '' || this.password == '') {
                    this.alertErr = true;
                } else {
                    await axios.post('/users', {
                        email: this.email,
                        password: this.password,
                    });
                }
            },
          goRegister() {
                this.$router.push({name: 'register'});  
            }
        }
    }
</script>
<template>

<main style="height: 90vh; display: flex; justify-content: center; align-items: center;">
    <form @submit="sendData" class="container-login">
        <h2 style="font-size: 32px; text-align: center;">
            Вход
        </h2>
        <label for="email">
            Логин
        </label>
        <input id="email" v-model="email" type="text" placeholder="Введите логин">
        <label for="password">
            Пароль
        </label>
        <input id="password" v-model="password" type="password" placeholder="Введите пароль">
        <button type="submit">Войти</button>
        <p @click="goRegister" class="transition-register" href="" style="text-align: center;">Зарегестрироваться</p>
        <div v-if="alertErr" class="alert-error" style="background-color: rgba(255, 0, 0, 0.315); padding: 20px;">
            Поля не заполнены!
        </div>
    </form>
</main>

</template>
<style scoped>
.container-login {
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    border-radius: 20px;
    padding: 45px 70px;
    display: flex;
    flex-direction: column;
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

.transition-register:hover {
    color: rgb(55, 124, 86);
    cursor: pointer;
}
</style>