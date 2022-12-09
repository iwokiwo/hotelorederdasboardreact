import {atom, selector} from "recoil";
import {dataBranch} from "./Branchs";
import axios from "../../axios";
import {GetData} from "../services/getData";
import {urlBranch, urlItem} from "../utils/constant";
import {pagination} from "./Pagination";

export const dataItem = atom({
    key: 'dataItem',
    default:   {
        id: 0,
        name: "",
        thumbnail: "",
        thumbnailOld: "",
        url:"",
        path:"",
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

export const dataProduct = selector({
    key: 'data-product',

    get: async () => {
        let product = null;

        try {
            await GetData(urlItem, pagination).then((value) =>
                product = { product: value }
            )
            console.log("lewat",product)
        } catch (error) {
            product=  {product: error}
        }

        return product
    }
})
