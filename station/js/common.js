var sideObj = {};
var titleArr = [];
var p_popup = 0;
 
var common = {
	_select: function() {
		var navLi = $('.leftNav').find('li');
		var navA = $('.radio_footer_set b');
		var sideBar = $('#sideBar');

		navLi.click(function() { //左侧导航栏
			var forTo = $(this).find("b").attr('href');
			navLi.removeClass();
			navA.parent().removeClass('more_active');
			//$('.radio_footer_set').hide();
			$(this).addClass('active');
			$(this).siblings().children('b').css('color','#9c9993');
			$(this).children('b').css('color','#fff');
			var ind=$(this).index();
			NavLeftindex(ind); 
			var str = forTo.slice(8, forTo.length - 5);
			var id = forTo.slice(0, forTo.length - 5);
			navModuleShow(id);
			videoNoticeBarApear(str);
			$('#saveicon').show();
			$('.mian_downuserbook').show();
			if (str == 'video') {
				$('#saveicon').hide();
				$('.mian_downuserbook').hide();
			}
			if (str == 'helper') {
                   if($('#station_helper').css('display') === 'block'){
                   		if ($('.help_user').css('margin-left') == '-160px') {
                   			$('.help_btn').trigger('click');
                   		}
                        return false;
                   }else if(Helpfirstdata==undefined){
                   	   	 $('#station_helper').remove();
					     $('#spthelp').remove();
						if (!sideObj[str]) {
							sideObj[str] = str;
							$('#specialCover').show();
							$.ajax({
								type: "GET",
								url: forTo,
								success: function(data) {
									sideBar.append(data);
									$('#specialCover').hide();
								},
								error: function () {
									sideObj[str] = '';
									$('#specialCover').hide();
								}
							});
						}
                   }
			}
			if (str === 'user') {
				if ($('#id-userMoving').css('display') === 'block' || $('#id-groupAddUsers').css('display') === 'block') {
					$('#bg-color').show();
				}
				if($('.user').css('margin-left') == '-160px') {
					small_btn('user');
				}
			}
			if ( str =='channel' ) {
               if($('.channel_left1').css('margin-left') == '-180px') {
                    $('.channel_right1 ').trigger('click');
               }
			}
			if (str === 'task' ) {
                if($('.task_first ').css('margin-left') == '-180px') {
                  
                    $('.task_leftbtn ').trigger('click');
               }

			}

			if (str == 'media') {
				    if($('#station_media').css('display') === 'block')
				    {
				    	if ($('.meida_lefts').css('margin-left') == '-160px') {
                   			$('.mediarights').trigger('click');
                   		}
				    	return false;
				    }else if(Meidafirstdata==undefined){
				    	$('#station_media').remove();
						  $('#sptmedia').remove();
						  	if (!sideObj[str]) {
						  		sideObj[str] = str;
						  		$('#specialCover').show();
								$.ajax({
									type: "GET",
									url: forTo,
									success: function(data) {
										sideBar.append(data);
										$('#specialCover').hide();
									},
									error: function () {
										sideObj[str] = '';
										$('#specialCover').hide();
									}
								});
							}
				    }
			}
		 
			if (!sideObj[str] && str !== 'helper' && str !== 'media') {
				sideObj[str] = str;
				$('#specialCover').show();
				$.ajax({
					type: "GET",
					url: forTo,
					success: function(data) {
						sideBar.append(data);
						$('#specialCover').hide();

					},
					error: function () {
						sideObj[str] = '';
						$('#specialCover').hide();
					}
				});
			}
			nav_module_show(str);
			Push_Ullist(str);
			Map_Lineclear();
			return false;
		});

		navA.click(function() { //更多导航栏
			var theA = $(this);
			var href = theA.attr('href');  
			navLi.removeClass('active');
			navLi.children('b').css('color','#9c9993');
			$(this).parent().addClass('more_active');
			$(this).parent().siblings().removeClass('more_active');
			Nav_leftImg();
			var str = href.slice(8, href.length - 5); //radio
			var id = href.slice(0, href.length - 5); //station_radio
			navModuleShow(id);
			// navA.removeClass('fontColor');
			// theA.addClass('fontColor');
			// navModuleShow(id);
			videoNoticeBarApear(str);
			if(Line!=null){
				map.removeOverlay(Line);
			}
			if (!sideObj['warn'] && str === 'warn') {
				updateModule('warn', href, str);
			}
			
			if (!sideObj['task'] && str === 'task') {
				updateModule('task', href, str);
			}

			if (str === 'line' ) {
                if($('.fence').css('margin-left') == '-180px') {
                    Radio_BtnLeft('fence');
               }
			}
			if (str === 'radio' ) {
                if($('.radio_border_r').css('margin-left') == '-180px') {
                    Radio_BtnLeft('radio_border_r');
               }
			}
			

			$('#saveicon').show();
			$('.mian_downuserbook').show();

			if (!sideObj[str] && str !== 'warn') {
				sideObj[str] = str;
				$('#specialCover').show();
				$.ajax({
					async: true,
					type: "GET",
					url: href,
					success: function(data) {
						sideBar.append(data);
						$('#specialCover').hide();
						sideObj[str] = str;
						navModuleShow(id);
					},
					error: function () {
						sideObj[str] = '';
						$('#specialCover').hide();
					}
				});
			}
			
			
			nav_module_show(str);
			Push_Ullist(str);
			//$('.radio_footer_set').hide();
			return false;
		});

		var wh = $(window).height();
		$('.content').height(wh - 80);

	},
	_Box_on_or_off: function(arr,fun,cs){
		$('#Box_c').show();
		$('#bg-color').show();
		$('.button_sapn').text(arr);
        $('.button_on').on("click",function(){
        	if(fun==1){
        	  
        	}else if(fun==2){
        		fenceUserDel(cs[0],cs[1],cs[2]);
        	}else if(fun==3){
        	  treeAddUsers.clear();
	          $(cs).parent().parent().parent().hide();
	          $(cs).parent().parent().parent().prev().hide();
	          $(cs).parent().parent().parent().prev().prev().hide();
	          $('.channel_coverleft').hide();
	          $('#bg-color').hide();
        	}
        	$('.button_on').off("click");
        	$('#Box_c').hide();
        	$('#bg-color').hide();
        })
        $('.button_off').on("click",function(){
        	$('.button_on').off("click");
        	$('#Box_c').hide();
        	$('#bg-color').hide();
        })
        
	},
   	_coverShow: function(msg, pos) {
   		var coverBox = $("#coverBox");
   		$(".cover-text").html(msg);
   		
   		var height = coverBox.outerHeight();
   		var wid = coverBox.outerWidth();
   		
   		if (pos) {
   			var watching = videoSessionList.getWatching();
   			if (watching) {
   				var id = watching.getInf().ssid;
   				var videoWidth = $('#uiVideo_' + id).width() / 2;
   				var videoHeight = $('#uiVideo_' + id).height() / 2;
   			}
   			videoWidth ? videoWidth : 0;
   			coverBox.css("top", 70 + videoHeight - height / 2);
			coverBox.css("left", videoWidth + 70 - wid/2);
   		} else {
			coverBox.css("bottom", document.documentElement.clientHeight / 2);
			coverBox.css("left", document.documentElement.clientWidth / 2 - 100);
		}
		
		$("#coverBox").show();
	},
	_coverHide: function() {
		$('#coverBox').hide();
	},
	
	/***********左侧更多点击事件*************/
	_leftmore: function() {
		var win_width = $(window).width();
		var win_height = $(window).height();
		var left1 = 100 * (win_width - 250) / (2 * win_width) + '%';
		var top = 100 * (win_height - 150) / (2 * win_height) + '%';
		var video = $('.video_applying');
		var call = $('.call_coming');
		video.css('left', left1);
		video.css('top', top);
		call.css('left', left1);
		call.css('top', top);
		
		$('.radio_footer_more').on('click', function(e) {
			if ($('.radio_footer_set').is(':hidden')) {
                Radio_MoreDiv=1;
				$('.radio_footer_set').filter(':not(:animated)').slideDown('slow');
			} else {
                
                if(Radio_MoreDiv==undefined){
                	 Radio_MoreDiv=1
                	  
                }else{
                  	//$('.radio_footer_set').slideUp('slow');
                	 Radio_MoreDiv=undefined
                	  
                }
				
			}
			e.stopPropagation();
		})

	   $('.radio_footer').hover(function () { 
           //$('.radio_footer_set').slideDown('slow');
          $('.radio_footer_set').filter(':not(:animated)').slideDown('slow');

	   },
	   function () {

	   	     if(Radio_MoreDiv==1){
                	 return;
                }else{

                  $('.radio_footer_set').slideUp('slow');

                }


	   })
		
	}

};


