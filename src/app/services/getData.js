import axios from 'axios.js'

export async function GetData(url, param) {
    const response = await axios.get(url, param, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
    const data = await response.data;
    return data;

}