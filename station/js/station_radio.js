var isBroadcastSpeaking = false;
var isOtherBroadcastSpeaking = false;
var Pulley_radio_jishu = 1;
var Radio_imgswitch=true;

function radio_start() {
	Map_Lineclear();
	var wh = $(window).height();

	$('.brecording-more span').on('click', function() {
		broadcastLoadmoreBtnclick();
	})

	$('.brecording-btn').on('click', function() {
		broadcastSearchBtnclick();
	})

	$('.broadcast-recording-list').on('click', function() {
		$('#broadcastRecording').show();
		$('#bg-color').show();
		$('.brecording-list').height($('#broadcastRecording').height() - 190);
		bcListIndex = 0;
		bc_uid = '';
		bc_timefrom = '';
		bc_timeto = '';
		bcRecordSearch();
	})

	$('.brecording-head-close').on('click', function() {
		$('#broadcastRecording').hide();
		$('#bg-color').hide();
	})
	//	$('.Heigths').height(wh);

	$('.radio_main_height').height(wh - $('.radio_top').outerHeight() - $('.radio_main_footer').outerHeight() - MAIN_TOPHT);
	$('.radio_level3_footer').outerHeight(wh - $('.radio_level3_top').outerHeight() - $('.radio_level3_footer_next').outerHeight() - MAIN_TOPHT);
	//$('.radio_text').height($('.radio_level3_footer').height() - 52);

	$('.radio_levle2').outerHeight(wh - MAIN_TOPHT);
	$('.radio_level2_footer').outerHeight(wh - $('.radio_level2_top').outerHeight() - 96);

	$('#bcFilterS').fdatepicker({format: 'yyyy-mm-dd'});
	$('#bcFilterE').fdatepicker({format: 'yyyy-mm-dd'});
	$('#brecording-start').fdatepicker({format: 'yyyy-mm-dd'});
	$('#brecording-end').fdatepicker({format: 'yyyy-mm-dd'});
	$('.selectMore').text(RADIO_CALL_TOTAL);
	 
	$('#radio_tree').height(wh - 340);
	
	//广播呼叫
	var kflag = true;

	$('.radio_main_footer').children('span').eq(1).on('click', function() {
		var that = $(this).next();
		if (that.is(':hidden')) {
			$('.radio_main_say').on("keydown",function(ev){
				if(kflag){
					if(ev.keyCode==32){
						$('.radio_main_sayup').onClick();
					}
					kflag = false;
				}
			});
			$('.radio_main_say').on("keyup",function(ev){
				if(!kflag){
					if(ev.keyCode==32){
						$('.radio_main_sayup').onClick();
					}
					kflag = true;
				}
			});
			that.show();
		} else {
			$('.radio_main_say').off("keydown");
			$('.radio_main_say').off("keyup");
			that.hide();
		}
	})
	$('.bcFilterLog').hover(function() {
        var src=$('.bcFilterLog').attr('src');
        if(Radio_imgswitch){
        	$('.bcFilterLog').attr('src','img/icon/channel/channel_search2.png')
        }

	 
	   }, function() {
	   	var src=$('.bcFilterLog').attr('src');
        if(Radio_imgswitch){
        	$('.bcFilterLog').attr('src','img/icon/channel/channel_search1.png')
        }


		 
	});
	
	//广播 点击事件 空格事件
	var groupid = $.cookie('GroupId');
	$('.radio_main_sayup').on('click', function() {
		if (isOtherBroadcastSpeaking) {
			return showAlert('当前广播进行中，结束后才能发起广播！');
		}

		if (RADIO_CALL_ALL) {
			isBroadcastSpeaking = !isBroadcastSpeaking;
			if (isBroadcastSpeaking) {
				session_talk_request('G' + groupid);
			} else {
				session_talk_release();
			}			
		} else {
			if (RADIO_CALL_LIST.length === 0) {
				return showAlert('请选择广播呼叫用户！');
			} else {
				var broadcastusers = '{\"userids\":[';
				
				for (var i = 0, len = RADIO_CALL_LIST.length; i<len; i++) {
					broadcastusers += '\"'+RADIO_CALL_LIST[i]+'\"';
					if (i < len - 1) {
						broadcastusers = broadcastusers + ',';
					}
				}
				
				broadcastusers = broadcastusers + ']}';
				// var broadcastusers = JSON.stringify({userids:RADIO_CALL_LIST});
				
				isBroadcastSpeaking = !isBroadcastSpeaking;
				
				if (isBroadcastSpeaking) {
					session_talk_request_userlist('G' + groupid, broadcastusers);
				} else {
					session_talk_release();
				}
			}
		}
	})

	//点击字体变大 变小    
	$('.radio_write_add').on('click', function() {
		var pText = $(this).parent().parent().next().children();
		var thisEle = pText.css('fontSize');
		var size = parseFloat(thisEle, 10)
		if (size <= 24) {
			// pText.animate({
			// 	fontSize: '+=2px'
			// });
			size += 2;
			pText.css('fontSize', size);
		}
	})
	$('.radio_write_minus').on('click', function() {
		var pText = $(this).parent().parent().next().children();
		var thisEle = pText.css('fontSize');
		var size = parseFloat(thisEle, 10)
		if (size >= 10 ) {
			// pText.animate({
			// 	fontSize: '-=2px'
			// });
			size -= 2;
			pText.css('fontSize', size);
		}
	})
	$('.radio_write_blod').on('click', function() {
			var pText = $(this).parent().parent().next().children();
			var thisEle = pText.css('fontWeight');

			if (thisEle == 400) {
				pText.css('fontWeight', 'bold');
			} else {
				pText.css('fontWeight', 'normal');
			}
		})
		//字体颜色
	$('.radio_wrtie_colorselect').hide();
	$('.radio_write_color').on('click', function() {
			if ($(this).children('.radio_wrtie_colorselect').is(':hidden')) {
				var that = $(this).children('.radio_wrtie_colorselect');
				$(this).children('.radio_wrtie_colorselect').slideDown();
				that.find('li').each(function() {
					$(this).on('click', function() {
						var index = $(this).index();
						var img = $(this).parent().prev();
						var text = $(this).parent().parent().parent().parent().next().children();
						if (index == 0) {
							img.attr('src', 'img/icon/radio/radio_write_color01.png');
							text.css('color', '#EA533B');
						} else if (index == 1) {
							img.attr('src', 'img/icon/radio/radio_write_color02.png');
							text.css('color', '#FF9F0C');
						} else if (index == 2) {
							img.attr('src', 'img/icon/radio/radio_write_color03.png');
							text.css('color', '#49C8E5');
						} else if (index == 3) {
							img.attr('src', 'img/icon/radio/radio_write_color04.png');
							text.css('color', '#4AC663');
						} else if (index == 4) {
							img.attr('src', 'img/icon/radio/radio_write_color05.png');
							text.css('color', '#BE71E0');
						}
					})
				})

			} else {
				$(this).children('.radio_wrtie_colorselect').slideUp();
			}
		})
	//字体对齐方式
	$('.radio_write_left').on('click', function() {
		var that = $(this).parent().parent().next().children();
		that.css('text-align', 'left');
	});
	$('.radio_write_center').on('click', function() {
		var that = $(this).parent().parent().next().children();
		that.css('text-align', 'center');
	});
	$('.radio_write_right').on('click', function() {
			var that = $(this).parent().parent().next().children();
			that.css('text-align', 'right');
		})
		//div聚焦
	$('.radio_text').focus(function() {
		$(this).children('i').remove();
	})

	$('.radio_write').hide();
	//取消 创建广播
	var btn_1 = $('.radio_btn');
	$('.radio_main_footer').children().eq(0).on('click', function() {
		$('.radio_main_say').hide();
		$('.radio_write').css('margin-left', '0px');
		$('.radio_write').hide();
		$('.radio_radio').hide('slow');
		$('.radio_write').show('slow');
		btn_1.hide();
		// $('.bc_editor').text('');
		$('.bc-title').val('');
		$(".radio_create").attr('disabled',true);
		$('.radio_create').css({"margin-right":"0px"});
		$('.radio_create').removeClass("btn-span");
		$('.radio_create').addClass("btn-span_s");
		$('.bc-title').on("keyup",function(){
			if($('.bc-title').val().length==""){
				$(".radio_create").attr('disabled',true);
				$('.radio_create').removeClass("btn-span");
				$('.radio_create').addClass("btn-span_s");
			}else{
				$(".radio_create").attr('disabled',false);
				$('.radio_create').removeClass("btn-span_s");
				$('.radio_create').addClass("btn-span");
			}
		});
	})
	$('.bc_editor').on('focus', function (event) {
		var child = $(event.target).children('i');
		if (child.hasClass('bc_editor_i')) {
			child.remove();
			$(event.target).text('');
		}
	}).on('blur', function (event) {
		var target = $(event.target);
		// console.log(target.text());
		if (target.text().trim() === '') {
			target.append('<i class="bc_editor_i">请输入广播内容</i>');
		}
	})
	$('.radio_level3_footer_next').children().eq(0).on('click', function() {
			$(this).parent().parent().hide('slow', function() {
				btn_1.show();
				var text = $('.radio_text');
				text.text('');
				text.append('<i class="bc_editor_i">请输入广播内容</i>');
			});
		})
		//点击显示二级菜单
	$('.radio_radio').hide();
	$('.radio_main_ul').children().children().eq(0).on('click', function() {
			$('.radio_radio').css('margin-left', '0px');
			$('.radio_radio').show('slow');
		})
		//筛选 日期 
	$('.radio_top_search').children().eq(1).on('click', function(e) {
			var that = $(this).parent().next();
			if (that.is(':hidden')) {
				Radio_imgswitch=false;
				that.slideDown('slow');
				$(this).children().attr('src', 'img/icon/channel/channel_search2.png')
			} else {
				Radio_imgswitch=true;
				that.slideUp('slow');
				$(this).children().attr('src', 'img/icon/channel/channel_search1.png');
				// $('.bc_filter a').removeClass('bafiltera');
				// $('.baTimeBox').hide();
			}
			e.stopPropagation();
		})

	/************广播呼叫***************/

	$('.left_icon').css('top', (wh - 120) / 2);
	$('#bcFilterS').val(getTodayDate());
	$('#bcFilterE').val(getTodayDate());
	$('#brecording-start').val(getTodayDate());
	$('#brecording-end').val(getTodayDate());
	
	var timeA = $('.bc_filter').find('a');
	var baTimeBox = $('.baTimeBox');
	timeA.on('click', function() {
		var that = $(this);
		if (that.hasClass('bafiltera')) {
			that.removeClass('bafiltera');
			if (that.hasClass('bcTimeSelect')) {
				baTimeBox.hide();
			}
		} else {
			timeA.removeClass('bafiltera');
			that.addClass('bafiltera');
			if (that.hasClass('bcTimeSelect')) {
				baTimeBox.show();
			} else {
				baTimeBox.hide();
			}
		}
	});

	$('.radio_btn2').on('click', function() {
		$('.radio_radio').hide('slow', function() {
			$('.radio_btn').show();
		})
	});


	//document事件绑定
	$(document).on('click', function () {
		if ($('#station_radio').css('display') === 'block') {
			broadcastEventDispatch();
		}
	})

	$('.radio_top_filter').on('click', function(e){
		e.stopPropagation();
	})

	//广播呼叫判定
	var loginMaster = null;
	var loginMasterTimer = null;
	var isLoginMasterBroadcast = function () {
		var dispaterType = $.cookie('Type');	
		loginMaster = usersAll.get(loginId);

		if (dispaterType == 1) {
			clearInterval(loginMasterTimer);
			isApearBroadcast(dispaterType);
		} else {
			if (loginMaster) {
				clearInterval(loginMasterTimer);
				isApearBroadcast(loginMaster.BroadCastRole);
			}
		}
	}

	loginMasterTimer = setInterval(isLoginMasterBroadcast, 1000)
	
	function isApearBroadcast(isBroadcast) {
		$('.radio_main_footer_btn').hide();

		if (isBroadcast) {
			$('.radio_main_footer').children('span').css('display', 'inline-block');

		} else {
			$('.create_broad_btn').css({'display': 'inline-block', 'width': '220px'})
		}
	}
}

