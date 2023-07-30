<template>
    <div class="register">
        <h2>This is a Register page</h2>
        <div class="col-5 mx-auto">
            <b-form @submit.prevent="submit">
                <b-form-group id="input-group-1" label="Nombres:" label-for="input-1" class="text-start">
                    <b-form-input id="input-1" v-model="first_name" class="form-control m-2"  required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Apellidos:" label-for="input-2" class="text-start">
                    <b-form-input id="input-2" v-model="last_name" class="form-control m-2" ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" label="Correo:" label-for="input-3" class="text-start">
                    <b-form-input id="input-3" v-model="email" class="form-control m-2" type="email" required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4" label="Usuario:" label-for="input-4" class="text-start">
                    <b-form-input  @input="usernameTouched = true" id="input-4" v-model="username" class="form-control m-2" :state="getUsernameState" :aria-invalid="!usernameIsValid"></b-form-input>
                    <b-form-invalid-feedback v-if="usernameTouched" >
                    El usuario puede contener solo letras, numeros, y @/./+/-/_ caracteres.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="input-group-5" label="Contraseña:" label-for="input-5" class="text-start">
                    <div class="input-group m-2">
                    <b-form-input id="input-5" v-model="password" class="form-control" required :type="showPassword ? 'text' : 'password'"></b-form-input>
                    <button @click="toggleShowPassword" class="btn btn-outline-secondary" type="button">
                        <b-icon icon="eye-fill" v-if="showPassword" aria-hidden="true"></b-icon>
                        <b-icon icon="eye-slash-fill" v-else aria-hidden="true"></b-icon>
                    </button>
                    </div>
                </b-form-group>
                <br>
                <b-button type="submit" variant="primary">Registrarme</b-button>
                <b-button @click="redirectToLogin" type="button" variant="outline-primary">Ya tengo una cuenta!</b-button>
            </b-form>
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
            window.location.href = '|   /'
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
