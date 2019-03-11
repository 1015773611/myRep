var pointxy = [];
//var fenceMember = [];
var fencesId = [];
var mapType = 1;
var fenceLine = [];
var Line = null;
var warns = [];
var fIndex;
var timeStr = "";
var timeView = 0;
var pagesize = 30;
var pageindex = 0;
var pageTotal = 0;
var timefrom;
var timeto;
var line_index;
var Pulley_jilu_line = 1;
var Line_searchIconcolor = true;
var Line_KeepIconcolor = true;

//var line_s;
//var line_e;

var fence = {
	init: function() {
		var wh = $(window).height() - 80;

		$('.sec').css('margin-left', '80px');
		$('.fence').show('slow');
		$('.fence').show('slow')
		$('.Height').height(wh);
		$('.fence-list').height(wh - $('.create-fence').outerHeight());
		$('.fence-add-content').height(wh - $('.fence_top').outerHeight());
		$('.ht').height(wh - $('.user-fenceSelect-footer').outerHeight() - $('.fence_top').outerHeight());
		$('.ht1').height(wh - $('.fence_name_footer').outerHeight() - $('.fence_top').outerHeight());
		$('.ht2').height(wh - $('.content_top').outerHeight());
		$('.left_icon').css("top", (wh - 50) / 2);

		//删除图标的显示功能
		$('.fence-list-li').hover(function() {
			$(this).find(".delete-member").show();
		}, function() {
			$(this).find(".delete-member").hide();
		});

		//围栏点击事件
		$('.fence-list-name').on("click", function() {
			var obj = $(this).siblings('.fence-list-ul');
			//var that = $(this);
			if(obj.is(":hidden")) {
				$('.fence_content').show('slow');
				$(this).css("background", "#F1F0EE");
				$(this).find("img").attr("src", "img/icon/fence/fence_bg_up.png");
				obj.slideDown("slow");
			} else {
				$('.fence_content').hide('slow');
				$(this).css("background", "#fff");
				$(this).find("img").attr("src", "img/icon/fence/fence_bg_down.png");
				obj.slideUp("slow");
			}
		});

		//移除成员图片点击事件
		$('.delete-member').on("click", function() {
			var obj = $(this).siblings('.del-box');
			if(obj.is(":hidden")) {
				obj.show();
				$(this).attr("src", "img/icon/fence/fence_bg_del2.png");
			 } else {
				obj.hide();
				$(this).attr("src", "img/icon/fence/fence_bg_del1.png")
			}

		});

		//禁入下拉框
		$('.fence-list').on("click", '.fence-list-right', function() {
			if($(this).children("ul").is(":hidden")) {
				$('.fence-list-right').children('ul').hide();
				$(this).children("ul").show();
				$(this).children('ul').addClass('more_setborder');
				$(this).addClass('more_setborder');
			} else {
				$(this).children("ul").hide();
				$(this).children('ul').removeClass('more_setborder');
				$(this).removeClass('more_setborder');
			}
			return false;
		});

		//禁入，禁出选择
		$('.fence-list').on("click", '.fence-list-right li', function() {
			var reg = /\d+/g;
			var that = $(this);
			var parent = that.parents('li');
			var target = that.parents(".fence-list-right").find("span");
			var uid = parent.children('span').attr('class');
			uid = uid.match(reg);
			var fid = parent.attr('id');
			var n = fid.indexOf('_');
			var type1 = that.text();
			var type = toNumber(type1);
			var theNum = parseInt(fid.slice(n + 1, fid.length), 10);
			fid = fid.slice(0, n);
			var body = '{"Code":10708,"Body":{"SessionId":\"' + sessionId + '\","FenceId":\"' + fid + '\","Uid":\"' + uid + '\","Type":' + type + '}}';
			console.log(body);
			$('.cover_loading').show();
			$.getJSON(STATION_URL + '?Body=' + body,
				function(ret) {
					$('.cover_loading').hide();
					console.log(JSON.stringify(ret))
					if(ret.Result == 200) {
						target.text(type1);
						showAlert('保存成功');
						fenceLine[fIndex].Members[theNum].Type = type;
					} else {
						showAlert('保存失败');
						console.log(ret.Result);
					}
				}
			)
		});

		//
		$('.noDel').on("click", function() {
			var box = $(this).parents(".del-box");
			box.hide();
			box.siblings(".delete-member").attr("src", "img/icon/fence/fence_bg_del1.png")
		})

		//
		$('.yesDel').bind("click", function() {
			$(this).parents(".fence-list-li").remove();
			showAlert('已移除');
		});

		//下一步
		$('.num2-yes').bind("click", function() {
			//$('.haveSec').hide();
			$('#bg-color').show();
			$('.nameCreate').show();
			$('.hmTime1').hide();
			$('.fence-time li').on("click", function() {
				$(this).parent().siblings("span").html($(this).text());
				$(this).parent().hide();

			});
			$('.button_cs_a').hide();
			$('.button_cs_s').show();
			//$(".footer-span3").addClass("button_cs_s");
			$(".footer-span3").attr('disabled',true);
				$('.nameInput').on("keyup",function(){
				if($('.nameInput').val()==""){
					console.log("1");
					$(".footer-span3").attr('disabled',true);
					//$('.footer_span3').removeClass("button_cs_a");
					//$('.footer_span3').addClass("button_cs_s");
					$('.button_cs_a').hide();
					$('.button_cs_s').show();
				}else{
					console.log("2");
					$(".footer-span3").attr('disabled',false);
					//$('.footer_span3').removeClass("button_cs_s");
					//$('.footer_span3').addClass("button_cs_a");
					$('.button_cs_s').hide();
					$('.button_cs_a').show();
				}
			})
			
		});

		//上一步
		$('.footer-span1').on('click', function() {
			$('.nameCreate').hide('slow');
			$('#bg-color').hide();
			$('.haveSec').show();
		})

		//围栏时间选择
		$('.fence-time span').bind("click", function() {
			var obj = $(this).siblings("ul");
			$('.hmTime1').hide();
			$('.hmTime1').hide();
			if(obj.is(":hidden")) {
				obj.show();
			} else {
				obj.hide();
			}
		});

		//设置
		$('.conT_set').bind("click", function(event) {
			$('.conT_section2').hide();

			$('.hmTime1').hide();
			$('.fence-timeline li').on("click", function() {
				$(this).parent().siblings("span").html($(this).text());
				$(this).parent().hide();

			});

			//			line_e
			//			$('.fenStime').html(line_s);
			//			$('.fenEtime').html(line_e);

			$('.fenStime_x').html($('.wstart').html());
			$('.fenEtime_x').html($('.wend').html());

			if($('.conT_section').is(":hidden")) {
				Line_KeepIconcolor = false;
				var name = $('.fence-name2').text();
				$('.fen_newName').val(name);
				$('.conT_section').show();
				$('.conT_section1').show();

				$(this).attr("src", "img/icon/newicon/channel_sets.png");
			} else {
				Line_KeepIconcolor = false;
				$('.conT_section').hide();
				$('.conT_section2').hide();
				$(this).attr("src", "img/icon/newicon/channel_set.png");
			}
			lineDelboxEvent();
			lineFilterEvent();
			event.stopPropagation();
		});
		$('.conT_set').hover(function() {

			if(Line_KeepIconcolor) {

				$(this).attr('src', 'img/icon/newicon/channel_sets.png')

			}

		}, function() {

			if(Line_KeepIconcolor) {

				$(this).attr('src', 'img/icon/newicon/channel_set.png')

			}
		});

		$('.fence-timeline span').bind("click", function() {
			var obj = $(this).siblings("ul");
			console.log(obj);
			$('.hmTime1').hide();
			$('.hmTime1').hide();
			if(obj.is(":hidden")) {
				obj.show();
			} else {
				obj.hide();
			}
		});

		//删除围栏
		$('.del_fence').bind("click", function() {
			$('.conT_section1').hide();
			$('.conT_section2').show();
			$('.conT_section').css('height', '100px');
		});

		$('.noDelFence').click(function() {
			$('.conT_section2').hide();
			$('.conT_section1').show();
			$('.conT_section').css('height', '210px');
		});

		//保存编辑后的围栏名称
		$('.sav_fence').bind("click", function() {
			var fenName = $('.fen_newName').val();
			//console.log(fenName);
		});

		//筛选区
		$('.filter_img').on("click", function(event) {
			if($('.filter').is(":hidden")) {
				Line_searchIconcolor = false;
				$('.filter').show();
				$(this).attr("src", "img/icon/select1.png");
				if(!$('.filter a').hasClass('fence_bg')) {
					$('.week-one').addClass('fence_bg');
					//timefrom = getTimefrom(7);
				}
			} else {

				Line_searchIconcolor = false;
				$('.filter').hide();
				if($('.filter a').hasClass("fence_bg")) {
					$(this).attr("src", "img/icon/select1.png");
				} else {
					$(this).attr("src", "img/icon/select.png");
					//timefrom = getTimefrom(0).slice(0,10) + ' 00:00:00';
				}
			}
			lineSetEvent();
			lineDelboxEvent();
			event.stopPropagation();
		});
		$('.filter_img').hover(function() {
			if(Line_searchIconcolor) {

				$(this).attr('src', 'img/icon/select1.png');

			}
		}, function() {
			if(Line_searchIconcolor) {

				$(this).attr('src', 'img/icon/select.png');

			}
		});
		$('.filter a').on("click", function() {
			var that = $(this);
			if(that.hasClass("fence_bg")) {
				that.removeClass("fence_bg");
				if(that.hasClass('fence_date')) {
					$('.fence_date_choose').hide();
				}
			} else {
				$('.filter a').removeClass('fence_bg');
				that.addClass('fence_bg');
				$('.fence_date_choose').hide();
				if(that.hasClass('fence_date')) {
					$('.fence_date_choose').show();
				}
			}
		});

		$('.t_time1').click(function() {
			if($(this).find('.time-ul').is(':hidden')) {
				$('.time-ul').hide();
				$(this).find('.time-ul').show();
			} else {
				$(this).find('.time-ul').hide();
			}
		});

		$('.time-ul').on("click", "li", function() {
			$(this).parent().siblings("span").text($(this).text());
		});

		$('#fenceStartTime').fdatepicker({
			format: 'yyyy-mm-dd'
		});

		$('#fenceEndTime').fdatepicker({
			format: 'yyyy-mm-dd'
		});

		$('#fenceStartTime').val(getTodayDate());
		$('#fenceEndTime').val(getTodayDate());

		//第er层按钮
		$('.fence_content_btn').on('click', function() {
			$('.fence_content').hide('slow', function() {
				$('.fence_btn').show();
			});
		});

		$(document).on('click', function() {
			if($('#station_line').css('display') === 'block') {
				lineBoxHideDispatch();
			}
		})

		$('.warn_selectremove').on('click', '.Line_Btnbr', function() {
			Line.disableEditing();
			$(this).parent().parent().hide();
			$('#bg-color').hide();
		    //Radio_BtnLeft('fence');
		    $('.fence').css('margin-left', '80px').show();
		    $('.fence_content').show();
		    $('.fence_btn').hide();
		    fenceShowPolygon(fIndex);
		})

		$('.conT_section').on('click', function(event) {
			event.stopPropagation();
		})

		$('.filter').on('click', function(event) {
			event.stopPropagation();
		})

		setTimeout(function() {
			fenceDataGet(fenceShow);
		});
		
	}
	
}

