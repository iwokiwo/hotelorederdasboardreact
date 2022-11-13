import axios from 'axios.js'

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