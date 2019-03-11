
/** @constructor */
function videoEntry()
{
	this.id = null;			// DIV id
	this.uid = null;
	this.top = 0;
	this.dragFlag = false;
	this.drag = false;
	this.dragX = 0;
	this.dragXDelta = 0;
	this.dragY = 0;
	this.dragYDelta = 0;
	this.isMain = false;

	this.videoObject = null;
}

var mVideoMain = new videoEntry();
var mVideoList = new Array();
var mVideoListDragIndex = -1;

var mVideoBoxId;

var VIDEO_BOX_TOP = 0;
var VIDEO_BOX_LEFT = 0;
var VIDEO_BOX_HEIGHT = 0;
var VIDEO_BOX_WIDTH = 0;

var VIDEO_SMALL_HEIGHT = 0;
var VIDEO_SMALL_WIDTH = 0;
var VIDEO_BIG_HEIGHT = 0;
var VIDEO_BIG_WIDTH = 0;


/** @export */
function uiVideoConfig(videoBoxId, vBoxTop, vBoxLeft, vBoxHeight, vBoxWidth, vBigHeight, vBigWidth, vSmallHeight) {
	// Caculate layout
	VIDEO_BOX_TOP = vBoxTop;
	VIDEO_BOX_LEFT = vBoxLeft;
	VIDEO_BOX_HEIGHT = vBoxHeight;
	VIDEO_BOX_WIDTH = vBoxWidth;

	VIDEO_BIG_HEIGHT = vBigHeight;
	VIDEO_BIG_WIDTH = vBigWidth;
	VIDEO_SMALL_HEIGHT = vSmallHeight;
	VIDEO_SMALL_WIDTH = vBoxWidth - vBigWidth - 20;

	mVideoBoxId = videoBoxId
	if (mVideoMain.id == null)
		mVideoMain.id = "uiVideoBig";
	mVideoMain.isMain = true;
	mVideoMain.top = VIDEO_BOX_TOP;
	utilVideoRefreshCss(mVideoMain, true, VIDEO_BOX_TOP, VIDEO_BOX_LEFT, VIDEO_BIG_HEIGHT, VIDEO_BIG_WIDTH);
}


var doVideoItemBuild = null;
var doVideoListDragStart = null;
var doVideoListDragStop = null;
var doVideoListToBig = null;

//--------------------------------------
// Callback
//--------------------------------------
// onVideoItemBuild(videoSession, index)					return divId
// onVideoListDrag(indexFrom, indexTo)
// onVideoListToBig(videoSession)
//--------------------------------------

/** @export */
function uiVideoSetListeners(onVideoItemBuild, onVideoListDragStart, onVideoListDragStop, onVideoListToBig) {
	doVideoItemBuild = onVideoItemBuild;
	doVideoListDragStart = onVideoListDragStart;
	doVideoListDragStop = onVideoListDragStop;
	doVideoListToBig = onVideoListToBig;
}

//----------------------------------------------------------
//
//	APIs
//
//----------------------------------------------------------

/** @export */
function uiVideoRefreshView() {
	var vWatching = videoSessionList.getWatching();
	if (vWatching) {
		var videoList = new Array();
		videoMainGetTiming(vWatching);

		var player = vWatching.getPlayer();
		player.width = VIDEO_BIG_WIDTH;
		player.height = VIDEO_BIG_HEIGHT;

		var videoMain = utilVideoEntryFindByObject(vWatching);
		if (videoMain == null) {
			if (doVideoItemBuild) {
				var id = doVideoItemBuild(vWatching);
				videoMain = new videoEntry();
				videoMain.id = id;
				videoMain.videoObject = vWatching;
			}
		} else
			videoMain.handled = true;
		if (videoMain != null) {
			videoMain.isMain = true;
			videoMain.top = VIDEO_BOX_TOP;
			utilVideoRefreshCss(videoMain, true, VIDEO_BOX_TOP, VIDEO_BOX_LEFT, VIDEO_BIG_HEIGHT, VIDEO_BIG_WIDTH);
			utilVideoCleanEvent(videoMain);
		}

		// Small list
		videoSessionList.showList().forEach(function(item, i) {
			var p = item.getPlayer();
			p.width = VIDEO_SMALL_WIDTH;
			p.height = VIDEO_SMALL_HEIGHT - 30;

			var v = utilVideoEntryFindByObject(item);
			if (v == null) {
				if (doVideoItemBuild) {
					var id = doVideoItemBuild(item);
					v = new videoEntry();
					v.id = id;
					v.videoObject = item;
					//$("#"+mVideoBoxId)['append']($("#"+id));
				}
			} else
				v.handled = true;
			if (v != null) {
				v.isMain = false;
				v.top = VIDEO_SMALL_HEIGHT * i;
				utilVideoRefreshCss(v, false, v.top, VIDEO_BIG_WIDTH, VIDEO_SMALL_HEIGHT, VIDEO_SMALL_WIDTH);
				utilVideoCleanEvent(v);
				utilVideoSetEvent(v);
				videoList.push(v);
			}
		});

		if (mVideoMain.videoObject != null && mVideoMain != videoMain && !mVideoMain.isHandled && mVideoMain.isMain)
			$("#" + mVideoMain.id)['remove']();
		if (videoMain != null)
			mVideoMain = videoMain;

		for (var i = 0; i < mVideoList.length; i++) {
			if (!mVideoList[i].handled) {
				$("#" + mVideoList[i].id)['remove']();
			}
		}

		mVideoMain.isHandled = false;
		mVideoList.length = 0;
		mVideoList = videoList;
		for (var i = 0; i < mVideoList.length; i++)
			mVideoList[i].handled = false;
	} else {
		mVideoMain.videoObject = null;
		$("#" + mVideoMain.id)['remove']();
		for (var i = 0; i < mVideoList.length; i++) {
			$("#" + mVideoList[i].id)['remove']();
		}
		mVideoList.length = 0;
		clearInterval(window['videoTimer']);
		$('.video_time')['text']('');
	}
}

