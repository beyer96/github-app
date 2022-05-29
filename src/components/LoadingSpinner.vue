<template>
    <div class="spinner rounded-circle"></div>
</template>

<style scoped>
    .spinner {
        width: 100px;
        height: 100px;
        border: 10px solid lightgrey;
        border-top: 10px solid black;
        animation: spin 1500ms linear infinite;
    }
    @keyframes spin {
        0% {transform: rotate(0deg); opacity: 1;}
        25% {transform: rotate(90deg); opacity: 0.5;}
        50% {transform: rotate(180deg); opacity: 1;}
        75% {transform: rotate(270deg); opacity: 0.5;}
        100% {transform: rotate(360deg); opacity: 1;}
    }
</style>