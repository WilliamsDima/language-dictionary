import React, { FC, useMemo } from 'react'
import { Animated, FlatList, View } from 'react-native'
import SlideItem from '../SlideItem/SlideItem'
import { styles } from './Slides.styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCardsContext } from '../../CardsContext'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import RepeatIcon from '@/assets/icons/UI/repeat-64-orange.svg'

type Props = {}

const Slides: FC<Props> = ({}) => {
  const {
    data,
    flatList,
    scrollX,
    currentSlideData,
    onEnd,
    updateCurrentSlideIndex,
  } = useCardsContext()

  const currentStatusSlide = useMemo(() => {
    return currentSlideData?.item.status
  }, [currentSlideData])

  return (
    <View style={styles.container}>
      <View style={styles.slidesWrapper}>
        <View style={styles.header}>
          <Text>1/10</Text>
        </View>

        <GestureHandlerRootView>
          <FlatList
            onMomentumScrollEnd={updateCurrentSlideIndex}
            ref={flatList}
            data={data}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item, index }) => (
              <SlideItem index={index} item={item} />
            )}
            horizontal
            pagingEnabled
            contentContainerStyle={styles.contentContainerStyle}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </GestureHandlerRootView>

        <View style={styles.footer}>
          <View style={styles.btns}>
            {/* учить или на повторение сделать ввиде иконки */}
            <Button isText={false} style={styles.btnGroup}>
              {currentStatusSlide === 'STUDY' ? (
                <DoneIcon width={24} height={24} />
              ) : (
                <RepeatIcon width={24} height={24} />
              )}
            </Button>

            <Button isText={false} style={styles.btnGroup}>
              <EditIcon width={24} height={24} />
            </Button>
          </View>

          <Button
            onPress={onEnd}
            style={styles.btn}
            classes={{ textBtn: styles.textBtn }}
          >
            завершить
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Slides
