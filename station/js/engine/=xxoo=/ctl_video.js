var UI_MSG_CLS_NORMAL = 0;
var UI_MSG_CLS_CHANNEL = 1;

var videoSessionLimit = 36;
var stallTmo = 10; // in seconds

/** @export */
var videoSessionList = new VideoSessionList(videoSessionLimit);

var playerType = detectPlayerType();
var rtmplayerType = 0;
var fullScreenEnabled = true;

/**
 * @export
 * required by customized videojs-swf to lift restrictions
 */
Date.sec = function(t) {
    return t + 3600*8;
}

/** @export */
function setRtmpPlayer(type) {
    rtmplayerType = type;
}

/** @export */
function enableFullScreen(enabled) {
    fullScreenEnabled = enabled;
}

/** @export */
function onVideoStalled(playerId, cat) { 
    var s = videoSessionList.findByPlayerId(playerId);
    if(s) {
        if(cat == 'stall'){   //黑屏
            console.log('黑屏');
            s.syncPlayer();
            window['onVideoStalledNotify'](s);
        } else { // 'lag'; make a pause/resume to catch up
            var player = s.player;
            player.pause();
            player.resume();
        }
    }
    log(cat, 'detected for', playerId);
}

/** @param {?number=} type */
function setPlayerType(type) {
    type = type == null ? detectPlayerType() : type;
    call('setPlayerType', {'type': type});
    playerType = type;

    if(playerType == PLAYER_RTMP) {
        var playIt = function(ssid) {
            if(!videoSessionList.existSsid(ssid))
                return;
            var s = videoSessionList.findBySsid(ssid);
            if(s && s.getPlayer()) {
                var player = s.getPlayer();
                if(player.play) {
                    player.play();
                    player.time = new Date();
                    log('play', ssid);
                    if(!player['getProperty']('paused'))
                        return;
                }
            }
            setTimeout(playIt, 50, ssid);
        };
        regEvent('eventAVResync', function (req, params) {
            // ipocid, stream, url
            //playIt(params['stream']);
            log('eventAVResync', params);
        });
    }
}

regRpcConnListener(function (connected) {
    if (connected) {
        // on connected
        videoSessionList.setEvtListeners(window['onNewVideoHandler'], window['onVideoStopHandler'], function(vinf){alert(vinf['ssid'] + ' too many videos')});
        setPlayerType();
    }
    else {
        // on disconnected
    }
});

/**
 * @constructor
 * @nocollapse
 */
function VideoSession(videoInf, playerType) {
    /** @nocollapse */
    this.videoInf = videoInf;
    videoInf['videoSession'] = this;
    this.time = new Date();
    this.playerType = playerType;
    this.paused = false;
}

/** @export */
VideoSession.prototype.getInf = function() {
    return this.videoInf;
}

/** @export */
VideoSession.prototype.getPlayer = function() {
    return this.player;
}

/** @export */
VideoSession.prototype.startTime = function() {
    return this.time;
}

// player is a HTML element. E.g. a HTMLVideoElement object
/** @param {?boolean=} muted */
VideoSession.prototype.bindPlayer = function(player, muted) {
    /** @nocollapse */
    this.player = player;
    player['videoSession'] = this;
    player.src = this.videoInf['url'];
    player.autoplay = true;
    player.id = 'av_' + this.videoInf['ssid'];
    this.mute(muted);

    if(this.playerType == PLAYER_RTSP) {
        setTimeout(function() {
            try {
                player['VideoPlayUrl'](player.src);
                player['Mute'](player['muted']);
            }
            catch(e) {
                alert('播放器加载失败。\n\n请将当前网站加入到“受信任的站点”中，并将“该区域的安全级别”设置为“低”，然后重启浏览器。');
            }
        });
    }
    else if(this.playerType == PLAYER_MSE) {
        this.av = new AV(player, '', getWSProto() + '://127.0.0.1:' + wsport + '/av/' + this.videoInf['ssid']);
        this.av.start();
    }
    else if(this.playerType == PLAYER_RTSP_VIA_WS) {
        this.av = window['Streamedian'].init(player, {socket: getWSProto() + '://127.0.0.1:' + wsport + '/rtsp'});
    }
    else if(this.playerType == PLAYER_RTMP) {
        if(rtmplayerType == 1) {
            this.mute();
        }
    }
}