//
function broadcastEventDispatch() {
	var shaixuan = $('.radio_top_filter');
	if (shaixuan.css('display') == 'block') {
		shaixuan.css('display', 'none');
		$('.bcFilterLog').attr('src', 'img/icon/channel/channel_search1.png');
		Radio_imgswitch=true;

	}
}


function event_broadcast_call() {

}














//广播的代码实现

var bcCallpower = [];
var broadcastTimeS;
var broadcastTimeE;
var broadcastPSize = 20;
var broadcastIndex = 0;
var broadcastList = [];
var broadcastStr = '';
var broadcastNum = 0;
var broadcastTotal = 0;

//广播数据接口
function broadcastDataGet() {
	var date = new Date();
	//	broadcastTimeS = date.getFullYear()+'-'+two((date.getMonth() + 1))+'-'+two(date.getDate())+' 00:00:00';
	broadcastTimeE = date.getFullYear() + '-' + two((date.getMonth() + 1)) + '-' + two(date.getDate()) + ' ' + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
	broadcastTimeS = "2017-01-01 00:00:00";
	broadcastIndex = 0;
	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			// console.log(ret)
			if (ret.Result == 200) {
				broadcastDataGot(ret, 0);
			} else {
				broadcastGetFail();
			}
		}
	)
}

