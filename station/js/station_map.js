var drawingManager;
var drawingMark;
var myDis;
var Map_userbaidumyInfoWindow;
var circle_User;
var Pulley_jilu_map = 1;

var marker_baiducreat;
var styleOptions = //地图上画圆的样式
	{
		strokeColor: "#FA7C00", //边线颜色。
		fillColor: "white", //填充颜色。当参数为空时，圆形将没有填充效果。
		strokeWeight: 2, //边线的宽度，以像素为单位。
		strokeOpacity: 0.5, //边线透明度，取值范围0 - 1。
		fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
		strokeStyle: 'solid' //边线的样式，solid或dashed。
	};
var map;

var markerArr = []; //地图标注marker
var isMarker = false;//是否显示标注
var DEFAULT_MARK_COUNT = 5;//默认标注的显示个数
var newMarkArray = []; //要显示的标注数组
function stationMap() {
	// 百度地图API功能
	map = new BMap.Map("allmap",{enableMapClick:false});
	// map.centerAndZoom(new BMap.Point(117.099177, 39.397778), 12);
	
	var lon_user = parseFloat($.cookie('lng' + loginId));
	var lat_user = parseFloat($.cookie('lat' + loginId));
	var zoom = parseInt($.cookie('zoom' + loginId), 10);
	if (!zoom) {
		zoom = 12;
	}
	var mapCenter = new BMap.Point(lon_user, lat_user);

	if (lon_user && lat_user) {
		// map.reset();
		// map.setZoom(zoom);
		// map.setCenter(mapCenter);
		map.centerAndZoom(mapCenter, zoom);
	} else {
		var cbLocalCity = function(ret) {
			map.centerAndZoom(ret.center, 12);
		};
		var localCity = new BMap.LocalCity();
		localCity.get(cbLocalCity);
	}
	//缩放地图
	map.enableScrollWheelZoom(true);
	map.addControl(new BMap.MapTypeControl());
	map.addControl(new BMap.ScaleControl());

	var navigationControl = new BMap.NavigationControl({
		// 靠左上角位置
		anchor: BMAP_ANCHOR_TOP_LEFT,
		// LARGE类型
		type: BMAP_NAVIGATION_CONTROL_LARGE,
		// 启用显示定位
		enableGeolocation: true
	});
	map.addControl(navigationControl);
	myDis = new BMapLib.DistanceTool(map);
	//实例化鼠标绘制工具
	drawingManager = new BMapLib.DrawingManager(map, {
		isOpen: false, //是否开启绘制模式
		enableDrawingTool: false, //是否显示工具栏
		markerOptions:styleOptions, //点的样式
		circleOptions: styleOptions, //圆的样式
		polylineOptions: styleOptions, //线的样式
		polygonOptions: styleOptions, //多边形的样式
		rectangleOptions: styleOptions //矩形的样式
	});
	drawingManager.addEventListener('polygoncomplete', polygoncomplete);
	//  map.addEventListener('rightclick', function(e){
	//  	closePaintLine();
	//	});

	
	//搜索地名
	baiduMapSearch();

	//路况
	var ctrl = new BMapLib.TrafficControl({
		showPanel: false //是否显示路况提示面板
	});
	map.addControl(ctrl);
	ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
	window.onload=function(){
		map.addEventListener("moveend", function(){
			initArry();
		});
		map.addEventListener("zoomend", function() {
			initArry();
		    $('.icon_attr13 ').attr('zoom',map.getZoom());
		})
	}
	
	$('.BMap_shadow').css('display','none');


	$('.warn_selectremove').on('click', '.MarkerTop_cancel', function() {
			 
			$(this).parent().parent().hide();
			$('#bg-color').hide();
		    
	})
}
/*var iTime; //JS的事件多次触发，只执行最后一次
function executeLast(){
	clearTimeout(iTime);
    iTime = setTimeout(function () {
	   initArry();
    }, 500);
    initArry();
}*/
//清空历史可视区域标记数组，并初始化当前可视区域标记数组
function initArry(){
		if (markerArr.length > 0) {
			for (var i = 0, len = markerArr.length; i < len; i++) {
				map.removeOverlay(markerArr[i]);
			}
			markerArr.length = 0;
		}
		if(isMarker &&  markArray.length != 0){
			drawMarks();
		}
}
var polygoncomplete = function(overlay) {
	var bounds = overlay.getBounds();
	pointxy = overlay.getPath();
	// map.removeOverlay(overlay);
	drawingManager.close();
	paintLine(0);

};

/**
 * 地图标注
 */
var markIndex = 0;
var markPagesize = 30;
var markPageTotal = 0;
var markArray = [];
var allMarkArray = [];
var marking;
var markclick;

//创建地图标注
var isCreatimg = false;

function createMarker() {
	drawPictureMap('biaozhu')
	isCreatimg = !isCreatimg;
	// markerFlag();
	if(isCreatimg) {

		var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));
		drawingMark = new BMapLib.DrawingManager(map, {
			isOpen: true, //是否开启绘制模式
			enableDrawingTool: false, //是否显示工具栏
			markerOptions: styleOptions, //圆的样式
			markerOptions: {
				icon: myIcon
			}
		});

		drawingMark.close();
		drawingMark.open();
		drawingMark.setDrawingMode(BMAP_DRAWING_MARKER);
		//回调获得覆盖物信息
		drawingMark.addEventListener('overlaycomplete', overlaycomplete);

   //    drawingManager.open();
	  // drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
	  // drawingManager.addEventListener('overlaycomplete', overlaycomplete);
	}
	$('.annotate_logo').attr('src', 'img/icon/map/map_Annotate.png');
	$('.annotate_div').css('display', 'none');
	
}



 


var overlaycomplete = function(e, overlay) { 
	var lng = e.overlay.point.lng;
	var lat = e.overlay.point.lat;
	var content = '<div class="markerCreate"><input type="text" maxlength="20" class="markerName" placeholder="标题" /><textarea class="markerText" maxlength="500"  placeholder="添加描述"></textarea><div class="fix"><span class="btn-span fl markNo" onclick="markCreateCancel()">取消</span><span class="btn-span fr markYes" onclick="doCreateMarker(\'' + lng + '\',\'' + lat + '\')">创建</span></div></div>';
	var opts = {
		enableCloseOnClick: false
	};
	var myInfoWindow = new BMap.InfoWindow(content, opts);
	e.overlay.openInfoWindow(myInfoWindow);
	drawingMark.close();
	marking = e.overlay;
	myInfoWindow.addEventListener('close', markCreateCancel);
}

//取消创建标注
function markCreateCancel() {
	map.removeOverlay(marking);
	marking = null;
}

