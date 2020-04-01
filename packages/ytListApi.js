
const asyncRedis = require("async-redis");
const clientdd = asyncRedis.createClient();
let da;
const ytResult = async (string,client)=>{
let newDd = '';
    console.log( string )
let newD = '';
       let da =  await clientdd.get(string)



console.log(da)
da = JSON.parse(da);
try {
    let prefix = "https://www.youtube.com/watch?v=";
    let ytArray = [];
    let itemData = da.items;
    itemData.map(e=>{
        e.id.videoId && ytArray.push({
            title: e.snippet.title,
            vedioUrl: `${prefix}${e.id.videoId}`,
            picture:e.snippet.thumbnails.high.url
        })
    })

   
    return  {length:ytArray.length, data:ytArray};
} catch (error) {
    
}
 return da;

}

module.exports = ytResult;