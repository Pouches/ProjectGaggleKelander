const {google, GoogleApis} = require('googleapis');
const express = require('express');
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const keys = require('../keys/creds.json');
const { calendar } = require('googleapis/build/src/apis/calendar');
const ID = keys.CLIENT_ID;//stored in json
const SECRET = keys.CLIENT_SECRET;//stored in json
const REFRESH = keys.REFRESH_TOKEN;//stored in json
const REDIRECT = keys.REDIRECT_URI;//stored in json
const KEY = keys.API_KEY;//stored in json
const oAuth2Client = new google.auth.OAuth2(ID,SECRET,REDIRECT);
oAuth2Client.setCredentials({refresh_token:REFRESH});
async function EventList(auth){
    try{const accessToken = await oAuth2Client.getAccessToken();
    //console.log(accessToken);
    const Calendar = google.calendar({version:'v3', auth});
    //console.log(Calendar.calendarList.list());
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
EventList(oAuth2Client);