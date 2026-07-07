// локальная дата в формате YYYY-MM-DD — единственный источник даты для всех
// запросов серии (streak). Намеренно не toISOString(): он всегда в UTC и на
// границе суток даёт "вчера"/"завтра" для пользователей не в UTC+0
export const getLocalDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
