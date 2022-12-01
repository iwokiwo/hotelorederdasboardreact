import {atom, selector} from "recoil";
import {reload} from "./Controls";
import {GetData} from "../services/getData";
import {urlBranch, urlStore} from "../utils/constant";
import {pagination} from "./Pagination";

export const dataHeadCallBranch = atom({
    key: 'dataHeadCallBranch',
    default:  [
        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'Phone', lable: 'Phone', align: "left" },
        { id: 'Email', lable: 'Email', align: "left" },
        { id: 'Address', lable: 'Address', align: "left" },
        { id: 'Logo', lable: 'Logo', align: "left" },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]
})

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
    key: 'getDataBranchState',

    get: async ({get}) => {

        let branch = [];

        get(reload)
        try {
            await GetData(urlBranch, pagination).then((value) =>
                branch = { branch: value }
            )
        } catch (error) {
            branch=  {branch: []}
        }

        return branch
    }
})


