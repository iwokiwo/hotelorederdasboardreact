import { GetData } from 'app/services/getData'
import axios from 'axios.js'

import { atom, selector } from 'recoil'
import { reload } from './Controls'
import { urlCategory } from 'app/utils/constant'
import { pagination } from './Pagination'

export const dataCategory = atom({
    key: 'dataCategory',
    default: { id: '', name: '' }
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