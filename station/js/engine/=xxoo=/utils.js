/**
 * @export
 * @param {...?} var_args a variable number of parameters
 */
function log(var_args) {
    var args = [];
    for(var i = 0; i < arguments.length; i++) {
    //    args.push(stringify(arguments[i]));
    }
    // console.log(args.join(' '));
}

function stringify(o) {
    if(window.JSON)
        return JSON.stringify(o);
    if(typeof o === 'string' || o instanceof Function)
        return '"' + o + '"';
    if(!(o instanceof Object))
        return o + '';
    if(Object.keys) {
        var s = '{';
        Object.keys(o).forEach(function(k) {
            s += '"' + k + '":' + stringify(o[k]) + ',';
        });
        if(s[s.length - 1] == ',')
            s = s.substr(0, s.length - 1);
        return s + '}';
    }
    return o.toString();
}

/**
 * @export
 */
function getWSProto() {
    return window['location']['protocol'] != 'https:' ? 'ws' : 'wss';
}

// IE 11; Firefox 53; Chrome 58
// if M[0] is 'IE', M[1] is the version in quirks mode, M[2] is the actual version.
/** @export */
function tellBrowser() {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])) {
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return ['IE', tem[1]]; //'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome') {
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1); //.join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    if(M[0].toUpperCase() == 'MSIE') M[0] = 'IE';
    if(M[0] == 'IE' && (tem= ua.match(/trident\/(\d+)/i))!= null) M[2] = Number(tem[1])+4;
    return M;//.join(' ');
}

var IS_IE10 = false;

/** @export */
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

// stolen from https://github.com/google/closure-library/blob/master/closure/goog/base.js
var goog = goog || {};

/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
goog.global = this ? this : window;

goog.isDef = function(val) {
  // void 0 always evaluates to undefined and hence we do not need to depend on
  // the definition of the global variable named 'undefined'.
  return val !== void 0;
};

goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split('.');
  var cur = opt_objectToExportTo || goog.global || window;

  // Internet Explorer exhibits strange behavior when throwing errors from
  // methods externed in this manner.  See the testExportSymbolExceptions in
  // base_test.html for an example.
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript('var ' + parts[0]);
  }

  for (var part; parts.length && (part = parts.shift());) {
    if (!parts.length && goog.isDef(opt_object)) {
      // last part and we have an object; use it
      cur[part] = opt_object;
    } else if (cur[part] && cur[part] !== Object.prototype[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
};

goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};

goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};