//创建标注接口
function doCreateMarker(x, y) {
	var MarkName = $('.markerName').val();
	var MarkDetail = $('.markerText').val();
	var LocationType = 1;
	var specialCode = RegeMatchValC(MarkName);
	var specialCode1 = RegeMatchValC(MarkDetail);
	
	if (specialCode) {
		return showAlert('标注名称不允许有特殊字符！');
	}
	if (MarkName === '' || MarkName.replace(/\s+/g, '').length === 0) {
		return showAlert('标注名称不能为空值！')
	}
	if (MarkName.length > 20) {
		showAlert('标注名称不能超过20个字符！');
		return;
	}
	if (specialCode1) {
		return showAlert('标注内容不允许有特殊字符！');
	}
	if (MarkDetail.length > 500) {
		return showAlert('标注内容不能超过500个字符！')
	}

	MarkDetail = MarkDetail.replace(/\n/g, '');
	var MarkName1 = encodeURI(encodeURI(MarkName));
	var MarkDetail1 = encodeURI(encodeURI(MarkDetail));
	var body = '{"Code":10800,"Body":{"SessionId":"' + sessionId + '","MarkName":"' + MarkName1 + '","MarkDetail":"' + MarkDetail1 + '","LocationType":"' + LocationType + '","Longitude":"' + x + '","Latitude":"' + y + '"}}';
	$('.cover_loading').show();
    var conword = '创建失败';
 
    var xhr=$.ajax({
            type: "post",
            url:GetMsgUrl,
            async:false,
            data:body,
            contentType:'application/json;charset=utf-8',
            timeout: AJAXSET_TIME, //参数 
            dataType:'json',
            success: function(data) {
            	setTimeout(function(){
                $('.cover_loading').hide();
	            },300);
              	isMarker = false;
				markCreateCancel();
				var markItem = {Creator: loginId,CreatorName: "",Detail: MarkDetail,Id: data.MarkId,Latitude: y,Longitude: x,Name: MarkName,Time: "0000-00-00 00:00:00.0",Type: 1};
				markArray.push(markItem);
				markAddToMap(markItem);
				isMarker = true;
				//getAllMarksData();//注释此处原因，创建标注之后，不立马重画，否则导致刚创建的标注不能显示。
				showAlert('<img class="bg_ok" src="img/icon/userIcon/bg_ok.png" />&nbsp;&nbsp;创建成功');
				addMarkerItem(data.MarkId, MarkName);
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
}

function addMarkerItem(id, markerName) {
	var time = getTodayDate();
	var name = $('#company_name').text();
	var myCheckbox = '<div class="squaredbox"><input onclick="markCheckboxClick()" type="checkbox" id="'+id+'" name="mglist" /><label for="'+id+'"></label></div>';
	var html = '<li class="fix"><div>'+myCheckbox+'<span class="">' + markerName + '</span><span class="fr">' + time + '</span></div><p>' + name + '</p></li>';
	if ($('.monitor_label_user').css('display') === 'block') {
		$('#markList').prepend(html)
	}	
}

//显示所有标注接口
function showAllMarker() {
	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"","Key":"","PageSize":' + markPagesize + ',"PageIndex":' + markIndex + '}}';
	//	console.log(body)
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if (ret.Result == 200) {
				markPageTotal = ret.PageTotalCount;
				markArray = markArray.concat(ret.Marks);
				//allMarkArray = allMarkArray.concat(ret.Marks);
				if(markPageTotal == 1) {
					drawMarks();
				}
				if (markIndex + 1 < markPageTotal) {
					markIndex++;
					showAllMarker();
				} else {
					markIndex = 0;
					drawMarks();
				}
			} else {
				showAlert('获取标注信息失败！');
			}
		}
	);
}

//获取标注数据
function getAllMarksData() {
	var content = $('.showMark');

	isMarker = !isMarker;
	markerFlag();

	if (markerArr.length > 0) {
		for (var i = 0, len = markerArr.length; i < len; i++) {
			map.removeOverlay(markerArr[i]);
		}
		markerArr.length = 0;
	}

	if (isMarker) {
		if(markArray.length==0){
			showAllMarker();
		}else{
			drawMarks();//前后两次分支是：前一次判断是页面初始化的时候查后台。else分支是从markArray中直接画。
		}
		content.text('隐藏标注');
	} else {
		//drawMarks();
		content.text('显示标注');
	}

	if (isCreatimg) {
		drawingMark.close();
		drawingMark.removeEventListener('overlaycomplete', overlaycomplete);
		drawingMark = null;
		isCreatimg = !isCreatimg;
	}


}
function getAllMarksData_show() {
	var content = $('.showMark');

	isMarker = !isMarker;
	markerFlag();
	if (markerArr.length > 0) {
		for (var i = 0, len = markerArr.length; i < len; i++) {
			map.removeOverlay(markerArr[i]);
		}
		markerArr.length = 0;
	}
		if(markArray.length==0){ 
			showAllMarker();	
		}else{//不查后台，直接从第一次初始化中取出来。
			drawMarks();
		}
		
		content.text('隐藏标注');

	if (isCreatimg) {
		drawingMark.close();
		drawingMark.removeEventListener('overlaycomplete', overlaycomplete);
		drawingMark = null;
		isCreatimg = !isCreatimg;
	}

}

//分步画出的地图标注（所有）
function drawMarks() {
	newMarkArray = marksFilter();
	if(newMarkArray.length > 0) {
		for(var i = 0, len = newMarkArray.length; i < len; i++) {
			markAddToMap(newMarkArray[i]);
		}

	}
}
//方法抽象出来是为了被此处调用即：创建标注之后直接显示，而不是从数组随机取。
function markAddToMap(mark){
	var point, marker, label;
	var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));
	point = new BMap.Point(mark.Longitude, mark.Latitude);
	marker = new BMap.Marker(point, {
		icon: myIcon
	});
	marker.setTitle(mark.Detail);
	label = new BMap.Label(mark.Name, {	
		offset: new BMap.Size(0, -20)
	});
	marker.setLabel(label);
	map.addOverlay(marker);
	marker.detail = mark.Detail;
	marker.creator = mark.Creator;
	marker.Id = mark.Id;
	marker.addEventListener('click', function(e) {
		markclick = this;
		openMarkInfoWindow();
	});
	markerArr.push(marker);	
};
//对标记数组进行过滤
function marksFilter(){
	var bound = map.getBounds();
	var newMarkArray = [];
	//可视范围过滤
	if(markArray.length > 0) {
		for(var i = 0, len = markArray.length; i < len; i++) {
			var mark = markArray[i];
			point = new BMap.Point(mark.Longitude, mark.Latitude);
			if(bound.containsPoint(point)==true){
				newMarkArray.push(mark);
			}
		}
	}
	//可视范围最多显示50个，随机出50个标记
	while(newMarkArray.length > DEFAULT_MARK_COUNT){
			var randomIndex = Math.floor(Math.random() * markArray.length);
			newMarkArray.splice(randomIndex, 1);
	}
	return newMarkArray;
}
function drawAllMarks() {
	if(!isMarker) {
		return;
	}
	var point, marker, label;
	var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));
	if(allMarkArray.length > 0) {
		for(var i = 0, len = allMarkArray.length; i < len; i++) {
			var mark = allMarkArray[i];
			point = new BMap.Point(mark.Longitude, mark.Latitude);
			marker = new BMap.Marker(point, {
				icon: myIcon
			});
			marker.setTitle(mark.Detail);
			label = new BMap.Label(mark.Name, {
				offset: new BMap.Size(0, -20)
			});
			marker.setLabel(label);
			map.addOverlay(marker);
			marker.detail = mark.Detail;	
			marker.Id = mark.Id;
			marker.addEventListener('click', function(e) {
				markclick = this;
				openMarkInfoWindow();
			});
			markerArr.push(marker);
		}
	}
}

function openMarkInfoWindow(mark) {
	var detail = markclick.detail;
	var title = markclick.getLabel().content;
	var html = '<div class="markclick"><div class="fix markclick1"><i title="' + title + '" class="markclick1-title">' + title + '</i><span class="fr"><img src="img/icon/userIcon/bg_write.png" onclick="markerEdit()" alt="pho" /><img src="img/icon/fence/fence_bg_del1.png" onclick="markerDel()" alt="pho" /></span></div><div class="markclick2">' + detail + '</div></div>';
	var opts = {
		enableCloseOnClick: false
	};
	var myInfoWindow = new BMap.InfoWindow(html, opts);
	markclick.openInfoWindow(myInfoWindow);

}

//编辑标注
function markerEdit() {
	var id = markclick.creator;
	if(id !== loginId) {
		showAlert('该标注非您创建，不能编辑！');
		return;
	}
	var title = $('.markclick1-title').text();
	var text = $('.markclick2').text();
	var content = '<div class="markerCreate"><input type="text" maxlength="20" value="' + title + '" class="markerName" placeholder="标题" /><textarea class="markerText" maxlength="500" placeholder="添加描述">' + text + '</textarea><div class="fix"><span class="btn-span fl markNo" onclick="markerModifyCancel()">取消</span><span class="btn-span fr markYes" onclick="markerModify()">保存</span></div></div>';
	var opts = {
		enableCloseOnClick: false
	};
	var myInfoWindow = new BMap.InfoWindow(content, opts);
	markclick.closeInfoWindow();
	markclick.openInfoWindow(myInfoWindow);
}

//删除标注
function markerDel() {
	var id = markclick.creator;
	if(id !== loginId) {
		showAlert('该标注非您创建，不能删除！');
		return;
	}
	// common._coverShow("<div class='fencemodify1'><span>确认删除标注？</span></div><div class='fencemodify2'><span onclick='cancelMarkerDel()'>取消</span><span onclick='doMarkerDel()'>确认</span></div>");
	 var lineadd='<h3 class="meidadwn">确认删除标注？</h3><div class="warn_popremove" ><span class="warn_cancel MarkerTop_cancel">取消</span><span class="fr" onclick="doMarkerDel()">确认</span></div>';
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

//确认删除标注
function doMarkerDel() {
	 $('.warn_selectremove').hide();
	 $('#bg-color').hide();
	// common._coverHide();
	var markerId = markclick.Id;
	var body = '{"Code":10801,"Body":{"SessionId":"' + sessionId + '","MarkIds":["' + markerId + '"]}}';
	var arr = [markerId];
	console.log(body);
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
						console.log(JSON.stringify(ret))
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				markerModifyCancel();
				isMarker = false;
				deleteMarkItem(arr);
				getAllMarksData();
				showAlert('已删除');
				$('#markList').find('#' + markerId).parents('li').remove();
			} else {
				markerModifyCancel();
				showAlert('删除失败');
			}
		}
	);
}

