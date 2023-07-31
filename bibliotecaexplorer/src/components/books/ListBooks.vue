<template>
    <div class="container">
        <div class="row">
            <div class="col text_left">
                <br>
                <h3>Listado de libros</h3>

                <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>{{ book.title }}</td>
                <td>{{ book.description }}</td>
                <td>
                  <!-- Aquí puedes agregar los botones o enlaces para acciones específicas -->
                </td>
              </tr>
            </tbody>
          </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
  name: 'ListBook',
  data () {
    return {
      fields: [
        { key: 'title', label: 'Título' },
        {key: 'description', label: 'Descripción'},
        {key: 'action', label: 'Acción'}
      ],
      books: []
    }
  },
  methods: {
    getBooks () {
      const path = 'https://18.207.214.64/api/v1.0/books/'
      axios.get(path).then((response) => {
        this.books = response.data.results
        console.log(response.data)
      })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  created () {
    this.getBooks()
  }
}
</script>