//加载广播列表
function broadcastDataGot(data, initialLoad) {
	broadcastTotal = data.PageTotalCount;
	
	if (broadcastIndex < broadcastTotal - 1) {
		$('.broadcastPage').show();
	} else {
		$('.broadcastPage').hide();
	}
	for(var i=0;i<data.Broadcasts.length;i++){
	     var datahtml=toBaseText(data.Broadcasts[i].Html);
	     var datahtmlval=datahtml.substring(datahtml.indexOf('>')+1,datahtml.lastIndexOf('<'));
	     data.Broadcasts[i].Html=datahtmlval;
	}

	$('.broadcastLoadmoreBtn').show();
	$('.broadcastLoadmoreImg').hide();
	
	// $('.bcpageTotal').text(data.PageTotalCount);
	// $('.bcpageNum').text(broadcastIndex + 1);
	var ul = $('.broadcastUl');
	var html = '';
	var list = data.Broadcasts;
	var time, date, time1, uid, name, read, bid;

	if (initialLoad === 0) {
		ul.empty();
		broadcastList = [];
	}
	var today=new Date();
	var timetoday = today.getFullYear() + '-' + getTimezero((today.getMonth() + 1)) + '-' + getTimezero(today.getDate());
	broadcastList = broadcastList.concat(list);
	for (var i = 0, len = list.length; i < len; i++) {
		var title = $('#company_name').text();
		time = list[i].Time;
		time1 = time.slice(11, 16);
		date = time.slice(0, 10);
		if(date==timetoday){
			date='今天';
		}
		uid = list[i].Uid;
		name = list[i].Name;
		read = list[i].ReadStatus;
		bid = list[i].Id;
		if (broadcastStr !== date) {
			broadcastStr = date;
			broadcastNum = 1;
		} else {
			broadcastNum = 0;
		}

		if (broadcastNum == 1) {
			html += '<div class="brocast-date">' + broadcastStr + '</div>';
		}

		if (title == name) name = '我';
		if (read == 1)
			html += '<li class="'+uid+'" id="b' + bid + '"><a onclick="broadcastClick(\'' + bid + '\',\'' + uid + '\')"><p><strong class="readed-color">' + list[i].Title + '</strong><i>' + time1 + '</i></p><span class="username">' + name + '</span></a></li>';
		else
			html += '<li class="'+uid+'" id="b' + bid + '"><a onclick="broadcastClick(\'' + bid + '\',\'' + uid + '\')"><p><strong>' + list[i].Title + '</strong><i>' + time1 + '</i></p><span class="username">' + name + '</span></a></li>';
	}
	ul.append(html);
	broadcastStr = '';
}

