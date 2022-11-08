import axios from 'axios.js'

import { selector } from 'recoil'

const dataCategory = selector({
    key: 'data-category',

    get: async () => {
        let category = null;
       
        try {
            let {data} = await axios.post('/api/v1/front/categories',{
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
                category ={category: data}
        } catch (error) {
            category=  {category: error}
        }

        return category
    }
})

export {dataCategory}