import { Share } from 'react-native'

type ShareHandler = {
  message?: string
}

export const shareHandler = async ({ message }: ShareHandler) => {
  try {
    if (message) {
      const result = await Share.share({
        message,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
  } catch (error) {
    console.log('shareHandler error', error)
  }
}
