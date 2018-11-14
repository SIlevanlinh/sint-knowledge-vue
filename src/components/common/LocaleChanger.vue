<template>
  <b-container class="locale-changer">
    <b-row>
        <b-col>
            <b-form-select id="exampleInput3"
                        :options="langs"
                        required
                        v-model="$i18n.locale">
            </b-form-select>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return {
        langs: [
            { value: 'ja', text: '日本語' },
            { value: 'en', text: 'English'}
        ]
    }
  }
}
</script>