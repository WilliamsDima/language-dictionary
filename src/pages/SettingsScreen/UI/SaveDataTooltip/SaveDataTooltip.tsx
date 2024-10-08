import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './SaveDataTooltip.styles'
import Text from '@/shared/UI/Text/Text'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import ErrorIcon from '@/assets/icons/UI/error-circle-red-64.svg'

type Props = {
  error?: boolean
  path?: string
}

const SaveDataTooltip: FC<Props> = ({ error, path }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tooltip}>
        {!error ? (
          <DoneIcon width={30} height={30} />
        ) : (
          <ErrorIcon width={30} height={30} />
        )}
        <Text style={styles.path}>{path}</Text>
      </View>
    </View>
  )
}

export default SaveDataTooltip
