
// var chlspeekflag = false; //频道讲话
var callInId; //呼入临时会话id
var callInName; //临时会话name
// var callInflag = false; //临时会话讲话
var callArrList = []; //临时会话集合
var channelAlls = []; //频道集合
var userOnlineStatus = []; //
var gOnlineListenerRefresh = new Array();
var speakingNow = '';


function videoModifyUsername() {
	var list = videoList.keySet();
	if (list.length > 0) {
		list.forEach(function(item) {
			var userinfo = usersAll.get(item);
			videoList.get(item).Name = userinfo.Name;
		})
	}
}

function modifyVideo(array) {
	var list = videoList.values();
	if (list.length > 0) {
		list.forEach(function(item) {
			for (var i = 0; i < array.length; i++) {
				if (item.sid === array[i].Id) {
					item.chatName = array[i].Name;
					break;
				}
			}
		})
	}
}

//获取全部会话
function getAllConversations() {
	var body = '{"Code":"10310","Body":{"SessionId":"' + sessionId + '"}}';
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		if (ret.Result == 200) {
			callArrList = ret.Conversations;
			modifyVideo(callArrList);
		    // console.log(callArrList)
			toTheChannel(); //频道
			channel1();
		}
		// else {
		// 	showAlert('获取会话列表失败！')
		// }
	})
}

//获取全部频道
function getAllChannels() {
	var body = '{"Code":"10305","Body":{"SessionId":"' + sessionId + '"}}';
	// console.log(body);
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		if (ret.Result == 200) {
			channelAlls = ret.Channels;
			modifyVideo(channelAlls);
		}
		// else {
		// 	showAlert('获取频道列表失败！')
		// }
	})
}

//会话全局设置
function communicate_init() {
	var getNodeData = orgNodesTree.getOrgNodesCallback.bind(orgNodesTree);  //树形结构
	orgGetGroup(getNodeData);
	session_event_media_cb(cbMediaTalkPrepare, cbMediaTalkBegin, cbMediaTalkEnd, cbMediaListenBegin, cbMediaListenEnd);
	session_event_state_cb(cbSesConnecting, cbSesEstablished, cbSesReleased, cbSesIncomingAlert, cbSesPresence);
	//全局IM消息
	session_message_event_msg_cb(cbSesMsgSent, cbSesMsgRecv, cbCaptureGet, cbLocalCaptureFinish, cbLocalCaptureGet, cbVStoreGet);
	session_message_event_rec_cb(cbSesMsgRecStart, cbSesMsgRecStop, cbSesMsgRecPlayStart, cbSesMsgRecPlayStop);
	//用户位置,上报位置,用户在线状态,电子围栏
	user_push_event_cb(cbLocation, cbReportMessage, cbPresence, cbFence);
	//自定义
	online_event_refresh_register(cbUserOnlineState, cbChannelOnlineState, cbVideoOnlineState);
	// regRpcForceOfflineListener(cbBeatDownline);
	
	//案件管理
	Case_Switch?$('.leftNav').find('li').eq(5).show():$('.leftNav').find('li').eq(5).hide();
}


function cbUserOnlineState() {
	// onlineInfo
}

function cbChannelOnlineState() {
	// onlineInfo
}

function cbVideoOnlineState() {
	// onlineInfo
}

//频道连接中
function cbSesConnecting(sessionId) {
	var index = sessionId.charAt(0);
	if (index == 'G') return;
	
	if ($('#station_video').css("display") == 'block') return;

	var status = $('#' + sessionId + 'a').children('.channel_listenset').children('.channel_listenset_top ').find('.c_connec_status');

	function sessioning() {
		var status1 = $('.channel_telllevel2name').find('strong');
		var imgs = $('.channel_tellbtn_msg').find('img');
		status1.text('(连接中)');
		$('.channel_telllistensay_cue01').show();
		$('.channel_telllistensay_cue01').text('连接中...');
		imgs.hide();
		// imgs.eq(1).show();
		imgs.eq(3).show();

        // setTimeout(function(){
        //    var session = sessionGetById(sessionId);
        //    if(session != null){	
        //      if(session.sessionState == SESSION_STATE_CONNECTING){	
        //        imgs.hide();
		      //  imgs.eq(3).show();
		      //  }
        //     }
        // }, 100);

	}

	if (index == 'C') {
		status.text('(连接中)');
	} else {
		sessioning();
	}

}



function createChannelMonitorData() {
	var name = $('#company_name').text();
	var channelList = channelAlls.concat(channelOthers);

	for (var i = 0, len = gSessionArray.length; i < len; i++) {
		var sid = gSessionArray[i].sessionId;
		if (sid.charAt(0) === 'C') {
			for (var j = 0, lon = channelList.length; j < lon; j++) {
				if (gSessionArray[i].sessionId === channelList[j].Id) {
					gSessionArray[i].Name = channelList[j].Name;
					break;
				}
			}
		} 

		// else {
		// 	for (var k = 0, lan = callArrList.length; k < lan; k++) {
		// 		if (gSessionArray[i].sessionId === callArrList[k].Id) {
		// 			gSessionArray[i].Name = callArrList[k].Name;
		// 			break;
		// 		} else {
		// 			gSessionArray[i].Name = name;
		// 		}
		// 	}
		// }

	}
}

//频道连接成功
function cbSesEstablished(sessionId) {
	console.log("已建立" + sessionId);
	var index = sessionId.charAt(0);
	if (index == 'G') return;
	if (index == 'C') {
		createChannelMonitorData();
		refreshChannelMonitorList();
	}
	
	// if ($('#station_video').css("display") == 'block') return;
	
	var status = $('#' + sessionId + 'a').children('.channel_listenset').children('.channel_listenset_top ').find('.c_connec_status');
	var imgs = $('.channel_tellbtn_msg').children('img');
	var status1 = $('.channel_telllevel2name').children('strong');

	if (index == 'C') {
		status.text('(已连接)');
		if (!speakingNow) {
			$('.channel_btn_msg').children().attr('src', 'img/icon/channel/channel_btn_msg.png');
			$('.channel_listensay_cue03 span').text('点击对讲按钮开始对讲');
		}
	} else {
		$('.channel_telllistensay_cue01').hide();
		$('.channel_telllistensay_cue03').show();
		imgs.hide();
		imgs.eq(2).show();
		status1.text('(已连接)')
	}
}



//频道释放
function cbSesReleased(sessionId, result) {

	var index = sessionId.charAt(0);
	if (index == 'G') return;

	$('.call_coming').hide();
	$('#bg-color').hide();
	
	var imgs = $('.channel_tellbtn_msg').children('img');
	if (result === SESSION_RELEASE_REASON_ERROR) {return;}
	if (index !== 'C') {

		$('.channel_telllevel2name').children('strong').text('(已断开)');
		$('.channel_telllistensay_cue01').show().text('点击按钮进行连接');
		$('.channel_telllistensay_cue03').hide();
		imgs.hide();
		imgs.eq(0).show();
		var that = $('#' + sessionId);
		var obj = that.children('div');
		var classname = that.parent().attr('class');
		var chatCurrentOpen = findChatCurrentUsers(sessionId);
		refreshChatMembers(chatCurrentOpen, obj, classname)
	}

	callResultBack(result);
	if (index == 'C') {
		createChannelMonitorData();
		refreshChannelMonitorList();
	}
}

//频道退出
function ui_channel_exit(channelId) {
	var lockid = chatLockidGet();
	if (lockid === channelId) {
		chatUnlockSetting(lockid);
	}
	session_channel_exit(channelId);
	// console.log(channelId + "退出");
	if ($('#station_video').css("display") == 'block') return;

	var status = $('#' + channelId + 'a').children('.channel_listenset').children('.channel_listenset_top ').find('.c_connec_status');
	status.text('(已断开)');
}

//频道申请话语权(none)
function ui_channel_apply_voice() {

}


//话语权申请
function cbMediaTalkPrepare(sessionId) {
	// console.log('申请中。。。');
	var index = sessionId.charAt(0);
	if (index == 'G') return;
	if ($('#station_video').css("display") == 'block') {
		$('.video_statue').text('申请中');
		// return;
	}
	
	var id = $('.channel_box2').attr('id');
	id = id.slice(0, id.length - 1);
	if (index == 'C') {
		if (id == sessionId)
			$('.channel_listensay_cue03 span').text('连接中。。。');
	} else {

	}

}

//我开始讲话
function cbMediaTalkBegin(sessionId) {
	console.log(sessionId + '讲话开始！');
	var index = sessionId.charAt(0);
	
	if (index == 'G') {
		broadcastTimeBegin();
		$('.radio_main_sayup').attr('src', 'img/icon/radio/radio_say_down.png');
		return;
	}
	
	var sessionMediaState = sessionGetById(sessionId).mediaState;

	if (index == 'C') {
		pin_btn_state(sessionId, sessionMediaState);
	} else {
		chat_btn_state(sessionId, sessionMediaState);
	}
	pin_monitorlist_btn_state(sessionId, sessionMediaState);
	pin_video_btn_state(sessionId, sessionMediaState);
	speakingNow = loginId;
}

//我讲话结束
function cbMediaTalkEnd(sessionId, reason) {
	console.log(sessionId + '讲话结束！');
	var index = sessionId.charAt(0);
	if (index == 'G') {
		broadcastTimeEnd();
		isBroadcastSpeaking = false;
		$('.radio_main_sayup').attr('src', 'img/icon/channel/channel_btn_msg.png');
		if (reason == MEDIA_TALK_FINISH_REASON_SPEAKING_FULL) {
			showAlert('当前有广播讲话中，请稍后再试...')
		}		
		return;
	}
	
	var sessionMediaState = sessionGetById(sessionId).mediaState;

	if (index == 'C') {
		pin_btn_state(sessionId, sessionMediaState);	
	} else {
		chat_btn_state(sessionId, sessionMediaState);
	}
	pin_monitorlist_btn_state(sessionId, sessionMediaState);
	pin_video_btn_state(sessionId, sessionMediaState);
	speakingNow = '';
}

function chat_btn_state(cid, mediasate) {
	var id = $('.channel_tellall').attr('id');
	id = id.slice(0, id.length - 1);
	var title = $('.channel_telllistensay_cue03').children('span');
	var obj = $('.channel_tellbtn_msg').find('img').eq(2);
	
	if (mediasate === MEDIA_STATE_TALKING) {
		if (id === cid) {
			//我在讲话
			title.text('我在讲话');
			obj.attr('src', 'img/icon/channel/channel_btn_msg1.png');	
		}
	} else if (mediasate === MEDIA_STATE_IDLE) {
		if (id === cid) {
			//我讲话结束，处于空闲中
			obj.attr('src', 'img/icon/channel/channel_btn_msg.png');
			title.text('点击对讲按钮开始对讲');
		}
	}
}

