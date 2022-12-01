import {atom, selector, selectorFamily} from "recoil";
import {openMessage, reload} from "./Controls";
import {GetData} from "../services/getData";
import {urlBranch, urlStore} from "../utils/constant";
import {pagination} from "./Pagination";


export const dataStore = atom({
    key: 'dataStore',
    default: {
        name: "",
        address: "",
        logo: null,
        url:"",
        path:"",
        logoOld:"",
        id: 0,
    }
})

export const setDataStoreFromik = selector({
    key: 'setDataStore',
    get: async ({get}) => {
        const data= get(dataStore)
        return data
    }
})

export const getDataStore = selector({
    key: 'getDataStore',

    get: async ({get}) => {

        let data = null;

        get(reload)
        try {
            await GetData(urlStore, pagination).then((value) =>
                data = { data: value }
            )
        } catch (error) {
            data=  {data: []}
        }
        console.log("getDataStore",data)
        return data
    }
})


