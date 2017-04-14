$(function(){

	// 点击登录
	  var nub=0;
	  var nub1=0;
	  var nub2=0; 
	  var btn=$(".button");
      var input=$(".input");
      var input1=$(".input1");
      var input2=$(".input2");
      var p1=$(".p1");
      var p2=$(".p2");
      var p3=$(".p3");
      var p4=$(".p4");
      var obj={};//这里的obj和ajax.js的obj指的不是同一个obj

      // 验证账号&密码&验证码是否填写
      input.on("blur",function(){
      	 if(!input.val()){
            p1.html("账号不能为空!");
            p1.css({
              	"color":"#D30D17"
            });
            nub=0;
      	 }else{
      	 	p1.html("");
            nub=1;
      	 }
      })

      input1.on("blur",function(){
      	 if(!input1.val()){
            p2.html("密码不能为空!");
            p2.css({
              	"color":"#D30D17"
            });
            nub1=0;
      	 }else{
      	 	p2.html("");
            nub1=1;
      	 }
      })

      input2.on("blur",function(){
      	 var reg=/^\w{4}$/;
      	 if(!reg.test(input2.val())){
            p3.html("请输入4位验证码!");
            p3.css({
              	"color":"#D30D17"
            });
            nub2=0;
      	 }else{
      	 	p3.html("");
            nub2=1;
      	 }
      })

      btn.on("click",function(){      
             obj[input.attr('name')]=input.val();
             obj[input1.attr('name')]=input1.val();
             obj[input2.attr('name')]=input2.val();
             if(nub==0||nub1==0||nub2==0){
                p4.html("请正确填写以上信息!");
             }else{
             	p4.html("");
              // $.getJSON("http://192.168.87.160:8080/api/Account/Login",obj, function (json) {
              //       console.log(json);
              //   });

	              $.ajax({
  		            type:"get",
  		            data:obj,
  		            datatype:"text",
  		            url:'http://192.168.87.160:8080/api/Account/Login',
  		            success:function(val){	
                    console.log(val);
                    console.log(JSON.stringify(val));
                    // $.ajax({
                    //   type:"get",
                    //   data:obj,
                    //   datatype:"text",
                    //   url:'php/test.php?url=http://192.168.87.160:8080/api/Account/Login',
                    //   success:function(val){
                    //   console.log(val);
                    //   var data = JSON.parse(val);
                    //   // $(".pp").html(data);
                    //   console.log(data);
                    //   }
                    // })
  		            }
		            })
              }
      });
      
      $(".input").on("click",function(){
      	p4.html("");
      })
       $(".input1").on("click",function(){
      	p4.html("");
      })
        $(".input2").on("click",function(){
      	p4.html("");
      })

      // 进入注册页面
      var zhuce=$(".button1");
      zhuce.on("click",function(){
      	location.href="sign.html";
      })

      // 切换图片
      
      $(".tu").on("click",function(){
      	var i=Math.random();
      	var url="http://192.168.87.160:8080/Index/ValiCode?t="+i;
        $(".tu").attr("src",url);
      });
})