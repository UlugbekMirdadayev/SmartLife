import translate from '../../../components/Language'
import { getPrice } from './routines';
 




export default (api) => { 
    return { 
        sendLogin:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        sendParol:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
 
        VerificateSms:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        sendPinCode:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ListPayGroup:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ListPayments:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        Addpaymentcard:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ListMyCards:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        MakePay:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        CutPayCard:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ConfirmPay:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        DashboardInfo:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        MakeTransfer:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        HistoryMonth:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        HistoryData:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        EditProfile:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ServiceCountry:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        ServiceRegion:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        PaymentsType:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        SaveShablon:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        Saqlanganlar:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        MyHomeList:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        AddHome:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        SaveHomeService:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        PercentTransfer:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 


        MyHomeService:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        CardInfo:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },

        DeleteCard:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        
        MakeTransferWithoutReg:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        },
        CardsDesign:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 
        ThemeList:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 
        PayWithoutCard:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 

        HistoryMoneyTransfer:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 

        SearchAccepter:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 

        ViewViewHomeInfo:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 

        ProfileData:(data)=>{ 
            return api.post(`mijoz.php`, data.data)
        }, 
        
         
        auth:(data)=>{ 
            return api.post(`/apimobile/`, data.data)
        }
		 
    }
}