//取消删除标注
function cancelMarkerDel() {
	common._coverHide();
}

//修改标注
function markerModify() {
	var MarkName = $('.markerName').val();
	var MarkDetail = $('.markerText').val();

	if(MarkName === '' || MarkName.replace(/\s+/g, '').length === 0) {
		return showAlert('标注名称不能为空值！')
	}
	if(MarkName.length > 20) {
		showAlert('标注名称不能超过20个字符！');
		return;
	}
	if(MarkDetail.length > 500) {
		return showAlert('标注内容不能超过500个字符！')
	}

	MarkDetail = MarkDetail.replace(/\n/g, '');
	var MarkName1 = encodeURI(encodeURI(MarkName));
	var MarkDetail1 = encodeURI(encodeURI(MarkDetail));
	var MarkId = markclick.Id;
	var body = '{"Code":10802,"Body":{"SessionId":"' + sessionId + '","MarkId":"' + MarkId + '","MarkName":"' + MarkName1 + '","MarkDetail":"' + MarkDetail1 + '"}}';
	var markItem = {Id:MarkId,Name:MarkName,Detail:MarkDetail}; //用于在markArray中修改该项。
	console.log(body);
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			console.log(JSON.stringify(ret))
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				markerModifyCancel();
				map.removeOverlay(markclick);
				isMarker = false;
				updateMarkArray(markItem);		//修改标注之后，同步修改markArray里的对应mark项。
				getAllMarksData();
				showAlert('<img class="bg_ok" src="img/icon/userIcon/bg_ok.png" />&nbsp;&nbsp;修改成功');
				$('#markList').find('#' + MarkId).next('span').text(MarkName);
			} else {
				markerModifyCancel();
				showAlert('修改失败');
			}
		}
	);
}

//修改取消
function markerModifyCancel() {
	markclick.closeInfoWindow();
}

//隐藏标注菜单
function markerFlag() {
	$('.annotate_div').hide();
	$('.annotate_logo').attr("src", "img/icon/map/map_Annotate.png");
}

var mgPsize = 30;
var mgIndex = 0;
var mgTotal = 0;
var mgArr = []; //管理标注数组

//管理标注
function manageMarker() {
	$('.manage_monite_user').hide();
	markerFlag();
	if(isCreatimg) {
		drawingMark.close();
		drawingMark.removeEventListener('overlaycomplete', overlaycomplete);
		drawingMark = null;
		isCreatimg = !isCreatimg;
	}
	$('.monitor_label_user').show();
	mgIndex = 0;
	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			if(ret.Result == 200) {
				markListShow(ret.Marks, ret.PageTotalCount, 0);
			} else {
				showAlert('标注加载失败！');
				$('#markList').text('没有数据');
			}
		}
	);
}

//管理标注展示
function markListShow(data, number, initialLoad) {
	mgTotal = number;
	$('.monitor_label_user').show();
	if(mgIndex < mgTotal - 1) {
		$('.markerPage').show();
	} else {
		$('.markerPage').hide();
	}

	$('.markerListLoadmoreBtn').show();
	$('.markerListLoadmoreImg').hide();

	var markList = $('#markList');
	if(initialLoad === 0) {
		markList.empty();
	}

	var html = '';

	if(data.length > 0) {
		var myCheckbox = '',
			i;

		for(i = 0, len = data.length; i < len; i++) {
			myCheckbox = '<div class="squaredbox"><input type="checkbox" onclick="markCheckboxClick()" id="' + data[i].Id + '" name="mglist" /><label for="' + data[i].Id + '"></label></div>';
			var time = data[i].Time.slice(0, 10);
			html += '<li class="fix"><div>' + myCheckbox + '<span class="">' + data[i].Name + '</span><span class="fr">' + time + '</span></div><p>' + data[i].Creator + '</p></li>';
		}
	} else {
		html = '<span>没有标注数据，请创建标注重新获取</span>';
	}
	markList.append(html);
}

//
function markCheckboxClick(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	var ullen = $('.manage_circle_mainUl').children().length;

	target = $(target);
	if(target.is(':checked')) {
		if(Top_circlenum < 30) {
			Top_circlenum++;
			if(Top_circlenum == 30) {
				$('.Top_inputdivall').addClass('userall_selected');
			} else if(Top_circlenum == ullen) {
				$('.Top_inputdivall').addClass('userall_selected');

			}
			$('.Topcircle_total').html(Top_circlenum);
		} else {
			$('.Top_inputdivall').addClass('userall_selected');
			showAlert('最多勾选30个成员');
			return;
		}
		target.prop("checked", true);
		// target.next('label').css({'background-color': '#2bbf5d', 'border-color': '#2bbf5d'});
		target.next('label').addClass('label-bg');

	} else {
		if(Top_circlenum == 30) {
			Top_circlenum--;
			$('.Topcircle_total').html(Top_circlenum);
			$('.Top_inputdivall').removeClass('userall_selected');
		} else {
			Top_circlenum--;
			$('.Topcircle_total').html(Top_circlenum);
			$('.Top_inputdivall').removeClass('userall_selected');
		}

		target.prop("checked", false);
		// target.next('label').css({'background-color': '#ffffff', 'border-color': '#9a9a9a'});
		target.next('label').removeClass('label-bg');
	}
}

//加载更多
function markerListLoadmoreFn() {
	$('.markerListLoadmoreBtn').hide();
	$('.markerListLoadmoreImg').show();

	if(mgIndex == mgTotal - 1) return;
	mgIndex = mgIndex < mgTotal - 1 ? mgIndex + 1 : mgIndex;
	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {

			if(ret.Result == 200) {
				markListShow(ret.Marks, ret.PageTotalCount);
			} else {
				showAlert('标注加载失败！');
				$('.markerListLoadmoreBtn').show();
				$('.markerListLoadmoreImg').hide();;
			}
		}
	)
}

//取消管理标注
function manageMarkerCel() {
	$('.monitor_label_user').hide();
	mgIndex = 0;
}

//批量删除管理标注
function manageMarkerDel() {
	var list = document.getElementsByName('mglist');
	var arr = [];

	for(var i = 0, len = list.length; i < len; i++) {
		if(list[i].checked == true) {
			arr.push(list[i].id);
		}
	}
	if(arr.length === 0) {
		return showAlert('请选择标注！')
	}
	var arr1 = JSON.stringify(arr);
	var body = '{"Code":10801,"Body":{"SessionId":"' + sessionId + '","MarkIds":' + arr1 + '}}';
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			// console.log(JSON.stringify(ret))
			$('.cover_loading').hide();
			if(ret.Result == 200) {
				if(isMarker == true) {
					isMarker = false;
					deleteMarkItem(arr);			//后台数据库删除之后得从markArray中剔除，再进行getAllMarksData方法调用。
					getAllMarksData();
				}
				// manageMarker();
				refreshMarkerList(arr);
				showAlert('删除成功');
			} else {
				showAlert('删除失败');
			}
		}
	);
}
//在后台批量删除和删除标注后，同步删除markArray
function deleteMarkItem(arr){
	for(var j = 0;j<arr.length; j++){
		for( i =0;i<markArray.length;i++){
			var item = markArray[i];
			if(item.Id == arr[j]){
				markArray.splice(i,1);
				break;
			}
		}
	}
}
function updateMarkArray(item){
	for(var i = 0 ;i<markArray.length;i++){
		var item1 = markArray[i];
		if(item.Id == item1.Id){
			item1.Name = item.Name;
			item1.Detail = item.Detail;
			break;
		}
	}
}
function refreshMarkerList(data) {
	// var ul = $('#markList');
	if(data.length > 0) {
		data.forEach(function(item) {
			$('#' + item).parents('li').remove();
		})
	}
}

