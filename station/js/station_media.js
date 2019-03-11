   var medialevel2id; 
   var MediaArray = [];
   var MediaImgs = [];
   var Mediareturn=true;
   var MediaOnkeytime=0;
   var MediaOnkeytimeRepeat;
   // var typeimg=[];
   // var typevideo=[];
   // var typepht=[];
   var MediaMorecode=[];
   var meidaobjlength;
   var mediamarker;
   var MediaCleartimes;

   var MediaChoose=0;
   var Meidanum;
   var MediaNull=Meidanum; 
   var mediaremovelistarr=[];
   var Pulley_media_data;
   var Pulley_media_index;
   var Pulley_media_timestart;
   var Pulley_media_timeover;
   var Pulley_media_type;
   var Media_searchIconcolor=true;
   var Pulley_media_jishu = 1;
   var Meida_Downloadarr=[];
// var Pulley_media_judge = false;
 
   

  function OnKeyMSearch (e) {
       var data=$(e).attr('name');
        if(MediaOnkeytime==0)
          OnKeyMSearchNext(data);
        else
          MediaOnkeytime=1;
  }

  function OnKeyMSearchNext (data) {
       MediaOnkeytime=MediaOnkeytime+1;
        if(MediaOnkeytime>2)
        {
          MediaOnkeytime=0;
          media_sreach(data);
          return;
        }
        MediaOnkeytimeRepeat=setTimeout(function(){OnKeyMSearchNext(data)},900);
  }
 
  function OnKeySearch(e, name) {
       var  data;
       if(e==null){
          data=name;
       }else{
        data=$(e).attr('name');
       }
        if(MediaOnkeytime==0){
 
          OnKeySearchNext(data);

        }else{

          MediaOnkeytime=1;
          
        }
  }

  function OnKeySearchNext (data) {
       MediaOnkeytime=MediaOnkeytime+1;
        if(MediaOnkeytime>2)
        {
          MediaOnkeytime=0;
          // namelistVal=[];
          OnKeySearchOpen(data);
          return;
        }
        MediaOnkeytimeRepeat=setTimeout(function(){OnKeySearchNext(data)},900);
  }

  function OnKeySearchOpen (inputBox) {
       var data=$("input[name='"+inputBox+"']").val();
        if(data==''){
            $('.User_Alls').hide();      
            $('.ul_ztree').show();
              return;
        } 
        var list=[];
            
        if(HelpManArrays.length==0){
           showAlert('成员还未加载完毕，请稍后操作！');
            var val2 = $('.maptopss').val('');
            var val1 = ''; 
            $('#MapUserall').find('input').prop('checked',false);
            MapSearchs(val1,val2);
           return;
        }

       for(var i=0;i<HelpManArrays.length;i++){
            var name=HelpManArrays[i].Name;
            var ID=HelpManArrays[i].Uid;
            var emt='';

            if((name.indexOf(data) >-1)||(ID.indexOf(data) >-1)){
               list.push(HelpManArrays[i]);
            }

            // if((name.indexOf(data) >-1)){
            //    namelistVal.push(data);
            //   list.push(HelpManArrays[i]);
            // }else if((ID.indexOf(data) >-1)){
            //    namelistVal.push(data);
            //    list.push(HelpManArrays[i]);
            // }else{
            //    namelistVal[i]='';
            // }

       }
      OnKeySearchShow(list,data);
  }
  
  function OnKeySearchShow (data, key) {
        var html = '';
        $(".User_Alls").empty();
        var switch_userId = false;
      	var arrayUsers =[];
      	if($('#channerAddtree').children().length>=1){
      		arrayUsers = currentClmembers.keySet().splice(",");
      	}else if($('#userAddtree').children().length>=1){
      		for(var i=0;i<fenceLine[line_index].Members.length;i++){
				arrayUsers.push(fenceLine[line_index].Members[i].Uid);
			}
      	}
     /*****************************/
//       var str = "使用正则表达式把关键字替换加粗，文字加粗";
// var word = "加粗";
// str = str.replace(new RegExp("(" + word + ")","ig"), "<strong>" + word + "</strong>");

      
    /*************************/
      for (var i = 0; i < data.length; i++) {
      	for(var k = 0;k<arrayUsers.length;k++){
	      	if(arrayUsers[k]==data[i].Uid){
	      		switch_userId = true;
	      		break;
	      	}
      	}
      	
             // html += '<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><input type="checkbox" onclick="user_Alls(this)" /><i>' + data[i].Name + '</i></li>';
            // if (treeAddUsers.containsKey(data[i].Uid)) {
            //   html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select userall_selected" onclick="user_Alls(this)"></div><i>'+data[i].Name+'</i></li>';
            // } else {
            //   html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select" onclick="user_Alls(this)"></div><i>'+data[i].Name+'</i></li>';
            // }
            var  strVal=data[i].Name;
            var getIndexOf=strVal.indexOf(key);
            // if(nameval[i]!=''){
              if(getIndexOf>-1){
               // var  strVal=data[i].Name; //全部名称
            
               // console.log(nameval[i]);
              // console.log('名称：'+strVal);
              //  var keycode = new RegExp(key, 'g');
              // var text = strVal.replace(keycode, '<span class="sf-color">' + key + '</span>');

                var strVals=strVal.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
                if (treeAddUsers.containsKey(data[i].Uid)) {
                	if(switch_userId){
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select_copy"></div><i>'+strVals+'</i></li>';
                	}else{
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select userall_selected" onclick="user_Alls(this)"></div><i>'+strVals+'</i></li>';
                	}
                 } else {
                 	if(switch_userId){
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select_copy"></div><i>'+strVals+'</i></li>';
                	}else{
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select" onclick="user_Alls(this)"></div><i>'+strVals+'</i></li>';
                	}
                }
            }else{
                if (treeAddUsers.containsKey(data[i].Uid)) {
                	if(switch_userId){
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select_copy"></div><i>'+data[i].Name+'</i></li>';
                	}else{
                		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select userall_selected" onclick="user_Alls(this)"></div><i>'+data[i].Name+'</i></li>';
                	}
                 } else {
                 	if(switch_userId){
                 		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select_copy"></div><i>'+data[i].Name+'</i></li>';
                 	}else{
                 		html+='<li name="' + data[i].Name + '" user="' + data[i].Uid + '"><div class="userall_select" onclick="user_Alls(this)"></div><i>'+data[i].Name+'</i></li>';
                 	}
                  
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

   function code10400() {
    if(!Mediareturn){
       return;
    }
    Mediareturn=false;
     var channel_date = getNowFormatDate();
     var date = new Date();
     var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
     var timestart = '2005-10-10 15:36:09';
     // var timestart=getTimefrom(30);
     var timestarts = date.getFullYear()+'-' + getTimezero((date.getMonth() + 1))+'-'+getTimezero(date.getDate());
     $('#media_totaltime').val(timestarts);
     $('#media_totaltimes').val(timestarts);
     var type = '';
     var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeover + '","ResType":"' + type + '","PageSize":30,"PageIndex":0}}';
     GetMedialocal(body, timestart, timeover, type);
   }
  
  function MeidaFintBtn(){
     $('.meidatotal').html(0);
     $('.media_level2').hide();
     $('.mediarights').show();
     $('.media_InputAll').removeClass('userall_selected');
     $('.media_main_downs .mediadownshow ').removeClass('HelpReads');
     $('.media_main_downs .mediadownshow ').attr('disabled','disabled');
     Media_searchIconcolor=true;
  }

   function  GetMediaContainer (body,timestart,timeover,type) { 
     
     // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'),'UTF-8');
     var medialoading='<div class="meida_mainlodingimg"><img src="img/loading.gif" alt=""><p>加载中，请稍等...</p></div>';
     $('.media_main').empty();
     $('.media_main').append(medialoading);
     $('.media_InputAll ').removeClass('userall_selected');
     MeidaFintBtn();
     console.log('媒体记录'+body);
     meidaselectid=[];
    var arrmsg=[timestart,timeover,type];
     /**********开始**********/
      AjaxPostMsg(body, AJAXSET_TIME, MediaPostTypeMsgall, MediaAllMsgErrorDown, MediaAjaxovertime, false, arrmsg);
      /**********结束**********/
   }



   /*location*/
   function mediagetpos(data) {
      var id = $(data).parent().attr('user_id');
        channel_positon_get(id);
        $(data).children('img').attr('src','img/icon/newicon/help_locations.png');
   }


   function removemeidamarker(){
       // Mapcleartime();
      if(mediamarker!=undefined){
        mediamarker.hide();
      }
   }


   function media_ul2() {
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
    $('.media_channelmain .media_channelmainul1').empty().append(loading);
    var len = channelAlls.length;
    var channel =channelAlls;
    var html = '';
    if(len==0){
         $('.media_channelmain .media_channelmainul1').empty().append('<h3 class="help_wu">暂无数据！</h3>');
      return;
    }
     for (var i = 0; i < len; i++) {
             var channel_levels = '';
             var Level = channelAlls[i].Level;
             switch (Level) {
               case 0:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li  user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 1:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 2:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 3:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 4:
                 channel_levels = '';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
             }
           }
           $('.media_channelmain .media_channelmainul1').empty().append(html);
           $('input[name=media_transmit]').each(function(i) {
             $(this).on('click', function() {
               event.stopPropagation();
             });
           });
    } 
       
    function Video_ul2(ifdos) {
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
    $('.media_channelmain .media_channelmainul1',ifdos).empty().append(loading);
    var len = channelAlls.length;
    var channel =channelAlls;
    var html = '';
    if(len==0){
         $('.media_channelmain .media_channelmainul1',ifdos).empty().append('<h3 class="help_wu">暂无数据！</h3>');
      return;
    }
     for (var i = 0; i < len; i++) {
             var channel_levels = '';
             var Level = channelAlls[i].Level;
             switch (Level) {
               case 0:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li  user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 1:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 2:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 3:
                 channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
               case 4:
                 channel_levels = '';
                 html += '<li user="' + channel[i].Id + '" name="' + channel[i].Name + '"><div class="fix" onclick="mediachannellevel2(this)"><div class="userall_select" cid="'+channel[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+channel[i].Name+'">' + channel[i].Name + '</i><div class="mediachannelul1level fr">' + channel_levels + '<img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
                 break;
             }
           }
           $('.media_channelmain .media_channelmainul1',ifdos).empty().append(html);
           $('input[name=media_transmit]',ifdos).each(function(i) {
             $(this).on('click', function() {
               event.stopPropagation();
             });
           });
    }     

   function media10311(id, that) {
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
           // alert('操作失败'+ret.Result);
         }
       })
   }


  function media_tellul2() {
    var html = '';
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
       $('.media_channeltellmain .media_channeltellmainul1').empty().append(loading);
        if(callArrList.length==0){
        $('.media_channeltellmain .media_channeltellmainul1').empty().append('<h3 class="help_wu">暂无数据</h3>');
          return;
        } 
       for (var i = 0; i < callArrList.length; i++) {
            html += '<li user="' +callArrList[i].Id + '" name="' +callArrList[i].Name + '"><div onclick="mediatellchannellevel2(this)"><div class="userall_select" cid="'+callArrList[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+callArrList[i].Name+'">' +callArrList[i].Name + '</i><div class="mediachannelul1level  fr"><img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
        }
       $('.media_channeltellmain .media_channeltellmainul1').empty().append(html);
       $('input[name=media_transmit1]').each(function(i) {
         $(this).on('click', function() {
           event.stopPropagation();
         });
       }); 
   }

  function Video_tellul2(ifdos) {
    var html = '';
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
       $('.media_channeltellmain .media_channeltellmainul1',ifdos).empty().append(loading);
        if(callArrList.length==0){
        $('.media_channeltellmain .media_channeltellmainul1',ifdos).empty().append('<h3 class="help_wu">暂无数据</h3>');
          return;
        } 
       for (var i = 0; i < callArrList.length; i++) {
            html += '<li user="' +callArrList[i].Id + '" name="' +callArrList[i].Name + '"><div onclick="mediatellchannellevel2(this)"><div class="userall_select" cid="'+callArrList[i].Id+'" onclick="media_inputdiv(this)"></div><i class="media_channelmainul1name" title="'+callArrList[i].Name+'">' +callArrList[i].Name + '</i><div class="mediachannelul1level  fr"><img src="img/icon/channel/channel_select.png" class="fr" alt=""></div></div><ul class="media_channelmainul2"></ul></li>';
        }
       $('.media_channeltellmain .media_channeltellmainul1',ifdos).empty().append(html);
       $('input[name=media_transmit1]',ifdos).each(function(i) {
         $(this).on('click', function() {
           event.stopPropagation();
         });
       }); 
   }

   function media10312(channeltell_id, obj) {
     var online = onlineInfo.keySet();
     var body = '{"Code":"10312","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channeltell_id + '"}}';
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
       function(ret) {
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
           // alert('操作失败'+ret.Result);
           $(obj).next().empty().append('<h3 class="help_wu">获取失败！</h3>')
         }
       })
   }

   function mediachannellevel2(obj) {
     var channel_id = $(obj).parent().attr('user');
     if ($(obj).next().css('display') == 'none') {
       media10311(channel_id, obj);
     } else {
       $(obj).next().hide('slow');
       $(obj).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_select.png");
     }
   }

   function mediatellchannellevel2(obj) {
     var channeltell_id = $(obj).parent().attr('user');
     if ($(obj).next().css('display') == 'none') {
       media10312(channeltell_id, obj);
     } else {
       $(obj).next().hide('slow');
       $(obj).children('.mediachannelul1level').children('.fr').attr("src", "img/icon/channel/channel_select.png");
     }
   }

   function media_transmitcancel() {
     $('.media_transmit21').hide('slow');
     $('.media_border_r').show('slow');
     $('#' + medialevel2id).show('slow');
     $('.media_level2_share').hide();
   }

   /*****结束****/

   // function Mediaaddtree(event, treeId, treeNode) {
  //    var html = '';
  //    var select = treeNode.checked;

  //    var HelpSelect = [];
  // $('#media_memberselect1').children().each(function(i) {
  //   HelpSelect.push($('#media_memberselect1').children('li').eq(i).attr('name'));
  // })

  //    if (select) {
  //     var arraynum = $.inArray(treeNode.id, HelpSelect);
  //     if (arraynum > -1) {  
  //        return
  //      }
  //      html = '<li name="' + treeNode.id + '" class="channeladdmanlist" name="channelman"><i>' + treeNode.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>'
  //      $('#Media_user').children('li[user=' + treeNode.id + ']').children('input').prop('checked', true);
  //      $('#media_memberselect1').append(html);
  //    } else {
  //      $('#media_memberselect1').children('li[name="' + treeNode.id + '"]').remove();
  //      $('#Media_user').children('li[user=' + treeNode.id + ']').children('input').attr('checked', false);
  //    }
   // }

   function media_imgclose(obj) {
     $(obj).parent().hide();
     $('#bg-color').hide();
     var media_div1 = document.getElementById("media_video");
     media_div1.pause();
      $('#Meidaplay').children().remove();
   }

   function media_text_textkeep1(data) {
     $(data).hide();
     $(data).next().show();
     $('#media_text').removeAttr('disabled');
   }

   function media_textkeep(data) {
     var reportid = $(data).parent().parent().parent().parent().attr('id');
     var reg = /[0-9]+/;
     var reportids = reportid.match(reg);
     var containers = $(data).parent().parent().next();
     var containerval = $(data).parent().parent().next().val().trim();
     var containervalS=RegeMatchValC(containerval);
       if(containervalS){
            showAlert('备注不允许有特殊字符！');
            return;
       } 
     // var container = containerval.replace(/\n|\r\n/g, "<br>"); 
     if(containerval.length>300){
        containerval=containerval.substr(0,300);
     }
      // $('.cover_loading').show();
     var body = '{"Code":"10402","Body":{"SessionId":"' + sessionId + '","ReportId":"' + reportids + '","Content":"' + containerval + '"}}';
     // console.log(body);
     console.log(body);
     /*********************开始************************/
     var arr=[reportids,containerval];
     var conword='修改备注失败！';
     AjaxPostMsg(body, AJAXSET_TIME, MediaSucessRemarks, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
  /************结束*******************/
  }

 

   function code104003(timestart, timeto) {
     var channel_dates = '';
     var channel_date = getNowFormatDate();
     var body = '{"Code":"10400","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"PageIndex":0}}';
     $('.media_main').empty();
     GetMediaContainer(body, timestart, timeto);
   }


   function mediasearchtypeALL (that) {
     var timestart;
     var media_type;
     var media_type1;
     var media_type2;
     var date = new Date();
     var dataday = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());

     var timeto = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
     var hang = '<br>';
     /********选择类型*************/
     if ($('#media_selectimg').hasClass('media_select')) {
       media_type = 1;
     } else {
       media_type = 0;
     }
     if ($('#media_selectvideo').hasClass('media_select')) {
       media_type1 = 1;
     } else {
       media_type1 = 0;
     }
     if ($('#media_selectcontent').hasClass('media_select')) {
       media_type2 = 1;
     } else {
       media_type2 = 0;
     }
    /***********选择时间**********/
     var  timeSelect=$('.media_top_timediv');
     var  timenowday=date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
     var  timenowdayval=$('#media_totaltimes').val();
      if(timeSelect.is(':hidden')){
        var listselect=$(".media_top_ul").children().hasClass("media_select1");
         if(listselect){
            var timecover= $('.media_select1').html().trim();//判断时间
            if (timecover == '一周') {
               timestart = getTimefrom(7);
            } else if (timecover == '两周') {
              timestart = getTimefrom(14);
            } else if (timecover == '一个月') {
              timestart = getTimefrom(30);
            }  

            }else{
              /**全部时间**/
               timestart = '2005-10-10 15:36:09';
               timeto =date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
            }
      }else{
        timestart = $('#media_totaltime').val() + ' ' + '00:00:00';
         if(timenowday==timenowdayval){
           timeto = $('#media_totaltimes').val()+' '+ getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
         }else{
           timeto = $('#media_totaltimes').val() + ' 23:59:59';
         }
      }
    /**************************/
     if (timestart > timeto) {
       common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
       setTimeout(function() {
         common._coverHide();
       }, 3000);
       return;
     }
     if (timeto > dataday) {
       common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
       setTimeout(function() {
         common._coverHide();
       }, 3000);
       return;
     }
     /***全部******/
     if(media_type==0 && media_type1==0 && media_type2==0){
       var type = ''; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
    /********全选或只选择备注*******/
     if(media_type==1 && media_type1==1 && media_type2==1||media_type==0 && media_type1==0 && media_type2==1){
       var type =102; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
     /******图片和视频*******/
      if(media_type==1 && media_type1==1 && media_type2==0){
       var type = ''; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
         /******图片和备注*******/
      if(media_type==1 && media_type1==0 && media_type2==1){
       var type =103; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
      /******视频和备注*******/
     if(media_type==0 && media_type1==1 && media_type2==1){
       var type =104; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
   
    


     /*****结束*******/
     if (media_type == 1) { //IMG
       var type = 100; 
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
        MediaSearchType=0;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return; 
     }
     if (media_type1 == 1) { //video
       var type = 101;
    var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
      MediaSearchType=1;
       GetMediaContainer(body, timestart, timeto, type);
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
     if (media_type2 == 1) { //content
       var type = 102;
       var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
         MediaSearchType=102;
       GetMediaContainer(body, timestart, timeto, type);
       
       $(that).parent().slideUp('slow');
       $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
       return;
     }
     var type = '';
     var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"ResType":"' + type + '","PageIndex":0}}';
     MediaSearchType;
     GetMediaContainer(body, timestart, timeto, type);
     $(that).parent().slideUp('slow');
     $(that).parent().prev().children().eq(1).children('img').attr('src', 'img/icon/channel/channel_search1.png');
   }

   function getTimefrom(d) {
     var num = d * 86400000;
     var da = new Date();
     num = da.getTime() - num;
     da = new Date(num);
     da = da.getFullYear() + '-' + getTimezero((da.getMonth() + 1)) + '-' + getTimezero(da.getDate()) + ' ' + getTimezero(da.getHours()) + ':' + getTimezero(da.getMinutes()) + ':' + getTimezero(da.getSeconds());
     return da;
   }

   function getTimezero(n) {
     if (n < 10) {
       n = '0' + n;
     }
     return n;
   }

   function media_transmit(data) {

    $('.media_level2_ul3 ').children('img').attr('src','img/icon/newicon/help_share.png');
     medialevel2id = $(data).parent().parent().parent().attr('id');
     var allch = $('.media_transmitselect1').children('span');
      $('.media_transmitselect1').children('.media_transmittelltop').removeClass('meidia_transmitbg');
      $('.media_transmitselect1').children('.media_transmitselect1member').removeClass('meidia_transmitbg');
      $('.media_transmitselect1').children('.media_transmitchanntop').addClass('meidia_transmitbg');
      $(data).parent().slideUp();
      $('.media_border_r').hide('slow');
      $('.media_transmit11').show('slow');
      $('.media_channelmain').show().siblings().hide();
      $('.media_memberselect').hide('slow');
      var val2 = $('.media_transmitsearchbox').children('input').val('');
      var val1 = ''; 
       // Media_transmitse(val1,val2);
       Media_trantfint();
   }
   /*********媒体记录翻页***********/

 function Pulley_media(){
 	if(!$('.MediaPagemore').text()){
		// if(Pulley_media_judge){
		// 	showAlert('已经是最后一页');
		// 	Pulley_media_judge = false;
		// 	return;
		// }
 		return;
 	}
 	var Height_gdt=$(".media_main").scrollTop();
	var Height_div =$(".media_main")[0].scrollHeight-$(".media_main").height();
	if(Pulley_media_jishu!=Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_media_jishu = Height_gdt;
			medialistnext(Pulley_media_data,Pulley_media_index,Pulley_media_timestart,Pulley_media_timeover,Pulley_media_type);
		}
	} 
 }


   function mediascroll (data, index, timestart, timeover, type) {
   Pulley_media_data = data;
   Pulley_media_index = index;
   Pulley_media_timestart = timestart;
   Pulley_media_timeover = timeover;
   Pulley_media_type = type;
     var media_select = '<div class="MediaPagemore" onclick="medialistnext(\'' + data + '\',\'' + index + '\',\'' + timestart + '\',\'' + timeover + '\',\'' + type + '\')"">向下滑动加载更多</div>'
     $('.media_main').append(media_select);
   }

   function medialistnext(pagenum, index, timestart, timeover, type) {
     var channel_dates = '';
     index++;
     var datas = index;
     // var channel_date = getNowFormatDate();
     var body = '{"Code":"11412","Body":{"SessionId":"' + sessionId + '","Uid":"","TimeFrom":"' + timestart + '","TimeTo":"' + timeover + '","ResType":"' + type + '","PageSize":30,"PageIndex":' + datas + '}}';
     console.log(body);
     $('.MediaPagemore').empty().append('<img src="img/loading.gif" alt="" />');
     /********开始********/ 
      var xhr=$.ajax({
          type: "post",
          url:GetMsgUrl,
          data:body,
          contentType:'application/json;charset=utf-8',
          timeout: AJAXSET_TIME,
          dataType:'json',
          success: function(data) {
             //console.log(JSON.stringify(data));
             var getHelpcode=data.Resources;
				   if(getHelpcode.length==0){
				   	   $('.HelpPagemore').remove();
				   	    showAlert('已经是最后一页');
				   	    return;
				   }
              MeidaPostnextHtml(data, index, timestart, timeover, type);
          },
          error:function(data){
                $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
                // Meidanum = document.getElementsByName("list").length;
              // console.log('失败'+JSON.stringify(data));
             return;
          },
          complete: function (XMLHttpRequest,status) {
                if(status == 'timeout') {
                    xhr.abort();    // 超时后中断请求
                   $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
                    // Meidanum = document.getElementsByName("list").length;
                    showAlert('网络超时，请刷新！');
                         if(!navigator.onLine){
                            alert('网络不可用，请检查你的网络设置');
                         }
                }
            }
      });
   /*********结束******/
   }




   function media_start() {
     $('#media_totaltime').fdatepicker({format: 'yyyy-mm-dd'});
     $('#media_totaltimes').fdatepicker({format: 'yyyy-mm-dd'});
     // $('.sec').animate({
     //      'margin-left':'70px'
     //    })
    $('.meida_lefts').css('margin-left',"80px");
    Map_Lineclear();
     
        /*********左右栏*************/
     function meidaright(data) {
       var media_screenh = $(window).height();
       var media_top = (Number(media_screenh) - 110) / 2;
       var num = 240;
       $(".mediarightleve2").css("top", media_top);
       $(".mediaright").css("top", media_top);
       $(".mediaright").css("left", num * 1);
     }
     meidaright();
     $('.mediaright2').on('click', function() {
       $(this).parent().hide('slow');
       setTimeout(function() {
         $('.mediarights').show();
       }, 700)
     })
     $('.mediarights').on('click', function() {
         var fahter = $(this).parent().css('margin-left');
         if (fahter == '80px') {
           $('.meida_lefts').animate({
             'margin-left': '-160px'
           })
           $(this).css('background-image', ' url(./img/right_icon.png)');
         } else {
           $('.meida_lefts').animate({
             'margin-left': '80px'
           })
           $(this).css('background-image', ' url(./img/left_icon.png)');
         }
       })
       /*********转发********/
     $('.media_transmit').outerHeight($(window).height() - 80);
     $('.media_channelmainul1').outerHeight($(window).height() - 305);
     $('.media_channeltellmainul1').outerHeight($(window).height() - 305);
     $('.media_memberm').outerHeight($(window).height() - 233);
     $('#media_memberselect1').outerHeight($(window).height() - 174);
      media_ul2();
      media_tellul2();
     $('.mediaselect').children().on('click', function() {
      treeAddUsers.clear();
       var media_index = $(this).index();
       var val2 = $('.media_transmitsearchbox').children('input').val('');
       var val1 = ''; 
       Media_transmitse(val1,val2);
       if (media_index == 0) {
         $('.media_channelmain').show().siblings().hide();
         $('#media-users').hide('slow');
         $(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
       } else if (media_index == 1) {
         $('.media_channeltellmain').show().siblings().hide();
         $('#media-users').hide('slow');
         $(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
       } else if (media_index == 2) {
         inintChnanneMideaTree();
         $('.User_Alls').children('li').children('input').attr('checked',false);
         $('.media_memberm').show().siblings().hide();
         $('#media_memberselect1').empty();
         $('#media-users').show('slow');
         $(this).addClass("meidia_transmitbg").siblings().removeClass('meidia_transmitbg');
         zTreeOnAsyncSuccess('Mediatree');
       }
     })

     /*结束*/
     $('.meida_search_resert').on('click',function(){
        $('.media_top_select').find('li').removeClass('media_select');
        $('.media_top_ul li').removeClass('media_select1');
     })
     $('.media_level2_delete1').on('click', function() {
       $(this).parent().slideUp('slow');
       $('.media_level2_ul4').children().attr('src', 'img/icon/newicon/help_deleted.png');
     })
     $('.media_top_select').on('click', 'li', function() {
       var that = $(this);
       if (that.hasClass("media_select")) {
         that.removeClass("media_select");
       } else {
         // that.addClass("media_select").siblings().removeClass("media_select");
          that.addClass("media_select");
       }
     })

     $('.media_top_ul').on('click', 'li', function() {
         var that = $(this);
         var timediv=$(this).parent().next();
         if (that.hasClass("media_select1")) {
             if(that.hasClass("media_top_ul_year")){
                 timediv.slideUp('slow');

                }else{

               }
           that.removeClass("media_select1");
         } else {
           if(that.hasClass("media_top_ul_year")){
                 timediv.slideDown('slow');

                }else{
                 timediv.slideUp('slow');
               }
           that.addClass("media_select1").siblings().removeClass("media_select1");
         }
       })

       //編輯
     if ($('#media_text').attr('disabled') == 'disabled') {
       $('.media_texticon').children('img').show();
       $('.media_texticon').children('span').hide();
     } else {
       $('.media_texticon').children('img').hide();
       $('.media_texticon').children('span').show();
     }



     $('.media_level2_delete2').on('click', function() {
       var medias_Id = $(this).parent().parent().parent().attr('id');
       var media_Id = medias_Id.replace(/[^\d]/g, '');

       var type = $(this).parent().prev().attr('types');
       var body;
       if (type == 3) { //视频
         body = '{"Code":"11101","Body":{"SessionId":"' + sessionId + '","VideoIds":["' + media_Id + '"]}}';
       } else if (type == 2) { //抓拍
         body = '{"Code":10405,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":[{"ReportId":' + media_Id + ',"ResType":2}]}}';
       } else { // 上报 type=0 或等于1
         body = '{"Code":"10401","Body":{"SessionId":"' + sessionId + '","ReportIds":["' + media_Id + '"]}}';
       }
       var msgarr=[media_Id,type];
     
       // console.log(body);
       // map.clearOverlays();
       //  var infoWindow = new BMap.InfoWindow();
       // infowindow.close();
       /******开始****/
         AjaxPostMsg(body, AJAXSET_TIME, MediaAjaxRemove, MediaRmoveError, MediaAjaxovertime, true, msgarr);
          /*******结束********/
     })
   /**************图片*****/
     $('.media_level2_imgshadow').on('click', function() {
       $('#media_video').remove();
       var vide = '<video width="700" height="500" style="background:black" controls="controls" id="media_video" src=""></video>';
       $('#media_lookimg').append(vide);
       var meidia_container = $(this).children('.media_level2_imgshadows').children().attr('class');
       var media_imgh = $('.media_lookimg').outerHeight();
       var media_imgw = $('.media_lookimg').outerWidth();
       var meidia_screenh = $(window).height();
       var meidia_screenw = $(window).width();
       var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
       var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
       $(".media_lookimg").css("top", media_top);
       $(".media_lookimg").css("left", media_left);
       if (meidia_container == 'help_level2_imgsicon') {
          $('.media_lookleft').hide();
          $('.media_lookright').hide();
         // var media_imgsrc = $(this).css('backgroundImage');
           // media_imgsrc=media_imgsrc.replace('\"','');
         // var start=media_imgsrc.indexOf('(');
         // var over=media_imgsrc.indexOf(')');
         // var edge=IsEdge();
         var IMGsrc= $('#Media_showImg').attr('src');
         // if(edge){
         //     IMGsrc=media_imgsrc.substring(start+1,over);
         // }else{
         //     IMGsrc=media_imgsrc.substring(5,over-1);
         // }
         $('.media_lookimg').children('.media_lookimgs').children('img').attr('src', '' + IMGsrc + '');
         $('#media_video').hide();
         $('.media_lookimgs').show();
       } else {
         $('.media_lookimgs').hide();
         var media_videosrc = $(this).children('video').attr('src');
         var id='Meidaplay';
         var vison = IEVersion();
         if (vison <= 10) {
           Helpplayrs(media_videosrc,id);
           $('#media_video').hide();
           $('#Meidaplay').show();
         } else if (vison == 11) {
           // $('#media_video').attr('src', ''+media_videosrc+'');
           // $('#Meidaplay').hide();
           // $('#media_video').show();
           Helpplayrs(media_videosrc,id);
           $('#media_video').hide();
           $('#Meidaplay').show();
         } else {
           Helpplayrs(media_videosrc,id);
           $('#media_video').hide();
           $('#Meidaplay').show();
         }
       }
       $('.media_lookimg').show();
       $('#bg-color').show();
       meida_imglook();
     })


     $('.media_level2').height($(window).height() - 90);
     $('.media_main').outerHeight($(window).height() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - $('.media_main_flow').outerHeight() - 85);
     $('.media_mains').outerHeight($(window).height() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - $('.media_main_flow').outerHeight() - 75);
     $('.media_level2_main').outerHeight($(window).height() - 284);
     //筛选 日期 
     $('.media_top_search').children().eq(1).on('click', function() {
         var that = $(this).parent().next();
         if (that.is(':hidden')) {
          Media_searchIconcolor=false;
           that.slideDown('slow');
           $(this).children().attr('src', 'img/icon/channel/channel_search2.png');
           $('.media_search_input ').val('');
           $('.media_mains').hide();
           $('.media_main').show();
         } else {
          Media_searchIconcolor=true;
           that.slideUp('slow');
           $(this).children().attr('src', 'img/icon/channel/channel_search1.png')
         }
       })
     $('.meida_imgsearchtop').hover(function() {

          if (Media_searchIconcolor) {
                $(this).attr('src', 'img/icon/channel/channel_search2.png');
            }
     }, function() {

         if (Media_searchIconcolor) {
               $(this).attr('src', 'img/icon/channel/channel_search1.png');
          }
     });
       //进度条显示隐藏
     $('.media_main_flow_top').on('click', function() {
       if ($(this).next().is(':hidden')) {
          Getcode11400();
          // Getcode11400Top();
       } else {
         $(this).find('img').attr('src', 'img/icon/media/mediacicles.png');
         $(this).next().slideUp('slow');
         $('.media_main').outerHeight($(window).outerHeight() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - 117);
         $('.media_mains').outerHeight($(window).outerHeight() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - 117);
       }
     })

     //点击input框事件 总选
     $('.media_main_footer  .media_InputAll').click(function() {
       if ($(this).hasClass('userall_selected')) {
          $(this).removeClass('userall_selected');
          $("input[name='list']").prop("checked", false);
         MediaChoose = 0;
         MediaNull = Meidanum;
         if (MediaChoose == 0) {
           $('.mediadownshow').attr('disabled', 'true');
           $('.mediadownshow').removeClass('HelpReads');
           MediaGetemptyCheck();
         }else{
           $('.mediadownshow').removeAttr('disabled');
           $('.mediadownshow').addClass('HelpReads');
           MediaGetemptyCheck();
         }
       }else {
         $("input[name='list']").prop("checked", true);
         $(this).addClass('userall_selected');
            MediaGetpushCheck();
         MediaChoose = Meidanum;
         MediaNull = 0;
         if (MediaChoose == 0) {
           $('.mediadownshow').attr('disabled', 'true');
           $('.mediadownshow').removeClass('HelpReads');
         } else {
           $('.mediadownshow').removeAttr('disabled');
           $('.mediadownshow').addClass('HelpReads');
         }
       }
       $('.media_main_footer .meidatotal').text(MediaChoose);
     })

       //二级菜单 
     $('.media_level2_ul4').on('click', function() {
       var father = $(this).parent().parent();
       var son = father.children('.media_level2_delete');
       if (son.is(':hidden')) {
        $('.media_level2_ul3').children('img').attr('src','img/icon/newicon/help_share.png');
        $('.media_level2_ul3').prev().children('img').attr('src','img/icon/newicon/help_download.png');
         $(this).parent().siblings('.media_level2_share').slideUp();
         $(this).children().attr('src', 'img/icon/newicon/help_deleteds.png');
         son.slideDown('slow');
       } else {
         $(this).children().attr('src', 'img/icon/newicon/help_deleted.png');
         son.slideUp('slow');
       }
     })

     $('.media_level2_shareno').click(function() {

       $('.media_level2_ul3').children('img').attr('src','img/icon/newicon/help_share.png');
       $('.media_level2_share').hide();
     })
     $('.media_level2_ul3').on('click', function() {
         var father = $(this).parent().parent();
         var son = father.children('.media_level2_share');
         if (son.is(':hidden')) {
           $(this).parent().siblings('.media_level2_delete').slideUp();
           $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
           $('.media_level2_ul3').prev().children('img').attr('src','img/icon/newicon/help_download.png');
           $(this).children('img').attr('src','img/icon/newicon/shareing.png');
           son.slideDown('slow');
         } else{
          $(this).children('img').attr('src','img/icon/newicon/help_share.png');
           son.slideUp('slow');
         }
       })
       //显示二级菜单
     $('.media_main_ul ul li').on('click', function() {
         $('.media_level2').css('margin-left', '0px');

         $('.media_level2').show('slow');
       })   
   }

   /****************图片筛选*************************/
   function code104001(timestart, timeto) {
     var channel_dates = '';
     var channel_date = getNowFormatDate();
     var body = '{"Code":"10400","Body":{"SessionId":"' + sessionId + '","Uid":"","ResType":"0","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"PageIndex":0}}';
     $('.media_main').empty();
     GetMediaContainer(body, timestart, timeto);
   }

   /*********************媒体视频********************************/
   function code104002(timestart, timeto) {
     var channel_dates = '';
     var channel_date = getNowFormatDate();
     var body = '{"Code":"10400","Body":{"SessionId":"' + sessionId + '","Uid":"","ResType":"1","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","PageSize":30,"PageIndex":0}}';
     $('.media_main').empty();
     GetMediaContainer(body, timestart, timeto);
   }
  /*********************全选记录******************************/ 
  function MediaGetpushCheck(){
        meidaselectid= [];
     $('.media_main input[type=checkbox]').each(function(i) {
       if ($(this).is(':checked')) { 
         var id = $(this).parent().parent().parent().attr('id');
          meidaselectid.push(id);
       }
     })
  } 
  function MediaGetemptyCheck(){
      meidaselectid=[];
  } 

   function meida_Download (data) {

     $('.media_level2_ul3').children('img').attr('src','img/icon/newicon/help_share.png');
     $('.media_level2_share').slideUp();
     $('.media_level2_delete').slideUp();
     $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');

     var reg = /[0-9]+/;
     var Ids = $('.media_level2').attr('id');
     var Id = Ids.match(reg);
     var url = $(data).parent().attr('url');
     var type = $(data).parent().attr('types');
     var len = $(data).parent().attr('len');
     var user_id = $(data).parent().attr('user_id');
     var time= $(data).parent().attr('time');
     $(data).children('img').attr('src','img/icon/newicon/help_downloads.png');
     if (type == 2) {
       type = 0;
     } else if (type == 3) {
       type = 1;
     }
     if (isIEs()) {
       MediaDownIe(url, type, len, user_id,Id,time);
     } else {
       // if (len == 1 || len == 0) {
       //   downloadFile(url);
       //   $(data).children().attr('src', 'img/icon/newicon/help_downloads.png');
       // } else {
       //   for (var i = 0; i < MediaImgs.length; i++) {
       //     downloadFile(MediaImgs[i]);
       //   }
       //   $(data).children().attr('src', 'img/icon/newicon/help_downloads.png');
       // }
       MediaDownIe(url, type, len, user_id, Id, time);
     }
   }

   function MediaDownIe(val1, val2, val3, val4, val5,val6) {
     var urlbase=toBase64(val1);
     var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[{"Url":"' + urlbase + '","ResType":"' + val2 + '","Uid":"'+val4+'","ReportIds":"' + val5 + '","ResCount":"' + val3 + '","ResourceTime":"'+val6+'"}]}}';
      // $('.cover_loading').show();
      console.log('下载'+body);
     /****开始******/
     var arr= [];
     var conword='下载失败！';
     AjaxPostMsgDown(body, AJAXSET_TIME, MediaSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr,conword);
   
     /*****结束********/
   }
  
 
  
 

    function savepics(address) {
             $('#Down_load').parent().attr('href',address);
             $('#Down_load').click();
                   // if (document.all.a1 == null) { 
                   //   objIframe = document.createElement("IFRAME");
                   //   document.body.insertBefore(objIframe);
                   //   objIframe.outerHTML = "<iframe  name='a1'   style='display:none'   src=" + address + "></iframe>";
                   //   re = setTimeout(function(){savepics(address,address1)},1);
                   // }else{
                   //   clearTimeout(re);
                   //   address1 = window.open(address, "a1");
                   //   address1.document.execCommand("SaveAs");
                   //   document.all.a1.removeNode(true);
                   // }
    }
  
   // AjaxPostMsg(body, AJAXSET_TIME, MediaSucessDown, MediaErrorDown, MediaAjaxovertime); 

   function MeDiaDown (data) {
     var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[' + data + ']}}';
     // console.log(body);
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
     $.post('' + URI + '',
       function(ret) {
         var resp = decodeURIComponent(ret, 'UTF-8');
         var obj = $.parseJSON(resp);
         if (obj.Result == 200) {
           var address = obj.URL;
           var address1 = '';
           savepics(address)
           
           // savepic();
           // function savepic() {
           //   if (document.all.a1 == null) {
           //     objIframe = document.createElement("IFRAME");
           //     document.body.insertBefore(objIframe);
           //     objIframe.outerHTML = "<iframe   name='a1'   style='display:none'   src=" + address + "></iframe>";
           //     re = setTimeout("savepic()", 1)
           //   } else {
           //     clearTimeout(re)
           //     address1 = window.open(address, "a1");
           //     address1.document.execCommand("SaveAs");
           //     document.all.a1.removeNode(true);
           //   }
           // }

         } else {

           common._coverShow("下载失败!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         }
       })
   }

   function isIEs() { //ie?
     if (!!window.ActiveXObject || "ActiveXObject" in window)
       return true;
     else
       return false;
   }

   function getNowFormatDate() {
     var day = new Date();
     var Year = 0;
     var Month = 0;
     var Day = 0;
     var CurrentDate = "";
     Year = day.getFullYear();
     Month = day.getMonth() + 1;
     Day = day.getDate();
     CurrentDate += Year + "-";
     if (Month >= 10) {
       CurrentDate += Month + "-";
     } else {
       CurrentDate += "0" + Month + "-";
     }
     if (Day >= 10) {
       CurrentDate += Day;
     } else {
       CurrentDate += "0" + Day;
     }
     return CurrentDate;
   }

   function Media11410(id) {
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + id + '\","ResType":"0"}}';
     $.getJSON(STATION_URL + '?Body=' + body,
       function(ret) {
         if (ret.Result == 200) {
          console.log('返回详情'+JSON.stringify(ret));
           MeidaArr = ret;

         }
       })
   }

   function Getmedialevels2(obj) {
     var media_len = $(obj).parent().parent().attr('len');
     var media_id = $(obj).parent().parent().attr('id');
     var users = $(obj).parent().parent().attr('users');
     var meidatime=$(obj).parent().parent().attr('time');
      $('.media_level2_shareimg').css("left","166px");
      $('.media_level2_deleteimg').css("left","236px");
      // $('.meida_level2num').hide();


     onlineIconStatus(users);
     $(obj).parent().parent().addClass('media_bgs').siblings().removeClass('media_bgs');
     $(obj).parent().parent().parent().parent().parent().siblings().children('.media_main_ul').children().children().removeClass('media_bgs');
     var media_ids = media_id + 'a';
     var meida_uidname = $(obj).parent().next().find('.meida_uidname').html();
     var media_imgsrc = $(obj).parent().parent().attr('address');
     var meida_userid = $(obj).parent().parent().attr('name');
     var media_types = $(obj).parent().parent().attr('types');
     $('.media_level2_ul ').attr('user_id', '' + meida_userid + '');
     $('.media_level2_ul ').attr('url', '' + media_imgsrc + '');
     $('.media_level2_ul').attr('len', '' + media_len + '');
     $('.media_level2_ul').attr('types', '' + media_types + '');
     $('.media_level2_ul').attr('time', '' + meidatime + '');
     $('#media_text').show();
     $('#media_text').prev().show();
     $('#media_location').show(); 
     var meida_Detail = $(obj).parent().next().children('span').html();
     var meida_Time = $(obj).parent().parent().attr('time').slice(0,16);
     // var media_maps=$(obj).parent().parent().attr('map');
     // var media_Remark=$(obj).parent().parent().attr('remark');
     var media_username = $(obj).parent().next().find('.meida_uidname').html();
     // var media_mapsnum =media_maps.split(",");
     // var media_mapnum1 =media_mapsnum[0];
     // var media_mapnum2 =media_mapsnum[1];
     var start = meida_Detail.indexOf("[") + 1;
     var cover = meida_Detail.indexOf("]");
     var channel_miao = meida_Detail.substring(start, cover);
     // $('.media_level2_imgshadow').hide();
     // $('.meida_level2num ').show();
     var regs = new RegExp("<br>", "g");
     $('.cover_loading').show();
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + media_id + '\","ResType":"0"}}';
     console.log('报文'+body);
     $.getJSON(STATION_URL + '?Body=' + body,
       function(ret) {
        console.log('返回详情'+JSON.stringify(ret));
         if (ret.Result == 200) {

           $('.cover_loading').hide();
          $('.media_level2_imgshadow').hide();
          $('.meida_level2num ').show();
           $('#media_location').attr('name', '' + ret.Name + '');
           $('#media_location').attr('map1', '' + ret.BaiduLongitude + '');
           $('#media_location').attr('map2', '' + ret.BaiduLatitude + '');
           $('#media_location').attr('time', '' + ret.Time + '');
           $('#media_location').attr('address', '' + ret.ResUrls[0] + '');
           $('#media_location').attr('detail', '' + ret.Detail + '');
           // console.log(JSON.stringify(ret));
           // alert(JSON.stringify(ret));
           var media_Remarks = ret.Content;
           var media_Remark = media_Remarks.replace(regs, "\n");
           if ($('.media_level2').is(':hidden')) {
             $('.media_ulone').empty();
             $('.meida_ultwo').empty();
             $('.meida_ultree').empty();
             $('.media_level2').attr('id', '' + media_ids + '');
             $('.media_level2').css('margin-left', '0px');
             $('#' + media_ids).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
             $('#' + media_ids).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
             $('#media_text').val(media_Remark);
             $('#' + media_ids).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail); //描述
             $('.media_level2_time').children('i').html(toFileSizeText(ret.FileSize)); 
             $('.mediarights').hide();
             MediaImgs=[];
             // MediaImgs = ret.ResUrls;
             for(var i=0;i<ret.ResUrls.length;i++){
                 MediaImgs.push(ret.ResUrls[i]);
             }
             var imglen = ret.ResUrls.length;

             for (var i = 0; i < ret.ResUrls.length; i++) {
               if (i < 3) {
                 $('.media_ulone').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               } else if (i < 6 && 3 <= i) {
                 $('.meida_ultwo').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               } else if (6 <= i) {
                 $('.meida_ultree').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               }
             }
             var imgli = '<li></li>';
             var imglis = '<li></li><li></li>';
             if (imglen <= 3) {
               var num = 3 - imglen;
               if (num == 1) {
                 $('.media_ulone').append(imgli);
               } else if (num == 2) {
                 $('.media_ulone').append(imglis);
               }
               $('.meida_ultwo').append('<li></li><li></li><li></li>');
               $('.meida_ultree').append('<li></li><li></li><li></li>');
             }
             if (3 < imglen && imglen <= 6) {
               var num = 6 - imglen;
               if (num == 1) {
                 $('.meida_ultwo').append(imgli);
               } else if (num == 2) {
                 $('.meida_ultwo').append(imglis);
               }
               $('.meida_ultree').append('<li></li><li></li><li></li>');
             }
             if (imglen <= 9) {
               var num = 9 - imglen;
               if (num == 1) {
                 $('.meida_ultree').append(imgli);
               } else if (num == 2) {
                 $('.meida_ultree').append(imglis);
               }
             }
             $('#' + media_ids).show('slow');
             MediaMap(ret.BaiduLongitude, ret.BaiduLatitude, ret.Name, ret.ResUrls[0], ret.Detail, ret.Time);
           } else if (($('.media_level2').attr('id') == media_ids)) {
             // $(this).parent().hide('slow');
             $('.media_level2_share').slideUp();
             $('.media_level2_delete').slideUp();
             $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
             setTimeout(function() {
               $('.mediarights').show();
             }, 700)
             $('#' + media_ids).hide('slow');

           } else if ($('.media_level2').attr('id') != media_ids) {

             $('.media_level2_share').slideUp();
             $('.media_level2_delete').slideUp();
             $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');

             $('.media_level2').hide();
             $('.media_level2').attr('id', '' + media_ids + '');
             $('#' + media_ids).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
             $('#media_text').val(media_Remark);
             $('#' + media_ids).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
             $('#' + media_ids).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
             $('.media_ulone').empty();
             $('.meida_ultwo').empty();
             $('.meida_ultree').empty();
             $('.mediarights').hide();
             $('.media_level2_time').children('i').html(toFileSizeText(ret.FileSize)); 
             var imglen = ret.ResUrls.length;
             MediaImgs = ret.ResUrls;
             for (var i = 0; i < ret.ResUrls.length; i++) {
               if (i < 3) {
                 $('.media_ulone').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               } else if (i < 6 && 3 <= i) {
                 $('.meida_ultwo').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               } else if (6 <= i) {
                 $('.meida_ultree').append('<li><img src="' + ret.ResUrls[i] + '" alt=""><div class="media_level2nums" onclick="MediaEnlarge(this)"><span></span></div></li>')
               }
             }
             var imgli = '<li></li>';
             var imglis = '<li></li><li></li>';
             if (imglen <= 3) {
               var num = 3 - imglen;
               if (num == 1) {
                 $('.media_ulone').append(imgli);
               } else if (num == 2) {
                 $('.media_ulone').append(imglis);
               }
               $('.meida_ultwo').append('<li></li><li></li><li></li>');
               $('.meida_ultree').append('<li></li><li></li><li></li>');
             }
             if (3 < imglen && imglen <= 6) {
               var num = 6 - imglen;
               if (num == 1) {
                 $('.meida_ultwo').append(imgli);
               } else if (num == 2) {
                 $('.meida_ultwo').append(imglis);
               }
               $('.meida_ultree').append('<li></li><li></li><li></li>');
             }
             if (imglen <= 9) {
               var num = 9 - imglen;
               if (num == 1) {
                 $('.meida_ultree').append(imgli);
               } else if (num == 2) {
                 $('.meida_ultree').append(imglis);
               }
             }
             $('#' + media_ids).show('slow');
             MediaMap(ret.BaiduLongitude, ret.BaiduLatitude, ret.Name, ret.ResUrls[0], ret.Detail, ret.Time);
           }
         } else {
          $('.cover_loading').hide();
          $('.media_level2_imgshadow').hide();
          $('.media_ulone').empty();
          $('.meida_ultwo').empty();
          $('.meida_ultree').empty();
          $('.meida_level2num ').show();
           common._coverShow("获取数据失败!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         }
       })



   }

   function MediaMap(val1, val2, val3, val4, val5, val6) {
    Mapcleartime();
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     var sContent = '<p class="MapName"><i>' + val3 + '</i></p><div class="media_mapimg"><img src="' + val4 + '" alt=""></div>' + '<p class="media_mapimgp">' + val5 + '</p>' +
       // '<p class="media_mapimgp">'+channel_miao+'</p>'+
       '<p class="media_mapimgp"><b>上报时间:</b>' + val6 + '</p>';
     var point = new BMap.Point(val1, val2);
     mediamarker = new BMap.Marker(point, {
       icon: myIcon
     });
     var infoWindow = new BMap.InfoWindow(sContent);
     map.centerAndZoom(point, 15);
     map.addOverlay(mediamarker);
     mediamarker.openInfoWindow(infoWindow);
     mediamarker.addEventListener("click", function() {
       this.openInfoWindow(infoWindow);
     });
     infoWindow.addEventListener("close",removemeidamarker);
     // MeMAPclear(marker);
    // clear();

     // function clear() {
     //   var timec = 1;
     //   var times = setInterval(function() {
     //     timec += 1;
     //     if (timec > 5) {
     //       clearInterval(times);
     //       mediamarker.hide();
     //     }
     //   }, 1000);
     // }
    Mapclearicon();

   }
   /****上报开始****/
   function Mediasecond(val1, val2, val3) {
      $('.media_level2_shareimg').css("left","166px");
      $('.media_level2_deleteimg').css("left","236px");
     $('.cover_loading').show();
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + val1 + '\","ResType":"' + val2 + '"}}';
     // console.log('详情报文'+body);
      $.getJSON(STATION_URL + '?Body=' + body, function(ret) {
            var obj=ret;
         if (obj.Result == 200) {
            console.log('返回地图'+JSON.stringify(obj));
            var mediaimgmsg=obj;
                mediaimgmsg.ResId=val1;
             mediaDetailarray.push(mediaimgmsg);   
             $('.cover_loading').hide();
           GEtshowMeida2(obj, val3);
         }else{
           $('.cover_loading').hide();
           showAlert('获取数据失败！');
         }
       })
   }

   function GEtshowMeida2 (val1, val2) {
     
     $('#media_location').attr('name', '' + val1.Name + '');
     $('#media_location').attr('map1', '' + val1.BaiduLongitude + '');
     $('#media_location').attr('map2', '' + val1.BaiduLatitude + '');
     //  $('#media_location').attr('map1', '' + val1.GpsLongitude + '');
     // $('#media_location').attr('map2', '' + val1.GpsLatitude + '');

     $('#media_location').attr('time','' + val1.Time + '');
     $('#media_location').attr('address','' + val1.ResUrls[0] + '');
     $('#media_location').attr('detail','' + val1.Detail + '');
     $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
     var regs = new RegExp("<br>","g");
     $('#media_text').show();
     $('#media_text').prev().show();
      $('.media_level2_imgshadow').children('img').show();
     $('#media_location').show();
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     var media_ids = val2;
     var meida_uidname = val1.Name;
     var media_Remarks = val1.Content;
     var media_Remark = media_Remarks.replace(regs, "\n");
     var meidia_types = val1.ResType;
     var media_mapnum1 = val1.BaiduLongitude;
     var media_mapnum2 = val1.BaiduLatitude;
     var meida_Time = val1.Time.slice(0,16);
     var media_imgsrc = val1.ResUrls;
     var meida_Detail = val1.Detail;
     if (meidia_types == undefined) {
          meidia_types = 0;
     }
     $('.meida_level2num ').hide();
     if ($('.media_level2').is(':hidden')) {
       $('#Media_showImg').attr('src','');
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
      var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow');
       var media_video = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('video');
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
        $('#Media_showImg').attr('src','' + media_imgsrc + '');
        // media_imgobj.attr('src', '' + media_imgsrc + '');
        // media_imgobj.css('background-image','url('+media_imgsrc+')');
        media_imgobj.show();
        media_video.hide();
       // media_videohtml.children().html('查看');
        media_videohtml.empty();
        media_videohtml.append('<span class="help_level2_imgsicon"></span>');
       $('.meida_level2num').hide();
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#' + media_ids).show('slow');
       if (media_mapnum1 == '' || media_mapnum2 == '') {
         common._coverShow("用户没有上报位置，无法地图显示");
         setTimeout(function() {
           common._coverHide();
         }, 2000);
       } else {
         Mapcleartime();
         var sContent = '<p class="MapName"> <i>' + meida_uidname + '</i></p><div class="media_mapimg"><img src="' + media_imgsrc + '" alt=""></div>' + '<p class="media_mapimgp">' + meida_Detail + '</p>' +
           // '<p class="media_mapimgp">'+channel_miao+'</p>'+
           '<p class="media_mapimgp"><b>上报时间:</b>' + val1.Time + '</p>';
         var point = new BMap.Point(media_mapnum1, media_mapnum2);
         mediamarker = new BMap.Marker(point,{
           icon: myIcon
         });
         var infoWindow = new BMap.InfoWindow(sContent);
         map.centerAndZoom(point, 15);
         map.addOverlay(mediamarker);
         mediamarker.openInfoWindow(infoWindow);
         mediamarker.addEventListener("click", function() {
           this.openInfoWindow(infoWindow);
         });
         // MeMAPclear(marker);
        
         Mapclearicon();

         // function  clear() {
         //   var MediaClearnum = 1;
         //     MediaCleartimes = setInterval(function() {
         //     MediaClearnum += 1;
         //     if (MediaClearnum > 5) {
         //       clearInterval(MediaCleartimes);
         //       mediamarker.hide();
         //     }
         //   }, 1000);
         // }


       }
     } else if ($('.media_level2').attr('id') == media_ids) {
       // $(this).parent().hide('slow');
       $('.media_level2_share').slideUp();
       $('.media_level2_delete').slideUp();
       
       $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       setTimeout(function() {
         $('.mediarights').show();
       },700);
       $('#' + media_ids).hide('slow');
     } else if ($('.media_level2').attr('id') != media_ids) {
        $('#Media_showImg').attr('src','');
       $('.media_level2_share').slideUp();
       $('.media_level2_delete').slideUp();
     
       $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');

       $('.media_level2').hide();
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       // var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
      var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow');
       var media_video = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('video');
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
         $('#Media_showImg').attr('src','' + media_imgsrc + '');
       // media_imgobj.attr('src', '' + media_imgsrc + '');
      // media_imgobj.css('background-image','url('+media_imgsrc+')');
       $('.media_level2_imgshadow').show();
       media_imgobj.show();
       media_video.hide();
       $('.meida_level2num ').hide();
       // media_videohtml.children().html('查看');
        media_videohtml.empty();
        media_videohtml.append('<span class="help_level2_imgsicon"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#' + media_ids).show('slow');
       if (media_mapnum1 == '' || media_mapnum2 == '') {
         common._coverShow("用户没有上报位置，无法地图显示");
         setTimeout(function() {
           common._coverHide();
         }, 2000);
       } else {
         //创建地图标注
         Mapcleartime();
         var sContent = '<p class="MapName"> <i>' + meida_uidname + '</i></p><div class="media_mapimg"><img src="' + media_imgsrc + '" alt=""></div>' + '<p class="media_mapimgp">' + meida_Detail + '</p>' +
           // '<p class="media_mapimgp">'+channel_miao+'</p>'+
           '<p class="media_mapimgp"><b>上报时间:</b>' + val1.Time + '</p>';
         var point = new BMap.Point(media_mapnum1, media_mapnum2);
         mediamarker = new BMap.Marker(point, {
           icon: myIcon
         });
         var infoWindow = new BMap.InfoWindow(sContent);
         map.centerAndZoom(point, 15);
         map.addOverlay(mediamarker);
         mediamarker.openInfoWindow(infoWindow);
         mediamarker.addEventListener("click", function() {
           this.openInfoWindow(infoWindow);
         });
         Mapclearicon();
       }
     }
   }
    
    function Mapcleartime(){
       if(MediaCleartimes!=undefined){
             clearInterval(MediaCleartimes); 
             mediamarker.hide();
          }
    }

    function  Mapclearicon() {
       var MediaClearnum = 1;
         MediaCleartimes = setInterval(function() {
         MediaClearnum += 1;
         if (MediaClearnum > 5) {
           clearInterval(MediaCleartimes);
           MediaCleartimes=undefined;
           mediamarker.hide();
         }
       }, 1000);
     }
  // function MeMAPclear(marker) {
  //          var timec = 1;
  //          var times = setInterval(function() {
  //            timec += 1;
  //            if (timec > 5) {
  //              clearInterval(times);
  //              marker.hide();
  //            }
  //          }, 1000);
  // }

   function MeidatranKBToM(srcsize){
       // var size;
       // if(srcsize>=1024){

       // }else{
       //   size=srcsize
       // }
   }
  function HelpCrearicon(){
    if(mediamarker!=undefined){
        mediamarker.hide();
    }
    Mapcleartime(); 
  }
   function Mediasecond1(val1, val2, val3) {
     $('.media_level2_shareimg').css("left","166px");
     $('.media_level2_deleteimg').css("left","236px");
     $('.cover_loading').show();
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + val1 + '\","ResType":"1"}}';
    // console.log(body);
     $.getJSON(STATION_URL + '?Body=' + body, function(ret) {
        var obj=ret;
         if (obj.Result == 200) {
             var mediaimgmsg=obj;
               mediaimgmsg.ResId=val1;
               mediaDetailarray.push(mediaimgmsg);  
          // console.log('返回'+JSON.stringify(obj));
            $('.cover_loading').hide();
           GEtshowMeida21(obj, val3);
         } else {
           $('.cover_loading').hide();
           showAlert('获取数据失败！');
           // alert('申请失败!'+obj.Result);
         }
       })
   }
   // var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(16, 16));

   function GEtshowMeida21(val1, val2) {  
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     $('#media_location').attr('name', '' + val1.Name + '');
     $('#media_location').attr('map1', '' + val1.BaiduLongitude + '');
     $('#media_location').attr('map2', '' + val1.BaiduLatitude + '');
     $('#media_location').attr('time', '' + val1.Time + '');
     $('#media_location').attr('address', '' + val1.ResUrls[0] + '');
     $('#media_location').attr('detail', '' + val1.Detail + '');
     $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
     var regs = new RegExp("<br>", "g");

     $('#media_text').show();
     $('#media_text').prev().show();
     $('#media_location').show();
     var media_ids = val2;
     var meida_uidname = val1.Name;
     var media_Remarks = val1.Content;
     var media_Remark = media_Remarks.replace(regs, "\n");
     var meidia_types = val1.ResType;
     var media_mapnum1 = val1.BaiduLongitude;
     var media_mapnum2 = val1.BaiduLatitude;
     var meida_Time = val1.Time.slice(0,16);
     var media_imgsrc = val1.ResUrls;
     var meida_Detail = val1.Detail;

     if ($('.media_level2').is(':hidden')) {
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
       var media_video = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('video');
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
      
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
       // media_imgobj.attr('src', '' + media_imgsrc + '');
       $('#MEDIA').attr('src', '' + media_imgsrc + '');
       media_imgobj.hide();
       media_video.show();
       $('.meida_level2num').hide();
       // media_videohtml.children().html('播放');
         media_videohtml.empty();
         media_videohtml.append('<span class="help_level2_imgsicons"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#' + media_ids).show('slow');
       if (media_mapnum1 == '' || media_mapnum2 == '') {
         common._coverShow("用户没有上报位置，无法地图显示");
         setTimeout(function() {
           common._coverHide();
         }, 2000);
       } else {
         //创建地图标注
          Mapcleartime();
         var sContent = '<p class="MapName"> <i>' + meida_uidname + '</i></p><div class="media_mapimg"><video width="300" height="200" type="video/mp4" style="background:black"><source src="' + media_imgsrc + '" type="video/mp4" media=""></video></div><p class="media_mapimgp">' + meida_Detail + '</p>' +
           // '<p class="media_mapimgp">'+channel_miao+'</p>'+
           '<p class="media_mapimgp"><b>上报时间:</b>' + val1.Time + '</p>';
         var point = new BMap.Point(media_mapnum1, media_mapnum2);
         var infoWindow = new BMap.InfoWindow(sContent);
          mediamarker = new BMap.Marker(point, {
           icon: myIcon
         });
         map.addOverlay(mediamarker);
         map.centerAndZoom(point, 15);

         mediamarker.openInfoWindow(infoWindow);
         mediamarker.addEventListener("click", function() {
           this.openInfoWindow(infoWindow);
         });
         // MeMAPclear(marker2);
         // clear();
         Mapclearicon();
         // function clear() {
         //   var timec = 1;
         //   var times = setInterval(function() {
         //     timec += 1;
         //     if (timec > 5) {
         //       clearInterval(times);
         //       marker2.hide();
         //     }
         //   }, 1000);
         // }

       }
     } else if ($('.media_level2').attr('id') == media_ids) {
      $('.media_level2_share').slideUp();
      $('.media_level2_delete').slideUp();
      $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       setTimeout(function() {
         $('.mediarights').show();
       }, 700);
       $('#' + media_ids).hide('slow');
     } else if ($('.media_level2').attr('id') != media_ids) {
      $('.media_level2_share').slideUp();
      $('.media_level2_delete').slideUp();
      $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       $('.media_level2').hide();
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
       $('#MEDIA').attr('src', '' + media_imgsrc + '');
       $('.media_level2_imgshadow').show();
       media_imgobj.hide();
       $('#MEDIA').show();
       $('.meida_level2num').hide();
        // media_videohtml.children().html('播放');
         media_videohtml.empty();
         media_videohtml.append('<span class="help_level2_imgsicons"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#' + media_ids).show('slow');
       if (media_mapnum1 == '' || media_mapnum2 == '') {
         common._coverShow("用户没有上报位置，无法地图显示");
         setTimeout(function() {
           common._coverHide();
         }, 2000);
       } else {
         //创建地图标注
         Mapcleartime();
         var sContent1 = '<p class="MapName"> <i>' + meida_uidname + '</i></p><div class="media_mapimg"><video width="300" height="200" type="video/mp4" style="background:black"><source src="' + media_imgsrc + '" type="video/mp4" media=""></video></div><p class="media_mapimgp">' + meida_Detail + '</p>' +
           // '<p class="media_mapimgp">'+channel_miao+'</p>'+
           '<p class="media_mapimgp"><b>上报时间:</b>' + val1.Time + '</p>';
         var point = new BMap.Point(media_mapnum1, media_mapnum2);
         var infoWindow = new BMap.InfoWindow(sContent1);
          mediamarker = new BMap.Marker(point, {
           icon: myIcon
         });
         map.addOverlay(mediamarker);
         map.centerAndZoom(point, 15);
         mediamarker.openInfoWindow(infoWindow);
         mediamarker.addEventListener("click", function() {
           this.openInfoWindow(infoWindow);
         });
         // MeMAPclear(marker);
         Mapclearicon();
        // clear();
        //  function clear() {
        //    var timec = 1;
        //    var times = setInterval(function() {
        //      timec += 1;
        //      if (timec > 5) {
        //        clearInterval(times);
        //        marker3.hide();
        //      }
        //    }, 1000);
        //  }
       }
     }
   }

   function Mediasecond2(val1, val2, val3) {
      $('.media_level2_shareimg').css("left","95px");
      $('.media_level2_deleteimg').css("left","167px");
       $('.cover_loading').show();
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + val1 + '\","ResType":"2"}}';
      // console.log('报文'+body);
       $.getJSON(STATION_URL + '?Body=' + body, function(ret) {
          var  obj=ret;
         if (obj.Result == 200) {
           var mediaimgmsg=obj;
               mediaimgmsg.ResId=val1;
            mediaDetailarray.push(mediaimgmsg);  
            // console.log('返回'+JSON.stringify(obj));
           $('.cover_loading').hide();
           GEtshowMeida22(obj, val3);
         }else{
          $('.cover_loading').hide();
          showAlert('获取数据失败！');
           // alert('申请失败!'+obj.Result);
         }
       })
   }

   function GEtshowMeida22(val1, val2) {
     HelpCrearicon();
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     var media_ids = val2;
     var meida_uidname = val1.Name;
     var media_Remark = val1.Content;
     var meidia_types = val1.ResType;
     var media_mapnum1 = val1.BaiduLongitude;
     var media_mapnum2 = val1.BaiduLatitude;
     var meida_Time = val1.Time.slice(0,16);
     var media_imgsrc = val1.ResUrls;
     var meida_Detail = val1.Detail;
     $('.media_level2_imgshadow').children('img').show();
     if (meidia_types == undefined) {
          meidia_types = 0;
     }
     if (meida_Detail == '') {
       meida_Detail = '无描述';
     }
     $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
     $('.meida_level2num ').hide();
     if ($('.media_level2').is(':hidden')) {
       $('#Media_showImg').attr('src','');
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       // var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
      var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow');
        $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
        $('#Media_showImg').attr('src','' + media_imgsrc + '');
       // media_imgobj.css('background-image', 'url(' + media_imgsrc + ')');
       media_imgobj.show();
       $('#MEDIA').hide();
       // media_videohtml.children().html('查看');
          media_videohtml.empty();
          media_videohtml.append('<span class="help_level2_imgsicon"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#media_text').hide();
       $('#media_text').prev().hide();
       $('#media_location').hide();
       $('#' + media_ids).show('slow');
     } else if ($('.media_level2').attr('id') == media_ids) {
        $('.media_level2_share').slideUp();
        $('.media_level2_delete').slideUp();
        $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       setTimeout(function() {
         $('.mediarights').show();
       }, 700);
       $('#' + media_ids).hide('slow');
     } else if ($('.media_level2').attr('id') != media_ids) {
        $('#Media_showImg').attr('src','');
        $('.media_level2_share').slideUp();
        $('.media_level2_delete').slideUp();
        $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       $('.media_level2').hide();
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow');
       var media_videohtml = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       
       $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
        $('#Media_showImg').attr('src','' + media_imgsrc + '');
       // media_imgobj.css('background-image', 'url(' + media_imgsrc + ')');
       media_imgobj.show();
       $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').show();
       $('#MEDIA').hide();
        // media_videohtml.children().html('查看');
          media_videohtml.empty();
          media_videohtml.append('<span class="help_level2_imgsicon"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       $('#media_text').hide();
       $('#media_text').prev().hide();
       $('#media_location').hide();
       $('#' + media_ids).show('slow');
     }
   }

   function Mediasecond3(val1, val2, val3) {
       $('.media_level2_shareimg').css("left","95px");
       $('.media_level2_deleteimg').css("left","167px");
       $('.cover_loading').show();
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + val1 + '\","ResType":"3"}}';
      $.getJSON(STATION_URL + '?Body=' + body, function(ret) {
     console.log('报文'+body);
     var obj=ret;
         if (obj.Result == 200) {
           var mediaimgmsg=obj;
               mediaimgmsg.ResId=val1;
               mediaDetailarray.push(mediaimgmsg);  
          // console.log('返回'+JSON.stringify(obj));
           $('.cover_loading').hide();
           GEtshowMeida23(obj, val3);
         } else {
          console.log(obj.Result);
           $('.cover_loading').hide();
           showAlert('获取数据失败！');
           // alert('申请失败!'+obj.Result);
         }
       })
   }

   function GEtshowMeida23(val1, val2) {

     $('#media_location').hide();
     $('#media_text').hide();
     $('#media_text').prev().hide();
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     var media_ids = val2;
     var meida_uidname = val1.Name;
     var media_Remark = val1.Content;
     var meidia_types = val1.ResType;
     var media_mapnum1 = val1.BaiduLongitude;
     var media_mapnum2 = val1.BaiduLatitude;
     var meida_Time = val1.Time.slice(0,16);
     var media_imgsrc = val1.ResUrls;
     var meida_Detail = val1.Detail;
     if (meidia_types == undefined) {
       meidia_types = 0;
     }
     if (meida_Detail == '') {
       meida_Detail = '无描述';
     }

     if ($('.media_level2').is(':hidden')) {
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       // console.log('视频'+val1.FileSize);
       $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
       var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
       media_imgobj.hide();
       var media_imgobjs = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       // media_imgobjs.children().html('播放');
          media_imgobjs.empty();
          media_imgobjs.append('<span class="help_level2_imgsicons"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       /************************进行调试*****************进行调试*************************/
       if (media_imgsrc.length == 1) {
         $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').show();
         $('.meida_level2num').hide();
         $('#MEDIA').show();
         $('#MEDIA').attr('src', '' + media_imgsrc + '');
       } else {
         $('.media_level2_imgshadow').hide();
         $('.meida_level2num').show();
         $('.media_ulone').empty();
         $('.meida_ultwo').empty();
         $('.meida_ultree').empty();
         for (var i = 0; i < media_imgsrc.length; i++) {
           $('.media_ulone').append('<li class="media_videomore"><video src="' + media_imgsrc[i] + '" type="video/mp4"></video><div class="MEdia_img2shadow" onclick="MediaEnlarges(this)"><span></span></div></li>');
         }
         $('.meida_level2num').show();
       }
       $('#' + media_ids).show('slow');
     } else if ($('.media_level2').attr('id') == media_ids) {
      $('.media_level2_share').slideUp();
      $('.media_level2_delete').slideUp();
      $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       setTimeout(function() {
         $('.mediarights').show();
       }, 700);
       $('#' + media_ids).hide('slow');
     } else if ($('.media_level2').attr('id') != media_ids) {
      $('.media_level2_share').slideUp();
      $('.media_level2_delete').slideUp();
       $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
       $('.media_level2').hide();
       $('.media_level2').attr('id', '' + val2 + '');
       $('.media_level2').css('margin-left', '0px');
       $('#' + val2).children('.media_level2_top').children('p').children('b').html('' + meida_uidname + '');
       $('#' + val2).children('.media_level2_top').children('.media_level2_time').children('strong').empty().append(meida_Time);
       // console.log('视频'+val1.FileSize);
       $('.media_level2_time').children('i').html(toFileSizeText(val1.FileSize));
       var media_imgobj = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('img');
       var media_imgobjs = $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').children('.media_level2_imgshadows');
       $('#media_text').val(media_Remark);
       $('.mediarights').hide();
       media_imgobj.hide();
       // media_imgobjs.children().html('播放');
          media_imgobjs.empty();
          media_imgobjs.append('<span class="help_level2_imgsicons"></span>');
       $('#' + val2).children('.media_level2_main').children('.meidia_leve2Detail').html(meida_Detail);
       /*********进行调试***************进行调试********进行调试****************进行调试***********/
       if (media_imgsrc.length == 1) {
         $('#' + val2).children('.media_level2_main').children('.media_level2_imgshadow').show();
         $('.meida_level2num').hide();
         $('#MEDIA').show();
         $('#MEDIA').attr('src', '' + media_imgsrc + '');
       } else {
         $('.media_level2_imgshadow').hide();
         $('.meida_level2num').show();
         $('.media_ulone').empty();
         $('.meida_ultwo').empty();
         $('.meida_ultree').empty();
         for (var i = 0; i < media_imgsrc.length; i++) {
           $('.media_ulone').append('<li class="media_videomore"><video src="'+media_imgsrc[i]+'" type="video/mp4"></video><div class="MEdia_img2shadow" onclick="MediaEnlarges(this)"><span></span></div></li>');
         }
         $('.meida_level2num').show();
       }
       $('#' + media_ids).show('slow');
     }
   }

   function Getmedialevel2 (obj) {

     var media_len = $(obj).parent().parent().attr('len');
     $('#MEDIA').remove();
     $('#media_video').remove();
     var vide = '<video width="280" height="280"  type="video/mp4" style="background:black" id="MEDIA" src=""></video>';
     var vides = '<video width="700" height="500" type="video/mp4"  style="background:black" controls="controls" id="media_video" src=""></video>';
     $('.media_level2_imgshadow').append(vide);
     $('.media_lookimg').append(vides);
     $('#MEDIA').hide();
     $('#media_text').attr('disabled',true); 
      $('.media_texticon').children().eq(1).hide();
     $('.media_texticon').children().eq(0).show();

     Media_IconFint();
     if (media_len > 1) {
       Getmedialevels2(obj);
       return;
     }
     var media_id = $(obj).parent().parent().attr('id');
     var users = $(obj).parent().parent().attr('users');
     onlineIconStatus(users);
     $(obj).parent().parent().addClass('media_bgs').siblings().removeClass('media_bgs');
     $(obj).parent().parent().parent().parent().parent().siblings().children('.media_main_ul').children().children().removeClass('media_bgs');
     var media_ids = media_id + 'a';
     var meida_uidname = $(obj).parent().next().find('.meida_uidname').html();
     var media_imgsrc = $(obj).parent().parent().attr('address');
     var meida_userid = $(obj).parent().parent().attr('name');
     var media_types = $(obj).parent().parent().attr('types');
     var media_time = $(obj).parent().parent().attr('time');
     $('.media_level2_ul ').attr('user_id', '' + meida_userid + '');
     $('.media_level2_ul ').attr('url', '' + media_imgsrc + '');
     $('.media_level2_ul').attr('len', '' + media_len + '');
     $('.media_level2_ul').attr('types', '' + media_types + '');
     $('.media_level2_ul').attr('time', '' + media_time + '');
     var meida_Detail = $(obj).parent().next().children('span').html();
     var meida_Time = $(obj).parent().parent().attr('li_time');
     var media_username = $(obj).parent().next().find('.meida_uidname').html();
     var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
     var start = meida_Detail.indexOf("[") + 1;
     var cover = meida_Detail.indexOf("]");
     var channel_miao = meida_Detail.substring(start, cover);
     var users = $(obj).parent().parent().attr('users');
     onlineIconStatus(users);
      if (media_types == 0) {
       Mediasecond(media_id, media_types, media_ids);
     } else if (media_types == 1) {
       Mediasecond1(media_id, media_types, media_ids);
     } else if (media_types == 2) {
       Mediasecond2(media_id, media_types, media_ids);
     } else if (media_types == 3) {
       Mediasecond3(media_id, media_types, media_ids);
     }
    // if(mediaDetailarray.length==0){
    //    GetMediaDetail(media_id, media_types, media_ids); 
    //    return;
    // }else if(mediaDetailarray.length==1){
    //    var resid=mediaDetailarray[0].ResId;
    //    if(resid==media_id){
    //      //本地数据
    //    }else{
    //      GetMediaDetail(media_id, media_types, media_ids); 
    //    }
    // }else{
    //    var MediaDetailarr;
    //     for(var i=0;i<mediaDetailarray.length;i++){
    //         if(mediaDetailarray[i].ResId==media_id){
    //           MediaDetailarr=mediaDetailarray[i];
    //         }
    //     }
      
    // }
     return;
     event.stopPropagation();
   }
function GetMediaDetail(media_id, media_types, media_ids){
     if (media_types == 0) {
       Mediasecond(media_id, media_types, media_ids);
     } else if (media_types == 1) {
       Mediasecond1(media_id, media_types, media_ids);
     } else if (media_types == 2) {
       Mediasecond2(media_id, media_types, media_ids);
     } else if (media_types == 3) {
       Mediasecond3(media_id, media_types, media_ids);
     }
}   

function Media_IconFint () {

  $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
  $('.media_level2_ul3 ').prev().children('img').attr('src','img/icon/newicon/help_download.png');
  $('#media_location').children('img').attr('src','img/icon/newicon/help_location.png');

}
 
   function media_innputcheck(obj) {
     // var MediaNull = Meidanum;
     if ($(obj).is(':checked')) {
       MediaChoose += 1; //选中人数
       MediaNull -= 1; //没有选中剩余人数
       var selectid=$(obj).parent().parent().parent().attr('id');
       meidaselectid.push(selectid);
     } else {
        MediaChoose -= 1;
        MediaNull += 1;
        var selectid=$(obj).parent().parent().parent().attr('id');
            meidaremoveselect(selectid);
     }
     $('.media_main_footer .meidatotal').text(MediaChoose);
     if (MediaChoose == 0) {
       $('.mediadownshow').attr('disabled', 'true');
       $('.mediadownshow').removeClass('HelpReads');
     } else {
       $('.mediadownshow').removeAttr('disabled');
       $('.mediadownshow').addClass('HelpReads');
     }
     if (MediaNull == 0) {
       // $("input[name='listAll']").prop("checked", true);
       // $("input[name='listAll']").prop("indeterminate", false);
       $('.media_InputAll ').addClass('userall_selected');
     } else if (MediaChoose == 0) {
       // $("input[name='listAll']").prop("checked", false);
       // $("input[name='listAll']").prop("indeterminate", false);
        $('.media_InputAll ').removeClass('userall_selected');
     } else {
       // $("input[name='listAll']").prop("indeterminate", true);
       $('.media_InputAll ').removeClass('userall_selected');
     }
}
  

  function meidaremoveselect(ids){
    if(meidaselectid==''){
       return;
    }
      if(meidaselectid.length==1&&meidaselectid==ids){
           meidaselectid=[];
          return;
      }
      for(var i=0;i<meidaselectid.length;i++){
          if(meidaselectid[i]==ids){
             // meidaselectid[i].remove(); //查看数组
             meidaselectid.splice(i,1);
          }
      }
  } 

   function media_removelist(obj) {
     var media_listall = $(".media_main input[name=list]");
      mediaremovelistarr= [];
     $(media_listall).each(function(i, me) {
        var lists=[];
       if ($(this).is(':checked')) {
         var media_imgid = $(this).parent().parent().parent().attr('id');
         var type=$(this).parent().parent().parent().attr('types');
          lists[0]=media_imgid;
          lists[1]=type;
         mediaremovelistarr.push(lists);
       }
     });

     
      //   typeimg=[];
      //   typevideo=[];
      //   typepht=[];
      // for(var i=0;i<media_list.length;i++){
      //     if(media_list[i][1]==2){
      //        typepht.push(media_list[i]);
      //     }else if(media_list[i][1]==3){
      //       typevideo.push(media_list[i][0]);
      //     }else{
      //       typeimg.push(media_list[i][0]);
      //     }
      // }
      $('.channel_popremove').hide();
      $('.media_popremove').show();
     $('#bg-color').show();
     $('.media_selectremove').children('.media_popremove').children().eq(1).show();
     $('.media_selectremove').children('.media_popremove').children().eq(2).hide();
     $('.media_selectremove').children('h3').attr('class','meidadwn');
     $('.media_selectremove').children('h3').html('确认删除该媒体记录？');
     var media_imgh = $('.media_selectremove').outerHeight();
     var media_imgw = $('.media_selectremove').outerWidth();
     var meidia_screenh = $(window).height();
     var meidia_screenw = $(window).width();
     var media_left = (Number(meidia_screenw) - Number(media_imgw)) /2;
     var media_top = (Number(meidia_screenh) - Number(media_imgh))/2;
     $(".media_selectremove").css("top", media_top);
     $(".media_selectremove").css("left", media_left);
     $('.media_selectremove').show();
     $('.media_popremove').children().eq(0).on('click', function() {
       $(this).parent().parent().hide();
       $('#bg-color').hide();
     })
   }


   function MediaSelectR(surebtn){
        $(surebtn).parent().parent().hide();
          var arrays=[];
          for(var i=0;i<mediaremovelistarr.length;i++){
             arrays[i]='{"ReportId":'+mediaremovelistarr[i][0]+',"ResType":'+mediaremovelistarr[i][1]+'}';
           }
             $('.cover_loading').show();
             $(this).parent().parent().hide();
             $('.media_level2').hide();
             $('.mediarights').show();
             $('#bg-color').hide();
          var  body = '{"Code":10405,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":['+arrays+']}}';
          // console.log(body);
     AjaxPostMsg(body, AJAXSET_TIME, MediaRemovepost, MediaRmoveError, MediaAjaxovertime, true);
   }



 
  function Mediaremovepht (data) {
    var type=2; //抓拍
      if(data.length==0){
        return;
      }
      var arrays=[];
      for(var i=0;i<data.length;i++){
       arrays[i]='{"ReportId":'+data[i][0]+',"ResType":2}';
      }
      var  body = '{"Code":10405,"Body":{"SessionId":\"' + sessionId + '\","ReportIds":['+arrays+']}}';
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
         function(ret) {
           if (ret.Result == 200) {
                  for (var i = 0; i < data.length; i++) {
                     $('#' + data[i][0]).remove();
                  }
                Mediarmovelocalarry(data,type);
                 return true;
             }else{
              return false;
            }
         })
  }
   
  function Mediaremovevideo(data){
    var type=3;//视频存储
     if(data.length==0){
        return;
      }
    var  body = '{"Code":"11101","Body":{"SessionId":"' + sessionId + '","VideoIds":[' + data + ']}}';
      $.getJSON('' + STATION_URL + '?Body=' + body + '',
         function(ret) {
           if (ret.Result == 200) {
             for (var i = 0; i < data.length; i++) {
                      $('#' + data[i]).remove();
                }
              // for(var i=0;i<MediaArray.length;i++){
              //     for(var k=0;k<data.length;k++){
              //        if(MediaArray[i].ResId==data[k]){
              //           MediaArray.splice(i,1);
              //        } 
              //     }
              // }  
              Mediarmovelocalarry(data,type);
               return true;
           } else {
                return false;
             }
         })
  }

  function Mediaremoveimg(data){
     // type为 0或者1
       if(data.length==0){
            return;
         }
    var body = '{"Code":"10401","Body":{"SessionId":"' + sessionId + '","ReportIds":[' + data + ']}}';
      $.getJSON('' + STATION_URL + '?Body=' + body + '',
         function(ret) {
           if (ret.Result == 200) {
             for (var i = 0; i < data.length; i++) {
                      $('#' + data[i]).remove();
                }
             Mediarmovelocalarry(data); 
             return true;
           } else {
             return false;
            }
         })
  }

   function meida_imglook() {　　
     var div1 = document.getElementById("media_lookimg");　　
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

   function meidadownload(data) {
     var i = 0;
         Meida_Downloadarr = [];
     $('.media_main input[type=checkbox]').each(function(i) {
       if ($(this).is(':checked')) {
         var url = $(this).parent().parent().parent().attr('address');
         var len = $(this).parent().parent().parent().attr('len');
         var type = $(this).parent().parent().parent().attr('types');
         var user_id = $(this).parent().parent().parent().attr('name');
         var id = $(this).parent().parent().parent().attr('id');
         var time=$(this).parent().parent().parent().attr('time');
         var urlbase=toBase64(url);
         var MediaNumArr = [];
         MediaNumArr[0] = user_id;
         MediaNumArr[1] = type;
         MediaNumArr[2] = len;
         MediaNumArr[3] = urlbase;
         MediaNumArr[4] = id;
         MediaNumArr[5] = time;
         Meida_Downloadarr.push(MediaNumArr);
       }
     })
     $('.channel_popremove').hide();
     $('.media_popremove').show();
     $('#bg-color').show();
     $('.media_selectremove').children('.media_popremove').children().eq(1).hide();
     $('.media_selectremove').children('.media_popremove').children().eq(2).show();
     $('.media_selectremove').children('h3').attr('class','meidadwn');
     $('.media_selectremove').children('h3').html('确认下载已选记录？');
     var media_imgh = $('.media_selectremove').outerHeight();
     var media_imgw = $('.media_selectremove').outerWidth();
     var meidia_screenh = $(window).height();
     var meidia_screenw = $(window).width();
     var media_left = (Number(meidia_screenw) - Number(media_imgw)) /2;
     var media_top = (Number(meidia_screenh) - Number(media_imgh))/2;
     $(".media_selectremove").css("top", media_top);
     $(".media_selectremove").css("left", media_left);
     $('.media_selectremove').show();
     $('.media_popremove').children().eq(0).on('click', function() {
       $(this).parent().parent().hide();
       $('#bg-color').hide();
     })




     // if (isIEs()) {
     //   //var val=MediaIeArr(urlnum);
     //   //      MeidadownTotal(val);
     //   MeidadownTotal(urlnum);
     // }else{
     //   // var vals = MediaIeArr(urlnum);
     //   // for (var i = 0; i < vals.length; i++) {
     //   //   downloadFile(data[i][3]);
     //   // }
     //   MeidadownTotal(urlnum);
     // }

   }

   function MediaDownSure (obj){
    $(obj).parent().parent().hide();
    $('#bg-color').hide();
         if (isIEs()) {
       //var val=MediaIeArr(urlnum);
       //      MeidadownTotal(val);
       MeidadownTotal(Meida_Downloadarr);
     }else{
       // var vals = MediaIeArr(urlnum);
       // for (var i = 0; i < vals.length; i++) {
       //   downloadFile(data[i][3]);
       // }
       MeidadownTotal(Meida_Downloadarr);
     }

   }

   function MeidadownTotal(data) {
     var datas = [];
     for (var i = 0; i < data.length; i++) {
       var type = data[i][1];
       if (type == 3) {
         type = 1;
       } else if (type == 2) {
         type = 0;
       }
       datas[i] = '{"Url":"' + data[i][3] + '","ResType":' + type + ',"Uid":"' + data[i][0]+'","ReportIds":"' + data[i][4] + '","ResCount":"' + data[i][2]+'","ResourceTime":"'+data[i][5]+'"}';
     }
     var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":['+datas+']}}';
    console.log('正常字符串'+body);
       // $('.cover_loading').show();
       var arr=[];
       var conword='下载失败！';
       // alert(datas.length);
       var timeto=datas.length*60000;
      
       AjaxPostMsgDown(body, timeto, MediaSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
   }

   function MediaIeArr(data) {
     var MeidaIearr = [];
     var MeidaIearrs = [];
     for (var i = 0; i < data.length; i++) {
       if (data[i][1] == 0) {
         if (data[i][2] == 1 || data[i][2] == 0) {
           MeidaIearr.push(data[i]);
         } else {
           MeidaIearrs.push(data[i]);
         }
       } else {
         MeidaIearr.push(data[i]);
       }
     }
     var val = Medaiadds(MeidaIearrs);
     var vals = Meidamarray(val, MeidaIearr);
     return vals;
   }

   function Medaiadds(data) {
     var Mediarsa = [];
     for (var i = 0; i < data.length; i++) {
       var val = Medai410(data[i]);

       Mediarsa.push(val);
     }
     return Mediarsa;
   }

   function Meidamarray(data, datas) {
     var MedaiIeArrse = [];
     for (var i = 0; i < data.length; i++) {
       if (i < 1) {
         for (var k = 0; k < data[0].length; k++) {
           MedaiIeArrse.push(data[0][k]);
         }
       } else {
         for (var j = 0; j < data[i].length; j++) {
           MedaiIeArrse.push(data[i][j]);
         }
       }
     }
     var val = MedaiIeArrse.concat(datas);
     return val;
   }

   function Medai410(data) {
     var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + data[4] + '\","ResType":"' + data[1] + '"}}';
    console.log('获取详情');
     var MediaGetArrs = [];
     // $.ajaxSettings.async = false;
     $.getJSON(STATION_URL + '?Body=' + body,
       function(ret) {

         if (ret.Result == 200) {
           for (var i = 0; i < ret.ResUrls.length; i++) {
             var MediaGetArr = [];
             MediaGetArr[0] = ret.Uid;
             MediaGetArr[1] = ret.ResType;
             MediaGetArr[2] = '';
             MediaGetArr[3] = ret.ResUrls[i];
             MediaGetArrs.push(MediaGetArr);
           }
         }
       })
     return MediaGetArrs;
   }

   function Media_urror() {
     $('.media_memberselect').hide();
     media_transmitcancel();
     treeAddUsers.clear();
   }

   function media_sreach(data) {
        var vals=$("input[name='"+data+"']").val();
         MediaChoose = 0;
         MeidaFintBtn();
     if(vals.length==0){
         MediaAllSearchS(MediaArray);
     }else{
          MediaSearch(vals);
     }
   }

  function MediaAllSearchS(data){
    var channel_dates='';
    $('.media_main').empty(); //此处进行调试
    for (var i = 0; i < data.length; i++) {
       var time = data[i].Time.split(" ");
       var time1 = time[0];
       var time2 = time[1].slice(0,5);
       if (time1 != channel_dates) {
         var html = '';
         html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
         $('.media_main').append(html);
         channel_dates = time1;
       }

             var html1 = '';
             if (data[i].ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (data[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               if (data[i].Content.length > 0) {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + data[i].Uid + '" id="' +data[i].ResId + '" user_id="' + data[i].Name + '" name="' + data[i].Uid + '" content="' +data[i].Content + '" detail="' +data[i].Detail + '" len="' +data[i].ResCount + '" types="' +data[i].ResType + '" address="' +data[i].ResUrl + '" time="' +data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
             } else if (data[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (data[i].Content.length > 0) {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + data[i].Uid + '" id="' + data[i].ResId + '" user_id="' + data[i].Name + '" name="' +data[i].Uid + '" content="' +data[i].Content + '" detail="' +data[i].Detail + '" len="' +data[i].ResCount + '" types="' +data[i].ResType + '" address="' +data[i].ResUrl + '"  time="' +data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' +data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +data[i].Detail + '</span></div></li>';
             } else if (data[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' +data[i].Uid + '" id="' +data[i].ResId + '" content="' + data[i].Content + '" detail="' +data[i].Detail + '" user_id="' +data[i].Name + '" name="' +data[i].Uid + '" len="' + data[i].ResCount + '" types="' + data[i].ResType + '" address="' + data[i].ResUrl + '"  time="' + data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
             } else if (data[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' + data[i].Uid + '" user_id="' + data[i].Name + '" content="' + data[i].Content + '" detail="' + data[i].Detail + '" id="' +data[i].ResId + '"  name="' + data[i].Uid + '" len="' + data[i].ResCount + '" types="' + data[i].ResType + '" address="' + data[i].ResUrl + '"  time="' + data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + data[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + data[i].Detail + '</span></div></li>';
             }        
       $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').append(html1); 
      }
      Meidanum =data.length;
      if(meidaobjlength){
         mediascroll(MediaMorecode[0],MediaMorecode[1],MediaMorecode[2],MediaMorecode[3],MediaMorecode[4]);
      }
  }


   function MediaSearch(data) { 
       // $('.media_main').hide();
       // $('.media_mains').show(); 
       if(MediaArray.length==0){
           var lis=$('#media_main_222').has('.help_wu').length;
           if(lis==1){
               // showAlert('没有数据,请重新选择!');
               $('.media_main').empty().append('<h3 class="help_wu">无相关记录</h3>'); 
               
               // $('.media_search_input').val('');
             return;
            }else{
               showAlert('数据还未加载完成,请稍后重新筛选!');
             $('.media_search_input').val('');
             return;
            } 
       }
     var MediaArrs =[];
     MediaArrs = MediaListfor(data);
     MediaArrHtml(MediaArrs, data);
   }

   function MediaListfor(data) {
     var MediaListArr = [];
     // console.log('本地第一次数组'+JSON.stringify(MediaArray));
     for (var i = 0; i < MediaArray.length; i++) {
       var user_id = MediaArray[i].Uid;
       var user_name = MediaArray[i].Name;
       var user_Content = MediaArray[i].Content;
       var user_Detail = MediaArray[i].Detail;
       if ((user_id.indexOf(data) > -1) || (user_name.indexOf(data) > -1) || (user_Content.indexOf(data) > -1) || (user_Detail.indexOf(data) > -1)) {
         MediaListArr.push(MediaArray[i]);
       }
     }
     return MediaListArr;
   }

   function MediaArrHtml(data, key) {
     var channel_dates = '';
     $('.media_main').empty();
     if (data.length == 0) {
          MediaChoose = 0;
          Meidanum=0;
          MediaNull = Meidanum;
        $('.media_main').append('<h3 class="help_wu">无相关记录</h3>'); 
        return;
     }
     for (var i = 0; i < data.length; i++) {
       var time = data[i].Time.split(" ");
       var time1 = time[0];
       var time2 = time[1].slice(0,5);
       if (time1 != channel_dates) {
         var html = '';
         html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
         $('.media_main').append(html);
         channel_dates = time1;
       }
            var html1 = '';
            var UserName=data[i].Name;
            var UserDet=data[i].Detail;
            var GetIndexName=UserName.indexOf(key);
            var GetIndexDet=UserDet.indexOf(key);
            if(GetIndexName>-1){
              UserName=UserName.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
            }
            if(GetIndexDet>-1){
              UserDet=UserDet.replace(new RegExp("(" +key + ")","ig"), "<strong>" + key + "</strong>");
            }
            

             if (data[i].ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (data[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               if (data[i].Content.length > 0) {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + data[i].Uid + '" id="' +data[i].ResId + '" user_id="' + data[i].Name + '" name="' + data[i].Uid + '" content="' +data[i].Content + '" detail="' +data[i].Detail + '" len="' +data[i].ResCount + '" types="' +data[i].ResType + '" address="' +data[i].ResUrl + '" time="' +data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + UserName + '</span><span class="fr">' + time2 + '</span></p><span>' + UserDet + '</span></div></li>';
             } else if (data[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (data[i].Content.length > 0) {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + data[i].Uid + '" id="' + data[i].ResId + '" user_id="' + data[i].Name + '" name="' +data[i].Uid + '" content="' +data[i].Content + '" detail="' +data[i].Detail + '" len="' +data[i].ResCount + '" types="' +data[i].ResType + '" address="' +data[i].ResUrl + '"  time="' +data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' +UserName + '</span><span class="fr">' + time2 + '</span></p><span>' +UserDet+ '</span></div></li>';
             } else if (data[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' +data[i].Uid + '" id="' +data[i].ResId + '" content="' + data[i].Content + '" detail="' +data[i].Detail + '" user_id="' +data[i].Name + '" name="' +data[i].Uid + '" len="' + data[i].ResCount + '" types="' + data[i].ResType + '" address="' + data[i].ResUrl + '"  time="' + data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + UserName+ '</span><span class="fr">' + time2 + '</span></p><span>' + UserDet + '</span></div></li>';
             } else if (data[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' + data[i].Uid + '" user_id="' + data[i].Name + '" content="' + data[i].Content + '" detail="' + data[i].Detail + '" id="' +data[i].ResId + '"  name="' + data[i].Uid + '" len="' + data[i].ResCount + '" types="' + data[i].ResType + '" address="' + data[i].ResUrl + '"  time="' + data[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+data[i].ResId+'Me"><label for="'+data[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">'+UserName+'</span><span class="fr">' + time2 + '</span></p><span>' + UserDet+ '</span></div></li>';
             }
       $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').append(html1); 
     }
      Meidanum =data.length;
      MediaChoose = 0;
      MediaNull = Meidanum;
   }


   function Getcode11400() {
     var body = '{"Code":"11400","Body":{"SessionId":"' + sessionId + '"}}';
     // console.log(body);
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
       function(ret) {
             console.log('fN结果'+JSON.stringify(ret));  
         if (ret.Result == 200) {
          // console.log('结果'+JSON.stringify(ret));
           var mediauserbai;
           var mediaVideouserbai;
           var MediaTotal =Math.floor(ret.SpaceMediaTotal / 1024);
           var maxidv='Mediasurplus';
           var minidv='Mediavideosurplus';
           var MediaTotalGn=Math.floor((ret.SpaceMediaTotal/Math.pow(1024,2)))+Math.floor((ret.SpaceMediaTotal%Math.pow(1024,2)/Math.pow(1024,2))*100)/100;
           var MediaVideouser = Math.floor((ret.SpaceMediaTotal-ret.SpaceMediaUsed)/ 1024);
           var MediaVideouserG=(ret.SpaceMediaTotal-ret.SpaceMediaUsed)/ Math.pow(1024,2);
           var MediaVideouserGn=MediaVideouserG.toFixed(2);
           if(MediaTotalGn>=1){
              $('#MediaTotal').html(MediaTotalGn+'G');
              $('#Mediavideototal').html(MediaVideouserGn+'G');
           }else{
              $('#MediaTotal').html(MediaTotal+'M');
              $('#Mediavideototal').html(MediaVideouser+'M');
           } 
           var mediaVideo = Math.floor(ret.SpaceVideoTotal / 1024);
           // Media_Getspacefloor(ret.SpaceMediaTotal,ret.SpaceMediaUsed,maxid,minid);
           Media_Getspacefloor(ret.SpaceVideoTotal,ret.SpaceVideoUsed,maxidv,minidv);
           if (MediaTotal == 0) {
               mediauserbai = 0;
           }else {
             mediauserbai = Math.floor((ret.SpaceMediaUsed / ret.SpaceMediaTotal) * 100);
           }
           if (mediaVideo == 0) {
             mediaVideouserbai = 0;
           } else {
             mediaVideouserbai = Math.floor((ret.SpaceVideoUsed / ret.SpaceVideoTotal) * 100);
             if (mediaVideouserbai >100) {
                 mediaVideouserbai = 100
               } 
           }
           $('.media_progress_time').children().css('width', '' + mediauserbai + '%');

           $('.media_progress_video').children().css('width', '' + mediaVideouserbai + '%');
           $('.media_main_flow_top').find('img').attr('src', 'img/icon/media/mediacicle.png')
           $('.media_main_flow_top').next().slideDown('slow');
           $('.media_main').outerHeight($(window).outerHeight() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - 217);
           $('.media_mains').outerHeight($(window).outerHeight() - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - 217);
         } else if (ret.Result == 403) {
           common._coverShow("请重新刷新页面!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         } else {
           common._coverShow("操作失败!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         }
       })
     }

  function Media_Getspacefloor(maxcount,mincount,maxid,minid){
     var Totalm=Math.floor((maxcount/1024))+Math.floor((maxcount%1024/1024)*100)/100;
     var Userm=Math.floor((mincount/1024))+Math.floor((mincount%1024/1024)*100)/100;
     var user_overplus=maxcount-mincount;
     if(Totalm>=1){
        var TotalmG=Math.floor((maxcount/Math.pow(1024,2)))+Math.floor((maxcount%Math.pow(1024,2)/Math.pow(1024,2))*100)/100;
        var TotalmGn=Math.floor((user_overplus/Math.pow(1024,2)))+Math.floor((user_overplus%Math.pow(1024,2)/Math.pow(1024,2))*100)/100;
         $('#'+maxid+'').html(TotalmG+'G');
         $('#'+minid+'').html(TotalmGn+'G');
       }else{
         $('#'+maxid+'').html(Totalm+'M');
         $('#'+minid+'').html(Userm+'M');
     }
  }
  
   function MediaEnlarge(data) {
      var inde=$(data).parent().index();
    if($('.meida_level2num').is(':hidden')){
       $('.media_lookleft').hide();
       $('.media_lookright').hide();
    }else{
       $('.media_lookleft').show();
       $('.media_lookright').show();
       $('.media_lookleft').attr('index',inde);
       $('.media_lookright').attr('index',inde);

    }
     var media_imgh = $('.media_lookimg').outerHeight();
     var media_imgw = $('.media_lookimg').outerWidth();
     var meidia_screenh = $(window).height();
     var meidia_screenw = $(window).width();
     var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
     var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
      $(".media_lookimg").css("top", media_top);
      $(".media_lookimg").css("left", media_left);
      var media_imgsrc = $(data).prev('img').attr('src');
      $('.media_lookimg').children('.media_lookimgs').children('img').attr('src', '' + media_imgsrc + '');
       $('#media_video').hide();
       $('.media_lookimgs').show();
       $('.media_lookimg').show();
       $('#bg-color').show();
       meida_imglook();
   }

   function MediaEnlarges(data) {
     var media_imgh = $('.media_lookimg').outerHeight();
     var media_imgw = $('.media_lookimg').outerWidth();
     var meidia_screenh = $(window).height();
     var meidia_screenw = $(window).width();
     var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
     var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
     $(".media_lookimg").css("top", media_top);
     $(".media_lookimg").css("left", media_left);
     var media_imgsrc = $(data).prev('video').attr('src');
     // $('.media_lookimg').children('.media_lookimgs').children('img').attr('src',''+media_imgsrc+'');
     $('#media_video').remove();
     var looking='<video src="" id="media_video" width="700" height="500" controls="controls" type="video/mp4" ></video>';
     $('.media_lookimg').append(looking);
     var vison = IEVersion();
     var id='Meidaplay';
     if (vison <= 10) {
       // Helpplayrs(media_imgsrc,id);
       // $('#media_video').hide();
       // $('#Meidaplay').show();
         Helpplayrs(media_imgsrc,id);
       $('#media_video').hide();
       $('#Meidaplay').show();
     } else if (vison == 11) {
       // $('#media_video').attr('src', '' + media_imgsrc + '');
       // $('#Meidaplay').hide();
       // $('#media_video').show();
         Helpplayrs(media_imgsrc,id);
       $('#media_video').hide();
       $('#Meidaplay').show();
     } else {
       Helpplayrs(media_imgsrc,id);
       $('#media_video').hide();
       $('#Meidaplay').show();
     }
     $('.media_lookimgs').hide();
     $('.media_lookimg').show();
     $('#bg-color').show();
     meida_imglook();
   }

   

   //=================图片视频转发===================================
   function mediaforward(id, named) {
     var obj = $('#media_main_222').find('.media_bgs');
     var ul = $('.help_main_ul');
     var type = obj.attr('types');
     var len = obj.attr('len');
     var ide = obj.attr('id');
     var arrlen=[];

     // if(type == 0 || type == 2){
     // 	state = MESSAGE_TYPE_PICTURE;
     // }else if(type == 1){
     // 	state = MESSAGE_TYPE_VIDEO_STORE;
     // }else if(type == 3){
     // 	state = MESSAGE_TYPE_VIDEO_STORE;
     // }
     // input:checkbox[name='" + named + "']:checked
       $('#' + id).find(".userall_selected").each(function() {
        var cid = $(this).attr('cid');
            arrlen.push(cid);
       })
       if(arrlen.length==0){
            showAlert('请选择转发对象！');
            return;
       }
     if (type == 0 && len <= 1) {
       var url = obj.attr('address');
       var state = MESSAGE_TYPE_PICTURE;
       $('#' + id).find(".userall_selected").each(function() {
         var cid = $(this).attr('cid');
         session_message_forward(cid, state, url);
         $(this).prop('checked', false);
       });
       media_transmitcancel();
       $('.media_level2_share').hide();
        showAlert('转发成功！');
       return;
     }

     if (type == 0) {
         var state = MESSAGE_TYPE_PICTURE;
      MediaForwardTelLChannel(ide,0,id,state);
       // var arry = HelpTrant(ide, 0);
    
       // $('#' + id).find(".userall_selected").each(function() {
       //   var cid = $(this).attr('cid');
       //   for (var k = 0; k < arry.length; k++) {
       //     var url = arry[k];
       //     session_message_forward(cid, state, url);
       //   }
       //   $(this).prop('checked', false);
       // });
       // media_transmitcancel();
       // $('.media_level2_share').hide();
       // showAlert('转发成功！');
     } else if (type == 1) {
       var url = obj.attr('address');
       var state = MESSAGE_TYPE_VIDEO_STORE;
       $('#' + id).find(".userall_selected").each(function() {
         var cid = $(this).attr('cid');
         session_message_forward(cid, state, url);
         $(this).prop('checked', false);
       });
       media_transmitcancel();
       $('.media_level2_share').hide();
        showAlert('转发成功！');
     } else if (type == 2) {
       var url = obj.attr('address');
       var state = MESSAGE_TYPE_PICTURE;
       $('#' + id).find(".userall_selected").each(function() {
         var cid = $(this).attr('cid');
         session_message_forward(cid, state, url);
         $(this).prop('checked', false);
       });
       media_transmitcancel();
       $('.media_level2_share').hide();
        showAlert('转发成功！');
     } else if (type == 3) {
       // var arry = HelpTrant(ide, 3);
       var state = MESSAGE_TYPE_VIDEO_STORE;
       MediaForwardTelLChannel(ide,3,id,state);
       // $('#' + id).find(".userall_selected").each(function() {
       //   var cid = $(this).attr('cid');
       //   for (var k = 0; k < arry.length; k++) {
       //     var url = arry[k];
       //     session_message_forward(cid, state, url);
       //   }
       //   $(this).prop('checked', false);
       // });
       // media_transmitcancel();
       // $('.media_level2_share').hide();
       //  showAlert('转发成功！');
     }
   }

   function MediaForwardTelLChannel(ide,type,id,state){
    var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + ide + '\","ResType":\"' + type + '\"}}';
     $.getJSON(STATION_URL + '?Body=' + body,
        function(ret) {
          if (ret.Result == 200) {
               $('#' + id).find(".userall_selected").each(function() {
                  var cid = $(this).attr('cid');
                   for(var i=0;i<ret.ResUrls.length;i++){
                      session_message_forward(cid,state,ret.ResUrls[i])
                   }
               })
               Media_urror();
               showAlert('转发成功！');
          }else{
            showAlert('转发失败!');
          }
        })
   }

   function Media_Go(data) {
     var types = 0;
     // var loginer = $('#company_name').text();
     var partneli = $('.media_main').find('.media_bgs');
     var callusername = partneli.attr('user_id');
     var userphone = partneli.attr('name');
     var names = callusername;
     callmake_org_imp(names, userphone, types,1);
   }

   



   function mediaforwardTouser() {
    treeAddUsers.clear();
      var arrlen=[];
      $('#media_memberselect1').children().each(function(){
          var id = $(this).attr('name');
          arrlen.push(id);
      })
      if(arrlen==0){
         showAlert('请选择转发对象！');
         return;
      }
    
      MediaTrantCreat();
         return;
     /*返回**/
     //  var cid = MediaTrantCreat();
     // var obj = $('#media_main_222').find('.media_bgs');
     // // var ul = $('.help_main_ul');
     // var type = obj.attr('types');
     // var len = obj.attr('len');
     // var ide = obj.attr('id');
     // // session_message_forward(cid, type, url);
     // // Media_urror();

     // if (type == 0 && len <= 1) {
     //   var url = obj.attr('address');
     //   var state = MESSAGE_TYPE_PICTURE;
     //   session_message_forward(cid, state, url);
     //   Media_urror();
     //   showAlert('转发成功！');
     //   return;
     // }
     // if (type == 0) {
     //   var arry = HelpTrant(ide, 0);
     //   var state = MESSAGE_TYPE_PICTURE;
     //   for (var k = 0; k < arry.length; k++) {
     //     var url = arry[k];
     //     session_message_forward(cid, state, url);
     //   }
       
     //   Media_urror();
     //   showAlert('转发成功！');
     // } else if (type == 1) {
     //   var url = obj.attr('address');
     //   var state = MESSAGE_TYPE_VIDEO_STORE;
     //   session_message_forward(cid, state, url);
        
     //   Media_urror();
     //   showAlert('转发成功！');

     // } else if (type == 2) {
     //   var url = obj.attr('address');
     //   var state = MESSAGE_TYPE_PICTURE;
     //   session_message_forward(cid, state, url);
       
     //   Media_urror();
     //   showAlert('转发成功！');

     // } else if (type == 3) {
     //   var arry = HelpTrant(ide, 3);
     //   var state = MESSAGE_TYPE_VIDEO_STORE;
     //   for (var k = 0; k < arry.length; k++) {
     //     var url = arry[k];
     //     session_message_forward(cid, state, url);
     //   }
     //   Media_urror();
     //   showAlert('转发成功！');
     // }     
  }

   function MediaTrantCreat() {
     var arr = [];
     var name = '';
     var MeiaC;
     $('#media_memberselect1').find('li').each(function(index, el) {
       var id = $(this).attr('name');
       var m = $(this).find('i').text();
       if (index < 3) {
         name += m;
       }
       arr.push(id);
     })
     arr = JSON.stringify(arr);
     name = encodeURI(encodeURI(name));
     // $.ajaxSettings.async = false;
     var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + name + '","Members":' + arr + ',"Match":1}}';
     $.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
       if (ret.Result == 200) {
         // MeiaC = ret.ConversationId;
         MediaTrantGeiTellid(ret.ConversationId); 
       } else {
         showAlert('创建临时会话失败!');
       }
     })
     // return MeiaC;
   }

   function MediaTrantGeiTellid (id) {
       var obj = $('#media_main_222').find('.media_bgs');
       var type = obj.attr('types');
       var len = obj.attr('len');
       var ide = obj.attr('id');
      if (type == 0 && len <= 1) {
           var url = obj.attr('address');
           var state = MESSAGE_TYPE_PICTURE;
           session_message_forward(id, state, url);
           Media_urror();
           showAlert('转发成功！');
           return;
      }
     if (type == 0) {
        var state = MESSAGE_TYPE_PICTURE;
           MediaTrant410show(ide,0,state,id);
     }else if(type == 1){
        var url = obj.attr('address');
        var state = MESSAGE_TYPE_VIDEO_STORE;
        session_message_forward(id, state, url);
         Media_urror();
         showAlert('转发成功！');
     }else if(type == 2){
        var url = obj.attr('address');
        var state = MESSAGE_TYPE_PICTURE;
        session_message_forward(id, state, url);
         Media_urror();
         showAlert('转发成功！');
     }else if(type == 3){
       var state = MESSAGE_TYPE_VIDEO_STORE;
       MediaTrant410show(ide,3,state,id);
     }  
  }
  
  function MediaTrant410show(ide,type,state,id) {
      var body = '{"Code":11410,"Body":{"SessionId":\"' + sessionId + '\","ResId":\"' + ide + '\","ResType":\"' + type + '\"}}';
      $.getJSON(STATION_URL + '?Body=' + body,
        function(ret) {
          if (ret.Result == 200) {
              for (var i=0;i<ret.ResUrls.length;i++) {
                   session_message_forward(id, state,ret.ResUrls[i]);
               }
               Media_urror();
               showAlert('转发成功！');
          }else{
            showAlert('转发失败!');
          }
        })
  }


   function Helpplayrs(addr,id) {

     $('#'+id+'').children().remove();
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
     player.inject(id);
     
   }

   function Media_transmitse(data,val2){
       var val;
       if(val2!=undefined){
          val='';
       }else{
          val=$(data).val();
       }
       var channel=$('.media_transmit11 ').find('.media_channelmain');
       var  tell=$('.media_transmit11 ').find('.media_channeltellmain');
       var  member=$('.media_transmit11 ').find('.media_memberm');
       
       if(!(channel.is(':hidden'))){

           var len=$('#mediafoCh').children().length;
             if($('#mediafoCh').children('h3').hasClass('help_wu')){

             }else{
               for (var i = 0; i < len; i++) {
                if ($('#mediafoCh').children('li').eq(i).attr('name').indexOf(val) > -1) {

                    var mediaName=$('#mediafoCh').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     mediaName=mediaName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#mediafoCh').children('li').eq(i).find('.media_channelmainul1name').empty().html(mediaName);

                    }else {

                      $('#mediafoCh').children('li').eq(i).find('.media_channelmainul1name').empty().html(mediaName);

                    }
                       $('#mediafoCh').children('li').eq(i).show();

                     } else {
                       $('#mediafoCh').children('li').eq(i).hide();
                   }
               }
             }  
       }else if(!(tell.is(':hidden'))){
           var len=$('#mediaLinchat').children().length;
           if($('#mediaLinchat').children('h3').hasClass('help_wu')){

           }else{
               for (var i = 0; i < len; i++) {
               if ($('#mediaLinchat').children('li').eq(i).attr('name').indexOf(val) > -1) {

                    var mediaName=$('#mediaLinchat').children('li').eq(i).attr('name');
                    if(val !='') {
                    
                     mediaName=mediaName.replace(new RegExp("(" +val + ")","ig"), "<strong>" + val + "</strong>");
                     $('#mediaLinchat').children('li').eq(i).find('.media_channelmainul1name').empty().html(mediaName);

                    }else {

                      $('#mediaLinchat').children('li').eq(i).find('.media_channelmainul1name').empty().html(mediaName);

                    }



                     $('#mediaLinchat').children('li').eq(i).show();

                    } else {

                     $('#mediaLinchat').children('li').eq(i).hide();
                   }
              } 
           }

       }else if(!(member.is(':hidden'))){
                if (val == '') {
                $('#Media_user').hide();
                $('#Mediatree').show();
              } else {
              //      $('#Mediatree').hide();
              //      $('#Media_user').show();
              //      var len = $('#Media_user').children().length;
              //   for (var i = 0; i < len; i++) {
              //     if ($('#Media_user').children('li').eq(i).attr('name').indexOf(val) > -1||$('#Media_user').children('li').eq(i).attr('user').indexOf(val) > -1) {
              //       $('#Media_user').children('li').eq(i).show();
              //     } else {
              //       $('#Media_user').children('li').eq(i).hide();
              //     }
              // }
              // OnKeySearchOpens(val);
                   //  var list=[];
                   // for(var i=0;i<HelpManArrays.length;i++){
                   //     // console.log(data);
                   //      var name=HelpManArrays[i].Name;
                   //      var ID=HelpManArrays[i].Uid;
                   //      if((name.indexOf(val) > -1)||(ID.indexOf(val) > -1)){
                   //         list.push(HelpManArrays[i]);
                   //      }
                   // }
                   // OnKeySearchShow(list);
                   OnKeySearch(data);

           }
       }
}
 
function Media_trantfint(){
       var channel=$('.media_transmit11 ').find('.media_channelmain');
       var tell=$('.media_transmit11 ').find('.media_channeltellmain');
       var  member=$('.media_transmit11 ').find('.media_memberm');
       var len=$('#mediaLinchat').children().length;
       var lens=$('#mediafoCh').children().length;
       var val='';
         media_ul2();
         media_tellul2();
      // if(lens)
     // for (var i = 0; i < lens; i++) {
     //    if ($('#mediafoCh').children('li').eq(i).attr('name').indexOf(val) > -1) {
     //           $('#mediafoCh').children('li').eq(i).show();
     //         } else {
     //           $('#mediafoCh').children('li').eq(i).hide();
     //        }
     //     }
         if($('#mediaLinchat').children('h3').hasClass('help_wu')){

         }else{
             for (var i = 0; i < len; i++) {
             if ($('#mediaLinchat').children('li').eq(i).attr('name').indexOf(val) > -1) {
                   $('#mediaLinchat').children('li').eq(i).show();
                  } else {
                   $('#mediaLinchat').children('li').eq(i).hide();
                 }
            } 
         }
          $('#Media_user').hide();
          $('#Mediatree').show();
}

function meida_selectsok(data){
  var container=$(data).parent().prev().html();
  var  listname=$(data).parent().prev().attr('class');

  if(container=='确认取消创建频道？'&&listname=='channelcre'){
    
    
  }else if(container=='确认删除已选记录？'&&listname=='meidadwn'){

 }

 
}
function meida_selectsno(data){


}
function media_inputdiv(namediv){
     if(!($(namediv).hasClass('userall_selected'))){
          $(namediv).addClass('userall_selected'); 
      }else{
         $(namediv).removeClass('userall_selected'); 
     }
     window.event? window.event.cancelBubble = true : e.stopPropagation();
}
function  medialocalremove(media_Id,type){
    for(var i=0;i<MediaArray.length;i++){
             if(MediaArray[i].ResId==media_Id&&MediaArray[i].ResType==type){
                MediaArray.splice(i,1);
              } 
        }
     for(var i=0;i<Meidafirstdata.length;i++){
             if(Meidafirstdata[i].ResId==media_Id&&Meidafirstdata[i].ResType==type){
                Meidafirstdata.splice(i,1);
              } 
        }  
     if(Helpfirstdata!=undefined&&Helpfirstdata.length!=0){
           for(var i=0;i<Helpfirstdata.length;i++){
             if(Helpfirstdata[i].ResId==media_Id&&Helpfirstdata[i].ResType==type){
                Helpfirstdata.splice(i,1);
              } 
        }  
     }
    

}
function Mediarmovelocalarry(data,type){
  if(type==2||type==3){
      for(var i=0;i<data.length;i++){
         for(var k=0;k<MediaArray.length;k++){
              if(MediaArray[k].ResId==data[i]&&MediaArray[k].ResType==type){
                  MediaArray.splice(k,1);
                }
         }
   }
    for(var i=0;i<data.length;i++){
       for(var k=0;k<Meidafirstdata.length;k++){
            if(Meidafirstdata[k].ResId==data[i]&&Meidafirstdata[k].ResType==type){
                Meidafirstdata.splice(i,1);
              }
       }
   }
   if(Helpfirstdata!=undefined){
        for(var i=0;i<data.length;i++){
             for(var k=0;k<Helpfirstdata.length;k++){
                  if(Helpfirstdata[k].ResId==data[i]&&Helpfirstdata[k].ResType==type){
                      Helpfirstdata.splice(i,1);
                    }
             }
       }
   }
}
   for(var i=0;i<data.length;i++){
       for(var k=0;k<MediaArray.length;k++){
            if(MediaArray[k].ResId==data[i]){
                MediaArray.splice(k,1);
              }
       }
   }
    for(var i=0;i<data.length;i++){
       for(var k=0;k<Meidafirstdata.length;k++){
            if(Meidafirstdata[k].ResId==data[i]){
                Meidafirstdata.splice(i,1);
              }
       }
   }
    if(Helpfirstdata!=undefined){
        for(var i=0;i<data.length;i++){
             for(var k=0;k<Helpfirstdata.length;k++){
                  if(Helpfirstdata[k].ResId==data[i]){
                      Helpfirstdata.splice(i,1);
                    }
             }
       }
   }
}
      
 function GetMediaMsgoverTime(xhr,ele){
  var  timeout=setTimeout(function(){  
         xhr.abort(); 
         $('.cover_loading').hide();
         showAlert('数据加载失败！');
          ele.empty().append('<h3 class="help_wu">暂无数据</h3>');
           if(navigator.onLine){
             alert('网络超时，请刷新！');
            }
         },2000); 
     if(timeout){
         clearTimeout(timeout);  
         timeout=null;  
     }
 }            

/*************************更改数据******************************/

  function GetMedialocal(body,timestart,timeover,type) {
      if(Meidafirstdata!=undefined){
            GetMediaLocalshow(Meidafirstdata);    
             return;
      }
     var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'),'UTF-8');
     var medialoading='<div class="meida_mainlodingimg"><img src="img/loading.gif" alt=""><p>加载中，请稍等...</p></div>';
     $('.media_main').empty();
     $('.media_main').append(medialoading);
     console.log('媒体记录'+body);
     /********开始数据*********/
  var xhr=$.ajax({
          type: "post",
          url:GetMsgUrl,
          data:body,
          contentType:'application/json;charset=utf-8',
          timeout: AJAXSET_TIME,
          dataType:'json',
          success: function(data) {
             console.log(JSON.stringify(data));
              MeidaPostHtml(data, body, timestart, timeover, type);
          },
          error:function(data){
                $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
                Meidanum = document.getElementsByName("list").length;
                Mediareturn=true;
              // console.log('失败'+JSON.stringify(data));
             return;
          },
          complete: function (XMLHttpRequest,status) {
                if(status == 'timeout') {
                    xhr.abort();    // 超时后中断请求
                   $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
                    Meidanum = document.getElementsByName("list").length;
                    Mediareturn=true;
                    showAlert('网络超时，请刷新！');
                         if(!navigator.onLine){
                          
                            alert('网络不可用，请检查你的网络设置');
                         }
                }
            }
      });
   /**********结束*********/
   }

  

 /**********缓存数据************/
  function GetMediaLocalshow(meidadata){
    /*****开始 ****/
       $('.media_main').empty();
       var channel_dates='';
         MediaChoose=0;
         $('.media_main_footer  .meidatotal').html(0);
         $('input[name=listAll]').attr('disabled', false);
         $("input[name='listAll']").prop("checked", false);
         $("input[name='listAll']").prop("indeterminate", false);
         var total=1;// var total = obj.PageTotalCount;
         var index = 0;
         MediaArray =meidadata; //进行赋值
           for (var i = 0; i <meidadata.length; i++) {
             var time = meidadata[i].Time.split(" ");
             var time1 = time[0];
             var time2 = time[1];
             if (time1 != channel_dates) {
               var html = '';
               html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
               $('.media_main').append(html);
               channel_dates = time1;
             }
             var html1 = '';
             if (meidadata[i].ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (meidadata[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               if (meidadata[i].Content!=''&&meidadata[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               }else{
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + meidadata[i].Uid + '" id="' + meidadata[i].ResId + '" user_id="' +meidadata[i].Name + '" name="' + meidadata[i].Uid + '" content="'+meidadata[i].Content + '" detail="' +meidadata[i].Detail + '" len="' +meidadata[i].ResCount + '" types="' + meidadata[i].ResType + '" address="' +meidadata[i].ResUrl + '" time="' +meidadata[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata[i].ResId+'Me"><label for="'+meidadata[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + meidadata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + meidadata[i].Detail + '</span></div></li>';
             } else if (meidadata[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (meidadata[i].Content!=''&&meidadata[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' +meidadata[i].Uid + '" id="' +meidadata[i].ResId + '" user_id="' +meidadata[i].Name + '" name="' +meidadata[i].Uid + '" content="' +meidadata[i].Content + '" detail="' +meidadata[i].Detail + '" len="' +meidadata[i].ResCount + '" types="' + meidadata[i].ResType + '" address="' +meidadata[i].ResUrl + '"  time="' +meidadata[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata[i].ResId+'Me"><label for="'+meidadata[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' +meidadata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +meidadata[i].Detail + '</span></div></li>';
             } else if (meidadata[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' +meidadata[i].Uid + '" id="' +meidadata[i].ResId + '" content="' + meidadata[i].Content + '" detail="' +meidadata[i].Detail + '" user_id="' + meidadata[i].Name + '" name="' +meidadata[i].Uid + '" len="' +meidadata[i].ResCount + '" types="' +meidadata[i].ResType + '" address="' +meidadata[i].ResUrl + '"  time="' +meidadata[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata[i].ResId+'Me"><label for="'+meidadata[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' +meidadata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + meidadata[i].Detail + '</span></div></li>';
             } else if (meidadata[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' +meidadata[i].Uid + '" user_id="' +meidadata[i].Name + '" content="' + meidadata[i].Content + '" detail="' +meidadata[i].Detail + '" id="' +meidadata[i].ResId + '"  name="' + meidadata[i].Uid + '" len="' + meidadata[i].ResCount + '" types="' +meidadata[i].ResType + '" address="' +meidadata[i].ResUrl + '"  time="' + meidadata[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata[i].ResId+'Me"><label for="'+meidadata[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + meidadata[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' +meidadata[i].Detail + '</span></div></li>';
             }
             $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').append(html1);
             Meidanum =MediaArray.length;
           }
            if(meidadata.length == 0){
               $('.media_main').append('<h3 class="help_wu">暂无数据</h3>');
               Meidanum =MediaArray.length;
            }
           if (meidadata.length >= 30) {
              var total=MediaMorecode[0];
              var index=MediaMorecode[1];
              var timestart= MediaMorecode[2];
              var timeover=MediaMorecode[3];
              var type=MediaMorecode[4];
              mediascroll(total, index, timestart, timeover, type); 
              meidaobjlength=true;
           }else{
              meidaobjlength=false;
           }
            Mediareturn=true;
    /*****结束*******/
   }
 


/********上报*********/
 
function meidareportarray(ids){          
    // console.log('删除ID'+JSON.stringify(meidaselectid));

    if(meidaselectid==''){
       return;
    }
   if(meidaselectid.length==1&&meidaselectid==ids){
        // console.log('最后一个标注')
         meidaselectid=[];
         var MediaNull = Meidanum;
          MediaChoose -= 1;
          MediaNull += 1;
         $('.media_main_footer .meidatotal').text(MediaChoose);
         $("input[name='listAll']").prop("checked", false);         
        return;
    }else{
        for(var i=0;i<meidaselectid.length;i++){
           if(meidaselectid[i]==ids){
               // console.log('完成删除');
                meidaselectid.splice(i,1);
                var MediaNull = Meidanum;
                MediaChoose -= 1;
                MediaNull += 1;
                $("input[name='listAll']").prop("indeterminate", true); 
                $('.media_main_footer .meidatotal').text(MediaChoose);
            }
        }
    }
  return;
}

function mediafirstadd(strdata){
      var medialistmsg = strdata.replace(/\n|\r\n/g, " "); 
       var newmsg = jQuery.parseJSON(medialistmsg);
    
    // var newmsg=MediastrToJson(strdata);
    
    
      Meidafirstdata.unshift(newmsg);
    var valinput=$('#MediaSearchin').val().trim();
              if(valinput==''){
                 // console.log('显示正常');
                 GetMediaLocaladdshow(newmsg);
              }
          if(Meidafirstdata.length>30){
            var meidaremovelast=Meidafirstdata.pop();
            var mediaremovelastid=meidaremovelast.ResId;
            $('#'+mediaremovelastid).remove();
                // console.log('最后的ID'+mediaremovelastid);
                meidareportarray(mediaremovelastid);
                media_Fintdatadiv(); 
          }
}

  function media_Fintdatadiv(){
    var len=$('#media_main_222').children('.media_main_date').length;
    for(var i=0;i<len;i++){
       var lis=$('#media_main_222').children('.media_main_date').eq(i).children('.media_main_ul').children('ul');
       if(lis.children().length==0){
         $('#media_main_222').children('.media_main_date').eq(i).remove();
         return;
       }
    }
  } 


 function MediastrToJson(str) {
                 var json = eval('(' + str + ')');
                  return json;
        }

    
function MediaGetophonename(ids){
   for(var i=0;i<HelpManArrays.length;i++){
         if(HelpManArrays[i].Uid==ids){
            return HelpManArrays[i].Name;
         }
   }
}
function MediaGetnowtime(){
 var date = new Date();
 var nowtime = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
  return nowtime;
}
/*************和助手****************/
 function helpfirstadd(strdata){
     var medialistmsg = strdata.replace(/\n|\r\n/g, " ");
     var newmsg = jQuery.parseJSON(medialistmsg);
   // var newmsg=MediastrToJson(strdata);

        Helpfirstdata.unshift(newmsg);
        if(Helpfirstdata.length>30){
          var HelpFirstlast=Helpfirstdata.pop();
            var Helpremovelastid=HelpFirstlast.ResId;
            $('#h'+Helpremovelastid).remove();
            HelpRemoveDOMlastid(Helpremovelastid);
            Help_Fintdatadiv();
        }
        var valinput=$('#Helpsearchin').val().trim();
        if(valinput==''){
          GetHelplocaladdshow(newmsg);  
        }
 }  



/*************添加数据***********/
function GetMediaLocaladdshow(meidadata){
     var  channel_dates='';
     var time = meidadata.Time.split(" ");
             var time1 = time[0];
             var time2 = time[1].slice(0,5);
      
        if($('#' + time1 + '').length > 0){
             channel_dates=time1
          }else{
               var html = '';
               html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
               $('.media_main').prepend(html);
               channel_dates = time1;
          }
             var html1 = '';
             if (meidadata.ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (meidadata.ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               if (meidadata.Content!='') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + meidadata.Uid + '" id="' + meidadata.ResId + '" user_id="' +meidadata.Name + '" name="' + meidadata.Uid + '" content="'+meidadata.Content + '" detail="' +meidadata.Detail + '" len="' +meidadata.ResCount + '" types="' + meidadata.ResType + '" address="' +meidadata.ResUrl + '" time="' +meidadata.Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata.ResId+'Me"><label for="'+meidadata.ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + meidadata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + meidadata.Detail + '</span></div></li>';
             } else if (meidadata.ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (meidadata.Content!='') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' +meidadata.Uid + '" id="' +meidadata.ResId + '" user_id="' +meidadata.Name + '" name="' +meidadata.Uid + '" content="' +meidadata.Content + '" detail="' +meidadata.Detail + '" len="' +meidadata.ResCount + '" types="' + meidadata.ResType + '" address="' +meidadata.ResUrl + '"  time="' +meidadata.Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata.ResId+'Me"><label for="'+meidadata.ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' +meidadata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' +meidadata.Detail + '</span></div></li>';
             } else if (meidadata.ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' +meidadata.Uid + '" id="' +meidadata.ResId + '" content="' + meidadata.Content + '" detail="' +meidadata.Detail + '" user_id="' + meidadata.Name + '" name="' +meidadata.Uid + '" len="' +meidadata.ResCount + '" types="' +meidadata.ResType + '" address="' +meidadata.ResUrl + '"  time="' +meidadata.Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata.ResId+'Me"><label for="'+meidadata.ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' +meidadata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + meidadata.Detail + '</span></div></li>';
             } else if (meidadata.ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' +meidadata.Uid + '" user_id="' +meidadata.Name + '" content="' + meidadata.Content + '" detail="' +meidadata.Detail + '" id="' +meidadata.ResId + '"  name="' + meidadata.Uid + '" len="' + meidadata.ResCount + '" types="' +meidadata.ResType + '" address="' +meidadata.ResUrl + '"  time="' + meidadata.Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+meidadata.ResId+'Me"><label for="'+meidadata.ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + meidadata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' +meidadata.Detail + '</span></div></li>';
             }     
             $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').prepend(html1); 

   }
 function GetHelplocaladdshow(helpdata){
             var  channel_dates='';
             var time = helpdata.Time.split(" ");
             var time1 = time[0];
             var time2 = time[1].slice(0,5);
        if($('#s' + time1 + '').length > 0) {
             channel_dates=time1
          }else{
               var html = '';
                html += '<div class="help_main_date" id="s' + time1 + '"><div>' + time1 + '</div><div class="helpdatebg help_main_ul"><ul class=""></ul></div></div>';
            $('#loaded').prepend(html);
               channel_dates = time1;
          }
               var html1 = '';
          if (helpdata.ResType == 0) {
            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            var imglens;
            if (helpdata.Content == '') {
              iconimg = '';
            } else {
              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            }
            if (helpdata.ResCount > 1) {
              imglens = '<img src="img/icon/newicon/meida_nums.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
            } else {
              imglens = '<img src="img/icon/newicon/help_img2.png"  class="Helpupimg" alt="" onclick="helpleve2(this)">';
            }
            html1 = '<li class="fix" types="0" id="h' +helpdata.ResId + '"   username="' +helpdata.Name + '" user_id="' +helpdata.Uid + '" ulr="' + helpdata.ResUrl + '" time="' +helpdata.Time + '" Detail="' + helpdata.Detail + '" con="' + helpdata.Content + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '" users="' + helpdata.Uid + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span>' + imglens + '' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata.Detail + '</span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          } else if (helpdata.ResType == 1){
            var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            if (helpdata.Content == ''){
              iconimg = '';
            }else{
              iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
            }
            html1 = '<li class="fix" types="1" users="' + helpdata.Uid + '" id="h' + helpdata.ResId + '"  user_id="' + helpdata.Uid + '"   username="' + helpdata.Name + '" ulr="' + helpdata.ResUrl + '" time="' + helpdata.Time + '" Detail="' + helpdata.Detail + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '"  con="' + helpdata.Content + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span><img src="img/icon/newicon/help_video.png" class="Helpupvideo" alt="" onclick="helpleve2(this)">' + iconimg + '</div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata.Detail + '</span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          } else if (helpdata.ResType == 2) {
            html1 = '<li class="fix" types="2"  time="' + helpdata.Time + '" users="' + helpdata.Uid + '" id="h' + helpdata.ResId + '"  user_id="' + helpdata.Uid + '"   username="' + helpdata.Name + '" ulr="' + helpdata.ResUrl + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="helpleve2(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata.Detail + '</span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          } else if (helpdata.ResType == 3) {
            html1 = '<li class="fix" types="3" users="' + helpdata.Uid + '" user_id="' + helpdata.Uid + '" id="h' + helpdata.ResId + '"   username="' + helpdata.Name + '" ulr="' + helpdata.ResUrl + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="help_videocun(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata.Detail + '</span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          } else if (helpdata.ResType == 10) {
            html1 = '<li class="fix" types="10" users="' + helpdata.Uid + '" user_id="' + helpdata.Uid + '"   userid="' + helpdata.Uid + '"  username="' + helpdata.Name + '" reportid="' + helpdata.ResId + '"  id="h' + helpdata.ResId + '" ulr="'+ helpdata.ResUrl + '" time="' + helpdata.Time + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span><img src="img/icon/newicon/help_warn.png" alt="" onclick="helpwarn(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 +'</span></p><span></span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          } else if (helpdata.ResType == 11) {
            html1 = '<li class="fix" types="11" users="' + helpdata.Uid + '"  user_id="' + helpdata.Uid + '" reportid="' + helpdata.ResId + '" id="h' + helpdata.ResId + '" username="' + helpdata.Name + '" ulr="' + helpdata.ResUrl + '" time="' + helpdata.Time + '" len="' + helpdata.ResCount + '" read="' + helpdata.ReadStatus + '"><div class="help_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check HelpInput" onclick="HelpInputSelect(this)" name="HelpInput" id="'+helpdata.ResId +'He"><label for="'+helpdata.ResId +'He"></label></span><img src="img/icon/newicon/help_radio.png" alt="" onclick="helpradio(this)"></div><div class="help_main_datelis "><p><span class="help_uidname">' + helpdata.Name + '</span><span class="fr">' + time2 + '</span></p><span>' + helpdata.Detail + '</span></div></li>';
            $('#s' + time1).children('.helpdatebg').children('ul').prepend(html1);
          }
 }  

 function IsEdge (){
         var userAgent = navigator.userAgent;
         var isEdge = userAgent.indexOf("Edge") > -1;
          return isEdge;
 }



/********************************ajax 数据交互****************************************/

   function AjaxPostMsg (body, time, sucess, error, overtime, tp, msgarr, conword) {
        if(tp){
           $('.cover_loading').show();
        }
        console.log(body);
       var xhr=$.ajax({
            type: "post",
            url:GetMsgUrl,
            // url:STATION_URL,
            data:body, //参数
            contentType:'application/json;charset=utf-8',
            timeout: time, //参数 
            dataType:'json',
            success: function(data) {
              console.log(JSON.stringify(data));
                sucess(data, msgarr);
            },
            error:function(data){
                 error(conword);
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
                     overtime();
                  }
              }
        });
  }



function MeidaPostHtml (obj, body, timestart, timeover, type) {
     var channel_dates = '';
     var html = '';
      $('.media_main').empty();
         if (obj.Result == 200) { 
                // console.log('媒体记录报文'+JSON.stringify(obj)+'');
                 console.log('媒体记录第一次');
                 MediaChoose=0;
                 $('.media_main_footer  .meidatotal').html(0);
                 $('input[name=listAll]').attr('disabled', false);
                 $("input[name='listAll']").prop("checked", false);
                 $("input[name='listAll']").prop("indeterminate", false);
                 var total = obj.PageTotalCount;
                 var index = 0;
                 MediaArray = obj.Resources;
                 Meidafirstdata=obj.Resources;
           for (var i = 0; i < obj.Resources.length; i++) {
             var time = obj.Resources[i].Time.split(" ");
             var time1 = time[0];
             var time2 = time[1].slice(0,5);
             if (time1 != channel_dates) {
               var html = '';
               html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
               $('.media_main').append(html);
               channel_dates = time1;
             }
             var html1 = '';
             if (obj.Resources[i].ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               
               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 // console.log('长度'+obj.Resources[i].Content.length);
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               }else{
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '" time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" user_id="' + obj.Resources[i].Name + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" id="' + obj.Resources[i].ResId + '"  name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             }
             $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').append(html1);
             Meidanum =MediaArray.length;
           }
            if(obj.Resources.length == 0){
               $('.media_main').append('<h3 class="help_wu">暂无数据</h3>');
               Meidanum =MediaArray.length;
            }
           if (obj.Resources.length >= 30) {
              MediaMorecode[0]=total;
              MediaMorecode[1]=index;
              MediaMorecode[2]=timestart;
              MediaMorecode[3]=timeover;
              MediaMorecode[4]=type;
              mediascroll(total, index, timestart, timeover, type);
              meidaobjlength=true;
           }else{
              meidaobjlength=false;
           }
            Mediareturn=true;
         } else if (obj.Result == 403) {
           $('.media_main').append('<h3 class="help_wu">获取数据失败！</h3>');
           Meidanum = document.getElementsByName("list").length;
            Mediareturn=true;
         } else {
            $('.media_main').append('<h3 class="help_wu">暂无数据</h3>');
            Meidanum = document.getElementsByName("list").length;
            Mediareturn=true;
         } 
       /*****结束*******/
  }

  function MediaRemovepost(data){
     $('.cover_loading').hide();
     if(data.Result==200){
       showAlert('已删除');
       Meidafirstdata=undefined;
       code10400();
       $('.media_InputAll').removeClass('userall_selected');
       $('.media_main_downs .mediadownshow ').removeClass('HelpReads');
       $('.media_main_downs .mediadownshow ').attr('disabled','disabled');
       $('.meidatotal').html(0);
     }else{
      showAlert('删除失败！');
     }
  }
 
 function MediaSucessDown (obj) { 
  console.log('下载'+JSON.stringify(obj));
       if(Meidafirstdata!=undefined) {
           $('.media_level2_ul3').prev().children('img').attr('src','img/icon/newicon/help_download.png');
       }
       if(Helpfirstdata!=undefined) {
          $('.helpforward').prev().children('img').attr('src','img/icon/newicon/help_download.png');
       }
     $('.cover_loading').hide();
      if (obj.Result == 200) {
          showAlert('已下载');

           var address = obj.URL;
           var  address1 = '';
               savepics(address);
         }else{
          console.log(obj.Result);
           showAlert('下载失败！');
         }
  } 
 
   function MediaAjaxRemove(ret, arr){ 
      var medias_Id=arr[0]+'a';
      var media_Id=arr[0];
      var type=arr[1];
      console.log('删除返回'+ret.Result);
       $('.cover_loading').hide();
      if (ret.Result == 200) {
             
             $('.media_level2_ul4').children('img').attr('src','img/icon/newicon/help_deleted.png');
             $('.media_level2_delete').hide();
             $('#' + medias_Id).hide();
             var fahter=$('#' + media_Id).parent().children().length;
             if(fahter==1){
               $('#' + media_Id).parent().parent().parent().remove();
             }else{
               $('#' + media_Id).remove();
             }
             $('.mediarights').show();
              showAlert('已删除');
              medialocalremove(media_Id,type);
        } else  if(ret.Result ==404){
              showAlert('该数据已删除,请刷新数据列表！');
        }else{
              showAlert('删除失败！');
        }
  } 

  function MediaRmoveError() {
     $('.cover_loading').hide();
      showAlert('删除失败!');
  }

  function MediaErrorDown (conword){
     $('.cover_loading').hide();
     showAlert(conword);
  } 

  function MediaAjaxovertime(){
       $('.cover_loading').hide();
       showAlert('网络超时，请刷新!');
       if(!navigator.onLine){
          alert('网络不可用，请检查你的网络设置');
       }
  }

    function MeidaPostnextHtml(obj, index, timestart, timeover, type){
    //total, index, timestart, timeover, type
     /****开始****/
      var html = '';
         if (obj.Result == 200) {
           if( obj.Resources.length ==0){
              $('.MediaPagemore').remove();
              showAlert('已经是最后一页！');
              return;
           }
           var total = obj.PageTotalCount;
           var channel_dates;
           var timeID = obj.Resources[0].Time.split(" ");
           var timeIDs = timeID[0];
           if ($('#' + timeIDs + '').length > 0) {
             channel_dates = timeIDs;
           } else {
             channel_dates = '';
           }
           $('.MediaPagemore').remove();
            var getarray=obj.Resources;
                MediaArray=MediaArray.concat(getarray);
           for (var i = 0; i < obj.Resources.length; i++) {
             var time = obj.Resources[i].Time.split(" ");
             var time1 = time[0];
             var time2 = time[1].slice(0,5);
             if (time1 != channel_dates) {
               var html = '';
               html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
               $('.media_main').append(html);
               channel_dates = time1;
             }
             var html1 = '';
             if (obj.Resources[i].ResType == 0) { //obj.Reports[i].ResCount
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }

               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '" time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix"  users="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" users="' + obj.Resources[i].Uid + '" user_id="' + obj.Resources[i].Name + '" id="' + obj.Resources[i].ResId + '"  name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             }
             /*****进行调试***********/
             $('#' + time1).children('.media_main_ul').children('ul').append(html1);
             Meidanum = MediaArray.length;
             MediaNull = Meidanum;
           }
           $('.media_InputAll ').removeClass('userall_selected');
           if (obj.Resources.length == 30) {
              MediaMorecode[0]=total;
              MediaMorecode[1]=index;
              MediaMorecode[2]=timestart;
              MediaMorecode[3]=timeover;
              MediaMorecode[4]=type;
             mediascroll(total, index, timestart, timeover, type);
             meidaobjlength=true;
           }else{
             meidaobjlength=false;
           }
         } else if (obj.Result == 403) {
           $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
         } else {
           $('.media_main').empty().append('<h3 class="help_wu">暂无数据</h3>');
         }
     /****结束*****/
  } 

   function MediaSucessRemarks(ret, arr){
      var lenn = $('#' + arr[0]).attr('content').length;
         if (ret.Result == 200) {
           $('.cover_loading').hide();
           if (arr[1] == '') {
             if (lenn == 0) {
               $('#' + arr[0]).attr('content', '');
                showAlert('保存备注成功！')
             } else {
               $('#' +arr[0]).attr('content', '');
               $('#' +arr[0]).find('.HelpContent').remove();
               showAlert('保存备注成功！');
             }
           }else{
             if (lenn == 0) {
               var helpimgs = '<img src="img/icon/newicon/biao.png" class="HelpContent" alt="" />';
               $('#' +arr[0]).children('.media_main_dateli ').append(helpimgs);
                $('#' +arr[0]).attr('content', '' + arr[1] + '');
                    // var regs = new RegExp("<br>", "g");
                    // var  retcontainer=container.replace(regs, "\n");
                    $('#media_text').val(arr[1]);
                   showAlert('保存备注成功!');
             }else{
                    $('#'+arr[0]).attr('content', '' +arr[1] + '');
                    // var regs = new RegExp("<br>", "g");
                    // var  retcontainer=container.replace(regs, "\n");
                    $('#media_text').val(arr[1]); 
                    showAlert('保存备注成功!');
             }
           }
           $('.media_texticon').children('span').hide();
           $('.media_texticon').children('img').show();
           $('#media_text').attr('disabled', true);
           for(var i=0;i<MediaArray.length;i++){
               if(MediaArray[i].ResId==arr[0]){
                  MediaArray[i].Content=arr[1];
               } 
           }
         }else{
            $('.cover_loading').hide();
            showAlert('操作失败');
         }
  }

 function MediaPostTypeMsgall(obj, arrmsg) {
        var html = '';
        var channel_dates='';
        $('.media_main').empty();
        var timestart=arrmsg[0];
        var timeover=arrmsg[1];
        var type=arrmsg[2];
     if (obj.Result == 200) { 
                console.log('媒体记录报文'+JSON.stringify(obj)+'');
                 MediaChoose=0;
                 $('.media_main_footer .meidatotal').html(0);
                 $('input[name=listAll]').attr('disabled', false);
                 $("input[name='listAll']").prop("checked", false);
                 $("input[name='listAll']").prop("indeterminate", false);
                 var total = obj.PageTotalCount;
                     MediaArray = obj.Resources;
                 var index = 0;
           for (var i = 0; i < obj.Resources.length; i++) {
             var time = obj.Resources[i].Time.split(" ");
             var time1 = time[0];
             var time2 = time[1].slice(0,5);
             if (time1 != channel_dates) {
               var html = '';
               html += '<div class="media_main_date" id="' + time1 + '"><div>' + time1 + '</div><div class="media_main_ul"><ul></ul></div></div>';
               $('.media_main').append(html);
               channel_dates = time1;
             }
             var html1 = '';
             if (obj.Resources[i].ResType == 0) { 
               var img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].ResCount > 1) {
                 img = '<img src="img/icon/newicon/meida_nums.png" alt="" onclick="Getmedialevel2(this)">';
               } else {
                 img = '<img src="img/icon/newicon/help_img2.png" alt="" onclick="Getmedialevel2(this)">';
               }
               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               }else{
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '" time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span>' + img + '' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 1) { //上报视屏
               var iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               if (obj.Resources[i].Content!=''&&obj.Resources[i].Content!=' ') {
                 iconimg = '<img src="img/icon/newicon/biao.png" class="HelpContent " alt="" />';
               } else {
                 iconimg = ' ';
               }
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_video.png" alt="" onclick="Getmedialevel2(this)">' + iconimg + '</div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 2) { //抓拍图片
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" id="' + obj.Resources[i].ResId + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" user_id="' + obj.Resources[i].Name + '" name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_img.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             } else if (obj.Resources[i].ResType == 3) { //视频存储
               html1 = '<li class="fix" users="' + obj.Resources[i].Uid + '" user_id="' + obj.Resources[i].Name + '" content="' + obj.Resources[i].Content + '" detail="' + obj.Resources[i].Detail + '" id="' + obj.Resources[i].ResId + '"  name="' + obj.Resources[i].Uid + '" len="' + obj.Resources[i].ResCount + '" types="' + obj.Resources[i].ResType + '" address="' + obj.Resources[i].ResUrl + '"  time="' + obj.Resources[i].Time + '"><div class="media_main_dateli fl"><span class="Mediabginput"><input type="checkbox" class="input_check" onclick="media_innputcheck(this)" name="list" id="'+obj.Resources[i].ResId+'Me"><label for="'+obj.Resources[i].ResId+'Me"></label></span><img src="img/icon/newicon/help_videoline.png" alt="" onclick="Getmedialevel2(this)"></div><div class="media_main_datelis "><p><span class="meida_uidname">' + obj.Resources[i].Name + '</span><span class="fr">' + time2 + '</span></p><span>' + obj.Resources[i].Detail + '</span></div></li>';
             }
             $('.media_main').children('#' + time1).children('.media_main_ul').children('ul').append(html1);
             Meidanum =MediaArray.length;
           }
            if(obj.Resources.length == 0){
               $('.media_main').append('<h3 class="help_wu">暂无数据</h3>');
               Meidanum =MediaArray.length;
            }
           if (obj.Resources.length == 30) {
              MediaMorecode[0]=total;
              MediaMorecode[1]=index;
              MediaMorecode[2]=timestart;
              MediaMorecode[3]=timeover;
              MediaMorecode[4]=type;
              mediascroll(total, index, timestart, timeover, type);
              meidaobjlength=true;
           }else{
              meidaobjlength=false;
           }
              Mediareturn=true;
      }
   }

   function MediaAllMsgErrorDown(){
         $('.media_main').append('<h3 class="help_wu">暂无数据</h3>');
         showAlert('数据获取失败！');
         // if(!navigator.onLine){
         //    alert('网络不可用，请检查你的网络设置');
         // }
   } 
 
 /*****************/

$(function(){
    $(window).resize(function() {
       var changeHeight=$(window).height()-80;
       Media_HeightFint(changeHeight);
       Project_set_parameter(changeHeight);
       Project_TaskHeight(changeHeight);
       Project_WarnHeight(changeHeight);
       Project_LineHeight(changeHeight);
       Project_RadioHeight(changeHeight);
       Project_ChannelHeight(changeHeight);
       Project_UserHeight(changeHeight);
       Project_HelpHeight(changeHeight);
       Project_MapHeight(changeHeight);
       if(changeHeight<437){
          $('body').removeClass('meida_body_height');
          $('.Height').height(427);
       }else{
         $('body').addClass('meida_body_height');
         $('.Height').height(changeHeight);
       }
  });
})

function Media_HeightFint(contentHt){
   if($('.media_main').length>0){
    var showul=$('.media_main_flow').children('ul').is(':hidden');
      if(contentHt<437){
              // $('.media_main').outerHeight(437 - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - $('.media_main_flow').outerHeight());
              if(showul){
                 $('.media_main').outerHeight(147);  
              }else{
                  $('.media_main').outerHeight(247);  
              }
          }else{
            // $('.media_main').outerHeight(contentHt - $('.media_top').outerHeight() - $('.media_main_footer').outerHeight() - $('.media_main_flow').outerHeight()-5);
             // $('.media_main').outerHeight(contentHt-182);
             if(showul){
                 $('.media_main').outerHeight(contentHt - 172);  
              }else{
                  $('.media_main').outerHeight(contentHt - 272);  
              }
        }
        Media_HeightLeve2Fint(contentHt);
        Meida_HeightTrantMint(contentHt);
    } 
}

function Media_HeightLeve2Fint(contentHt){
        if(contentHt<437){
               $('.media_level2').outerHeight(437);
               $('.media_level2_main').outerHeight(267);
            }else{
               $('.media_level2').outerHeight(contentHt);
               $('.media_level2_main').outerHeight(contentHt-194);
          }
  }

 function Meida_HeightTrantMint(contentHt){
     if(contentHt<437){
          $('.media_transmit').outerHeight(437);
         $('.media_channelmainul1').outerHeight(202);
         $('.media_channeltellmainul1').outerHeight(202);
         $('.media_memberm').outerHeight(284);
         $('#media_memberselect1').outerHeight(347); 
       }else{
         $('.media_transmit').outerHeight(contentHt);
         $('.media_channelmainul1').outerHeight(contentHt -235);
         $('.media_channeltellmainul1').outerHeight(contentHt - 235);
         $('.media_memberm').outerHeight(contentHt - 153);
         $('#media_memberselect1').outerHeight(contentHt - 90);
     }
 } 

 function Project_set_parameter(contentHt){
     if($('#station_set').length>0){
          if(contentHt<437){
           $('#station_set').children('.moreset_border_r').height(437);
          }else{
            $('#station_set').children('.moreset_border_r').height(contentHt);
          }
     }
 }

 function Project_TaskHeight(contentHt) {
      if($('.task_ulmenu').length>0){
          if(contentHt<437){
            $('.task_height').css('height',437);
            $('.task_ulmenu').css('height', 387);
            $('.Task_detailslist').css('height',217);
          }else{
             $('.task_height').css('height',contentHt);
             $('.task_ulmenu').css('height',contentHt-50);
             $('.Task_detailslist').css('height',contentHt-220);
          }
       } 
 }

 function Project_WarnHeight(contentHt){
     if($('.alert_main').length>0){
          if(contentHt<437){
              $('.alert_border_r').height(367);
              $('.alert_main').height(437- 154);
               $('.alert_alert').height(437);
               $('.alert_level2_main').height(437-171);
          }else{
             $('.alert_border_r').height(contentHt);
             $('.alert_main').height(contentHt- 154);
             $('.alert_alert').height(contentHt);
             $('.alert_level2_main').height(contentHt-171);
          }
     } 
 }

 function Project_LineHeight(contentHt){
     if($('.fence').length>0){
          if(contentHt<437){
             $('.fence-list').height(437 - 52);
             $('.fence').height(437);
             $('.content_main').height(437-92);
            }else{
              $('.fence').height(contentHt);
              $('.fence-list').height(contentHt- 52);
              $('.content_main').height(contentHt-92);
          }
     } 
 }

 function Project_RadioHeight(contentHt){
    if($('.radio_border_r').length>0){
       if(contentHt<437){
            $('.radio_main_height').height(437 -  155);
            $('.radio_levle2').outerHeight(437);
            $('.radio_level2_footer').outerHeight(437 - 48 - 16);
         }else{
             $('.radio_main_height').height(contentHt -155);
             $('.radio_levle2').outerHeight(contentHt);
             $('.radio_level2_footer').outerHeight(contentHt - 48 - 16);
        }
     } 
 }

 function Project_ChannelHeight(contentHt){
      if($('.channel_location_first').length>0){
          if(contentHt<437){
             $('.channel_main1').height(437-170);
             $('.channel_main2').height(437-270);
             $('.channel_tellchat').height(437 - 270);
           }else{
             $('.channel_main1').height(contentHt - 170);
             $('.channel_main2').height(contentHt-270);
             $('.channel_tellchat').height(contentHt - 270);
          }
      }
 }

 function Project_UserHeight(contentHt){
      if($('.user-column1').length>0){
          if(contentHt<437){
              $('.user-column1').height(437 - $('.user-Cross-Enterprise').height());
              $('.org-mid').height(437 - $('.org-top').outerHeight() - $('.org-btm').outerHeight());
           }else{
               $('.user-column1').height(contentHt - $('.user-Cross-Enterprise').height());
              $('.org-mid').height(contentHt - $('.org-top').outerHeight() - $('.org-btm').outerHeight());
          }
      }
 }

 function Project_HelpHeight(contentHt){
        if($('.help_user').length>0){
          if(contentHt<437){
              $('.itemwrap').height(437 - 142);
              $('.ht1help').height(437 - 182);
              $('.hthelp').height(437 - 125);
              $('.ht3').height(437 - 127);
           }else{
               $('.itemwrap').height(contentHt - 142);
               $('.ht1help').height(contentHt - 182);
               $('.hthelp').height(contentHt - 125);
               $('.ht3').height(contentHt - 127);
          }
      }
 }

 function Project_MapHeight(contentHt){
    if($('.manage_monite_user').length>0){
          if(contentHt<437){
              $('.middle_box').height(437 - $('.mon-add-top ').outerHeight() - $('.user-Cross-footer').outerHeight());
           }else{
              $('.middle_box').height(contentHt - $('.mon-add-top ').outerHeight() - $('.user-Cross-footer').outerHeight());
          }
      }
 }


function meida_imgprev (data) {
  
      var inde=$(data).attr('index');
      var len=MediaImgs.length;
      if(inde==0){

         $(data).attr('index',len-1);
         $('.media_lookright').attr('index',len-1);
         $(data).next().attr('src',MediaImgs[len-1]);
     

      }else{
        inde--;
        $(data).attr('index',inde);
        $('.media_lookright').attr('index',inde);
        $(data).next().attr('src',MediaImgs[inde]);

      }

} 

function meida_imgnext (data) {

     var inde=$(data).attr('index');
      var len=MediaImgs.length;
      if(inde==len-1){

         $(data).attr('index',0);
         $('.media_lookleft').attr('index',0);
         $(data).prev().attr('src',MediaImgs[0]);
     

      }else{
        inde++;
        $(data).attr('index',inde);
        $('.media_lookleft').attr('index',inde);
        $(data).prev().attr('src',MediaImgs[inde]);

      }

}

