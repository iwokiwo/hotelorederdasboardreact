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

export const paginationWithSearch = atom({
    key: 'paginationWithSearch',
    default: {
        page: 0,
        size: 10,
        sort: "created_at desc",
        direction: "",
        active: 1,
        stock: 0,
        id: 0,
        category_id: 0,
        search: "",
    }
})
