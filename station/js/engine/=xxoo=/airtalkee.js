// 1. API

// export symbols
window['doLogin'] = doLogin;
window['doLoginOut'] = doLoginOut;
window['doCreateChatroom'] = doCreateChatroom;
window['doAddChatroomMember'] = doAddChatroomMember;
window['doUpdateChatroom'] = doUpdateChatroom;
window['doDeleteChatroomMember'] = doDeleteChatroomMember;
window['doLoad'] = doLoad;
window['doChannelEnter'] = doChannelEnter;
window['doChannelEnterMonitor'] = doChannelEnterMonitor;
window['doChannelExit'] = doChannelExit;
window['doTalkRequest'] = doTalkRequest;
window['doTalkRequestWithUserlist'] = doTalkRequestWithUserlist;
window['doTalkRelease'] = doTalkRelease;
window['doSessionTempCall'] = doSessionTempCall;
window['doSessionCallInvite'] = doSessionCallInvite;
window['doAcceptCall'] = doAcceptCall;
window['doRejectCall'] = doRejectCall;
window['doLeaveCall'] = doLeaveCall;
window['doIncomingBusy'] = doIncomingBusy;
window['doRecordPlayStart'] = doRecordPlayStart;
window['doRecordPlayStop'] = doRecordPlayStop;
window['doSessionMessageSend'] = doSessionMessageSend;
window['doSessionPicMessageSend'] = doSessionPicMessageSend;
window['doDeleteChatroom'] = doDeleteChatroom;
window['doUpdateGroupMemberPriority'] = doUpdateGroupMemberPriority;
window['doStartRecord'] = doStartRecord;
window['doStopRecord'] = doStopRecord;
window['mouseDownStartRecord'] = mouseDownStartRecord;
window['mouseUpStopRecord'] = mouseUpStopRecord;
window['onButtonRecord'] = onButtonRecord;
window['isServiceLock'] = isServiceLock;
window['doSecretImageDownload'] = doSecretImageDownload;
window['doSecretImageDownloadAsync'] = doSecretImageDownloadAsync;
window['doServiceResourceReportCaptureLocal'] = doServiceResourceReportCaptureLocal;
window['doServiceResourceReportCaptureLocalBuffer'] = doServiceResourceReportCaptureLocalBuffer;
window['doGetVersion'] = doGetVersion;
window['doRestartSvc'] = doRestartSvc;
window['doSetCrashReportUrl'] = doSetCrashReportUrl;
window['doSetLogLvl'] = doSetLogLvl;
window['doVersionCheck'] = doVersionCheck;

function doGetVersion(cb) {
    call('getVersion', null, function (resp) {
        var r = '';
        // handle error in case the call fails
        if (resp.iserr()) {
            log('getVersion: failed:', resp['error']);
        }
        r = resp['result'];
        if (cb)
            cb(r);
    });
}

function doRestartSvc() {
    call('restartSvc');
}

function doSetCrashReportUrl(url) {
    call('setCrashReportUrl', { 'url': url });
}

// lvl: 0 to disable log; verbosity increases as lvl goes from 1 to 6.
function doSetLogLvl(lvl) {
    call('setLogLvl', { 'lvl': lvl });
}

function doVersionCheck(cb) {
    //var version = document.getElementById("AirEngineActivex").ServiceCheckVersion(VERSION);
    // serviceCheckVersion(LPCTSTR oldVersion)
    call('serviceCheckVersion', { 'oldVersion': VERSION }, function (resp) {
        var r = 1;
        // handle error in case the call fails
        if (resp.iserr()) {
            log('checkVersion: failed:', resp['error']);
            r = -1;
        }
        r = resp['result'] == 0 ? 0 : r;
        if (cb)
            cb(r);
    });
}

function doLogin(serverIp, airuserId, airuserPass) {
    //document.getElementById("AirEngineActivex").ServiceLogin(base64encode(utf16to8(airuserId)), base64encode(utf16to8(airuserPass)), base64encode(utf16to8(DM_IP)), base64encode(utf16to8(SERVICE_KEY)));
    // serviceLogin(LPCTSTR userid,  LPCTSTR password,  LPCTSTR serverIp,  LPCTSTR serviceKey)
    call('serviceLogin', { 'userid': base64encode(utf16to8(airuserId)), 'password': base64encode(utf16to8(airuserPass)), 'serverIp': base64encode(utf16to8(serverIp)), 'serviceKey': base64encode(utf16to8(SERVICE_KEY)) });
    //call('serviceLogin', {
    //    uid: airuserId,
    //    passwd: airuserPass,
    //    srvIP: DM_IP,
    //    svcKey: SERVICE_KEY
    //});
}

function doLoginOut() {
    //document.getElementById("AirEngineActivex").ServiceLogout();
    call('serviceLogout');
}

function doCreateChatroom(json) {
    //document.getElementById("AirEngineActivex").ServiceChatroomCreate(base64encode(utf16to8(json)));
    // serviceChatroomCreate(LPCTSTR roomInfo)
    call('serviceChatroomCreate', { 'roomInfo': base64encode(utf16to8(json)) });
}

function doAddChatroomMember(json) {
    //document.getElementById("AirEngineActivex").ServiceChatroomAddMember(base64encode(utf16to8(json)));
    // serviceChatroomAddMember(LPCTSTR roomInfo)
    call('serviceChatroomAddMember', { 'roomInfo': base64encode(utf16to8(json)) });
}

function doUpdateChatroom(json) {
    //document.getElementById("AirEngineActivex").ServiceChatroomUpdate(base64encode(utf16to8(json)));
    // serviceChatroomUpdate(LPCTSTR roomInfo)
    call('serviceChatroomUpdate', { 'roomInfo': base64encode(utf16to8(json)) });
}

function doDeleteChatroomMember(json) {
    //document.getElementById("AirEngineActivex").ServiceChatroomDeleteMember(base64encode(utf16to8(json)));
    // serviceChatroomDeleteMember(LPCTSTR roomInfo)
    call('serviceChatroomDeleteMember', { 'roomInfo': base64encode(utf16to8(json)) });
}

function doLoad() {
    //document.getElementById("PocWebLibActivex").ServiceGroupListGet();
    call('serviceGroupListGet');
}

function doChannelEnter(channelId, cb) {
    {
        //return document.getElementById("AirEngineActivex").ServiceSessionEnterChat(base64encode(utf16to8(channelId)));
        // serviceSessionEnterChat(LPCTSTR roomid)
        call('serviceSessionEnterChat', { 'roomid': base64encode(utf16to8(channelId)) }, function (resp) {
            if (resp.iserr()) {
                log('serviceSessionEnterChat: Failed:', resp['error']);
                resp.result = -1;
            }
            if (cb) { cb(resp['result']); }
        });
    }
}

