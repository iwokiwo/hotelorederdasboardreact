import { GetData } from 'app/services/getData'
import axios from 'axios.js'

import { atom, DefaultValue, selector } from 'recoil'
import { urlCategory, urlCreateCategory } from 'app/utils/constant'
import { pagination } from './Pagination'
import { PostData } from 'app/services/postData'
import { reload } from './Controls'
class CacheAPI {
    async getData() {
        let data 
        await GetData(urlCategory, pagination).then((value) =>
            data = { value }
        )
        return data
    }
    async postData(item){
        let data
        await PostData(urlCreateCategory, item).then((value) => data = {value})
        return data
    }
}

const cacheApi = new CacheAPI()

export const dataCategory = atom({
    key: 'dataCategory',
    default: { id: '', name: '', branch_id: '', branch: {id: 0, name:''} }
})

export const createDataCategory = atom({
    key: 'createDataCategory',
    default:{message:'', code:'', status:'', data:[]},
    effects_UNSTABLE: [
         ({onSet,setSelf}) => {
            onSet((item)=>{
                cacheApi.postData(item)
            })
            setSelf(cacheApi.getData())
           
        }
    ]
})

export const dataHeadCall = atom({
    key: 'dataHeadCall',
    default:  [
        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'Branch', lable: 'Branch', align: "left" },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]
})

export const getDataCategory = selector({
    key: 'getDataCategory',

    get: async ({get}) => {
        let category = null;
        get(reload)
        try {
            await GetData(urlCategory, pagination).then((value) =>
            category = { category: value }
            )
        } catch (error) {
            category=  {category: error}
        }

        return category
    }
})

export const getDataCategorys = atom({
    key: 'getDataCategorys',
    default:{ id: '', name: '' },
    effects: [
         ({onSet,setSelf}) => {
            setSelf(cacheApi.getData())
            
            onSet((item)=>{
                console.log("item",item)
            })
           
        }
    ]
})



