export type LanguageType = 'en' | 'uz'
export type AuthProvidersType = keyof typeof EAuthProviders
export enum EAuthProviders {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}