function pin_btn_state(cid, mediasate) {
	
	var id = $('.channel_box2').attr('id');
	var speak = $('.channel_listensay_cue03 span');
	id = id.slice(0, id.length - 1);
	if (mediasate === MEDIA_STATE_TALKING) {
		if (id === cid) {
			$('.channel_btn_msg').children().attr('src', 'img/icon/channel/channel_btn_msg1.png');
			speak.text('我在讲话');
			speak.attr('title', '我在讲话')
		}
	} else if (mediasate === MEDIA_STATE_IDLE) {
		if (id === cid) {
			$('.channel_btn_msg').children().attr('src', 'img/icon/channel/channel_btn_msg.png');
			speak.text('点击对讲按钮开始对讲');
			speak.attr('title', '空闲中')
		}
	}
}

function pin_monitorlist_btn_state(cid, mediasate) {
	var speak_li = $('.channel_details_main').find('.' + cid);
	var jianStatus = speak_li.find('.jianStatus');
	if (mediasate === MEDIA_STATE_TALKING) {
		jianStatus.text('我在讲话');
		speak_li.find('.channel_details3').attr('src', 'img/icon/channel/jian_speak.png');
		jianStatus.attr('title', '我在讲话');
	} else if (mediasate === MEDIA_STATE_IDLE) {
		jianStatus.text('空闲中');
		speak_li.find('.channel_details3').attr('src', 'img/icon/channel/channel_details2.png');
		jianStatus.attr('title', '空闲中');
	}
}

function pin_video_btn_state(cid, mediasate) {
	var speakimg = $('.video_speak');
	var id = speakimg.data('cid');
	var state = $('.video_statue');
	if (mediasate === MEDIA_STATE_TALKING) {
		if (id === cid) {
			speakimg.attr('src', 'img/icon/video/video_speak1.png');
			state.text('我在讲话');
			state.attr('title', '我在讲话');
		}
	} else if (mediasate === MEDIA_STATE_IDLE) {
		if (id === cid) {
			speakimg.attr('src', 'img/icon/video/video_speak.png');
			state.text('空闲中');
			state.attr('title', '空闲中');
		}
	}
}

//别人开始讲话
function cbMediaListenBegin(channelId, speaker) {		
	var index = channelId.charAt(0);	
	var name = usersAll.get(speaker) ? usersAll.get(speaker).Name : speaker;

	if (index == 'G') {
		isOtherBroadcastSpeaking = true;
		var obj = $('#broadcast_notice');
		obj.children('.broadcast_speaker').text(name);
		obj.show();
	}

	if (index == 'C') {
		other_begin_pin_btn_state(channelId, name);
		other_begin_pin_monitorlist_btn_state(channelId, name);
		other_begin_pin_video_btn_state(channelId, name);
		
	} else {
		other_begin_chat_btn_state(channelId, name);
		other_begin_pin_monitorlist_btn_state(channelId, name);
		other_begin_pin_video_btn_state(channelId, name);
	}
	hidden_chat_appear(channelId, speaker);
	speakingNow = speaker;
}


function other_begin_pin_btn_state(cid, name) {
	var id = $('.channel_box2').attr('id');
	id = id.slice(0, id.length - 1);
	
	if (id === cid) {
		var speak = $('.channel_listensay_cue03 span');
		speak.text(name + '正在讲话');
		speak.attr('title', name + ' 正在讲话');
	}
}

function other_begin_chat_btn_state(cid, name) {
	var id = $('.channel_tellall').attr('id');
	id = id.slice(0, id.length - 1);
	var title = $('.channel_telllistensay_cue03').children('span');

	if (id === cid) {
		title.text(name + '正在讲话');
		title.attr('title', name + ' 正在讲话');
		$('#channel_img').hide();
		$('#channel_img1').show();
	}
}

function other_begin_pin_monitorlist_btn_state(cid, name) {
	var speak_li = $('.channel_details_main').find('.' + cid);
	speak_li.children('.channel_details_mains').find('i').text(name + '正在讲话');
	speak_li.find('.jianStatus').attr('title', name + ' 正在讲话');
}

function other_begin_pin_video_btn_state(cid, name) {
	var id = $('.video_speak').data('cid');
	if (id === cid) {
		var speak = $('.video_statue');
		speak.text(name + '在讲话');
		speak.attr('title', name + ' 在讲话')
	}
}


//别人结束讲话
function cbMediaListenEnd(sessionId) {
	var index = sessionId.charAt(0);
	var title = $('.channel_telllistensay_cue03').children('span');
		$('#channel_img1').hide();
		$('#channel_img').show();
	if (index == 'G') {
		isOtherBroadcastSpeaking = false;
		var obj = $('#broadcast_notice');
		obj.children('.broadcast_speaker').text('');
		obj.hide();
	}


	if (index == 'C') {
		other_stop_pin_btn_state(sessionId);
		other_stop_pin_monitorlist_btn_state(sessionId);
		other_stop_pin_video_btn_state(sessionId);
	} else {
		other_stop_chat_btn_state(sessionId);
		other_stop_pin_monitorlist_btn_state(sessionId);
		other_stop_pin_video_btn_state(sessionId);
	}
	
	var tellBar = document.getElementById('hiddenMessageTell');
	var data = tellBar.getAttribute('sid');
	if (tellBar.style.display == 'block' && data === sessionId) {
		tellBar.style.display = 'none';
	}	
	speakingNow = '';
}

function hidden_chat_appear(channelId, speaker) {
	var index = channelId.charAt(0);
	if (index == 'G') return; 
	var video = document.getElementById('station_video');
	if (video.style.display == 'block') return;
	
	var channel = document.getElementById('station_channel');
	if (channel.style.display == 'block') {
		var channelbox = $('.channel_box2');
		var chatbox = $('.channel_tellall');
		if (channelbox.css('display') == 'block' && index == 'C') {
			var id = channelbox.attr('id');
			id = id.slice(0, id.length - 1);
			if (id == channelId) return;
		}
		if (chatbox.css('display') == 'block' && index != 'C') {
			var cid = chatbox.attr('id');
			cid = cid.slice(0, cid.length - 1);
			if (cid == channelId) return;
		}
	}
	var speakerName;
	var chatName;
	var session = sessionGetById(channelId);
	var tellBar = document.getElementById('hiddenMessageTell');
	var oP = tellBar.getElementsByTagName('p');
	// var map = document.getElementById('allmap');
	// var mapstdMpCtrl = document.getElementsByClassName('BMap_stdMpCtrl')[0];
	// var posleft = map.offsetLeft + mapstdMpCtrl.offsetWidth;
	var posleft = 685;
	if (index == 'C') {
		chatName = session.Name;
	} else {
		for (var i = 0; i < callArrList.length; i++) {
			if (channelId == callArrList[i].Id) {
				chatName = callArrList[i].Name;
				break;
			}
		}
	}
	if (usersAll.size() > 0) {
		var userinfo = usersAll.get(speaker);
		speakerName = userinfo ? userinfo.Name : speaker;
	} else {
		speakerName = speaker;
	}
	chatName = '<span class="notlong" title="'+chatName+'">'+ chatName +'</span>';
	speakerName = '<span class="notlong" title="'+speakerName+'">'+ speakerName +'</span>';
	oP[0].innerHTML = index == 'C' ? '频道：' + chatName : '会话：' + chatName;
	oP[1].innerHTML = speakerName + '&nbsp;&nbsp;在讲话';
	tellBar.style.left = posleft + 'px';
	tellBar.style.display = 'block';
	tellBar.setAttribute('sid', channelId);
}

// function switchNavAboutChatmsg() {
// 	var video = document.getElementById('station_video');
// 	if (video.style.display == 'block') return;
// 	var msg = document.getElementById('hiddenMessageTell');
// 	if (msg.style.display == 'block') {
// 		var mapstdMpCtrl = document.getElementsByClassName('BMap_stdMpCtrl')[0];
// 		var map = document.getElementById('allmap');
// 		var distance = map.offsetLeft + mapstdMpCtrl.offsetWidth;
// 		msg.style.left = distance + 'px';
// 	}
// }


function other_stop_pin_btn_state(cid) {
	var id = $('.channel_box2').attr('id');
	id = id.slice(0, id.length - 1);
	
	if (id === cid) {
		var speak = $('.channel_listensay_cue03 span');
		speak.text('点击对讲按钮开始对讲');
		speak.attr('title', '空闲中');
	}
}

function other_stop_chat_btn_state(cid) {
	var id = $('.channel_tellall').attr('id');
	id = id.slice(0, id.length - 1);
	var title = $('.channel_telllistensay_cue03').children('span');
	
	if (id === cid) {
		title.text('点击对讲按钮开始对讲');
		title.attr('title', '空闲中');
	}
}

function other_stop_pin_monitorlist_btn_state(cid) {
	var speak_li = $('.channel_details_main').find('.' + cid);
	speak_li.children('.channel_details_mains').find('i').text('空闲中');
	speak_li.find('.jianStatus').attr('title', '空闲中');
}

function other_stop_pin_video_btn_state(cid) {
	var id = $('.video_speak').data('cid');
	if (id === cid) {
		var speak = $('.video_statue');
		speak.text('空闲中');
		speak.attr('title', '空闲中');
	}
}

//频道对讲按钮
function chlSpeakapply() {
	var id = $('.channel_box2').attr('id');
	id = id.slice(0, id.length - 1);

	ondispaterSpeak(id);
}

//监听列表中对讲按钮
function jianChannelSpeaking(self) {
	var id = $(self).parent().attr('class');
	ondispaterSpeak(id);
}

//实时视频对讲键
function veChatSpeaking() {
	var cid = $('.video_speak').data('cid');
	ondispaterSpeak(cid);
}

//临时会话对讲按钮
function snapChatBegin() {
	ondispaterSpeak(callInId);
}

function ondispaterSpeak(id) {
	var session = sessionGetById(id);

	if (!session) {
		showAlert('会话没有连接，不能进行讲话！', 2000, true);
		return false;
	}

	if (session.mediaState === MEDIA_STATE_TALKING) {
		session_talk_release();
	} else {
		session_talk_request(id);
	}
}