//设置已读
function broadcastReaded(bid) {
	var broadcast = findBroadcastById(bid);
	var read = broadcast.ReadStatus;
	var body = '{"Code":10504,"Body":{"SessionId":\"' + sessionId + '\","BroadcastIds":[\"' + bid + '\"]}}';
	//	console.log(body)
	if (read == 0) {
		$.getJSON(STATION_URL + '?Body=' + body,
			function(ret) { 
				if (ret.Result == 200) {
					$('#b'+bid).find('strong').addClass('readed-color');
					broadcast.ReadStatus = 1;
				}
			}
		)
	}
}

//广播点击事件
function broadcastClick(bid, uid) {
	var broadcast = findBroadcastById(bid);
	var date = broadcast.Time;
	var title = broadcast.Title;
	var html;
	var broadcast_title = $('.broadcast_title');
	var broadcast_text = $('.broadcast_text');
	var footer = $('.radio_level2_footer');
	var radio2 = $('.radio_radio');
	var wh = $(window).height();
	broadcast_title.text('');
	broadcast_text.text('');
	onlineIconStatus(uid);
	broadcastFint();
	$('.radio_level2_me').hide();
	if (uid == loginId) {
		$('.radio_level2_me').show();
		$('.radio_level2_footer').outerHeight(wh - 103 - 96);
	}
	date = date.slice(0, 16);
	$('.radio_write').hide();
	$('.brodcast_name').text(broadcast.Name).attr('userid', uid);
	$('.brodcast_time').text(date);
	$('.radio_btn').hide();
	radio2.hide();
	radio2.show('slow');
	$('#broadcastUl li').css("background", "#ffffff");
	$('#b' + bid).css("background", "#EFEEEC");
	$('.bcdelNum').text(bid);
	var body = '{"Code":10503,"Body":{"SessionId":\"' + sessionId + '\","BroadcastId":\"' + bid + '\"}}';
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if (ret.Result == 200) {
				html = toBaseText(ret.Html);
				broadcast_title.text(title);
				broadcast_text.html(html);
				broadcastReaded(bid);
				if($('.radio_level2_me').css('display')=="none"){
					$('.radio_level2_footer').css('height','');
					$('#Radio_text').css('height','');
					if($('#Radio_text').height()>=400){
						$('#Radio_text').css('height','400px');
					}
				}
				
				$('.broadcast_text').find('.bc_editor').attr('contenteditable', false);
			} else {	
				broadcast_title.html('<span class="broadfail">广播内容加载失败！</span>');
				broadcast_text.text('');
			}
		}
	)
}

function broadcastFint () {
   
    $('.radio_level2_me').children('img').attr('src','img/icon/newicon/help_deleted.png');
    $('.bcDelbox').hide();
}


function findBroadcastById(bid) {
	var broadcast = null;
	if (broadcastList.length > 0) {
		for (var i = 0; i < broadcastList.length; i++) {
			if (broadcastList[i].Id === bid) {
				broadcast = broadcastList[i];
				break;
			}
		}
	}
	return broadcast;
}


