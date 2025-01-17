import { useNavigationState } from '@react-navigation/native'

export const useCurrentRoute = () => {
  const routes = useNavigationState((state) => state.routes)
  const currentRoute = routes[routes.length - 1].name

  return { currentRoute }
}
