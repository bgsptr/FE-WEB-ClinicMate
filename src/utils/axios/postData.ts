import axios from "axios"

const postData = async (url: string, body: any) => {
    await axios.post(url, JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

export default postData;