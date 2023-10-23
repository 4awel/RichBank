<script>
import axios from 'axios';

export default {
    data() {
        return {
            hide: -1,
            theme: '',
            cards: '',

            mc: false,
            visa: false,
            mir: false,

            openModal: false
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        hideCrad(index) {
            this.hide = index
        },
        async loadData() {
            const response = await axios('/users/account');
            this.cards = response.data.cards;
        },
        goAddCard() {
            this.$router.push({ name: 'addcard' });
        },
        toggleModal() {
            this.openModal = !this.openModal;
        }
    }
}
</script>
<template>
    <main>
        <ul class="stacked-list-card">
            <h2>Кошелёк</h2>
            <div class="item-group">
                <svg @click="goAddCard" class="add-card" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                    viewBox="0 0 24 24" width="64" height="64">
                    <path
                        d="M17,12c0,.553-.448,1-1,1h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1Zm7-7v14c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V5Z" />
                </svg>
                <div class="under-group-item">
                    <li v-for="(card, index) in cards" class="item">

                        <svg :class="{
                            'card-fill-mc': card.title == 'mastercard',
                            'card-fill-mir': card.title == 'mir',
                            'card-fill-visa': card.title == 'visa',
                        }" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="94" height="94">
                            <path d="M19,3H5A5.006,5.006,0,0,0,0,8H24A5.006,5.006,0,0,0,19,3Z" />
                            <path
                                d="M0,16a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm7-.5A1.5,1.5,0,1,1,5.5,14,1.5,1.5,0,0,1,7,15.5" />
                        </svg>

                        <span>Баланс: {{ card.balance }}p</span>
                        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <svg @click="hideCrad(index)" v-if="hide !== index" class="item-fill"
                                xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                                width="28" height="28">
                                <path
                                    d="m14.828,19.071c.576.576.266,1.559-.534,1.707-.008.001-.016.003-.024.004-.322.059-.656-.053-.888-.285L2.216,9.332c-.361-.361-.397-.932-.083-1.334.004-.005.008-.011.013-.016.371-.474,1.08-.514,1.505-.088l11.177,11.177ZM.528,10.473c-.143.272-.261.514-.35.708-.237.521-.237,1.118,0,1.64.041.091.094.199.147.308l5.915,5.915c.782.782,1.758,1.346,2.833,1.603.086.021.173.04.261.059.537.116.902-.524.514-.912L.528,10.473Zm23.179,11.82c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l4.268,4.268c1.838-1.036,3.862-1.561,6.025-1.561,6.192,0,9.72,4.238,11.271,6.764.978,1.592.978,3.57,0,5.162-.632,1.029-1.678,2.473-3.178,3.753l3.614,3.614ZM7.455,6.041l1.788,1.788c1.94-1.283,4.586-1.071,6.293.636,1.707,1.708,1.919,4.353.636,6.293l2.502,2.502c1.368-1.135,2.322-2.45,2.894-3.381.581-.946.581-2.122,0-3.068-1.333-2.17-4.349-5.811-9.567-5.811-1.619,0-3.143.35-4.545,1.041Zm7.252,7.252c.531-1.115.336-2.492-.585-3.414-.922-.922-2.3-1.116-3.414-.585l4,4Z" />
                            </svg>
                            <svg @click="hideCrad(index)" v-if="hide == index" class="item-fill"
                                xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="28" height="28">
                                <path
                                    d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" />
                                <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" />
                            </svg>
                            <span @click="hideCrad(index)" v-if="hide == index">{{ card.number }}</span>
                            <b @click="hideCrad(index)" v-if="hide !== index">Показать номер карты</b>
                        </div>
                        <svg @click="toggleModal" class="info-fill" xmlns="http://www.w3.org/2000/svg" id="Outline"
                            viewBox="0 0 24 24" width="28" height="28">
                            <path
                                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                            <path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z" />
                            <circle cx="12" cy="6.5" r="1.5" />
                        </svg>
                        <div v-if="openModal" class="modal">
                            <div class="modal-main">
                                <h2 style="color: rgb(43, 172, 107); margin: 20px;">Информация о карте</h2>

                                <div class="modal-container">
                                    <p class="p-info-to-card">Баланс:<b>{{ card.balance }}</b></p>
                                    <p class="p-info-to-card">Номер карты: <b>{{ card.number }}</b></p>
                                    <p class="p-info-to-card">SVS: <b>{{ card.svs }}</b></p>
                                    <p class="p-info-to-card">Имя на карте: <b>{{ card.naming }}</b></p>
                                    <p class="p-info-to-card">Срок действия: <b>{{ card.year / 100 }}</b></p>
                                    <p class="p-info-to-card">Название карты: <b>{{ card.title }}</b></p>
                                </div>

                                <button @click="toggleModal" class="modal-close">&#10006;</button>
                                <div style="display: flex; justify-content: end;">
                                    <button class="delete-btn">Удалить карту</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </ul>


    </main>
</template>
<style>
.p-info-to-card {
    display: flex;
    justify-content: space-between;
}

.delete-btn {
    color: #fff;
    padding: 10px;
    margin: 20px 0 0 0;
    background-color: #e03131d2;
    border-radius: 20px;
    border: none;
}

.delete-btn:hover {
    transition: all 500ms;
    background-color: #a82d2dd2;
}

.modal {
    position: fixed;
    inset: 0;
    background-color: #0000003f;
    display: flex;
    cursor: pointer;
    padding: 30px;
    overflow-y: auto;
}

.modal-main {
    position: relative;
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    color: #000000;
    border-radius: 16px;
    padding: 30px;
    cursor: default;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.modal-close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 22px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 2px solid rgb(83, 177, 125);
    border-radius: 10px;
    padding: 4px;
}

.info-fill {
    fill: rgb(56, 151, 99);
}

.info-fill:hover {
    fill: rgb(44, 102, 71);
    cursor: pointer;
}

.item-fill {
    fill: #fff;
}

.stacked-list-card {
    margin: 20px;
    box-shadow: 1px 2px 17px rgb(83, 177, 125);
    padding: 24px;
    border-radius: 20px;
}

.stacked-list-card h2 {
    font-size: 5vh;
    font-weight: 600;
}

.item-group {
    display: flex;

}

.item {
    box-shadow: 1px 1px 8px #000;
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
}

.under-group-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}

.item span {
    font-size: 24px;
}

.item-info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.item-info span {
    font-weight: 500;
    font-size: 24px;
}

.add-card {
    fill: rgb(83, 177, 125);
    margin: 18px 0;
}

.add-card:hover {
    fill: rgb(56, 151, 99);
    cursor: pointer;
}

.card-fill-mc {
    fill: rgba(235, 84, 73, 0.788);
}

.card-fill-mir {
    fill: rgba(115, 255, 97, 0.788);
}

.card-fill-visa {
    fill: rgba(102, 191, 250, 0.788);
}</style>