//首页
// function magIndex() {
// 	if (mgIndex == 0) return;
// 	mgIndex = 0;
// 	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			console.log(JSON.stringify(ret));
// 			if (ret.Result == 200) {
// 				mgTotal = ret.PageTotalCount;
// 				markListShow(ret.Marks);

// 			} else {
// 				showAlert('标注加载失败！');
// 				$('#markList').text('没有数据');
// 			}
// 		}
// 	)
// }

//上一页
// function mgPreve() {
// 	if (mgIndex == 0) return;
// 	mgIndex = mgIndex > 0 ? mgIndex - 1 : 0;
// 	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			console.log(JSON.stringify(ret));
// 			if (ret.Result == 200) {
// 				mgTotal = ret.PageTotalCount;
// 				markListShow(ret.Marks);

// 			} else {
// 				showAlert('标注加载失败！');
// 				$('#markList').text('没有数据');
// 			}
// 		}
// 	)
// }

//下一页
// function mgNext() {
// 	if (mgIndex == mgTotal - 1) return;
// 	mgIndex = mgIndex < mgTotal - 1 ? mgIndex + 1 : mgIndex;
// 	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			console.log(JSON.stringify(ret));
// 			if (ret.Result == 200) {
// 				mgTotal = ret.PageTotalCount;
// 				markListShow(ret.Marks);

// 			} else {
// 				showAlert('标注加载失败！');
// 				$('#markList').text('没有数据');
// 			}
// 		}
// 	)
// }

//尾页
// function mgLast() {
// 	if (mgIndex == mgTotal - 1) return;
// 	mgIndex = mgTotal - 1;
// 	var body = '{"Code":10803,"Body":{"SessionId":"' + sessionId + '","Creator":"' + loginId + '","Key":"","PageSize":' + mgPsize + ',"PageIndex":' + mgIndex + '}}';

// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 			console.log(JSON.stringify(ret));
// 			if (ret.Result == 200) {
// 				mgTotal = ret.PageTotalCount;
// 				markListShow(ret.Marks);

// 			} else {
// 				showAlert('标注加载失败！');
// 				$('#markList').text('没有数据');
// 			}
// 		}
// 	)
// }

//百度地图路况
var baiduLukuang = false;
var timerTrafficControl = 900;

function mapTrafficControl() {
	clearTimeout(timerTrafficControl);
	timerTrafficControl = setTimeout(function(){
    baiduLukuang =!baiduLukuang;
	if (baiduLukuang) {
		$('.icon_attr12').attr('src','img/icon/map/map_traffic1.png');
	} else {
		$('.icon_attr12').attr('src','img/icon/map/map_traffic.png');
	}
	$('#tcBtn').click();
   },900);
}


//百度地图测距

var isMyDis = false;

function mapDistance() {
	drawPictureMap('juli');
	isMyDis = !isMyDis
	if(isMyDis) {
		showAlert('双击鼠标左键取消测距！');
		myDis.open();
		$('.icon_attr9').attr('src', 'img/icon/map/map_distance1.png')
		myDis.addEventListener('drawend', polygonAreacomplete1)
	} else {
		myDis.close();
		$('.icon_attr9').attr('src', 'img/icon/map/map_distance.png')
	}
}

function polygonAreacomplete1() {
	$('.icon_attr9').attr('src', 'img/icon/map/map_distance.png');
	isMyDis = !isMyDis
}

//----------圈选-------------/////(2017.7.24合雨)
var circle_is = false;
var circle_ming = null;

function circle_talk() {
	// myDis.close();
	drawPictureMap('quanxuan');
	circle_is = !circle_is;
	var styleOptions = {
		strokeColor: "red", //边线颜色。
		fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
		strokeWeight: 2, //边线的宽度，以像素为单位。
		strokeOpacity: 0.6, //边线透明度，取值范围0 - 1。
		fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
		strokeStyle: 'solid' //边线的样式，solid或dashed。
	}
    Map_Lineclear();
	//添加鼠标绘制工具监听事件，用于获取绘制结果
	if(circle_is) {
		circle_ming = new BMapLib.CircleTool(map, {
			drawingType: BMAP_DRAWING_CIRCLE,
			isOpen: false, //是否开启绘制模式
			circleOptions: styleOptions, //圆的样式
			enableCalculate: false //是否显示面积
		})

		circle_ming.addEventListener('circlecomplete', function(e, circle) {
			circle_ming.close();
			$('.icon_attr3').attr('src', 'img/icon/title1.png');
			circle_is = !circle_is;
			circle_User=circle;
			circleOnlineUsersSelect(circle);
		})
		//启用插件
		circle_ming.open();
		$('.icon_attr3').attr('src', 'img/icon/map/title2.png')
	} else {
		circle_ming.close();
		$('.icon_attr3').attr('src', 'img/icon/title1.png')
	}
}

function drawPictureMap(str) {
	//圈选
	if(str != 'quanxuan') {
		if(circle_ming) {
			circle_ming.close();
			$('.icon_attr3').attr('src', 'img/icon/title1.png');
			circle_is = false;
		}
	}
	//标注
	if(str != 'biaozhu') {
		if(drawingMark) {
			drawingMark.close();
			drawingMark.addEventListener('overlaycomplete', overlaycomplete);
			$('.rotate icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');
			isCreatimg = false;
		}
		$('.annotate_div').hide();
		$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');
	}
	//测距
	if(str != 'juli') {
		if(myDis) {
			myDis.close();
			$('.icon_attr9').attr('src', 'img/icon/map/map_distance.png');
			isMyDis = false;
		}
	}
	//测面积
	if(str != 'mianji') {
		if(stationDrawingArea) {
			stationDrawingArea.close();
			$('.icon_attr10').attr('src', 'img/icon/map/map_area.png');
			stationDrawingArea.removeEventListener('overlaycomplete', polygonAreacomplete);
			isDrawingArea = false;
		}
	}

	if(str != 'luxian') {
		$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
		$('.qzName').hide();
	}

	if(str != 'sousuo') {
		$('.map_icon_choose_input').hide();
		$('.icon_attr8').attr("src", "img/icon/map/map_search.png");
	}

	if(str != 'jiankong') {
		$('.monitor_div').hide();
		$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
	}

	if(str != 'suoding') {
		$('.map_icon_lock').hide();
		$('.icon_attr4').attr('src', 'img/icon/lock.png');
	}

	// if (str != 'lukuang') {
	// 	baiduLukuang = true;
	// 	mapTrafficControl();
	// 	$('.icon_attr12').attr('src','img/icon/map/map_traffic.png');
	// }
}

function circleOnlineUsersSelect(circle) {
	var markIncircle = [];
	var circleredia = circle.getRadius();
	var centerPoint = circle.getCenter();

	if(!monitorMark) {
		var onlineMarkers = onlineUsersMarkers.values();
		//var onlineMarkers = AllUsersMarkers.values();
		console.log(JSON.stringify(AllUsersMarkers));
		for(var i = 0, len = onlineMarkers.length; i < len; i++) {
			var point = onlineMarkers[i].getPosition();
			var distance = (map.getDistance(point, centerPoint)).toFixed(2);
			
			if(distance < circleredia) {
				markIncircle.push(onlineMarkers[i]);
			}
		}
		

	} else {
		SelectSomeUsers();
		var onlineMarkers = AllUsersMarkers.values();
		for(var i = 0, len = onlineMarkers.length; i < len; i++) {
			var point = onlineMarkers[i].getPosition();
			var distance = (map.getDistance(point, centerPoint)).toFixed(2);
			
			if(distance < circleredia) {
				markIncircle.push(onlineMarkers[i]);
			}
		}
//		var monitor = jianKongMarkers.values();
//		var key = jianKongMarkers.keySet();
//		monitor.forEach(function(item) {
//			var uid = item.getTitle();
//			if(onlineInfo.containsKey(uid)) {
//				var point_monitor = item.getPosition();
//				var point_distance = (map.getDistance(point_monitor, centerPoint)).toFixed(2);
//				if(point_distance < circleredia) {
//					markIncircle.push(item);
//				}
//			}
//		})
	}
	// map.removeOverlay(circle);
	circleOnlineUsersChat(markIncircle);
}

