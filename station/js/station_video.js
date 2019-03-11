var WINDOW_WIDTH = $(window).width();
var WINDOW_HEIGHT = $(window).height();
var MAIN_PLAYER_WIDTH = (WINDOW_WIDTH - 80) * 0.8;
var SIDE_PLAYER_WIDTH = (WINDOW_WIDTH - 80) * 0.2 - 20;
var SIDE_PLAYER_HEIGHT = 170;
var videoTimer = null;
var Video_NowGetPht=false;
var showVideoStoreFlag = false;

function videoApply() {
	var brosor = tellBrowser();
	if (brosor[0] == 'IE' && brosor[1] == '10') {
		$('.allScreen').hide();
	}

	
	videoSessionList.setEvtListeners(onNewVideoHandler, onVideoStopHandler, function(vinf) {
		alert(vinf.ipocid + '有视频请求，但当前已达最大播放路数')
	});

	uiVideoSetListeners(refreshVideoDivBuild, onVideoListDragStart, onVideoListDragStop, onVideoListToBig);
	
	if(Line!=null){
		map.removeOverlay(Line);
	}
	var left = 100 * (WINDOW_WIDTH - 350) / (2 * WINDOW_WIDTH) + '%';
	var left1 = 100 * (WINDOW_WIDTH - 250) / (2 * WINDOW_WIDTH) + '%';
	var top = 100 * (WINDOW_HEIGHT - 150) / (2 * WINDOW_HEIGHT) + '%';
	$('#veiframe').attr('height', (WINDOW_HEIGHT - 70));
	$('.video_top').height(WINDOW_HEIGHT - 180);
	$('#video_notice').css('left', left);
	$('#video_notice_leave').css('left', left);
	$('#broadcast_notice').css('left', left);
	$('.video_applying').css('left', left1);
	$('.video_applying').css('top', top);
	var ww = $('#video_player').width();
	$('.left_icon ').css('top', (WINDOW_HEIGHT - 120) / 2);
	//======================================//
	$('#videoStore').width(WINDOW_WIDTH - 80).height(WINDOW_HEIGHT - 80);
	$('#videoChannel').width(MAIN_PLAYER_WIDTH);
	// uiVideoConfig("videoStore", 70, 70, WINDOW_HEIGHT - 70, WINDOW_WIDTH - 70, WINDOW_HEIGHT - 180, MAIN_PLAYER_WIDTH, SIDE_PLAYER_HEIGHT);
	uiVideoConfig("videoStore", 80, 80, WINDOW_HEIGHT - 80, WINDOW_WIDTH - 80, WINDOW_HEIGHT - 180, MAIN_PLAYER_WIDTH, SIDE_PLAYER_HEIGHT);
   
}

function onVideoListDragStart() {
	$('#videoChannel').css('z-index', 890);
}

function onVideoListDragStop() {
	$('#videoChannel').css('z-index', 900);
}


//获取上报实时视频用户的名称
function veGetusername(id, fn) {
	// var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":["' + id + '"]}}';
	// $.getJSON(STATION_URL + '?Body=' + body,
	// 	function(ret) {
	// 		fn(ret);
	// 	}
	// )
	if (usersAll.size() > 0) {
		var userinfo = usersAll.get(id);
		userinfo ? fn({Result: 200, Name: userinfo.Name}) : fn({Result: 400, Name: id});
	} else {
		fn({Result: 400, Name: id})
	}
	
}

/**
 * 实时视频接口实现
 * 2017.6.28
 */

var comeVideoObj = {};
var veTime = null;
var videoList = new HashMap(); //视频列表

function onNewVideoHandler(vinf) {
	
	var s = videoSessionList.waitList();
	var first = videoSessionList.waitList()[0];

	if (!first) return;

	var video = $('.video_applying');
	var box = video.children('p').eq(0);
	var id = first.ipocid;
	var sid = first.sid;
	comeVideoObj = first;

    
	var username = function(ret) {
		var name, chatName;
		name = ret.Name;
		
		if (ret.Result == 200) {
			
			if (sid.charAt(0) === 'C') {
				chatName = getVideoChatName(sid, channelAlls);
			} else {
				chatName = getVideoChatName(sid, callArrList);
			}
			var obj = {
				"sid": sid,
				"Name": name,
				"chatName": chatName
			};
			videoList.put(id, obj);
			box.text(name);
			video_open();
		} else {

			if (sid.charAt(0) === 'C') {
				chatName = getVideoChatName(sid, channelAlls);
			} else {
				chatName = getVideoChatName(sid, callArrList);
			}
			var obj = {
				"sid": sid,
				"Name": name,
				"chatName": chatName
			};
			videoList.put(id, obj);
			box.text(id);
			video_open();
		}
	}
	////////重点看下/////////
	var video_open = function() {
		if ($('#station_video').css('display') == 'block') {
			watchLater();
			veTopBar();
		} else {
			$('#bg-color').show();
			video.show();
		}
	}

	veGetusername(id, username);
}

function getVideoChatName(sid, chatArr) {
	var index = sid.charAt(0);
	var name = '';
	// index == 'C' ? name = '频道id:' + sid : name = '会话id:' + sid ;
	for (var j = 0, l = chatArr.length; j < l; j++) {
		if (chatArr[j].Id === sid) {
			name = chatArr[j].Name;
			break;
		}
	}
	return name;
}

// 视频播放结束
function onVideoStopHandler(vinf) {
	console.log('视频播放结束');
	var watch = videoSessionList.getWatching();
	var length = videoSessionList.size();
	var first = videoSessionList.waitList()[0];
	var uid = vinf.ipocid;
	var name;
   
	if (usersAll.size()) {
		var userinfo = usersAll.get(uid);
		name = userinfo ? userinfo.Name : uid;
	} else {
		name = uid;
	}

	if (first) {	
		onNewVideoHandler();
	} else {
		$('#bg-color').hide();
		$('.video_applying').hide();

		if (!watch) {
			$('#video_notice').hide();
		} else {
			var nameNew = video_get_username();
			$('#video_notice').children('i').text(length>1?"等"+length:length);
			$('.video_applyer').text(nameNew);
		}
	}

	// if ($('#station_video').css('display') === 'none') {
	$('.video_applyer_leave').text(name);
	$('#video_notice_leave').show();
	setTimeout(function (){
		$('#video_notice_leave').hide()
		}, 3000);
	// }

	if (length === 0) {
		clearInterval(veTime);
	}

	refreshVideoArea();
	
	//没有实时视频回传，跳转到初始界面
    if(length == 0 && !watch)
	Video_Stopprev();
    
}

//稍后观看
function watchLater() {

	if ($('#id-userMoving').css('display') !== 'block' &&  $('#id-groupAddUsers').css('display') !== 'block') {
		$('#bg-color').hide();
	} 
	
	$('.video_applying').hide();
	var next = velimit();
	if (next == 0) {
		var navLi = $('.leftNav').find('li');
		var video = navLi.eq(3);
		var s = pickupVideo(comeVideoObj.ssid);

		refreshVideoArea(s);
		if (!video.hasClass('active')) {
			veTopBar(0);
		}
		
		onNewVideoHandler();
	}
	
}

