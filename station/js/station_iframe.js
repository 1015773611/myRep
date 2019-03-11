var onlineInfo = window.parent.onlineInfo;
var chatMembersSort = window.parent.chatMembersSort;
var HelpMansArrays=[];
var HelploginId=window.parent.HelploginId;

var nodeWillNoCheckFilter = window.parent.nodeWillNoCheckFilter;
var nodeWillCheckFilter = window.parent.nodeWillCheckFilter;
var addTreeuserView = window.parent.addTreeuserView;
var treeAddUsers = window.parent.treeAddUsers;
// var videoAddTreeuserView = window.parent.videoAddTreeuserView;
    // window.parent.user_Alls();
////////////////以下是亮亮转发页面的js//////////////////////
function iframeready() {
	var windowHigh = $(window.parent).height();
	$('.media_transmit').outerHeight(windowHigh - 70);
	$('.media_memberselect').outerHeight(windowHigh - 70);
	$('.Video_channel').outerHeight(windowHigh - 70);
	$('.media_channelmainul1').outerHeight(windowHigh - 295);
	$('.media_channeltellmainul1').outerHeight(windowHigh - 295);
	$('.media_member').outerHeight(windowHigh - 223);
	$('#media_memberselect2').outerHeight(windowHigh - 164);
	$('.Video_channelUl').outerHeight(windowHigh - 214);
	$('.Video_tellchannel').outerHeight(windowHigh - 70);
	$('.Video_tellchannelcontainer').outerHeight(windowHigh - 338);
	$('.left_icon').css('top', (windowHigh - 120) / 2);
	// HelpMansArrays = window.parent.HelpManArrays;
	// media_ul1();
	// media_tellul1();
	// HelpCode10115();

	$('.media_transmitselect1').children().on('click', function() {
		treeAddUsers.clear();
        var loginIds = $.cookie('loginId');
        loginId = getDAes(loginIds);

	    var media_index = $(this).index();
	    var val2 = $('.media_transmitsearchbox').children('input').val('');
        var val1 = ''; 
        videokeyse(val1,val2);
		var veframe = $(window.parent.document.getElementById("veiframe"));
		if (media_index == 0) {
			veframe.width('262');
			$('.media_channelmain').show().siblings().hide();
			$('.media_memberselect').hide();
			$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
		} else if (media_index == 1) {
			veframe.width('262');
			$('.media_channeltellmain').show().siblings().hide();
			$('.media_memberselect').hide();
			$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
		} else if (media_index == 2) {
			veframe.width('522');
			inintChnanneVideoTree();
			$('.media_member').show().siblings().hide();
			$('#media_memberselect2').empty();
			$('.media_memberselect').show();
			$('.User_Alls').children('li').children('input').attr('checked',false);
			$(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
			var el = $('#main_watch');
			var obj = el.children('object');
			obj.width(el.width() - 520);
			zTreeOnAsyncSuccess('tramitvideo');
		}
	})
	    $('.Video_channelUl ul li').hover(function() {
			$(this).children('.Video_channelUlshow').show();
			$(this).children('.Video_channelUlname').hide();
		},
		function() {
			$(this).children('.Video_channelUlname').show();
			$(this).children('.Video_channelUlshow').hide();
		})
}
////////////////以上是亮亮转发页面的js//////////////////////


////////////////以下是亮亮转发页面的js//////////////////////
  function media_ul1() {
     var body = '{"Code":"10305","Body":{"SessionId":"' + sessionId + '"}}';
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
       function(ret) {
         if (ret.Result == 200) {
           var channel = ret.Channels;
           var len = ret.Channels.length;
           var html = '';
           for (var i = 0; i < len; i++) {
             var channel_levels = '';
             var Level = ret.Channels[i].Level;

             switch (Level) {
               case 0:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li  user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 1:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 2:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 3:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 4:
                 channel_levels = '';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
             }
           }
           $('.media_channelmain .media_channelmainul1').empty().append(html);
           $('input[name=media_transmit]').each(function(i) {
	             $(this).on('click', function() {
	               event.stopPropagation();
	             });
           });
         } else {
           // alert('操作失败'+obj.Result);
         }
       })
   }

function Video_Channelc(obj) {
	if ($(obj).parent().next().is(":hidden")) {
		$(obj).parent().next().slideDown();
		$(obj).attr('src', 'img/icon/video/video_busys.png')
	} else {
		$(obj).parent().next().slideUp();
		$(obj).attr('src', 'img/icon/channel/channel_busy.png')
	}
}


