//色彩切换

jQuery.extend({
	tubiao:function(obj,img){
		obj.hover(function(){
		img.css("-webkit-filter","grayscale(0%)")
	},function(){
		img.css("-webkit-filter","grayscale(100%)")
	})
	}
})
$(document).ready(function(){
	$.tubiao($("#center .container .row .col-lg-12 .tubiao li:eq(0)"),$("#center .container .row .col-lg-12 .tubiao li:eq(0) img"))
	$.tubiao($("#center .container .row .col-lg-12 .tubiao li:eq(1)"),$("#center .container .row .col-lg-12 .tubiao li:eq(1) img"))
	$.tubiao($("#center .container .row .col-lg-12 .tubiao li:eq(2)"),$("#center .container .row .col-lg-12 .tubiao li:eq(2) img"))
	$.tubiao($("#center .container .row .col-lg-12 .tubiao li:eq(3)"),$("#center .container .row .col-lg-12 .tubiao li:eq(3) img"))
	$.tubiao($("#center .container .row .col-lg-12 .tubiao li:eq(4)"),$("#center .container .row .col-lg-12 .tubiao li:eq(4) img"))
	$.tubiao($("#center .container .row .col-lg-12 .banner .banner-center ul li:eq(0)"),$("#center .container .row .col-lg-12 .banner .banner-center li:eq(0) .tu img"))
	$.tubiao($("#center .container .row .col-lg-12 .banner .banner-center ul li:eq(1)"),$("#center .container .row .col-lg-12 .banner .banner-center li:eq(1) .tu img"))
	$.tubiao($("#center .container .row .col-lg-12 .banner .banner-center ul li:eq(2)"),$("#center .container .row .col-lg-12 .banner .banner-center li:eq(2) .tu img"))
	$.tubiao($("#center .container .row .col-lg-12 .banner .banner-center ul li:eq(3)"),$("#center .container .row .col-lg-12 .banner .banner-center li:eq(3) .tu img"))
})

//下方选项卡


$(document).ready(function(){
	$("#center .container .row .col-lg-8 .xxk .xxk-top li").click(function(){
		var index=$(this).index();
		$("#center .container .row .col-lg-8 .xxk .xxk-top li").removeClass("first").eq(index).addClass("first");
		$("#center .container .row .col-lg-8 .xxk .xxk-bottom li").css("display","none").eq(index).css("display","block")
	})	
})


jQuery.extend({
	one:function(){		
	}
})


$(function(){
   $(".liebiao").on("click",function(){
   	 $(".liebio-small").slideToggle();
   });

//客服qq聊天
    function browser() {
      var u = navigator.userAgent.toLowerCase();
      var app = navigator.appVersion.toLowerCase();
      return {
          txt: u, // 浏览器版本信息
          version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号       
          msie: /msie/.test(u) && !/opera/.test(u), // IE内核
          mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
          safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
          chrome: /chrome/.test(u), //是否为chrome
          opera: /opera/.test(u), //是否为oprea
          presto: u.indexOf('presto/') > -1, //opera内核
          webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
          gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
          mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
          android: u.indexOf('android') > -1, //android终端
          iPhone: u.indexOf('iphone') > -1, //是否为iPhone
          iPad: u.indexOf('ipad') > -1, //是否iPad
          webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1 //是否web应该程序，没有头部与底部
      };
  }
  var timeout;
  function open_appstore() {
    var b=browser();
    if(b.ios||b.iPhone||b.iPad){
      window.location="itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8";
    }else if(b.android){
      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001662672&site=qq&menu=yes";
    }else{
      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001662672&site=qq&menu=yes";
    }
  } 
   
   $(".yg").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001662672&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001662672&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001662672&site=qq&menu=yes";
	    }
	    // 进入商店关闭
	    // timeout = setTimeout('open_appstore()', 300);
   })

   $(".cb").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001678739&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001678739&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001678739&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })
   
   $(".htn").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001671837&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001671837&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001671837&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })

   $(".zsf").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001670816&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001670816&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001670816&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })

   $(".zzr").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001664228&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001664228&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001664228&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })

   $(".gym").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001655956&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001655956&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001655956&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })

   $(".sfy").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001639860&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001639860&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001639860&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })

   $(".nxr").on("click",function(){
   	    var b=browser();
	    if(b.ios||b.iPhone||b.iPad){
	      window.location="mqq://im/chat?chat_type=wpa&uin=3001658062&version=1&src_type=web";
	    }else if(b.android){
	     window.location="http://wpa.qq.com/msgrd?v=3&uin=3001658062&site=qq&menu=yes";
	    }else{
	      window.location="http://wpa.qq.com/msgrd?v=3&uin=3001658062&site=qq&menu=yes";
	    }
	    timeout = setTimeout('open_appstore()', 300);
   })


   // 技术支持

   $(".all-file").on("click",function(){
   	 $(".portfolio-item").show();
   })
   	<s:iterator var="type1" value="#session.typeList">
	   $(".a<s:property value='#type1.typeId'/>").on("click",function(){
	   	 $(".portfolio-item").hide("normal",function(){
	   	 	$(".only-<s:property value='#type1.typeId'/>").show();
	   	 });
	
	   })
	</s:iterator>
   
})

