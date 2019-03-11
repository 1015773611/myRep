var Monitor_users_top = [];
var monitorAppear_AllUser;
var UserRes;
var DisplayMonitoringUser = false;
function iconTop(){
	$('.monitor_label_main').height($(window).height() - $('.mon-add-top ').outerHeight() - $('.user-Cross-footer').outerHeight() - MAIN_TOPHT);
	$('.middle_box').height($(window).height() - $('.mon-add-top ').outerHeight() - $('.user-Cross-footer').outerHeight() - MAIN_TOPHT);
	$('.circlemiddle_box').height($(window).height() - $('.mon-add-top ').outerHeight() - $('.manage_circle_foot').outerHeight() - 160);
	// $('.monitor_label_main').height($('.monitor_label_main').height()-50);
	//监控图标
	$('.map_monitor').click(function(event){
		if ($('.tracl').css('display') == 'block') {
			return showAlert('请先确保关闭获取轨迹页面，再操作！');
		}
		selectDown();
		drawPictureMap('jiankong');
		if($('.monitor_div').is(":hidden")){
			$('.monitor_div').show();
			$('.monitor_img').attr("src","img/icon/map/map_monitor.png");
			
			$('.map_icon_lock').hide();
			$('.icon_attr4').attr('src', 'img/icon/lock.png');

			$('.annotate_div').hide();
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');

			$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
			$('.qzName').hide();

			$('.map_icon_choose_input').hide();
			$('.icon_attr8').attr("src","img/icon/map/map_search.png");

		}else{
			$('.monitor_div').hide();
			$('.monitor_img').attr("src","img/icon/map/map_monitor1.png");
		}
		event.stopPropagation();
	});
	//管理监控用户
	$('.monitor_manage').on("click", function(){//jiba
		selectDown();

		if($('.manage_monite_user').is(':hidden')){
			$('.monitor_label_user').hide();
			$('.manage_monite_user').show();
			refreshJiankongList();
		}
	});

	function selectDown() {
		$('#sortable2').hide();
		$('.icon_manage').hide();
		$('.icon_attr5').attr('src', 'img/icon/map/map_down.png');
	}

	//清除全部用户
	$('.delete_all').on("click",function(){
		var text = $('.manage_monitor ul').children('span').text();
		if (text === '没有监控用户') {
			showAlert('当前没有监控用户！')
			return;
		}
		// var content = "<div class='delete_all_con'><p>清除全部监控用户？</p><a id='closeBtn' class='delete_no'>取消</a><a class='yesBtn' onclick='jianKongClear()'>确认</a></div>"
		// easyDialog.open({
		//   container : {
		//     content : content
		//   },
		//   overlay : true
		// })
		 var lineadd='<h3 class="meidadwn">清除全部监控用户？</h3><div class="warn_popremove" ><span class="warn_cancel Top_cancel">取消</span><span class="fr" onclick="jianKongClear()">确认</span></div>';
         $(".warn_selectremove").empty().append(lineadd);
		 $('#bg-color').show();
 
	     var media_imgh = $('.warn_selectremove').outerHeight();
	     var media_imgw = $('.warn_selectremove').outerWidth();
	     var meidia_screenh = $(window).height();
	     var meidia_screenw = $(window).width(); 
	     var media_left = (Number(meidia_screenw) - Number(media_imgw)) /2;
	     var media_top = (Number(meidia_screenh) - Number(media_imgh))/2;
	     $(".warn_selectremove").css("top", media_top);
	     $(".warn_selectremove").css("left", media_left);
	     $('.warn_selectremove').show();
	
	});
	//关闭管理监控用户菜单
	$('.mon_close').click(function(){
		$('.manage_monite_user').hide();
	});

	//添加监控人员
	$('.mon_add').on("click",function(){
		 var val2 = $('.maptopss').val('');
       var val1 = ''; 
       $('#MapUserall').find('input').prop('checked',false);
       MapSearchs(val1,val2);
		$('.add_monitor_user').show();
		jiankongUsertree();
		zTreeOnAsyncSuccess('jiankong');

	});
	
	$('.goBacd').click(function (){
		treeAddUsers.clear();
		jianKongUsers.length = 0;
		$('.add_monitor_user').hide();
	});
	
	$('.mon_addyes').on('click', function (){
		treeAddUsers.clear();
		doJianAddtree();
	})
	
	//显示监控用户
	$('.monitorAppear').on('click', function (){
		DisplayMonitoringUser = true;
		monitorMark = true;
		// refreshJiankongList(0);
		showUserOnlinemapEmpty(onlineUsersMarkers);
		monitorUsersGet(monitorUsersInit);
		$(this).siblings().removeClass('activePos');
		$(this).addClass('activePos');
	})
	
	//地图显示在线用户
//	var isAppear = true;
	$('.appearUserOnline').on('click', function (){
		showUserOnlinemapEmpty(jianKongMarkers);
		var size = onlineUsersMarkers.size();	
		if(size == 0){
			if (onlineInfo.size() === 0) {
				showAlert('当前没有在线成员!');
			} else {
				onlineMapappear(onlineInfo.keySet());
			}
		}
		
		monitorMark = false;
		$(this).parent().siblings().removeClass('activePos');
		$(this).parent().addClass('activePos');
	})

	// 更多图标
	$('.icon_more').click(function(event){

		if ($('.tracl').css('display') == 'block') {
			return showAlert('请先确保关闭获取轨迹页面，再操作！');
		}

		$('.monitor_label_user').hide();
   		$('.manage_monite_user').hide();
		if($('.icon_more ul,.icon_manage').is(":hidden")){
			if ($('.channel_details_main').height() != '0') {
				$('.channel_details_top').trigger('click');
			}

			$('.icon_more ul').show();
			$(".icon_manage").show();
			$(this).attr("src","img/icon/map/map_up.png");
			$('.monitor_div').hide();
			$('.monitor_img').attr("src","img/icon/map/map_monitor1.png");
			$('.map_icon_lock').hide();
			$('.icon_attr4').attr('src', 'img/icon/lock.png');
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');

		}else{
			$('.icon_more ul').hide();
			$(".icon_manage").hide();
			$(this).attr("src","img/icon/map/map_down.png")

		}
		event.stopPropagation();
	});

	$('.warn_selectremove').on('click','.Top_cancel', function() {
	       $('.warn_selectremove').hide();
	       $('#bg-color').hide();
    })
	
	//标注图标
	$('.annotate_logo').click(function(event){
	// $('#sortable2').children().eq(0).click(function(event){
	
		drawPictureMap('biaozhu');
		// if (isCreatimg) {
		// 	drawingMark.close();
		// 	drawingMark.removeEventListener('overlaycomplete', overlaycomplete);
		// 	drawingMark = null;
		// 	isCreatimg = !isCreatimg;
		// }

		if($('.annotate_div').is(":hidden")){
			$('.annotate_div').show();
			// $(this).children('img').attr("src","img/icon/map/map_Annotate1.png");
			$(this).attr("src","img/icon/map/map_Annotate1.png");

			
			$('.monitor_div').hide();
			$('.map_icon_lock').hide();
			$('.icon_attr4').attr('src', 'img/icon/lock.png');
			$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');

			$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
			$('.qzName').hide();

			$('.map_icon_choose_input').hide();
			$('.icon_attr8').attr("src","img/icon/map/map_search.png");			

		}else{
			$('.annotate_div').hide();
			// $(this).children('img').attr("src","img/icon/map/map_Annotate.png");
			$(this).attr("src","img/icon/map/map_Annotate.png");
			
		}
		     event.stopPropagation();
	});

	//锁定当前位置
	$('.top-map-lock').click(function(event){

		if ($('.tracl').css('display') == 'block') {
			return showAlert('请先确保关闭获取轨迹页面，再操作！');
		}
		selectDown();
		drawPictureMap('suoding');
		if($('.map_icon_lock ').is(':hidden')){
			$('.map_icon_lock ').show();
			$('.annotate_div').hide();
			$('.monitor_div').hide();
			$('.icon_attr4').attr('src', 'img/icon/map/lock2.png');
			$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');

			$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
			$('.qzName').hide();

			$('.map_icon_choose_input').hide();
			$('.icon_attr8').attr("src","img/icon/map/map_search.png");

		}else{
			$('.map_icon_lock ').hide();
			$('.icon_attr4').attr('src', 'img/icon/lock.png');
		}
		event.stopPropagation(); 
	});

	var timer;
	$('.icon_manage').click(function() {
		//出现提示移动的div
		

		if($('.icon_manage').html()=="管理"){
			timer=setInterval(function(){
				$(".rotate").removeClass("r3");
				$(".rotate").toggleClass("r1");
			},90);$('.annotate_div').removeClass('hide');
			$('.title_mobile').removeClass('hide');//提示移动图片显示
			//替换的高亮图片
			$('.icon_attr1').attr('src', 'img/icon/map/map_monitor3.png');
			$('.icon_attr3').attr('src', 'img/icon/map/title3.png');
			$('.icon_attr4').attr('src', 'img/icon/map/lock3.png');
			//$('.icon_attr5').attr('src', 'img/icon/map/');//箭头 空间头向上
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate3.png');
			//$('.icon_attr7').attr('src', 'img/icon/map/'); 白色箭头
			$('.icon_attr8').attr('src', 'img/icon/map/map_search3.png');
			$('.icon_attr9').attr('src', 'img/icon/map/map_distance3.png');
			$('.icon_attr10').attr('src', 'img/icon/map/map_area3.png');
			$('.icon_attr11').attr('src', 'img/icon/map/map_line3.png');
			$('.icon_attr12').attr('src', 'img/icon/map/map_traffic3.png');
			$('.icon_attr13').attr('src', 'img/icon/map/map_print3.png');

			//拖拽图标/* 拖动时触发   JQUI*/
			//param.init() ;  //调用

			$( "#sortable1, #sortable2" ).addClass('connectedSortable');
			 $( "#sortable1, #sortable2" ).sortable({
     			 connectWith: ".connectedSortable"	
     		
   			}).disableSelection();
			$('.icon_manage').html("完成")
		}else if($('.icon_manage').html()=="完成"){
			$('.icon_manage').html("管理")
			$('.title_mobile').addClass('hide');//提示移动图片隐藏
			//图标的完成 取消高亮 
			$(".rotate").addClass("r3");
			$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
			$('.icon_attr3').attr('src', 'img/icon/map/title1.png');
			$('.icon_attr4').attr('src', 'img/icon/map/lock.png');
			//$('.icon_attr5').attr('src', 'img/icon/map/');//箭头 空间头向上
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');
			//$('.icon_attr7').attr('src', 'img/icon/map/'); 白色箭头
			$('.icon_attr8').attr('src', 'img/icon/map/map_search.png');
			$('.icon_attr9').attr('src', 'img/icon/map/map_distance.png');
			$('.icon_attr10').attr('src', 'img/icon/map/map_area.png');
			$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
			$('.icon_attr12').attr('src', 'img/icon/map/map_traffic.png');
			$('.icon_attr13').attr('src', 'img/icon/map/map_print.png');
			 
			//禁止拖拽
			$(".topR" ).removeClass('rotate,r1');
			 $( "#sortable1, #sortable2" ).removeClass('connectedSortable');

			 //要求做补充到实际不能拖拽起来  病保存数据到本地

			//弹出保存成功 一次性提示
			
			var content = "<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />&nbsp&nbsp保存成功"
				easyDialog.open({
		 		 container : {
		    	content : content
		  	},
		   		autoClose : 800

			})
		
			clearInterval(timer);
		}	
	});

	//图标的搜索模块
	$(".icon_attr8").click(function(){
	    // ; //显示隐藏的INPUT搜索框
	});


	//搜索目标地点
	
	$('#sortable2').children().eq(1).click(function(){
		drawPictureMap('sousuo');
		if($('.map_icon_choose_input').is(':hidden')){
			$('.map_icon_choose_input').show();	
			$('.icon_attr8').attr("src","img/icon/map/map_search1.png");
			
			$('.annotate_div').hide();
			$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');
			///////////
			$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
			$('.qzName').hide();

			
			$('.map_icon_lock').hide();
			$('.monitor_div').hide();
			$('.icon_attr4').attr('src', 'img/icon/lock.png');
			$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
		}else{
			$('.map_icon_choose_input').hide();
			$('.icon_attr8').attr("src","img/icon/map/map_search.png");
		}
		// event.stopPropagation(); 
	});


	//测距模块

    $(".icon_attr9").hover(function () {
		$(".icon_attr9").css("src","img/icon/map/map_distance1.png");
	});
	
	// $('#sortable2').on('click', function(event) {
	// 	event.stopPropagation();
	// })

	$('.icon_manage').on('click', function(event) {
		event.stopPropagation();
	})

	//document事件绑定
	$(document).on('click', function (){
		mapEventDispatch();
	})

}





