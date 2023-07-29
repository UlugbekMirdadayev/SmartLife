import {combineReducers} from 'redux';
import {LOGOUT} from '../constants';

/* ------------- Reducers ------------- */

import profile from './profile';
import language from './language';
import theme from './theme';
import user from './user';
import biometrik from './biometrik';
import darkmode from './darkmode';
import balance from './balance';
import lockscreen from './lockscreen';
import savepin from './savepin';
import firstlockscreen from './firstlockscreen';
import maintheme from './maintheme';
import summary from './summary';
import imei from './imeiList';

/* ------------- Reducers ------------- */

const rootReducer = combineReducers({
  profile,
  language,
  user,
  biometrik,
  darkmode,
  balance,
  lockscreen,
  savepin,
  firstlockscreen,
  maintheme,
  theme,
  summary,
  imei,
});

export default (state, action) =>
  action.type === LOGOUT
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