function broadcastRemoveById(bid) {
	if (broadcastList.length > 0) {
		for (var i = 0; i < broadcastList.length; i++) {
			if (broadcastList[i].Id === bid) {
				broadcastList.splice(i, 1);
				break;
			}
		}
	}	
}

function bcToDel() {
	var box = $('.bcDelbox');
	if (box.is(':hidden')) {
		box.show();
		$('.radio_level2_me').children('img').attr('src','img/icon/newicon/help_deleteds.png');
	} else {
		box.hide();
		$('.radio_level2_me').children('img').attr('src','img/icon/newicon/help_deleted.png');
	}

	$('.bcDelcancel').on('click', function() {
		box.hide();
		$('.radio_level2_me').children('img').attr('src','img/icon/newicon/help_deleted.png');
	})
}

//删除广播
function broadcastDel() {
	var n = $('.bcdelNum').text();
	var body = '{"Code":10501,"Body":{"SessionId":\"' + sessionId + '\","BroadcastId":\"' + n + '\"}}';

	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if (ret.Result == 200) {
				broadcastDelSuccess(n);
			} else {
				showAlert('删除失败');
			}
		}
	)
}

//删除成功
function broadcastDelSuccess(bid) {
	showAlert('已删除');
	broadcastRemoveById(bid);
	$('.radio_radio').hide('slow', function (){$('.radio_btn').show()});
	$('#b' + bid).remove();
	$('.bcDelbox').hide();
}

//获取广播列表数据失败
function broadcastGetFail() {
	var ul = $('.broadcastUl');
	ul.empty();
	ul.append($('<div class="bcnodata">当前没有广播数据！</div>'));
	$('.broadcastPage').hide();
}

function Pulley_radio(){
	if($('.broadcastPage').css("display")=="none"){
 		return;
 	}
	var Height_gdt=$("#Pulley_rid").scrollTop();
	var Height_div =$("#Pulley_rid")[0].scrollHeight-$("#Pulley_rid").height();
	if(Pulley_radio_jishu != Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_radio_jishu = Height_gdt;
			broadcastLoadmoreFn();
		}
	}
	
	
}

//加载更多
function broadcastLoadmoreFn() {
	$('.broadcastLoadmoreBtn').hide();
	$('.broadcastLoadmoreImg').show();
	broadcastIndex = broadcastIndex < broadcastTotal - 1 ? broadcastIndex + 1 : broadcastIndex;
	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				broadcastDataGot(ret);
			} else {
				broadcastGetFail();
			}
		}
	)
}

//创建广播
function broadcastCreate() {
	var head = $('.bc-title');
	var content = $('.radio_level3_footer_write').children('.radio_text');
	var title, html, body;
	var broadcastTitle = head.val();
	var broadcastContent = content.text();

	if (broadcastTitle.length > 100) {
		showAlert('广播标题长度不能超过100个字符！');
		return;
	}
	if (broadcastTitle == '') {
		showAlert('广播标题不能为空！');
		return;
	}
	var specialCode = RegeMatchValC(broadcastTitle);
	
	if (specialCode) {
		return showAlert('广播标题不允许有特殊字符！');
	}

	if (broadcastTitle.trim() == '') {
		showAlert('广播标题不能全部为空格！');
		return;
	}
	
	if (broadcastContent == '') {
		showAlert('广播内容不能为空！');
		return;
	}
	if (broadcastContent.trim() == '') {
		showAlert('广播内容不能全部为空格！');
		return;
	}

	if (broadcastContent.length > 1024) {
		showAlert('广播内容不能超过1024个字符！');
		return;
	}

	html = toBase64($('.radio_level3_footer_write').html());
	// html = toBase64(encodeURI(encodeURI(content.html())));
	title = encodeURI(encodeURI(head.val()));
	body = '{"Code":10502,"Body":{"SessionId":\"' + sessionId + '\","Title":\"' + title + '\","Html":\"' + html + '\"}}';
	
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			
			if (ret.Result == 200) {
				broadcastCreateSuccess(ret.BroadcastId);
			} else {
				showAlert('广播创建失败！');
			}
		}
	)
	
}


function broadcastCreateSuccess(bid) {
	showAlert("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />&nbsp;&nbsp;广播创建成功！");

	var head = $('.bc-title');
	var content = $('.radio_level3_footer_write').children('.radio_text');
	
	$('.radio_write').hide();
	head.val('');
	content.val('');
	$('.bc_editor').text('');
	broadcastDataGet();
}

