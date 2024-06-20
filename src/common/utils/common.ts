import { Request } from 'express'
import { LanguageType } from 'src/common/types'

export function getLang(req: Request): LanguageType {
  return req.headers['accept-language'] === 'en' ? 'en' : 'uz'
}
