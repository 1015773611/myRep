var JSONRPC = '2.0';

var EVT_NO_SVC = window['EVT_NO_SVC']               = 100;
var EVT_SVC_UP = window['EVT_SVC_UP']               = 101;
var EVT_SVC_DOWN = window['EVT_SVC_DOWN']           = 102;
var EVT_WS_EXCEPTION = window['EVT_WS_EXCEPTION']   = 103;
var EVT_FORCE_OFFLINE = window['EVT_FORCE_OFFLINE'] = 104;

/**
 * @param {?=} param
 */
function _onRpcEvent(evt, param) {
    var fn = window['onRpcEvent'];
    if(fn)
        fn(evt, param);
}

/**
 * @export
 * @constructor
 * @param {?string=} msg
 * @param {?=}       data
 */
function RpcErr(code, msg, data) {
    this.code = code;
    this.message = msg;
    this.data = data;
}

RpcErr.prototype.toString = function (){
    return JSON.stringify({
        'code': this.code,
        'message': this.message,
        'data': this.data
    });
}

RpcErr.ERR_OK                   = 0;
RpcErr.ERR_PARSE                = -32700;
RpcErr.ERR_INTERNAL             = -32603;
RpcErr.ERR_INVALID_PARAMS       = -32602;
RpcErr.ERR_METHOD_NOT_FOUND     = -32601;
RpcErr.ERR_INVALID_REQ          = -32600;
RpcErr.ERR_INVALID_METHOD_REV   = -32000;
RpcErr.ERR_PEER_TIMEOUT         = -32001;
RpcErr.ERR_NO_CONNECTION        = -32002;

/**
 * @constructor
 * @param {?=}       params
 * @param {?number=} rev
 */
function RpcReq(bcall, method, params, rev) {
    this.id = bcall ? RpcReq.getid() : 0;
    this.method = method;
    this.params = params;
    this.rev = rev == null ? 0 : rev;
}

RpcReq.prototype.iscall = function () {
    return this.id != null && this.id != 0;
}

RpcReq.prototype.toString = function () {
    return JSON.stringify({
        'jsonrpc': JSONRPC,
        'id': this.id,
        'method': this.method,
        'params': this.params,
        'rev': this.rev
    });
}

RpcReq.id = 0;

RpcReq.getid = function () {
    if (++RpcReq.id == 0)
        ++RpcReq.id;
    return RpcReq.id;
}

RpcReq.parse = function(rpc) {
    if(rpc['jsonrpc'] == JSONRPC && rpc['method'] != undefined) {
        var r = new RpcReq(false, rpc['method'], rpc['params'], rpc['rev']);
        r.id = rpc['id'];
        return r;
    }
    return null;
}

/**
 * @constructor
 * @param {?=}       result
 * @param {?Object=} err
 */
function RpcResp(id, result, err) {
    this.id = id;
    this.result = result;
    this.error = err;
}

/** @export */
RpcResp.prototype.iserr = function () {
    return this.error != null && this.error.code != RpcErr.ERR_OK;
}

RpcResp.prototype.toString = function() {
    var o = {
        'jsonrpc': JSONRPC,
        'id': this.id
    };
    if (this.iserr())
        o['error'] = this.error;
    else
        o['result'] = this.result;
    return JSON.stringify(o);
}

RpcResp.parse = function(rpc) {
    if (rpc['jsonrpc'] == JSONRPC && (rpc['result'] != undefined || rpc['error'] != undefined)) {
        return new RpcResp(rpc['id'], rpc['result'], rpc['error']);
    }
    return null;
}

/**
 * @constructor
 * @param {?function()=} connCb
 */
function RpcClient(url, connCb) {
    var self = this;
    this.id = 0;
    this.calls = {}; //new Map();
    this.methods = {}; //new Map();
    this.url = url;
    this.connCbs = [];
    this.connListener = null;
    this.retryConn = 0;
    this.hbIntv = 3;

    self.connect(connCb);
    // Check connection state every second and try to reconnect in case disconnected
    self.connTimer = window.setInterval(function () {
        if (self.ws.readyState != WebSocket.OPEN &&
            self.ws.readyState != WebSocket.CONNECTING) {
            self.connect();
        }
    }, 1000);
    // Remove expired calls: current timeout is 30s
    self.callTimer = window.setInterval(function () {
        var now = Date.now() / 1000;
        var ob = [];
        Object.keys(self.calls).forEach(function (key) {
            var value = self.calls[key];
            if (now - value.time > 30) {
                var resp = new RpcResp(key);
                resp.error = new RpcErr(RpcErr.ERR_PEER_TIMEOUT, 'ERR_PEER_TIMEOUT');
                value.fnCb(resp);
                ob.push(key);
                log('[WARN] Remove timeout call: ' + key + " : " + value.method);
            }
        });
        ob.forEach(function (key) {
            delete self.calls[key];
        });
    }, 10000);
};

