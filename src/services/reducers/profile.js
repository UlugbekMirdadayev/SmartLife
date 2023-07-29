import {
    approvePhone,
    logout,
    auth, 
	sendLogin,
    ListPayGroup,
    ListPayments,
    Addpaymentcard,
    ListMyCards,
    MakePay,
    CutPayCard,
    ConfirmPay,
    DashboardInfo,
    MakeTransfer,
    HistoryMonth,
    HistoryData,
    EditProfile,
    ServiceCountry,
    ServiceRegion,
    PaymentsType,
    SaveShablon,
    Saqlanganlar,
    MyHomeList,
    AddHome,
    SaveHomeService,
    MyHomeService,
    CardInfo,
    DeleteCard,
    MakeTransferWithoutReg,
    CardsDesign,
    ThemeList,
    PayWithoutCard,
    PercentTransfer
	 
} from '../api/User/routines';
import { LOGOUT, SET_LANGUAGE, SET_DARKMODE, SET_SUMMARY } from '../constants'
import TokenStorage from '../TokenStorage'
import get from 'lodash/get'
import {SUCCESS} from 'redux-saga-routines/dist/routineStages';

const initial = {
	logout:{},
    user_data:{}, 
	sendLogin:{},
    ListPayGroup:{},
    ListPayments:{},
    Addpaymentcard:{},
    ListMyCards:{},
    MakePay:{},
    CutPayCard:{},
    ConfirmPay:{},
    DashboardInfo:{},
    MakeTransfer:{},
    HistoryMonth:{},
    HistoryData:{},
    EditProfile:{},
    ServiceCountry:{},
    ServiceRegion:{},
    PaymentsType:{},
    SaveShablon:{},
    Saqlanganlar:{},
    MyHomeList:{},
    AddHome:{},
    SaveHomeService:{},
    MyHomeService:{},
    CardInfo:{},
    DeleteCard:{},
    MakeTransferWithoutReg:{},
    CardsDesign:{},
    ThemeList:{},
    PayWithoutCard:{},
    PercentTransfer:{}
    
};

export default (state = initial, action) => {
    switch (action.type){
		
        case approvePhone.SUCCESS:{
            return {
                ...state
            }
        }

        case sendLogin.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                user_data: data
            }
        }   

        case ListPayGroup.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                listgroup: data
            }
        }   
        case PercentTransfer.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                PercentTransfer: data
            }
        } 

        case ListPayments.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                listpayments: data
            }
        }

        case Addpaymentcard.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                Addpaymentcard: data
            }
        }

        case ListMyCards.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                listcards_: data
            }
        }

        case MakePay.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                MakePay: data
            }
        }

        case CutPayCard.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                CutPayCard: data
            }
        } 

        case ConfirmPay.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                ConfirmPay: data
            }
        } 

        case DashboardInfo.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                DashboardInfo: data
            }
        } 

        case MakeTransfer.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                MakeTransfer: data
            }
        } 

        case HistoryMonth.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                HistoryMonth: data
            }
        }

        case HistoryData.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                HistoryData: data
            }
        }

        case EditProfile.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                EditProfile: data
            }
        }

        case ServiceCountry.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                ServiceCountry: data
            }
        }

        case ServiceRegion.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                ServiceRegion: data
            }
        }

        case PaymentsType.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                PaymentsType: data
            }
        }
        case SaveShablon.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                SaveShablon: data
            }
        }

        case Saqlanganlar.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                Saqlanganlar: data
            }
        }
        case MyHomeList.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                MyHomeList: data
            }
        }

        case AddHome.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                AddHome: data
            }
        }

        case SaveHomeService.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                SaveHomeService: data
            }
        }

        case MyHomeService.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                MyHomeService: data
            }
        }

        case CardInfo.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                CardInfo: data
            }
        }

        case DeleteCard.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                DeleteCard: data
            }
        }

        case MakeTransferWithoutReg.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                MakeTransferWithoutReg: data
            }
        }

        case CardsDesign.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                CardsDesign: data
            }
        }

        case ThemeList.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                ThemeList: data
            }
        }

        case PayWithoutCard.SUCCESS:{
            let data = get(action, 'payload.response.data', {});

            return {
                ...state,
                PayWithoutCard: data
            }
        }

        
        
        case auth.SUCCESS:{
            let data = get(action, 'payload.response', {});

            return {
                ...state,
                auth: data,
            }
        }
          
		
        case logout.SUCCESS:{
            TokenStorage.clear();
            return {
                ...initial
            }
        }

        case SET_LANGUAGE:{
            return {
                ...state,
                currentLangCode: action.lng
            }
        }

        case SET_DARKMODE:{
            return {
                ...state,
                curretMode: action.darkmodeset
            }
        }

        case SET_SUMMARY:{
            return {
                ...state,
                CashierSummary: action.summalar
            }
        }

        
		
		 
    }
    return state
}
