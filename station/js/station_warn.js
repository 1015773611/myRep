var Pulley_warn_jishu = 1;
var alert_choose_In = "";
var alert_choose_out = "";
function warm(){
	if(Line!=null||map!=null){
		map.removeOverlay(Line);
	}
	
	//中间内容高度
	var wh = $(window).height();
	$('.alert_border_r').height(wh-MAIN_TOPHT);
  	$('.alert_main').height(wh-MAIN_TOPHT-$('.alert_top_all').outerHeight()-$('.alert_main_footer').outerHeight());
  	$('.alert_level2_main').height($('.alert_border_r').outerHeight()-171);

	// $('.itemwrap1').height(wh - 143);
	$('body').css('margin','0px');
    $('.warn_r').css('margin-left', '80px');
    $('#wallstart').fdatepicker({format: 'yyyy-mm-dd'});
	$('#wallend').fdatepicker({format: 'yyyy-mm-dd'});
   
   
    $('.alert_choose_In').click(function(){
    	if(alert_choose_In==""){
    		$('.alert_choose_In').addClass("background_img");
    		alert_choose_In ="0";
    	}else{
    		$('.alert_choose_In').removeClass("background_img");
    		alert_choose_In ="";
    	}
    })
    $('.alert_choose_out').click(function(){
    	if(alert_choose_out==""){
    		$('.alert_choose_out').addClass("background_img");
    		alert_choose_out ="1";
    	}else{
    		$('.alert_choose_out').removeClass("background_img");
    		alert_choose_out ="";
    	}
    })
   	$('.alert_choose_In_out').click(function(){
   		var src_ = $('.alert_choose_In_out').attr("src");
   		if($('.alert_choose_In_out_div').is(":hidden")){
   			$('.alert_choose_In_out_div').show();
   			$('.alert_choose_In_out').attr("src","img/icon/channel/channel_search2.png");
   		}else{
   			$('.alert_choose_In_out_div').hide();
   			if(alert_choose_In ==""&&alert_choose_out ==""&&arrs_s[arrs_s.length-1]=="alert_date.png"){
				$('.alert_choose_In_out').attr("src","img/icon/channel/channel_search1.png");
			}else{
				$('.alert_choose_In_out').attr("src","img/icon/channel/channel_search2.png");
			}
   		}
   		
   	})
   	//点击日历图标显示日期选项	
	$('.alert_date').click(function (){
        // var top2=$('.alert_main').height();
        var h = $('.alert_level').height();
		if($('.alert_choose_date').is(":hidden")){
			 $('.alert_choose_date').show();
             $('.alert_date>img').attr('src','img/icon/alert/alert_date2.png')
             var h1 = $('.alert_top').outerHeight();
             var h2 = $('.alert_main_footer').outerHeight();
			 // $('.alert_main').height(top2-102);
			 $('.alert_main').height(h - h1 - h2);
             $('.alert_main_date>div:nth-child(1)').css('border-top','1px solid #d1cec9');
		}else{
			$('.alert_choose_date').hide();
            // $('.alert_main').height(top2+102); 
            var h1 = $('.alert_top').outerHeight();
             var h2 = $('.alert_main_footer').outerHeight(); 
             $('.alert_main').height(h - h1 - h2);
            $('.alert_date>img').attr('src','img/icon/alert/alert_date.png');
            $('.alert_main_date>div:nth-child(1)').css('border-top','0px');
		}
	});
	
	$('#wallstart').val(getTodayDate());
	$('#wallend').val(getTodayDate());
	$('.left_icon').css('top', (wh-120)/2);
	
	//二级小按钮
	$('.warn2_btn').on('click', function (){
		$('.alert_alert').hide('slow', function (){
			$('.warn_btn').show();
		})
	});
	setTimeout(function() {warnsGetAllRecord();});// 
}

var warnAllStr = '';
var warnAllNum = 0;
var wtimefrom = '';
var wtimeto = '';
var wpageTotal = 0;
var wpagesize = 30;
var wpageindex = 0;
var clickBar;
var warnings = [];

