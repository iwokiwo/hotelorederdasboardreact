import { pagination } from 'app/store/Pagination';
import axios from 'axios.js'
import { useRecoilState } from 'recoil';

export async function GetDataWithPagination(url) {
  
    console.log("url",url)
    const [paginationState, setPaginationState] = useRecoilState(pagination)
    
//     const response =  await axios.post(url, {
//         // Page:paginationState.Page,
//         // Size:paginationState.Size,
//         // Sort:paginationState.Sort,
//         // Direction:"",
//         // Active:paginationState.Active,
//         // Stock :paginationState.Stock
//         Page:1,
//         Size:10,
//         Sort:"created_at desc",
//         Direction:"",
//         Active:1,
//         Stock :0
//     },{
//      headers: {
//        'Content-Type': 'application/json',
//        'Accept':'application/json',
//        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
//      },
//    })

//    console.log("url",response)
//    const data = await response.data.Data;
   
//      return data;
const response = await axios.post('/api/v1/front/unit',{
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data =  response.data.Data;
  console.log("url",data)
    return data;

   
}