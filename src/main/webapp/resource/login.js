/**
 * 登录页面
 */

$(document).ready(function(){

	//手机登录则跳转至手机页面
	var cookie = document.cookie.split(';');
	var isMobile = '';
	$(cookie).each(function(){
		if( this.indexOf('mobile') > -1 ) {
			isMobile = true;
		}
	});
	if ( isMobile ) {
		console.log('cookie中mobile已设置。。。');
	} else if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios)/i)){
		//手机端
		//window.location.href = '/mobile';
	}

	$('#findPwdName').keyup(function(){
		$($($('#findPwdName').parent()).next()).text("");
	});
	
	$('#fundPwd').keyup(function(){
		$($($('#fundPwd').parent()).next()).text("");
	});
	
	$('#newLoginPwd').keyup(function(){
		$($($('#newLoginPwd').parent()).next()).text("");
	});
	
	$('#againLoginPwd').keyup(function(){
		$($($('#againLoginPwd').parent()).next()).text("");
	});
	
	$('#findPwdCode').keyup(function(){
		$($($('#findPwdCode').parent()).next()).text("");
	});	
	
	$(document).keydown(function(event){
		if (event.keyCode == 13 && $('#safeLoginInfoForm').css('display')=='block') {
			$('#safeLogin').click();
		} 
	});
	
    $('#findMyPass').click(function(){
    	
    	if($('#findPwdName').val() == ""){
    		$($($('#findPwdName').parent()).next()).text("请输入登录账号");
    		$('#findPwdName').focus();
    		return;
    	}
    	var regAccount = /\w{6,14}/g;
    	if(!regAccount.test($('#findPwdName').val())){
    		$($($('#findPwdName').parent()).next()).text("账号输入有误");
    		$('#findPwdName').focus();
    		return;
    	}
    	if($('#fundPwd').val() == ""){
    		$($($('#fundPwd').parent()).next()).text("请输入资金密码");
    		$('#fundPwd').focus();
    		return;
    	}
    	var regSafe = /.{8,16}/g;
    	if(!regSafe.test($('#fundPwd').val())){
    		$($($('#fundPwd').parent()).next()).text("密码输入有误");
    		$('#fundPwd').focus();
    		return;
    	}
    	if($('#newLoginPwd').val() == ""){
    		$($($('#newLoginPwd').parent()).next()).text("请输入新的登录密码");
    		$('#newLoginPwd').focus();
    		return;
    	}
    	var regPass = /.{8,16}/g;
    	if(!regPass.test($('#newLoginPwd').val())){
    		$($($('#newLoginPwd').parent()).next()).text("密码输入有误");
    		$('#newLoginPwd').focus();
    		return;
    	}
    	if($('#againLoginPwd').val() != $('#newLoginPwd').val()){
    		$($($('#againLoginPwd').parent()).next()).text("密码输入不一致");
    		$('#againLoginPwd').focus();
    		return;
    	}
    	if($('#findPwdCode').val() == "" || $('#findPwdCode').val().length!=4){
    		$($($('#findPwdCode').parent()).next()).text("验证码输入有误");
    		$('#findPwdCode').focus();
    		return;
    	}
    	
        var args = "";
        args += "account="+document.getElementById("findPwdName").value+"&safePass="+document.getElementById("fundPwd").value+
        "&newpass="+document.getElementById("againLoginPwd").value+"&code="+document.getElementById("findPwdCode").value;
        Service("/safe/setPassWordBySafe","POST",args,1,function(data){
            alert(data);
            $('.findPwdMain').hide();
            $('.loginArea').show();
        });
    });
    $('img.userCodeImg').click(function(){
        var src = '/code.jpg?_='+new Date().getTime();
        $(this).attr('src',src);
    });
    $('.loginBtn').click(function(){
    	$('#safeLoginInfoForm').hide();
    	$('.loginMethod>a').removeClass("active");
    	$(this).addClass("active");
    	$('#safeLoginForm').hide();
    	$('#loginForm').show();
    	$('.errorTips').text('');
    	$("#loginForm img").click();
    });
    $('.safeLoginBtn').click(function(){
    	$('#safeLoginInfoForm').hide();
    	$('.loginMethod>a').removeClass("active");
    	$(this).addClass("active");
    	$('#loginForm').hide();
    	$('#safeLoginForm').show();
    	$('.errorTips').text('');
    	$("#safeLoginForm img").click();
    });
    $('#nextStep').click(function(){

		if($('#safeUserName').val() == ""){
			$('#safeUserName').attr("placeholder","请输入用户名");
			$('#safeUserName').focus();
			return;
		}
		
		var regAccount = /^[a-zA-Z]\w{5,13}/g;
		if(!regAccount.test($('#safeUserName').val())){
			$('#safeUserName').focus();
			return;
		}
		
		if($('#safeUserCode').val() == ""){
			$('#safeUserCode').attr("placeholder","请输入验证码");
			$('#safeUserCode').focus();
			return;
		}
		
		Service("/checkCode","GET","code="+$('#safeUserCode').val()+"&account="+$('#safeUserName').val(),1,function(data){
    		if(data == 0){
    			$(".errorTips").text("验证码错误");
    	    	$("#safeLoginForm img").click();
    		}else if (data == 2) {
    			$(".errorTips").text("用户不存在");
    	    	$("#safeLoginForm img").click();
			}else{
    			var args = "account="+$('#safeUserName').val();
    	    	Service("/user/getMessage","GET",args,1,function(data){
    	    		$('#safeInfo').text(data==null?"":data);
    	        });
    			$('#loginForm').hide();
    			$('#safeLoginForm').hide();
    			$('#safeLoginInfoForm').show();
    			$('#safeLoginInfoForm img').click();
    		}
        });
    });
    $('#safeLogin').click(function(){
    	if($('#safeUserPwd').val() == ""){
    		$('#safeUserPwd').attr("placeholder","请输入密码");
    		$('#safeUserPwd').focus();
    		return;
    	}
    	
    	var password = $.md5($("#safeUserPwd").val())+$("#passwordToken").val();
    	var args = "account="+$('#safeUserName').val()+"&code="+$('#safeUserCode4').val()+"&password="+$.md5(password);
    	ajaxExt({
    		url:"/safeLogin",
    		method:'post',
    		data:args,
    		dataType:'json',
    		callback:function(rel) {
    			location.href = rel;
    		},
    		complete:function() {
    			$('#safeLoginInfoForm img').click();
    		}
    	});
    });
    
    //正常登陆提交
    var submitCount = 0;
    $('#loginForm').submit(function(){
    	submitCount++;
    	if(submitCount == 1){
        	var token = $("#loginForm").attr("data-token");
        	var content = $("#userName").val();//base64_encode($("#userName").val());
	    	
//	    	var keyHex = CryptoJS.enc.Utf8.parse(token);
//	        var encrypted = CryptoJS.DES.encrypt(content, keyHex, {
//	            mode: CryptoJS.mode.ECB,
//	            padding: CryptoJS.pad.Pkcs7
//	        });
//			$("#account").val(encrypted.toString());
	    	$("#account").val(content);
			var password = $("#userPassword").val();
			$("#password").val($.md5(password));
			return true;
    	}
	return false;
    });
});
function forgetPassword(){
    $('.loginArea').hide();
    $('.findPwdMain').show();
    $('.footer').css({"position":"relative","margin-top":"20px"});
}
