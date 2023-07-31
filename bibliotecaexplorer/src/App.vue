<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="../public/favicon.ico" alt="icono" class="img-thumbnail img-fluid img-smaller"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <RouterLink to="/" class="nav-link">My Books</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Search</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink v-if="!isLoggedIn" to="/login" class="nav-link">Login</RouterLink>
          </li>
          <li class="nav-item">
            <button class="btn btn-danger" v-if="isLoggedIn" @click="logout()">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
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
.img-smaller {
  max-width: 15%;
  height: auto;
}

</style>