function doChannelEnterMonitor(channelId, cb) {
    {
        //return document.getElementById("AirEngineActivex").ServiceSessionEnterChat(base64encode(utf16to8(channelId)));
        // serviceSessionEnterChat(LPCTSTR roomid)
        call('serviceSessionEnterChatMonitor', { 'roomid': base64encode(utf16to8(channelId)) }, function (resp) {
            if (resp.iserr()) {
                log('serviceSessionEnterChatMonitor: Failed:', resp['error']);
                resp.result = -1;
            }
            if (cb) { cb(resp['result']); }
        });
    }
}

function doChannelExit(channelId) {
    {
        //document.getElementById("AirEngineActivex").ServiceSessionExitChat(base64encode(utf16to8(channelId)));
        // serviceSessionExitChat(LPCTSTR roomid)
        call('serviceSessionExitChat', { 'roomid': base64encode(utf16to8(channelId)) });
    }
}

/**
 * 频道点击讲话
 * @param sessionIndex
 */

function doTalkRequest(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceMediaTalkRequest(sessionIndex);
        // serviceMediaTalkRequest(short sessionIndex)
        call('serviceMediaTalkRequest', { 'sessionIndex': sessionIndex });
    }
}

/**
 * 频道点击讲话
 * @param sessionIndex
 * @param userList
 */

function doTalkRequestWithUserlist(sessionIndex, userList) {
    {
        //document.getElementById("AirEngineActivex").ServiceMediaTalkRequestWithUserlist(sessionIndex, userList);
        // serviceMediaTalkRequestWithUserlist(short sessionIndex, LPCTSTR userList)
        var users = base64encode(utf16to8("null"));
        if (userList != null) {
            users = base64encode(utf16to8(userList));
        }
        call('serviceMediaTalkRequestWithUserlist', { 'sessionIndex': sessionIndex, 'userList': users });
    }
}
/**
 * 频道结束讲话
 * @param sessionIndex
 */
function doTalkRelease(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceMediaTalkRelease(sessionIndex);
        // serviceMediaTalkRelease(short sessionIndex)
        call('serviceMediaTalkRelease', { 'sessionIndex': sessionIndex });
    }
}

//session
function doSessionTempCall(json, sid, video, cb) {
    //		alert(json);
    var sessionIndex = 0;
    {
        try {
            var sessionId = base64encode(utf16to8("null"));
            var ipocids = base64encode(utf16to8("null"));
            if (sid != null) {
                sessionId = base64encode(utf16to8(sid + ""));
            }
            if (json != null) {
                ipocids = base64encode(utf16to8(json));
            }
            if (video == 1) {
                //sessionIndex = document.getElementById("AirEngineActivex").ServiceSessionCallVideo(ipocids, sessionId);
                // serviceSessionCallVideo(LPCTSTR userids, LPCTSTR sid)
                call('serviceSessionCallVideo', { 'userids': ipocids, 'sid': sessionId }, function (resp) {
                    if (resp.iserr()) {
                        log('serviceSessionCallVideo: Failed:', resp['error']);
                        resp['result'] = -1;
                    }
                    if (cb) { cb(resp['result']); }
                });
            } else {
                //sessionIndex = document.getElementById("AirEngineActivex").ServiceSessionCall(ipocids, sessionId);
                // serviceSessionCall(LPCTSTR userids, LPCTSTR sid)
                call('serviceSessionCall', { 'userids': ipocids, 'sid': sessionId }, function (resp) {
                    if (resp.iserr()) {
                        log('serviceSessionCall: Failed:', resp['error']);
                        resp['result'] = -1;
                    }
                    if (cb) { cb(resp['result']); }
                });
            }
        }
        catch (e) {
        }
    }
    //return sessionIndex;
}

function doSessionCallInvite(sessionIndex, json) {
    //		alert(json);
    {
        try {
            //document.getElementById("AirEngineActivex").ServiceSessionCallJoin(sessionIndex, base64encode(utf16to8(json)));
            // serviceSessionCallJoin(short sessionIndex,  LPCTSTR userids)
            call('serviceSessionCallJoin', { 'sessionIndex': sessionIndex, 'userids': base64encode(utf16to8(json)) });
        }
        catch (e) { }
    }
}

function doAcceptCall(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceSessionAcceptCall(sessionIndex);
        // serviceSessionAcceptCall(short sessionIndex)
        call('serviceSessionAcceptCall', { 'sessionIndex': sessionIndex });
    }
}

function doRejectCall(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceSessionRejectCall(sessionIndex);
        // serviceSessionRejectCall(short sessionIndex)
          console.log(typeof sessionIndex);
        call('serviceSessionRejectCall', { 'sessionIndex': sessionIndex });
    }
}

function doLeaveCall(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceSessionLeaveCall(sessionIndex);
        // serviceSessionLeaveCall(short sessionIndex)
        console.log(typeof sessionIndex);
        call('serviceSessionLeaveCall', { 'sessionIndex': sessionIndex });
    }
}

function doIncomingBusy(sessionIndex) {
    {
        //document.getElementById("AirEngineActivex").ServiceSessionBusy(sessionIndex);
        // serviceSessionBusy(short sessionid)
        call('serviceSessionBusy', { 'sessionid': sessionIndex });
    }
}

function doRecordPlayStart(code, resid, secret, secretKey) {
    {
        //isContinuousPaly = true;
        code = base64encode(utf16to8(code+""));
        var resId = base64encode(utf16to8(resid+""));
        var sKey = base64encode(utf16to8(secretKey + ""));
        //document.getElementById("AirEngineActivex").ServiceRecordPlayStop();
        call('serviceRecordPlayStop');
        //document.getElementById("AirEngineActivex").ServiceRecordPlayStart(code, resId, secret, sKey);
        // serviceRecordPlayStart(LPCTSTR code,  LPCTSTR resid,  short secret,  LPCTSTR secret_key)
        call('serviceRecordPlayStart', { 'code': code, 'resid': resId, 'secret': secret, 'secret_key': sKey });
    }
}
function doRecordPlayStop() {
    {
        //isContinuousPaly = false;
        //document.getElementById("AirEngineActivex").ServiceRecordPlayStop();
        call('serviceRecordPlayStop');
    }
}

