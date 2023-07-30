<template>
    <div class="home">
        <h2>This is a Home page</h2>
        <button class="btn btn-success">Click me</button>
        <ListBook/>
    </div>
</template>

<script>
import ListBook from '../components/Book/ListBook.vue'
export default {
  name: 'Home',
  components: {
    ListBook
  }
}
</script>
