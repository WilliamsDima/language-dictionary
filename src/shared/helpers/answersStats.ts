// ответы по карточкам за сессию повторения: true — «Помню» / верно,
// false — «Не помню» / ошибка. Общие для задания дня и режимов практики
export type AnswersByCard = Record<number, boolean>

export type AnswersStats = {
  known: number
  unknown: number
}

export const getAnswersStats = (answers: AnswersByCard): AnswersStats =>
  Object.values(answers).reduce<AnswersStats>(
    (acc, correct) =>
      correct
        ? { ...acc, known: acc.known + 1 }
        : { ...acc, unknown: acc.unknown + 1 },
    { known: 0, unknown: 0 }
  )

// доля верных ответов в процентах, округлённая до целого (0, если ответов нет)
export const getSuccessPercent = ({ known, unknown }: AnswersStats): number => {
  const total = known + unknown

  return total ? Math.round((known / total) * 100) : 0
}