function doSessionMessageSend(messagetype, _sid, _ipocids, _content, _content_res, _allowOffline) {
    //过滤危险字符串---><script>alert("123");</script>
    try {
        _content = _content.replace(/</g, "&lt;");
        _content = _content.replace(/>/g, "&gt;");
    }
    catch (e) {
        //
    }
    var sid = base64encode(utf16to8(_sid + ""));
    var ipocids = base64encode(utf16to8(_ipocids + ""));
    var contenttext = base64encode(utf16to8(_content + ""));
    var contentres = base64encode(utf16to8(_content_res + ""));
    //alert("sid---"+sid+"ipocids----"+ipocids+"contenttext-----"+contenttext+"contentres----"+contentres);
    {
        //document.getElementById("AirEngineActivex").ServiceMessageSend(messagetype, sid, ipocids, contenttext, contentres, _allowOffline);
        // serviceMessageSend(short messagetype,  LPCTSTR sid,  LPCTSTR ipocids,  LPCTSTR contenttext,  LPCTSTR contentres,  short allowOfflineSend)
        call('serviceMessageSend', { 'messagetype': messagetype, 'sid': sid, 'ipocids': ipocids, 'contenttext': contenttext, 'contentres': contentres, 'allowOfflineSend': _allowOffline });
    }
}

function doSessionPicMessageSend(messagetype, _sid, _ipocids, _content, _allowOffline) {
    //过滤危险字符串---><script>alert("123");</script>
    //alert("Here"+"sid---"+_sid+"ipocids----"+_ipocids+"contenttext-----"+_content);
    try {
        _content = _content.replace(/</g, "&lt;");
        _content = _content.replace(/>/g, "&gt;");
    } catch (e) {
    }
    var sid = base64encode(utf16to8(_sid + ""));
    var ipocids = base64encode(utf16to8(_ipocids + ""));
    var contenttext = base64encode(utf16to8(_content + ""));
    //alert("sid---"+sid+"ipocids----"+ipocids+"contenttext-----"+contenttext);
    {
        //document.getElementById("AirEngineActivex").ServicePicMessageSend(messagetype, sid, ipocids, contenttext, _allowOffline);
        // servicePicMessageSend(short messagetype,  LPCTSTR sid,  LPCTSTR ipocids,  LPCTSTR picpath,  short allowOfflineSend)
        call('servicePicMessageSend', { 'messagetype': messagetype, 'sid': sid, 'ipocids': ipocids, 'picpath': contenttext, 'allowOfflineSend': _allowOffline });

    }
}

//本地抓拍
function doServiceResourceReportCaptureLocalBuffer(_ownerId, resType, _resTypeExt, _picData, _content,_picMark,_taskId) {
    var ownerId = base64encode(utf16to8(_ownerId + ""));
    var resTypeExt = base64encode(utf16to8(_resTypeExt + ""));
	var picData = _picData;
    var contenttext = base64encode(utf16to8(_content + ""));
	var picMark = base64encode(utf16to8(_picMark + ""));
	var taskId = base64encode(utf16to8(_taskId + ""));
    //alert("sid---"+sid+"ipocids----"+ipocids+"contenttext-----"+contenttext);
    {
        call('serviceResourceReportCaptureLocalBuffer', { 'ownerId': ownerId, 'resType':resType,'resTypeExt': resTypeExt, 'picData': picData, 'content': contenttext, 'picMark': picMark,'taskId':taskId });
    }
}

//本地抓拍
function doServiceResourceReportCaptureLocal(_ownerId, resType, _resTypeExt, _picPath, _content,_picMark,_taskId) {
    var ownerId = base64encode(utf16to8(_ownerId + ""));
    var resTypeExt = base64encode(utf16to8(_resTypeExt + ""));
	var picPath = base64encode(utf16to8(_picPath + ""));
    var contenttext = base64encode(utf16to8(_content + ""));
	var picMark = base64encode(utf16to8(_picMark + ""));
	var taskId = base64encode(utf16to8(_taskId + ""));
    //alert("sid---"+sid+"ipocids----"+ipocids+"contenttext-----"+contenttext);
    {
        //document.getElementById("AirEngineActivex").ServicePicMessageSend(messagetype, sid, ipocids, contenttext, _allowOffline);
        // servicePicMessageSend(short messagetype,  LPCTSTR sid,  LPCTSTR ipocids,  LPCTSTR picpath,  short allowOfflineSend)
        call('serviceResourceReportCaptureLocal', { 'ownerId': ownerId, 'resType':resType,'resTypeExt': resTypeExt, 'picPath': picPath, 'content': contenttext, 'picMark': picMark,'taskId':taskId });
    }
}

function doDeleteChatroom(chanelId) {
    {
        //document.getElementById("AirEngineActivex").ServiceChatroomDelete(base64encode(utf16to8(chanelId)));
        // serviceChatroomDelete(LPCTSTR roomId)
        call('serviceChatroomDelete', { 'roomId': base64encode(utf16to8(chanelId)) });
    }
}

function doUpdateGroupMemberPriority(roomId, ipocid, priority, talkduration) {
    {
        var enIpocId = base64encode(utf16to8(ipocid + ""));
        var enRoomId = base64encode(utf16to8(roomId));
        //document.getElementById("AirEngineActivex").ServiceChatroomModifyMember(enIpocId, enRoomId, priority, talkduration);//ServiceChannelMemberModify 改成了：ServiceChatroomModifyMember
        // serviceChatroomModifyMember(LPCTSTR ipocid,  LPCTSTR roomid,  short memberType,  short memberTalkDuration)
        call('serviceChatroomModifyMember', { 'ipocid': enIpocId, 'roomid': enRoomId, 'memberType': priority, 'memberTalkDuration': talkduration });
    }
}

function doStartRecord() {
    call('serviceRecordStart');
}

function doStopRecord(isCancel) {
    call('serviceRecordStop', { 'isCancel': isCancel });
}

function mouseDownStartRecord() {
    mouseDownOrUpRecord(3);
    //document.getElementById("AirEngineActivex").ServiceRecordStart();
    call('serviceRecordStart');
}

function mouseUpStopRecord() {
    var isCancel = 0;
    mouseDownOrUpRecord(3);
    //document.getElementById("AirEngineActivex").ServiceRecordStop(isCancel);
    // serviceRecordStop(short isCancel)
    call('serviceRecordStop', { 'isCancel': isCancel });
}

