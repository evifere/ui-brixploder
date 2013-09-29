$(document).ready (
function ()
 {
  $.NORTH = true;
  $.SOUTH = false;
  $.EAST  = true;
  $.WEST  = false;
    
   
 
  $.widget("ui.brixploderball", {
      
     options:{
      width:6,
      height:6,      
      top:100,
      left:50,
      hdirection:$.NORTH,
      vdirection:$.WEST,
      hspeed:2,
      vspeed:2,
      brickwidth:0,
      brickheight:0,
      rowBrick:0,
      colBrick:0,
      gridwidth:0,
      gridheight:0,

      prevbarleft:-1,
      limits:{
             bottom:0,
             top:495,
             left:0,
             right:355
             },
      
      onDraw:function (myEvent,myUI)
      {
      $(myUI.element)
                      .attr('id','balle')
                      .generateBreakerAutoId()
                      .addClass('ui-widget-header') 
                      .addClass('ui-corner-all')
                      .addClass('ui-brixploder-ball') 
                      .css({
                        'height':myUI.options.height + 'px',
                        'min-height':'6px',
                        'width':myUI.options.width + 'px',
                        'border-width':'1px',
                        'position':'absolute',
                        'top':myUI.options.top + 'px',
                        'left':myUI.options.left + 'px',
                      'z-index':'2'});
      },
      
      onBrickCollision:function (myEvent,myUI)
      {
       if(myUI.options.brickwidth * myUI.options.brickheight == 0)
          return true;
         
       //var Xballcenter =  myUI.options.left +  Math.floor( (myUI.options.width) / 2);
       //var Yballcenter =  myUI.options.top +  Math.floor( (myUI.options.height) / 2);
       
         
       myUI.options.colBrick = Math.floor( (myUI.options.left) / (myUI.options.brickwidth + 2));
       myUI.options.rowBrick = Math.floor( (myUI.options.top - myUI.options.gridtop) / (myUI.options.brickheight + 2))  ;
       
      // myUI.options.colBrick = Math.floor( (Xballcenter) / (myUI.options.brickwidth + 2));
      // myUI.options.rowBrick = Math.floor( (Yballcenter - myUI.options.gridtop) / (myUI.options.brickheight + 2))  ;
    
       
 
       
       myUI.options.maxrowBrick = Math.floor( (myUI.options.gridheight ) / (myUI.options.brickheight + 2)) - 1;
       
       
       if(myUI.options.rowBrick < 0)
          myUI.options.rowBrick = 0;
       
         
       if(myUI.options.rowBrick > myUI.options.maxrowBrick)
          myUI.options.rowBrick = myUI.options.maxrowBrick;
      
         
       myUI.options.maxcolBrick = Math.floor( (myUI.options.gridwidth ) / (myUI.options.brickwidth + 2))  - 2 ;

         
       if(myUI.options.colBrick < 0)
          myUI.options.colBrick = 0;
      
       if(myUI.options.colBrick > myUI.options.maxcolBrick)
          myUI.options.colBrick = myUI.options.maxcolBrick;
         
      
       $idtodestroy = $('#' + myUI.options.rowBrick + '_' + myUI.options.colBrick);
       
       if($idtodestroy.exists() && $idtodestroy.hasClass('brickdestroyed') == false)
       {
       //$idtodestroy.hide("explode", 1000);
       
       //$idtodestroy.addClass('brickdestroyed')
     //  if(($idtodestroy.intAttr('X-left') <= myUI.options.left 
   //     && myUI.options.left <= $idtodestroy.intAttr('X-right'))
    //    && ($idtodestroy.intAttr('Y-top') <= myUI.options.top 
     //    && myUI.options.top <= $idtodestroy.intAttr('Y-bottom'))
     // 
     //   )
      // {
       //myUI.options.left = $idtodestroy.intAttr('X-left'); 
       //myUI.options.top = $idtodestroy.intAttr('Y-bottom') + myUI.options.brickheight + 2; 
      

      $idtodestroy.brixploderbrick('fragilize'); 
        
      if (myUI.options.log)
      {
      myUI.options.log.blog('impactdid' , myUI.options.rowBrick + '_' + myUI.options.colBrick,true);
      myUI.options.log.blog('impactX','Impact brick X-left ' + $idtodestroy.attr('X-left') + ' ' + $idtodestroy.attr('X-middle') + ' ' + $idtodestroy.attr('X-right')  + 'vs' + myUI.options.left,true);
      myUI.options.log.blog('impactY','Impact brick Y-top ' + $idtodestroy.attr('Y-top') + ' ' + $idtodestroy.attr('Y-middle') + ' ' + $idtodestroy.attr('Y-bottom')  + 'vs' + myUI.options.top,true);
      }
      myUI.options.vdirection = !myUI.options.vdirection ;
      myUI.options.hdirection = !myUI.options.hdirection ;
    
      // }
     
        
        
        
      return true;
    
       }
      }
      ,//fin onBrickCollision
      onOffLimit:function (myEvent,myUI)
      {
      myUI.options.top = myUI.options.limits.top;
      myUI.options.vdirection = $.NORTH;
       
      }
      ,
      onBorderCollision:function (myEvent,myUI)
      {
      if(myUI.options.left < myUI.options.limits.left)
        {
         myUI.options.left = myUI.options.limits.left;
         myUI.options.hdirection = $.EAST;
        }
      
      if(myUI.options.left > myUI.options.limits.right)
        {
         myUI.options.left = myUI.options.limits.right;
         myUI.options.hdirection = $.WEST;
        }  
      
        
      if(myUI.options.top < myUI.options.limits.bottom)
        {
         myUI.options.top = myUI.options.limits.bottom;
         myUI.options.vdirection = $.SOUTH;
        }
      


      if(myUI.options.top > myUI.options.limits.top)
        {
      
        myUI.self._trigger("onOffLimit", null, myUI);
        }
        
      return true;
      },//fin onBorderCollision
      
      onBarCollision:function (myEvent,myUI)
      {
      var XbarreMin = XbarreMax = XbarreMiddle = XbarreQuaterLeft = YbarreMin = YbarreMax = 0;   
      var WestToEast = 0;
      
        if ($(':ui-brixploderbar').exists() === true)
        {

        XbarreMin = $(':ui-brixploderbar').brixploderbar('option','left');
        XbarreMax = XbarreMin + $(':ui-brixploderbar').brixploderbar('option','width');
        XbarreMiddle = XbarreMin + Math.floor($(':ui-brixploderbar').brixploderbar('option','width') / 2);
        XbarreQuaterLeft  = XbarreMin + Math.floor($(':ui-brixploderbar').brixploderbar('option','width')/ 4);
        XbarreQuaterRight = XbarreMin + Math.floor($(':ui-brixploderbar').brixploderbar('option','width')* 3 / 4);
        
        
        
        YbarreMin  = $(':ui-brixploderbar').brixploderbar('option','top');
        YbarreMax  = YbarreMin + $(':ui-brixploderbar').brixploderbar('option','height');
        
        
        WestToEast = XbarreMin - myUI.options.prevbarleft;  
        
        
        
        } 
       
       
      if(myUI.options.left >= XbarreMin && myUI.options.left <= XbarreMax
         && myUI.options.top >= YbarreMin && myUI.options.top <= YbarreMax
       
        )
        {
        // myUI.options.left = myUI.options.limits.left;
         myUI.options.vdirection = ! myUI.options.vdirection;
         
         
         if(myUI.options.left >= XbarreQuaterLeft && myUI.options.left <= XbarreQuaterRight || WestToEast == 0)         
           {
           //myUI.options.hdirection = !myUI.options.hdirection;
           }
           //on augmente la vitesse sous on avance dans le même sens
           if((WestToEast > 0 && myUI.options.hdirection == $.WEST) || (WestToEast < 0 && myUI.options.hdirection == $.EAST))  
              myUI.options.hspeed++;              


          //contre rebond  
          if((myUI.options.left < XbarreQuaterLeft && myUI.options.hdirection == $.EAST) 
              || (myUI.options.left > XbarreQuaterRight && myUI.options.hdirection == $.WEST))
            {
            myUI.options.hdirection = !myUI.options.hdirection; 
             
            }

         
           if(  myUI.options.hspeed < 1)
               myUI.options.hspeed = 1;
              
           if(  myUI.options.vspeed < 1)
               myUI.options.vspeed = 1;
            
            if(  myUI.options.hspeed > 5)
               myUI.options.hspeed = 5;
           
            if(  myUI.options.vspeed > 5)
               myUI.options.hspeed = 5;
                         
        }
      
        
      myUI.options.prevbarleft = XbarreMin;
      return true;
      },//fin onBarCollision
       
      onCalculateDirection:function (myEvent,myUI)
      {
      switch(myUI.options.hdirection)
       {
       case $.EAST:
           myUI.options.left += myUI.options.hspeed; 
       break;
      
       case $.WEST:
           myUI.options.left -= myUI.options.hspeed; 
       break;
       
       }
     
      switch(myUI.options.vdirection)
       {
       case $.SOUTH:
         myUI.options.top += myUI.options.vspeed; 
         break;
      
       case $.NORTH:
         myUI.options.top -= myUI.options.vspeed;        
         break;
       
       }
      },
      onDoMove:function (myEvent,myUI)
      {
            $(myUI.element)
                    .css({
                        'top':myUI.options.top + 'px',
                        'left':myUI.options.left + 'px'});
                 
 
       
      }
      ,
      onMove:function (myEvent,myUI)
      {

       
      myUI.self._trigger("onDoMove", null, myUI);      
      
      myUI.self._trigger("onBrickCollision", null, myUI);
      myUI.self._trigger("onDoMove", null, myUI);      
      
      myUI.self._trigger("onBorderCollision", null, myUI);
      myUI.self._trigger("onDoMove", null, myUI);      
      
      myUI.self._trigger("onBarCollision", null, myUI);
      myUI.self._trigger("onDoMove", null, myUI);      
      
      myUI.self._trigger("onCalculateDirection", null, myUI);        
      myUI.self._trigger("onDoMove", null, myUI);
                       
      if (myUI.options.log)
      {
        myUI.options.log.blog('log_balle1','<br/><br/>id' + $(myUI.element).attr('id')
                    + ' myUI.options.left ' + myUI.options.left
                    + ' myUI.options.top' + myUI.options.top + '<br/>'
                    + ' myUI.options.rowBrick' + myUI.options.rowBrick 
                    + ' myUI.options.colBrick' + myUI.options.colBrick + '<br/>'
                    + ' myUI.options.maxrowBrick' + myUI.options.maxrowBrick 
                    + ' myUI.options.maxcolBrick' + myUI.options.maxcolBrick + '<br/>'
                   + '#' + myUI.options.rowBrick + '_' + myUI.options.colBrick + '<br/>'
                    
                    + 'myUI.options.gridwidth ' + myUI.options.gridwidth + '<br/>'
                    + 'myUI.options.gridheight ' + myUI.options.gridheight  + '<br/>'
                     + 'myUI.options.brickwidth ' + myUI.options.brickwidth 
                    + 'myUI.options.brickheight ' + myUI.options.brickheight +'<br/><br/>'
                    ,true);
          

      }
        
      }
      
      
     },
     _create: function() {
      var myUI = {self:this,element:this.element,options:this.options};  
      
      this._trigger("onDraw", null, myUI);
      myUI.self._trigger("onDoMove", null, myUI);      
      
     },
     _init: function() {
     var _self = this;
     
      
    this.automove = setInterval(function (){
     _self._trigger("onMove", null, {self:_self,element:_self.element,options:_self.options})}
     , 100);
      

      
     },
     destroy: function() {
         clearInterval(this.automove);
         $.Widget.prototype.destroy.apply(this, arguments); // default destroy
          // now do other stuff particular to this widget
     }
   });
   
  
 });//fin ready
