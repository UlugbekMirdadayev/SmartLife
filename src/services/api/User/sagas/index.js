import {all} from 'redux-saga/effects';

import approvePhone from './approvePhone';
import sendLogin from './sendLogin';
import Logout from './Logout';
import auth from './auth';
import sendParol from './sendParol';
import VerificateSms from './VerificateSms';

import ProfileData from './ProfileData';

// import {Api} from '../..';
// import {AppRegistry} from 'react-native';
import DashboardInfo from './DashboardInfo';
import {SearchAccepter, ViewViewHomeInfo} from '../routines';

export default function* sagas(api) {
  yield all([
    approvePhone(api),
    sendLogin(api),
    auth(api),
    Logout(api),
    sendParol(api),
    VerificateSms(api),

    DashboardInfo(api),

    SearchAccepter(api),
    ViewViewHomeInfo(api),
    ProfileData(api),
  ]);
}
