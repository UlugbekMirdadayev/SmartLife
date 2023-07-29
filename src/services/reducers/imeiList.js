import {SET_IMEI_LIST} from '../constants';

const initial = {
  imei: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case SET_IMEI_LIST: {
      return {
        ...state,
        imei: action.imei,
      };
    }
    default:
      return state;
  }
};