function ifame_media10311(id, that) {
	var online = onlineInfo.keySet();
	var body = '{"Code":"10311","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + id + '","Type":"1"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			if (ret.Result == 200) {
				var data = chatMembersSort(online, ret.Members);
				var html = '';
				var onlineImg = '<img class="ve_chatline_icon" src="img/chat/online.png" alt="">';
				var outlineImg = '<img class="ve_chatline_icon" src="img/chat/outline.png" alt="">';
				var channel_level = '<img src="img/icon/channel/channel_manlevel.png" alt="">';

				for (var i = 0; i < data.length; i++) {
					if (data[i].online) {
						switch (data[i].Level) {
							case 0:
								channel_memberimg = channel_level + channel_level;
								html += '<li><div>' + onlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case 1:
								channel_memberimg = channel_level;
								html += '<li><div>' + onlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case 2:
								channel_memberimg = '';
								html += '<li><div>' + onlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case -1:
								channel_memberimg = '<img src="img/icon/channel/channel_say.png" alt="">';
								html += '<li><div>' + onlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
						}
					} else {
						switch (data[i].Level) {
							case 0:
								channel_memberimg = channel_level + channel_level;
								html += '<li><div>' + outlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case 1:
								channel_memberimg = channel_level;
								html += '<li><div>' + outlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case 2:
								channel_memberimg = '';
								html += '<li><div>' + outlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
							case -1:
								channel_memberimg = '<img src="img/icon/channel/channel_say.png" alt="">';
								html += '<li><div>' + outlineImg + '<i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
								break;
						}
					}
				}
				$(that).next().empty().append(html);
				$(that).next().show('slow');
				$(that).parent().siblings().children('ul').hide('slow');
				$(that).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_up_03.png");
			} else {
				//                  	alert('操作失败'+ret.Result);
			}

		})
}

 
function media_tellul1() {
     var body = '{"Code":"10310","Body":{"SessionId":"' + sessionId + '"}}';
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
       function(ret) {
         if (ret.Result == 200) {
           var html = '';
           for (var i = 0; i < ret.Conversations.length; i++) {
             html += '<li user="' + ret.Conversations[i].Id + '" name="' + ret.Conversations[i].Name + '"><div onclick="mediatellchannellevel2(this)"><div class="userall_select" cid="'+ret.Conversations[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name">' + ret.Conversations[i].Name + '</i><div class="mediachannelul1level  fr"><img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
           }
           $('.media_channeltellmain .media_channeltellmainul1').empty().append(html);
           $('input[name=media_transmit1]').each(function(i) {
             $(this).on('click', function() {
               event.stopPropagation();
             });
           });
         } else {
           // alert('操作失败'+obj.Result);
           $('.media_channeltellmain .media_channeltellmainul1').empty().append('<h3 class="help_wu">暂无数据</h3>');
         }
       })
   }

function media10312(channeltell_id, obj) {
	var online = onlineInfo.keySet();

	var body = '{"Code":"10312","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channeltell_id + '"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			// console.log('10312结果' + ret.Result);
			if (ret.Result == 200) {
				var data = chatMembersSort(online, ret.Members);
				var onlineImg = '<img class="ve_chatline_icon" src="img/chat/online.png" alt="">';
				var outlineImg = '<img class="ve_chatline_icon" src="img/chat/outline.png" alt="">';
				var html = '';
				for (var i = 0; i < data.length; i++) {
					if (data[i].online) {
						html += '<li><div>' + onlineImg + '<i>' + data[i].Name + '</i></div></li>';
					} else {
						html += '<li><div>' + outlineImg + '<i>' + data[i].Name + '</i></div></li>';
					}
				}
				$(obj).next().empty().append(html);
				$(obj).next().show('slow');
				$(obj).parent().siblings().children('ul').hide('slow');
				$(obj).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_up_03.png");
			} else {
				//      	 	alert('操作失败'+ret.Result);
			}
		})
}


function mediachannellevel2(obj) {
	var channel_id = $(obj).parent().attr('user');
	// var channel_id = $(obj).parent().attr('id');
	// channel_id = channel_id.slice(0, channel_id.length - 1);
	if ($(obj).next().css('display') == 'none') {
		ifame_media10311(channel_id, obj);
	}else{
		$(obj).next().hide('slow');
		$(obj).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_select.png");
	}
}

