import { SET_DARKMODE } from '../constants'

const initial = {
    darkmodeset: false,
};

export default (state = initial, action) => {
    switch (action.type) {
        case SET_DARKMODE:{
            return {
                ...state,
                darkmodeset: action.darkmodeset
            };
        }
        default:
            return state;
    }
}