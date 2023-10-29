<script>
import axios from 'axios';

export default {
  data() {
    return {
      isDarkTheme: false,
      isRegistred: false,

      angle: false,

      data: '',
    }
  },
  methods: {
    goMain() {
      this.$router.push({ name: 'main' });
    },
    goPayments() {
      this.$router.push({ name: 'payment' });
    },
    goHistory() {
      this.$router.push({ name: 'history' });
    },
    goProfile() {
      this.$router.push({ name: 'profile' });
    },
    goLogin() {
      this.$router.push({ name: 'login' });
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      // Отпровляем значение темы в родительский компонент
      this.$emit('change-theme', this.isDarkTheme);
      
    },
    async loadAccount() {
      const response = await axios('/users/account');
      this.isRegistred = response.data.isRegistred
      this.isDarkTheme = response.data.isDarkTheme
      this.$emit('change-theme', this.isDarkTheme);
      console.log(this.isDarkTheme)
    },
    hideSidebar() {
      this.angle = !this.angle
    },
    async upDateTheme() {
      await axios
      .put('upData/theme', {
        isDarkTheme: this.isDarkTheme,
      })
      .then((res) => {
        console.log('Data is updated', res.data.isDarkTheme)
      })
      .catch((err) => {
        console.log('Error! Data is not update', err)
      })
    }
  },
  mounted() {
    this.goMain();
    this.loadAccount();
    // this.toggleTheme();
  }
}
</script>


<template>
  <div :class="{
    'sidebar': !angle,
    'hide-sidebar': angle
  }">
    <!-- <div class="container-relative"> -->
    <div class="container-sb">
      <div class="logo-sb">
        <svg class="change-color" id="Layer_1" height="32" viewBox="0 0 24 24" width="32"
          xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
          <path
            d="m0 21h24v3h-24zm24-12.9v1.9h-3v6h2v3h-22v-3h2v-6h-3v-1.9a3.408 3.408 0 0 1 1.777-3l8.59-4.684a3.4 3.4 0 0 1 3.266 0l8.591 4.684a3.409 3.409 0 0 1 1.776 3zm-19.438-1.1h14.875l-7.237-3.95a.4.4 0 0 0 -.39 0zm6.438 3v6h2v-6zm-5 6h2v-6h-2zm12-6h-2v6h2z" />
        </svg>
      </div>
      <h2 v-if="!angle" style="font-size: 18px; font-weight: 700;">RICHBANK</h2>
      <div class="change-color" style="transition: all 500ms;">
        <svg @click="hideSidebar" v-if="!angle" class="hide-sb-left" xmlns="http://www.w3.org/2000/svg" id="Outline"
          viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z" />
        </svg>
        <svg @click="hideSidebar" v-if="angle" class="hide-sb-right" xmlns="http://www.w3.org/2000/svg" id="Outline"
          viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z" />
        </svg>
      </div>
    </div>
    <div class="btn-group-sb">
      <button @click="goMain" class="btn-item-sb" :class="{ 'btn-active': $route.name == 'main' }">
        <svg class="change-color" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24"
          height="24">
          <path
            d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z" />
        </svg>
        <span v-if="!angle">Главная</span></button>
      <button @click="goPayments" class="btn-item-sb" :class="{ 'btn-active': $route.name == 'payment' }">
        <svg class="change-color" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24"
          height="24">
          <path
            d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
          <circle cx="7" cy="22" r="2" />
          <circle cx="17" cy="22" r="2" />
        </svg>
        <span v-if="!angle"> Платежи</span></button>
      <button @click="goHistory" :class="{ 'btn-active': $route.name == 'history' }" class="btn-item-sb">
        <svg class="change-color" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24"
          height="24">
          <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
          <path
            d="M12,6a1,1,0,0,0-1,1v4.325L7.629,13.437a1,1,0,0,0,1.062,1.7l3.84-2.4A1,1,0,0,0,13,11.879V7A1,1,0,0,0,12,6Z" />
        </svg>
        <span v-if="!angle">История</span></button>
      <button class="btn-item-sb">
        <svg class="change-color" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
          width="24" height="24">
          <path d="M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z" />
          <path d="M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z" />
          <path d="M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z" />
          <path d="M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z" />
          <path d="M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z" />
          <path
            d="M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z" />
        </svg>
        <span v-if="!angle">Статистика</span></button>
      <button class="btn-item-sb">
        <svg class="change-color" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24"
          height="24">
          <path
            d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
        </svg>
        <span v-if="!angle">Помощь</span>
      </button>
    </div>
    <div class="container-sb-2">
      <button v-if="!isRegistred" @click="goLogin" class="btn-login">Войти</button>
      <div v-if="isRegistred" @click="goProfile" class="avatar-sb">

      </div>
      <svg v-if="!isDarkTheme && !angle" class="change-color" xmlns="http://www.w3.org/2000/svg" id="Layer_1"
        data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28">
        <path
          d="M23,11H18.92a6.924,6.924,0,0,0-.429-1.607l3.527-2.044a1,1,0,1,0-1-1.731l-3.53,2.047a7.062,7.062,0,0,0-1.149-1.15l2.046-3.531a1,1,0,0,0-1.731-1L14.607,5.509A6.9,6.9,0,0,0,13,5.08V1a1,1,0,0,0-2,0V5.08a6.9,6.9,0,0,0-1.607.429L7.349,1.982a1,1,0,0,0-1.731,1L7.664,6.515a7.062,7.062,0,0,0-1.149,1.15L2.985,5.618a1,1,0,1,0-1,1.731L5.509,9.393A6.924,6.924,0,0,0,5.08,11H1a1,1,0,0,0,0,2H5.08a6.924,6.924,0,0,0,.429,1.607L1.982,16.651a1,1,0,1,0,1,1.731l3.53-2.047a7.062,7.062,0,0,0,1.149,1.15L5.618,21.016a1,1,0,0,0,1.731,1l2.044-3.527A6.947,6.947,0,0,0,11,18.92V23a1,1,0,0,0,2,0V18.92a6.947,6.947,0,0,0,1.607-.429l2.044,3.527a1,1,0,0,0,1.731-1l-2.046-3.531a7.062,7.062,0,0,0,1.149-1.15l3.53,2.047a1,1,0,1,0,1-1.731l-3.527-2.044A6.924,6.924,0,0,0,18.92,13H23A1,1,0,0,0,23,11ZM12,17c-6.608-.21-6.606-9.791,0-10C18.608,7.21,18.606,16.791,12,17Z" />
      </svg>
      <svg v-if="isDarkTheme && !angle" class="change-color" xmlns="http://www.w3.org/2000/svg" id="Layer_1"
        data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28">
        <path
          d="M15,24a12.021,12.021,0,0,1-8.914-3.966,11.9,11.9,0,0,1-3.02-9.309A12.122,12.122,0,0,1,13.085.152a13.061,13.061,0,0,1,5.031.205,2.5,2.5,0,0,1,1.108,4.226c-4.56,4.166-4.164,10.644.807,14.41a2.5,2.5,0,0,1-.7,4.32A13.894,13.894,0,0,1,15,24Zm.076-22a10.793,10.793,0,0,0-1.677.127,10.093,10.093,0,0,0-8.344,8.8A9.927,9.927,0,0,0,7.572,18.7,10.476,10.476,0,0,0,18.664,21.43a.5.5,0,0,0,.139-.857c-5.929-4.478-6.4-12.486-.948-17.449a.459.459,0,0,0,.128-.466.49.49,0,0,0-.356-.361A10.657,10.657,0,0,0,15.076,2Z" />
      </svg>
      <!-- <div class="toggle-sb-light"> -->
        <!-- <input @change="upDateTheme" type="checkbox" role="switch"> -->
        <div v-if="!angle" @click="toggleTheme" class="form-check form-switch">
          <input :checked="isDarkTheme == true" @change="upDateTheme" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        </div>
        <!-- <div class="toggler" :class="{ 'active': isDarkTheme }"></div> -->
      </div>
    </div>
  <!-- </div> -->
