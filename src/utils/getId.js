export function getId(url, type){
    var id = url.split(`https://swapi.dev/api/${type}/`).toString();
    id = id.replace(/[,/]/g,'');
    return id
}