function mapEventDispatch() {
	//标注
	$('.annotate_logo').attr('src', 'img/icon/map/map_Annotate.png');
	$('.annotate_div').css('display', 'none');
	//监控
	$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
	$('.monitor_div').css('display', 'none');
	//锁定
	$('.icon_attr4').attr('src', 'img/icon/lock.png');
	$('.map_icon_lock').css('display', 'none');
	//地图下拉菜单
	$('.icon_attr5').attr('src', 'img/icon/map/map_down.png');
	$('#sortable2').css('display', 'none');
	$('.icon_manage').css('display', 'none');

}


//===================================
//监控列表
//===================================

//增加成员选择
// function jianAddtree(event,treeId,treeNode){
// 	var check = treeNode.checked;
	
// 	if (check) {
// 	   $('#MapUserall').children('li[user=' + treeNode.id + ']').children('input').prop('checked', true);
//          var arraynum = $.inArray(treeNode.id, jianKongUsers);
//       if (arraynum > -1) {
//          return;
//        }
// 		jianKongUsers.push(treeNode.id);
		
// 	} else {
// 		$('#MapUserall').children('li[user=' + treeNode.id + ']').children('input').attr('checked', false);

// 		for(var i=0,len=jianKongUsers.length; i<len; i++){
// 			if(jianKongUsers[i] == treeNode.id){
// 				jianKongUsers.splice(i, 1);
// 				break;
// 			}
// 		}
    		
