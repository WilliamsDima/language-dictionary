import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { vibrateOnWrongAnswer } from '@/shared/helpers/gameVibration'
import { useTranslation } from '@/shared/i18n/types'
import SoundIcon from '@/assets/icons/UI/sound-primery-64.svg'
import type { PracticeQuestionProps } from '../../model/types'
import { getCardWordText } from '../../model/cardTexts'
import {
  buildListeningOptions,
  getListeningOptionState,
  isListeningAnswerCorrect,
} from './model/listening'
import { useWordSpeech } from './hooks/useWordSpeech'
import ListeningOption from './UI/ListeningOption/ListeningOption'
import { styles } from './Listening.styles'

const SOUND_ICON_SIZE = 44
const WORD_MAX_LINES = 3

// режим «Прослушай и выбери»: слово озвучивается и не показывается до ответа,
// пользователь выбирает один из 4 переводов. После ответа подсвечиваются
// верный и выбранный варианты, открывается слово, «Дальше» — следующий вопрос
const Listening: FC<PracticeQuestionProps> = ({ card, pool, onAnswer }) => {
  // варианты фиксируются при монтировании: обновление карточек из кэша не
  // должно их менять и перемешивать
  const [options] = useState(() => buildListeningOptions(card, pool))
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const { t } = useTranslation()

  const wordText = useMemo(() => getCardWordText(card), [card])

  const { speak, hintKey } = useWordSpeech(wordText, card.language)

  const isAnswered = useMemo(() => selectedKey !== null, [selectedKey])

  const isWrongAnswer = useMemo(
    () => isAnswered && !isListeningAnswerCorrect(options, selectedKey),
    [isAnswered, options, selectedKey]
  )

  const optionViews = useMemo(
    () =>
      options.map((it) => ({
        ...it,
        state: getListeningOptionState(it, selectedKey),
      })),
    [options, selectedKey]
  )

  const speechHint = useMemo(() => (hintKey ? t(hintKey) : ''), [hintKey, t])

  const btnClasses = useMemo(() => ({ textBtn: styles.btnText }), [])

  // первый выбор окончательный, даже если второй тап успел до перерисовки
  const onSelectOption = useCallback((key: string) => {
    setSelectedKey((prev) => prev ?? key)
  }, [])

  const onNext = useCallback(() => {
    onAnswer(isListeningAnswerCorrect(options, selectedKey))
  }, [onAnswer, options, selectedKey])

  // выбор окончательный, поэтому на вопрос срабатывает не больше одного раза
  useEffect(() => {
    if (isWrongAnswer) {
      vibrateOnWrongAnswer()
    }
  }, [isWrongAnswer])

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Button
          isText={false}
          style={styles.soundBtn}
          accessibilityLabel={t('practiceSession.listening.replay')}
          onPress={speak}
        >
          <SoundIcon width={SOUND_ICON_SIZE} height={SOUND_ICON_SIZE} />
        </Button>

        {isAnswered ? (
          <Text
            style={styles.word}
            numberOfLines={WORD_MAX_LINES}
            adjustsFontSizeToFit
          >
            {wordText}
          </Text>
        ) : (
          <Text style={styles.prompt}>
            {t('practiceSession.listening.prompt')}
          </Text>
        )}

        {speechHint ? (
          <Text style={styles.speechHint}>{speechHint}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.options}>
        {optionViews.map((it) => (
          <ListeningOption
            key={it.key}
            optionKey={it.key}
            text={it.text}
            state={it.state}
            disabled={isAnswered}
            onPress={onSelectOption}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          style={styles.btn}
          classes={btnClasses}
          disabled={!isAnswered}
          onPress={onNext}
        >
          {t('practiceSession.next')}
        </Button>
      </View>
    </View>
  )
}

export default memo(Listening)
