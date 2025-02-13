import { AdRequestConfiguration, InterstitialAdLoader } from 'yandex-mobile-ads'
import { useEffect } from 'react'
import { useUserActivity } from './useUserActivity'
import { useAppSelector } from './useStore'

let adRequestConfiguration = new AdRequestConfiguration({
  // adUnitId: 'demo-interstitial-yandex',
  adUnitId: 'R-M-13740901-2',
})

// реклама при открытии
export const useAdsScreen = () => {
  const { updateActivity } = useUserActivity()

  useEffect(() => {
    ;(async () => {
      let loader = await InterstitialAdLoader.create()

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
          console.log('useAdsScreen Did show')
        }
        ad.onAdFailedToShow = (error) => {
          console.log(
            `useAdsScreen Did fail to show with error: ${JSON.stringify(error)}`
          )
        }
        ad.onAdClicked = () => {
          console.log('useAdsScreen Did click')
        }
        ad.onAdDismissed = () => {
          console.log('useAdsScreen Did dismiss')
        }
        ad.onAdImpression = (impressionData) => {
          console.log(
            `useAdsScreen Did track impression: ${JSON.stringify(
              impressionData
            )}`
          )
        }
        ad.show()
      }
    })()
  }, [])
}