//现在观看
function watchNow() {
	Close_window();
	AllHide('#bg-color', '.video_applying');
	printDie();
	$('#saveicon').hide();
	$('.mian_downuserbook').hide();
	//NavLeftindex(3);
	var next = velimit();
	
	if (next == 0) {
		showVideoStoreFlag = true;
		toTheVideo();
		var cId = comeVideoObj.ssid;
		var s = pickupVideo(cId);
		var session = videoSessionList.watchMe(s);

		refreshVideoArea(s);
	}
	veTopBar();
	onNewVideoHandler();
}


function refreshVideoArea(session) {   
	uiVideoRefreshView();
	$('#veiframe').hide();
	var watching = videoSessionList.getWatching();
	var lock = chatLockidGet();

	if (watching) {
		
		var player = watching.getPlayer();
		var info = watching.getInf();
		var mainVideoSid = info.sid;
		var ssid = info.ssid;
	
		//video_main_remove_fullscreen(watching, ssid);
		//video_main_set_fullscreen(watching, ssid);
		
		if (lock) {
			if (lock === mainVideoSid) {
				$('.video_lock').css('background', 'url(./img/chat/chat_lock1.png) no-repeat center center');
				$('.video_lock').attr('lock', mainVideoSid);
			} else {
				$('.video_lock').css('background', 'url(./img/icon/video/video_lock.png) no-repeat center center');
				$('.video_lock').attr('lock', '0');
			}
		} else {
			$('.video_lock').css('background', 'url(./img/icon/video/video_lock.png) no-repeat center center');
			$('.video_lock').attr('lock', '0');
		}

		if (player.muted)
			$('.video_audo').css('background-image', "url('img/video/video_sound.png')");
		else
			$('.video_audo').css('background-image', "url('img/video/video_sound1.png')");
		videoIpoc(info.ipocid, info.sid);
		$('#videoStore').css('background', '#272726');
		$('#videoChannel').show();
		$('#vsHand' + info.ssid).css('display', 'none');
		$('#vsInfo' + info.ssid).css('display', 'none');
	} else {
		$('#videoStore').css('background', '#000');
		$('#videoChannel').hide();
	}

	videoSessionList.showList().forEach(function(item, i) {
		var info = item.getInf();
		var sid = info.sid;

		if (sid === lock) {
			$('.' + sid + 'lockimg').attr({
				'src': 'img/chat/chat_lock.png',
				'state': '1'
			}).show();
		} else {
			$('.' + sid + 'lockimg').attr({
				'src': 'img/chat/chat_unlock.png',
				'state': '0'
			}).hide();
		}

		$('#vsHand' + info.ssid).css('display', 'block');
		$('#vsInfo' + info.ssid).css('display', 'block');
		video_small_removeDblclick(item);
		video_small_setDblclick(item);
	});

	postRefreshVideoView(session);
}

function video_main_set_fullscreen(session, ssid) {
	$('#av_' + ssid).on('click', function() {
		console.log('全屏触发');
		session.enableFullScreen()
	})
}

function video_main_remove_fullscreen(session, ssid) {
	$('#av_' + ssid).off('click');
}

function video_small_setDblclick(videoObject) {

	var ssid = videoObject.getInf().ssid;
	$("#vsHand" + ssid).on('dblclick', function(e) {
		if (onVideoListToBig != null) {
			onVideoListToBig(videoObject);
		}
	});
	// var box = document.getElementById('vsHand' + ipocid);
	// box.addEventListener('dblclick', dbclickHandle, false)
}

// function dbclickHandle() {
// 	if (onVideoListToBig != null) {
// 		onVideoListToBig(videoObject);
// 	}
// }

function video_small_removeDblclick(videoObject) {
	var ssid = videoObject.getInf().ssid;
	$("#vsHand" + ssid).off('dblclick');
	// var box = document.getElementById('vsHand' + ipocid);
	// box.removeEventListener('dblclick', dbclickHandle, false)
}

function refreshVideoDivBuild(videoSession) {
	// var watching = videoSessionList.getWatching();
    
	var player = videoSession.getPlayer();
	var info = videoSession.getInf();
	var id = info.ipocid;
	var ssid = info.ssid;
	var obj = videoList.get(id);
	var sid = info.sid;
	var ipocid = videoSession.getInf().ipocid;
	var sidIndex = sid.charAt(0);
  
	// videoSession.pause();
	// var sidImg = sidIndex == 'C' ? '<img class="fr" src="img/chat/chat_pin.png" alt="img" />' : '<img class="fr" src="img/chat/chat_linshi.png" alt="img" />';
	
	var sidImg = sidIndex == 'C' ? '<span class="fr ve_icon_pin">频</span>' : '<span class="fr ve_icon_lin">临</span>';
	var session = sessionGetById(sid);
	var imgMonitor = '';
	if (session && session.sessionState == SESSION_STATE_DIALOG) {
		imgMonitor = '<img style="display:inline" class="fr ' + sid + 'monitorimg" src="img/chat/chat_monitor.png" state="1" alt="img" onclick="video_monitor_click(this, \'' + sid + '\', \'' + ipocid + '\')" />';
	} else {
		imgMonitor = '<img class="fr ' + sid + 'monitorimg" src="img/chat/chat_unmonitor.png" state="0" alt="img" onclick="video_monitor_click(this, \'' + sid + '\', \'' + ipocid + '\')" />';
	}

	content = '<div id="uiVideo_' + ssid + '" uid="'+id+'" class="video_small_item" onmouseenter="video_mouseenter(this, \'' + sid + '\')" onmouseleave="video_mouseleave(this, \'' + sid + '\')">' +
		'<div id="vs' + ssid + '" class="video_small_show"></div>' +
		'<div id="vsInfo' + ssid + '" class="video_small_logo">' +
		'<span class="fl v-space">' + obj.Name + '</span>' +
		sidImg + '<span class="fr v-space">' + obj.chatName + '</span>' +
		'</div>' +
		'<div id="vsHand' + ssid + '" class="video_chat_hover">' +
		'<div class="fix v_monitor">'+imgMonitor+'</div>' +
		'<div class="fix v_lock"><img class="fr ' + sid + 'lockimg" src="img/chat/chat_unlock.png" state="0" alt="img" onclick="video_lock_click(this, \'' + sid + '\', \'' + ipocid + '\')" /></div>' +
		'</div>' +
		'</div>';
	$('#videoStore').append(content);
	$('#vs' + ssid).append(player);

   
    if(!showVideoStoreFlag && !videoSession.isPaused()){
  	 videoSession.pause();
  	 console.log("refreshVideoDivBuild:暂停");
    }

	return "uiVideo_" + ssid;
}


function onVideoListToBig(videoSession) {
	var newSession = videoSessionList.watchMe(videoSession);
	refreshVideoArea(newSession);
}


