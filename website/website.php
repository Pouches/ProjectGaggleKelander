<?php
//load the json
$string = file_get_contents('events;json');
$decode = json_decode($string, true);
echo $decode;
//arrays to store json info
$summaries = array();
$dates = array();
$starttime = array();
$endtime = array();
$location = array();
//--------------------------------------------------------------------------------------------------------------------
//loads the HTML document
$indexPage = new DOMDocument();
$indexPage->loadHTMLFile('index.html');
//--------------------------------------------------------------------------------------------------------------------
//Gets parent node
$table = $indexPage->getElementById('timelineBody');
//--------------------------------------------------------------------------------------------------------------------
//creates the child element

?>