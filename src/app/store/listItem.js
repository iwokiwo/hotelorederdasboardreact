import axios from 'axios.js'

import { selector } from 'recoil'

const dataItem = selector({
    key: 'data-product',

    get: async () => {
        let product = null;
       
        try {
            let {data} = await axios.post('/api/v1/product',{
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
            product ={product: data}
            console.log("lewat",product)
        } catch (error) {
            product=  {product: error}
        }

        return product
    }
})

export {dataItem}