// function snapChatBegin() {
// 	// console.log(callInflag)
// 	// console.log(callInId)
// 	if (!callInflag) {
// 		session_talk_request(callInId);
// 		callInflag = true;
// 	} else {
// 		session_talk_release();
// 		callInflag = false;
// 	}
// }

//呼叫来电

function cbSesIncomingAlert(chatId, callerName) {
	console.log('呼叫来电');
	console.log(chatId);
	console.log(callerName);
	callInId = chatId;
	var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":["' + callerName + '"]}}';

	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		if (ret.Result == 200) {
			callInName = ret.Users[0].Name;
			$('.caller').text(ret.Users[0].Name);

		} else {
			callInName = callerName;
			$('.caller').text(callerName);
		}
		$('.call_coming').show().data('user', callerName);
		$('#bg-color').show();
	})

	// var callerInfo = usersAll.get(callerName);
	// callerName = callerInfo ? callerInfo.Name : callerName;
	// $('.caller').text(ret.Users[0].Name);
	// $('.call_coming').show().data('user', callerName);
	// $('#bg-color').show();

}

//接听来电
function call_comingAccept() {
	Close_window();
	$('.call_coming').hide();
	$('#bg-color').hide();
	gSessionArray.forEach(function(item) {
		var index = item.sessionId.charAt(0);
		var state = item.sessionState;
		if (index !== 'G' && index !== 'C' && state === SESSION_STATE_DIALOG) {
			session_call_bye(item.sessionId);
		}
	})
	toTheChannel(snapChatAppear);
	session_call_incoming_accept(callInId);
	var have = arrobjContainsElement(callArrList, callInId, 'Id');
	//$('.channel_tellall').attr('id', callInId + 'a');

	if (have) {
		var ul = $('.channel_main_tell').find('#' + callInId).children('div')[0];
		channel10312(callInId, ul, 'channel_level1', true);
	} else {
		var user = $('.call_coming').data('user');
		var obj = {
			"Id": callInId,
			"Name": callInName,
			"Creator": user
		};
		callArrList.push(obj);
		var l = callArrList.length;
		var containers = '<li id="' + obj.Id + '" class="chatOpenOnly" name="' + obj.Id + '"  tellname="' + obj.Id + '"><div id="new' + l + '" onclick="channeltelllevel2(this)"><i>' + obj.Name + '</i><img src="img/icon/channel/channel_select.png" class="fr sessIconDown"alt="" /></div><ul class="channel_level2"></ul></li>';
		$('.channel_main_tell .channel_other_level1').prepend(containers);
		var ul = document.getElementById('new' + l);
		channel10312(callInId, ul, 0, true);
	}
	if($('.channel_tellall').css("margin-left")==channel_column2||$('.channel_left1').css("margin-left")==channel_column2){
    	$('.channel_left1').css("margin-left","80px");
  		$('.channel_tellall').css('margin-left','0px');
      $('.channel_right1').hide();
      $('.channel_right2').css('background-image', ' url(./img/left_icon.png)');
    }
	IMessageInterfac(callInId);
	
}

//拒绝来电
function call_comingHangup() {
	session_call_incoming_reject(callInId);
	$('.call_coming').hide();
	$('#bg-color').hide();
	showAlert('已拒接')
}

//临时会话页面跳转
function toTheChannel(fn) {
	var navLi = $('.leftNav').find('li');
	var channel = navLi.eq(2);
	// var navA = $('.radio_footer_set a');
	var navA = $('.radio_footer_set b');

	var sideBar = $('#sideBar');
	// var forTo = channel.find("a").attr('href');
	var forTo = channel.find("b").attr('href');
	
	var str = forTo.slice(8, forTo.length - 5);
	var id = forTo.slice(0, forTo.length - 5);
    Push_Ullist(str,id);
	navLi.removeClass();
	navA.removeClass('fontColor');
	$('.radio_footer_set').hide();
    
	if (!sideObj[str]) {
		$.ajax({
			type: "GET",
			url: forTo,
			success: function(data) {
				sideBar.append(data);
				sideObj[str] = str;
				$('#station_channel').hide();
			}
		});
	} else {
		channel.addClass('active');
		navModuleShow(id);
		NavLeftindex(2);
		if (fn) {
			fn();
		}
	}

}


//会话显示
function snapChatAppear() {
	var oSpan = $('.channel_topcenter').find('span');
	var oImg = $('.channel_tellbtn_msg').find('img');
	var oP = $('.channel_telllistensay_cue').find('p');
	var status = $('.channel_telllevel2name').find('strong');

	AllShow('.channel_main_tell', '.channel_found_tell', '#chantellsearch');
	AllHide('.channel_main', '.channel_found', '#chansearch', '.channel_right1', '.channel_box2');
	oSpan.eq(1).addClass('channel_color');
	oSpan.eq(0).removeClass('channel_color');
	$('.channel_tellall ').show('slow');
	$('.channel_telllevel2name').find('i').text(callInName);
	// oImg.hide();
	// oP.hide();
}

function snapChatStartConnect() {
	//这里需要改，会话id的涞源。先做个标记。
	session_call_make(callInId, false);
}


function snapChatStopConnect() {
	session_call_bye(callInId);
}


function markerPhone(target) {
	var info = $('#markInfoMessage');
	var id = info.attr('uid');
	var name = info.attr('uname');

  if(Map_userbaidumyInfoWindow!=null){
       
        map.closeInfoWindow();
        Map_userbaidumyInfoWindow=null;

	}else{
		var marker = traclObj.mk;
	    var info = traclObj.mf;
	    if (marker) {
			map.removeOverlay(marker);
			marker.closeInfoWindow();
		}
	}
	
	if (id == '' || name == '') {
		showAlert('请重新获取定位信息！');
		return;
	}
	name = $('#company_name').text() + ',' + name;
	callmake_org_imp(name, id, 0, target);
	// var marker = traclObj.mk;
	// map.removeOverlay(marker);
	// marker.closeInfoWindow();
}


function markerPhoneUser(target) {
	var info = $('#markInfoMessage');
	var id = info.attr('uid');
	var name = info.attr('uname');

	if (id == '' || name == '') {
		showAlert('请重新获取定位信息！');
		return;
	}
	name = $('#company_name').text() + ',' + name;
	callmake_org_imp(name, id, 0, target);
	var marker = traclObj.mk;
	marker.closeInfoWindow();
}

function markerMessage() {

}


function channel_call_snapchat(userid, username) {
	var name = username;
	callmake_org_imp(name, userid, 0, 1);
}
 



function channel_positon_get(userid) {
	var body = '{"Code":10200,"Body":{"SessionId":\"' + sessionId + '\","Uids":[\"' + userid + '\"]}}';
	var body1 = '{"Code":10112,"Body":{"SessionId":\"' + sessionId + '\","Uids":[\"' + userid + '\"]}}';
	var x, y, t,type;
    user_MapwindowId=userid;
	traclCancel();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				x = ret.Locations[0].BaiduLongitude;
				y = ret.Locations[0].BaiduLatitude;
				t = ret.Locations[0].Time;
				type=ret.Locations[0].Type;
				if (x == '' || y == '' || t == '') {
					showAlert('没有找到此成员的位置信息！');
				} else {
					$.getJSON(STATION_URL + '?Body=' + body1,
						function(ret) {
							if (ret.Result == 200) {
								ret = ret.Users[0];
								markshowBaidu(x, y, t, userid, ret, type);
							} else {
								showAlert('获取定位用户信息失败，请重新定位！');
							}
						}
					)
				}
			}
		}
	)
}

function channel_video_pull(userid, username) {
	// var name = $('#company_name').text() + ',' + username;
	var name = username;
	callmake_org_imp(name, userid, 1, 1);
}

//呼叫打电话

function callmake_org(that, videoPull) {
	// var loginer = $('#company_name').text();
	var callor = $(that).parent().siblings('span').text();
	var id = $(that).parents('li').attr('class');
	var name = callor;

	callmake_org_imp(name, id, videoPull, 1);
}


function callmake_org_imp(name, callid, videoPull, isCall) {
	var conversationId;
	var name1 = encodeURI(encodeURI(name));
	var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + name1 + '","Members":["' + loginId + '","' + callid + '"],"Match":1}}';
	var obj = {};
	$('.cover_loading').show();
	
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		$('.cover_loading').hide();
		if (ret.Result == 200) {

			// $('.chatOpenOnly').children('div').trigger('click');
			// gSessionArray.forEach(function(item) {
			// 	if (item.sessionState === SESSION_STATE_DIALOG) {
			// 		var sid = item.sessionId.charAt(0);
			// 		if (sid !== 'G' && sid !== 'C') {
			// 			session_call_bye(sid);
			// 		}
			// 	}
			// })
			
			if (videoPull) {
				var showlist = videoSessionList.showList();
				showlist.forEach(function(item) {
					var sid = item.getInf().sid;
					if (sid === $('.chatOpenOnly').attr('id')) {
						videoSessionList.hangup(item);
					}
				});
			}

			obj.Id = ret.ConversationId;
			obj.Name = name;
			obj.Creator = loginId;
			callInName = name;
			callInId = ret.ConversationId;
			var pushed = arrobjContainsElement(callArrList, obj.Id, 'Id');
			if (!pushed) {
				callArrList.unshift(obj);
				var containers = '<li id="' + obj.Id + '" name="' + loginId + '"  tellname="' + obj.Name + '"><div onclick="channeltelllevel2(this)"><i title="'+obj.Name+'">' + obj.Name + '</i><img src="img/icon/channel/channel_select.png" class="fr"alt="" /></div><ul class="channel_level2"></ul></li>';
				$('.channel_main_tell .channel_level1').prepend(containers);
				chatCallInHandle(ret.ConversationId, videoPull, isCall);
			} else {
				var id = $('.chatOpenOnly').attr('id');
				var type;
		
			    for (var i = 0, len = callArrList.length; i < len; i++) {
			        if (callArrList[i].Id === callInId) {
			            type = callArrList[i].SessionType;
			            if (type == 0) {
			            	callArrList[i].Name = obj.Name;
			            	chat_reset_name(callInId, obj.Name);
			            }
			            break;
			        }
			    }
				
				if (id != ret.ConversationId) {
					chatCallInHandle(ret.ConversationId, videoPull, isCall);
				} else {
					toTheChannel();
					$('.toChat').trigger('click');
					if (isCall == 1) {
						session_call_make(ret.ConversationId, videoPull);
					}
					// var session = sessionGetById(ret.ConversationId);
					// if (!session) {
						// $('#chatBegincallBtn').trigger('click');
					// }
				}
			}
		} else {
			showAlert('创建会话失败！');
		}
	});
}

