 
var HelpDownImgs = [];
var Helplistcon=[];
var HelpcordeArray = [];
var Helpmorecode=[];
var Helpnumread;
var HelparrayLength;
var HelpNull;
var Pulley_total;
var Pulley_databody;
var Pulley_jilu = 1;
var pointArray_lsjl = [];
var Help_Searchimgicon=true;
//var Pulley_judge = false;
var channel_column1 = "-260px";
var channel_column2 = "-180px";

var help = {
	_high: function() {
		Map_Lineclear();
		var wH = $(window).height() - 80;
		//$('.right-side').height(wH);
		//$('.sec-fun').height(wH);
		$('.ht1help').height(wH - 213);
		$('.hthelp').height(wH - 145);
		$('.ht3').height(wH - 157);
		$('.itemwrap').height(wH - 184);
		$('.helpleft_icon ').css('top', (wH - 60) / 2);
		$('.help_leve2_icon ').css('top', (wH - 60) / 2);
        $('.help_user').css('margin-left',"80px");
	},
	
	_init: function() {
		// var tab = 0;
		// var tab1 = 0; 
		// setTimeout(function (){
		// 	// $('#loaded').append('<h3 class="help_wu">暂无数据</h3>');
		// 	$('#loading').hide();
		// 	$('#loaded').show();
		// },1000);
		$('#HelpTimestart').fdatepicker({format: 'yyyy-mm-dd'});
		$('#HelpTimesover').fdatepicker({format: 'yyyy-mm-dd'});
		$('.choose').click(function(event) {
			if ($('.choose-sec').is(":hidden")) {
				$('.cho-img').attr('src', 'img/icon/channel/channel_search2.png');
				$('.choose-sec').show();
				$('.HelpCsearchs').val('');
				$('#loadeds').hide();
				$('#loaded').show();
				$('.date-img').attr('src', 'img/icon/date.png');
				$('.date-icon').hide();
				$('#ca').hide();
				$('#help-count').hide();
				Help_Searchimgicon=false;
				// tab = 1;
				// tab1 = 0;
			} else {
				Help_Searchimgicon=true;
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('.choose-sec').hide();
				// tab = 0;
			}
			event.stopPropagation();
		});
		$('.choose').hover(function() {
            if(Help_Searchimgicon){
               $('.cho-img').attr('src', 'img/icon/channel/channel_search2.png');
            }
		}, function() {
			 if(Help_Searchimgicon){
			 	$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
            }
		});

		$('.date-img').click(function() {
			if (tab1 == 0) {
				$('.date-img').attr('src', 'img/icon/date2.png');
				$('.date-icon').show();
				$('#ca').show();
				$('#help-count').show();
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('.choose-sec').hide();
				tab1 = 1;
				tab = 0;
			} else {
				$('.date-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('.date-icon').hide();
				$('#ca').hide();
				$('#help-count').hide();
				tab1 = 0;
			}
		});

		$('.choose-sec').find("li").find('a').click(function() {
			if ($(this).hasClass('select1')) {
				$(this).removeClass('select1');
			} else {
				$(this).addClass('select1');
				$(this).parent().siblings().find('a').removeClass('select1');
			}
		});
         
		//	checkBox();
		$('.helpforward').on('click', function() {
			var share=$(this).parents('.sec-fun-top').children('.help_level2_share');
			if(share.is(':hidden')){
               $(this).parent().siblings('.help_level2delete').slideUp();
              $(this).prev().children('img').attr('src','img/icon/newicon/help_download.png');
               $(this).children('img').attr('src','img/icon/newicon/shareing.png');
               $(this).next().children('img').attr('src','img/icon/newicon/help_deleted.png');
               share.slideDown('slow');
			}else{
			$(this).children('img').attr('src','img/icon/newicon/help_share.png');
               share.slideUp('slow');
			}
		})

		$('.help_level2_shareno').on('click', function() {
			$('.helpforward').children('img').attr('src','img/icon/newicon/help_share.png');
			$('.help_level2_share').hide();
		})

		$('.media_channelmainul1').outerHeight($(window).height() - 305);
		$('.media_channeltellmainul1').outerHeight($(window).height() - 305);
		$('.media_memberl').outerHeight($(window).height() - 233);
		$('#media_memberselect1').outerHeight($(window).height() - 174);
		$('#help_memberselect1').outerHeight($(window).height() - 174);

	 
		$('.helpCancel').on('click', function() {
			hcel();
		})
		$('.helpchatcannel').on('click', function() {
			hcel();
		})
		$('.help-usersNo').on('click', function() {
			hcel();
			$('#help-users').hide();
			treeAddUsers.clear();
		})


		$('.helpselect').children().on('click', function() {
			var media_index = $(this).index();
			var val2 = $('.media_transmitsearchbox ').children('input').val('');
			var val = '';

			treeAddUsers.clear();
			HelpTrsearch(val, val2);
			if (media_index == 0) {

				$('.media_channelmain').show().siblings().hide();
				$('#help-users').hide('slow');
				$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');

			} else if (media_index == 1) {

				$('.media_channeltellmain').show().siblings().hide();
				$('#help-users').hide('slow');
				$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');

			} else if (media_index == 2) {
				inintHelpFtree();
				$('#helpAllman').find('input').attr('checked', false);
				$('#help_memberselect1').empty();
				$('.media_memberl').show().siblings().hide();
				$('#media_memberselect1').empty();
				$('#help-users').show('slow');
				$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
				zTreeOnAsyncSuccess('helptree');
			}
		})

		$(document).on('click', function() {
			if ($('#station_helper').css('display') === 'block') {
				$('.choose-sec').hide();
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
			}
		})

		$('.choose-sec').on('click', function (event) {
			event.stopPropagation();
		})

	},
	_item: function(i) {
		$('.sec-fun').hide();
		$('.help_btn').hide();
		if (i == 0) {
			$('.helpImgVideo').show('slow');
		} else if (i == 1) {
			$('.helpFence').show('slow');
		} else if (i == 2) {
			$('.helpBroadcast').show('slow');
		} else if (i == 3) {
			$('.helpNotice').show('slow');
		}
	}
}

var data = [{
	value: 20,
	color: "#318AC3"
}, {
	value: 40,
	color: "#FF8B00"
}, {
	value: 90,
	color: "#00C5E2"
}, {
	value: 30,
	color: "#E80001"
}];


var reportTimefrom,
	reportTimeto,
	reportIndex = 0,
	reportPagesize = 30,
	traclObj;

reportTimefrom = "2017-07-11 11:30:00";
reportTimeto = '2017-07-11 17:40:00';
//========================================
//和助手转发相关操作
//========================================
function hcel() {
	$('.help_transmit1').hide();
	$('.helpImgVideo').show();
	$('.help_user').show();
    $('.media_transmitsearch ').val('');  
}

function help_transmit(self) {
	$('.helpforward').children('img').attr('src','img/icon/newicon/help_share.png');
	$('.helpImgVideo').hide();
	$('.help_user').hide();
	$(self).parent().slideUp();
	$('.sec-fun-wrap').find('.media_level2_share').hide();
	$('.help_transmit1').show();
	media_ul2();
	media_tellul2();
	HelpTrsearchfint();
	var cla = $('.helpselect').children('span');
	cla.removeClass('meidia_transmitbg');
	cla.eq(0).addClass('meidia_transmitbg');
	$('.media_channelmain').show().siblings().hide();

}


// function helpaddtree(event, treeId, treeNode) {
	// var html = '';
	// var select = treeNode.checked;
	// var HelpSelect =[];
	// $('#help_memberselect1').children().each(function(i) {
	// 	HelpSelect.push($('#help_memberselect1').children('li').eq(i).attr('name'));
	// })
	// if (select) {
	// 	var arraynum = $.inArray(treeNode.id, HelpSelect);
	// 	if (arraynum > -1) {
	// 		return
	// 	}
	// 	html = '<li name="' + treeNode.id + '" class="channeladdmanlist" name="channelman"><i>' + treeNode.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>'

	// 	$('#helpAllman').children('li[user=' + treeNode.id + ']').children('input').prop('checked', true);

	// 	$('#help_memberselect1').append(html);
	// } else {
	// 	$('#help_memberselect1').children('li[name="' + treeNode.id + '"]').remove();
	// 	$('#helpAllman').children('li[user=' + treeNode.id + ']').children('input').attr('checked', false);

	// }
// }


function helpchanForward(id, name) {
	var ul = $('.help_main_ul');
	var type = ul.find('.help_bgs').attr('types');
	var len = ul.find('.help_bgs').attr('len');
	var ids = ul.find('.help_bgs').attr('id');
	var reg = /[0-9]+/;
	var ide = ids.match(reg);
	var arrlen=[];
	$('#' + id).find(".userall_selected").each(function() {
		 var cid =$(this).attr('cid');
             arrlen.push(cid);
	})
	if(arrlen.length==0){
		 showAlert('请选择转发对象！');
		 return;
	}
	if (type == 0 && len <= 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		$('#' + id).find(".userall_selected").each(function() {
			var cid = $(this).attr('cid');
			session_message_forward(cid, state, url);
			$(this).prop('checked', false);
		});
		hcel();
		showAlert('转发成功！');
		return;
	}
	if (type == 0) {
		var state = MESSAGE_TYPE_PICTURE;
		HelpTrant(ide,0,id,state)
		// var arry = HelpTrant(ide, 0);
		// var state = MESSAGE_TYPE_PICTURE;
		// $('#' + id).find(".userall_selected").each(function() {
		// 	var cid = $(this).attr('cid');
		// 	for (var k = 0; k < arry.length; k++) {
		// 		var url = arry[k];
		// 		session_message_forward(cid, state, url);
		// 	}
		// 	$(this).prop('checked', false);
		// });
		// hcel();
		// showAlert('转发成功！');
	} else if (type == 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_VIDEO_STORE;
		$('#' + id).find(".userall_selected").each(function() {
			var cid = $(this).attr('cid');
			session_message_forward(cid, state, url);
			$(this).prop('checked', false);
		});
		hcel();
		showAlert('转发成功！');
	} else if (type == 2) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		$('#' + id).find(".userall_selected").each(function() {
			var cid = $(this).attr('cid');
			session_message_forward(cid, state, url);
			$(this).prop('checked', false);
		});
		hcel();
		showAlert('转发成功！');
	} else if (type == 3) {
		// var arry = HelpTrant(ide, 3);
		var state = MESSAGE_TYPE_VIDEO_STORE;
		HelpTrant(ide,3,id,state);
		// $('#' + id).find(".userall_selected").each(function() {
		// 	var cid = $(this).attr('cid');
		// 	for (var k = 0; k < arry.length; k++) {
		// 		var url = arry[k];
		// 		session_message_forward(cid, state, url);
		// 	}
		// 	$(this).prop('checked', false);
		// });
		// hcel();
		//  showAlert('转发成功！');
	}
}

function HelpTrant(ide,type,id,state) {
	// var ARRAY;
	// $.ajaxSettings.async = false;
	var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + ide + '\","ResType":\"' + type + '\"}}';
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				    $('#' + id).find(".userall_selected").each(function() {
				    	var cid = $(this).attr('cid');
				    	for(var i=0;i<ret.ResUrls.length;i++){
				    		session_message_forward(cid,state,ret.ResUrls[i]);
				    	}
				    }) 
				    hcel();
		            showAlert('转发成功！');	 
			}else{ 
				showAlert('转发失败!');
			}
		})
}
 



function helpforwardTouser() {
	treeAddUsers.clear();
	var arrlen=[];
	 $('#help_memberselect1').children('li').each(function(){
	 	  var id = $(this).attr('name');
	 	  arrlen.push(id);
	 })
	 if(arrlen.length==0){
	 	showAlert('请选择转发对象！');
	 	return;
	 }

	 HelpTrantCreat();
    return;
   /*************/
	// var ul = $('.help_main_ul');
	// var type = ul.find('.help_bgs').attr('types');
	// var len = ul.find('.help_bgs').attr('len');
	// var ids = ul.find('.help_bgs').attr('id');
	// var reg = /[0-9]+/;
	// var ide = ids.match(reg);

	if (type == 0 && len <= 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
		return;
	}
	if (type == 0) {
		var arry = HelpTrant(ide, 0);
		var state = MESSAGE_TYPE_PICTURE;
		for (var k = 0; k < arry.length; k++) {
			var url = arry[k];
			session_message_forward(cid, state, url);
		}
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
	} else if (type == 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_VIDEO_STORE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
	} else if (type == 2) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
	} else if (type == 3) {
		var arry = HelpTrant(ide, 3);
		var state = MESSAGE_TYPE_VIDEO_STORE;
		for (var k = 0; k < arry.length; k++) {
			var url = arry[k];
			session_message_forward(cid, state, url);
		}
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
	}
}

function HelpTrantCreat() {
	var arr = [];
	var name = '';
	var Hid;
	$('#help_memberselect1').find('li').each(function(index, el) {
		var id = $(this).attr('name');
		var m = $(this).find('i').text();
		if (index < 2) {
			name += m;
		}
		arr.push(id);
	})
	arr = JSON.stringify(arr);
	name = encodeURI(encodeURI(name));
	// $.ajaxSettings.async = false;
	var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + name + '","Members":' + arr + ',"Match":1}}';
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		if (ret.Result == 200) {
			// Hid = ret.ConversationId;
			HelpTrantGetIdshow(ret.ConversationId);
		}else{
			showAlert('转发失败!');
		}
	})
	// return Hid;
}

function  HelpTrantGetIdshow (cid) {
    var ul = $('.help_main_ul');
	var type = ul.find('.help_bgs').attr('types');
	var len = ul.find('.help_bgs').attr('len');
	var ids = ul.find('.help_bgs').attr('id');
	var reg = /[0-9]+/;
	var ide = ids.match(reg);

	if (type == 0 && len <= 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		showAlert('转发成功！');
		return;
	}
	if(type==0){
		var state = MESSAGE_TYPE_PICTURE;
		HelpTrantCreatChannltell(ide,0,state,cid);
	}else if (type == 1) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_VIDEO_STORE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		 showAlert('转发成功！');
	} else if (type == 2) {
		var url = ul.find('.help_bgs').attr('ulr');
		var state = MESSAGE_TYPE_PICTURE;
		session_message_forward(cid, state, url);
		$('#help-users').hide();
		$('#help_memberselect1').empty();
		hcel();
		showAlert('转发成功！');
	}else if(type == 3){
		var state = MESSAGE_TYPE_VIDEO_STORE;
		HelpTrantCreatChannltell(ide,3,state,cid);
	}	 
}

function  HelpTrantCreatChannltell (ide, type, state, cid) {
	var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + ide + '\","ResType":\"' + type + '\"}}';
     $.getJSON(STATION_URL + '?Body=' + body,
        function(ret) {
          if (ret.Result == 200) {
               for(var i=0;i<ret.ResUrls.length;i++){
                  session_message_forward(cid, state, ret.ResUrls[i]);
               }
               $('#help-users').hide();
		$('#help_memberselect1').empty();
               hcel();
               showAlert('转发成功！');
          }else{
            showAlert('转发失败!');
          }
        })
}

///////////以下是轨迹回放的内容/////////////
function getTrack() {
	var uid = loginId;
	var TimeFrom = "2017-03-09 18:29:12";
	var TimeTo = "2017-03-27 16:05:21";
	var LocationType = 0;
	var tPageSize = 30;
	var tPageIndex = 0;
	var body = '{"Code":10201,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uid + '\","TimeFrom":\"' + TimeFrom + '\","TimeTo":\"' + TimeTo + '\","LocationType":' + LocationType + ',"PageSize":' + tPageSize + ',"PageIndex":' + tPageIndex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {

		}
	)
}

function getNowPos (ele) {
	var uid = $(ele).parent().siblings('.squaredbox').children('input').attr('id');
	uid = uid.slice(0, uid.length - 2);
	var body = '{"Code":10200,"Body":{"SessionId":\"' + sessionId + '\","Uids":[\"' + uid + '\"]}}';
	var body1 = '{"Code":10112,"Body":{"SessionId":\"' + sessionId + '\","Uids":[\"' + uid + '\"]}}';
	var x, y, t,user_type;
    user_MapwindowId=uid;
	traclCancel();
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if (ret.Result == 200) {
				x = ret.Locations[0].BaiduLongitude;
				y = ret.Locations[0].BaiduLatitude;
				t = ret.Locations[0].Time;
				user_type=ret.Locations[0].Type;
				if (x == '' || y == '' || t == '') {
					showAlert('没有找到此成员的位置信息！');
				} else {
					$.getJSON(STATION_URL + '?Body=' + body1,
						function(ret) {
							if (ret.Result == 200) {
								ret = ret.Users[0];
								markshowBaidu(x, y, t, uid, ret,user_type);
							} else {
								showAlert('获取定位用户信息失败，请重新定位！');
							}
						}
					)
				}
			}
		}
	)
}

function helpgetpos (data) {
	var uid = $(data).parent().attr('user_id');
	    channel_positon_get(uid);
	$(data).children('img').attr('src','img/icon/newicon/help_locations.png');
	$(data).next().children('img').attr('src','img/icon/newicon/help_download.png');
	$(data).next().next().children('img').attr('src','img/icon/newicon/help_share.png');
	$(data).next().next().next().children('img').attr('src','img/icon/newicon/help_deleted.png');
	
	 
}
 // 	function openInfoWindowBaidu(marker,title,content,enableAutoPan)
	// {
	// 	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, 
	// 	{
	// 	    title: title, //标题
	// 	    panel : "panel", //检索结果面板
	// 	    enableAutoPan : enableAutoPan, //自动平移
	// 	    enableSendToPhone : false,
	// 	    searchTypes :[
	// 	    ]
	// 	}); 
	// 	searchInfoWindow.open(mediamarker);
	// 	searchInfoWindow.addEventListener("close",removemeidamarker);
	// }
	 
// var img = online.indexOf(id) == -1 ? '<img src="img/chat/outline.png" alt="" />' : '<img src="img/chat/online.png" alt="" />';
// 		var content = '<div id="markInfoMessage">' + img + '<h4>' + res.Name + '</h4><ul class="mark_ul1"><li>账户:<span class="markInfoMessage_id">' + id + '</span></li>' +
// 		'<li><span style="margin:0;float:left;">组织:</span><span class="markuserOrg">' + res.OrgName + '</span></li><li>电话:<span class="markuserPho">' + res.Phone + '</span></li><li class="mark_ul1_last">时间:<span>' + t + '</span></li>' +
// 		'</ul><ul class="mark_ul2"><li class="mark_ul_li1" onclick="markerPhone(1)"></li><li class="mark_ul_li2" onclick="markerPhone(0)"></li><li class="mark_ul_li3" onclick="markerTracl()"></li></ul></div>';
 

function markshowBaidu(x, y, t, id, res, type) { //
	var point = new BMap.Point(x, y);
	map.centerAndZoom(point, 15);
	var opts = {
		enableCloseOnClick: false
	}
	var icon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(24, 24));
	var marker2 = new BMap.Marker(point, {
		icon: icon
	}); //创建mark
	var online = onlineInfo.keySet();
	res.Phone = res.Phone ? res.Phone : '';
	var img = online.indexOf(id) == -1 ? '<img src="img/chat/outline.png" alt="" />' : '<img src="img/chat/online.png" alt="" />';
	var user_online=online.indexOf(id) == -1 ? '离线' : '在线';
	var user_locationtype;
	 if(type!=undefined){
         if(type==1){
          
            user_locationtype='基站';

         }else{

            user_locationtype='GPS';

         }
	 }else{
         
         user_locationtype='';

	 }

		var content = '<div id="markInfoMessage" uid="'+id+'" uname="'+res.Name+'" class="fix">'+img+'<h4>' + res.Name  + '('+id +')</h4></div>' +
		 '<ul class="mark_ul1">' + '<li><span style="margin:0;float:left;">组织:</span><span class="markuserOrg" title="'+res.OrgName+'">' + res.OrgName + '</span></li><li>时间:<span>'+t+'</span></li><li>经度:<span>'+ y+ '</span></li><li>纬度:<span>'+x+ '</span></li><li>类型:<span>'+user_locationtype+ '</span></li></ul><div class="map_info"><ul class="mark_ul2 mark_margin fix"><li class="mark_ul_li1" onclick="markerPhone(1)"></li><li class="mark_ul_li2" onclick="markerPhone(0)"></li><li class="mark_ul_li3" onclick="markerTracl()"></li></ul></div>'; 
		

	var myInfoWindow = new BMap.InfoWindow(content, opts); //创建信息窗口对象
	traclObj = {
		id: id,
		mk: marker2,
		mf: myInfoWindow
	};
	map.addOverlay(marker2);
	marker2.openInfoWindow(myInfoWindow);
	myInfoWindow.addEventListener('close', function() {
		map.removeOverlay(marker2);
	})
}

function close_left_w(){
	var close_left_w_arrA = ["radio_border_r","fence","alert_level","help_user","user"];
	//var close_left_w_arrB = ["task_leftbtn","channel_right1","mediarights"];
	var close_left_w_arrB = ["task_leftbtn","mediarights"];
	var index_size;
	var index_name;
	$('.helpbd_btn').click();
	$('.helpfe_btn').click();
	$('.helpmv_btn').click();
	$('.task_detailsbtn').click();
	$('.mediaright2').click();
	$('.orge_btn').click();
	$('.channel2_left').click();
	$('.radio_btn2').click();
	$('.fence_content_btn').click();
	$('.warn2_btn').click();
	$('.task_detailsbtn').click();
	
	if($('.channel_tellall').css("display")!="none"){
		$('.channel_tellall').css("margin-left",channel_column2);
		$('.channel_left1').css("margin-left",channel_column1);
		$('.channel_right2').css('background-image', ' url(./img/right_icon.png)');
	}else{
		$('.channel_left1').css("margin-left",channel_column2);
		$('.channel_right1').show();
		$('.channel_right1').css('background-image', ' url(./img/right_icon.png)');
	}
		
	//$('.channel_right2').click();
//	$('.task_leftbtn').click();
//	$('.channel_right1').click();
//	$('.mediarights').click();
//	small_btn('radio_border_r');
//	small_btn('fence');
//	small_btn('alert_level');
//	small_btn('help_user');
//	small_btn('user');
//  small_btnMove();
	for(var k=0;k<close_left_w_arrB.length;k++){
		if(close_left_w_arrB[k]=="task_leftbtn"){
			 index_name = "task_first";
			 index_size = "-190px";
		}
		if(close_left_w_arrB[k]=="channel_right1"){
			 index_name = "channel_left1";
			 index_size = "-190px";
		}
		if(close_left_w_arrB[k]=="mediarights"){
			index_name = "meida_lefts";
			index_size = "-160px";
		}
		$('.'+ index_name).animate({
        	'margin-left': index_size
	    });
	    $('.'+close_left_w_arrB[k]).css('background-image', ' url(./img/right_icon.png)');
	}
	for(var i=0;i<close_left_w_arrA.length;i++){
		if(close_left_w_arrA[i]=="help_user"||close_left_w_arrA[i]=="user"){
			$('.' + close_left_w_arrA[i]).animate({
			'margin-left': '-160px'
			});
			$('.' + close_left_w_arrA[i]).find('.left_icon').css("background", "#bca48a url(./img/right_icon.png) no-repeat center center");

		}else{
			$('.' + close_left_w_arrA[i]).animate({
			'margin-left': '-190px'
			});
			$('.' + close_left_w_arrA[i]).find('.left_icon').css("background", "#bca48a url(./img/right_icon.png) no-repeat center center");
		}
	
	}
	
	var setmore = $('.moreset_border_r');
	   var more_btn = $('.more_btn');
	
    	if(setmore.css("margin-left") == '80px'){
    		more_btn.hide();
        $('.moreset_usershow').hide();
    		setmore.animate({
    			'margin-left': '-190px'
    		}, function (){
    			more_btn.show();
    			more_btn.css({
    				"background":"#bca48a url(./img/right_icon.png) no-repeat center center",
    			});	
          
          $('.moresetwr').attr('src','img/icon/more_set/more_set.png');

    		});
    	}
	
	
	Close_window();
}