function mediatellchannellevel2(obj) {
	var channeltell_id = $(obj).parent().attr('user');
	// var channeltell_id = $(obj).parent().attr('id');
	if ($(obj).next().css('display') == 'none') {
		media10312(channeltell_id, obj);

	} else {
		$(obj).next().hide('slow');
		$(obj).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_select.png");
	}
}
//增加会话成员
// function videoAddtree(event, treeId, treeNode) {
// 	var html = '';
// 	var select = treeNode.checked;
// 	var HelpSelect = [];
// 	$('#media_memberselect2').children().each(function(i) {
// 		HelpSelect.push($('#media_memberselect2').children('li').eq(i).attr('name'));
// 	})
// 	if (select) {
// 		var arraynum = $.inArray(treeNode.id, HelpSelect);
// 		if (arraynum > -1) {
// 			return
// 		}
// 		html = '<li name="' + treeNode.id + '" class="channeladdmanlist" name="channelman"><i>' + treeNode.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>'
// 	$('#VideosAllman').children('li[user=' + treeNode.id + ']').children('input').prop('checked', true);
// 		$('#media_memberselect2').append(html);
// 	} else {
// 	$('#VideosAllman').children('li[user=' + treeNode.id + ']').children('input').prop('checked', false);

// 		$('#media_memberselect2').children('li[name="' + treeNode.id + '"]').remove();
// 	}
// }

//移除成员方法
// function channelremoveman(obj) {
// 	$(obj).parent().remove();
// }
//取消

function video_manmay() {
	treeAddUsers.clear();
	var veiframe = $(window.parent.document.getElementById("veiframe"));
	veiframe.hide();
	$('.veTouserCannel').parent().parent().hide();
	$('.veTouserCannel').parent().parent().prev().hide();
	$('.media_channelmain').show().siblings().hide();
	$('.media_memberselect').hide('slow');
	$('.media_transmitselect1').children().eq(0).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
}

function Video_cancel(that) {
	//	var el = $('#main_watch');
	//	var obj = el.children('object');
	//	obj.width(el.width());
	var veiframe = $(window.parent.document.getElementById("veiframe"));
	veiframe.hide();
	$(that).parent().parent().parent().parent().hide();
}

function Video_Tellchannel(that) {
	$(that).parent().parent().hide();
	$('.Video_tellchannel').show();
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
// 				var array=obj.Users;
// 				// HelpManArrays = obj.Users;
// 				var loginid=HelploginId;

// 						 for (var i = 0; i < obj.Users.length; i++) {
// 						 	   if(obj.Users[i].Uid==loginid){
                                   
// 						 	   }else{
// 						 	   	HelpMansArrays.push(array[i]);
// 						 	   }
// 						 }
				 
// 				 // HelpCodesto10115();
// 			} else {

// 			}
// 		})
// }


function HelpCodesto10115(){
	     var html = '';
	     var loginid=HelploginId;
            // console.log(loginid);
	    for (var i = 0; i < HelpMansArrays.length; i++) {

	    	   if(HelpMansArrays[i].Uid==loginid){

	    	   }else{
	    		html += '<li name="' + HelpMansArrays[i].Name + '" user="' + HelpMansArrays[i].Uid + '"><input type="checkbox" onclick="user_Alls(this)" /><i>' + HelpMansArrays[i].Name + '</i></li>'
	    	  }
		  }
				$('.User_Alls').empty();
				$('.User_Alls').append(html);
} 

////////////////以上是亮亮转发页面的js//////////////////////


function vechatIconsShow(self) {
	//	var that = $(self);
	//	that.find('.vechatIcons').show();
}

function vechatIconsHide(self) {
	//	var that = $(self);
	//	that.find('.vechatIcons').hide();	
}

//频道会话页面小btn功能
function vech_btnmove() {

	var veiframe = $(window.parent.document.getElementById("veiframe"));
	veiframe.hide();
	//	var that = $('.Video_channel');
	//	if(that.css('left') == '0px'){
	//		that.animate({
	//			'left': '-260px'
	//		});
	//		veiframe.animate({'width':'27px'})
	//		that.children('.left_icon').css("background","#bca48a url(./img/right_icon.png) no-repeat center center");
	//	}else{
	//		that.animate({
	//			'left': '0px'
	//		});
	//		veiframe.width('287');
	//		that.children('.left_icon').css("background","#bca48a url(./img/left_icon.png) no-repeat center center");
	//	}
}

//实时视频频道转发
function ve_transmitsure(id, name) {
	var doc = $(window.parent.document);
	var el = doc.find('#main_watch');
    console.log(videoSessionList.getWatching())
	var url = videoSessionList.getWatching().getInf().url_fwd;
	var arr = [];
	$('#' + id).find(".userall_selected").each(function() {
		arr.push($(this).attr('cid'));
	})
	
	if (arr.length === 0) {
		showAlert('请选择转发对象！');
		return;
	}
	arr = JSON.stringify(arr);

	var body = '{"Code":11500,"Body":{"SessionId":"' + sessionId + '","Url":"' + url + '","Uids":[],"SesIds":' + arr + '}}';
	// console.log(body)
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		// console.log(JSON.stringify(ret));
		if (ret.Result == 200) {
			video_manmay();
			$('#' + id).find("input:checkbox[name='" + name + "']:checked").each(function() {
				$(this).prop('checked', false);
				showAlert('转发成功！');
			})
		} else {
			showAlert('转发失败！');
			video_manmay();
		}
	});
}