function chatCallInHandle(chatId, videoPull, isCall) {
	toTheChannel();
	$('.toChat').trigger('click');
	$('.channel_main_tell').find('#' + chatId).children('div').trigger('click');
	if (isCall == 1) {
		if($('.channel_tellall').css("margin-left")==channel_column2||$('.channel_left1').css("margin-left")==channel_column2){
	    	$('.channel_left1').css("margin-left","80px");
	  		$('.channel_tellall').css('margin-left','0px');
	      	$('.channel_right1').hide();
	      	$('.channel_right2').css('background-image', ' url(./img/left_icon.png)');
	    }
		session_call_make(chatId, videoPull);
	}
}


function importChatHtml() {
	snapChatAppear();
	var obj = callArrList[0];
	var containers = '<li id="' + obj.Id + '" name="' + loginId + '"  tellname="' + obj.Name + '"><div onclick="channeltelllevel2(this)"><i title="'+obj.Name +'">' + obj.Name + '</i><img src="img/icon/channel/channel_select.png" class="fr"alt="" /></div><ul class="channel_level2"></ul></li>';
	$('.channel_main_tell .channel_level1').prepend(containers);
	// $('.help_wu').remove();
	var ul = $('.channel_main_tell').find('#' + callInId).children('div')[0];
	channel10312(callInId, ul, 'channel_level1', true);
}

//频道解锁
function channel_list_lockimg_clickhandel(sid) {
	chatUnlockSetting(sid);
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

//===============================IM消息==========================================

//发送状态显示
function cbSesMsgSent(sid, isOk, state, senderId, senderName, msgId, msgType, msgContent, msgRes) {
	console.log(sid);
	console.log(isOk);
	console.log(state);
	console.log(senderId);
	console.log(senderName);
	console.log(msgId);
	console.log(msgType);
	console.log(msgContent);
	console.log(msgRes);
	var indexCode = sid.charAt(0);
	var box, content, im, html, div;

	if (indexCode === 'C') {
		if ($('.channelSelectedonly').attr('cid') != sid) {
			return;
		}
		box = $('#channel_listenwrite_text');
		im = $('#IM_channel');
		div = document.getElementById('im_list');
	}else {
		if ($('.chatOpenOnly').attr('id') != sid) {
			return;
		}
		box = $('#imChatImport');
		im = $('#chatIMessage');
		div = document.getElementById('chatIMparent');
	}

	content = box.val();
	html = createNewImbar(state, msgType, msgId, msgContent, msgRes, box);
	im.append(html);
	div.scrollTop = div.scrollHeight;
}

function createNewImbar(state, msgType, msgId, msgContent, msgRes, box) {
	// console.log('成功'+msgType);
	var html = '',
		content = box.val(),
		time = getTodayDate() + ' ' + getNowTiming();
	if (state == M_MESSAGE_SEND_STATE_RESULT_OK) {
		if (msgType == MESSAGE_TYPE_TEXT) {
			$('.cover_loading').hide();
			html = '<li class="channel_listen_me fix">' +
				   '<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div class="channel_location fr">' +
				   '<img src="img/chat/chan_right.png" class="channel_phos" />' + content + '</div></li>';
			box.val('');
		} else if (msgType == MESSAGE_TYPE_RECORD) {
			html = '<li class="channel_listen_me fix">' +
				   '<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div id="' + msgId + '" onclick="recordingSpeak(\'' + msgId + '\', \'' + msgRes + '\')" class="channel_location recording1 fr">' +
				   '<img src="img/chat/chan_right.png" class="channel_phos" />' +
				   '<img src="img/chat/recording.png" class="recordingBegin" />' + msgContent + 's</div></li>';
		} else if (msgType == MESSAGE_TYPE_PICTURE) {
			html = '<li class="channel_listen_other fix">' +
				   '<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div class="channel_location1 fix">' +
				   '<img src="' + msgRes + '" class="imOtherImgs fr"  onclick="IM_ImgShow(this)"/></div ><div style="display:none;"><img src="' + msgRes + '" alt="img" /></div></li>';		
	    }else if(msgType == MESSAGE_TYPE_VIDEO){
	    	var vison = IEVersion();
	    	if(vison==11){
	    		html = '<li class="channel_listen_other fix">' +
					   '<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div class="channel_location1 fix">' +
					   '<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + msgRes + '" type="video/mp4"></video></div ><div style="display:none;"><video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + msgRes + '" type="video/mp4"></video></div></li>';
	    	}else{
	    		html = '<li class="channel_listen_other fix" url="'+msgRes+'" >' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + time+ '</p></div><div class="channel_location1 fix">' +
						'<img src="img/icon/newicon/help_video.png" onclick="channel_Video(this)" class="imOtherImgs fr" /></div ><div style="display:none;"><img src="' + msgRes + '" alt="img" /></div></li>';
	    	}
		    
		}else if(msgType==16){ 
	    	 var vison = IEVersion();
				 if(vison==11){
                   html= '<li class="channel_listen_other fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div class="channel_location1 fix">' +
						'<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + msgRes + '" type="video/mp4"></video></div ><div style="display:none;"><video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + msgRes + '" type="video/mp4"></video></div></li>';
				 }else{
				  html = '<li class="channel_listen_other fix" url="'+msgRes+'">' +
				   '<div class="fix"><p class="fr"><b>我</b>' + ' ' + time + '</p></div><div class="channel_location1 fix">' +
				   '<img src="img/icon/newicon/help_video.png" class="imOtherImgs fr" onclick="channel_Video(this)" /></div ><div style="display:none;"><img src="' + msgRes + '" alt="img" /></div></li>';
                   
				 }
		}
	}
	return html;
}

function cbSesMsgRecv(sessionId, senderId, senderName, messageId, messageType, messageContent, msgTime, messageRes) {
	console.log('ces是'+sessionId);
	console.log(senderId);
	console.log(senderName);
	console.log(messageId);
	console.log(messageType);
	console.log(messageContent);
	console.log('时间'+msgTime);
	console.log(messageRes);//文字
	
	var indexCode = sessionId.charAt(0);
	var id, im, div, html;
	if (indexCode === 'G') return;
	if (indexCode === 'C') {
		id = $('.channel_box2').attr('id');
		im = $('#IM_channel');
		div = document.getElementById('im_list');
	} else {
		id = $('.channel_tellall').attr('id');
		im = $('#chatIMessage');
		div = document.getElementById('chatIMparent');
	}
	id = id.slice(0, id.length - 1);
	senderName = usersAll.get(senderId) ? usersAll.get(senderId).Name : senderId;
	html = createReceiveIMbar(id, sessionId, senderName, messageId, messageType, messageContent, msgTime, messageRes,senderId);
	if (html !== '') {
		im.append(html);
		div.scrollTop = div.scrollHeight;
	}
}

function createReceiveIMbar(cid, sessionId, senderName, messageId, messageType, messageContent, msgTime, messageRes,senderId) {
	
	var html = '';
	if (cid == sessionId) {
		if (messageType == MESSAGE_TYPE_TEXT) {
			html = '<li class="channel_listen_other fix">' +
				'<div class="imOthers"><p><b>' + senderName + '</b></p><p> ' + msgTime + '</p></div><div class="channel_location fl">' +
				'<img src="img/icon/channel/channel_left.png" class="channel_pho" />' + messageContent + '</div></li>';
		} else if (messageType == MESSAGE_TYPE_PICTURE) {
			html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">' +
				'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelIMdownon(this)"></div><div class="channel_location1 fix">' +
				'<img src="' + messageRes + '" class="imOtherImgs fl " onclick="IM_ImgShow(this)"/></div ><div style="display:none;"><img src="' + messageRes + '" alt="img" /></div></li>';
		} else if (messageType == MESSAGE_TYPE_VIDEO || messageType == MESSAGE_TYPE_VIDEO_STORE) {
			var vison = IEVersion();
			if(vison==11){
				html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">' +
				'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelIMdownon(this)"></div><div class="channel_location1 fix">' +
				'<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + messageRes + '" type="video/mp4"></video>' +
				'</div ><div class="ve_cover"></div></li>';
			}else{
		     html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">' +
				'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelIMdownon(this)"></div><div class="channel_location1 fix">' +
				'<img src="img/icon/newicon/help_video.png" onclick="channel_Video(this)" class="imOtherImgs fl " /></div ></li>';	
			}
			
		} else if (messageType == MESSAGE_TYPE_RECORD) {
			html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">'+
				'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelIMdownon(this)"></div><div id="' + messageId + '" onclick="recordingSpeak(\'' + messageId + '\', \'' + messageRes + '\')" class="channel_location recording1 fix">' +
				'<img src="img/icon/channel/channel_left.png" class="channel_pho" />' +
				'<img src="img/chat/recording.png" class="recordingBegin" />' + messageContent + 's</div></li>';
		} else if (messageType === MESSAGE_TYPE_RECORD_PTT) {
			var now = getTodayDate() + ' ' + getNowTiming();
			
			if (senderId == loginId) {
				html = '<li class="channel_listen_me fix">' +
					'<div class="fix"><p class="fr"><b>我</b>' + ' ' + now + '</p></div><div id="' + messageId + '" onclick="recordingSpeak(\'' + messageId + '\', \'' + messageRes + '\')" class="channel_location recording1 fr">' +
					'<img src="img/chat/chan_right.png" class="channel_phos" /><i class="imPtt">PTT</i>' +
					'<img src="img/chat/recording.png" class="recordingBegin" />'+messageContent+'s</div></li>';
			} else {
				html = '<li class="channel_listen_other fix" ids="'+messageId+'" userid="'+senderId+'" type="'+messageType+'" url="'+messageRes+'" time="'+now+'">' +'<div class="imOthers"><p><b>' + senderName + '</b></p><p> ' + now + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div id="' + messageId + '" onclick="recordingSpeak(\'' + messageId + '\', \'' + messageRes + '\')" class="channel_location recording1 fix">' +
					'<img src="img/icon/channel/channel_left.png" class="channel_pho" /><i class="imPtt">PTT</i>' +
					'<img src="img/chat/recording.png" class="recordingBegin" />'+messageContent+'s</div></li>';
			}
		}else if (messageType === MESSAGE_TYPE_LOCATION){

			var locjson = JSON.parse(messageContent);
			var localx = locjson.longitude;
		    var	localy = locjson.latitude;
		    var localname=locjson.name;
		    var localaddress=locjson.address;
            console.log('位置分分分 ');
            console.log('ID是'+messageId);
            console.log('用户是'+senderId);
            console.log('用户名称'+senderName);
            console.log('时间'+msgTime);

            

            // html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">' +'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p></div><div class="channel_location1 fix"><div class="im_location" onclick="IM_locationMap('+localx+','+localy+')"><p><img src="img/localtion.png" alt="" />'+localname+'</p><p>'+localaddress+'</p></div></div ></li>';
           
             html = '<li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">' +'<div class="imOthers"><p><b>'+ senderName +'</b></p><p>' + msgTime + '</p></div><div class="channel_location1 fix"><div class="im_location" onclick="IM_locationMap('+localx+','+localy+')"><div><p>'+localname+'</p></div></div></div ></li>';

             // <li class="channel_listen_other fix" ids="'+messageId+'" type="'+messageType+'" url="'+messageRes+'" userid="'+senderId+'" time="'+msgTime+'">'

             //     +'<div class="imOthers">
             //        <p><b>'+ senderName +'</b></p><p>' + msgTime + '</p>
             //     </div>
             //        <div class="channel_location1 fix">
             //            <div class="im_location" onclick="IM_locationMap('+localx+','+localy+')">
             //               <p><img src="img/localtion.png" alt="" />'+localname+'</p>
             //               <p>'+localaddress+'</p>
             //            </div>
             //        </div >
             // </li>


		}
	}
	return html;
}

//开始录音的回调
function cbSesMsgRecStart(sessionId) {
	//	console.log(sessionId)
	var btn = $('.channel_listenwritespends');
	btn.children('strong').html('再次点击发送');
    btn.css('background-color', '#4AC663');
    luYin = false;
}

//结束录音的回调
function cbSesMsgRecStop(sessionId, wParam, resId) {
	console.log('录音结束')
	var btn = $('.channel_listenwritespends');
	btn.children('strong').html('点击录音');
    btn.css('background-color', '#F9890C');
    luYin = true;
	if (wParam === -1) {
		return showAlert('录音失败！')
	} else if (wParam === -2) {
		return showAlert('录音时间太短！')
	}
}

//开始播放录音的回调
function cbSesMsgRecPlayStart(code, resId) {
	if ($('#station_radio').css('display') == 'block') {
		var img = $('#bc_recording_list').children('#' + code).find('img');
	}
	if ($('#station_channel').css('display') == 'block') {
		var img = $('#' + code).find('.recordingBegin');
	}
	
	// if ($('#station_channel').css('display') == 'block') {
	// 	var img = $('#' + code).find('img');
	// }

	if ($('.task_msgul').css('display') == 'block') {
		var img = $('#Ta' + code).find('img');
	}
	img.attr('src', 'img/chat/recording_stop.png');
}

//结束播放录音的回调
function cbSesMsgRecPlayStop(code, resId) {
	if ($('#station_radio').css('display') == 'block') {
		var img = $('#bc_recording_list').children('#' + code).find('img');
	}
	// if ($('#station_channel').css('display') == 'block') {
	// 	var img = $('#' + code).find('img');
	// }
	if ($('#station_channel').css('display') == 'block') {
		var img = $('#' + code).find('.recordingBegin');
	}
    if ($('.task_msgul').css('display') == 'block') {
		var img = $('#Ta' + code).find('img');
	}
	img.attr('src', 'img/chat/recording.png');
	isRecording = true;
}

//
function cbSesPresence(sessionId) {
	console.log('会场状态回调！' + sessionId);
	var veiframe = $(window.frames["veiframe"].document);
	var video_channel = veiframe.find('.Video_channel');
	var strCode = sessionId.charAt(0);
	
	if (strCode === 'C') {
		// if ($('.channel_left1').css('display') === 'block') {
			currentChanneledMembersOn(sessionId);
		// }

		if (video_channel.css('display') === 'block') {
			video_channel_online_state(sessionId);
		}
		//在线人员统计
		var cid = $('.channel_box2').attr('id');
		if (cid === sessionId+'a') {
			var online = sessionGetPresenceOnLine(sessionId);
			var onlineNum = online ? online.length : 0;
			$('.celonline').text(onlineNum);
		}
	} else {
		console.log('其他人员');
		currentChatMembersOn(sessionId);
	}

}

//=======================================================================
//频道成员在线显示
//=======================================================================
function currentChanneledMembersOn(cid) {
	var obj = $('.channelSelectedonly');
	var id = obj.attr('cid');
	var name = obj.parent().attr('class');
	var div = obj.children('div');
	var arr = [];
	var list = [];
	if (cid == id) {
		var onliner = sessionGetPresenceOnLine(cid); //null or arr
		var data = currentChannelMembers;
		
		if (data) {
			data.forEach(function(item, index) {
				item.state = 0;
			}) 
		} else {
			return
		}
		if (onliner && onliner.length > 0) {
        	for (var i = 0, len = onliner.length; i < len; i++) {
                for (var j = 0, lon = data.length; j < lon; j++) {
                    if (onliner[i] == data[j].Uid) {
                        data[j].state = 1;
                        arr.push(data[j]);
                        break;
                    }
                }
            }
        }
        for (var k = 0; k < data.length; k++) {

            if (!data[k].state) {
           
                if (onlineInfo.containsKey(data[k].Uid)) {
                    data[k].state = 2;
                }
                list.push(data[k]);
            }
        }
        data = arr.concat(list);
        refreshCurrentClList(div, name, data);
	}
}


function currentChatMembersOn(sessionId) {
	var onliner = sessionGetPresenceOnLine(sessionId);
	var box = $('.channel_main_tell').find('#' + sessionId).children('ul');
	var that = $('#' + sessionId);
	var obj = that.children('div');
	var classname = that.parent().attr('class');
	var chatCurrentOpen = findChatCurrentUsers(sessionId);

	if (box.css('display') === 'block') {
		if (onliner) {
			var arr = arrayCreate(onliner, chatCurrentOpen);
			console.log(chatCurrentOpen);
			console.log(arr)
			refreshChatMembers(arr, obj, classname)
		}
	}
}


function findChatCurrentUsers(sid) {
	var box = $('.channel_main_tell').find('#' + sid).children('ul');
	var chatCurrentOpen = [];
	box.children('li').each(function() {
		var obj = {};
		var that = $(this);
		obj.Uid = that.attr('name');
		obj.Name = that.find('.chat_memers').text();
		chatCurrentOpen.push(obj);
	})
	return chatCurrentOpen;
}


function cloneArrayObj(array) {
	var arr = [];

	for (var i = 0, len = array.length; i < len; i++) {
		var obj = {};
		for (var k in array[i]) {
			obj[k] = array[i][k];
		}
		arr.push(obj);
	}

	return arr;
}




var imIndex = 0;
var imSize = 5;
var imTotal = 0;
var imForto;
var imNow;
var imAgo;

//发送IM消息
function chnSentIM(type) {
	var chatId, mesContent;
	$('.cover_loading').show();
	if (type === 0) {
		chatId = $('.channel_box2').attr('id');
		mesContent = $('#channel_listenwrite_text').val();
	} else {
		chatId = $('.channel_tellall').attr('id');
		mesContent = $('#imChatImport').val();
	}
	// var mesType = 2;
	chatId = chatId.slice(0, chatId.length - 1);
	if (mesContent !== '' || mesContent.trim().length > 0) {
		if (mesContent.length > 300) {
			$('.cover_loading').hide();
			return showAlert('发送内容不能超过300个字符！')
		}
		session_message_send(chatId, MESSAGE_TYPE_TEXT, mesContent);
	} else {
		$('.cover_loading').hide();
		showAlert('输入框内容不能为空！')
	}
}

//查询im消息
function IMessageInterfac(cId) {
	var indexCode = cId.charAt(0);
	
	if (indexCode === 'C') {
		$('#IM_channel').hide();
		$('.channel_listenset_noread').hide();
	} else {
		$('#chatIMessage').hide();
		$('.channel_tellchat_noread').hide();
	}
	
	imIndex = 0;
	imForto = cId;
	imNow = getTodayDate() + ' ' + getNowTiming();
	imAgo = getTodayDate(7) + ' ' + getNowTiming(7);
	var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + imAgo + '","TimeTo":"' + imNow + '","SesId":"' + cId + '","PageSize":' + imSize + ',"PageIndex":' + imIndex + '}}';
	console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		indexCode === 'C' ? IMessageShow(ret, 0) : chatIMessageShow(ret, 0);
	});
}

