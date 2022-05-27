<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <h1>Repo displayer</h1>
    <p>Currently displaying repos of user Inza</p>
    <input type="text" name="user" id="user">
    <label for="user" class="d-block ">Want to see repositories of other user? Use the search field above</label>
  </header>

  <main>
    <RouterView />
  </main>
</template>