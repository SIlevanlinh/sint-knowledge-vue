<template>
  <div class="home">
    <FlagGame/>
  </div>
</template>

<script>
// @ is an alias to /src
import FlagGame from '@/modules/flagGame'

export default {
  name: 'home',
  components: {
    FlagGame
  }
}
</script>
