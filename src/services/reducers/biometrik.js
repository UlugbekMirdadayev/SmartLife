import { SET_BIOMETRIC } from '../constants'

const initial = {
    biometricset: true,
};

export default (state = initial, action) => {
    switch (action.type) {
        case SET_BIOMETRIC:{
            return {
                ...state,
                biometricset: action.biometricset
            };
        }
        default:
            return state;
    }
}