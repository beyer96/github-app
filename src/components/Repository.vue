<template>
    <!-- Loading spinner -->
    <div v-if="repositoriesStore.isLoading" class="text-center my-3 position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner />
        <span class="fs-3 fw-bolder">Loading...</span>
    </div>
    <!-- Error message  -->
    <div v-else-if="!repositoriesStore.selectedRepository">
        <ErrorMessage :errorMessage="repositoriesStore.errorMessage"/>
    </div>
    <!-- Content fetched properly -->
    <section v-else-if="repositoriesStore.selectedRepository" class="text-center text-break">
        <!-- Navbar -->
        <nav class="m-3">
            <RouterLink :to="{ name: 'home' }" class="px-3 mx-1 border text-black rounded-pill bg-lightblue">Back</RouterLink>
            <a :href="repositoriesStore.selectedRepository.html_url" target="_blank" class="px-3 mx-1 border text-black rounded-pill bg-lightblue">GitHub link</a>
        </nav>
        <!-- Info about repository -->
        <div class="container d-flex flex-column">
            <h2>{{ repositoriesStore.selectedRepository.name }}</h2>
            <span class="my-1">Created: {{ dayjs(repositoriesStore.selectedRepository.created_at).format("D MMM YYYY") }}</span>
            <span class="my-1">Last edit: {{ dayjs(repositoriesStore.selectedRepository.updated_at).format("D MMM YYYY") }}</span>
            <span class="my-1">Stargazers: {{ repositoriesStore.selectedRepository.stargazers_count }} | Forks: {{ repositoriesStore.selectedRepository.forks }}</span>
            <!-- Topics, if any -->
            <div v-if="repositoriesStore.selectedRepository.topics.length > 0" class="mt-3 d-flex justify-content-center flex-wrap">
                <span v-for="topic in repositoriesStore.selectedRepository.topics" :key="topic" class="px-3 m-1 border text-black rounded-pill bg-light">{{ topic }}</span>
            </div>
        </div>
        <!-- Readme file -->
        <div class="container my-5 border border-3 rounded-3 p-3 bg-lightblue">
            <h3>ReadMe file</h3>
            <!-- Error if app couldn't fetch readme file / readme file doesn't exists -->
            <ErrorMessage v-if="repositoriesStore.hasError" :errorMessage="repositoriesStore.errorMessage" />
            <p class="text-start" v-else-if="repositoriesStore.readme !== null" v-html="marked(repositoriesStore.readme)"></p>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { marked } from "marked"
import dayjs from "dayjs"
import LoadingSpinner from "./LoadingSpinner.vue"
import ErrorMessage from "./ErrorMessage.vue"
import { useRepositoriesStore } from "../stores/repositoriesStore"

const repositoriesStore = useRepositoriesStore()
const route = useRoute()

onMounted(async () => {
    // for case of refreshing the page or directly opening this route, user property of the store is taken from URL params
    repositoriesStore.user = route.params.username
    if(repositoriesStore.repositories.length == 0) {
        await repositoriesStore.getUserRepositories()
    }
    repositoriesStore.selectedRepository = repositoriesStore.repositories.find(repo => repo.name === route.params.repo)
    repositoriesStore.getReadmeForSelectedRepository(route.params.repo)
})
</script>