//=================================================================
//					API说明
//
// Function:
//
//	- session_event_state_cb: 设置全局会话状态回调
//	- session_event_media_cb: 设置全局话权控制回调
//	- session_channel_enter: 进入频道会话
//	- session_channel_enter_monitor: 监听方式进入频道
//	- session_channel_exit: 退出频道会话
//	- session_talk_request: 申请话语权
//	- session_talk_release: 释放话语权
// 
//	- session_call_make(sessionId, videoPull): 发起一个临时会话
//	- session_call_bye(sessionId): 挂断一个临时会话
//	- session_call_incoming_accept(sessionId): 当有临时会呼叫来电时，选择接听此来电
//	- session_call_incoming_reject(sessionId): 当有临时会呼叫来电时，选择拒接此来电
//
// Event:
//
//	- cbSessionConnecting: 会话建立中
//	- cbSessionEstablished: 会话已建立
//	- cbSessionReleased: 会话已结束
//	- cbSessionIncomingAlert: 临时会话来电
//	- cbSessionMediaTalkPrepare: 话语权申请中
//	- cbSessionMediaTalkBegin: 我开始讲话
//	- cbSessionMediaTalkEnd: 我结束讲话
//	- cbSessionMediaListenBegin: 别人开始讲话
//	- cbSessionMediaListenEnd: 别人结束讲话
//  - cbSessionPresence: 会话Presence
//
//=================================================================



//============================================
//
//		会话列表管理
//
//============================================

var gSessionArray = new Array();
var gSessionTalkIndex = -1;

var gSessionListenerRefresh = new Array();


function sessionGetPresenceOnLine(sessionId) {
	var precense = null;
	if (gSessionArray != null) //???
	{
		for (var i = 0; i < gSessionArray.length; i++) {
			if (gSessionArray[i].sessionId == sessionId) {
				precense = gSessionArray[i].precense;
				if (precense == undefined) {
					precense = null;
				}
				break;
			}
		}
	}
	return precense;
}

function sessionArrayPut(session, sessionId) {
	var oldsession = sessionGetById(sessionId);
	if (oldsession == null) {
		gSessionArray.unshift(session);
	}
}

function sessionArrayRemove(sessionId) {
	if (gSessionArray != null) {
		for (var i = 0; i < gSessionArray.length; i++) {
			if (gSessionArray[i].sessionId == sessionId) {
				gSessionArray.splice(i, 1);
				break;
			}
		}
	}
}

function sessionGetByIndex(sessionIndex) {
	var session = null;
	for (var i = 0; i < gSessionArray.length; i++) {
		if (gSessionArray[i].sessionIndex == sessionIndex) {
			session = gSessionArray[i];
			break;
		}
	}
	return session;
}

function sessionGetById(sessionId) {
	var session = null;
	for (var i = 0; i < gSessionArray.length; i++) {
		if (gSessionArray[i].sessionId == sessionId) {
			session = gSessionArray[i];
			break;
		}
	}

	return session;
}

//============================================
//
//		设置全局会话状态事件
//
//============================================


var cbSessionConnecting = null;
var cbSessionEstablished = null;
var cbSessionReleased = null;

var cbSessionIncomingAlert = null;

var cbSessionPresence = null;

var cbSessionMediaTalkPrepare = null;
var cbSessionMediaTalkBegin = null;
var cbSessionMediaTalkEnd = null;
var cbSessionMediaListenBegin = null;
var cbSessionMediaListenEnd = null;


//-------------------------------
// 设置全局会话状态回调
//-------------------------------
// cbSessionConnecting(sessionId)
// cbSessionEstablished(sessionId)
// cbSessionReleased(sessionId, result)								result参考：SESSION_RELEASE_REASON_*
// cbSessionIncomingAlert(sessionId, callerName)

function session_event_state_cb(cbSesConnecting, cbSesEstablished, cbSesReleased, cbSesIncomingAlert, cbSesPresence) {
	cbSessionConnecting = cbSesConnecting;
	cbSessionEstablished = cbSesEstablished;
	cbSessionReleased = cbSesReleased;
	cbSessionIncomingAlert = cbSesIncomingAlert;
	cbSessionPresence = cbSesPresence;
}

function session_event_refresh_register(cbSesRefresh) {
	gSessionListenerRefresh.push(cbSesRefresh);
}

function session_event_refresh_unregister(cbSesRefresh) {
	gSessionListenerRefresh.remove(cbSesRefresh);
}