function lineBoxHideDispatch() {
	lineSetEvent();
	lineDelboxEvent();
	lineFilterEvent();
}

function lineSetEvent() {
	$('.conT_section').hide();
	$('.conT_set').attr('src', 'img/icon/newicon/channel_set.png');
	Line_KeepIconcolor = true;
}

function lineDelboxEvent() {
	$('.del-box').hide();
	$('.delete-member').attr('src', 'img/icon/fence/fence_bg_del1.png')
}

function lineFilterEvent() {
	$('.filter').hide();
	var str = $('.fence_bg').html();
	if(str == undefined){
		$('.filter_img').attr('src', 'img/icon/select.png');
	}else{
		$('.filter_img').attr('src', 'img/icon/select1.png');
	}
	
	Line_searchIconcolor = true;
}

function hmTime(tar) {
	var text = '';
	var date1 = new Date();
	var y = date1.getFullYear();
	var m = date1.getMonth() + 1;
	var d = date1.getDate();
	var h = date1.getHours();
	var f = date1.getMinutes();
	var nowS = y + '-' + two(m) + '-' + two(d) + ' 00:00';
	var nowE = y + '-' + two(m) + '-' + two(d) + ' ' + two(h) + ':' + two(f);

	$('.wstart').text(nowS);
	$('.wend').text(nowE);
	$('.' + tar).empty();
	for(var i = 0; i < 24; i++) {
		if(i < 10) i = '0' + i;
		text += '<li>' + i + ':00</li>';
	}
	$('.' + tar).append(text);
}

function two(n) {
	if(n < 10) {
		n = '0' + n;
	}
	return n;
}

//获取电子围栏列表接口
function fenceDataGet (fn) {
	var name = "";
	var body = '{"Code" : 10705,"Body" : {"SessionId" : \"' + sessionId + '\", "Key": \"' + name + '\"}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			console.log('电子围栏数据'+JSON.stringify(ret));
			if(ret.Result == 200) {
				var data = ret.Fences;
				fn(data);
			} else {
				var oUl = $('.fence-list');
				oUl.find('.loading').hide();
				oUl.append('<div class="fdataNull">此账号没有电子围栏数据！</div>')
				hmTime('hmTime1');
				$('.create-fence').show();
			}
		}
	);
}

