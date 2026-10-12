import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'

// codegen-спека собственного TurboModule озвучки (только Android): реализация —
// android/app/src/main/java/com/wordcards/tts/TextToSpeechModule.kt, Java-спеку
// генерирует codegen по codegenConfig из package.json. Промисы отклоняются с
// кодом: no_engine — нет/не поднялся TTS-движок, lang_unavailable — нет голоса
// для локали, failed — прочий сбой синтеза
export interface Spec extends TurboModule {
  // поднимает движок; повторный вызов после успеха резолвится сразу
  init(): Promise<void>
  // locale — BCP-47 (en-US); прерывает текущую фразу (QUEUE_FLUSH)
  speak(text: string, locale: string): Promise<void>
  stop(): Promise<void>
}

// get, а не getEnforcing: на iOS и в jest модуля нет — обёртка трактует это
// как отсутствие движка, а не падает при импорте
export default TurboModuleRegistry.get<Spec>('WordCardsTextToSpeech')
