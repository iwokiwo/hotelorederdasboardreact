import { GetData } from "app/services/getData";
import { urlCoupon } from "app/utils/constant";
import { atom, selector } from "recoil";
import { reload } from "./Controls";
import { pagination } from "./Pagination";

export const dataHeadCallCoupons = atom({
    key: 'dataHeadCallCoupons',
    default:  [
        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'DiscType', lable: 'Disc. Type', align: "left" },
        { id: 'Disc', lable: 'Disc', align: "left" },
        { id: 'ValidFrom', lable: 'Valid From', align: "left" },
        { id: 'ValidUntil', lable: 'Valid Until', align: "left" },
        { id: 'Limit', lable: 'Limit', align: "left" },
        { id: 'Use', lable: 'Use', align: "left" },
        { id: 'Description', lable: 'Description', align: "left" },
        { id: 'Status', lable: 'Status', align: "left", colSpan: 2 },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]
})

export const dataDiscountType = atom({
    key: 'dataDiscountType',
    default: ["persen","amount"]
})
export const dataCoupon = atom({
    key: 'dataCoupon',
    default: {
        id: 2,
        name: "discon 21",
        discount_type: "",
        discount: 21,
        max_value: 0,
        min_value: 0,
        max_item: 0,
        min_item: 0,
        description: "",
        valid_from: "2023-01-18T04:21:19.730Z",
        valid_until: "2023-01-18T04:21:19.730Z",
        active: 0,
        limit: 10,
        use_limit: 0,
        branch_id: 10,
        branch: {id: 0, name:''} 
    },
})

export const setDataCouponFromik = selector({
    key: 'setDataCouponFromik',
    get: async ({get}) => {
        const data= get(dataCoupon)
        return data
    }
})

export const getDataCoupon = selector({
    key: 'getDataCoupon',

    get: async ({get}) => {

        let coupon = [];

        get(reload)
        try {
            await GetData(urlCoupon, pagination).then((value) =>
            coupon = { coupon: value }
            )
        } catch (error) {
            coupon=  {coupon: []}
        }

        return coupon
    }
})