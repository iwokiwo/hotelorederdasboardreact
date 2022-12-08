import {atom, selector} from "recoil";
import {dataBranch} from "./Branchs";

export const dataItem = atom({
    key: 'dataItem',
    default:   {
        id: 0,
        name: "",
        slug: "",
        thumbnail: "",
        bahan: "",
        dimensi: "",
        price: 0,
        stock: 0,
        active: 1,
        views: 0,
        description: "",
        sku: null,
        inventory: null,
        size: "",
        hpp: 0,
        available_size: 0,
        color: "",
        available_color: 0,
        category_id: null,
        unit_id: null,
        category: {id: 0, name:''},
        unit: {ID: 0, Name:''},
        user_id: null,
        branch_id: null
    },
})

export const setDataItemFromik = selector({
    key: 'setDataItem',
    get: async ({get}) => {
        const data= get(dataItem)
        return data
    }
})
