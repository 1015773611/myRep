
//=================================================================
//					API说明
//
// Function:
//
//	- session_message_event_msg_cb(cbSesMsgSent, cbSesMsgRecv)：设置全局IM消息回调函数
//	- session_message_event_rec_cb(cbSesMsgRecStart, cbSesMsgRecStop, cbSesMsgRecPlayStart, cbSesMsgRecPlayStop)：设置全局录音回调
//	- session_message_send(sessionId, messageType, messageContent): 发送IM消息，messageType参考ctl_vars.js里MESSAGE_TYPE_*定义
//
//	- session_message_rec_start(sessionId)：开始录制录音
//	- session_message_rec_stop(sessionId, isCancel)：结束录制录音，isCancel表示是否取消本次录音
//	- session_message_rec_play_start(code, resId): 开始播放录音，Code调用方可利用其传入任何字符串参数回调定位，resId录音的资源地址
//	- session_message_rec_play_stop()：结束正在播放的录音
//
//	- session_message_forward(sessionId, messageType, messageUrl)：messageType目前仅支持MESSAGE_TYPE_PICTURE，MESSAGE_TYPE_VIDEO，MESSAGE_TYPE_VIDEO_STORE
//
// Event:
//
//  - cbSessionMessageSent(sid, isOk,state,senderId, senderName, msgId, msgType, msgContent, msgRes);
//	- cbSessionMessageRecv(sessionId, senderId, senderName, messageId, messageType, messageContent, messageRes): 新消息接收
//		* sessionId: 会话ID
//		* senderId: 发送者ID
//		* senderName: 发送者名称
//		* messageId: 消息ID
//		* messageType: 消息类型MESSAGE_TYPE_*
//		* messageContent: 文本信息
//		* messageRes: 图片或视频的Url，或录音的ResID
//	- cbSessionMessageRecStart(sessionId)：开始录音的回调
//	- cbSessionMessageRecStop(sessionId, resId)：结束录音的回调
//	- cbSessionMessageRecPlayStart(code, resId)：开始播放录音的回调
//	- cbSessionMessageRecPlayStop(code, resId)：结束播放录音的回调
//
//=================================================================


var cbSessionMessageSent = null;
var cbSessionMessageRecv = null;
var cbVideoCaptureGet = null;
var cbVideoLocalCaptureFinish = null;
var cbVideoLocalCaptureGet = null;
var cbVideoStoreGet = null;

var cbSessionMessageRecStart = null;
var cbSessionMessageRecStop = null;
var cbSessionMessageRecPlayStart = null;
var cbSessionMessageRecPlayStop = null;

//-------------------------------
// 设置全局消息状态回调
//-------------------------------

// cbSessionMessageSent(sessionId, isOK,state,senderId, senderName, messageId, messageType, messageContent, messageRes)
// cbSessionMessageRecv(sessionId, senderId, senderName, messageId, messageType, messageContent, messageRes)
// cbVideoCaptureGet(uid,url,tm)
// cbVideoLocalCaptureFinish(ok);
// cbVideoStoreGet(json);
function session_message_event_msg_cb(cbSesMsgSent, cbSesMsgRecv,cbCaptureGet,cbLocalCaptureFinish,cbLocalCaptureGet,cbVStoreGet)
{
	cbSessionMessageSent = cbSesMsgSent;
	cbSessionMessageRecv = cbSesMsgRecv;
	cbVideoCaptureGet = cbCaptureGet;// zhua hui
	cbVideoLocalCaptureFinish = cbLocalCaptureFinish;
	cbVideoLocalCaptureGet = cbLocalCaptureGet;
	cbVideoStoreGet = cbVStoreGet;
}


// cbSessionMessageRecStart(sessionId)
// cbSessionMessageRecStop(sessionId, resId)
// cbSessionMessageRecPlayStart(code, resId)
// cbSessionMessageRecPlayStop(code, resId)

function session_message_event_rec_cb(cbSesMsgRecStart, cbSesMsgRecStop, cbSesMsgRecPlayStart, cbSesMsgRecPlayStop)
{
	cbSessionMessageRecStart = cbSesMsgRecStart;
	cbSessionMessageRecStop = cbSesMsgRecStop;
	cbSessionMessageRecPlayStart = cbSesMsgRecPlayStart;
	cbSessionMessageRecPlayStop = cbSesMsgRecPlayStop;
}


//============================================
//
//		发送IM消息
//
//============================================