//-------------------------------
// 设置全局话权控制回调
//-------------------------------
// cbSessionMediaTalkPrepare(sessionId)
// cbSessionMediaTalkBegin(sessionId)
// cbSessionMediaTalkEnd(sessionId, reason)						reason参考：MEDIA_TALK_FINISH_REASON_*
// cbSessionMediaListenBegin(sessionId, speaker)
// cbSessionMediaListenEnd(sessionId)

function session_event_media_cb(cbMediaTalkPrepare, cbMediaTalkBegin, cbMediaTalkEnd, cbMediaListenBegin, cbMediaListenEnd) {
	cbSessionMediaTalkPrepare = cbMediaTalkPrepare;
	cbSessionMediaTalkBegin = cbMediaTalkBegin;
	cbSessionMediaTalkEnd = cbMediaTalkEnd;
	cbSessionMediaListenBegin = cbMediaListenBegin;
	cbSessionMediaListenEnd = cbMediaListenEnd;
}



//============================================
//
//		频道会话进入
//
//============================================


//-------------------------------
// API - 进入频道会话
//-------------------------------

function session_channel_enter(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (cbSessionEstablished != null)
			cbSessionEstablished(sessionId);
		if (session.mediaState == MEDIA_STATE_LISTENING) {
			if (cbSessionMediaListenBegin != null)
				cbSessionMediaListenBegin(session.sessionId, session.mediaSpeaker);
		}
	} else {
		if (cbSessionConnecting != null)
			cbSessionConnecting(sessionId);
		doChannelEnter(sessionId, function(sessionIndex) {
			var session = new AirSession();
			session.sessionId = sessionId;
			session.sessionIndex = sessionIndex;
			session.sessionState = SESSION_STATE_CONNECTING;
			sessionArrayPut(session, sessionId);
		});
	}
}

function session_channel_enter_monitor(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (cbSessionEstablished != null)
			cbSessionEstablished(sessionId);
		if (session.mediaState == MEDIA_STATE_LISTENING) {
			if (cbSessionMediaListenBegin != null)
				cbSessionMediaListenBegin(session.sessionId, session.mediaSpeaker);
		}
	} else {
		if (cbSessionConnecting != null)
			cbSessionConnecting(sessionId);
		doChannelEnterMonitor(sessionId, function(sessionIndex) {
			var session = new AirSession();
			session.sessionId = sessionId;
			session.sessionIndex = sessionIndex;
			session.sessionState = SESSION_STATE_CONNECTING;
			session.monitor = true;
			sessionArrayPut(session);
		});
	}
}

function onSessionEstablish(sessionIndex, sessionId) {
	var session = null;
	session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		session.sessionState = SESSION_STATE_DIALOG;
		if (cbSessionEstablished != null)
			cbSessionEstablished(session.sessionId);
	}
}



/**
 * @param replyOk 0成功
 * @param sessionIndex
 */
function onChatRoomEnter(replyOk, sessionIndex) {
	var session = null;
	session = sessionGetByIndex(sessionIndex);

	if (session != null) {
		if (replyOk == 0) {
			session.sessionState = SESSION_STATE_DIALOG;
			if (cbSessionEstablished != null)
				cbSessionEstablished(session.sessionId);
		} else {
			session.sessionState = SESSION_STATE_IDLE;
			if (cbSessionReleased != null)
				cbSessionReleased(session.sessionId, SESSION_RELEASE_REASON_ERROR);
			sessionArrayRemove(session.sessionId);
		}
	}
}


//============================================
//
//		频道会话退出
//
//============================================

//-------------------------------
// API - 退出频道会话
//-------------------------------

function session_channel_exit(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (session.mediaState == MEDIA_STATE_TALKING) {
			doTalkRelease(parseInt(session.sessionIndex, 10));
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, MEDIA_TALK_FINISH_REASON_RELEASED);
			if (gSessionTalkIndex == session.sessionIndex)
				gSessionTalkIndex = -1;
		} else if (session.mediaState == MEDIA_STATE_LISTENING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaListenEnd != null)
				cbSessionMediaListenEnd(session.sessionId);
		}

		sessionArrayRemove(sessionId);
		if (cbSessionReleased != null)
			cbSessionReleased(session.sessionId, SESSION_RELEASE_REASON_GENERAL);

		doChannelExit(sessionId);
	}
}