function circleOnlineUsersChat(markArr) {
	var html = '';
	if(markArr.length > 0) {
		for(var i = 0, len = markArr.length; i < len; i++) {
			var uid = markArr[i].getTitle();
			var userinfo = userInfos.get(uid);
			var myCheckbox = '<div class="squaredbox fl"><input class="choBox" onclick="markCheckboxClick()" name="user_circle" uid="' + uid + '" type="checkbox" id="' + uid + 'q" /><label for="' + uid + 'q"></label></div>';
			// var phone = userinfo.Phone ? '(' + userinfo.Phone + ')' : '';
			html += '<li class="fix"  username="' + userinfo.Name + '">' + myCheckbox + '<span class="fl only_one" title="' + uid + '">' + userinfo.Name + '(' + uid + ')</span></li>';
		}
	} else {
		html = '<li style="text-align:center; border:none;">此区域内没有用户！</li>';
	}
	$('.Topcircle_total').html(0);
	Top_circlenum = 0;
	$('.Top_inputdivall').removeClass('userall_selected');
	$('.manage_circle_mainUl').empty().append(html);
	$('.manage_circle').show();
	$('.manage_monite_user').hide();
	$('.monitor_label_user').hide();
	// $('.Top_inputdivall').click();
}

//圈选创建会话
function circleCreateChat() {
	map.removeOverlay(circle_User);
	var ul = $('.manage_circle_mainUl>li');
	var members = [];

	members.push(loginId);
	// var len = 0;
	var nameCollect = [];
	ul.each(function() {
		var check = $(this).find('input');
		if(check.prop('checked')) {
			// len+=1;
			nameCollect.push($(this).attr('username'));
			members.push(check.attr('uid'));
		}
	})
	var len = nameCollect.length;
	var LENGTH = 4;
	var chatName = '';
	// ul.each(function(i) {
	// 	var check = $(this).find('input');
	// 	var id = check.attr('uid');

	// 	if (check.prop('checked')) {
	// 		if (len <= LENGTH) {
	//             if (i < len-1) {
	//                 chatName += $(this).attr('username') + ',';
	//             } else if (i == len-1) {
	//                 chatName += $(this).attr('username');
	//             }
	//         } else {
	//             if (i < LENGTH - 1) {
	//                 chatName += $(this).attr('username') + ',';
	//             } else if (i == LENGTH - 1) {
	//                 chatName += $(this).attr('username');
	//             }
	//         }

	//         members.push(id);
	//        }
	// });

	nameCollect.forEach(function(item, i) {
		if(len <= LENGTH) {
			if(i < len - 1) {
				chatName += item + ',';
			} else if(i == len - 1) {
				chatName += item;
			}
		} else {
			if(i < LENGTH - 1) {
				chatName += item + ',';
			} else if(i == LENGTH - 1) {
				chatName += item;
			}
		}
	})

	if(members.length === 1) {
		return showAlert('请选择用户！');
	}

	// var adduserinfo = usersAll.get(members[1]);
	// name = adduserinfo ? name + ',' + adduserinfo.Name : name + ',' + members[1];
	members = JSON.stringify(members);
	var name1 = encodeURI(encodeURI(chatName));
	var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + name1 + '","Members":' + members + ',"Match":1}}';
	coverShow();
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		// console.log(ret)
		$('.cover_loading').hide();
		if(ret.Result === 200) {
			var cid = ret.ConversationId;
			var obj = {};
			obj.Id = cid;
			obj.Name = chatName;
			obj.Creator = loginId;
			callInId = cid;
			callInName = chatName;
			createSnapChatSuccessed(obj, cid);
			circle_close2();
		} else {
			showAlert('创建会话失败！');
		}
	})
}

function createSnapChatSuccessed(obj, callInId) {
	var pushed = arrobjContainsElement(callArrList, obj.Id, 'Id');
	if(!pushed) {
		callArrList.unshift(obj);
		var containers = '<li id="' + obj.Id + '" name="' + loginId + '"  tellname="' + obj.Name + '"><div onclick="channeltelllevel2(this)"><i title="' + obj.Name + '">' + obj.Name + '</i><img src="img/icon/channel/channel_select.png" class="fr"alt="" /></div><ul class="channel_level2"></ul></li>';
		$('.channel_main_tell .channel_level1').prepend(containers);
		// toTheChannel(importChatHtml);
		chatCallInHandle(callInId, 0, 1);
	} else {
		var type;

		for(var i = 0, len = callArrList.length; i < len; i++) {
			if(callArrList[i].Id === callInId) {
				type = callArrList[i].SessionType;
				if(type == 0) {
					callArrList[i].Name = obj.Name;
					chat_reset_name(callInId, obj.Name);
				}
				break;
			}
		}

		var id = $('.chatOpenOnly').attr('id');

		if(id != callInId) {
			chatCallInHandle(callInId, 0, 1);
		} else {
			toTheChannel();
			$('.toChat').trigger('click');

			session_call_make(id, 0);

			// var session = sessionGetById(callInId);
			// if (!session) {
			// 	$('#chatBegincallBtn').trigger('click');
			// }
		}
	}
}

function chat_reset_name(sid, name) {
	var li = $('.channel_main_tell').find('#' + sid);
	var text = li.children('div').children('i');
	li.attr('tellname', name);
	text.attr('title', name).text(name);
	$('.channel_telllevel2name').children('i').text(name).attr('title', name);
}

//点击取消隐藏当前列表
function circle_close() {
	$('.manage_circle').hide();
	// $('path').hide(); //圈选消失
	// circle_is = !circle_is
	map.removeOverlay(circle_User);
	$('.icon_attr3').attr('src', 'img/icon/title1.png')
}

function circle_close2() {
	$('.manage_circle_talk').hide();
	$('.manage_circle').hide();
	$('path').hide();
}

//创建频道会话列表中间部分的高度
$('.manage_circle_talk_main').height($(window).height() - $('.manage_circle_talk_top').outerHeight() - $('.manage_circle_talk_foot2').outerHeight() - 80);

//判断当前有选中情况时 可以创建会话  先创建会话后加判断 
function circle_remove1() {
	//判断
	//	$(".manage_circle_mainUl input").each(function(i,_i){
	//  if($(_i).is(':checked')){
	$('.manage_circle').hide();
	$('.manage_circle_talk').show();
	//  }
	//	});
}

//便利当前选中的用户 进入创建会话页面
// var circleCheckList=$(".manage_circle_mainUl :checked");
// $.each(circleCheckList,function(index,item){
// 		var id=$(item).siblings("span:first").text();
// 		console.log(id);
// 	})

//圈选会话列表上一步
function circle_last() {
	$('.manage_circle_talk').hide();
	$('.manage_circle').show();
}

////////以上(2017.7.24合雨)

//百度地图搜索
function baiduMapSearch() {
	
	function G(searchResultPanel) {
		return document.getElementById(searchResultPanel);
	}

	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input": "suggestId",
			"location": map
		});

	ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if(e.fromitem.index > -1) {
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		value = "";
		if(e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

		setPlace();
	});
	//搜索框输入完毕后的回车事件////以下(2017.7.24合雨)
	$('#suggestId').keydown(function(e) {
		var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));
		var sugVal = $('#suggestId').val();
		if(e.keyCode == 13) {
			//获取列表左右数据然后显示在地图上
			var local = new BMap.LocalSearch(map, {
				renderOptions: {
					map: map
				},
				onSearchComplete: getLocalResult

				// markerOptions:{icon:myIcon}        
			});
			// map.setIcon(icon:myIcon)  
			local.search(sugVal);

			function getLocalResult() {
				// console.log(local.getResults().Br);
				if(Map_SearchMarkerarr.length == 0) {

					Map_SearchMarkerarr = local.getResults().Br;

				} else {

					for(i in Map_SearchMarkerarr) {

						map.removeOverlay(Map_SearchMarkerarr[i].marker);
					}

					Map_SearchMarkerarr = local.getResults().Br;

				}

			}
		}
	});

	function setPlace() {
		var myIcon = new BMap.Icon("img/icon/marker/mapicon.png", new BMap.Size(16, 16));

		function myFun() {
			// var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
			// var marker = new BMap.Marker(pp, {
			// 	icon: myIcon
			// });

			// map.centerAndZoom(pp, 18);
			// map.addOverlay(marker); //添加标注
			// var label = new BMap.Label(myValue, {
			// 	offset: new BMap.Size(25, -5)
			// }); //添加标签
			// marker.setLabel(label);
			if(typeof(Map_SearchMarkerarr)=="undefined"){
				Map_SearchMarkerarr = []
			}
			if(Map_SearchMarkerarr.length == 0) {

				Map_SearchMarkerarr = local.getResults().Br;
			} else {

				for(i in Map_SearchMarkerarr) {

					map.removeOverlay(Map_SearchMarkerarr[i].marker);
				}

				Map_SearchMarkerarr = local.getResults().Br;

			}

		}
		var local = new BMap.LocalSearch(map, { //智能搜索
			renderOptions: {
				map: map
			},
			onSearchComplete: myFun
		});
		local.search(myValue);
		// setTimeout(GetMapSearcharr(local),1000);
	}
}
//以上(2017.7.24合雨)
function map_search_close() {

	lxssName();

	if(Map_SearchMarkerarr.length == 0) {

	} else {

		for(i in Map_SearchMarkerarr) {

			map.removeOverlay(Map_SearchMarkerarr[i].marker);
		}
	}

}

