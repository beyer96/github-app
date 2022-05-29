<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRepositoriesStore } from "./stores/repositoriesStore"
import router from "./router/index"

const repositoriesStore = useRepositoriesStore()

const searchForUser = (newUser) => {
  repositoriesStore.setUser(newUser)
  router.push("/")
}

</script>

<template>
  <header>
    <h1>Repo displayer</h1>
    <p>Currently displaying repos of user {{ repositoriesStore.user }}</p>
    <input type="text" id="user" ref="user" @keypress.enter="searchForUser(this.$refs.user.value); this.$refs.user.value = ''">
    <label for="user" class="d-block ">Want to see repositories of other user? Use the search field above</label>
  </header>

  <main>
    <RouterView />
  </main>
</template>