// If using a module system (e.g. via vue-cli), import Vue and VueI18n and then call Vue.use(VueI18n).
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locales/en.json'
import ja from './locales/ja.json'

Vue.use(VueI18n)

// Ready translated locale messages
const messages = {
    en,
    ja
}


// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'ja', // set locale
    fallbackLocale: 'en',
    messages, // set locale messages
})

export default i18n
