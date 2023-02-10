import { GetData } from "app/services/getData";
import { urlPaymentType } from "app/utils/constant";
import moment from "moment";
import { atom, selector } from "recoil";
import { openMessage, reload} from "./Controls";
import { pagination } from "./Pagination";


export const dataHeadCallPaymentType = atom({
    key: 'dataHeadCallPaymentTypes',
    default:  [
        { id: 'id', lable: 'SN', align: "left" },
        { id: 'name', lable: 'Name', align: "left" },
        { id: 'branch', lable: 'Branch', align: "left" },
        { id: 'Description', lable: 'Description', align: "left" },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]
})

export const dataPaymentType = atom({
    key: 'dataPaymentType',
    default: {
        id: 0,
        name: "",   
        description:"", 
        branch_id: 0,
        branch: {id: 0, name:''} 
    },
})

export const setDataPaymentTypeFromik = selector({
    key: 'setDataPaymentTypeFromik',
    get: async ({get}) => {
        const data= get(dataPaymentType)
        return data
    }
})

export const getDataPaymentType = selector({
    key: 'getDataPaymentType',

    get: async ({get}) => {

        let PaymentType = null;
        get(reload)
        try {
            await GetData(urlPaymentType, pagination).then((value) =>
            PaymentType = { PaymentType: value }
            )
        } catch (error) {
            PaymentType=  {PaymentType: []}
        }
        console.log("PaymentType recoil", PaymentType)
        return PaymentType
    }
})