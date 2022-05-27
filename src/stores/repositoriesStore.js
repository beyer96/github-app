import { defineStore } from "pinia";

export const useRepositoriesStore = defineStore({
    id: "repositories",
    state: {
        isLoading: false,
        hasError: false,
        user: "Inza",
        repositories: [],
        readme: {}
    },
    actions: {
        async getUserRepositories() {
            this.isLoading = true
            this.hasError = false
            try {
                const response = await fetch(`https://api.github.com/users/${this.user}/repos`)
                const responseJson = await response.json()
                // fetching only public repositories, sorted by date as in GitHub
                this.repositories = responseJson.filter(repo => repo.private === false).sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
            } catch (err) {
                this.hasError = true
                console.error(err)
            } finally {
                this.isLoading = false
            }
        },
        async getReadmeForSelectedRepository(repositoryName) {
            this.isLoading = true
            this.hasError = false
            try {
                const response = await fetch(`https://api.github.com/repos/${this.user}/${repositoryName}/readme`)
                const responseJson = await response.json()
                // storing just "content" property from response, which always comes base64 encoded
                this.readme = responseJson.content.toString("base64")
            } catch (err) {
                this.hasError = true
                console.error(err)
            } finally {
                this.isLoading = false
            }
        }
    }
})