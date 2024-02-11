import { NavigateStack } from '@/app/Navigation/types/paramsTypes'
import { useNavigation } from '@react-navigation/native'

export const useAppNavigation = useNavigation<NavigateStack>