//转发用户
function videoTousers() {
	var doc = $(window.parent.document);
	var el = doc.find('#main_watch');
	var url = videoSessionList.getWatching().getInf().url_fwd;
	var arr = [];
	$('#media_memberselect2').find('li').each(function() {
		arr.push($(this).attr('name'))
	});
	if (arr.length === 0) {
		showAlert('请选择转发对象！');
		return;
	}
	arr = JSON.stringify(arr);
	var body = '{"Code":11500,"Body":{"SessionId":"' + sessionId + '","Url":"' + url + '","Uids":' + arr + ',"SesIds":[]}}';
	// console.log(body)
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		// console.log(JSON.stringify(ret));
		if (ret.Result == 200) {
			showAlert('转发成功！');
			video_manmay();
		} else {
			showAlert('转发失败！');
			video_manmay();
		}
	});
}

function videokeyse(data,val2){
	var val = '';
	var Channle = $('#videochannel');
	var Tell = $('#videotellchannel');
	var Memmber = $('#videotreec');
	if (val2 != undefined) {
		val = '';
	} else {
		val = $(data).val();
	}
	if (!(Channle.is(':hidden'))) {
		var len = $('#veZhuanpin').children().length;
		 if($('#veZhuanpin').children('h3').hasClass('help_wu')){

		 }else{
		 	for (var i = 0; i < len; i++) {
			 if ($('#veZhuanpin').children('li').eq(i).attr('name').indexOf(val) > -1) {

                    var Help_transmitName=$('#veZhuanpin').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     Help_transmitName=Help_transmitName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#veZhuanpin').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }else {

                      $('#veZhuanpin').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }
				 $('#veZhuanpin').children('li').eq(i).show();
			 } else {
				$('#veZhuanpin').children('li').eq(i).hide();
			}
		   }
		 }
	} else if (!(Tell.is(':hidden'))) {
		var len = $('#veZhuanlin').children().length;
		if($('#veZhuanlin').children('h3').hasClass('help_wu')){

		}else{
			for (var i = 0; i < len; i++) {
				if ($('#veZhuanlin').children('li').eq(i).attr('name').indexOf(val) > -1) {

                        var Help_transmitName=$('#veZhuanlin').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     Help_transmitName=Help_transmitName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#veZhuanlin').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }else {

                      $('#veZhuanlin').children('li').eq(i).find('.media_channelmainul1name').empty().html(Help_transmitName);

                    }
                    
					$('#veZhuanlin').children('li').eq(i).show();
				} else {
					$('#veZhuanlin').children('li').eq(i).hide();
				}
			}
		}
	} else if (!(Memmber.is(':hidden'))) {
		if (val == '') {
			$('#VideosAllman').hide();
			$('#tramitvideo').show();
		} else {
			// $('#tramitvideo').hide();
			// $('#VideosAllman').show();
			// var len = $('#VideosAllman').children().length;
			// for (var i = 0; i < len; i++) {
			// 	if ($('#VideosAllman').children('li').eq(i).attr('name').indexOf(val) > -1||$('#VideosAllman').children('li').eq(i).attr('user').indexOf(val) > -1) {
			// 		$('#VideosAllman').children('li').eq(i).show();
			// 	} else {
			// 		$('#VideosAllman').children('li').eq(i).hide();
			// 	}
			// }
	      OnVideoKeySearch(data);
	  }
	}
}
  function OnVideoKeySearch(e){
       var data=$(e).attr('name');
        if(MediaOnkeytime==0)
          OnVideoKeySearchNext(data);
        else
          MediaOnkeytime=1;
  }
  function OnVideoKeySearchNext(data){
       MediaOnkeytime=MediaOnkeytime+1;
        if(MediaOnkeytime>2)
        {
          MediaOnkeytime=0;
          OnVideoKeySearchOpen(data);
          return;
        }
        MediaOnkeytimeRepeat=setTimeout(function(){OnVideoKeySearchNext(data)},900);
  }
  function OnVideoKeySearchOpen(inputBox){
       var data=$("input[name='"+inputBox+"']").val();
        if(data==''){
            $('.User_Alls').hide();      
            $('.ul_ztree').show();
              return;
        } 
        var list=[];
       for(var i=0;i<HelpMansArrays.length;i++){
            var name=HelpMansArrays[i].Name;
            var ID=HelpMansArrays[i].Uid;
            if((name.indexOf(data) >-1)||(ID.indexOf(data) >-1)){
               list.push(HelpMansArrays[i]);
            }
       }
      OnKeySearchShowfram(list, data);
  }

   function OnKeySearchShowfram(data, key){
        var html = '';
      for (var i = 0; i < data.length; i++) {
            var  strVal=data[i].Name;
            var getIndexOf=strVal.indexOf(key);
         if(getIndexOf>-1){
            var strVals=strVal.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
            	if (treeAddUsers.containsKey(data[i].Uid)) {
            html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select userall_selected" onclick="userfram_Alls(this)"></div><i>' + strVals + '</i></li>';
	    	}else {
	    		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select" onclick="userfram_Alls(this)"></div><i>' + strVals + '</i></li>';
	    	}
         }else{
           	if (treeAddUsers.containsKey(data[i].Uid)) {
            html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select userall_selected" onclick="userfram_Alls(this)"></div><i>' + data[i].Name + '</i></li>';
	    	}else {
	    		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select" onclick="userfram_Alls(this)"></div><i>' + data[i].Name + '</i></li>';
	    	}
        }   
    }
    if(data.length==0){
        html='<h3 class="meida_mannone">无相关成员</h3>';
    }
        $(".User_Alls").empty(); 
        $('.User_Alls').append(html);
        $('.ul_ztree').hide();
        $('.User_Alls').show();
  }

