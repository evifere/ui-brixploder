$(document).ready (
function ()
 {
 $.fn.intAttr = function (id)
 {
 return (parseInt($(this).attr(id))); 
  
 }
 
  $.widget("ui.brixploderbrick", {
      
     options:{
      solidity:1,
     
      
      onDraw:function (myEvent,myUI)
      {
       $(myUI.element)
         .attr('id',myUI.options.row+ '_' + myUI.options.col)
         .attr('row',myUI.options.row)
         .attr('col',myUI.options.col)
         .attr('X-left',myUI.options.X)
         .attr('X-middle',myUI.options.X +  Math.floor(myUI.options.width / 2) + 1)
         .attr('X-right',myUI.options.X + myUI.options.width + 2)
         .attr('Y-top',myUI.options.Y)
         .attr('Y-middle',myUI.options.Y +  Math.floor(myUI.options.height / 2) )
         .attr('Y-bottom',myUI.options.Y + myUI.options.height)
         
         .addClass('ui-widget-header') 
         .addClass('ui-brixploder-brick') 
         .css({
                    'height': myUI.options.height + 'px',
                    'min-height':'12px',
                    'width':myUI.options.width + 'px',
                    'border-width':'1px',
                    'position':'absolute',
                    'bottom':myUI.options.bottomlimit + 'px',
                     'top':myUI.options.Y +'px',
                     'left':myUI.options.X +'px'}); 
         
         
      if (myUI.options.solidity == 0)
          $(myUI.element).addClass('brickdestroyed');
      }
      ,
      onBrickDestroyed:function (myEvent,myUI)
      {
      }
     },
     serialize:function()
     {
     var _e = this.element; 
     
     return  _e.hasClass('brickdestroyed') + ',' +  this.options.solidity;
   
     }
     ,
     toggle:function()
     {
     var _e = this.element; 

     
     if (_e.hasClass('brickdestroyed'))
         this.options.solidity = 0;
     
      if(this.options.solidity !== 0)
        {
        this.options.solidity = 0;

        _e.addClass('brickdestroyed');
         _e.css('opacity',0.5);
   
   
        }
      else
       {
        this.options.solidity = 1;
         _e.css('opacity',1);
        _e.removeClass('brickdestroyed');
      
       }
      
        
     }
     ,
     fragilize:function()
     {
     var _e = this.element; 
      this.options.solidity -= 1;
      
     var opacity = 0.5;// + (1 - 1 / this.options.solidity); 
     // alert(this.options.solidity);
      
      if(this.options.solidity < 1)
        {
         _e.css('opacity',1);
       
        _e.hide("explode", 1000);
       
        
        _e.addClass('brickdestroyed');
   
        $('#current_score').text(parseInt($('#current_score').text()) + 50);
        
        this._trigger("onBrickDestroyed", null, {self:this,element:this.element,options:this.options});

        }
      else
       _e.css('opacity',opacity);
   
      
        
     }
     ,
     _create: function() {
       
          this._trigger("onDraw", null, {self:this,element:this.element,options:this.options});

     },
     _init: function() {
       
      
     },
     destroy: function() {
         $.Widget.prototype.destroy.apply(this, arguments); // default destroy
          // now do other stuff particular to this widget
     }
   });
   
  
 });//fin ready