function onButtonRecord(rid) {
    var inputDownloadURL = $("#inputDownloadURL")['val']();
    if (inputDownloadURL == "" + str_select_store_path + "") {
        Toast("" + str_select_save_path + "", 2);
    }
    else {
        //			var isEncryption = $("#isEncryption").attr("checked")=="checked"?0:1;
        //showToast(str_handle_waiting);
        //			alert("rid:"+rid+"str_select_save_path:"+str_select_save_path);
        //document.getElementById("AirEngineActivex").ServiceRecDataLoad(base64encode(utf16to8(rid + "")), base64encode(utf16to8(inputDownloadURL + "\\")), 0);
        // serviceRecDataLoad(LPCTSTR resid,  LPCTSTR path,  short isEncrypt)
        call('serviceRecDataLoad', { 'resid': base64encode(utf16to8(rid + "")), 'path': base64encode(utf16to8(inputDownloadURL + "\\")), 'isEncrypt': 0 });
    }
}

function isServiceLock(sessionid, isLock) {
    //document.getElementById("AirEngineActivex").ServiceSessionLock(sessionid, isLock);
    // serviceSessionLock(short sessionid,  short isLock)
    call('serviceSessionLock', { 'sessionid': sessionid, 'isLock': isLock });
}

function doSecretImageDownload(code, url, secret, secretKey, cb) {
    var _code_ = base64encode(utf16to8(code));
    var _url_ = base64encode(utf16to8(url));
    var _skey_ = base64encode(utf16to8(secretKey));
    //var path = document.getElementById("AirEngineActivex").ServiceSecretImageDownloadSync(_code_, _url_, secret, _skey_);
    // serviceSecretImageDownloadSync(LPCTSTR code,  LPCTSTR url,  short secret,  LPCTSTR secret_key)
    call('serviceSecretImageDownloadSync', { 'code': _code_, 'url': _url_, 'secret': secret, 'secret_key': _skey_ }, function (resp) {
        if (resp.iserr()) {
            log('serviceSecretImageDownloadSync: Failed:', resp['error']);
        }
        if (cb) { cb(utf8to16(base64decode(resp['result']))); }
    });
    //return utf8to16(base64decode(path));
}

function doSecretImageDownloadAsync(code, url, secret, secretKey) {
    var _code_ = base64encode(utf16to8(code));
    var _url_ = base64encode(utf16to8(url));
    var _skey_ = base64encode(utf16to8(secretKey));
    try {
        //document.getElementById("AirEngineActivex").ServiceSecretImageDownload(_code_, _url_, secret, _skey_);
        // serviceSecretImageDownload(LPCTSTR code,  LPCTSTR url,  short secret,  LPCTSTR secret_key)
        call('serviceSecretImageDownload', { 'code': _code_, 'url': _url_, 'secret': secret, 'secret_key': _skey_ });
    }
    catch (e) {
    }
}

// 2. Event Handler and Stubs

regEvent('eventLogin', function (req, params) {
    // int, int
    console.log('測試是否调用函数')
    onLogin(params['result'], params['secret']);
});

regEvent('eventLogout', function (req, params) {
    // bool
    onLogout(params['ok']);
});

regEvent('eventChannelSessionAlertClose', function (req, params) {
    // int result
    eventChannelSessionAlertClose(params['result']);
});

regEvent('eventChannelSessionAlertSent', function (req, params) {
    // int result, const char* sid
    eventChannelSessionAlertSent(params['result'], params['sid']);
});

regEvent('eventChannelSessionAlertStart', function (req, params) {
    // const char* channelId, const char* callerId, const char* callerName
    eventChannelSessionAlertStart(params['channelId'], params['callerId'], params['callerName']);
});

regEvent('eventChatroomCreate', function (req, params) {
    // int isOk, const char* roomId
    eventChatroomCreate(params['isOk'], params['roomId']);
});

regEvent('eventChatroomDelete', function (req, params) {
    // int isOk
    eventChatroomDelete(params['isOk']);
});

regEvent('eventChatroomEnter', function (req, params) {
    // int replyOk, int sessionIndex
    eventChatroomEnter(params['replyOk'], params['sessionIndex']);
});

regEvent('eventChatroomExit', function (req, params) {
    // int sessionIndex
    eventChatroomExit(params['sessionIndex']);
});

regEvent('eventChatroomMemberAdd', function (req, params) {
    // int isOk
    eventChatroomAddMember(params['isOk']);
});

regEvent('eventChatroomMemberDelete', function (req, params) {
    // int isOK
    eventChatroomMemberDelete(params['isOK']);
});

regEvent('eventChatroomMemberModify', function (req, params) {
    // int isOK
    eventChannelMemberModify(params['isOK']);
});

regEvent('eventChatroomPresence', function (req, params) {
    // const char* json
    eventSessionChannelPresence(params['json']);
});

regEvent('eventChatroomPresenceAdd', function (req, params) {
    // const char* json
    eventSessionChannelUserEnter(params['json']);
});

regEvent('eventChatroomPresenceDel', function (req, params) {
    // const char* json
    eventSessionChannelUserExit(params['json']);
});

regEvent('eventChatroomQueue', function (req, params) {
    // const char* jsonStr
    eventChatroomQueue(params['jsonStr']);
});

regEvent('eventChatroomUpdate', function (req, params) {
    // int isOk
    eventChatroomUpdate(params['isOk']);
});

regEvent('eventDialogMemberGet', function (req, params) {
    // const char* json
    eventSessionDialogMemberGet(params['json']);
});

regEvent('eventDialogMemberUpdate', function (req, params) {
    // const char* json
    eventSessionDialogMemberChange(params['json']);
});

regEvent('eventDialogMemberUpdateNotify', function (req, params) {
    // const char* json
    eventSessionDialogMemberNotify(params['json']);
});

regEvent('eventDialogPresence', function (req, params) {
    // const char* json
    eventSessionDialogPresence(params['json']);
});

regEvent('eventHeartbeat', function (req, params) {
    // int result
    eventHeartBeat(params['result']);
});

regEvent('eventInqueueConfirm', function (req, params) {
    // int sessionIndex
    eventInqueueConfirm(params['sessionIndex']);
});

regEvent('eventMediaInqueueConfirm', function (req, params) {
    // int sessionIndex
    eventMediaInqueueConfirm(params['sessionIndex']);
});

regEvent('eventMediaOutqueueConfirm', function (req, params) {
    // int sessionIndex
    eventMediaOutqueueConfirm(params['sessionIndex']);
});

regEvent('eventMediaStateIdle', function (req, params) {
    // int sessionIndex, int reason
    eventMediaStateIdle(params['sessionIndex'], params['reason']);
});

