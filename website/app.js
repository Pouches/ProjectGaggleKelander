const {google, GoogleApis} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const keys = require('../keys/creds.json');
const { calendar } = require('googleapis/build/src/apis/calendar');
const ID = keys.CLIENT_ID;//stored in json
const SECRET = keys.CLIENT_SECRET;//stored in json
const REFRESH = keys.REFRESH_TOKEN;//stored in json
const REDIRECT = keys.REDIRECT_URI;//stored in json
const oAuth2Client = new google.auth.OAuth2(ID,SECRET,REDIRECT);
oAuth2Client.setCredentials({refresh_token:REFRESH});
async function EstabConnection(){
    try{
    const accessToken = await oAuth2Client.getAccessToken();
    const calendar = google.calendar({version :'v3', auth});
    calendar.events.list({
        calendarId:'primary',
        timeMin:(new Date().toIsoString()),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err ,res)=>{
        if(err) return console.log('The API returned an error:'+err);
        const events = res.data.items;
        if(events.length){
            console.log('Upcming 10 events:');
            events.map((event, i)=>{
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            })
        }
        else{
            console.log('No upcoming events found')
        }
    })
    }
    catch(error){return error};
}
EstabConnection();