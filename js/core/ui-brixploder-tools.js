$(document).ready (
function ()
 {
 jQuery.fn.exists = function(){return (jQuery(this).length>0);};

 $.BreakerAutoId = 1;
 
 jQuery.fn.generateBreakerAutoId=function (){
    
    if ($(this).attr('id'))
       return $(this).attr('id',$(this).attr('id') + jQuery.BreakerAutoId++);
      else
        return $(this);
    };
  
 $.GetUrlCompatibleXml= function (fileurl)
{
var myCompatibleXML;

jQuery.ajax({
    type: "GET",
    url: fileurl,
    dataType: ($.browser.msie) ? "text" : "xml",
    cache:false,
    async:false,
    success: function(data, textStatus, xhr) { 

     
     if (typeof data == "string") {
       myCompatibleXML = new ActiveXObject("Microsoft.XMLDOM");
       //alert(typeof myCompatibleXML);
       myCompatibleXML.async = false;
       
        myCompatibleXML.loadXML(data);
     
        if (myCompatibleXML.xml == '')
            alert('Erreur chargement parsing config fileurl [' + fileurl + '] [' + myCompatibleXML.xml + ']' );

       
          
     }
     else 
       myCompatibleXML = data;
     

     
     },
     error:function ()
     {
     alert('erreur CompatibleXml'); 
     }
  }); //fin ajax
                 
 return myCompatibleXML;
};
 
  
  
  
  
  
 });//fin ready
