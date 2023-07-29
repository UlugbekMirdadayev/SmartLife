import { FIRST_LOCK } from '../constants'

const initial = {
     firstlock: true,
};

export default (state = initial, action) => {
    switch (action.type) {
        case FIRST_LOCK:{
            return {
                ...state,
                firstlock: action.firstlock
            };
        }
        default:
            return state;
    }
}