function nav_module_show(str) {
	
	switch (str) {
		case 'line':
			if ($('.fence').css('margin-left') == '-190px') {
				$('.fence_btn').trigger('click')
			}
			break;
		case 'set':
			if ($('.moreset_border_r').css('margin-left') == '-190px') {
				$('.more_btn').trigger('click')
			}
			break;
		case 'user':
			if ($('.user').css('margin-left') == '-190px') {
				$('.user_btn').trigger('click')
			}
			break;
		case 'channel':
			if ($('.channel_left1').css('margin-left') == '-190px') {
				$('.channel_right1').trigger('click')
			}
			break;
		case 'radio':
			if ($('.radio_border_r').css('margin-left') == '-190px') {
				$('.radio_btn').trigger('click')
			}
			break;
		case 'radio':
			if ($('.radio_border_r').css('margin-left') == '-190px') {
				$('.radio_btn').trigger('click')
			}
			break;
		case 'task':
			if ($('.task_first').css('margin-left') == '-190px') {
				$('.task_leftbtn').trigger('click')
			}
			break;
		default:
			// statements_def 
			break;
	}
}


$(document).on('click', function() {
	//$('.radio_footer_set').hide();
})


var MENU_COUNT = 5;
var mMenuMapSelected = ['img/icon/helper.png', 'img/icon/member.png', 'img/icon/chat.png', 'img/icon/vedio.png', 'img/icon/media.png'];
var mMenuMapUnselected = ['img/icon/helpers.png', 'img/icon/members.png', 'img/icon/chats.png', 'img/icon/vedios.png', 'img/icon/medias.png'];


