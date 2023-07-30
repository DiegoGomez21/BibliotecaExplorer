<template>
    <div class="container">
        <div class="row">
            <div class="col text_left">
                <br>
                <h3>Listado de libros</h3>

                <div class="col-md-12">
                    <b-table striped hover :items="books" :fields="fields">
                    </b-table>

                </div>
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
      const path = 'http://127.0.0.1:8000/api/v1.0/books/'
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
