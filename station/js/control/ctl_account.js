// API



var cbUserPresence = null;
var cbUserLocaltionChanged = null;
var helpdata = null;
var cbUserReportMessage = null;
//-------------------------------
// 设置用户状态相关回调
//-------------------------------
//cbLocation(uid,x,y,address,h,s,d,tm)
//uid:账号
//x:经度
//y:纬度
//address:地址信息
//h:高度
//s:速度
//d:方向

//cbReportMessage(uid,x,y,url,desc,resType,resSize,tm)
//uid:账号
//x:经度
//y:纬度
//url:资源url
//desc:描述
//resType:资源类型 
//resSize:资源大小
//tm:时间

//cbPresence(members)
//members[i].ipocid 用户账号
//members[i].userstate 在线状态   USER_STATE_ON_LINE,USER_STATE_OFFLINE

//cbWarningFence(uid,fid,fn,x,y,tm)
//uid:账号
//fid:围栏ID
//fn:
//x:经度
//y:纬度
//tm:时间
function user_push_event_cb(cbLocation, cbReportMessage, cbPresence, cbFence) {
	cbUserLocaltionChanged = cbLocation;
	cbUserReportMessage = cbReportMessage;
	cbUserPresence = cbPresence;
	cbWarningFence = cbFence;

}


function account_login(ipocid, pwd) {
	doLogin(DM_IP, ipocid, pwd);
}

//登录回调函数
function onLogin(result, secret) {

	if (result == UI_LOGIN_RESULT_OK) {
		cbLoginSuccessed();
		
	} else {
		  Dispatcher_UserStateOffline();
 
		cbLoginErrorState();
	}
}

/**
 * 两秒后如果没有收到退出回复，自动退出
 * */
function account_loginOut() {
	g_isExit = true;
	doLoginOut();
	window.setTimeout(function()
	{							
	    logoutHerf();
	}, 2 * 1000); 
}


function onLogout(result) {
	try {
		if (g_isExit) {
			logoutHerf();
		}
	} catch (e) {

	}
}

function onHeartbeat(result) {
	if (result == UI_LOGIN_RESULT_ERR_SINGLE) {
		$('.main_linkstate').children('i').html('离线');
		$('.main_linkstate').children('i').css('color', '#dadfda');
		$('.main_linkstate').children('img').attr('src', 'img/icon/onlineerror.png');
		alert("您的帐号已在其它客户端登录!");
		logoutHerf();
	} else if (result == UI_LOGIN_RESULT_OK) {

	}
}


//location 用户位置推送处理
function onUserLocaltionChanged(json) {

	if (cbUserLocaltionChanged != null) {
		
		var x = null;
		var y = null;
		var google_x=null;
		var google_y=null;
		var address = "";
		var h = 0;
		var s = 0;
		var d = 0;
		var maptype = 0;
		var str = json.location;
		var str1 = str.split(";");
		var google_str=str.substring(str.indexOf("G"),str.indexOf("H"));
		console.log(google_str);
		str = str.substring(0, str.indexOf(";"));

		if (str.substring(0, str.indexOf(":")) == "BD") {
			x = str.substring(str.indexOf(":") + 1, str.indexOf(","));
			y = str.substring(str.indexOf(",") + 1, str.length);
		}

		if (google_str.substring(0, google_str.indexOf(":")) == "GG") {
			google_x = google_str.substring(google_str.indexOf(":") + 1, google_str.indexOf(","));
			google_y = google_str.substring(google_str.indexOf(",") + 1, google_str.length);
		}

		if (str1.length > 3) {
			h = str1[2].substring(str1[2].indexOf(":") + 1, str1[2].length);
			s = str1[3].substring(str1[3].indexOf(":") + 1, str1[3].length);
			d = str1[4].substring(str1[4].indexOf(":") + 1, str1[4].length);
		}
		if (str1.length > 5) {
			var poi = str1[5].split(":");
			address = poi[1];
		}
		if (str1.length > 6) {
			var type = str1[6].split(":");
			maptype = type[1];
			console.log('位置类型'+maptype); //0是gps 
		}
		cbUserLocaltionChanged(json.uid, x, y, address, h, s, d, json.time,maptype,google_x, google_y);
	}
}

// user presence
function onContactPresence(json) {
	if (cbUserPresence != null) {
		/*		
				for(var i=0;i<json.sessionmember.length;i++)
				{
					alert(json.sessionmember[i].ipocid +":"+ json.sessionmember[i].userstate)
				}
		*/
		cbUserPresence(json.sessionmember);
	}
}

//fence
function pushWarningFence(json) {
	var fJson = json.f;
	if (fJson != null) {
		for (var j = 0; j < fJson.length; j++) {
			if (fJson[j].fo == loginMe) {
				cbWarningFence(fJson[j].frMid, fJson[j].frFid, fJson[j].fn, fJson[j].frMlocationX, fJson[j].frMlocationY, fJson[j].frTime, fJson[j].id);
			}
		}
	}
}
function pushWarningTask(json)
{
	 
}

//report
function onUserMessage(json) {
	 console.log('上报'+JSON.stringify(json));
	if (cbUserReportMessage != null) {
		var x = null;
		var y = null;
		var str = json.location;
		var imgSize = str.substring(str.indexOf("RS:") + 3, str.length);
		var imglen = 0;
		if (str.indexOf("cnt:") > -1)
			imglen = str.substring(str.indexOf("cnt:") + 4, str.length);
		str = str.substring(0, str.indexOf(";"));
		if (str.substring(0, str.indexOf(":")) == "BD") {
			y = str.substring(str.indexOf(":") + 1, str.indexOf(","));
			x = str.substring(str.indexOf(",") + 1, str.length);
		}
		cbUserReportMessage(json.rrid,json.uname,json.uid, x, y, json.url, json.detail, json.type, json.time,imglen);
	}
}
