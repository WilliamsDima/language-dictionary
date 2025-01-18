import { SelectOption } from '../UI/Select/Select'

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
      flag: 'http://195.201.60.76:8180/storage/166/XMLID_5751_.png',
    },
  },
  {
    id: 2,
    full_name: 'English',
    short_name: 'en',
    country: {
      id: 2,
      title: 'England (United Kingdom)',
      flag: 'http://195.201.60.76:8180/storage/170/Великобритания.png',
    },
  },
  {
    id: 3,
    full_name: 'Български',
    short_name: 'bg',
    country: {
      id: 7,
      title: 'Bulgaria',
      flag: 'http://195.201.60.76:8180/storage/167/Болгария.png',
    },
  },
  {
    id: 15,
    full_name: 'Français',
    short_name: 'fr',
    country: {
      id: 15,
      title: 'Français',
      flag: 'http://195.201.60.76:8180/storage/180/Франция.png',
    },
  },
  {
    id: 4,
    full_name: 'Čeština',
    short_name: 'cs',
    country: {
      id: 11,
      title: 'Czechia',
      flag: 'http://195.201.60.76:8180/storage/176/cz-Чехия.png',
    },
  },
  {
    id: 7,
    full_name: 'Eesti keel',
    short_name: 'et',
    country: {
      id: 17,
      title: ' Estonia',
      flag: 'http://195.201.60.76:8180/storage/182/Эстония.png',
    },
  },
  {
    id: 8,
    full_name: 'Filipino (Tagalog)',
    short_name: 'fil',
    country: {
      id: 19,
      title: ' Philippines',
      flag: 'http://195.201.60.76:8180/storage/184/филиппины.png',
    },
  },
  {
    id: 9,
    full_name: 'Hrvatski',
    short_name: 'hr',
    country: {
      id: 9,
      title: ' Croatia',
      flag: 'http://195.201.60.76:8180/storage/174/Хорватия.png',
    },
  },
  {
    id: 10,
    full_name: 'Nederlands',
    short_name: 'nl',
    country: {
      id: 15,
      title: 'Netherlands',
      flag: 'http://195.201.60.76:8180/storage/180/Нидерланды.png',
    },
  },
  {
    id: 11,
    full_name: '中文 (zhōngwén)',
    short_name: 'zh',
    country: {
      id: 8,
      title: 'China',
      flag: 'http://195.201.60.76:8180/storage/173/Китай.png',
    },
  },
  {
    id: 12,
    full_name: 'Deutsch',
    short_name: 'de',
    country: {
      id: 4,
      title: 'Germany',
      flag: 'http://195.201.60.76:8180/storage/171/Германия.png',
    },
  },
  {
    id: 13,
    full_name: 'Ελληνικά (elliniká)',
    short_name: 'el',
    country: {
      id: 18,
      title: 'Greece',
      flag: 'http://195.201.60.76:8180/storage/183/Греция.png',
    },
  },
  {
    id: 27,
    full_name: 'Italiano',
    short_name: 'it',
    country: {
      id: 24,
      title: 'Italy',
      flag: 'http://195.201.60.76:8180/storage/189/Италия.png',
    },
  },
  {
    id: 5,
    full_name: 'Dansk',
    short_name: 'da',
    country: {
      id: 13,
      title: 'Denmark',
      flag: 'http://195.201.60.76:8180/storage/178/dk-Дания.png',
    },
  },
  {
    id: 14,
    full_name: 'Suomi',
    short_name: 'fi',
    country: {
      id: 20,
      title: 'Finland',
      flag: 'http://195.201.60.76:8180/storage/185/Финляндия.png',
    },
  },
  {
    id: 19,
    full_name: 'Magyar',
    short_name: 'hu',
    country: {
      id: 16,
      title: 'Hungary',
      flag: 'http://195.201.60.76:8180/storage/181/Венгрия.png',
    },
  },
  {
    id: 20,
    full_name: 'Íslenska',
    short_name: 'is',
    country: {
      id: 23,
      title: 'Iceland',
      flag: 'http://195.201.60.76:8180/storage/188/Исландия.png',
    },
  },
  {
    id: 21,
    full_name: 'Bahasa Indonesia',
    short_name: 'id',
    country: {
      id: 10,
      title: 'Indonesia',
      flag: 'http://195.201.60.76:8180/storage/175/Индонезия.png',
    },
  },
  {
    id: 31,
    full_name: 'Lietuvių kalba',
    short_name: 'lt',
    country: {
      id: 21,
      title: ' Latvia',
      flag: 'http://195.201.60.76:8180/storage/193/Латвия.png',
    },
  },
  {
    id: 17,
    full_name: 'עברית‎ (ivrit)',
    short_name: 'he',
    country: {
      id: 12,
      title: 'Iisrael',
      flag: 'http://195.201.60.76:8180/storage/177/Израиль.png',
    },
  },
  {
    id: 30,
    full_name: '한국어 (Hangugeo)',
    short_name: 'ko',
    country: {
      id: 14,
      title: 'Korea',
      flag: 'http://195.201.60.76:8180/storage/179/Южная-Корея.png',
    },
  },
  {
    id: 18,
    full_name: 'िन्दी (Hindī)',
    short_name: 'hi',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 24,
    full_name: 'नेपाली (Nepālī)',
    short_name: 'ne',
    country: {
      id: 31,
      title: 'Nepal',
      flag: 'http://195.201.60.76:8180/storage/191/Непал.png',
    },
  },
  {
    id: 34,
    full_name: 'Polski',
    short_name: 'pl',
    country: {
      id: 28,
      title: 'Poland',
      flag: 'http://195.201.60.76:8180/storage/192/Польша.png',
    },
  },
  {
    id: 37,
    full_name: 'Latviešu valoda',
    short_name: 'lv',
    country: {
      id: 21,
      title: ' Latvia',
      flag: 'http://195.201.60.76:8180/storage/193/Латвия.png',
    },
  },
  {
    id: 28,
    full_name: '日本語 (Nihongo)',
    short_name: 'ja',
    country: {
      id: 30,
      title: ' Japan',
      flag: 'http://195.201.60.76:8180/storage/194/Япония.png',
    },
  },
  {
    id: 6,
    full_name: 'Español',
    short_name: 'es',
    country: {
      id: 26,
      title: ' Spain',
      flag: 'http://195.201.60.76:8180/storage/195/Испания.png',
    },
  },
  {
    id: 33,
    full_name: 'Norsk (bokmål)',
    short_name: 'nb',
    country: {
      id: 32,
      title: 'Norway',
      flag: 'http://195.201.60.76:8180/storage/196/Норвенгия.png',
    },
  },
  {
    id: 39,
    full_name: 'Sweden',
    short_name: 'sv',
    country: {
      id: 27,
      title: 'Sweden',
      flag: 'http://195.201.60.76:8180/storage/199/Швеция.png',
    },
  },
  {
    id: 26,
    full_name: 'اردو‎ (Urdu)',
    short_name: 'ur',
    country: {
      id: 10,
      title: ' Indonesia',
      flag: 'http://195.201.60.76:8180/storage/175/Индонезия.png',
    },
  },
  {
    id: 38,
    full_name: 'தமிழ் (Tamiḻ)',
    short_name: 'ta',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 16,
    full_name: 'ગુજરાતી (Gujarātī)',
    short_name: 'gu',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 22,
    full_name: 'ಕನ್ನಡ (kannaḍa)',
    short_name: 'kn',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 23,
    full_name: 'मराठी (Marāṭhī)',
    short_name: 'mr',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 25,
    full_name: 'తెలుగు (Telugu)',
    short_name: 'te',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 29,
    full_name: 'Jawa',
    short_name: 'jv',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 32,
    full_name: 'Bahasa Melayu',
    short_name: 'ms',
    country: {
      id: 3,
      title: 'India',
      flag: 'http://195.201.60.76:8180/storage/163/india_18180.png',
    },
  },
  {
    id: 35,
    full_name: 'Português',
    short_name: 'pt',
    country: {
      id: 33,
      title: 'Portugal',
      flag: 'http://195.201.60.76:8180/storage/201/Португалия.png',
    },
  },
  {
    id: 36,
    full_name: 'Română',
    short_name: 'ro',
    country: {
      id: 34,
      title: 'Romania',
      flag: 'http://195.201.60.76:8180/storage/202/Румыния.png',
    },
  },
]

export const languagesOptions: SelectOption[] = languages.map((it) => {
  return {
    label: it.country.title + ' ' + it.full_name,
    value: it.id,
    iconUrl: it.country.flag,
  }
})
