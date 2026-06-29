# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the app

`language-dictionary` ("Word Cards") is a React Native app for learning foreign words via flashcards. The core entity is a **card** (`IItem`): one or more words/phrases, a chosen language, and a translation. Central user flows: browsing/searching/filtering the card list on the main screen, creating cards, and "practice" (reviewing cards with animation and marking study progress). Other screens: profile (stats/achievements/account), settings, year-in-review summary.

UI copy stays in Russian unless a task says otherwise. Full product/UX rules and many mandatory code-style rules live in `RULES.md` — read it before non-trivial changes; this file does not repeat it.

## Commands

```bash
yarn start              # start Metro (clears watchman + cache)
yarn android            # run on Android
yarn ios                # run on iOS
yarn lint               # eslint .
yarn test               # jest
yarn test -t "<name>"   # run a single test by name
yarn test path/to/file  # run a single test file
yarn icons:svg          # regenerate SVG icon components + registry from src/assets/icons/svg/src
yarn android-bundle     # produce a release Android JS bundle
```

`postinstall` runs `patch-package` automatically after `yarn install`.

## Architecture

Feature-Sliced Design (FSD), enforced top to bottom — `app → pages → widgets → features → entities → shared`. A layer may only depend on layers below it. Path aliases (see `babel.config.js` / `tsconfig.json`) mirror this: `@/app`, `@/pages`, `@/widgets`, `@/features`, `@/entities`, `@/shared`, plus shortcuts `@/hooks`, `@/helpers`, `@/store`, `@/constants` that point inside `shared`.

- `app` — app bootstrap (`App.tsx`: providers, i18n/bootsplash init) and all navigation (`app/Navigation`: stack/tab routers, route names/params, nav theme).
- `pages` — screens (`MainScreen`, `ProfileScreen`, `SettingsScreen`, `CardsRepetition` (practice), `AchievementsScreen`, `SplashScreen`). A page's own RTK Query endpoints live in a local `api/` folder (e.g. `pages/ProfileScreen/api`, `pages/MainScreen/api`).
- `widgets` — composition blocks combining entities/features (e.g. `widgets/MainList`, `widgets/LanguagesSelect`).
- `features` — user-triggered scenarios, almost always modals (`ModalAddItem`, `ModalDeleteItem`, `ModalCardsFilter`, `ModalYearResult` slideshow, etc.). A feature owns the logic for its own action (e.g. delete logic lives in `ModalDeleteItem`, not lifted to a parent).
- `entities` — domain types/UI for `Item` (the card) and `user` (profile + statistics).
- `processes` — legacy layer, currently just `AuthScreen` (VK/Google sign-in).
- `shared` — `UI` (design-system components: `Button`, `Text`, `Input`, `Modal`, `BottomSheet`, `Select`, `TabBar`, tooltips, etc.), `hooks`, `store`, `API`, `storage`, `i18n`, `helpers`, `constants`, `styles`, `firebase`, `json` (static data e.g. language list), `mock`.

### State & data

- **Redux Toolkit** store (`shared/store/store.ts`) combines plain slices (`app`, `user`, `items`) with a single RTK Query `baseApi` (`shared/API/baseApi.ts`); feature/page-level endpoints are injected into `baseApi` rather than creating new `createApi` instances. Access via `useAppSelector`/`useAppDispatch` (`shared/hooks/useStore.tsx`), action dispatch helpers via `useActions`.
- **Persistence**: `react-native-mmkv` via `shared/storage/mmkv.storage.ts`, which exposes `appStorage` (plain) and `appSecureStorage` (encrypted) instances of the `MMKVStorage` wrapper class. Keys are centralized in `shared/storage/storage.keys.ts`.
- **Auth**: VK and Google sign-in, orchestrated through `AuthProvider`/`useAuth` (`shared/hooks/useAuth.tsx`) and Firebase (`shared/firebase/api.ts`); `app.isAuth` in the store gates whether `Routes` renders the tab navigator or the auth stack.
- **i18n**: `i18next`/`react-i18next`, initialized via `initI18n()` (`shared/i18n`).

### Styling

`react-native-unistyles` v3, configured in `shared/styles/unistyles.ts` (themes `light`/`dark`, breakpoints, initial theme resolution). All colors, sizes, spacing, radius, font sizes, line heights, and icon sizes are theme tokens defined there (`theme.colors...`, `theme.spacing...`, etc.) — reuse existing tokens before adding new ones. Component styles live colocated in a sibling `ComponentName.styles.ts` using `StyleSheet.create`; conditional style variants use `styles.useVariants({...})` inside the component (see `entities/Item/UI/WordItem`). Static styles never go inline in JSX.

### Env / config

`react-native-dotenv` maps `.env` → the `@env` module (VK app id, Google web client id, GitHub token/owner/repo used by in-app update checks). `app.json` holds the RN app name.

## Conventions (full detail in `RULES.md` — read it for non-trivial changes)

- Resolution order on any conflict: 1) existing code/patterns next to the thing you're changing, 2) reusable layers (`shared`/`entities`/`widgets`), 3) `RULES.md`, 4) a new abstraction — only once not having one would actually cause duplication. Goal is the smallest, most predictable, most local diff.
- Before adding anything new, check for an existing match in `shared/UI`, `shared/hooks`, `shared/store`, `shared/styles/unistyles.ts`, and sibling `*.styles.ts`/screens — extend, don't duplicate. Same applies to colors: reuse a close palette entry before adding a new one.
- TypeScript: no `any`, prefer `const` over `let`.
- Components: `FC` + `memo` export is the norm for list/item components. No inline functions or inline style objects in JSX (dynamic styles go in `useMemo`, static ones in `*.styles.ts`). `.map()` directly in JSX is fine for rendering lists as long as it contains no new business logic. Don't assign JSX to a variable without a real need. Split a component into smaller files once it gets overloaded, instead of growing one monolith.
- Memoize values/functions derived from state or props with `useMemo`/`useCallback`; plain JSX/list elements don't need extra memoization.
- Hook order inside a component (skip any not used): `useNavigation`, `useRoutes`, `useActions`, `useAppDispatch`, `useAppSelector`, `useState`, RTK Query hooks, other custom hooks, `useMemo`, `useCallback`, `useEffect`.
- Component responsibility: a component owns the logic for its own action (e.g. delete logic lives in the delete modal, not lifted to a parent "for control"); only move logic to a `hook`/`helper`/`shared` once it's genuinely reused elsewhere.
- UI text stays in Russian unless the task says otherwise. If a file with Russian UI text is already encoded as UTF-8 with BOM, preserve that encoding when editing it.
- Images: always use `react-native-fast-image` — never `Image` from `react-native`. Pass `resizeMode` as a prop (`FastImage.resizeMode.cover`), not in the style object.