//获取总告警记录接口
function warnsGetAllRecord(){
	var date = new Date();
	var fenceid = '';
	var uid = "";
//	wtimefrom = date.getFullYear()+'-'+two((date.getMonth() + 1))+'-'+two(date.getDate())+' 00:00:00';
	wtimeto = date.getFullYear()+'-'+two((date.getMonth() + 1))+'-'+two(date.getDate())+' '+two(date.getHours())+':'+two(date.getMinutes())+':' + two(date.getSeconds());
	wtimefrom = "2017-05-01 00:00:00";
	wpageindex = 0;
	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	
	$.getJSON(STATION_URL+'?Body='+body,
		function (ret){
			sideObj['warn'] = '';
			if(ret.Result == 200){
				console.log(ret)
				warnsGotAllRecord(ret, 0);
			}else{
				warnGotAllFail(0);
			}
		}
	)
}

//告警记录获取成功展示
function warnsGotAllRecord(ret, initical){
	wpageTotal = ret.PageTotalCount;

	if (wpageindex < wpageTotal - 1) {
		$('.warnPage').show();
	} else {
		$('.warnPage').hide();
	}

	$('.warnListLoadmoreBtn').show();
	$('.warnListLoadmoreImg').hide();

	var warnbar = $('#warnAllList');
	if (initical === 0) {
		warnbar.empty();
		warnings = [];
		if (ret.Warnings.length == 0) {
			warnbar.append('<span class="warn_nodata">暂无告警数据！</span>')
		}
	}

	warnings = warnings.concat(ret.Warnings);

	warnAllListShow(ret);
	// $('.wpageTotal').text(wpageTotal);
	// $('.wpageNum').text(wpageindex + 1);
}

//告警记录获取失败展示
function warnGotAllFail(initial){
	var warnbar = $('#warnAllList');
	if (initial === 0) {
		warnbar.empty();
		warnbar.append($('<span class="warn_nodata">暂无告警数据！</span>'));
		$('.warnPage').hide();
	}
}

//告警记录ul展示
function warnAllListShow(data){
	var data = data.Warnings;
	var list = $('#warnAllList');
	var content = '';
	var time,type,come,date,uid,readstatus,id;
	
	// $('.warnPage').show();
	
	for(var i=0,len=data.length; i<len; i++){
		time = data[i].Time.slice(11,16);
		type = toStr(data[i].Type);
		date = data[i].Time.slice(0,10);
		if(data[i].Uid==data[i].Name){

           uid = data[i].Uid;

		}else{

		   uid = data[i].Uid+'('+data[i].Name+')';

		}
		id = data[i].Id;
		name = data[i].FenceName;
		come = inOut(type);
		readstatus = data[i].ReadStatus;
		
		if(date !== warnAllStr){
			warnAllStr = date;
			warnAllNum = 1;
		}else{
			warnAllNum = 0;
		}
		
		if(warnAllNum == 1){
			content += '<div class="wallDate">'+warnAllStr+'</div>';
		}
		
		if(readstatus == 0){
			content += '<li id="'+id+'"><a onclick="warnListClick(\''+id+'\', \''+uid+'\')"><div class="fix"><strong class="only_one fl wallContent span_'+i+'" title="'+uid+''+come+''+name+'">'+uid+''+come+''+name+'</strong><span class="fr wallTime">'+time+'</span></div>'+
					   '<p><span class="wallType">'+type+'</span><span style="max-width:170px;" class="wfenceName only_one">'+name+'</span></p></a></li>';
		}else{
			content += '<li id="'+id+'"><a onclick="warnListClick(\''+id+'\', \''+uid+'\')"><div class="fix"><strong class="only_one fl readed-color span_'+i+'" title="'+uid+''+come+''+name+'">'+uid+''+come+''+name+'</strong><span class="fr wallTime">'+time+'</span></div>'+
					   '<p><span class="wallType">'+type+'</span><span style="max-width:170px;" class="wfenceName only_one">'+name+'</span></p></a></li>';	
		}			
	}
	list.append(content);
	warnAllStr = '';
}

function inOut(str){	
	if(str == '禁入'){
		str = '走进';
	}else{
		str = '走出';
	}
	return str;
}

