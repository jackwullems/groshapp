import { ApiException } from 'models'
import Toast from 'react-native-toast-message'

export const handleException = (exception: Error | ApiException) => {
    if (exception instanceof Error) {
        Toast.show({type: 'error', text1: exception.message})
        return
    }
    const apiException = exception as ApiException
    Toast.show({type: 'error', text1: apiException.message, text2: apiException.code})
}