//围栏列表展示、数据处理
function fenceShow(data) {
	var context = '';
	fenceLine = data;
	$('.fence-list').empty();
	Map_Lineclear();
	hmTime('hmTime');
	hmTime('hmTime1');
	if(drawingManager != null) {
		drawingManager.close();
	}

	//	fenceMember.length = 0;
	fencesId.length = 0;

	for(var j = 0, leng = data.length; j < leng; j++) {
		//		fenceMember.push(data[j].Members);
		fencesId.push(data[j].Id);
	}

	for(var i = 0, len = data.length; i < len; i++) {
		var members = data[i].Members;
		var online = 0;
		var total = members.length;
		var warnStr = "";
		members.forEach(function(item) {
			if(onlineInfo.size() > 0 && onlineInfo.get(item.Uid)) {
				online += 1;
			}
		});
		
		if(data[i].RecordCount > 0 && data[i].RecordCount <= 99) {
			warnStr = '<span class="line_warnnum">' + data[i].RecordCount + '</span>';
		} else if(data[i].RecordCount > 99) {
			warnStr = '<span class="line_warnnum">99+</span>';
		}

        context += '<li class="' + data[i].Id + '" id="f' + i + '"><div class="fix fence-list-name" onclick="fenceShowUser(' + i + ')"><span style="max-width:130px;" class="fl only_one fence_name" title="' + data[i].Name + '">' + data[i].Name + '</span>(<i class="line-online">' + online + '</i>/<i class="line-total">' + total + '</i>)'+warnStr+'<span class="fr"><img src="img/icon/fence/fence_bg_down.png" /></span></div><ul class="fence-list-ul"></ul></li>';
	}
	$('.fence-list').append(context);
	$('.create-fence').show();

}

//围栏成员显示
//ul隐藏==》所有ul隐藏，点击ul打开颜色变，同时第二栏展开，画出围栏
//ul打开==》此ul隐藏，颜色变化，第二栏关闭，关闭围栏
function fenceShowUser(index) {
	if(typeof(overlay)!="undefined"){
		map.removeOverlay(overlay);
	}
	Pulley_jilu_line = 1;
	var target = $('#f' + index + ' .fence-list-ul'); //ul
	var title = $('#f' + index + ' .fence-list-name'); //div
	var html = '',
		text;
	var data = fenceLine[index].Members;
	var tarAll = $('.fence-list-ul');
	var conhtml = $('.fence_content');
	var img = title.find('img');
	line_index = index;

	$('#warnFuzzySearch').empty().hide();
	$('.line-user-find').val('');
	$('#warnRecord').show().empty();
	fIndex = index;
	if(img.attr('src') == 'img/icon/fence/fence_bg_down.png') {
		$('.fence_btn').hide();
		$('.fence_content_btn').show();
		tarAll.hide();
		conhtml.hide();
		Map_Lineclear();
		$('.fence-list-name').css("background", "#FFFFFF");
		$('.fence-list-name').find('img').attr("src", "img/icon/fence/fence_bg_down.png");
		target.empty();
		warnRecord(index);

		if(data.length == 0) {
			showAlert('该电子围栏下没有成员！');
		} else {
			for(var i = 0, len = data.length; i < len; i++) {
				if(data[i].Type == 0) {
					text = '禁入';
				} else {
					text = '禁出';
				}
				var online = 'notonline';
				if(onlineInfo.size() > 0 && onlineInfo.get(data[i].Uid)) {
					online = '';
				}
				html += '<li id="' + fencesId[index] + '_' + i + '" uid="' + data[i].Uid + '" class="fence-list-li"><span class="' + data[i].Uid + ' ' + online + '" title="' + data[i].MemberName + '">' + data[i].MemberName + '</span><img class="delete-member" onclick="fenceUserDelimg(' + index + ', ' + i + ',this)" src="img/icon/fence/fence_bg_del1.png" />' +
					'<div class="del-box"><p>确定移除该成员？</p><div><img src="img/icon/pho_up.png" /><a class="space noDel" onclick="cancelUserDel(' + index + ', ' + i + ')">取消</a><a onclick="fenceUserDel(' + index + ', ' + i + ', this)" class="yesDel">确定</a></div></div>' +
					'<div class="fence-list-right"><span>' + text + '</span><img src="img/icon/fence/fence_bg_downSmall.png" /><ul><li class="first">禁出</li><li>禁入</li></ul></div></li>'
			}
			target.append(html);
			target.slideDown('slow');
		}

		title.css("background", "#F1F0EE");
		img.attr("src", "img/icon/fence/fence_bg_up.png");
	} else {
		target.slideUp('slow');
		title.css("background", "#FFFFFF");
		img.attr("src", "img/icon/fence/fence_bg_down.png");
		$('.fence_content').hide('slow', function() {
			$('.fence_btn').show();
		});
		Map_Lineclear();

	}

	$('.fence-list-li').hover(function() {
		$(this).find(".delete-member").show();
	}, function() {
		$(this).find(".delete-member").hide();
	});
}

//告警记录显示
function warnRecord(index) {
	var start = fenceLine[index].StartTime;
	var end = fenceLine[index].StopTime;
	var name = fenceLine[index].Name;

	line_s = start;
	line_e = end;
	$('.wstart').text(start);
	$('.wend').text(end);
	$('.fence-name2').text(name);
	$('.fence_content').show('slow', function() {
		fenceShowPolygon(index); //画出电子围栏
	});
	warnGetRecordInterface();
}

//删除围栏成员

function fenceUserDelimg(n, i, event) { //n第几个围栏	i第几个成员
	var parameter_cs = [n,i,event];
	common._Box_on_or_off("确定移除该成员？",2,parameter_cs);
//	var event = event || window.event;
//	var fenid = fencesId[n];
//	var target = $('#' + fenid + '_' + i);
//	var box = target.find('.del-box');
//	var img = target.find('.delete-member');
//	
//	if(box.is(':hidden')) {
//		$('.del-box').hide();
//		$('.delete-member').attr("src", "img/icon/fence/fence_bg_del1.png");
//		box.show();
//		img.attr("src", "img/icon/fence/fence_bg_del2.png");
//	} else {
//		box.hide();
//		img.attr("src", "img/icon/fence/fence_bg_del1.png");
//	}
//	lineSetEvent();
//	lineFilterEvent();
//	$('.del-box').on('click', function(event) {
//		event.stopPropagation();
//	})
//	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

//删除围栏成员接口
function fenceUserDel(n, i, self) {
	var that = $(self).parents('ul').prev();
	var total = that.find('.line-total');
	var id = fenceLine[n].Members[i].Uid;
	var fenid = fencesId[n];
	var members = [],
		obj;
	obj = {
		"Uid": id
	};
	members[0] = obj;
	delete members.MemberName;
	members = JSON.stringify(members);
	var body = '{"Code":10701,"Body":{"SessionId" : \"' + sessionId + '\", "FenceId":\"' + fenid + '\", "Action":1, "Members":' + members + '}}';
	console.log('删除人员' + body);
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			coverHide();
			console.log(ret.Result);
			if(ret.Result == 200) {
				fenceLine[n].Members.splice(i, 1);
				$('#' + fenid + '_' + i).remove();
				fenceShowUser(n);
				showAlert('已移除');
				total.text(total.text() - 1);
				if(onlineInfo.size() > 0 && onlineInfo.get(id)) {
					var online = that.find('.line-online');
					online.text(online.text() - 1);
				}
			} else {
				showAlert('移除失败');
				console.log(ret.Result);
			}

		}
	)
}