</template>

<style>
.hide-sidebar {
  transition: all 1000ms;
  height: 100%;
  width: 90px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 1px 7px rgb(83, 177, 125);
  /* padding-top: 20px; */
  background: linear-gradient(rgb(84, 201, 133), rgba(169, 218, 173, 0.527));
  color: #fff;
}

.btn-login {
  background-color: rgb(83, 177, 125);
  border-radius: 20px;
  padding: 10px;
  box-shadow: 1px 1px 10px #36723e;
}

.btn-login:hover {
  background-color: rgb(72, 133, 99);
}

.change-color {
  fill: #fff;
}

.sidebar {
  transition: all 1000ms;
  height: 100%;
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 1px 7px rgb(83, 177, 125);
  /* padding-top: 20px; */
  background: linear-gradient(rgb(84, 201, 133), rgba(169, 218, 173, 0.527));
  color: #fff;
}

.btn-item-sb {
  padding: 8px 16px;
  font-size: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-active {
  padding: 8px 16px;
  font-size: 24px;
  width: 100%;
  display: flex;
  box-shadow: 0px 0.5px 10px rgb(62, 126, 91);
  background-color: rgb(83, 177, 125);
}

.btn-item-sb:hover {
  background-color: rgb(83, 177, 125);
  box-shadow: 0px 0.5px 10px rgb(62, 126, 91);
}

.container-sb {
  display: flex;
  padding: 14px;
  justify-content: space-between;
  align-items: center;
}

.hide-sb-left:hover {
  transition: all 500ms;
  transform: translateX(-4px);
  cursor: pointer;
}

.hide-sb-right:hover {
  transition: all 500ms;
  transform: translateX(4px);
  cursor: pointer;
}

.avatar-sb {
  background-color: #fff;
  border: 2px solid rgb(83, 177, 125);
  border-radius: 50%;
  padding: 22px;
  cursor: pointer;
}

.container-sb-2 {
  /* margin-top: 18vw; */
  display: flex;
  padding: 14px;
  justify-content: space-between;
  align-items: center;
}

.toggle-sb-light {
  display: flex;
  align-items: center;
  padding: 14px 26px;
  border-radius: 20px;
  background-color: rgb(83, 177, 125);
}

.toggler {
  transition: all 500ms;
  position: absolute;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
}

.active {
  transition: all 500ms;
  transform: translateX(-20px);
  position: absolute;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
}

.toggle-sb-light:hover {
  cursor: pointer;
}
</style>