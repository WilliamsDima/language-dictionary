import { AdRequestConfiguration, AppOpenAdLoader } from 'yandex-mobile-ads'
import { AppState } from 'react-native'
import { useEffect } from 'react'
import { useUserActivity } from './useUserActivity'

let adRequestConfiguration = new AdRequestConfiguration({
  adUnitId: 'R-M-13740901-1',
  //adUnitId: 'demo-appopenad-yandex',
})

// реклама при открытии
export const useAdsOpenApp = () => {
  const { updateActivity } = useUserActivity()

  useEffect(() => {
    ;(async () => {
      let loader = await AppOpenAdLoader.create()

      let ad = await loader
        .loadAd(adRequestConfiguration)
        .then((ad) => {
          // Ad loaded successfully
          return ad
        })
        .catch((error) => {
          // Handle error gracefully
          return
        })

      if (ad) {
        ad.onAdShown = () => {
          updateActivity({ viewedAds: true })
          console.log('useAdsOpenApp Did show')
        }
        ad.onAdFailedToShow = (error) => {
          console.log(
            `useAdsOpenApp Did fail to show with error: ${JSON.stringify(
              error
            )}`
          )
        }
        ad.onAdClicked = () => {
          console.log('useAdsOpenApp Did click')
        }
        ad.onAdDismissed = () => {
          console.log('useAdsOpenApp Did dismiss')
        }
        ad.onAdImpression = (impressionData) => {
          console.log(
            `useAdsOpenApp Did track impression: ${JSON.stringify(
              impressionData
            )}`
          )
        }

        // const handleAppStateChange = (nextAppState: string) => {
        //   if (nextAppState === 'active') {
        //     ad.show()
        //     subscription.remove()
        //   }
        // }

        // const subscription = AppState.addEventListener(
        //   'change',
        //   handleAppStateChange
        // )
      }
    })()
  }, [])
}
