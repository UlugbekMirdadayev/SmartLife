import { insert } from 'formik';
import {createRoutine, promisifyRoutine} from 'redux-saga-routines';

export const approvePhone = createRoutine('APPROVE_PHONE_NUMBER');
export const logout = createRoutine('LOGOUT') 
export const sendLogin = createRoutine('SEND_LOGIN'); 
export const auth = createRoutine("AUTH");
export const sendParol = createRoutine("SEND_PAROL");
export const VerificateSms = createRoutine("VERIFICATE_SMS");
export const sendPinCode = createRoutine("SEND_PINCODE");
export const ListPayGroup = createRoutine("LIST_GROUP");
export const ListPayments = createRoutine("LIST_PAYMENTS");
export const Addpaymentcard = createRoutine("ADD_PAYMENTSCARD");
export const ListMyCards = createRoutine("LIST_MYCARDS");
export const MakePay = createRoutine("MAKE_PAY");
export const CutPayCard = createRoutine("CUT_PAY");
export const ConfirmPay = createRoutine("CONFIRM_PAY");
export const DashboardInfo = createRoutine("DASHBOARD_INFO");
export const MakeTransfer = createRoutine("MAKE_TRANSFER");
export const HistoryMonth = createRoutine("HISTORY_MONTH");
export const HistoryData = createRoutine("HISTORY_DATE");
export const EditProfile = createRoutine("EDIT_PROFILE");
export const ServiceCountry = createRoutine("SERVICE_COUNTRY");
export const ServiceRegion = createRoutine("SERVICE_REGION");
export const PaymentsType = createRoutine("PAYMENTS_TYPE");
export const SaveShablon = createRoutine("SAVE_SHABLON");
export const Saqlanganlar = createRoutine("SAQLANGANLAR");
export const MyHomeList = createRoutine("MYHOMELIST");
export const AddHome = createRoutine("ADDHOME");
export const SaveHomeService = createRoutine("SAVEHOMESERVICE");
export const MyHomeService = createRoutine("MYHOMESERVICE");
export const CardInfo = createRoutine("CARDINFO");
export const DeleteCard = createRoutine("DELETECARD");
export const MakeTransferWithoutReg = createRoutine("MakeTransferWithoutReg");
export const CardsDesign = createRoutine("CardsDesign");
export const ThemeList = createRoutine("ThemeList");
export const PayWithoutCard = createRoutine("PayWithoutCard");
export const PercentTransfer = createRoutine("PercentTransfer");
export const HistoryMoneyTransfer = createRoutine("HistoryMoneyTransfer");
export const SearchAccepter = createRoutine("SearchAccepter"); 
export const ViewViewHomeInfo = createRoutine("ViewViewHomeInfo"); 
export const ProfileData = createRoutine("ProfileData"); 




export default {
    approvePhone: promisifyRoutine(approvePhone), 
    logout: promisifyRoutine(logout), 
    sendLogin: promisifyRoutine(sendLogin), 
    auth:promisifyRoutine(auth),
    sendParol:promisifyRoutine(sendParol),
    VerificateSms:promisifyRoutine(VerificateSms),
    sendPinCode:promisifyRoutine(sendPinCode),
    ListPayGroup:promisifyRoutine(ListPayGroup),
    ListPayments:promisifyRoutine(ListPayments),
    Addpaymentcard:promisifyRoutine(Addpaymentcard),
    ListMyCards:promisifyRoutine(ListMyCards),
    MakePay:promisifyRoutine(MakePay),
    CutPayCard:promisifyRoutine(CutPayCard),
    ConfirmPay:promisifyRoutine(ConfirmPay),
    DashboardInfo:promisifyRoutine(DashboardInfo),
    MakeTransfer:promisifyRoutine(MakeTransfer),
    HistoryMonth:promisifyRoutine(HistoryMonth),
    HistoryData:promisifyRoutine(HistoryData),
    EditProfile:promisifyRoutine(EditProfile),
    ServiceCountry:promisifyRoutine(ServiceCountry),
    ServiceRegion:promisifyRoutine(ServiceRegion),
    PaymentsType:promisifyRoutine(PaymentsType),
    SaveShablon:promisifyRoutine(SaveShablon),
    Saqlanganlar:promisifyRoutine(Saqlanganlar),
    MyHomeList:promisifyRoutine(MyHomeList),
    AddHome:promisifyRoutine(AddHome),
    SaveHomeService:promisifyRoutine(SaveHomeService),
    MyHomeService:promisifyRoutine(MyHomeService),
    CardInfo:promisifyRoutine(CardInfo),
    DeleteCard:promisifyRoutine(DeleteCard),
    MakeTransferWithoutReg:promisifyRoutine(MakeTransferWithoutReg),
    CardsDesign:promisifyRoutine(CardsDesign),
    ThemeList:promisifyRoutine(ThemeList),
    PayWithoutCard:promisifyRoutine(PayWithoutCard),
    PercentTransfer:promisifyRoutine(PercentTransfer),
    HistoryMoneyTransfer:promisifyRoutine(HistoryMoneyTransfer), 
    SearchAccepter:promisifyRoutine(SearchAccepter), 
    ViewViewHomeInfo:promisifyRoutine(ViewViewHomeInfo), 
    ProfileData:promisifyRoutine(ProfileData)
    
};
