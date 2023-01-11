import axios from 'axios.js'

export async function PutData(url, dataPut) {

  const response = await axios.put(url, dataPut, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}


export async function PutMultipartFormData(url, dataPost) {

  const formData = new FormData()
  Object.keys(dataPost).forEach((key) => {
    formData.append(key, dataPost[key])
  })

  const response = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=${dataPost.getBoundary()}',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}

export async function PutMultipartFormDataMultiFile(url, dataPost) {

  const formData = new FormData()
  Object.keys(dataPost).forEach((key) => {
    if(key === "multiFile"){
      dataPost['multiFile'].map(data=>{
        formData.append(key, data)
        
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


  const response = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=${dataPost.getBoundary()}',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;

}