RpcClient.prototype.connected = function () {
    return this.ws.readyState == WebSocket.OPEN;
}

RpcClient.prototype.setConnListener = function (cb) {
    this.connListener = cb;
    if(this.connected() && cb)
        setTimeout(function() { cb(true); });
}

/** @param {?function()=} cb */
RpcClient.prototype.connect = function (cb) {
    var self = this;
    var ws = this.ws;

    if (cb != null)
        self.connCbs.push(cb);
    if (ws != null && ws.readyState == WebSocket.CONNECTING)
        return;

    if (ws == null || !self.connected()) {
        log('Connecting to ' + self.url);
        try {
            ws = typeof MozWebSocket != "undefined" ?
                new MozWebSocket(self.url) : new WebSocket(self.url);
        }
        catch(e) {
            console.log('WebSocket connection error: ', e.name + ': ' + e.message);
            _onRpcEvent(EVT_WS_EXCEPTION);
            // history.go(-1);
        }
        self.ws = ws;
    }

    if(ws) {
        ws.onopen = function () {
            _onRpcEvent(EVT_SVC_UP);
            if(self.retryConn > 0 && self.retryConn < 10) {
                //history.reload();
                log('reload is needed');
            }
            self.retryConn = 10;
            self.connErr = false;
            self.forceOffline = false;
            log("ws: onopen: number of cbs: " + self.connCbs.length);

            // Web Socket is connected, send data using send()
            for (var i in self.connCbs) {
                self.connCbs[Number(i)]();
            }
            self.connCbs = [];

            if (self.connListener != null)
                self.connListener(true);

            //self.call('setHeartbeat', JSON.stringify({'intv': self.hbIntv * 2, 'action': 1}), 0, function(resp) {
            //    if (resp.iserr()) {
            //        log('Failed to setHeartbeat');
            //        return;
            //    }
            //    //self.hbTimer = window.setInterval(function () {
            //    //    self.call('heartbeat');
            //    //}, self.hbIntv * 1000);
            //});
        };
        ws.onmessage = function (evt) {
            log("ws: onmessage: " + evt.data);
            self.handleMsg(evt.data);
        };
        ws.onclose = function () {
            if(self.connErr)
                return;
            log("ws: onclose");
            if (self.connListener != null)
                self.connListener(false);
            if(self.forceOffline)
                return;
            _onRpcEvent(EVT_SVC_DOWN);
            --self.retryConn;
            log('Service stopped');
        };
        ws.onerror = function (evt) {
            log("ws: onerror: " + JSON.stringify(evt));
            self.connErr = true;
            _onRpcEvent(EVT_NO_SVC);
            if(--self.retryConn <= 0) {
                //history.go(-1);
            }
            log('Service is not available');
        };
    }
}

RpcClient.prototype.close = function () {
    window.clearInterval(this.connTimer);
    window.clearInterval(this.callTimer);
    if(this.hbTimer) {
        window.clearInterval(this.hbTimer);
    }
    this.forceOffline = true;
    if(this.ws) {
        this.ws.close();
        this.ws = null;
    }
}

RpcClient.prototype.send = function (msg) {
    var self = this;
    if (self.connected()) {
        try {
            self.ws.send(msg);
        }
        catch (e) {
            log('Failed to send: ' + msg);
        }
        return;
    }
    this.connect(function () {
        self.ws.send(msg);
    });
}

RpcClient.prototype.getid = function () {
    if (++this.id == 0)
        ++this.id;
    return this.id;
}

/**
 * @param {string}             method method name
 * @param {?=}                 params method arguments packed into a json string
 * @param {?number=}           rev    method revision
 * @param {?function(Object)=} fnCb   void(RpcResp); to accept the call result/error
 */
RpcClient.prototype.call = function (method, params, rev, fnCb) {
    var req = new RpcReq(fnCb != null, method, params, rev);
    var s = req.toString();
    this.send(s);
    log('call: ' + s);
    if (fnCb == null)
        return;

    this.calls[req.id] = {
        fnCb: fnCb,
        method: req.method,
        time: Date.now() / 1000
    };
}

