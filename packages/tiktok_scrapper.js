const asyncRedis = require("async-redis");
const clientdd = asyncRedis.createClient();
const childProcss = require("child_process");






childProcss.execSync(`tiktok-scraper user mr_faisu_07  -n 100 -d -t json`, {stdio: 'inherit'})

