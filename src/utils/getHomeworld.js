import axios from "axios";

export async function getHomeWorld(planetUrl) {
    if (planetUrl == null){
        return;
    }
    var planetName;
    await axios.get(`${planetUrl}`)
        .then((response) => {
           planetName = response.data.name;
        })
    return planetName;
}