//删除成员取消
function cancelUserDel(n, i) {
	var fenid = fencesId[n];
	var target = $('#' + fenid + '_' + i);
	var box = target.find('.del-box');
	var img = target.find('.delete-member');

	box.hide();
	img.attr("src", "img/icon/fence/fence_bg_del1.png");
}

//创建电子围栏
function createLine() {
	$("#userAddtree").empty();
	$('.fence').hide();
	$('.fence_content').hide();
	Map_Lineclear();
	showAlert('<span>点击地图，开始绘制围栏,双击完成绘制。</span>');
	drawingManager.open();
	drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);

	var val2 = $('.memSearch').val('');
	var val1 = '';
	pensearch(val1, val2);
	$('#penul').children('li').children('input').prop("checked", false);
	$('.fenStime').html('00:00');
	$('.fenEtime').html('12:00');
	$('.name-middle-top .nameInput').val('');
	
}

function paintLine(index) {

	$('.addFence').show();
	$('#fenceUsers').empty();
	$('.haveSec').show();
	$('.noAllout').prop('checked', false);
	$('.noAllin').prop('checked', false);
	if(index == 0) {
		$('.num2-yes1').hide();
		$('.num2-yes').show();
		initaTrees();
		zTreeOnAsyncSuccess('userAddtrees');
	}else{
		$('.num2-yes1').show();
		$('.num2-yes').hide();
		initaTree();
		zTreeOnAsyncSuccess('userAddtree');
	}
	
}

function pensearch(data, val2) {
	var val;
	if(val2 != undefined) {
		val = '';
	} else {
		val = $(data).val();
	}
	if(val == '') {
		$('#penul').hide();
		$('#userAddtree').show();
	} else {
		$('#userAddtree').hide();
		$('#penul').show();
		var len = $('#penul').children().length;
		for(var i = 0; i < len; i++) {
			if($('#penul').children('li').eq(i).attr('name').indexOf(val) > -1 || $('#penul').children('li').eq(i).attr('user').indexOf(val) > -1) {
				$('#penul').children('li').eq(i).show();
			} else {
				$('#penul').children('li').eq(i).hide();
			}
		}
	}
}

function saveFenceLine(name) {
	var obj = $("<li><div class='fix fence-list-name'><span class='fl fence_name'>" + name + "</span><span class='fr'><img src='img/icon/fence/fence_bg_down.png' /></span></div><ul></ul></li>");
	$('.fence-list').prepend(obj);
	$('.fence-list li:first').find(".fence_name").html(name);
	fenceDataGet(fenceShow);
	$('.addFence').hide();
	$('.nameCreate').hide();
	$('.nameInput').val('');
	$('.fence').show();
	$('#bg-color').hide();
	$('.haveSec').hide();
	$('.fence_content').hide();
	showAlert("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />&nbsp;&nbsp;创建成功");
}

//取消围栏画图
function closePaintLine() {
	drawingManager.close();
	//	map.clearOverlays();
	Map_Lineclear();
	$('.fence').show('slow');
}

//取消创建电子围栏
function cancelCreateFence(n) {
	if(typeof(overlay)!="undefined"&&overlay!=null){
		map.removeOverlay(overlay);
	}
	treeAddUsers.clear();
	$('.addFence').hide();
	$('.haveSec').hide('slow');
	$('.fence').show();
	$('#bg-color').hide();
	if(n == 0) $('.nameCreate').hide();
	$('.fence_content_btn').show();
	$('.User_Alls').hide();
	$('#userAddtree').show();
	$('.memSearch').val('');
    $('.ul_ztree').show();
}

//选择围栏成员
// function addFenceUsers(event, treeId, treeNode){
// 	var context = '';
// 	var check = treeNode.checked;
// 	var LineSelect = [];
// 	$('#fenceUsers').children().each(function(i) {
// 		LineSelect.push($('#fenceUsers').children('li').eq(i).attr('id'));
// 	})
// 	var str = $('.noAllin').prop('checked') ? '禁入' : '禁出';
// 	if(check){
// 		var arraynum = $.inArray(treeNode.id, LineSelect);
// 		if (arraynum > -1) {
// 			return
// 		}
// 		context = '<li id="'+treeNode.id+'" class="fix user-fenceSelect-item"><span class="fl">'+treeNode.name+'</span><img class="fr fenceSelDel" onclick="fenceSelectedUsersDel(\''+treeNode.id+'\')" src="img/icon/fence/fence_bg_del1.png" alt="img" />'+
// 					'<div class="fence-list-right fence-mem" onclick="fenceUsersOperate(this)"><span class="fencerType">'+str+'</span><img src="img/icon/fence/fence_bg_downSmall.png" />'+
// 					'<ul><li class="first">禁出</li><li>禁入</li></ul></div></li>';
// 		$('#penul').children('li[user=' + treeNode.id + ']').children('input').prop('checked', true);			
// 		$('#fenceUsers').append(context);
// 	}else{
// 		$('#'+treeNode.id).remove();

// 		$('#penul').children('li[user=' + treeNode.id + ']').children('input').attr('checked', false);
// 	}
// }

//单个成员禁入、禁出选择
function fenceUsersOperate(target) {
	var all_UL = $('#fenceUsers').children('li').children('.fence-list-right').children('ul');
	var all_LI = all_UL.children('li');
	// var tar = $('#'+ target);
	// var odiv = tar.find('.fence-list-right');
	var oul = $(target).find('ul');
	var oli = oul.find('li');

	if(oul.is(":hidden")) {
		all_UL.hide();
		all_LI.off('click');
		oul.show();
		oli.on('click', function() {
			$(this).parent().siblings('span').text($(this).text());
			$('.noAllin').prop('checked', false);
			$('.noAllout').prop('checked', false);
		});
	} else {
		oul.hide();
		oli.off('click');
	}

	return false;
}

//围栏成员全部进入，禁出
function noAllin(num) {
	var noin = document.getElementsByName('noAllin')[0];
	var noout = document.getElementsByName('noAllout')[0];

	if(num == 0 && noin.checked) {
		$('.fence-list-right').children("span").html("禁入");
		noout.checked = false;
	}
	if(num == 1 && noout.checked) {
		$('.fence-list-right').children("span").html("禁出");
		noin.checked = false;
	}
}

//删除已选围栏成员
function fenceSelectedUsersDel(id) {
	var list = $('#fenceUsers');
	var penul = $('#penul');

	list.children('li[name="' + id + '"]').remove();
	doZtreeChecked('userAddtree', id, false);
	// if (!penul.is(':hidden')) {
	penul.children('li[user=' + id + ']').children('div').removeClass('userall_selected');
	// }
}