function video_mouseenter(self, sid) {
	var that = $(self);
	var momitorImg = that.find('.v_monitor').children('img');
	var lockImg = that.find('.v_lock').children('img');
	var lockid = chatLockidGet();

	for (var i = 0, len = gSessionArray.length; i < len; i++) {
		if (gSessionArray[i].sessionId === sid && gSessionArray[i].sessionState === SESSION_STATE_DIALOG) {
			momitorImg.attr({
				"src": "img/chat/chat_monitor.png",
				"state": "1"
			}).show();
			if (lockid === sid) { //?
				lockImg.attr({
					"src": "img/chat/chat_lock.png",
					"state": "1"
				});
			}
			lockImg.show();
			break;
		} else {
			if (sid.charAt(0) === 'C') {
				momitorImg.show();
			}
		}
	}
	var ipocid = videoSessionList.getWatching().getInf().ipocid;
	var id = that.attr('id');
	id = id.slice(8, id.length);
	if (ipocid != id) {
		that.children('.video_chat_hover').css({
			'background': '#000',
			'opacity': 0.5
		})
	}
}

function video_mouseleave(self) {
	var that = $(self);
	var momitorImg = that.find('.v_monitor').children('img');
	var lockImg = that.find('.v_lock').children('img');
	if (lockImg.attr('state') !== "1") {
		lockImg.hide();
	}
	if (momitorImg.attr('state') !== "1") {
		momitorImg.hide();
	}
	var ipocid = videoSessionList.getWatching().getInf().ipocid;
	var id = that.attr('id');
	id = id.slice(8, id.length);
	if (id != ipocid) {
		that.children('.video_chat_hover').css({
			'background': 'none',
			'opacity': 1
		})
	}
}

function video_monitor_click(self, sid, ipocid) {
	var that = $(self);
	var lockImg = that.parents('.video_chat_hover').find('.v_lock').children('img');
	var chatName = videoList.get(ipocid).chatName;
	var indexCode = sid.charAt(0);

	if (that.attr('state') === "0") {
		//监听该路会话
		session_channel_enter(sid);

		$('.channel_list_details').show();
		$('.channel_main').find('#' + sid).find('.channel_mr').attr('src', 'img/icon/channel/channel_listen.png');

		$('.' + sid + 'monitorimg').attr({
			'src': 'img/chat/chat_monitor.png',
			'state': '1'
		}).css('display', 'inline');
		lockImg.attr({
			'src': 'img/chat/chat_unlock.png',
			'state': '0'
		}).show(); //锁定按钮出现
	} else {
		//取消监听
		var indexCode = sid.charAt(0);

		if (indexCode !== 'C') {
			var showlist = videoSessionList.showList();
			var arr = [];
			showlist.forEach(function(item) {
				var id = item.getInf().sid;
				if (id === sid) {
					arr.push(item);
				}
			});
			if (arr.length) {
				var r = confirm('该临时会话存在多路视频，是否挂断？');
				if (r) {
					arr.forEach(function(that) {
						videoSessionList.hangup(that);
					})
				} else {
					return;
				}
			}
			session_call_bye(sid);
		} else {
			session_channel_exit(sid);
			$('.channel_main').find('#' + sid).find('.channel_mr').attr('src', 'img/icon/channel/channel_nolisten.png');

		}

		$('.' + sid + 'monitorimg').attr({
			'src': 'img/chat/chat_unmonitor.png',
			'state': '0'
		}).css('display', 'none');
		if (lockImg.attr('state') === "0") {
			that.show();
			lockImg.hide();
		} else {
			//取消锁定会话
			chatUnlockSetting(sid);
			lockImg.hide();
			that.hide();
		}
	}

}

function video_lock_click(self, sid, ipocid) {
	var state = $(self).attr('state');
	if (state === "0") {
		chatLockSetting(sid);
	} else {
		chatUnlockSetting(sid);
	}
}


function chatLockSetting(sid) {
	var session = sessionGetById(sid);
	if (!session) {
		return false;
	}
	var before = chatLockidGet();
	session_lock_opt(sid, 1);

	if (sid.charAt(0) === 'C') {
		refreshChannelMonitorList();
	}
	

	$('.' + sid + 'lockimg').attr({
		'src': 'img/chat/chat_lock.png',
		'state': '1'
	}).show();
	if (before) {
		$('.' + before + 'lockimg').attr({
			'src': 'img/chat/chat_unlock.png',
			'state': '0'
		}).hide();
	}

	var channelLockBtn = $('.channel_listenfooterauto');
	var channelId = $('.channel_box2').attr('id');
	channelId = channelId.slice(0, channelId.length - 1);
	if (channelId !== sid) {
		if (before && channelId === before) {
			if (channelLockBtn.attr('lock') === before) {
				channelLockBtn.children().css('background-color', '#A9A59F').animate({
					left: '2px'
				}, "slow");
				channelLockBtn.attr('lock', '0');
			}
		}
	} else {
		channelLockBtn.children().css('background-color', '#4AC663').animate({
			left: '24px'
		}, "slow");
		channelLockBtn.attr('lock', sid);
	}

	var watching = videoSessionList.getWatching();
	if (watching) {
		var mainVideoSid = watching.getInf().sid;

		if (sid === mainVideoSid) {
			$('.video_lock').css('background', 'url(./img/chat/chat_lock1.png) no-repeat center center');
			$('.video_lock').attr('lock', sid);
		} else {
			if (before && mainVideoSid === before) {
				$('.video_lock').css('background', 'url(./img/icon/video/video_lock.png) no-repeat center center');
				$('.video_lock').attr('lock', '0');
			}
		}
	}

	var lockbox = $('.channel_main').find('#' + sid);
	lockbox.find('.channel_mr').hide();
	lockbox.find('.channel_list_lockimg').show();
	if (before) {
		var old = $('.channel_main').find('#' + before);
		old.find('.channel_list_lockimg').hide();
		old.find('.channel_mr').show();
	}
}


function chatUnlockSetting(sid) {
	session_lock_opt(sid, 0);

	if (sid.charAt(0) === 'C') {
		refreshChannelMonitorList();
	}
	
	// refreshChannelMonitorList();

	$('.' + sid + 'lockimg').attr({
		'src': 'img/chat/chat_unlock.png',
		'state': '0'
	});

	var channelLockBtn = $('.channel_listenfooterauto');
	var channelId = $('.channel_box2').attr('id');
	channelId = channelId.slice(0, channelId.length - 1);
	if (channelId === sid) {
		channelLockBtn.children().css('background-color', '#A9A59F').animate({
			left: '2px'
		}, "slow");
		channelLockBtn.attr('lock', '0');
	}

	var watching = videoSessionList.getWatching();
	
	if (watching) {
		var mainVideoSid = watching.getInf().sid;
		if (mainVideoSid === sid) {
			$('.video_lock').css('background', 'url(./img/icon/video/video_lock.png) no-repeat center center');
			$('.video_lock').attr('lock', '0');
		}
	}

	var lockbox = $('.channel_main').find('#' + sid);
	lockbox.find('.channel_mr').show();
	lockbox.find('.channel_list_lockimg').hide();
}