function onChatRoomExit(sessionIndex) {
	var session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		if (session.mediaState == MEDIA_STATE_TALKING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, MEDIA_TALK_FINISH_REASON_RELEASED);
			if (gSessionTalkIndex == session.sessionIndex)
				gSessionTalkIndex = -1;
		} else if (session.mediaState == MEDIA_STATE_LISTENING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaListenEnd != null)
				cbSessionMediaListenEnd(session.sessionId);
		}

		sessionArrayRemove(session.sessionId);
		if (cbSessionReleased != null)
			cbSessionReleased(session.sessionId, SESSION_RELEASE_REASON_GENERAL);
	}
}

//============================================
//
//		临时会话
//
//============================================

function session_call_make(sessionId, videoPull) //1:上啦	0：普通
{	
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (videoPull == 1) {
			session_message_send(sessionId, MESSAGE_TYPE_VIDEO_PULL, "");
		}
		if (cbSessionEstablished != null)
			cbSessionEstablished(sessionId);
		if (session.mediaState == MEDIA_STATE_LISTENING) {
			if (cbSessionMediaListenBegin != null)
				cbSessionMediaListenBegin(session.sessionId, session.mediaSpeaker);
		}
	} else {
		if (cbSessionConnecting != null)
			cbSessionConnecting(sessionId);
		doSessionTempCall(null, sessionId, videoPull, function(sessionIndex) {
			var session = new AirSession();
			session.sessionId = sessionId;
			session.sessionIndex = sessionIndex;
			session.sessionState = SESSION_STATE_CONNECTING;
			sessionArrayPut(session);
		});
	}
}

//挂断临时会话
function session_call_bye(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (session.mediaState == MEDIA_STATE_TALKING) {
			doTalkRelease(session.sessionIndex);
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, MEDIA_TALK_FINISH_REASON_RELEASED);
			if (gSessionTalkIndex == session.sessionIndex)
				gSessionTalkIndex = -1;
		} else if (session.mediaState == MEDIA_STATE_LISTENING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaListenEnd != null)
				cbSessionMediaListenEnd(session.sessionId);
		}

		sessionArrayRemove(sessionId); //回调前清除session(频道也一样)
		if (cbSessionReleased != null)
			cbSessionReleased(session.sessionId, SESSION_RELEASE_REASON_GENERAL);

		doLeaveCall(parseInt(session.sessionIndex, 10));
	}
}

function session_call_incoming_accept(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (session.sessionState == SESSION_STATE_CONNECTING) {
			doAcceptCall(parseInt(session.sessionIndex, 10));
		}
	}
}

function session_call_incoming_reject(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		if (session.sessionState == SESSION_STATE_CONNECTING) {
			doRejectCall(parseInt(session.sessionIndex, 10));
			if (cbSessionReleased != null)
				cbSessionReleased(session.sessionId, SESSION_RELEASE_REASON_GENERAL);
			sessionArrayRemove(sessionId);
		}
	}
}


//-------------------------------
// 临时会话来显事件
//-------------------------------

function onSessionIncomingAlert(sessionIndex, user, sessionId) {
	var session = sessionGetById(sessionId);
	if (session == null) {
		session = new AirSession();
		session.sessionId = sessionId;
		session.sessionIndex = sessionIndex;
		session.sessionState = SESSION_STATE_CONNECTING;
		sessionArrayPut(session);
	}

	session.sessionState = SESSION_STATE_CONNECTING;
	if (cbSessionIncomingAlert != null)
		cbSessionIncomingAlert(sessionId, user);
}

function onSessionRelease(sessionIndex, releaseReason) {
	var session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		if (session.mediaState == MEDIA_STATE_TALKING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, MEDIA_TALK_FINISH_REASON_RELEASED);
			if (gSessionTalkIndex == session.sessionIndex)
				gSessionTalkIndex = -1;
		} else if (session.mediaState == MEDIA_STATE_LISTENING) {
			session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaListenEnd != null)
				cbSessionMediaListenEnd(session.sessionId);
		}

		sessionArrayRemove(session.sessionId);
		if (cbSessionReleased != null)
			cbSessionReleased(session.sessionId, releaseReason);
	}
}

//============================================
//
//		会话媒体话权
//
//============================================

//-------------------------------
// API - 申请话语权
//-------------------------------

function session_talk_request(sessionId) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		gSessionTalkIndex = session.sessionIndex;
		if (cbSessionMediaTalkPrepare != null)
			cbSessionMediaTalkPrepare(sessionId);
		doTalkRequest(parseInt(session.sessionIndex, 10));
	}
}

function session_talk_request_userlist(sessionId, userlist) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		gSessionTalkIndex = session.sessionIndex;
		if (cbSessionMediaTalkPrepare != null)
			cbSessionMediaTalkPrepare(sessionId);
		doTalkRequestWithUserlist(parseInt(session.sessionIndex, 10), userlist);
	}
}

