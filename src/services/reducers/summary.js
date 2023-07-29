import { SET_SUMMARY } from '../constants'
//import changeLanguage from '../../components/Language';

const initial = {
    summalar: {terminal: 0, karta: 0, sum: 0, valyuta: 0},
};

export default (state = initial, action) => {
    switch (action.type) {
        case SET_SUMMARY:{
         //   changeLanguage.setLanguage(action.lang)
            return {...state, summalar: action.summalar};
        }
        default:
            return state;
    }
}
