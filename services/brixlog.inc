<?php
function getLogPath ()
{ 
return dirname (dirname (__FILE__))."/logs"; 
}


function brixloginit($script)
{
$time = date('Y-m-d h:i:s');
$file_log = str_replace ("php","",basename ($script));

if ($file_log == "")
    $file_log = "brixlog";
  
$hlog = fopen(getLogPath ()."/".$file_log."log", "a");

if ($hlog == false)
    echo __FILE__." [".getLogPath ()."/".$file_log."log]";

$line .= $time."##############################################################\r\n";

fwrite ($hlog ,$line,strlen ($line)); 
	
fclose($hlog);
}

function brixlog($script,$linenumber,$msg)
{

$time = date('Y-m-d h:i:s');
$file_log = str_replace ("php","",basename ($script));

if ($file_log == "")
    $file_log = "brixlog";
  
$hlog = fopen(getLogPath ()."/".$file_log."log", "a");

$line .= $time." ".$script." Line : $linenumber\r\n";
$line .= $time." ".$msg."\r\n";

fwrite ($hlog ,$line,strlen ($line)); 
	
fclose($hlog);
}

?>