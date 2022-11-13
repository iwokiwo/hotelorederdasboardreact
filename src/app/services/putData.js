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