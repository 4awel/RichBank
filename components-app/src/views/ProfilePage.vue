<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            const response = await axios('/users/account');
            this.username = response.data.email;
        },
        goLogin() {
            this.$router.push({name: 'login'})
        }
    },
}
</script>
<template>
    <main>
        <div>
            <h2 style="font-size: 40px;">Имя пользователя: {{ username }}</h2>
          <button @click="goLogin" class="btn-login">Войти в другой аккаунт</button>
        </div>
        <form class="form-add-img">
            <label for="img_upload">
                Выберите Чтобы загрузить изображение в ваш аватар:
            </label>
            <input name="img_upload" class="input-add-img" type="file" accept=".jpg, .jpeg, .png"/>
            <button class="btn-add-img" type="submit">Добавить</button>
        </form>
    </main>
</template>
<style scoped>
.form-add-img {
    display: flex;
    padding: 10px;
    flex-direction: column;
    margin: 10px;
}

.input-add-img {
    background: #30ce8cbd;
    padding: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;
}

.input-add-img:hover {
    background-color: #40a77f;
}

.btn-add-img {
    background-color: #3abe8c;
    padding: 10px;
    font-size: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.btn-add-img:hover {
    background-color: #2bb179bd;
}

.btn-login {
  background-color: #40a77f;
  margin: 10px;
}
</style>