/**
 * @export
 * @param {?boolean=} value
 */
VideoSession.prototype.mute = function(value) {
    var playerType = this.playerType;
    var player = this.player;
    player['muted'] = value == null ? true : value;
    if(player['muting'])
        return;
    player['muting'] = true;

    var muteIt = function (playerType, player, cnt) {
        var retry = !player.initialized;
        try {
            if(playerType == PLAYER_RTSP && player['GetMute'] != player['muted'])
                player['Mute'](player.muted);
            else if(playerType == PLAYER_RTMP && player['getProperty']('muted') != player['muted'])
                player['setProperty']('muted', player['muted']);
            //log(player.id, 'muted=', player['muted']);
        }
        catch(e) { retry = true; }
        if(retry) {
            if(cnt && --cnt) {
                setTimeout(function() {
                    muteIt(playerType, player, cnt);
                }, 20);
                return;
            }
        }
        player['muting'] = false;
    }
    muteIt(playerType, player, 500);
}

/**
 * @export
 * returns base64 encoded JPEG image
 */
VideoSession.prototype.snapshot = function() {
    var player = this.player;
    if(this.playerType == PLAYER_RTMP && player['snapshot'])
        return player['snapshot']();
    return null;
}

///**
// * @export
// * @param {?boolean=} value
// * may fail due to security restrictions
// */
//VideoSession.prototype.toggleFullScreen = function() {
//    var player = this.player;
//    if(this.playerType == PLAYER_RTMP && player['toggleFullScreen'])
//        player['toggleFullScreen']();
//}

/**
 * @export
 * @param {?boolean=} value
 * enable/disable double click to toggle fullscreen
 */
VideoSession.prototype.enableFullScreen = function(value) {
    if(!fullScreenEnabled)
        return;

    var playerType = this.playerType;
    var player = this.player;

    player.fsenabled = value == null ? true : value;
    if(player.fsenabling)
        return;
    player.fsenabling = true;

    var doIt = function (playerType, player, cnt) {
        var retry = false;
        if(playerType == PLAYER_RTMP) {
            if(player['setProperty'])
                player['setProperty']('enableDblClick', player.fsenabled);
            retry = player['getProperty'] == null || player['getProperty']('enableDblClick') != player.fsenabled;
        }
        player.fsenabling = retry && --cnt > 0;
        if(player.fsenabling) {
            setTimeout(function() { doIt(playerType, player, cnt); }, 20);
        }
    }
    doIt(playerType, player, 500);
}

/** @export */
VideoSession.prototype.isPaused = function() {
    return this.paused;
}

/** @export */
VideoSession.prototype.pause = function() {
    var player = this.player;
    if(this.paused)
        return;
    if(player.pause)
        player.pause();
    // else // do it in onShowVideoView()
    call('pauseVideo', {'ssid': this.videoInf['ssid']});
    this.paused = true;
}

/** @export */
VideoSession.prototype.resume = function() {
    var player = this.player;
    if(!this.paused)
        return;
    if(player.resume)
        player.resume();
    // else // do it in onShowVideoView()
    call('resumeVideo', {'ssid': this.videoInf['ssid']});
    this.paused = false;
}

/** @export */
VideoSession.prototype.rotate = function(rotation) {
    var player = this.player;
    if(player['rotate'])
        player['rotate'](rotation == null ? rotation : 90);
}

/** @export */
VideoSession.prototype.syncSrc = function() {
    call('syncVideo', {'ssid': this.videoInf['ssid']});
}

/** @export */
VideoSession.prototype.syncPlayer = function() {
    var player = this.player;
    if(this.playerType == PLAYER_RTMP && player['sync'])
        player['sync']();
}

