import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './SaveData.styles'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import * as RNFS from '@dr.pogodin/react-native-fs'
import RNShare from 'react-native-share'
import { useActions } from '@/shared/hooks/useActions'
import { useAllItems } from '@/shared/hooks/useAllItems'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { toast } from '@/shared/UI/Toast/toast'
import { copyToClipboard } from '@/shared/helpers/copyToClipboard'
import { useTranslation } from '@/shared/i18n/types'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { Icon } from '@/assets/icons/Icon'
import { useUnistyles } from 'react-native-unistyles'
import { cardsService } from '@/pages/MainScreen/api/CardsService'

// формат файла экспорта — его же принимает импорт карточек в админке,
// items — карточки ровно в том виде, в каком их вернул GET /cards?all=true
const EXPORT_FORMAT_VERSION = 1

const SaveData: FC = () => {
  const { t } = useTranslation()
  const { setLastSaveData } = useActions()
  const { theme } = useUnistyles()

  const { lastSaveData } = useAppSelector((store) => store.items)

  const [isExporting, setIsExporting] = useState(false)

  const { allItems } = useAllItems()

  const dateSaveText = useMemo(() => {
    if (lastSaveData) {
      const formattedDate = dateFormat({ date: lastSaveData, type: 'FULL' })

      if (!formattedDate) {
        return ''
      }

      return `${formattedDate} ${new Date(lastSaveData).toLocaleTimeString()}`
    }
    return ''
  }, [lastSaveData])

  const buttonClasses = useMemo(() => ({ btn: styles.btn }), [])

  const hasItems = useMemo(() => !!allItems?.length, [allItems])

  // файл пишется во временный кэш приложения и сразу отдаётся в системное
  // «Поделиться» — пользователь сам выбирает, куда его сохранить/отправить
  // (Файлы, Диск, Telegram, почта...). Прямая запись в Download на Android
  // 10+ (scoped storage) ненадёжна и файл там не виден другим приложениям
  const toSave = useCallback(async () => {
    if (isExporting) return

    setIsExporting(true)

    try {
      const result = await cardsService.list({ all: true })

      if (!result.ok) {
        toast.error(t('settingsScreen.save_json_load_error'))
        console.log('save json load Error', result.error)
        return
      }

      const exportedAt = new Date().toISOString()
      const jsonString = JSON.stringify(
        {
          version: EXPORT_FORMAT_VERSION,
          exported_at: exportedAt,
          items: result.data.items ?? [],
        },
        null,
        2
      )

      const fileName = `word-cards-${exportedAt.replace(/[:.]/g, '-')}.json`
      const path = `${RNFS.CachesDirectoryPath}/${fileName}`

      try {
        await RNFS.writeFile(path, jsonString, 'utf8')

        const shareResult = await RNShare.open({
          url: `file://${path}`,
          type: 'application/json',
          filename: fileName,
          failOnCancel: false,
        })

        if (shareResult.success) {
          const dateSave = new Date()

          setLastSaveData(dateSave)
          setAsyncLocal(LOCAL_KEYS.saveDate, dateSave)
        }
      } catch (error) {
        toast.error(t('settingsScreen.save_json_error'))
        copyToClipboard(jsonString)
        console.log('save json Error', error)
      }
    } finally {
      setIsExporting(false)
    }
  }, [isExporting, t, setLastSaveData])

  return hasItems ? (
    <View style={styles.container}>
      <Button
        isText={false}
        classes={buttonClasses}
        onPress={toSave}
        disabled={isExporting}
      >
        <Text style={styles.btnText}>{t('settingsScreen.save_json')}</Text>
        <Icon
          kind="svg"
          name="download"
          color={theme.colors.palette.primery}
          width={25}
          height={25}
        />
      </Button>

      {dateSaveText ? (
        <Text style={styles.saveData}>{dateSaveText}</Text>
      ) : (
        <></>
      )}
    </View>
  ) : (
    <></>
  )
}

export default SaveData
