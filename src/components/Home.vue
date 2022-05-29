<template>
    <!-- Loading spinner -->
    <div v-if="repositoriesStore.isLoading" class="text-center my-3 position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner />
        <span class="fs-3 fw-bolder">Loading...</span>
    </div>
    <!-- Error displayer -->
    <div v-if="repositoriesStore.hasError">
        <ErrorMessage :errorMessage="repositoriesStore.errorMessage"/>
    </div>
    <!-- Content loaded properly -->
    <section v-if="repositoriesStore.repositories.length > 0" class="w-100 text-center my-3">
        <h2>{{ repositoriesStore.user }}'s repositories</h2>
        <div class="container-fluid row g-2">
            <div v-for="repo in repositoriesStore.repositories" :key="repo.id" class="col-md-6 col-lg-4">
                <div class="repo container d-flex flex-column p-3 mb-3 bg-warning h-100">
                    <h3 class="fs-4 text-break">{{ repo.name }}</h3>
                    <div class="description row">
                        <div class="col-2">
                            <img src="../assets/media/images/icons8-archive-96.png" class="img-fluid" />
                        </div>
                        <div class="col-10">
                            <p>{{ repo.description !== null ? repo.description : "This repository has no description :("}}</p>
                        </div>
                    </div>
                    <div class="text-start mt-auto d-flex justify-content-between">
                        <div class="additional-info">
                            <h4 class="d-inline-block fs-6">Language: </h4>
                            <span class="ps-2">{{ repo.language !== null ? repo.language : "---"}}</span>
                            <br>
                            <h5 class="d-inline-block fs-6">Last edit: </h5>
                            <span class="ps-2">{{ dayjs(repo.pushed_at).format("D MMM YYYY") }}</span>
                        </div>
                        <div class="links d-flex flex-column justify-content-start align-items-end">
                            <RouterLink :to="{ name: 'repository', params: {name: repo.name}}">View details</RouterLink>
                            <a :href="repo.html_url" target="_blank">GitHub link</a>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </section>
</template>

<script setup>
import dayjs from "dayjs"
import { onMounted } from "vue"
import { useRepositoriesStore } from "../stores/repositoriesStore"
import LoadingSpinner from "./LoadingSpinner.vue"
import ErrorMessage from "./ErrorMessage.vue"

const repositoriesStore = useRepositoriesStore()

onMounted(() => {
    repositoriesStore.getUserRepositories()
})
</script>