// 	}
// 	console.log(jianKongUsers)
// }




//清空全部监控用户
function jianKongClear(){
	//easyDialog.close();
	$('.Top_cancel').click();
	var ul = $('.manage_monitor ul');
	var arr = [];
	ul.children('li').each(function (){
		arr.push($(this).attr('uid'));
	});
	if (arr.length>0) {
		arr = JSON.stringify(arr);
		var body = '{"Code":11208,"Body":{"SessionId":"'+sessionId+'","UserMonitors":'+arr+',"Action":1}}';
		coverShow();
		$.getJSON(STATION_URL+'?Body='+body,function (ret){
			coverHide();
			if(ret.Result == 200){
				
				ul.empty();//.append('<span style="margin-left:80px;">没有监控用户</span>')
				showAlert('删除成功!');
				mapMonitorUser = [];
				monitorListData = [];
				Monitor_users_top = [];
				showUserOnlinemapEmpty(jianKongMarkers);
			}else{
				showAlert('删除监控用户失败！');
			}
		})
	}
}



//刷新监控成员列表
// function refreshJiankongList(tell){
// 	var ul = $('.manage_monitor ul');
// 	var html = '';
// 	var body = '{"Code":11207,"Body":{"SessionId":"'+sessionId+'"}}';
// 	$('.cover_loading').show();
// 	$.getJSON(STATION_URL+'?Body='+body,function (ret){
// 		ul.empty();
// 		$('.cover_loading').hide();
// 		if (ret.Result == 200) {
// 			var arr = ret.UserMonitors;
// 			mapMonitorUser = ret.UserMonitors;
			
// 			if (arr.length === 0 && tell == 0) {
// 				showAlert('没有监控用户！');
// 			}
// 			if (arr.length>0) {
// 				for(var i=0,len=arr.length; i<len; i++){
// 					html += '<li class="fix" name="mu'+i+'" uid="'+arr[i].Uid+'"><span class="fl only_one">'+arr[i].Name+'</span><span class="fr"><img src="img/icon/fence/fence_bg_del1.png" onclick="jiankongDelone(this)" alt="img" /></span></li>';
// 				}
// 				ul.append(html);
				
// 				if (monitorMark) {
// 					drawMonitorUsers();
// 				}
// 			} else {
// 				ul.append('<span style="color:red;margin-left:80px;">没有监控用户</span>')
// 			}
			
// 			if (monitorMark) {
// 				showUserOnlinemapEmpty(onlineUsersMarkers);
// 			}
			
// 		}
// 	})	
// }



var monitorListData = [];
function refreshJiankongList(tell){
	Monitor_users_top.length = 0;
	var ul = $('.manage_monitor ul');
	var html = '';
	var body = '{"Code":11206,"Body":{"SessionId":"'+sessionId+'"}}';
	
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		ul.empty();
		coverHide();
		if (ret.Result == 200) {
			var arr = ret.UserMonitors;
			monitorListData = ret.UserMonitors;
			
			if (arr.length>0) {
				for(var i = 0,len = arr.length; i < len; i++){
					var type = arr[i].Type == 0 ? '' : 'clmonitor';
					html += '<li class="fix" name="mu'+i+'" uid="'+arr[i].Uid+'"><span class="fl only_one '+type+'">'+arr[i].Name+'</span><span class="fr"><img src="img/icon/fence/fence_bg_del1.png" onclick="jiankongDelone(this)" alt="img" /></span></li>';
					Monitor_users_top.push(arr[i].Uid);
					
				}
				ul.append(html);
				
				// if (monitorMark) {
				// 	drawMonitorUsers();
				// }
			} else {
				ul.append('<span style="margin-left:80px;">没有监控用户</span>')
			}
			
			// if (monitorMark) {
			// 	showUserOnlinemapEmpty(onlineUsersMarkers);
			// }
			
		}
	})	
}