function videoMainGetTiming(videoSession) {
	clearInterval(videoTimer);
	videoTimer = null;
	if (videoSession) {
		var start = Date.parse(videoSession.startTime());

		videoTimer = setInterval(function() {
			var time = Date.parse(new Date()) - start;
			var h = parseInt(time / 3600000, 10);
			var m = parseInt((time - h * 3600000) / 60000, 10);
			var s = parseInt((time - h * 3600000 - m * 60000) / 1000, 10);
			time = two(h) + ':' + two(m) + ':' + two(s);
			$('.video_time').text(time);

		}, 1000)
	}
}

/**
 * 视频会话对讲
 */
function videoIpoc(ipocid, cid) {
	var img = $('.video_speak');
	var imgdata = img.data('cid');
	var toName = $('.video_bom_div').find('span').eq(0);

	if (imgdata) {
		//		session_channel_exit(imgdata);
		img.removeData('cid');
	}
	toName.text(videoList.get(ipocid).Name);
	if (videoList.get(ipocid).chatName != '') {
		$('.Conversation').show();
		$('.Conversation').text(videoList.get(ipocid).chatName);
	}
	img.data('cid', cid);
	session_channel_enter(cid)
}


//视频挂断
function v_close() {
	console.log('BUG断了12344534534534');
	var thisname = $('.video_shoot_name').text();
	var oldSession = videoSessionList.getWatching();
	if (oldSession) {
		var oldSid = oldSession.getInf().sid;
	} else {
		return;
	}

	var indexCode = oldSid.charAt(0);
	// if (indexCode !== 'C') {
	// 	var showlist = videoSessionList.showList();
	// 	var arr = [];
	// 	showlist.forEach(function(item) {
	// 		var sid = item.getInf().sid;
	// 		if (sid === oldSid) {
	// 			arr.push(item);
	// 		}
	// 	});
	// 	if (arr.length) {
	// 		var r = confirm('该临时会话存在多路视频，是否挂断？');
	// 		if (r) {
	// 			arr.forEach(function(that) {
	// 				videoSessionList.hangup(that);
	// 			})
	// 		} else {
	// 			return;
	// 		}
	// 	}
	// 	session_call_bye(oldSid);
	// }
	
	// if (indexCode === 'C') {
	// 	videoSessionList.hangup(oldSession);
	// 	// session_channel_exit(oldSid);
	// }
	videoSessionList.hangup(oldSession);
	var newWatching = videoSessionList.unwatchMe();
	if (newWatching !== null) {
		videoSessionList.watchMe(newWatching);
	}
	refreshVideoArea(newWatching);
	var notice = $('#video_notice');
	$('.video_applyer_leave').text(thisname);
	$('#video_notice_leave').show();
	setTimeout(function (){$('#video_notice_leave').hide()}, 3000);
	var name = video_get_username();
	notice.find('i').text(videoSessionList.size()>1?"等"+videoSessionList.size():videoSessionList.size());
	notice.children('.video_applyer').text(name);
	var size = videoSessionList.size();
	if (videoSessionList.size() === 0) {
		clearInterval(veTime);
		notice.hide();
	}
}


//转发视频（回看）
function videoForward() {
	// var brwType = tellBrowser();
	var ifDoc;
	var watch = videoSessionList.getWatching();
	var url = watch.getInf()['url_fwd'];
	var reg = /stream-play-fwd/;
	if (reg.test(url)) return showAlert('当前视频为转发视频，不能再次转发！', 2000, true);
	if (watch) {
		$('#veiframe').width('290').show();
		// if (brwType[0] == 'IE') {
			ifDoc = $(window.frames["veiframe"].document);
            ifDoc.find('.Video_transmit').children('input').val('');
            $('#videochannel',ifDoc).show().siblings().hide();
			ifDoc.find('.media_transmit').show();
			ifDoc.find('.Video_channel').hide();
			ifDoc.find('.Video_tellchannel').hide();
			Video_Transmit();
		// } else {
		// 	ifDoc = $(window.frames["veiframe"].contentWindow.document);  
  //           $(".Video_transmit", ifDoc).children('input').val('');
  //           $('#videochannel',ifDoc).show().siblings().hide();
		// 	$(".media_transmit", ifDoc).show();
		// 	$(".Video_channel", ifDoc).hide();
		// 	$(".Video_tellchannel", ifDoc).hide();
		// 	Video_Transmit();
		// }
	} else {
		 
		   showAlert('没有视频，不能转发！');
	}
}
function Video_Transmit () {
	var ifDocs;
	// var brwType = tellBrowser();
	// if (brwType[0] == 'IE') {
		ifDocs = $(window.frames["veiframe"].document);
		ifDocs.find('#videochannel').show().siblings().hide();
		ifDocs.find('.media_transmitselect1').children().removeClass('meidia_transmitbg');
		ifDocs.find('.media_transmitselect1').children().eq(0).addClass('meidia_transmitbg');
		var len = ifDocs.find('#veZhuanpin').children().length;
		var lens = ifDocs.find('#veZhuanlin').children().length;
		var val = '';
		Video_ul2(ifDocs)
		Video_tellul2(ifDocs);
		if (ifDocs.find('#veZhuanpin').children('h3').hasClass('help_wu')) {

		} else {
			for (var i = 0; i < len; i++) {
				if (ifDocs.find('#veZhuanpin').children('li').eq(i).attr('name').indexOf(val) > -1) {
					ifDocs.find('#veZhuanpin').children('li').eq(i).show();
				} else {
					ifDocs.find('#veZhuanpin').children('li').eq(i).hide();
				}
			}
		}

		if (ifDocs.find('#veZhuanlin').children('h3').hasClass('help_wu')) {

		} else {
			for (var i = 0; i < lens; i++) {
				if (ifDocs.find('#veZhuanlin').children('li').eq(i).attr('name').indexOf(val) > -1) {
					ifDocs.find('#veZhuanlin').children('li').eq(i).show();
				} else {
					ifDocs.find('#veZhuanlin').children('li').eq(i).hide();
				}
			}
		}
		ifDocs.find('#VideosAllman').hide();
		ifDocs.find('#tramitvideo').show();
	// } else {
	// 	ifDocs = $(window.frames["veiframe"].contentWindow.document);
	// 	$('#videochannel', ifDocs).show().siblings().hide();
	// 	$('.media_transmitselect1', ifDocs).children().removeClass('meidia_transmitbg');
	// 	$('.media_transmitselect1', ifDocs).children().eq(0).addClass('meidia_transmitbg');
	// 	var len = $('#veZhuanpin', ifDocs).children().length;
	// 	var lens = $('#veZhuanlin', ifDocs).children().length;
	// 	var val = '';
	// 	Video_ul2(ifDocs)
	// 	Video_tellul2(ifDocs);

	// 	if ($('#veZhuanpin', ifDocs).children('h3').hasClass('help_wu')) {

	// 	} else {
	// 		for (var i = 0; i < len; i++) {
	// 			if ($('#veZhuanpin', ifDocs).children('li').eq(i).attr('name').indexOf(val) > -1) {
	// 				$('#veZhuanpin', ifDocs).children('li').eq(i).show();
	// 			} else {
	// 				$('#veZhuanpin', ifDocs).children('li').eq(i).hide();
	// 			}
	// 		}
	// 	}

	// 	if ($('#veZhuanlin', ifDocs).children('h3').hasClass('help_wu')) {

	// 	} else {
	// 		for (var i = 0; i < lens; i++) {
	// 			if ($('#veZhuanlin', ifDocs).children('li').eq(i).attr('name').indexOf(val) > -1) {
	// 				$('#veZhuanlin', ifDocs).children('li').eq(i).show();
	// 			} else {
	// 				$('#veZhuanlin', ifDocs).children('li').eq(i).hide();
	// 			}
	// 		}
	// 	}
	// 	$('#VideosAllman', ifDocs).hide();
	// 	$('#tramitvideo', ifDocs).show();
	// }
}



