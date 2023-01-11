import { GetData } from 'app/services/getData'
import { PostData } from 'app/services/postData'
import { urlUnit } from 'app/utils/constant'
import axios from 'axios.js'
import { isEmpty } from 'lodash'



import { atom, selector, selectorFamily, useRecoilState} from 'recoil'
import { openMessage, reload } from './Controls'
import { pagination } from './Pagination'

// export const dataUnit = selector({
//     key: 'data-unit',

//     get: async ({get}) => {
//         let unit = null;

//        const pages = get(pagination)

//        console.log("page",pages)
//         try {
//             let {data} = await axios.post('/api/v1/product',{
//                 Page:pages.Page,
//                 Size:10,
//                 Sort:"created_at desc",
//                 Direction:"",
//                 Active:1,
//                 Stock :0
//             },{
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Accept':'application/json',
//                   'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
//                 }})
//                 unit ={unit: data}
//         } catch (error) {
//             unit=  {unit: error}
//         }
//         console.log("unit",unit)
//         return unit
//     }
// })


export const dataUnit = atom({
    key: 'dataUnit',
    default: { id: '', name: '' }
})

export const getDataUnit = selector({
    key: 'getDataUnit',

    get: async ({get}) => {
      
        let unit = null;
       
        console.log("lewat getData", openMessage)

        get(reload)
        try {
            await GetData(urlUnit, pagination).then((value) =>
                unit = { unit: value }
            )
        } catch (error) {
          
            unit=  {unit: []}
           // console.log("unit",unit)
        }
       // console.log("unit",unit)
        return unit
    }
})

export const createDataUnit = selectorFamily({
    key: 'createDataUnit',

    get: (data) => async () => {
        console.log("leawt create")
        let units = null;
 
        try {
            await PostData(urlUnit, data).then((value) =>
                units = { units: value }
            )
        } catch (error) {
            units = { units: error }

        }
     //   console.log("unit", units)
        return units
    }

})