//删除某个监控用户
function jiankongDelone(self){
	var text = $(self).parent().siblings('span').text();
	var uid =  $(self).parent().parent().attr('uid');
	// var content = "<div class='delete_all_con'><p class='only_one' style='display:block;'>删除监控"+text+"？</p><a id='closeBtn' class='delete_no'>取消</a><a class='yesBtn' onclick='deleteOne(\""+uid+"\")'>确认</a></div>"
	
	// easyDialog.open({
	//   container : {
	//     content : content
	//   },
	//   overlay : true
	// })
	 var lineadd='<h3 class="meidadwn">取消监控'+text+'？</h3><div class="warn_popremove" ><span class="warn_cancel Top_cancel">取消</span><span class="fr" onclick="deleteOne('+uid+')">确认</span></div>';
         $(".warn_selectremove").empty().append(lineadd);
		 $('#bg-color').show();
 
	     var media_imgh = $('.warn_selectremove').outerHeight();
	     var media_imgw = $('.warn_selectremove').outerWidth();
	     var meidia_screenh = $(window).height();
	     var meidia_screenw = $(window).width(); 
	     var media_left = (Number(meidia_screenw) - Number(media_imgw)) /2;
	     var media_top = (Number(meidia_screenh) - Number(media_imgh))/2;
	     $(".warn_selectremove").css("top", media_top);
	     $(".warn_selectremove").css("left", media_left);
	     $('.warn_selectremove').show();
	
}

function deleteOne(id){
	var monitorlist = $('#manage_monitor_userlist');
	var arr = [];
	arr.push(id);
	$('.warn_selectremove').hide();
	$('#bg-color').hide();
	arr = JSON.stringify(arr);
	var body = '{"Code":11208,"Body":{"SessionId":"'+sessionId+'","UserMonitors":'+arr+',"Action":1}}';
	coverShow();
	$.getJSON(STATION_URL+'?Body='+body,function (ret){
		coverHide();
		// easyDialog.close();

		if(ret.Result == 200){
			showAlert('删除成功!');
			
			monitorlist.children('li[uid="'+id+'"]').remove();
			for (var j = 0,lon = monitorListData.length; j<lon; j++) {
				if (monitorListData[j].Uid === id) {
					monitorListData.splice(j, 1);
					break;
				}
			}
				for(var k=0;k<Monitor_users_top.length;k++){
					if(Monitor_users_top[k]==id){
						Monitor_users_top.splice(Monitor_users_top.indexOf(id+""),1);
					}
				}
				
			if (monitorMark && monitorlist.is(':empty')) {
				monitorlist.append('<span style="margin-left:80px;">没有监控用户</span>');
				mapMonitorUser.length = 0;
				drawMonitorUsers();
			}

			if (monitorMark && !monitorlist.is(':empty')) {
				monitorUsersGet(monitorUsersOnMapShow);
			}			
			// map.removeOverlay(jianKongMarkers.get(id));
			// jianKongMarkers.remove(id);
			// for (var i=0,len=mapMonitorUser.length; i<len; i++) {
			// 	if (mapMonitorUser[i].Uid === id) {
			// 		mapMonitorUser.splice(i, 1);
			// 		break;
			// 	}
			// }

			
		}else{
			showAlert('删除监控用户失败！');
		}

	})
}



function monitorUsersGet(func) {
	var body = '{"Code":11207,"Body":{"SessionId":"'+sessionId+'"}}';
	console.log('11207'+body);
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		coverHide();
		func(ret);
	})
}

function monitorListRefresh(func) {
	var body = '{"Code":11206,"Body":{"SessionId":"'+sessionId+'"}}';
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		coverHide();
		func(ret);
	})
}


function monitorUsersInit(result) {
	if (result.Result == 200) {
		mapMonitorUser = result.UserMonitors;
		monitorAppear_AllUser = mapMonitorUser;
		if (mapMonitorUser.length == 0) {
			showAlert('没有监控用户！');
		} else {
			if (monitorMark) {
				drawMonitorUsers();
			}
		}
	} else {
		showAlert('获取监控用户失败！')
	}	
}

function monitorUsersOnMapShow(result) {
	if (result.Result == 200) {
		mapMonitorUser = result.UserMonitors;
			
		if (mapMonitorUser.length > 0 && monitorMark) {
			drawMonitorUsers();
		}
	} else {
		showAlert('获取监控用户失败！')
	}		
}



// function selectMapMonitorUser(array) {
// 	var arr = [];
// 	array.forEach(function(item) {
// 		if (item.Latitude && item.Longitude) {
// 			arr.push(item)
// 		}
// 	})
// 	return arr;
// }


