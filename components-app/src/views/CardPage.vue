<script>
import axios from 'axios';

export default {
    data() {
        return {
            number: '',
            svs: '',
            naming: '',
            year: '',
            title: '',

            alertErr: false,
            alertSucc: false
        }
    },
    methods: {
        async sendData(evt) {
            // Чтобы страница не обновлялась
            evt.preventDefault();
            //  Проверяем на заполнение полей
            if (this.number == '' || this.svs == '' || this.naming == '' || this.year == '' || this.title == '') {
                this.alertErr = !this.alertErr
            } else {
                // Отправляем данные из полей ввода
                await axios.post('/add/card', {
                    number: this.number,
                    svs: this.svs,
                    naming: this.naming,
                    year: this.year,
                    title: this.title
                });

                this.alertSucc = !this.alertSucc

                // Очищаем поля
                this.number = '';
                this.svs = '';
                this.naming = '';
                this.year = '';
                this.title = ''
            }
        },
        toUpperCaseText() {
            // Чтобы при введение именя на карте текст всегда был с заглавных букв
            this.naming = this.naming.toUpperCase();
        }
    }
}
</script>
<template>
    <form @submit="sendData">
        <div v-if="alertErr" class="alert alert-warning" role="alert">
           Некоторые поля пустые, пожалуйста заполните их все!
        </div>
        <div v-if="alertSucc" class="alert alert-primary" role="alert">
            Ваша карта успешно добавлена!
        </div>
        <button type="submit" class="btn-hover">Добавить</button>
        <label for="">
            Название карты
            <select v-model="title" name="title" id="">
                <option value="MasterCard">MasterCard</option>
                <option value="VISA">VISA</option>
                <option value="MIR">Mir</option>
            </select>
        </label>
        <label for="">
            Номер карты
            <input type="number" v-model="number" placeholder="2200 2000 2000 0000" name="" id="">
        </label>
        <label for="">
            SVS
            <input style="width: 10%;" type="number" v-model="svs" placeholder="SVS" name="" id="">
        </label>
        <label for="">
            Имя на карте
            <input @input="toUpperCaseText" type="text" v-model.trim="naming" placeholder="IVAN IVANOV" name="" id="">
        </label>
        <label for="">
            Срок годности карты
            <input style="width: 10%;" v-model="year" type="number" placeholder="09/23" name="" id="">
        </label>
        <h2>Добавить карту:</h2>
    </form>
</template>
<style>
h2 {
    font-size: 40px;
}

form {
    box-shadow: 1px 1px 10px rgb(83, 177, 125);
    border-radius: 20px;
    display: flex;
    flex-direction: column-reverse;
    padding: 40px 20px;
}

label {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

input {
    background-color: #669b6da6;
    padding: 4px;
    border-radius: 20px;
    border: none;
}

.btn-hover {
    background-color: #57c265c2;
    padding: 8px;
    border-radius: 20px;
    font-size: 18px;
    margin-bottom: 7px;
}

.btn-hover:hover {
    background-color: #50a15ba6;
}

select {
    background-color: #488850c2;
    padding: 5px;
    border-radius: 20px;
    width: 10%;
    border: none;
}

select:hover {
    background-color: #3d8045c2;
    cursor: pointer;
}
</style>