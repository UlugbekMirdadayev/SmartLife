import { MAIN_THEME } from '../constants'

const initial = {
    theme: 'empty',
};

export default (state = initial, action) => {
    switch (action.type) {
        case MAIN_THEME:{
            return {
                ...state,
                theme: action.theme
            };
        }
        default:
            return state;
    }
}