VideoSession.prototype.stop = function() {
    try {
        if(this.player) {
            if(this.playerType == PLAYER_RTSP && this.player['VideoStop']) {
                this.player['VideoStop']();
            }
            else if(this.player.pause)
               this.player.pause();
            this.player.src = null;
        }
        if(this.av) {
            if(this.av.stop)
                this.av.stop();
            if(this.av.destroy) {
                setTimeout(function(av) {
                    try {
                        av.destroy();
                    }
                    catch(e) {
                        log(e);
                    }
                }, 1000, this.av);
            }
        }
        if(this.player['stop']) { //this.playerType == PLAYER_RTMP &&
            this.player['stop']();
        }
    }
    catch(e) {
        //log('VideoSession.stop: failed: ' + e);
    }
}

/** @constructor */
function VideoSessionList(limit) {
    this.limit = limit;
    this.list = [];
    this.pinnedSids = [];
    this.waiting = []; // list of videoInf to be accepted
    /** @nocollapse */
    this.watching = null;
}

/** @export */
VideoSessionList.prototype.getLimit = function() {
    return this.limit;
}

/** @export */
VideoSessionList.prototype.setLimit = function(limit) {
    this.limit = limit;
}

/** @export */
VideoSessionList.prototype.full = function() {
    return this.size() >= this.limit;
}

VideoSessionList.prototype.add = function(videoSession) {
    if(this.full())
        return false;
    this.list.unshift(videoSession);
    return true;
}

/** @export */
VideoSessionList.prototype.size = function() {
    return this.list.length;
}

// Remove the session from list and call its stop method.
// return its original index in list
/** @export */
VideoSessionList.prototype.hangup = function(videoSession) {
    if(!videoSession)
        return -1;
    var idx = this.list.indexOf(videoSession);
    if(idx != - 1)
        this.list.splice(idx, 1);
    videoSession.stop();

    // pick up a video if it is the only one
    //if(this.waitList().length == 1 && !this.full())
    //    this.pickup();
    return idx;
}

/** @export */
VideoSessionList.prototype.findByUrl = function(url) {
    for(var i = 0; i < this.size(); i++)
        if(this.list[i].videoInf['url'] == url)
            return this.list[i];
    return null;
}

/** @export */
//VideoSessionList.prototype.findByIpocId = function(ipocid) {
//    for(var i = 0; i < this.size(); i++)
//        if(this.list[i].videoInf['ipocid'] == ipocid)
//            return this.list[i];
//    return null;
//}

/** @export */
VideoSessionList.prototype.findBySsid = function(ssid) {
    for(var i = 0; i < this.size(); i++)
        if(this.list[i].videoInf['ssid'] == ssid)
            return this.list[i];
    return null;
}

/** @export */
VideoSessionList.prototype.findByPlayerId = function(playerId) {
    for(var i = 0; i < this.size(); i++)
        if(this.list[i].player.id == playerId)
            return this.list[i];
    return null;
}

/** @export */
//VideoSessionList.prototype.findByIpocIdInWait = function(ipocid) {
//    for(var i = 0; i < this.waiting.length; i++)
//        if(this.waiting[i]['ipocid'] == ipocid)
//            return this.waiting[i];
//    return null;
//}

/** @export */
VideoSessionList.prototype.findBySsidInWait = function(ssid) {
    for(var i = 0; i < this.waiting.length; i++)
        if(this.waiting[i]['ssid'] == ssid)
            return this.waiting[i];
    return null;
}

/** @export */
//VideoSessionList.prototype.existIpocId = function(ipocid) {
//    return this.findByIpocId(ipocid) || this.findByIpocIdInWait(ipocid);
//}

/** @export */
VideoSessionList.prototype.existSsid = function(ssid) {
    return this.findBySsid(ssid) || this.findBySsidInWait(ssid);
}

/** @export */
VideoSessionList.prototype.getWatching = function() {
    return this.watching;
}

/** @export */
VideoSessionList.prototype.getPinningSids = function() {
    return this.pinnedSids;
}

// move videoSession to the postion before beforeSession;
// if beforeSession is null, it is moved to the last.
/** @export */
VideoSessionList.prototype.move = function(videoSession, beforeSession) {
    var idx = this.list.indexOf(videoSession);
    if(idx == -1)
        return;
    this.list.splice(idx, 1);
    idx = this.list.indexOf(beforeSession);
    idx = idx == -1 ? this.size() : idx;
    this.list.splice(idx, 0, videoSession);
}