function chatIMessageShow(data, index) {
	var list = $('#chatIMessage'),
		oI = $('.channel_tellchat_noread');
	oI.show();
	list.show();
	imTotal = data.PageTotalCount;
	data = data.Messages;
	// if (imIndex + 1 == imTotal) {
	// 	oI.hide();
	// }
	if (data.length === 0) oI.hide();
	if (index === 0) list.empty();
	refreshIMlist(data, oI, list)
	
	if(addhuihua_set){
		addhuihua(addhuihua_set_username);
		addhuihua_set = false;
		addhuihua_set_username = "";
	}
}
function addhuihua(username){
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentTime = this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute;
	$('#chatIMessage').append("<li id='addhh'><span>"+currentTime+"</span><p class='three_hh'>您邀请了"+username+"加入会话</p></li>");
	console.log($('.three_hh').height());
	if($('.three_hh').height()==15){
		$('.three_hh').css("border-radius","100px");
	}else{
		$('.three_hh').css("border-radius","10px");
	}
}
//查询im消息展示
function IMessageShow(data, num) {
	console.log('IM消息'+JSON.stringify(data));
	var list = $('#IM_channel'),
		oI = $('.channel_listenset_noread'),
		oItext = oI.find('i');
	oI.show();
	list.show();
	imTotal = data.PageTotalCount;
	data = data.Messages;
	// if (imIndex + 1 == imTotal) {
	// 	oI.hide();
	// } else {
	// 	oItext.text((imTotal - imIndex - 1) * imSize);
	// }
	if (data.length === 0) {
		oI.hide();
	} 

	if (num === 0) list.empty();
	refreshIMlist(data, oI, list)
}

