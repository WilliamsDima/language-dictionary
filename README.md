Word Cards - <a href="https://play.google.com/store/apps/details?id=com.williamsdev.wordcards">Google Play</a>

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

## Возможные ошибки и исправления

---
