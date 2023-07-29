import { LOCK_SCREEN } from '../constants'

const initial = {
    lockset: false,
};

export default (state = initial, action) => {
    switch (action.type) {
        case LOCK_SCREEN:{
            return {
                ...state,
                lockset: action.lockset
            };
        }
        default:
            return state;
    }
}