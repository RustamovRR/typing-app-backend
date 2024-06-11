import { ERROR_TYPES } from 'src/types'

export const ERROR_TRANSLATIONS: Record<'en' | 'uz', Record<keyof typeof ERROR_TYPES, string>> = {
  en: {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_ALREADY_EXISTS: 'This user already exists',
    REGISTRATION_PROBLEM: 'There was a problem with your registration',
    LOGIN_PROBLEM: 'There was a problem with your login',
    OAUTH_LOGIN_FAILURE: 'There was a problem with your social login',
  },
  uz: {
    USER_NOT_FOUND: 'Foydalanuvchi topilmadi',
    INVALID_CREDENTIALS: "Noto'g'ri ma'lumotlar",
    USER_ALREADY_EXISTS: 'Ushbu foydalanuvchi allaqachon mavjud',
    REGISTRATION_PROBLEM: "Ro'yxatdan o'tishda muammo yuz berdi",
    LOGIN_PROBLEM: 'Kirishda muammo yuz berdi',
    OAUTH_LOGIN_FAILURE: 'Ijtimoiy tarmoq orqali kirishda muammo yuz berdi',
  },
}