/** @export */
VideoSessionList.prototype.pin = function(videoSession) {
    var idx = this.pinnedSids.indexOf(videoSession.videoInf['sid']);
    if(idx == -1)
        this.pinnedSids.push(videoSession.videoInf['sid']);
}

/** @export */
VideoSessionList.prototype.unpin = function(videoSession) {
    var idx = this.pinnedSids.indexOf(videoSession.videoInf['sid']);
    if(idx != -1)
        this.pinnedSids.splice(idx, 1);
}

/**
 * Set watching and swap the positions of new watching and old watching in list
 * return new watching
 * @export
 * @param {Object} videoSession
 * @return {?Object}
 */
VideoSessionList.prototype.watchMe = function(videoSession) {
    var idx1 = this.list.indexOf(this.watching);
    var idx2 = this.list.indexOf(videoSession);
    if(idx1 != - 1 && idx2 != - 1) {
        this.list[idx1] = videoSession;
        this.list[idx2] = this.watching;
    } else if(idx2 != -1) {
        // do nothing
    } else {
        log('Video to be watched is not in list: ' + (videoSession ? videoSession.getInf()['url'] : videoSession));
        videoSession = null;
    }
    if(this.watching) {
        this.watching.mute();
        this.watching.enableFullScreen(false);
    }
    if(videoSession) {
        videoSession.mute(false);
        videoSession.enableFullScreen();
    }
    this.watching = videoSession;
    return this.watching;
}

// Set watching to next one in list.
// return new watching
/** @export */
VideoSessionList.prototype.unwatchMe = function() {
    if(!this.watching)
        return null;

    var idx = -1;
    this.watching.mute();
    this.watching.enableFullScreen(false);
    if(this.watching.videoInf['cls'] != UI_MSG_CLS_CHANNEL) {
        idx = this.hangup(this.watching);
        idx = idx < 0 || idx >= this.size() ? 0 : idx;
    }
    else
        idx = this.nextWatchingIdx();
    this.watching = null;
    if(idx >= 0 && idx < this.size())
        this.watching = this.list[idx];
    if(this.watching) {
        this.watching.mute(false);
        this.watching.enableFullScreen();
    }
    return this.watching;
}

// return next watching index in list
VideoSessionList.prototype.nextWatchingIdx = function() {
    var idx = this.list.indexOf(this.watching);
    var cur = idx;
    idx ++;
    if(idx >= this.size())
        idx = 0;
    if(idx >= this.size())
        idx = -1;
    return idx;
}

// return next watching in list
VideoSessionList.prototype.nextWatching = function() {
    var idx = this.nextWatchingIdx();
    if(idx != -1)
        return this.list[idx];
    return null;
}

// return the session list:
// excluding watching
// bring forward the videoes of pinned sessions
/** @export */
VideoSessionList.prototype.showList = function() {
    var r = [];
    var pos = 0;
    var self = this;
    this.list.forEach(function(item){
        if(item == self.watching)
            return;
        if(self.pinnedSids.indexOf(item.videoInf['sid']) == -1)
            r.push(item);
        else
            r.splice(pos++, 0, item);
    });
    return r;
}

// Return a list of videoInf to be accepted
/** @export */
VideoSessionList.prototype.waitList = function() {
    return this.waiting;
}

// add a video into the waiting queue
/** @export */
VideoSessionList.prototype.wait = function(vinf) {
    if(typeof vinf._waitIdx === 'number')
        this.waiting.splice(vinf._waitIdx, 0, vinf);
    else
        this.waiting.push(vinf);
}

// remove a video from the waiting queue
// if ssid is null, return the queue head.
/** @export */
VideoSessionList.prototype.unwait = function(ssid) {
    var idx = this.waiting.length;
    if(ssid != null) {
        for(var i = 0; i < this.waiting.length; i++) {
            if(this.waiting[i]['ssid'] == ssid) {
                idx = i;
                break;
            }
        }
    }
    else {
        idx = 0;
    }
    if(idx < this.waiting.length) {
        var r = this.waiting.splice(idx, 1)[0];
        r._waitIdx = Number(idx);
        return r;
    }
    return null;
}