//环境音
function veMute() {
	//	console.log(videoSessionList);
	var watching = videoSessionList.getWatching();
	console.log(watching);
	if (watching !== null) {
		console.log(watching.getPlayer().muted); //false
		watching.mute(!watching.getPlayer().muted); //true

		if (watching.getPlayer().muted)
			$('.video_audo').css('background-image', "url('img/video/video_sound.png')"); //jing 
		else
			$('.video_audo').css('background-image', "url('img/video/video_sound1.png')"); //open
	}
}

//顶部提示条
function veTopBar(num) {
	clearInterval(veTime);
	var name = video_get_username();
	var len = videoSessionList.size();
	var notice = $('#video_notice');

	notice.children('i').text(len>1?"等"+len:len);

	$('.video_applyer').text(name);
	// if (num == 0)
		notice.show();
	// else
		// notice.hide();
	bgTwinkle();
}


function video_get_username() {
	var arrId = [];
	var arrName = [];
	var list = videoSessionList.showList();
	var watching = videoSessionList.getWatching();
	if (watching) {
		var watchuid = videoSessionList.getWatching().getInf().ipocid;
	} else {
		return '';
	}
	arrId.push(watchuid);
	list.forEach(function (item) {
		arrId.push(item.getInf().ipocid)
	})
	// if (arrId.length > 1) {
	// 	if (usersAll.size()) {
	// 		arrId.forEach(function (item) {
	// 			arrName.push(usersAll.get(item).Name);
	// 		})
	// 	} else {
	// 		arrName = arrId;
	// 	}
	// }
	// if (arrId.length == 1) {
	// 	var lastname = usersAll.size() ? usersAll.get(arrId[0]).Name : arrId[0];
	// 	arrName.push(lastname);
	// }
	if (arrId.length) {
		arrId.forEach(function(item) {
			if (usersAll.size() > 0) {
				var userinfo = usersAll.get(item);
				userinfo ? arrName.push(userinfo.Name) : arrName.push(item);
			} else {
				arrName.push(item);
			}
		})
	}
	var name = arrName.join('，');
	return name;	
}

function bgTwinkle() {
	var notice = $('#video_notice');
	notice.css('opacity', 1);
	var foo = function() {
		if (notice.css('opacity') == 1) {
			notice.animate({
				opacity: '0.5'
			}, 500)
		} else {
			notice.animate({
				opacity: '1'
			}, 500)
		}
	};
	veTime = setInterval(foo, 510);
}

//顶部提示条点击事件
function veTopBarClick() {
	// clearInterval(veTime);
	$('#saveicon').hide();
	$('.mian_downuserbook').hide();
	NavLeftindex(3);
	showVideoStoreFlag=true;
	toTheVideo();
}


//视频上限
function velimit() {
	var len = videoSessionList.size();
	var videoSessionLimit = videoSessionList.getLimit();

	if (len == videoSessionLimit - 1) {
		showAlert('接通视频已达上限' + videoSessionLimit + '路，将无法再接</br>通新视频，您可以断开已连接的视频来</br>避免无法接通下一路视频', 5000);
		return 0;
	} else if (len == videoSessionLimit) {
		showAlert('接通视频已达上限' + videoSessionLimit + '路，接收失败', 4000);
		return 1;
	} else {
		return 0;
	}
}

//全屏
function makeFullScreen(divObj, id) {
	$('#veiframe').hide(); //dai ding
	if (divObj.requestFullscreen) {
		divObj.requestFullscreen();
	} else if (divObj.msRequestFullscreen) {
		divObj.msRequestFullscreen();
	} else if (divObj.mozRequestFullScreen) {
		divObj.mozRequestFullScreen();
	} else if (divObj.webkitRequestFullscreen) {
		divObj.webkitRequestFullscreen();
	} else {
		// alert("您的浏览器版本不支持全屏，请升级浏览器版本。");
		// makeFullScreen_IE10(divObj, id);
	}
}


// function makeFullScreen_IE10(videoEle, id) {
// 	var oDiv = document.getElementById('fullScreen');
// 	if (oDiv) {
// 		alert(1)
// 	} else {
// 		oDiv = document.createElement('div');
// 		oDiv.id = 'fullScreen';
// 	}
	
	
// 	// div.style.width = window.innerWidth + 'px';
// 	// div.style.height = window.innerHeight + 'px';
// 	// div.appendChild(videoEle);
// 	// document.body.appendChild(div);
// }


//频道成员在线与否状态
function video_channel_online_state(cid) {
	var onliner = sessionGetPresenceOnLine(cid);
	var brwType = tellBrowser();
	var veiframe, vechannel;
	if (brwType[0] == 'IE') {
		veiframe = $(window.frames["veiframe"].document);
		vechannel = veiframe.find('.Video_channelUl ul');
	} else {
		veiframe = $(window.frames["veiframe"].contentWindow.document);
		vechannel = $('.Video_channelUl ul', veiframe);
	}

	veChannelListImp(cid, veChannelListShow, onliner);
}


function toallScreen() {
	var watching = videoSessionList.getWatching();
	var player = watching.getPlayer();
	var id = 'av_' + watching.getInf().ssid;
	$('#' + id).trigger('click');
	$('#' + id).trigger('click');
	var obj = document.getElementById(id);
	makeFullScreen(obj, id);

	player.width = 100 + '%';
	player.height = 100 + '%';
}

function rotateScreen() {
	var watching = videoSessionList.getWatching();
	if(watching != null)
	   watching.rotate(90);
}