regEvent('eventMediaStateListen', function (req, params) {
    // int sessionIndex, const char* speaker
    eventMediaStateListern(params['sessionIndex'], params['speaker']);
});

regEvent('eventMediaStateTalk', function (req, params) {
    // int sessionIndex
    eventMediaStateTalk(params['sessionIndex']);
});

regEvent('eventMediaVoice', function (req, params) {
    // int sessionIndex, const char* speaker
    eventMediaVoice(params['sessionIndex'], params['speaker']);
});

regEvent('eventMessageRecv', function (req, params) {
    // int result, const char* json
    eventMessageRecv(params['result'], params['json']);
});

regEvent('eventMessageSent', function (req, params) {
    // int result, const char* json
    eventMessageSent(params['result'], params['json']);
});

regEvent('eventOutQueueConfirm', function (req, params) {
    // int sessionIndex
    eventOutQueueConfirm(params['sessionIndex']);
});

regEvent('eventPushBroadcast', function (req, params) {
    // const char* json
    eventPushBroadcast(params['json']);
});

regEvent('eventPushContent', function (req, params) {
    // const char* json
    eventPushContent(params['json']);
});

regEvent('eventPushLocation', function (req, params) {
    // const char* json
    eventUserLocaltionChanged(params['json']);
});

regEvent('eventPushReport', function (req, params) {
    // const char* json
    eventPushReport(params['json']);
});

regEvent('eventRecDataLoaded', function (req, params) {
    // int ret, const char* base64Resid
    eventRecDataLoaded(params['ret'], params['base64Resid']);
});

regEvent('eventRecRecordStart', function (req, params) {
    // int wParam
    OnJsEventRecRecordStart(params['wParam']);
});

regEvent('eventRecRecordStop', function (req, params) {
    // int wParam, const char* base64Resid
    OnJsEventRecRecordStop(params['wParam'], params['base64Resid']);
});

regEvent('eventRecordPlayStart', function (req, params) {
    // const char* code, const char* resid
    eventRecordPlayStart(params['code'], params['resid']);
});

regEvent('eventRecordPlayStop', function (req, params) {
    // const char* code, const char* resid
    eventRecordPlayStop(params['code'], params['resid']);
});

regEvent('eventSecretImageDownload', function (req, params) {
    // int isOK, const char* info
    eventSecretImageDownload(params['isOK'], params['info']);
});

regEvent('eventSessionEstablish', function (req, params) {
    // int sessionIndex, const char* sid
    eventSessionEstablish(params['sessionIndex'], params['sid']);
});

regEvent('eventSessionIncomingAlert', function (req, params) {
    // int sessionIndex, const char* user, const char* sid
    eventSessionIncomingAlert(params['sessionIndex'], params['user'], params['sid']);
});

regEvent('eventSessionOutgoingRinging', function (req, params) {
    // int sessionIndex, const char* sid
    eventSessionOutgoingRinging(params['sessionIndex'], params['sid']);
});

regEvent('eventSessionRelease', function (req, params) {
    // int sessionIndex, int releaseReason
    eventSessionRelease(params['sessionIndex'], params['releaseReason']);
});

regEvent('eventUserPresence', function (req, params) {
    // const char* json
    eventContactPresenceAir(params['json']);
});

regEvent('eventVideoShare', function (req, params) {
    // const char* json
    eventVideoShare(params['json']);
});

regEvent('eventVideoCaptureFinish', function (req, params) {
    // bool
    onEventVideoCaptureFinish(params['ok']);
});

regEvent('eventRestart', function (req, params) {
    var fn = window['eventSvcRestart'];
    if(fn)
        fn();
});

//////////////////////////////////
//       event handlers
//////////////////////////////////

function eventChatroomCreate(isOk, roomId) {
    try {
        onChatroomCreate(isOk, roomId);
    }
    catch (e) {
        setWebError("[eventChatroomCreate ] : isOk= " + isOk + " roomId =" + roomId + "  E:" + e);
    }
}

function eventChatroomMemberDelete(isOk) {
    try {
        onChatroomMemberDelete(isOk);
    }
    catch (e) {
        setWebError("[onChatroomMemberDelete ] : isOk= " + isOk + "  E:" + e);
    }
}

function eventChatroomAddMember(isOk) {
    try {
        onChatroomAddMember(isOk);
    }
    catch (e) {
        setWebError("[eventChatroomAddMember ] : isOk= " + isOk + "  E:" + e);
    }
}

function eventChatroomQueue(jsonStr) {
    try {
        var parseJson = utf8to16(base64decode(jsonStr));
        onChatroomQueue(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventChatroomQueue ] : parseJson= " + parseJson + "  E:" + e);
    }
}

function eventOutQueueConfirm(sessionIndex) {
    //onOutQueueConfirm(sessionIndex);
}

function eventInqueueConfirm(sessionIndex) {
    //onInqueueConfirm(sessionIndex);
}

function eventChatroomUpdate(isOk) {
    try {
        onChatroomUpdate(isOk);
    }
    catch (e) {
        setWebError("[onChatroomMemberDelete ] : isOk= " + isOk + "  E:" + e);
    }
}

var groupMemberTemp;

function eventGroupListGetEvent(isOk, groups) {
    if (isOk) {
        var json = new Array();
        var objs = eval(utf8to16(base64decode(groups)));
        for (var i = 0 ; i < objs.length; i++) {
            var item = new Object();
            item['id'] = objs[i]['SipUri'];
            item['name'] = objs[i]['DisplayName'];
            item['Priority'] = objs[i]['Priority'];
            item['Type'] = objs[i]['SipUriType'];
            if (objs[i]['OwnerShip'] == 1) {
                item['creater'] = gUser['ipocid'];
            }
            else {
                item['creater'] = objs[i]['OwnerUri'];
            }
            item['children'] = new Array();
            groupMemberTemp = item['children'];
            //document.getElementById("PocWebLibActivex").ServiceGroupMemberGet(base64encode(utf16to8(objs[i]['SipUri'])));
            json.push(item);
        }
        loadChannelList(json);
    }
}

function eventGroupMembersGetEvent(members, groupSipUri) {
    try {
        var objs = eval(utf8to16(base64decode(members)));
        for (var i = 0 ; i < objs.length; i++) {
            var item = new Object();
            item['id'] = objs[i]['PhoneNumber'];
            item['name'] = objs[i]['DisplayName'];
            item['Priority'] = objs[i]['Priority'];
            groupMemberTemp.push(item);
        }
    }
    catch (e) {
        setWebError("[eventGroupMembersGetEvent ] : members= " + objs + "groupSipUri=" + groupSipUri + "  E:" + e);
    }
}

