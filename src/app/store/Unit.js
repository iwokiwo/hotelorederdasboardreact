import axios from 'axios.js'

import { selector } from 'recoil'


export const dataUnit = selector({
    key: 'data-unit',

    get: async () => {
        let unit = null;
       
        try {
            let {data} = await axios.post('/api/v1/front/unit',{
                Page:1,
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

        return unit
    }
})