//画出监控成员
function drawMonitorUsers(){
	var data = mapMonitorUser;
	var len = data.length;
	var myIcon;
	var mark_Arr = [];
	
	showUserOnlinemapEmpty(jianKongMarkers); //清空数据
	var jj = jianKongMarkers.keySet();
	if (len > 0) {
		for(var i = 0; i < len; i++){
			var mark = data[i];
			if (mark.BaiduLatitude && mark.BaiduLongitude) {
				var point = new BMap.Point(mark.BaiduLongitude, mark.BaiduLatitude);
				mark_Arr.push(point);
				var userinfo = usersAll.get(mark.Uid);
				// console.log('信息'+JSON.stringify(userinfo));
				var name = userinfo ? userinfo.Name : mark.Uid;
				var userNamelen = name.length;
                var offsetvalleft = monitorUsersMarkerStyle(userNamelen, name);
				var label = new BMap.Label(name,{offset:new BMap.Size(offsetvalleft,-20)});

				var img_lineicon;
				
				if (onlineInfo.containsKey(mark.Uid)) {
					myIcon = new BMap.Icon("img/chat/map-marker-bgline.png", new BMap.Size(40,43));
					label.setStyle({border:'none',backgroundColor:'#FECB00'});
					img_lineicon='<img src="img/chat/online.png" alt="" />';
				} else {
					myIcon = new BMap.Icon("img/chat/map-marker-offline.png", new BMap.Size(40,43));
					label.setStyle({border:'none',backgroundColor:'#6F6F6F'});
					img_lineicon='<img src="img/chat/outline.png" alt="" />';
				}

				var marker = new BMap.Marker(point, {icon:myIcon});			 	
				marker.setTitle(mark.Uid);
				marker.setLabel(label);
				map.addOverlay(marker);
				var gg = jianKongMarkers.keySet();
				jianKongMarkers.put(mark.Uid, marker);

				marker.addEventListener('click',function(){
                      var marker=this;
					   Map_UserMsgToshow_baidu(marker.getTitle(),mapMonitorUser);
			})
                 
               
                     /********开始***********/
   //          var phone='';
   //          var OrgName='';
   //          // var online = onlineInfo.keySet();
   //          // var img = online.indexOf(id) == -1 ? '<img src="img/chat/outline.png" alt="" />' : '<img src="img/chat/online.png" alt="" />';
			// var content = '<div id="markInfoMessage" uid="'+mark.Uid+'" uname="'+name+'" class="fix">'+img_lineicon+'<h4>' + name+ '</h4>' +
			// 	'<ul class="mark_ul2 fr"><li class="mark_ul_li1" onclick="markerPhoneUser(1)"></li><li class="mark_ul_li2" onclick="markerPhoneUser(0)"></li><li class="mark_ul_li3" onclick="markerTraclUser()"></li></ul></div>'+
			// 	'<ul class="mark_ul1"><li>账户:<span class="markInfoMessage_id">' +mark.Uid+ '</span></li>' +
			// 	'<li><span style="margin:0;float:left;">组织:</span><span class="markuserOrg">' +OrgName + '</span></li><li>电话:<span class="markuserPho">' + phone + '</span></li></ul>';
				
			//    traclObj = {
			// 		id: mark.Uid,
			// 		mk: marker,
			// 		mf: myInfoWindow
			// 	};
			// var myInfoWindow = new BMap.InfoWindow(content); //创建信息窗口对象
			// marker.addEventListener('click',function(){

			// 		  this.openInfoWindow(myInfoWindow);
			// })

          /*******结束********/





			}
		}
		if(DisplayMonitoringUser){
			DisplayMonitoringUser = false;
			var v_s=map.getViewport(mark_Arr);
			map.centerAndZoom(v_s.center,v_s.zoom);
		}
		
	}
}

//增加监控成员地图显示
function monitorAddedOnMap(userArr){	
	var myIcon = new BMap.Icon("img/chat/map-marker-bgline.png", new BMap.Size(40,43));
	var mark = userArr[0];
	var userid = mark.Uid;
	var userinfo = usersAll.get(userid);
	var name = userinfo ? userinfo.Name : userid;
	var point = new BMap.Point(mark.BaiduLongitude, mark.BaiduLatitude);
	var marker = new BMap.Marker(point, {icon:myIcon});
	marker.setTitle(mark.Uid);
	
	var offsetvalleft = monitorUsersMarkerStyle(name.length, name);
	var label = new BMap.Label(name,{offset:new BMap.Size(offsetvalleft,-20)});
	label.setStyle({border:'none',backgroundColor:'#FECB00'});
	marker.setLabel(label);
	//轨迹播放打开,不添加mark
	if(!isShowTrajectory){
	map.addOverlay(marker);
	}
	jianKongMarkers.put(mark.Uid, marker);
}


//================================================================
//	地图显示在线用户
//================================================================


//get the data to appear on map init
function onlineMapappear(come, go){
	var body;
	console.log('获取位置');
	if (go && go.length > 0) {

		showUserOnlinemapReduce(go, onlineUsersMarkers);
	}
	
	if(come.length > 0){
		come = JSON.stringify(come);
		body = '{"Code":10200,"Body":{"SessionId":\"'+sessionId+'\","Uids":'+come+'}}';
		console.log('获取位置'+body);
		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			console.log('位置信息返回结果'+JSON.stringify(ret));
			if (ret.Result == 200) {
				getUserOnlinemapInfo(ret.Locations); //获取位置信息
			} else {
				showAlert('获取当前位置失败!');
			}
			
		});		
	}
	
}

function SelectSomeUsers(){
	var data = [];		
	var us = HelpManArrays;
	for(var j=0;j<monitorAppear_AllUser.length;j++){
		for(var o=0;o<us.length;o++){
			if(monitorAppear_AllUser[j].Uid==us[o].Uid){
				monitorAppear_AllUser[j].Name = us[o].Name;
				userInfos.put(monitorAppear_AllUser[j].Uid, monitorAppear_AllUser[j]);
				data.push(monitorAppear_AllUser[j]);
				break;
			}
		}
	}
	var myIcon = new BMap.Icon("img/chat/map-marker.png", new BMap.Size(40,43));
	for(var i=0,len=data.length; i<len; i++){
		if(data[i].BaiduLongitude && data[i].BaiduLatitude){
			var point = new BMap.Point(data[i].BaiduLongitude, data[i].BaiduLatitude);
			var userName = data[i].Name;
			var userNamelen=userName.length;
            var offsetvalleft = monitorUsersMarkerStyle(userNamelen, userName);
			var marker = new BMap.Marker(point, {icon:myIcon});
			marker.setTitle(data[i].Uid);
			var label = new BMap.Label(userName,{offset:new BMap.Size(offsetvalleft,-20)});
			label.setStyle({border:'none',backgroundColor:'#3CFF07'});
			marker.setLabel(label);
			AllUsersMarkers.put(data[i].Uid, marker);
		}
		
	}
}