/*
function uiVideoSwitchSmallToBig(smallId)
{
	var idx = -1;
	for (var i = 0; i < mVideoList.length; i ++)
	{
		if (mVideoList[i].id == smallId)
		{
			idx = i;
			break;
		}
	}
	
	if (idx != -1)
	{
		// Exchanged big and small
		var v = mVideoMain;
		
		mVideoMain = mVideoList[idx];
		mVideoMain.isMain = true;
		mVideoMain.top = VIDEO_BOX_TOP;
		mVideoList[idx] = v;
		mVideoList[idx].isMain = false;
		mVideoList[idx].top = VIDEO_SMALL_HEIGHT * idx;
		
		// Fill style
		utilVideoRefreshCss(mVideoMain, true, VIDEO_BOX_TOP, VIDEO_BOX_LEFT, VIDEO_BIG_HEIGHT, VIDEO_BIG_WIDTH);
		utilVideoRefreshCss(mVideoList[idx], false, mVideoList[idx].top, VIDEO_BIG_WIDTH, VIDEO_SMALL_HEIGHT, VIDEO_SMALL_WIDTH);
		utilVideoSetEvent(mVideoList[idx]);
	}
}

function uiVideoSwitchBigToSmall()
{
	
}
*/


//----------------------------------------------------------
//
//	Util: Video view refresh
//
//----------------------------------------------------------

function utilVideoEntryFindByObject(videoObject) {
	var v = null;
	if (mVideoMain.videoObject == videoObject) {
		v = mVideoMain;
	} else {
		for (var i = 0; i < mVideoList.length; i++) {
			if (mVideoList[i].videoObject == videoObject) {
				v = mVideoList[i];
				break;
			}
		}
	}
	return v;
}


//----------------------------------------------------------
//
//	Util: Video drag
//
//----------------------------------------------------------

function utilVideoDragStart(e, video) {
	if (!video.isMain) {
		$("#" + video.id)['fadeTo'](20, 0.5);
		$("#" + mVideoMain.id)['css']("z-index", 0);
		for (var i = 0; i < mVideoList.length; i++) {
			if (mVideoList[i].id != video.id) {
				$("#" + mVideoList[i].id)['css']("z-index", 0);
				mVideoList[i].drag = false;
				video.dragX = 0;
				video.dragXDelta = 0;
				video.dragY = 0;
				video.dragYDelta = 0;
			} else {
				mVideoListDragIndex = i;
				$("#" + mVideoList[i].id)['css']("z-index", 1);
			}
		}
		video.dragX = e.pageX;
		video.dragY = e.pageY;
		video.drag = true;
		video.dragFlag = false;
		//if (doVideoListDragStart != null)
		//	doVideoListDragStart();
	}
	e.preventDefault ? e.preventDefault() : e.returnValue = false;;
}

function utilVideoDragStop(e, video) {
	if (!video.isMain) {
		var idx = -1;
		$("#" + video.id)['fadeTo']("fast", 1);
		for (var i = 0; i < mVideoList.length; i++) {
			mVideoList[i].top = VIDEO_SMALL_HEIGHT * i;
			utilVideoRefreshCss(mVideoList[i], false, mVideoList[i].top, VIDEO_BIG_WIDTH, VIDEO_SMALL_HEIGHT, VIDEO_SMALL_WIDTH);
			if (mVideoList[i].id == video.id)
				idx = i;
		}
		video.top += video.dragYDelta;
		if (VIDEO_BIG_WIDTH + video.dragXDelta < VIDEO_BIG_WIDTH - VIDEO_SMALL_WIDTH) {
			if (doVideoListToBig != null) {
				doVideoListToBig(video.videoObject);
			}
		} else if (mVideoListDragIndex >= 0 && mVideoListDragIndex != idx) {
			videoSessionList.move(mVideoList[mVideoListDragIndex].videoObject, (idx - 1 < 0) ? null : mVideoList[idx - 1].videoObject);
		}
		if (doVideoListDragStop != null)
			doVideoListDragStop();

		mVideoListDragIndex = -1;
		video.dragFlag = false;
		video.drag = false;
		video.dragX = 0;
		video.dragXDelta = 0;
		video.dragY = 0;
		video.dragYDelta = 0;
	}
}

