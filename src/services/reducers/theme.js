import { SET_MODE } from '../constants'

const initialLanguage = {
    mode:  false,
};

export default (state = initialLanguage, action) => {
    switch (action.type) {
        case SET_MODE:{
            return {
                ...state,
                mode: action.mode
            };
        }
        default:
            return state;
    }
}
