import { isRejectedWithValue, type Middleware, type MiddlewareAPI } from '@reduxjs/toolkit'

// Форма RTK Query rejected-экшена (query/mutation), которую isRejectedWithValue
// сужает только до общего thunk-экшена — а нам нужны ещё endpointName/originalArgs
// из meta.arg и baseQueryMeta, которые RTK Query всегда кладёт туда сама.
type RtkQueryRejectedAction = {
  type: string
  payload: unknown
  meta?: {
    arg?: {
      endpointName?: string
      originalArgs?: unknown
    }
    baseQueryMeta?: unknown
  }
}

// Единая точка логирования ошибок всех RTK Query эндпоинтов (baseApi и все
// инжектированные в него сервисы). Срабатывает на каждый rejected экшен с
// payload (isRejectedWithValue) — то есть на любую упавшую query/mutation,
// независимо от того, использует ли конкретный эндпоинт fetchBaseQuery или
// кастомный queryFn (см. shared/API/RTK/rtk.ts: toRtkQueryResult). Логирует
// эндпоинт, аргументы вызова, статус и тело ошибки, чтобы такие проблемы
// не терялись молча в UI-catch-блоках.
export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const meta = (action as RtkQueryRejectedAction).meta
      const endpointName = meta?.arg?.endpointName

      console.error(
        `[RTK Query] ${action.type}${endpointName ? ` — ${endpointName}` : ''}`,
        {
          endpointName,
          args: meta?.arg?.originalArgs,
          error: action.payload,
          meta: meta?.baseQueryMeta,
        }
      )
    }

    return next(action)
  }