function refreshIMlist(data, more, target) {
	var content = '',
		uid;
	if (data.length) {
		var len = data.length - 1;
		for (var i = len; i >= 0; i--) {
			uid = data[i].Uid;
			if (data[i].ResType == 0) { //text
				if (uid == loginId) {
					content += '<li class="channel_listen_me fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div class="channel_location fr">' +
						'<img src="img/chat/chan_right.png" class="channel_phos" />' + data[i].Content + '</div></li>';
				} else {
					content += '<li class="channel_listen_other fix">' +
						'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p>' + data[i].Time + '</p></div><div class="channel_location fl">' +
						'<img src="img/icon/channel/channel_left.png" class="channel_pho" />' + data[i].Content + '</div></li>';
				}
			} else if (data[i].ResType == 1) { //img
				if (uid == loginId) {
					content += '<li class="channel_listen_other fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div class="channel_location1 fix">' +
						'<img src="' + data[i].ResUrl + '" class="imOtherImgs fr" onclick="IM_ImgShow(this)"/></div ><div style="display:none;"><img src="' + data[i].ResUrl + '" alt="img"  /></div></li>';
				} else {
					content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">'+'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p>' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div class="channel_location1 fix">' +
						'<img src="' + data[i].ResUrl + '" class="imOtherImgs fl"  onclick="IM_ImgShow(this)" /></div ><div style="display:none;"><img src="' + data[i].ResUrl + '" alt="img"  /></div></li>';
				}
			} else if (data[i].ResType == 2) { //video
				var vison = IEVersion();
				// content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">' +'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p>' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div class="channel_location1 fix">' +
				// 	'<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + data[i].ResUrl + '" type="video/mp4"></video>' +
				// 	'</div ><div class="ve_cover" onclick="imvideoApper(this)"></div><video class="IMvePlay" width="700" height="500" src="' + data[i].ResUrl + '" type="video/mp4" controls="controls"></video></li>';
				if(vison==11){
						if(uid == loginId){
                   content += '<li class="channel_listen_other fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div class="channel_location1 fix">' +
						'<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + data[i].ResUrl + '" type="video/mp4"></video></div ><div style="display:none;"><video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + data[i].ResUrl + '" type="video/mp4"></video></div></li>';
				}else{
					content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">' +'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p>' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div class="channel_location1 fix">' +'<video class="imOtherVes fl" width="200" height="200" controls="controls"><source src="' + data[i].ResUrl + '" type="video/mp4"></video>' +'</div ><div class="ve_cover" onclick="imvideoApper(this)"></div><video class="IMvePlay" width="700" height="500" src="' + data[i].ResUrl + '" type="video/mp4" controls="controls"></video></li>';
				 }
		    }else{
		    	 if(uid == loginId){
		    	 	content += '<li class="channel_listen_other fix" url="'+data[i].ResUrl+'" >' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div class="channel_location1 fix">' +
						'<img src="img/icon/newicon/help_video.png" onclick="channel_Video(this)" class="imOtherImgs fr" /></div ><div style="display:none;"><img src="' + data[i].ResUrl + '" alt="img" /></div></li>';
		    	 }else{
		    	 	content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">'+'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p>' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div class="channel_location1 fix">' +
						'<img src="img/icon/newicon/help_video.png" onclick="channel_Video(this)" class="imOtherImgs fl" /></div ><div style="display:none;"><img src="' + data[i].ResUrl + '" alt="img" /></div></li>';
		    	 }
		    }
  		} else if (data[i].ResType == 4) { //record
				if (uid == loginId) {
					content += '<li class="channel_listen_me fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div id="' + data[i].Id + '" onclick="recordingSpeak(\'' + data[i].Id + '\', \'' + data[i].ResUrl + '\')" class="channel_location recording1 fr">' +
						'<img src="img/chat/chan_right.png" class="channel_phos" />' +
						'<img src="img/chat/recording.png" class="recordingBegin" />' + data[i].Content + 's</div></li>';
				} else {
					content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">' +'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p> ' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div id="' + data[i].Id + '" onclick="recordingSpeak(\'' + data[i].Id + '\', \'' + data[i].ResUrl + '\')" class="channel_location recording1 fix">' +
						'<img src="img/icon/channel/channel_left.png" class="channel_pho" />' +
						'<img src="img/chat/recording.png" class="recordingBegin" />' + data[i].Content + 's</div></li>';
				}
			} else if (data[i].ResType == 5) { //ptt
				if (uid == loginId) {
					content += '<li class="channel_listen_me fix">' +
						'<div class="fix"><p class="fr"><b>我</b>' + ' ' + data[i].Time + '</p></div><div id="' + data[i].Id + '" onclick="recordingSpeak(\'' + data[i].Id + '\', \'' + data[i].ResUrl + '\')" class="channel_location recording1 fr">' +
						'<img src="img/chat/chan_right.png" class="channel_phos" /><i class="imPtt">PTT</i>' +
						'<img src="img/chat/recording.png" class="recordingBegin" />' + data[i].Content + '</div></li>';
				} else {
					content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" userid="'+data[i].Uid+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" time="'+data[i].Time+'">' +'<div class="imOthers"><p><b>' + data[i].Name + '</b></p><p> ' + data[i].Time + '</p><img src="img/icon/newicon/downse.png" alt="" / class="chanelIMdown" onclick="channelimdown(this)"></div><div id="' + data[i].Id + '" onclick="recordingSpeak(\'' + data[i].Id + '\', \'' + data[i].ResUrl + '\')" class="channel_location recording1 fix">' +
						'<img src="img/icon/channel/channel_left.png" class="channel_pho" /><i class="imPtt">PTT</i>' +
						'<img src="img/chat/recording.png" class="recordingBegin" />' + data[i].Content + '</div></li>';
				}
			}else if (data[i].ResType == 3){
                if (uid == loginId) { 


                  }else{
                  	var localx=data[i].Content.longitude;
                  	var localy=data[i].Content.latitude;
                  content += '<li class="channel_listen_other fix" ids="'+data[i].Id+'" type="'+data[i].ResType+'" url="'+data[i].ResUrl+'" userid="'+data[i].Uid+'" time="'+data[i].Time+'">' +'<div class="imOthers"><p><b>'+ data[i].Name  +'</b></p><p>' + data[i].Time + '</p></div><div class="channel_location1 fix"><div class="im_location" onclick="IM_locationMap('+localx+','+localy+')"><div><p>'+data[i].Content.name+'</p></div></div></div ></li>';
                    

                  }
			}
		}
		target.prepend(content);
	} else {
		more.hide();
	}
}

var isRecording = true;
var isRecordingCode = '';
function recordingSpeak(code, url) {
	if (isRecordingCode === code) {
		if (isRecording) {
			isRecording = false;
			session_message_rec_play_start(code, url);
		} else {
			session_message_rec_play_stop();
		}
	} else {
		if (isRecording) {
			session_message_rec_play_start(code, url);
			isRecordingCode = code;
			isRecording = false;
		} else {
			session_message_rec_play_stop();
			setTimeout(function() {
				session_message_rec_play_start(code, url);
				isRecordingCode = code;
				isRecording = false;
			})
		}
		
	}	
}

function imvideoApper(that) {
	$(that).siblings('.IMvePlay').show();
}

function IMessageShowAdd() {
	// imIndex = imIndex + 1 >= imTotal ? imIndex : imIndex + 1;
	imIndex = imIndex + 1;
	var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + imAgo + '","TimeTo":"' + imNow + '","SesId":"' + imForto + '","PageSize":' + imSize + ',"PageIndex":' + imIndex + '}}';
	$('.cover_loading').show();	
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		$('.cover_loading').hide();	
		console.log('下载信息'+JSON.stringify(ret));
		IMessageShow(ret, 1);
	});
	
}

function chatIMgetMore() {
	// imIndex = imIndex + 1 >= imTotal ? imIndex : imIndex + 1;
	imIndex = imIndex + 1;
	var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + imAgo + '","TimeTo":"' + imNow + '","SesId":"' + imForto + '","PageSize":' + imSize + ',"PageIndex":' + imIndex + '}}';
	$('.cover_loading').show();	
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		$('.cover_loading').hide();	
		console.log('下载信息'+JSON.stringify(ret));
		chatIMessageShow(ret, 1)
	});
	
}


//=========================================
//消息推送信息
//=========================================
//位置回传
var cbPosInfo = new HashMap();

function cbLocation(uid, x, y, address, h, s, d, tm,type, google_x, google_y) {
	console.log('位置回传数据');
	console.log(uid);
	console.log(x);
	console.log(y);
	console.log(address);
	console.log(h);
	console.log(s);
	console.log(d);
	console.log(tm);
	console.log('位置类型'+type);
	console.log(google_x);
	console.log(google_y);

	var newPos = [];
	var oldPos = [];
	var obj = {};
	
	obj.Uid = uid;
	obj.BaiduLongitude = x;
	obj.BaiduLatitude = y;
    obj.GpsLatitude = google_x;
	obj.GpsLongitude = google_y;
	obj.Type = type;
	obj.Time = tm;
	newPos[0] = obj;
	oldPos[0] = uid;
	if (!monitorMark) {
		// showUserOnlinemapReduce(oldPos, onlineUsersMarkers); //在线
		// showUserOnlinemapAdd(newPos);
		showUserOnlinemapReduce_push(oldPos, onlineUsersMarkers,newPos); //在线
		
		// showUserOnlinemapAdd_move(newPos);
	} else {
		if (jianKongMarkers.containsKey(uid)) { //监控
			showUserOnlinemapReduce_push(oldPos, jianKongMarkers,newPos);
			// monitorAddedOnMap(newPos);
		}
		// var list = $('.manage_monitor ul').children('li');
		// list.each(function (i, item){
		// 	if (item.attr('uid') === uid) {
		// 		monitorAddedOnMap(newPos);
		// 	}
		// })
	}
}


//终端上报
function cbReportMessage(reportid,rsname,uid, x, y, url, desc, resType, tm, relen) {
	console.log('终端上报推送');
	var type;
	if(resType==1){
		type=0;
	}else if(resType==2){
		type=1;
	}
  var Mediareportarray='{"ResId":"'+reportid+'","Uid":"'+uid+'","Name":"'+rsname+'","ResUrl":"'+url+'","ResType":"'+type+'","Time":"'+tm+'","Detail":"'+desc+'","Content":"","ReadStatus":0,"ResCount":"'+relen+'"}';
  if(Meidafirstdata!=undefined){
  	  if(MediaSearchType==undefined||MediaSearchType==type){
  	  	  mediafirstadd(Mediareportarray);
  	   }
	 }
  if(Helpfirstdata!=undefined){
	  	if(HelpSearchType==undefined){
	       helpfirstadd(Mediareportarray);
	  	}else if(HelpSearchType==type){
	  	   helpfirstadd(Mediareportarray);
	  	} 
  }


         Helpnumread++; 
	      if(Helpnumread>99){
	      $('.helpnumsbg').html('99+');
	      $('.helpnumsbg').show();
	    }else if(Helpnumread==0) {
	      $('.helpnumsbg').hide();

	    }else {
	       $('.helpnumsbg').html(Helpnumread);
	       $('.helpnumsbg').show();
	    }
	//	console.log(uid);console.log(url);console.log(desc);console.log(x);console.log(y);console.log(resType);
}