function toSmallScreen() {
	var w = $(window).width();
	var h = $(window).height();
	var play = $('#video_playerLeft');
	var play_main = $('.video_top');
	var screen = $('.allScreen');
	screen.attr("src", "img/icon/video/video_quan.png");
	play.removeClass('video_playerLeft1');
	play.addClass('video_playerLeft');
	play.width('80%');
	play.height('100%');
	play_main.height(h - 220);
	$('.video_bom_div').css('left', (play.width() - 600) / 2);
	play_main.css('margin-top', '40px');
}


function toTheVideo() {
	// clearInterval(veTime);
	var navLi = $('.leftNav').find('li');
	
	var video = navLi.eq(3);
	// var navA = $('.radio_footer_set a');
	var navA = $('.radio_footer_set b');
	
	var sideBar = $('#sideBar');
	// var forTo = video.find("a").attr('href');
	var forTo = video.find("b").attr('href');
	var str = forTo.slice(8, forTo.length - 5);
	var id = forTo.slice(0, forTo.length - 5);
    Push_Ullist(str,id);
	// $('#video_notice').hide();

	navLi.removeClass();
	navA.removeClass('fontColor');

	$('.radio_footer_set').hide();
    
    if(showVideoStoreFlag)
	    initWatchVideoStore();
    
   	
	if (!sideObj[str]) {
		$.ajax({
			type: "GET",
			url: forTo,
			success: function(data) {
				sideBar.append(data);
				sideObj[str] = str;
				$('#station_video').hide();
			}
		});
	} else {
		video.addClass('active');
		navModuleShow(id);
	}
}


//锁定会话
function veChatLock(self) {
	var watching = videoSessionList.getWatching();
	var that = $(self);
	var lock = that.attr('lock');

	if (watching) {
		var sid = watching.getInf().sid;
		if (lock === '0') {
			//lock
			chatLockSetting(sid);
		} else {
			//unlock
			chatUnlockSetting(sid);
		}
	} else {
		showAlert('没有会话连接，不能锁定！');
	}
}

//远程抓拍
function veRemotecapture() {
	var watching = videoSessionList.getWatching();
	var url = watching.getInf()['url_fwd'];
	var reg = /stream-play-fwd/;
	if (reg.test(url)) return showAlert('当前视频为转发视频，不能远程抓拍！', 2000, true);
	if (watching) {
		var id = watching.getInf().ipocid;
		var body = '{"Code":11501,"Body":{"SessionId":"' + sessionId + '","ToUid":"' + id + '"}}';
//		$('.video_Remotecapture').css('background-image', 'url(img/video/video_Remotecapture2.png)');
		Video_NowGetPht=true;
		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			console.log(ret);
		})
	} else {
		showAlert('当前没有视频，不能抓拍');
	}
}

//本地抓拍
function veLocalcapture() {
	// var videoType = detectPlayerType();
	// var watching = videoSessionList.getWatching();
	// if (watching) {
	// 	var id = watching.getInf().ipocid;
	// 	if (videoType === 0) {
	// 		videoSessionList.setSnapshotDir("D:\\");
	// 		var localSnapshotPath = videoSessionList.snapshot(watching).path;
	// 		if (localSnapshotPath) {
	// 			VideoResourceReportCaptureLocal(id, localSnapshotPath);
	// 		}
	// 	}
	// 	if (videoType === 3) {
	// 		var localSnapshotData = videoSessionList.snapshot(watching).data;
	// 		if (localSnapshotData) {
	// 			VideoResourceReportCaptureLocalBuffer(id, localSnapshotData);
	// 		}
	// 	}

	// 	$('.video_Localcapture').css('background-image', 'url(img/video/video_Localcapture2.png)');
	// } else {
	// 	showAlert('当前没有视频，不能抓拍');
	// }

	var watching = videoSessionList.getWatching();
	if (watching) {
		var id = watching.getInf().ipocid;
		var localSnapshotData = videoSessionList.snapshot(watching).data;
		if (localSnapshotData) {
			var taskId = "";
			var custom = watching.getInf().content;
			if (custom && custom.length > 0)
			{

			 
			var json = utf8to16(base64decode(custom))+"\"}"; //该字符串不全
			  
			    json=JSON.parse(json);
				taskId = json.taskId;
			}
			VideoResourceReportCaptureLocalBuffer(id, localSnapshotData, taskId);
			Video_NowGetPht=true;
		}

	//	$('.video_Localcapture').css('background-image', 'url(img/video/video_Localcapture2.png)');
	} else {
		showAlert('当前没有视频，不能抓拍');
	}

}


// function utf8to16(str) {
//     var out, i, len, c;
//     var char2, char3;
//     out = "";
//     len = str.length;
//     i = 0;
//     while(i < len) {
//  c = str.charCodeAt(i++);
//  switch(c >> 4)
//  { 
//    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
//      // 0xxxxxxx
//      out += str.charAt(i-1);
//      break;
//    case 12: case 13:
//      // 110x xxxx   10xx xxxx
//      char2 = str.charCodeAt(i++);
//      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//      break;
//    case 14:
//      // 1110 xxxx  10xx xxxx  10xx xxxx
//      char2 = str.charCodeAt(i++);
//      char3 = str.charCodeAt(i++);
//      out += String.fromCharCode(((c & 0x0F) << 12) |
//         ((char2 & 0x3F) << 6) |
//         ((char3 & 0x3F) << 0));
//      break;
//  }
//     }
//     return out;
// }

// function base64decode(str) {
//     var c1, c2, c3, c4;
//     var i, len, out;

//     len = str.length;
//     i = 0;
//     out = "";
//     while(i < len) {
// 		 /* c1 */
// 		 do {
// 		     c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
// 		 } while(i < len && c1 == -1);
// 		 if(c1 == -1)
// 		     break;
		
// 		 /* c2 */
// 		 do {
// 		     c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
// 		 } while(i < len && c2 == -1);
// 		 if(c2 == -1)
// 		     break;
		
// 		 out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		
// 		 /* c3 */
// 		 do {
// 		     c3 = str.charCodeAt(i++) & 0xff;
// 		     if(c3 == 61)
// 		  return out;
// 		     c3 = base64DecodeChars[c3];
// 		 } while(i < len && c3 == -1);
// 		 if(c3 == -1)
// 		     break;
		
// 		 out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		
// 		 /* c4 */
// 		 do {
// 		     c4 = str.charCodeAt(i++) & 0xff;
// 		     if(c4 == 61)
// 		  return out;
// 		     c4 = base64DecodeChars[c4];
// 		 } while(i < len && c4 == -1);
// 		 if(c4 == -1)
// 		     break;
// 		 out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
//     }
//     return out;
// }

