//Created By Cade Brown, on 03/07/2021 at 1:04pm    
//Project: Create a website and javascript(in nodeJS) to connect to google calendar for display, creation, and deletion of events
const {google, GoogleApis} = require('googleapis');
const express = require('express');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const keys = require('../keys/creds.json');
const { calendar } = require('googleapis/build/src/apis/calendar');
const ID = keys.CLIENT_ID;//stored in json
const SECRET = keys.CLIENT_SECRET;//stored in json
const REFRESH = keys.REFRESH_TOKEN;//stored in json
const REDIRECT = keys.REDIRECT_URI;//stored in json
const KEY = keys.API_KEY;//stored in json
const oAuth2Client = new google.auth.OAuth2(ID,SECRET,REDIRECT);
oAuth2Client.setCredentials({refresh_token:REFRESH});
//------------------------------------------------------------------------------------------------------------------------------------------
//Lists next 10 upcoming events
async function EventList(auth){
    try{const accessToken = await oAuth2Client.getAccessToken();
        const Calendar = google.calendar({version:'v3', auth});
        Calendar.events.list({
          calendarId:'cbrown199@west-mec.org',
          timeMin:(new Date()).toISOString(),
          maxResults:10,
          singleEvents:true,
          orderBy:'startTime',
          key:KEY,
        },(err,res)=>{
                if(err)return console.log('The API returned an error:'+ err);
                const events = res.data.items;
                if(events.length){
                    if(events.length==1){console.log('Upcoming event:');
                    events.map((event, i)=>{
                        const start = event.start.dateTime||event.start.date;
                        console.log(`${start}-${event.summary}`);
                    });}
                    else if(events.length >=1){console.log('Upcoming '+events.length+' events:');
                    events.map((event, i)=>{
                        const start = event.start.dateTime||event.start.date;
                        console.log(`${start}-${event.summary}`);
                    });}
                }
                else{console.log('No upcoming events found')}});}
            catch(error){return error;}}
//------------------------------------------------------------------------------------------------------------------------------------------
//Creates a new event            
async function CreateEvent(auth){
    try{const accessToken = await oAuth2Client.getAccessToken();
      
        const Calendar = google.calendar({version:'v3', auth});
        Calendar.events.insert({
            calendarId:'cbrown199@west-mec.org',
            key:KEY,
            resource: Event
        },function(err, event){
            if(err){console.log(err)};
            console.log(`Event created: ${event}`);
        })
    }
    catch(error){return error;}}
//------------------------------------------------------------------------------------------------------------------------------------------
//Deletes an event
async function DeleteEvent(auth){
  try{const accessToken = await oAuth2Client.getAccessToken
      const Calendar = google.calendar({version:'v3', auth});
      Calendar.events.delete({
          calendarId:'cbrown199@west-mec.org',
          key:KEY,
      })
  }
  catch(error){return error;}}
//------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------
// CreateEvent(oAuth2Client);
  EventList(oAuth2Client);
//------------------------------------------------------------------------------------------------------------------------------------------
//Export Center
exports.EventList = EventList;
exports.CreateEvent = CreateEvent;
exports.oAuth2Client = oAuth2Client;
//------------------------------------------------------------------------------------------------------------------------------------------
/*Note book
function skeleton:

async function Name(auth){
    try{const accessToken = await oAuth2Client.getAccessToken
        const Calendar = google.calendar({version:'v3', auth});
        Calendar.something.somethingElse({
            calendarId:'cbrown199@west-mec.org',
            key:KEY,
        })
    }
    catch(error){return error;}}


    calendar event, taken from google's website resource https://developers.google.com/calendar/create-events#node.js :
    var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

        var Event = {
          'summary': 'Test',
          'location': 'West-MEC NEC',
          'description': 'I am creating a new event via powershell',
          'start': {
            'dateTime':'2021-03-10T09:00:00-16:00:00',
            'timeZone': 'America/Phoenix'},
          'end':{
            'dateTime': '2021-03-10T09:00:00-16:00:00',
            'timeZone':'America/Phoenix'}
        }
        var event = {
          'summary': 'Google I/O 2015',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime':'2021-03-10T09:00:00-16:00:00',
            'timeZone': 'America/Phoenix'},
          'end':{
            'dateTime': '2021-03-10T09:00:00-16:00:00',
            'timeZone':'America/Phoenix'}};
*/