function utilVideoDrag(e, video) {
	if (!video.isMain && video.drag) {
		var deltaX = e.pageX - video.dragX;
		var deltaY = e.pageY - video.dragY;
		video.dragXDelta = deltaX;
		//console.log("X:"+(VIDEO_BIG_WIDTH + deltaX));
		if (VIDEO_BIG_WIDTH + deltaX > VIDEO_BIG_WIDTH - VIDEO_SMALL_WIDTH &&
			video.top + deltaY >= -(VIDEO_SMALL_HEIGHT / 2) && video.top + deltaY <= (VIDEO_SMALL_HEIGHT * (mVideoList.length - 1) + (VIDEO_SMALL_HEIGHT / 2))) {
			video.dragYDelta = deltaY;
			for (var i = 0; i < mVideoList.length; i++) {
				if (mVideoList[i].id != video.id) {
					if (mVideoList[i].top > 0 && mVideoList[i].top - (video.top + deltaY) > 0 && mVideoList[i].top - (video.top + deltaY) < VIDEO_SMALL_HEIGHT / 2) {
						mVideoList[i].top -= VIDEO_SMALL_HEIGHT;
						$("#" + mVideoList[i].id)['css']("top", (mVideoList[i].top) + "px");
						if (i > 0) // exchange
						{
							var v = mVideoList[i - 1];
							mVideoList[i - 1] = mVideoList[i];
							mVideoList[i] = v;
						}
						for (var i = 0; i < mVideoList.length && mVideoList[i].id != video.id; i++)
							mVideoList[i].top = VIDEO_SMALL_HEIGHT * i;
						break;
					} else if ((video.top + deltaY) - mVideoList[i].top > 0 && (video.top + deltaY) - mVideoList[i].top < VIDEO_SMALL_HEIGHT / 2) {
						mVideoList[i].top += VIDEO_SMALL_HEIGHT;
						$("#" + mVideoList[i].id)['css']("top", (mVideoList[i].top) + "px");
						if (i < mVideoList.length - 1) // exchange
						{
							var v = mVideoList[i + 1];
							mVideoList[i + 1] = mVideoList[i];
							mVideoList[i] = v;
						}
						for (var i = 0; i < mVideoList.length && mVideoList[i].id != video.id; i++)
							mVideoList[i].top = VIDEO_SMALL_HEIGHT * i;
						break;
					}
				}
			}
			$("#" + video.id)['css']("top", (video.top + video.dragYDelta) + "px");
			if (!video.dragFlag)
			{
				if (doVideoListDragStart != null)
					doVideoListDragStart();
				video.dragFlag = true;
			}
		}
		$("#" + video.id)['css']("left", (VIDEO_BIG_WIDTH + deltaX) + "px");
	}
}


//----------------------------------------------------------
//
//	Util: Video others
//
//----------------------------------------------------------

function utilVideoRefreshCss(video, is_big_video, top, left, height, width) {
	$("#" + video.id)['css']("top", top + "px");
	$("#" + video.id)['css']("left", left + "px");
	$("#" + video.id)['css']("height", height + "px");
	$("#" + video.id)['css']("width", width + "px");
	$("#" + video.id)['css']("position", is_big_video ? "fixed" : "absolute");
	if (!is_big_video) {
		$("#" + video.id)['css']('border-left', '3px solid #272726');
	} else {
		$("#" + video.id)['css']('border-left', 'none');
	}
}

function utilVideoSetEvent(video) {
	$("#" + video.id)['mousedown'](function(e) {
		utilVideoDragStart(e, video);
	});
	$("#" + video.id)['mouseup'](function(e) {
		utilVideoDragStop(e, video);
	});
	$("#" + video.id)['mouseout'](function(e) {
		utilVideoDragStop(e, video);
	});
	$("#" + video.id)['mousemove'](function(e) {
		utilVideoDrag(e, video);
	});
}

function utilVideoCleanEvent(video) {
	$("#" + video.id)['off']('mousedown');
	$("#" + video.id)['off']('mouseup');
	$("#" + video.id)['off']('mouseout');
	$("#" + video.id)['off']('mousemove');
}