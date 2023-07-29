import { SAVE_USER } from '../constants'
//import changeLanguage from '../../components/Language';

const initial = {
    user: {},
};

export default (state = initial, action) => {
    switch (action.type) {
        case SAVE_USER:{
         //   changeLanguage.setLanguage(action.lang)
            return {...state, user: action.user};
        }
        default:
            return state;
    }
}
