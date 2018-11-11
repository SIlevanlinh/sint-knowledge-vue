<template>
  <div id="app">
    <div id="nav">
      <!-- <a href="#" @click.stop.prevent="changeLocale('JA')">JA</a > |
      <a href="#" @click.stop.prevent="changeLocale('EN')">EN</a> -->
      <h1>SIのナレッジ</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeLocale (locale) {
      console.log(locale)
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &:active {
      color: #42b983;
    }
  }
}
</style>
