Word Cards - <a href="https://wordcards-admin.duckdns.org/download" target="_blank">скачать APK</a>

<ul>
	<li><a href="https://t.me/DyWilliams">front - Dmitry Williams</a></li>
</ul>

---

## Techstack

[![node](https://img.shields.io/static/v1?label=node&message=20.15.1&color=026E00&style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![typescript](https://img.shields.io/static/v1?label=typescript&message=5.0.4&color=3178C6&style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![yarn](https://img.shields.io/static/v1?label=yarn&message=1.22.19&color=2C8EBB&style=for-the-badge&logo=yarn&logoColor=white)](https://classic.yarnpkg.com/en/)
[![react](https://img.shields.io/static/v1?label=react&message=18.3.1&color=61DBFB&style=for-the-badge&logo=react&logoColor=white)](https://ru.reactjs.org/)
[![react native](https://img.shields.io/static/v1?label=react-native&message=0.76.5&color=61DBFB&style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![reduxtoolkit](https://img.shields.io/static/v1?label=redux%20toolkit&message=2.5.2&color=764ABD&style=for-the-badge&logo=redux&logoColor=764ABD)](https://redux-toolkit.js.org/)

---

## Работа с архитектурой FSD

Подробнее можно почитать:

- [Feature-Sliced Design Methodology](https://feature-sliced.design/)

- `shared` - переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса.(например, UIKit, libs, API).
- `entities` - (сущности) — бизнес-сущности.(например, User, Product, Order).
- `features` - (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя.(например, SendComment, AddToCart, UsersSearch).
- `widgets` - (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки(например, IssuesList, UserProfile).
- `pages` - (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
- `processes` - (процессы, устаревший слой) — сложные сценарии, покрывающие несколько страниц.(например, авторизация)
- `app` - настройки, стили и провайдеры для всего приложения.

Также, присутствуют такие директории:

- `assets` – тут расположены иконки, картинки, шрифты, глобальные стили.
- `helpers` – тут расположены вспомогательные функции, костанты и утилиты.
- `hooks` – кастомные хуки.
- `store` – инициализация redux store.
- `services` – инстанс api (axios, RTK Query, Firebase).

## Релиз APK

Приложение не публикуется в Google Play — оно распространяется APK-файлом со страницы https://wordcards-admin.duckdns.org/download.

### Как это работает

- Каждый push в `main` (и ручной запуск `workflow_dispatch`) запускает `.github/workflows/release-apk.yml`: собирает подписанный release APK (только `armeabi-v7a` и `arm64-v8a`) и по SSH загружает его на VPS вместе с `release.json`. Сервер сам проверяет релиз, публикует его, ротирует старые версии и возвращает опубликованный `latest.json` — он выводится в summary джоба вместе с SHA-256 сертификата подписи.
- Приложение читает https://wordcards-admin.duckdns.org/apk/latest.json. Модалка обновления (`ModalUpdateApp`) сравнивает `versionName` по semver: вырос MAJOR — обновление обязательное (модалку не закрыть), MINOR/PATCH — можно «Позже». Экран настроек (`VersionBlock`) показывает установленную версию с номером билда — «2.1.0 (157)» — и при более новом релизе «Доступна версия X (N)» с кнопкой «Обновить», ведущей на страницу скачивания.
- `versionCode` = `baseVersionCode` из `android/app/build.gradle` (последний versionCode из Google Play) + номер запуска воркфлоу (`github.run_number`). Он передаётся в Gradle как `-PWORDCARDS_VERSION_CODE`, файл в репозитории не меняется. Перезапуск того же запуска («Re-run jobs») публикует тот же код повторно — сервер это допускает. Если воркфлоу удалить или переименовать, `run_number` начнётся заново — тогда поднимите `baseVersionCode` выше опубликованного кода.
- `versionName` берётся из `versionName "..."` в `android/app/build.gradle` (поле `version` в `package.json` для релиза не используется).

### Как поднять версию

**Каждый push в `main` — это релиз с новым `versionName`.** Перед пушем:

1. Поднимите `versionName "X.Y.Z"` в `android/app/build.gradle` по semver относительно последней опубликованной версии:
   - **MAJOR** (`3.0.0`) — обязательное обновление для всех: модалку обновления нельзя закрыть. Только когда старые версии перестают работать (например, несовместимый контракт API).
   - **MINOR** (`2.2.0`) — новые возможности.
   - **PATCH** (`2.1.1`) — исправления и мелочи.
2. Создайте `release-notes/<versionName>.json` — «Что нового» для модалки обновления, обязательно на `ru` и `en` (можно добавить и другие языки интерфейса по двухбуквенному коду):

   ```json
   {
     "ru": ["Короткий понятный пользователю пункт", "..."],
     "en": ["Short user-facing item", "..."]
   }
   ```

   Пункты пишутся для пользователя, без технических деталей. Модалка показывает их на языке интерфейса, если его нет — на `en`, затем на `ru`.
3. `versionCode` (номер билда) не трогайте — его ставит CI.

Как заметки попадают в приложение: воркфлоу (шаг «Read release notes») проверяет файл и отправляет его компактным JSON в поле `changelog` файла `release.json`; сервер копирует `changelog` в `latest.json` без изменений (до 4000 символов), приложение разбирает его как заметки. Нет файла — в `changelog` уходит заголовок коммита, как раньше, а в модалке нет блока «Что нового» (в логе CI — warning); невалидный файл или больше 4000 символов — сборка падает до сборки APK. Если `versionName` уже опубликован, CI предупреждает (warning), но релиз публикует: модалка такой билд не предложит. Пример `latest.json`:

```json
{
  "schemaVersion": 1,
  "versionName": "2.1.0",
  "versionCode": 157,
  "fileName": "word-cards-2.1.0-157.apk",
  "url": "https://wordcards-admin.duckdns.org/apk/word-cards-2.1.0-157.apk",
  "latestUrl": "https://wordcards-admin.duckdns.org/apk/word-cards-latest.apk",
  "size": 41234567,
  "sha256": "…",
  "publishedAt": "2026-10-13T10:00:00Z",
  "commit": "…",
  "changelog": "{\"ru\":[\"…\"],\"en\":[\"…\"]}"
}
```

Допустимы латиница, цифры, `.`, `_`, `-`, до 32 символов, но приложение сравнивает версии по semver `X.Y.Z`. `baseVersionCode` и `versionName` должны оставаться простыми литералами — воркфлоу читает их из файла.

### GitHub Secrets

| Секрет | Что это |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | keystore подписи в base64 (`wordcards-release.keystore`, alias `wordcards`; это новый ключ, не ключ из Google Play) |
| `ANDROID_KEYSTORE_PASSWORD` | пароль keystore |
| `ANDROID_KEY_ALIAS` | alias ключа |
| `ANDROID_KEY_PASSWORD` | пароль ключа |
| `GOOGLE_SERVICES_JSON_BASE64` | `android/app/google-services.json` в base64 |
| `GOOGLE_WEB_CLIENT_ID` | значение `GOOGLE_WEB_CLIENT_ID` из `.env` |
| `APK_UPLOAD_SSH_KEY` | приватный ed25519-ключ пользователя `wordcards-apk` на сервере |
| `APK_UPLOAD_HOST` | адрес сервера |
| `APK_UPLOAD_KNOWN_HOSTS` | строка known_hosts сервера (`<ip> ssh-ed25519 AAAA...`) |
| `APP_CENTER_SECRET` | необязательный: App Center secret (если не задан — пустая строка, как в локальной сборке без него) |
| `TELEGRAM_BOT_TOKEN` | необязательный: токен Telegram-бота для уведомлений о сборках (выдаёт @BotFather → `/newbot`) |
| `TELEGRAM_CHAT_ID` | необязательный: chat_id чата/канала, куда бот пишет уведомления |

**Уведомления в Telegram.** Каждый запуск воркфлоу — одно сообщение: в начале бот пишет «🟡 APK · сборка начата» (версия, короткий sha и первая строка коммита — при ручном запуске «вручную», автор, ссылка на запуск), а в конце редактирует это же сообщение на итог — «✅ опубликован» (со ссылкой на страницу скачивания), «❌ сборка упала» или «⚪ сборка отменена» — с длительностью и `versionCode`. Логика — `.github/scripts/telegram-notify.sh` (`start` / `finish <status>`), такой же формат у `dictionary-backend` и `word-cards-admin`. Если хотя бы один из двух секретов не задан, шаги уведомлений просто пропускаются; ошибки Telegram сборку не роняют и не задерживают (таймаут запроса 10 с).

Как получить `TELEGRAM_CHAT_ID`: добавьте бота в нужный чат (в канал — администратором) или напишите ему в личку, отправьте любое сообщение и откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — нужен `result[].message.chat.id` (для канала — `channel_post.chat.id`; у групп и каналов он отрицательный, например `-100…`). Если `getUpdates` пустой — отправьте сообщение ещё раз (в группе при включённом privacy mode бот видит только команды, например `/start`).

**Где хранятся оригиналы** (в репозиторий не попадают): keystore и его пароль — `dictionary-sicrets/keystore/` (`wordcards-release.keystore`, `password`; пароль ключа совпадает с паролем keystore), актуальный `google-services.json` — `dictionary-sicrets/google-services.json`. Если keystore потерять, новые версии нельзя будет поставить поверх установленной: придётся удалить приложение и подписывать новым ключом.

**Firebase**: SHA-1 и SHA-256 этого ключа добавлены в Firebase → Project settings → Android app (без них не работает вход через Google). При смене ключа: добавить новые отпечатки (`keytool -list -v -keystore <файл>`), заново скачать `google-services.json` и обновить секрет `GOOGLE_SERVICES_JSON_BASE64`.

`API_BASE_URL` секретом не является — воркфлоу сам пишет в `.env` прод `https://wordcards-api.duckdns.org`. Серверная часть (пользователь `wordcards-apk`, ключи, SHA сертификата в Firebase) описана в `dictionary-backend/deploy/DEPLOY.md`, §16.

Base64 из файла в PowerShell (результат сразу в буфер обмена):

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\to\release.keystore")) | Set-Clipboard
```

### Локальная release-сборка

Подпись настраивается Gradle-свойствами — добавьте в `%USERPROFILE%\.gradle\gradle.properties` (не в репозиторий):

```properties
WORDCARDS_UPLOAD_STORE_FILE=C:/path/to/release.keystore
WORDCARDS_UPLOAD_STORE_PASSWORD=...
WORDCARDS_UPLOAD_KEY_ALIAS=...
WORDCARDS_UPLOAD_KEY_PASSWORD=...
```

Без этих свойств `assembleRelease` подписывает APK debug-ключом, как раньше (в CI подпись обязательна — без ключа сборка падает).

## Возможные ошибки и исправления

---
