import axios from 'axios.js'

import { selector } from 'recoil'

const dataItem = selector({
    key: 'data-product',

    get: async () => {
        let product = null;
       
        try {
            let {data} = await axios.get('/product')
            product ={product: data}
            console.log("lewat",product)
        } catch (error) {
            product=  {product: error}
        }

        return product
    }
})

export {dataItem}