function Nav_leftImg(){
	for (var i = 0; i < MENU_COUNT; i ++)
	{
		$('.leftNav').children('li').eq(i).find('img').attr('src',mMenuMapUnselected[i]);
    }
}

function NavLeftindex(ind){
	for (var i = 0; i < MENU_COUNT; i ++)
	{

		if (i == ind){
			$('.leftNav').children('li').eq(i).find('img').attr('src',mMenuMapSelected[i]);
		    $('.leftNav').children('li').eq(i).children('b').css('color',"#fff");
		}
			
		else{
            $('.leftNav').children('li').eq(i).find('img').attr('src',mMenuMapUnselected[i]);
		    $('.leftNav').children('li').eq(i).children('b').css('color'," #9c9993");
		}	
    }
    $('.radio_footer_set ul li').removeClass('more_active');
}

function videoNoticeBarApear(str) {
	var length = videoSessionList.size();
	if (length > 0) {
		$('#video_notice').show();
	}
}

function updateModule(name, target, tarName) {
	sideObj[name] = name;
	var sideBar = $('#sideBar');
	if (tarName === name) {
		$('#station_' + name).remove();
		$('#spt' + name).remove();
		$('#specialCover').show();
		$.ajax({
			type: "GET",
			url: target,
			success: function(data) {
				sideBar.append(data);
				$('#specialCover').hide();
				sideObj['warn'] = '';
				sideObj['task'] = '';
			},
			error: function () {
				$('#specialCover').hide();
				sideObj['warn'] = '';
				sideObj['task'] = '';
			}
		});
	}
}

