<?php
include_once "brixlog.inc";
include_once "brixlevel.inc";

brixloginit (__FILE__);
 
brixlog (__FILE__,__LINE__,__FUNCTION__."[debut]");
brixlog (__FILE__,__LINE__,__FUNCTION__."\$_GET".print_r($_GET,true));
brixlog (__FILE__,__LINE__,__FUNCTION__."\$_POST".print_r($_POST,true));

$filelevel = $_POST['filelevel'].".xml";

$hxml = initlevel ($filelevel);

appendLevelLn ($hxml, '<?xml version="1.0" encoding="UTF-8"?>');
appendLevel ($hxml, '<level>');
appendLevel ($hxml, '<grid>');


$precrow = "";

foreach ($_POST as $key => $value)
{
 if($key === "filelevel" || $key === "nextlevel")
    continue;
   
  list($row,$brick) = explode("_",$key,2);
  
  if($precrow !== $row)
    {
    if($precrow !== "")
       appendLevelLn ($hxml, '</row>');
   
     appendLevel ($hxml, "<row id=\"$row\">");
    }
  
  list($visible,$solidity) = explode(",",$value,2);
    
  appendLevelLn ($hxml, "<brick id=\"$brick\" visible=\"$visible\" solidity=\"$solidity\" ></brick>");  
   
  $precrow = $row;
  
}

appendLevel ($hxml, '</row>');
appendLevelLn ($hxml,'</grid>');
appendLevel ($hxml, '<nextlevels>');
appendLevel ($hxml, '<nextlevel>');
appendLevel ($hxml, $_POST['nextlevel']);
appendLevel ($hxml, '</nextlevel>');
appendLevelLn ($hxml,'</nextlevels>');
appendLevelLn ($hxml,'</level>');
	
closelevel ($hxml);

chmod (getLevelPath ()."/".$filelevel , 0666 );

brixlog (__FILE__,__LINE__,__FUNCTION__."[fin]");

echo "sauvegarde OK";
?>