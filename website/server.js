const fs = require('fs');
const http = require('http');
const CalendarUsage = require('./main')//contains as the Google apis and function to access them
////------------------------------------------------------------------------------------------------------------------------------------------
//Creates a HTTP server
const server = http.createServer((req,res)=>[
    res.writeHead(200, {'content-type':'text/html'}),
    fs.createReadStream('index.html').pipe(res)
  ]);
  server.listen(process.env.PORT||3000);
//------------------------------------------------------------------------------------------------------------------------------------------
//10 seconds delay between checks of the Calendar event list 
setInterval(()=>{
  CalendarUsage.EventList(CalendarUsage.oAuth2Client);
}, 10000);