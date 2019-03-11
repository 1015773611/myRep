var CHANNEL_list;
var TELL_list;
var loginMe=getDAes($.cookie('loginId'));
var help_readPrev;

var Meidafirstdata;
var Helpfirstdata;
var HelpSearchType;
var HelpDetailsArray=[];
var HelpDetailsRadio=[];
var HelpDetailsWarns=[];
var helpselectid=[];
var MediaSearchType;
var meidaselectid=[];
var mediaDetailarray=[];
var task_select=true;
var task_arrlist=[];
var namelistVal=[];
var Ullistarr=[]; // 左侧菜单记录数组
 /***================****/
var Helpfirstdatahash=new HashMap(); 
var Mainuserlistarr=[];
var User_stateLine=true;
var Radio_MoreDiv;
var MAIN_TOPHT=80;

// var GetMsgUrl='http://112.33.9.251:4489/station/mobile/serverapi.action'; 

 
// var AJAXSET_TIME=300000;
var AJAXSET_TIME=300000;
var onlineUsersMarkers = new HashMap(); //在线成员marker
var AllUsersMarkers = new HashMap(); //全部成员marker
var mapMonitorUser = []; //监控成员列表
var usersAll = new HashMap(); //全部成员信息10115
var onlineInfo = new HashMap(); //在线用户
var user_MapwindowId;
var jianKongUsers = [];//添加监控的成员
var jianKongMarkers = new HashMap();
var monitorMark = false;
var Media_veTime;
var Media_veTimeTotal=50000;
var Top_circlenum=0;
var Map_SearchMarkerarr=[];
var IM_marker;
var Local_baidu;
var Channel_MSGuser=null;
