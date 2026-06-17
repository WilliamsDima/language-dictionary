import React, { FC, useMemo, useCallback, ReactNode, memo } from 'react'
import {
  ViewStyle,
  ViewProps,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { styles } from './Header.styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigateStack } from '@/app/Navigation/types/paramsTypes'
import { RoutesNames, RoutesTitle } from '@/app/Navigation/RoutesNames'
import { useRoutesTitle } from '@/shared/hooks/useRoutesTitle'
/**
 * UI Header
 *
 * @format
 */

export interface HeaderProps extends ViewProps {
  classes?: {
    header?: ViewStyle | ViewStyle[]
    backBtn?: ViewStyle
  }
  backBtn?: boolean
  showTitle?: boolean
  headerRightContent?: ReactNode
  onBack?: () => void
}

const Header: FC<HeaderProps> = (props) => {
  const { goBack } = useNavigation<NavigateStack>()
  const { name } = useRoute()
  const {
    classes,
    style,
    showTitle,
    backBtn,
    headerRightContent,
    onBack,
    ...rest
  } = props

  const backHandler = useCallback(() => {
    goBack()
    onBack && onBack()
  }, [])

  const titleRoute = useRoutesTitle(name as RoutesTitle)

  styles.useVariants({
    titleSize: name === RoutesNames.main ? 'main' : 'secondary',
  })

  const overStyleHeader = useMemo(() => {
    return [styles.header, classes?.header, style]
  }, [classes?.header])

  const overStyleBackBtn = useMemo(() => {
    return StyleSheet.flatten([styles.backBtn, classes?.backBtn])
  }, [classes?.backBtn])

  return (
    <View style={overStyleHeader} {...rest}>
      {backBtn && (
        <TouchableOpacity onPress={backHandler} style={overStyleBackBtn}>
          <Text>ArrowBackIcon</Text>
        </TouchableOpacity>
      )}

      {!!showTitle && <Text style={styles.title}>{titleRoute}</Text>}

      {headerRightContent}
    </View>
  )
}

export default memo(Header)
