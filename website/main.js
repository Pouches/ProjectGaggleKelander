//Created By Cade Brown, on 03/07/2021 at 1:04pm    
//Project: Create a website and javascript(in nodeJS) to connect to google calendar for display, creation, and deletion of events
const {google, GoogleApis} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const keys = require('../keys/creds.json');
const { calendar } = require('googleapis/build/src/apis/calendar');
const fs=require('fs');
const { isBuffer } = require('util');
// const {JSDOM} = require('jsdom');
// const dom = new JSDOM(``,{
//   url: "localhost:3000",
//   referrer: "localhost:3000",
//   contentType: "text/html",
//   includeNodeLocations: true,
//   storageQuota: 10000000});
const ID = keys.CLIENT_ID;//stored in json
const SECRET = keys.CLIENT_SECRET;//stored in json
const REFRESH = keys.REFRESH_TOKEN;//stored in json
const REDIRECT = keys.REDIRECT_URI;//stored in json
const KEY = keys.API_KEY;//stored in json
const oAuth2Client = new google.auth.OAuth2(ID,SECRET,REDIRECT);
oAuth2Client.setCredentials({refresh_token:REFRESH});
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
  _      _     _     ______               _       
 | |    (_)   | |   |  ____|             | |      
 | |     _ ___| |_  | |____   _____ _ __ | |_ ___ 
 | |    | / __| __| |  __\ \ / / _ \ '_ \| __/ __|
 | |____| \__ \ |_  | |___\ V /  __/ | | | |_\__ \
 |______|_|___/\__| |______\_/ \___|_| |_|\__|___/
