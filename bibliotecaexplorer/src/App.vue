<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div id="app">
    <div class="b-nav">
      <div class="col-6 mx-auto text-center">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
        <button class="btn btn-danger" v-if="isLoggedIn" @click="logout()">Logout</button>
      </div>
    </div>
    <RouterView/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
