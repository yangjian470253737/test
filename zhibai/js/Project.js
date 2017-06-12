$(function(){

// 首先获取第一页
   getList();
               
   


    $(".CreateProject").click(function(){
        document.location = "CreateProject.html";
    });
    
    
    
   
});

$(document).on("pagecreate","#pageone",function(){
    $(document).on("scrollstop",function(){
        var Wheight=$(window).innerHeight();
        var Cheight=$("#box").innerHeight();
        var scrollTop=$(document).scrollTop();
        var x=Cheight-Wheight+60;
        if(scrollTop>x){
        	getList()
        }
    });                       
});

function codefans(){
    $(".tip").hide()
}


function getList(){
    $.post("http://localhost:25000/api/project/GetProjectList", { token: token, pindex: p, pagesize: 20 }, function (json) {
    	if(json.issuccess == 2){
    		document.location = "Login.html";
    	}else if(json.issuccess == 1){
    		$(".main_box").hide();
    		$(".main_box1").show();
    		var table="";
      		$.each(json.message, function (i, item) {
            table += "<ul class='movebox'><li class='movebox-li'><div class='tubiao'><img src='" + item.Image + "' alt='' /></div><div class='movebox-middle' ><p class='project-name'>" + item.ProjectName + "</p><p class='zhuangtai'>状态</p><p class='effective'>" + (item.Effective?"有效":"无效") + "</p></div><div class='movebox-right'><p class='yonghu'>用户</p><p class='yonghu-num'>" + item.Count + "</p></div></li></ul>";       
            });
            $("#box").append(table);
    		p=p+1;
    	}else{
      		$(".tip").show();
            $(".tip").html(json.message);
            setTimeout("codefans()",1000); 
    	}
    });
}
//function huadong(){
//	var moveX,   //手指滑动距离
//        endX,    //手指停止滑动时X轴坐标
//        cout = 0,  //滑动计数器
//        moveDir;  //滑动方向
//    var movebox = document.querySelector(".movebox");  //滑动对象
//    var Li = movebox.querySelectorAll("li");  //滑动对象item
//    var width = parseInt(window.getComputedStyle(movebox.parentNode).width);  //滑动对象item的宽度
//
//    // movebox.style.width = (width*4) + "px"; //设置滑动盒子width
//    // for(var i = 0; i < Li.length; i++){
//    //   Li[i].style.width = width + "px";  //设置滑动item的width，适应屏幕宽度
//    // }
//
//    //触摸开始
//    function boxTouchStart(e){
//      var touch = e.touches[0];  //获取触摸对象
//      startX = touch.pageX;  //获取触摸坐标
//      endX = parseInt(movebox.style.webkitTransform.replace("translateX(", "")); //获取每次触摸时滑动对象X轴的偏移值
//    }
//
//    function boxTouchMove(e){
//      var touch = e.touches[0];
//      moveX = touch.pageX - startX;  //手指水平方向移动的距离
//
//      if(cout == 0 && moveX > 0){   //刚开始第一次向左滑动时
//        return false;
//      }
//
//      if(cout == 3 && moveX < 0){   //滑动到最后继续向右滑动时
//        return false;
//      }
//
//      movebox.style.webkitTransform = "translateX(" + (endX + moveX) + "px)"; //手指滑动时滑动对象随之滑动
//    }
//
//    function boxTouchEnd(e){
//      moveDir = moveX < 0 ? true : false;   //滑动方向大于0表示向左滑动，小于0表示向右滑动
//      //手指向左滑动
//      if(moveDir){
//
//        if(cout<3){
//          movebox.style.webkitTransform = "translateX(" + (-100) + "px)";
//          cout++;
//        }
//      //手指向右滑动
//      }else{
//        //滑动到初始状态时返回false
//        if(cout == 0){
//          return false;
//        }else{
//          movebox.style.webkitTransform = "translateX(" + (0) + "px)";
//          cout--;
//        }
//      }
//    }
//
//    //滑动对象事件绑定
//    movebox.addEventListener("touchstart", boxTouchStart, false);
//    movebox.addEventListener("touchmove", boxTouchMove, false);
//    movebox.addEventListener("touchend", boxTouchEnd, false);
//}


