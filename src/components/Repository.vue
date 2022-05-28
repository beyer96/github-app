<template>
    <section class="text-center">
        <RouterLink :to="{ name: 'home' }">Back</RouterLink>
        <a href="#">GitHub link</a>
        <h2>Inza/agens</h2>
        <span>Created: 25 Jun 2017</span>
        <span>Last edit: 22 Sep 2018</span>
        <!-- Forks, stargazers, if any - inline -->
        <span>Stargazers: 2 | Forks: 3</span>
        <!-- Topics, if any -->
        <div>
            <span>Topic1</span>
            <span>Topic2</span>
            <span>Topic3</span>
        </div>
        <div class="text-start">
            <h3>ReadMe file</h3>
            <p v-html="marked(repositoriesStore.readme)"></p>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { marked } from "marked"
import { useRepositoriesStore } from "../stores/repositoriesStore"

const repositoriesStore = useRepositoriesStore()
const route = useRoute()

onMounted(() => {
    repositoriesStore.getReadmeForSelectedRepository(route.params.name)
})
</script>