//-------------------------------
// API - 释放话语权
//-------------------------------

function session_talk_release() {
	if (gSessionTalkIndex >= 0) {
		var session = sessionGetByIndex(gSessionTalkIndex);
		if (session != null) {
			doTalkRelease(parseInt(session.sessionIndex, 10));
			if (session.mediaState != MEDIA_STATE_LISTENING)
				session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, MEDIA_TALK_FINISH_REASON_RELEASED);
			//if (session.mediaState == MEDIA_STATE_LISTENING && cbSessionMediaListenBegin != null)
			//	cbSessionMediaListenBegin(session.sessionId, session.mediaSpeaker);
		}
		gSessionTalkIndex = -1;
	}
}

//============================================
//
//		会话媒体状态事件
//
//============================================

function onMediaStateTalk(sessionIndex) {
	var session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		session.mediaState = MEDIA_STATE_TALKING;
		if (cbSessionMediaTalkBegin != null)
			cbSessionMediaTalkBegin(session.sessionId);
	}
}

function onMediaStateListern(sessionIndex, speaker) {
	var session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		session.mediaState = MEDIA_STATE_LISTENING;
		session.mediaSpeaker = speaker;
		if (cbSessionMediaListenBegin != null)
			cbSessionMediaListenBegin(session.sessionId, speaker);
	}
}

function onMediaStateIdle(sessionIndex, reason) {
	var session = sessionGetByIndex(sessionIndex);
	if (session != null) {
		if (reason == -1) // ListenEnd
		{
			if (session.mediaState != MEDIA_STATE_TALKING)
				session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaListenEnd != null)
				cbSessionMediaListenEnd(session.sessionId);
		} else // TalkEnd
		{
			if (session.mediaState != MEDIA_STATE_LISTENING)
				session.mediaState = MEDIA_STATE_IDLE;
			if (cbSessionMediaTalkEnd != null)
				cbSessionMediaTalkEnd(session.sessionId, reason);
			//if (session.mediaState == MEDIA_STATE_LISTENING && cbSessionMediaListenBegin != null)
			//	cbSessionMediaListenBegin(session.sessionId, session.mediaSpeaker);
		}
	}
}


//-------------------------------
// 会话锁定与解锁	isLock:0:unlock ,1:lock
//-------------------------------
function session_lock_opt(sessionId, islock) {
	var session = sessionGetById(sessionId);
	if (session != null) {
		isServiceLock(parseInt(session.sessionIndex, 10), islock);
		if (islock) {
			for (var i = 0; i < gSessionArray.length; i++) {
				gSessionArray[i].lock = 0;
			}
		}
		session.lock = islock;
		for (var i = 0; i < gSessionListenerRefresh.length; i++)
			gSessionListenerRefresh[i]();
	}
}

//============================================
//
//		会场状态通知
//
// cbSessionPresence(sessionId)
//============================================
function onSessionDialogPresence(json) {
	if (cbSessionPresence != null) {
		var session = sessionGetByIndex(json.sessionindex);
		if (session != null) {
			session.precense = null;
			if (session.precense == null) {
				session.precense = new Array();
			}
			for (var i = 0; i < json.sessionmember.length; i++) {
				session.precense.push(json.sessionmember[i].ipocid);
			}
			cbSessionPresence(session.sessionId);
			/*			
						var precense = sessionGetPresenceOnLine(session.sessionId);
						if(precense != null)
						{
							for(var k = 0; k<precense.length;k++)
							{
								alert("onSessionDialogMemberChange:"+precense[k]);
							}
						}
			*/
		}
	}
}

function onSessionDialogMemberChange(json) {
	/*	
		if(cbSessionPresence != null)
		{
			alert("onSessionDialogMemberChange");
			var session = sessionGetByIndex(json.sessionindex);
			if(session != null)
			{
				if(session.precense == null)
				{
					session.precense = new Array();
				}
				for(var i=0;i<json.sessionmember.length;i++)
				{
					var found = 0;
					for(var j = 0 ; j < session.precense.length; j++)
					{
						if(session.precense[j] == json.sessionmember[i].ipocid)
						{
							found = 1;
							if(json.sessionmember[i].userstate != USER_SESSION_STATE_ON_LINE)
							{
								session.precense.splice(j, 1);
							}
							break;
						}
					}
					if(found == 0)
					{
						if(json.sessionmember[i].userstate == USER_SESSION_STATE_ON_LINE)
						{
							session.precense.push(json.sessionmember[i].ipocid);
						}
					}	
				}
				cbSessionPresence(session.sessionId);
				var precense = sessionGetPresenceOnLine(session.sessionId);
				if(precense != null)
				{
					for(var k = 0; k<precense.length;k++)
					{
						alert("onSessionDialogMemberChange:"+precense[k]);
					}
				}
			}
		}
	*/
}

