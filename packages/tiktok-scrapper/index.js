const TikTokScraper = require('tiktok-scraper');
const asyncRedis = require("async-redis");
const clientdd = asyncRedis.createClient();
const cron = require('node-cron');

(async () => {
    try {
        const posts = await TikTokScraper.user('USERNAME', { number: 100 });
        console.log(posts);
    } catch (error) {
        console.log(error);
    }
})();


const trendsHashCheck = async ( trendCheck,count=50 ) => {
    try {
        let hashtagArray = [];
        const posts = await TikTokScraper.hashtag( trendCheck, { number: count  });
        posts.collector.forEach(element => {
            hashtagArray.push({ title: element.text,picture: element.imageUrl, vedioUrl:element.videoUrl})
        });
        clientdd.lpush( "tiktokList",JSON.stringify(hashtagArray) );
        console.log(' !!Scrapping done !!')
    } catch (error) {
        console.log(error);
    }
};

cron.schedule('*/30 * * * *', () => {
    trendsHashCheck('funny',500);
    trendsHashCheck('hindi',100);
    trendsHashCheck('hindiFunny',100);
    trendsHashCheck('songs',100);
    trendsHashCheck('modi',100);
    trendsHashCheck('indianArmy',100);
    trendsHashCheck('trumpFunny',100);
});

cron.schedule('0 4 * * *', () => {
    trendsHashCheck('goodMorning',400);
    console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  cron.schedule('0 20 * * *', () => {
    trendsHashCheck('goodNight',400);
    console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });


  trendsHashCheck('funny',50);
  trendsHashCheck('modi',50);
  trendsHashCheck('lockDown',50);