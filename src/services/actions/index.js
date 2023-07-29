import {
  SET_LANGUAGE,
  SAVE_USER,
  IMAGE_UPLOAD,
  SET_BIOMETRIC,
  SET_DARKMODE,
  SET_BALANCE,
  LOCK_SCREEN,
  FIRST_LOCK,
  MAIN_THEME,
  SET_SUMMARY,
  SET_IMEI_LIST,
} from '../constants';

export const setLang = lang => ({
  type: SET_LANGUAGE,
  lang,
});

export const setSummary = summalar => ({
  type: SET_SUMMARY,
  summalar,
});

export const saveUser = user => ({
  type: SAVE_USER,
  user,
});

export const setBiometric = biometricset => ({
  type: SET_BIOMETRIC,
  biometricset,
});

export const setDarkmode = darkmodeset => ({
  type: SET_DARKMODE,
  darkmodeset,
});

export const setBalance = balanceset => ({
  type: SET_BALANCE,
  balanceset,
});

export const setImeiList = imei => ({
  type: SET_IMEI_LIST,
  imei,
});

export const setLock = lockset => ({
  type: LOCK_SCREEN,
  lockset,
});

export const setFirstLock = firstlock => ({
  type: FIRST_LOCK,
  firstlock,
});

export const setMainTheme = maintheme => ({
  type: MAIN_THEME,
  maintheme,
});

export const image = image => ({
  type: IMAGE_UPLOAD,
  image,
});