function session_message_send(sessionId, messageType, messageContent)
{
	var isOk = false;
	if (session_message_util_type_check(messageType) && sessionId != null && messageContent != null)
	{
		if (messageType == MESSAGE_TYPE_PICTURE || messageType == MESSAGE_TYPE_VIDEO)
		{
			doSessionPicMessageSend(messageType, sessionId, null, messageContent, 1);
			isOk = true;
		}
		else if (messageType == MESSAGE_TYPE_VIDEO_PULL)
		{
			doSessionMessageSend(messageType, sessionId, "", "", "", 0);
			isOk = true;
		}
		else if (messageType != MESSAGE_TYPE_RECORD)
		{
			doSessionMessageSend(messageType, sessionId, "", messageContent, "", 1);
			isOk = true;
		}
	}
}

//_content,_picMark,_taskId ====>null
function VideoResourceReportCaptureLocal(_ownerId, _picPath)
{
	doServiceResourceReportCaptureLocal(_ownerId, 1, null, _picPath, "","","");
}


//flash播放器
function VideoResourceReportCaptureLocalBuffer(_ownerId, _picData, _taskId){
	doServiceResourceReportCaptureLocalBuffer(_ownerId, 1, null, _picData, "", "", _taskId);
}

function onVideoReportCaptureLocalFinish(ok)
{
	if(cbVideoLocalCaptureFinish != null)
	{
		cbVideoLocalCaptureFinish(ok);
	}
}
//============================================
//
//		实时视频远端拍 & 实时视频存储推送
//
//============================================

function onVideoCaptureGet(json)
{
 
	if(cbVideoCaptureGet != null)
	{
		cbVideoCaptureGet(json);
	}
}

function onVideoLocalCaptureGet(json)
{
	if(cbVideoLocalCaptureGet != null)
	{
		cbVideoLocalCaptureGet(json);
	}
}

function onVideoStorePush(json)
{
 
	if(cbVideoStoreGet != null)
	{
		cbVideoStoreGet(json);
	}
}

//============================================
//
//		IM消息事件处理
//
//============================================

function onMessageSent(result, json)
{	
	if (json != null)
	{
		var isOk = false;
		var msgId = json.m_id;
		var sid = json.m_code;
		var senderId = json.ipocid;
		var senderName = json.name;
		var msgType = json.type;
		var msgContent = "";
		var msgRes = "";
		var state = json.state; //send state 
		if (session_message_util_type_check(msgType))
		{
			if (msgType == MESSAGE_TYPE_PICTURE || msgType == MESSAGE_TYPE_VIDEO || msgType == MESSAGE_TYPE_RECORD || msgType == MESSAGE_TYPE_VIDEO_STORE)
			{
				msgRes = json.messageExtra;
				if(msgType == MESSAGE_TYPE_RECORD){
					msgContent = json.message;
				}
			}
			else
			{
				msgContent = json.message;
			}
		}
		if(result == UI_RESULT_OK)
		{
			isOk = true;
		}
		if (isOk && cbSessionMessageSent != null)
			cbSessionMessageSent(sid, isOk,state,senderId, senderName, msgId, msgType, msgContent, msgRes);
	}	
}

function onMessageRecv(result, json)
{
	if (json != null)
	{
		var isOk = false;
		var msgId = json.m_id;
		var sid = json.m_code;
		var senderId = json.ipocid;
		var senderName = json.name;
		var msgType = json.type;
		var msgContent = "";
		var msgRes = "";
		var msgTime = json.dt_date + ' ' + json.dt_time;
		if (session_message_util_type_check(msgType))
		{
			if (msgType == MESSAGE_TYPE_PICTURE || msgType == MESSAGE_TYPE_VIDEO || msgType == MESSAGE_TYPE_RECORD || msgType == MESSAGE_TYPE_RECORD_PTT || msgType == MESSAGE_TYPE_VIDEO_STORE)
			{
				msgRes = json.messageExtra;
				isOk = true;
				if(msgType == MESSAGE_TYPE_RECORD || msgType == MESSAGE_TYPE_RECORD_PTT){
					msgContent = json.message;
				}
			}
			else if(msgType == TYPE_LOCATION_SHARE_POINT)
			{
				msgContent = JSON.parse(json.message);
				var x = msgContent.longitude;
				var y = msgContent.latitude;
				if(cbUserLocaltionChanged != null)
				{
					cbUserLocaltionChanged(senderId,x,y,"",0,0,0,msgTime);
				}
			}
			else
			{
				msgContent = json.message;
				isOk = true;
			}
		}
		if (isOk && cbSessionMessageRecv != null && msgType != TYPE_LOCATION_SHARE_POINT)
			cbSessionMessageRecv(sid, senderId, senderName, msgId, msgType, msgContent, msgTime, msgRes);
	}
}


//============================================
//
//		录音消息发送
//
//============================================

var gMsgRecSessionId = "";

function session_message_rec_start(sessionId)
{	
	gMsgRecSessionId = sessionId;
	doStartRecord();
}

