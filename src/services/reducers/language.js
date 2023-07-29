import { SET_LANGUAGE } from '../constants'

const initialLanguage = {
    lang: 'uz',
};

export default (state = initialLanguage, action) => {
    switch (action.type) {
        case SET_LANGUAGE:{
            return {
                ...state,
                lang: action.lang
            };
        }
        default:
            return state;
    }
}
