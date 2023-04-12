import axios from "axios";

export async function getContent(urlList) {
    let list = [];
    for (let i = 0; i < urlList.length; i++) {
        await axios.get(`${urlList[i]}`)
            .then((response) => {
                list.push(response.data);
            })
    }
    return list;
}