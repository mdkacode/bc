const TikTokScraper = require('tiktok-scraper');

let da;
const axios = require('axios').default;
const pull_request = async (length,client) =>{


  await client.get('hashtag', (error,data) => { 
          da = JSON.parse( data );
  });


  if (da)
  {
    console.log('get redis');

    return { data: da ?  da  : 'No Data Found',size:da ? da.length:0};
  }
  else {


    let data  =  await axios.request({
        url:'https://www.tiktok.com/share/item/list',
        method:'GET',
        params:{
            secUid:'',
            id:'',
            type:5,
            count:50,
            minCursor:0,
            maxCursor:0,
            region:"pk",
            shareUid:null,
            lang:'en',
        }   
    })
    let {itemListData} = data.data.body;
    client.setex('hashtag',300,JSON.stringify(get_proper_data(itemListData)))
    return { data: itemListData ? get_proper_data(itemListData) : 'No live Data Found',size:itemListData ? itemListData.length:0};
  }
    

    //  const correctData  = await get_proper_data(itemListData)
       


}

module.exports =  pull_request 

function get_proper_data (arrayList) {
    let tempArray = []

    arrayList.forEach(e=>{
      //  console.log(e);
     
        (e.itemInfos.text && e.itemInfos.video.urls[0]) && tempArray.push({
            title : e.itemInfos.text,
            vedioUrl:e.itemInfos.video.urls[0],
            picture: e.itemInfos.coversDynamic[0]
        })
    })
    
    return tempArray;
   
}