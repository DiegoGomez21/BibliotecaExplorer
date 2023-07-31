<template>
  <div class="login">
      <h2>This is a Login page</h2>
      <div class="col-6 mx-auto">
          <form @submit.prevent="submit">
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Usuario</label>
                  <input type="text" v-model="username"  @click="resetError" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
              </div>
              <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                  <div class="input-group">
                      <input v-model="password"  @click="resetError" class="form-control" id="exampleInputPassword1" required :type="showPassword ? 'text' : 'password'">
                      <button @click="toggleShowPassword" class="btn btn-outline-secondary" type="button">
                        <i class="bi bi-eye-fill" v-if="showPassword" aria-hidden="true"></i>
                        <i class="bi bi-eye-slash-fill" v-else aria-hidden="true"></i>
                      </button>
                  </div>
              </div>
              <button type="submit" class="btn btn-primary m-3">Iniciar sesion</button>
              <button type="button" @click="redirectToRegistro" class="btn btn-outline-primary m-3">Registrarse</button>
          </form>
      </div>
      <br>
      <div v-if="error" class="alert alert-danger col-6 mx-auto" role="alert">
          El inicio de sesión ha fallado. Por favor, verifica tus credenciales.
      </div>
  </div>
</template>

<script>

export default {
name: 'Login',
data () {
  return {
    username: '',
    password: '',
    error: false,
    showPassword: false
  }
},
methods: {
  submit (e) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({username: this.username, password: this.password})
    }

    fetch('https://18.207.214.64/api-token-auth/', requestOptions)
      .then(result => result.json())
      .then(data => {
        console.log(data.token)
        if (data.token) {
          localStorage.setItem('token', data.token)
          window.location.href = '/'
        } else {
          this.username = ''
          this.password = ''
          this.error = true
        }
      })
  },
  redirectToRegistro () {
    window.location.href = '/register'
  },
  resetError () {
    this.error = false
  },
  toggleShowPassword () {
    this.showPassword = !this.showPassword // Cambiar el estado de visibilidad de la contraseña
  }
}
}
</script>