function markerTracl() {
	
	if ($('.channel_details_main').height() != '0') {
		$('.channel_details_top').trigger('click');
	}
	luxianCloseFn();
	$('.monitor_label_user').hide();
    $('.manage_monite_user').hide();
	$('.tracl').show();
	

	if(Map_userbaidumyInfoWindow!=null){
       
        map.closeInfoWindow();
        Map_userbaidumyInfoWindow=null;

	}else{
		var marker = traclObj.mk;
	    var info = traclObj.mf;
	    if (marker) {
			map.removeOverlay(marker);
			marker.closeInfoWindow();
		}
	}
	markerTraclInit();
	$('.tracl_shm').text('00:00');
	var time = getNowTiming().slice(0, 5);
	$('.tracl_ehm').text(time);
	//	hmTime('tracl_ul');
	//	map.clearOverlays();
	traclReset_keep();
	$('.tracl_playimg').attr('src','img/icon/marker/tracl_close.png');
	getAllMarksData_show();
	isMarker=true;
}


function markerTraclUser() {
	if ($('.channel_details_main').height() != '0') {
		$('.channel_details_top').trigger('click');
	}
	luxianCloseFn();
	$('.monitor_label_user').hide();
    $('.manage_monite_user').hide();
	$('.tracl').show();
	var marker = traclObj.mk;
	var info = traclObj.mf;
	if (marker) {
		marker.closeInfoWindow();
	}
	markerTraclInit();
	$('.tracl_shm').text('00:00');
	var time = getNowTiming().slice(0, 5);
	$('.tracl_ehm').text(time);
	//	hmTime('tracl_ul');
	//	map.clearOverlays();
	traclReset_keep();
	$('.tracl_playimg').attr('src','img/icon/marker/tracl_close.png');
}

function markerTraclInit() {
	var h = $(window).height();
	var h1 = $('.tracl_top ').outerHeight(true);
	var h2 = $('.tracl_mid').outerHeight(true);
	var h3 = $('.tracl_progess').outerHeight(true);
	$('.tracl_footer').height(h - 70 - h1 - h2);
	$('#tracl_record').height($('.tracl_footer').height() - h3);
	$('.t_time').on('click', function() {
		if ($(this).find('.tracl_ul').is(':hidden')) {
			$('.tracl_ul').hide();
			$(this).find('.tracl_ul').show();
		} else {
			$(this).find('.tracl_ul').hide();
		}
	});

	$('.tracl_ul').on("click", "li", function() {
		$(this).parent().siblings("span").text($(this).text());
	});

	$('#traclStartTime').val(getTodayDate());
	$('#traclEndTime').val(getTodayDate());
	$('#traclStartTime').fdatepicker({format: 'yyyy-mm-dd'});
	$('#traclEndTime').fdatepicker({format: 'yyyy-mm-dd'});
	
	$('.tracl_point').on('click', function() {
		if ($(this).find('.tracl_ul2').is(':hidden')) {
			$('.tracl_ul2').show();
		} else {
			$('.tracl_ul2').hide();
		}
	})

	$('.tracl_ul2 li').on('click', function() {
		var t = $(this).text();
		$(this).parents('.tracl_point').find('span').text(t);
	})

	$('.tracl_set_img').on('click', function() {
		var set = $('.tracl_set');
		if (set.is(':hidden')) {
			set.show();
			$(this).attr("src", "img/icon/newicon/channel_sets.png")
		} else {
			set.hide();
			$(this).attr("src", "img/icon/newicon/channel_set.png")
		}
	})

	$('.tracl_set_bar').on('click', function() {
		var ul = $(this).find('.tracl_set_ul');
		if (ul.is(':hidden')) {
			$('.tracl_set_ul').hide();
			ul.show();
		} else {
			ul.hide();
		}
	})

	$('.tracl_set_ul li').on('click', function() {
		var t = $(this).html();
		$(this).parents('.tracl_set_bar').children('span').html(t);
	})
}

var tPageSize = 30;
var tPageIndex = 0;
var tCount;
var arrayLine = [];
var polyline = null;
var pathColour = "#F82815";
var pathWidth = 2;
var playspeed = 0.1;
var beginMarker = null;
var endMarker = null;
var markerMove = null;
var speedNum1 = 0;
var speedNum2 = 0;
var timercount = null;
var speedWidth;
var wlong = 0;
var isPlay = false;
var speedI = 0;
var isShowTrajectory = false;
var trajectoryNumber=0;
var pointArray;

function traclGetData() {
	close_left_w();
	pointArray_lsjl = [];
	var datestart = $('#traclStartTime');
	var dateend = $('#traclEndTime');
	var start = $('.tracl_shm');
	var end = $('.tracl_ehm');
	var date1 = new Date(datestart.val()).getTime();
	var date2 = new Date(dateend.val()).getTime();
	var startnum = parseInt(start.text(), 10);
	var endnum = parseInt(end.text(), 10);

	if (isPlay || speedI>0) {
		// return showAlert('轨迹开始播放，请结束后设置...');

			// map.removeOverlay(markerMove);
			
			
			   if (markerMove !== null) {
			   	        clearInterval(timercount);
						map.removeOverlay(markerMove);
						map.removeOverlay(polyline);
					    map.removeOverlay(beginMarker);
					    map.removeOverlay(endMarker);
					    $('.tracl_playimg').attr('src','img/icon/marker/tracl_close.png');
					    speedI=0;
					    isPlay=false;  
			        }		
	}

	
	if (date1 > date2) {
		showAlert('开始日期不能大于结束日期');
		return;
	}
	if (date2 > date1) {
		if (date2 - date1 == 86400000) {
			if (endnum > startnum) {
				end.text(start.text());
			}
		} else if (date2 - date1 > 86400000) {
			var thedate = new Date(date1 + 86400000);
			theday = thedate.getFullYear() + '-' + two(thedate.getMonth() + 1) + '-' + two(thedate.getDate());
			$('#traclEndTime').val(theday);
			end.text(start.text());
		}
	}
	
	$('#tracl_record').empty();
	arrayLine.length = 0;
	var uid = user_MapwindowId;
	var TimeFrom = datestart.val() + ' ' + start.text() + ':00';
	var TimeTo = dateend.val() + ' ' + end.text() + ':00';
	var LocationType = localTypeToNum($('.tracl_point_type').text());
	tPageIndex = 0;
	var body = '{"Code":10201,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uid + '\","TimeFrom":\"' + TimeFrom + '\","TimeTo":\"' + TimeTo + '\","LocationType":' + LocationType + ',"PageSize":' + tPageSize + ',"PageIndex":' + tPageIndex + '}}';
	console.log('获取轨迹'+body)
	console.log('begin', new Date());
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			console.log('end', new Date());
			console.log(ret);
			if (ret.Result == 200) {
				tCount = ret.PageTotalCount;
				if (tCount !== 0) {
					trajectoryNumber=0;
	 	            pointArray=new Array();
					showUserOnlinemapEmpty(onlineUsersMarkers);
					showUserOnlinemapEmpty(jianKongMarkers);
					traclRecordShow(ret, uid);
					$('.tracl_footer').show();
					retraclPlay();
				} else {
					$('.cover_loading').hide();
					$('.tracl_footer').hide();
					showAlert('该时间段内没有坐标数据！');
					//map.clearOverlays();					
				}
			}
			//			else{
			//				$('.tracl_footer').hide();
			//				showAlert('该时间段内没有坐标数据！');
			//				map.clearOverlays();
			//			}
			isMarker=true;
			
		}
	)
}
function traclRecordShow(data, uid) {
	isShowTrajectory = true;
	var TimeFrom = $('#traclStartTime').val() + ' ' + $('.tracl_shm').text() + ':00';
	var TimeTo = $('#traclEndTime').val() + ' ' + $('.tracl_ehm').text() + ':00';
	var LocationType = localTypeToNum($('.tracl_point_type').text());
	var html = '';
	var data = data.Locations;
	var type;
	// console.log(data.length);
	for (var i = 0, len = data.length; i < len; i++) {
		if(!isShowTrajectory)
		   return;
		type = data[i].Type==1?"基站":"GPS";
		html += '<li class="fix" onclick="clickPlayTrajectory(\''+trajectoryNumber+'\')" ><span class="fl">' + data[i].Time + '</span><span class="fr">' + type + '</span></li>';
		var point = new BMap.Point(data[i].BaiduLongitude, data[i].BaiduLatitude);
		var pointInfo = new Object();
		    pointInfo.point = point;
		    pointInfo.date = data[i].Time;
		    pointInfo.type = data[i].Type;
		    pointArray.push(pointInfo); 
		    arrayLine.push(point);
		    trajectoryNumber++;
		  	pointArray_lsjl.push(point);
		  	
	}
	//console.log(JSON.stringify(arrayLine))
	$('#tracl_record').append(html);
	totolTime();
	refreshPolyline();

	tPageIndex++;
	if (tPageIndex < tCount) {
		if(isShowTrajectory){
		var body = '{"Code":10201,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uid + '\","TimeFrom":\"' + TimeFrom + '\","TimeTo":\"' + TimeTo + '\","LocationType":' + LocationType + ',"PageSize":' + tPageSize + ',"PageIndex":' + tPageIndex + '}}';
		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			if(ret.Result === 200){
			    traclRecordShow(ret, uid);
		   }
		});
            }
	} else {
		traclRecordGotAll();
	}
	var v=map.getViewport(pointArray_lsjl);
	map.centerAndZoom(v.center,v.zoom);
}



function traclRecordGotAll() {
	// var len = $('#tracl_record').children('li').length;

	$('.cover_loading').hide();
}

function refreshPolyline() {
	if (polyline !== null) {
		map.removeOverlay(polyline);
	}
	setBeginMarkerBaidu();
	setEndMarkerBaidu();
	polyline = new BMap.Polyline(arrayLine, {
		strokeColor: pathColour,
		strokeWeight: pathWidth
	});
	map.addOverlay(polyline);
	map.setViewport(arrayLine);
}

function setBeginMarkerBaidu() {
	if (beginMarker !== null) {
		map.removeOverlay(beginMarker);
	}
	var myIcon = new BMap.Icon("img/icon/marker/tracl_markstart.png", new BMap.Size(43, 42));
	beginMarker = new BMap.Marker(arrayLine[0], {
		icon: myIcon
	});
	//	beginMarker.setTitle(pointArray[beginIndex].date); 
	map.addOverlay(beginMarker);
}

function setEndMarkerBaidu() {
	if (endMarker !== null) {
		map.removeOverlay(endMarker);
	}
	var myIcon = new BMap.Icon("img/icon/marker/tracl_markend.png", new BMap.Size(43, 42));
	var len = arrayLine.length - 1;
	endMarker = new BMap.Marker(arrayLine[len], {
		icon: myIcon
	});
	//	endMarker.setTitle(pointArray[trajectoryNumber-1].date); 
	map.addOverlay(endMarker);
}

//轨迹暂停
function traclPause() {
	clearInterval(timercount);
	if (isPlay == true) {
		isPlay = false;
		$('.tracl_playimg').attr('src', 'img/icon/marker/tracl_close.png');
	} else {
		isPlay = true;
		$('.tracl_playimg').attr('src', 'img/icon/marker/tracl_open.png');
	}
}

function retraclPlay() {
	$('.tracl_bar i').css('width', '0');
	speedNum1 = 0;
	speedNum2 = 0;
	wlong = 0;
	$('.pS1').text('00');
	$('.pS2').text('00');
}

//播放
function traclPlay() {
	var yellBar = $('.tracl_bar i').css('width');

	if (isPlay == true) {
		isPlay = false;
		$('.tracl_playimg').attr('src', 'img/icon/marker/tracl_close.png');
	} else {
		isPlay = true;
		$('.tracl_playimg').attr('src', 'img/icon/marker/tracl_open.png');
	}

	if (yellBar == '130px') {
		retraclPlay();
	}

	clearInterval(timercount);

	if (isPlay == true) {
		timingStart();
	}
	if (markerMove !== null) {
		map.removeOverlay(markerMove);
	}

	var myIcon = new BMap.Icon("img/icon/marker/marker_people.png", new BMap.Size(52, 57), {
		imageOffset: new BMap.Size(0, 0)
	});
	markerMove = new BMap.Marker(arrayLine[0], {
		icon: myIcon
	});
	map.addOverlay(markerMove);
	markerMoving();
}

function markerMoving() {
	var len = arrayLine.length;
	if (!len > 0) {
		// alert('请先获取轨迹！')
	}

	wlong = 130 * speedI / arrayLine.length;
	$('.tracl_bar i').css('width', wlong);

	markerMove.setPosition(arrayLine[speedI]);
	if (speedI < len && isPlay) {
		setTimeout(function() {

			speedI++;
			markerMoving();
		}, playspeed * 1000)
	}
	if (speedI == len) {

		setTimeout(function() {
			showAlert('轨迹播放结束！');
			speedI = 0;
			isPlay = !isPlay;
		}, 1300)
	}
}

function localTypeToNum(str) {
	if (str == "GPS") {
		str = 1;
	} else if (str == "基站定位") {
		str = 2;
	} else {
		str = 0;
	}
	return str;
}

//点击轨迹记录
function clickPlayTrajectory(index){
   		  if(markerMove != null)
   		  {
   			 map.removeOverlay(markerMove);
	      }
   		  
	      var myIcon = new BMap.Icon("img/icon/marker/marker_people.png", new BMap.Size(52, 57), {
		    imageOffset: new BMap.Size(0, 0)
	      });
	         
		  markerMove = new BMap.Marker(pointArray[index].point,{icon:myIcon});
		  var label  = new BMap.Label(pointArray[index].date,{offset:new BMap.Size(0,-20)});
		  markerMove.setLabel(label);
	      map.addOverlay(markerMove);
          var label = markerMove.getLabel();
          if(label != null)
       	  label.setContent(pointArray[index].date);
}


//状态保存功能
function traclStatusSave() {
	// if (isPlay || speedI>0) {
	// 	return showAlert('轨迹开始播放，请结束后设置...');
	// }

	$('.tracl_set').hide();
	$('.tracl_set_img').attr("src", "img/icon/newicon/channel_set.png");
	
	pathWidth = parseFloat($('.tracl_px').text(), 10);
	playspeed = parseFloat($('.tracl_speed').text(), 10);
	pathColour = $('.tracl_color i').css("background-color");
	
	totolTime();
	traclYellowBar();
	traclGetData();
}


function traclYellowBar() {
	
	// var t = Math.ceil(speedI * playspeed);
	// var t1 = Math.floor(t / 60); //分
	// var t2 = t % 60; //秒
	// t1 = two(t1);
	// t2 = two(t2);
	// speedNum1 = t1;//秒
	// speedNum2 = t2;
	$('.pS1').text('00');
	$('.pS2').text('00');//秒

	if (speedI > 0) {
		$('.tracl_bar i').width(Math.ceil(130 * speedI / arrayLine.length));
	}
}


//总时间
function totolTime() {
	var l = arrayLine.length;
	var t = Math.ceil(playspeed * l);
	var t1 = Math.floor(t / 60); //分
	var t2 = t % 60; //秒
	t1 = two(t1);
	t2 = two(t2);
	$('.pE1').text(t1);
	$('.pE2').text(t2);
	// speedWidth = Math.floor(130 / t);
}


//重置
function traclReset() {
	$('.tracl_speed').text('0.1s');
	$('.tracl_px').text('2像素');
	$('.tracl_color').html('<i class="c01"></i>');
 
}

function traclReset_keep() {
   
    $('.tracl_speed').text('0.1s');
	$('.tracl_px').text('2像素');
	$('.tracl_color').html('<i class="c01"></i>');

	pathWidth = parseFloat($('.tracl_px').text(), 10);
	playspeed = parseFloat($('.tracl_speed').text(), 10);
	pathColour = $('.tracl_color i').css("background-color");

}

function traclCancel() {
	//	map.clearOverlays();
	$('.tracl').hide();
	$('.tracl_footer').hide();
	$('.tracl_set_ul li').off('click');
	$('.t_time').off('click');
	$('.tracl_ul li').off('click');
	$('.tracl_point').off('click');
	$('.tracl_ul2 li').off('click');
	$('.tracl_set_img').off('click');
	$('.tracl_set_ul li').off('click');
	$('.tracl_set_bar').off('click');
	map.removeOverlay(markerMove);
	map.removeOverlay(polyline);
	map.removeOverlay(beginMarker);
	map.removeOverlay(endMarker);
	clearInterval(timercount);
	speedI=0;
	isPlay=false;
	isShowTrajectory = false;
	showMapInfo();	
	isMarker=true;
	
}


function timingStart() {
	timercount = setInterval(function() {
		speedNum1++;
		if (speedNum1 == 59) {
			speedNum1 = 0;//秒
			speedNum2++;//分
		}
		var text1 = two(speedNum1);
		var text2 = two(speedNum2);
		$('.pS2').text(text1);//秒
		$('.pS1').text(text2);
		var t1 = $('.pS1').text();
		var t2 = $('.pS2').text();
		var t3 = $('.pE1').text();
		var t4 = $('.pE2').text();
		// wlong += speedWidth;
		// wlong = 130 * speedI / arrayLine.length

		// $('.tracl_bar i').css('width', wlong);
		if (t1 == t3 && t2 == t4) {
			clearInterval(timercount);
			$('.tracl_playimg').attr('src', 'img/icon/marker/tracl_close.png');
			$('.tracl_bar i').css('width', '130')
		}
	}, 1000)
}

/*
 * 
 * 和助手相关功能
 * 
 */

function helperBtn(str) {
	$('.' + str).hide('slow', function() {
		$('.help_btn').show();
	});
}


function help11411numread () {
     var date = new Date();
	var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
	var timestart = '2005-10-23 11:46:12';
	// var  timestart=getTimefrom(30);
	var timestarts = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
	// $('#HelpTimestart').val(timestarts);
	// $('#HelpTimesover').val(timestarts);`
	var body = '{"Code":11414,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"", "TimeFrom":\"' + timestart + '\","TimeTo":\"' + timeover + '\" }}';
	console.log(body);
	var arr=[body];

   AjaxPostMsg (body, AJAXSET_TIME, help11411GetRead, help11411GeterrorRead, helpovertime, false, arr);

}

function help11411GetRead (data) {
   
     if(data.Result == 200) {
        Helpnumread=data.TotalCount;

         if(data.TotalCount>99){

           $('.helpnumsbg').html('99+');
           $('.helpnumsbg').show();
         }else if(data.TotalCount==0){
             $('.helpnumsbg').hide();

         }else{
             $('.helpnumsbg').html(data.TotalCount);
             $('.helpnumsbg').show();

         }

     }else {
        showAlert('获取数据失败！');
     }
}

function help11411GeterrorRead () {

}

/*和助手 总接口*/
function help11411() {
	var date = new Date();
	var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
	var timestart = '2005-10-23 11:46:12';
	// var  timestart=getTimefrom(30);
	var timestarts = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
	$('#HelpTimestart').val(timestarts);
	$('#HelpTimesover').val(timestarts);
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"", "TimeFrom":\"' + timestart + '\","TimeTo":\"' + timeover + '\","PageSize":30,"PageIndex":0}}';
	console.log(body);
	  if(Helpfirstdata!=undefined){
	   
         HelpGetlocalshow(Helpfirstdata);
	 	 return;
	 }
	HelpGetcontainer(body);
}

function helpLeves2(data) {
	$(data).parent().parent().addClass('help_bgs').siblings().removeClass('help_bgs');
	$(data).parent().parent().parent().parent().parent().siblings().children('.help_main_ul').children().children().removeClass('help_bgs');
  var help_id = $(data).parent().parent().attr('id');
  var helpreg = /[a-zA-Z]/g;
  var  help_ids=help_id.replace(helpreg,"");
  if($('.helpImgVideo').is(':hidden')){
      GetHelpReportImgs(data);
      return; 
  }else{
     var resid=$('.helpImgVideo').attr('resid');
     if(resid==help_ids){
       $('.helpImgVideo').hide('slow');
       setTimeout(function(){
       	  $('.help_btn').show();
       },700);
       return;
     }else{
      	GetHelpReportImgs(data);
     }
  }
}

function GetHelpReportImgs(data){
   	$('.sec-fun').hide();
	$('.help_btn').hide();
	$('.HelpNote').show();
	$('#Helptext').show();
	$('#help_location').show();
	helplevel2inint();
	var len = $(data).parent().parent().attr('len');
	var name = $(data).parent().parent().attr('username');
	var ulr = $(data).parent().parent().attr('ulr');
	var times = $(data).parent().parent().attr('time').slice(0,16);
	var detail = $(data).parent().parent().attr('Detail');
	var type = $(data).parent().parent().attr('types');
	var user_id = $(data).parent().parent().attr('user_id');
	var help_id = $(data).parent().parent().attr('id');
	var users = $(data).parent().parent().attr('users');
	var time = $(data).parent().parent().attr('time');
		$('.help_level2_imgshare').css("left","177px");
		$('.help_level2deleteimg').css("left","248px");
	var read = $(data).parent().parent().attr('read');
	var regs = new RegExp("<br>", "g");
	onlineIconStatus(users);
	// Help_Videoread(read, type, IDs)
		var cons = $(data).parent().parent().attr('con');
		var con = cons.replace(regs, "\n");
		$('#Helptext').val(con);
		$('#helpimgname').html(name);
		$('#helpimgtime').html(times);
		$('#helpimgdetail').html(detail);
		$('.helpfour').attr('user_id', '' + user_id + '');
		$('.helpfour').attr('help_id', '' + help_id + '');
		$('.helpfour').attr('types', '0');
		$('.helpfour').attr('time', '' + time + '');
		$('.fun-contect').hide();
		$('.helpfour').attr('ulr', '' + ulr + '');
		$('.Help_imgNums').show();
        $('.Help_ulone').empty();
		$('.Help_ultwo').empty();
		$('.Help_ultree').empty();

		var helpreg = /[a-zA-Z]/g;
        var  getid=help_id.replace(helpreg,"");
        $('.helpImgVideo').attr('resid',getid); 

        if(HelpDetailsArray.length==0){
           HelpGetmoreImg(read,getid); 
           return; 
        }else if(HelpDetailsArray.length==1){
                 var DetailId=HelpDetailsArray[0].ResId;
                 var DetailType=HelpDetailsArray[0].ResType;
	             if(DetailId==getid&&DetailType==0){
	                    HelpShowlocalDeatilsImg(HelpDetailsArray[0]);
	                  return;
	              }else{
                      HelpGetmoreImg(read,getid); 
                      return; 
	              }
        }else{
        	   var helpdetailscopy;
	            for(var i=0;i<HelpDetailsArray.length;i++){
	            	var DetailId=HelpDetailsArray[i].ResId;
	                var DetailType=HelpDetailsArray[i].ResType;
	                 if(DetailId==getid&&DetailType==0){
	                  helpdetailscopy=HelpDetailsArray[i];
	                }
	            }
              HelpShowlocalDeatilsImg(helpdetailscopy,read,getid);
        }  
}

