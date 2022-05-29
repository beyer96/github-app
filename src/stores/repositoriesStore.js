import { defineStore } from "pinia";

export const useRepositoriesStore = defineStore({
    id: "repositories",
    state: () => ({
        isLoading: false,
        hasError: false,
        errorMessage: null,
        user: "Inza",
        repositories: [],
        selectedRepository: null,
        readme: null
    }),
    actions: {
        setUser(newUser) {
            this.user = newUser
            this.getUserRepositories()
        },
        async getUserRepositories() {
            this.isLoading = true
            this.hasError = false
            try {
                if(this.user == "") throw Error("No user selected")
                const response = await fetch(`https://api.github.com/users/${this.user}/repos`)
                const responseJson = await response.json()
                if(responseJson.length > 0) {
                    // fetching only public repositories, sorted by date as in GitHub
                    this.repositories = responseJson.filter(repo => repo.private === false).sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
                } else {
                    throw Error(`We could not find any repositories for user ${this.user}`)
                }
                
            } catch (err) {
                this.hasError = true
                this.errorMessage = err.message
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
                if(!responseJson.content) throw Error("Readme file for this project doesn't exist")
                // storing just "content" property from response, which always comes base64 encoded
                this.readme = atob(responseJson.content)
            } catch (err) {
                this.hasError = true
                this.errorMessage = err.message
            } finally {
                this.isLoading = false
            }
        }
    }
})