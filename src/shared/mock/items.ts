import { IItem } from '@/entities/Item/model/item'
import { languages } from '@/shared/json/languages'

const english = languages.find((it) => it.short_name === 'en') || languages[0]
const german = languages.find((it) => it.short_name === 'de') || languages[0]
const french = languages.find((it) => it.short_name === 'fr') || languages[0]
const spanish = languages.find((it) => it.short_name === 'es') || languages[0]

const day = 24 * 60 * 60 * 1000
const now = Date.now()

export const mockItemsSeed: IItem[] = [
  {
    id: now - day * 1,
    idDoc: 'mock-1',
    date: new Date(now - day * 1),
    description: 'Полезные слова для короткого разговора в поездке.',
    language: english,
    status: 'STUDY',
    items: [
      { id: 1, word: 'boarding pass', translate: 'посадочный талон' },
      { id: 2, word: 'window seat', translate: 'место у окна' },
    ],
  },
  {
    id: now - day * 2,
    idDoc: 'mock-2',
    date: new Date(now - day * 2),
    description: 'Набор для кофейни и повседневных заказов.',
    language: english,
    status: 'READY',
    items: [
      { id: 1, word: 'oat milk', translate: 'овсяное молоко' },
      { id: 2, word: 'receipt', translate: 'чек' },
    ],
  },
  {
    id: now - day * 3,
    idDoc: 'mock-3',
    date: new Date(now - day * 3),
    description: 'Фразы, которые часто нужны на созвонах.',
    language: german,
    status: 'STUDY',
    items: [
      { id: 1, word: 'verschieben', translate: 'переносить' },
      { id: 2, word: 'Ruckmeldung', translate: 'обратная связь' },
    ],
  },
  {
    id: now - day * 4,
    idDoc: 'mock-4',
    date: new Date(now - day * 4),
    description: 'Слова для знакомства и small talk.',
    language: french,
    status: 'READY',
    items: [
      { id: 1, word: 'ravie', translate: 'рада знакомству' },
      { id: 2, word: 'quartier', translate: 'район' },
    ],
  },
  {
    id: now - day * 5,
    idDoc: 'mock-5',
    date: new Date(now - day * 5),
    description: 'Мини-набор про продуктивность.',
    language: english,
    status: 'STUDY',
    items: [
      { id: 1, word: 'deadline', translate: 'дедлайн' },
      { id: 2, word: 'follow-up', translate: 'уточнение' },
    ],
  },
  {
    id: now - day * 6,
    idDoc: 'mock-6',
    date: new Date(now - day * 6),
    description: 'Фразы, чтобы ориентироваться в городе.',
    language: spanish,
    status: 'READY',
    items: [
      { id: 1, word: 'girar', translate: 'поворачивать' },
      { id: 2, word: 'semáforo', translate: 'светофор' },
    ],
  },
  {
    id: now - day * 7,
    idDoc: 'mock-7',
    date: new Date(now - day * 7),
    description: 'Карточки про покупки и возвраты.',
    language: german,
    status: 'STUDY',
    items: [
      { id: 1, word: 'umtauschen', translate: 'обменять' },
      { id: 2, word: 'Größe', translate: 'размер' },
    ],
  },
  {
    id: now - day * 8,
    idDoc: 'mock-8',
    date: new Date(now - day * 8),
    description: 'Легкий набор для выходного дня.',
    language: french,
    status: 'READY',
    items: [
      { id: 1, word: 'balade', translate: 'прогулка' },
      { id: 2, word: 'soleil', translate: 'солнце' },
    ],
  },
  {
    id: now - day * 9,
    idDoc: 'mock-9',
    date: new Date(now - day * 9),
    description: 'Слова для обсуждения планов.',
    language: spanish,
    status: 'STUDY',
    items: [
      { id: 1, word: 'mañana', translate: 'завтра' },
      { id: 2, word: 'quizá', translate: 'возможно' },
    ],
  },
  {
    id: now - day * 10,
    idDoc: 'mock-10',
    date: new Date(now - day * 10),
    description: 'Немного слов про здоровье и самочувствие.',
    language: english,
    status: 'READY',
    items: [
      { id: 1, word: 'dizzy', translate: 'головокружение' },
      { id: 2, word: 'appointment', translate: 'запись на прием' },
    ],
  },
  {
    id: now - day * 11,
    idDoc: 'mock-11',
    date: new Date(now - day * 11),
    description: 'Слова для музея и городской прогулки.',
    language: french,
    status: 'STUDY',
    items: [
      { id: 1, word: 'billet', translate: 'билет' },
      { id: 2, word: 'exposition', translate: 'выставка' },
    ],
  },
  {
    id: now - day * 12,
    idDoc: 'mock-12',
    date: new Date(now - day * 12),
    description: 'Повседневные слова для дома.',
    language: german,
    status: 'READY',
    items: [
      { id: 1, word: 'Wäsche', translate: 'белье' },
      { id: 2, word: 'Staubsauger', translate: 'пылесос' },
    ],
  },
]