//add the marker
function showUserOnlinemapAdd(res){

    console.log('地图信息'+JSON.stringify(res));
	var data = [];
	res.forEach(function(item) {
		
		if (usersAll.containsKey(item.Uid)) {
			data.push(item);
		}
	})
	var myIcon = new BMap.Icon("img/chat/map-marker.png", new BMap.Size(40,43));
   
	for(var i=0,len=data.length; i<len; i++){
		if(data[i].BaiduLongitude && data[i].BaiduLatitude){
			// console.log('显示信息'+JSON.stringify(data[i]));
			var point = new BMap.Point(data[i].BaiduLongitude, data[i].BaiduLatitude);
			var userName = userInfos.get(data[i].Uid).Name;
			var userNamelen=userName.length;
			var OrgName=userInfos.get(data[i].Uid).OrgName;
			var phone=userInfos.get(data[i].Uid).Phone;
            var offsetvalleft = monitorUsersMarkerStyle(userNamelen, userName);



			var marker = new BMap.Marker(point, {icon:myIcon});
			marker.setTitle(data[i].Uid);
			var label = new BMap.Label(userName,{offset:new BMap.Size(offsetvalleft,-20)});
			label.setStyle({border:'none',backgroundColor:'#3CFF07'});
			marker.setLabel(label);
			onlineUsersMarkers.put(data[i].Uid, marker);
			
             
       /********开始***********/
           
        var User_Msglist={"Uid":data[i].Uid,"Name":userName,"status":1,"OrgName":OrgName,"Time":data[i].Time,"Lat":data[i].BaiduLatitude,"Log":data[i].BaiduLongitude,"Phone":phone};
			   traclObj = {
					id: data[i].Uid,
					mk: marker
					// mf: myInfoWindow
				};
			// var myInfoWindow = new BMap.InfoWindow(content); //创建信息窗口对象
			marker.addEventListener('click',function(){
                      var marker=this;
					   Map_UserMsgToshow_baidu(marker.getTitle(),res);
			})
			map.addOverlay(marker);

          /*******结束********/
		}
	}
}


//reduce the marker
function showUserOnlinemapReduce(data, hmap){
  
    var marker=hmap.get(data[0]);
    console.log('确认marker'+marker);
	for(var i=0,len=data.length; i<len; i++){
		map.removeOverlay(hmap.get(data[i]));
		hmap.remove(data[i]);
	}
}

function showUserOnlinemapReduce_push (data, hmap, json) {
  
    // var marker=hmap.get(data[0]);
    //     console.log('确认marker'+marker);
	 if(!monitorMark){
              var marker=hmap.get(data[0]);
              if(marker){

              	       map.removeOverlay(hmap.get(data[0]));
				       hmap.remove(data[0]);
				       showUserOnlinemapAdd_move(json);

              }
               
	 }else{
         
               map.removeOverlay(hmap.get(data[0]));
		       hmap.remove(data[0]);
		       monitorAddedOnMap(json);


	 }
}


//clear online marker
function showUserOnlinemapEmpty(hmap){
	var data = hmap.values();

	for(var i = 0,len = data.length; i < len; i++){
		map.removeOverlay(data[i]);
	}
	hmap.clear();
}


//get user info
function getUserOnlinemapInfo(data){
	if(data.length>0){
		var userId = [];
		for(var i=0,len=data.length; i<len; i++){
			if(!userInfos.containsKey(data[i].Uid)){
				userId.push(data[i].Uid);
			}
		}
		userId = JSON.stringify(userId);
		var body='{"Code":"10112","Body":{"SessionId":"'+sessionId+'","Uids":'+userId+'}}';
		$.getJSON(STATION_URL+'?Body='+body, function (ret){
			// console.log(ret)
			if(ret.Result === 200){
				var users = ret.Users;
				if(users.length>0){
					for(var j=0,lon=users.length; j<lon; j++){
			 			userInfos.put(users[j].Uid, users[j]);
					}
				}
				UserRes = data;
				showUserOnlinemapAdd(data);
			}else{
				showAlert('获取用户信息失败!');
			}
		})
	}
}

//====================================================
//频道监控成员地图显示
//====================================================

function monitorAddTreeuserView(data, isAdd) {
	jianKongUsers = treeAddUsers.keySet();
}


function doJianAddtree() {

	if (jianKongUsers.length > 0) {
		
		var arr = JSON.stringify(jianKongUsers);
		var body = '{"Code":11208,"Body":{"SessionId":"'+sessionId+'","UserMonitors":'+arr+',"Action":0}}';
		
		coverShow();
		$.getJSON(STATION_URL+'?Body='+body,function (ret){
			console.log("1="+ret.Result);
			coverHide();
			if (ret.Result == 200) {
				$('.add_monitor_user').hide();
				jianKongUsers.length = 0;
				
				if (monitorMark) {
					monitorUsersGet(monitorUsersOnMapShow);
				}
				if (!$('.manage_monite_user').is(':hidden')) {
					refreshJiankongList();
				}
				showAlert('添加成功！');
			} else if (ret.Result == 411) {
				showAlert('请勿重复添加会话！');
				$('.add_monitor_user').hide();
				jianKongUsers.length = 0;
			} else {
				showAlert('添加失败！');
			}
		})

	} else {
		showAlert('请选择要添加的用户！');
	}
}


function channel_map_monitor(chatType) {
	var content = "<div class='delete_all_con'><p class='only_one' style='display:block;'>确认添加到监控？</p><a id='closeBtn' class='delete_no'>取消</a><a class='yesBtn' onclick='dochannel_map_monitor(\""+chatType+"\")'>确认</a></div>"
	easyDialog.open({
	  container : {
	    content : content
	  },
	  overlay : true
	})
}

