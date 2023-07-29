import { LOCK_SCREEN_MAIN } from '../constants'

const initial = {
    locksetmain: true,
};

export default (state = initial, action) => {
    switch (action.type) {
        case LOCK_SCREEN_MAIN:{
            return {
                ...state,
                locksetmain: action.locksetmain
            };
        }
        default:
            return state;
    }
}