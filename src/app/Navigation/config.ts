import { COLORS } from '@/assets/styles/colors'

export const screenOptions = {
  headerStyle: {
    borderBottomWidth: 0,
    // android
    elevation: 0,
    // ios
    shadowOpacity: 0,
    backgroundColor: COLORS.white,
  },
}

export const hidenTabBarOption = { tabBarStyle: { display: 'none' } }

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }
  },
}

export const stackOptions: any = {
  ...horizontalAnimation,
  // presentation: 'transparentModal',
  animationTypeForReplace: 'push',
  animation: 'slide_from_left',
}
