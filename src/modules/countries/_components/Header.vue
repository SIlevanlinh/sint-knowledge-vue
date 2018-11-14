<template>
    <h1 align="center">Wavin' Flags 
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

