import { atom } from "recoil";

export const pagination = atom({
    key: 'pagination',
    default: {  
        Page:1,
        Size:10,
        Sort:"created_at desc",
        Direction:"",
        Active:1,
        Stock :0 
    }
})