function dochannel_map_monitor(chatType) {
	easyDialog.close();
	var channel = $('.' + chatType);
	var cid = channel.attr('id');
	var channelName = channel.attr('name');
	var body = '{"Code":"11208","Body":{"SessionId":"'+sessionId+'","UserMonitors":[\"'+cid+'\"],"Action":0}}';
	console.log(body);
	var isUpdate = true;

	for (var i = 0; i < monitorListData.length; i++) {
		if (monitorListData[i].Uid == cid) {
			isUpdate = false;
			break;
		}
	}

	if (isUpdate) {
		coverShow();
		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			coverHide();
			if (ret.Result === 200) {
				if (monitorMark) { //是否显示监控用户
					monitorUsersGet(monitorUsersOnMapShow);
				}
				if (!$('.manage_monite_user').is(':hidden')) {
					channelMonitorAdd(cid, channelName);
				}
				showAlert('添加成功！');
			} else if (ret.Result === 411) {
				showAlert('该频道已经添加到监控，请勿重复操作！');
			} else {
				showAlert('添加频道监控失败!');
			}
		})
	} else {
		showAlert('该频道已经添加到监控，请勿重复操作！');
	}	
}

function chat_map_monitor(chatType) {
	var content = "<div class='delete_all_con'><p class='only_one' style='display:block;'>确认添加到监控？</p><a id='closeBtn' class='delete_no'>取消</a><a class='yesBtn' onclick='dochat_map_monitor(\""+chatType+"\")'>确认</a></div>"
	easyDialog.open({
	  container : {
	    content : content
	  },
	  overlay : true
	})
}

function dochat_map_monitor(chatType) {
	easyDialog.close();
	var arr = channel_map_monitor_users(chatType);
	if (arr.length > 0) {
		doJianAddtree();
	}		
}

function channelMonitorAdd(cid, channelName) {
	var list = $('.manage_monitor').children('ul');
	var html = '<li class="fix" name="" uid="'+cid+'"><span class="fl only_one clmonitor">'+channelName+'</span><span class="fr"><img src="img/icon/fence/fence_bg_del1.png" onclick="jiankongDelone(this)" alt="img" /></span></li>';
	list.append(html);
}

function channel_map_monitor_users(chatType) {
	var obj = $('.'+ chatType);
	var objUl = obj.children('ul');
	var list = objUl.children('li');
	
	if (objUl.css('display') === 'block') {
		list.each(function() {
			var uid = $(this).attr('name');
			if (uid !== loginId) {
				jianKongUsers.push(uid);
			}
		})
	} else {
		showAlert('成员加载中，请稍等再次点击！');
		return;
	} 
	return jianKongUsers;
}

// function channel_map_monitor_position(arr, fn) {
// 	if (arr.length) {
// 		arr = JSON.stringify(arr);
// 		body = '{"Code":10200,"Body":{"SessionId":\"'+sessionId+'\","Uids":'+arr+'}}';
// 		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			
// 			if (ret.Result == 200) {
// 				fn(ret.Locations);
// 			} else {
// 				showAlert('获取频道成员位置失败!');
// 			}
			
// 		});	
// 	} else {
// 		showAlert('该频道下没有成员！')
// 	}	
// }

// function channel_map_monitor_show(data) {
// 	console.log('top文件'+data);
// 	var point, marker, label;
// 	var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));
	
// 	if (data.length > 0) {
// 		for (var i = 0, len = data.length; i < len; i++) {
// 			var mark = data[i];
// 			var name = usersAll.get(mark.Uid) ? usersAll.get(mark.Uid).Name : mark.Uid;
// 			point = new BMap.Point(mark.BaiduLongitude, mark.BaiduLatitude);
// 			marker = new BMap.Marker(point, {
// 				icon: myIcon
// 			});
			
// 			// marker.setTitle(name);
// 			label = new BMap.Label(name, {
// 				offset: new BMap.Size(0, -20)
// 			});
// 			marker.setLabel(label);
// 			map.addOverlay(marker);
// 		}
// 	}
// }
// 

function Map_UserMsgToshow_baidu (user_msg, res) {
	
	 var user_uid=user_msg;
	 var userName=Task_GetName(user_msg);
	 var OrgName=Task_GetOrgName(user_msg);
	 var phone=Task_GetPhone(user_msg);
	 var user_Time;
	 var user_localtype;
	 var user_lat;
	 var user_log;
     var user_status //在线状态

      if(onlineInfo.containsKey(user_uid)){
  
          user_status=1;
	  }
   

	  for(var i=0;i<res.length;i++){
	  	  if(res[i].Uid==user_uid){

             user_Time=res[i].Time;
             user_localtype=res[i].Type;
             user_lat=res[i].BaiduLatitude;
             user_log=res[i].BaiduLongitude;
             
	  	  }
	  }
	var User_Msglist={"Uid":user_uid,"Name":userName,"state":user_status,"OrgName":OrgName,"Time":user_Time,"Lat":user_lat,"Log":user_log,"Phone":phone,"Type":user_localtype};
	Map_UserMsgToshowWindow_baidu(User_Msglist);


	return;
    

}

function Map_UserMsgToshowWindow_baidu (user_msg) {

	  user_MapwindowId=user_msg.Uid;
	   var user_lineicon;
	   var user_linetext;
	   var user_loaltype;
	

	 var  point = new BMap.Point(user_msg.Log, user_msg.Lat);

       if(user_msg.state==1){
          
           user_lineicon='<img src="img/chat/online.png">';
           user_linetext='在线';
           
         }else{
           
           user_lineicon='<img src="img/chat/outline.png">';
           user_linetext='离线';

        }

          if(user_msg.Type==1){
          
             user_loaltype='基站';
           
          }else{
           
           user_loaltype='GPS';

          }
		 var content = '<div id="markInfoMessage" uid="'+user_msg.Uid+'" uname="'+user_msg.Name+'" class="fix">'+user_lineicon+'<h4>' + user_msg.Name + '('+user_msg.Uid+')</h4></div>' +
		 '<ul class="mark_ul1">' + '<li><span style="margin:0;float:left;">组织:</span><span class="markuserOrg" title="'+user_msg.OrgName+'">' + user_msg.OrgName + '</span></li><li>时间:<span>'+user_msg.Time+'</span></li><li>经度:<span>'+user_msg.Lat+ '</span></li><li>纬度:<span>'+user_msg.Log+ '</span></li><li>类型:<span>'+user_loaltype+ '</span></li></ul><div class="map_info"><ul class="mark_ul2 mark_margin fix"><li class="mark_ul_li1" onclick="markerPhone(1)"></li><li class="mark_ul_li2" onclick="markerPhone(0)"></li><li class="mark_ul_li3" onclick="markerTracl()"></li></ul></div>'; 

	      var myInfoWindow = new BMap.InfoWindow(content);
	    map.openInfoWindow(myInfoWindow,point); //开启信息窗口	
        if(user_msg.state==1){

	         Map_userbaidumyInfoWindow=onlineUsersMarkers.get(user_msg.Uid);

        }else{

              Map_userbaidumyInfoWindow=jianKongMarkers.get(user_msg.Uid);
             
        }

}


