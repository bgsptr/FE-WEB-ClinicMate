import axios from "axios"

const fetchData = async (url: string) => {
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })

    return res.data;
}

export default fetchData;