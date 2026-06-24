import React, { FC } from 'react'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './ProfileActions.styles'

type Props = {
  isShowYearResult: boolean
  onShowYearResult: () => void
  onLogout: () => void
  onDeleteAccount: () => void
}

const ProfileActions: FC<Props> = ({
  isShowYearResult,
  onShowYearResult,
  onLogout,
  onDeleteAccount,
}) => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <>
      {isShowYearResult && (
        <Button
          classes={{ btn: styles.repeatBtn, textBtn: styles.repeatText }}
          onPress={onShowYearResult}
        >
          {t('profileScreen.show_year_result', {
            date: currentYear,
          })}
        </Button>
      )}

      <Button
        classes={{ btn: styles.logout, textBtn: styles.dangerText }}
        onPress={onLogout}
      >
        {t('profileScreen.logout')}
      </Button>

      <Button
        classes={{ btn: styles.delete, textBtn: styles.deleteText }}
        onPress={onDeleteAccount}
        type="BORDER-TRANSPARENT"
      >
        {t('profileScreen.delete_account')}
      </Button>
    </>
  )
}

export default ProfileActions
