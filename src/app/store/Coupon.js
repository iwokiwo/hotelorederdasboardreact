import { atom } from "recoil";

export const dataCoupon = atom({
    key: 'dataCoupon',
    default:   {
        id:2,
        name:"discon 21",
         discount_type:"persen",
         discount:21,
         max_value:0,
         min_value:0,
         max_item:0,
         min_item:0,
         description: "",
         valid_from: "2023-01-18T04:21:19.730Z",
         valid_until: "2023-01-18T04:21:19.730Z",
         active: 0,
         limit:10,
         branch_id: 10
    },
})