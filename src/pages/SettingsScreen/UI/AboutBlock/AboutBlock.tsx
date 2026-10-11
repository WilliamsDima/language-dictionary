import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './AboutBlock.styles'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import type { AppConfigAboutBlock } from '@/shared/API/services/appConfig/types'
import AboutBlockItem from './UI/AboutBlockItem/AboutBlockItem'

// фолбэк, если app config не пришёл или в нём нет about.blocks — те же
// ключи перевода, что раньше были зашиты прямо в разметке
const DEFAULT_ABOUT_BLOCKS: AppConfigAboutBlock[] = [
  {
    id: 1,
    blockName: 'settingsScreen.about.1.blockName',
  },
  {
    id: 2,
    blockName: 'settingsScreen.about.2.blockName',
    text: 'settingsScreen.about.2.text',
  },
  {
    id: 3,
    blockName: 'settingsScreen.about.3.blockName',
    punkts: [
      'settingsScreen.about.3.punkts.1',
      'settingsScreen.about.3.punkts.2',
    ],
  },
  {
    id: 4,
    text: 'settingsScreen.about.4.text',
  },
]

const AboutBlock: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)

  const { data: appConfig } = useGetAppConfigQuery()

  // блоки рендерятся в том порядке и количестве, в каком пришли из конфига
  const blocks = useMemo(() => {
    const fromConfig = appConfig?.about?.blocks

    return Array.isArray(fromConfig) && fromConfig.length
      ? fromConfig
      : DEFAULT_ABOUT_BLOCKS
  }, [appConfig])

  const appName = useMemo(
    () => appConfig?.appName || aplication?.appName || '',
    [appConfig, aplication]
  )

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => {
        return (
          <AboutBlockItem
            key={`${index}-${block.id}`}
            blockName={block.blockName}
            text={block.text}
            punkts={block.punkts}
            appName={appName}
          />
        )
      })}
    </View>
  )
}

export default AboutBlock
