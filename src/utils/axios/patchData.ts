import axios from "axios"

const patchData = async (url: string, data: any) => {
    await axios.patch(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
}

export default patchData;