// function GetMapSearcharr (local) {

//     var arrmapresult=local.getResults();
// 	    alert(arrmapresult);

// }
//百度地图测算面积
var stationDrawingArea;
var isDrawingArea = false;

function baiduMeasureArea() {
	// myDis.close();
	drawPictureMap('mianji');
	isDrawingArea = !isDrawingArea;

	if(isDrawingArea) {
		showAlert('双击鼠标左键取消测算面积！');
		stationDrawingArea = new BMapLib.DrawingManager(map, {
			isOpen: false, //是否开启绘制模式
			enableDrawingTool: false, //是否显示工具栏
			polygonOptions: styleOptions //多边形的样式
		});
		// stationDrawingArea.close();
		stationDrawingArea.open();
		stationDrawingArea.setDrawingMode(BMAP_DRAWING_POLYGON);
		stationDrawingArea.enableCalculate();
		stationDrawingArea.addEventListener('overlaycomplete', polygonAreacomplete);
		$('.icon_attr10').attr('src', 'img/icon/map/map_area1.png');
	} else {
		stationDrawingArea.close();
		$('.icon_attr10').attr('src', 'img/icon/map/map_area.png');
		stationDrawingArea.removeEventListener('overlaycomplete', polygonAreacomplete);
		// stationDrawingArea = null;
	}
}

var polygonAreacomplete = function(e) {
	var overlay = e.overlay;
	var label = e.label;
	var myIcon = new BMap.Icon("img/chat/map_bgimg.png", new BMap.Size(12, 12));
	var point = overlay.getPath()[0];
	var close = new BMap.Marker(point, {
		icon: myIcon
	});
	$('.icon_attr10').attr('src', 'img/icon/map/map_area.png');
	isDrawingArea = !isDrawingArea;
	map.addOverlay(close);
	close.addEventListener('click', function(e) {
		map.removeOverlay(overlay);
		map.removeOverlay(label);
		map.removeOverlay(this);

	})
}

////////////////////////打印(2017.7.24合雨)//////////////////////////////////
// var sendLng;
// var sendLat;
function dygn() {
    var map1; 
	var sendLngLast;
	var sendLatLast;

    $('.stamp_foot').empty();
    $('.stamp_foot').append('<a class="stampMap" onclick="preview(1)">打印</a>');
    $('.stamp_foot').append('<a class="makeImg" >生成图片</a>');
	$('.icon_attr13').attr('src', 'img/icon/map/map_print1.png')
	$('#light').css('display', 'block');
	$('#fade').css('display', 'block');
	var sendLng = map.getCenter().lng;
	var sendLat = map.getCenter().lat;
	//保存坐标到localstorage
	localStorage.setItem("centerLng", sendLng);
	localStorage.setItem("centerLat", sendLat);
	sendLngLast = localStorage.getItem("centerLng");
	sendLatLast = localStorage.getItem("centerLat");
	map1 = new BMap.Map("allmap1");
	//var center=map.getCenter().lng+','+map.getCenter().lat;
	var zoomlist = $('.icon_attr13 ').attr('zoom');
	if(zoomlist == undefined) {
		zoomlist = 11;
	}
	map1.centerAndZoom(new BMap.Point(sendLngLast, sendLatLast), zoomlist);
	map1.enableScrollWheelZoom(true);

	$('.close_light').click(function() {
		printDie()
	});

	$(".makeImg").click(function(){
		if(map1=='' || map1 == 'undefined' )
	    {
	      return ;
	     }

	    var center=map1.getCenter().lng+','+map1.getCenter().lat;
	    var zoom=map1.getZoom();
	    var staticWith=855;
	    var staticHeight = 460;
	    var staticmapstr= 'http://api.map.baidu.com/staticimage?center='+center+'&zoom='+zoom+'&width='+staticWith+'&height='+staticHeight;
	    window.open(staticmapstr);
	     
	});
		
}


function printDie() {
	$('#light').css('display', 'none');
	$('#fade').css('display', 'none');
	$('.icon_attr13').attr('src', 'img/icon/map/map_print.png')
}

//打印
function preview(oper) {
	$('#light').css('display', 'none');
	$('#fade').css('display', 'none');
	$("#allmap1").printArea();
	$('.icon_attr13').attr('src', 'img/icon/map/map_print.png')
}

// 路线规划
// 搜索输入的名字以及点击选中地址返回输入框

