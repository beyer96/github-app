import { defineStore } from "pinia";
import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if(!expectedError) {
        let err = {message: "An unexpected error has occured..."}
        return Promise.reject(err)
    }
    return Promise.reject(error)
})

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
                // ERROR HANDLING - empty input
                if(this.user == "") throw Error("No user selected")
                const response = await axios.get(`https://api.github.com/users/${this.user}/repos`)
                // fetching only public repositories, sorted by date as in GitHub
                this.repositories = response.data.filter(repo => repo.private === false).sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
                
            } catch (err) {
                if(err.response?.status == 404) {
                    this.hasError = true
                    this.errorMessage = `We could not find any repositories for user ${this.user}`
                } else {
                    this.hasError = true
                    this.errorMessage = err.message
                }
            } finally {
                this.isLoading = false
            }
        },
        async getReadmeForSelectedRepository(repositoryName) {
            this.isLoading = true
            this.hasError = false
            try {
                const response = await axios.get(`https://api.github.com/repos/${this.user}/${repositoryName}/readme`)
                if(!response.data.content) throw Error("Readme file for this project doesn't exist")
                // storing just "content" property from response, which always comes base64 encoded
                this.readme = atob(response.data.content)
            } catch (err) {
                if(err.response?.status == 404) {
                    this.hasError = true
                    this.errorMessage = "This repository has no readme file"
                } else {
                    this.hasError = true
                    this.errorMessage = err.message
                }
                
            } finally {
                this.isLoading = false
            }
        }
    }
})