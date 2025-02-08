import { AdRequestConfiguration, InterstitialAdLoader } from 'yandex-mobile-ads'
import { useEffect } from 'react'

let adRequestConfiguration = new AdRequestConfiguration({
  // adUnitId: 'demo-interstitial-yandex',
  adUnitId: 'R-M-13740901-2',
})

// реклама при открытии
export const useAdsScreen = () => {
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
          console.log('Did show')
        }
        ad.onAdFailedToShow = (error) => {
          console.log(`Did fail to show with error: ${JSON.stringify(error)}`)
        }
        ad.onAdClicked = () => {
          console.log('Did click')
        }
        ad.onAdDismissed = () => {
          console.log('Did dismiss')
        }
        ad.onAdImpression = (impressionData) => {
          console.log(`Did track impression: ${JSON.stringify(impressionData)}`)
        }
        ad.show()
      }
    })()
  }, [])
}
