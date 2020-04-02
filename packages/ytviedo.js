var YouTube = require('youtube-node');
const redis = require('redis');
const env = require('dotenv').config();
// const { PORT,REDISPORT } = env.parsed; // destructure env file here 
const client = redis.createClient(6379);
const childProcss = require("child_process");
var cron = require('node-cron');

var youTube = new YouTube();

youTube.setKey('AIzaSyDAg-eGqIn14em3HO34J9S9C8VwO7Dr9DQ');

const GetVedios = async (vedioString,length) =>{

    if (length >= 50) length = 49;
 
    await youTube.search(vedioString, length, function(error, result) {
        if (error) {
          console.log(error);
        }
        else {

            client.setex(vedioString,3600,JSON.stringify(result))
            let ytArray = [];
            let prefix = "https://www.youtube.com/watch?v=";
            console.log(result);
            result.items.map(e=>{
                e.id.videoId && ytArray.push({
                    title: e.snippet.title,
                    vedioUrl: `${e.id.videoId}`,
                    picture:e.snippet.thumbnails.high.url
                })
            })
            downloadVedios(ytArray);
        }
      });
}

cron.schedule('*/20 * * * *', () => {
    // GetVedios('Top Hindi Songs',40);
    // GetVedios('Top English Songs',40);
    GetVedios('punjabi songs,hd',40);
    // GetVedios('Top Party Songs',40);
    // GetVedios('Trending Vedios',40);


})

GetVedios('punjabi songs,hd',40);

const downloadVedios = async (ytArray)=> {

    await ytArray.forEach(async e=>{

        console.log(e.vedioUrl)
      childProcss.execSync(`youtube-dl -o vedio/${e.vedioUrl}.mp4 ${e.vedioUrl} --match-filter 'duration < 300'`, {stdio: 'inherit'})
    })

}