function HelpShowlocalDeatilsImg(data,read,getid){
          if(data==undefined){
          	  HelpGetmoreImg(read,getid); 
              return; 
          }  
          $('.Help_ulone').empty();
		  $('.Help_ultwo').empty();
		  $('.Help_ultree').empty();
		            // $('.cover_loading').hide();
					// Help_Videoread(read,0, id); //数据
					HelpDownImgs = data.ResUrls;
					var imglen = data.ResUrls.length;
					$('#help_location').attr('name', '' + data.Name + '');
					$('#help_location').attr('map1', '' + data.BaiduLongitude + '');
					$('#help_location').attr('map2', '' + data.BaiduLatitude + '');
					$('#help_location').attr('describe', '' + data.Detail + '');
					$('#help_location').attr('time', '' + data.Time + '');
					$('#help_location').attr('address', '' + data.ResUrls[0] + '');
					$('#helpimgsize').html(toFileSizeText(data.FileSize));
					GetCreatMap(data.BaiduLongitude, data.BaiduLatitude, data.ResUrls[0], data.Time, data.Detail, data.Name, 0);
					$('.helpfour').attr('len', '' + imglen + '');
					for (var i = 0; i < imglen; i++) {
						if (i < 3) {
							$('.Help_ulone').append('<li class="HelpIMG"><img src="' + data.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						} else if (i < 6 && 3 <= i) {
							$('.Help_ultwo').append('<li class="HelpIMG"><img src="' + data.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						} else if (6 <= i) {
							$('.Help_ultree').append('<li class="HelpIMG"><img src="' + data.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						}
					}
					var imgli = '<li></li>';
					var imglis = '<li></li><li></li>';
					if (imglen <= 3) {
						var num = 3 - imglen;
						if (num == 1) {
							$('.Help_ulone').append(imgli);
						} else if (num == 2) {
							$('.Help_ulone').append(imglis);
						}
						$('.Help_ultwo').append('<li></li><li></li><li></li>');
						$('.Help_ultree').append('<li></li><li></li><li></li>');
					}
					if (3 < imglen && imglen <= 6) {
						var num = 6 - imglen;
						if (num == 1) {
							$('.Help_ultwo').append(imgli);
						} else if (num == 2) {
							$('.Help_ultwo').append(imglis);
						}
						$('.Help_ultree').append('<li></li><li></li><li></li>');
					}
					if (imglen <= 9) {
						var num = 9 - imglen;
						if (num == 1) {
							$('.Help_ultree').append(imgli);
						} else if (num == 2) {
							$('.Help_ultree').append(imglis);
						}
					}
		$('.helpImgVideo').show('slow');			
}
/******多图数据*********/
function HelpGetmoreImg(read,id){
	$('.cover_loading').show();
		var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + id + '\","ResType":"0"}}';
		$('.Help_ulone').empty();
		$('.Help_ultwo').empty();
		$('.Help_ultree').empty();
		$.getJSON(STATION_URL + '?Body=' + body,
			function(ret) {
				if (ret.Result == 200) {
					// console.log('多图类型'+JSON.stringify(ret));
					$('.cover_loading').hide();
					
					HelpDownImgs = ret.ResUrls;
					var HelpmoreImgs=ret;
                        HelpmoreImgs.ResId=id;
                        HelpDetailsArray.push(HelpmoreImgs);

                    // console.log('数组添加'+JSON.stringify(HelpDetailsArray));    
					var imglen = ret.ResUrls.length;
					help_readPrev=[id,0,imglen];
					Help_Videoread(read,0, id, imglen); //数据
					$('#help_location').attr('name', '' + ret.Name + '');
					$('#help_location').attr('map1', '' + ret.BaiduLongitude + '');
					$('#help_location').attr('map2', '' + ret.BaiduLatitude + '');
					$('#help_location').attr('describe', '' + ret.Detail + '');
					$('#help_location').attr('time', '' + ret.Time + '');
					$('#help_location').attr('address', '' + ret.ResUrls[0] + '');
					 $('#helpimgsize').html(toFileSizeText(ret.FileSize));
					GetCreatMap(ret.BaiduLongitude, ret.BaiduLatitude, ret.ResUrls[0], ret.Time, ret.Detail, ret.Name, 0);
					$('.helpfour').attr('len', '' + imglen + '');
					for (var i = 0; i < imglen; i++) {
						if (i < 3) {
							$('.Help_ulone').append('<li class="HelpIMG"><img src="' + ret.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						} else if (i < 6 && 3 <= i) {
							$('.Help_ultwo').append('<li class="HelpIMG"><img src="' + ret.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						} else if (6 <= i) {
							$('.Help_ultree').append('<li class="HelpIMG"><img src="' + ret.ResUrls[i] + '" alt=""><div class="Help_img2shadow" onclick="helplookclear(this)"><span></span></div></li>')
						}
					}
					var imgli = '<li></li>';
					var imglis = '<li></li><li></li>';
					if (imglen <= 3) {
						var num = 3 - imglen;
						if (num == 1) {
							$('.Help_ulone').append(imgli);
						} else if (num == 2) {
							$('.Help_ulone').append(imglis);
						}
						$('.Help_ultwo').append('<li></li><li></li><li></li>');
						$('.Help_ultree').append('<li></li><li></li><li></li>');
					}
					if (3 < imglen && imglen <= 6) {
						var num = 6 - imglen;
						if (num == 1) {
							$('.Help_ultwo').append(imgli);
						} else if (num == 2) {
							$('.Help_ultwo').append(imglis);
						}
						$('.Help_ultree').append('<li></li><li></li><li></li>');
					}
					if (imglen <= 9) {
						var num = 9 - imglen;
						if (num == 1) {
							$('.Help_ultree').append(imgli);
						} else if (num == 2) {
							$('.Help_ultree').append(imglis);
						}
					}


     //               	Helpnumread--;
					// if(Helpnumread>99){
					//    $('.helpnumsbg').html('99+');
					//    $('.helpnumsbg').show();
					// }else if(Helpnumread==0){
					//    $('.helpnumsbg').html();
					//    $('.helpnumsbg').hide();
					// }else{
					// 	$('.helpnumsbg').html(Helpnumread);
					//    $('.helpnumsbg').show();
					// }



				} else {
					$('.cover_loading').hide();
					common._coverShow("获取数据失败！");
					setTimeout(function() {
						common._coverHide();
					}, 2000);
				}
			})
		  $('.helpImgVideo').show('slow');
}

function helpleve2 (data) {
    Help_readImgstate();
    Map_Lineclear();
	$(data).parent().parent().addClass('help_bgs').siblings().removeClass('help_bgs');
	$(data).parent().parent().parent().parent().parent().siblings().children('.help_main_ul').children().children().removeClass('help_bgs');
	$('#Helptext').attr('disabled',true);
	$('.HelpKicon').children().eq(1).hide();
	$('.HelpKicon').children().eq(0).show();
	var len = $(data).parent().parent().attr('len');
	if (len > 1) {
		helpLeves2(data);
		return;
	 }
var  help_id = $(data).parent().parent().attr('id');
var  help_ids=help_id.replace('h','');
   if($('.helpImgVideo').is(':hidden')){
        GetHelpReportmsg(data);
        return;   
   }else{
      var resid=$('.helpImgVideo').attr('resid');
      if(resid==help_ids){
          $('.helpImgVideo').hide('slow');
         setTimeout(function(){
         	$('.help_btn').show(); 
         },700);
       }else{
       	GetHelpReportmsg(data);
      }
   }  
}
function GetHelpReportmsg (data) {
   	$('.sec-fun').hide();
	$('.help_btn').hide();
	$('.Help_imgNums').hide();
	$('.fun-contect').show();
	helplevel2inint();
    var help_id = $(data).parent().parent().attr('id');
    var IDs = help_id.match(/[0-9]+/g);
    var type = $(data).parent().parent().attr('types');
    var len = $(data).parent().parent().attr('len');
    var read = $(data).parent().parent().attr('read');
    var regs = new RegExp("<br>","g");
    var name = $(data).parent().parent().attr('username');
	var ulr = $(data).parent().parent().attr('ulr');
	var times = $(data).parent().parent().attr('time').slice(0,16);
	var detail = $(data).parent().parent().attr('Detail');
	var user_id = $(data).parent().parent().attr('user_id');
	var users = $(data).parent().parent().attr('users');
	var time=$(data).parent().parent().attr('time');
	 
	Help_Videoread(read, type, IDs, len);
	onlineIconStatus(users);
	if (type == 0) { //图片
		help_readPrev=[help_id,0];
		var regs = new RegExp("<br>", "g");
		var cons = $(data).parent().parent().attr('con');
		var con = cons.replace(regs, "\n");
		$('#Help_level2imghshow').attr('src','');
		// $('#helpimgname').html(name);
		$('#helpimgtime').html(times);
		// $('#helpimgdetail').html(detail);
		// $('.helpfour').attr('user_id', '' + user_id + '');
		// $('.helpfour').attr('help_id', '' + help_id + '');
		// $('.helpfour').attr('ulr', '' + ulr + '');
		// $('.helpfour').attr('len', '' + len + '');
		// $('.helpfour').attr('time', '' + time + '');
		// $('.helpfour').attr('types', '0');
		$('#helpvideo').hide();
		 $('#Help_level2imghshow').attr('src','' + ulr + '');
		// $('.fun-contect').css('backgroundImage', 'url(' + ulr + ')');
		$('.fun-contect').children('img').show();
		 HelpGetDetailsOpt(help_id,0);
		$('.help_level2_imgshadow').empty();
		$('.help_level2_imgshadow').append('<span class="help_level2_imgsicon"></span>');
		$('.help_level2_imgshare').css("left","177px");
		$('.help_level2deleteimg').css("left","248px");
		$('.fun-contect').addClass('HelpIMG');
		$('#Helptext').val(con);
		$('.HelpNote').show();
		$('#Helptext').show();
		$('#help_location').show();
		$('.helpImgVideo').show('slow');
	} else if (type == 1) { //上报视频
		help_readPrev=[help_id,1];
		$('#helpvideo').remove();
		var vide = ' <video width="280" height="280" type="video/mp4" style="background:black" id="helpvideo"></video>';
		$('#HelpVide').append(vide);
		var cons = $(data).parent().parent().attr('con');
		var con = cons.replace(regs, "\n");
		$('.fun-contect').children('img').hide();
		$('#helpvideo').attr('src', '' + ulr + '');
		$('#Helptext').val(con);
		$('#helpvideo').show();
		$('#helpimgtime').html(times);
		// GetReport11410(help_id, 1);
		HelpGetDetailsOpt(help_id, 1);
		$('.help_level2_imgshadow').empty();
		$('.help_level2_imgshadow').append('<span class="help_level2_imgsicons"></span>');
		$('.help_level2_imgshare').css("left","177px");
		$('.help_level2deleteimg').css("left","248px");
		$('.fun-contect').removeClass('HelpIMG');
		$('.HelpNote').show();
		$('#Helptext').show();
		$('#help_location').show();
		$('.helpImgVideo').show('slow');
	}else if (type == 2) { //抓拍图片
		help_readPrev=[help_id,2];
		$('.helpImgVideo').attr('resid',IDs);
		$('#Help_level2imghshow').attr('src','');
		// HelpCrearicon();
		$('#helpimgname').html(name);
		$('#helpimgtime').html(times);
		$('#helpimgdetail').html(detail);
		$('.helpfour').attr('user_id', '' + user_id + '');
		$('.helpfour').attr('help_id', '' + help_id + '');
		$('.helpfour').attr('len', '' + len + '');
		$('.helpfour').attr('ulr', '' + ulr + '');
		$('.helpfour').attr('time', '' + time + '');
		$('.helpfour').attr('types', '2');
		HelpGetDetailsOpt(help_id, 2);
		$('#helpvideo').hide();
		 $('#Help_level2imghshow').attr('src','' + ulr + '');
		// $('.fun-contect').css('backgroundImage', 'url('+ulr+')');
		$('.fun-contect').children('img').show();
		$('.help_level2_imgshadow').empty();
		$('.help_level2_imgshadow').append('<span class="help_level2_imgsicon"></span>');
	    $('.help_level2_imgshare').css("left","107px");
        $('.help_level2deleteimg').css("left","177px");
		$('.fun-contect').addClass('HelpIMG');
		$('.HelpNote').hide();
		$('#Helptext').hide();
		$('#help_location').hide();
		// $('.helpImgVideo').show('slow');
	}
}

function HelpGetDetailsOpt(help_id,type){
	  var helpreg = /[a-zA-Z]/g;
     var  id=help_id.replace(helpreg,"");
     if(HelpDetailsArray.length==0){
             GetReport11410(help_id, type);
             return;
		 }else if(HelpDetailsArray.length==1){
             var DetailId=HelpDetailsArray[0].ResId;
             var DetailType=HelpDetailsArray[0].ResType;
             if(DetailId==id&&type==DetailType){
                 HelpShowLocalDeatils(HelpDetailsArray[0],type);
                  return;
              }else{
              	GetReport11410(help_id, type);
              	return;
              }
		 }else{
		 	 var helpdetailscopy;
            for(var i=0;i<HelpDetailsArray.length;i++){
            	var DetailId=HelpDetailsArray[i].ResId;
                var DetailType=HelpDetailsArray[i].ResType;
                 if(DetailId==id&&type==DetailType){
                  helpdetailscopy=HelpDetailsArray[i];
                }
            }
            HelpDeatilsNumOpt(helpdetailscopy,help_id,type);
	    }
}
function HelpDeatilsNumOpt(val1,val2,val3){
	if(val1==undefined){
       GetReport11410(val2,val3);
	}else{
		 HelpShowLocalDeatils(val1,val3);
	}
}
function HelpShowLocalDeatils(obj,type){
	if(type==2){
		$('#helpimgsize').html(toFileSizeText(obj.FileSize));
		$('.helpImgVideo').attr('resid',''+obj.ResId+'');
		$('.helpImgVideo').show();
		return;
	}
	var map1 = obj.BaiduLongitude;
	var map2 = obj.BaiduLatitude;
	var Helpname = obj.Name;
	var time = obj.Time.slice(0,16);
	var helpAll_time =obj.Time;
	var describe = obj.Detail;
	var url = obj.ResUrls[0];
	var len=obj.ResUrls.length;
	var type=obj.ResType;
	$('.helpImgVideo').attr('resid',''+obj.ResId+'');
	 $('.helpfour').attr('user_id', '' + obj.Uid + '');
     $('.helpfour').attr('help_id', '' + obj.ResId + '');
     $('.helpfour').attr('ulr', '' + url + '');
     $('.helpfour').attr('len', '' + len + '');
     $('.helpfour').attr('time', '' + helpAll_time + '');
     $('.helpfour').attr('types',''+type+'');
	$('#helpimgname').html(Helpname);
	$('#helpimgtime').html(time);
	$('#helpimgsize').html(toFileSizeText(obj.FileSize));
	$('#helpimgdetail').html(describe);
	$('#help_location').attr('name', '' + Helpname + '');
	$('#help_location').attr('map1', '' + map1 + '');
	$('#help_location').attr('map2', '' + map2 + '');
	$('#help_location').attr('time', '' + helpAll_time + '');
	$('#help_location').attr('describe', '' + describe + '');
	$('#help_location').attr('address', '' + url + '');
	if (map1 == '' || map2 == '') {
		common._coverShow("用户没有上报位置，无法地图显示");
		setTimeout(function() {
			common._coverHide();
		}, 2000);
	} else {
		// alert(url);
		GetCreatMap(map1, map2, url, time, describe, Helpname, type);
	}
}

function helplookclear(data) {
	$('#helps_video').remove();
	var vides = '<video  width="700" height="500"  type="video/mp4" style="background-color:black" id="helps_video" controls="controls"></video>';
	$('#help_lookimg').append(vides);
	var help_container = $(data).parent();
	var media_imgh = $('.help_lookimg').outerHeight();
	var media_imgw = $('.help_lookimg').outerWidth();
	var meidia_screenh = $(window).height();
	var meidia_screenw = $(window).width();
	var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
	var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
	$(".help_lookimg").css("top", media_top);
	$(".help_lookimg").css("left", media_left);
	if (help_container.hasClass('HelpIMG')) {
		$('.help_imgnumleft').show();
		$('.help_imgnumright').show();
		var inde=$(data).parent().index();
		$('.help_imgnumleft').attr('index',inde);
		$('.help_imgnumright').attr('index',inde);


		var media_imgsrc = $(data).parent().children('img').attr('src');
		$('.help_lookimg').children('.help_lookimgs').children('img').attr('src', '' + media_imgsrc + '');
		$('#helps_video').hide();
		$('.help_lookimgs').show();
	} else {
		$('.help_imgnumleft').hide();
		$('.help_imgnumright').hide();
		$('.help_lookimgs').hide();
		var media_videosrc = $(data).parent().children('video').attr('src');
		var vison = IEVersion();
		// alert(vison);
		if (vison <= 10) {
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		} else if (vison == 11) {
			// $('#helps_video').attr('src', '' + media_videosrc + '');
			// $('#player').hide();
			// $('#helps_video').show();
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		} else {
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		}
	}
	$('.help_lookimg').show();
	$('#bg-color').show();
	help_imglook();
}
function helplookclearIMG(data){
	$('#helps_video').remove();
	var vides = '<video  width="700" height="500" type="video/mp4"  style="background-color:black" id="helps_video" controls="controls"></video>';
	$('#help_lookimg').append(vides);
	var help_container = $(data).parent();
	var media_imgh = $('.help_lookimg').outerHeight();
	var media_imgw = $('.help_lookimg').outerWidth();
	var meidia_screenh = $(window).height();
	var meidia_screenw = $(window).width();
	var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
	var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
	$(".help_lookimg").css("top", media_top);
	$(".help_lookimg").css("left", media_left);
	if (help_container.hasClass('HelpIMG')) {
		// var media_imgsrc = $(data).parent().css('backgroundImage');
		// var start=media_imgsrc.indexOf('(');
  //       var over=media_imgsrc.indexOf(')');
  //       var edge=IsEdge();
           $('.help_imgnumleft').hide();
           $('.help_imgnumright').hide();
            IMGsrc=$('#Help_level2imghshow').attr('src');
        // if(edge){
        //    IMGsrc=media_imgsrc.substring(start+1,over);
        //  }else{
        //    IMGsrc=media_imgsrc.substring(5,over-1);
        //  }
        
		$('.help_lookimg').children('.help_lookimgs').children('img').attr('src', '' + IMGsrc + '');
		$('#helps_video').hide();
		$('.help_lookimgs').show();
	} else {
		$('.help_lookimgs').hide();
		var media_videosrc = $(data).parent().children('video').attr('src');
		var vison = IEVersion();
		// alert(vison);
		if (vison <= 10) {
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		} else if (vison == 11) {
			// $('#helps_video').attr('src', '' + media_videosrc + '');
			// $('#player').hide();
			// $('#helps_video').show();
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		} else {
			Helpplays(media_videosrc);
			$('#helps_video').hide();
			$('#player').show();
		}
	}
	$('.help_lookimg').show();
	$('#bg-color').show();
	help_imglook();

}


function Helpplays(addr) {
	$('#player').children().remove();
	var player = new Swiff(' skins/player.swf', {
		id: 'f4Player',
		width: 700,
		height: 500,
		params: {
			wmode: 'window',
			allowFullScreen: 'true'
		},
		vars: {
			skin: 'skins/default.swf',
			screenshot: '',
			flv: addr
		}
	});
	player.inject('player');
}

function help_imglook() {　　
	var div1 = document.getElementById("help_lookimg");　　
	div1.onmousedown = function(ev) {　　　　
		var oevent = ev || event;　　　　
		var distanceX = oevent.clientX - div1.offsetLeft;　　　　
		var distanceY = oevent.clientY - div1.offsetTop;　　　　
		document.onmousemove = function(ev) {　　　　　　
			var oevent = ev || event;　　　　　　
			div1.style.left = oevent.clientX - distanceX + 'px';　　　　　　
			div1.style.top = oevent.clientY - distanceY + 'px';　　　　
		};　　　　
		document.onmouseup = function() {　　　　　　
			document.onmousemove = null;　　　　　　
			document.onmouseup = null;　　　　
		};
	}
}

function help_imgclose(obj) {
	$(obj).parent().hide();
	$('#bg-color').hide();
	var media_div1 = document.getElementById("helps_video");
	media_div1.pause();
	$('#player').children().remove();
}

function HelpWarnval(val) {
	if (val == 1) {
		val = '禁出';
	} else if (val == 0) {
		val = '禁入';
	}
	return val;
}

function HelpWarnvals(val) {
	if (val == 1) {
		val = '禁出';
	} else if (val == 0) {
		val = '禁入';
	}
	return val;
}

// function help_videoscun(data){
// 	             $('.sec-fun').hide();
//              $('.help_btn').hide();
//              $('.Help_imgNums ').hide();
//              $('.fun-contect').show();
//              helplevel2inint();
//      var type_ids=$(data).parent().parent().attr('id');
//         var type_id=type_ids.replace(/[^\d]/g,''); 
//         var user_id=$(data).parent().parent().attr('user_id');

//             $('.helpfour').attr('user_id',''+user_id+'');
//             $('.helpfour').attr('help_id','h'+type_id+'');
//             $('.fun-contect').children('img').hide();
//             $('#helpvideo').attr('src',''+ret.ResUrls+'');
//             // $('.help_level2_imgshadow').children('span').html('播放');
//             $('.fun-contect').removeClass('HelpIMG');

//         var body = '{"Code":11410,"Body":{"SessionId":\"'+sessionId+'\","ResId":\"'+type_id+'\","ResType":"2"}}'; 

//           $.getJSON(STATION_URL+'?Body=' + body,
// 	function (ret){
//             if(ret.Result==200){

//                }else{
//             	  $('.Help_ulone').append('<h3 class="help_wu">获取数据失败！</h3>')
//             }



//         })   
// }
function Help_Videoread(val1, val2, val3, val4) {
	   //Help_Videoread(read, type, IDs, len);
	var valtype = val2;
	if (val1 != 0) {
		return;
	}
  var readtype=$('#h'+val3+'').attr('read');
  if(readtype==1){
  	 return;
  }
	var body = '{"Code":10403,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":[{"ReportId":' + val3 + ',"ResType":' + val2 + '}]}}';
	console.log(body);
	var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	$.post('' + URI + '',
		function(ret) {
			var resp = decodeURIComponent(ret, 'UTF-8');
			var obj = $.parseJSON(resp);
			console.log('返回结果'+JSON.stringify(obj));
			if (obj.Result == 200) {
				if (valtype == 0) {
					if (val4 > 1) {
						// $('#h' + val3 + '').find('.Helpupimg').attr('src', 'img/icon/newicon/meida_nums1.png');
						$('#h'+val3+'').attr('read','1');
						// $('#P' + val3 + '').find('.Helpupimg').attr('src', 'img/icon/newicon/meida_nums1.png');
						$('#p'+val3+'').attr('read','1');
					} else {
						// $('#h' + val3 + '').find('.Helpupimg').attr('src', 'img/icon/newicon/help_img2s.png');
						$('#h'+val3+'').attr('read','1');
						// $('#P' + val3 + '').find('.Helpupimg').attr('src', 'img/icon/newicon/help_img2s.png');
						$('#p'+val3+'').attr('read','1');
					}
				} else if (valtype == 1) {
					// $('#h' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_videos.png');
					$('#h'+val3+'').attr('read','1');
					// $('#P' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_videos.png');
					  $('#p'+val3+'').attr('read','1');
				} else if (valtype == 2) {
					// $('#h' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_imgs.png');
					// $('#P' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_imgs.png');
					  $('#h'+val3+'').attr('read','1');
					  $('#p'+val3+'').attr('read','1');
				} else if (valtype == 3) {
				// $('#h' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_videolines.png');
				// $('#P' + val3 + '').find('img').attr('src', 'img/icon/newicon/help_videolines.png');
				     $('#h'+val3+'').attr('read','1');
				     $('#p'+val3+'').attr('read','1');
				}
				$('#h' + val3 + '').addClass('HelpBgColor');
				$('#P' + val3 + '').addClass('HelpBgColor');
				Helpnumread--;
				if(Helpnumread>99){
				   $('.helpnumsbg').html('99+');
				   $('.helpnumsbg').show();
				}else if(Helpnumread==0){
				   $('.helpnumsbg').html();
				   $('.helpnumsbg').hide();
				}else{
				   $('.helpnumsbg').html(Helpnumread);
				   $('.helpnumsbg').show();
				}
				Helpremovelocal(val3,val2);
				 for(var i=0;i<HelpcordeArray.length;i++){
	                   if(HelpcordeArray[i].ResId==val3){
	                       HelpcordeArray[i].ReadStatus=1;
	                   }
                  }
			} else {
				common._coverShow("设为已读失败!");
				setTimeout(function() {
					common._coverHide();
				}, 2000);
			}
		})
}

function help_videocun(data) {
	Help_readImgstate();
	Map_Lineclear();
	$(data).parent().parent().addClass('help_bgs').siblings().removeClass('help_bgs');
	$(data).parent().parent().parent().parent().parent().siblings().children('.help_main_ul').children().children().removeClass('help_bgs');
    var type_ids = $(data).parent().parent().attr('id');
	var type_id = type_ids.replace(/[^\d]/g, '');
    if($('.helpImgVideo').is(':hidden')){
        GetHelpVideoshow(data);
         return;
    }else{
       var resid=$('.helpImgVideo').attr('ResId');
       if(resid==type_id){
            $('.helpImgVideo').hide('slow');
            setTimeout(function(){
               $('.help_btn').show();
            },700);
        }else{
         GetHelpVideoshow(data);
       }     
    }
}
function GetHelpVideoshow (data) {
	 	$('#helpvideo').remove();
	var vide ='<video width="280" height="280" style="background:black" type="video/mp4" id="helpvideo"></video>';
	$('#HelpVide').append(vide);
	$('.sec-fun').hide();
	$('.help_btn').hide();
	$('.HelpNote').hide();
	$('#Helptext').hide();
	$('#help_location').hide();
	helplevel2inint();
	var len = $(data).parent().parent().attr('len');
	var type_ids = $(data).parent().parent().attr('id');
	var type_id = type_ids.replace(/[^\d]/g, '');
	var read = $(data).parent().parent().attr('read');
	var type = $(data).parent().parent().attr('types');
	var ulr = $(data).parent().parent().attr('ulr');
    $('.help_level2_imgshare').css("left","107px");
    $('.help_level2deleteimg').css("left","177px");
	var user_id = $(data).parent().parent().attr('user_id');
	var users = $(data).parent().parent().attr('users');
    	Help_Videoread(read, type, type_id, len);
	    onlineIconStatus(users); 
     if(HelpDetailsArray.length==0){
        GetHelpVideomsg(type_id); 
         return;
     }else if(HelpDetailsArray.length==1){
        var HelpVideoid=HelpDetailsArray[0].ResId;
        if(HelpVideoid==type_id){
           GetHelpLocalVideo(HelpDetailsArray[0]);
        }else{
           GetHelpVideomsg(type_id);
        }
     }else{
     	var HelpVideoaddmsg;
     	for(var i=0;i<HelpDetailsArray.length;i++){
            if(HelpDetailsArray[i].ResId==type_id){
            	HelpVideoaddmsg=HelpDetailsArray[i];
            } 
     	}
       GetHelpVideonums(HelpVideoaddmsg,type_id);
     }
}
function GetHelpVideonums(HelpVideoaddmsg,type_id){
	if(HelpVideoaddmsg==undefined){
        GetHelpVideomsg(type_id);
         return;
	}else{
       GetHelpLocalVideo(HelpVideoaddmsg);
	}
}
function GetHelpLocalVideo(ret){
	    var Help_videotime=ret.Time.slice(0,16);
			$('.Help_ulone').empty();
			$('.Help_ultwo').empty();
			$('.Help_ultree').empty();
			$('.helpfour').attr('user_id', '' + ret.Uid + '');
			$('.helpfour').attr('help_id', 'h' + ret.ResId + '');
			$('.helpfour').attr('types','3');
			$('.helpfour').attr('ulr', '' +ret.ResUrls[0] + '');
			$('.helpfour').attr('time', '' + ret.Time + '');
			$('.helpfour').attr('len', '' + ret.ResUrls.length+ '');
			// HelpDownImgs = ret.ResUrls;
			$('.helpImgVideo').attr('resid',''+ret.ResId+'');
			 $('#helpimgsize').html(toFileSizeText(ret.FileSize));
			var numlen = ret.ResUrls.length;
			if (numlen == 1) {
				$('#helpimgname').html(ret.Name);
				$('#helpimgtime').html(Help_videotime);
				$('#helpimgdetail').html(ret.Detail);
				$('.helpfour').attr('ulr', '' + ret.ResUrls[0] + ''); 
				$('.fun-contect').children('img').hide();
				$('#helpvideo').attr('src', '' + ret.ResUrls[0] + '');
				$('.help_level2_imgshadow').empty();
	            $('.help_level2_imgshadow').append('<span class="help_level2_imgsicons"></span>');
				$('#helpvideo').show();
				$('.Help_imgNums').hide();
				$('.fun-contect').show();
				$('.fun-contect').removeClass('HelpIMG');
				$('.helpImgVideo').show('slow');
			} else {
				$('#helpimgname').html(ret.Name);
				$('#helpimgtime').html(Help_videotime);
				$('#helpimgdetail').html(ret.Detail);
				$('.helpfour').attr('user_id', '' + ret.Uid + '');
				$('.helpfour').attr('help_id', 'h' + ret.ResId + '');
				for (var i = 0; i < numlen; i++) {
				$('.Help_ulone').append('<li class="media_videomore"><video src="' + ret.ResUrls[i] + '" type="video/mp4"><source src="" type="video/mp4"></source></video><div class="Help_img2shadow" onclick="helplookclear(this)"><span class="Help_img2video"></span></div></li>');
				}
				$('.Help_imgNums').show();
				$('.fun-contect').hide();
				$('.helpImgVideo').show('slow');
			}
}
//获取数据
function GetHelpVideomsg(type_id){
    $('.cover_loading').show();
    var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + type_id + '\","ResType":"3"}}';
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				$('.cover_loading').hide();
				var helpVideo=ret;
				    helpVideo.ResId=type_id;
				    help_readPrev=[type_id,3];
				HelpDetailsArray.push(helpVideo); 
				var help_videotime=ret.Time.slice(0,16);  
				$('.Help_ulone').empty();
				$('.Help_ultwo').empty();
				$('.Help_ultree').empty();
				$('.helpfour').attr('user_id', '' + ret.Uid + '');
				$('.helpfour').attr('help_id', 'h' + type_id + '');
				$('.helpImgVideo').attr('resid',''+type_id+'');
				$('.helpfour').attr('types','3');
				$('.helpfour').attr('ulr', '' +ret.ResUrls[0] + '');
				$('.helpfour').attr('time', '' + ret.Time + '');
				$('.helpfour').attr('len', '' + ret.ResUrls.length + '');
				$('#helpimgsize').html(toFileSizeText(ret.FileSize));
				HelpDownImgs = ret.ResUrls;
				var numlen = ret.ResUrls.length;
				if (numlen == 1) {
					$('#helpimgname').html(ret.Name);
					$('#helpimgtime').html(help_videotime);
					$('#helpimgdetail').html(ret.Detail);
					$('.helpfour').attr('ulr', '' + ret.ResUrls[0] + ''); 
					$('.fun-contect').children('img').hide();
					$('#helpvideo').attr('src', '' + ret.ResUrls[0] + '');
					$('.help_level2_imgshadow').empty();
		            $('.help_level2_imgshadow').append('<span class="help_level2_imgsicons"></span>');
					$('#helpvideo').show();
					$('.Help_imgNums').hide();
					$('.fun-contect').show();
					$('.fun-contect').removeClass('HelpIMG');
					$('.helpImgVideo').show('slow');
				} else {
					$('#helpimgname').html(ret.Name);
					$('#helpimgtime').html(help_videotime);
					$('#helpimgdetail').html(ret.Detail);
					$('.helpfour').attr('user_id', '' + ret.Uid + '');
					$('.helpfour').attr('help_id', 'h' + type_id + '');
					for (var i = 0; i < numlen; i++) {
					$('.Help_ulone').append('<li class="media_videomore"><video src="' + ret.ResUrls[i] + '" type="video/mp4"><source src="" type="video/mp4"></source></video><div class="Help_img2shadow" onclick="helplookclear(this)"><span class="Help_img2video"></span></div></li>');
					}
					$('.Help_imgNums').show();
					$('.fun-contect').hide();
					$('.helpImgVideo').show('slow');
				}

				 // 	Helpnumread--;
					// if(Helpnumread>99){
					//    $('.helpnumsbg').html('99+');
					//    $('.helpnumsbg').show();
					// }else if(Helpnumread==0){
					//    $('.helpnumsbg').html();
					//    $('.helpnumsbg').hide();
					// }else{
					// 	$('.helpnumsbg').html(Helpnumread);
					//    $('.helpnumsbg').show();
					// }



			} else {
				$('.cover_loading').hide();
				$('#helpimgname').html('');
				$('#helpimgtime').html('');
				$('#helpimgdetail').html('');
				$('.fun-contect').children('img').hide();
				$('#helpvideo').attr('src', '' + ret.ResUrls + '');
				$('#helpvideo').show();
			    $('.help_level2_imgshadow').empty();
		        $('.help_level2_imgshadow').append('<span class="help_level2_imgsicons"></span>');
				$('.helpImgVideo').show('slow');
				$('.fun-contect').append('<h3 class="help_wu">获取数据失败！</h3>');
			}
		})
}
/**********告警*************/
function helpwarn(data) {
	Help_readImgstate();
	Map_Lineclear();
	$('.helpfour').children().eq(0).children('img').attr('src','img/icon/newicon/help_locations.png');
	var name = $(data).parent().parent().attr('username');
	var time = $(data).parent().parent().attr('time');
	$(data).parent().parent().addClass('help_bgs').siblings().removeClass('help_bgs');
	$(data).parent().parent().parent().parent().parent().siblings().children('.help_main_ul').children().children().removeClass('help_bgs');
	var warnid = $(data).parent().parent().attr('reportid');
	var user_id = $(data).parent().parent().attr('user_id');
	var users = $(data).parent().parent().attr('users');
	$('.helpfour').children().eq(0).children().attr('src', 'img/icon/newicon/help_location.png');
	$('.helpfour').attr('user_id', '' + user_id + '');
	//判断显示隐藏
	if($('.helpFence').is(':hidden')){
		   $('.sec-fun').hide();
           HelpWarnGetmsg(data,users,warnid,name,time);
	}else{
         var resid=$('.helpFence').attr('resid');  
         if(resid==warnid){
             $('.helpFence').hide('slow');
             setTimeout(function() {
                 $('.help_btn').show();
             },700);
         }else{
            $('.helpFence').hide();
            $('.help_btn').hide(); 
            HelpWarnGetmsg(data,users,warnid,name,time);
         }
	}
}
function HelpWarnGetmsg(data,users,warnid,name,time){
	var warn_secondtime=time.slice(0,16);
	$('.help_btn').hide();
    $('.helpFence').attr('resid',''+warnid+'');
    $('#helpwarnname').html(name);
	$('#help_warntime').html(warn_secondtime);
	onlineIconStatus(users);
    if(HelpDetailsWarns.length==0){
        GetWarn10710(data,warnid);
    }else if(HelpDetailsWarns.length==1){
          if(HelpDetailsWarns[0].ResId==warnid){
          	 //本地数据 
          	  GetHelpWarnDetail(HelpDetailsWarns[0],warnid); 
          	  return;
          }else{
              GetWarn10710(data,warnid);
          }
    }else{
    	 var Helprepeartwarn;
    	for(var i=0;i<HelpDetailsWarns.length;i++){
    		if(HelpDetailsWarns[i].ResId==warnid){
              Helprepeartwarn=HelpDetailsWarns[i];
    		}
    	}
       GetHelpWarnsNum(Helprepeartwarn,warnid,data); 
    }
}
function GetHelpWarnsNum(Helprepeartwarn,warnid,data){
	if(Helprepeartwarn==undefined){
		GetWarn10710(data,warnid);
		return
	}else{
		GetHelpWarnDetail(Helprepeartwarn,warnid);
	}
}
function GetHelpWarnDetail(warndetails,warnid) {
	    $('.helpFence').attr('resid',''+warndetails.ResId+'');
		var warntype = HelpWarnval(warndetails.Type);
		var time1 = warndetails.Time.slice(5, 7);
		var time2 = warndetails.Time.slice(8, 10);
		var time3 = warndetails.Time.slice(11,16);
		var html = '<div class="line-contect"><p>围栏告警：' + warndetails.Name + '' + warntype + '' + warndetails.FenceName + '</p><p>告警时间：' + time1 + '月' + time2 + '日' + time3 + '</p><p>成员围栏设置：' + warntype + '</p><p>所属围栏：' + warndetails.FenceName + '</p><p>围栏有效时间：' + warndetails.StartTime + ' — ' + warndetails.StopTime + '</p></div>';
		$('.helpFence').find('.padd').empty().append(html);
	    $('.helpFence').show('slow');
}
function GetWarn10710(data,warnid){
	 $('.cover_loading').show();
	var body = '{"Code":10710,"Body":{"SessionId":\"' + sessionId + '\","WarningId":\"' + warnid + '\"}}';
    console.log('获取告警数据'+body);
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				var warnmsg=ret;
				    warnmsg.ResId=warnid;
				    help_readPrev=[warnid,10];
				HelpDetailsWarns.push(ret);
				console.log('告警获取信息成功');
	           $('.cover_loading').hide();
				var warntype = HelpWarnval(ret.Type);
				var time1 = ret.Time.slice(5, 7);
				var time2 = ret.Time.slice(8, 10);
				var time3 = ret.Time.slice(11,16);
				var html = '<div class="line-contect"><p>围栏告警：' + ret.Name + '' + warntype + '' + ret.FenceName + '</p><p>告警时间：' + time1 + '月' + time2 + '日' + time3 + '</p><p>成员围栏设置：' + warntype + '</p><p>所属围栏：' + ret.FenceName + '</p><p>围栏有效时间：' + ret.StartTime + ' — ' + ret.StopTime + '</p></div>';
				$('.helpFence').find('.padd').empty().append(html);
				Help10709(data, warnid);
				$('.helpFence').show('slow');

                 	Helpnumread--;
					if(Helpnumread>99){
					   $('.helpnumsbg').html('99+');
					   $('.helpnumsbg').show();
					}else if(Helpnumread==0){
					   $('.helpnumsbg').html();
					   $('.helpnumsbg').hide();
					}else{
						$('.helpnumsbg').html(Helpnumread);
					   $('.helpnumsbg').show();
					}



			} else {
	           $('.cover_loading').hide();
                console.log('告警获取信息失败'+ret.Result);
				// alert("错误码："+ret.Result);
			}
		})
}