function lxssName() {

	drawPictureMap('luxian');

	function GG(searchResultPanel2) {
		return document.getElementById(searchResultPanel2);
	}
	var qdss = new BMap.Autocomplete( //给起点建立一个自动完成的对象
		{
			"input": "qdName_input",
			"location": map
		});
	var zdss = new BMap.Autocomplete( //给终点建立一个自动完成的对象
		{
			"input": "zdName_input",
			"location": map
		});

	qdss.addEventListener("onhighlight", function(e) { //起点鼠标放在下拉列表上的事件
		//起点抵满底部出现滚动条
		var ht = $(window).height() - 180 + "px";
		$('#tangram-suggestion--TANGRAM__2k-main div').css({
			'height': ht,
			'overflow-y': 'scroll',
			'max-height': '320px'
		});

		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if(e.fromitem.index > -1) {
			value = _value.city + _value.street;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		value = "";
		if(e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.city + _value.street;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		GG("searchResultPanel2").innerHTML = str;
	});
	zdss.addEventListener("onhighlight", function(e) { //终点鼠标放在下拉列表上的事件
		//终点下拉列表抵满底部时出现滚动条
		var ht = $(window).height() - 180 + "px";
		$('#tangram-suggestion--TANGRAM__33-main div').css({
			'height': ht,
			'overflow-y': 'scroll',
			'max-height': '320px'
		});

		var _value = e.fromitem.value;
		var value = "";
		if(e.fromitem.index > -1) {
			value = _value.city + _value.street;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		value = "";
		if(e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.city + _value.street;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		GG("searchResultPanel2").innerHTML = str;
	});

	var myValue;
	qdss.addEventListener("onconfirm", function(e) { //起点鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.city + _value.street;
		GG("searchResultPanel2").innerHTML = "onconfirm<br/>index = " + e.item.index + "<br/>myValue = " + myValue;
		$("#zdName_input").focus();
		// var qdName_input_val=$('#qdName_input').val();
		// $('.qdName').html(qdName_input_val)=;
		// $('#qdName_input').val()='';
	});
	zdss.addEventListener("onconfirm", function(e) { //终点鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.city + _value.street;
		GG("searchResultPanel2").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		qzdlx();
	});
	//起点终点输入框不为空的时候显示 公交驾车面板并执行样式
	function qzdlx() {
		if(($("#qdName_input").val() != "") && ($("#zdName_input").val() != "")) {
			$('.gjjc').show();
			$('.gjjc_top div').css({
				'color': '#000',
				'border-bottom': '1px solid #e2e1df'
			})
			$('.gjjc_top_gj').css({
				'color': '#fa8a0c',
				'border-bottom': '1px solid #fa8a0c'
			})
			$('.gjjc_main div').css('color', '#000');
			$(".DtjLine").css('color', '#fa8a0c');
			tjLine_click();
			twoZdClick();

		}
	}
	//二次输入终点后点击下拉列表的事件
	function twoZdClick() {
		$('.gjjc_top div').css({
			'color': '#000',
			'border-bottom': '1px solid #e2e1df'
		})
		$('.gjjc_top_gj').css({
			'color': '#fa8a0c',
			'border-bottom': '1px solid #fa8a0c'
		})
		$('.gjjc_DriveMain').hide();
		$('.gjjc_main').show();
		$('.gjjc_main div').css('color', '#000');
		$(".tjLine").css('color', '#fa8a0c');
	}

	//起终点点击事件
}

function luxianCloseFn() {

	// lxssName();
	$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
	$('.qzName').hide();
	$('.qdName_input').val('');
	$('.zdName_input').val('');
	$('path').hide();
	$('.gjjc').hide();
	
	reloadMapShow();
	centerMap();
}

function reloadMapShow() {
	//MAP_TYPE
	map.clearOverlays();
	AllUsersMarkers.clear();
	onlineUsersMarkers.clear();
	jianKongMarkers.clear();
	markerArr = [];
	showMapInfo();
}

function showMapInfo() {
	
	if(!monitorMark && onlineUsersMarkers.isEmpty()) {
		onlineMapappear(onlineInfo.keySet());
	} else {
		if(jianKongMarkers.isEmpty() && mapMonitorUser.length>0) {
			monitorUsersGet(monitorUsersInit);
		}
	}
	
    if(markerArr.length == 0){
    	 //drawAllMarks();
    	 drawMarks();
    }
    
	
}

//点击路线图标
function lxNameShow() {
	lxssName();
	if($('.qzName').is(':hidden')) {
		$('.icon_attr11').attr('src', 'img/icon/map/map_line1.png');
		$('.qzName').show();

		$('.annotate_div').hide();
		$('.icon_attr6').attr('src', 'img/icon/map/map_Annotate.png');

		$('.map_icon_choose_input').hide();
		$('.icon_attr8').attr("src", "img/icon/map/map_search.png");

		$('.monitor_div').hide();
		$('.map_icon_lock').hide();
		$('.icon_attr1').attr('src', 'img/icon/map/map_monitor1.png');
	} else {

		$('.icon_attr11').attr('src', 'img/icon/map/map_line.png');
		$('.qzName').hide();
		$('.qdName_input').val('');
		$('.zdName_input').val('');
		$('path').hide();
		$('.gjjc').hide();
		if($('.BMap_Marker').css('background-img') === 'http://api0.map.bdimg.com/images/blank.gif') {
			$('.BMap_Marker').hide()
		}
	}

	//替换起终点内容
	//input的value是否为空 为空则不显示删除按钮 有值则显示删除按钮
	$("#qdName_input").keydown(function() {
		if($(".qdName").html() != "") {
			$(".qdName_colse").show();
		}
	});
	$("#zdName_input").keydown(function() {
		if($(".zdName").html() != "") {
			$(".zdName_close").show();
		}
	});

}

//删除输入的内容
function close_qdName() {
	qdName_input.value = '';
	$(".qdName_input").focus();
	$('.qdName_colse').css('display', 'none');
}

function close_zdName() {
	zdName_input.value = '';
	$(".zdName_input").focus();
	$('.zdName_close').css('display', 'none');
}

var start_gjjc = ''; //起点
var end_gjjc = ''; //终点
//替换起终点名称
function thName_click() {
	//点击按钮 终点input获取焦点
	var  temp1  =  $("#qdName_input").val();
	var  temp2  =  $("#zdName_input").val();
	$("#qdName_input").val(temp2);
	$("#zdName_input").val(temp1);
	$('#tangram-suggestion--TANGRAM__32-main').css('display', 'none');
	$('#tangram-suggestion--TANGRAM__2j-main').css('display', 'none');
	tjLine_click();
}

//驾车票价
function yyy(rs) {
	var myDate = new Date(); //时间实例
	var H = myDate.getHours(); //获取小时
	var M = myDate.getMinutes(); //获取分钟
	var S = myDate.getSeconds(); //获取秒
	var MS = myDate.getMilliseconds(); //获取毫秒
	//计算毫秒
	var milliSeconds = H * 3600 * 1000 + M * 60 * 1000 + S * 1000 + MS;
	if(21600000 <= MS <= 79200000) {
		//alert("当前时间的毫秒数为：" + milliSeconds+'白天时间');
		$('#taxi_Fare').html('打车约为' + rs.taxiFare.day.totalFare + '元');
	} else {
		//alert("当前时间的毫秒数为：" + milliSeconds+'晚上时间');
		$('#taxi_Fare').html('打车约为' + rs.taxiFare.night.totalFare + '元');
	}
}

//公交点击
function gjjc_gj_click() {
	$('#taxi_Fare').html('');
	$('.gjjc_top div').css({
		'color': '#000',
		'border-bottom': '1px solid #e2e1df'
	});
	$('.gjjc_top_gj').css({
		'color': '#fa8a0c',
		'border-bottom': '1px solid #fa8a0c'
	});
	$('.gjjc_main').css('display', 'block');
	$('.gjjc_DriveMain').css('display', 'none');
	tjLine_click();
}
//驾车点击
function gijc_jc_click() {
	$('#taxi_Fare').html('');
	$('.gjjc_top div').css({
		'color': '#000',
		'border-bottom': '1px solid #e2e1df'
	});
	$('.gjjc_top_jc').css({
		'color': '#fa8a0c',
		'border-bottom': '1px solid #fa8a0c'
	});
	$('.gjjc_main').css('display', 'none');
	$('.gjjc_DriveMain').css('display', 'block');
	DtjLine_click();
}

//公交的四个选项
//推荐
function tjLine_click() {
	
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
    //公交 面板显示
	var transit = new BMap.TransitRoute(map, {
		renderOptions: {
			map: map,
			panel: 'ajjc_foot'
		},
		policy: 0,
	});
	var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING];
	var qd = $('#qdName_input').val();
	var zd = $('#zdName_input').val();
	$('.gjjc_main div').css('color', '#000');
	$(".tjLine").css('color', '#fa8a0c');
	start_gjjc = $('.qdName_input').val();
	end_gjjc = $('.zdName_input').val();
	search(start_gjjc, end_gjjc, routePolicy[1]);

	function search(start_gjjc, end_gjjc, route) {
		transit.setPolicy(route);
		transit.search(start_gjjc, end_gjjc);
	}
	//票价
	$.ajax({
		type: "GET",
		url: "http://api.map.baidu.com/direction/v1?mode=transit&origin=" + qd + "&destination=" + zd + "&region=北京&output=json&ak=4PKEQGxuunRRkxMkGiG9tU5gpceUtF4e",
		dataType: 'jsonp',
		processData: false,
		async: false,
		success: function(data) {
			if((data.result.routes[0].scheme[0].price) < 0) {
				$('#taxi_Fare').html('');
				$('#taxi_Fare').hide();
			} else {
				$('#taxi_Fare').html('票价约为' + (data.result.routes[0].scheme[0].price) / 100 + '元');
				$('#lll').val((data.result.routes[0].scheme[0].price) / 100 + '元');
			}
		}
	});

}

//时间最少
function sjdLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	//公交 面板显示
	var transit = new BMap.TransitRoute(map, {
		renderOptions: {
			map: map,
			panel: 'ajjc_foot'
		},
		policy: 0,
	});
	var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING];
	var qd = $('#qdName_input').val();
	var zd = $('#zdName_input').val();
	$('.gjjc_main div').css('color', '#000');
	$(".sjdLine").css('color', '#fa8a0c');
	start_gjjc = $('.qdName_input').val();
	end_gjjc = $('.zdName_input').val();
	search(start_gjjc, end_gjjc, routePolicy[1]);

	function search(start_gjjc, end_gjjc, route) {
		transit.setPolicy(1);
		transit.search(start_gjjc, end_gjjc);
	}
	//票价
	$.ajax({
		type: "GET",
		url: "http://api.map.baidu.com/direction/v1?mode=transit&origin=" + qd + "&destination=" + zd + "&region=北京&output=json&ak=4PKEQGxuunRRkxMkGiG9tU5gpceUtF4e",
		dataType: 'jsonp',
		processData: false,
		async: false,
		success: function(data) {
			if((data.result.routes[0].scheme[0].price) <= 0) {
				$('#taxi_Fare').html('');
				$('#taxi_Fare').hide();
			} else {
				$('#taxi_Fare').html('票价约为' + (data.result.routes[0].scheme[0].price) / 100 + '元');

				$('#lll').val((data.result.routes[0].scheme[0].price) / 100 + '元');
			}
		}
	});
}

//最少换乘
function shcLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	//公交 面板显示
	var transit = new BMap.TransitRoute(map, {
		renderOptions: {
			map: map,
			panel: 'ajjc_foot'
		},
		policy: 0,
	});
	var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING];
	var qd = $('#qdName_input').val();
	var zd = $('#zdName_input').val();
	$('.gjjc_main div').css('color', '#000')
	$(".shcLine").css('color', '#fa8a0c');
	start_gjjc = $('.qdName_input').val();
	end_gjjc = $('.zdName_input').val();
	search(start_gjjc, end_gjjc, routePolicy[2]);

	function search(start_gjjc, end_gjjc, route) {
		transit.setPolicy(2);
		transit.search(start_gjjc, end_gjjc);
	}
	//票价
	$.ajax({
		type: "GET",
		url: "http://api.map.baidu.com/direction/v1?mode=transit&origin=" + qd + "&destination=" + zd + "&region=北京&output=json&ak=4PKEQGxuunRRkxMkGiG9tU5gpceUtF4e",
		dataType: 'jsonp',
		processData: false,
		async: false,
		success: function(data) {
			if((data.result.routes[2].scheme[0].price) <= 0) {
				$('#taxi_Fare').html('');
				$('#taxi_Fare').hide();
			} else {
				$('#taxi_Fare').html('票价约为' + (data.result.routes[2].scheme[0].price) / 100 + '元');

				$('#lll').val((data.result.routes[2].scheme[0].price) / 100 + '元');
			}
		}
	});
}

