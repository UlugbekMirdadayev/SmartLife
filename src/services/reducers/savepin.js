import { SET_PINCODE } from '../constants'

const initial = {
    setpincodes: null,
};

export default (state = initial, action) => {
    switch (action.type) {
        case SET_PINCODE:{
            return {
                ...state,
                setpincodes: action.setpincodes
            };
        }
        default:
            return state;
    }
}