function Help10709(val1, val2) {
	var type=10;
	var body = '{"Code":10709,"Body":{"SessionId":\"' + sessionId + '\","WarningIds":[\"' + val2 + '\"]}}';
	console.log('告警已读报文'+JSON.stringify(body));
	var readtype=$('#h'+val2+'').attr('read');
    if(readtype==1){
  	    return;
     }
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				console.log('告警设为已读成功');
				// $(val1).attr('src', 'img/icon/newicon/help_warnas.png');
				$('#h'+val2+'').attr('read','1');
				$(val1).parent().parent().addClass('HelpBgColor');
				// Helpnumread--;
				//   var Helpaddnums='999+';
          //       if(Helpnumread>999){
          //          $('.helpnumsbg').html(Helpaddnums);
			       // $('.helpnumsbg').show();  
          //       }else if(Helpnumread==0){
          //       	 $('.helpnumsbg').html();
			       //   $('.helpnumsbg').hide();  
          //       }else{
          //          $('.helpnumsbg').html(Helpnumread);
			       // $('.helpnumsbg').show();  
          //       }
                    var warnsid=[];
                         warnsid.push(val2);
                   HelpRemovelocalarray(warnsid,type)
                  for(var i=0;i<HelpcordeArray.length;i++){
                   if(HelpcordeArray[i].ResId==val2){
                       HelpcordeArray[i].ReadStatus=1;
                   }
                  }

			} else {
				console.log('告警已读失败'+ret.Result);
                // alert(ret.Result);
			}
		})
}

function Help10504(val1, val2) {
	var type=11;
	var body = '{"Code":10504,"Body":{"SessionId":\"' + sessionId + '\","BroadcastIds":[\"' + val2 + '\"]}}';
    var readtype=$('#h'+val2+'').attr('read');
      if(readtype==1){
  	     return;
      }
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				// $(val1).attr('src', 'img/icon/newicon/help_radios.png');
				$(val1).parent().parent().addClass('HelpBgColor');
				$('#h'+val2+'').attr('read','1');
				// Helpnumread--;

				//   var Helpaddnums='999+';
    //             if(Helpnumread>999){
    //                $('.helpnumsbg').html(Helpaddnums);
			 //       $('.helpnumsbg').show();  
    //             }else if(Helpnumread==0){
    //             	 $('.helpnumsbg').html();
			 //         $('.helpnumsbg').hide();  
    //             }else{
    //                $('.helpnumsbg').html(Helpnumread);
			 //       $('.helpnumsbg').show();  
    //             }
                   var radioid=[];
                       radioid.push(val2);
               HelpRemovelocalarray(radioid,type);
               for(var i=0;i<HelpcordeArray.length;i++){
                   if(HelpcordeArray[i].ResId==val2){
                       HelpcordeArray[i].ReadStatus=1;
                   }
                  }
			} else {

			}
		})
}

function helpradio(data) {
	 Help_readImgstate();
	// helplevel2inint();
	$(data).parent().parent().addClass('help_bgs').siblings().removeClass('help_bgs');
	$(data).parent().parent().parent().parent().parent().siblings().children('.help_main_ul').children().children().removeClass('help_bgs');
	var name = $(data).parent().parent().attr('username');
	var time = $(data).parent().parent().attr('time');
	var id = $(data).parent().parent().attr('reportid');
	var users = $(data).parent().parent().attr('users');
	if($('.helpBroadcast').is(':hidden')){
       GetHelpRadioMsg(data,id,users);
	}else{
		var resid=$('.helpBroadcast').attr('resid');
		if(resid==id){
              $('.helpBroadcast').hide('slow');
            setTimeout(function(){
              $('.help_btn').show();
            },700)     
		 }else{
           GetHelpRadioMsg(data,id,users);
		}
	}
}

function GetHelpRadioMsg(data,id,users){
	$('.sec-fun').hide();
	$('.help_btn').hide();
	var me=loginId;
    if(users==me){
		$('.help_radiobtn').hide();
	}else{
		$('.help_radiobtn').show();
	}
	onlineIconStatus(users);

	if(HelpDetailsRadio.length==0){
         GetHelpDetailsRadio(data,id);
         return;
    }else if(HelpDetailsRadio.length==1){
        if(HelpDetailsRadio[0].ResId==id){
        	//本地数据
           GetHelpDetailslocalRaido(HelpDetailsRadio[0]);
        }else{
        	GetHelpDetailsRadio(data,id);
        	return; 
        }
    }else{
    	var HelpRadioDetails;
    	for(var i=0;i<HelpDetailsRadio.length;i++){
    		if(HelpDetailsRadio[i].ResId==id){
               HelpRadioDetails=HelpDetailsRadio[i];
    		}
    	}
        GetHelpradionum(data,id,HelpRadioDetails); //查看数据	
    }
}
function GetHelpDetailslocalRaido(obj){
			var secnod_time=obj.Time.slice(0,16);
	        $('.helpBroadcast').attr('resid',''+obj.ResId+'');
			var html = toBaseText(obj.Html);
			$('.brocast-contect').children().eq(0).empty().append(obj.Title);
			$('.brocast-contect').children('p').empty().append(html);
			$('#helpradioname').html(obj.Name);
			$('#helpradiotime').html(secnod_time);
			$('.brocast-contect').find('div').attr('contenteditable',false);
			$('.helpBroadcast').show('slow');
}
 function GetHelpradionum(data,id,HelpRadioDetails){
    if(HelpRadioDetails==undefined){
         GetHelpDetailsRadio(data,id);
         return;
      }else{
      GetHelpDetailslocalRaido(HelpRadioDetails);
    }
 }
function GetHelpDetailsRadio(data,id){
	$('.cover_loading').show();
	$('.helpBroadcast').attr('resid',''+id+'');
	var body = '{"Code":10503,"Body":{"SessionId":\"' + sessionId + '\","BroadcastId":\"' + id + '\"}}';
	var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	$.post('' + URI + '',
		function(ret) {
			var resp = decodeURIComponent(ret, 'UTF-8');
			var obj = $.parseJSON(resp);
			if (obj.Result == 200) {
				$('.cover_loading').hide();
                var radiolist=obj;
                    obj.ResId=id;
                    help_readPrev=[id,11];
                    HelpDetailsRadio.push(radiolist);
                var newTime=obj.Time.slice(0,16);
				var html = toBaseText(obj.Html);
				$('.brocast-contect').children().eq(0).empty().append(obj.Title);
				$('.brocast-contect').children('p').empty().append(html);
				$('#helpradioname').html(obj.Name);
				$('#helpradiotime').html(newTime);
				$('.brocast-contect').find('div').attr('contenteditable',false);
				$('.helpBroadcast').show('slow');
				Help10504(data, id);
             
                   	Helpnumread--;
					if(Helpnumread>99){
					   $('.helpnumsbg').html('99+');
					   $('.helpnumsbg').show();
					}else if(Helpnumread==0){
					   $('.helpnumsbg').html();
					   $('.helpnumsbg').hide();
					}else{
						$('.helpnumsbg').html(Helpnumread);
					   $('.helpnumsbg').show();
					}



			}else{
				$('.cover_loading').hide();
				$('.brocast-contect').children('h3').empty().append('暂无数据');
				$('.brocast-contect').children('p').empty();
			}
		})
}

function Helpsubmitsearch(data) {
	var date = new Date();
	var over;
	var dataday = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
	var datanowday=date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
	var start = $('#HelpTimestart').val() + ' ' + '00:00:00';
	var overval=$('#HelpTimesover').val();
	   if(datanowday==overval){
           over = $('#HelpTimesover').val() + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
	   }else{
           over = $('#HelpTimesover').val() + ' 23:59:59'; 
	   }
	  
	var type = '';
	var hang = '<br>';
	if (start > over) {
		common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
		setTimeout(function() {
			common._coverHide();
		}, 3000);
		return;
	}
	if (over > dataday) {
		common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
		setTimeout(function() {
			common._coverHide();
		}, 3000);
		return;
	}
	if ($('.helpersb_img').hasClass('select1')) {
		type = 100;
	} else if ($('.helpersb_video').hasClass('select1')) {
		type = 101;
	} else if ($('.helpersb_warn').hasClass('select1')) {
		type = 10;
	} else if ($('.helpersb_radio').hasClass('select1')) {
		type = 11;
	}else{
		type='';
	}
	User_SetImgIcon=true;
	HelpGetsearch(start, over, type);
}

function HelpGetsearch(datastart, dataover, datatype) {
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"' + datatype + '", "TimeFrom":\"' + datastart + '\","TimeTo":\"' + dataover + '\","PageSize":30,"PageIndex":0}}';
	   // console.log('和助手'+body);
	   if(datatype==''){
	   	 HelpSearchType;
	   }else if(datatype==10){
	   	 HelpSearchType=10;
	   }else if(datatype==100){
	   	 HelpSearchType=0;
	   }else if(datatype==101){
	   	 HelpSearchType=1;
	   }else if(datatype==11){
         HelpSearchType=111;
	   }
	   HelpGetcontainer(body);
}

function helplevel2inint() {
	$('.helpfour').children().children().eq(0).attr('src', 'img/icon/newicon/help_location.png');
	$('.helpfour').children().children().eq(3).attr('src', 'img/icon/newicon/help_deleted.png');
	$('.help_level2delete').hide();
	$('.help_level2_share').hide();
	$('#help_location').next().children('img').attr('src','img/icon/newicon/help_download.png');
}

function HelpDelete(data) {
	$('.helpforward').children('img').attr('src','img/icon/newicon/help_share.png');
	$('.helpforward').prev().children('img').attr('src','img/icon/newicon/help_download.png');
	var son = $(data).parent().next();
	if (son.is(':hidden')) {
		$(data).parent().siblings('.help_level2_share').slideUp();
		$(data).children().attr('src', 'img/icon/newicon/help_deleteds.png');
		$(data).parent().next().slideDown('slow');
	} else {
		$(data).children().attr('src', 'img/icon/newicon/help_deleted.png');
		$(data).parent().next().slideUp('slow');
	}
}

function HelpFintbtn(){
	$('.Help_inputdivall').removeClass('userall_selected');
	$('.help_leve2div').hide();
	$('.help_btn').show();
	$('.Helptotal').html(0);
	$('#HelpRead').attr('disabled','disabled');
	$('#HelpRead').removeClass('HelpReads');
}

function HelpGetcontainer(databody) {
	 $('.sec-fun').hide();
	 $('#loaded').empty();
	 $('.choose-sec').hide();
	 $('#loading').show();
	 $('.choose .cho-img').attr('src','img/icon/channel/channel_search1.png');
	 console.log('和助手第一次'+databody);
	 HelpFintbtn();
     var arr=[databody];
     AjaxPostMsg (databody, AJAXSET_TIME, help11411con, help11411error, helpovertime, false, arr);
}
 /**********************获取内容********************************************/

/***********************获取11411内容********************************************************/

