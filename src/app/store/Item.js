import {atom, selector} from "recoil";
import {dataBranch} from "./Branchs";

export const dataItem = atom({
    key: 'dataItem',
    default:   {
        id: 0,
        name: "",
        thumbnail: "",
        price: 0,
        stock: 0,
        active: 1,
        description: "",
        hpp: 0,
        category_id: 0,
        unit_id: 0,
        category: {ID: 0, Name:''},
        unit: {ID: 0, Name:''},
    },
})

export const setDataItemFromik = selector({
    key: 'setDataItem',
    get: async ({get}) => {
        const data= get(dataItem)
        return data
    }
})
