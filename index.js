
const express =  require ('express');
const env = require('dotenv').config();
var cors = require('cors')
const bodyparser = require('body-parser');
const App = express();
const responseTime = require('response-time')
const redis = require('redis');

const { PORT,REDISPORT } = env.parsed; // destructure env file here 
const client = redis.createClient(REDISPORT);
// use response-time as a middleware
App.use(responseTime());

//Local Import Start
const pull_request = require('./packages/pull_request')
//Local Import End

App.use(cors()) // enable cors
App.use(bodyparser.json()) // read POST api Body
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
  let data = await pull_request(req.query.item  || 10,client)
  res.send(data);
})


App.listen(PORT,()=> console.log(`HOLA !! Running on ${PORT} `))