/**
 * @param {string}   method  method name
 * @param {?=}       params  method arguments packed into a json string
 * @param {?number=} rev     method revision
 */
RpcClient.prototype.notify = function (method, params, rev) {
    this.call(method, params, rev);
}

/**
 * @param {string}                      name       method name
 * @param {function(Object, Object)}    fn         void(RpcReq, RpcResp); parse and handle the req, return result/error in resp
 * @param {?number=}                    rev        method revision; informative
 * @param {?function(number): boolean=} revChecker bool(rev); Used to verify the revision in request
 */
RpcClient.prototype.regMethod = function (name, fn, rev, revChecker) {
    this.methods[name] = {
        name: name,
        fn: fn,
        rev: rev,
        revv: revChecker
    };
}

RpcClient.prototype.unregMethod = function (name) {
    delete this.methods[name];
}

RpcClient.prototype.handleMsg = function (msg) {
    var self = this;
    var rpc = {};
    try {
        rpc = JSON.parse(msg);
    }
    catch (e) {
        log('handleMsg: Failed to parse message: ' + e + ': ' + msg);
        // notify the other end this RpcError?
        return;
    }

    if (rpc['method'] != undefined) {
        // we get a RpcReq
        var method = null;
        var req = RpcReq.parse(rpc);
        if (req == null) {
            //resp.error = new RpcErr(RpcErr.ERR_INVALID_REQ, 'ERR_INVALID_REQ');
            log('handleMsg: Invalid req: ' + msg);
            return;
        }

        var resp = new RpcResp(req.id);
        if ((method = self.methods[req.method]) == null) {
            resp.error = new RpcErr(RpcErr.ERR_METHOD_NOT_FOUND, 'ERR_METHOD_NOT_FOUND');
            log('handleMsg: Method not found: ' + msg);
        }
        else if (method.revv != null && !method.revv(req.rev)) {
            resp.error = new RpcErr(RpcErr.ERR_INVALID_METHOD_REV, 'ERR_INVALID_METHOD_REV');
            log('handleMsg: Invalid method revision: ' + msg);
        }
        else {
            var params = JSON.parse(req.params);
            method.fn(req, params, resp);
        }
        if (req.iscall()) {
            self.send(resp.toString());
        }
        return;
    }

    // we get a RpcResp
    var resp = RpcResp.parse(rpc);
    if (resp == null) {
        log('handleMsg: Bad response: ' + msg);
        return;
    }
    if (resp.iserr()) {
        log('handleMsg: Server responds with an error: ', msg);
    }

    var call = self.calls[resp.id];
    if (call == null) {
        log('handleMsg: Call is not found: ' + msg);
        return;
    }
    delete self.calls[resp.id];
    call.fnCb(resp);
}

function matchRev(revMethod) {
    return function (revReq) { return revReq == revMethod; };
}

/**
 * @param {?number=} rev
 */
function regMethodV(method, fn, rev) {
    rev = rev == null ? 0 : rev;
    rpcc.regMethod(method, fn, rev, matchRev(rev));
}

/** @export */
var regEvent = regMethodV;

// connect to rpc server
var rpcc = new RpcClient(getWSProto() + '://' + wshost + ':' + wsport + '/rpc');

/**
 * @export
 * @param {?=}                 param
 * @param {?function(Object)=} cb
 * @param {?number=}           rev
 */
function call(method, param, cb, rev) {
    if (typeof param == 'object')
        param = JSON.stringify(param);
    rpcc.call(method, param, rev, cb);
}

/** @export */
function regRpcConnListener(listener) {
    rpcc.setConnListener(listener);
}

//regRpcConnListener(function (connected) {
//    if (connected) {
//        // on connected
//    }
//    else {
//        // on disconnected
//    }
//});

regMethodV('heartbeat', function(req, params, resp) {
    resp.result = 'OK';
    log('recv heartbeat');
});

regEvent('jsonrpc::offline', function(req, params) {
    // params: code, message
    rpcc.close();
    console.log("You're offline. ", JSON.stringify(params));
    _onRpcEvent(EVT_FORCE_OFFLINE, params);
    if(rpcc.onForceOffline)
        rpcc.onForceOffline(params);
});

/** @export */
function regRpcForceOfflineListener(listener) {
    rpcc.onForceOffline = listener;
}
