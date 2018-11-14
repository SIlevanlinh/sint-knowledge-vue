<template>
    <b-container class="layout">
        <b-row class="header">
            <b-col cols="2"><LocaleChanger/></b-col>
            <b-col cols="10" id="page-title"><h1>{{  $t("message.company") }}</h1></b-col>
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
        margin-top: 1rem;
        .header {
            margin-bottom: 1.5rem;
            #page-title {
                font-weight: bold;
                font-style: italic;
                color: #0B9ED0;
            }
        }
    }
</style>
