var ERR_OK                = 0;
var ERR_POCSVC_NOT_AVAIL  = 1;
var ERR_WS_NOT_AVAIL      = 2;
var ERR_WS_INTRANET       = 3;
var ERR_WS_COMPAT_VIEW    = 4;
var ERR_WS_UNSUPPORTED_IE = 5;
var ERR_WS_UNSPECIFIED    = 6;

/*
function envHandler(code) {
    if(code != ERR_POCSVC_NOT_AVAIL && code != ERR_WS_COMPAT_VIEW) {
        // retrieve Pocsvc version
        console.log(window['PocsvcVer']);
    }
    var errMsg = '网络连接失败。\n\n';
    switch(code) {
    case ERR_OK:
        break;
    case ERR_POCSVC_NOT_AVAIL:
        errMsg = '没有检测到对讲服务。';
        break;
    case ERR_WS_NOT_AVAIL:
        errMsg += '这是因为您的浏览器不支持WebSocket技术。\n请升级或换用一款支持该技术的浏览器。';
        break;
    case ERR_WS_INTRANET:
        errMsg += '如果“自动检测 Intranet 网络”处于未勾选状态，请将其勾选并刷新页面。\n如果其已经处于勾选状态，请将其连同其下面3项一起置于非勾选状态，并刷新页面。';
        break;
    case ERR_WS_COMPAT_VIEW:
        errMsg += '请设置您的浏览器在【非】“兼容性视图”里运行该网站，然后刷新页面。';
        break;
    case ERR_WS_UNSUPPORTED_IE:
        errMsg += '请升级您的IE浏览器至版本10或11。';
        break;
    case ERR_WS_UNSPECIFIED:
    default:
        errMsg += '出现未知错误。请联系客服人员。';
        break;
    }
    if(code != ERR_OK)
        alert(errMsg);
}
*/

function getWSProto() {
    return window['location']['protocol'] != 'https:' ? 'ws' : 'wss';
}

function testWebSocket(host, port, envHandler) {
    try {
        var url = getWSProto() + '://' + host + ':' + port;
        var ws = typeof MozWebSocket != "undefined" ? new MozWebSocket(url) : new WebSocket(url);
        ws.onopen = function () {
            envHandler(ERR_OK);
        }
        ws.onerror = function (evt) {
            envHandler(ERR_POCSVC_NOT_AVAIL);
            console.log("ws: onerror: " + JSON.stringify(evt));
        }
    }
    catch(e) {
        if(e.name == 'SecurityError') {
            envHandler(ERR_WS_INTRANET);
        }
        else if(e.name == 'TypeError' || e.name == 'ReferenceError') {
            var brw = tellBrowser();
            if(brw[0] == 'IE') {
                if(brw[1] < brw[2])
                    envHandler(ERR_WS_COMPAT_VIEW);
                else //if(brw[1] < 10)
                    envHandler(ERR_WS_UNSUPPORTED_IE);
            }
            else
                envHandler(ERR_WS_NOT_AVAIL);
        }
        else {
            envHandler(ERR_WS_UNSPECIFIED);
        }
        console.log('WebSocket connection error: ' + e.name + ': ' + e.message);
    }
}

function testPocsvc(host, port, envHandler) {
    var xhr = new XMLHttpRequest();
    xhr.ontimeout = function () {
        envHandler(ERR_POCSVC_NOT_AVAIL);
    };
    xhr.onabort = function () {
    	//alert('onabort');
    }
    xhr.onerror = function () {
    	envHandler(ERR_POCSVC_NOT_AVAIL);
    };
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var o = JSON.parse(xhr.response);
                window['PocsvcVer'] = o.version;
                testWebSocket(host, port, envHandler);
                return;
            }
        }
        envHandler(ERR_POCSVC_NOT_AVAIL);
    };
    try {
        xhr.open("GET", '//' + host + ':' + port + '/api/hello', true);
        xhr.timeout = 5000;
        xhr.send();
    }
    catch(e) {
        console.log('XMLHttpRequest connection error: ' + e.name + ': ' + e.message);
        // It might be compatibility view which prevents the call to xhr.open. Continue to determine it.
        testWebSocket(host, port, envHandler);
    }
}


function tellBrowser() {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])) {
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return ['IE', tem[1]];
    }
    if(M[1]=== 'Chrome') {
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1);
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    if(M[0].toUpperCase() == 'MSIE') M[0] = 'IE';
    if(M[0] == 'IE' && (tem= ua.match(/trident\/(\d+)/i))!= null) M[2] = Number(tem[1])+4;
    return M;
}

/*
var PLAYER_RTSP = 0;
var PLAYER_RTMP = 3;

function detectPlayerType() {
    var typeMap = {
        'IE': PLAYER_RTMP,
        'Chrome': -1,
        'Edge': PLAYER_RTMP,
        'Firefox': -1
    };
    var b = tellBrowser();
    IS_IE10 = b[0] == 'IE' && b[1] == 10;
    return typeMap[b[0]];
}
*/

function testEnv(host, port, envHandler) {
    setTimeout(function() {
        testPocsvc(host, port, envHandler);
    }, 3000);
}

//testEnv('localhost', 41301, envHandler);
