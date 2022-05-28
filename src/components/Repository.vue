<template>
    <section v-if="repositoriesStore.selectedRepository" class="text-center text-break">
        <nav class="m-3">
            <RouterLink :to="{ name: 'home' }" class="px-3 mx-1 border text-black rounded-pill bg-light">Back</RouterLink>
            <a :href="repositoriesStore.selectedRepository.html_url" target="_blank" class="px-3 mx-1 border text-black rounded-pill bg-light">GitHub link</a>
        </nav>
        <div class="container d-flex flex-column">
            <h2>{{ repositoriesStore.selectedRepository.name }}</h2>
            <span class="my-1">Created: {{ dayjs(repositoriesStore.selectedRepository.created_at).format("D MMM YYYY") }}</span>
            <span class="my-1">Last edit: {{ dayjs(repositoriesStore.selectedRepository.updated_at).format("D MMM YYYY") }}</span>
            <!-- Forks, stargazers, if any - inline -->
            <span class="my-1">Stargazers: {{ repositoriesStore.selectedRepository.stargazers_count }} | Forks: {{ repositoriesStore.selectedRepository.forks }}</span>
            <!-- Topics, if any -->
            <div v-if="repositoriesStore.selectedRepository.topics.length > 0" class="mt-3 d-flex justify-content-center flex-wrap">
                <span v-for="topic in repositoriesStore.selectedRepository.topics" :key="topic" class="px-3 m-1 border text-black rounded-pill bg-light">{{ topic }}</span>
            </div>
        </div>
        <div class="container mt-5 border border-3 rounded-3 p-3 bg-light">
            <h3>ReadMe file</h3>
            <p class="text-start" v-if="repositoriesStore.readme !== null" v-html="marked(repositoriesStore.readme)"></p>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { marked } from "marked"
import dayjs from "dayjs"
import { useRepositoriesStore } from "../stores/repositoriesStore"

const repositoriesStore = useRepositoriesStore()
const route = useRoute()

onMounted(() => {
    repositoriesStore.selectedRepository = repositoriesStore.repositories.find(repo => repo.name === route.params.name)
    repositoriesStore.getReadmeForSelectedRepository(route.params.name)
})
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    a:hover {
        background-color: lightblue !important;
    }
</style>