//最少步行
function sbxLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	//公交 面板显示
	var transit = new BMap.TransitRoute(map, {
		renderOptions: {
			map: map,
			panel: 'ajjc_foot'
		},
		policy: 0,
	});
	var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING];
	var qd = $('#qdName_input').val();
	var zd = $('#zdName_input').val();
	$('.gjjc_main div').css('color', '#000')
	$(".sbxLine").css('color', '#fa8a0c');
	start_gjjc = $('.qdName_input').val();
	end_gjjc = $('.zdName_input').val();
	search(start_gjjc, end_gjjc, routePolicy[3]);

	function search(start_gjjc, end_gjjc, route) {
		transit.setPolicy(3);
		transit.search(start_gjjc, end_gjjc);
	}
	//票价
	$.ajax({
		type: "GET",
		url: "http://api.map.baidu.com/direction/v1?mode=transit&origin=" + qd + "&destination=" + zd + "&region=北京&output=json&ak=4PKEQGxuunRRkxMkGiG9tU5gpceUtF4e",
		dataType: 'jsonp',
		processData: false,
		async: false,
		success: function(data) {
			if((data.result.routes[0].scheme[0].price) <= 0) {
				$('#taxi_Fare').html('');
				$('#taxi_Fare').hide();
			} else {
				$('#taxi_Fare').html('票价约为' + (data.result.routes[0].scheme[0].price) / 100 + '元');
			}
		}
	});
}

//驾车的四个选项推荐 
function DtjLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	var routePolicyDrive = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
	$('.gjjc_DriveMain div').css('color', '#000')
	$(".DtjLine").css('color', '#fa8a0c');
	$('#taxi_Fare').show();
	search(start_gjjc, end_gjjc, routePolicyDrive[1]);

	function search(start_gjjc, end_gjjc, route) {
		var driving = new BMap.DrivingRoute(map, {
			onSearchComplete: yyy,
			renderOptions: {
				map: map,
				panel: 'ajjc_foot',
				autoViewport: true
			},
			policy: 0
		});
		driving.setPolicy(1);
		driving.search(start_gjjc, end_gjjc);
	}
}

//最短时间
function DsjdLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	var routePolicyDrive = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
	$('.gjjc_DriveMain div').css('color', '#000')
	$(".DsjdLine").css('color', '#fa8a0c');
	$('#taxi_Fare').show();
	search(start_gjjc, end_gjjc, routePolicyDrive[0]);

	function search(start_gjjc, end_gjjc, route) {
		var driving = new BMap.DrivingRoute(map, {
			onSearchComplete: yyy,
			renderOptions: {
				map: map,
				panel: 'ajjc_foot',
				autoViewport: true
			},
			policy: 0
		});
		driving.setPolicy(0);
		driving.search(start_gjjc, end_gjjc);
	}
}

//最短距离
function jldLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	var routePolicyDrive = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
	$('.gjjc_DriveMain div').css('color', '#000')
	$(".jldLine").css('color', '#fa8a0c');
	$('#taxi_Fare').show();
	search(start_gjjc, end_gjjc, routePolicyDrive[1]);

	function search(start_gjjc, end_gjjc, route) {
		var driving = new BMap.DrivingRoute(map, {
			onSearchComplete: yyy,
			renderOptions: {
				map: map,
				panel: 'ajjc_foot',
				autoViewport: true
			},
			policy: 0
		});
		driving.setPolicy(1);
		driving.search(start_gjjc, end_gjjc);
	}
}

//避开高速
function bkgsLine_click() {
	reloadMapShow();
    centerMap();
//  map.clearOverlays();
	var routePolicyDrive = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
	$('.gjjc_DriveMain div').css('color', '#000')
	$(".bkgsLine").css('color', '#fa8a0c');
	$('#taxi_Fare').show();
	search(start_gjjc, end_gjjc, routePolicyDrive[2]);

	function search(start_gjjc, end_gjjc, route) {
		var driving = new BMap.DrivingRoute(map, {
			onSearchComplete: yyy,
			renderOptions: {
				map: map,
				panel: 'ajjc_foot',
				autoViewport: true
			},
			policy: 0
		});
		driving.setPolicy(0);
		driving.search(start_gjjc, end_gjjc);
	}
}

function saveMap() {
	var centerPoint = map.getCenter();
	var lng = centerPoint.lng;
	var lat = centerPoint.lat;
	var zoom = map.getZoom();

	$.cookie('lng' + loginId, lng, {
		expires: 300
	});
	$.cookie('lat' + loginId, lat, {
		expires: 300
	});
	$.cookie('zoom' + loginId, zoom, {
		expires: 300
	});
	if(centerPoint) {
		showAlert('锁定位置成功！');
	}
	$('.map_icon_lock').hide();
}

function centerMap() {
	var centerPoint = $.cookie('center' + loginId);
	var lon_user = parseFloat($.cookie('lng' + loginId));
	var lat_user = parseFloat($.cookie('lat' + loginId));
	var zoom = parseInt($.cookie('zoom' + loginId), 10);
	var point = new BMap.Point(lon_user, lat_user);

	map.centerAndZoom(point, zoom);
	$('.map_icon_lock').hide();
}

function MapSearchs(data, val2) {
	var val;
	if(val2 != undefined) {
		val = '';
	} else {
		val = $(data).val();
	}
	if(val == '') {
		$('#MapUserall').hide();
		$('#jiankong').show();
	} else {
		// $('#jiankong').hide();
		// $('#MapUserall').show();
		// var len = $('#MapUserall').children().length;

		//   for (var i = 0; i < len; i++) {
		//     if ($('#MapUserall').children('li').eq(i).attr('name').indexOf(val) > -1||$('#MapUserall').children('li').eq(i).attr('user').indexOf(val) > -1) {
		//       $('#MapUserall').children('li').eq(i).show();
		//     } else {
		//       $('#MapUserall').children('li').eq(i).hide();
		//     }
		// }
		OnKeySearch(data);
	}
}

function IM_locationMap(lcoalx, localy) {
	if(IM_marker != null) {
		map.removeOverlay(IM_marker);
		IM_marker = null;
	}
	var point = new BMap.Point(lcoalx, localy);
	IM_marker = new BMap.Marker(point);
	map.centerAndZoom(point, 15);
	map.addOverlay(IM_marker);
	IM_marker.setAnimation(BMAP_ANIMATION_BOUNCE);

	// var removeMarker = function(e,ee,IM_marker){
	// 	map.removeOverlay(IM_marker);
	// }
	// var markerMenu=new BMap.ContextMenu();
	// markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(IM_marker)));

	// IM_marker.addContextMenu(markerMenu);
	map.addEventListener("rightclick", function(e) {

		if(IM_marker != null) {
			map.removeOverlay(IM_marker);
			IM_marker = null;
		}

	});
}

function Pulley_map(){
	if(!$('.markerListLoadmoreBtn').text()){
 		return;
 	}
	var Height_gdt=$(".monitor_label_main").scrollTop();
	var Height_div =$(".monitor_label_main")[0].scrollHeight-$(".monitor_label_main").height();
	
	if(Pulley_jilu_map!=Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_jilu_map = Height_gdt;
			markerListLoadmoreFn();
			
		}
	}
	
	
}