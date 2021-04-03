const fs = require('fs');
const http = require('http');
const express = require('express');
// const {JSDOM} = require('jsdom');
const bodyParser = require('body-parser');
const CalendarUsage = require('./website/main');//contains all the Google apis and function to access them
const { calendar } = require('googleapis/build/src/apis/calendar');
const port=80;
const hostname='127.0.0.1';
////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Creates a HTTP server
const app = express();
app.use(express.static(`${__dirname}/website`));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/website/index.html', function(req,res){
  //This is what you had wanted to look at
  fs.readFile('/website/index.html',(err,data)=>{
    //CalendarUsage.EventList(CalendarUsage.oAuth2Client, res,data);
    CalendarUsage.EventList(CalendarUsage.oAuth2Client);
  });
  res.end();

})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//10 seconds delay between checks of the Calendar event list 
 setInterval(()=>{
   CalendarUsage.EventList(CalendarUsage.oAuth2Client);
 }, 10000);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//create an event using the webpage
//Retrieves the form info
app.post('/create_event', (req,res)=>{
    let NewEventSummary = req.body.newEventTitle;
    let NewEventDate = req.body.newEventDate;
    let NewEventStart = req.body.newEventStart;
    let NewEventEnd = req.body.newEventEnd;
    let NewEventDescription = req.body.newEventDescription;
    let NewEventLocation = req.body.newEventLocation;
  //                       (auth,EventSummary,EventLocation,EventDescription,EventDate,StartTime,EndTime)
  CalendarUsage.CreateEvent(CalendarUsage.oAuth2Client, NewEventSummary,NewEventLocation,NewEventDescription,NewEventDate,NewEventStart,NewEventEnd);
  res.sendFile(`${__dirname}/website/index.html`);});
//
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});