/*首页 尾页*/
function helpscorell(databody, total) {
	function strToJson(str) {
		var json = eval('(' + str + ')');
		return json;
	}
	var timestart = strToJson(databody).Body.TimeFrom;
	var timeover = strToJson(databody).Body.TimeTo;
	var type = strToJson(databody).Body.ResType;
	var index = strToJson(databody).Body.PageIndex;
	var indexshow = '';
	Pulley_databody = databody;
	Pulley_total = total;
   



	function strToNum(str) {
		var num = Number(str);
		return num;
	}
	if (index == 0) {
		indexshow = 1;
	} else if (index == -1) {
		indexshow = total;
	} else {
		indexshow = strToNum(index) + 1;
	}
	var HelpPagemore = '<div class="HelpPagemore" onclick="HelpPagenext(\'' + type + '\',\'' +timestart + '\',\'' + timeover+ '\',\'' +index + '\',\'' + total + '\')">向下滑动加载更多</div>';
	$('#loaded').append(HelpPagemore);
}
/******尾页*****/
function HelpendPage(type, strat, over, index, total) {
	function strToNum(str) {
		var num = Number(str);
		return num;
	}
	var end = strToNum(total);
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"' + type + '", "TimeFrom":\"' + strat + '\","TimeTo":\"' + over + '\","PageSize":30,"PageIndex":\"-1\"}}';
	HelpGetcontainer(body);
}
/************首页****************/
function HelpPagehome(type, strat, over, index, total) {
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"' + type + '", "TimeFrom":\"' + strat + '\","TimeTo":\"' + over + '\","PageSize":30,"PageIndex":\"0\"}}';
	HelpGetcontainer(body);
}
/**上一页**/
function HelpPageprev(type, strat, over, index, total) {
	function strToNum(str) {
		var num = Number(str);
		return num;
	}
	var indexs = strToNum(index);
	if (indexs == 0) {
		common._coverShow("已经是第一页!");
		setTimeout(function() {
			common._coverHide();
		}, 2000);
		return;
	}
	if (indexs == -1) {
		indexs = strToNum(total);
	}
	var prev = indexs - 1;
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"' + type + '", "TimeFrom":\"' + strat + '\","TimeTo":\"' + over + '\","PageSize":30,"PageIndex":\"' + prev + '\"}}';
	HelpGetcontainer(body);
}
/*********下一页**********/
function HelpPagenext(type, strat, over, index, total) {
	function strToNum(str) {
		var num = Number(str);
		return num;
	}
	var indexs = strToNum(index);
	if (indexs == -1) {
		indexs = strToNum(total) - 1;
	}
 
	var next = indexs + 1;
	var body = '{"Code":11411,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","ResType":"' + type + '", "TimeFrom":\"' + strat + '\","TimeTo":\"' + over + '\","PageSize":30,"PageIndex":\"' + next + '\"}}';
	HelpGETcontainermore(body);
}
/*****加载更多******/
function HelpGETcontainermore(databody) {
	var helpDate = '';
	$('.HelpPagemore').empty().append('<img src="img/loading.gif" alt="" />');
	var INnum=$('.Helptotal').text();
	if(INnum!=0){
	  $("input[name='HelpInputAll']").prop("indeterminate", true);
	}
	$.getJSON(STATION_URL + '?Body=' + databody,
		function(ret) {
			var helpDate;
			if (ret.Result == 200) {
				
				var pageTotal = ret.PageTotalCount;
 
				// for(var i=0;i<ret.Resources.length;i++){
				// 	 var time=ret.Resources[i].Time.slice(0,16);
    //                      ret.Resources[i].Time=time;
				// }
 
				 

				var getHelpcode=ret.Resources;
//				   if(ret.Resources==""||ret.Resources==null){
//				   	   Pulley_judge = true;
//				   	    return;
//				   }
					//console.log("----------"+JSON.stringify(HelpcordeArray));
					//console.log("----------"+JSON.stringify(HelpcordeArray.concat(getHelpcode)));
				    HelpcordeArray= HelpcordeArray.concat(getHelpcode);
				var timeID = ret.Resources[0].Time.split(" ");
				var timeIDs = timeID[0];
				if ($('#s' + timeIDs + '').length > 0) {
					helpDate = timeIDs;
				} else {
					helpDate = '';
				}
				$('.HelpPagemore').remove();
				for (var i = 0; i < ret.Resources.length; i++) {
					var time = ret.Resources[i].Time.split(" ");
					var time1 = time[0];
					var time2 = time[1].slice(0,5);
					if (helpDate != time1) {
						var html = '';
						html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
						$('#loaded').append(html);
						helpDate = time1;
					}
					var html1 = '';
					if (ret.Resources[i].ResType == 0) {
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						var imglens;
						if (ret.Resources[i].Content!=''&&ret.Resources[i].Content!=' ') {
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						}else{
							iconimg = '';
						}
						if (ret.Resources[i].ResCount > 1) {
							imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						} else {
							imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						}
						html1 = '<li class="fix" types="0" users="' + ret.Resources[i].Uid + '" id="h' + ret.Resources[i].ResId + '"   username="' + ret.Resources[i].Name + '" user_id="' + ret.Resources[i].Uid + '" ulr="' + ret.Resources[i].ResUrl + '" time="' + ret.Resources[i].Time + '" Detail="' + ret.Resources[i].Detail + '" con="' + ret.Resources[i].Content + '" len="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + ret.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (ret.Resources[i].ResType == 1) {
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						if (ret.Resources[i].Content!=''&&ret.Resources[i].Content!=' ') {
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						} else {
							iconimg = '';
						}
						html1 = '<li class="fix" types="1" users="' + ret.Resources[i].Uid + '" id="h' + ret.Resources[i].ResId + '"  user_id="' + ret.Resources[i].Uid + '"   username="' + ret.Resources[i].Name + '" ulr="' + ret.Resources[i].ResUrl + '" time="' + ret.Resources[i].Time + '" Detail="' + ret.Resources[i].Detail + '" len="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"  con="' + ret.Resources[i].Content + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="helpleve2(this)">' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + ret.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (ret.Resources[i].ResType == 2) {
						html1 = '<li class="fix" types="2" time="' + ret.Resources[i].Time + '"  users="' + ret.Resources[i].Uid + '"  id="h' + ret.Resources[i].ResId + '"  user_id="' + ret.Resources[i].Uid + '"   username="' + ret.Resources[i].Name + '" ulr="' + ret.Resources[i].ResUrl + '" len="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + ret.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (ret.Resources[i].ResType == 3) {
						html1 = '<li class="fix" types="3" users="' + ret.Resources[i].Uid + '" user_id="' + ret.Resources[i].Uid +'" id="h'+ret.Resources[i].ResId +'"   username="' + ret.Resources[i].Name + '" ulr="' + ret.Resources[i].ResUrl + '" len="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + ret.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (ret.Resources[i].ResType == 10) {
						html1 = '<li class="fix" types="10" users="' + ret.Resources[i].Uid + '"    id="h'+ret.Resources[i].ResId +'"   user_id="' + ret.Resources[i].Uid + '"  username="' + ret.Resources[i].Name + '" reportid="' + ret.Resources[i].ResId + '"  ulr="' + ret.Resources[i].ResUrl + '" time="' + ret.Resources[i].Time + '" len="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_warn.png" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span></span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (ret.Resources[i].ResType == 11) {
						html1 = '<li class="fix" types="11" id="h'+ret.Resources[i].ResId +'"  users="' + ret.Resources[i].Uid + '"  user_id="' + ret.Resources[i].Uid + '" reportid="' + ret.Resources[i].ResId + '" username="' + ret.Resources[i].Name + '"  len="' + ret.Resources[i].ResCount + '"  ulr="' + ret.Resources[i].ResUrl + '" time="' + ret.Resources[i].Time + '" li="' + ret.Resources[i].ResCount + '" read="' + ret.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+ret.Resources[i].ResId +'He"><label for="'+ret.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_radio.png" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + ret.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + ret.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					}
				}
				Helpnum =HelpcordeArray.length;
				HelpNull = Helpnum;
				Helpmorecode[0]=databody;
				Helpmorecode[1]=pageTotal;
				$('.Help_inputdivall ').removeClass('userall_selected');
				if (ret.Resources.length >= 30) {
					HelparrayLength=true;
					helpscorell(Helpmorecode[0], Helpmorecode[1]);
				}else{
					HelparrayLength=false;
				}
				$('#loading').hide();
				$('.choose-sec').hide();
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('#loaded').show();
			} else {
				$('#loaded').empty().append('<h3 class="help_wu">获取数据失败</h3>');
				$('#loading').hide();
				$('#loaded').show();
			}
		})
}



/*取消*/
function HelpDelcancel(data) {
	$(data).parent().slideUp('slow');
	$('.helpfour').children().eq(3).children().attr('src', 'img/icon/newicon/help_deleted.png');
}
/*确认删除*/
function HelpDelsure(data) {

	var ids = $(data).parent().prev().attr('help_id');
	var type = $(data).parent().prev().attr('types');
	var body;
	var id = ids.replace(/[^\d]/g, '');
	var len = $('#h' + ids).parent().children().length;
	var lens = $('#h' + id).parent().children().length;
	if (type == 3) {
	    body = '{"Code":"11101","Body":{"SessionId":"' + sessionId + '","VideoIds":["'+id+'"]}}';
	} else if (type == 2) {
		body = '{"Code":10405,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":[{"ReportId":' + id + ',"ResType":2}]}}';
	} else {
		body = '{"Code":"10401","Body":{"SessionId":"' + sessionId + '","ReportIds":["' + id + '"]}}';
	}

	/**********开始*************/
	 var arr=[lens,type,id];
     var conword='删除失败!';
     AjaxPostMsg(body, AJAXSET_TIME, HelpAjaxSucessRemove, MediaErrorDown, MediaAjaxovertime, true, arr,conword);
    //  console.log(body);
	// $.getJSON('' + STATION_URL + '?Body=' + body + '',
	// 	function(ret) { 
			// if (ret.Result == 200) {
			// 	$('.sec-fun').hide();
			// 	if (len == 1) {
			// 		$('#h' + ids).parent().parent().parent().remove();
			// 	} else {
			// 		$('#h' + ids).remove();
			// 	}
			// 	if (lens == 1) {
			// 		$('#h' +id).parent().parent().parent().remove();
			// 	} else {
			// 		$('#h' +id).remove();
			// 	}
			// 	$('.sec-fun').hide();
			// 	 showAlert('已删除！');
			//      Helpremovelocal(id,type);
			// 	$('.help_leftbtn').show();
			// }else{
			// 	 showAlert('删除失败！');
			// }
	// 	})
	/**********结束**********/
}

function isIE() { //ie?
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

function HelpGetdown (data) {
	var url= $(data).parent().attr('ulr');
	var len = $(data).parent().attr('len');
	var help_id = $(data).parent().attr('help_id');
	var reg = /[0-9]+/;
	var Ids = help_id.match(reg);
	var user_id = $(data).parent().attr('user_id');
	var type = $(data).parent().attr('types');
	var time= $(data).parent().attr('time');
	// var time=Help_downGetTime(Ids,type); 
	$('.help_level2_share').slideUp();
	$('.helpforward').children('img').attr('src','img/icon/newicon/help_share.png'); 
	$('.help_level2delete').slideUp();
	$('.helpforward').next().children('img').attr('src','img/icon/newicon/help_deleted.png'); 
	$(data).children('img').attr('src','img/icon/newicon/help_downloads.png');
	if(type==3){
       url=$('.help_bgs').attr('ulr');
       len=0;
	}else{
		url = $(data).parent().attr('ulr');
	}
	var urlbase=toBase64(url);
	if (type == 2) {
		type = 0;
	}else if(type == 3) {
		type = 1;
	}

	if (isIE()) {

		HelpDownIeShow(urlbase, type, len, user_id, Ids,time);

	} else {
		HelpDownIeShow(urlbase, type, len, user_id, Ids,time);
		// if(type==3){ 
		//     //函数
		//         for(var i=0;i<HelpDownImgs.length;i++){
		//               	downloadFile(HelpDownImgs[i]);
		//         }
		//    }else{ 
		//      if(len==1||len==0){
		//         downloadFile(url);
		//       $(data).children().attr('src','img/icon/newicon/help_downloads.png');
		//      }else{
		//        //函数
		//         for(var i=0;i<HelpDownImgs.length;i++){
		//               	downloadFile(HelpDownImgs[i]);
		//         }

		//      }
		// }
	}
}

function Help_downGetTime (Ids, type) {
         for(var i=0;i<HelpcordeArray.length;i++){
            if(HelpcordeArray[i].ResId==Ids &&HelpcordeArray[i].ResType==type){
            	return HelpcordeArray[i].Time;
            }
         }
	}
// function HelpDownIe(val1,val2,val3,val4,val5){
// 	//url,type,len,user_id
// 	 alert(val5);
// 	    var reg = /[0-9]+/;
//     var id=val4.match(reg);


//     var datas=[];
//        var data=''; 
//  //当type为3时 数据就不准确 ？
//        if(val2==3){ 
//              //函数
//               for(var i=0;i<HelpDownImgs.length;i++){
//                   datas[i]='{"Url":"'+HelpDownImgs[i]+'","ResType":'+val2+',"Uid":"'+val4+'"}';
//                }



//                HelpDownIeShow(datas);
//            }else{ 
//             if(val3==1||val3==0){
//                data='{"Url":"'+val1+'","ResType":'+val2+',"Uid":"'+val4+'"}';
//                 HelpDownIeShow(data);
//              }else{
//               //函数
//               for(var i=0;i<HelpDownImgs.length;i++){
//                  datas[i]='{"Url":"'+HelpDownImgs[i]+'","ResType":'+val2+',"Uid":"'+val4+'"}';
//               } 
//                HelpDownIeShow(datas);
//           }
//      }
// }
	function HelpDownIeShow(val1, val2, val3, val4, val5, val6) {
		//       HelpDownIeShow(url,type,len,user_id,Ids);
		if (val2 == 3) {
			val2 = 1;
		}
		// if(val3==undefined){
		// 	val3=1;
		// }
		var data = '{"Url":"' + val1 + '","ResType":"' + val2 + '","ResCount":"' + val3 + '","Uid":"' + val4 + '","ReportIds":"' + val5 + '","ResourceTime":"'+val6+'"}';
		var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[' + data + ']}}';
		console.log('下载'+body);
	     var arr=[];
	     var conword='下载失败！';
	     console.log('和助手下载'+JSON.stringify(body));
	     AjaxPostMsgDown(body, AJAXSET_TIME, MediaSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr,conword);
	}

function HelpSearch(inname) {
     HelpChoose = 0;
     HelpFintbtn();
     $('input[name=HelpInputAll]').attr('disabled', false);
	 $('.Help_inputdivall ').removeClass('userall_selected');
	 $('.HelpRead').attr('disabled', true);
	var vals=$("input[name='"+inname+"']").val();
     if(vals.length==0){
         HelpSearchAll();
     }else{
         HelpSearchval(vals); 
     }
}

function HelpSearchval(data){
     var HelpArrs =[];
     if(HelpcordeArray.length==0){
     	var lis=$('#loaded').has('.help_wu').length;
        if(lis==1){
        	// showAlert('没有数据,请重新选择!');
        	$('#loaded').empty().append('<h3 class="help_wu">无相关记录</h3>'); 
            // $('.HelpCsearchs').val('');
     	     return;
        }else{
             showAlert('数据还未加载完成,请稍后重新筛选!');
     	     $('.HelpCsearchs').val('');
     	     return;
        }
     }
     HelpArrs = HelpListfor(data);
     HelpArrHtml(HelpArrs, data);
 }
