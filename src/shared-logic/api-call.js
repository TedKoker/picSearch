import axios from 'axios'

const config = {
    adress: "https://pixabay.com/api/",
    apiKey: "19861954-ae9b65d828f6ad091ad5cb99c",
    per_page: "50"
}

export async function loadPics(q, page) {
    const {adress, apiKey, per_page} = config
    let res
    // await axios.get(`${adress}?key=${apiKey}&q=${q}&per_page=${per_page}&page=${page}`).then(resp => {
    //     res = resp.data.hits
    // })

    

    return axios.get(`${adress}?key=${apiKey}&q=${q}&per_page=${per_page}&page=${page}`)
}