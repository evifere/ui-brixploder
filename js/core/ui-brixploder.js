$(document).ready (
function ()
 {
   $.blogon = false;

  
  $.fn.blog = function (idinfo,msg,br)
  {
  if ($.blogon == false)
      return true;
   
  if( $(this).find('#' + idinfo).length > 0)
      $(this).find('#' + idinfo).html(msg);
  else
     {
     $(this).append($('<span>' + msg + '</span>').attr('class','logline').attr('id',idinfo)); 
     
     if (br === true)
         $(this).append($('<br/>')); 
     
     }
  }
  
  $.fn.addBrick = function (X,Y,myUI,row,col,solidity)
  { 

   
  if(X < 1 || Y < 1) 
     return $(this);
    

  myUI.options.bricks++;
   
  return $(this).append($('<div></div>').brixploderbrick(
   {
    X:X,
    Y:Y,
    row:row,
    col:col,
    height:myUI.options.brickheight,
    width:myUI.options.brickwidth,
    toplimit:myUI.options.bartop,
    solidity:solidity,
    onBrickDestroyed:function (brickEvent,brickUI)
    {
     myUI.options.bricks--;
     myUI.self._trigger("onVerifyEndOfLevel", null,myUI);
     
  
    }
   }));

         
  };
  
  $.getCol = function (X,myUI)
  {
   return Math.floor((X + 2) / (myUI.options.brickwidth + 4));
  }
  

  $.calcY = function (Y,myUI)
  {
  return ((Y) *  (myUI.options.brickheight + 4)) + 1;    
  };
  
  $.fn.calcY = function (myUI)
  {
  return $.calcY($(this).attr('id'),myUI);    
  };
  
  
  $.restoreRow = function (X,myUI)
  {
  return Math.floor((X /  (myUI.options.brickwidth + 4))) - 1;    
  }
  
  $.calcX = function (X,myUI)
  {
  return (X *  (myUI.options.brickwidth + 4)) + 1;    
  }
  
  $.fn.calcX = function (myUI)
  {
  return $.calcX($(this).attr('id'),myUI);        
  }
  

  
  $.fn.isFull = function ()
  {
  return ($(this).attr('full')) ? eval ($(this).attr('full')) : false; 
   
  }
  
  $.fn.isEmpty = function ()
  {
  return ($(this).attr('empty')) ? eval ($(this).attr('empty')) : false;  
  }
  
  $.widget("ui.brixploder", {
      
     options:{
      generator:false,
      bricks:0,  
      
      barwidth:80,
      barheight:12,      
      bartop:450,
      barleft:100,
      
      ballwidth:6,
      balltop:400,
      ballleft:100,
      brickwidth:20,
      brickheight:12,
      
      gridwidth:360,
      gridheight:500,
      gridleft:50,
      gridtop:50,
      gridborderwitdh:5,
     
      lives:3,
      
      
      
      onDrawScreen:function (myEvent,myUI)
      {
      if ($.blogon === true)
          myUI.self._trigger("onDrawLog", null, myUI); 
      else
          myUI.options.log = false;
         
      if (myUI.options.generator === false)
         myUI.self._trigger("onDrawScoreInfos", null, myUI); 
     
      myUI.self._trigger("onDrawGrid", null, myUI); 
      
      if (myUI.options.generator === false)
         {
         myUI.self._trigger("onDrawBar", null, myUI); 
         myUI.self._trigger("onDrawBalls", null, myUI);
         }
         
      },//fin onDrawScreen
       onDrawDesignScreen:function (myEvent,myUI)
      {
           
       
      myUI.options.designscreen =  $('<div></div>')
             .attr('id','design-screen')
             .addClass('ui-widget-content')
             .addClass('ui-brixploder-screen')
             .css({
                   'height':myUI.options.gridheight + 'px',
                   'min-height':'400px',
                   'width':myUI.options.gridwidth + 'px',
                   'border-width':'5px',
                   'position':'absolute'
                   ,'top':myUI.options.gridtop + 'px',
                    'left':myUI.options.gridleft + myUI.options.gridwidth + 15 + 'px'});
             
       $(myUI.element)
        .append(myUI.options.designscreen);
        
      }//fin onDrawDesignScreen
      ,
      onDrawLog:function (myEvent,myUI)
      {
           
       
      myUI.options.log =  $('<div></div>')
             .attr('id','log')
             .addClass('ui-widget-content')
             .addClass('ui-brixploder-screen')
             .css({
                   'height':myUI.options.gridheight + 'px',
                   'min-height':'400px',
                   'width':myUI.options.gridwidth + 'px',
                   'border-width':'5px',
                   'position':'absolute'
                   ,'top':myUI.options.gridtop + 'px',
                    'left':myUI.options.gridleft + myUI.options.gridwidth + 15 + 'px'});
             
       $(myUI.element)
        .append(myUI.options.log);
        
      },//onDrawLog      
      onDrawScoreInfos:function (myEvent,myUI)
      {
      myUI.score =  $('<div></div>')
             .attr('id','score')
             .addClass('ui-widget-content')
             .addClass('ui-brixploder-screen')
             .css({
                   'height':'50px',
                   'min-height':'400px',
                   'width':myUI.options.gridwidth + 'px',
                   'border-width':myUI.options.gridborderwitdh + 'px',
                   'position':'absolute'
                   ,'top':'0px',
                    'left':myUI.options.gridleft + 'px'});
        
        myUI.score.append($('<span>SCORE&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>')
                            .attr('id','score_lib')
                           
                         )
                   .append($('<span>0</span>')
                            .attr('id','current_score')
                            
                    )
                   .append($('<span>&nbsp;&nbsp;&nbsp;VIES&nbsp;:&nbsp;</span>')      
                    )
                   .append($('<span>'+myUI.options.lives+'</span>').attr('id','current_lives'))
                   .append($('<span>&nbsp;&nbsp;Level&nbsp;:&nbsp;'+myUI.options.level+'</span>').attr('id','current_level'));
                   
         
             
             
       $(myUI.element)
        .append(myUI.score);
        
        
        
      },//fin onDrawScoreInfos
      onDrawGrid:function (myEvent,myUI)
      {
      myUI.grid =  $('<div></div>')
             .attr('id','grille')
             .addClass('ui-widget-content')
             .addClass('ui-brixploder-screen')
             .css({
                   'height':myUI.options.gridheight + 'px',
                   'min-height':'400px',
                   'width':myUI.options.gridwidth + 'px',
                   'border-width':myUI.options.gridborderwitdh + 'px',
                   'position':'absolute'
                   ,'top':myUI.options.gridtop + 'px',
                    'left':myUI.options.gridleft + 'px'});
             
       $(myUI.element)
        .append(myUI.grid);
        
      },      
      onDrawBar:function (myEvent,myUI)
      {
      var $barre =  $('<div></div>').brixploderbar({
                              width:myUI.options.barwidth,
                                height:myUI.options.barheight,
                                top:myUI.options.bartop,
                                left:myUI.options.barleft
                                
                                }); 
        

       //$(myUI.element).find('.ui-brixploder-screen') 
         $(myUI.grid).append($barre); 
      },
      
      onDrawBalls:function (myEvent,myUI)
      {

       //$(myUI.element).find('.ui-brixploder-screen') 
        $(myUI.grid)      
          .append(
               $('<div></div>')
                .brixploderball({
                              width:myUI.options.ballwidth,
                              top:myUI.options.balltop,
                              left:myUI.options.ballleft,
                              
                              brickwidth:myUI.options.brickwidth,
                              brickheight:myUI.options.brickheight,
                              gridwidth:myUI.options.gridwidth,
                              gridheight:myUI.options.gridheight,
                              gridleft:myUI.options.gridleft,
                              gridtop:myUI.options.gridtop,
                              
                              log:myUI.options.log,
                              limits:{
                                 right:myUI.options.gridwidth - 5,
                                  top:myUI.options.gridheight - 5
                                 },
                              onOffLimit:function (myEvent,ballUI)
                              {
                               ballUI.element.hide('explode');
                               ballUI.element.remove();
                               
                                myUI.self._trigger("onBallDestroyed", null,myUI);
     
                              },
                              vdirection:$.NORTH,
                               hdirection:$.WEST
                                 
                              
                             })
               );

  
        
      },//fin onDrawBalls
      onVerifyEndOfLevel:function (myEvent,myUI)
      {
       if(myUI.options.bricks < 1)
       {
        myUI.element.html('');
        
        $('head').attr('level',myUI.options.nextLevel)
        
        myUI.element.append(
          
          $('<div id="replay-modal" title="Aller Au niveau suivant '+myUI.options.nextLevel+'"><p>&nbsp;</p></div>')
          .dialog({
              height: 140,
              modal: true,
              buttons: {
		      	   	Oui: function() {$( this ).dialog( "close" );myUI.self._trigger('onReplayLevel',null,myUI)},
               	Non: function() {$( this ).dialog( "close" );$(myUI.element).hide('explode');}
               
             }
          })
          );
       }
       
      }
      ,
      onRefreshLiveNumber:function (myEvent,myUI)
      {
       myUI.score.find('#current_lives').text(myUI.options.lives);
      }
      ,
      onUseOneLive:function (myEvent,myUI)
      {
      myUI.self._trigger("onDrawBar", null, myUI); 
      myUI.self._trigger("onDrawBalls", null, myUI); 
      }
      ,
      onLostLive:function (myEvent,myUI)
      {
      myUI.options.lives--; 
       
       myUI.self._trigger("onRefreshLiveNumber", null,myUI);
     
      
       if(myUI.options.lives < 1)
       {
         $(myUI.element).find('#grille').unbind('mousemove'); 
         
         myUI.score.find('#current_lives')
                  .text('You Loose!!!')
                  .addClass('ui-state-error')
                  ;
       
         myUI.element.append(
          
          $('<div id="replay-modal" title="Voulez vous rejouer ?"><p>&nbsp;</p></div>')
          .dialog({
              height: 140,
              modal: true,
              buttons: {
		      	   	Oui: function() {$( this ).dialog( "close" );myUI.self._trigger('onReplayLevel',null,myUI)},
               	Non: function() {$( this ).dialog( "close" );$(myUI.element).hide('explode');}
               
             }
          })
          );         
                  
       }
       else
       {
        myUI.self._trigger("onUseOneLive", null,myUI);
     
       }
       
       
      },
      
      onBallDestroyed:function (myEvent,myUI)
      {
       if($(':ui-brixploderball').length < 1)
         {
          $(':ui-brixploderbar').hide('explode');
          $(':ui-brixploderbar').remove();
          
          myUI.self._trigger("onLostLive", null,myUI);
     
          
          
         // $(':ui-brixploderbrick').hide('explode');
        //  $(':ui-brixploderbrick').remove();
          
         }
      }
      ,
      onLogInfos:function (myEvent,myUI)
      {
      for(var i in  myUI.options)
       {
        if(typeof(myUI.options[i]) !== 'function')
          myUI.options.log.blog('log_' + i,'myUI.options.'+ i +':' + myUI.options[i] + ' ' + typeof(myUI.options[i]),true);
       }      
      }
      ,
      onRegisterDesignControl:function (myEvent,myUI)
      {
       var $screen = $(myUI.options.designscreen);
         
      
       var $formlevel = $('<form name="formlevel" ></form>');
        
       $formlevel.append($('<span><b>Nom du fichier de configuration</b></span>'));
       
       $formlevel.append($('<input></input>')
                          .attr('id','filelevel')
                          .attr('name','filelevel')
                          .val($('head').attr('level'))
        );
       
       $formlevel.append($('<br/><span><b>Nom du niveau suivant</b></span><br/>'));
      
       $formlevel.append($('<input></input>')
                          .attr('id','nextlevel')
                          .attr('name','nextlevel')
                          .val(myUI.options.nextLevel)
        );
       
       myUI.options.formlevel = $formlevel;
       
       $screen.append($formlevel);
       $screen.append($('<button>Enregistrer</button>')
                      .button({icons:{primary:"ui-icon-disk"}})
                      .click(function (){myUI.self._trigger("onSaveLevel", null, myUI); }) 
              
              );
 
       $screen.append($('<button>Inverser Niveau</button>')
                      .button({icons:{primary:"ui-icon-gear"}})
                      .click(function (){
                      $(':ui-brixploderbrick').brixploderbrick('toggle');
                      
                      }) 
              
              );
       
       $screen.append($formlevel);
       $screen.append($('<button>Charger</button>')
                      .button({icons:{primary:"ui-icon-gear"}})
                      .click(function (){
                        alert($(myUI.options.formlevel).find('#filelevel').val());
                      $('head').attr('level',$(myUI.options.formlevel).find('#filelevel').val());
                      myUI.self._trigger("onReplayLevel", null, myUI); }) 
              
              );
       
      $('.brickdestroyed').css('opacity',0.5); 
      $(':ui-brixploderbrick').click(
        
        function ()
        {
        $(this).brixploderbrick('toggle');         
        }
        
        ); 
       
      }//fin onRegisterDesignControl
      ,
      onRegisterControl:function (myEvent,myUI)
      {
       var $screen = $(myUI.element).find('#grille');
         
        $screen.mousemove(function(e){
          var X = e.pageX  - myUI.options.gridleft - myUI.options.gridborderwitdh;
          var Y = e.pageY - myUI.options.gridtop - myUI.options.gridborderwitdh;
         
         if (myUI.options.log)
            { 
            myUI.options.log.blog('log_pageX','e.pageX: ' + e.pageX);
            myUI.options.log.blog('log_pageY','e.pageY : ' + e.pageY,true);
            myUI.options.log.blog('log_X','X : ' + X);
            myUI.options.log.blog('log_Y','Y : ' + Y,true);
            }
            
          if (X >= (myUI.options.gridwidth - myUI.options.barwidth))
              X = myUI.options.gridwidth - myUI.options.barwidth - 1 ;

   
             
          if (X < 0)
             X = 0;
          
           if (Y < 0)
               Y = 0;
            
          
            var $barre =  $(this).find('#barre').brixploderbar({'left':X});
            
            
        });
 
       
       
      },//fin onRegisterControl
      onSaveLevel:function (myEvent,myUI){
       
       
       var datatosave = {
         filelevel:$(myUI.options.formlevel).find('#filelevel').val(),
         nextlevel:$(myUI.options.formlevel).find('#nextlevel').val()
         
       
       
       }; 
      
       var bricksdata ={};
       
       $(':ui-brixploderbrick').each(
        
        function ()
        {
         var id = $(this).attr('id');
         
         bricksdata[id] = $(this).brixploderbrick('serialize');
         
        }
        
        );
       
       $.extend(datatosave,bricksdata);
       
       
       jQuery.ajax({
         type: "POST",
         url: './services/save.php',
         dataType: "text",
         data:datatosave,
         cache:false,
         async:false,
         success: function(data, textStatus, xhr) { 
         alert(data);
         },
         error:function ()
         {
         alert('sauvegarde KO');
         }
       }); //fin ajax
      }//fin onSaveLevel
      ,
      onReplayLevel:function (myEvent,myUI)
      {
       $(myUI.element).html('');
       
       myUI.self._create();
      },
      onDrawLevel:function (myEvent,myUI)
      {
       $grille = $(myUI.element).find('#grille');

             
       $(myUI.options.Xlevel).find('level').find('grid').children('row').each(function (index)
        {
        var row  = $(this).attr('id');
        var solidity = ($(this).attr('solidity')) ?  $(this).attr('solidity') : 1;
        var Y    = $(this).calcY(myUI);
        var full = $(this).isFull();
        
        if ($(this).isEmpty() == true)
            return true;
        
        if (full == true)
            for(X = 1;X < myUI.options.gridwidth;X += myUI.options.brickwidth + 4)
            {var col =  $.getCol (X,myUI);
             $grille.addBrick(X,Y,myUI,row,col,solidity);
            }  
        else
          $(this).children('brick').each(function (index){
           var col = $(this).attr('id');
           var bsolidity =  ($(this).attr('solidity')) ?  $(this).attr('solidity') : 1;
           var X = $(this).calcX(myUI);
           
           if (bsolidity >= 1 && myUI.options.generator === false)
              $grille.addBrick(X,Y,myUI,row,col,bsolidity);
             
           if (myUI.options.generator === true)
              $grille.addBrick(X,Y,myUI,row,col,bsolidity);  
           
          });
          
         
        });
       
       myUI.options.nextLevel = $(myUI.options.Xlevel).find('level').find('nextlevels').find('nextlevel').text();
          
      },//fin onDrawLevel
      
      
     }
     
     ,
     _create: function() {
       
      this.options.level  = $('head').attr('level');
      this.options.Xlevel = $.GetUrlCompatibleXml ('./levels/'+this.options.level+'.xml');
      
      var myUI = {self:this,element:this.element,options:this.options};
      
      this._trigger("onDrawScreen", null,myUI);
      
      if(myUI.options.generator === false)
        this._trigger("onRegisterControl", null, myUI);
  
      this._trigger("onDrawLevel", null, myUI);
  
      if(myUI.options.generator === true)
        {
         this._trigger("onDrawDesignScreen", null, myUI);
        
         this._trigger("onRegisterDesignControl", null, myUI);
        }
      
     },
     _init: function() {
       
      
     },
     destroy: function() {
         $.Widget.prototype.destroy.apply(this, arguments); // default destroy
          // now do other stuff particular to this widget
     }
   });
   
  
  
  
  
  
  
  
 });//fin ready
