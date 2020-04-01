var YouTube = require('youtube-node');
const redis = require('redis');
const env = require('dotenv').config();

// const { PORT,REDISPORT } = env.parsed; // destructure env file here 
const client = redis.createClient(6379);
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
          console.log(JSON.stringify(result, null, 2));
        }
      });
}

cron.schedule('*/10 * * * *', () => {
    GetVedios('Top Hindi Songs',40);
    GetVedios('Top English Songs',40);
    GetVedios('Top Punjabi Songs',40);
    GetVedios('Top Party Songs',40);
    GetVedios('Trending Vedios',40);


})