//user在线状态


function cbPresence(members) {

	console.log('用户上下线推送');
	console.log(JSON.stringify(members));
	
	if (orgNodesTree.onlinePushTimes === 0) {
		orgNodesTree.onlineFirstTiming = +new Date();
		orgNodesTree.onlinePushTimes = 1;
	}
	var comeIn = [];
	var comeOut = [];

	orgNodesTree.refreshNodes(members);
	for (var i = 0, len = members.length; i < len; i++) {
		var id = members[i].ipocid;
		var state = members[i].userstate;
		//state !== onlineInfo.get(id)
		if (state == USER_STATE_ON_LINE && !onlineInfo.containsKey(id)) {
			onlineInfo.put(id, state);
			comeIn.push(id); //上线
		}
		if (state == USER_STATE_OFFLINE && onlineInfo.containsKey(id)) {
			onlineInfo.remove(id); //离线
			comeOut.push(id);
		}
	}
	
	var arr = onlineInfo.keySet();
	userOnlineStatus =[];
	for (var k = 0, lon = arr.length; k < lon; k++) {
		userOnlineStatus.push({
			"ipocid": arr[k],
			"userstate": 1
		});
	}

	userStateRealtime(members); //组织 二级目录
	//显示地图在线用户 监控用户
	if(!isShowTrajectory){
	monitorMark ? drawMonitorUsers() :  onlineMapappear(comeIn, comeOut);
    }
	
	for (var j = 0; j < gOnlineListenerRefresh.length; j++) {
		gOnlineListenerRefresh[j]();
	}

	//频道成员在线更新
	usersChange_dispatch_channel(members);
	//临时会话成员在线更新
	usersChange_dispatch_chat(members);

	//组织节点数更新

}

function usersChange_dispatch_channel(members) {
	var chanList = $('.channel_box2');
	var openList = $('.channelSelectedonly').children('ul');
	
	if (openList.css('display') === 'block') {
		var sid = chanList.attr('id');
		var isCall = false;
		sid = sid.slice(0, sid.length-1);
		var v = currentClmembers.values();
		
		for (var k=0; k<members.length; k++) {
			if (members[k].userstate === USER_STATE_ON_LINE && currentClmembers.containsKey(members[k].ipocid)) {
				isCall = true;
				break;
			}
			if (members[k].userstate === USER_STATE_OFFLINE && currentClmembers.containsKey(members[k].ipocid) && currentClmembers.get(members[k].ipocid).state === 2) {
				isCall = true;
				break;
			}
		}
		if (isCall) {
			currentChanneledMembersOn(sid);
		}
	}
}

function usersChange_dispatch_chat(members) {
	var chatOpen = $('.chatOpenOnly');
	var sid = chatOpen.attr('id');
	var session = sessionGetById(sid);

	if (session && session.sessionState === SESSION_STATE_DIALOG) {
		if (chatOpen.children('ul').css('display') === 'block') {
			currentChatMembersOn(sid);
		}
	}
}


function userDetailFunctionHide() {
	$('.userEdit_img').attr('src','img/icon/userIcon/user_bi.png');
	$('.userInfo_img').attr('src','img/icon/newicon/powers.png');
	$('.remove-img').attr('src','img/icon/fence/fence_bg_del1.png')
	$('.edited-concent').hide();
	$('.user-close').hide();
	$('.user-remove').hide();
}


function isRefreshUserList(members) {
	var userlist = currentOrgUsers.concat(currentOrgedUsers);
	var i,j;

	if (userlist.length > 0) {
		for (i = 0; i < userlist.length; i++) {
			for (j = 0; j < members.length; j++) {
				if (userlist[i].Uid == members[j].ipocid) {
					return true;
				}
			}
		}
	}
		
	return false;
}

function userStateRealtime(members) {
	console.log(members);
	userDetailFunctionHide();
	var hide = $('.user-list').is(':hidden');
	var hide2 = $('.user-list').css('display');
	if (sideObj.user && $('.user-list').css('display') == 'block') {
		var isRefresh = isRefreshUserList(members);
		if (!isRefresh) return;
		var listOrgNo = userOnshowSort(currentOrgUsers, 0);
		var listOrged = userOnshowSort(currentOrgedUsers, 1);
		var html1 = '';
		var html2 = '';
		var listOrgNo_name;
		
		$('#org-no-list').empty(); //本組成員
		$('#org-listing').empty();  //自組成員

		var hujiao1 = '<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />';
		var dingwei1 = '<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />';
		var shipin1 = '<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />';
		var dingwei1_none = '<img style="display:none;" src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />';
		var shipin1_none = '<img style="display:none;" src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />';
		var bianji1 = '<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,0,\'org-no-list\')" alt="img" />';
		var quanxian1 = '<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,0,\'org-no-list\')" alt="img" />';
		var shanchu1 = '<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="0" class="remove-img" onclick="userRemoveToPre(this,0,\'org-no-list\')" alt="img" />';
		
		var imgDie = '<img style="margin:0px 0px 10px 7px;" src="img/icon/userIcon/ic_yaobi.png" alt="img" class="channel_broadimg"/>';
		var imgDieHide = '<img style="margin:0px 0px 10px 7px; display:none;" src="img/icon/userIcon/ic_yaobi.png" alt="img" class="channel_broadimg"/>';
		var imgBroadcast = '<img style="margin:0px 0px 9px 7px;" src="img/icon/userIcon/ic_broadcast.png" alt="img" class="channel_broadimg"/>';
		var imgBroadcastHide = '<img style="margin:0px 0px 9px 7px; display:none;" src="img/icon/userIcon/ic_broadcast.png" alt="img" class="channel_broadimg"/>';
		var imgJurisdiction = '<img style="height:12px; width:12px;margin:0px 0px 10px 7px;" src="img/icon/newicon/power1.png" alt="img" class="channel_broadimg"/>';
		var imgJurisdictionHide = '<img style="height:12px; width:12px;margin:0px 0px 10px 7px; display:none;" src="img/icon/newicon/power1.png" alt="img" class="channel_broadimg"/>';
		
		var checkedStatus = $('#name_Id').prop('checked');
		var userName = '';
         
		for (var i = 0, len = listOrgNo.length; i < len; i++) {
			checkedStatus ? userName = listOrgNo[i].Name + '(' + listOrgNo[i].Uid + ')' : userName = listOrgNo[i].Name;
			if (listOrgNo[i].Uid == loginId) {
				var mycheckbox = '<div class="squaredbox"><input disabled=false class="bg_checked" type="checkbox" id="'+listOrgNo[i].Uid+'_z" /><label for="'+listOrgNo[i].Uid+'_z"></label></div>';
				
				html1 += '<li class="' + loginId + '"><a class="org-listA">' + mycheckbox + 
					'<span title="'+userName+'" class="on only_one dis_on">' + userName + '</span>';

				if (usersAll.size() >0 && usersAll.get(loginId).BroadCastRole) {
					html1 += imgBroadcast;
				} else {
					html1 += imgBroadcastHide;
				}
				if (usersAll.size() >0 && usersAll.get(loginId).LimitStatus==1) {
					template += imgJurisdiction;
				}else{
					template += imgJurisdictionHide;
				}
				html1 += '<span class="userfn_icons">' +'</span></a></li>';
				
			} else {
				var roleUser = usersAll.get(listOrgNo[i].Uid).Role;
				mycheckbox = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+listOrgNo[i].Uid+'_z" name="list-1" /><label for="'+listOrgNo[i].Uid+'_z"></label></div>';
				
								
				if (listOrgNo[i].userstate) {
					
					listOrgNo_name = roleUser ? '<span title="'+userName+'" class="on only_one dis_on">' + userName + '</span>' : '<span title="'+userName+'" class="on only_one on_user">' + userName + '</span>';
					
					var template = '<li class="' + listOrgNo[i].Uid + '"><a class="org-listA">' + mycheckbox + listOrgNo_name;
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).BroadCastRole) {
						template += imgBroadcast;
					} else {
						template += imgBroadcastHide;
					}
					
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).RemoteCtl) {
						template += imgDie;
					} else {
						template += imgDieHide;
					}
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).LimitStatus==1) {
						template += imgJurisdiction;
					}else{
						template += imgJurisdictionHide;
					}
					
					if (treeIdData.pid == null) {
						if (roleUser) {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + '</span></a></li>';		
						} else {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1 + shipin1 + bianji1 + quanxian1 + shanchu1 +'</span></a></li>';
						}
					} else {
						if (roleUser) {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1_none + shipin1_none + bianji1 + quanxian1 + shanchu1 + '</span></a></li>';
						} else {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1 + shipin1 + bianji1 + quanxian1 + shanchu1 +'</span></a></li>';
						}
					}

				} else {
					
					listOrgNo_name = roleUser ? '<span title="'+userName+'" class="on only_one dis_off">' + userName + '</span>' : '<span title="'+userName+'" class="on only_one nolineuser">' + userName + '</span>';
					template = '<li class="' + listOrgNo[i].Uid + '"><a class="org-listA">' + mycheckbox + listOrgNo_name;
					
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).BroadCastRole) {
						template += imgBroadcast;
					} else {
						template += imgBroadcastHide;
					}
					
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).RemoteCtl) {
						template += imgDie;
					} else {
						template += imgDieHide;
					}
					if (usersAll.size() >0 && usersAll.get(listOrgNo[i].Uid).LimitStatus==1) {
						template += imgJurisdiction;
					}else{
						template += imgJurisdictionHide;
					}
					if (treeIdData.pid == null) {
						if (roleUser) {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + '</span></a></li>';							
						} else {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1 + shipin1 + bianji1 + quanxian1 + shanchu1 +'</span></a></li>';
						}
					} else {
						if (roleUser) {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1_none + shipin1_none + bianji1 + quanxian1 + shanchu1 + '</span></a></li>';	
						} else {
							html1 += template + '<span class="userfn_icons">' + hujiao1 + dingwei1 + shipin1 + bianji1 + quanxian1 + shanchu1 +'</span></a></li>';
						}
					}

				}
			}
			
		}
		$('#org-no-list').append(html1);
		var hujiao2 = '<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />';
		var dingwei2 = '<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />';
		var shipin2 = '<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />';
		var bianji2 = '<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,1,\'org-no-list\')" alt="img" />';
		var quanxian2 = '<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,1,\'org-no-list\')" alt="img" />';
		var shanchu2 = '<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="1" class="remove-img" onclick="userRemoveToPre(this,1,\'org-no-list\')" alt="img" />';

       
		for (var k = 0, lon = listOrged.length; k < lon; k++) {
			checkedStatus ? userName = listOrged[k].Name + '(' + listOrged[k].Uid + ')' : userName = listOrged[k].Name;
			var roleUser2 = usersAll.get(listOrged[k].Uid).Role;
			var mycheckbox2 = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+listOrged[k].Uid+'_z" name="list-1" /><label for="'+listOrged[k].Uid+'_z"></label></div>';

			if (listOrged[k].userstate) {
				
				listOrgNo_name = roleUser2 ? '<span title="'+userName+'" class="on only_one dis_on">' + userName + '</span>' : '<span title="'+userName+'" class="on only_one on_user">' + userName + '</span>';
				template = '<li class="' + listOrged[k].Uid + '"><a class="org-listA">' + mycheckbox2 + listOrgNo_name;
				
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).BroadCastRole) {
					template += imgBroadcast;
				} else {
					template += imgBroadcastHide;
				}
				
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).RemoteCtl) {
					template += imgDie;
				} else {
					template += imgDieHide;
				}
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).LimitStatus==1) {
					template += imgJurisdiction;
				}else{
					template += imgJurisdictionHide;
				}
				if (roleUser2) {
					html2 += template + '<span class="userfn_icons">' + hujiao2 + dingwei1_none + shipin1_none + bianji2 + quanxian2 + shanchu2 + '</span></a></li>';
					
				} else {
					html2 += template + '<span class="userfn_icons">' + hujiao2 + dingwei2 + shipin2 + bianji2 + quanxian2 + shanchu2 + '</span></a></li>';
				}

			} else {
				
				listOrgNo_name = roleUser2 ? '<span title="'+userName+'" class="on only_one dis_off">' + userName + '</span>' : '<span title="'+userName+'" class="on only_one nolineuser">' + userName + '</span>';
				template = '<li class="' + listOrged[k].Uid + '"><a class="org-listA">' + mycheckbox2 + listOrgNo_name;
				
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).BroadCastRole) {
					template += imgBroadcast;
				} else {
					template += imgBroadcastHide;
				}
				
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).RemoteCtl) {
					template += imgDie;
				} else {
					template += imgDieHide;
				}
				if (usersAll.size() >0 && usersAll.get(listOrged[k].Uid).LimitStatus==1) {
					template += imgJurisdiction;
				}else{
					template += imgJurisdictionHide;
				}
				if (roleUser2) {
					html2 += template + '<span class="userfn_icons">' + hujiao2 + dingwei1_none + shipin1_none + bianji2 + quanxian2 + shanchu2 + '</span></a></li>';
					
				} else {
					html2 += template + '<span class="userfn_icons">' + hujiao2 + dingwei2 + shipin2 + bianji2 + quanxian2 + shanchu2 + '</span></a></li>';
				}				

			}
		}
		
		$('.total').text(0);
		$('#squaredAll').prop('checked', false);
		$('#squaredAll').next('label').removeClass('label-bg');

		$('#org-listing').append(html2);
		userCheckNumber = document.getElementsByName('list-1').length;
		checkBox('list-1', 'userListAll', 'total');
		userHover();
		if (checkedStatus) {
			listOrgNo.forEach(function(item, i) {
				idList1[i] = item.Uid;
				nameList1[i] = item.Name + '(' + item.Uid + ')';
			});
			listOrged.forEach(function(item, i) {
				idList2[i] = item.Uid;
				nameList2[i] = item.Name + '(' + item.Uid + ')';
			})
		} else {
			listOrgNo.forEach(function(item, i) {
				idList1[i] = item.Uid;
				nameList1[i] = item.Name;
			});
			listOrged.forEach(function(item, i) {
				idList2[i] = item.Uid;
				nameList2[i] = item.Name;
			})
		}
	}
}

