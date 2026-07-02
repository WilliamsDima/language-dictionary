import React, { FC, memo, useEffect } from 'react'
import { Animated } from 'react-native'
import { styles } from './Tooltip.styles'
import { useTooltipAnim } from './useTooltipAnim'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'

type Props = {}

const Tooltip: FC<Props> = (props) => {
  const { setTooltip } = useActions()
  const { tooltip } = useAppSelector((store) => store.app)
  const { getAnimationStyles } = useTooltipAnim({ active: !!tooltip })

  useEffect(() => {
    const id = tooltip?.time
      ? setTimeout(() => {
          setTooltip(null)
        }, tooltip.time)
      : undefined

    return () => {
      id && clearTimeout(id)
    }
  }, [tooltip])

  return (
    <Animated.View style={[styles.wrapper, getAnimationStyles()]}>
      {tooltip?.children}
    </Animated.View>
  )
}

export default memo(Tooltip)
