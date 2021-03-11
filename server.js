const fs = require('fs');
const http = require('http');
const express = require('express');
const nodemon = require('nodemon');
const {JSDOM} = require('jsdom');
const CalendarUsage = require('./website/main')//contains all the Google apis and function to access them
////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Creates a HTTP server
const app = express();
app.use(express.static(`${__dirname}/website`));
app.get('/', function(req,res){
  res.sendFile(`${__dirname}/index.html`);
  
  });

  app.listen(3000);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//10 seconds delay between checks of the Calendar event list 
setInterval(()=>{
  CalendarUsage.EventList(CalendarUsage.oAuth2Client, true);
}, 10000);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//create an event using the webpage
//                       (auth,EventSummary,EventLocation,EventDescription,EventDate,StartTime,EndTime)
CalendarUsage.CreateEvent(CalendarUsage.oAuth2Client)