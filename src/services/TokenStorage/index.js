import AsyncStorage from '@react-native-async-storage/async-storage';

import { TokenGetException } from './Exception'

export {
    TokenGetException
}

export default {
    get: () => {
        return AsyncStorage.getItem('token')
            .then(result => {
                if (!result) {
                    throw new TokenGetException()
                }

                return result
            })
    },

    set: value => {
        return AsyncStorage.setItem('token', value)
    },
    clear: () => {
        return AsyncStorage.removeItem('token')
    }
}
