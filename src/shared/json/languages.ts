import { SelectOption } from '../UI/types'

export interface ILanguage {
  id: number
  full_name: string
  short_name: string
  country: {
    id: number
    title: string
    flag: string
  }
}

export const languages: ILanguage[] = [
  {
    id: 1,
    full_name: 'Русский',
    short_name: 'ru',
    country: {
      id: 1,
      title: 'Russia',
      flag: '',
    },
  },
  {
    id: 2,
    full_name: 'English',
    short_name: 'en',
    country: {
      id: 2,
      title: 'England (United Kingdom)',
      flag: '',
    },
  },
  {
    id: 3,
    full_name: 'Български',
    short_name: 'bg',
    country: {
      id: 7,
      title: 'Bulgaria',
      flag: '',
    },
  },
  {
    id: 15,
    full_name: 'Français',
    short_name: 'fr',
    country: {
      id: 15,
      title: 'Français',
      flag: '',
    },
  },
  {
    id: 4,
    full_name: 'Čeština',
    short_name: 'cs',
    country: {
      id: 11,
      title: 'Czechia',
      flag: '',
    },
  },
  {
    id: 7,
    full_name: 'Eesti keel',
    short_name: 'et',
    country: {
      id: 17,
      title: ' Estonia',
      flag: '',
    },
  },
  {
    id: 8,
    full_name: 'Filipino (Tagalog)',
    short_name: 'fil',
    country: {
      id: 19,
      title: ' Philippines',
      flag: '',
    },
  },
  {
    id: 9,
    full_name: 'Hrvatski',
    short_name: 'hr',
    country: {
      id: 9,
      title: ' Croatia',
      flag: '',
    },
  },
  {
    id: 10,
    full_name: 'Nederlands',
    short_name: 'nl',
    country: {
      id: 15,
      title: 'Netherlands',
      flag: '',
    },
  },
  {
    id: 11,
    full_name: '中文 (zhōngwén)',
    short_name: 'zh',
    country: {
      id: 8,
      title: 'China',
      flag: '',
    },
  },
  {
    id: 12,
    full_name: 'Deutsch',
    short_name: 'de',
    country: {
      id: 4,
      title: 'Germany',
      flag: '',
    },
  },
  {
    id: 13,
    full_name: 'Ελληνικά (elliniká)',
    short_name: 'el',
    country: {
      id: 18,
      title: 'Greece',
      flag: '',
    },
  },
  {
    id: 27,
    full_name: 'Italiano',
    short_name: 'it',
    country: {
      id: 24,
      title: 'Italy',
      flag: '',
    },
  },
  {
    id: 5,
    full_name: 'Dansk',
    short_name: 'da',
    country: {
      id: 13,
      title: 'Denmark',
      flag: '',
    },
  },
  {
    id: 14,
    full_name: 'Suomi',
    short_name: 'fi',
    country: {
      id: 20,
      title: 'Finland',
      flag: '',
    },
  },
  {
    id: 19,
    full_name: 'Magyar',
    short_name: 'hu',
    country: {
      id: 16,
      title: 'Hungary',
      flag: '',
    },
  },
  {
    id: 20,
    full_name: 'Íslenska',
    short_name: 'is',
    country: {
      id: 23,
      title: 'Iceland',
      flag: '',
    },
  },
  {
    id: 21,
    full_name: 'Bahasa Indonesia',
    short_name: 'id',
    country: {
      id: 10,
      title: 'Indonesia',
      flag: '',
    },
  },
  {
    id: 31,
    full_name: 'Lietuvių kalba',
    short_name: 'lt',
    country: {
      id: 21,
      title: ' Latvia',
      flag: '',
    },
  },
  {
    id: 17,
    full_name: 'עברית‎ (ivrit)',
    short_name: 'he',
    country: {
      id: 12,
      title: 'Iisrael',
      flag: '',
    },
  },
  {
    id: 30,
    full_name: '한국어 (Hangugeo)',
    short_name: 'ko',
    country: {
      id: 14,
      title: 'Korea',
      flag: '',
    },
  },
  {
    id: 18,
    full_name: 'िन्दी (Hindī)',
    short_name: 'hi',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 24,
    full_name: 'नेपाली (Nepālī)',
    short_name: 'ne',
    country: {
      id: 31,
      title: 'Nepal',
      flag: '',
    },
  },
  {
    id: 34,
    full_name: 'Polski',
    short_name: 'pl',
    country: {
      id: 28,
      title: 'Poland',
      flag: '',
    },
  },
  {
    id: 37,
    full_name: 'Latviešu valoda',
    short_name: 'lv',
    country: {
      id: 21,
      title: ' Latvia',
      flag: '',
    },
  },
  {
    id: 28,
    full_name: '日本語 (Nihongo)',
    short_name: 'ja',
    country: {
      id: 30,
      title: ' Japan',
      flag: '',
    },
  },
  {
    id: 6,
    full_name: 'Español',
    short_name: 'es',
    country: {
      id: 26,
      title: ' Spain',
      flag: '',
    },
  },
  {
    id: 33,
    full_name: 'Norsk (bokmål)',
    short_name: 'nb',
    country: {
      id: 32,
      title: 'Norway',
      flag: '',
    },
  },
  {
    id: 39,
    full_name: 'Sweden',
    short_name: 'sv',
    country: {
      id: 27,
      title: 'Sweden',
      flag: '',
    },
  },
  {
    id: 26,
    full_name: 'اردو‎ (Urdu)',
    short_name: 'ur',
    country: {
      id: 10,
      title: ' Indonesia',
      flag: '',
    },
  },
  {
    id: 38,
    full_name: 'தமிழ் (Tamiḻ)',
    short_name: 'ta',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 16,
    full_name: 'ગુજરાતી (Gujarātī)',
    short_name: 'gu',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 22,
    full_name: 'ಕನ್ನಡ (kannaḍa)',
    short_name: 'kn',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 23,
    full_name: 'मराठी (Marāṭhī)',
    short_name: 'mr',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 25,
    full_name: 'తెలుగు (Telugu)',
    short_name: 'te',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 29,
    full_name: 'Jawa',
    short_name: 'jv',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 32,
    full_name: 'Bahasa Melayu',
    short_name: 'ms',
    country: {
      id: 3,
      title: 'India',
      flag: '',
    },
  },
  {
    id: 35,
    full_name: 'Português',
    short_name: 'pt',
    country: {
      id: 33,
      title: 'Portugal',
      flag: '',
    },
  },
  {
    id: 36,
    full_name: 'Română',
    short_name: 'ro',
    country: {
      id: 34,
      title: 'Romania',
      flag: '',
    },
  },
]

export const languagesOptions: SelectOption[] = languages.map((it) => {
  return {
    label: it.country.title + ' ' + it.full_name,
    value: it.short_name,
    iconUrl: it.country.flag,
  }
})
