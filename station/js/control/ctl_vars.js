
var g_isExit = false;

var UI_RESULT_OK = 0;
var UI_LOGIN_RESULT_OK=0;
var UI_LOGIN_RESULT_ERR_SINGLE = 10;

var SESSION_STATE_IDLE=0;         //空闲状态
var SESSION_STATE_CONNECTING=1;   //连接状态
var SESSION_STATE_DIALOG=2;       //连接成功后会话状态

var SESSION_RELEASE_REASON_GENERAL = 0;//正常
var SESSION_RELEASE_REASON_ERROR = 1;
var SESSION_RELEASE_REASON_NOTREACH = 2;//不在线
var SESSION_RELEASE_REASON_BUSY = 3;//对方忙
var SESSION_RELEASE_REASON_FORBIDDEN = 4;//呼叫禁止、呼叫限制等
var SESSION_RELEASE_REASON_REJECTED = 5;//对方拒接
var SESSION_RELEASE_REASON_NOANSWER = 6;//无应答
var SESSION_RELEASE_REASON_EXPIRE = 7;//超时
var SESSION_RELEASE_REASON_FREQUENTLY = 8;//呼叫频率过高
var SESSION_RELEASE_REASON_NETWORK_TERMINATE = 9;//网络不通
var SESSION_RELEASE_REASON_ISB = 10;//对方设置了免打扰

var MEDIA_STATE_IDLE = 0;					//空闲状态
var MEDIA_STATE_TALKING = 1;			//我在讲话的讲话
var MEDIA_STATE_LISTENING = 2;		//别人在讲话的状态

var MEDIA_TALK_FINISH_REASON_RELEASED = 0;					//正常释放话语权
var MEDIA_TALK_FINISH_REASON_GRABED = 1;						//被高级别抢断
var MEDIA_TALK_FINISH_REASON_TIMEOUT = 2;						//网络状况不好，一直未申请到话语权
var MEDIA_TALK_FINISH_REASON_TIMEUP = 3;						//发言时间到
var MEDIA_TALK_FINISH_REASON_EXCEPTION = 4;					//网络状况不好，服务器收回了话语权
var MEDIA_TALK_FINISH_REASON_LISTEN_ONLY = 5;				//没有发言权限（仅听）
var MEDIA_TALK_FINISH_REASON_SPEAKING_FULL = 6;			//对方结束讲话后才能发言

var MESSAGE_TYPE_TEXT = 2;					//文本消息
var MESSAGE_TYPE_PICTURE = 4;				//图片消息
var MESSAGE_TYPE_RECORD = 5;				//录音消息
var MESSAGE_TYPE_RECORD_PTT = 13;			//录音消息（PTT）
var MESSAGE_TYPE_VIDEO = 6;					//视频消息
var MESSAGE_TYPE_VIDEO_PULL = 21;		//视频拉取消息
var MESSAGE_TYPE_LOCATION = 8;				//位置消息
var TYPE_LOCATION_SHARE_POINT = 12;         //位置共享
var MESSAGE_TYPE_VIDEO_STORE = 16;			//录制视频转发消息


var USER_STATE_ON_LINE = 1;//shangxian
var USER_STATE_BGONLINE = 2;
var USER_STATE_OFFLINE = 3;//xiaxian


var USER_SESSION_STATE_ON_LINE = 1;
var USER_SESSION_STATE_OFF_LINE = 2;



var	M_MESSAGE_SEND_STATE_NONE = 0;
var	M_MESSAGE_SEND_STATE_RES_DOING = 1;
var	M_MESSAGE_SEND_STATE_RES_FAIL = 2;
var	M_MESSAGE_SEND_STATE_SENDING = 3;//zhong
var	M_MESSAGE_SEND_STATE_RESULT_OK = 4;//suss
var	M_MESSAGE_SEND_STATE_RESULT_FAIL = 5;//fail