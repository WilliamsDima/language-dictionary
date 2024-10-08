import React, { FC, memo } from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import { styles } from './MainItem.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '../../model/item'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import TranslateIcon from '@/assets/icons/UI/translate-primery-64.svg'
import DotsVerticalIcon from '@/assets/icons/UI/dots-vertical-white-64.svg'
import { useExpandAnim } from '@/shared/hooks/useExpandAnim'
import { COLORS } from '@/assets/styles/colors'
import WordItems from '../WordItems/WordItems'
import { useUpdateItemMutation } from '@/pages/SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'

type Props = {
  item: IItem
}

const MainItem: FC<Props> = ({ item }) => {
  const { setModalDeleteItem } = useActions()
  const { user } = useAppSelector((store) => store.user)
  const { modalDeleteItem } = useAppSelector((store) => store.items)

  const { hidden: hiddenFooter, toggle: toggleFooter } = useExpandAnim()
  const { hidden: hiddenTranslate, toggle: toggleTranslate } = useExpandAnim()

  const [updateItem, { isLoading: isLoadingUpdate }] = useUpdateItemMutation()

  const updateStatus = () => {
    if (user && item.idDoc) {
      if (item.status === 'READY') {
        updateItem({
          uid: user.uid,
          idDoc: item.idDoc,
          updatedData: { ...item, status: 'STUDY' },
        })
      } else {
        updateItem({
          uid: user.uid,
          idDoc: item.idDoc,
          updatedData: { ...item, status: 'READY' },
        })
      }
    }
  }

  const deleteItemHandler = () => {
    setModalDeleteItem(item)
  }

  return (
    <View
      style={[
        styles.item,
        item.id === modalDeleteItem?.id && styles.itemDeleteActive,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                item.status === 'READY' ? COLORS.item_ready : COLORS.item_study,
            },
          ]}
        />
        {!!item.language.country && (
          <View style={styles.flagWrapper}>
            <Image
              source={{ uri: item.language.country.flag }}
              style={styles.flag}
            />
          </View>
        )}

        {item.date && (
          <Text style={styles.date}>
            {new Date(item.id).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <WordItems translateActive={!hiddenTranslate} item={item} />

        <TouchableOpacity style={styles.btnTranslate} onPress={toggleTranslate}>
          <TranslateIcon width={25} height={25} />
        </TouchableOpacity>
      </View>

      {!!item.description && !hiddenTranslate && (
        <View style={styles.descriptionBlock}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.showFooterBtn} onPress={toggleFooter}>
        <DotsVerticalIcon width={10} height={10} />
      </TouchableOpacity>

      {!hiddenFooter && (
        <View style={styles.footer}>
          <TouchableOpacity>
            <EditIcon width={25} height={25} />
          </TouchableOpacity>

          {isLoadingUpdate ? (
            <ActivityIndicator
              size={'small'}
              color={
                item.status === 'READY' ? COLORS.item_ready : COLORS.item_study
              }
            />
          ) : (
            <TouchableOpacity onPress={updateStatus}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      item.status === 'READY'
                        ? COLORS.item_ready
                        : COLORS.item_study,
                  },
                ]}
              >
                {item.status === 'READY' ? 'учить' : 'изучено'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={deleteItemHandler}>
            <DeleteIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default memo(MainItem)