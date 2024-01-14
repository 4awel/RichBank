<script>
import SideBar from './components/SideBar.vue';
import { RouterView } from 'vue-router';


export default {
  components: {
    SideBar,
    RouterView,
  },
  methods: {
    changeTheme(isDarkTheme) {
      this.theme = isDarkTheme;
    }
  },
  data() {
    return {
      theme: '',
    }
  }
}
</script>

<template>
  <div class="app" :class="{ 'dark-theme': theme }">
    <!-- <side-bar></side-bar>
    <router-view></router-view> -->
    <div class="container py-3">
      <div class="row">
        <div class="col-2">
          <!-- Левая колонка -->
          <side-bar @change-theme="changeTheme"></side-bar>
        </div>
        <div class="col-10">
          <!-- Правая колонка -->
          <router-view ref="bar"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app {
  /* display: flex; */
  height: 100vh;
}

.dark-theme {
  background: #303030;
  color: #fff;
}
</style>
