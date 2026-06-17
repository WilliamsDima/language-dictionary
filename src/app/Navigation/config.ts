import { appThemes } from '@/shared/styles/unistyles'

export const screenOptions = {
  headerStyle: {
    borderBottomWidth: appThemes.light.size.s0,
    // android
    elevation: appThemes.light.size.s0,
    // ios
    shadowOpacity: appThemes.light.opacity.o0,
    backgroundColor: appThemes.light.colors.palette.white,
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
