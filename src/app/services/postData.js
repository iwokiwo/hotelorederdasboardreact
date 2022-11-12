import axios from 'axios.js'

export async function PostData(url,dataPost) {
    console.log(dataPost)
    const response = await axios.post(url,dataPost, {
     headers: {
       'Content-Type': 'application/json',
       'Accept':'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     },
   })
   const data = await response.data;
    console.log("post respon data", data)
     return data;
   
   }