$(document).ready (
function ()
 {
 
  $.widget("ui.brixploderbar", {
      
     options:{
      width:80,
      top:100,
      left:50,
      heigth:12,
      
      
      
      onDraw:function (myEvent,myUI)
      {
      $(myUI.element)  
       .attr('id','barre')
       .addClass('ui-widget-header')
       .addClass('ui-corner-all')
       .addClass('ui-brixploder-bar') 
       .css({
            'height':myUI.options.height + 'px',
            'min-height':'12px',
            'width':myUI.options.width + 'px',
            'border-width':'1px',
            'position':'absolute',
            'top':myUI.options.top + 'px',
            'left':myUI.options.left + 'px'});
                   
      
      },
      onMove:function (myEvent,myUI)
      {
      $(myUI.element)  
        .css({
            'bottom':myUI.options.bottom + 'px',
            'left':myUI.options.left + 'px'});
       
       
      },
      onLose:function (myEvent,myUI)
      {
      $(myUI.element)  
        .hide('explode');
        
       
      }
      
     }
     ,
     loose:function ()
     {
      this._trigger("onLose", null, {self:this,element:this.element,options:this.options});

     }
     ,
     _create: function() {
       
            this._trigger("onDraw", null, {self:this,element:this.element,options:this.options});

     },
     _init: function() {
       
            this._trigger("onMove", null, {self:this,element:this.element,options:this.options});
      
     },
     destroy: function() {
      
         $.Widget.prototype.destroy.apply(this, arguments); // default destroy
          // now do other stuff particular to this widget
     }
   });
   
  
 });//fin ready
