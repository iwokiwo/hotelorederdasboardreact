import axios from 'axios.js'

import { atom, selector} from 'recoil'
import { pagination } from './Pagination'

export const dataUnit = selector({
    key: 'data-unit',

    get: async ({get}) => {
        let unit = null;

       const pages = get(pagination)

       console.log("page",pages)
        try {
            let {data} = await axios.post('/api/v1/product',{
                Page:pages.Page,
                Size:10,
                Sort:"created_at desc",
                Direction:"",
                Active:1,
                Stock :0
            },{
                headers: {
                  'Content-Type': 'application/json',
                  'Accept':'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }})
                unit ={unit: data}
        } catch (error) {
            unit=  {unit: error}
        }
        console.log("unit",unit)
        return unit
    }
})