var currentOrgUsers = [];
var currentOrgedUsers = [];
var onlineRole = [];
var onlineUser = [];
var outlineRole = [];
var outlineUser = [];

function userOnshowSort(arr, isOrg) {
	onlineRole = [];
	onlineUser = [];
	outlineRole = [];
	outlineUser = [];

	for (var i = 0, len = arr.length; i < len; i++) {
		arr[i].userstate = 0;
		arr[i].Ischeck = 0;
		for (var j = 0, lon = userOnlineStatus.length; j < lon; j++) {
			
			if (arr[i].Uid == userOnlineStatus[j].ipocid) {
				arr[i].userstate = 1;
				arr[i].Role ? onlineRole.push(arr[i]) : onlineUser.push(arr[i]);
			}
		}
		
		if (!arr[i].userstate) {
			arr[i].userstate = 0;
			
			if (arr[i].Uid !== loginId) {
				
				arr[i].Role ? outlineRole.push(arr[i]) : outlineUser.push(arr[i]);

			} else {
				onlineRole.unshift(arr[i]);
			}
			
		}

	}
	
	if (isOrg) {
		currentOrgedUsers = onlineRole.concat(onlineUser, outlineRole, outlineUser);
		return currentOrgedUsers;
	} else {
		currentOrgUsers = onlineRole.concat(onlineUser, outlineRole, outlineUser);
		return currentOrgUsers;
	}
	
}


// function userOnshowSort1(arr, arr1) {
// 	var list = [];
// 	var list1 = [];

// 	for (var i = 0, len = arr.length; i < len; i++) {
// 		if (arr[i] === loginId) {
// 			list.unshift({
// 				"ipocid": arr[i],
// 				"userstate": 1,
// 				"name": arr1[i]
// 			})
// 		}

// 		for (var j = 0, lon = userOnlineStatus.length; j < lon; j++) {
// 			var isno = false;
// 			if (arr[i] == userOnlineStatus[j].ipocid) {
// 				list.push({
// 					"ipocid": arr[i],
// 					"userstate": 1,
// 					"name": arr1[i]
// 				});
// 				isno = true;
// 				break;
// 			}
// 		}
// 		if (!isno && arr[i] !== loginId) {
// 			list1.push({
// 				"ipocid": arr[i],
// 				"userstate": 0,
// 				"name": arr1[i]
// 			});
// 		}

// 	}
// 	list = list.concat(list1);
// 	return list;
// }

// function userOnshowSort(arr) {
// 	var list = [];
// 	var list1 = [];
// 	// console.log(userOnlineStatus)
// 	for (var i = 0, len = arr.length; i < len; i++) {

// 		for (var j = 0, lon = userOnlineStatus.length; j < lon; j++) {
// 			if (arr[i].Uid == userOnlineStatus[j].ipocid) {
// 				arr[i].userstate = 1;
// 				list.push(arr[i]);
// 			}
// 		}
// 		if (!arr[i].userstate) {
// 			arr[i].userstate = 0;
// 			if (arr[i].Uid !== loginId) {
// 				list1.push(arr[i]);
// 			} else {
// 				list.unshift(arr[i]);
// 			}
			
// 		}

// 	}
// 	list = list.concat(list1);
// 	return list;
// }

//
	// console.log('电子围栏'+JSON.stringify(json));
	// var fJson = json.f;
	// if (fJson != null) {
	// 	for (var j = 0; j < fJson.length; j++) {
	// 		cbWarningFence(fJson[j].frMid, fJson[j].frFid, fJson[j].fn, fJson[j].frMlocationX, fJson[j].frMlocationY, fJson[j].frTime);
	// 	}
	// }
function cbFence(uid, fid, fn, x, y, tm, ids) {
	console.log('围栏ID'+fid);
	var warncheck=false;
    var phonename=Task_GetName(uid);
	var newsArray='{"ResId":"'+ids+'","ResType":"10","Uid":"'+uid+'","Name":"'+phonename+'","ResUrl":"","Time":"'+tm+'","Detail":"","ReadStatus":"0","ResCount":"0","Content":""}';
	// console.log(tm);
	console.log('告警数据'+JSON.stringify(newsArray));
	  if(Helpfirstdata!=undefined){
	  	 for(var i=0;i<Helpfirstdata.length;i++){
	  	 	 if(Helpfirstdata[i].ResId==ids&&Helpfirstdata[i].ResType==10){
               warncheck=true;
	  	 	 }
	  	 }
	  	 if(!warncheck){
	  	 	if(HelpSearchType==undefined||HelpSearchType==10){
	  	 		helpfirstadd(newsArray);
	  	 	}
	  	 } 
	  }
   
    // if(fenceLine.length !=0) {
    		
    // }
    
            Helpnumread++; 
	      if(Helpnumread>99){
	      $('.helpnumsbg').html('99+');
	      $('.helpnumsbg').show();
	    }else if(Helpnumread==0) {
	      $('.helpnumsbg').hide();

	    }else {
	       $('.helpnumsbg').html(Helpnumread);
	       $('.helpnumsbg').show();
	    }

	// console.log('告警记录消息推送');
	//	console.log(uid);console.log(fid);console.log(fn);console.log(x);console.log(y);console.log(tm);
}


function online_event_refresh_register() {
	for (var i = 0; i < arguments.length; i++) {
		gOnlineListenerRefresh.push(arguments[i]);
	}
}

function chatMembersSort(online, list) {
	var arr = new Array();
	var arr1 = new Array();
	var login = window.parent.loginId;
	online.push(login);
	for (var i = 0; i < list.length; i++) {
		if (online.indexOf(list[i].Uid) != -1) {
			list[i].online = 1;
			arr.push(list[i]);
		} else {
			list[i].online = 0;
			arr1.push(list[i]);
		}
	}
	var array = arr.concat(arr1);
	return array;
}

//==========================》》》》》方法《《《《==========================

function AllShow() {
	for (var i = 0, len = arguments.length; i < len; i++) {
		$(arguments[i]).show();
	}
}

function AllHide() {
	for (var i = 0, len = arguments.length; i < len; i++) {
		$(arguments[i]).hide();
	}
}

function callResultBack(res) {
	if (res == SESSION_RELEASE_REASON_NOTREACH) {
		showAlert('对方目前不在线！')
	} else if (res == SESSION_RELEASE_REASON_REJECTED) {
		showAlert('对方已拒绝接听！')
	} else if (res == SESSION_RELEASE_REASON_NOANSWER) {
		showAlert('对方无人接听，请稍后再拨！');
	}
}



 
 