import React, { FC, memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './MainItem.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '../../model/item'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetUserProfileQuery } from '@/pages/SettingsScreen/api/userServices'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import DotsVerticalIcon from '@/assets/icons/UI/dots-vertical-white-64.svg'
import { useExpandAnim } from '@/shared/hooks/useExpandAnim'

type Props = {
  item: IItem
}

const MainItem: FC<Props> = ({ item }) => {
  const { user } = useAppSelector((store) => store.user)

  const { hidden: hiddenFooter, toggle: toggleFooter } = useExpandAnim()

  const { data: profile } = useGetUserProfileQuery(user?.uid)

  return (
    <View style={styles.item}>
      <Text style={{ color: '#fff' }}>MainItem</Text>

      {hiddenFooter && (
        <TouchableOpacity style={styles.showFooterBtn} onPress={toggleFooter}>
          <DotsVerticalIcon width={10} height={10} />
        </TouchableOpacity>
      )}

      {!hiddenFooter && (
        <View style={styles.footer}>
          <TouchableOpacity>
            <EditIcon width={25} height={25} />
          </TouchableOpacity>

          <TouchableOpacity>
            <DeleteIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default memo(MainItem)