//广播搜索
function broadcastSearch() {
	var str = $('.bafiltera').html();
	var bcFilterS = $('.bcFilterS').val();
	var bcFilterE = $('.bcFilterE').val();
	var date = new Date();
	broadcastTimeE = date.getFullYear() + '-' + two((date.getMonth() + 1)) + '-' + two(date.getDate()) + ' ' + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
	broadcastIndex = 0;

	if (str == undefined) {
		showAlert('请选择筛选条件！');
		return;
	} else if (str == '一周') {
		broadcastTimeS = getTimefrom(7);
	} else if (str == '两周') {
		broadcastTimeS = getTimefrom(14);
	} else if (str == '一个月') {
		broadcastTimeS = getTimefrom(30)
	} else {
		var start = Date.parse(bcFilterS.replace(/-/g, '/'));
		var stop = Date.parse(bcFilterE.replace(/-/g, '/'));
		if (start > stop) {
			showAlert('开始时间不能大于结束时间');
			return;
		}
		broadcastTimeS = bcFilterS + ' ' + '00:00:00';
		broadcastTimeE = bcFilterE + ' ' + '23:59:59';
	}

	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';
	// console.log(body);
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			
			if (ret.Result == 200) {
				broadcastDataGot(ret, 0);
				$('.radio_top_filter').hide();
				$('.radio_top_filter a').removeClass('bafiltera');
				$('.bcFilterLog').attr('src', 'img/icon/channel/channel_search1.png');
				$('.baTimeBox').hide();
			} else {
				broadcastGetFail();
			}
		}
	)
}

//广播列表模糊搜索
function broadcastFuzzySearch() {
	var k = $('.radio_search_input').val();
	var ul2 = $('#broadcastUl2');
	var ul1 = $('#broadcastUl');
	var page = $('.broadcastPage');
	var result;
	if (k == '+' || k == '[' || k == '(' || k == '\\' || k == '^' || k == '$' || k == '|' || k == ')' || k == '?' || k == '*' || k == '.' || k == ']') {
		$('.radio_search_input').val('')
		return;
	}
	k = codeWritedMofify(k);
	if (k == '') {
		ul1.show();
		ul2.hide();
		if (broadcastIndex < broadcastTotal - 1) {page.show()}
	} else {
		ul1.hide();
		ul2.show();
		page.hide();
		result = bcFuzzySearchRegExp(k, broadcastList);
		bcSearchResultShow(k, result);
	}
}

function bcFuzzySearchRegExp(key, list) {
	if (!(list instanceof Array)) return;
	var arr = [],
		len = list.length,
		userMe='我',
		reg = new RegExp(key);
	for (var i = 0; i < len; i++) {
		if (list[i].Title.match(reg) || list[i].Name.match(reg) || list[i].Html.match(reg)) {
			arr.push(list[i]);
		}else if(userMe==key){
			var val=$('#company_name').text();
			 if(list[i].Name.match(val)){
			 	arr.push(list[i]);
			 }
		}
	}
	return arr;
}

var bcFuzzyStr = '';
var bcFuzzyNum = 0;

function bcSearchResultShow(key, list) {
	var ul = $('#broadcastUl2');
	var html = '';
	var time, date, time1, uid, title, name, tname, id, datahtml;
	 var todateday = new Date();
     var dataday = todateday.getFullYear() + '-' + getTimezero((todateday.getMonth() + 1)) + '-' + getTimezero(todateday.getDate());
	ul.empty();
	keycode = new RegExp(key, 'g');

	for (var i = 0, len = list.length; i < len; i++) {
		tname = $('#company_name').text();
		time = list[i].Time;
		time1 = time.slice(11, 16);
		date = time.slice(0, 10);
		id = list[i].Id
		uid = list[i].Uid;
		name = list[i].Name;
		if (tname == name) name = '我';
		title = list[i].Title.replace(keycode, '<span class="sf-color">' + key + '</span>');
		name = name.replace(keycode, '<span class="sf-color">' + key + '</span>');
 
		if (bcFuzzyStr !== date) {
			
			if( dataday == date) {
				datahtml = '今天';
			}else {
				datahtml = date;
			}
	            bcFuzzyStr = date;
				bcFuzzyNum = 1;
		} else {
				bcFuzzyNum = 0;
		}

		if (bcFuzzyNum == 1) {
			html += '<div class="brocast-date">' + datahtml + '</div>';
		}
		
		html += '<li class="li_' + i + '"><a onclick="broadcastClick(\'' + id + '\',\'' + uid + '\')"><p>' + title + '<i>' + time1 + '</i></p><span>' + name + '</span></a></li>';
	}
	if(html==''){
		html="<h3 class='help_wu'>无相关记录</h3>";
	}
	ul.append(html);
	bcFuzzyStr = '';
}

//广播呼叫权限列表获取

function bcCallpowerList() {
	var body = '{"Code":11320,"Body":{"SessionId":\"' + sessionId + '\"}}';
	// console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(ret);
		if (ret.Result == 200) {
			bcCallpower = ret.Members;
		}
	});
}


//===============================================================================================================
//广播呼叫倒计时

var broadcastTimer = null;
var RADIO_SELECT_NUMBER = 0;
var RADIO_CALL_TOTAL = 30;
var RADIO_CALL_LIST = [];
var RADIO_CALL_ALL = true;

