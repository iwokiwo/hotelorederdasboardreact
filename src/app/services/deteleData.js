import axios from 'axios.js'

export async function DeleteData(url, dataPost) {

  const response = await axios.delete(`${url}${dataPost.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
  })
  const data = await response.data;

  return data;
}
