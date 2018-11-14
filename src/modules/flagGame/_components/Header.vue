<template>
    <h1 class="game-name" align="center">Wavin' Flags 
      <b-badge>{{ score }}</b-badge>
      <span style="font-size: 20px"> / {{ numberOfCountries }}</span>
    </h1>
</template>

<script>
export default {
    name: 'flag-game-header',
    props: {
        score: {
            type: Number,
            default: 0
        },
        numberOfCountries: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style>
    .game-name {
        font-weight: bold;
        font-style: italic;
        color: #EF1C23;
    }
</style>


