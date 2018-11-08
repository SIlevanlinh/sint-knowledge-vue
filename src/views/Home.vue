<template>
  <div class="home">
    <Countries/>
  </div>
</template>

<script>
// @ is an alias to /src
import Countries from '@/modules/countries'

export default {
  name: 'home',
  components: {
    Countries
  }
}
</script>
