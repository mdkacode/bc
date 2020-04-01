
const express =  require ('express');
const env = require('dotenv').config();
var cors = require('cors')
const bodyparser = require('body-parser');
const App = express();
const responseTime = require('response-time')
const redis = require('redis');
var serveIndex = require('serve-index');
const { PORT,REDISPORT } = env.parsed; // destructure env file here 
const client = redis.createClient(REDISPORT);
const fs = require('fs')
// use response-time as a middleware
App.use(responseTime());

//Local Import Start
const pull_request = require('./packages/pull_request')
const ytResult = require('./packages/ytListApi');
//Local Import End

App.use(cors()) // enable cors
App.use(bodyparser.json()) // read POST api Body
App.use(express.static(__dirname + "/"))
App.use('/videos', serveIndex(__dirname + '/vedio/*'));
App.use('/',(req,res,next)=>{
    console.log(req.url);
    next()
})
App.get('/health',(req,res,next)=>{
    res.status(200).send({'API status':'OK'})
    next()
})

App.get('/vpost',async (req,res,next) =>{

   console.log(req.query)
  let data = await pull_request(req.query.item  || 10,client);
//   req.connection.setTimeout(60*10*1000)
  res.send(data);
})

App.get('/youtubeList',async (req,res,next) =>{

 let data = await ytResult((req.query.name || 'Top Hindi Songs'),client);
 res.send( data );
})


App.get('/serve',(req,res)=>{

  var video_id = '';
  if(req.query.name.includes("youtube"))
  {
    video_id = req.query.name.split('v=')[1];
  }
  else{
    video_id = req.query.name;
  }
  
  var path = `vedio/${video_id}.mp4`;
  var stat = fs.statSync(path);
  var total = stat.size;
  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }

})

App.listen(PORT,()=> console.log(`HOLA !! Running on ${PORT} `))