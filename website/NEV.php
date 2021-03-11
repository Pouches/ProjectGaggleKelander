<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
    function get_data(){
        $dataE = array();
        $dataE[] = array(
            'EventSummary'=>$_POST['newEventTitle'],
            'EventDate' => $_POST['newEventDate'],
            'StartTime'=>$_POST['newEventStat'],
            'EndTime'=>$_POST['newEventEnd'],
            'EventDescription'=>$_POST['newEventDescription'],
        );
        $name = 'newEventName';
        $filename = $name.'.json';
        if(file_put_contents(
            "$file_name",get_data())){
                echo $file_name.' created';
            }
        else{
            echo 'There is some error';
        }
    }
}
?>