/** @constructor */
function AV(node, mimeCodec, wsuri) {
    this.video = typeof node == typeof '' ? document.getElementById(node) : node;
    this.mimeCodec = mimeCodec;
    this.wsuri = wsuri;
    this.playing = false;
    this.websocket = null;
    this.mediaSource = null;
}

AV.prototype.stop = function () {
    if (!this.playing)
        return;

    this.playing = false;
    if(this.mediaSource.readyState == 'open')
        this.mediaSource.endOfStream();
    if (this.websocket)
        this.websocket.close();
    this.websocket = null;
    this.mediaSource = null;
    this.buffer = null;
    if(this.lagCheckTimer)
        clearInterval(this.lagCheckTimer);
}

AV.prototype.start = function () {
    if (this.playing)
        return;
    this.playing = true;

    var buffer = this.buffer;
    var queue = [];
    var stateCnt = 0;
    var god = this;
    var video = this.video;
    var mediaSource = this.mediaSource = new MediaSource();

    video.addEventListener('loadeddata', function () {
        if (video.readyState >= 2) {
            video.play();
        }
    });

    video.addEventListener('loadedmetadata', function (e) {
    });

    video.addEventListener('error', function (e) {
        var err = video.error;
    });

    mediaSource.addEventListener('sourceopen', function (e) {
        buffer = this.buffer = mediaSource.addSourceBuffer(god.mimeCodec);

        buffer.addEventListener('update', function () {
            if (queue.length > 0 && !buffer.updating) {
                buffer.appendBuffer(queue.shift());
            }
        });
        buffer.addEventListener("updateend", function () {
            if (!buffer.updating && buffer.buffered.length >= 1 && video.currentTime - buffer.buffered.start(0) > 30) {
                buffer.remove(buffer.buffered.start(0), video.currentTime - 10);
            }
            if (video.paused || video.readyState <= 2) {
                stateCnt++;
            }
            else
                stateCnt = 0;
            god.checkLagTime();
        }, false);
    }, false);

    var websocket = god.websocket = new WebSocket(god.wsuri);
    websocket.binaryType = 'arraybuffer'; //console.log('websocket.binaryType:', websocket.binaryType);

    websocket.addEventListener('message', function (e) {
        //var data = new Uint8Array(e.data);
        var data = e.data;
        if (typeof data == 'string') {
            var m = JSON.parse(data);
            if (m.type == 1) {
                god.mimeCodec = m["MIME-Codecs"];
                video.src = window.URL.createObjectURL(mediaSource);
            }
        }
        else {
            //dumper.send(data);
            if (!buffer || buffer.updating) {// || queue.length > 0) {
                queue.push(data);
            } else {
                buffer.appendBuffer(data);
            }
        }
    }, false);
}

// deal with lag time and fragmented buffer
AV.prototype.checkLagTime = function () {
    var video = this.video;
    var buffered = video.buffered;
    if(buffered.length == 0)
        return;

    if(video.readyState <= HTMLMediaElement.HAVE_CURRENT_DATA) {
        var cur = video.currentTime;
        for(var i = 0; i < buffered.length; i++) {
            var t1 = buffered.start(i);
            var t2 = buffered.end(i);
            if(t1 <= cur && cur <= t2) {
                if(buffered.length - i > 1) {
                    video.currentTime = buffered.start(i + 1);
                }
                else if(t2 - cur > 1) {
                    video.currentTime += 0.2;
                }
                break;
            }
            else if(t1 > cur) {
                video.currentTime = buffered.start(i);
                break;
            }
        }
    }
    
    var bufEnd = buffered.end(buffered.length - 1);
    var delta = bufEnd - video.currentTime;
    if(delta < 0) {
        video.currentTime = bufEnd - 1;
        delta = bufEnd - video.currentTime;
    }
    if(this.prevPos == video.currentTime && delta > 1) {
        video.currentTime += 0.2;
    }
    this.prevPos = video.currentTime;

    if(delta > 5 && video.playbackRate < 2) {
        video.playbackRate = 2;
    }
    else if(delta > 2 && video.playbackRate < 1.5) {
        video.playbackRate = 1.5;
    }
    else if(delta > 1 && video.playbackRate < 1.2) {
        video.playbackRate = 1.2;
    }
    else if(delta <= 1 && video.playbackRate != 1) {
        video.playbackRate = 1;
    }
}