function HelpListfor(data) {
     var HelpListArr = [];
     for (var i = 0; i < HelpcordeArray.length; i++) {
       var user_id = HelpcordeArray[i].Uid;
       var user_name = HelpcordeArray[i].Name;
       var user_Content = HelpcordeArray[i].Content;
       var user_Detail = HelpcordeArray[i].Detail;
       if ((user_id.indexOf(data) > -1) || (user_name.indexOf(data) > -1) || (user_Content.indexOf(data) > -1) || (user_Detail.indexOf(data) > -1)) {
         HelpListArr.push(HelpcordeArray[i]);
       }
     }
     return HelpListArr;
   }
   
 function HelpArrHtml(data, key){
      $('#loaded').empty();
	 var helpDate='';
	  if (data.length == 0) {
        $('#loaded').append('<h3 class="help_wu">无相关记录</h3>'); 
        return;
     }
       for (var i = 0; i < data.length; i++) {
          var time = data[i].Time.split(" ");
          var time1 = time[0];
          var time2 = time[1].slice(0,5);
          if (helpDate != time1) {
            var html = '';
            html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
            $('#loaded').append(html);
            helpDate = time1;
          }
          var html1 = '';
          var userName=data[i].Name;
          var userDet=data[i].Detail;
          var getIndexOf=userName.indexOf(key);
          var getIndexDet=userDet.indexOf(key);

          if(getIndexOf>-1){
          	userName=userName.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
          }
          if(getIndexDet>-1){
          	userDet=userDet.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
          }

          if ( data[i].ResType == 0) {   //图片
            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            var imglens;
            if ( data[i].Content == '') {
              iconimg = '';
            } else {
              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            }
            if ( data[i].ResCount > 1) {
                if(data[i].ReadStatus==0){
                    imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
               }else{
                   imglens = '<img src="img/icon/newicon/meida_nums1.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
               }
            } else {
              imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
                if(data[i].ReadStatus==0){
                    imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
               }else{
                   imglens = '<img src="img/icon/newicon/help_img2s.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
               }
            }

            html1 = '<li class="fix" types="0" id="h' +  data[i].ResId + '"   username="' +  data[i].Name + '" user_id="' +  data[i].Uid + '" ulr="' +  data[i].ResUrl + '" time="' +  data[i].Time + '" Detail="' +  data[i].Detail + '" con="' + data[i].Content + '" len="' +  data[i].ResCount + '" read="' +  data[i].ReadStatus + '" users="' +  data[i].Uid + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' +  userName + '</span><span class="fr">' + time2 + '</span></p><span>' +  userDet + '</span></div></li>';
          } else if ( data[i].ResType == 1){ //视频
               var readimg;
               if(data[i].ReadStatus==0){
                  readimg='img/icon/newicon/help_video.png';
               }else{
                  readimg='img/icon/newicon/help_videos.png';
               }
            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            if ( data[i].Content == ''){
              iconimg = '';
            }else{
              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            }
            html1 = '<li class="fix" types="1" users="' +  data[i].Uid + '" id="h' +  data[i].ResId + '"  user_id="' + data[i].Uid + '"   username="' +  data[i].Name + '" ulr="' +  data[i].ResUrl + '" time="' +  data[i].Time + '" Detail="' +  data[i].Detail + '" len="' +  data[i].ResCount + '" read="' +  data[i].ReadStatus + '"  con="' +  data[i].Content + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span><img src="'+readimg+'" class="Helpupvideo" alt="" onclick="helpleve2(this)">' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' +  userName + '</span><span class="fr">' + time2 + '</span></p><span>' +  userDet + '</span></div></li>';
          } else if ( data[i].ResType == 2) { //抓拍
             var readimg;
               if(data[i].ReadStatus==0){
                  readimg='img/icon/newicon/help_img.png';
               }else{
                  readimg='img/icon/newicon/help_imgs.png';
               }
            html1 = '<li class="fix" types="2"  time="' +  data[i].Time + '" users="' +  data[i].Uid + '" id="h' +  data[i].ResId + '"  user_id="' +  data[i].Uid + '"   username="' +  data[i].Name + '" ulr="' +  data[i].ResUrl + '" len="' +  data[i].ResCount + '" read="' +  data[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  userName + '</span><span class="fr">' + time2 + '</span></p><span>' +  userDet + '</span></div></li>';
          } else if ( data[i].ResType == 3) { //实时视频
             var readimg;
               if(data[i].ReadStatus==0){
                  readimg='img/icon/newicon/help_videoline.png';
               }else{
                  readimg='img/icon/newicon/help_videolines.png';
               }
            html1 = '<li class="fix" types="3" users="' + data[i].Uid + '" user_id="' +  data[i].Uid + '" id="h' +  data[i].ResId + '"   username="' +  data[i].Name + '" ulr="' +  data[i].ResUrl + '" len="' + data[i].ResCount + '" read="' + data[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + userName + '</span><span class="fr">' + time2 + '</span></p><span>' +  userDet + '</span></div></li>';
          } else if ( data[i].ResType == 10) { //告警
               var readimg;
               if(data[i].ReadStatus==0){
                  readimg='img/icon/newicon/help_warn.png';
               }else{
                  readimg='img/icon/newicon/help_warnas.png';
               }
            html1 = '<li class="fix" types="10" users="' +  data[i].Uid + '" user_id="' +  data[i].Uid + '"   userid="' +  data[i].Uid + '"  username="' +  data[i].Name + '" reportid="' +  data[i].ResId + '"  id="h' +  data[i].ResId + '" ulr="'+  data[i].ResUrl + '" time="' +  data[i].Time + '" len="' +  data[i].ResCount + '" read="' +  data[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  userName + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
          } else if ( data[i].ResType == 11) { //广播
            var readimg;
               if(data[i].ReadStatus==0){
                  readimg='img/icon/newicon/help_radio.png';
               }else{
                  readimg='img/icon/newicon/help_radios.png';
               }
            html1 = '<li class="fix" types="11" users="' +  data[i].Uid + '"  user_id="' +  data[i].Uid + '" reportid="' +  data[i].ResId + '" id="h' +  data[i].ResId + '" username="' +  data[i].Name + '" ulr="' +  data[i].ResUrl + '" time="' +  data[i].Time + '" len="' +  data[i].ResCount + '" read="' +  data[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+data[i].ResId +'He"><label for="'+data[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  userName + '</span><span class="fr">' + time2 + '</span></p><span>' +  userDet + '</span></div></li>';
          }
          $('#s' + time1).children('.helpdatebg').children('ul').append(html1);
        }

       Helpnum=data.length;
       HelpNull = Helpnum;
 }  

function HelpSearchAll(){
	
		$('#loaded').empty();
			 var helpDate='';
		
		
		  for (var i = 0; i < HelpcordeArray.length; i++) {
		          var time = HelpcordeArray[i].Time.split(" ");
		          var time1 = time[0];
		          var time2 = time[1].slice(0,5);
		          if (helpDate != time1) {
		            var html = '';
		            html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
		            $('#loaded').append(html);
		            helpDate = time1;
		          }
		          var html1 = '';
		          if ( HelpcordeArray[i].ResType == 0) {  
		            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
		            var imglens;
		            if ( HelpcordeArray[i].Content == '') {
		              iconimg = '';
		            } else {
		              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
		            }
		            if ( HelpcordeArray[i].ResCount > 1) {
		                if(HelpcordeArray[i].ReadStatus==0){
		                    imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
		          	   }else{
		                   imglens = '<img src="img/icon/newicon/meida_nums1.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
		          	   }
		            } else {
		              imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
		                if(HelpcordeArray[i].ReadStatus==0){
		                    imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
		          	   }else{
		                   imglens = '<img src="img/icon/newicon/help_img2s.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
		          	   }
		            }
		            html1 = '<li class="fix" types="0" id="h' +  HelpcordeArray[i].ResId + '"   username="' +  HelpcordeArray[i].Name + '" user_id="' +  HelpcordeArray[i].Uid + '" ulr="' +  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" Detail="' +  HelpcordeArray[i].Detail + '" con="' + HelpcordeArray[i].Content + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '" users="' +  HelpcordeArray[i].Uid + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		          } else if ( HelpcordeArray[i].ResType == 1){
		          	   var readimg;
		          	   if(HelpcordeArray[i].ReadStatus==0){
		                  readimg='img/icon/newicon/help_video.png';
		          	   }else{
		                  readimg='img/icon/newicon/help_videos.png';
		          	   }
		            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
		            if ( HelpcordeArray[i].Content == ''){
		              iconimg = '';
		            }else{
		              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
		            }
		            html1 = '<li class="fix" types="1" users="' +  HelpcordeArray[i].Uid + '" id="h' +  HelpcordeArray[i].ResId + '"  user_id="' + HelpcordeArray[i].Uid + '"   username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" Detail="' +  HelpcordeArray[i].Detail + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"  con="' +  HelpcordeArray[i].Content + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="'+readimg+'" class="Helpupvideo" alt="" onclick="helpleve2(this)">' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		          } else if ( HelpcordeArray[i].ResType == 2) {
		          	 var readimg;
		          	   if(HelpcordeArray[i].ReadStatus==0){
		                  readimg='img/icon/newicon/help_img.png';
		          	   }else{
		                  readimg='img/icon/newicon/help_imgs.png';
		          	   }
		            // html1 = '<li class="fix" types="2"  time="' +  HelpcordeArray[i].Time + '" users="' +  HelpcordeArray[i].Uid + '" id="h' +  HelpcordeArray[i].ResId + '"  user_id="' +  HelpcordeArray[i].Uid + '"   username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"> <span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		             html1 = '<li class="fix" types="2" users="' + HelpcordeArray[i].Uid + '" user_id="' +  HelpcordeArray[i].Uid + '" id="h' +  HelpcordeArray[i].ResId + '"   username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" len="' + HelpcordeArray[i].ResCount + '" read="' + HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		          } else if ( HelpcordeArray[i].ResType == 3) {
		          	 var readimg;
		          	   if(HelpcordeArray[i].ReadStatus==0){
		                  readimg='img/icon/newicon/help_videoline.png';
		          	   }else{
		                  readimg='img/icon/newicon/help_videolines.png';
		          	   }
		           html1 = '<li class="fix" types="3" users="' + HelpcordeArray[i].Uid + '" user_id="' +  HelpcordeArray[i].Uid + '" id="h' +  HelpcordeArray[i].ResId + '"   username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" len="' + HelpcordeArray[i].ResCount + '" read="' + HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+HelpcordeArray[i].ResId +'He"><label for="'+HelpcordeArray[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
								//html1 = '<li class="fix" types="3" users="' + HelpcordeArray[i].Uid + '" user_id="' +  HelpcordeArray[i].Uid + '" id="h' +  HelpcordeArray[i].ResId + '"   username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" len="' + HelpcordeArray[i].ResCount + '" read="' + HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		          } else if ( HelpcordeArray[i].ResType == 10) {
		          	   var readimg;
		          	   if(HelpcordeArray[i].ReadStatus==0){
		                  readimg='img/icon/newicon/help_warn.png';
		          	   }else{
		                  readimg='img/icon/newicon/help_warnas.png';
		          	   }
		            //html1 = '<li class="fix" types="10" users="' +  HelpcordeArray[i].Uid + '" user_id="' +  HelpcordeArray[i].Uid + '"   userid="' +  HelpcordeArray[i].Uid + '"  username="' +  HelpcordeArray[i].Name + '" reportid="' +  HelpcordeArray[i].ResId + '"  id="h' +  HelpcordeArray[i].ResId + '" ulr="'+  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"> <span class="Mediabginput"></span><img src="'+readimg+'" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
								html1 = '<li class="fix" types="10" users="' +  HelpcordeArray[i].Uid + '" user_id="' +  HelpcordeArray[i].Uid + '"   userid="' +  HelpcordeArray[i].Uid + '"  username="' +  HelpcordeArray[i].Name + '" reportid="' +  HelpcordeArray[i].ResId + '"  id="h' +  HelpcordeArray[i].ResId + '" ulr="'+  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"> <span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+HelpcordeArray[i].ResId +'He"><label for="'+HelpcordeArray[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
		          } else if ( HelpcordeArray[i].ResType == 11) {
		          	var readimg;
		          	   if(HelpcordeArray[i].ReadStatus==0){
		                  readimg='img/icon/newicon/help_radio.png';
		          	   }else{
		                  readimg='img/icon/newicon/help_radios.png';
		          	   }
		            //html1 = '<li class="fix" types="11" users="' +  HelpcordeArray[i].Uid + '"  user_id="' +  HelpcordeArray[i].Uid + '" reportid="' +  HelpcordeArray[i].ResId + '" id="h' +  HelpcordeArray[i].ResId + '" username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"> <span class="Mediabginput"></span><img src="'+readimg+'" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
								html1 = '<li class="fix" types="11" users="' +  HelpcordeArray[i].Uid + '"  user_id="' +  HelpcordeArray[i].Uid + '" reportid="' +  HelpcordeArray[i].ResId + '" id="h' +  HelpcordeArray[i].ResId + '" username="' +  HelpcordeArray[i].Name + '" ulr="' +  HelpcordeArray[i].ResUrl + '" time="' +  HelpcordeArray[i].Time + '" len="' +  HelpcordeArray[i].ResCount + '" read="' +  HelpcordeArray[i].ReadStatus + '"><div class="help_main_dateli fl"> <span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+HelpcordeArray[i].ResId +'He"><label for="'+HelpcordeArray[i].ResId +'He"></label></span><img src="'+readimg+'" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' +  HelpcordeArray[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +  HelpcordeArray[i].Detail + '</span></div></li>';
		          }
		          $('#s' + time1).children('.helpdatebg').children('ul').append(html1);
		        }
		        Helpnum=HelpcordeArray.length;
		        HelpNull = Helpnum;
		         if(HelparrayLength){
		         	helpscorell(Helpmorecode[0], Helpmorecode[1]);
		         }
	
}



// function HelpSearchshow(val) {
// 	$('#loaded').hide();
// 	var total = $('#loaded').children();
// 	var HelpArrlist = '';
// 	HelpArrlist = HelpListfor(val);
// 	HelpSearchHtml(HelpArrlist);
// }

// function HelpListfor(val) {
// 	var HelpArrs = [];
// 	for (var i = 0; i < HelpcordeArray.length; i++) {
// 		var user_id = HelpcordeArray[i].Uid;
// 		var user_name = HelpcordeArray[i].Name;
// 		var id = HelpcordeArray[i].ResId;
// 		if ((user_id.indexOf(val) > -1) || (user_name.indexOf(val) > -1) || (id.indexOf(val) > -1)) {
// 			HelpArrs.push(HelpcordeArray[i]);
// 		}
// 	}
// 	return HelpArrs;
// }

// function HelpSearchHtml(data) {
// 	var helpDate = '';
// 	$('#loadeds').empty();
// 	if (data.length == 0) {
// 		$('#loadeds').append('<h3 class="help_wu">无相关记录</h3>')
// 	}
// 	for (var i = 0; i < data.length; i++) {
// 		var time = data[i].Time.split(" ");
// 		var time1 = time[0];
// 		var time2 = time[1];
// 		if (helpDate != time1) {
// 			var htmls = '';
// 			htmls += '<div class="help_main_date" id="x' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
// 			$('#loadeds').append(htmls);
// 			helpDate = time1;
// 		}
// 		var html1s = '';
// 		if (data[i].ResType == 0) {
// 			html1s = '<li class="fix" types="0" id="P' + data[i].ResId + '"   username="' + data[i].Name + '" user_id="' + data[i].Uid + '" ulr="' + data[i].ResUrl + '" time="' + data[i].Time + '" Detail="' + data[i].Detail + '"><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_img2.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		} else if (data[i].ResType == 1) {
// 			html1s = '<li class="fix" types="1" id="P' + data[i].ResId + '"  user_id="' + data[i].Uid + '"   username="' + data[i].Name + '" ulr="' + data[i].ResUrl + '" time="' + data[i].Time + '" Detail="' + data[i].Detail + '" ><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_video.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		} else if (data[i].ResType == 2) {
// 			html1s = '<li class="fix" types="2" id="P' + data[i].ResId + '"  user_id="' + data[i].Uid + '"   username="' + data[i].Name + '" ulr="' + data[i].ResUrl + '"><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_img.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		} else if (data[i].ResType == 3) {
// 			html1s = '<li class="fix" types="3" user_id="' + data[i].Uid + '" id="P' + data[i].ResId + '"   username="' + data[i].Name + '" ulr="' + data[i].ResUrl + '"><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_videoline.png" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		} else if (data[i].ResType == 10) {
// 			html1s = '<li class="fix" types="10" user_id="' + data[i].Uid + '"      username="' + data[i].Name + '" reportid="' + data[i].ResId + '"  ulr="' + data[i].ResUrl + '" time="' + data[i].Time + '"><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_warn.png" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis"><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		} else if (data[i].ResType == 11) {
// 			html1s = '<li class="fix" types="11"  userid="' + data[i].Uid + '" reportid="' + data[i].ResId + '" username="' + data[i].Name + '" ulr="' + data[i].ResUrl + '" time="' + data[i].Time + '"><div class="help_main_dateli fl"><input type="checkbox" name="HelpInput" onclick="HelpInputSelect(this)" /><img src="img/icon/newicon/help_radio.png" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
// 			$('#x' + time1).children('.helpdatebg').children('ul').append(html1s);
// 		}
// 	}
	 
// 	 Helpnum=data.length;
// 	 HelpNull = Helpnum;
// }


function Help_Go(that) {
	var types = 0;
	// var loginer = $('#company_name').text();
	var partneli = $('#loaded').find('.help_bgs');
	var callusername = partneli.attr('username');
	var userphone = partneli.attr('user_id');
	var names = callusername;
	callmake_org_imp(names, userphone, types,1);
}
function HelpGetchecked(){
	      helpselectid= [];
     $('#loaded input[type=checkbox]').each(function(i) {
       if ($(this).is(':checked')) { 
         var id = $(this).parent().parent().parent().attr('id');
         var ids=id.replace('h','');
          helpselectid.push(ids);
       }
     })
}
function HelpEmptycheck(){
	 helpselectid= [];
}
function HelpInputAll(data) {
		// $(data).attr('disabled', false);
	    Helpnum =document.getElementsByName("HelpInput").length;
		if ($(data).hasClass('userall_selected')) {

			$(data).removeClass('userall_selected');
			$("input[name='HelpInput']").prop("checked", false);
			HelpEmptycheck();
			HelpChoose = 0;
			HelpNull = Helpnum;
			if (HelpChoose == 0) {
				$('#HelpRead').attr('disabled', 'true');
		        $('#HelpRead').removeClass('HelpReads');
			}else{
				$('#HelpRead').removeAttr('disabled');
		        $('#HelpRead').addClass('HelpReads');
			}

		}else{

			$(data).addClass('userall_selected');
			$("input[name='HelpInput']").prop("checked", true);
			HelpGetchecked();
			HelpChoose = Helpnum;
			HelpNull = 0;
			if (HelpChoose == 0) {
				$('#HelpRead').attr('disabled', 'true');
		        $('#HelpRead').removeClass('HelpReads');
			} else {
				$('#HelpRead').removeAttr('disabled');
		        $('#HelpRead').addClass('HelpReads');
			}

		}
		$('.Helptotal').text(HelpChoose);
}
 function HelpRemoveDOMlastid(ids){
 
    if(helpselectid==''){
          return;
    }
   if(helpselectid.length==1&&helpselectid==ids){
        // console.log('最后一个标注')
            helpselectid=[];
        var HelpNull = Helpnum; 
          HelpChoose -= 1;  
          HelpNull+=  1;
         $('.itemCount .Helptotal').text(MediaChoose);
         $(".itemCount input[name='listAll']").prop("checked", false);         
        return;
    }else{
    	var HelpNull = Helpnum; 
        for(var i=0;i<helpselectid.length;i++){
           if(helpselectid[i]==ids){
               console.log('完成删除');
                helpselectid.splice(i,1);
                  HelpChoose -= 1;  
                  HelpNull+=1;
                $("input[name='HelpInputAll']").prop("indeterminate", true); 
                $('.Helptotal').text(HelpChoose);
            }
        }
    }
  return; 
 } 
function HelpInputSelect(obj) {
	
	if ($(obj).is(':checked')) {
		HelpChoose += 1; //选中人数
		HelpNull -= 1; //没有选中剩余人数
	  var ids=$(obj).parent().parent().parent().attr('id');
	  var idsnum = ids.replace('h','');
	  helpselectid.push(idsnum);
	} else {
		HelpChoose -= 1;
		HelpNull += 1;
	 var ids=$(obj).parent().parent().parent().attr('id');
	 var idsnum = ids.replace('h','');	
	  HelpRemoveSelcet(idsnum);
	}
	$('.Helptotal').text(HelpChoose);
	if (HelpChoose == 0) {
		$('#HelpRead').attr('disabled', 'true');
		$('#HelpRead').removeClass('HelpReads');
	} else {
		$('#HelpRead').removeAttr('disabled');
		$('#HelpRead').addClass('HelpReads');
	}
	console.log(HelpNull);
	if (HelpNull == 0) {
		// $("input[name='HelpInputAll']").prop("checked", true);
		// $("input[name='HelpInputAll']").prop("indeterminate", false);
		$('.Help_inputdivall').addClass('userall_selected');
	} else if (HelpChoose == 0) {
		// $("input[name='HelpInputAll']").prop("checked", false);
		// $("input[name='HelpInputAll']").prop("indeterminate", false);
		$('.Help_inputdivall').removeClass('userall_selected');

	} else {
		// $("input[name='HelpInputAll']").prop("indeterminate", true);
		$('.Help_inputdivall').removeClass('userall_selected');
	}
}

function HelpRemoveSelcet(ids){
	if(helpselectid==''){
	       return;
	}
	if(helpselectid.length==1&&helpselectid==ids){
	       helpselectid=[];
	      return;
	}
    for(var i=0;i<helpselectid.length;i++){
       if(helpselectid[i]==ids){
         helpselectid.splice(i,1);
       }
    }  
}

function HelpReadAll(data) { 
	var urlnums = [];
    var urlreadnums=[]; 
	var reg = /[0-9]+/;
	$('#loaded input[type=checkbox]').each(function(i) {
		if ($(this).is(':checked')) {
			var id = $(this).parent().parent().parent().attr('id');
			var type = $(this).parent().parent().parent().attr('types');
			var len = $(this).parent().parent().parent().attr('len');
			var Id = id.match(reg);
			var read=$(this).parent().parent().parent().attr('read');
			var MediaNumArr = [];
			MediaNumArr[0] = Id;
			MediaNumArr[1] = type;
			MediaNumArr[2] = len;
			MediaNumArr[3] = read;
			urlnums.push(MediaNumArr);
		}
	})
	for(var i=0;i<urlnums.length;i++) {
        if(urlnums[i][3]!=1){
        	urlreadnums.push(urlnums[i]);
        }
	}
	HelpJson(urlreadnums);
}

function HelpJson(data) {
	 // alert(data.length);
	 // return;
	 // alert(JSON.stringify(data));
	 // return;
	var HelpWarns = [];
	var HelpRadios = [];
	var HelpImg = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i][1] == 10) {
			// HelpWarns.push(data[i]);
			HelpImg.push(data[i]);
		} else if (data[i][1] == 11) {
			// HelpRadios.push(data[i]);
			HelpImg.push(data[i]);
		} else {
			HelpImg.push(data[i]);
		}
	}
	if (HelpImg.length != 0) {
		var Imgs = HelPReadImg(HelpImg);
	}
	if (HelpWarns.length != 0) {
		var Warns = HelPReadWarns(HelpWarns);
	}
	if (HelpRadios.length != 0) {
		var Radios = HelPReadReadio(HelpRadios);
	}
	// HelpReadAlls(Imgs,Warns,Radios);
}


function HelPReadImg(data) {
	var Imgs = [];
	for (var i = 0; i < data.length; i++) {
		var str = '{"ReportId":' + data[i][0][0] + ',"ResType":' + data[i][1] + '}';
		Imgs.push(str);
	}
	var body = '{"Code":10403,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":[' + Imgs + ']}}';
	// console.log('报文请求'+JSON.stringify(body));
	/*********************开始********************/
	var arr=[];
	var conword='设为已读失败！';
	   AjaxPostMsg(body, AJAXSET_TIME, HelpAjaxRead, HelpAjaxReadErron, helpAjaxovertime, true, arr, conword);
	// var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
     // $('.cover_loading').show();
        // $.ajax({
        //   type: "post",
        //   url:'http://112.33.9.251:4489/station/mobile/serverapi.action',
        //   data:body,
        //   contentType:'application/json;charset=utf-8',
        //   dataType:'json',
        //   success: function(ret) {
        //      // console.log(JSON.stringify(ret));
        //      // MediaRemovepost(data);
        //      HelpReadPost(ret,data);
        //   },
        //   error:function(ret){
        //       showAlert('设为已读失败！');
        //       console.log('失败'+JSON.stringify(ret));
        //       $('.cover_loading').hide();
        //   }
        // }); 
    /********************结束*****************************/
}




function HelPReadReadio(data) {
	var radio = [];
	var select;
	var types=11;
	for (var i = 0; i < data.length; i++) {
		radio.push(data[i][0][0]);
	}
	var body = '{"Code":10504,"Body":{"SessionId":\"' + sessionId + '\","BroadcastIds":[ ' + radio + ' ]}}';
	// console.log(body);
	// $.ajaxSettings.async = false;
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				for (var k = 0; k < radio.length; k++) {
					$('#h' + radio[k]).addClass('HelpBgColor');
					$('#h' + radio[k]).find('img').attr('src', 'img/icon/newicon/help_radios.png');
					$('#h' + radio[k]).attr('read','1');
				}
				  //   select = true;
                   Helpnumread=Helpnumread-radio.length; 
                  if(Helpnumread>99){
                  $('.helpnumsbg').html('99+');
                  $('.helpnumsbg').show();
                }else if(Helpnumread==0) {
                  $('.helpnumsbg').hide();

                }else {
                   $('.helpnumsbg').html(Helpnumread);
                   $('.helpnumsbg').show();
                }




                HelpRemovelocalarray(radio,types);
                 for(var i=0;i<HelpcordeArray.length;i++){
                      for(var k=0;k<radio.length;k++){
                         if(HelpcordeArray[i].ResId==radio[k]){
                            HelpcordeArray[i].ReadStatus=1;
                         } 
                      }
                   }  
                   // help11411();
			} else {
			 
				select = false;
			}
		})
	return select;
}

function HelPReadWarns(data) {
	var warns = [];
	var select;
	var types=10;
	for (var i = 0; i < data.length; i++) {
		warns.push(data[i][0][0]);
	}
	// $.ajaxSettings.async = false;
	var body = '{"Code":10709,"Body":{"SessionId":\"' + sessionId + '\","WarningIds":['+warns+']}}';
	// console.log(body);
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				for (var k = 0; k < warns.length; k++) {
					$('#h' + warns[k]).addClass('HelpBgColor');
					$('#h' + warns[k]).attr('read','1');
					$('#h' + warns[k]).find('img').attr('src', 'img/icon/newicon/help_warnas.png');
				}
				select = true;
	 


                     Helpnumread=Helpnumread-warns.length; 
                  if(Helpnumread>99){
                  $('.helpnumsbg').html('99+');
                  $('.helpnumsbg').show();
                }else if(Helpnumread==0) {
                  $('.helpnumsbg').hide();

                }else {
                   $('.helpnumsbg').html(Helpnumread);
                   $('.helpnumsbg').show();
                }







                 HelpRemovelocalarray(warns,types);
                 for(var i=0;i<HelpcordeArray.length;i++){
                      for(var k=0;k<warns.length;k++){
                         if(HelpcordeArray[i].ResId==warns[k]){
                             HelpcordeArray[i].ReadStatus=1;
                         } 
                      }
                   }  
                   // help11411();
			} else {
				// alert(ret.Result);
				select = false;
			}
		})
	return select;
}
function HelpReadAlls(val1, val2, val3) {
	if (val1 && val2 && val3) {
		common._coverShow("设为已读成功!");
		setTimeout(function() {
			common._coverHide();
		}, 2000);
	} else if (val1 != true && val2 != true && val3 != true) {
		common._coverShow("设为已读失败!");
		setTimeout(function() {
			common._coverHide();
		}, 2000);
	} else {
		common._coverShow("部分信息设置已读成功!");
		setTimeout(function() {
			common._coverHide();
		}, 2000);
	}
}

function HelpConkeep(data) {
	$(data).hide();
	$(data).next().show();
	$('#Helptext').removeAttr('disabled');
}

function HelpConkeeps(data) {
	var help_id = $('.helpfour').attr('help_id');
	var reg = /[0-9]+/;
	var id = help_id.match(reg);
	var containers = $('#Helptext').val().trim();
	var containerst=RegeMatchValC(containers);
	   if(containerst){
	   	  showAlert('备注不允许有特殊字符！');
            return;
	    }
	// var container = containers.replace(/\n|\r\n/g, "<br>");
	var container=containers;
	 if(container.length>300){
        container=container.substr(0,300);
     }
     $('.cover_loading').show();
	var body = '{"Code":"10402","Body":{"SessionId":"' + sessionId + '","ReportId":"' + id + '","Content":"' + container + '"}}';
	  /**************开始*************/
      var arr=[id,container];
      var conword='修改备注失败!';
     AjaxPostMsg(body, AJAXSET_TIME, HelpSucessRemarks, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
	// var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	// $.post('' + URI + '',
	// 	function(obj) {
	// 		var resp = decodeURIComponent(obj, 'UTF-8');
	// 		var ret = $.parseJSON(obj);

	// 		if (ret.Result == 200) {
 //                 $('.cover_loading').hide();
	// 			var lenn = $('#h' + id).attr('con').length;
	// 			if (container == '') {
	// 				if (lenn == 0) {
	// 					$('#h' + id).attr('con', '');
	// 					common._coverShow("保存备注成功");
	// 					setTimeout(function() {
	// 						common._coverHide();
	// 					}, 2000);
	// 				} else {
	// 					$('#h' + id).attr('con', '');
	// 					$('#h' + id).find('.HelpContent').remove();
	// 					common._coverShow("保存备注成功");
	// 					setTimeout(function() {
	// 						common._coverHide();
	// 					}, 2000);
	// 				}
	// 			} else {
	// 				if (lenn == 0) {
	// 					var helpimgs = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
	// 					$('#h' + id).children('.help_main_dateli').append(helpimgs);
	// 					var regs = new RegExp("<br>", "g"); 
	// 					$('#h' + id).attr('con', '' + container + '');
	// 					var  containercon = container.replace(regs, "\n");
	// 					$('#Helptext').val(containercon); 
	// 					common._coverShow("保存备注成功");
	// 					setTimeout(function() {
	// 						common._coverHide();
	// 					}, 2000);
	// 				} else {
	// 					var regs = new RegExp("<br>", "g"); 
	// 					$('#h' + id).attr('con', '' + container + '');
	// 					var  containercon = container.replace(regs, "\n");
	// 					$('#Helptext').val(containercon); 
	// 					common._coverShow("保存备注成功");
	// 					setTimeout(function() {
	// 						common._coverHide();
	// 					}, 2000);
	// 				}
	// 			}
	// 			 for(var i=0;i<HelpcordeArray.length;i++){
	// 			 	   if(HelpcordeArray[i].ResId==id){
	// 			 	   	  HelpcordeArray[i].Content=container;
	// 			 	   }
	// 			 }
	// 			$(data).hide();
	// 			$(data).prev().show();
	// 			$('#Helptext').attr('disabled', true);
	// 		} else {
	// 			 $('.cover_loading').hide();
	// 			common._coverShow("操作失败" + ret.Result + "");
	// 			setTimeout(function() {
	// 				common._coverHide();
	// 			}, 2000);
	// 		}


	// 	})

       /**************结束*************/
}
/****map******/
function GetCreatMap(val1, val2, val3, val4, val5, val6, val7) {
	Mapcleartime();
	var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
	if (val5 == '') {
		val5 = '无描述';
	}
	var sContent;
	if (val7 == 0) {
		sContent = '<p class="MapName"> <i>' + val6 + '</i></p><div class="media_mapimg"><img src="' + val3 + '" alt=""></div>' + '<p class="media_mapimgp">' + val5 + '</p>' +
			// '<p class="media_mapimgp">'+channel_miao+'</p>'+
			'<p class="media_mapimgp"><b>上报时间:</b>' + val4 + '</p>';
	} else if (val7 == 1) {
		sContent = '<p class="MapName"> <i>' + val6 + '</i></p><div class="media_mapimg"><video width="300" height="200" type="video/mp4" style="background:black"><source src="' + val3 + '" type="video/mp4" media=""></video></div><p class="media_mapimgp">' + val5 + '</p>' +
			// '<p class="media_mapimgp">'+channel_miao+'</p>'+
			'<p class="media_mapimgp"><b>上报时间:</b>' + val4 + '</p>';
	}
	var point = new BMap.Point(val1, val2);
	mediamarker = new BMap.Marker(point, {
		icon: myIcon
	});
    map.centerAndZoom(point, 15);
	map.addOverlay(mediamarker);

	var infoWindow = new BMap.InfoWindow(sContent);
	mediamarker.openInfoWindow(infoWindow);
	mediamarker.addEventListener("click", function() {
		this.openInfoWindow(infoWindow);
	});
	infoWindow.addEventListener("close",removemeidamarker);
	  // clear();
	  Mapclearicon();
         // function clear() {
         //   var timec = 1;
         //      MediaCleartimes = setInterval(function() {
         //     timec += 1;
         //     if (timec > 5) {
         //       clearInterval(MediaCleartimes);
         //       mediamarker.hide();
         //     }
         //   }, 1000);
         // }
}
 


function GetReport11410 (val1, val2) {
	var reg = /[0-9]+/;
	var id = val1.match(reg);
	var helpreg = /[a-zA-Z]/g;
    var helpid=val1.replace(helpreg,"");
    console.log(JSON.stringify(helpid));
    $('.cover_loading').show();
	var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + id + '\","ResType":"' + val2 + '"}}';
	console.log('报文'+body);
	// var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	// $.ajaxSettings.async = false;
	/******开始**********/
	var arrmsg=[val2,helpid];
	var conword='数据获取失败！';
	    AjaxPostMsg(body, AJAXSET_TIME, HelpPost11410, HelpPost11410detail, helpAjaxovertime, false, arrmsg, conword);

	 //  $.getJSON(STATION_URL + '?Body=' + body, function(ret) {
	 //  	    var obj=ret;
		// 	if (obj.Result == 200) {
		// 		$('.cover_loading').hide();
		// 		// console.log('返回结果'+JSON.stringify(obj));
		// 		var HelpDetailmsg=obj;
		// 		    HelpDetailmsg.ResId=helpid;
		// 		// console.log('全新数组'+JSON.stringify(HelpDetailmsg));  
		// 		HelpDetailsArray.push(HelpDetailmsg);
		// 		if(val2==2){
		// 			 $('#helpimgsize').html(toFileSizeText(obj.FileSize));
		// 			 $('.helpImgVideo').show();
		// 			 return;
		// 		}
  //                // console.log('本地数据'+JSON.stringify(HelpDetailsArray))
		// 		var map1 = obj.BaiduLongitude;
		// 		var map2 = obj.BaiduLatitude;
		// 		var Helpname = obj.Name;
		// 		var time = obj.Time;
		// 		var describe = obj.Detail;
		// 		var url = obj.ResUrls[0];
		// 		var len=obj.ResUrls.length;
		// 		var type=obj.ResType;
		// 		$('.helpImgVideo').attr('resid',''+helpid+'');
		// 		$('.helpfour').attr('user_id', '' + obj.Uid + '');
		//         $('.helpfour').attr('help_id', '' + helpid + '');
		//         $('.helpfour').attr('ulr', '' + url + '');
		//         $('.helpfour').attr('len', '' + len + '');
		//         $('.helpfour').attr('time', '' + time + '');
		//         $('.helpfour').attr('types',''+type+'');
		// 		$('#helpimgname').html(Helpname);
		//         $('#helpimgtime').html(time);
		//         $('#helpimgsize').html(toFileSizeText(obj.FileSize));
		//         $('#helpimgdetail').html(obj.Detail);
		// 		$('#help_location').attr('name', '' + Helpname + '');
		// 		$('#help_location').attr('map1', '' + map1 + '');
		// 		$('#help_location').attr('map2', '' + map2 + '');
		// 		$('#help_location').attr('time', '' + time + '');
		// 		$('#help_location').attr('describe', '' + describe + '');
		// 		$('#help_location').attr('address', '' + url + '');
		// 		if (map1 == '' || map2 == '') {
		// 			common._coverShow("用户没有上报位置，无法地图显示");
		// 			setTimeout(function() {
		// 				common._coverHide();
		// 			}, 2000);
		// 		} else {
		// 			GetCreatMap(map1, map2, url, time, describe, Helpname, val2);

		// 		}
		// 	} else {
		// 		$('.cover_loading').hide();
		// 		common._coverShow("数据获取失败!");
		// 		setTimeout(function() {
		// 			common._coverHide();
		// 		}, 2000);

		// 	}
		// })
 /******结束*********/
}


function IEVersion() {
	var userAgent = navigator.userAgent;

	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return 7;
		} else if (fIEVersion == 8) {
			return 8;
		} else if (fIEVersion == 9) {
			return 9;
		} else if (fIEVersion == 10) {
			return 10;
		} else {
			return 6;
		}
	} else if (isEdge) {
		return 'edge';
	} else if (isIE11) {
		return 11;
	} else {
		return -1;
	}
}