// set event listeners
/** @export */
VideoSessionList.prototype.setEvtListeners = function(onNewVideo, onVideoStop, onTooManyVideos) {
    this.onNewVideo = onNewVideo;
    this.onVideoStop = onVideoStop;
    this.onTooManyVideos = onTooManyVideos;
}

// set the directory to store the video snapshot
// The directory should end with '\\', or the last part will be treated as the filename prefix.
/** @export */
VideoSessionList.prototype.setSnapshotDir = function(path) {
    this.snapshotDir = path;
}

/**
 * take a snapshot
 * @export
 * @param {?Object=} session if ommited or null, watching will be assumed
 * return null or an object, its 'data' field, if exists, holds the base64 encoded picture;
 *        its 'path' field, if exits, holds the path to the file where the picture is stored.
 */
VideoSessionList.prototype.snapshot = function(session) {
    session = session ? session : this.watching;
    if(session.playerType == PLAYER_RTMP) {
        var data = session.player['snapshot']();
        return {data: data};
    }
    if(session.playerType != PLAYER_RTSP) {
        alert('当前浏览器不支持抓拍');
        return null;
    }
    if(!this.snapshotDir || this.snapshotDir == '')
        return null;
    var player = session.player;
    if(!player)
        return null;
    player['VideoSnapshotPath'](this.snapshotDir + session.getInf()['ssid'] + '-');
    return {path: player['VideoSnapshot']()};
}

/** @export */
function loadVideoSources() {
    call('getVideoSources', null, function(resp) {
        if (resp.iserr()) {
            log('getVideoSources: failed: ' + resp.error);
            return;
        }
        //var raw = utf8to16(base64decode(resp.result));
        var sources = JSON.parse(resp.result);
        sources.forEach(function(src) {
            onVideoShare(src);
        });
    });
}

function createPlayer(playerType, url) {
    var player;
    if(playerType == PLAYER_RTSP) {
        player = document.createElement('object');
        try {
            player.classid = "clsid:E52088B2-5185-4BF6-84E2-F75C4887C8BD";
        }
        catch(e) {}
    }
    else if(playerType == PLAYER_RTMP) {
        if(!window['videojs']) {
            function onFlashEvent(id, evt, val) {
                var player= document.getElementById(id);
                if(!player.initialized) {
                    player.initialized = true;
                    if(stallTmo > 0) {
                        var x = function() {
                            if(player['detectStall']) {
                                player['detectStall']('onVideoStalled', stallTmo);
                                log('detectStall for', id);
                                return;
                            }
                            setTimeout(x, 500);
                        }
                        x();
                    }
                }
            }
            function onFlashError() {

            }
            function onFlashReady() {
            }
            window['videojs'] = { 'Flash': {
                'onEvent': onFlashEvent,
                'onError': onFlashError,
                'onReady': onFlashReady
            }};
            window['onJSBridge'] = onFlashEvent;
        }
        var idx = url.lastIndexOf('/');
        var path = url.substring(0, idx);
        var name = url.substring(idx + 1);
        player = document.createElement('object');
        player.classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
        player.type = 'application/x-shockwave-flash';
        player.data = 'player/player.swf';
        var p = document.createElement('param');
        p.name = 'allowNetworking';
        p.value = 'all';
        player.appendChild(p);
        p = document.createElement('param');
        p.name = 'allowScriptAccess';
        p.value = 'always';
        player.appendChild(p);
        //if(fullScreenEnabled) {
            p = document.createElement('param');
            p.name = 'allowFullScreen';
            p.value = 'true';
            player.appendChild(p);
        //}
        p = document.createElement('param');
        p.name = 'flashvars';
        p.value = 'autoplay=true&muted=true&rtmpConnection=' + path + '&rtmpStream=' + name;
        if(rtmplayerType == 1) {
            p.value = 'javascriptCallbackFunction=onJSBridge&autoPlay=true&muted=true&streamType=live&src=' + url;
            player.data = 'player/player-1.swf';
        }
        player.appendChild(p);
        p = document.createElement('param');
        p.name = 'wmode';
        p.value = 'transparent'; //'opaque';
        player.appendChild(p);
        if(IS_IE10) {
            var div = document.createElement('div');
            div['innerHTML'] = player.outerHTML;
            player = div.firstChild;
        }
    }
    else {
        player = document.createElement('video');
    }
    player.initialized = playerType != PLAYER_RTMP;
    return player;
}

