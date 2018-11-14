<template>
    <b-container fluid class="layout">
        <b-row>
            <b-col><LocaleChanger/></b-col>
        </b-row>
        <b-row>
            <b-col><router-view/></b-col>
        </b-row>
    </b-container>
</template>

<script>
import LocaleChanger from '../common/LocaleChanger'

export default {
  name: 'Layout',
  components: {
      LocaleChanger
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .layout {
        background-color: aquamarine;
    }
</style>