//远端抓拍结果回调
function cbCaptureGet(json) {
	var User_Id= loginId;
	var phonename=Task_GetName(json.uid);
	if(Video_NowGetPht) {
	    alert('远端抓拍完成，请去和助手查看！');
	    Video_NowGetPht=false
	}
//	$('.video_Remotecapture').css('background-image', 'url(img/video/video_Remotecapture.png)');
	console.log('远端抓拍'+JSON.stringify(json));
	
	var newsArray='{"ResId":"'+json.rid+'","ResType":"2","Uid":"'+json.uid+'","Name":"'+phonename+'","ResUrl":"'+json.url+'","Time":"'+json.tm+'","Detail":"","ReadStatus":"0","ResCount":"0","Content":""}';
	console.log('远端抓拍数据'+JSON.stringify(newsArray));

	 if(Meidafirstdata!=undefined){
	 	if(MediaSearchType==undefined||MediaSearchType==0){
	 		mediafirstadd(newsArray);
	 	}
	  }

	  if(Helpfirstdata!=undefined){
	  	if(HelpSearchType==undefined||HelpSearchType==0){
	     helpfirstadd(newsArray);
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

}

//本地抓拍完成
function cbLocalCaptureFinish(ok) {
	

//	$('.video_Localcapture').css('background-image', 'url(img/video/video_Localcapture.png)');
}

//本地抓拍结果回调
function cbLocalCaptureGet(json) {
	console.log('本地抓拍'+JSON.stringify(json));
		var User_Id= loginId;
	var phonename=json.uid;
	if(Video_NowGetPht){
	    alert('本地抓拍完成，请去和助手查看！');
	    Video_NowGetPht=false;
	 }
	// alert('本地抓拍完成，请去和助手查看！');
	var phonename=Task_GetName(json.uid);
	var newsArray='{"ResId":"'+json.rid+'","ResType":"2","Uid":"'+json.uid+'","Name":"'+phonename+'","ResUrl":"'+json.url+'","Time":"'+json.tm+'","Detail":"","ReadStatus":"0","ResCount":"0","Content":""}';
	// console.log('抓拍数据'+JSON.stringify(newsArray));
	 if(Meidafirstdata!=undefined){
	  if(MediaSearchType==undefined||MediaSearchType==0){
	 		mediafirstadd(newsArray);
	 	}
	  }
	  if(Helpfirstdata!=undefined){
	     if(HelpSearchType==undefined||HelpSearchType==0){
	        helpfirstadd(newsArray);
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
}

//视频存储通知
function cbVStoreGet(json) {
	console.log('视频存储'+JSON.stringify(json));
	var phonename=Task_GetName(json.Uid);
	var tm=MediaGetnowtime();
	var newsArray='{"ResId":"'+json.ResId+'","ResType":"3","Uid":"'+json.Uid+'","Name":"'+phonename+'","ResUrl":"'+json.ResUrl+'","Time":"'+tm+'","Detail":"","ReadStatus":"0","ResCount":"0","Content":""}';
	// console.log('视频存储'+JSON.stringify(newsArray));
	if(Meidafirstdata!=undefined){
	      if(MediaSearchType==undefined||MediaSearchType==1){
	 		mediafirstadd(newsArray);
	 	}
	  }
	  if(Helpfirstdata!=undefined){
	     if(HelpSearchType==undefined||HelpSearchType==1){
	        helpfirstadd(newsArray);
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
}

/*
 * 实时视频其他页面操作
 * 2017718
 */

//频道会话名称点击事件
function Video_channelshow() {
	var brwType = tellBrowser();
	var ifDoc, title, html;
	if (brwType[0] == 'IE') {
		ifDoc = $(window.frames["veiframe"].document);
		ifDoc.find('.media_memberselect').hide();
		ifDoc.find('.media_transmit').hide();
		title = ifDoc.find('.Video_channelName');
		html = ifDoc.find('.Video_channel');
	} else {
		ifDoc = $(window.frames["veiframe"].contentWindow.document);
		html = $(".Video_channel", ifDoc);
		$('.media_memberselect', ifDoc).hide();
		$('.media_transmit', ifDoc).hide();
		title = $(".Video_channelName", ifDoc);
	}


	var cid = $('.video_speak').data('cid');
	var indexCode = cid.charAt(0);
	$('#veiframe').width('290').show();
	html.show();

	title.empty().append('<i></i>');
	if (html.css('left') == '-260px') {
		html.animate({
			'left': '0px'
		});
		$("#veiframe").width('290');
		html.children('.left_icon').css("background", "#bca48a url(./img/left_icon.png) no-repeat center center");
	}
	if (indexCode === 'C') {
		Video_channelshowDetail(cid, title);
	} else {
		Video_chatshowDetail(cid, title);
	}
}

function Video_channelshowDetail(cid, title) {
	for (var i = 0, len = channelAlls.length; i < len; i++) {
		if (channelAlls[i].Id == cid) {
			var level = channelAlls[i].Level;
			var diamond = '<img src="img/chat/diamond.png" alt="img" />';

			title.children('i').text(channelAlls[i].Name);

			if (level == 0) {
				diamond = diamond + diamond + diamond + diamond;
				title.append(diamond);
			} else if (level == 1) {
				diamond = diamond + diamond + diamond;
				title.append(diamond);
			} else if (level == 2) {
				diamond = diamond + diamond;
				title.append(diamond);
			} else if (level == 3) {
				title.append(diamond);
			}

		}
	}
	var onlineMembers = sessionGetPresenceOnLine(cid);
	veChannelListImp(cid, veChannelListShow, onlineMembers);
}

function Video_chatshowDetail(cid, title) {
	for (var i = 0, len = callArrList.length; i < len; i++) {
		if (callArrList[i].Id === cid) {
			title.children('i').text(callArrList[i].Name);
		}
	}

	veChatListImp(cid, veChatListShow);
}

//频道会话列表接口
function veChannelListImp(cid, fn, onlineMembers) {
	var body = '{"Code":"10311","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + cid + '","Type":"1"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			if (ret.Result === 200) {
				if (onlineMembers.length) {
					var memberArray = compareOnlineMembers(onlineMembers, ret.Members);
					fn(memberArray);
				} else {
					fn(ret.Members);
				}
			} else {
				fn(null);
			}
		}
	)
}

function veChatListImp(cid, fn) {
	var body = '{"Code":"10312","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + cid + '"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			if (ret.Result === 200) {
				fn(ret.Members);
			} else {
				fn(null);
			}
		}
	)
}

function compareOnlineMembers(line, data) {
	var arr = [];
	for (var i = 0, len = line.length; i < len; i++) {
		for (var j = 0, lon = data.length; j < lon; j++) {
			if (line[i] === data[j].Uid) {
				data[j].online = 1;
				arr.push(data[j]);
				break;
			}
		}
	}
	for (var k = 0, lan = data.length; k < lan; k++) {
		if (!data[k].online) {
			arr.push(data[k]);
		}
	}
	return arr;
}