//告警记录时间搜索
function warnAllSearch(){
	var fenceid = '';
	var uid = '';
	var arrs_s = $('.alert_date').children()[0].src.split("/");
	if(arrs_s[arrs_s.length-1]=="alert_date.png"){
		wtimefrom = "2017-05-01";
	}else{
		wtimefrom = $('.wallstart').val();
	}
	Pulley_warn_jishu = 1;
	wtimeto = $('.wallend').val();
	var start = Date.parse(wtimefrom.replace(/-/g, '/'));
	var stop = Date.parse(wtimeto.replace(/-/g, '/'));
	var type_In_Out ="";
	if(alert_choose_In=="0"&&alert_choose_out=="1"){
		type_In_Out =""
	}else if(alert_choose_In=="0"){
		type_In_Out ='"Type":0,';
	}else if(alert_choose_out=="1"){
		type_In_Out ='"Type":1,';
	}
	if (start > stop) {
		return showAlert('开始时间不能大于结束时间');
	}
	wtimefrom = wtimefrom + ' 00:00:00';
	wtimeto = wtimeto + ' 23:59:59';
	wpageindex = 0;
	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\",'+type_In_Out+'"PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	console.log(body)
	$('.alert_choose_In_out_div').hide();
	if(alert_choose_In ==""&&alert_choose_out ==""&&arrs_s[arrs_s.length-1]=="alert_date.png"){
		$('.alert_choose_In_out').attr("src","img/icon/channel/channel_search1.png");
	}else{
		$('.alert_choose_In_out').attr("src","img/icon/channel/channel_search2.png");
	}
   	$('.alert_main').scrollTop(0);
	$.getJSON(STATION_URL+'?Body='+body,
		function (ret){
			if(ret.Result == 200){
				warnsGotAllRecord(ret, 0);
			}else{
				warnGotAllFail(0);
			}
			//$('.alert_date').trigger('click');
		}
	)
}

function Pulley_warn(){
	if($('.warnPage').css("display")=="none"){
		return
	}
	var Height_gdt=$(".alert_main").scrollTop();
	var Height_div =$(".alert_main")[0].scrollHeight-$(".alert_main").height();
	if(Pulley_warn_jishu != Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_warn_jishu = Height_gdt;
			warnListLoadmoreFn();
		}
	}
	
}

function warnListLoadmoreFn() {
	
	$('.warnListLoadmoreBtn').hide();
	$('.warnListLoadmoreImg').show();
	
	var type_In_Out ="";
	if(alert_choose_In=="0"&&alert_choose_out=="1"){
		type_In_Out =""
	}else if(alert_choose_In=="0"){
		type_In_Out ='"Type":0,';
	}else if(alert_choose_out=="1"){
		type_In_Out ='"Type":1,';
	}
	var arrs_s = $('.alert_date').children()[0].src.split("/");
	if(arrs_s[arrs_s.length-1]=="alert_date.png"){
		wtimefrom = "2017-05-01";
	}else{
		wtimefrom = $('.wallstart').val();
	}
	wtimeto = $('.wallend').val();
	wtimefrom = wtimefrom + ' 00:00:00';
	wtimeto = wtimeto + ' 23:59:59';
	console.log("1="+wtimefrom);
	console.log("2="+wtimeto);
	var fenceid = '';
	var uid = "";
	wpageindex = wpageindex<wpageTotal - 1 ? wpageindex+1 : wpageindex;
	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\",'+type_In_Out+'"PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	//var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	
	$.getJSON(STATION_URL+'?Body='+body,
		function (ret){
			if(ret.Result == 200){
				warnsGotAllRecord(ret);
			}else{
				$('.warnListLoadmoreBtn').show();
				$('.warnListLoadmoreImg').hide();
			}
		}
	)	
}


function findWarnById(warnId) {
	var warn = null;
	for (var i = 0; i < warnings.length; i++) {
		if (warnings[i].Id === warnId) {
			warn = warnings[i];
			break;
		}
	}
	return warn;	
}


//list点击事件
function warnListClick(warnId, uid){
	var warn = findWarnById(warnId);
	var name = warn.FenceName;
	var username=warn.Name;
	var type = toStr(warn.Type);
	var str = inOut(type);
	var StartTime = warn.StartTime;
	var StopTime = warn.StopTime;
	var readstatus = warn.ReadStatus;
	var time = warn.Time;
	var m = time.slice(5,7);
	var d = time.slice(8,10);
	var hm = time.slice(11,16);
	var title = $('.wallContent').text();
	var html;
	var theTwo = $('.alert_alert');
	var WarnId=warn.FenceId;
	WarnMapShow(WarnId);
	$('.alert_main_footer2').attr('name',''+username+'');
	$('.alert_main_footer2').attr('uid',''+uid+'');

	
	$('.alert_level2_main').empty();
	$('#warnAllList li').removeClass('active1');
	html = '<div id="boxwarn"><p>围栏告警： '+uid+''+str+''+name+'</p><p>告警时间：'+m+'月'+d+'号   '+hm+'</p><p></p><p>围栏成员设置：'+type+'</p><p>所属围栏：'+name+'</p><p>围栏有效时间：'+StartTime+'-'+StopTime+'</p></div>'
	$('.alert_level2_main').append(html);
	$('.warn_btn').hide();
	theTwo.hide();
	theTwo.show('slow');
	$('.warn_level2_name').text(uid);
	$('#'+ warnId).addClass('active1');
	if(readstatus == 0){
		warnHaveRead(warnId);
		warn.ReadStatus = 1;
	}
}

