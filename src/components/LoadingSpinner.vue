<template>
    <div class="spinner mx-auto rounded-circle"></div>
</template>

<style scoped>
    .spinner {
        width: 100px;
        height: 100px;
        border: 10px solid lightgrey;
        border-top: 10px solid black;
        animation: spin 750ms ease-in-out infinite;
    }
    @keyframes spin {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
</style>