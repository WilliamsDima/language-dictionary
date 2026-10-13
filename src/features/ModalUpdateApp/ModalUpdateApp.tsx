import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { BackHandler, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { styles } from './ModalUpdateApp.styles'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Button from '@/shared/UI/Button/Button'
import Text from '@/shared/UI/Text/Text'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import { useTranslation } from '@/shared/i18n/types'
import { useGetLatestReleaseQuery } from '@/shared/API/services/appRelease/AppReleaseQuery'
import {
  getReleaseNotesItems,
  getUpdateKind,
  isReleaseSkipped,
} from '@/shared/API/services/appRelease/helpers'
import ReleaseNotes from './UI/ReleaseNotes/ReleaseNotes'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { APP_DOWNLOAD_PAGE_URL } from '@/shared/constants/app'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'

const CANCEL_BTN_STYLE = [styles.btn, styles.btnCancel]
const CANCEL_BTN_CLASSES = { textBtn: styles.textBtnCancel }
const CONFIRM_BTN_CLASSES = { textBtn: styles.textBtnConfirm }

// обязательное обновление: «назад» на Android не закрывает модалку и не
// уводит навигацию под ней
const blockHardwareBack = () => true

// глобальная модалка обновления. При старте приложения сравнивает
// установленную версию (versionName сборки) с опубликованной в latest.json
// (см. getUpdateKind): вырос MAJOR — модалку закрыть нельзя, только
// «Обновить»; выросли MINOR/PATCH — можно «Позже», и тогда эта версия
// запоминается и больше не предлагается, пока не выйдет следующая.
// Нет сети / битый latest.json — query отдаёт null, модалка молчит.
// Индикатор «доступна новая версия» в настройках — VersionBlock
const ModalUpdateApp: FC = () => {
  const { setShowUpdateModal } = useActions()
  const { showUpdateModal, isWatchSplash } = useAppSelector(
    (store) => store.app
  )

  const { data: latestRelease } = useGetLatestReleaseQuery()

  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const { t, i18n } = useTranslation()
  const wasVisibleRef = useRef(false)

  const installedVersion = useMemo(() => DeviceInfo.getVersion(), [])

  const latestVersion = useMemo(
    () => latestRelease?.versionName ?? '',
    [latestRelease]
  )

  const updateKind = useMemo(
    () => getUpdateKind(installedVersion, latestVersion),
    [installedVersion, latestVersion]
  )

  const isRequired = useMemo(() => updateKind === 'required', [updateKind])

  // не показываемся поверх сплэш-экрана при запуске
  const isVisible = useMemo(
    () => isWatchSplash && showUpdateModal,
    [isWatchSplash, showUpdateModal]
  )

  const title = useMemo(
    () =>
      isRequired
        ? t('modal.modalUpdateApp.required_title')
        : t('modal.modalUpdateApp.title'),
    [t, isRequired]
  )

  const subtitle = useMemo(
    () =>
      isRequired
        ? t('modal.modalUpdateApp.required_subtitle')
        : t('modal.modalUpdateApp.subtitle'),
    [t, isRequired]
  )

  const versionText = useMemo(
    () => t('modal.modalUpdateApp.version', { version: latestVersion }),
    [t, latestVersion]
  )

  // «Что нового» на языке интерфейса (нет — en, затем ru); пусто — блок
  // не показываем
  const notesItems = useMemo(
    () => getReleaseNotesItems(latestRelease?.notes, i18n.language),
    [latestRelease, i18n.language]
  )

  const hasNotes = useMemo(() => notesItems.length > 0, [notesItems])

  const skipUpdate = useCallback(() => {
    appStorage.setString(LOCAL_KEYS.skippedUpdateVersion, latestVersion)
    setShowUpdateModal(false)
  }, [latestVersion, setShowUpdateModal])

  // обязательная модалка остаётся на экране и после перехода к скачиванию —
  // приложением без обновления пользоваться нельзя. Необязательная просто
  // закрывается, без запоминания версии: не обновился — спросим при
  // следующем запуске
  const startUpdate = useCallback(() => {
    openInBrowser(APP_DOWNLOAD_PAGE_URL)

    if (!isRequired) {
      setShowUpdateModal(false)
    }
  }, [isRequired, setShowUpdateModal])

  // закрытие необязательной модалки свайпом / тапом по фону / крестиком
  // равносильно «Позже». Когда шторку закрываем сами (после «Обновить» или
  // «Позже»), showUpdateModal к этому моменту уже false
  const onDismiss = useCallback(() => {
    if (showUpdateModal && !isRequired) {
      skipUpdate()
    }
  }, [isRequired, showUpdateModal, skipUpdate])

  useEffect(() => {
    if (updateKind === 'none') return

    if (
      updateKind === 'optional' &&
      isReleaseSkipped(
        latestVersion,
        appStorage.getString(LOCAL_KEYS.skippedUpdateVersion)
      )
    ) {
      return
    }

    setShowUpdateModal(true)
  }, [latestVersion, setShowUpdateModal, updateKind])

  useEffect(() => {
    if (isVisible && !wasVisibleRef.current) {
      presentSheet()
    }

    if (!isVisible && wasVisibleRef.current) {
      dismissSheet()
    }

    wasVisibleRef.current = isVisible
  }, [dismissSheet, presentSheet, isVisible])

  useEffect(() => {
    if (!isVisible || !isRequired) return

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      blockHardwareBack
    )

    return () => subscription.remove()
  }, [isRequired, isVisible])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onDismiss}
      title={title}
      subtitle={subtitle}
      dismissible={!isRequired}
      variant="view"
      dynamicSizing
    >
      <Text style={styles.version}>{versionText}</Text>

      {hasNotes ? <ReleaseNotes items={notesItems} /> : <></>}

      <View style={styles.btns}>
        {isRequired ? (
          <></>
        ) : (
          <Button
            style={CANCEL_BTN_STYLE}
            classes={CANCEL_BTN_CLASSES}
            onPress={skipUpdate}
          >
            {t('modal.modalUpdateApp.later')}
          </Button>
        )}
        <Button
          onPress={startUpdate}
          style={styles.btn}
          classes={CONFIRM_BTN_CLASSES}
        >
          {t('settingsScreen.update')}
        </Button>
      </View>
    </BottomSheet>
  )
}

export default memo(ModalUpdateApp)
