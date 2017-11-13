$(function(){
	/* 头部所有游戏--高度 */
    var allLotteryHeight = $('.allLotteryList').height();
    $('.hotLotteryList').css('height',(allLotteryHeight -68) + 'px');

	$("input[data-group]").click(function(){
		var group = $(this).attr("data-group");
		var checked = $(this).is(":checked");
		$("input[name$='"+ group +"']").prop("checked",checked);
	});
	$(".dialogBoxContent").appendTo("#dialogBox");
	
	/* 刷新余额 */
	$('body').everyTime('1das','UserReferer',autoReferer);	//10秒
	$("#refererUser").click(function(){
		$("#refererUser i").addClass("rotated");
		ajaxExt({
			url:'/user/amount',
			dataType:'json',
			loading:'',
			noError:true,
			callback:function(rel){
				var amount = rel.amount.toFixed(4);
				if ( $("#accountHide").attr('data-value') == "false" ){
					$(".userBalance").text(amount).attr('title', amount);
				}
				$(".userBalance").attr('data-value',amount);
			},
			complete:function(){
				$("#refererUser").oneTime('1s','refreshRotate',function(){
					$("#refererUser i").removeClass("rotated");
				});
			}
		});
	});

	//隐藏金额
	$("#accountHide").click(function () {
		var userBalanceValue = $('#userBalance').attr('data-value');
		if ( $(this).attr('data-value') == "false" ) {
			$('#userBalance').html('******').attr('title', '******');
			$('#appNumUserBalance,#acctInfoUserBalance').html('******');
			$(this).attr({'data-value':'true', 'title':'显示金额'}).addClass('active');
		} else {
			$('#userBalance').html(userBalanceValue).attr('title', userBalanceValue);
			$('#appNumUserBalance,#acctInfoUserBalance').html(userBalanceValue);
			$(this).attr({'data-value':'false', 'title':'隐藏金额'}).removeClass('active');
		}
	});

	//用户中心左侧导航
	$('.leftListBigItem').on('click',function(){
		$('.leftListItem').hide();
		$(this).next().show();
		$('.leftListBigItem').removeClass('active');
		$(this).addClass('active');
	});
	
	//设置昵称
	$('.username').hover(function(){
		$('.setNickName').show();
	},function(){
		$('.setNickName').hide();
	});
	setTimeout(function(){
		$('.setNickName').hide();
	},3000);
	
	//变为红色的输入框，在用户点击该输入框之后变为原来颜色
	$('body').on('focus','.labelCond',function(){
		$(this).parent().removeClass('errorMsg').next('.labelMsg,.errorWarn').html('');
	});
});

function serializeObject(id){
	var result = {};
	var data = $(id).serializeArray();
	$.each(data,function(i,d){
		result[d.name] = d.value;
	});
	return result;
}


//刷新金额
function autoReferer(){
	$("#refererUser").click();
}

//只能使用数字
function inputNumber(obj){
	obj.value = obj.value.replace(/\D/g,'');
}

function ajaxExt(options) {
	var noError = options.noError;
	var doOther = options.doOther || false;
	var settings = {
		loading : $("body").get(0),
		cache : false,
		complete:function(){},
		success : function(rel) {
			spinner.spin();
			try {
				rel = eval('('+rel+')');
			} catch (e) {
			}
			if (typeof (rel) == 'string') {
				//普通XML
				this.callback(rel);
			} else {
				//JSON
				if (rel.status == 302) {
					location.href = "/logout";
				} else if (rel.status != 200) {
					if(doOther){
						this.callback(rel.content);
					}else if(!noError){
						$.alert(rel.content);
					}
				} else {
					this.callback(rel.content);
				}
			}
			this.complete();
		},
		error : function() {
			spinner.spin();
			if(!noError){
				$.alert("网络繁忙，请重试");
			}
			this.complete();
		}
	};
	settings = jQuery.extend(settings, options);
	spinner.spin(settings.loading);
	$.ajax(settings);
}
function ajaxObject(url, method, callback) {
	spinner.spin($("body").get(0));
	ajaxExt({
		noError : true,
		type : method,
		url : url,
		cache : false,
		dataType : 'json',
		callback:callback
	});
}
function ajaxLoad(id, url, param, callback) {
	spinner.spin($("body").get(0));
	param = param || "";
	$.post(url, param, function(data){
		$("#" + id).html(data);
		if (callback) {
			callback(data);
		}
		spinner.spin();
	});
}

function Service(url, method, d, h, callback,isAsync,needSheel) {
	
	var mask = $("<div class=\"mask\"></div>");
	if(typeof needSheel == "boolean"){
		if (needSheel) {
			//开始遮蔽
			$(mask).css({"background":"rgba(0, 0, 0, 0)","z-index":"100000","filter":"Alpha(opacity=0)"});
			$('body').append(mask);
		}
	}else{
		//开始遮蔽
		$(mask).css({"background":"rgba(0, 0, 0, 0)","z-index":"100000","filter":"Alpha(opacity=0)"});
		$('body').append(mask);
	}
	var header;
	var flag = true;
	if(typeof isAsync == "boolean"){
		flag = isAsync;
	}
	if (h == 1) {
		header = "application/x-www-form-urlencoded";
	} else if (h == 2) {
		header = "application/json";
	}
//	spinner.spin($("body").get(0));
	ajaxExt({
		type : method,
		data : d,
		url : url,
//		cache : false,
		dataType : 'json',
		async: flag,
		callback:callback,
		complete:function(){
			$(mask).remove();
		},
		headers : {
			"Content-Type" : header
		}
	});
}
//弹框
$.alert = function(string, sign, time) {
	layer.closeAll();
	if (sign == undefined) {
		sign = '';
	} else {
		sign = ' ' + sign;
	}
    var content = "<p class='lottTipLayerTitle'>温馨提示</p><div class='lottTipBox'><p class='msg'><i></i><span class='content'>" + string + "</span></p></div><div class='lottTipBtn'><a href='javascript:;' class='btn closeBtn'>关闭</a></div>";
    var index = layer.open({
        type: 1,
        skin: 'lottTipLayer' + sign,
        shift: 5,
        area: ['480px', '260px'],
        title: false,
        content: content,
		time: time ? time : 0,
        success: function () {
        	$('.closeBtn').on('click',function(){
        		layer.closeAll();
        	});
        },
        cancel:function(){
        	layer.closeAll();
        }
    });
};
$.dialog = function(ele, w ,h) {
	var index = layer.open({
		type: 1,
		skin: 'lottTipLayer',
		shift: 5,
		area: [w , h],
		title: false,
		content: $(ele),
		success: function () {
			$('.closeBtn').on('click',function(){
				layer.close(index);
			});
		}
	});
};

//校验通用elem：input选择器，msg：错误信息
function falseAction(elem,msg){
	elem.parent().next().html(msg);
	elem.parent().addClass('errorMsg').removeClass('trueMsg');;
	return false;
}
function trueAction(elem){
	elem.parent().next().html("");
	elem.parent().removeClass('errorMsg').addClass('trueMsg');
	return true;
}