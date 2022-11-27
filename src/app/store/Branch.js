import {atom, selector} from "recoil";
import {reload} from "./Controls";
import {GetData} from "../services/getData";
import {urlBranch} from "../utils/constant";
import {pagination} from "./Pagination";


export const dataBranch = atom({
    key: 'dataBranch',
    default: {
        name: "",
        address: "",
        phone:"",
        email:"",
        logo: null,
        url:"",
        path:"",
        logoOld:"",
        id: 0,
    }
})

export const setDataBranchFromik = selector({
    key: 'setDataBranch',
    get: async ({get}) => {
        const data= get(dataBranch)
        return data
    }
})

export const getDataBranch = selector({
    key: 'getDataBranch',

    get: async ({get}) => {

        let data = null;

        get(reload)
        try {
            await GetData(urlBranch, pagination).then((value) =>
                data = { data: value }
            )
            console.log("data from API",data)
        } catch (error) {
            data=  {data: []}
        }

        return data
    }
})