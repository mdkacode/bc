
const asyncRedis = require("async-redis");
const clientdd = asyncRedis.createClient();
const fs = require('fs');
const ytResult = async (string,client)=>{

 
    fs.readFileSync('../vedio').forEach(e=>{
        console.log(e)
    })
       let vedioData =  await clientdd.get(string)



console.log(vedioData)
vedioData = JSON.parse(vedioData);
try {
    let prefix = "https://www.youtube.com/watch?v=";
    let ytArray = [];
    let itemData = vedioData.items;
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
 return vedioData;

}

module.exports = ytResult;