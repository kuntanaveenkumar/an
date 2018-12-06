$(window).load(function() 
{    
   $('#status').fadeOut();
   $('#preloader').delay(350).fadeOut(function(){
      $('body').delay(350).css({'overflow':'visible'});
   });
});

$(document).ready(function() {
   
   // Toggle Left Menu
   $('.nav-parent > a').click(function() 
   {
       
	var parent = $(this).parent();
      var sub = parent.find('> ul');
    
      // Dropdown works only when leftpanel is not collapsed
      if(!$('body').hasClass('leftpanel-collapsed')) 
	  {

         if(sub.is(':visible')==false) 
		 {
            sub.slideUp(200, function(){
               parent.removeClass('nav-active');
               $('.mainpanel').css({height: ''});
               adjustmainpanelheight();
            });
         } else 
		 {
			 
            closeVisibleSubMenu();
            parent.addClass('nav-active');
            sub.slideDown(200, function(){
               adjustmainpanelheight();
            });
         }
      }
      return false;
   });
   
   function closeVisibleSubMenu() {
      $('.nav-parent').each(function() {
         var t = $(this);
         if(t.hasClass('nav-active')) {
            t.find('> ul').slideUp(200, function(){
               t.removeClass('nav-active');
            });
         }
      });
   }
   
   function adjustmainpanelheight() {
      // Adjust mainpanel height
      var docHeight = $(document).height();
      if(docHeight > $('.mainpanel').height())
         $('.mainpanel').height(docHeight);
   }   
   // Add class everytime a mouse pointer hover over it
   $('.nav-bracket > li').hover(function(){
      $(this).addClass('nav-hover');
   }, function(){
      $(this).removeClass('nav-hover');
   });     
   // Menu Toggle
   $('.menutoggle').click(function(){    
	 
      var body = $('body');
      var bodypos = body.css('position');      
      if(bodypos != 'relative') 
	  {          
         if(!body.hasClass('leftpanel-collapsed')) {			
            body.addClass('leftpanel-collapsed');
            $('.nav-bracket ul').attr('style','');            
            $(this).addClass('menu-collapsed');            
         } else {
            body.removeClass('leftpanel-collapsed chat-view');
            $('.nav-bracket li.active ul').css({display: 'block'});            
            $(this).removeClass('menu-collapsed');            
         }
      } else {
        if(body.hasClass('leftpanel-show'))
            body.removeClass('leftpanel-show');
        else
            body.addClass('leftpanel-show');         
         adjustmainpanelheight();         
      }

   });

   

   
   
   
   
   

});