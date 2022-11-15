import { GetData } from 'app/services/getData'
import axios from 'axios.js'

import { atom, selector } from 'recoil'
import { urlCategory } from 'app/utils/constant'
import { pagination } from './Pagination'

export const dataCategory = atom({
    key: 'dataCategory',
    default: { id: '', name: '' }
})

export const dataHeadCall = atom({
    key: 'dataHeadCall',
    default:  [
        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]
})

export const getDataCategory = selector({
    key: 'getDataCategory',

    get: async ({get}) => {
        let category = null;
        get(dataCategory)
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