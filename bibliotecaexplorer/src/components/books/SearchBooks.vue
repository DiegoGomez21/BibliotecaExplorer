<template>
    <div class="search-bar" >
        <form @submit.prevent="submit" class="d-flex col-6 mx-auto mt-3 mb-3" role="search">
            <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div v-if="results">
            <table class="table table-striped table-bordered">
            <thead class="thead-light">
                <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="libro in paginatedResults" :key="libro.key">
                <td>{{ libro.title }}</td>
                <td>{{ libro.author_name ? libro.author_name.join(', ') : '' }}</td>
                <td><i class="bi bi-cloud-plus-fill" @click="guardar"></i></td>
                </tr>
            </tbody>
            </table>

            <nav>
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <button class="page-link" @click="gotoPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
                </li>
            </ul>
            </nav>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        results: "",
        allResults: [],
        paginatedResults: [],
        resultsPerPage: 10,
        currentPage: 1,
      };
    },
    methods: {
        submit (e) {
            const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(this.search)}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                //'Content-type': 'application/json',
                },
            };

            fetch(apiUrl, requestOptions)
                .then(result => result.json())
                .then(data => {
                this.allResults = data.docs; 
                this.results = data.docs;
                console.log(this.results);
                })
                .catch(error => {
                console.error('Error al hacer la petición:', error);

                })
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedResults();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.updatePaginatedResults();
            }
        },
        gotoPage(page) {
            this.currentPage = page;
            this.updatePaginatedResults();
        },
        updatePaginatedResults() {
            const startIndex = (this.currentPage - 1) * this.resultsPerPage;
            const endIndex = startIndex + this.resultsPerPage;
            this.paginatedResults = this.allResults.slice(startIndex, endIndex);
        },
        guardar(){
            alert('Esta funcion estará disponible muy pronto');
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.allResults.length / this.resultsPerPage);
        },
    },
    watch: {
        allResults() {
        this.updatePaginatedResults();
        },
    },
  };
  </script>

<style>
    i {
    cursor: pointer;
    }
</style>





  