//failed attemp at jquery
// $(function tableRefresh(){
//     var eventsList = [];
//     $.getJson('event.json',(data)=>{
//         $.each(data.events, (i,f)=>{
//             var tblRow = `<tr><td> ${f.summary}</td><td>${f.date}</td><td>${f.start}</td>${f.end}</td>${f.location}</td></tr>`;
//             $(tblRow).append.appendTo("#timeline tbody");
//         })
//     })
// })
// function loader(){
// tableRefresh();
// setInterval(function(){
//     tableRefresh();
//     console.log('table refresh')
// },10000)}
//Found on https://www.quora.com/How-do-I-load-a-true-JSON-file-using-pure-JavaScript
let EventSummary=[];
let EventDate=[];
let EventLocation=[];
let EventStart=[];
let EventEnd=[];
let loadJSON = (filePath, success, error)=>{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status ===200){
                if(success){
                    success(()=>{JSON.parse(xhr.responseJSON);
                    console.log(JSON.parse(xhr.responseJSON));
                });
                }else{
                    if(error){error(xhr);}
                }
            }
        }
    }
    xhr.open("GET",'events.json',true);
    xhr.send();
}
loadJSON();