// vinf: {"cls": 0, "sid": "123", "ssid": 123, "ipocid": "xxx", "valid": 1, "url": "rtsp://...", "mimeCodecs": "xxx"}
function onVideoShare(vinf) {
    if (vinf['valid']) {
        videoSessionList.wait(vinf);
        onNewVideo(vinf);
        log('Media is ready:', vinf['ssid'], vinf['url']);
    }
    else { // url is empty
        var inf = null;
        var s = videoSessionList.findBySsid(vinf['ssid']);
        if(s) {
            if(s == videoSessionList.watching) {
                var next = videoSessionList.nextWatching();
                if(s == next)
                    next = null;
                videoSessionList.watchMe(next);
            }
            videoSessionList.hangup(s);
            inf = s.videoInf;
        }
        else {
            inf = videoSessionList.unwait(vinf['ssid']);
        }
        log("video share is stopped: " + (inf ? inf['url'] : ''));
        onVideoStop(inf);
    }
}

// pick up a video from the waiting queue.
// if ipocid is null, pick up the queue head.
// return the session attached to the video upon a successful operation.
/** @export */
function pickupVideo(ssid) {
    var vinf = videoSessionList.unwait(ssid);
    if(!vinf)
        return null;

    var s = new VideoSession(vinf, playerType);
    if(!videoSessionList.add(s)) {
        videoSessionList.wait(vinf);
        onTooManyVideos(vinf);
        return null;
    }

    // create player
    var player = createPlayer(playerType, vinf['url']);
    s.bindPlayer(player);

    if(!videoSessionList.watching)
        videoSessionList.watchMe(s);

    return s;
}

// Should be called each time the view is visible
/** @export */
function onShowVideoView() {
    videoSessionList.list.forEach(function(session) {
        var player = session.player;
        if(session.playerType == PLAYER_RTMP) {
            if(player['getProperty']['paused'] != session.paused) {
                if(session.paused)
                    player.pause();
                else
                    player.resume();
            }
        }
    });
}

// Should be called each time the view is re-drawed
// session is of type VideoSession. It is the session just picked up, otherwise, it is null.
/**
 * @export
 * @param {?Object=} session
 */
function postRefreshVideoView(session) {
    videoSessionList.list.forEach(function(session) {
        var player = session.player;
        if(session.playerType == PLAYER_RTSP || session.playerType == PLAYER_RTMP)
            session.mute(player['muted']);
        else if(player.paused)
            try {
                player.play().catch(function(error) {
                    log('Failed to play', player.id, error.message);
                });
            }
            catch(e) {}
    });
}

/** @param {?Object=} session */
function invalidateView(session) {
    refreshVideoView();
    postRefreshVideoView(session);
}

// called when there is a new video session
function onNewVideo(vinf) {
    if(videoSessionList.onNewVideo) {
        videoSessionList.onNewVideo(vinf);
        return;
    }

    var s = null;
    //s = pickupVideo(vinf.ipocid);
    invalidateView(s);
}

// called when a video session ends
function onVideoStop(vinf) {
    if(videoSessionList.onVideoStop) {
        videoSessionList.onVideoStop(vinf);
        return;
    }

    invalidateView();
}

// called when the number of active videos reaches the limit
function onTooManyVideos(vinf) {
    if(videoSessionList.onTooManyVideos) {
        videoSessionList.onTooManyVideos(vinf);
        return;
    }

    // notify user
    alert('Please hang up a video session to accept the new one');
    //invalidateView();
}

// implement refreshVideoView or call videoSessionList.setEvtListeners to register event listeners
//function refreshVideoView() {}

//videoSessionList.setEvtListeners(
//	function(vinf){alert(vinf.ipocid + ' sharing video'); invalidateView();},
//	function(vinf){alert(vinf.ipocid + ' stop sharing video'); invalidateView();},
//	function(vinf){alert(vinf.ipocid + ' too many videos')}
//);