function saveFenceLineInterface() {
	var fename = $('.nameInput').val();
	var fenStime = $('.fenStime').text();
	var fenEtime = $('.fenEtime').text();
	var type = mapType;
	var lacations = [];
	var memList = [];
	// var aLi = $('#fenceUsers').children('li');

	if(fenEtime == '00:00') {
		fenEtime = '23:59'
	}

	var specialCode = RegeMatchValC(fename);

	if(specialCode) {
		return showAlert('围栏名称不允许有特殊字符！');
	}

	if(fename == '') {
		showAlert('围栏名称不能为空！');
		return;
	}
	if(fename.length > 30) {
		return showAlert('围栏名称不能超过30字符！');
	}
	if(parseInt(fenStime, 10) >= parseInt(fenEtime, 10)) {
		showAlert('开始时间应小于结束时间！');
		return;
	}

	$('#fenceUsers').children('li').each(function() {
		var id = $(this).attr('name');
		var text = $(this).find('.fencerType').text();
		text = toNumber(text);
		memList.push({
			"Uid": "" + id + "",
			"Type": text
		});
	})

	for(var i = 0, len = pointxy.length; i < len; i++) {
		lacations.push({
			"Longitude": "" + pointxy[i].lng + "",
			"Latitude": "" + pointxy[i].lat + ""
		});
	}

	lacations = JSON.stringify(lacations);
	memList = JSON.stringify(memList);
	fename1 = encodeURI(encodeURI(fename));
	var body = '{"Code":10700,"Body":{"SessionId":\"' + sessionId + '\","FenceName":\"' + fename1 + '\","StartTime":\"' + fenStime + '\","StopTime":\"' + fenEtime + '\","LocationType":' + type + ',' +
		'"Locations":' + lacations + ',"Members":' + memList + '}}';
	console.log(body);
	var arrmsg = [];
	var conword = '创建围栏失败';
	//AjaxPostMsg(body, AJAXSET_TIME, LinePostCreat, MediaErrorDown, MediaAjaxovertime, true, arrmsg, conword);
				//body, time,         sucess,        error,          overtime,          tp,   msgarr, conword
	
	if(true){
           $('.cover_loading').show();
        }
        console.log(body);
       var xhr=$.ajax({
            type: "post",
            url:GetMsgUrl,
            async:false,
            // url:STATION_URL,
            data:body, //参数
            contentType:'application/json;charset=utf-8',
            timeout: AJAXSET_TIME, //参数 
            dataType:'json',
            success: function(data) {
//	    if(data.Tasks==""||data.Tasks==null){
//	       judge = true;
//          }
              console.log(JSON.stringify(data));
                LinePostCreat(data, arrmsg);
            },
            error:function(data){
                 MediaErrorDown(conword);
                 if(conword == '退出失败！'){
                    window.setTimeout(function()
	                {							
	                  logoutHerf();
	                }, 2 * 1000); 	
                 }
                 return;
            },
            complete: function (XMLHttpRequest,status) {
                  if(status == 'timeout') {
                      xhr.abort();
                     MediaAjaxovertime();
                  }
              }
        });
	// $('.cover_loading').show();
	// $.getJSON(STATION_URL + '?Body=' + body,
	// 	function (ret){
	// 		// console.log(JSON.stringify(ret));
	// 		$('.cover_loading').hide();
	// 		if(ret.Result == 200){
	// 			treeAddUsers.clear();
	// 			saveFenceLine(fename);
	// 		} else if (ret.Result == 410) {
	// 			showAlert('围栏名称不能超过30字符！')
	// 		}else{
	// 			showAlert('创建围栏失败')
	// 		}
	// 	}
	// );	
	$('.User_Alls').hide();      
    $('.ul_ztree').show();
    //fenceShowUser(0);
    setTimeout(function(){fenceShowUser(0);},1000);
    //$("#f0").children("div").get(0).onclick();
    //map.removeOverlay(overlay);
}

function LinePostCreat(ret) {

	var fename = $('.nameInput').val();
	$('.cover_loading').hide();
	if(ret.Result == 200) {
		treeAddUsers.clear();
		saveFenceLine(fename);
	} else if(ret.Result == 410) {
		showAlert('围栏名称不能超过30字符！')
	} else {
		showAlert('创建围栏失败')
	}
}

function toNumber(str) {
	if(str == '禁入') {
		str = 0;
	} else {
		str = 1;
	}
	return str;
}

function toStr(num) {
	if(num == 0) {
		num = '禁入';
	} else {
		num = '禁出';
	}
	return num;
}

//修改围栏名字
function fenceNameModify() {
	var newname = $('.fen_newName').val();
	var fenceId = fenceLine[fIndex].Id;
	var specialCode = RegeMatchValC(newname);
	var line_StartTime = $('.fenStime_x').text();
	var line_EndTime = $('.fenEtime_x').text();
	if(parseInt(line_StartTime, 10) >= parseInt(line_EndTime, 10)) {
		showAlert('开始时间应小于结束时间！');
		return;
	}
	$(".wstart").text(line_StartTime);
	$(".wend").text(line_EndTime);
	fenceLine[line_index].StartTime = line_StartTime;
	fenceLine[line_index].StopTime = line_EndTime;
	if(specialCode) {
		return showAlert('围栏名称不允许有特殊字符！');
	}

	if(newname == '') {
		showAlert('围栏名字不能为空！');
		return;
	}
	if(newname.length > 30) {
		showAlert('围栏名称不能超过30字符！');
		return;
	}
	console.log(newname.length)
	newname1 = encodeURI(encodeURI(newname));
	var body = '{"Code":10702,"Body":{"SessionId" :\"' + sessionId + '\", "FenceId":\"' + fenceId + '\","FenceName":\"' + newname1 + '\","StartTime":\"' + line_StartTime + '\","StopTime":\"' + line_EndTime + '\"}}';
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				fenceSaveNameSuccess(newname);
			} else {
				console.log(ret.Result);
				showAlert('保存失败！')
			}
		}
	)
}

function fenceSaveNameSuccess(name) {
	showAlert('已保存')
	successNext();
	$('.fen_newName').val('');
	$('.fence-name2').text(name);
	$('#f' + fIndex).find('.fence_name').text(name);
	fenceLine[fIndex].Name = name;
}
//删除电子围栏
function fenceDoDel() {
	var fenceId = fenceLine[fIndex].Id;
	var body = '{"Code":10704,"Body":{"SessionId" : \"' + sessionId + '\", "FenceId":\"' + fenceId + '\"}}';
	//console.log(body)
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				//console.log(ret.Result);
				fenceDelSuccess();
			} else {
				console.log(ret.Result);
				showAlert('删除失败！');
			}
		}
	)
	$('.conT_section').css('height', '210px');
}

//删除围栏成功后回调
function fenceDelSuccess() {
	showAlert('已删除');
	$('.fence_content').hide();
	$('#f' + fIndex).remove();
	$('.fence_btn').show();
	Map_Lineclear();
	successNext();
}

function successNext() {
	$('.conT_section').hide();
	$('.conT_section2').hide();
	$('.conT_set').attr("src", "img/icon/newicon/channel_set.png");
}

//画出电子围栏
function fenceShowPolygon(index) {
	if(Line != null || map != null) {
		Map_Lineclear();
		Line = null;
		var locations = fenceLine[index].Locations;
		var point = [];
		//	console.log(JSON.stringify(locations))
		for(var i = 0, len = locations.length; i < len; i++) {
			point.push(new BMap.Point(locations[i].Longitude, locations[i].Latitude));
		}

		var createPolygon = new BMap.Polygon(point, {
			strokeColor: "#F63839",
			strokeWeight: 3,
			fillColor: "#F63839",
			fillOpacity: 0.2
		});
		map.addOverlay(createPolygon);
		map.setViewport(point);
		Line = createPolygon;
	}

}

