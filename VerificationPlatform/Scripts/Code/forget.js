$(function(){
	  var nub=0;
	  var nub1=0;
	  var nub2=0;
	  var nub3=0;
    var nub4=0;
	  // 验证邮箱
	    var input5=$(".input5");
      var p5=$(".p5");

      input5.on("focus",function(){
          p5.html("请输入您设置账号所验证的邮箱");
          p5.css({
          	"color":"#75747A"
          })
      })
      
      
      var reg=/^[0-9a-zA-Z]+@(qq|163|139|126|gmail|sina)\.(cn|com)$/;
      
      input5.on("blur",function(){
      	  var str=input5.val();
      	  var obj={};
          obj[input5.attr('name')]=input5.val();
          if(reg.test(str)){
              p5.html("输入正确");
                p5.css({
                  "color":"green"
                })
              nub3=1;
                  //  $.ajax({
                  //     type:"get",
                  //     data:obj,
                  //     datatype:"text",
                  //     url:"php/jiance1.php",
                  //     success:function(val){
                	 //      if(val==1){
                  //            p5.html("输入正确");
                  //            p5.css({
          	       //              "color":"green"
                  //            })
                  //            nub3=1;
                	 //      }else{
                	 //          p5.html("查找不到设置邮箱");
                  //           p5.css({
          	       //              "color":"#D30D17"
                  //           })
                  //           nub3=0;
                	 //      }
                  //     } 
                  // })  
          }else{
          	 p5.html("输入格式有误");
          	 p5.css({
          	 	"color":"#D30D17"
          	 });
             nub3=0;
          }
      })

      // 验证账号
	    var input=$(".input");
      var p0=$(".p0");

      input.on("focus",function(){
          p0.html("请输入您要修改密码的账号6-20位");
          p0.css({
          	"color":"#75747A"
          })
      })
      
      
      var reg=/^.{6,20}$/;
      
      input.on("blur",function(){
      	  var str=input.val();
      	  var obj={};
          obj[input.attr('name')]=input.val();
          if(reg.test(str)){

            p0.html("输入正确");
            p0.css({
              "color":"green"
            })
            nub=1;
                  //  $.ajax({
                  //     type:"get",
                  //     data:obj,
                  //     datatype:"text",
                  //     url:"php/jiance.php",
                  //     success:function(val){
                	 //      if(val==1){
                  //            p0.html("输入正确");
                  //            p0.css({
          	       //              "color":"green"
                  //            })
                  //            nub=1;
                	 //      }else{
                	 //      	p0.html("账号不存在");
                  //            p0.css({
          	       //              "color":"#D30D17"
                  //            })
                  //           nub=0;
                	 //      }
                  //     } 
                  // })  
          }else{
          	 p0.html("输入格式有误");
          	 p0.css({
          	 	"color":"#D30D17"
          	 });
             nub=0;
          }
      })
     

      // 验证验证码
      var input1=$(".input1");
      var p1=$(".p1");
       
      input1.on("focus",function(){
          p1.html("请输入您的4位手机验证码");
          p1.css({
          	"color":"#75747A"
          })
      })

     
      var reg2=/^\d{4}$/;
      input1.on("blur",function(){

          var str1=input1.val();
          if(reg2.test(str1)){
          	     p1.html("输入正确");
          	     p1.css({
          	     	"color":"green"
          	     });
                 nub1=1;
          }else{
          	p1.html("输入格式有误");
  	        p1.css({
  	     	    "color":"#D30D17"
  	        });
             nub1=0;
          }

       });
     

      var input2=$(".input2");
      var p2=$(".p2");
      input2.on("focus",function(){
      	 p2.html("请输入数字和字母结合，6-12位");
         p2.css({
         	"color":"#75747A"
         });
      })
      
      var reg3=/\d[a-zA-Z]|[a-zA-Z]\d/;
      var reg4=/^[0-9a-zA-Z]{6,12}$/;
      input2.on("blur",function(){
      	 var str1=input2.val();
     

         if(reg3.test(str1)&&reg4.test(str1)){
                 
                 p2.html("输入正确");
		         p2.css({
		         	"color":"green"
		         });

                 nub1=1;
          }else{

          	 p2.html("输入格式有误");
	         p2.css({
	         	"color":"#D30D17"
	         });
             nub1=0;
          }

      })
 


      var input3=$(".input3");
      var p3=$(".p3");
      input3.on("blur",function(){
      	if(input2.val()==input3.val()){
              if(!input2.val()){
              	 p3.html("密码不能为空!");
              	 p3.css({
              	 	"color":"#D30D17"
              	 });
              	 nub2=0;
              }else{
              	p3.html("两次输入一致");
              	p3.css({
              	   "color":"green"
              	});
              	nub2=1;
              }
      	  }else{
      	  	  p3.html("两次输入不一致");
              p3.css({
              	  "color":"#D30D17"
              });
              nub2=0;
      	  }
      })
      
      var input4=$(".input4");
      var p4=$(".p4");
      input4.on("focus",function(){
         p4.html("请输入4位验证码!");
         p4.css({
          "color":"#75747A"
         });
      });
      input4.on("blur",function(){
         var reg=/^\w{4}$/;
         if(!reg.test(input4.val())){
            p4.html("请输入4位验证码!");
            p4.css({
                "color":"#D30D17"
            });
            nub4=0;
         }else{
          p4.html("");
            nub4=1;
         }
      })

      var btn=$(".button");
      var p6=$(".p6");
      btn.on("click",function(){
      	if(nub==0||nub1==0||nub2==0||nub3==0||nub4==0){
      		  p6.html("修改密码信息有误!");
            p6.css({
            	"color":"#D30D17"
            })
      	}else{
           var obj={};
           obj[input.attr('name')]=input.val();
           obj[input2.attr('name')]=input2.val();
           obj[input5.attr('name')]=input5.val();
           obj[input4.attr('name')]=input4.val();
           // console.log(obj);
           $.ajax({
              type:"get",
              data:obj,
              datatype:"text",
              url:"",
              success:function(val){
              	   console.log(val);
              } 
           })  
      	}	
      });
     
      // 发送邮箱验证码
      // var obj={}
      // obj["Email"]="470253737@qq.com";
      // var send=$(".inner-send");
      // console.log(obj);
      // send.on("click",function(){
      //   $.ajax({
      //     type:"get",
      //     data:obj,
      //     datatype:"text",
      //     url:"http://192.168.87.160:8080/api/Account/SendEmailCode",
      //     success:function(val){
      //         console.log(val);  
      //     } 
      //   })  
      // })

      $(".comoninput").on("click",function(){
         p6.html("");
      });

      var btn1=$(".button1");
      btn1.on("click",function(){
      	location.href="login.html";
      })

      // 切换图片
      
      $(".tu").on("click",function(){
        var i=Math.random();
        var url="http://192.168.87.160:8080/Index/ValiCode?t="+i;
        $(".tu").attr("src",url);
      });
     
})