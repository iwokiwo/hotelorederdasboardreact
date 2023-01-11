import {atom, selector, useRecoilValue} from "recoil";
import {dataBranch} from "./Branchs";
import axios from "../../axios";
import {GetDataPagination} from "../services/getData";
import {urlBranch, urlItem} from "../utils/constant";
import {pagination, paginationWithSearch} from "./Pagination";
import {reload} from "./Controls";

export const dataItem = atom({
    key: 'dataItem',
    default:   {
        id: 0,
        name: "",
        thumbnail: "",
        thumbnailOld: "",
        gallery:[],
        multiFile:[],
        multiFileDelete:[],
        url:"",
        path:"",
        price: 0,
        quantity: 0,
        active: 1,
        description: "",
        sale_price: 0,
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
    key: 'dataProduct',

    get: async ({get}) => {
        const dataPagination = get(paginationWithSearch)
        get(reload)
        let product = null;
        console.log("data paginaton", dataPagination)

        try {
            await GetDataPagination(urlItem, dataPagination).then((value) =>
                product = { product: value }
            )
            console.log("lewat",product)
        } catch (error) {
            product=  {product: error}
        }

        return product
    }
})