//围栏编辑
function fenceEdite() {
	if(Line != null || map != null) {
		var fence = $('.fence');
		var wrecord = $('.fence_content');
		var locations = fenceLine[fIndex].Locations;
		var point = [];

		for(var i = 0, len = locations.length; i < len; i++) {
			point.push(new BMap.Point(locations[i].Longitude, locations[i].Latitude));
		}

		wrecord.hide();
		// fence.hide();
		Radio_BtnLeft('fence');
		$('.fence_btn').show();
		map.setViewport(point);
		common._coverShow("完成修改后，点击鼠标右键保存修改");
		setTimeout(function() {
			common._coverHide()
		}, 5000);

		Line.enableEditing();
		Line.addEventListener("rightclick", function(e) {

			var lineadd = '<h3 class="meidadwn">确认修改电子围栏？</h3><div class="warn_popremove" ><span class="warn_cancel Line_Btnbr" >取消</span><span class="fr" onclick="fenceDoModified()">确认</span></div>';
			$(".warn_selectremove").empty().append(lineadd);
			$('#bg-color').show();
			// $('.media_selectremove').children('h3').attr('class','meidadwn');
			// $('.warn_selectremove').children('h3').html('确认修改电子围栏？');

			var media_imgh = $('.warn_selectremove').outerHeight();
			var media_imgw = $('.warn_selectremove').outerWidth();
			var meidia_screenh = $(window).height();
			var meidia_screenw = $(window).width();
			var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
			var media_top = (Number(meidia_screenh) - Number(media_imgh)) / 2;
			$(".warn_selectremove").css("top", media_top);
			$(".warn_selectremove").css("left", media_left);
			$('.warn_selectremove').show();

			// common._coverShow("<div class='fencemodify1'><span>确认修改围栏？</span></div><div class='fencemodify2'><span onclick='fenceCancelModified()'>取消</span><span onclick='fenceDoModified()'>确认</span></div>");

		});
	} else {
		alert("地图未正常加载，无法编辑围栏");
	}

}

//取消编辑围栏
function fenceCancelModified() {
	fenceShowPolygon(fIndex);
	common._coverHide();
	$('.fence').show().css('margin-left', '80px');
	// small_btn('fence');
	$('.fence_btn').hide();
	$('.fence_content').show();
}

function fenceline_cancnel () {
			Line.disableEditing();
			$('.warn_selectremove').parent().parent().hide();
			$('#bg-color').hide();
}

function fenceDoModified () {
	var arr = Line.getPath();
	var pos = [];
	var fenceid = fenceLine[fIndex].Id;
	$('#bg-color').hide();
	common._coverHide();
	$('.warn_selectremove').hide();
	Line.disableEditing();
	for(var i = 0, len = arr.length; i < len; i++) {
		pos.push({
			"Longitude": "" + arr[i].lng + "",
			"Latitude": "" + arr[i].lat + ""
		});
	}

	pos1 = JSON.stringify(pos);
	var body = '{"Code":10703,"Body":{"SessionId":\"' + sessionId + '\","FenceId":\"' + fenceid + '\","LocationType":' + mapType + ',"Locations":' + pos1 + '}}';
	//console.log(body);
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			//console.log(JSON.stringify(ret))
			if(ret.Result == 200) {
				fenceLine[fIndex].Locations = pos;
				common._coverHide();
				fenceShowPolygon(fIndex);
				// small_btn('fence');
				$('.fence').css('margin-left', '80px').show();
				$('.fence_btn').hide();
				$('.fence_content').show();
				setTimeout(function() {
					common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  修改成功")
				}, 500);
				setTimeout(function() {
					common._coverHide()
				}, 2000);
			} else {
				console.log(ret.Result);
				common._coverShow("修改失败！");
				setTimeout(function() {
					fenceCancelModified()
				}, 2000);
			}
		}
	);
}

//指定围栏添加成员
function fenceAddUser() {
	$('#userAddtrees').empty();
	$('.fence').hide();
	//	$('.fence_content').hide();
	paintLine();
	$('.memSearch ').val('');
	$('#penul').hide();
	$('#userAddtree').show();
	$('.fence_content_btn').hide();
}

function fenceSpecifiedAdduser() {
	var fenid = fenceLine[fIndex].Id;
	var mem = fenceLine[fIndex].Members;
	var memList = [];
	var newarr = [];
	var arr = [];
	var Members;
	var body;
	var aLi = $('#fenceUsers').children('li');

	if(aLi.length === 0) {
		showAlert('请选择用户！');
		return
	}

	for(var j = 0, leng = aLi.length; j < leng; j++) {
		var that = $(aLi[j]);
		var id = that.attr('name');
		var str = that.find('.fencerType').html();
		var name = $(aLi[j]).children('span').text();
		str = toNumber(str);
		arr.push({
			"Uid": "" + id + "",
			"Type": str,
			"MemberName": "" + name + ""
		});
		newarr.push({
			"Uid": "" + id + "",
			"Type": str,
			"MemberName": "" + name + ""
		});
	}

	for(var i = 0, len = newarr.length; i < len; i++) {
		for(var k = 0, log = mem.length; k < log; k++) {
			if(mem[k].Uid == newarr[i].Uid) {
				arr[i] = undefined;
			}
		}
	}

	for(var l = 0, lengt = arr.length; l < lengt; l++) {
		if(arr[l] !== undefined) {
			memList.push(arr[l]);
		}
	}

	Members = mem.concat(memList);
	if(memList.length > 0) {
		// delete memList[0].MemberName;
		var Members1 = JSON.stringify(memList);
		body = '{"Code":10701,"Body":{"SessionId" : \"' + sessionId + '\", "FenceId":\"' + fenid + '\", "Action":0,"Members":' + Members1 + '}}';
		console.log('添加成员' + body);

		//var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
		var conword = '添加成员失败！';
		
		$('.cover_loading').show();

		// console.log(URI);
		// $.post('' + URI + '',
		// 	function(ret) {
		// 		var resp = decodeURIComponent(ret, 'UTF-8');
		// 		var obj = $.parseJSON(resp);
		// 		$('.cover_loading').hide();
		// 		console.log(JSON.stringify(ret));
		// 		if(obj.Result == 200) {
		// 			addedSuccessView(fenid, Members);
		// 			fenceLine[fIndex].Members = Members;
		// 		} else {
		// 			// console.log(ret.Result);
		// 			showAlert("添加成员失败！");
		// 		}
		// 	}
		// )

        var xhr=$.ajax({
            type: "post",
            url:GetMsgUrl,
            async:false,
            data:body,
            contentType:'application/json;charset=utf-8',
            timeout: AJAXSET_TIME, //参数 
            dataType:'json',
            success: function(data) {
              	addedSuccessView(fenid, Members);
				fenceLine[fIndex].Members = Members;
            },
            error:function(data){
                 MediaErrorDown(conword);
                 return;
            },
            complete: function (XMLHttpRequest,status) {
                  if(status == 'timeout') {
                      xhr.abort();
                     MediaAjaxovertime();
                  }
              }
        });


	} else {
		showAlert('请勿重复添加成员！')
	}
}