function eventRecRecordStart(wParam)
{
	if (cbSessionMessageRecStart != null)
		cbSessionMessageRecStart(gMsgRecSessionId);
}

function session_message_rec_stop(sessionId, isCancel)
{	
	doStopRecord(isCancel);
}

//wParam: -1 录音失败 -2 录音时间太短  -3 取消
function eventRecRecordStop(wParam, resId)
{
	if (resId != null)
	{
		if (cbSessionMessageRecStop != null)
		{
			cbSessionMessageRecStop(gMsgRecSessionId, wParam, resId);	
		}
		if(wParam == -1 || wParam == -2 || wParam == -3)
		{
			//do nothing
		}
		else
		{
			gMsgRecSessionId = gMsgRecSessionId == "" ? null : gMsgRecSessionId;		
			doSessionMessageSend(MESSAGE_TYPE_RECORD, gMsgRecSessionId, "", wParam, resId, 1);
		}
		gMsgRecSessionId = "";
	}
}

//============================================
//
//		录音消息播放
//
//============================================

function session_message_rec_play_start(code, resId)
{
	//http://112.35.28.14:6062/sp_filemsg/100110080-1500869070-193-01.amr
	var restmp;
	var restmp1 = resId.indexOf("sp_filemsg/");
	var restmp2 = resId.indexOf(".amr");
	if(restmp1== -1 || restmp2 == -1)
	{
		restmp = resId;
	}	
	else
	{
		restmp = resId.substring(restmp1+11,restmp2);	
	}
	doRecordPlayStart(code, restmp, 0, "");
}

function session_message_rec_play_stop()
{	
	doRecordPlayStop();
}

function onRecordPlayStart(code, resId)
{
	if (cbSessionMessageRecPlayStart != null)
		cbSessionMessageRecPlayStart(code, resId);
}

function onRecordPlayStop(code, resId)
{
	if (cbSessionMessageRecPlayStop != null)
		cbSessionMessageRecPlayStop(code, resId);
}


//============================================
//
//		转发IM消息
//
//============================================

// messageType取值为：
// MESSAGE_TYPE_PICTURE - 转发图片
// MESSAGE_TYPE_VIDEO - 转发视频
// MESSAGE_TYPE_VIDEO_STORE - 转发实时录制视频片段

function session_message_forward(sessionId, messageType, messageUrl)
{
	var isOk = false;
	if (session_message_util_type_check(messageType) && sessionId != null && messageUrl != null)
	{
		if (messageType == MESSAGE_TYPE_PICTURE||
			messageType == MESSAGE_TYPE_VIDEO ||
			messageType == MESSAGE_TYPE_VIDEO_STORE)
		{
			doSessionMessageSend(messageType, sessionId, "", "", messageUrl, 1);
			isOk = true;
		}
	}
}

//============================================
//
//		名称和组织变更相关推送
//
//============================================

//给企业下所有有效用户推送指定用户名称的变更
/*
{
	"t": 300,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"users":
	[
		{"uid": "xxx", "uname": "xxxx"},
		...
	]
}
*/
function onPushUserNameChanged(json)
{   
	console.log(JSON.stringify(json));
	// doPushUserNameChanged(json);
    UserNameChange(json);
}

//给企业下所有有效调度员推送指定调度员身份的变更
/*
{
	"t": 302,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"adms":
	[
		{"uid": "xxx", "type": 0},			//type: 0: 取消 1：设定
		...
	]
}
*/
function onPushUserRoleChanged(json)
{
	doPushUserRoleChanged(json);
}

//给企业下所有有效调度员推送指定组织名称的变更
/*
{
	"t": 301,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"orgs":
	[
		{"oid": "xxx", "oname": "xxxx"},
		...
	]
}
*/
function onPushOrgNameChanged(json)
{
	doPushOrgNameChanged(json);
}

//给企业下所有有效调度员推送组织的变更，包括组织节点增删、组织下成员移动、组织排序
/*
{
	"t": 303,
	"oprid": "操作人ID"		//如果是管理台触发则此值为admin
}
*/
function onPushOrgStructChanged(json)
{
	doPushOrgStructChanged(json);
}


//============================================
//
//		Utils
//
//============================================

function session_message_util_type_check(type)
{
	isAllow = false;
	if (type == MESSAGE_TYPE_TEXT ||
		type == MESSAGE_TYPE_PICTURE ||
		type == MESSAGE_TYPE_RECORD ||
		type == MESSAGE_TYPE_RECORD_PTT ||
		type == MESSAGE_TYPE_VIDEO ||
		type == MESSAGE_TYPE_VIDEO_PULL ||
		type == MESSAGE_TYPE_LOCATION ||
		type == MESSAGE_TYPE_VIDEO_STORE)
	{
		isAllow = true;
	}
	return isAllow;
}
