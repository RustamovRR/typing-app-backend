import { ERROR_TRANSLATIONS } from 'src/constants'
import { ERROR_TYPES, LanguageType } from 'src/types'

export function getErrorMessage(key: keyof typeof ERROR_TYPES, lang: LanguageType) {
  return {
    error: ERROR_TRANSLATIONS['en'][key],
    message: ERROR_TRANSLATIONS[lang][key],
  }
}
