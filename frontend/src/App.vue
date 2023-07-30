<template>
  <div id="app">
    <div class="b-nav">
      <div class="col-6 mx-auto text-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
        <button class="btn btn-danger"  v-if="isLoggedIn"  @click="logout()">Logout</button>
      </div>
    </div>
    <router-view/>
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
