import { SET_BALANCE } from '../constants'

const initial = {
    balanceset: 'not',
};

export default (state = initial, action) => {
    switch (action.type) {
        case SET_BALANCE:{
            return {
                ...state,
                balanceset: action.balanceset
            };
        }
        default:
            return state;
    }
}