function HelpTrsearch(data, val2) {

	var val = '';
	var Channle = $('.help_transmit1').find('.media_channelmain');
	var Tell = $('.help_transmit1').find('.media_channeltellmain');
	var Memmber = $('.help_transmit1').find('.media_memberl');
	if (val2 != undefined) {
		val = '';
	} else {
		val = $(data).val();
	}
	if (!(Channle.is(':hidden'))) {
		var len = $('#helpfoCh').children().length;
		 if($('#helpfoCh').children('h3').hasClass('help_wu')){

		 }else{
           for (var i = 0; i < len; i++) {
			 if ($('#helpfoCh').children('li').eq(i).attr('name').indexOf(val) > -1) {

			 	   var Help_transmitName=$('#helpfoCh').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     Help_transmitName=Help_transmitName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#helpfoCh').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }else {

                      $('#helpfoCh').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }

				$('#helpfoCh').children('li').eq(i).show();
			  } else {
				$('#helpfoCh').children('li').eq(i).hide();
			 }
		   }
		}
	} else if (!(Tell.is(':hidden'))) {
		var len = $('#helpLinchat').children().length;
		 if($('#helpLinchat').children('h3').hasClass('help_wu')){

		 }else{
           for (var i = 0; i < len; i++) {
			if ($('#helpLinchat').children('li').eq(i).attr('name').indexOf(val) > -1) {

               	var Help_transmitName=$('#helpLinchat').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     Help_transmitName=Help_transmitName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#helpLinchat').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }else {

                      $('#helpLinchat').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }

				$('#helpLinchat').children('li').eq(i).show();
			} else {
				$('#helpLinchat').children('li').eq(i).hide();
			}
		   }
		 }
	} else if (!(Memmber.is(':hidden'))) {
		if (val == '') {
			$('#helpAllman').hide();
			$('#helptree').show();
		} else {

			// $('#helptree').hide();
			// $('#helpAllman').show();
			// var len = $('#helpAllman').children().length;
			// for (var i = 0; i < len; i++) {
			// 	if ($('#helpAllman').children('li').eq(i).attr('name').indexOf(val) > -1||$('#helpAllman').children('li').eq(i).attr('user').indexOf(val) > -1) {
			// 		$('#helpAllman').children('li').eq(i).show();
			// 	} else {
			// 		$('#helpAllman').children('li').eq(i).hide();
			// 	}
			// }
			  OnKeySearch(data);
		}
	}
}
function HelpTrsearchfint(){
	$('#helpAllman').hide();
	$('#helptree').show();
}

// function HelpCode10115() {
// 	var body = '{"Code":10115,"Body":{"SessionId":\"' + sessionId + '\" }}';
// 	var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
// 	$.ajaxSettings.async = false;
	
// 	$.post('' + URI + '',
// 		function(ret) {
// 			var resp = decodeURIComponent(ret, 'UTF-8');
// 			var obj = $.parseJSON(resp);
// 			if (obj.Result == 200) {
// 				HelpManArray = obj.Users;
// 				 HelpCodes10115();
// 			} else {

// 			}
// 		})
// }
 
// function HelpCodes10115(){
// 	        alert(HelpManArray.length);
// 	     var html = '';
// 	    for (var i = 0; i < HelpManArray.length; i++) {
// 			html += '<li name="' + HelpManArray[i].Name + '" user="' + HelpManArray[i].Uid + '"><input type="checkbox" onclick="user_Alls(this)" /><i>' + HelpManArray[i].Name + '</i></li>'
// 				}
// 				$('.User_Alls').empty();
// 				$('.User_Alls').append(html);
// } 


function do_user_Alls(data, listId, treeId) {
 	var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#' + listId);
 	var html = '';

    if (!($(data).hasClass('userall_selected'))) { 
    	$(data).addClass('userall_selected'); 
		treeAddUsers.put(user_id, {id: user_id, name: name});
	    doZtreeChecked(treeId, user_id, true);     
        html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
        list.append(html); 
 	 } else { 
 	    $(data).removeClass('userall_selected');
 	    treeAddUsers.remove(user_id);
 	    doZtreeChecked(treeId, user_id, false);
	    list.children('li[name="'+user_id+'"]').remove();
 	 }	
}


function do_user_Alls_line(data, listId, treeId) {
    var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#' + listId);
 	var html = '';
 	 
	if (!($(data).hasClass('userall_selected'))) { 
 		$(data).addClass('userall_selected');
		treeAddUsers.put(user_id, {id: user_id, name: name});
		doZtreeChecked(treeId, user_id, true);  
	    html = '<li name="'+user_id+'" class="fix user-fenceSelect-item"><span class="fl">'+name+'</span>'+
				'<div class="fence-list-right fence-mem" onclick="fenceUsersOperate(this)"><span class="fencerType">禁出</span><img src="img/icon/fence/fence_bg_downSmall.png" />'+
				'<ul><li class="first">禁出</li><li>禁入</li></ul></div><img class="fr fenceSelDel" onclick="fenceSelectedUsersDel(\''+user_id+'\')" src="img/icon/fence/fence_bg_del1.png" alt="img" /></li>';
	    list.append(html);
	} else {  
	 	$(data).removeClass('userall_selected');
	 	treeAddUsers.remove(user_id);
	 	doZtreeChecked(treeId, user_id, false);
	   	list.children('li[name="'+user_id+'"]').remove();
	}
}

function do_user_Alls_task(data, listId, treeId) {
    var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#' + listId);
 	var html = '';
 	 
	if (!($(data).hasClass('userall_selected'))) { 
 		$(data).addClass('userall_selected');
		treeAddUsers.put(user_id, {id: user_id, name: name});
		doZtreeChecked(treeId, user_id, true);  
	    html = '<li name="'+ user_id +'"><i>'+ name +'</i><img onclick="channelremoveman(this)" src="img/icon/channel/channeldes.png" alt="" /></li>';
	    list.append(html);
	} else {  
	 	$(data).removeClass('userall_selected');
	 	treeAddUsers.remove(user_id);
	 	doZtreeChecked(treeId, user_id, false);
	   	list.children('li[name="'+user_id+'"]').remove();
	}
}

function do_user_Alls_monitor(data, treeId) {
	var user_id = $(data).parent().attr('user');
	var name = $(data).parent().attr('name');

    if (!($(data).hasClass('userall_selected'))) { 
      	$(data).addClass('userall_selected');
      	treeAddUsers.put(user_id, {id: user_id, name: name});
      	doZtreeChecked(treeId, user_id, true);  
        jianKongUsers.push(user_id);    
    } else {
      	$(data).removeClass('userall_selected');
      	treeAddUsers.remove(user_id);
      	doZtreeChecked(treeId, user_id, false);
      	jianKongUsers = treeAddUsers.keySet();
    }	
}

function do_user_Alls_channel(data, listId, treeId) {
    var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#' + listId);
 	var html = '';
 	 
	if (!($(data).hasClass('userall_selected'))) { 
 		$(data).addClass('userall_selected');
		treeAddUsers.put(user_id, {id: user_id, name: name});
		doZtreeChecked(treeId, user_id, true);  
	    html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span>'+
				'<div class="channel_addlists" onclick="channelselect(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt="" />'+
				'<span class="channnel_manpower">低</span><div class="channel_addlistselect">'+
				'<ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';

	    list.append(html);
	} else {  
	 	$(data).removeClass('userall_selected');
	 	treeAddUsers.remove(user_id);
	 	doZtreeChecked(treeId, user_id, false);
	   	list.children('li[name="'+user_id+'"]').remove();
	}
}

function do_user_Alls_chat(data, listId, treeId) {
    var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#' + listId);
 	var html = '';
 	var node = {id: user_id};
 	 
 	if (!gChannelCreate) {
	 	if (!isInCurrentChatMembers(node)) {
	 		return showAlert('该成员已存在会话中，请勿重复添加！');
	 	}
 	}

	if (!($(data).hasClass('userall_selected'))) {
		if (!gChannelCreate) {
			if (1 + treeAddUsers.size() + currentChatMembers.length > RADIO_CALL_TOTAL) {
				return showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
			}
		} else {
			if (1 + treeAddUsers.size() + 1 > RADIO_CALL_TOTAL) {
				return showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
			}
		}
 		$(data).addClass('userall_selected');
		treeAddUsers.put(user_id, {id: user_id, name: name});
		doZtreeChecked(treeId, user_id, true);  
	    html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
	    list.append(html);
	} else {  
	 	$(data).removeClass('userall_selected');
	 	treeAddUsers.remove(user_id);
	 	doZtreeChecked(treeId, user_id, false);
	   	list.children('li[name="'+user_id+'"]').remove();
	}	
}


function user_Alls(data) {
	var type=$(data).parent().parent().attr('id');
	var div_id;
	switch (type) {
		case 'helpAllman':
			do_user_Alls(data, 'help_memberselect1', 'helptree');
			break;
		case 'ChannelAdduser':
			if($('#channerAddtree').children().length>0){
				div_id = 'channerAddtree';
			}else{
				div_id = 'channerAddtrees';
			}
			do_user_Alls_channel(data, 'channel_addlist', div_id);
			break;
		case 'ChannelTellAdduser':
			do_user_Alls_chat(data, 'channel_telladdlist', 'channeltellAddtree');
			break;
		case 'Media_user':
			do_user_Alls(data, 'media_memberselect1', 'Mediatree');
			break;
		case 'MapUserall':
			do_user_Alls_monitor(data, 'jiankong');
			break;
		case 'penul':
			if($('#userAddtree').children().length>0){
				div_id = 'userAddtree';
			}else{
				div_id = 'userAddtrees';
			}
			do_user_Alls_line(data, 'fenceUsers', div_id);
			break;
		case 'Task_userall':
			do_user_Alls_task(data, 'task_creatman', 'Tasktree');
			break;
		default:
			break;
	}
}



// function user_Alls(data){
// 	 var type=$(data).parent().parent().attr('id');
// 	 if (type=='helpAllman') {
// 	 	do_user_Alls(data, 'help_memberselect1', 'helptree');
// 	 }else if(type=='ChannelAdduser'){

   //       var name=$(data).parent().attr('name');
	 	//  var user_id=$(data).parent().attr('user');
	 	//  var ChannelSelect=[];
	 	// $('#channel_addlist').children().each(function(i){
   //           ChannelSelect.push($('#channel_addlist').children('li').eq(i).attr('name'));
	 	// })
	 	// if(!($(data).hasClass('userall_selected'))){
	 	//     $(data).addClass('userall_selected'); 
   //      var arraynum= $.inArray(user_id,ChannelSelect);
		 //        if(arraynum>-1){
		 //        	return
		 //        }
   //          var html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span><div class="channel_addlists" onclick="channelselect(this)"><i>权限</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="channnel_manpower">低</span><div class="channel_addlistselect"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>'
   //            $('#channel_addlist').append(html); 
	 	//  }else{  
	 	//  	$(data).removeClass('userall_selected');
		 //    $('#channel_addlist').children('li[name="'+user_id+'"]').remove(); 
	 	//  }

	 // }else if(type=='ChannelTellAdduser'){
  //         var name=$(data).parent().attr('name');
	 // 	  var user_id=$(data).parent().attr('user');
	 // 	  var ChannelSelect=[];
	 	 
	 // 	$('#channel_telladdlist').children().each(function(i){
  //            ChannelSelect.push($('#channel_telladdlist').children('li').eq(i).attr('name'));

		// })
	

		//   if(!($(data).hasClass('userall_selected'))){
	 //  		if (!gChannelCreate) {
		// 		if (currentChatMembers.length + ChannelSelect.length >= RADIO_CALL_TOTAL) return showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
		// 	}
		//      if (ChannelSelect.length + 1 >= RADIO_CALL_TOTAL && gChannelCreate) return showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');   
		//      var arraynum= $.inArray(user_id,ChannelSelect);
		//        if(arraynum>-1){
		//        	return showAlert('已选择该用户！')
		//        }
		//        $(data).addClass('userall_selected');
		//        var  html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>'
		//            $('#channel_telladdlist').append(html); 
		//  }else{ 
		//   $(data).removeClass('userall_selected'); 
		//    $('#channel_telladdlist').children('li[name="'+user_id+'"]').remove(); 
		//  }

	// } else if (type=='Media_user') {
      /*******媒体记录*******/
	 	 
	// }else if(type=='VideosAllman'){
		
  //      var name=$(data).parent().attr('name');
	 // 	  var user_id=$(data).parent().attr('user');
	 // 	  var ChannelSelect=[];
	 // 	$('#media_memberselect2').children().each(function(i){
  //            ChannelSelect.push($('#media_memberselect2').children('li').eq(i).attr('name'));

		// })
		//    if(!($(data).hasClass('userall_selected'))){ 
		//    	$(data).addClass('userall_selected'); 
		//      var arraynum= $.inArray(user_id,ChannelSelect);
		//        if(arraynum>-1){
		//        	return
		//        }
		//        var  html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>'
		//            $('#media_memberselect2').append(html); 
		//  }else{  
		//  	$(data).removeClass('userall_selected'); 
		//    $('#media_memberselect2').children('li[name="'+user_id+'"]').remove(); 
		//  }

	// }else if(type=='MapUserall'){
		// var userid=$(data).parent().attr('user');
  //         if(!($(data).hasClass('userall_selected'))){ 
  //         	$(data).addClass('userall_selected');
  //         	treeAddUsers.put(user_id, {id: user_id, name: name});
  //         	doZtreeChecked(treeId, user_id, true);  
  //            jianKongUsers.push(userid);    
  //         }else{
  //         	$(data).removeClass('userall_selected');
  //         	treeAddUsers.remove(user_id);
  //         	doZtreeChecked(treeId, user_id, false);
  //         	jianKongUsers = treeAddUsers.keySet();
  //         }
	// }else if(type=='penul'){
          
  //         var name=$(data).parent().attr('name');
	 // 	  var user_id=$(data).parent().attr('user');
	 // 	  var ChannelSelect=[];
	 // 	$('#fenceUsers').children().each(function(i){
  //            ChannelSelect.push($('#fenceUsers').children('li').eq(i).attr('id'));
		// })
		//  if(!($(data).hasClass('userall_selected'))){ 
		//  		$(data).addClass('userall_selected');
		//      var arraynum= $.inArray(user_id,ChannelSelect);
		//        if(arraynum>-1){
		//        	return
		//        }
		//      var context = '<li id="'+user_id+'" class="fix user-fenceSelect-item"><span class="fl">'+name+'</span><img class="fr fenceSelDel" onclick="fenceSelectedUsersDel(\''+user_id+'\')" src="img/icon/fence/fence_bg_del1.png" alt="img" />'+
		// 			'<div class="fence-list-right fence-mem" onclick="fenceUsersOperate(this)"><span class="fencerType">禁入</span><img src="img/icon/fence/fence_bg_downSmall.png" />'+
		// 			'<ul><li class="first">禁出</li><li>禁入</li></ul></div></li>';
		//   $('#fenceUsers').append(context);
		//  }else{  
		//  	$(data).removeClass('userall_selected');
		//    $('#'+user_id).remove();
		//  }
	// }else if(type=='Task_userall'){
		// console.log('添加成员');
		// var name=$(data).parent().attr('name');
	 // 	var user_id=$(data).parent().attr('user');
	 // 	var TaskSelect=[];
	 // 	$('.task_creatlistman').children().each(function(i){
  //            TaskSelect.push($('.task_creatlistman').children('li').eq(i).attr('name'));
		// })
		// if(!($(data).hasClass('userall_selected'))){ 
  //          $(data).addClass('userall_selected'); 
  //          var arraynum= $.inArray(user_id,TaskSelect);
		//        if(arraynum>-1){
		//        	return
		//        }
		//  var html='<li name="'+user_id+'"><i>'+name+'</i><img onclick="channelremoveman(this)" src="img/icon/channel/channeldes.png" alt="" /></li>'; 
		//   $('.task_creatlistman').append(html);  
		// }else{
  //          $(data).removeClass('userall_selected');
  //          $('.task_creatlistman').children('li[name="' +user_id+ '"]').remove();
		// }
	// }
// }


function channelremoveman(obj) {
	var id = $(obj).parent().attr('name');
	var type = $(obj).parent().parent().attr('id');
	
	treeAddUsers.remove(id);
	if (type == 'help_memberselect1') {
		doZtreeChecked('helptree', id, false);
		$('#helpAllman').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	} else if (type == 'channel_addlist') {
		doZtreeChecked('channerAddtree', id, false);
	    $('#ChannelAdduser').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	}else if (type == 'channel_telladdlist') {
		doZtreeChecked('channeltellAddtree', id, false);
		$('#ChannelTellAdduser').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	}else if(type == 'media_memberselect1'){
		doZtreeChecked('Mediatree', id, false);
		$('#Media_user').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	}else if(type == 'media_memberselect2'){
		// doZtreeChecked('channeltellAddtree', id, false);
		$('#VideosAllman').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	}else if(type=='task_creatman'){
		doZtreeChecked('Tasktree', id, false);
		$('#Task_userall').children('li[user='+id+']').children('div').removeClass('userall_selected');
		$(obj).parent().remove();
	} 
}
function LoadingImg(){
    var HT=($(window).height()-60)/2;
    $('.cover_loading img').css('margin-top',''+HT+'px');
}

 function RegeMatchValC(data){
     // var pattern = new RegExp("[`@#$^&*=|''\\[\\]<>/@#￥……&*%——\"|~【】‘”“']");
     var pattern = new RegExp("[`&=|''\\[\\]<>/￥%&\"|【】‘”“']");
     
       if (/[\\\/\.]/.test(data)) {
             return true; 
        }
        if(pattern.test(data)){   
            return true;  
        }else{
             return false;
        } 
 }


   var HelpOnkeytime=0;
   var HelpOnkeytimeRepeat;

   function OnHKeyMSearch(e){
   		Pulley_jilu = 0;
        var data=$(e).attr('name');
        if(HelpOnkeytime==0){
        	if(data=='searchHE'){
              OnKeyHSearchNext(data);
        	}else if(data=='CHannelDOwn'){
                  //CHdown();
                  OnKeyChannelDownNext(data);
        	}else if(data=='ChTelldown'){
        		 // CHannelTells();
        		 OnKeyTellDownNext(data);
        	}
        }else{
          HelpOnkeytime=1;	
        }  
  }
  function OnKeyHSearchNext(data){
       HelpOnkeytime=HelpOnkeytime+1;
        if(HelpOnkeytime>2)
        {
          HelpOnkeytime=0;
          HelpSearch(data);
          return;
        }
        HelpOnkeytimeRepeat=setTimeout(function(){OnKeyHSearchNext(data)},900);
  }
  function OnKeyChannelDownNext(data){
  	   HelpOnkeytime=HelpOnkeytime+1;
        if(HelpOnkeytime>2)
        {
          HelpOnkeytime=0;
          CHdown(data);
          return;
        }
        HelpOnkeytimeRepeat=setTimeout(function(){OnKeyChannelDownNext(data)},900);
  }
   function OnKeyTellDownNext(data){
   	    HelpOnkeytime=HelpOnkeytime+1;
        if(HelpOnkeytime>2)
        {
          HelpOnkeytime=0;
          CHannelTells(data);
          return;
        }
        HelpOnkeytimeRepeat=setTimeout(function(){OnKeyTellDownNext(data)},900);
  }
  function maptestusername(data){
  	  var reg=/^\w+$/g;
     var col=reg.test(data);
         return col;
  }

  