function navModuleShow(id) {
	$('#station_radio').hide();
	$('#station_channel').hide();
	$('#station_helper').hide();
	$('#station_line').hide();
	$('#station_media').hide();
	$('#station_set').hide();
	$('#station_system').hide();
	$('#station_user').hide();
	$('#station_video').hide();
	$('#station_warn').hide();
	$('#station_task').hide();
	$('#' + id).show();
	HelpCrearicon();
}

//checkbox选择
//checkBox('list-1', 'listAll', 'total', num);
var userCheckNumber = 0;
function checkBox(name, toName, contClass, num) {
	var numChoose = 0;
	var numNull = userCheckNumber;

	var checkall = function(event) {
		var input = $("input[name='" + name + "']");
		
		var target = event.target || event.srcElement;
		target = $(target);
		if (target.is(':checked')) {

			input.prop("checked", true);
			numChoose = userCheckNumber;
			numNull = 0;
			input.attr('choose', 'yes');
			input.next('label').addClass('label-bg');
			target.next('label').addClass('label-bg');
		} else {
			input.prop("checked", false);
			numChoose = 0;
			numNull = userCheckNumber;
			input.attr('choose', 'no');
			input.next('label').removeClass('label-bg');
			target.next('label').removeClass('label-bg');
		}

		$('.' + contClass).text(numChoose);

		if (name == 'list-1' || name == 'list-3') {
			btnStyle(numChoose);
		}		
	};

	var checkone = function(event) {
		var that = event.target ||  event.srcElement;
		that = $(that);
		if (that.attr('choose') === 'no') {
			numChoose += 1;
			numNull -= 1;
			that.attr('choose', 'yes');
			that.prop('checked', true);
			that.next('label').addClass('label-bg');
		} else {
			numChoose -= 1;
			numNull += 1;
			that.attr('choose', 'no');
			that.prop('checked', false);
			that.next('label').removeClass('label-bg');
		}
		
		$('.' + contClass).text(numChoose);

		if (numNull == 0) {
			$("input[name='" + toName + "']").prop("checked", true);
			$("input[name='" + toName + "']").next('label').addClass('label-bg');
		} 
		
		else {
			$("input[name='" + toName + "']").prop("checked", false);
			$("input[name='" + toName + "']").next('label').removeClass('label-bg');
		}

		if (name == 'list-1' || name == 'list-3') {
			btnStyle(numChoose);
		}		
	};

	$('input[name="' + toName + '"]').off('click', checkall);
	$('input[name="' + toName + '"]').on('click', checkall);
	
	$('input[name="' + name + '"]').attr('choose', 'no');
	
	$('input[name="' + name + '"]').off('click', checkone);
	$('input[name="' + name + '"]').on('click', checkone);
}

function btnStyle(n) {
	var btn = $('.org-btm-con2').find('button');
	if (n == 0) {
		btn.attr("disabled", true);
		btn.removeClass('btn-active');
	} else {
		btn.removeAttr("disabled");
		btn.addClass('btn-active');
		if (n > 30) {
			btn.eq(2).attr("disabled", true);
			btn.eq(2).removeClass('btn-active');
		}
		if (n > 500) {
			btn.eq(1).attr("disabled", true);
			btn.eq(1).removeClass('btn-active');
		}
	}
}

//获取当前日期
function getTodayDate(num) {
	var date = new Date();
	if (num > 0) {
		date = new Date(Date.parse(date) - 3600000 * num * 24)
	}
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	m = two(m);
	d = two(d);
	var now = y + '-' + m + '-' + d;
	return now;
}

