<template>
    <div class="col-md-6 border border-3 border-danger p-3 mx-auto mt-5">
        <h2>Something wrong happened :(</h2>
        <p>{{ this.errorMessage }}</p>
        <p>Please try to <a href="javascript:location.reload()">refresh the page</a></p>
    </div>
</template>

<script>
export default {
    props: {
        errorMessage: String
    }
}
</script>