function doZtreeChecked(treeId, uid, isChecked) {
	var	ztreeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = ztreeObj.getCheckedNodes(!isChecked);

	for (var i = 0; i < nodes.length; i++) {
		if (uid == nodes[i].id) {
			ztreeObj.checkNode(nodes[i], isChecked, true);
    		break;
		}
	}
}

function userfram_Alls(data){
 	var name=$(data).parent().attr('name');
 	var user_id=$(data).parent().attr('user');
 	var list = $('#media_memberselect2');
 	var html = '';

    if (!($(data).hasClass('userall_selected'))) { 
    	$(data).addClass('userall_selected'); 
		treeAddUsers.put(user_id, {id: user_id, name: name});
	    doZtreeChecked('tramitvideo', user_id, true);     
        html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremovemanfram(this)"></span></li>';
        list.append(html); 
 	} else { 
 	    $(data).removeClass('userall_selected');
 	    treeAddUsers.remove(user_id);
 	    doZtreeChecked('tramitvideo', user_id, false);
	    list.children('li[name="'+user_id+'"]').remove();
 	}
} 			

// 	 var type=$(data).parent().parent().attr('id');
// 	 if(type=='VideosAllman'){
//           var name=$(data).parent().attr('name');
 // 	  var user_id=$(data).parent().attr('user');
 // 	  var ChannelSelect=[];
 // 	$('#media_memberselect2').children().each(function(i){
//            ChannelSelect.push($('#media_memberselect2').children('li').eq(i).attr('name'));

	// })
	//  if(!($(data).hasClass('userall_selected'))){
	//  $(data).addClass('userall_selected'); 
	//      var arraynum= $.inArray(user_id,ChannelSelect);
	//        if(arraynum>-1){
	//        	return
	//        }
	//        var  html = '<li name="' + user_id + '" class="channeladdmanlist" name="channelman"><i>' + name + '</i><span class="channel_removelist" onclick="channelremovemanfram(this)"></span></li>'
	//            $('#media_memberselect2').append(html); 
	//  }else{  
	//  	$(data).removeClass('userall_selected');
	//    $('#media_memberselect2').children('li[name="'+user_id+'"]').remove(); 
	//  }
// 	 }

 function channelremovemanfram(obj){
     var id = $(obj).parent().attr('name');
     treeAddUsers.remove(id);
     doZtreeChecked('tramitvideo', id, false);
     $('#VideosAllman').children('li[user='+id+']').children('div').removeClass('userall_selected');
     $(obj).parent().remove();
 }  