//设为已读
function warnHaveRead(id){
	var body = '{"Code":10709,"Body":{"SessionId":\"'+sessionId+'\","WarningIds":[\"'+id+'\"]}}';
//	console.log(body)
	$.getJSON(STATION_URL+'?Body='+body,
		function (ret){
			//console.log(JSON.stringify(ret));
			if(ret.Result == 200){
				// $('.span_'+i).addClass('readed-color'); 
				// $('.span_'+i).removeClass('wallContent');
				$('#' + id).find('strong').addClass('readed-color').removeClass('wallContent');
			}
		}
	)		
}

//全部设为已读
function warnAllReaded(){
	var warnId = [];
	var body;
	
	if(!warnings) return;
	for(var i=0,len=warnings.length; i<len; i++){
		if(warnings[i].ReadStatus == 0){
			warnId.push(warnings[i].Id+'');
		}
	}
	
	if(warnId.length !== 0){
		warnId = JSON.stringify(warnId);
		body = '{"Code":10709,"Body":{"SessionId":\"'+sessionId+'\","WarningIds":'+warnId+'}}';
//		console.log(body)
		$('.cover_loading').show();
		$.getJSON(STATION_URL+'?Body='+body,
			function (ret){//console.log(JSON.stringify(ret))
				$('.cover_loading').hide();
				if(ret.Result == 200){
					$('.wallContent').addClass('readed-color');
					showAlert('全部设为已读成功！');
					for(var j=0,leng=warnings.length; j<leng; j++){
						warnings[j].ReadStatus = 1;
					}					
				}else{
					showAlert('全部设为已读失败！');
				}
			}
		)
	}else{
		showAlert('已经全部设为已读，请勿重复操作！')
	}
}

//模糊搜索
function warnAllFuzzySearch () {
	var k = $('#warnAllFuzzySearch').val();
	var ul2 = $('#warnAllList2');
	var ul1 = $('#warnAllList');
	var page = $('.warnPage');
	var result;
	if (k == '+' || k == '[' || k == '(' || k == '\\' || k == '^' || k == '$' || k == '|' || k == ')' || k == '?' || k == '*' || k == '.' || k == ']') {
		$('#warnAllFuzzySearch').val('')
		return;
	}
	k = codeWritedMofify(k);	
	if(k == ''){
		ul1.show();
		ul2.hide();
		if (wpageindex < wpageTotal - 1) {
			page.show()
		}
	}else{
		ul1.hide();
		ul2.show();
		page.hide();
		result = warnAllFuzzySearchRegExp(k, warnings);
		warnSearchResultShow(k, result);
	}
}

function warnAllFuzzySearchRegExp(key, list){	
	if(!(list instanceof Array)) return;
	var arr = [],
		len = list.length,
		reg = new RegExp(key);
	for(var i=0;i<len;i++){
		if(list[i].Uid.match(reg) || list[i].FenceName.match(reg) ){
			arr.push(list[i]);
		}
	}
	return arr;
}

var warnallFuzzyStr = '';
var warnallFuzzyNum = 0;