*/
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Lists next 10 upcoming events
function EventList(auth){
  let events2=[];
  console.log(`running event list\n`);
  fs.writeFileSync(`${__dirname}/events.json`,'',(err)=>{
    if(err){return err}
  })
  let eventAmount =0;
    let StoredEventTitle =[];
    let StoredEventDescription =[];
    let StoredEventDate = [];
    let StoredEventStart=[];
    let StoredEventEnd=[];
    let StoredEventLocation = [];
    let StoredEventId=[];
    try{const accessToken = oAuth2Client.getAccessToken();
        const Calendar = google.calendar({version:'v3', auth});
        let TimeCardTemplate = [];
        Calendar.events.list({
          calendarId:'cadebrown1776@gmail.com',
          timeMin:(new Date()).toISOString(),
          maxResults:10,
          singleEvents:true,
          orderBy:'startTime',
          key:KEY,
          timeZone: 'America/Phoenix'
        },(err,res2)=>{
                if(err){ console.log('The API returned an error:'+ err);}
                const events = res2.data.items;
                if(events.length){
                    if(events.length==1){console.log('Upcoming event:');
                    events.map((event, i)=>{
                        const start = event.start.dateTime||event.start.date;
                        // console.log(`${start}-${event.summary}`);
                        // console.log(`Event Location:${event.location}`);
                        // console.log(`Event Summary:${event.summary}`);
                        // console.log(`Event Description:${event.description}`);
                        // console.log(`Event Date/time${event.start.dateTime}`);
                        // console.log(`Event End${event.end.dateTime}`)
                        // console.log(`Event ID${event.id}\n------------------------------------------------------`);
                        StoredEventTitle.push(event.summary);
                        StoredEventDescription.push(event.description);
                        StoredEventDate.push(event.start.dateTime.slice(0,10)); 
                        StoredEventLocation.push(event.location);
                        StoredEventId.push(event.id);
                        StoredEventStart.push(event.start.dateTime.slice(11,19));
                        StoredEventEnd.push(event.end.dateTime.slice(11,19));
                        eventAmount++;
                        console.log(eventAmount);
                      });}
                    else if(events.length >=1){console.log('Upcoming '+events.length+' events:');
                    events.map((event, i)=>{
                        const start = event.start.dateTime||event.start.date;
                        // console.log(`${start}-${event.summary}`);
                        // console.log(`Event Location:${event.location}`);
                        // console.log(`Event Summary:${event.summary}`);
                        // console.log(`Event Description:${event.description}`);
                        // console.log(`Event Date/time${event.start.dateTime}`);
                        // console.log(`Event ID${event.id}\n------------------------------------------------------`);
                        // console.log(event.start.dateTime)
                        StoredEventTitle.push(event.summary);
                        StoredEventDescription.push(event.description);
                        StoredEventDate.push(event.start.dateTime.slice(0,10)); 
                        StoredEventLocation.push(event.location);
                        StoredEventId.push(event.id);
                        StoredEventStart.push(event.start.dateTime.slice(11,19));
                        StoredEventEnd.push(event.end.dateTime.slice(11,19));
                        eventAmount++;
                        console.log(eventAmount);
                      });}
                      for(let i=0; i<=eventAmount-1;i++){
                        if(eventAmount!=1){
                          if(i==0){
                            fs.appendFileSync(`${__dirname}/events.json`,(`{\n"events":[\n{"summary":"${StoredEventTitle[i]}",\n"date":"${StoredEventDate[i]}",\n"start":"${StoredEventStart  [i]}",\n"end":"${StoredEventEnd[i]}",\n"location":"${StoredEventLocation[i]}"\n},\n`),(err)=>{if(err){return error}})
                          }
                          else if(i!=eventAmount-1&&i!=0){
                            fs.appendFileSync(`${__dirname}/events.json`,(`{"summary":"${StoredEventTitle[i]}",\n"date":"${StoredEventDate[i]}",\n"start":"${StoredEventStart [i]}",\n"end":"${StoredEventEnd[i]}",\n"location":"${StoredEventLocation[i]}"\n},\n`),(err)=>{if(err){return error}})
                          }
                          else if(i==eventAmount-1){
                            fs.appendFileSync(`${__dirname}/events.json`,(`{"summary":"${StoredEventTitle[i]}",\n"date":"${StoredEventDate[i]}",\n"start":"${StoredEventStart [i]}",\n"end":"${StoredEventEnd[i]}",\n"location":"${StoredEventLocation[i]}"\n}\n]\n}`),(err)=>{if(err){return error}})
                          }
                        }
                          else{//if there is only 1 event
                            fs.appendFileSync(`${__dirname}/events.json`,(`{\n"events":[{"summary":"${StoredEventTitle[i]}",\n"date":"${StoredEventDate[i]}",\n"start":"${StoredEventStart [i]}",\n"end":"${StoredEventEnd[i]}",\n"location":"${StoredEventLocation[i]}"\n}\n]\n}`),(err)=>{if(err){return error}})
                          }
                      }
                    }
                else{console.log('No upcoming events found')}});}
            catch(error){return error;}
            // res.send(()=>{StoredEvents.forEach(element => {
            //   element.replace('timeline', element+"\ntimeline")
            // });})
}         
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
   _____                _         ______               _       
  / ____|              | |       |  ____|             | |      
 | |     _ __ ___  __ _| |_ ___  | |____   _____ _ __ | |_ ___ 
 | |    | '__/ _ \/ _` | __/ _ \ |  __\ \ / / _ \ '_ \| __/ __|
 | |____| | |  __/ (_| | ||  __/ | |___\ V /  __/ | | | |_\__ \
  \_____|_|  \___|\__,_|\__\___| |______\_/ \___|_| |_|\__|___/
*/
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Creates a new event            
async function CreateEvent(auth,EventSummary = "No Summary given",EventLocation = "No location given",EventDescription = "No location given",EventDate = new Date().toISOString(),StartTime = "00:00:00",EndTime = "00:00"){
    try{const accessToken = await oAuth2Client.getAccessToken();
      //Variables that are connected to the website
      var Event = {
        'summary': `${EventSummary}`,
        'location': `${EventLocation}`,
        'description': `${EventDescription}`,
        'start': {
          'dateTime':`${EventDate}T${StartTime}:00-${StartTime}`,
          'timeZone': 'America/Phoenix'},
        'end': {
            'dateTime':`${EventDate}T${EndTime}:00-${EndTime}`,
            'timeZone': 'America/Phoenix'},
        }
        const Calendar = google.calendar({version:'v3', auth});
        Calendar.events.insert({
            calendarId:'cadebrown1776@gmail.com',
            key:KEY,
            resource: Event
        },function(err, event){
            if(err){console.log(err)};
            console.log(`Event created: ${event}`);
        })
    }
    catch(error){return error;}}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Deletes an event
async function DeleteEvent(auth){
  try{const accessToken = await oAuth2Client.getAccessToken
      const Calendar = google.calendar({version:'v3', auth});
      Calendar.events.delete({
          calendarId:'cadebrown1776@gmail.com',
          key:KEY,
      })
  }
  catch(error){return error;}}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CreateEvent(oAuth2Client);EventList(oAuth2Client);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Export Center
exports.EventList = EventList;
exports.CreateEvent = CreateEvent;
exports.oAuth2Client = oAuth2Client;
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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





function getCalendarInfo(res, data) {
  let output = [];
  let pageInput = [];
    let rowTemplete = <tr>
    <td>Event Name</td>
    <td>Description</td>
    <td>Event Start Date</td>
    <td>Event End Date</td>
    <td>Event Location</td>
    <td>Status</td>
    <td>Creator</td>
</tr>;
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(new Date().setHours(0,0,0))).toISOString(),
    timeMax:(new Date(new Date().setHours(23,59,59,0))).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, sult) => {
    if (err) throw console.log('The API returned an error: ' + err);
    const events = sult.data.items;
    if (events.length) {
      events.map((event, i) => {
        output.push(event);
      });
      //console.log(output);
      output.forEach(selectedEvent => {
        let temp = rowTemplete;
        temp = temp.replace("Event Name", selectedEvent.summary);
        temp = temp.replace("Description", selectedEvent.description);
        temp = temp.replace("Event Start Date", new Date(selectedEvent.start.dateTime).toLocaleTimeString());
        temp = temp.replace("Event End Date", new Date(selectedEvent.end.dateTime).toLocaleTimeString());
        temp = temp.replace("Event Location", selectedEvent.location);
        temp = temp.replace("Status", selectedEvent.status);
        temp = temp.replace("Creator", selectedEvent.creator.email);
        pageInput.push(temp);
      });
      data = data.replace(`^/^input^/^`, pageInput);
      res.send(data);
      return
    } else {
      data = data.replace(`^/^input^/^`, <tr>
      <td>no</td>
      <td>events</td>
      <td>for</td>
      <td>a</td>
      <td>while,</td>
      <td>good</td>
      <td>job</td>
  </tr>);
      res.send(data);
    }
  });

}
*/