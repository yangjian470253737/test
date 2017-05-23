$(function(){

   var nub=0;
   $(".userName").focus(function () {
        if ($(this).val() == "请输入账号") {
            $(this).val("");
            $(this).css({
                "color":"#333333"
            });
        } else {
            return;
        }   
    });

   $(".userName").on("blur", function () {
        if (!$(this).val()) {    
            $(this).css({
                "color": "#C9C9C9"
            });
            $(this).val("请输入账号");
             $(this).attr("str", "")
            nub = 0;
        } else {     
             $(this).attr("str", $(this).val())
            nub = 1;
        }
    });
})