function warnSearchResultShow(key, data){
	var html = '';
	var warnRecord = $('#warnAllList2');
	var keycode = new RegExp(key,'g');
	var time,type,date,uid,name,come;
	warnRecord.empty();
	console.log(data);
	if(data.length==0){
		 warnRecord.append('<h3 class="help_wu">无相关记录</h3>'); 
		 return;
	}
	for(var i=0,len=data.length; i<len; i++){
		time = data[i].Time.slice(11,16);
		type = toStr(data[i].Type);
		date = data[i].Time.slice(0,10);
		id = data[i].Id;
		var userid = data[i].Uid;
		uid = userid.replace(keycode, '<i class="sf-color">'+key+'</i>');
		name = data[i].FenceName;
		come = inOut(type);
		
		if(date !== warnallFuzzyStr){
			warnallFuzzyStr = date;
			warnallFuzzyNum = 1;
		}else{
			warnallFuzzyNum = 0;
		}
		
		if(warnallFuzzyNum == 1){
			html += '<div class="wallDate">'+warnallFuzzyStr+'</div>';
		}
		
		html += '<li id="'+id+'"><a onclick="warnListClick(\''+id+'\', \''+userid+'\')"><div class="fix"><strong class="fl wallContent span_'+i+'">'+uid+''+come+''+name+'</strong><span class="fr wallTime">'+time+'</span></div>'+
				'<p><span class="wallType">'+type+'</span><span class="wfenceName">'+name+'</span></p></a></li>';
		
	}
	
	warnRecord.append(html);
	warnallFuzzyStr = '';
}

 function WarnMapShow(data){
 	 var WarnsArray=[];
     for(var i=0;i<fenceLine.length;i++){
     	 if(fenceLine[i].Id==data){
              WarnsArray=fenceLine[i].Locations
     	 }
     }
        map.removeOverlay(Line);
	    Line = null;
		var point = [];
		for(var i=0,len=WarnsArray.length; i<len; i++){
			point.push(new BMap.Point(WarnsArray[i].Longitude, WarnsArray[i].Latitude));
		}   
		var createPolygon = new BMap.Polygon(point, {strokeColor:"#F63839",strokeWeight:3,fillColor:"#F63839",fillOpacity:0.2});
		map.addOverlay(createPolygon);
		map.setViewport(point);
		Line = createPolygon;
 }

 function Warn_Go(data){
 	Close_window();
 	var types=0;
	// var loginer = $('#company_name').text(); 
    var  callusername=$(data).parent().attr('name');
    var  userphone=$(data).parent().attr('uid').match(/[0-9]+/g);
    var  names=callusername;
	callmake_org_imp(names, userphone, types,1);
 }













 //首页
// function pagewarnIndex(){
// 	var fenceid = '';
// 	var uid = "";
// 	wpageindex = 0;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';

// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warnsGotAllRecord(ret);
// 			}else{
// 				warnGotAllFail();
// 			}
// 		}
// 	)	
// }

//上一页
// function pagewarnPreve(){
// 	var fenceid = '';
// 	var uid = "";
// 	wpageindex = wpageindex>0 ? wpageindex-1 : 0;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	
// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warnsGotAllRecord(ret);
// 			}else{
// 				warnGotAllFail();
// 			}
// 		}
// 	)	
// }

//下一页
// function pagewarnNext(){
// 	var fenceid = '';
// 	var uid = "";
// 	wpageindex = wpageindex<wpageTotal - 1 ? wpageindex+1 : wpageindex;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';
	
// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warnsGotAllRecord(ret);
// 			}else{
// 				warnGotAllFail();
// 			}
// 		}
// 	)	
// }

//尾页
// function pagewarnLast(){
// 	var fenceid = '';
// 	var uid = "";
// 	wpageindex = wpageTotal - 1;
// 	var body = '{"Code":10706,"Body":{"SessionId":\"'+sessionId+'\","FenceId":\"'+fenceid+'\", "TimeFrom":\"'+wtimefrom+'\","TimeTo":\"'+wtimeto+'\","Uid":\"'+uid+'\","PageSize":'+wpagesize+',"PageIndex":'+wpageindex+'}}';

// 	$.getJSON(STATION_URL+'?Body='+body,
// 		function (ret){
// 			if(ret.Result == 200){
// 				warnsGotAllRecord(ret);
// 			}else{
// 				warnGotAllFail();
// 			}
// 		}
// 	)	
// }
function clear_In_out(){
	$('.alert_choose_In').removeClass("background_img");
	$('.alert_choose_out').removeClass("background_img");
	alert_choose_In = "";
    alert_choose_out = "";
    var arrs_s = $('.alert_date').children()[0].src.split("/");
	$('.wallstart').val(getTodayDate());
	$('.wallend').val(getTodayDate());
	$('.alert_date>img').attr("src","img/icon/alert/alert_date.png");
	$('.alert_choose_date').hide();
    
}