function broadcastTimeBegin() {
	var broadcastCount = 120;
	var content = $('.broadcast-call-title');
	content.text('发言时长倒计时：' + ' ' + broadcastCount + 's');
	
	broadcastTimer = setInterval(function () {
		--broadcastCount;
		content.text('发言时长倒计时：' + ' ' + broadcastCount + 's');
	}, 1000);
}

function broadcastTimeEnd() {
	var content = $('.broadcast-call-title');

	clearInterval(broadcastTimer);
	content.text('点击对讲按钮开始广播呼叫');
}

//广播呼叫部分成员选择 2017.12.9 14:32
function radioTreeApear() {
	if (isBroadcastSpeaking) return showAlert('当前广播中，不能切换按钮！');
	$('#radioTree').show();
	var top = -($('.radio_main_say').outerHeight() - 18);
	
	$('.radio_main_say').css('top', top);
	// $('.radio_main_icon').css('top', '516px');
	$('.radioUserSelect_some').css({'background': '#FA7C01', 'color': '#ffffff'});
	$('.radioUserSelect_all').css({'background': '#ffffff', 'color': '#FA7C01'});
	
	if ($('#radio_tree').is(':empty')) {
		inintRadioTree();
	}

	RADIO_CALL_ALL = false;
}

function radioTreeHide() {
	if (isBroadcastSpeaking) return showAlert('当前广播中，不能切换按钮！');
	$('#radioTree').hide();
	var top = -($('.radio_main_say').outerHeight() - 8);
	
	$('.radio_main_say').css('top', top);
	// $('.radio_main_icon').css('top', '151px');
	$('.radioUserSelect_all').css({'background': '#FA7C01', 'color': '#ffffff'});
	$('.radioUserSelect_some').css({'background': '#ffffff', 'color': '#FA7C01'});

	RADIO_CALL_ALL = true;
}

function radioUserSelectEvent(event, treeId, treeNode) {
	var check = treeNode.checked;
	var isParent = treeNode.isParent;

	if (isParent) {
		var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodes = ztreeObj.getCheckedNodes(true);

		RADIO_CALL_LIST.length = 0;
		RADIO_SELECT_NUMBER = nodes.length;
		
		for (var i=0, len=nodes.length; i<len; i++) {
			RADIO_CALL_LIST.push(nodes[i].id);
		}	
	} else {
		if (check) {
			RADIO_CALL_LIST.push(treeNode.id);
			RADIO_SELECT_NUMBER += 1;
		} else {
			RADIO_SELECT_NUMBER -= 1;
			var index = RADIO_CALL_LIST.indexOf(treeNode.id);
			if (index !== -1) {
				RADIO_CALL_LIST.splice(index, 1);
			}
		}
	}
	
	$('.selectNumber').text(RADIO_SELECT_NUMBER);
	$('.selectMore').text(RADIO_CALL_TOTAL - RADIO_SELECT_NUMBER);
}


//before
function ztreeBeforeCheck_broadcast(treeId, treeNode) {
	if (isBroadcastSpeaking) {
		showAlert('当前广播中，不能勾选、解除用户！');
		return false;
	}
	if (!treeNode.isParent) {
		if (RADIO_SELECT_NUMBER === RADIO_CALL_TOTAL && !treeNode.checked) {
			showAlert('呼叫用户不能超过' + RADIO_CALL_TOTAL + '人！');
			return false;
		}
	} else {
		if (!treeNode.checked) {
			var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
			var nodes = ztreeObj.getNodesByFilter(nodeWillCheckFilter, false, treeNode);

			if (nodes.length + RADIO_SELECT_NUMBER > RADIO_CALL_TOTAL) {
				showAlert('呼叫用户不能超过' + RADIO_CALL_TOTAL + '人！');
				return false;
			}
		}
	}
}

function nodeWillCheckFilter(node) {
	return !node.isParent && node.id !== loginId;
}

function ztreeCheckboxSelect(event, treeId) {
	var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = ztreeObj.getCheckedNodes(true);

	return nodes;
}

//------------------------广播记录列表---------------------------
var bcListIndex = 0;
var bc_uid = '';
var bc_timefrom = '';
var bc_timeto = '';

function bcRecordSearch() {
	var body = '{"Code":10602,"Body":{"SessionId":\"'+sessionId+'\","TimeFrom":\"'+bc_timefrom+'\","TimeTo":\"'+bc_timeto+'\","Uid":\"'+bc_uid+'\","PageSize":' + broadcastPSize + ',"PageIndex":' + bcListIndex + '}}';
	console.log(body);
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body,
		function (ret){
			coverHide();
			if (ret.Result == 200) {
				console.log(ret);
				broadcastRecordingList(ret.Messages);
			} else {
				if (bcListIndex == 0) {
					$('#bc_recording_list').empty().append('<span style="display:block; text-align:center;">获取数据失败！</span>');
					$('.brecording-more').hide();
				} else {
					showAlert('获取数据失败,请重新获取！');
					$('.brecording-more span').show();
					$('.brecording-more-img').hide();
				}
			}
		}
	)	
}

