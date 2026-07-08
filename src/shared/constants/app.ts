export const GOOGLE_PLAY_PACKAGE_ID = 'com.williamsdev.wordcards'

export const GOOGLE_PLAY = `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_PACKAGE_ID}`

// открывает карточку приложения в Google Play сразу с блоком отзывов —
// используется кнопкой "Оставить отзыв" (см. features/ModalAppReview)
export const GOOGLE_PLAY_REVIEW_LINK = `market://details?id=${GOOGLE_PLAY_PACKAGE_ID}&showAllReviews=true`

// TODO: реальный числовой App Store ID приложения нигде в проекте не
// сконфигурирован (появится только после первой публикации в App Store) —
// подставить сюда перед релизом iOS-версии функции "оставить отзыв"
export const APP_STORE_ID = 'TODO_APP_STORE_ID'

// itms-apps:// сразу открывает системную форму оценки в App Store, минуя
// страницу приложения
export const APP_STORE_REVIEW_LINK = `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}?action=write-review`
