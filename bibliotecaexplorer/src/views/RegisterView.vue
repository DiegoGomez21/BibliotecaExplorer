<template>
  <div class="register">
      <h2>This is a Register page</h2>
      <div class="col-5 mx-auto">
          <form @submit.prevent="submit">
              <div class="form-group text-start" >
                  <label for="input-1" class="mt-2">Nombres</label>
                  <input id="input-1" v-model="first_name" class="form-control m-2" required>
              </div>
              <div class="form-group text-start">
                  <label for="input-2">Apellidos</label>
                  <input id="input-2" v-model="last_name" class="form-control m-2">
              </div>
              <div class="form-group text-start">
                  <label for="input-3">Correo</label>
                  <input id="input-3" v-model="email" class="form-control m-2" type="email" required>
              </div>
              <div class="form-group text-start">
                  <label for="input-4">Usuario</label>
                  <input @input="onUsernameInput" id="input-4" v-model="username" class="form-control m-2" :class="{'is-invalid': usernameTouched && !usernameIsValid}" :aria-invalid="usernameTouched && !usernameIsValid">
                  <div class="invalid-feedback" v-if="usernameTouched && !usernameIsValid">
                    El usuario puede contener solo letras, números, y @/./+/-/_ caracteres.
                  </div>
              </div>
              <div class="form-group text-start">
                  <label for="input-5">Contraseña</label>
                  <div class="input-group m-2">
                    <input id="input-5" v-model="password" class="form-control" required :type="showPassword ? 'text' : 'password'">
                    <div class="input-group-append">
                      <button @click="toggleShowPassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="showPassword" class="bi bi-eye-fill" aria-hidden="true"></i>
                        <i v-else class="bi bi-eye-slash-fill" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
              </div>
              <br>
              <button type="submit" class="btn btn-primary m-3">Registrarme</button>
              <button @click="redirectToLogin" type="button" class="btn btn-outline-primary m-3">Ya tengo una cuenta!</button>
          </form>
      </div>
      <br>
      <div v-if="error" class="alert alert-danger col-6 mx-auto" role="alert">
          Ha ocurrido un error.
      </div>
  </div>
</template>


<script>

export default {
name: 'Register',
data () {
  return {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    usernameTouched: false,
    error: false,
    showPassword: false
  }
},
computed: {
  usernameIsValid () {
    return /^[A-Za-z0-9@/./+/-/_]+$/.test(this.username) && !/\s/.test(this.username)
  },
  getUsernameState () {
    return this.usernameTouched && !this.usernameIsValid ? false : null
  }
},
methods: {
  onUsernameInput() {
      this.usernameTouched = true;
  },
  submit (e) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username: this.username, password: this.password, first_name: this.first_name, last_name: this.last_name, email: this.email})
    }

    fetch('http://localhost:8000/api/v1/users/', requestOptions)
      .then(result => result.json())
      .then(data => {
        console.log(data)
        if (data.auth_token) {
          localStorage.setItem('token', data.auth_token)
          window.location.href = '/'
          console.log(data)
        } else {
          this.error = true
        }
      })
  },
  redirectToLogin () {
    window.location.href = '/login'
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
