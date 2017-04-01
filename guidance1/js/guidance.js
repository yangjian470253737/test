$(function(){
    
    window.onscroll=function(){
    	var obj=document.body.scrollTop?document.body:document.documentElement//真则用doncument.                                                  body, 假则用document.documentElement
        var scrollTop=obj.scrollTop;

        if(scrollTop>650){
           $(".anniu").slideDown();
        }
        if(scrollTop<650){
           $(".anniu").slideUp();
        };
    }
     $(".anniu").on("click",function(){
        	$("body").animate({
        		scrollTop:"0"
        	});
        	$("html").animate({
        		scrollTop:"0"
        	});
           
            
    })
})