function broadcastRecordingList(record) {
	var html = '';
	var broadcastBox = $('#bc_recording_list');

	if (record.length == 0 && bcListIndex == 0) {
		broadcastBox.empty().append('<span style="display:block; text-align:center;">暂无数据</span>');
		$('.brecording-more').hide();
		return;
	}

	if (record.length) {
		for (var i = 0, len = record.length; i < len; i++) {
			var time = record[i].Time.slice(0, 10);
			html += '<li class="fix" id="'+record[i].Id+'" uid="'+record[i].Uid+'" resurl="'+record[i].ResUrl+'">'+
						'<div class="fl"><img src="img/chat/recording.png" alt="img"  onclick="recordingSpeak(\'' + record[i].Id + '\', \'' + record[i].ResUrl + '\')"/>'+
							'<span class="bc-name">'+ record[i].Name +'</span></div>'+
						'<div class="fr"><span>'+ time +'</span></div>'+
					'</li>';
		}
	}

	if (bcListIndex == 0) {
		broadcastBox.empty();
	}

	broadcastBox.append(html);
	$('.brecording-more span').show();
	$('.brecording-more-img').hide();
	if (record.length >= broadcastPSize) {
		$('.brecording-more').show();
	} else {
		$('.brecording-more').hide();
	}
}

function broadcastLoadmoreBtnclick() {
	bcListIndex++;
	$('.brecording-more span').hide();
	$('.brecording-more-img').show();
	bcRecordSearch();
}

function broadcastSearchBtnclick() {
	var start = $('#brecording-start').val();
	var end = $('#brecording-end').val();

	if (Date.parse(start.replace(/-/g, '/')) > Date.parse(end.replace(/-/g, '/'))) {
		showAlert('开始时间不能大于结束时间');
		return;
	}

	bc_timefrom = start + ' 00:00:00';
	bc_timeto = end + ' 23:59:59';
	bcListIndex = 0;
	bcRecordSearch();
}

function Radio_BtnLeft (n) {
	if ($('.' + n).css("margin-left") == '80px') {
		$('.' + n).animate({
			'margin-left': '-180px'
		});
		$('.' + n).find('.left_icon').css("background", "#bca48a url(./img/right_icon.png) no-repeat center center");
		 
		Close_window();
	} else {
		$('.' + n).animate({
			'margin-left': '80px'
		});
		$('.' + n).find('.left_icon').css("background", "#bca48a url(./img/left_icon.png) no-repeat center center");
		if(p_popup==1){
			l_lose();
		}
	}
}














// function radioNocheck() {
// 	if (isBroadcastSpeaking) {
// 		return showAlert('当前广播中，不能勾选、解除用户！');
// 	}	
// }


//首页
// function bcpageIndex() {
// 	broadcastIndex = 0;
// 	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			if (ret.Result == 200) {
// 				broadcastDataGot(ret);
// 			} else {
// 				broadcastGetFail();
// 			}
// 		}
// 	)
// }

//上一页
// function bcpagePreve() {
// 	broadcastIndex = broadcastIndex > 0 ? broadcastIndex - 1 : 0;
// 	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			if (ret.Result == 200) {
// 				broadcastDataGot(ret);
// 			} else {
// 				broadcastGetFail();
// 			}
// 		}
// 	)
// }

//下一页
// function bcpageNext() {
// 	broadcastIndex = broadcastIndex < broadcastTotal - 1 ? broadcastIndex + 1 : broadcastIndex;
// 	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			if (ret.Result == 200) {
// 				broadcastDataGot(ret);
// 			} else {
// 				broadcastGetFail();
// 			}
// 		}
// 	)
// }

//尾页
// function bcpageLast() {
// 	//broadcastIndex = broadcastIndex < broadcastTotal - 1 ? broadcastIndex+1 : broadcastIndex;
// 	broadcastIndex = broadcastTotal - 1;
// 	var body = '{"Code":10500,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":\"' + broadcastTimeS + '\","TimeTo":\"' + broadcastTimeE + '\","PageSize":' + broadcastPSize + ',"PageIndex":' + broadcastIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			if (ret.Result == 200) {
// 				broadcastDataGot(ret);
// 			} else {
// 				broadcastGetFail();
// 			}
// 		}
// 	)
// }
function Radio_text_height(e){
	var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if (code>0) {
    	if($('.radio_text').height()=='0'||$('.radio_text').height()==""){
    		$('.radio_text').height($('.radio_level3_footer').height() - 52);
    	}
    	if($('.radio_text').height()>=$('.radio_level3_footer').height() - 52){
    		$('.radio_text').height($('.radio_level3_footer').height() - 52);
    	}
    }

}