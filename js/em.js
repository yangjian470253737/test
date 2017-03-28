 var fontSize=100;
 var designwidth=1500;
 function font(){
     var screenWidth=document.documentElement.clientWidth;
     var realwidth=(screenWidth/designwidth)*fontSize;
     document.getElementsByTagName("html")[0].style.fontSize=realwidth+"px";
 }
 font();
    window.onresize=font;