//获取当前时间,几天前的此刻时间
function getNowTiming(num) {
	var date = new Date();
	if (num > 0) {
		date = new Date(Date.parse(date) - 3600000 * num * 24)
	}
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	h = two(h);
	m = two(m);
	s = two(s);
	var time = h + ':' + m + ':' + s;
	return time;
}
function Close_window(){
	$('.radio_footer_set_bak').slideUp('slow');
	$('#show_p').attr('class','radio_footer_set');
	p_popup = 0;

	showVideoStoreFlag = false;
    // if(videoSessionList.list.length > 0){
       var watching = videoSessionList.getWatching();
       if(watching !== null && !watching.isPaused()){
       	watching.pause(); 
       	console.log("Close_window: 大屏暂停...");
       }
        var showlist = videoSessionList.showList();
        if(showlist!==null){
        showlist.forEach(
	  	function(videoSession) {
			if(!videoSession.isPaused()){
              	videoSession.pause();
		        console.log("Close_window暂停");
		    }   	
		});
      }
	// }

	if($('.position_return_div').show()){
		$('.position_return_div').hide();
		$('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
	}
}
function l_lose(){
	$('.radio_footer_set').filter(':not(:animated)').slideDown('slow');
	$('#show_p').attr('class','radio_footer_set_bak');
	p_popup = 1;
	
	showVideoStoreFlag = false;
    // if(videoSessionList.list.length > 0){
    var watching = videoSessionList.getWatching();
        if(watching !== null && !watching.isPaused()){
       	watching.pause(); 
       	console.log("l_lose: 大屏暂停...");
       }
        
     var showlist = videoSessionList.showList();
         if(showlist !== null){
         showlist.forEach(
	  	 function(videoSession) {
			if(!videoSession.isPaused()){
              	videoSession.pause();
		        console.log("l_lose: 暂停");
		    }   	
		});
     } 
	// }
}
//第一侧边栏按钮
var small_btn = function(n) {
	if ($('.' + n).css("margin-left") == '80px') {
		$('.' + n).animate({
			'margin-left': '-160px'
		});
		$('.' + n).find('.left_icon').css("background", "#bca48a url(./img/right_icon.png) no-repeat center center");
		$('.' + n).find('.helpleft_icon ').css("background", "#bca48a url(./img/right_icon.png) no-repeat center center");
		Close_window();
	} else {
		$('.' + n).animate({
			'margin-left': '80px'
		});
		$('.' + n).find('.left_icon').css("background", "#bca48a url(./img/left_icon.png) no-repeat center center");
		$('.' + n).find('.helpleft_icon ').css("background", "#bca48a url(./img/left_icon.png) no-repeat center center");
		if(p_popup==1){
			l_lose();
		}
		
	}
};

//Base64转码
function Base64() {
	// private property  
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding  
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding  
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding  
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

	// private method for UTF-8 decoding  
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

function toBaseText(base_k) {
	var Base64_name = new Base64();
	var base_str = Base64_name.decode(base_k);

	return base_str;
}

function toBase64(base_k) {
	var Base64_name = new Base64();
	var base_str = Base64_name.encode(base_k);

	return base_str;
}

function toFileSizeText(size)		// size: KB
{
	var txt = "";
	if (size == 0)
		txt = "0 KB";
	else
	{
		var sizeM = parseInt(size / 1024);
		var sizeY = parseInt(size % 1024 / 10);
		if (sizeM > 0)
		{
			txt = sizeM + ".";
			if (sizeY < 10)
				txt += "0" + sizeY + " MB";
			else if (sizeY < 100)
				txt += sizeY + " MB";
			else if (sizeY >= 100)
				txt += "99 MB";
		}
		else
			txt = size + " KB";
	}
	return txt;
}

//退出登录
function logoutHerf() {
	window.location = 'index.html';
}

//登陆成功
function cbLoginSuccessed() {
	Dispatcher_UserStateOline();
	console.log("登录成功");
	$('.welcome').css('color', '#e8b609');
	var groupid = $.cookie('GroupId');
	session_channel_enter('G' + groupid);
	$('.main_linkstate').children('i').html('在线');
	$('.main_linkstate').children('i').css('color', '#e8b609');
	$('.main_linkstate').children('img').attr('src', 'img/icon/online.png');
}

function cbLoginErrorState () {
 
	$('.welcome').css('color', '#dadfda');
	var groupid = $.cookie('GroupId');
	session_channel_enter('G' + groupid);
	$('.main_linkstate').children('i').html('离线');
	$('.main_linkstate').children('i').css('color', '#dadfda');
	$('.main_linkstate').children('img').attr('src', 'img/icon/onlineerror.png');
}

function onRpcEvent0(evt, param) {
	if (evt == EVT_NO_SVC) {
		alert('请启动对讲服务。');
		history.go(0);
	} else if (evt == EVT_SVC_DOWN) {
		alert('对讲服务已停止。请重新启动服务。');
		history.go(0);
	} else if (evt == EVT_FORCE_OFFLINE) {
		// alert('调度台在另一个窗口被打开');
		window.location = 'index.html';
	} else {
		alert('服务异常');
		window.location = 'index.html';
	}
}

var retryConn = 0; // 这是一个全局变量，不应该在onRpcEvent里面声明

function onRpcEvent(evt, param) {
	switch (evt) {
		case (EVT_WS_EXCEPTION):
			// 浏览器设置问题导致Websocket连接异常，返回登录界面
			history.go(-1);
			break;
		case (EVT_SVC_UP):
			//if (retryConn > 0 && retryConn < 10) {
				// Pocsvc 重启了，刷新页面
				//history.reload();
				//account_login($.cookie('username'),$.cookie('userpassword'));
			//}
			retryConn = 10;
			break;
		case (EVT_SVC_DOWN):
			// Pocsvc 退出（崩溃）了
			alert('对讲服务已停止。请重新启动服务。');
			--self.retryConn;
			break;
		case (EVT_NO_SVC):
			// rpccli会每秒尝试一次连接，每次连接失败都会触发该事件
			//if (--self.retryConn <= 0) {
				// 说明在该页面加载的时候，Pocsvc还没有启动或者Pocsvc退出之后10秒之内未能正常启动
				// 此时返回登录界面
				history.go(-1);
			//}
			break;
		case EVT_FORCE_OFFLINE:
			// 强制退出（用户已在别处登录），返回登录界面
			history.go(-1);
			break;
	}
}

function onlineIconStatus(userid) {
	var icon = $('.onlineIcon');
	if (onlineInfo.containsKey(userid)) {
		var state = onlineInfo.get(userid);
		if (state === USER_STATE_ON_LINE) {
			icon.attr('src', 'img/chat/online.png')
		} else {
			icon.attr('src', 'img/chat/outline.png')
		}
	} else {
		icon.attr('src', 'img/chat/outline.png')
	}

	if (userid === loginId) {
		icon.attr('src', 'img/chat/online.png')
	}
}

function station_loginout() {
	// sessionStorage.removeItem('SessionId');
	// account_loginOut();

	 var body = '{"Code":11507,"Body":{"SessionId":\"' + sessionId + '\"}}';
	 console.log(body);
	 var arrmsg=[];
     var conword='退出失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Main_GetOutTo, MediaErrorDown, MediaAjaxovertime, true, arrmsg,conword);
}



/*
function testAjax() {
    var params = "test=123";
    var isneedtoKillAjax = true; // set this true

    // Fire the checkajaxkill method after 10 seonds
    setTimeout(function() {
        checkajaxkill();
    }, 10000); // 10 seconds                

    // For testing purpose set the sleep for 12 seconds in php page 

    var myAjaxCall = jQuery.getJSON('index2.php', params, function(data, textStatus) {
        isneedtoKillAjax = false; // set to false
        // Do your actions based on result (data OR textStatus)
    });

    function checkajaxkill() {

        // Check isneedtoKillAjax is true or false, 
        // if true abort the getJsonRequest

        if (isneedtoKillAjax) {
            myAjaxCall.abort();
            alert('killing the ajax call');
        } else {
            alert('no need to kill ajax');
        }
    }
}
*/

//===================================================================================================
//util
//===================================================================================================
function coverShow() {
	$('.cover_loading').show();
}

function coverHide() {
	$('.cover_loading').hide();	
}