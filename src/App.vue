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
  <header class="bg-darkblue pb-2">
    <h1 class="mb-3">Repo displayer</h1>
    <input type="text" id="user" ref="user" @keypress.enter="searchForUser(this.$refs.user.value); this.$refs.user.value = ''">
    <label for="user" class="d-block text-label w-md-25 mx-auto">Want to see repositories of another user? Use the search field above and hit enter!</label>
  </header>
  <main>
    <RouterView />
  </main>
</template>