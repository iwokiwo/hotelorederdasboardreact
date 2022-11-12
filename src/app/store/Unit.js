import { PostData } from 'app/services/postData'
import { urlUnit } from 'app/utils/constant'
import axios from 'axios.js'
import { isEmpty } from 'lodash'



import { atom, selector} from 'recoil'
import { openMessage } from './Controls'
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
        console.log("lewat getData")
        const pages = get(openMessage)
        try {
            await PostData(urlUnit, pagination).then((value) =>
                unit = { unit: value }
            )
        } catch (error) {
          
            unit=  {unit: []}
            console.log("unit",unit)
        }
        console.log("unit",unit)
        return unit
    }
})

export const createDataUnit = selector({
    key: 'createDataUnit',

    get: async ({get}) => {
        let units = null;
       
        const datas = get(dataUnit)
        console.log("lewat create",datas)
        if(!isEmpty(datas.name)){
            console.log("lewat create2",datas)
        try {
            let {data} = await axios.post('/api/v1/unit/create',datas,{
                headers: {
                  'Content-Type': 'application/json',
                  'Accept':'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }})
                units ={units: data}
        } catch (error) {
            units=  {units: error}
         
        }
        console.log("unit",units)
        return units
        }
    }
})