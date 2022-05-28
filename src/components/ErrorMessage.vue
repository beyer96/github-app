<template>
    <div class="col-md-6 border border-3 border-danger p-3 mx-auto mt-5">
        <h2>Something wrong happened :(</h2>
        <p>{{ repositoriesStore.errorMessage }}</p>
    </div>
</template>

<script setup>
import { useRepositoriesStore } from "../stores/repositoriesStore"
const repositoriesStore = useRepositoriesStore()
</script>