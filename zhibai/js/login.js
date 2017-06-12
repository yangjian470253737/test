$(function(){

// 正则和提示账号
	$("input[name='UserName']").keyup(function(){
		$(this).val($(this).val().replace(/[^\w]/g,''));
	});
  
// 正则和提示密码
	$("input[name='UserPass']").keyup(function(){
		$(this).val($(this).val().replace(/[^\w]/g,''));
	});
	//获取localstorage值
	var userData=getData();
	$("input[name='UserName']").val(userData.UserName);
	$("input[name='UserPass']").val(userData.UserPass);
	if(userData){
		$("input[type='checkbox']").prop("checked","checked");
	}else{
		$("input[type='checkbox']").removeProp("checked");
	}
	
	
    var nub=0;
    var nub1=0;
    var token;
    var flag = true;
    $("input[name='UserName']").blur(function(){
    	if($(this).val()==""){
    		nub=0;
    	}else{
    		nub=1;
    	}
    });
    $("input[name='UserPass']").blur(function(){
    	if($(this).val()==""){
    		nub1=0;
    	}else{
    		nub1=1;
    	}
    });
    $("#login").click(function(){
    	if(flag){
    		flag=false;
    		var obj = {};
            $("input[name='UserName']").blur();
            $("input[name='UserPass']").blur();
            obj[$("input[name='UserName']").attr('name')] = $("input[name='UserName']").val();
            obj[$("input[name='UserPass']").attr('name')] = $("input[name='UserPass']").val();
            obj["ValiCode"] = "zzzzzz";
            if (nub == 0 || nub1 == 0) {
                $(".tip").html("请正确填写以上信息!");
                $(".tip").fadeIn();
                setTimeout("codefans()",1000);
                flag = true;
            } else {
                $(".popup-inner-loading").show();
                $(".popup").show();           
                $(".tip").html("");
                $.post("http://localhost:25000/api/account/Login", obj,
                    function (data) {
                        if (data.issuccess == 1) {
                        	var tokenobj={};
                        	tokenobj["zhibaitoken"] = data.message;
                        	if($(".checkBox").is(':checked')){
                        		localStorage.zhibaiUser=JSON.stringify(obj);
                        		localStorage.zhibaitoken=JSON.stringify(tokenobj);
                        	}else{
                        		localStorage.zhibaiUser=JSON.stringify("");
                        		localStorage.zhibaitoken=JSON.stringify(tokenobj);
                        	}
                            document.location = "Project.html";
                        } else {
                            flag = true;
                            $(".popup-inner-loading").hide();
                            $(".popup").hide();
                            $(".tip").fadeIn();
                            $(".tip").html(data.message);
                            setTimeout("codefans()",1000);
                        }
                    }
                );
            }
    	}else{
    		return;
    	}
    }); 
})

function codefans(){
    $(".tip").fadeOut()
}
 function getData() {
    var arr=localStorage.zhibaiUser?JSON.parse(localStorage.zhibaiUser):[];
    return arr;
}