function addedSuccessView(fenid, members) {
	treeAddUsers.clear();
	
	$('.addFence').hide();
	$('#fenceUsers').empty();
	$('.haveSec').hide();
	$('.fence').show();

	setTimeout(function(){
      $('.cover_loading').hide();
	},500);

	fenceShowUser(fIndex);
	//	$('.fence_content').hide();
	showAlert("添加成功");
	var obj = $('.fence-list').children('.' + fenid);
	var total = obj.find('.line-total');
	var online = obj.find('.line-online');
	total.text(members.length);
	var count = 0;
	members.forEach(function(item) {
		if(onlineInfo.size() > 0 && onlineInfo.get(item.Uid)) {
			count++;
		}
	});
	online.text(count);
}

//围栏添加成员失败
function addedFailView() {

}

//查询围栏告警记录
function warnGetRecordInterface() {
	var date = new Date();
	var fenceid = fenceLine[fIndex].Id;
	var uid = "";
	//	timefrom = date.getFullYear()+'-'+two((date.getMonth() + 1))+'-'+two(date.getDate())+' 00:00:00';
	timeto = date.getFullYear() + '-' + two((date.getMonth() + 1)) + '-' + two(date.getDate()) + ' ' + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
	timefrom = "2017-05-01 00:00:00";
	pageindex = 0;
	Line_searchIconcolor = true;
	$('.filter_img').attr('src', 'img/icon/select.png');
	var body = '{"Code":10706,"Body":{"SessionId":\"' + sessionId + '\","FenceId":\"' + fenceid + '\", "TimeFrom":\"' + timefrom + '\","TimeTo":\"' + timeto + '\","Uid":\"' + uid + '\","PageSize":' + pagesize + ',"PageIndex":' + pageindex + '}}';
	//	console.log(body);
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if(ret.Result == 200) {
				warningsDisplay(ret, 0);
			} else {
				warnGetRecordFail(0);
			}
		}
	)
}

function warnGetRecordFail(initial) {
	var warnbar = $('#warnRecord');
	if(initial === 0) {
		warnbar.empty();
		warnbar.append($('<span class="warn_nodata">没有数据！</span>'));
		$('.fencePage').hide();
		$('.con_main_search').find('.filter').hide();
	}
}

function warningsDisplay(ret, initical)  {
	pageTotal = ret.PageTotalCount;

	if(pageindex < pageTotal - 1) {
		$('.fencePage').show();
	} else {
		$('.fencePage').hide();
	}

	$('.fenceListLoadmoreBtn').show();
	$('.fenceListLoadmoreImg').hide();
	var warnRecord = $('#warnRecord');

	if(initical === 0) {
		warnRecord.empty();
		warns = [];
		if(ret.Warnings.length == 0) {
			$('#warnRecord').append('<span class="warn_nodata" id="noWarningData">暂无告警数据！</span>')
		}
	}

	warns = warns.concat(ret.Warnings);
	$('.con_main_search').find('.filter').hide();
	var str = $('.fence_bg').html();
	if(str == undefined){
		$('.filter_img').attr('src', 'img/icon/select.png');
	}else{
		$('.filter_img').attr('src', 'img/icon/select1.png');
	}
	
	Line_searchIconcolor = true;
	warnGetRecord(ret.Warnings);

	// $('.pageTotal').text(pageTotal);
	// $('.pageNum').text(pageindex + 1);		
}

function warnGetRecord(warnArr) {
	var html = '';
	var warnRecord = $('#warnRecord');

	for(var i = 0, len = warnArr.length; i < len; i++) {
		var num = warnArr[i].Type;
		var num1 = toStr(num);
		var time = warnArr[i].Time.slice(0, 10);
		var Line_Time=warnArr[i].Time.slice(0, 16);

		if(time !== timeStr) {
			timeStr = time;
			timeView = 1;
		} else {
			timeView = 0;
		}

		if(timeView == 1) {
			html += '<div>' + timeStr + '</div>';
		}
		if(num == 0) {
			html += '<li class="' + warnArr[i].Uid + '"><div class="fix"><span class="fl"><i class="username">' + warnArr[i].Name + '</i> 进入围栏</span><span class="fr ban1">' + num1 + '</span></div><p>' + Line_Time + '</p></li>';
		} else if(num == 1) {
			html += '<li class="' + warnArr[i].Uid + '"><div class="fix"><span class="fl"><i class="username">' + warnArr[i].Name + '</i> 走出围栏</span><span class="fr ban1">' + num1 + '</span></div><p>' + Line_Time + '</p></li>';
		}

	}

	warnRecord.append(html);
	timeStr = '';
}
function warningSearch_cz(){
	$('.filter a').removeClass('fence_bg');
	$('#fenceStartTime').val(getTodayDate());
	$('#fenceEndTime').val(getTodayDate());
	$('.warntime_s').text("00:00");
	$('.warntime_e').text("12:00");
}
function warningSearch() {
	var fenceid = fenceLine[fIndex].Id;
	var uid = '';
	var str = $('.fence_bg').html();
	var date = new Date();
	timeto = date.getFullYear() + '-' + two((date.getMonth() + 1)) + '-' + two(date.getDate()) + ' ' + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
	pageindex = 0;
	if(str == undefined) {
		showAlert('请选择筛选条件！');
		return;
	} else if(str == '一周') {
		timefrom = getTimefrom(7);
	} else if(str == '两周') {
		timefrom = getTimefrom(14);
	} else if(str == '一个月') {
		timefrom = getTimefrom(30)
	} else {
		var hang = '<br>';
		timefrom = $('#fenceStartTime').val() + ' ' + $('.warntime_s').text() + ':00';
		var timeended = $('.warntime_e').text() + ':00';
		// timeended = timeended == '00:00' ? '23:59:59' : timeended + ':00';
		timeto = $('#fenceEndTime').val() + ' ' + timeended;
		if(timefrom > timeto) {
			common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
			setTimeout(function() {
				common._coverHide();
			}, 3000);
			return;
		}

	}

	var body = '{"Code":10706,"Body":{"SessionId":\"' + sessionId + '\","FenceId":\"' + fenceid + '\", "TimeFrom":\"' + timefrom + '\","TimeTo":\"' + timeto + '\","Uid":\"' + uid + '\","PageSize":' + pagesize + ',"PageIndex":' + pageindex + '}}';
	console.log(body)
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				warningsDisplay(ret, 0);
			} else {
				warnGetRecordFail(0);
			}
		}
	)
}

function getTimefrom(d) {
	var num = d * 86400000;
	var da = new Date();
	num = da.getTime() - num;
	da = new Date(num);
	da = da.getFullYear() + '-' + two((da.getMonth() + 1)) + '-' + two(da.getDate()) + ' ' + two(da.getHours()) + ':' + two(da.getMinutes()) + ':' + two(da.getSeconds());
	return da;
}