function Map_usericoncloseinfowindow(data, hmap){
// onlineUsersMarkers
	for(var i=0,len=data.length; i<len; i++){
		map.removeOverlay(hmap.get(data[i]));
	}

}











//add the marker
function showUserOnlinemapAdd_move (data) {

    console.log('位置地图信息'+JSON.stringify(data));
  
	var myIcon = new BMap.Icon("img/chat/map-marker.png", new BMap.Size(40,43));
   
	for(var i=0,len=data.length; i<len; i++){
		if(data[i].BaiduLongitude && data[i].BaiduLatitude){
			// console.log('显示信息'+JSON.stringify(data[i]));
			var point = new BMap.Point(data[i].BaiduLongitude, data[i].BaiduLatitude);
			var userName = Task_GetName(data[i].Uid);
			var userNamelen = userName.length;
			var OrgName=Task_GetOrgName(data[i].Uid);
			var phone=Task_GetPhone(data[i].Uid);
            var offsetvalleft = monitorUsersMarkerStyle(userNamelen, userName);



			var marker = new BMap.Marker(point, {icon:myIcon});
			marker.setTitle(data[i].Uid);
			var label = new BMap.Label(userName,{offset:new BMap.Size(offsetvalleft,-20)});
			label.setStyle({border:'none',backgroundColor:'#3CFF07'});
			marker.setLabel(label);
			onlineUsersMarkers.put(data[i].Uid, marker);
			
             
       /********开始***********/
           
        // var User_Msglist={"Uid":data[i].Uid,"Name":userName,"status":1,"OrgName":OrgName,"Time":data[i].Time,"Lat":data[i].BaiduLatitude,"Log":data[i].BaiduLongitude,"Phone":phone};
			   traclObj = {
					id: data[i].Uid,
					mk: marker
					// mf: myInfoWindow
				};
			// var myInfoWindow = new BMap.InfoWindow(content); //创建信息窗口对象
			marker.addEventListener('click',function(){
                      var marker=this;
					   Map_UserMsgToshow_baidu(marker.getTitle(),data);
			})
			
		    //轨迹播放打开,不添加在线用户mark
		    if(!isShowTrajectory){
			  map.addOverlay(marker);
           }
          /*******结束********/
		}
	}
}

// function Map_UserMsgToshowMove_baidu (user_msg,data) {
              
//               user_msg, res

// 		 var user_uid=user_msg;
// 	 var userName=Task_GetName(user_msg);
// 	 var OrgName=Task_GetOrgName(user_msg);
// 	 var phone=Task_GetPhone(user_msg);
// 	 var user_Time;
// 	 var user_localtype;
// 	 var user_lat;
// 	 var user_log;
//      var user_status //在线状态

//       if(onlineInfo.containsKey(user_uid)){
  
//           user_status=1;
// 	  }
   

// 	  for(var i=0;i<res.length;i++){
// 	  	  if(res[i].Uid==user_uid){

//              user_Time=res[i].Time;
//              user_localtype=res[i].Type;
//              user_lat=res[i].BaiduLatitude;
//              user_log=res[i].BaiduLongitude;
             
// 	  	  }
// 	  }
// 	var User_Msglist={"Uid":user_uid,"Name":userName,"state":user_status,"OrgName":OrgName,"Time":user_Time,"Lat":user_lat,"Log":user_log,"Phone":phone,"Type":user_localtype};
// 	Map_UserMsgToshowWindow_baidu(User_Msglist);


// 	return;




// }


function Top_circleInputAll (data) {

     if ($(data).hasClass('userall_selected')) {
			$(data).removeClass('userall_selected');
			$('.manage_circle_mainUl').find('label').removeClass('label-bg');
             $("input[name='user_circle']").prop("checked", false);
			 $('.Topcircle_total').html(0);
			 Top_circlenum=0;
		}else{
			var len=$('.manage_circle_mainUl').children().length;
			if(len==1){
				 var valhtml=$('.manage_circle_mainUl').children().eq(0).html();
				 if(valhtml=='此区域内没有用户！'){
				 	 showAlert('没有用户可勾选');
				 	 return; 
				 }
			}
			$(data).addClass('userall_selected');
			if(len>30){

				for(var i=0;i<30;i++){

					$('.manage_circle_mainUl').children().eq(i).find('input').prop("checked", true);
					$('.manage_circle_mainUl').children().eq(i).find('label').addClass('label-bg');
				}
				Top_circlenum=30;
                $('.Topcircle_total').html(30);
                showAlert('最多勾选30个成员');
				return;
			}
			Top_circlenum=len;
             $('.Topcircle_total').html(len);
			$('.manage_circle_mainUl').find('label').addClass('label-bg');
			$("input[name='user_circle']").prop("checked", true);
			// $('.manage_circle_mainUl').find('input').attr("checked", true);
			// $("input[name='HelpInput']").prop("checked", true);
			// HelpGetchecked();
			// HelpChoose = Helpnum;
			// HelpNull = 0;
			// if (HelpChoose == 0) {
			// 	$('#HelpRead').attr('disabled', 'true');
		 //        $('#HelpRead').removeClass('HelpReads');
			// } else {
			// 	$('#HelpRead').removeAttr('disabled');
		 //        $('#HelpRead').addClass('HelpReads');
			// }
		}
		// $('.Helptotal').text(HelpChoose);
}

 