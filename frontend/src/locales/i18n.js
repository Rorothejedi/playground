import {
    createI18n
} from 'vue-i18n/dist/vue-i18n.cjs'
import fr from './fr'
import en from './en'

const i18n = createI18n({
    locale: navigator.language.split('-')[0],
    fallbackLocale: 'en',
    messages: {
        fr,
        en,
    }
})

export default i18n;