function eventSessionIncomingAlert(sessionIndex, user, sid) {
    try {
        var sessionId = utf8to16(base64decode(sid));
        var userName = utf8to16(base64decode(user));
        onSessionIncomingAlert(sessionIndex, userName, sessionId);
    }
    catch (e) {
        setWebError("[eventSessionIncomingAlert ] : sessionIndex= " + sessionIndex + "user=" + user + "sid=" + sid + "  E:" + e);
    }
}

function eventSessionOutgoingRinging(sessionIndex, sid) {
    try {
        //		alert(3);
        var sessionId = utf8to16(base64decode(sid));
        onSessionOutgoingRinging(sessionIndex, sessionId);
    }
    catch (e) {
        setWebError("[eventSessionOutgoingRinging ] : sessionIndex= " + sessionIndex + "sid=" + sid + "  E:" + e);
    }
}

//接通回调
function eventSessionEstablish(sessionindex, sid) {
    try {
        //		alert(4);
        var sessionId = utf8to16(base64decode(sid));
        onSessionEstablish(sessionindex, sessionId);
    }
    catch (e) {
//      setWebError("[eventSessionOutgoingRinging ] : sessionIndex= " + sessionIndex + "sid=" + sid + "  E:" + e);
    }

}

/**
 * 频道接通回调通知
 * @param replyOk 0成功
 * @param sessionIndex
 */
function eventChatroomEnter(replyOk, sessionIndex) {
    try {
        //		alert("6:"+sessionIndex+"_"+replyOk);
        onChatRoomEnter(replyOk, sessionIndex);
    }
    catch (e) {
        setWebError("[eventChatroomEnter ] : sessionIndex= " + sessionIndex + " replyOk=" + replyOk + "  E:" + e);
    }
}

/**
 * 频道退出 回调。
 * @param sessionIndex
 */