function eventSessionDialogMemberNotify(json) {
	/*	
		if(cbSessionPresence != null)
		{
			alert("eventSessionDialogMemberNotify");
			var session = sessionGetByIndex(json.sessionindex);
			if(session != null)
			{
				if(session.precense == null)
				{
					session.precense = new Array();
				}
				for(var i=0;i<json.sessionmember.length;i++)
				{
					var found = 0;
					for(var j = 0 ; j < session.precense.length; j++)
					{
						if(session.precense[j] == json.sessionmember[i].ipocid)
						{
							found = 1;
							if(json.sessionmember[i].userstate != USER_SESSION_STATE_ON_LINE)
							{
								session.precense.splice(j, 1);
							}
							break;
						}
					}
					if(found == 0)
					{
						if(json.sessionmember[i].userstate == USER_SESSION_STATE_ON_LINE)
						{
							session.precense.push(json.sessionmember[i].ipocid);
						}
					}	
				}
				cbSessionPresence(session.sessionId);
				var precense = sessionGetPresenceOnLine(session.sessionId);
				if(precense != null)
				{
					for(var k = 0; k<precense.length;k++)
					{
						alert("eventSessionDialogMemberNotify:"+precense[k]);
					}
				}
			}
		}
	*/
}

function onSessionChannelPresence(json) {
	if (cbSessionPresence != null) {
		var session = sessionGetByIndex(json.sessionindex);
		if (session != null) {
			if (session.precense == null) {
				session.precense = new Array();
			}

			for (var i = 0; i < json.sessionmember.length; i++) {
				var found = 0;
				json.sessionmember[i].userstate = USER_SESSION_STATE_ON_LINE;
				for (var j = 0; j < session.precense.length; j++) {
					if (session.precense[j] == json.sessionmember[i].ipocid) {
						found = 1;
						break;
					}
				}

				if (found == 0) {
					session.precense.push(json.sessionmember[i].ipocid);
				}
			}
			cbSessionPresence(session.sessionId);
			/*			
						var precense = sessionGetPresenceOnLine(session.sessionId);
						if(precense != null)
						{
							for(var k = 0; k<precense.length;k++)
							{
								alert("onSessionChannelPresence:"+precense[k]);
							}
						}
			*/
		}
	}
}

function onSessionChannelUserEnter(json) {
	if (cbSessionPresence != null) {
		var session = sessionGetByIndex(json.sessionindex);
		if (session != null) {
			if (session.precense == null) {
				session.precense = new Array();
			}

			for (var i = 0; i < json.sessionmember.length; i++) {
				var found = 0;
				for (var j = 0; j < session.precense.length; j++) {
					if (session.precense[j] == json.sessionmember[i].ipocid) {
						found = 1;
						break;
					}
				}
				if (found == 0) {
					session.precense.push(json.sessionmember[i].ipocid);
				}
			}
			cbSessionPresence(session.sessionId);
			/*			
						var precense = sessionGetPresenceOnLine(session.sessionId);
						if(precense != null)
						{
							for(var k = 0; k<precense.length;k++)
							{
								alert("onSessionChannelUserEnter:"+precense[k]);
							}
						}
			*/
		}
	}
}

function onSessionChannelUserExit(json) {
	if (cbSessionPresence != null) {
		var session = sessionGetByIndex(json.sessionindex);
		if (session != null) {
			if (session.precense == null) {
				session.precense = new Array();
			}
			var sessionmember = new Array();
			for (var i = 0; i < json.sessionmember.length; i++) {
				for (var i = 0; i < json.sessionmember.length; i++) {
					for (var j = 0; j < session.precense.length; j++) {
						if (session.precense[j] == json.sessionmember[i].ipocid) {
							session.precense.splice(j, 1);
							break;
						}
					}
				}
			}
			cbSessionPresence(session.sessionId);
			/*			
						var precense = sessionGetPresenceOnLine(session.sessionId);
						if(precense != null)
						{
							for(var k = 0; k<precense.length;k++)
							{
								alert("onSessionChannelUserExit:"+precense[k]);
							}
						}
			*/
		}
	}
}