//页面加载
$(document).ready(function(){
		$("#checkcodeid").attr("src","${pageContext.request.contextPath }/createCheckcode.action?timestamp="+new Date().getTime());
});

$("#pwdid").blur(function(){
	$("#repwdid").attr("pattern","^"+$("#pwdid").val()+"$");
});

$("#checkcodeid").click(function(){
	$(this).attr("src","${pageContext.request.contextPath }/createCheckcode.action?timestamp="+new Date().getTime());
	
});

function checkAndSubmit(){
	
	//验证用户名
	var nameStr = $("#nameid").val(); 
	if(nameStr==null||nameStr==""){
		alert("用户名不能为空！");
		return;
	}
	
	//验证密码
	var pwdStr =$("#pwdid").val();
	if(pwdStr==null||pwdStr==""){
		alert("密码输入不能为空！");
		return;
	}
	
	//验证确认密码
	var repwdStr =$("#repwdid").val();
	if(repwdStr!=pwdStr){
		alert("两次输入密码不正确！");
		$("#repwdid").val("");
		return;
	}
	//验证手机号码
	var phoneStr =$("#phoneid").val();
	if(!/^1[0-9]{10}$/.test(phoneStr)){
		alert("手机号码格式不正确！");
		return;
	}
	
	//验证qq号
	var qqStr = $("#qqid").val();
	if(!/^[0-9]\d*$/.test(qqStr)){
		alert("qq号码格式不正确！");
		return;
	}
	
	//发送注册请求
	var sendData=$('#fom').serialize();
	$.ajax({
	    type:"POST",
	    url:"add",
	    data:$("#formid").serialize(),// 你的formid
	    error: function(request) {
		    alert("提交失败！！");
		},
		success: function(result) {
		    alert(result);
		    if("注册成功"==result){
		    	//跳转到登录页面
		    	window.location.href="orders/login.jsp";
		    }
		}
	});
}

function rebugSubmit(){
	
	//验证用户名
	var nameStr = $("#name").val(); 
	if(nameStr==null||nameStr==""){
		alert("用户名不正确！");
		return;
	}
	
	//验证标题
	var title =$("#title").val();
	if(title==null||title==""){
		alert("标题不能为空！");
		return;
	}
	
	//验证内容
	var content =$("#content").val();
	if(content==null||content==""){
		alert("内容不能为空！");
		return;
	}
	
	//验证手机号码
	var phoneStr =$("#phone").val();
	if(!/^1[0-9]{10}$/.test(phoneStr)){
		alert("手机号码格式不正确！");
		return;
	}
	
	//发送注册请求
	var sendData=$('#fom').serialize();
	$.ajax({
	    type:"POST",
	    url:"goReBug",
	    data:$("#bugfom").serialize(),// 你的formid
	    error: function(request) {
		    alert("提交失败！！");
		},
		success: function(result) {
		    alert(result);
		}
	});
}