function eventChatroomExit(sessionIndex) {
    try {
        onChatRoomExit(sessionIndex);
    }
    catch (e) {
        setWebError("[eventChatroomExit ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function eventChatroomForbiden(sessionIndex) {
    try {
        //		alert(2);
        onChatroomForbiden();
    }
    catch (e) {
        setWebError("[eventChatroomForbiden ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function eventHeartBeat(result) {
    try {
        onHeartbeat(result);
    }
    catch (e) {
        setWebError("[eventHeartBeat ] : result= " + result + "  E:" + e);
    }
}

function eventSessionRelease(sessionIndex, releaseReason) {
    try {
        //		alert(9);
        onSessionRelease(sessionIndex, releaseReason);
    }
    catch (e) {
        setWebError("[eventSessionRelease ] : sessionIndex= " + sessionIndex + "releaseReason" + releaseReason + "  E:" + e);
    }
}

function sessionTalkMyStatus(sid, isTalking) {
    try {
        window.external.SessionTalkMyStatus(sid, isTalking);
    }
    catch (e) {
        //			setWebError("[onLoginPC ] : sid="+sid+"isTalking="+isTalking+"  E:"+e);
    }
}

function eventMediaStateIdleAirpoc(sessionIndex, reason) {
    try {
        var session = getCurrentCallSessionArray(sessionIndex);
        if (session != null) {
            session['mediaState'] = MEDIA_STATE_IDLE;
            session['mediaButtonState'] = MEDIA_BUTTON_STATE_IDLE;
            session['speaker'] = "&nbsp;";
            session['currentSpeaker'] = null;
        }
        else {
            onNoticeSession();
            return;
        }
        sessionTalkMyStatus(session['sessionId'], 0);
        switch (reason) {
            case -1:
            case 0:
                $("#current-speaker" + sessionIndex)['html']('');
                onMediaStateIdle(sessionIndex);
                break;
            case 1:
                Toast("" + str_voice_interrupted_high + "", 2);
                break;
            case 2:
                Toast("" + str_apply_timeout + "", 2);
                onMediaStateIdle(sessionIndex);
                break;
            case 3:
                Toast("" + str_time_speak + "", 2);
                onMediaStateIdle(sessionIndex);
                break;
            case 4:
                Toast("" + str_voice_network_condition + "", 2);
                onMediaStateTalkDeny(sessionIndex);
                break;
            case 5:
                Toast("" + str_listen_not_speak + "", 2);
                onMediaStateTalkDeny(sessionIndex);
                break;
            case 6:
                Toast("" + str_voice_fully + "", 2);
                onMediaStateTalkDeny(sessionIndex);
                break;
        }
    }
    catch (e) {
        setWebError("[eventMediaStateIdleAirpoc ] : sessionIndex= " + sessionIndex + "reason" + reason + "  E:" + e);
    }
}

function eventMediaStateIdle(sessionIndex, reason) {
    try {
        //		alert(10);
        onMediaStateIdle(sessionIndex, reason);
    }
    catch (e) {
        setWebError("[eventMediaStateIdle ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

//返回谁在说话
function eventMediaStateTalk(sessionIndex) {
    try {
        //		alert(000);
        onMediaStateTalk(sessionIndex);
    }
    catch (e) {
        setWebError("[eventMediaStateTalk ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function eventMediaStateTalkReset(sessionIndex) {
    try {
        //			alert(11);
        onMediaStateTalkReset(sessionIndex);
    }
    catch (e) {
        setWebError("[eventMediaStateTalkReset ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function eventMediaStateTalkDeny(sessionIndex) {
    try {
        //		alert(12);
        onMediaStateTalkDeny(sessionIndex);
    }
    catch (e) {
        setWebError("[eventMediaStateTalkDeny ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function eventMediaStateListern(sessionIndex, speaker) {
    try {
        speaker = utf8to16(base64decode(speaker));
        onMediaStateListern(sessionIndex, speaker);
    }
    catch (e) {
        setWebError("[eventMediaStateListern ] : sessionIndex= " + sessionIndex + "speaker=" + speaker + "  E:" + e);
    }
}

function eventMediaStateListernVioce(sessionIndex) {
//    try {
//        //返回有语音的会话的index
//    }
//    catch (e) {
//        setWebError("[eventMediaStateListern ] : sessionIndex = " + sessionIndex + "  E:" + e);
//    }
}

function eventRecordPlayStart(code, resid) {
	try	{
	    code = utf8to16(base64decode(code));
	    var resId = utf8to16(base64decode(resid));
	    onRecordPlayStart(code, resId);
	}
    catch (e) {
        setWebError("[eventRecordPlayStart ] : code= " + code + "resid= " + resid + "  E:" + e);
    }
}

function eventRecordPlayStop(code, resid) {
    try {
        code = utf8to16(base64decode(code));
        var resId = utf8to16(base64decode(resid));
        onRecordPlayStop(code, resId);
        //onMonitorRecordPlayStop(obj[1]);
    }
    catch (e) {
        setWebError("[eventRecordPlayStop ] : code= " + code + "resid= " + resid + "  E:" + e);
    }
}

function eventContactPresenceAir(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onContactPresence(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventContactPresenceAir ] : parseJson= " + parseJson + "  E:" + e);
    }
}

function eventContactPresenceCb(contacts) {
    try {
        var memberList = new Array();
        var objs = eval(utf8to16(base64decode(contacts)));
        for (var i = 0 ; i < objs.length; i++) {
            var item = new Object();
            item['ipocid'] = objs[i]['PhoneNumber'];
            item['name'] = objs[i]['DisplayName'];
            if (objs[i]['UserState'] == 0) {
                item['presence'] = CONTACT_STATE_ONLINE;
            }
            else {
                item['presence'] = CONTACT_STATE_OFF_LINE;
            }
            memberList.push(item);
        }
        onContactPresence(memberList);
    }
    catch (e) {
        setWebError("[eventContactPresenceCb ] : contacts= " + objs + "  E:" + e);
    }
}

function eventPushReport(json) {
    try {
        var jsonp = utf8to16(base64decode(json));
        onUserMessage(eval("(" + jsonp + ")"));
    }
    catch (e) {
        setWebError("[eventPushReport ] : json= " + jsonp + "  E:" + e);
    }
}

function eventUserLocaltionChanged(json) {
    try {
        var jsonp = utf8to16(base64decode(json));
        onUserLocaltionChanged(eval("(" + jsonp + ")"));

    }
    catch (e) {
        setWebError("[eventUserLocaltionChanged ] : json= " + jsonp + "  E:" + e);
    }
}

function eventMessageRecv(result, json) {
    try {
        if (json == null || json == "") return;
        var parseJson = utf8to16(base64decode(json));
        if (parseJson != null) {

            var obj = eval("(" + parseJson + ")");
            onMessageRecv(result, obj);
        }
    }
    catch (e) {
        setWebError("[eventMessageRecv ] : json= " + json + "  E:" + e);
    }
}

function eventMessageSent(result, json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        var obj = eval("(" + parseJson + ")");
        if (obj['state'] == 4)
            onMessageSent(0, obj);
        //else (obj['state'] == 2 || obj['state'] == 5)
        //	onMessageSent(-1,obj);
        //sleep(500);
    }
    catch (e) {
        setWebError("[eventMessageSent ] : result= " + result + "json=" + parseJson + "  E:" + e);
    }
}


function eventPushContent(json) {
    try {
        var jsons = utf8to16(base64decode(json));
        jsons = eval("(" + jsons + ")");
        switch (jsons.t) {
            case 210://fence
                pushWarningFence(jsons);
                break;
            case 215: //task

                break;
            case 216: //远程抓拍
                videoCaptureGet(jsons);
                break;
            case 217://
                break;
            case 218://本地抓拍
                videoLocalCaptureGet(jsons);
                break;
            case 129://视频存储
            	videoStorePush(jsons);
            	break;
            	
            case 300://给企业下所有有效用户推送指定用户名称的变更
            	try {
			       	onPushUserNameChanged(jsons);
			    }
			    catch (e) {
			        setWebError("[onPushUserNameChanged] :json=" + jsons + "  E:" + e);
			    }
            	break;
            case 301://给企业下所有有效调度员推送指定组织名称的变更
            	try {
			       	onPushOrgNameChanged(jsons);
			    }
			    catch (e) {
			        setWebError("[onPushOrgNameChanged] :json=" + jsons + "  E:" + e);
			    }
            	break;
            case 302://给企业下所有有效调度员推送指定调度员身份的变更
            	try {
			       	onPushUserRoleChanged(jsons);
			    }
			    catch (e) {
			        setWebError("[onPushUserRoleChanged] :json=" + jsons + "  E:" + e);
			    }
            	break;
            case 303://给企业下所有有效调度员推送组织的变更，包括组织节点增删、组织下成员移动、组织排序
            	try {
			       	onPushOrgStructChanged(jsons);
			    }
			    catch (e) {
			        setWebError("[onPushOrgStructChanged] :json=" + jsons + "  E:" + e);
			    }
            	break;
        }
    }
    catch (e) {
        setWebError("[eventPushContent ] :json=" + jsons + "  E:" + e);
    }
}

function videoCaptureGet(json) {
    try {
       	onVideoCaptureGet(json);
    }
    catch (e) {
        setWebError("[videoCaptureGet ] :json=" + json + "  E:" + e);
    }
}

function videoLocalCaptureGet(json) {
    try {
       	onVideoLocalCaptureGet(json);
    }
    catch (e) {
        setWebError("[videoLocalCaptureGet ] :json=" + json + "  E:" + e);
    }
}

function videoStorePush(json)
{
    try {
       	onVideoStorePush(json);
    }
    catch (e) {
        setWebError("[videoStorePush ] :json=" + json + "  E:" + e);
    }
}

function eventPushBroadcast(json) {
    try {
        //			var jsons = utf8to16(base64decode(json));
        newBroadcast();
        onDialogClose();
    }
    catch (e) {
        //			报错json有问题。{ "detail":	"222", "url": "http://112.33.0.168:2880/airtalkeenotice/jsp/textAnnouncementAction_commentTextUI.action?createId=2016022212585615810824958
        setWebError("[eventPushBroadcast ] :json=" + jsons + "  E:" + e);
    }
}

function eventSessionDialogPresence(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        //		alert("eventSessionDialogPresence---"+parseJson);
        onSessionDialogPresence(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionDialogPresence ] :json=" + parseJson + "  E:" + e);
    }
}

function eventPresenceSessionCb(sessionIndex, members) {
    try {
        var memberList = new Array();
        var objs = eval(utf8to16(base64decode(members)));
        for (var i = 0 ; i < objs.length; i++) {
            var item = new Object();
            item['ipocid'] = objs[i]['PhoneNumber'];
            item['name'] = objs[i]['PhoneNumber'];
            if (objs[i]['UserState'] == 0) {
                item['userstate'] = MEDIA_STATE_ON_LINE;
            }
            else {
                item['userstate'] = MEDIA_STATE_OFF_LINE;
            }
            memberList.push(item);
        }
        eventSessionDialogPresenceCb(sessionIndex, memberList);
    }
    catch (e) {
        setWebError("[eventPresenceSessionCb ] :sessionIndex=" + sessionIndex + "members=" + members + "  E:" + e);
    }
}

function eventSessionDialogMemberGet(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionDialogMemberChange(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionDialogMemberGet ] :json=" + parseJson + "  E:" + e);
    }
}

function eventSessionDialogPresenceCb(sessionIndex, json) {
    try {
        var mems = new Object();
        mems['sessionmember'] = json;
        mems['sessionindex'] = sessionIndex;
        onSessionDialogPresence(mems);
    }
    catch (e) {
        setWebError("[eventSessionDialogPresenceCb ] :sessionIndex=" + sessionIndex + "json=" + json + "  E:" + e);
    }
}

function eventSessionDialogMemberChange(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionDialogMemberChange(json);
    }
    catch (e) {
        setWebError("[eventSessionDialogMemberChange ] :json=" + parseJson + "  E:" + e);
    }
}

function eventSessionDialogMemberNotify(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionDialogMemberChange(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionDialogMemberNotify ] :json=" + base64decode(json) + "  E:" + e);
    }
}

function eventSessionChannelPresence(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionChannelPresence(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionChannelPresence ] :json=" + parseJson + "  E:" + e);
    }
}

function eventSessionChannelUserEnter(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionChannelUserEnter(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionChannelUserEnter ] :json=" + parseJson + "  E:" + e);
    }
}

function eventSessionChannelUserExit(json) {
    try {
        var parseJson = utf8to16(base64decode(json));
        onSessionChannelUserExit(eval("(" + parseJson + ")"));
    }
    catch (e) {
        setWebError("[eventSessionChannelUserExit ] :json=" + parseJson + "  E:" + e);
    }
}

function eventChatroomDelete(isOk) {
    try {
        onChatroomDelete(isOk, null);
    }
    catch (e) {
        setWebError("[eventChatroomDelete ] :isOk=" + isOk + "  E:" + e);
    }
}

function eventGroupDeleteEvent(isOk, groups) {
    try {
        onChatroomDelete(isOk, groups);
    }
    catch (e) {
        setWebError("[eventGroupDeleteEvent ] :isOk=" + isOk + "groups=" + groups + "  E:" + e);
    }
}

function eventGroupMemberPriorityUpdateEvent(isOk) {
    try {
        var flag = -1;
        if (isOk == 1) {
            flag = 1;
        }
        onMemberPrioritySave(flag);
    }
    catch (e) {
        setWebError("[eventGroupMemberPriorityUpdateEvent ] :isOk=" + isOk + "  E:" + e);
    }
}

function eventChannelMemberModify(isOk) {
    try {
        onMemberPrioritySave(isOk);
    }
    catch (e) {
        setWebError("[eventChannelMemberModify ] :isOk=" + isOk + "  E:" + e);
    }
}

function OnJsEventRecRecordStart(wParam) {
    try {
        eventRecRecordStart(wParam);
    }
    catch (e) {
        setWebError("[OnJsEventRecRecordStart ] :wParam=" + wParam + "  E:" + e);
    }
}

function OnJsEventRecRecordStop(wParam, base64Resid) {
    try {
    	var resid = utf8to16(base64decode(base64Resid));
        eventRecRecordStop(wParam, resid);
    }
    catch (e) {
        setWebError("[OnJsEventRecRecordStop ] :wParam=" + wParam + "  E:" + e);
    }
}

function eventRecDataLoaded(ret, base64Resid) {
    recordDownloadCheck(ret);
}

function eventMediaVoice(sessionIndex, speaker) {
    try {
        if (currentTabSession == null || currentTabSession == undefined) {
            $("#current-speaker" + sessionIndex).html('<div style="width:105px;white-space: nowrap; overflow:hidden; text-overflow:ellipsis;">' + getUserDisplayName(speaker) + '</div><div style="margin-top:-27px;margin-left:-134px;"><img src="images/chat_dialog.png"/></div><div style="margin-left:105px;margin-top:-32px;width:50px;">' + str_speaking + '</div>');
        }
    }
    catch (e) {
        setWebError("[eventMediaVoice ] :sessionIndex=" + sessionIndex + "speaker=" + speaker + "  E:" + e);
    }
}

function eventVideoShare(json) {
    try {
        var jsons = utf8to16(base64decode(json));
        onVideoShare(eval("(" + jsons + ")"));
    }
    catch (e) {
        setWebError("[eventVideoShare ] :json=" + jsons + "  E:" + e);
    }
}

function onEventVideoCaptureFinish(ok)
{
    try {
        onVideoReportCaptureLocalFinish(ok);
    }
    catch (e) {
        setWebError("[onEventVideoCaptureFinish ] : ok= " + ok + "  E:" + e);
    }
}

function onLoginPC() {
    try {
        window.external.SetUser(gUser['ipocid'], gUser['md5pwd'], gUser['secret']);
    }
    catch (e) {
        setWebError("[onLoginPC ] :"+"  E:"+e);
    }
}

function eventSecretImageDownload(isOK, info) {
    try {
        var json = utf8to16(base64decode(info));
        json = eval("(" + json + ")");
        setResPath(json['code'], json['file_path']);
        document.getElementById(json['code']).src = json['file_path'];
    }
    catch (e) {
        setWebError("[eventSecretImageDownload ] :" + "  E:" + e);
    }
}

function incomingAlert(sessionIndex, displayName, callertype) {
    try {
        onSessionIncomingAlert(sessionIndex, displayName, sessionIndex);
    }
    catch (e) {
        setWebError("[incomingAlert ] : sessionIndex= " + sessionIndex + "displayName=" + displayName + "callertype=" + callertype + "  E:" + e);
    }
}

function outgoingEstablish(sessionIndex) {
    try {
        //		alert(5);
        onSessionEstablish(sessionIndex, sessionIndex);
    }
    catch (e) {
        setWebError("[outgoingEstablish ] : sessionIndex= " + sessionIndex + "  E:" + e);
    }
}

function SessionTalkAction(sid, toTalk) {
    try {
        var i = getCurrentCallSessionArrayId(sid);
        if (i != null) {
            onTagList(i);
            doVoicePress(CurrentCallSessionArray[i]);
            return 0;
        }
        else {
            return -2;
        }
    }
    catch (e) {
        return -1;
    }
}

function setWebError(e) {
    //alert("setWebError:" + e)
    console.log("setWebError:" + e);
}