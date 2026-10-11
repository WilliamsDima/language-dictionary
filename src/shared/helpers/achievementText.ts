import type { I18NKeys, I18t } from '@/shared/i18n/types'

// title/description достижения приходят с бэкенда ключами перевода
// (например achievements.collector.title), тексты лежат в блоке
// "achievements" JSON переводов языка. Если ключа нет (старые данные с
// готовым текстом) — показываем строку как есть: defaultValue + отключённый
// nsSeparator, чтобы двоеточие в обычном тексте ("Серия дней: неделя") не
// трактовалось i18next как разделитель namespace
export const translateAchievementTitle = (t: I18t, title: string): string =>
  title
    ? t(title as I18NKeys, { defaultValue: title, nsSeparator: false })
    : ''

// {{count}} в тексте = threshold достижения; форма множественного числа
// выбирается i18next по суффиксам _one/_few/_many/_other (нужен
// Intl.PluralRules — см. полифил в src/shared/i18n/index.ts)
export const translateAchievementDescription = (
  t: I18t,
  description: string,
  threshold: number
): string =>
  description
    ? t(description as I18NKeys, {
        defaultValue: description,
        nsSeparator: false,
        count: threshold,
      })
    : ''
