import axios from 'axios.js'
const FormData = require('form-data');

export async function PostData(url, dataPost) {
  const response = await axios.post(url, dataPost, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}

export async function PostMultipartFormData(url, dataPost) {

  const formData = new FormData()
  Object.keys(dataPost).forEach((key) => {
    formData.append(key, dataPost[key])
  })
  
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=${dataPost.getBoundary()}',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}

export async function PostMultipartFormDataMultiFile(url, dataPost) {

  const formData = new FormData()
  Object.keys(dataPost).forEach((key) => {
    if(key === "multiFile"){
      dataPost['multiFile'].map(data=>{
        const newName = new Date().getTime() + data.name;  
        formData.append(key, data, newName)
        
      })
      return
    }
    if(key === "multiFileDelete"){
      dataPost['multiFileDelete'].map(data=>{
        formData.append(key, data)
        
      })
      return
    }
    formData.append(key, dataPost[key])
  })
  
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=${dataPost.getBoundary()}',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}