function fenceListLoadmoreFn() {
	$('.fenceListLoadmoreBtn').hide();
	$('.fenceListLoadmoreImg').show();

	var fenceid = fenceLine[fIndex].Id;
	var uid = "";
	pageindex = pageindex < pageTotal - 1 ? pageindex + 1 : pageindex;
	var body = '{"Code":10706,"Body":{"SessionId":\"' + sessionId + '\","FenceId":\"' + fenceid + '\", "TimeFrom":\"' + timefrom + '\","TimeTo":\"' + timeto + '\","Uid":\"' + uid + '\","PageSize":' + pagesize + ',"PageIndex":' + pageindex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if(ret.Result == 200) {
				warningsDisplay(ret);
			} else {
				$('.fenceListLoadmoreBtn').show();
				$('.fenceListLoadmoreImg').hide();
			}
		}
	)
}

//告警记录了首页
// function pageIndex(){
// 	var fenceid = fenceLine[fIndex].Id;
// 	var uid = "";
// 	pageindex = 0;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+timefrom+'\","TimeTo":\"'+timeto+'\","Uid":\"'+uid+'\","PageSize":'+pagesize+',"PageIndex":'+pageindex+'}}';

// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warningsDisplay(ret);
// 			}
// 		}
// 	)
// }

//上一页
// function pagePreve(){
// 	var fenceid = fenceLine[fIndex].Id;
// 	var uid = "";
// 	pageindex = pageindex>0 ? pageindex-1 : 0;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+timefrom+'\","TimeTo":\"'+timeto+'\","Uid":\"'+uid+'\","PageSize":'+pagesize+',"PageIndex":'+pageindex+'}}';

// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warningsDisplay(ret);
// 			}
// 		}
// 	)
// }

//下一页
// function pageNext(){
// 	var fenceid = fenceLine[fIndex].Id;
// 	var uid = "";
// 	pageindex = pageindex<pageTotal - 1 ? pageindex+1 : pageindex;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+timefrom+'\","TimeTo":\"'+timeto+'\","Uid":\"'+uid+'\","PageSize":'+pagesize+',"PageIndex":'+pageindex+'}}';

// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warningsDisplay(ret);
// 			}
// 		}
// 	)
// }

//尾页
// function pageLast(){
// 	var fenceid = fenceLine[fIndex].Id;
// 	var uid = "";
// 	pageindex = pageTotal - 1;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+timefrom+'\","TimeTo":\"'+timeto+'\","Uid":\"'+uid+'\","PageSize":'+pagesize+',"PageIndex":'+pageindex+'}}';
// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warningsDisplay(ret);
// 			}
// 		}
// 	)
// }

function showAlert(str, time, pos) {
	if(!time) {
		time = 2000;
	}
	common._coverShow(str, pos);
	setTimeout(function() {
		common._coverHide()
	}, time)
}

//告警记录模糊搜索
function warnSearchBar() {
	var k = $('#warnSearchBar').val();
	var warnFuzzySearch = $('#warnFuzzySearch');
	var warnRecord = $('#warnRecord');
	var page = $('.fencePage');
	var newWarnsArray;
	if(k == '+' || k == '[' || k == '(' || k == '\\' || k == '^' || k == '$' || k == '|' || k == ')' || k == '?' || k == '*' || k == '.' || k == ']') {
		$('#warnSearchBar').val('')
		return;
	}
	k = codeWritedMofify(k);
	if(k == '') {
		warnRecord.show();
		warnFuzzySearch.hide();
		if(pageindex < pageTotal - 1) {
			page.show()
		}

	} else {
		warnRecord.hide();
		warnFuzzySearch.show();
		page.hide();
		newWarnsArray = searchWarnKeyRegExp(k, warns);
		warnSearchBarShow(k, newWarnsArray);
	}
}

function codeWritedMofify(k) {
	if(k === '') {
		return k;
	}
	if(k.indexOf('+') !== -1) {
		k = k.split('+').join('');
	}
	if(k.indexOf('[') !== -1) {
		k = k.split('[').join('');
	}
	if(k.indexOf('(') !== -1) {
		k = k.split('(').join('');
	}
	if(k.indexOf('\\') !== -1) {
		k = k.split('\\').join('');
	}
	if(k.indexOf('^') !== -1) {
		k = k.split('^').join('');
	}
	if(k.indexOf('$') !== -1) {
		k = k.split('$').join('');
	}
	if(k.indexOf('|') !== -1) {
		k = k.split('|').join('');
	}
	if(k.indexOf(')') !== -1) {
		k = k.split(')').join('');
	}
	if(k.indexOf('?') !== -1) {
		k = k.split('?').join('');
	}
	if(k.indexOf('*') !== -1) {
		k = k.split('*').join('');
	}
	if(k.indexOf('.') !== -1) {
		k = k.split('.').join('');
	}
	if(k.indexOf(']') !== -1) {
		k = k.split(']').join('');
	}
	return k;
}

function searchWarnKeyRegExp(key, list) {
	if(!(list instanceof Array)) return;
	var arr = [],
		len = list.length,
		reg = new RegExp(key);
	// reg = /key/;
	for(var i = 0; i < len; i++) {
		if(list[i].Name.match(reg)) {
			arr.push(list[i]);
		}
	}
	return arr;
}

var warnFuzzyStr = '';
var warnFuzzyNum = 0;

function warnSearchBarShow(key, array) {
	var html = '';
	var warnRecord = $('#warnFuzzySearch');
	var keycode = new RegExp(key, 'g');
	warnRecord.empty();

	for(var i = 0, len = array.length; i < len; i++) {
		var num = array[i].Type;
		var num1 = toStr(num);
		var time = array[i].Time.slice(0, 10);
		var Line_time = array[i].Time.slice(0, 16);
		var text = array[i].Name.replace(keycode, '<span class="sf-color">' + key + '</span>');

		if(time !== warnFuzzyStr) {
			warnFuzzyStr = time;
			warnFuzzyNum = 1;
		} else {
			warnFuzzyNum = 0;
		}

		if(warnFuzzyNum == 1) {
			html += '<div>' + warnFuzzyStr + '</div>';
		}
		if(num == 0) {

			html += '<li><div class="fix"><span class="fl">' + text + ' 进入围栏</span><span class="fr ban1">' + num1 + '</span></div><p>' + Line_time + '</p></li>';
		} else if(num == 1) {
			html += '<li><div class="fix"><span class="fl">' + text + ' 走出围栏</span><span class="fr ban1">' + num1 + '</span></div><p>' + Line_time + '</p></li>';
		}

	}

	warnRecord.append(html);
	if(array.length == 0) {
		warnRecord.append('<span>没有数据</span>');
	}
	warnFuzzyStr = '';
}

function Map_Lineclear() {
	if(Line != null) {
		map.removeOverlay(Line);
	}
	if(circle_User != null) {
		map.removeOverlay(circle_User);
	}
}


function Pulley_line(){
	if($('.fencePage').css("display")=="none"){
 		return;
 	}
	var Height_gdt=$(".content_main").scrollTop();
	var Height_div =$(".content_main")[0].scrollHeight-$(".content_main").height();
	if(Pulley_jilu_line!=Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_jilu_line = Height_gdt;
			fenceListLoadmoreFn();
			
		}
	}
	
	
}