import axios from 'axios.js'

export async function GetData(url, param) {
    console.log("param",param)
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

export async function GetDataPagination(url, param) {
    const response = await axios.post(url, param, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
    const data = await response.data;
    return data;

}
