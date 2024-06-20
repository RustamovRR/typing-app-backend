import { ERROR_TRANSLATIONS } from 'src/common/constants'
import { ERROR_TYPES, LanguageType } from 'src/common/types'

export function getErrorMessage(key: keyof typeof ERROR_TYPES, lang: LanguageType) {
  return {
    error: ERROR_TRANSLATIONS['en'][key],
    message: ERROR_TRANSLATIONS[lang][key],
  }
}
