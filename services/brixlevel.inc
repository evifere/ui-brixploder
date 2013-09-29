<?php
function getLevelPath ()
{ 
return dirname (dirname (__FILE__))."/levels"; 
}

function initlevel  ($filelevel)
{
return fopen(getLevelPath ()."/".$filelevel, "w");
}

function appendLevelLn($hxml,$line)
{
 appendLevel($hxml,$line."\r\n"); 
}

function appendLevel($hxml,$line)
{
 fwrite ($hxml ,$line,strlen ($line)); 
}

function closelevel  (&$hxml)
{
fclose($hxml);
}

?>