function veChatListShow(data) {
	var brwType = tellBrowser();
	var ifDoc, oUl;
	if (brwType[0] == 'IE') {
		ifDoc = $(window.frames["veiframe"].document);
		oUl = ifDoc.find('.Video_channelUl').children('ul');
	} else {
		ifDoc = $(window.frames["veiframe"].contentWindow.document);
		oUl = $(".Video_channelUl", ifDoc);
		oUl = oUl.children('ul');
	}

	var caller = $('.video_bom_div').children('span').eq(0).text();
	var html = '';
	oUl.empty();
	if (data) {
		for (var i = 0, len = data.length; i < len; i++) {
			var name = data[i].Name,
				uid = data[i].Uid,
				imgs = '<div class="vechatIcons"><img src="img/chat/phone_gray.png" alt="img" />' +
				'<img src="img/chat/location_gray.png" alt="img" />' +
				'<img src="img/chat/video_gray.png" alt="img" />' +
				'<img src="img/chat/pengray.png" alt="img" />' +
				'<img src="img/chat/edit_gray.png" alt="img" /></div>';

			if (caller === uid) {
				html += '<li onmouseover="vechatIconsShow(this)" onmouseout="vechatIconsHide(this)"><img class="veon" src="img/chat/outline.png" alt="img" />' +
					'<i>' + name + '</i><img class="veshipin" src="img/icon/video/video_shipin.png" alt="img" />' + imgs + '</li>';
			} else {
				html += '<li onmouseover="vechatIconsShow(this)" onmouseout="vechatIconsHide(this)"><img class="veon" src="img/chat/outline.png" alt="img" />' +
					'<i>' + name + '</i>' + imgs + '</li>';
			}
		}
	} else {
		showAlert('会话成员加载失败！');
	}
	oUl.append(html);
}

//频道会话列表展示
function veChannelListShow(data) {
	var brwType = tellBrowser();
	var ifDoc, oUl;
	if (brwType[0] == 'IE') {
		ifDoc = $(window.frames["veiframe"].document);
		oUl = ifDoc.find('.Video_channelUl').children('ul');
	} else {
		ifDoc = $(window.frames["veiframe"].contentWindow.document);
		oUl = $(".Video_channelUl", ifDoc);
		oUl = oUl.children('ul');
	}

	var watching = videoSessionList.getWatching();
	if (watching) {
		var userid = watching.getInf().ipocid;
	}
	// var caller = $('.video_bom_div').children('span').eq(0).text();
	var html = '';

	oUl.empty();
	if (data) {
		for (var i = 0, len = data.length; i < len; i++) {
			var level = data[i].Level,
				name = data[i].Name,
				uid = data[i].Uid,
				time = data[i].MemberSpeakTimelength,
				limit = data[i].Limit,
				onlineState = data[i].online,
				star = '<img src="img/chat/star.png" alt="img" />',
				imgs = '<div class="vechatIcons"><img src="img/chat/phone_gray.png" alt="img" />' +
				'<img src="img/chat/location_gray.png" alt="img" />' +
				'<img src="img/chat/video_gray.png" alt="img" />' +
				'<img src="img/chat/pengray.png" alt="img" />' +
				'<img src="img/chat/edit_gray.png" alt="img" /></div>',
				liHead = '<li name="' + uid + '" onmouseover="vechatIconsShow(this)" onmouseout="vechatIconsHide(this)">',
				online = '<img class="veon" src="img/chat/online.png" alt="img" />',
				outline = '<img class="veon" src="img/chat/outline.png" alt="img" />',
				liFoot = '<img class="veshipin" src="img/icon/video/video_shipin.png" alt="img" />' + imgs + '</li>',
				listenOnly = '<img src="img/chat/listen_only.png" alt="img" />';

			if (userid == uid) { //判断视频发起者
				if (!onlineState) {
					if (level == 0) {
						html += liHead + outline + '<i>' + name + '</i>' + star + star + liFoot;
					} else if (level == 1) {
						html += liHead + outline + '<i>' + name + '</i>' + star + liFoot;
					} else if (level == 2) {
						html += liHead + outline + '<i>' + name + '</i>' + liFoot;
					} else {
						html += liHead + outline + '<i>' + name + '</i>' + listenOnly + liFoot;
					}
				} else {
					if (level == 0) {
						html += liHead + online + '<i>' + name + '</i>' + star + star + liFoot;
					} else if (level == 1) {
						html += liHead + online + '<i>' + name + '</i>' + star + liFoot;
					} else if (level == 2) {
						html += liHead + online + '<i>' + name + '</i>' + liFoot;
					} else {
						html += liHead + online + '<i>' + name + '</i>' + listenOnly + liFoot;
					}
				}
			} else {
				if (!onlineState) {
					if (level == 0) {
						html += liHead + outline + '<i>' + name + '</i>' + star + star + imgs + '</li>';
					} else if (level == 1) {
						html += liHead + outline + '<i>' + name + '</i>' + star + imgs + '</li>';
					} else if (level == 2) {
						html += liHead + outline + '<i>' + name + '</i>' + imgs + '</li>';
					} else {
						html += liHead + outline + '<i>' + name + '</i>' + listenOnly + imgs + '</li>';
					}
				} else {
					if (level == 0) {
						html += liHead + online + '<i>' + name + '</i>' + star + star + imgs + '</li>';
					} else if (level == 1) {
						html += liHead + online + '<i>' + name + '</i>' + star + imgs + '</li>';
					} else if (level == 2) {
						html += liHead + online + '<i>' + name + '</i>' + imgs + '</li>';
					} else {
						html += liHead + online + '<i>' + name + '</i>' + listenOnly + imgs + '</li>';
					}
				}
			}

		}

	} else {
		oUl.append('频道成员加载失败！');
	}
	oUl.append(html);
 
 }


function onVideoStalledNotify(session) 
{
	//提示
	var watching = videoSessionList.getWatching();
	var sid = watching.getInf().sid;
	if(sid == session.getInf().sid)
	{
		showAlert('网络状态不佳,正在缓冲数据....', 10000);
	}
}

function lazyWatchVideoStore(){
   var h1 = $("#videoStore").height();
   var h2 = $("#videoStore").offset().top;

   var watching = videoSessionList.getWatching();
       if(watching!=null && watching.isPaused()){
            watching.resume();         
        }

   var showlist = videoSessionList.showList();
	   showlist.forEach(
	  	function(videoSession) {
			var ssid = videoSession.getInf().ssid;
			var h3 = $("#uiVideo_"+ssid).offset().top;	
			var h4 = $("#uiVideo_"+ssid).height();

			if(h3+h4>h2 && h3<h2+h1){
		        if(videoSession.isPaused())
                  videoSession.resume();
			}else{
               if(!videoSession.isPaused())
               	  videoSession.pause();        
			}     	
		});
}

var videoStoreTimer;
function videoStoreScroll(){
	clearTimeout(videoStoreTimer);
    videoStoreTimer=setTimeout(function(){
        lazyWatchVideoStore();
    }, 300);
}

function onVideoViewListen(){
	showVideoStoreFlag = true;
	initWatchVideoStore();
}

function initWatchVideoStore(){
	var ti = setTimeout(function(){
        try{
            onShowVideoView();	
            videoStoreScroll();
            }catch(e){
             console.log("initWatchVideoStore error: "+ti);
             ti>=5000?videoStoreScroll():initWatchVideoStore();  
            } 
	    },"");
}