function monitorUsersMarkerStyle(userNamelen, userName) {
	var offsetvalleft;
	if(userNamelen<=2){
        if(maptestusername(userName)){
            offsetvalleft=12; 
         }else{
            offsetvalleft=10; 
         }
    }else if(userNamelen==3){
    	 if(maptestusername(userName)){
            offsetvalleft=5; 
         }else{
            offsetvalleft=0; 
         }  
    }else if(userNamelen>3&&userNamelen<=5){
 	      if(maptestusername(userName)){
            offsetvalleft=5; 
         }else{
            offsetvalleft=-2*userNamelen; 
         }   
     }else if(userNamelen>5&&userNamelen<=10){
     	 if(maptestusername(userName)){
            offsetvalleft=-1*userNamelen; 
         }else{
            offsetvalleft=-3*userNamelen; 
         } 
     }else{
     	 offsetvalleft=-4*userNamelen;
     }
     return offsetvalleft;
}

  
/*****本地数据********/
  function HelpGetlocalshow (helpdata) {
     	       var helpDate = '';
			   // var pageTotal = Helplistcon.PageTotalCount; //TotalCount
            // console.log('运行函数');
				 HelpChoose=0;
				 $('.Helptotal').html(0);
				 $('input[name=HelpInputAll]').attr('disabled', false);
                 $("input[name='HelpInputAll']").prop("checked", false);
                 $("input[name='HelpInputAll']").prop("indeterminate", false);
				$('#loaded').empty();
				if (helpdata.length == 0) {
					$('#loaded').empty().append('<h3 class="help_wu">暂无数据</h3>');
					 Helpnum = document.getElementsByName("HelpInput").length;
					 HelpNull = Helpnum;
					$('#loading').hide();
					$('#loaded').show();
					$('.helpnumsbg').hide();
					return;
				}
				for (var i = 0; i <helpdata.length; i++) {
					var time =helpdata[i].Time.split(" ");
					var time1 = time[0];
					var time2 = time[1];
					if (helpDate != time1) {
						var html = '';
						html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
						$('#loaded').append(html);
						helpDate = time1;
					}
					var html1 = '';
					if (helpdata[i].ResType == 0) {
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						var imglens;
						if (helpdata[i].Content == '') {
							iconimg = '';
						} else {
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						}
						if (helpdata[i].ResCount > 1) {
							imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						} else {
							imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						}
						html1 = '<li class="fix" types="0" id="h' +helpdata[i].ResId + '"   username="' +helpdata[i].Name + '" user_id="' +helpdata[i].Uid + '" ulr="' + helpdata[i].ResUrl + '" time="' +helpdata[i].Time + '" Detail="' + helpdata[i].Detail + '" con="' + helpdata[i].Content + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '" users="' + helpdata[i].Uid + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (helpdata[i].ResType == 1){
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						if (helpdata[i].Content == ''){
							iconimg = '';
						}else{
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						}
						html1 = '<li class="fix" types="1" users="' + helpdata[i].Uid + '" id="h' + helpdata[i].ResId + '"  user_id="' + helpdata[i].Uid + '"   username="' + helpdata[i].Name + '" ulr="' + helpdata[i].ResUrl + '" time="' + helpdata[i].Time + '" Detail="' + helpdata[i].Detail + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '"  con="' + helpdata[i].Content + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span><img src="img/icon/newicon/help_video.png" class="Helpupvideo" alt="" onclick="helpleve2(this)">' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (helpdata[i].ResType == 2) {
						html1 = '<li class="fix" types="2"  time="' + helpdata[i].Time + '" users="' + helpdata[i].Uid + '" id="h' + helpdata[i].ResId + '"  user_id="' + helpdata[i].Uid + '"   username="' + helpdata[i].Name + '" ulr="' + helpdata[i].ResUrl + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (helpdata[i].ResType == 3) {
						html1 = '<li class="fix" types="3" users="' + helpdata[i].Uid + '" user_id="' + helpdata[i].Uid + '" id="h' + helpdata[i].ResId + '"   username="' + helpdata[i].Name + '" ulr="' + helpdata[i].ResUrl + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (helpdata[i].ResType == 10) {
						html1 = '<li class="fix" types="10" users="' + helpdata[i].Uid + '" user_id="' + helpdata[i].Uid + '"   userid="' + helpdata[i].Uid + '"  username="' + helpdata[i].Name + '" reportid="' + helpdata[i].ResId + '"  id="h' + helpdata[i].ResId + '" ulr="'+ helpdata[i].ResUrl + '" time="' + helpdata[i].Time + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span><img src="img/icon/newicon/help_warn.png" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (helpdata[i].ResType == 11) {
						html1 = '<li class="fix" types="11" users="' + helpdata[i].Uid + '"  user_id="' + helpdata[i].Uid + '" reportid="' + helpdata[i].ResId + '" id="h' + helpdata[i].ResId + '" username="' + helpdata[i].Name + '" ulr="' + helpdata[i].ResUrl + '" time="' + helpdata[i].Time + '" len="' + helpdata[i].ResCount + '" read="' + helpdata[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata[i].ResId +'He"><label for="'+helpdata[i].ResId +'He"></label></span><img src="img/icon/newicon/help_radio.png" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					}
				}
				Helpnum =  HelpcordeArray.length;
				HelpNull = Helpnum;
			 
				if (helpdata.length>=30) {
					HelparrayLength=true;
					helpscorell(Helpmorecode[0], Helpmorecode[1]);
				}else{
					HelparrayLength=false;
				}
				$('#loading').hide();
				$('.choose-sec').hide();
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('#loaded').show();
 } 

function Helpremovelocal(id,type){
	    for(var i=0;i<HelpcordeArray.length;i++){
				 if(HelpcordeArray[i].ResId==id&&HelpcordeArray[i].ResType==type){
				 	 HelpcordeArray.splice(i,1);
				 }
	    }
	  for(var i=0;i<Helpfirstdata.length;i++){
				 if(Helpfirstdata[i].ResId==id&&Helpfirstdata[i].ResType==type){
				 	 Helpfirstdata.splice(i,1);
				 }
	    }    
} 
function HelpRemovelocalarray(id,type){
	console.log('告警信息');
	// console.log('全体数据'+JSON.stringify(Helpfirstdata));
	console.log('告警'+id+'类型'+type);
	if(id.length==1){
		for(var i=0;i<Helpfirstdata.length;i++){
				 if(Helpfirstdata[i].ResId==id&&Helpfirstdata[i].ResType==type){
				 	 Helpfirstdata.splice(i,1);
				 	 console.log('匹配成功')
				 }
	    }
	    return;
	}
     for(var i=0;i<Helpfirstdata.length;i++){
			for(var k=0;k<id.length;k++){
				 if(Helpfirstdata[i].ResId==id[k]&&Helpfirstdata[i].ResType==type){
				 	 Helpfirstdata.splice(i,1);
				 }
			}	
	    }
}
function HelpRemovelocalarrayimg(imgarray){
	  for(var i=0;i<Helpfirstdata.length;i++){
			for(var k=0;k<imgarray.length;k++){
				 if(Helpfirstdata[i].ResId==imgarray[k].ReportId&&Helpfirstdata[i].ResType==imgarray[k].ResType){
				 	 Helpfirstdata.splice(i,1);
				 }
			}	
	    }
}

function Help_Fintdatadiv(){
	 var len=$('#loaded').children('.help_main_date').length;
	 for(var i=0;i<len;i++){
	 	  var lilen=$('#loaded').children('.help_main_date').eq(i).children('.help_main_ul').children('ul');
	 	  if(lilen.children().length==0){
	 	  	    $('#loaded').children('.help_main_date').eq(i).remove();
	 	  }
	 }
}


/********************************ajax数据交互**********************************************/

    function help11411con (ret, databody) {
 
    	      // for(var i=0;i<ret.Resources.length; i++) {

    	      // 	 var time=ret.Resources[i].Time.slice(0,16);
           //       ret.Resources[i].Time=time;
    	      // }

 
               help_readPrev='';
    	        Helplistcon=ret;
              	var helpDate = '';
              	 HelpcordeArray=ret.Resources;
                Helpfirstdata=ret.Resources;
  	           // alert(Helplistcon.Result);
  	           console.log('和助手返回结果'+JSON.stringify(Helplistcon));
                if(Helplistcon.Result!=200){
                    $('#loaded').empty().append('<h3 class="help_wu">获取数据失败!</h3>');
                    Helpnum =document.getElementsByName("HelpInput").length;
                    HelpNull = Helpnum;
					$('#loading').hide();
					$('#loaded').show();
					$('.helpnumsbg').hide();
					return;
                }
                 Helpnumread=ret.TotalCount;
				console.log(JSON.stringify(ret));
				var pageTotal = Helplistcon.PageTotalCount; //TotalCount
				HelpChoose=0;
				$('.Helptotal').html(0);
				$('.Help_inputdivall').removeClass('userall_selected');
				 $('input[name=HelpInputAll]').attr('disabled', false);
                 $("input[name='HelpInputAll']").prop("checked", false);
                 $("input[name='HelpInputAll']").prop("indeterminate", false);
				 $('#loaded').empty();
				if (Helplistcon.Resources.length == 0) {
					$('#loaded').empty().append('<h3 class="help_wu">暂无数据</h3>');
					 Helpnum = document.getElementsByName("HelpInput").length;
					 HelpNull = Helpnum;
					$('#loading').hide();
					$('#loaded').show();
					$('.helpnumsbg').hide();
					return;
				}
				for (var i = 0; i < Helplistcon.Resources.length; i++) {
					var time = Helplistcon.Resources[i].Time.split(" ");
					var time1 = time[0];
					var time2 = time[1].slice(0,5);
					if (helpDate != time1) {
						var html = '';
						html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
						$('#loaded').append(html);
						helpDate = time1;
					}
					var html1 = '';
					if (Helplistcon.Resources[i].ResType == 0) {
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						var imglens;
						if (Helplistcon.Resources[i].Content !=''&&Helplistcon.Resources[i].Content != ' ') {
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						}else{
							iconimg = '';
						}
						if (Helplistcon.Resources[i].ResCount > 1) {
							imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						} else {
							imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
						}
						html1 = '<li class="fix" types="0" id="h' + Helplistcon.Resources[i].ResId + '"   username="' + Helplistcon.Resources[i].Name + '" user_id="' + Helplistcon.Resources[i].Uid + '" ulr="' + Helplistcon.Resources[i].ResUrl + '" time="' + Helplistcon.Resources[i].Time + '" Detail="' + Helplistcon.Resources[i].Detail + '" con="' + Helplistcon.Resources[i].Content + '" len="' + Helplistcon.Resources[i].ResCount + '" read="' + Helplistcon.Resources[i].ReadStatus + '" users="' + Helplistcon.Resources[i].Uid + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + Helplistcon.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (Helplistcon.Resources[i].ResType == 1) {
						var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						if (Helplistcon.Resources[i].Content !=''&&Helplistcon.Resources[i].Content != ' '){
							iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						}else{
							iconimg = '';
						}
						 html1 = '<li class="fix" types="1"  time="' + Helplistcon.Resources[i].Time + '" users="' + Helplistcon.Resources[i].Uid + '" id="h' + Helplistcon.Resources[i].ResId + '"  user_id="' + Helplistcon.Resources[i].Uid + '"   username="' + Helplistcon.Resources[i].Name + '" ulr="' + Helplistcon.Resources[i].ResUrl + '" len="' + Helplistcon.Resources[i].ResCount + '" con="' + Helplistcon.Resources[i].Content + '" read="' + Helplistcon.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="helpleve2(this)">'+iconimg+'</div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + Helplistcon.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (Helplistcon.Resources[i].ResType == 2) {
						html1 = '<li class="fix" types="2"  time="' + Helplistcon.Resources[i].Time + '" users="' + Helplistcon.Resources[i].Uid + '" id="h' + Helplistcon.Resources[i].ResId + '"  user_id="' + Helplistcon.Resources[i].Uid + '"   username="' + Helplistcon.Resources[i].Name + '" ulr="' + Helplistcon.Resources[i].ResUrl + '" len="' + Helplistcon.Resources[i].ResCount + '" read="' + Helplistcon.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + Helplistcon.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (Helplistcon.Resources[i].ResType == 3) {
						html1 = '<li class="fix" types="3" users="' + Helplistcon.Resources[i].Uid + '" user_id="' + Helplistcon.Resources[i].Uid + '" id="h' + Helplistcon.Resources[i].ResId + '"   username="' + Helplistcon.Resources[i].Name + '" ulr="' + Helplistcon.Resources[i].ResUrl + '" len="' + Helplistcon.Resources[i].ResCount + '" read="' + Helplistcon.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + Helplistcon.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (Helplistcon.Resources[i].ResType == 10) {
						html1 = '<li class="fix" types="10" users="' + Helplistcon.Resources[i].Uid + '" user_id="' + Helplistcon.Resources[i].Uid + '"   userid="' + Helplistcon.Resources[i].Uid + '"  username="' + Helplistcon.Resources[i].Name + '" reportid="' + Helplistcon.Resources[i].ResId + '"  id="h' + Helplistcon.Resources[i].ResId + '" ulr="'+ Helplistcon.Resources[i].ResUrl + '" time="' + Helplistcon.Resources[i].Time + '" len="' + Helplistcon.Resources[i].ResCount + '" read="' + Helplistcon.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_warn.png" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					} else if (Helplistcon.Resources[i].ResType == 11) {
						html1 = '<li class="fix" types="11" users="' + Helplistcon.Resources[i].Uid + '"  user_id="' + Helplistcon.Resources[i].Uid + '" reportid="' + Helplistcon.Resources[i].ResId + '" id="h' + Helplistcon.Resources[i].ResId + '" username="' + Helplistcon.Resources[i].Name + '" ulr="' + Helplistcon.Resources[i].ResUrl + '" time="' + Helplistcon.Resources[i].Time + '" len="' + Helplistcon.Resources[i].ResCount + '" read="' + Helplistcon.Resources[i].ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+Helplistcon.Resources[i].ResId +'He"><label for="'+Helplistcon.Resources[i].ResId +'He"></label></span><img src="img/icon/newicon/help_radio.png" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + Helplistcon.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + Helplistcon.Resources[i].Detail + '</span></div></li>';
						$('#s' + time1).children('.helpdatebg').children('ul').append(html1);
					}
				}
				Helpnum=HelpcordeArray.length;
				HelpNull = Helpnum;
				Helpmorecode[0]=databody;
				Helpmorecode[1]=pageTotal;
				if (Helplistcon.Resources.length>=30) {
					HelparrayLength=true;
					helpscorell(Helpmorecode[0], Helpmorecode[1]);
				}else{
					HelparrayLength=false;
				}
                
                if(Helpnumread>99){
                  $('.helpnumsbg').html('99+');
                  $('.helpnumsbg').show();
                }else if(Helpnumread==0) {
                  $('.helpnumsbg').hide();

                }else {
                   $('.helpnumsbg').html(Helpnumread);
                   $('.helpnumsbg').show();
                }

				$('#loading').hide();
				$('.choose-sec').hide();
				$('.cho-img').attr('src', 'img/icon/channel/channel_search1.png');
				$('#loaded').show();
  }

  function help11411error(){
   	 $('#loading').hide();
  	 $('#loading').show();
  	 $('#loaded').empty().append('<h3 class="help_wu">获取数据失败！</h3>');
  	  HelpcordeArray=[];
      Helpfirstdata=undefined;
  }

  function helpovertime(){
  	  $('#loading').hide();
  	  $('#loading').show();
       $('#loaded').empty().append('<h3 class="help_wu">获取数据失败！</h3>');
       showAlert('网络超时，请刷新!');
       if(!navigator.onLine){
          alert('网络不可用，请检查你的网络设置');
       }
  }

  function HelpPost11410(obj,arr) {
  	  	if (obj.Result == 200) {
				$('.cover_loading').hide();
				console.log('返回结果'+JSON.stringify(obj));
				var HelpDetailmsg=obj;
				    HelpDetailmsg.ResId=arr[1];
				// console.log('全新数组'+JSON.stringify(HelpDetailmsg));  
				HelpDetailsArray.push(HelpDetailmsg);
				if(arr[0]==2) {
					 var time = obj.Time;
					 $('#helpimgsize').html(toFileSizeText(obj.FileSize));
					 $('.helpfour').attr('time', '' + time + '');
					 $('.helpImgVideo').show();
					 return;
				}
                 // console.log('本地数据'+JSON.stringify(HelpDetailsArray))
				var map1 = obj.BaiduLongitude;
				var map2 = obj.BaiduLatitude;
				var Helpname = obj.Name;
				var time = obj.Time.slice(0,16);
				var help_time=obj.Time;
				var describe = obj.Detail;
				var url = obj.ResUrls[0];
				var len=obj.ResUrls.length;
				var type=obj.ResType;
				$('.helpImgVideo').attr('resid',''+arr[1]+'');
				$('.helpfour').attr('user_id', '' + obj.Uid + '');
		        $('.helpfour').attr('help_id', '' + arr[1] + '');
		        $('.helpfour').attr('ulr', '' + url + '');
		        $('.helpfour').attr('len', '' + len + '');
		        $('.helpfour').attr('time', '' + help_time + '');
		        $('.helpfour').attr('types',''+type+'');
				$('#helpimgname').html(Helpname);
		        $('#helpimgtime').html(time);
		        $('#helpimgsize').html(toFileSizeText(obj.FileSize));
		        $('#helpimgdetail').html(obj.Detail);
				$('#help_location').attr('name', '' + Helpname + '');
				$('#help_location').attr('map1', '' + map1 + '');
				$('#help_location').attr('map2', '' + map2 + '');
				$('#help_location').attr('time', '' + help_time + '');
				$('#help_location').attr('describe', '' + describe + '');
				$('#help_location').attr('address', '' + url + '');
				if (map1 == '' || map2 == '') {
					common._coverShow("用户没有上报位置，无法地图显示");
					setTimeout(function() {
						common._coverHide();
					}, 2000);
				} else {
					GetCreatMap(map1, map2, url, time, describe, Helpname, arr[0]);
				}
            
    //            	Helpnumread--;
				// if(Helpnumread>99){
				//    $('.helpnumsbg').html('99+');
				//    $('.helpnumsbg').show();
				// }else if(Helpnumread==0){
				//    $('.helpnumsbg').html();
				//    $('.helpnumsbg').hide();
				// }else{
				// 	$('.helpnumsbg').html(Helpnumread);
				//    $('.helpnumsbg').show();
				// }
			} else {
				$('.cover_loading').hide();
			    showAlert('数据获取失败！');

			}
  }

  function HelpPost11410detail(conword){
    	$('.cover_loading').hide();
		 showAlert(conword);
  }

  function helpAjaxovertime(){
  	   $('.cover_loading').hide();
  	   showAlert('网络超时，请刷新！');
       if(!navigator.onLine){
         alert('网络不可用，请检查你的网络设置');
       }
  }

  function HelpAjaxRead(ret){
  	  $('.cover_loading').hide();
	      if(ret.Result==200){
	          showAlert('设为已读成功！');
	          $('#Helpsearchin').val('');
	          Helpfirstdata=undefined;
	          help11411();
	          $('.Help_inputdivall').removeClass('userall_selected');
	          $('.HelpRead').removeClass('HelpReads');
	          $('.HelpRead').attr('disabled','disabled');
	          $('.Helptotal').html(0);
	      }else{
	       showAlert('设为已读失败！');
	     }
  }

  function HelpAjaxReadErron(conword){
  	  $('.cover_loading').hide();
  	  showAlert(conword);
  }

  function HelpAjaxSucessRemove(ret,arr){
  	$('.cover_loading').hide();
  	console.log('和助手返回删除结果'+ret.Result);
  	if (ret.Result == 200) {
				$('.sec-fun').hide();
				if (arr[0] == 1) {
					$('#h' + arr[2]).parent().parent().parent().remove();
				}else{
					$('#h' +  arr[2]).remove();
				}
				if (arr[0] == 1) {
					$('#h' + arr[2]).parent().parent().parent().remove();
				}else{
					$('#h' + arr[2]).remove();
				}
				$('.sec-fun').hide();
				$('.help_btn').show();
				 showAlert('已删除！');
			     Helpremovelocal( arr[2], arr[1]);
				$('.help_leftbtn').show();
		}else if(ret.Result ==404){
				 showAlert('该数据已删除,请刷新数据列表！');
	    }else{
	    	     showAlert('删除失败！');
	    }
  }

  function HelpSucessRemarks (ret, arr) {
  	        $('.cover_loading').hide();
  	  		if (ret.Result == 200) {
				var lenn = $('#h' + arr[0]).attr('con').length;
				if (arr[1] == '') {
					if (lenn == 0) {
						$('#h' + arr[0]).attr('con', '');
						showAlert('保存备注成功！');
					} else {
						$('#h' + arr[0]).attr('con', '');
						$('#h' + arr[0]).find('.HelpContent').remove();
						showAlert('保存备注成功！');
					}
				} else {
					if (lenn == 0) {
						var helpimgs = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
						$('#h' + arr[0]).children('.help_main_dateli').append(helpimgs);
						var regs = new RegExp("<br>", "g"); 
						$('#h' + arr[0]).attr('con', '' + arr[1] + '');
						// var  containercon = container.replace(regs, "\n");
						$('#Helptext').val(arr[1]); 
					    showAlert('保存备注成功！');
					} else {
						// var regs = new RegExp("<br>", "g"); 
						$('#h' + arr[0]).attr('con', '' + arr[1] + '');
						// var  containercon = container.replace(regs, "\n");
						$('#Helptext').val(arr[1]); 
						 showAlert('保存备注成功！');
					}
				}
				 for(var i=0;i<HelpcordeArray.length;i++){
				 	   if(HelpcordeArray[i].ResId==arr[0]){
				 	   	  HelpcordeArray[i].Content=arr[1];
				 	   }
				 }
				$('.HelpKicon').children('span').hide();
				$('.HelpKicon').children('img').show();
				$('#Helptext').attr('disabled', true);
			} else {
				 $('.cover_loading').hide();
				 showAlert('操作失败！');
			}

  }

function help_imgprev (data) {

      var inde=$(data).attr('index');
      var len=HelpDownImgs.length;
      if(inde==0){

         $(data).attr('index',len-1);
         $('.help_imgnumright').attr('index',len-1);
         $(data).next().attr('src',HelpDownImgs[len-1]);
     

      }else{
        inde--;
        $(data).attr('index',inde);
        $('.help_imgnumright').attr('index',inde);
        $(data).next().attr('src',HelpDownImgs[inde]);

      }

} 

function help_imgnext (data) {

      var inde=$(data).attr('index');
      var len=HelpDownImgs.length;
      if(inde==len-1){

         $(data).attr('index',0);
         $('.help_imgnumleft').attr('index',0);
         $(data).prev().attr('src',HelpDownImgs[0]);
     

      }else{
        inde++;
        $(data).attr('index',inde);
        $('.help_imgnumleft').attr('index',inde);
        $(data).prev().attr('src',HelpDownImgs[inde]);

      }

}

/******read img tosrc*******/
function Help_readImgstate () {

	if(help_readPrev==null || help_readPrev==undefined ||help_readPrev==''){

		return;
	}
   var ID=help_readPrev[0];
   var type=help_readPrev[1];

   // var readtype=$('#h'+ID+'').attr('read');
      // if(readtype==1){
  	   //   return;
      // }
   if(type==11){ //radio
        $('#h'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_radios.png');

    }else if(type==10){
    	$('#h'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_warnas.png');
    }else if(type==3){
    	$('#h'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_videolines.png');
    }else if(type==0) {
    	var len=help_readPrev[2];
    	if(len==undefined ||len==null){
           
            $('#'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_img2s.png');
    	}else{

             $('#'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/meida_nums1.png');
    	}
    }else if(type==1){

        $('#'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_videos.png');

    }else if(type==2){

        $('#'+ID+'').find('.Mediabginput').next().attr('src','img/icon/newicon/help_imgs.png');

    }
    
}

function HelpShowPolygon(data){
	$(data).children('img').attr('src','img/icon/newicon/help_locations.png');
	Map_Lineclear();
	Line = null;
	var locations = HelpDetailsWarns[0].Locations;
	var point = [];
//	console.log(JSON.stringify(locations))
	for(var i=0,len=locations.length; i<len; i++){
		point.push(new BMap.Point(locations[i].Longitude, locations[i].Latitude));
	}   

	var createPolygon = new BMap.Polygon(point, {strokeColor:"#F63839",strokeWeight:3,fillColor:"#F63839",fillOpacity:0.2});
	map.addOverlay(createPolygon);
	map.setViewport(point);
	Line = createPolygon;
}


function Pulley(){
	if(!$('.HelpPagemore').text()){
//		if(Pulley_judge){
//			 showAlert('已经是最后一页');
//			 Pulley_judge = false;
//			 return;
//		}
 		return;
 	}
	var Height_gdt=$(".itemwrap").scrollTop();
	var Height_div =$(".itemwrap")[0].scrollHeight-$(".itemwrap").height();
	function strToJson(str) {
		var json = eval('(' + str + ')');
		return json;
	}
	var timestart = strToJson(Pulley_databody).Body.TimeFrom;
	var timeover = strToJson(Pulley_databody).Body.TimeTo;
	var type = strToJson(Pulley_databody).Body.ResType;
	var index = strToJson(Pulley_databody).Body.PageIndex;
	if(Pulley_jilu!=Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_jilu = Height_gdt;
			HelpPagenext(type, timestart, timeover, index, Pulley_total);
		}
	}
	
	
}
 