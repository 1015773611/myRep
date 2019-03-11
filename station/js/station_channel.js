var channelInfoMap = new HashMap();//全部频道信息
var currentClmembers = new HashMap(); //当前连接频道成员
var ChannelAllcher=new HashMap();
var currentChannelMembers = [];
var currentChatMembers = [];//当前打开会话成员信息
var isCurrentChannel = false;
var channelnum;
var DownDownnumChoose = 0;
var Downnumnull=0;

var channeltellnum;
var channelnumtnumchoose = 0;
var channeltellnums=0;
var ChannelDownArray = [];
var ChannelDownArrays = [];
var ChannelDownArrayslength;
var channelOthers = [];
var ChannelDowntellArray = [];
var ChannelDowntellArrays = [];
var ChannelDowntellArrayslength;
var gChannelCreate = false;
var CHANNEL_SETimgicon=true;
var CHANNELTELL_SETimgicon=true;
var channel_tellall2_jilu = 0;
var channel_tellall2_onoff= true;
var listens_of_tellall;


function GetchannelOther() {
    var body1 = '{"Code":"10315","Body":{"SessionId":"' + sessionId + '"}}';
    console.log('获取其他频道'+body1);
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body1, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                $('.channel_noneleve1').empty();
                if(obj.Channels.length==0){
                    $('.channel_noneleve1').append('<h3 class="help_wu">暂无数据!</h3>');   
                }
                var html = '';
                var channel = obj.Channels;
                channelOthers = obj.Channels;
                for (var i = 0; i < obj.Channels.length; i++) {
                    var lockImg = '<img src="img/chat/chat_lock1.png" onclick="channel_list_lockimg_clickhandel(\'' + channel[i].Id + '\')" class="channel_list_lockimg"  alt="img" />';
                    var channel_levels1 = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                    var channel_levels2 = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                    var channel_levels3 = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                    var channel_levels4 = '<img src="img/icon/channel/channel_level.png" alt="" /> ';
                    var chanel_htmltop='<li id="' + channel[i].Id + '" creat="'+channel[i].Creator+'" name="' + channel[i].Name + '" cid="' + channel[i].Id + '" tp=1 level="' + channel[i].Level + '" man="' + channel[i].Coutinqueue + '" ><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel[i].Name+'">' + channel[i].Name + '</i>';
                    var channel_htmlnext='<img src="img/icon/channel/channel_select.png" class="fr sessIconDown" alt="" /><img src="img/icon/channel/channel_nolisten.png" onclick="channel_clicktwo(this)" class=" channel_mr"  alt="" >' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                    if (obj.Channels[i].Level == 0) {
                        html+=chanel_htmltop+''+channel_levels1+''+channel_htmlnext;
                       
                    } else if (obj.Channels[i].Level == 1) {
                         html+=chanel_htmltop+''+channel_levels2+''+channel_htmlnext;
                       
                    } else if (obj.Channels[i].Level == 2) {
                         html+=chanel_htmltop+''+channel_levels3+''+channel_htmlnext;
                      
                    } else if (obj.Channels[i].Level == 3) {
                         html+=chanel_htmltop+''+channel_levels4+''+channel_htmlnext;
                      
                    } else if (obj.Channels[i].Level == 4) {
                         html+=chanel_htmltop+''+channel_htmlnext;
                        
                    }
                }
                $('.channel_noneleve1').append(html);
            } else {
                // console.log('返回接口'+obj.Result);
                $('.channel_noneleve1').append('<h3 class="help_wu">获取数据失败!</h3>');
            }
        })
}

function chansearch(data) {
    var len = $('#channel_ul').children().length;
    var otherlen = $('#channel_otherul').children().length;
    var otherlens = $('#channel_otheruls').children().length;

    var Me_creater=$('#channel_ul').has('.help_wu').length;
    var Other_creater=$('#channel_otherul').has('.help_wu').length;
    var Otherchannel_creater=$('#channel_otheruls').has('.help_wu').length;

    var vals = $(data).val();

   if(Me_creater==1){


      }else{

   
          for (var i = 0; i < len; i++) {
            if ($('#channel_ul').children('li').eq(i).attr('name').indexOf(vals) > -1) {
                var channelName=$('#channel_ul').children('li').eq(i).attr('name');
                 
                if (vals!='') {

                    ChannelName=channelName.replace(new RegExp("(" +vals + ")","ig"), "<strong>" + vals + "</strong>");
                     $('#channel_ul').children('li').eq(i).children('div').children('i').empty().html(ChannelName);
                }else{

                    $('#channel_ul').children('li').eq(i).children('div').children('i').empty().html(channelName);

                }
                $('#channel_ul').children('li').eq(i).show();
            } else {
                $('#channel_ul').children('li').eq(i).hide();
            }
        }
   }

   if(Other_creater==1){


   }else{

         for (var k = 0; k < otherlen; k++) {
            if ($('#channel_otherul').children('li').eq(k).attr('name').indexOf(vals) > -1) {

                   var channelName=$('#channel_otherul').children('li').eq(k).attr('name');
                if(vals!=''){
                    ChannelName=channelName.replace(new RegExp("(" +vals + ")","ig"), "<strong>" + vals + "</strong>");
                     $('#channel_otherul').children('li').eq(k).children('div').children('i').empty().html(ChannelName);
                }else{

                    $('#channel_otherul').children('li').eq(k).children('div').children('i').empty().html(channelName);

                }
                $('#channel_otherul').children('li').eq(k).show();
            } else {
                $('#channel_otherul').children('li').eq(k).hide();
            }
         }

   }
   

   if(Otherchannel_creater==1){ 

   }else{

         for (var k = 0; k < otherlens; k++) {
            if ($('#channel_otheruls').children('li').eq(k).attr('name').indexOf(vals) > -1) {

                   var channelName=$('#channel_otheruls').children('li').eq(k).attr('name');
                 
                if(vals!=''){
                    ChannelName=channelName.replace(new RegExp("(" +vals + ")","ig"), "<strong>" + vals + "</strong>");
                     $('#channel_otheruls').children('li').eq(k).children('div').children('i').empty().html(ChannelName);
                }else{

                    $('#channel_otheruls').children('li').eq(k).children('div').children('i').empty().html(channelName);

                }


                $('#channel_otheruls').children('li').eq(k).show();
            } else {
                $('#channel_otheruls').children('li').eq(k).hide();
            }
      }

   }


}

// Channel second level initialization
function channeltwofint() {
    $('.channel_listen_write').hide();
    $('.channel_listens1').hide();
    $('.channel_listen_removes').hide();
    $('.channel_listen_keeps').hide();
    $('.channel_listen_grade img').attr('src', 'img/icon/channel/channel_select1.png');
    $('.channel_listen_time img').attr('src', 'img/icon/channel/channel_select1.png');
    $('.channel_listen_list').attr('src', 'img/icon/channel/channel_select1.png');
    $('.channel_listen_gradeval').hide();
    $('.channel_listen_timeval').hide();
    $('.channel_listen_listval').hide();
    $('.channel_listentimecenters').hide();
    $('.channel_listentimecenter').hide();
    $('.channel_listentimevals div').hide();
    $('.channel_listen_filter ').hide();
    $('.channel_listen_logos ').css('background-image', "url(img/icon/channel/channel_search1.png)");
    $('.channel_listentype li').each(function(i) {
        $(this).removeClass('channel_listentypecbg');
    })
    $('.channel_listentimes li').each(function(i) {
        $(this).removeClass('channel_listentimesbg');
    })
}
//Conversation initialization
function channeltellfint() {
    $('.channel_tellall1').hide();
    $('.channel_Timetotal').hide();
    $('.channel_TimeStarthour div').hide();
    $('.channel_TimeOverhour div').hide();
    $('.channel_tell_filter ').hide();
    $('.channel_tell_logos ').css('background-image', 'url(img/icon/channel/channel_search1.png');
    $('.channel_tellall2').height($(window).height() - 344);
    $('.channel_tell_filtertype li').each(function() {
        $(this).removeClass('channel_tell_typebg');
    })
    $('.channel_telltimeselect li').each(function() {
        $(this).removeClass('channel_tell_typebg');
    })
}
//conversation search
function chantellsearch (data) {
    var len = $('#chantell_ul').children().length;
    var otherlen = $('#chantell_otherul').children().length;
    var vals = $(data).val();
   if($('#chantell_ul').children('h3').hasClass('help_wu')){

   }else{
          for (var i = 0; i < len; i++) {
            if ($('#chantell_ul').children('li').eq(i).attr('tellname').indexOf(vals) > -1) {

                var channelName=$('#chantell_ul').children('li').eq(i).attr('tellname');
                 
                if(vals!=''){
                    ChannelName=channelName.replace(new RegExp("(" +vals + ")","ig"), "<strong>" + vals + "</strong>");
                     $('#chantell_ul').children('li').eq(i).children('div').children('i').empty().html(ChannelName);
                }else{

                    $('#chantell_ul').children('li').eq(i).children('div').children('i').empty().html(channelName);
                }
                $('#chantell_ul').children('li').eq(i).show();
            } else {
                $('#chantell_ul').children('li').eq(i).hide();
            }
        }
   }

    if($('#chantell_otherul').children('h3').hasClass('help_wu')){

    }else{
        for (var k = 0; k < otherlen; k++) {
        if ($('#chantell_otherul').children('li').eq(k).attr('tellname').indexOf(vals) > -1) {
     

                var channelName=$('#chantell_otherul').children('li').eq(i).attr('tellname');
                 
                if(vals!=''){
                    ChannelName=channelName.replace(new RegExp("(" +vals + ")","ig"), "<strong>" + vals + "</strong>");
                     $('#chantell_otherul').children('li').eq(i).children('div').children('i').empty().html(ChannelName);
                }else{

                    $('#chantell_otherul').children('li').eq(i).children('div').children('i').empty().html(channelName);

                }
              

            $('#chantell_otherul').children('li').eq(k).show();
        } else {
            $('#chantell_otherul').children('li').eq(k).hide();
        }
      }
    }
}
/*获取发言时间*/
function channel_Getsaytime(channelcreatsay) {
    if (channelcreatsay == '无限制') {
        channelcreatsay = 180;
        return;
    } else {
        channelcreatsay = channelcreatsay.replace(/[^0-9]/ig, "");
        return;
    }
    return;
}

function channel_Getcreatwaite(channelcreatwaite) {
    if (channelcreatwaite == '无排队') {
        channelcreatwaite = 0;
        return;
    } else {
        channelcreatwaite = channelcreatwaite.replace(/[^0-9]/ig, "");
        return;
    }
    return;
}
//点击监听 显示会话二级菜单
function channel_clicktelltwo(obj) {
    $('.channel_box2').hide();
    $('.channel_telllisten_write').hide();
    $('.channel_telllisten_removes').hide();
    $('.channel_listen_write').hide();
    $('.channel_listen_downs channel_listens1').hide();
    var channel_telllistname = $(obj).parent().children('i').html();
    var id_val = $(obj).parent().parent();
    var id_vals = id_val.attr('id') + 'a';
    if ($('.channel_tellall').is(':hidden')) {
        channeltellfint();
        $('.channel_right1').hide();
        $('.channel_tellall').attr('id', '' + id_vals + '');
        $('#channel_telllistenname').val(channel_telllistname);
        $('#' + id_vals + '').find('.channel_telllevel2name').find('i').html('' + channel_telllistname + '');
        $('.channel_tellall').css('margin-left', '0px');
        $('.channel_tellall').show('slow');
    } else if ($('.channel_tellall').attr('id') == id_vals) {
        $('.channel_tellall').hide('slow');
        setTimeout(function() {
            $('.channel_right1').show();
        }, 700)
    } else if ($('.channel_tellall').attr('id') != id_vals) {
        channeltellfint();
        $('#channel_telllistenname').val(channel_telllistname);
        $('.channel_tellall').hide();
        $('.channel_tellall').attr('id', '' + id_vals + '');
        $('#' + id_vals + '').find('.channel_telllevel2name').find('i').html('' + channel_telllistname + '');
        $('#' + id_vals + '').show();
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function code10305() {
    var body = '{"Code":"10305","Body":{"SessionId":"' + sessionId + '"}}';
    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            if (ret.Result == 200) {
                var channel = ret.Channels;
                var len = ret.Channels.length;
                var html = '';
                var html1 = '';
                if(ret.Channels.length==0){
                    $('.channel_main .channel_level1').empty().append('<h3 class="help_wu">暂无频道</h3>');
                $('.channel_main .channel_other_level1').empty();
                  return;
                }
                var channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                var channel_levels1='<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                var channel_levels2='<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                var  channel_levels3 = '<img src="img/icon/channel/channel_level.png" alt="" />';
                var  channel_levels4='';

                for (var i = 0; i < len; i++) {
                     //判断创建者
                    var lockImg = '<img src="img/chat/chat_lock1.png" onclick="channel_list_lockimg_clickhandel(\'' + channel[i].Id + '\')" class="channel_list_lockimg"  alt="img" />';

                     var channel_htmltop='<li id="' + channel[i].Id + '" dtr="' + channel[i].Display + '" cid="' + channel[i].Id + '" level="' + channel[i].Level + '" man="' + channel[i].Coutinqueue + '" time="' + channel[i].CrMemberTalkduration + '" name="' + channel[i].Name + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel[i].Name+'">' + channel[i].Name + '</i>';
                      var channle_htmlnext='<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>'; 

                   
                    if (loginId == ret.Channels[i].Creator) {
                        //判断等级 
                        
                        var Level = ret.Channels[i].Level;
                        switch (Level) {
                            case 0:
                                html+=channel_htmltop+''+channel_levels+''+channle_htmlnext;
                                
                                break;
                            case 1:
                                 html+=channel_htmltop+''+channel_levels1+''+channle_htmlnext;
                             
                                break;
                            case 2:
                               html+=channel_htmltop+''+channel_levels2+''+channle_htmlnext;
                               
                                break;
                            case 3:
                                html+=channel_htmltop+''+channel_levels3+''+channle_htmlnext;
                             
                                break;
                            case 4:
                                html+=channel_htmltop+''+channel_levels4+''+channle_htmlnext;
                              
                                break;
                        }
                    } else if (loginId !== ret.Channels[i].Creator) {

                        var channel_levels1 = '';
                        var Level1 = ret.Channels[i].Level;
                        switch (Level1) {
                            case 0:
                                html1+=channel_htmltop+''+channel_levels+''+channle_htmlnext;
                        
                                break;
                            case 1:
                               html1+=channel_htmltop+''+channel_levels1+''+channle_htmlnext;
                                
                                break;
                            case 2:
                                html1+=channel_htmltop+''+channel_levels2+''+channle_htmlnext;
                                 
                                break;
                            case 3:
                                html1+=channel_htmltop+''+channel_levels3+''+channle_htmlnext;
                                
                                break;
                            case 4:
                               html1+=channel_htmltop+''+channel_levels4+''+channle_htmlnext;
            
                                break;
                        }
                    }
                }

                $('.channel_main .channel_level1').empty().append(html);
                $('.channel_main .channel_other_level1').empty().append(html1);
            } else if (ret.Result == 403) {
                // alert('SessionId已失效，服务器拒绝请求');
                $('.channel_main .channel_level1').empty().append('<h3 class="help_wu">暂无数据</h3>');
                $('.channel_main .channel_other_level1').empty();
            } else {
                $('.channel_main .channel_level1').empty().append('<h3 class="help_wu">暂无数据</h3>');
                $('.channel_main .channel_other_level1').empty();
            }

        })
}

function channel1() {
    if (callArrList.length > 0) {
        var html = '';
        var html1 = '';
        for (var i = 0; i < callArrList.length; i++) {
            if (loginId == callArrList[i].Creator) {
                html += '<li id="' + callArrList[i].Id + '" name="' + callArrList[i].Creator + '" tellname="' + callArrList[i].Name + '"><div onclick="channeltelllevel2(this)"><i title="'+callArrList[i].Name+'">' + callArrList[i].Name + '</i><img src="img/icon/channel/channel_select.png" class="fr sessIconDown"alt="" /></div><ul class="channel_level2"></ul></li>';
            } else {
                html1 += '<li id="' + callArrList[i].Id + '" name="' + callArrList[i].Creator + '" tellname="' + callArrList[i].Name + '"><div onclick="channeltelllevel2(this)"><i title="'+callArrList[i].Name+'">' + callArrList[i].Name + '</i><img src="img/icon/channel/channel_select.png" class="fr sessIconDown" alt="" /></div><ul class="channel_other_level2"></ul></li>';
            }
        }
        $('.channel_main_tell .channel_level1').empty().append(html);
        $('.channel_main_tell .channel_other_level1').empty().append(html1);

    } else {
        // $('.channel_main_tell .channel_level1').empty().append('<h3 class="help_wu">暂无数据</h3>');
    }
}

//==============================================
//频道列表鼠标移入事件
//==============================================
function channelMouseOver(event) {
    var ev = event || window.event;
    var target = ev.target || ev.srcElement;
    var el = $(target).children('.channel_mr');
    var cid = $(target).parent().attr('cid');
    var session = sessionGetById(cid);
    var src = el.attr('src');
    if (el.attr('src') === 'img/icon/channel/channel_nolisten.png') {
        if (session && session.lock) {
            return;
        }
        el.css('display', 'inline');
    }  
}

function channelMouseOut(event) {
    var ev = event || window.event;
    var target = ev.target || ev.srcElement;
    var el = $(target).children('.channel_mr');
    if (el.attr('src') === 'img/icon/channel/channel_nolisten.png') {
        el.css('display', 'none');
    }   
}

//==============================================
//频道列表点击事件
//==============================================
var chat_join = []; //单击连接频道的id
var channelMonitorObject = {
    lockId: '',
    channelMonitorList: []
};

function channellevel2 (obj) {

    var statusid = $('.channel_box2').attr('id');
    var that = $(obj);
    var thatpar = that.parent(); //li
    var grand = $(obj).parent().parent().attr('class');
    var channel_id = thatpar.attr('cid'); //频道id
    var grandfather = thatpar.parent().attr('class'); //channel_level1
    var channel_listname = that.children('i').attr('title'); //频道名称
    var id_vals = channel_id + 'a';
    var channel_box = $('.channel_box2');
    var listen = that.find('.channel_mr');
    var len = chat_join.length;
    var ulObj = that.next();
    var ch_btn_msg = $('.channel_btn_msg');
    var watching = videoSessionList.getWatching();
    isCurrentChannel = false;
    
    if (!luYin) {

        $('.channel_listenwritespends').trigger('click');

    }
    if(alldispatcher.length==0){ // Is there dispatcher data?

        getDispatcher();

    }

    if (grand != 'channel_level1') {
        $('.channel-add-members').hide();
        $('.channel_listen_setshow').hide();
        $('.channel_listen_pho').css("left","41px");
    } else if (grand == 'channel_level1') {
        $('.channel-add-members').show();
        $('.channel_listen_setshow').show();
        $('.channel_listen_pho').css("left","95px");
    }

    if (grandfather === 'channel_noneleve1') {
        $('.channel_listenwrite').hide();
        $('.channel-add-members').hide();
    } else {
        // $('.channel-add-members').show();
    }

    //监控、标注列表
    $('.monitor_label_user').hide();
    $('.manage_monite_user').hide();

    if (ulObj.css('display') === 'none') {
        ChannelFinit();
        channelMembersGet(channel_id, obj, grandfather); //获取频道成员接口
        $('#channel_ul').children('li').removeClass('channelSelectedonly');
        $('#channel_otherul').children('li').removeClass('channelSelectedonly');
        $('#channel_otheruls').children('li').removeClass('channelSelectedonly');
        thatpar.addClass('channelSelectedonly');
        IMessageInterfac(channel_id); //查询im消息，显示在线成员
        channel_box.attr('id', id_vals);
        channel_box.hide();
        channel_box.show('slow');
        $('.channel_tellall').hide();
        $('#channel_listen_name').val(channel_listname);
        $('#' + id_vals).find('.channel_listenset_top').children('span').find('i').html(channel_listname);
        $('#' + id_vals).find('.channel_listenset_top').children('span').find('i').attr('title',''+channel_listname+'');
        $('.channel_right1').hide();
        $('.channel_listen_write').hide();
        $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
        if (len === 0) {
            channel_differentType_connect(thatpar, channel_id);
        } else {
            var oldId = chat_join[len - 1];
            // channel_monitorlist_notExist(oldId);//不要删掉注释
            //暂时这样写
            if ($('.channel_box2').css('display') === 'block') {
                if (statusid)
                    statusid = statusid.slice(0, statusid.length - 1);
                var listenImg = $('.channel_main').find('#' + statusid).find('.channel_mr');
                if (listenImg.attr('src') === 'img/icon/channel/channel_nolisten.png') {
                    if (watching) {
                        var mainVideoSid = watching.getInf().sid;
                        if (mainVideoSid !== oldId) {
                            ui_channel_exit(oldId);
                        }
                    } else {
                        ui_channel_exit(oldId);
                    }
                }
            }
            chat_join.pop();
            channel_differentType_connect(thatpar, channel_id);
        }

    } else {

        thatpar.removeClass('channelSelectedonly');//2017.10.26加
        ulObj.hide('slow');
        channel_box.hide('slow');
        $('.channel_right1').show();
        that.children('.fr').attr("src", "img/icon/channel/channel_select.png");
        // channel_monitorlist_notExist(channel_id);
        //暂且这样用
        if (listen.attr('src') === 'img/icon/channel/channel_nolisten.png') {
            if (watching) {
                var mainVideoSid = watching.getInf().sid;
                if (mainVideoSid !== channel_id) {
                    ui_channel_exit(channel_id);
                }
            } else {
                ui_channel_exit(channel_id);
            }
        }

    }
    $('.channelSelectedonly').on('click', '.channel_set', function(event) {
        event.stopPropagation();
    })
    $('.channelSelectedonly').on('click', '.channel_remove_select', function(event) {
        event.stopPropagation();
    })

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function channel_differentType_connect(obj, cid) {

    var footer = $('.channel_listen_footer_div01');
    var ch_btn_msg = $('.channel_btn_msg');
    var header = $('.channel_listensay_cue03');
    if (obj.attr('tp') === '1') {
        session_channel_enter_monitor(cid);
        footer.hide();
        ch_btn_msg.hide();
        header.hide();
    } else {
        session_channel_enter(cid);
        footer.show();
        ch_btn_msg.show();
        header.show();
    }
    chat_join.push(cid);
}

function channel_monitorlist_notExist(cid) {
    // var channelMonitorList = channelMonitorObject.channelMonitorList;
    // var flag = 0;
    // for (var i = 0, lag = channelMonitorList.length; i < lag; i++) {
    //     if (cid == channelMonitorList[i].id) {
    //         flag = 1;
    //         break;
    //     }
    // }
    // if (flag === 0) //不存在
    //     ui_channel_exit(cid); //退出频道了
}



//显示会话成员
function channeltelllevel2(obj) {
    var id_val = $(obj).parent();
    var channel_id = id_val.attr('id');
    var grandfather = id_val.parent().attr('class');

    if (!luYin1) {
        $('.channel_telllistenwritespends').trigger('click')
    }
    if(alldispatcher.length==0){
        getDispatcher();
    }
    session_call_bye(callInId);
    // if (grandfather != 'channel_level1') {
    //     $('.channel_tellallsetli ').children().eq(1).hide();
    //     $('.channel_tellallsetshow').hide();
    // } else if (grandfather == 'channel_level1') {
    //     $('.channel_tellallsetli ').children().eq(1).show();
    //     $('.channel_tellallsetshow').show();

    // }
    //判断是否隐藏
    if ($(obj).next().css('display') == 'none') {
        var channel_telllistname = $(obj).children('i').attr('title'); //会话名称
        var id_vals = channel_id + 'a';
        var sessionStatusPage = $('.channel_tellall');
        $('#chantell_ul').children('li').removeClass('chatOpenOnly');
        $('#chantell_otherul').children('li').removeClass('chatOpenOnly');
        id_val.addClass('chatOpenOnly');
        channel10312(channel_id, obj, grandfather);
        sessionStatusPage.hide();
        sessionStatusPage.attr('id', id_vals);
        $('.channel_telllisten_write').hide(); //解散会话，修改名字窗口
        $('.channel_telllisten_removes').hide(); //确定解散会话窗口
        $('.channel_listen_downs channel_listens1').hide(); //下载窗口
        $('.channel_right1').hide(); //小图标icon控制该页现隐藏
        $('#channel_telllistenname').val(channel_telllistname); //修改名称的input框
        $('#' + id_vals).find('.channel_telllevel2name').find('i').html(channel_telllistname);
        $('#' + id_vals).find('.channel_telllevel2name').find('i').attr('title',''+channel_telllistname+'');
        sessionStatusPage.show('slow'); //第二栏页面出来
        ChanneltellFinit();
        IMessageInterfac(channel_id);
        callInId = channel_id;
        var session = sessionGetById(channel_id);
        if (session && session.sessionState === SESSION_STATE_DIALOG) {
            $('#chatBegincallBtn').trigger('click');
        }
    } else {
        id_val.removeClass('chatOpenOnly');//2017.10.26加
        $(obj).next().hide('slow');
        $(obj).children('.fr').attr("src", "img/icon/channel/channel_select.png");
        $('.channel_tellall').hide();//, function() {
        $('.channel_right1').show();
        // });
    }

    $('.chatOpenOnly').on('click', '.channel_set', function (event) {
        event.stopPropagation();
    })
    $('.chatOpenOnly').on('click', '.channel_remove_select', function (event) {
        event.stopPropagation();
    })
}

//fu2017.11.29更新
//获取频道成员
function channelMembersGet (channel_id, obj, grandfather) {
    var members = [];
    
    if (channelInfoMap.containsKey(channel_id)) {
        members = channelInfoMap.get(channel_id).members;

        if (members && members.length) {
            channelMembersGetSuccess(channel_id, obj, grandfather, members);
            return;
        }   
    }

    channelMembersApi(channel_id, obj, grandfather);
}



//更新channelInfoMap
function channelInfoMapUpdate(cid, cMembers) {
    channelInfoMap.remove(cid);
    channelInfoMap.put(cid, {id: cid, members: cMembers});
}

// 查询频道成员************
function channelMembersApi(channel_id, obj, grandfather) {
    var body = '{"Code":"10311","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_id + '","Type":"1"}}';
    $('.cover_loading').show();
    $.getJSON(STATION_URL + '?Body=' + body,
        function(ret) {
            $('.cover_loading').hide();
            if (ret.Result == 200) {
                if (channelInfoMap.containsKey(channel_id)) {
                    channelInfoMapUpdate(channel_id, ret.Members);
                } else {
                    channelInfoMap.put(channel_id, {id: channel_id, members: ret.Members});
                }
                
                channelMembersGetSuccess(channel_id, obj, grandfather, ret.Members);
            } else {
                showAlert('加载频道成员失败！');
            }
        }
    )
}


//获取频道成员成功
function channelMembersGetSuccess(channel_id, obj, grandfather, channelMembers) {
    obj = $(obj);
    currentChannelMembers = channelMembers;
    isCurrentChannel = true;
    $('.celtotal').text(currentChannelMembers.length);
    $('#channel_ul').children('li').children('ul').hide('slow');
    $('#channel_otherul').children('li').children('ul').hide('slow');
    $('#channel_otheruls').children('li').children('ul').hide('slow');
    obj.parents('.channel_main').find('.sessIconDown').attr('src', 'img/icon/channel/channel_select.png');
    obj.next().show('slow');
    obj.children('.fr').attr("src", "img/icon/channel/channel_up_03.png");

    refreshCurrentClList(obj, grandfather, channelMembers);
    currentChanneledMembersOn(channel_id);
}


//刷新列表
function refreshCurrentClList (obj, grandfather, data) {
    console.log('刷新频道列表')
    var onlinCount = 0;
    currentClmembers.clear();
    var html = '';
    var channelcid=obj.parent().attr('cid');
    var otherlistman;
    var isLineImg;

    var channel_memberimg1 = '<img src="img/icon/channel/channel_manlevel.png" alt=""><img src="img/icon/channel/channel_manlevel.png" alt="">';
    var channel_memberimg2 = '<img src="img/icon/channel/channel_manlevel.png" alt="">';
    var channel_memberimg3 = '';
    var channel_memberimg4 = '<img src="img/icon/channel/channel_say.png" alt="">';
    
    if(grandfather=='channel_noneleve1'){
       otherlistman=obj.parent().attr('creat');
    }else{
      otherlistman=Channel_Othercid(channelcid);
    }
    for (var i = 0; i < data.length; i++) {
        data[i].state === 1 ? onlinCount +=1 : onlinCount +=0;
        var BroadImg=Get_BroadcastLimit(data[i].Uid)===0 ?'':'<img src="img/icon/userIcon/ic_broadcast.png"  class="channel_broadimg" alt="">';
        var YaoBiImg=Get_YaoBiLimit(data[i].Uid)===0 ?'':'<img src="img/icon/userIcon/ic_yaobi.png" class="channel_broadimg" alt="">';
        var JurisdictionImg=Get_LimitStatus(data[i].Uid)===0 ?'':'<img src="img/icon/newicon/power1.png" class="channel_broadimg" alt="">';
             if (data[i].state) {
                 isLineImg= data[i].state === 1 ? '<img src="img/chat/online.png" alt="">' : '<img src="img/chat/online1.png" alt="">';
             } else {
                 isLineImg='<img src="img/chat/outline.png" alt="">';
             }
        var channel_power=data[i].Limit==1?'<img src="img/icon/newicon/power1.png" title="解除限制" onclick="channelDiscall(this)" />':'<img src="img/icon/newicon/power.png" title="禁止呼入" onclick="channelDiscall(this)"/>';
        if (grandfather == 'channel_level1') {

            if (data[i].Uid == loginId) {
                    html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i class="channel_creats">' + data[i].Name + '</i><img src="img/icon/channel/creater.png" title="创建者" /></div></li>';
            } else {
               
                    var html_usertop='<li name="' + data[i].Uid + '" level="'+ data[i].Level + '" saytime="' + data[i].MemberSpeakTimelength+'" limit="'+data[i].Limit+'"><div class="channel_level2_name">'+isLineImg+'<i>' + data[i].Name + '</i>';
                    var html_usernext='</div><div class="channel_level2_show"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channel_memberset(this)">'+channel_power+'<img src="img/icon/channel/channeldes.png" title="移除" / onclick="canneltell_memnersets(this)"></div>' + '<div class="channel_set" ><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span>'+
                    '<div class="channel_module_say" ><p class="channel_modulesaytitle" onclick="Channel_msgSay(this)"><i>会话中设置</i><img src="img/icon/channel/channel_select1.png" alt="" /></p><div><div class="channel_set_select" onclick="channel_select(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channnel_select_val"></span><div class="channel_set_select1"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div><div class="channel_saytime" onclick="channel_select(this)"><i>最大发言时长</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channel_saytime_val"></span><div class="channel_saytime_select1"><ul><li><span>30秒</span></li><li><span>60秒</span></li><li><span>90秒</span></li><li><span>120秒</span></li><li><span>无限制</span></li></ul></div></div><div class="channel_set_keep" onclick="code10304(this)">保存</div></div></div>' +
                     '<div class="channel_Usermsg" ><div class="channel_UserMsg_title" onclick="Channel_MsgUser(this)"><i>用户资料</i><img src="img/icon/channel/channel_select1.png"></div><div class="channel_UserMenu"><ul><li><i>用户账号</i><span class="fr channel_msguserid">我是账号ID</span></li><li><i>备注名</i><input type="text" placeholder="最大长度为10个字符" class="channel_userRemarid" /></li><li><i>手机号</i><input type="text" class="channel_userRemarphone" /></li><li><i>邮箱</i><input type="text" class="channel_userRemaremail" /></li><li onclick="Channel_msguserKeep(this)">保存</li></ul></div></div>' +
                      '<div class="channel_module_psd" ><div class="channel_module_psdtitle" onclick="Channel_MsgUserPsd(this)"><i>修改密码</i><img src="img/icon/channel/channel_select1.png" alt="" /></div><div class="channel_module_psdmenu"><ul><li><i>新密码</i><input type="password" placeholder=""  /></li><li><i>确认密码</i><input type="password" placeholder=""  /></li><li onclick="Channel_UserPsdKeep(this)" userid="'+data[i].Uid+'">保存</li><li onclick="Channel_UserPsdrandKeep(this)">重置密码</li></ul></div></div>'+
                      '<div class="channel_module_status" ><div class="channel_module_statustitle" onclick="Channel_MsgUserStatus(this)"><i>应答状态</i><img src="img/icon/channel/channel_select1.png" alt="" /></div><div class="channel_module_statusmenu"><ul ><li class="channel_font"><b>应答状态：</b><b class="channel_usermoduelmsg">免打扰未启动</b></li><li class="channel_font"><b>应答模式：</b><b class="channel_usermoduelmsghand">手动应答</b></li></ul></div></div>' +
                        '<div class="channel_more_set" onclick="channel_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +
                                '<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr"   value=""  onkeyup="channel_ckphone(this)"  maxlength="15" ></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"   value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channelmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_password"><span>确认密码</span><input type="password"   name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                                '</div><div class="channel_remove_select"><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2" onclick="chanelprev(this)">取消</span><span class="channel_remove_select3 fr" onclick="coderemove10303(this)">确认</span></div></div></li>';
                    switch (data[i].Level) {
                        case 0:
                            html+=html_usertop+''+channel_memberimg1+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_usernext;
                            break;
                        case 1:
                             html+=html_usertop+''+channel_memberimg2+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_usernext;
                            break;
                        case 2:
                            html+=html_usertop+''+channel_memberimg3+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_usernext;
                            break;
                        case -1:
                             html+=html_usertop+''+channel_memberimg4+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_usernext;
                            break;
                     }
               }
        } else {
       if (data[i].Uid == loginId) {

                var html_otherlisttop='<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i>' + data[i].Name + '</i>';
                var html_othernext='</div></li>';

                switch (data[i].Level) {
                    case 0:
                        html+=html_otherlisttop+''+channel_memberimg1+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_othernext;
                        // channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt=""><img src="img/icon/channel/channel_manlevel.png" alt="">';
                        // html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                        break;
                    case 1:
                        html+=html_otherlisttop+''+channel_memberimg2+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_othernext;
                        // channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt="">';
                        // html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i class=" ">' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                        break;
                    case 2:
                        html+=html_otherlisttop+''+channel_memberimg3+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_othernext;
                        // channel_memberimg = "";
                        // html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                        break;
                    case -1:
                        html+=html_otherlisttop+''+channel_memberimg4+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_othernext;
                        // channel_memberimg = '<img src="img/icon/channel/channel_say.png" alt="">';;
                        // html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt=""><i>' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                        break;
                }
            }else{
              
             if(otherlistman==data[i].Uid){

                    channel_memberimg='<img src="img/icon/channel/creater.png" title="创建者" />';
                    if (data[i].state) {
                        html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name">'+isLineImg+'<i class="channel_creats">' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                    } else {
                        html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i class="channel_creats">' + data[i].Name + '</i>' + channel_memberimg + '</div></li>';
                    }

              }else{
                
                 var html_otherusertop='<li name="' + data[i].Uid + '"><div class="channel_level2_name">'+isLineImg+'<i>' + data[i].Name+'</i>';
                 var html_otherusernext='</div><div class="channel_level2_show  channel_tellother"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"></div></li>';
            
                switch (data[i].Level) {
                    case 0:
                        html+=html_otherusertop+''+channel_memberimg1+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_otherusernext;
                        // channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt=""><img src="img/icon/channel/channel_manlevel.png" alt="">';
                        // html += '<li name="' + data[i].Uid + '"><div class="channel_level2_name">'+isLineImg+'<i>' + data[i].Name + '</i>' + channel_memberimg + '</div><div class="channel_level2_show  channel_tellother"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"></div></li>';
                        break;
                    case 1:
                        html+=html_otherusertop+''+channel_memberimg2+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_otherusernext;
                        break;
                    case 2:
                        html+=html_otherusertop+''+channel_memberimg3+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_otherusernext;
                         
                        break;
                    case -1:
                        html+=html_otherusertop+''+channel_memberimg4+''+BroadImg+''+YaoBiImg+''+JurisdictionImg+''+html_otherusernext;
                        break;
                    }
                }
                 /*********/
            }
        }
        // data[i].state = 0;
        // console.log(data[i])
        currentClmembers.put(data[i].Uid, data[i]);
    }

    obj.next().empty().append(html);
    $('.celonline').text(onlinCount);
    channel_hover();
}

function Channel_Othercid(id){ 
    var arrlist;
    for(var i=0;i<channelAlls.length;i++) {
         if(channelAlls[i].Id==id){
             // return list=true;
             arrlist=channelAlls[i];
         }
    }
     return arrlist.Creator;
}

//查询会话成员********************************

function channel10312(channel_id, obj, grandfather, isSnap) {
    var body = '{"Code":"10312","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_id + '"}}';
    console.log('报文'+body);
    var obj = $(obj);
    console.log(body)
    $('.cover_loading').show();
    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            // console.log('返回结果'+ret.Result);
            $('.cover_loading').hide();
            var onliner = sessionGetPresenceOnLine(channel_id);
            if (ret.Result === 200) {
                var members = ret.Members;
                currentChatMembers = ret.Members;
                if (onliner && onliner.length > 0) {
                    members = arrayCreate(onliner, members);
                } 
                // console.log(JSON.stringify(members));
                var objPro = obj.parents('.channel_main_tell');
                objPro.find('.channel_level2').hide();
                objPro.find('.channel_other_level2').hide();
                objPro.find('.sessIconDown').attr('src', 'img/icon/channel/channel_select.png');
                obj.children('.fr').attr("src", "img/icon/channel/channel_up_03.png");
                refreshChatMembers(members, obj, grandfather, isSnap);
            } else {
                showAlert('获取会话成员失败！');
            }
        }
    )
}


function arrayCreate(arr, array) {
    var total = [];
    var array = cloneArrayObj(array);
    if (arr.length === 0) {
        total = array;
    } else {
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = 0, lon = array.length; j < lon; j++) {
                if (arr[i] === array[j].Uid) {
                    array[j].state = 1;
                    total.push(array[j]);
                    break;
                }
            }
        }
        for (var k = 0, lgn = array.length; k < lgn; k++) {
            if (!array[k].state) {
                if (onlineInfo.containsKey(array[k].Uid)) {
                    array[k].state = 2;
                }
                total.push(array[k]);
            }
        }
    }
    return total;
}


function refreshChatMembers(data, obj, grandfather,isSnap) {
    // console.log(data)
    var len = data.length;
    var html = '';
    console.log('父节点'+isSnap);
    if (len > 0) {
        for (var i = 0; i < data.length; i++) {
              var onlineImg;
              if(data[i].state){
                 onlineImg = data[i].state === 1 ? '<img src="img/chat/online.png" alt="" />' : '<img src="img/chat/online1.png" alt="" />';
              }else{
                 onlineImg = '<img src="img/chat/outline.png" alt="" />';
              }
              
              var BroadImg=Get_BroadcastLimit(data[i].Uid)===0 ?'':'<img src="img/icon/userIcon/ic_broadcast.png" class="channel_broadimg" alt="">';
              var YaoBiImg=Get_YaoBiLimit(data[i].Uid)===0 ?'':'<img src="img/icon/userIcon/ic_yaobi.png" class="channel_broadimg" alt="">';
			  var JurisdictionImg=Get_LimitStatus(data[i].Uid)===0 ?'':'<img src="img/icon/newicon/power1.png" class="channel_broadimg" alt="">';
            if (isSnap) {
                // if (data[i].state) {

                    html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name">'+onlineImg+'<i class="chat_memers">' + data[i].Name + '</i>'+BroadImg+''+YaoBiImg+''+JurisdictionImg+'</div></li>';  
                // } else {
                    // html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name"><img src="img/chat/outline.png" alt="" /><i class="chat_memers">' + data[i].Name + '</i></div></li>';
                // }
            } else {
                if (grandfather == 'channel_level1') {
                    // if (data[i].state) {
                        if (data[i].Uid == loginId) {
                            html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt="" /><i class="channel_creats chat_memers">' + data[i].Name + '</i>'+BroadImg+''+YaoBiImg+''+JurisdictionImg+'</div></li>';
                        } else {
                            html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_telllevel2_name">'+onlineImg+'<i class="chat_memers">' + data[i].Name + '</i>'+BroadImg+''+YaoBiImg+''+JurisdictionImg+'</div><div class="channel_telllevel2_show"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channeltell_memberset(this)"><img src="img/icon/channel/channeldes.png" title="移除" onclick="canneltell_memnersets(this)"/></div>' +
                                '<div class="channel_set"><span class="tellchannel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_remove" onclick="channel_remove10309(this)">移除成员</div><div class="channel_more_set" onclick="channeltell_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +
                                '<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr"  value="" onkeyup="channel_ckphone(this)"  maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"  value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channeltellmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_password"><span>确认密码</span><input type="password"   name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                                '</div><div class="channel_remove_select"><span class="tellchannel_pho_ups"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2" onclick="chanelprev(this)">取消</span><span class="channel_remove_select3 fr" onclick="channel_tellremove309(this)">确认</span></div></div></li>';
                        }
                    // } else { //開始
                    //     if (data[i].Uid == $.cookie('username')) {
                    //         html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt="" /><i class="channel_creats chat_memers">' + data[i].Name + '</i></div></li>';
                    //     } else {
                    //         html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_telllevel2_name"><img src="img/chat/outline.png" alt=""><i class="chat_memers">' + data[i].Name + '</i></div><div class="channel_telllevel2_show"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channeltell_memberset(this)"><img src="img/icon/channel/channeldes.png" title="移除" onclick="canneltell_memnersets(this)"/></div>' +
                    //             '<div class="channel_set"><span class="tellchannel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_remove" onclick="channel_remove10309(this)">移除成员</div><div class="channel_more_set" onclick="channeltell_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +
                    //             '<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr"   value="" maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"   value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channeltellmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_password"><span>确认密码</span><input type="password"  name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                    //             '</div><div class="channel_remove_select"><span class="tellchannel_pho_ups"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2" onclick="chanelprev(this)">取消</span><span class="channel_remove_select3 fr" onclick="channel_tellremove309(this)">确认</span></div></div></li>';
                    //     }
                    // } //結束
                } else {
                     if (data[i].Uid == loginId) {
                            html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name"><img src="img/chat/online.png" alt="" /><i class=" chat_memers">' + data[i].Name + '</i>'+BroadImg+''+YaoBiImg+''+JurisdictionImg+'</div></li>';
                        }else{
                         // if (data[i].state) {
                          html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name">'+onlineImg+'<i class="chat_memers">' + data[i].Name + '</i>'+BroadImg+''+YaoBiImg+''+JurisdictionImg+'</div> <div class="channel_telllevel2_show channel_tellother"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"></div></li>';
                        // } else {
                        //   html += '<li name="' + data[i].Uid + '" tellname="' + data[i].Name + '"><div class="channel_level2_name"><img src="img/chat/outline.png" alt="" /><i class="chat_memers">' + data[i].Name + '</i></div> <div class="channel_telllevel2_show channel_tellother"><img onclick="channel_call_snapchat(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + data[i].Uid + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + data[i].Uid + '\', \'' + data[i].Name + '\')" src="img/icon/userIcon/user_video.png" title="视频"></div></li>';
                        //  }
                    }
                }
            }
        }
        obj.next().empty().append(html);
        obj.next().show('slow');
        channeltell_hover();
        channeltellother_hover();
    } 
    // else {
    //     showAlert('该会话没有成员');
    // }
}
//========================================================= =====================
//频道监听按钮点击事件
//==============================================================================

function channel_clicktwo(obj) {
    var channel_listname = $(obj).parent().children('i').html(); //频道名称
    var id_val = $(obj).parent().parent().attr('cid'); //频道id
    var channel_box = $('.channel_box2');
    var list = $('.channel_details_main').children('ul');
    var tp = $(obj).parent().parent().attr('tp');
    var html = '';
    // var channelMonitorList = channelMonitorObject.channelMonitorList;

    $('#channel_listen_name').val(channel_listname);
    $('#' + id_val + 'a').find('.channel_listenset_top').children('span').find('i').html(channel_listname);

    if ($(obj).attr('src') == 'img/icon/channel/channel_nolisten.png') {

        $(obj).attr('src', 'img/icon/channel/channel_listen.png').css('display', 'inline');
        $('.channel_list_details').show();

        if (tp === "1") {
            session_channel_enter_monitor(id_val);
        } else {
            session_channel_enter(id_val);
        }

        $('.' + id_val + 'monitorimg').attr({
            'src': 'img/chat/chat_monitor.png',
            'state': '1'
        });

    } else {

        $(obj).attr('src', 'img/icon/channel/channel_nolisten.png');
        $('.' + id_val).remove();
        ui_channel_exit(id_val);

        $('.' + id_val + 'monitorimg').attr({
            'src': 'img/chat/chat_unmonitor.png',
            'state': '0'
        });
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function arrDelObjelement(array, attr, value) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i][attr] === value) {
            array.splice(i, 1);
            break;
        }
    }
}

function arrDelElement(array, el) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === el) {
            array.splice(i, 1);
            break;
        }
    }
}

function arrobjContainsElement(array, el, item) {
    var have = false;
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i][item] === el) {
            have = true;
        }
    }
    return have;
}

//==================================================
//频道监听锁定相关功能
//==================================================

function chat_lock(self) {
    var that = $(self);
    var list = $('.channel_details_main').children('ul');
    var key = that.parent().parent().attr('class');

    if (that.attr('src') == 'img/icon/channel/channel_details0.png') { //未锁定
        chatLockSetting(key);
    } else {
        chatUnlockSetting(key);
    }
}


//找出锁定的会话
function chatLockidGet() {
    var lockChannel = false;
    for (var j = 0, lon = gSessionArray.length; j < lon; j++) {
        var index = gSessionArray[0];
        if (gSessionArray[j].lock) {
            lockChannel = gSessionArray[j].sessionId;
            gSessionArray[0] = gSessionArray[j];
            gSessionArray[j] = index;
            break;
        }
    }
    return lockChannel;
}

//刷新频道监听列表
function refreshChannelMonitorList() {
    var list = $('.channel_details_main').children('ul');
    var len = gSessionArray.length;
    var html = '';
    var html_btn = '';
    var session = null;
    var lockChannel = chatLockidGet();
    var details = $('.channel_list_details');
    var speakstate = '空闲中';
    var speakimg = 'img/icon/channel/channel_details2.png';

    if (lockChannel && lockChannel.charAt(0) !== 'C') {
        return;
    }

    if (lockChannel) {
        session = gSessionArray[0];
        var obj = mediaStateTalking(session.mediaState, session.mediaSpeaker);
        if (session != null) {
            if (!session.monitor)
                html_btn = '<img src="'+obj.img+'" alt="" class="channel_details3" onclick="jianChannelSpeaking(this)">';
        }
        html = '<li class="' + session.sessionId + '"><p><i class="listen_cn">' + session.Name + '</i><img src="img/icon/channel/channel_details1.png" class="channel_details1" onclick="chat_delete(this)"></p>' +
            '<p class="channel_details_mains"><img src="img/chat/online.png" alt=""><i class="jianStatus">'+obj.state+'</i>' +
            '<img src="img/icon/channel/channel_details.png" alt="" class="channel_details2" onclick="chat_lock(this)"></p>' +
            html_btn + '</li>';
    }
    // var gbroadcast = false;
    var connected = lockChannel ? 1 : 0;
    for (var i = lockChannel ? 1 : 0; i < len; i++) {
        var btn = '';
        session = gSessionArray[i];
        var indexcode = session.sessionId.charAt(0);
        var that = mediaStateTalking(session.mediaState, session.mediaSpeaker);
        // if (indexcode === 'G')  gbroadcast = true;
        if (session != null) {
            if (!session.monitor)
                btn = '<img src="'+that.img+'" alt="" class="channel_details3" onclick="jianChannelSpeaking(this)">';

        } else {
            if (!tp) {
                btn = '<img src="'+that.img+'" alt="" class="channel_details3" onclick="jianChannelSpeaking(this)">';
            }

        }
        if (indexcode !== 'G' && indexcode == 'C') {
            connected += 1;
            html += '<li class="' + session.sessionId + '"><p><i class="listen_cn">' + session.Name + '</i><img src="img/icon/channel/channel_details1.png" class="channel_details1"  onclick="chat_delete(this)"></p>' +
                '<p class="channel_details_mains"><img src="img/chat/online.png" alt=""><i class="jianStatus">'+that.state+'</i>' +
                '<img src="img/icon/channel/channel_details0.png" alt="" class="channel_details2" onclick="chat_lock(this)"></p>' +
                btn + '</li>';
        }
    }
    list.empty();
    list.append(html);
    if (lockChannel) {
        list.children('.' + gSessionArray[0].sessionId).css('border', '4px solid #FFA200');
    }
    // var length = gbroadcast ? gSessionArray.length - 1 : gSessionArray.length;
    $('.channel_details_top').children('span').find('i').text(connected);
    if (gSessionArray.length == 0 || connected == 0) {
        details.hide();
        details.css('right', 0);
        details.css('bottom', 0);
    } else {
        details.show();
    }

}

function mediaStateTalking(state, speaker) {
    var obj = {};
    if (state === MEDIA_STATE_IDLE) {
        obj.state = '空闲中';
        obj.img = 'img/icon/channel/channel_details2.png';
    } else if (state === MEDIA_STATE_TALKING) {
        obj.state = '我在讲话';
        obj.img = 'img/icon/channel/jian_speak.png';
    } else if (state === MEDIA_STATE_LISTENING) {
        var name;
        if (speaker) {
            var name = usersAll.get(speaker) ? usersAll.get(speaker).Name : speaker;
        } else {
            name = '';
        }
        obj.state = name + '在讲话';
        obj.img = 'img/icon/channel/channel_details2.png';
    }
    return obj;
}

//监听列表删除
function chat_delete (self) {
    // var channelMonitorList = channelMonitorObject.channelMonitorList;
    var key = $(self).parent().parent();
    var cid = key.attr('class');
    var index = cid.charAt(0);
    var lockid = chatLockidGet();
    // arrDelObjelement(channelMonitorList, 'id', cid);
    key.remove();
    if (index === 'C') {
        ui_channel_exit(cid);
    } else {
        session_call_bye(callInId);
    }
    
    if (lockid === cid) {
        chatUnlockSetting(cid);
    }
    $('#' + cid).find('.channel_mr').attr('src', 'img/icon/channel/channel_nolisten.png');
    $('.' + cid + 'monitorimg').attr({
        'src': 'img/chat/chat_unmonitor.png',
        'state': 0 
    })
    // if (gSessionArray.length == 0) {
    //     var details = $('.channel_list_details');
    //     details.hide();
    //     details.css('right', 0);
    //     details.css('bottom', 0);
    // }
}



function channel_hover() {
    $('.channel_main .channel_level2 li').hover(function() {
            // $(this).children('.channel_level2_show').show().siblings('.channel_level2_name').hide();
            $(this).children('.channel_level2_show').show();

        },
        function() {
            // $(this).children('.channel_level2_show').hide().siblings('.channel_level2_name').show();
            $(this).children('.channel_level2_show').hide().siblings('.channel_level2_name').show();            
        })
}
//会话成员 可修改的图标
function channeltell_hover() {
    $('.channel_main_tell .channel_level2 li').hover(function() {
            $(this).children('.channel_telllevel2_show').show();
        },
        function() {
            $(this).children('.channel_telllevel2_show').hide().siblings('.channel_telllevel2_name').show();
        })
}
function channeltellother_hover() {
    $('.channel_main_tell .channel_other_level2 li').hover(function() {
            $(this).children('.channel_telllevel2_show').show();
        },
        function() {
            $(this).children('.channel_telllevel2_show').hide().siblings('.channel_telllevel2_name').show();
        })
}

//发言时长 方法
function channel_hide (obj) {
    $(obj).click(
        function() {
            if ($(this).children('div').is(":hidden")) {
                $(obj).addClass('more_setborder').siblings('div').removeClass('more_setborder');
                var father = $(obj);
                $(this).children('img').attr('src', 'img/icon/channel/channel_select2.png');
               $(this).siblings().children('div').hide();
                $(this).children('div').show();
                $(this).find('li').each(function() {
                    $(this).click(function() {
                        var val = $(this).children().html();
                        father.children('span').html(val);
                      })
                  })
             } else {
                 $(this).children('img').attr('src', 'img/icon/channel/channel_select1.png')
                 $(this).children('div').hide();
               }
        })
}

function Channel_UserModuleList (obj) {
    $(obj).click(function () {
        if($(this).next().is(':hidden')) {
          $(this).parent().siblings().children().eq(1).slideUp('slow');         
          $(this).next().slideDown('slow');
        } else {
          $(this).next().slideUp('slow');
        }
    })
}

function channel_otherhide (obj) {
     $(obj).click(
        function() {
            if ($(this).children('div').is(":hidden")) {
                var father = $(obj);
                $(obj).addClass('more_setborder').siblings().removeClass('more_setborder');
                $(this).children('img').attr('src', 'img/icon/channel/channel_select2.png');
                $(obj).siblings().children('img').attr('src','img/icon/channel/channel_select1.png');
               $(this).siblings().children('div').hide();
                $(this).children('div').show();
                $(this).find('li').each(function() {
                    $(this).click(function() {
                        var val = $(this).children().html();
                        father.children('span').html(val);
                      })
                  })
             } else {
                 $(obj).removeClass('more_setborder');
                 $(this).children('img').attr('src', 'img/icon/channel/channel_select1.png')
                 $(this).children('div').hide();
               }
        }
    )
}

function channelselect (obj) {

    if ($(obj).children('div').is(":hidden")) {
        var father = $(obj);
        $(obj).addClass('more_setborder');
        $(obj).parent().siblings().children('.channel_addlists').removeClass('more_setborder')
        // var that=$(this).children().eq('2').html();
        $(obj).parent().siblings().children('.channel_addlists').children('.channel_addlistselect').hide();
        $(obj).parent().siblings().children('.channel_addlists').children('img').attr('src','img/icon/channel/channel_select1.png');
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select2.png');
        $(obj).children('div').show();
        $(obj).find('li').each(function() {
            $(this).click(function() {
                var val = $(this).children().html();
                father.children('span').html(val);
            })
        })
    } else {
        $(obj).removeClass('more_setborder');
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select1.png')
        $(obj).children('div').hide();
    }
}



//选择级别
function channel_select (obj) { 
    if ($(obj).children('div').is(":hidden")) {
        var father = $(obj);
         $(obj).addClass('more_setborder');
        // var that=$(this).children().eq('2').html();
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select2.png')
        $(obj).siblings('.channel_saytime').children('div').hide();
        $(obj).children('div').show();
        $(obj).find('li').each(function() {
            $(this).click(function() {
                var val = $(this).children().html();
                father.children('span').html(val);
            })
        })
    } else {
        $(obj).removeClass('more_setborder');
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select1.png')
        $(obj).children('div').hide();
    }
}

//移除成员
function channel_remove10303 (objs) {
    // $(objs).parent().slideUp();
    // $(objs).parent().next().slideDown('slow');
  var channel_id=$(objs).parent().parent().parent().parent().attr('id');
  var channel_userid=$(objs).parent().parent().attr('name');
  var body = '{"Code":"10303","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_id + '","Action":"1","Members":[{"Uid":"' + channel_userid + '"}]}}';
    //           console.log('删除'+body);
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $(objs).parent().slideUp();
    $('.cover_loading').show();
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                    $('.cover_loading').hide();
                $("li[name='" + channel_userid + "']").remove();
                common._coverShow("删除成功!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);

                currentClmembers.remove(channel_userid);
                channelRemoveMemberSuccess(channel_id, channel_userid );
                
            } else {
                 $('.cover_loading').hide();
                   common._coverShow("删除失败!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                // alert("错误码："+obj.Result);
            }
        })
}


//移除成员成功
function channelRemoveMemberSuccess (cid, uid) {
    var members = channelInfoMap.get(cid).members;
    if (members && members.length) {
        for (var i = 0, len = members.length; i < len; i++) {
            if (members[i].Uid === uid) {
                members.splice(i, 1);
                break;
            }
        }
    }
    $('.celtotal').text(members.length);
}

function chanelprev (data) {
    $(data).parent().parent().slideUp('slow');
}

function coderemove10303 (data) {
    var channel_id = $(data).parent().parent().parent().parent().parent().attr('id');

    var channel_userid = $(data).parent().parent().parent().attr('name');

    var body = '{"Code":"10303","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_id + '","Action":"1","Members":[{"Uid":"' + channel_userid + '"}]}}';
    //           console.log('删除'+body);
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $('.cover_loading').show();
    $.post('' + URI + '',
        function(ret) {
            $('.cover_loading').hide();
            var resp = decodeURIComponent(ret, 'UTF-8');

            var obj = $.parseJSON(resp);

            if (obj.Result == 200) {

                $("li[name='" + channel_userid + "']").remove();
                common._coverShow("删除成功!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);

                channelRemoveMemberSuccess(channel_id, channel_userid );
                currentClmembers.remove(channel_userid);
                
            } else {
                // alert("错误码："+obj.Result);
            }
        })
}

//频道成员编辑 显示隐藏
function channel_memberset (obj, event) {
    var event = event || window.event;
    var that = $(obj).parent().next();
    var thatother=$(obj).parent().parent().siblings('li').children('.channel_set');
    var thatothers=$(obj).parent().parent().siblings('li').children('.channel_remove_select');
    var level = $(obj).parent().parent().attr('level');
    var time = $(obj).parent().parent().attr('saytime');
    if (that.is(':hidden')) {
        that.next().hide();
        thatother.hide();
        thatothers.hide();
        if (level == '0') {
            that.find('.channel_set_select').children('.channnel_select_val').html('高');
        } else if (level == '1') {
            that.find('.channel_set_select').children('.channnel_select_val').html('中');
        } else if (level == '2') {
            that.find('.channel_set_select').children('.channnel_select_val').html('低');
        } else if (level == '-1') {
            that.find('.channel_set_select').children('.channnel_select_val').html('仅听');
        }
        if (time == '-1') {
            that.find('.channel_saytime').children('.channel_saytime_val').html('无限制');
        } else {
            var times = time + '秒';
            that.find('.channel_saytime').children('.channel_saytime_val').html(times);
        }
        $(that).find('.channel_message').hide();
        Channel_MSGuser=null;
        that.slideDown('slow');
        var channel_div = $(that).find('.channel_module_say').children('').eq(1);
        if(channel_div.is(':hidden')){
            channel_div.prev().trigger('click');
        }
        
        // $(that).find('.channel_more_set').show();
        $(that).find('.channel_set_keep').show();
    } else {
        that.slideUp('slow');
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}
//更多资料编辑 频道成员
function channel_moreset (objs) {
    var user_id = $(objs).parent().parent().attr('name');
    var father = $(objs).next();
    var user_power=ChannelAllcher.containsKey(user_id);
    if(user_power){
        showAlert('同级调度员，无权限修改信息！');
        return;
    }
    $('.cover_loading').show();
    var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":"[' + user_id + ']"}}';
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
        // console.log(body);
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            // console.log(JSON.stringify(obj));
            if (obj.Result == 200) {
                 $('.cover_loading').hide();
                // alert(JSON.stringify(obj));
                var state;
                var answer;
                if (obj.Users[0].SetIsb == 0) {
                    state = '免打扰未开启';
                } else if (obj.Users[0].SetIsb == 1) {
                    state = '免打扰开启';
                }
                if (obj.Users[0].SetAm == 0) {
                    answer = '手动应答';
                } else if (obj.Users[0].SetAm == 1) {
                    answer = '自动应答';
                }
                father.children('p').children('.fr').html(user_id);
                father.children('.channel_messageid').children('input').val(obj.Users[0].Name);
                father.children('.channel_messagename').children('input').val(obj.Users[0].Name);
                father.children('.channel_messagephone').children('input').val(obj.Users[0].Phone);
                father.children('.channel_messagexiang').children('input').val(obj.Users[0].Email);
                father.find('input[type=password]').val('');
                father.find('.channelfaze').html(state);
                father.find('.channelanswer').html(answer);
                father.parent().next().hide();
                father.slideDown('slow');
                $(objs).hide();
            } else {
                $('.cover_loading').hide();
                showAlert('获取信息失败！');
                // alert('操作失败'+obj.Result);
            }
        })
}

function Channel_setusermsg(id){
    var selse=true;


}
//频道成员 更多设置功能隐藏
function channel_moresethide(data) {
    $(data).parent().slideUp('slow');
    $(data).parent().prev().prev().show();
    $(data).parent().prev().show();
}

//会话成员编辑 显示隐藏
function channeltell_memberset(obj, event) {
    var event = event || window.event;
    var that = $(obj).parent().next();
    var thatother=$(obj).parent().parent().siblings('li').children('.channel_set');
    var thatothers=$(obj).parent().parent().siblings('li').children('.channel_remove_select');

    if (that.is(':hidden')) {
        thatother.hide();
        thatothers.hide();
        that.next().hide();
        that.find('.channel_message').hide();
        // that.find('.channel_more_set').show();
        that.slideDown('slow');
    } else {
        that.slideUp('slow');
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function channeltell_morehide(data) {
    $(data).parent().prev().show();
    $(data).parent().slideUp('slow');
}
//会话更多信息
function channeltell_moreset(data) {
    var that = $(data).next();
    var user_id = $(data).parent().parent().attr('name');
    var user_power=ChannelAllcher.containsKey(user_id);
    if(user_power){
        showAlert('同级调度员，无权限修改信息！');
        return;
    }
    if (that.is(':hidden')) {
        $('.cover_loading').show();
     var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":"[' + user_id + ']"}}';
        console.log('报文'+body+'');
        $.getJSON('' + STATION_URL + '?Body=' + body + '',
            function(ret) {
                if (ret.Result == 200) {
                    console.log(JSON.stringify(ret));
                     $('.cover_loading').hide();
                    var state;
                    var answer;
                      if (ret.Users[0].SetIsb == 0) {
                              state = '免打扰未开启';
                          } else if (ret.Users[0].SetIsb == 1) {
                              state = '免打扰开启';
                       }
                     if (ret.Users[0].SetAm == 0) {
                               answer = '手动应答';
                          } else if (ret.Users[0].SetAm == 1) {
                               answer = '自动应答';
                     }

                    that.children('p').children('.fr').html(user_id);
                    that.children('.channel_messageid').children('input').val(ret.Users[0].Name);
                    that.children('.channel_messagename').children('input').val(ret.Users[0].Name);
                    that.children('.channel_messagephone').children('input').val(ret.Users[0].Phone);
                    that.children('.channel_messagexiang').children('input').val(ret.Users[0].Email);
                    that.find('input[type=password]').val('');
                    that.find('.channelfaze').html(state);
                    that.find('.channelanswer').html(answer);
                    that.prev().hide();
                    that.slideDown('slow');
                } else {
                    $('.cover_loading').hide();
                    showAlert('获取信息失败！');
                    // alert('操作失败' + ret.Result);
                }
            })
    } else {
        that.prev().show();
        that.slideUp('slow');
    }
}

//移除成员
function canneltell_memnersets(obj, event) {
    var event = event || window.event;
    var that = $(obj).parent().next().next();
    var thatother=$(obj).parent().parent().siblings('li').children('.channel_set');
    var thatothers=$(obj).parent().parent().siblings('li').children('.channel_remove_select');
    if (that.is(':hidden')) {
        thatother.hide();
        thatothers.hide();
        that.prev().hide();
        that.slideDown('slow');
    } else {
        that.slideUp('slow');
    }

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function code10301(ids, that) {
    $('.cover_loading').show();
    var body = '{"Code":"10301","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + ids + '"}}';
    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            if (ret.Result == 200) {
                 $('.cover_loading').hide();
                $('#' + ids + '').remove();
                $(that).hide();
                // common._coverShow("删除成功!");
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  已解散！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                $('.channel_right1').show();
                session_channel_exit(ids);
                refreshChannelMonitorList();
            } else if (ret.Result == 404) {
                $('.cover_loading').hide();
                common._coverShow("您不是创建者，无权限!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else {
                // alert('操作失败' + obj.Result);
                $('.cover_loading').hide();
                common._coverShow("删除失败!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            }
        })
}

function CHannel10302(data) {
    var id = $(data).parent().parent().parent().parent().attr('id');
    var fathers = $(data).parent().parent().siblings('.channel_listen_write');
    var channel_name = fathers.children().children('.channel_listen_name').children('input').val(); //频道名称
    var channel_level = fathers.children().children('.channel_listen_grade').children('.channel_listen_val').html(); //频道权限
    var channel_saytime = fathers.children().children('.channel_listen_time').children('.channel_listentime_val').html(); //频道发言时长
    var channel_lineup = fathers.children().children('.channel_listen_list').children('.channel_listenlist_val').html(); //频道排队人数
    var channel_text = fathers.find('textarea').val().trim(); //频道描述
    var ids=id.replace(/a/,'');
    if (channel_level == '最高') {
        // channel_level = 0;
    } else if (channel_level == '高级') {
        channel_level = 2;
    } else if (channel_level == '中级') {
        channel_level = 3;
    } else if (channel_level == '低级') {
        channel_level = 4;
    } else if (channel_level == '最低') {
        // channel_level = 4;
    }
    if (channel_saytime == '无限制') {
        channel_saytime = -1;
    } else {
        channel_saytime = channel_saytime.replace(/[^0-9]/ig, "");
    }
    if (channel_lineup == '无排队') {
        channel_lineup = 0;
    } else {
        channel_lineup = channel_lineup.replace(/[^0-9]/ig, "");
    }
    CHANNEL_SETimgicon=true;
    code10302(ids, channel_name, channel_level, channel_saytime, channel_lineup, channel_text);
    $(data).parent().parent().slideUp('slow');
}

//code10302 修改频道属性
function code10302(ids, channel_name, channel_level, channel_saytime, channel_lineup, channel_text) {
    var body = '{"Code":"10302","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + ids + '","ChannelName":"' + channel_name + '","ChannelLevel":"' + channel_level + '","Display":"' + channel_text + '","Coutinqueue":"' + channel_lineup + '","CrMemberTalkduration":"' + channel_saytime + '"}}';
    console.log(body);
/*****K开始******/
     $('.cover_loading').show();
        $.ajax({
          type: "post",
          url:GetMsgUrl,
          data:body,
          contentType:'application/json;charset=utf-8',
          dataType:'json',
          success: function(data) {
             console.log('修改该'+JSON.stringify(data));
             CHannelKeep_msg(data, ids, channel_name, channel_level, channel_saytime, channel_lineup, channel_text);
          },
          error:function(data){
              showAlert('保存失败！');
              // console.log('失败'+JSON.stringify(data));
              $('.cover_loading').hide();
             return;
          }
        });  
 /*****结束******/
}

function CHannelKeep_msg(data, ids, channel_name, channel_level, channel_saytime,    channel_lineup, channel_text) {
    /***开始****/
   var lockInfo = sessionGetById(ids).lock;
   var imgbefore = $('.channel_main').find('#'+ids).find('.channel_mr').attr('src');
   var imgNow = lockInfo ? '<img style="display:none;" src="'+imgbefore+'" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' : '<img style="display:inline-block" src="'+imgbefore+'" class="channel_mr" onclick="channel_clicktwo(this)" alt="">';
   if(data.Result==200){
      var channel_levels = '';
      var html = '';
      var lockImg = lockInfo ? '<img style="display:inline-block;" src="img/chat/chat_lock1.png" onclick="channel_list_lockimg_clickhandel(\'' + ids + '\')" class="channel_list_lockimg"  alt="img" />':'<img style="display:none;" src="img/chat/chat_lock1.png" onclick="channel_list_lockimg_clickhandel(\'' + ids + '\')" class="channel_list_lockimg"  alt="img" />';
        switch (channel_level) {
                       case 0:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html += '<i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown">'+imgNow+'' + lockImg + '';
                        break;
                    case 1:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html += '<i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown">'+imgNow+'' + lockImg + '';
                        break;
                    case 2:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html += '<i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown">'+imgNow+'' + lockImg + '';
                        break;
                    case 3:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                        html += '<i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown">'+imgNow+'' + lockImg + '';
                        break;
                    case 4:
                        channel_levels = '';
                        html += '<i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown">'+imgNow+'' + lockImg + '';
                        break;
                }
                $('.cover_loading').hide();
                Channel_AddlistenRightName(ids,channel_name);
                $('#'+ids).children('div').empty().append(html);
                $('#'+ids).attr('name',''+channel_name+'');
                $('#'+ids).attr('level',''+channel_level+'');  
                $('#'+ids).attr('time',''+channel_saytime+'');  
                $('#'+ids).attr('man',''+channel_lineup+'');  
                $('#'+ids).attr('dtr',''+channel_text+'');  
                 $('#'+ids).children('.channel_level2').children('li').attr('saytime',''+channel_saytime+'');  
                var channel_id = ids + 'a';
                $('#' + channel_id).find('.channel_level2name').children('i').html(channel_name);
                $('#' + channel_id).find('.channel_level2name').children('i').attr('title',''+channel_name+'');
                // common._coverShow("修改成功!");
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "   修改成功");
                 var option = { MemberSpeakTimelength: channel_saytime};
                     channelwriteSayTimeAll(ids,option);
                     currentChanneledMembersOn(ids);

                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if (data.Result == 404) {
                $('.cover_loading').hide();
                common._coverShow("您不是创建者，无权限!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if (data.Result == 411) {
                $('.cover_loading').hide();
                common._coverShow("该名称已存在，请重新命名!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if (data.Result == 410) {
                $('.cover_loading').hide();
                common._coverShow("频道名称不能超过60个字符!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if(data.Result == 412){
                $('.cover_loading').hide();
                 showAlert('该名称已存在，请重新命名!');
            }else{
                 $('.cover_loading').hide();
                 showAlert('操作失败！');
            }
            $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
  
 /****结束****/
}

function Channel_AddlistenRightName (id, name) {

   var len=$('.channel_details_main').has('.'+id+'').length;
   var Liindex=null;

   if (len==1) {
           chat_join.forEach(function(item,index){

                   if(item==id){

                      $('.channel_details_main').children().eq(index).find('.listen_cn').html(name);
                        gSessionArray_setName(id, name);
                         return;
                   }

           })    
   }


}

function  gSessionArray_setName(id, name) {
    
      // gSessionArray.forEach(function (item,index){
      //      if(item.sessionId==id){ 

      //       item.Name=name;
      //      }
      // })
      for(var i=0; i<gSessionArray.length;i++){

           if(gSessionArray[i].sessionId==id){ 

                gSessionArray[i].Name=name;
           }

      }

}

function channelwriteSayTimeAll (id, opt) {
    var members = channelInfoMap.get(id).members;
    if (members && members.length) {
        for (var i = 0, len = members.length; i<len; i++) {
                    members[i].MemberSpeakTimelength = opt.MemberSpeakTimelength;
                
        }
    }
}


//$('.channel_btn_msg').children().mousedown(function(){
//     $(this).attr('src','img/icon/channel/channel_line02.png');
//     $(this).parent().prev().children('.channel_listensay_cue02').show().siblings().hide();
//})
// $('.channel_btn_msg').children().mouseup(function(){
//     $(this).attr('src','img/icon/channel/channel_line03.png');
//})

//code10304修改成员属性
function code10304(obj) {
    var liobj = $(obj).parent().parent();
    var channel_levels = $(obj).prev().prev().children('.channnel_select_val').html();
    var saytime = $(obj).prev().children('.channel_saytime_val').html();
    var channel_ids = $('.channelSelectedonly').attr('id');
    var channel_manids = $(obj).parent().parent().parent().parent().attr('name');
    var channel_manname = $("li[name='" + channel_manids + "']").children('.channel_level2_name').children('i').html();
    //权限选择
    if (channel_levels == '高') {
        channel_levels = 0;
    } else if (channel_levels == '中') {
        channel_levels = 1;
    } else if (channel_levels == '低') {
        channel_levels = 2;
    } else if (channel_levels == '仅听') {
        channel_levels = -1;
    }
    //发言时长
    if (saytime == '无限制') {
        saytime = -1;
    } else {
        saytime = saytime.replace(/[^0-9]/ig, "");
    }
    $('.cover_loading').show();
    var body = '{"Code":"10304","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_ids + '","MemberId":"' + channel_manids + '","MemberLevel":"' + channel_levels + '","MemberSpeakTimelength":"' + saytime + '"}}';
    console.log(body);
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                 $('.cover_loading').hide();
                switch (channel_levels) {
                    case 0:
                        var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_manname + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" /><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                        liobj.children('.channel_level2_name').empty().append(channel_levelss);
                        break;
                    case 1:
                        var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_manname + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                        liobj.children('.channel_level2_name').empty().append(channel_levelss);
                        break;
                    case 2:
                        var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_manname + '</i>';
                        liobj.children('.channel_level2_name').empty().append(channel_levelss);
                        break;
                    case -1:
                        var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_manname + '</i><img src="img/icon/channel/channel_say.png" alt="" />';
                        liobj.children('.channel_level2_name').empty().append(channel_levelss);
                        break;
                }
                liobj.attr('level', channel_levels);
                liobj.attr('saytime', saytime);
                liobj.children('.channel_level2_name').show();
                liobj.children('.channel_level2_show').hide();
                liobj.children('.channel_set').hide();
                // common._coverShow("修改成功!");
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "   修改成功");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                var option = {Level: channel_levels, MemberSpeakTimelength: saytime};
                channelMemberPropModifySuccess(channel_ids, channel_manids, option);
                currentChanneledMembersOn(channel_ids);
            } else {
                 $('.cover_loading').hide();
                // alert("错误码："+obj.Result);
            }
        })
}
//频道成员属性修改成功
function channelMemberPropModifySuccess(cid, uid, option) {
    var members = channelInfoMap.get(cid).members;
    if (members && members.length) {
        for (var i = 0, len = members.length; i<len; i++) {
            if (members[i].Uid === uid) {
                for (var key in option) {
                    members[i][key] = option[key];
                }
                break;
            }
        }
    }
}

//移除成员方法
// function channelremoveman(obj) {
//     $(obj).parent().remove();
// }
//增加成员

// function channelee(event, treeId, treeNode) {
    //------------
    // var memberCount = 0;
    // var nodes = ztreeCheckboxSelect(event, treeId);

    // if (!gChannelCreate) {
    //     var cid = $('.channelSelectedonly').attr('cid');
    //     memberCount = channelInfoMap.get(cid).members.length;
    // }
    
    // if (nodes.length + memberCount > 500) {
    //     var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
    //     ztreeObj.checkAllNodes(false);
    //     return showAlert('频道成员数量不能超过500人，请重新选择！');
    // }
    // var html = '';
    // if (nodes.length > 0) {
    //     nodes.forEach(function (item) {
    //         html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span><div class="channel_addlists" onclick="channelselect(this)"><i>权限</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="channnel_manpower">低</span><div class="channel_addlistselect"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';
    //     })
    // }
    // $('.channel_addlist').empty().append(html);


    //-------------
    // var select = treeNode.checked;
    // var ChannelSelect = [];
    // $('#channel_addlist').children().each(function(i) {
    //     ChannelSelect.push($('#channel_addlist').children('li').eq(i).attr('name'));
    // })
    // if (select) {
    //     var arraynum = $.inArray(treeNode.id, ChannelSelect);
    //     if (arraynum > -1) {
    //         return
    //     }
    //     html = '<li name="' + treeNode.id + '" class="channeladdmanlist" name="channelman"><i>' + treeNode.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span><div class="channel_addlists" onclick="channelselect(this)"><i>权限</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="channnel_manpower">低</span><div class="channel_addlistselect"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';
    //     $('#ChannelAdduser').children('li[user="' + treeNode.id + '"]').children('input').prop('checked', true);
    //     $('.channel_addlist').append(html);
    // } else {
    //     $('.channel_addlist').children('li[name="' + treeNode.id + '"]').remove();

    //     $('#ChannelAdduser').children('li[user="' + treeNode.id + '"]').children('input').attr('checked', false);
    // }
// }

function channelcreatfinte(){
    $('#channelcreatname').val('');
    $('.channel_addchannellevels').hide();
    $('#channelbewrite').val('');
    $('.channel_addchannelleves').children('img').attr('src','img/icon/channel/channel_select1.png');
    $('.channel_addchannellevel').children('img').attr('src','img/icon/channel/channel_select1.png');
    $('.channel_addchannellevess').children('img').attr('src','img/icon/channel/channel_select1.png');
    $('#channelcreatlevel').html('低级');
    $('#channelcreatsay').html('60秒');
    $('#channelcreatwaite').html('无排队');
}


//创建频道函数


function code10300(channel_name, channelcreatlevel, channelcreatsay, channelcreatwaite, channelbewrite, father) {
    if (channel_name == '') {
        common._coverShow("频道名称不能为空！");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }

    var body = '{"Code":"10300","Body":{"SessionId":"' + sessionId + '","ChannelName":"' + channel_name + '","ChannelLevel":' + channelcreatlevel + ',"Display":"' + channelbewrite + '","Countinqueue":' + channelcreatwaite + ',"CrMemberTalkduration":' + channelcreatsay + ',"Members":' + channel_manmsg1 + '}}';
    console.log(body);
    // return;
    var arrmsg=[channel_name,channelcreatlevel,channelbewrite,channelcreatwaite,channelcreatsay,channel_manmsg1,father];
    var conword='创建频道失败！';
     AjaxPostMsg(body, AJAXSET_TIME, ChannelPostCreat, MediaErrorDown, MediaAjaxovertime, true, arrmsg, conword);
}

function ChannelPostCreat(obj,arr) {
    /****开始******/
    $('.cover_loading').hide();
    console.log(JSON.stringify(obj));
        if (obj.Result == 200) {
                var html5 = '';
                var channel_levels = '';
                var Level = arr[1];
                var man = arr[3];
                var time = arr[4];
                var cid = obj.ChannelId;
                var thisChan = {'Id':cid,'Name':arr[0],'Level':arr[1],'Creator':loginId};
                var lockImg = '<img src="img/chat/chat_lock1.png" onclick="channel_list_lockimg_clickhandel(\'' + cid + '\')" class="channel_list_lockimg"  alt="img" />';
                switch (Level) {
                    case 0:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + arr[2] + '" cid="' + obj.ChannelId + '" man="' + arr[3] + '"  time="' + arr[4] + '" name="' + arr[0] + '" level="' + arr[1] + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+arr[0]+'">' + arr[0] + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                        break;
                    case 1:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                       html5 += '<li id="' + obj.ChannelId + '" dtr="' + arr[2] + '" cid="' + obj.ChannelId + '" man="' + arr[3] + '"  time="' + arr[4] + '" name="' + arr[0] + '" level="' + arr[1] + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+arr[0]+'">' + arr[0] + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                        break;
                    case 2:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                       html5 += '<li id="' + obj.ChannelId + '" dtr="' + arr[2] + '" cid="' + obj.ChannelId + '" man="' + arr[3] + '"  time="' + arr[4] + '" name="' + arr[0] + '" level="' + arr[1] + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+arr[0]+'">' + arr[0] + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                        break;
                    case 3:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + arr[2] + '" cid="' + obj.ChannelId + '" man="' + arr[3] + '"  time="' + arr[4] + '" name="' + arr[0] + '" level="' + arr[1] + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+arr[0]+'">' + arr[0] + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                        break;
                    case 4:
                        channel_levels = '';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + arr[2] + '" cid="' + obj.ChannelId + '" man="' + arr[3] + '"  time="' + arr[4] + '" name="' + arr[0] + '" level="' + arr[1] + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+arr[0]+'">' + arr[0] + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt="">' + lockImg + '</div><ul class="channel_level2"></ul></li>';
                        break;
                }
                 
                if ($('.channel_main .channel_level1').children().eq(0).hasClass('help_wu')) {
                    $('.channel_main .channel_level1').empty();
                    $('.channel_main .channel_level1').append(html5);
                } else {
                    $('.channel_main .channel_level1').append(html5);
                }
              
                $(arr[6]).parent().parent().parent().hide();
                $(arr[6]).parent().parent().parent().prev().hide();
                $(arr[6]).parent().parent().parent().prev().prev().hide();
                $(arr[6]).parent().parent().parent().prev().prev().prev().hide();
                $('#bg-color').hide();
                $('.channel_left1').show();
                channelAlls.push(thisChan);
                   // common._coverShow("频道创建成功!");
                   common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  频道创建成功!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                treeAddUsers.clear();
                $('#'+cid).children('div').click();
            } else if (obj.Result == 411) {
                common._coverShow("该名称已存在，请重新命名！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000)
            } else if (obj.Result == 410) {
                common._coverShow("频道名称不能超过60个字符！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000)
            }else{
                common._coverShow("创建频道失败！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000)
            }
   /****结束*****/ 
}

function TellPostCreat(obj,arr){
       // var arrmsg=[channel_tellname,channel_tellusers];
          $('.cover_loading').hide();
          var item = {};
              item.Name = arr[0];
              if (obj.Result == 200) {
                 var thisChat = {'Id':obj.ConversationId, 'Name':arr[0],};
                var valname = loginId;
                var containers = '<li id="' + obj.ConversationId + '" name="' + valname + '"  tellname="' + arr[0] + '"><div onclick="channeltelllevel2(this)"><i title="'+arr[0]+'">' + arr[0] + '</i><img src="img/icon/channel/channel_select.png" class="fr sessIconDown"alt="" /></div><ul class="channel_level2"></ul></li>';
                if($('#chantell_ul').children().hasClass('help_wu')){
                  $('#chantell_ul').empty();
                  $('.channel_main_tell .channel_level1').prepend(containers);

                }else{
                  $('.channel_main_tell .channel_level1').prepend(containers);
                }
                item.Id = obj.ConversationId;
                item.Creator = loginId;
                callArrList.unshift(item);
                 $('.cover_loading').hide();
                $(arr[2]).parent().parent().parent().hide();
                $(arr[2]).parent().parent().parent().prev().hide();
                $(arr[2]).parent().parent().parent().prev().prev().hide();
                // callArrList.push(thisChat);
                $('.channel_coverleft').hide();
                $('#bg-color').hide();
                // common._coverShow("创建会话成功!");
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  创建会话成功!");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);
                $('.channel_telllevel2name').children('i').attr('title',''+arr[0]+'');
                treeAddUsers.clear();
                //2017.12.9
                $('#'+obj.ConversationId).children('div').trigger('click');

              } else if (obj.Result == 411) {
                common._coverShow("该名称已存在，请重新命名！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              } else if (obj.Result == 410) {
                common._coverShow("会话名称不能超过60个字符！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              } else {
                common._coverShow("创建会话失败!");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              }
}


//增加频道成员
var channel_Addid = '';

function channel_addman(obj) {
    $("#channerAddtrees").empty();
    $('.channel_creattop').hide();
    $('.channel_creattopadd').show();
    $(obj).children('img').attr('src','img/icon/newicon/help_adds.png');
    gChannelCreate = false;
    $('#channel_addman').show();
    $('#channel_addlist').empty();
    $('.channel_addfooter').children('.fr').hide();
    $('.channel_creat').height($('.wrap').height() - 80);
    $('.channel_container').height($('.wrap').height() - 176);
    $('.channel_addchannel').height($('.wrap').height() - 71);
    $('.channel_coverleft').height($('.wrap').height() - 80);
    $('#ChannelAdduser').children('li').children('input').attr('checked',false);
    $('.channel_searchbox').children('input').val('');
    var val1='';
    var val2='';
    ChannelUserSea(val1,val2);
    $('.channel_creat').show();
    $('#bg-color').show();
    $('.channel_creatselect').show();
    initChannelTree();
    var grandfather = $(obj).parent().parent().parent().parent().attr('id');
    channel_Addid = grandfather.slice(0, grandfather.length - 1); //频道ID
	zTreeOnAsyncSuccess('channerAddtree');
}

//增加成员
function codeadd10303(channel_Addid1, name) {
    var list = $('#channel_addlist');
    if (list.is(':empty')) {
        showAlert('请选择要添加的用户！');
        return;
    }
    var channel_addmanmsg1 = '';
    var channel_addmanmsg = [];
    var channel_addid = [];
    var channel_addlevel = [];
    var channel_addname = [];
    var obj = $(this);
    $('#channel_addlist>li').each(function(i) {
        var ipocid = $(this).attr('name');
        if (!currentClmembers.containsKey(ipocid)) {
            channel_addid.push(ipocid); //帐号ID
            channel_addlevel.push($(this).find('.channnel_manpower').html()); //等级
            channel_addname.push($(this).children('i').html()); //名称
        }
    })

    if (channel_addid.length === 0) {
        showAlert('添加成员已存在，请勿重复添加！');
        return;
    }

    for (var i = 0; i < channel_addlevel.length; i++) {
        if (channel_addlevel[i] == '高') {
            channel_addlevel[i] = 0;
        } else if (channel_addlevel[i] == '中') {
            channel_addlevel[i] = 1;
        } else if (channel_addlevel[i] == '低') {
            channel_addlevel[i] = 2;
        } else if (channel_addlevel[i] == '仅听') {
            channel_addlevel[i] = -1;
        }
    }
    for (var i = 0; i < channel_addlevel.length; i++) {
        channel_addmanmsg[i] = {
            "Uid": "" + channel_addid[i] + "",
            "Level": channel_addlevel[i]
        };
    }

    channel_addmanmsg1 = JSON.stringify(channel_addmanmsg);
    
 
    
    var body = '{"Code":"10303","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_Addid1 + '","Action":"0","Members":' + channel_addmanmsg1 + '}}';
     var arrmsg=[channel_addid,channel_addlevel,channel_addname,channel_Addid1,name];
     var conword='添加成员失败！';
      AjaxPostMsg(body, AJAXSET_TIME, channel_Add303, MediaErrorDown, MediaErrorDown, true, arrmsg, conword);
   
}

function channel_Add303 (obj,arrmsg) {
   if(obj.Result==200){
    $('.cover_loading').hide();
    var html = '';
    for (var i = 0; i < arrmsg[0].length; i++) {
                    /*开始筛选*/
                    if (arrmsg[0][i] == loginId) {
                        switch (arrmsg[1][i]) {
                            case 0:
                                channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt=""><img src="img/icon/channel/channel_manlevel.png" alt="">';
                                html += '<li><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div></li>';
                                break;
                            case 1:
                                channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt="">';
                                html += '<li><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div></li>';
                                break;
                            case 2:
                                channel_memberimg = "";
                                html += '<li><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div></li>';
                                break;
                            case -1:
                                channel_memberimg = '<img src="img/icon/channel/channel_say.png" alt="">';;
                                html += '<li><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div></li>';
                                break;
                        }
                    } else {
                        switch (arrmsg[1][i]) {
                            case 0:
                                channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt=""><img src="img/icon/channel/channel_manlevel.png" alt="">';
                                html += '<li name="' + arrmsg[0][i] + '" level="' + arrmsg[1][i] + '" saytime="90" limit="0"><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div><div class="channel_level2_show"><img onclick="channel_call_snapchat(\'' +arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' +arrmsg[0][i] + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channel_memberset(this)"><img src="img/icon/newicon/power.png" title="禁止呼入" onclick="channelDiscall(this)"/><img src="img/icon/channel/channeldes.png" title="移除" / onclick="canneltell_memnersets(this)"></div>'+'<div class="channel_set" ><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_select" onclick="channel_select(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channnel_select_val"></span><div class="channel_set_select1"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div><div class="channel_saytime" onclick="channel_select(this)"><i>最大发言时长</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channel_saytime_val"></span><div class="channel_saytime_select1"><ul><li><span>30秒</span></li><li><span>60秒</span></li><li><span>90秒</span></li><li><span>120秒</span></li><li><span>无限制</span></li></ul></div></div><div class="channel_set_remove" onclick="channel_remove10303(this)">移除成员</div><div class="channel_set_keep" onclick="code10304(this)">保存</div><div class="channel_more_set" onclick="channel_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +'<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr" id="" onkeyup="channel_ckphone(this)" value=""  maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"  value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channelmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="请输入新密码"></div><div class="channel_message_password"><span>确认密码</span><input type="password" id="" name="" placeholder="请再次输入新密码"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                                    '</div><div class="channel_remove_select"><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2">取消</span><span class="channel_remove_select3 fr" onclick="coderemove10303(this)">确认</span></div></div></li>';
                                break;
                            case 1:
                                channel_memberimg = '<img src="img/icon/channel/channel_manlevel.png" alt="">';
                                html += '<li name="' + arrmsg[0][i] + '" level="' + arrmsg[1][i] + '" saytime="90" limit="0"><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div><div class="channel_level2_show"><img onclick="channel_call_snapchat(\'' +arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' +arrmsg[0][i] + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channel_memberset(this)"><img src="img/icon/newicon/power.png" title="禁止呼入" onclick="channelDiscall(this)"/><img src="img/icon/channel/channeldes.png" title="移除" / onclick="canneltell_memnersets(this)"></div>'+ '<div class="channel_set" ><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_select" onclick="channel_select(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channnel_select_val"></span><div class="channel_set_select1"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div><div class="channel_saytime" onclick="channel_select(this)"><i>最大发言时长</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channel_saytime_val"></span><div class="channel_saytime_select1"><ul><li><span>30秒</span></li><li><span>60秒</span></li><li><span>90秒</span></li><li><span>120秒</span></li><li><span>无限制</span></li></ul></div></div><div class="channel_set_remove" onclick="channel_remove10303(this)">移除成员</div><div class="channel_set_keep" onclick="code10304(this)">保存</div><div class="channel_more_set" onclick="channel_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' + '<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""  value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr" id="" onkeyup="channel_ckphone(this)" value=""  maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"   value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channelmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="请输入新密码"></div><div class="channel_message_password"><span>确认密码</span><input type="password" id="" name="" placeholder="请再次输入新密码"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +'</div><div class="channel_remove_select"><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2">取消</span><span class="channel_remove_select3 fr" onclick="coderemove10303(this)">确认</span></div></div></li>';
                                break;
                            case 2:
                                channel_memberimg = "";
 
                                html += '<li name="' + arrmsg[0][i] + '" level="' + arrmsg[1][i] + '" saytime="90" limit="0"><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div><div class="channel_level2_show"><img onclick="channel_call_snapchat(\'' +arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' +arrmsg[0][i] + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channel_memberset(this)"><img src="img/icon/newicon/power.png" title="禁止呼入" onclick="channelDiscall(this)"/><img src="img/icon/channel/channeldes.png" title="移除" / onclick="canneltell_memnersets(this)"></div>'+'<div class="channel_set" ><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_select" onclick="channel_select(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channnel_select_val"></span><div class="channel_set_select1"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div><div class="channel_saytime" onclick="channel_select(this)"><i>最大发言时长</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channel_saytime_val"></span><div class="channel_saytime_select1"><ul><li><span>30秒</span></li><li><span>60秒</span></li><li><span>90秒</span></li><li><span>120秒</span></li><li><span>无限制</span></li></ul></div></div><div class="channel_set_remove" onclick="channel_remove10303(this)">移除成员</div><div class="channel_set_keep" onclick="code10304(this)">保存</div><div class="channel_more_set" onclick="channel_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>'+'<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr" id="" onkeyup="channel_ckphone(this)" value="" maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr"   value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channelmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"   name="" placeholder="请输入新密码"></div><div class="channel_message_password"><span>确认密码</span><input type="password" id="" name="" placeholder="请再次输入新密码"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                                    '</div><div class="channel_remove_select"><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2">取消</span><span class="channel_remove_select3 fr" onclick="coderemove10303(this)">确认</span></div></div></li>';
                                break;
                            case -1:
                                channel_memberimg = '<img src="img/icon/channel/channel_say.png" alt="">';;
 
                                html += '<li name="' + arrmsg[0][i] + '" level="' + arrmsg[1][i] + '" saytime="90" limit="0"><div class="channel_level2_name"><img src="img/chat/outline.png" alt=""><i>' + arrmsg[2][i] + '</i>' + channel_memberimg + '</div><div class="channel_level2_show"><img onclick="channel_call_snapchat(\'' +arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' +arrmsg[0][i] + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + arrmsg[0][i] + '\', \'' + arrmsg[2][i] + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channel_memberset(this)"><img src="img/icon/newicon/power.png" title="禁止呼入" onclick="channelDiscall(this)"/><img src="img/icon/channel/channeldes.png" title="移除" / onclick="canneltell_memnersets(this)"></div>'+'<div class="channel_set" ><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_select" onclick="channel_select(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channnel_select_val"></span><div class="channel_set_select1"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div><div class="channel_saytime" onclick="channel_select(this)"><i>最大发言时长</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="fr channel_saytime_val"></span><div class="channel_saytime_select1"><ul><li><span>30秒</span></li><li><span>60秒</span></li><li><span>90秒</span></li><li><span>120秒</span></li><li><span>无限制</span></li></ul></div></div><div class="channel_set_remove" onclick="channel_remove10303(this)">移除成员</div><div class="channel_set_keep" onclick="code10304(this)">保存</div><div class="channel_more_set" onclick="channel_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +'<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name=""   value="" maxlength="10" placeholder="最大长度为10个字符"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr" id="" onkeyup="channel_ckphone(this)" value="" maxlength="15"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr" value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channelmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password"  name="" placeholder="请输入新密码"></div><div class="channel_message_password"><span>确认密码</span><input type="password" id="" name="" placeholder="请再次输入新密码"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +
                                    '</div><div class="channel_remove_select"><span class="channel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2">取消</span><span class="channel_remove_select3 fr" onclick="coderemove10303(this)">确认</span></div></div></li>';
                                break;
                        }
                    } /*结束*/
                }
                $('#' + arrmsg[3]).children('.channel_level2').append(html);
                channel_hover();
                $(arrmsg[4]).parent().parent().hide();
                $(arrmsg[4]).parent().parent().prev().hide();
                $('#bg-color').hide();
                $('.channel_left1').show();
                // common._coverShow("增加成员成功!");
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  添加成员成功!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                treeAddUsers.clear();

                var body1 = '{"Code":"10311","Body":{"SessionId":"' + sessionId + '","ChannelId":"' +  arrmsg[3] + '","Type":"1"}}';
                $.getJSON('' + STATION_URL + '?Body=' + body1 + '', function (ret) {
                    if (ret.Result === 200) {
                        $('.celtotal').text(ret.Members.length);
                        // alert(JSON.stringify(ret))
                        channelInfoMapUpdate(arrmsg[3], ret.Members);
                        currentChannelMembers = ret.Members;
                        currentChanneledMembersOn(arrmsg[3]);
                    }
                })
            }else if (obj.Result === 404) {
                 $('.cover_loading').hide();
                 showAlert('您不是创建者，无权限！');
            } else {
                 $('.cover_loading').hide();
                 common._coverShow("增加成员失败!");
                 setTimeout(function() {
                     common._coverHide();
                 },2000);
            }
   
}



//移除会话成员
function channel_remove10309(obj) {
    var channel_removemanid = $(obj).parent().parent().attr('name');
    var channel_id = $(obj).parent().parent().parent().parent().attr('id');
     var channel_ch=$('#'+channel_id+'').children('.channel_level2').children().length;
     if(channel_ch<=2){
         showAlert('会话最少应有两位成员！');
         return;
     }
    var body = '{"Code":"10309","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_id + '","Action":"1","Members":["' + channel_removemanid + '"]}}';

    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');

            var obj = $.parseJSON(resp);

            if (obj.Result == 200) {
                $('li[name="' + channel_removemanid + '"]').remove();
                common._coverShow("删除成功！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                for (var i=0; i<currentChatMembers.length; i++) {
                    if (currentChatMembers[i].Uid == channel_removemanid) {
                        currentChatMembers.splice(i, 1);
                        break;
                    }
                }
            } else {
                // alert('操作失败'+obj.Result);
            }
        })
}

function channel_tellremove309(data) {
    var channel_removemanid = $(data).parent().parent().parent().attr('name');
    var channel_id = $(data).parent().parent().parent().parent().parent().attr('id');
    var channel_ch=$('#'+channel_id+'').children('.channel_level2').children().length;
     if(channel_ch<=2){
         showAlert('会话最少应有两位成员！');
         return;
     }
    var body = '{"Code":"10309","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_id + '","Action":"1","Members":["' + channel_removemanid + '"]}}';
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                $('li[name="' + channel_removemanid + '"]').remove();
                common._coverShow("已移除该成员！");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);

                for (var i=0; i<currentChatMembers.length; i++) {
                    if (currentChatMembers[i].Uid == channel_removemanid) {
                        currentChatMembers.splice(i, 1);
                        break;
                    }
                }
            } else {
                // alert('操作失败'+obj.Result);
            }
        })
}


//增加会话成员
// var gChatAddMemberArray = [];


// function channeltellAddtree(event, treeId, treeNode) {
    // var html = '';
    // var ChannelSelect = [];
    // $('#channel_telladdlist').children().each(function(i) {
    //     ChannelSelect.push($('#channel_telladdlist').children('li').eq(i).attr('name'));
    // })
    // var select = treeNode.checked;
    // if (select) {
    //     var arraynum = $.inArray(treeNode.id, ChannelSelect);
    //     if (arraynum > -1) {
    //         return
    //     }
    //     html = '<li name="' + treeNode.id + '" class="channeladdmanlist" name="channelman"><i>' + treeNode.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';

    //     $('#ChannelTellAdduser').children('li[user="' + treeNode.id + '"]').children('input').prop('checked', true);
    //     $('.channel_addlist').append(html);
    // } else {
    //     $('#ChannelTellAdduser').children('li[user="' + treeNode.id + '"]').children('input').prop('checked', false);
    //     $('.channel_addlist').children('li[name="' + treeNode.id + '"]').remove();
    // }
    

    // var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
    // var nodes = ztreeObj.getCheckedNodes(true);
   
    // if (!gChannelCreate) {
    //     for (var i = 0; i < nodes.length; i++) {
    //         for (var j = 0; j < currentChatMembers.length; j++) {
    //             if (nodes[i].id == currentChatMembers[j].Uid) {
    //                 ztreeObj.checkNode(nodes[i], false, true);
    //                 showAlert('会话已有该用户，请勿重复添加！');
    //                 nodes.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }
    // }

    // var html = '';
    // if (nodes.length > 0) {
    //     nodes.forEach(function (item) {
    //         html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
    //     })
    // }
    // $('.channel_addlist').empty().append(html);    
// }



//code10309 增加会话成员
var channel_tellAddid = '';
function channel_codeadd10309(obj) {
    $('.channel_tellcreattop').hide();
    $('.channel_tellcreattopadd').show();
    // $(obj).children('img').attr('src','img/icon/newicon/help_adds.png');
    treeAddUsers.clear();
    gChannelCreate = false;
		channel_creates = true;
    // gChatAddMemberArray.length = 0;
    $('.channel_telladdfooter').children('.fr').hide();
    $('#channel_telladdman').show();
    $('#channel_telladdlist').empty();
    $('.channel_tellcreat').height($('.wrap').height() - 80);
    $('.channel_tellcontainer').height($('.wrap').height() - 176);
    $('.channel_coverleft').height($('.wrap').height() - 70);
    $('.channel_telladdul').height($('.wrap').height() - 252);
    $('#ChannelTellAdduser').children('li').children('input').attr('checked',false);
    $('.channel_tellsearchbox').children('input').val('');
    var val1='';
    var val2='';
    ChannelTellUserSea(val1,val2);
    $('#bg-color').show();
    $('.channel_tellcreat').show();
    $('.channel_tellcreatselect').show();
    initChannelTree();
    var grandfather = $(obj).parent().parent().parent().parent().attr('id');
    channel_tellAddid = grandfather.slice(0, grandfather.length - 1); //会话ID               
	zTreeOnAsyncSuccess('channeltellAddtree');
}

/**********左右边栏********/
function channel_lefthide() {
    var channel_screenh = $(window).height();
    var channel_top = (Number(channel_screenh) - 110) / 2;
    var num = 260;
    $(".channel_left").css("top", channel_top);
    $(".channel_left").css("left", num * 1);
}

function isEmail(str) {
    // var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // var reg=^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$;
    return reg.test(str);
}

function checkMobile(data) {
    var reg = /^1[3|4|5|8][0-9]\d{8}$/;
    return reg.test(data);
}

/********修改密码**********/
function channel_retpassword(data) {
    var uids = $(data).parent().children('.channel_messageid').children('.fr').html().trim();
    var password = $(data).prev().prev().children('input').val().trim();
    var passwords = $(data).prev().children('input').val().trim();
    var body;
   
       if(password != passwords){

            showAlert('新密码与确认密码不一致，请检查并重新输入');
            return;  

       }
     var namevals=RegeMatchValC(password);
       if(namevals){
            showAlert('密码不允许有特殊字符！');
            return;
       } 

        var user_power=ChannelAllcher.containsKey(uids);
            if(user_power){
                   
                       if(password.length<8||password.length>15){
                            common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                               setTimeout(function() {
                                 common._coverHide();
                               }, 5000);
                            return;
                    }
                   
                 passwords=Setuser_Pwd(uids,passwords);
                body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uids+'","Pwd":"'+passwords+'"}}'

            }else{

                       if(password.length<8||password.length>15){
                                    common._coverShow("密码长度为8-15位!");
                                              setTimeout(function (){
                                                   common._coverHide();
                                          },2000);
                                           return;
                        }
                  
                body = '{"Code":"10107","Body":{"SessionId":"' + sessionId + '","Uid":"' + uids + '","Pwd":"' + passwords + '"}}';
            }             
        
   
     
      var arr=[user_power];
     var conword='修改密码失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Channel_PwdSuccess, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
    /*********修改密码*************/
        // $.getJSON('' + STATION_URL + '?Body=' + body + '',
        //     function(ret) {
        //         console.log(ret);
        //         if (ret.Result == 200) {
        //             $('.cover_loading').hide();
        //             // $(data).parent().parent().slideUp('slow');
        //             common._coverShow("设置密码成功!");
        //             setTimeout(function() {
        //                 common._coverHide();
        //             }, 2000);
        //         } else if(ret.Result == 406){
        //              $('.cover_loading').hide();
        //              common._coverShow("同级调度员不允许修改密码!");
        //             setTimeout(function() {
        //                 common._coverHide();
        //             }, 2000);
        //         }else if(ret.Result ==410){
        //             $('.cover_loading').hide();
        //             showAlert('密码为8-15位数字和字母或字符组合!');
        //         }else if(ret.Result ==415){
        //             $('.cover_loading').hide();
        //             showAlert('5次以内不得设置相同的密码!');
        //         }else{
        //              $('.cover_loading').hide();
        //             common._coverShow("设置密码失败!");
        //             setTimeout(function() {
        //                 common._coverHide();
        //             }, 2000);
        //         }
        //     })


    // } else if (password != passwords) {

    //     common._coverShow("两次密码不一致!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    // } else if (password == '' || passwords == '') {

    //     common._coverShow("密码不能为空!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    // }
}

function Channel_PwdSuccess (ret,arr) {
         var arrpower=arr[0];

         if (ret.Result == 200) {
                    $('.cover_loading').hide();
                    common._coverShow("设置密码成功!");
                    setTimeout(function() {
                        common._coverHide();
                    }, 2000);
                     currentChanneledMembersOn(arr[1]);
                } else if(ret.Result == 406){
                     $('.cover_loading').hide();
                     common._coverShow("同级调度员不允许修改密码!");
                    setTimeout(function() {
                        common._coverHide();
                    }, 2000);
                }else if(ret.Result ==410){
                    $('.cover_loading').hide();
                    if(arrpower){
                    
                    var hang='<br>';
                    // showAlert('密码为8-15位数字和字母或字符组合!');
                      common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function() {
                     common._coverHide();
                   }, 5000);


                    }else{

                       showAlert('密码为8-15位数字或字母组合!');
                    
                    }
                  
                }else if(ret.Result ==415){
                    $('.cover_loading').hide();
                    showAlert('5次以内不得设置相同的密码!');
                }else if(ret.Result ==418){
                     $('.cover_loading').hide();
                   if(arrpower){
                    
                         var hang='<br>';
                    // showAlert('密码为8-15位数字和字母或字符组合!');
                          common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                       setTimeout(function() {
                         common._coverHide();
                       }, 5000);


                    }else{

                     
                    showAlert('密码为8-15位数字或字母组合!');
                     

                    }
                }


}

function CHannelRET(data) {

    var uids = $(data).parent().children('.channel_messageid').children('.fr').html().trim(); 
    var passwords = getRandomPassword();
    var user_power=ChannelAllcher.containsKey(uids);
    var return_pwdmsg;
    var body;
       if(user_power){
    
           passwords=passwords+'Pwd!';
           return_pwdmsg=passwords;
            console.log(passwords);
          $('.cover_loading').show();
          passwords=Setuser_Pwd(uids,passwords);
            body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uids+'","Pwd":"'+passwords+'"}}' 

            }else{
                    return_pwdmsg=passwords;
                    $('.cover_loading').show();
                    body = '{"Code":"10107","Body":{"SessionId":"' + sessionId + '","Uid":"' + uids + '","Pwd":"' + passwords + '"}}';

            }

    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            if (ret.Result == 200) {
                // $(data).parent().parent().slideUp('slow');
                 $('.cover_loading').hide();
                common._coverShow("设置密码成功,随机密码为" + return_pwdmsg + "");
                setTimeout(function() {
                    common._coverHide();
                }, 5000);
            }else if(ret.Result==406){
                $('.cover_loading').hide();
               common._coverShow("同级调度员不允许修改密码!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if(ret.Result==418){ 
                   // var hang='<br>';
                    // showAlert('密码为8-15位数字和字母或字符组合!');
                   //    common._coverShow("密码为8-15位数字和字母和字符组合!" + hang + "如:Heduijiang123!!");
                   // setTimeout(function() {
                   //   common._coverHide();
                   // }, 5000);

                // $('.cover_loading').hide();
                // common._coverShow("设置密码失败!");
                // setTimeout(function() {
                //     common._coverHide();
                // }, 2000);
            }
        })
}
/*********修改用户信息*****************/
function channeltellmsgret(data) {
    var father = $(data).parent();
    var uids = father.children('.channel_messageid ').children('.fr').html().trim();
    var channel_name = father.find('.channel_messagename').children('input').val().trim();
    var channel_phone = father.find('.channel_messagephone').children('input').val().trim();
    var channel_email = father.find('.channel_messagexiang').children('input').val().trim();

    var body = '{"Code":"10113","Body":{"SessionId":"' + sessionId + '","Uid":"' + uids + '","Name":"' + channel_name + '","Phone":"' + channel_phone + '","Email":"' + channel_email + '"}}';


    if (channel_name == '') {
        common._coverShow("备注名称不能为空!");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }
    var channel_names=RegeMatchValC(channel_name);
         if(channel_names){
            showAlert('备注名称不允许有特殊字符');
            return;
         }
    // if (channel_phone == '') {
    //     common._coverShow("手机号码不能为空!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    //     return;
    // }
    // if (channel_email == '') {
    //     common._coverShow("邮箱不能为空!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    //     return;
    // }
    if(channel_email!=''){
        if (!isEmail(channel_email)) {
          common._coverShow("邮箱格式错误!");
           setTimeout(function() {
             common._coverHide();
          }, 2000);
          return;
         }
      }
     if(channel_phone!=''){ 
        if (!checkMobile(channel_phone)) {
          common._coverShow("手机格式错误!");
          setTimeout(function() {
             common._coverHide();
          }, 2000);
          return;
       }
   }
   $('.cover_loading').show();
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                 $('.cover_loading').hide();
                father.parent().siblings('.channel_telllevel2_name').children('i').html(channel_name);
                common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  修改成功");
                setTimeout(function() {
                        common._coverHide();
                    }, 2000)
                    // father.parent().slideUp('slow');        
            } else if(obj.Result == 406){
                 $('.cover_loading').hide();
                 common._coverShow("同级调度员不允许修改信息!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
                 
            }else{
                $('.cover_loading').hide();
                common._coverShow("修改信息失败!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            }
        })
}

function channelmsgret(data) {
    var father = $(data).parent();
    var channelmsg = '';
    var channelpower = '';
    var uids = father.children('.channel_messageid ').children('.fr').html().trim();
    var channel_name = father.find('.channel_messagename').children('input').val().trim();
    var channel_phone = father.find('.channel_messagephone').children('input').val().trim();
    var channel_email = father.find('.channel_messagexiang').children('input').val().trim();
    var contaienr = $(data).parent().parent().siblings('.channel_level2_name').children('i');
    if (channel_email != '') {
         if (!isEmail(channel_email)) {
          common._coverShow("邮箱格式错误!");
          setTimeout(function() {
            common._coverHide();
         }, 2000);
         return;
        }
    }
    if(channel_phone!=''){
        if (!checkMobile(channel_phone)) {
            common._coverShow("手机格式错误!");
            setTimeout(function() {
                common._coverHide();
            }, 2000);
            return;
        }
    }
     if(channel_name==''){
        channel_name=uids;
    }
 
    var channel_levels = $(data).parent().siblings('.channel_module_say').find('.channnel_select_val').html();
    var saytime = $(data).parent().siblings('.channel_module_say').find('.channel_saytime_val').html();
    var channel_ids = $('.channelSelectedonly').attr('id');
    var channel_manids = $(data).parent().parent().parent().attr('name');
    var channel_manname = $("li[name='" + channel_manids + "']").children('.channel_level2_name').children('i').html(); //li的名字

    //  //权限选择
    if (channel_levels == '高') {
        channel_levels = 0;
    } else if (channel_levels == '中') {
        channel_levels = 1;
    } else if (channel_levels == '低') {
        channel_levels = 2;
    } else if (channel_levels == '仅听') {
        channel_levels = -1;
    }
    //发言时长
    if (saytime == '无限制') {
        saytime = -1;
    } else {
        saytime = saytime.replace(/[^0-9]/ig, "");
    }
    // var channelpower=Channel10304set(channel_ids, channel_manids, channel_levels, saytime, channel_manname);
    Channel10304set(channel_ids, channel_manids, channel_levels, saytime, channel_manname,channel_name, channel_phone, channel_email);
   
}

function Channel10304set(channel_ids, manids, levels, saytime, manname, channel_name, channel_phone, channel_email) {
    // $('.cover_loading').show();
    var body1 = '{"Code":"10304","Body":{"SessionId":"' + sessionId + '","ChannelId":"' + channel_ids + '","MemberId":"' + manids + '","MemberLevel":"' + levels + '","MemberSpeakTimelength":"' + saytime + '","Name":"'+channel_name+'","Phone":"'+channel_phone+'","Email":"'+channel_email+'"}}';
    console.log('报文'+JSON.stringify(body1));
    // channel_ids,channel_manids,channel_levels,saytime
    var channelpower;
    $('.cover_loading').show();
    // $.ajaxSettings.async = false;
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body1, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            // console.log('返回结果'+JSON.stringify(obj));
            channelpower = obj.Result;
            if (obj.Result == 200) {
                channelpower = obj.Result;
                if (channelpower == 200) {
                    switch (levels) {
                        case 0:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" /><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case 1:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case 2:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i>';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case -1:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_say.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                    }
                } else {
                    switch (levels) {
                        case 0:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" /><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case 1:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_manlevel.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case 2:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i>';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                        case -1:
                            var channel_levelss = '<img src="img/chat/online.png" alt="" /><i>' + channel_name + '</i><img src="img/icon/channel/channel_say.png" alt="" />';
                            $("li[name='" + manids + "']").children('.channel_level2_name').empty().append(channel_levelss);
                            $("li[name='" + manids + "']").attr('level', '' + levels + '');
                            $("li[name='" + manids + "']").attr('saytime', '' + saytime + '');
                            break;
                    }
                }
                $('.cover_loading').hide();
                  common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  修改成功");
                   setTimeout(function() {
                       common._coverHide();
                    }, 2000);                 
                for (var i=0;i<currentChannelMembers.length;i++) {
                      if(currentChannelMembers[i].Uid==manids){
                          currentChannelMembers[i].Level=levels;
                          currentChannelMembers[i].Name=channel_name;
                          currentChannelMembers[i].MemberSpeakTimelength=saytime;
                      }
                }
                currentChanneledMembersOn(channel_ids);
            } else {
                $('.cover_loading').hide();
                 showAlert('修改失败！');
                // alert("错误码："+obj.Result);
            }
        })

    return channelpower;
}


function Channel10113(val1, val2, val3, val4, val5) {
    var cid = $('.channelSelectedonly').attr('cid');
    var body = '{"Code":"10113","Body":{"SessionId":"' + sessionId + '","Uid":"' + val1 + '","Name":"' + val2 + '","Phone":"' + val3 + '","Email":"' + val4 + '"}}';
    $('.cover_loading').show();
    var msgs;
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.ajaxSettings.async = false;

    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
            $('.cover_loading').hide();

                msgs = obj.Result;
                val5.html(val2);
                channelMemberPropModifySuccess(cid, val1, {Name: val2})

            } else if(obj.Result == 406){
                $('.cover_loading').hide();
                     // common._coverShow("同级调度员不允许修改信息!");
                     //        setTimeout(function (){
                     //             common._coverHide();
                     //        },2000);
                // alert("错误码：" + ret.Result);
            }else{ 
                $('.cover_loading').hide();
            }
        })

    return msgs;
}
/*切换会话**/
function ChannelSel(data) {
    if (!luYin1) {
        $('.channel_telllistenwritespends').trigger('click')
    }

    if ($(data).hasClass('channel_color')) {

    } else {

        $(data).addClass('channel_color').siblings().removeClass('channel_color');
        $('.channel_main_tell').hide();
        $('.channel_main').show();
        $('.channel_found_tell').hide();
        $('.channel_found').show();
        $('#chantellsearch').hide();
        $('#chansearch').show();
        $('.channel_tellall').hide();
        $('.channel_right1').show();
        if($('.channel_main').find('.channelSelectedonly').length > 0) {
            $('.channel_box2').show('slow');
            $('.channel_right1').hide();
        }
    }
}

function ChannelSels(data) {
    if (!luYin) {
      $('.channel_listenwritespends').trigger('click');
    }

    if ($(data).hasClass('channel_color')) {

    } else {
        $(data).addClass('channel_color').siblings().removeClass('channel_color');
        $('.channel_main').hide();
        $('.channel_main_tell').show();
        $('.channel_found').hide();
        $('.channel_found_tell').show();
        $('#chansearch').hide();
        $('#chantellsearch').show();
        $('.channel_box2').hide();
        $('.channel_right1').show();
        if($('.channel_main_tell').find('.chatOpenOnly').length > 0) {
            $('.channel_tellall').show('slow');
            $('.channel_right1').hide();
        }
    }
}

function channeltell10600(data) {
    var type = [1,2,4,5];
    var reg = /a/g;
    var cids = data.replace(reg, '');
    var date = new Date();
    var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    // var timestart=getTimefrom(1);
    var timestart = '2005-10-10 10:06:25';
    var timestarts = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
    $('#channel_TimeStartdate').val(timestarts);
    $('#channel_TimeOverdate').val(timestarts);
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + timestart + '","TimeTo":"' + timeover + '","SesId":"' + cids + '","ResTypes":"[' + type + ']","PageSize":20,"PageIndex":0}}';
    // console.log(body);
    cHAnneltelldowns(body);
      // $('input[name=listAll]').attr('disabled', false);
       $("input[name='channeltelllistall']").prop("checked", false);
       $("input[name='channeltelllistall']").prop("indeterminate", false);
       $('.channel_tell_logo').next().val('');
}

function cHAnneltelldowns(data) {
    ChannelDowntellArray = [];
    // console.log('会话下载'+data);
    // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + data, 'UTF-8'), 'UTF-8');
    var Telltotal = '';
    $('.channel_tell_logo').next().val('');
    $("input[name='channeltelllistall']").prop("checked", false);
    $('.channeltellltotal').text('0');
     $('.chtellinputall').removeClass('userall_selected');
    $('.channel_tellmain').empty();
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
      $('.channel_tellmain').append(loading);
    $.getJSON('' + STATION_URL + '?Body=' + data + '',
            function(ret) {
            var obj=ret;
            if (obj.Result == 200) {
                Telltotal = obj.PageTotalCount;
                channeltellcorde_down=obj.Messages;
                console.log(JSON.stringify(obj));
                if (obj.Messages.length == 0) {
                    $('.channel_tellmain ').empty();
                    $('.channel_tellmain ').append('<h3 class="help_wu">暂无数据</h3>');
                    channeltellnum=0;
                    channeltellnums=channeltellnum;
                    return;
                }
                for (var i = 0; i < obj.Messages.length; i++) {
                    if (obj.Messages[i].ResType == 1) {
                        ChannelDowntellArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 2) {
                        ChannelDowntellArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 4) {
                        ChannelDowntellArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 5) {
                        ChannelDowntellArray.push(obj.Messages[i]);
                    }
                }
                   CHanneltelldownshow(ChannelDowntellArray, Telltotal, data);
            } else {
                $('.channel_tellmain').empty();
                $('.channel_tellmain').append('<h3 class="help_wu">获取数据失败</h3>')
            }
        })
}

function CHanneltelldownshow(array, total, data) {
    var times1 = '';
    // alert(JSON.stringify(array));
    $('.channel_tellmain').empty();
    if (array.length == 0) {
        $('.channel_tellmain').append('<h3 class="help_wu">暂无数据</h3>');
        return;
    }
    for (var i = 0; i < array.length; i++) {
        var time = array[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_tell_data"><div>' + time1 + '</div><ul id="T' + time1 + '"></ul></div>';
            $('.channel_tellmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
        if (array[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (array[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="1" username="' + array[i].Name + '" reportId="' + array[i].Id +'" time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="2" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="4" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="5" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">'+time2 +'</span></p><span></span></div></li>';
        }
        $('#T' + time1 + '').append(html1);
    }
    /******完毕**********/
     channeltellnum =channeltellcorde_down.length;
     channeltellnums=channeltellnum;
     $('.channeltellltotal').text('0');
     // $("input[name='channeltelllistall']").prop("checked", false);
    
      channelnumtnumchoose = 0;
      channeltellcorde_downmore[0]=data;
      channeltellcorde_downmore[1]=total;
     CHdowntellsocrl(channeltellcorde_downmore[0],channeltellcorde_downmore[1]); //判断 data的属性  
}

 
function CHdowntellsocrl(data, total) {
    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    }
    var timestart = strToJson(data).Body.TimeFrom;
    var timeover = strToJson(data).Body.TimeTo;
    var channel_id = strToJson(data).Body.SesId;
    var index = strToJson(data).Body.PageIndex;
    var type = strToJson(data).Body.ResTypes;
    var indexshow = '';
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
    // var Channelmore = '<div class="ChannelMoredown" onclick="ChannelnextPage(\'' + channel_id + '\',\'' + timestart + '\',\'' + timeover + '\',\'' + index + '\',\'' + total + '\',\'' + type + '\')">点击加载更多</div>';
    var Channeltellmore = '<div class="ChanneltellMoredown" onclick="ChanneltellnextPage(\'' + channel_id + '\',\'' + timestart + '\',\'' + timeover + '\',\'' + index + '\',\'' + total + '\',\'' + type + '\')">向下滑动加载更多</div>';
    $('.channel_tellmain').append(Channeltellmore);
}

function ChanneltellnextPage(val1, val2, val3, val4, val5, val6) {
	
    var indexs = strToNum(val4);
    if (indexs == -1) {
        indexs = strToNum(val5) - 1;
    }
    // if (indexs == val5 - 1) {
    //     common._coverShow("已经是最后一页!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    //     return;
    // }
    var next = indexs + 1;
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + val2 + '","TimeTo":"' + val3 + '","SesId":"' + val1 + '","ResTypes":"' + val6 + '","PageSize":20,"PageIndex":' + next + '}}';
    cHAnneltellnextdowns(body);
}

function cHAnneltellnextdowns(data) {

    // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + data, 'UTF-8'), 'UTF-8');
     var totaltell = '';
     // ChannelDowntellArrays=[];
     $('.ChanneltellMoredown').empty();
     var Innum=$('.channeltellltotal').text();
     // if(Innum!=0){
     //    $("input[name='channeltelllistall']").prop("indeterminate", true);
     // }
     $('.ChanneltellMoredown').append('<img src="img/loading.gif" alt="" />');
    $.getJSON('' + STATION_URL + '?Body=' + data + '',
            function(ret) {  
            var obj=ret;      
            if (obj.Result == 200) {
                $('.ChanneltellMoredown').remove();
                totaltell = obj.PageTotalCount;
               
                if (obj.Messages.length == 0) {
                	channel_tellall2_onoff = true;
                    // $('.channel_tellmain ').append('<h3 class="help_wu">暂无数据</h3>');
                    showAlert('已经是最后一页！');
                    return;
                }
                var  channeltellArrays=obj.Messages;
                    channeltellcorde_down=channeltellcorde_down.concat(channeltellArrays);
                ChannelDowntellArrays.length = 0;
                for (var i = 0; i < obj.Messages.length; i++) {
                    if (obj.Messages[i].ResType == 1) {
                        ChannelDowntellArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 2) {
                        ChannelDowntellArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 4) {
                        ChannelDowntellArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 5) {
                        ChannelDowntellArrays.push(obj.Messages[i]);
                    }
                }
                $('.chtellinputall').removeClass('userall_selected');
              
                CHanneltelldownshows(ChannelDowntellArrays, totaltell, data);
                channel_tellall2_onoff = true;
            }else{
                // alert(obj.Result);
                $('.channel_tellmain').empty();
                $('.channel_tellmain').append('<h3 class="help_wu">暂无数据</h3>');
           		channel_tellall2_onoff = true;
            }
            
        })
}

function CHanneltelldownshows(array, total, data) {
    var times1;
    var timeID = array[0].Time.split(" ");
    var timeIDs = timeID[0];
    if ($('#T' + timeIDs + '').length > 0) {
        times1 = timeIDs;
    } else {
        times1 = '';
    }
    for (var i = 0; i < array.length; i++) {
        var time = array[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1]; //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_tell_data"><div>' + time1 + '</div><ul id="T' + time1 + '"></ul></div>';
            $('.channel_tellmain ').append(htmls);
            times1 = time1;
        }


           var html1 = '';
        if (array[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (array[i].ResType == 1) { //图片
            html1 += '<li class="fix" time="'+array[i].Time+'" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="1" username="' + array[i].Name + '" reportId="' + array[i].Id + '"><div class="channel_tell_datal fl "><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 2) { //视频
            html1 += '<li class="fix" time="'+array[i].Time+'" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="2" username="' + array[i].Name + '" reportId="' + array[i].Id + '"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 4) { //录音
            html1 += '<li class="fix" time="'+array[i].Time+'" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="4" username="' + array[i].Name + '" reportId="' + array[i].Id + '"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" time="'+array[i].Time+'"  url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="5" username="' + array[i].Name + '" reportId="' + array[i].Id + '"><div class="channel_tell_datal fl "><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_tell_datar "><p><span>' + array[i].Name + '</span><span class="fr">'+time2 +'</span></p><span></span></div></li>';
        }
        $('#T' + time1 + '').append(html1);
    }
    /******完毕**********/
      channeltellnum=channeltellcorde_down.length;
      channeltellnums=channeltellnum;
     // channeltellnum =channeltellcorde_down.length;
     // $('.channeltellltotal').text('0');
     // $("input[name='channeltelllistall']").prop("checked", false);
      // channelnumtnumchoose = 0;
      channeltellcorde_downmore[0]=data;
      channeltellcorde_downmore[1]=total;
      if(array.length==20){
         //会话
         ChannelDowntellArrayslength=true; 
        CHdowntellsocrl(channeltellcorde_downmore[0], channeltellcorde_downmore[1]); //判断 data的属性 
      }else{
        ChannelDowntellArrayslength=false; 
      }
}
function CHanneltellDown(data){
      var channelurl = [];
    $('.channel_tellmain  input[type=checkbox]').each(function() {
        if ($(this).is(':checked')) {
            var url = $(this).parent().parent().parent().attr('url');
            var type = $(this).parent().parent().parent().attr('types');
            var user_id = $(this).parent().parent().parent().attr('user_id');
            var repId = $(this).parent().parent().parent().attr('reportid');
            var time=$(this).parent().parent().parent().attr('time');
            var baseurl=toBase64(url);
            var numss = [];
            numss[0] = baseurl;
            numss[1] = type;
            numss[2] = user_id;
            numss[3] = repId;
            numss[4] = 0;
            numss[5]=time;
            channelurl.push(numss);
        }
    })
    Codechanneltell(channelurl)
}
function Codechanneltell (data){
    // url  type  user_id  repId  
    var channelArray = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] == 1) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 2) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 4) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 5) {
            channelArray.push(data[i]);
        }
    }
    CodechannelDowns(channelArray);       
}

/*****************/

function CHannel_10600(data) {
    var type = [1,2,4,5];
    var reg = /a/g;
    var cids = data.replace(reg, '');
    var date = new Date();
    var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    // var timestart=getTimefrom(1);
    var timestart = '2005-10-14 10:06:25';
    var timestarts = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
    $('#Channel_Timeval').val(timestarts);
    $('#Channel_Timevals').val(timestarts);
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + timestart + '","TimeTo":"' + timeover + '","SesId":"' + cids + '","ResTypes":"[' + type + ']","PageSize":20,"PageIndex":0}}';
    console.log('报文'+body);
    cHAnneldowns(body);
}

function cHAnneldowns(data) {
    ChannelDownArray = [];
    console.log(data);
    // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + data, 'UTF-8'), 'UTF-8');
    var total = '';
       DownnumChoose = 0;
    $('.channel_listen_logo').next().val('');
    // $("input[name='channellistall']").prop("checked", false);
    $('.channtlTotal').text('0');
    $('.channel_listen_downmain').empty();
    var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
    $('.channel_listen_downmain').append(loading);
    $.getJSON('' + STATION_URL + '?Body=' + data + '',
            function(ret) {
            var obj=ret;
            console.log('下载信息'+JSON.stringify(obj));
            if (obj.Result == 200) {
                total = obj.PageTotalCount;
                // console.log('获取数据总接口'+JSON.stringify(obj));
                // channelnum=obj.Messages.length;
                   channelcorde_down=obj.Messages;
                if (obj.Messages.length == 0) {
                    $('.channel_listen_downmain').empty();
                    $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
                    channelnum =0;
                    return;
                }
                for (var i = 0; i < obj.Messages.length; i++) {
                    if (obj.Messages[i].ResType == 1) {
                        ChannelDownArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 2) {
                        ChannelDownArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 4) {
                        ChannelDownArray.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 5) {
                        ChannelDownArray.push(obj.Messages[i]);
                    }
                }
                    CHanneldownshow(ChannelDownArray, total, data);
            } else {
                $('.channel_listen_downmain').empty();
                $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
                channelnum =0;
            }
        })
}

function CHanneldownshow(array, total, data) {
    var times1 = '';
    // console.log('搜索出来的数据'+JSON.stringify(array));
    $('.channel_listen_downmain').empty();
    if (array.length == 0) {
        $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
        channelnum =0;
        return;
    }
    for (var i = 0; i < array.length; i++) {
        var time = array[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_listen_data"><div>' + time1 + '</div><ul id="C' + time1 + '"></ul></div>';
            $('.channel_listen_downmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
         if (array[i].ResType == 1) { //图片
                html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="1" username="' + array[i].Name + '" reportId="' + array[i].Id + '" time="'+array[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id +'Ch"><label for="'+array[i].Id +'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_listen_datar"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="2" username="' + array[i].Name + '" reportId="' + array[i].Id + '" time="'+array[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id +'Ch"><label for="'+array[i].Id +'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_listen_datar"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="4" username="' + array[i].Name + '" reportId="' + array[i].Id + '" time="'+array[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id +'Ch"><label for="'+array[i].Id +'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_listen_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="5" username="' + array[i].Name + '" reportId="' + array[i].Id + '" time="'+array[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id +'Ch"><label for="'+array[i].Id +'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_listen_datar "><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        }
        $('#C' + time1 + '').append(html1);
    }
    /******完毕**********/
    channelnum=channelcorde_down.length;
    Downnumnull=channelnum;
    $('.channtlTotal').text('0');
    // $("input[name='channellistall']").prop("checked", false);
    $('.channel_Inputall').removeClass('userall_selected');
    // DownnumChoose = 0;
    channelcorde_downmore[0]=data;
    channelcorde_downmore[1]=total;
    if(array.length==20){
        ChannelDownArrayslength=true;
       CHdownsocrl(channelcorde_downmore[0], channelcorde_downmore[1]); //判断 data的属性
    }else{
        ChannelDownArrayslength=false;
    }
}
/******************/
function cHAnnelnextdowns(data) {
    console.log('加载数据'+JSON.stringify(data));
    var total = '';
    ChannelDownArrays = [];
     $('.ChannelMoredown').empty();
     var Innum=$('.channtlTotal').text();
     if(Innum!=0){
       $("input[name='channellistall']").prop("indeterminate", true);
     }
     $('.ChannelMoredown').append('<img src="img/loading.gif" alt="" />');
    $.getJSON('' + STATION_URL + '?Body=' + data + '',
            function(ret) {
            var obj=ret;
            if (obj.Result == 200) {
                console.log(JSON.stringify(obj));
                $('.ChannelMoredown').remove();
                total = obj.PageTotalCount;
                var  channelArray=obj.Messages;
                     channelcorde_down=channelcorde_down.concat(channelArray);
                if (obj.Messages.length == 0) {
                	channel_tellall2_onoff = true;
                    // $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
                    showAlert('已经是最后一页！');
                    return;
                }
                for (var i = 0; i < obj.Messages.length; i++) {
                    if (obj.Messages[i].ResType == 1) {
                        ChannelDownArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 2) {
                        ChannelDownArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 4) {
                        ChannelDownArrays.push(obj.Messages[i]);
                    } else if (obj.Messages[i].ResType == 5) {
                        ChannelDownArrays.push(obj.Messages[i]);
                    }
                }

                CHanneldownshows(ChannelDownArrays, total, data);
                channel_tellall2_onoff = true;
            } else {
                // alert(obj.Result);
                $('.channel_listen_downmain').empty();
                $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
            	channel_tellall2_onoff = true;
            }
        })
}

function CHanneldownshows(array, total, data) {
    var times1;
    var timeID = array[0].Time.split(" ");
    var timeIDs = timeID[0];
    if ($('#C' + timeIDs + '').length > 0) {
        times1 = timeIDs;
    } else {
        times1 = '';
    }
    for (var i = 0; i < array.length; i++) {
        var time = array[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1]; //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_listen_data"><div>' + time1 + '</div><ul id="C' + time1 + '"></ul></div>';
            $('.channel_listen_downmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
        if (array[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (array[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + array[i].ResUrl + '" username="' + array[i].Name + '" user_id="' + array[i].Uid + '" types="1" reportId="' + array[i].Id + '" time="'+array[i].Time +'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + array[i].ResUrl + '" username="' + array[i].Name + '" user_id="' + array[i].Uid + '" types="2" reportId="' + array[i].Id + '"  time="'+array[i].Time +'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '" username="' + array[i].Name + '" user_id="' + array[i].Uid + '" types="4" reportId="' + array[i].Id + '"  time="'+array[i].Time +'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '" username="' + array[i].Name + '" user_id="' + array[i].Uid + '" types="5" reportId="' + array[i].Id + '"  time="'+array[i].Time +'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + array[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        }
        $('#C' + time1 + '').append(html1);
    }
    $('.channel_Inputall').removeClass('userall_selected');
    channelnum =channelcorde_down.length;
    Downnumnull=channelnum;
     channelcorde_downmore[0]=data;
     channelcorde_downmore[1]=total;
     if(array.length==20){
        ChannelDownArrayslength=true;
        CHdownsocrl(channelcorde_downmore[0], channelcorde_downmore[1]);
     }else{
        ChannelDownArrayslength=false;
     }
}



function CHdownsocrl(data, total) {
    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    }

    var timestart = strToJson(data).Body.TimeFrom;
    var timeover = strToJson(data).Body.TimeTo;
    var channel_id = strToJson(data).Body.SesId;
    var index = strToJson(data).Body.PageIndex;
    var type = strToJson(data).Body.ResTypes;
    var indexshow = '';

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
    
    var Channelmore = '<div class="ChannelMoredown" onclick="ChannelnextPage(\'' + channel_id + '\',\'' + timestart + '\',\'' + timeover + '\',\'' + index + '\',\'' + total + '\',\'' + type + '\')">向下滑动加载更多</div>';
    $('.channel_listen_downmain').append(Channelmore);

}

function strToNum(str) {
    var num = Number(str);
    return num;
}

function ChannelPagehome(val1, val2, val3, val4, val5) {
    var indexs = strToNum(val4);
    if (indexs == 0) {
        common._coverShow("已经是首页!");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + val2 + '","TimeTo":"' + val3 + '","SesId":"' + val1 + '","PageSize":20,"PageIndex":0}}';
    cHAnneldowns(body);
}

function ChannelendPage(val1, val2, val3, val4, val5) {
    var indexs = strToNum(val4);
    var next = strToNum(val5);
    if (indexs == -1 || indexs == next) {
        common._coverShow("已经是尾页!");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + val2 + '","TimeTo":"' + val3 + '","SesId":"' + val1 + '","PageSize":20,"PageIndex":-1}}';
    cHAnneldowns(body);
}

function ChannelPageprev(val1, val2, val3, val4, val5) {
    var indexs = strToNum(val4);
    if (indexs == 0) {
        common._coverShow("已经是第一页!");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }
    if (indexs == -1) {
        indexs = strToNum(val5);
    }
    var prev = indexs - 1;
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + val2 + '","TimeTo":"' + val3 + '","SesId":"' + val1 + '","PageSize":20,"PageIndex":' + prev + '}}';
    cHAnneldowns(body);
}

function ChannelnextPage(val1, val2, val3, val4, val5, val6) {
    var indexs = strToNum(val4);
    if (indexs == -1) {
        indexs = strToNum(val5) - 1;
    }
    // if (indexs == val5 - 1) {
    //     common._coverShow("已经是最后一页!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    //     return;

    // }
    var next = indexs + 1;
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + val2 + '","TimeTo":"' + val3 + '","SesId":"' + val1 + '","ResTypes":"' + val6 + '","PageSize":20,"PageIndex":' + next + '}}';

    cHAnnelnextdowns(body);
}

function channel_hour(data) {
    var son = $(data).children('div');
    if (son.is(':hidden')) {
        $(data).parent().siblings().children('.channel_listentimevals').children('div').hide();
        $(data).parent().siblings().children('.channel_TimeOverhour').children('div').hide();
        son.show();
        $(son).find('li').each(function(i) {
            $(this).click(function() {
                var val = $(this).html();
                $(data).children('span').html(val);
            })
        })
    } else {
        son.hide();
    }
}

function ChanneldownSearch(data) {
    var date = new Date();
    var li = $('.channel_listentimes').children();
    var Csub;
    var Ctype;
    var type=[];
    var timeover;
    var timestart;
    var hang = '<br>';
    var ids = $('.channel_box2').attr('id');
    var reg = /a/g;
    var id = ids.replace(reg,'');
    var dataday = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    var timeto = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());

    /********类型选择*********/
    var channelTYPE=$('.channel_listentype').children().hasClass("channel_listentypecbg");
    if(channelTYPE){
        // $('.channel_listentype li').each(function(i) {
        // if ($(this).hasClass('channel_listentypecbg')) {
        //     Ctype = i;
        //     }
        // })
          if($('.channel_listentype').children().eq(0).hasClass("channel_listentypecbg")){
               type.push(4);
          } 
          if($('.channel_listentype').children().eq(1).hasClass("channel_listentypecbg")){
               type.push(5);
          } 
          if($('.channel_listentype').children().eq(2).hasClass("channel_listentypecbg")){
               type.push(1);
          } 
          if($('.channel_listentype').children().eq(3).hasClass("channel_listentypecbg")){
               type.push(2);
          } 
        // if (Ctype == 0) {
        //     type = 5;
        // } else if (Ctype == 1) {
        //     type = 1;
        // } else if (Ctype == 2) {
        //     type = 2;
        // } 
    }else{
        type=[1,2,4,5];
    }
   /*******时间选择*******/
    var channelTIME=$('.channel_listentimes').children().hasClass("channel_listentimesbg");
    if(channelTIME){ 
         
      $('.channel_listentimes li').each(function(i) {
         if ($(this).hasClass('channel_listentimesbg')) {
             Csub = i;
         }
        })
     if (Csub == 0) {
         // timestart = getTimefrom(1);
          timestart=date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate())+' 00:00:00';
     } else if (Csub == 1) {
         timestart = getTimefrom(7);
     } else if (Csub == 2) {
         timestart = getTimefrom(15);
     } else if (Csub == 3) {
        var one = $('#ChannelDetailed').html();
        var two = $('#ChannelDetaileds').html();
      var  timestarts = $('#Channel_Timeval').val() + ' ' + one + ':00';
      var  timetos = $('#Channel_Timevals').val() + ' ' + two + ':00';
          // timestart=strtoDate(timestarts);
          // timeto=strtoDate(timetos);
        if (timestarts > timetos) {
            common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
            setTimeout(function() {
                common._coverHide();
            }, 3000);
            return;
        }
        // if (timetos >dataday) {
        //     common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
        //     setTimeout(function() { 
        //         common._coverHide();
        //     }, 3000);
        //     return;
        // }
        timestart=$('#Channel_Timeval').val() + ' ' + one + ':00';
        timeto= $('#Channel_Timevals').val() + ' ' + two + ':00';
        GetChannelsBody();
        return;
    }
      }else{
        /****全部时间***/
         timestart ='2005-10-10 15:36:09';
         timeto = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
     }
   /*********************/
    if (timestart > timeto) {
        common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
        setTimeout(function() {
            common._coverHide();
        }, 3000);
        return;
    }
    // if (timeto > dataday) {
    //     common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 3000);
    //     return;
    // }
    function GetChannelsBody() {
        var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"'+timestart+'","TimeTo":"' + timeto + '","SesId":"' + id + '","ResTypes":"[' + type + ']","PageSize":20,"PageIndex":0}}';
        console.log('频道下载'+body+'');
        cHAnneldowns(body);
        $('.channel_listen_filter').slideUp('slow');
        $('.channel_listen_logos ').css('background-image', "url(img/icon/channel/channel_search1.png)");
        $('.channel_listens2').height($(window).height() - 354);
    }
    GetChannelsBody();
}


/****************************************/
function channeltellAllist(data) {
    // var channeltellnums = channeltellnum;

    if ($(data).hasClass('userall_selected')) {
         $(data).removeClass('userall_selected');
        $("input[name='channeltell']").prop("checked", false);
        channelnumtnumchoose = 0;
        channeltellnums = channeltellnum;
        $('.channel_tell_downfooter button').attr('disabled','disabled');
        $('.channel_tell_downfooter button').removeClass('HelpReads');
        
    }else{   
        $(data).addClass('userall_selected');
        $("input[name='channeltell']").prop("checked", true);
        channelnumtnumchoose = channeltellnum;
        channeltellnums = 0;
        $('.channel_tell_downfooter button').removeAttr('disabled','disabled');
        $('.channel_tell_downfooter button').addClass('HelpReads');
    }
    $('.channeltellltotal').text(channelnumtnumchoose);
}
 function strtoDate(data){
        var str = data.toString();
            str = str.replace("/-/g", "/");
        var oDate1 = new Date(str);
        return oDate1;
  }
 
        var Datetostr = function(t, format){
        var tf = function(i){return (i < 10 ? '0' : '') + i};
         return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
                case 'yyyy':
                return tf(t.getFullYear());
                break;
                case 'MM':
                return tf(t.getMonth() + 1);
                break;
                case 'mm':
                return tf(t.getMinutes());
                break;
                case 'dd':
                return tf(t.getDate());
                break;
                case 'HH':
                return tf(t.getHours());
                break;
                case 'ss':
                return tf(t.getSeconds());
                break;
              }
            })
    }

 

function Channeltellinput(obj) {
     //总数 channeltellnum
    // var channeltellnums = channelstellnum;
    if ($(obj).is(':checked')) {
        channelnumtnumchoose += 1; //选中人数
        channeltellnums -= 1; //没有选中剩余人数
    } else {
        channelnumtnumchoose -= 1;
        channeltellnums += 1;
    }
//     var channelnum;
// var DownnumChoose = 0;
// var channeltellnum;
// var channelnumtnumchoose=0; 
    $('.channeltellltotal').text(channelnumtnumchoose);
    // if(DownnumChoose==0){
    //    $('.mediadownshow').attr('disabled','true');
    // }else{
    //    $('.mediadownshow').removeAttr('disabled');
    // }

    if (channeltellnums == 0) {
        // $("input[name='channeltelllistall']").prop("checked", true);
        // $("input[name='channeltelllistall']").prop("indeterminate", false);
        $('.chtellinputall').addClass('userall_selected');
        $('.channel_tell_downfooter button').removeAttr('disabled');
        $('.channel_tell_downfooter button').addClass('HelpReads');
    } else if (channelnumtnumchoose == 0) {
        // $("input[name='channeltelllistall']").prop("checked", false);
        // $("input[name='channeltelllistall']").prop("indeterminate", false);
        $('.chtellinputall').removeClass('userall_selected');
        $('.channel_tell_downfooter button').attr('disabled','disabled');
        $('.channel_tell_downfooter button').removeClass('HelpReads');
    } else {
        // $("input[name='channeltelllistall']").prop("indeterminate", true);
        $('.chtellinputall').removeClass('userall_selected');
        $('.channel_tell_downfooter button').removeAttr('disabled');
        $('.channel_tell_downfooter button').addClass('HelpReads');
    }
}


function Channelinput(obj) {
    // var Downnumnull = channelnum;
    if ($(obj).is(':checked')) {
        DownnumChoose += 1; //选中人数
        Downnumnull -= 1; //没有选中剩余人数
    } else {
        DownnumChoose -= 1;
        Downnumnull += 1;
    }
    $('.channtlTotal').text(DownnumChoose);
    // if(DownnumChoose==0){
    //    $('.mediadownshow').attr('disabled','true');
    // }else{
    //    $('.mediadownshow').removeAttr('disabled');
    // }

    if (Downnumnull == 0) {
        // $("input[name='channellistall']").prop("checked", true);
        // $("input[name='channellistall']").prop("indeterminate", false);
        $('.channel_Inputall').addClass('userall_selected');
        $('.channel_listen_downfooter button').removeAttr('disabled');
        $('.channel_listen_downfooter button').addClass('HelpReads');
    } else if (DownnumChoose == 0) {
        // $("input[name='channellistall']").prop("checked", false);
        // $("input[name='channellistall']").prop("indeterminate", false);
        $('.channel_Inputall').removeClass('userall_selected');
        $('.channel_listen_downfooter button').attr('disabled','disabled');
        $('.channel_listen_downfooter button').removeClass('HelpReads');
    } else {
        // $("input[name='channellistall']").prop("indeterminate", true);
        $('.channel_Inputall').removeClass('userall_selected');
        $('.channel_listen_downfooter button').removeAttr('disabled');
        $('.channel_listen_downfooter button').addClass('HelpReads');
    }
}
/*********全选***********/
function channelAllist(data) {
    // var Downnumnull = channelnum;
    if ($(data).hasClass('userall_selected')) {
        $(data).removeClass('userall_selected');
        $("input[name='channel']").prop("checked", false);
        DownnumChoose = 0;
        Downnumnull = channelnum;
        $('.channel_listen_downfooter button').attr('disabled','disabled');
        $('.channel_listen_downfooter button').removeClass('HelpReads');
    }else{
        $(data).addClass('userall_selected');
        $("input[name='channel']").prop("checked", true);
        DownnumChoose = channelnum;
        Downnumnull = 0;
        $('.channel_listen_downfooter button').removeAttr('disabled');
        $('.channel_listen_downfooter button').addClass('HelpReads');
    }
    $('.channtlTotal').text(DownnumChoose);
}

function CHANNELDOWN() {
    var channelurl = [];
    $('.channel_listen_downmain   input[type=checkbox]').each(function() {
        if ($(this).is(':checked')) {
            var url = $(this).parent().parent().parent().attr('url');
            var type = $(this).parent().parent().parent().attr('types');
            var user_id = $(this).parent().parent().parent().attr('user_id');
            var repId = $(this).parent().parent().parent().attr('reportid');
            var time = $(this).parent().parent().parent().attr('time');
            var numss = [];
            var urlbase=toBase64(url);
            numss[0] = urlbase;
            numss[1] = type;
            numss[2] = user_id;
            numss[3] = repId;
            numss[4] = 0;
            numss[5]=time;
            channelurl.push(numss);
        }
    })
    CodechannelDowns(channelurl);
}

function CodechannelDown(data) {
    // url  type  user_id  repId  
    var channelArray = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] == 1) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 2) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 4) {
            channelArray.push(data[i]);
        } else if (data[i][1] == 5) {
            channelArray.push(data[i]);
        }
    }
    CodechannelDowns(channelArray);
}

function CodechannelDowns(data) {
    var datas = [];
    // var date=new Date();
    // var dataday=date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    //10404 下载
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] == 1) {
            datas[i] = '{"Url":"' + data[i][0] + '","ResType":0,"Uid":"' + data[i][2] + '","ReportIds":"' + data[i][3] + '","ResCount":"0","ResourceTime":"'+data[i][5]+'"}';
        } else if (data[i][1] == 2) {
            datas[i] = '{"Url":"' + data[i][0] + '","ResType":1,"Uid":"' + data[i][2] + '","ReportIds":"' + data[i][3] + '","ResCount":"0","ResourceTime":"'+data[i][5]+'"}';
        } else if (data[i][1] == 4) {
            datas[i] = '{"Url":"' + data[i][0] + '","ResType":2,"Uid":"' + data[i][2] + '","ReportIds":"' + data[i][3] + '","ResCount":"0","ResourceTime":"'+data[i][5]+'"}';
        } else if (data[i][1] == 5) {
            datas[i] = '{"Url":"' + data[i][0] + '","ResType":2,"Uid":"' + data[i][2] + '","ReportIds":"' + data[i][3] + '","ResCount":"0","ResourceTime":"'+data[i][5]+'"}';
        }
    }
    if (data.length == 0) {
        common._coverShow("请选择资源!");
        setTimeout(function() {
            common._coverHide();
        }, 2000);
        return;
    }
    var body  = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[' + datas + ']}}';
    console.log('正常字符串'+body);
       // $('.cover_loading').show();
        var arr=[];
       var conword='下载失败！';
       var timeto=datas.length*60000;
       AjaxPostMsgDown(body, timeto, MediaSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
      // $.ajax({
      //     type: "post",
      //     url:'http://112.33.9.251:4489/station/mobile/serverapi.action',
      //     data:body,
      //     contentType:'application/json;charset=utf-8',

      //     dataType:'json',
      //     success: function(data) {
      //        console.log(JSON.stringify(data));
      //        GetDownZip(data);
      //     },
      //     error:function(data){
      //       console.log(JSON.stringify(data));
      //         showAlert('下载失败！');
      //         // console.log('失败'+JSON.stringify(data));
      //         $('.cover_loading').hide();
      //        return;
      //     }
      //   });
}

function GetDownZip(data){
     $('.cover_loading').hide();
     console.log(JSON.stringify(data));
     if(data.Result==200){
       var address = data.URL;
           var address1 = '';
           savepics(address)
           // savepic();
           // function savepic() {
           //   if (document.all.a1 == null) {
           //     objIframe = document.createElement("IFRAME");
           //     document.body.insertBefore(objIframe);
           //     objIframe.outerHTML = "<iframe   name='a1'   style='display:none'   src=" + address + "></iframe>";
           //     re = setTimeout("savepic()", 1)
           //   }else{
           //     clearTimeout(re);
           //     address1 = window.open(address, "a1");
           //     address1.document.execCommand("SaveAs");
           //     document.all.a1.removeNode(true);
           //   }
           // } 
     }else{
       showAlert('下载失败！');
     }
}

function ChannelUserSea(data, val2) {
    var val = '';
    if (val2 != undefined) {
        val = '';
    } else {
        val = $(data).val();
    }
    if (val == '') {
        $('#ChannelAdduser').hide();
        $('#channerAddtree').show();
    } else {
        $('#channerAddtree').hide();
        $('#ChannelAdduser').show();
        var len = $('#ChannelAdduser').children('li').length;
        for (var i = 0; i < len; i++) {
            if ($('#ChannelAdduser').children('li').eq(i).attr('name').indexOf(val) > -1||$('#ChannelAdduser').children('li').eq(i).attr('user').indexOf(val) > -1) {
                $('#ChannelAdduser').children('li').eq(i).show();
            } else {
                $('#ChannelAdduser').children('li').eq(i).hide();
            }
        }
    }
}

function ChannelTellUserSea(data, val2) {

    var val = '';
    if (val2 != undefined) {
        val = '';
    } else {
        val = $(data).val();
    }
    if (val == '') {
        $('#ChannelTellAdduser').hide();
        $('#channeltellAddtree').show();
    } else {
        $('#channeltellAddtree').hide();
        $('#ChannelTellAdduser').show();
        var len = $('#ChannelTellAdduser').children('li').length;
        for (var i = 0; i < len; i++) {
            if ($('#ChannelTellAdduser').children('li').eq(i).attr('name').indexOf(val) > -1||$('#ChannelTellAdduser').children('li').eq(i).attr('user').indexOf(val) > -1) {
                $('#ChannelTellAdduser').children('li').eq(i).show();
            } else {
                $('#ChannelTellAdduser').children('li').eq(i).hide();
            }
        }

    }
}

function CHannelIMbtnfint(){
    $('.channtlTotal').html(0);
    $('.channel_Inputall').removeClass('userall_selected');
    $('.channel_listen_downfooter').find('button').removeClass('HelpReads');
    $('.channel_listen_downfooter').find('button').attr('disabled','disabled');
}

function CHdown(data) {
         DownnumChoose = 0;
        CHannelIMbtnfint();

        var vals=$("input[name='"+data+"']").val();
        if(vals.length==0){
          CHchannelserach();
        }else{
           CHchannelserachval(vals); 
        }
}
function CHchannelserach(){
     var times1 = '';
    $('.channel_listen_downmain').empty();
    if (channelcorde_down.length == 0) {
        $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
        channelnum =0;
        return;
    }
    for (var i = 0; i < channelcorde_down.length; i++) {
        var time = channelcorde_down[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_listen_data"><div>' + time1 + '</div><ul id="C' + time1 + '"></ul></div>';
            $('.channel_listen_downmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
        if (channelcorde_down[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (channelcorde_down[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + channelcorde_down[i].ResUrl + '"  user_id="' + channelcorde_down[i].Uid + '" types="1" username="' + channelcorde_down[i].Name + '" reportId="' + channelcorde_down[i].Id + '" time="'+channelcorde_down[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + channelcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channelcorde_down[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + channelcorde_down[i].ResUrl + '"  user_id="' + channelcorde_down[i].Uid + '" types="2" username="' + channelcorde_down[i].Name + '" reportId="' + channelcorde_down[i].Id + '" time="'+channelcorde_down[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + channelcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channelcorde_down[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (channelcorde_down[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + channelcorde_down[i].ResUrl + '"  user_id="' + channelcorde_down[i].Uid + '" types="4" username="' + channelcorde_down[i].Name + '" reportId="' + channelcorde_down[i].Id + '" time="'+channelcorde_down[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + channelcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channelcorde_down[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + channelcorde_down[i].ResUrl + '"  user_id="' + channelcorde_down[i].Uid + '" types="5" username="' + channelcorde_down[i].Name + '" reportId="' + channelcorde_down[i].Id + '" time="'+channelcorde_down[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + channelcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        }
        $('#C' + time1 + '').append(html1);
    }

     channelnum=channelcorde_down.length;
     Downnumnull=channelnum;
     DownnumChoose = 0;
    $('.channtlTotal').text('0');
    $("input[name='channellistall']").prop("checked", false);
    if(ChannelDownArrayslength){
        CHdownsocrl(channelcorde_downmore[0], channelcorde_downmore[1]);
    }
}

function CHchannelserachval(data){
      var ChannelsArrs =[];
     ChannelsArrs = CHannelListfor(data);
     CHannelArrHtml(ChannelsArrs);
}
 function CHannelListfor(data) {
        if(channelcorde_down.length==0){
            var lis=$('.channel_listen_downs  .channel_listens2').has('.help_wu').length;
            if(lis==1){
                // showAlert('没有数据,请重新选择!');
                 // $('#CHannelDOwnInput').val('');
                 $('.channel_listen_downmain').empty().append('<h3 class="help_wu">无相关记录</h3>');
               return;
            }else{
                 showAlert('数据还未加载完成,请稍后重新筛选!');
               $('#CHannelDOwnInput').val('');
               return;
           } 
        }
     var MediaListArr = [];
     for (var i = 0; i < channelcorde_down.length; i++) {
       var user_id = channelcorde_down[i].Uid;
       var user_name = channelcorde_down[i].Name;
       if ((user_id.indexOf(data) > -1) || (user_name.indexOf(data) > -1)) {
           MediaListArr.push(channelcorde_down[i]);
       }
     }
     return MediaListArr;
   }

 function CHannelArrHtml(data){
        var times1 = '';
        var searchVal=$('#CHannelDOwnInput').val();
    $('.channel_listen_downmain').empty();
    if( data==undefined){
         $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
        channelnum =0;
        return;
    }
    if (data.length == 0 ) {
        $('.channel_listen_downmain').append('<h3 class="help_wu">暂无数据</h3>');
        channelnum =0;
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var time = data[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_listen_data"><div>' + time1 + '</div><ul id="C' + time1 + '"></ul></div>';
            $('.channel_listen_downmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
        var UserName=data[i].Name;
        var getIndexOf=data[i].Name.indexOf(searchVal);
        if(getIndexOf>-1){
            UserName=UserName.replace(new RegExp("(" +searchVal + ")","ig"), "<strong>" + searchVal + "</strong>");
 
        }

        if (data[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (data[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + data[i].ResUrl + '"  user_id="' + data[i].Uid + '" types="1" username="' + data[i].Name + '" reportId="' + data[i].Id + '" time="'+data[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (data[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + data[i].ResUrl + '"  user_id="' + data[i].Uid + '" types="2" username="' + data[i].Name + '" reportId="' + data[i].Id + '" time="'+data[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (data[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (data[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + data[i].ResUrl + '"  user_id="' + data[i].Uid + '" types="4" username="' + data[i].Name + '" reportId="' + data[i].Id + '" time="'+data[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (data[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + data[i].ResUrl + '"  user_id="' + data[i].Uid + '" types="5" username="' + data[i].Name + '" reportId="' + data[i].Id + '" time="'+data[i].Time+'"><div class="channel_listen_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channelinput(this)" name="channel" id="'+channelcorde_down[i].Id +'Ch"><label for="'+channelcorde_down[i].Id +'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_listen_datar fl"><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        }
        $('#C' + time1 + '').append(html1);
    }

     channelnum=data.length;
     Downnumnull=channelnum;
     DownnumChoose = 0;
    $('.channtlTotal').text('0');
    $("input[name='channellistall']").prop("checked", false);

 }  

 function CHtellIMbtnfint(){
    $('.channeltellltotal').html(0);
    $('.chtellinputall ').removeClass('userall_selected');
    $('.channel_tell_downfooter').find('button').removeClass('HelpReads');
    $('.channel_tell_downfooter').find('button').attr('disabled','disabled');
 }

function CHannelTells(data){
     // var vals=$(data).val();
     var vals=$("input[name='"+data+"']").val();
        channelnumtnumchoose = 0;
        CHtellIMbtnfint();
        // $('input[name=channeltelllistall]').attr('disabled', false);
        // $("input[name='channeltelllistall']").prop("checked", false);
        // $("input[name='channeltelllistall']").prop("indeterminate", false);
        // $("input[name='channeltell']").prop("checked", false);
      if(vals.length==0){
         TellchannelAlldown();
      }else{
         Tellchannelvaldown(vals);
      }  
}

function Tellchannelvaldown(data){
    if(channeltellcorde_down.length==0){
        var lis=$('.channel_tellmain').has('.help_wu').length;
        if(lis==1){
             // showAlert('没有数据,请重新选择!');
             // $('#ChTelldownINput').val('');
             $('.channel_tellmain').empty().append('<h3 class="help_wu">无相关记录</h3>');
           return;
        }else{
           showAlert('数据还未加载完成,请稍后重新筛选!');
           $('#ChTelldownINput').val('');
           return;
        } 
         // showAlert('数据还未加载完成,请稍后重新筛选!');
         // $('#ChTelldownINput').val('');
         // return;
    }
     var TelldownArrs =[];
     TelldownArrs = TellListfor(data);
     TellArrHtml(TelldownArrs);
}

function TellListfor(data){
       var MediaListArr = [];
     for (var i = 0; i < channeltellcorde_down.length; i++) {
       var user_id = channeltellcorde_down[i].Uid;
       var user_name = channeltellcorde_down[i].Name;
       if ((user_id.indexOf(data) > -1) || (user_name.indexOf(data) > -1)) {
         MediaListArr.push(channeltellcorde_down[i]);
       }
     }
     return MediaListArr;
}
function TellArrHtml(data) {
        var times1 = '';
        var array=data;
        var searchVal=$('#ChTelldownINput').val();
    $('.channel_tellmain').empty();
    if (array.length == 0) {
        channeltellnum=0;
        channeltellnums=channeltellnum;
        channelnumtnumchoose=0;
        $('.channel_tellmain').append('<h3 class="help_wu">暂无数据</h3>');
        return;
    }
    for (var i = 0; i < array.length; i++) {
        var time = array[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_tell_data"><div>' + time1 + '</div><ul id="T' + time1 + '"></ul></div>';
            $('.channel_tellmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';

        var UserName=array[i].Name;
        var getIndexOf=array[i].Name.indexOf(searchVal);
        if(getIndexOf>-1){
            UserName=UserName.replace(new RegExp("(" +searchVal + ")","ig"), "<strong>" + searchVal + "</strong>");
 
        }

        if (array[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (array[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="1" username="' + array[i].Name + '" reportId="' + array[i].Id +'" time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_tell_datar "><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="2" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_tell_datar "><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="4" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_tell_datar "><p><span>' + UserName + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (array[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + array[i].ResUrl + '"  user_id="' + array[i].Uid + '" types="5" username="' + array[i].Name + '" reportId="' + array[i].Id + '"  time="'+array[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+array[i].Id+'Ch"><label for="'+array[i].Id+'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_tell_datar "><p><span>' + UserName + '</span><span class="fr">'+time2 +'</span></p><span></span></div></li>';
        }
        $('#T' + time1 + '').append(html1);
    }
    channeltellnum=array.length;
    channeltellnums=channeltellnum;
    channelnumtnumchoose=0;
}



function TellchannelAlldown() {
      var times1 = '';
    // alert(JSON.stringify(array));
    $('.channel_tellmain').empty();
    if (channeltellcorde_down.length == 0) {
         channeltellnum =0;
         channeltellnums=channeltellnum;
         channelnumtnumchoose=0;
        $('.channel_tellmain').append('<h3 class="help_wu">暂无数据</h3>');
        return;
    }
    for (var i = 0; i < channeltellcorde_down.length; i++) {
        var time = channeltellcorde_down[i].Time.split(" ");
        var time1 = time[0]; //年
        var time2 = time[1].slice(0,5); //时间
        if (time1 != times1) {
            var htmls = '';
            htmls += '<div class="channel_tell_data"><div>' + time1 + '</div><ul id="T' + time1 + '"></ul></div>';
            $('.channel_tellmain').append(htmls);
            times1 = time1;
        }
        var html1 = '';
        if (channeltellcorde_down[i].ResType == 0) { //文本
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="0" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="channel"><img src="img/icon/newicon/text.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span></span></div></li>';
        } else if (channeltellcorde_down[i].ResType == 1) { //图片
            html1 += '<li class="fix" url="' + channeltellcorde_down[i].ResUrl + '"  user_id="' + channeltellcorde_down[i].Uid + '" types="1" username="' + channeltellcorde_down[i].Name + '" reportId="' + channeltellcorde_down[i].Id +'" time="'+channeltellcorde_down[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+channeltellcorde_down[i].Id+'Ch"><label for="'+channeltellcorde_down[i].Id+'Ch"></label></span><img src="img/icon/newicon/msg.png" alt=""></div><div class="channel_tell_datar "><p><span>' + channeltellcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channeltellcorde_down[i].ResType == 2) { //视频
            html1 += '<li class="fix" url="' + channeltellcorde_down[i].ResUrl + '"  user_id="' + channeltellcorde_down[i].Uid + '" types="2" username="' + channeltellcorde_down[i].Name + '" reportId="' + channeltellcorde_down[i].Id + '"  time="'+channeltellcorde_down[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+channeltellcorde_down[i].Id+'Ch"><label for="'+channeltellcorde_down[i].Id+'Ch"></label></span><img src="img/icon/newicon/cvideo.png" alt=""></div><div class="channel_tell_datar "><p><span>' + channeltellcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channeltellcorde_down[i].ResType == 3) { //位置
            // html1+='<li class="fix" url="'+obj.Messages[i].Url+'"  user_id="'+obj.Messages[i].Uid+'" type="3" reportId="'+obj.Messages[i].Id+'"><div class="channel_listen_datal fl"><input type="checkbox" onclick="Channelinput(this)" name="cHAnneldowns"><img src="img/icon/channel/localhostion.png" alt=""></div><div class="channel_listen_datar fl"><p><span>'+obj.Messages[i].Name+'</span><span class="fr">'+time2+'</span></p><span> </span></div></li>';
        } else if (channeltellcorde_down[i].ResType == 4) { //录音
            html1 += '<li class="fix" url="' + channeltellcorde_down[i].ResUrl + '"  user_id="' + channeltellcorde_down[i].Uid + '" types="4" username="' + channeltellcorde_down[i].Name + '" reportId="' + channeltellcorde_down[i].Id + '"  time="'+channeltellcorde_down[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+channeltellcorde_down[i].Id+'Ch"><label for="'+channeltellcorde_down[i].Id+'Ch"></label></span><img src="img/icon/newicon/msgs.png" alt=""></div><div class="channel_tell_datar "><p><span>' + channeltellcorde_down[i].Name + '</span><span class="fr">' + time2 + '</span></p><span> </span></div></li>';
        } else if (channeltellcorde_down[i].ResType == 5) { //ppt录音
            html1 += '<li class="fix" url="' + channeltellcorde_down[i].ResUrl + '"  user_id="' + channeltellcorde_down[i].Uid + '" types="5" username="' + channeltellcorde_down[i].Name + '" reportId="' + channeltellcorde_down[i].Id + '"  time="'+channeltellcorde_down[i].Time+'"><div class="channel_tell_datal fl"><span class="Channelbginput"><input type="checkbox" class="input_check HelpInput" onclick="Channeltellinput(this)" name="channeltell" id="'+channeltellcorde_down[i].Id+'Ch"><label for="'+channeltellcorde_down[i].Id+'Ch"></label></span><img src="img/icon/newicon/ppt.png" alt=""></div><div class="channel_tell_datar "><p><span>' + channeltellcorde_down[i].Name + '</span><span class="fr">'+time2 +'</span></p><span></span></div></li>';
        }
        $('#T' + time1 + '').append(html1);
    }
    /******完毕**********/
     channeltellnum =channeltellcorde_down.length;
     channeltellnums=channeltellnum;
     $('.channeltellltotal').text('0');
     $("input[name='channeltelllistall']").prop("checked", false);
      channelnumtnumchoose = 0;
      if(ChannelDowntellArrayslength){
        CHdowntellsocrl(channeltellcorde_downmore[0],channeltellcorde_downmore[1]); //判断 data的属性 
      }
}



function ChanneldowntellSearch(data) {
    var date = new Date();
    var li = $('.channel_telltimeselect').children();
    var Csub;
    var Ctype;
    var type=[];
    var timeover;
    var timestart;
    var hang = '<br>';
    var ids = $('.channel_tellall').attr('id');
    var reg = /a/g;
    var id = ids.replace(reg, '');
    var dataday = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    var timeto = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
    /******************类型选择******************/
    var channelTelltype=$('.channel_tell_filtertype').children().hasClass('channel_tell_typebg');
    if(channelTelltype){
       
        if($('.channel_tell_filtertype').children().eq(0).hasClass('channel_tell_typebg')){
              type.push(4);
        }
        if($('.channel_tell_filtertype').children().eq(1).hasClass('channel_tell_typebg')){
              type.push(5);
        }
        if($('.channel_tell_filtertype').children().eq(2).hasClass('channel_tell_typebg')){
             type.push(1);
        }
        if($('.channel_tell_filtertype').children().eq(3).hasClass('channel_tell_typebg')){
             type.push(2);
        }
    }else{
        type=[1,2,4,5];
    }
 /***************时间选择***************************/
var channelTelltype=$('.channel_telltimeselect').children().hasClass('channel_tell_typebg');
    if(channelTelltype){
          $('.channel_telltimeselect li').each(function(i) {
             if ($(this).hasClass('channel_tell_typebg')) {
                  Csub = i;
                 }
             })
            if (Csub == 0) {
                // timestart = getTimefrom(1);
                   timestart= date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate())+' 00:00:00';
            } else if (Csub == 1) {
                timestart = getTimefrom(7);
            } else if (Csub == 2) {
                timestart = getTimefrom(15);
            } else if (Csub == 3) {
                var one = $('#channel_TimeStarthours').html();
                var two = $('#channel_TimeOverhours').html();
                var timestarts = $('#channel_TimeStartdate').val() + ' ' + one + ':00';
                var timetos = $('#channel_TimeOverdate').val() + ' ' + two + ':00';
                    // timestart=strtoDate(timestarts);
                    // timeto=strtoDate(timetos);
                     if (timestarts > timetos) {
                        common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
                        setTimeout(function() {
                            common._coverHide();
                        }, 3000);
                        return;
                       }
                    // if (timetos > dataday) { 
                    //     common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
                    //     setTimeout(function() {
                    //         common._coverHide();
                    //     }, 3000);
                    //     return;
                    // }
                    timestart=$('#channel_TimeStartdate').val() + ' ' + one + ':00';
                    timeto=$('#channel_TimeOverdate').val() + ' ' + two + ':00';
                    GetChannelsBody();
                    return;
              }
      }else{
      /****全部时间*******/
         timestart = '2005-10-10 15:36:09';
         timeto = date.getFullYear() + '-'+getTimezero((date.getMonth() + 1))+'-' + getTimezero(date.getDate())+' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
      }

    
  /*************时间结束*******************/

    
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
   
function GetChannelsBody() {
        
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + timestart + '","TimeTo":"' + timeto + '","SesId":"' + id + '","ResTypes":"[' + type + ']","PageSize":20,"PageIndex":0}}';
    console.log(body);
    cHAnneltelldowns(body);
    $('.channel_tell_filter ').slideUp('slow');
    $('.channel_tell_logos  ').css('background-image', "url(img/icon/channel/channel_search1.png)");
    $('.channel_tellall2').height($(window).height() - 344);
}
GetChannelsBody();
}

function ChannelFinit(){
     $('.channel_listenset_topli li:last').children('img').attr('src','img/icon/newicon/help_download.png');
     $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
     $('.channel_listen_write').hide();
     $('.channel_listen_removes').hide();
     $('.channel_listen_keeps').hide();
     $('.channel_listen_downs').hide();
     $('.channel_listenwrite').hide();
     $('.channel_listen_select').children('div').css('left','25px');
     $('.channel_listen_select').children('div').css('background-color','#00FF00');
     $('.channel_listen_select').children('span').html('点击切换到留言');
     $('#channelForm').hide();
     $('.channel_listensay').show();
}
function ChanneltellFinit() {
     $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png');
     $('.channel_tellallsetli li:last').children('img').attr('src','img/icon/newicon/help_download.png');
     $('.channel_telllisten_write').hide();
     $('.channel_telllisten_removes').hide();
     $('.channel_tellsetdown ').hide();
     $('.channel_telllistenwrite').hide();  
     $('.channel_telllisten_select').children('div').css('left','25px');
     $('.channel_telllisten_select').children('div').css('background-color','#00FF00');
     $('.channel_telllisten_select').children('span').html('点击切换到留言');
     $('#channelForm1').hide();
     $('.channel_telllistensay').show();
}

function channelimdown(data){
    var id=$(data).parent().parent().attr('ids');
    var type=$(data).parent().parent().attr('type');
    var url=$(data).parent().parent().attr('url');
    var userid=$(data).parent().parent().attr('userid');
    var time=$(data).parent().parent().attr('time');
    var urlbase=toBase64(url);
     if(type==1){
          type=0;  
       }else if(type==2){
          type=1; 

       }else if(type==4||type==13){
          type=2; //录音
          //type=4 以前录音
       }else if(type==5){
          type=2; //实时录音
    }

    // if(isIEs()){
     var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[{"Url":"' + urlbase + '","ResType":' + type + ',"Uid":"' + userid + '","ReportIds":"' + id + '","ResCount":"0","ResourceTime":"'+time+'"}]}}';
     console.log(body);
      $('.cover_loading').show();
     // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
     // $.post('' + URI + '',
     //   function(ret) {
     //     var resp = decodeURIComponent(ret, 'UTF-8');
     //     var obj = $.parseJSON(resp);
      $.getJSON('' + STATION_DOWNURL + '?Body=' + body + '',
        function(ret) {
         console.log('返回报文'+JSON.stringify(ret));
         if (ret.Result == 200) {
            $('.cover_loading').hide();
           var address = ret.URL;
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
            $('.cover_loading').hide();
           common._coverShow("下载失败!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         }
       })
  // }
}

function channeltellDiscall(data){
      var id=$(data).parent().parent().parent().parent().attr('id');

  


} 
function channelDiscall(data){
    var id=$(data).parent().parent().parent().parent().attr('id');
    var uid=$(data).parent().parent().attr('name');
    var limit=$(data).parent().parent().attr('limit');
    var types=0;
    var typex=0;
    var saycode;
    var saycodes;
    var titles;
    var srcs;
        (limit == 0) ? types=0 : types=10;
        (limit == 0) ? typex=1 : typex=0;
        (types == 0) ? saycode='禁止呼入成功！':saycode='解除禁止成功！';
        (types == 0) ? saycodes='禁止呼入失败！':saycodes='解除禁止失败！';
        (types == 0) ? titles='解除限制':titles='禁止呼入';
        (types == 0) ? srcs='img/icon/newicon/power1.png':srcs='img/icon/newicon/power.png';
        $('.cover_loading').show();
    var body = '{"Code":"11204","Body":{"SessionId":"' + sessionId + '","Uids":"['+uid+']","SesId":"'+id+'","Action":"'+types+'"}}';
    var UidAct=currentChannelMembers;
    $.getJSON('' + STATION_URL+'?Body=' + body + '',
         function(ret) {
             if(ret.Result == 200){
                  $('.cover_loading').hide();
                  showAlert(saycode);
                  $(data).parent().parent().attr('limit',''+typex+'');
                  $(data).attr('title',''+titles+'');
                  $(data).attr('src',''+srcs+'');

                channelDiscallSuccess(id, uid, types);
                }else{
                  $('.cover_loading').hide();  
                  showAlert(saycodes);
             }
         })
} 


function channelDiscallSuccess(cid, uid, type) {
    if(type==10){
        type=0;
    }else if(type==0){
        type=1;            
    }
    var members = channelInfoMap.get(cid).members;
    var channeltellyuan=currentChannelMembers;
    // console.log('类型选择'+type);
    if (members && members.length) {
        for (var i = 0, len = members.length; i < len; i++) {
            if (members[i].Uid === uid) {
                members[i].Limit = type;
                break;
            }
        }
    }
    if(channeltellyuan.length!=0){
         for(var i=0;i<channeltellyuan.length;i++){
             if(channeltellyuan[i].Uid==uid){
                channeltellyuan[i].Limit = type;
                // console.log('设置本地属性'+type+'');
             }
         }
    }
    var obj = $('.channelSelectedonly');
    var name = obj.parent().attr('class');
    var div = obj.children('div');
    refreshCurrentClList(div,name,channeltellyuan);
}


function channelIMdownon(data){
    var id=$(data).parent().parent().attr('ids');
    var type=$(data).parent().parent().attr('type');
    var url=$(data).parent().parent().attr('url');
    var userid=$(data).parent().parent().attr('userid');
    var time=$(data).parent().parent().attr('time');
        url=toBase64(url);
     if(type==1){
          type=0;  
       }else if(type==4){
           type=0; 
       }else if(type==5){
          type=2; 
       }else if(type==6){
          type=1; 
    }
     // if(isIEs()){
    var body = '{"Code":"10404","Body":{"SessionId":"' + sessionId + '","Resources":[{"Url":"' + url + '","ResType":' + type + ',"Uid":"' + userid + '","ReportIds":"' + id + '","ResCount":"0","ResourceTime":"'+time+'"}]}}';
     $('.cover_loading').show();
     console.log('下载接口'+body);
     // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
     // $.post('' + URI + '',
     //   function(ret) {
     //     var resp = decodeURIComponent(ret, 'UTF-8');
     //     var obj = $.parseJSON(resp);
      $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
          // console.log('下载接口'+JSON.stringify(ret));
         if (ret.Result == 200) {
           $('.cover_loading').hide();
           var address = ret.URL;
           var address1 = '';
           savepics(address);
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
         }else{
            $('.cover_loading').hide();
           common._coverShow("下载失败!");
           setTimeout(function() {
             common._coverHide();
           }, 2000);
         }
       })
    // }
}
function GetChannelevle2finit () {
      // $('.channel_telllisten_select').children('div').
      // $('#channelForm1').hide();

}
function tellreashmamber(id,name){
    var arr=[];
    var tellchirdren=$('.chatOpenOnly').children('.channel_level2').length;
    for(var i=0;i<tellchirdren;i++){
         var name=$('.chatOpenOnly').children('.channel_level2').children().eq(i).attr('name');
         var tellname=$('.chatOpenOnly').children('.channel_level2').children().eq(i).attr('tellname');
         var jsonmsg='{"Uid":"'+name+'","Name":"'+tellname+'"}';
         arr.push(jsonmsg);
    }
   //  var obj=$('.chatOpenOnly').children('div');
   //  var grandfather='channel_level1';
   // tellothertome(arr,obj,)
   console.log('保存msg'+arr+'');
   return;
   $('#'+id+'').remove();
   // var newtell='<li class="chatOpenOnly" id="'+id+'" tellname="'+name+'"></li>';
  var creatorname=loginId;
  var newtell='<li id="' +id+ '" name="'+creatorname+'" tellname="' +name + '" class="chatOpenOnly"><div onclick="channeltelllevel2(this)"><i>' + name + '</i><img src="img/icon/channel/channel_up_03.png" class="fr sessIconDown"alt="" /></div><ul class="channel_level2"></ul></li>';
     $('.channel_level1').append(newtell);
     // refreshChatMembers(arr,)
     /*******下一步********/
     // gettellothertome();
}
function gettellothertome(name,id){
    
        session_call_bye(callInId);
        var channel_telllistname =name; //会话名称
        // var id_vals =id+ 'a';
        var sessionStatusPage = $('.channel_tellall');
        var grandfather = $('#'+id+'').parent().attr('class');
        // $('#chantell_ul').children('li').removeClass('chatOpenOnly');
        // $('#chantell_otherul').children('li').removeClass('chatOpenOnly');
        // id_val.addClass('chatOpenOnly');
        channel10312(id, obj, grandfather);
        sessionStatusPage.hide();
        sessionStatusPage.attr('id',id);
        // $('.channel_telllisten_write').hide(); //解散会话，修改名字窗口
        // $('.channel_telllisten_removes').hide(); //确定解散会话窗口
        // $('.channel_listen_downs channel_listens1').hide(); //下载窗口
        // $('.channel_right1').hide(); //小图标icon控制该页现隐藏
        // $('#channel_telllistenname').val(channel_telllistname); //修改名称的input框
        // $('#' + id_vals).find('.channel_telllevel2name').find('i').html(channel_telllistname);
        // sessionStatusPage.show('slow'); //第二栏页面出来
        // ChanneltellFinit();
        IMessageInterfac(id);
        callInId = channel_id; 
}

function channel_downlists(obj){
		  listens_of_tellall = true;
          channel_tellall2_onoff = true;
		  channel_tellall2_jilu = 0;
          $('.channel_listens2').height($(window).height() - 343);
          var that = $(obj).parent().parent().next();
          var id = $('.channel_box2').attr('id');
          if (that.css('display') === 'none') {
             $(obj).children('img').attr('src','img/icon/newicon/help_downloads.png');
            that.slideDown('slow');
            $('.channel_Inputall').removeClass('userall_selected');
            $('.channtlTotal').text('0');
            $('.channel_listen_downfooter button').attr('disabled','disabled');
            $('.channel_listen_downfooter button').removeClass('HelpReads');
            $('.channtlTotal').html(0);
            CHannel_10600(id);
            DownnumChoose = 0;
          } else {
            $(obj).children('img').attr('src','img/icon/newicon/help_download.png');
            that.slideUp('slow');
            $('.channel_Inputall').removeClass('userall_selected');
            /*隐藏fint*/
            $('.channel_listentimecenters').hide();
            $('.channel_listentimecenter').hide();
            $('.channel_listentimevals div').hide();
            $('.channel_listen_filter ').hide();
            $('.channel_listen_logos ').css('background-image', "url(img/icon/channel/channel_search1.png)");
              $('.channel_listentype li').each(function(i) {
                $(obj).removeClass('channel_listentypecbg');
              })
              $('.channel_listentimes li').each(function(i) {
                $(obj).removeClass('channel_listentimesbg');
              })
          }
}
        /*交通一队 下载内容*/
      // $('.channel_listenset_topli').children().eq(1).children().on('click', function() {
      //     $('.channel_listens2').height($(window).height() - 333);
      //     var that = $(this).parent().parent().parent().next();
      //     var id = $(this).parent().parent().parent().parent().parent().attr('id');
      //     if (that.css('display') === 'none') {
      //       that.slideDown('slow');
      //       $("input[name='channellistall']").prop("checked", false);
      //       $('.channtlTotal').text('0');
      //       CHannel_10600(id);
      //       DownnumChoose = 0;
      //     } else {
      //       that.slideUp('slow');
      //       $("input[name='channellistall']").prop("checked", false);
      //       /*隐藏fint*/
      //       $('.channel_listentimecenters').hide();
      //       $('.channel_listentimecenter').hide();
      //       $('.channel_listentimevals div').hide();
      //       $('.channel_listen_filter ').hide();
      //       $('.channel_listen_logos ').css('background-image', "url(img/icon/channel/channel_search1.png)");
      //         $('.channel_listentype li').each(function(i) {
      //           $(this).removeClass('channel_listentypecbg');
      //         })
      //         $('.channel_listentimes li').each(function(i) {
      //           $(this).removeClass('channel_listentimesbg');
      //         })
      //     }


      //   })

function Channel_GetAllcher(array){ 
   for(var i=0;i<array.length;i++){
       ChannelAllcher.put(array[i].Uid, array[i]);
   } 
   //ChannelAllcher.containsKey
}

function channel_Video (obj){

    var id='Channelplayvideo';

       var media_imgh = $('.channel_video').outerHeight();
       var media_imgw = $('.channel_video').outerWidth();
       var meidia_screenh = $(window).height();
       var meidia_screenw = $(window).width();
       var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
       var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
       $(".channel_video").css("top", media_top);
       $(".channel_video").css("left", media_left);
        var urls=$(obj).parent().parent().attr('url');
        channel_videolook();
          $('.Channel_lookimgpt').hide();
          $('#Channelplayvideo').show();
        $('#bg-color').show();
        $(".channel_video").show();
        Helpplayrs(urls,id);

}

function channel_imgclose(obj){
   $(obj).parent().hide();
   $('#Channelplay').children().remove();
   $('#bg-color').hide();
}

 function channel_videolook() {　　
     var div1 = document.getElementById("channel_videoflash");　　
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


//组织成员处创建会话和频道
//创建会话
function orgCreateConversation() {
    var oInput;
    var arr = [];
    var arrname=[];
    var content = '';
    if ($('#org-no-list').is(':hidden'))
        oInput = document.getElementsByName('list-3');
    else
        oInput = document.getElementsByName('list-1');
    for (var i = 0, len = oInput.length; i < len; i++) {
        if (oInput[i].checked == true) {
            var namess=$('#'+oInput[i].id+'').parent().next().text();  
            arrname.push(namess); 
            arr.push(oInput[i].id);
        }
    }
    $('#bg-color').show();
    $('.user-conversation').slideDown('slow');
    $('#conversation-user-list').empty();
    for (var j = 0, log = arr.length; j < log; j++) {
        content += '<li class="fix" name="' + arr[j] + '" username="'+arrname[j]+'"><span>' + arrname[j] + '</span><span><img class="fr conver-user-delete" src="img/icon/channel/channeldes.png" alt="img" /></span></li>';
    }
    $('#conversation-user-list').append(content);

    $('.conver-user-delete').on("click", function() {
        $(this).parents('li').remove();
    })

}
//创建频道
function orgCreateChannel() {
    var oInput;
    var arr = [];
    var arrname=[];
    var content = '';
    if ($('#org-no-list').is(':hidden'))
        oInput = document.getElementsByName('list-3');
    else
        oInput = document.getElementsByName('list-1');
    for (var i = 0, len = oInput.length; i < len; i++) {
        if (oInput[i].checked == true) {
           var namess=$('#'+oInput[i].id+'').parent().next().text();  
           arrname.push(namess);  
           arr.push(oInput[i].id);
        }
    }
    $('#bg-color').show();
    $('.user-channel').slideDown('slow');
    $('#channel-user-list').empty();
    for (var j = 0, log = arr.length; j < log; j++) {

        content += '<li name="' + arr[j] + '"  username="'+arrname[j]+'" class="channeladdmanlist"><i>' + arrname[j] + '</i><span class="channel_removelist" onclick="userremovetellman(this)"></span><div class="channel_addlists" onclick="userchannelselect(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt=""><span class="channnel_manpower">低</span><div class="channel_addlistselect"><ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';
    }
     $('#channel-user-list').append(content);
     $('#user_channelname').val('');
     $('#user_channelmsg').val('');
     $('#user_channlevel').html('高级');
     $('#user_channelsaytime').html('60秒');
     $('#user_channelwaiter').html('无排队');
}

function userchannelselect(obj) {
    if ($(obj).children('div').is(":hidden")) {
        var father = $(obj);
        $(obj).parent().siblings().children('.channel_addlists').children('.channel_addlistselect').hide();
        $(obj).siblings().children('img').attr('src','img/icon/channel/channel_select1.png');
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select2.png')
        $(obj).children('div').show();
        $(obj).siblings().children('div').hide();
        $(obj).find('li').each(function() {
            $(this).click(function() {
                var val = $(this).children().html();
                father.children('span').html(val);
            })
        })
    } else {
        $(obj).children('img').attr('src', 'img/icon/channel/channel_select1.png')
        $(obj).children('div').hide();
    }
}

function userremovetellman(data) {
    $(data).parent().remove();
}

function doCreateConversation() {
    $('.user_addchanneltellcenter').height($(window).height() - 252);
     
    var ullen=$('#conversation-user-list').children();
    
    var tellname=[];
          if(ullen.length==0){
              var tellnames=$('#company_name').html();
              $('#user_Addtellname').val(tellnames);
          }
          if(ullen.length>0){
             for(var i=0;i<ullen.length;i++){
                  if (i<2) {
                     var ella=$('#conversation-user-list').children().eq(i).attr('username');
                     tellname.push(ella);
                  }
             }
           $('#user_Addtellname').val(tellname);
          }
    $('.user_channel').show();
}
//会话上一步
function usertellprev(data) {
    $(data).parent().parent().slideUp('slow');
    $('#user_Addtellname').val('');
}
//会话出创建
 
function user_CreatTell(data) {
    // var user_tellname = $('#user_Addtellname').val().trim();
    // var user_tellnames=RegeMatchValC(user_tellname);
    //  if(user_tellnames){
    //             showAlert('会话名称不允许有特殊字符！');
    //             return;
    //     }
    // if (user_tellname == '') {
    //     common._coverShow("会话名称不能为空!");
    //     setTimeout(function() {
    //         common._coverHide();
    //     }, 2000);
    //     return;
    // }
    var user_telluser = [];
    var user_tellusers = '';
    var chatName = '';
    var list = $('#conversation-user-list>li');
    var len = list.length;
    var LENGTH = 4;
    list.each(function(i) {
        if (len <= LENGTH) {
            if (i < len-1) {
                chatName += $(this).attr('username') + ',';
            } else if (i == len-1) {
                chatName += $(this).attr('username');
            }
        } else {
            if (i < LENGTH - 1) {
                chatName += $(this).attr('username') + ',';
            } else if (i == LENGTH - 1) {
                chatName += $(this).attr('username');
            }
        }
        var thisname = $(this).attr('name');
        thisname = thisname.slice(0, thisname.length - 2);
        user_telluser[i] = thisname;
    })
     if(user_telluser.length==0){
         showAlert('请选择用户！');
         return;
     }
    user_tellusers = JSON.stringify(user_telluser);

   
    var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + chatName + '","Members":' + user_tellusers + ',"Match":1}}';
    $('.cover_loading').show();
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            console.log('创建会话'+obj.Result);
            if (obj.Result == 200) {
               $('.cover_loading').hide();
                // var valname = $.cookie("username");
    //             var containers = '<li id="' + obj.ConversationId + '" name="' + valname + '"  tellname="' + user_tellname + '"><div onclick="channeltelllevel2(this)"><i>' + user_tellname + '</i><img src="img/icon/channel/channel_select.png" class="fr sessIconDown"alt="" /></div><ul class="channel_level2"></ul></li>';
    //             $('.channel_main_tell .channel_level1').prepend(containers);
                //---------------------------------------------------------------------
                var selfObj = {Id:obj.ConversationId, Name:chatName, Creator:loginId}
                callInId = obj.ConversationId;
                createSnapChatSuccessed(selfObj, obj.ConversationId);
                //---------------------------------------------------------------------
                // $(data).parent().parent().parent().hide();
                $('#user_Addtellname').val('');
                $('.user-conversation').hide();
                $('#bg-color').hide();
                showAlert("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  创建会话成功!");
            } else if (obj.Result == 410) {
                $('.cover_loading').hide();
                showAlert('会话名称不能超过30个汉字');
            } else if (obj.Result == 411) {
                $('.cover_loading').hide();
                showAlert('该名称已存在，请重新命名！');
            } else {
                $('.cover_loading').hide();
                showAlert('创建会话失败！');
            }
        })
}

//会话取消
function user_addtellcannel(data) {
    $(data).parent().parent().parent().hide();
    $('#user_Addtellname').val('');
    $('.user-conversation').hide();
    $('#bg-color').hide();
}
//创建频道取消
function user_Createcannel(data) {
    $(data).parent().parent().parent().hide();
    $('.user-channel').hide();
    $('#bg-color').hide();
    $('#user_channelname').val('');
}
//创建频道
 
function user_Createchannel(data){
     var fahter=$(this);
        var channel_name=$('#user_channelname').val().trim(); //频道名称
        var channelcreatlevel=$('#user_channlevel').html(); //权限
        var channelcreatsay=$('#user_channelsaytime').html(); //发言时长
        var channelcreatwaite=$('#user_channelwaiter').html(); //排队人数
        var channelbewrite=$('#user_channelmsg').val().trim();//描述
        var user_id=[];
        var user_level=[];
        var  user_manmsg=[];
        var user_manmsg1=[];
        var channel_names=RegeMatchValC(channel_name);
        var bewrite=RegeMatchValC(channelbewrite);
            if(channel_names){
                showAlert('频道名称不允许有特殊字符！');
                return;
            }  
            if(bewrite){
                showAlert('描述不允许有特殊字符！');
                return;
            } 
            channelbewrite=channelbewrite.replace(/\n|\r\n/g, "<br>"); 
         $('#channel-user-list>li').each(function(i){    
            user_id[i]=$(this).attr('name').replace(/[^0-9]/ig, "");
            user_level[i]=$(this).find('.channnel_manpower').html();
         })
         for (var i=0;i<user_level.length;i++) {
              if(user_level[i]=='高'){
                 user_level[i]=0;
              }else if(user_level[i]=='中'){
                 user_level[i]=1;
              }else if(user_level[i]=='低'){
                 user_level[i]=2;
              }else if(user_level[i]=='仅听'){
                 user_level[i]=-1;
              }
         }
       for (var i=0;i<user_level.length;i++) {
            user_manmsg[i]={"Uid":""+user_id[i]+"","Level":user_level[i]};
          } 
        //权限选择
         if(channelcreatlevel=='最高'){
             // channelcreatlevel=0;
         }else if(channelcreatlevel=='高级'){
             channelcreatlevel=2;
         }else if(channelcreatlevel=='中级'){
             channelcreatlevel=3;
         }else if(channelcreatlevel=='低级'){
             channelcreatlevel=4;
         }else if(channelcreatlevel=='最低'){
             // channelcreatlevel=4;
         }
         //发言时长
         if(channelcreatsay=='无限制'){
            channelcreatsay=-1;
            }else{     
       channelcreatsay = channelcreatsay.replace(/[^0-9]/ig,""); 
        }
        //排队人数
        if(channelcreatwaite=='无排队'){
            channelcreatwaite=0;
             }else{     
           channelcreatwaite = channelcreatwaite.replace(/[^0-9]/ig,""); 
        } 
        user_manmsg1=JSON.stringify(user_manmsg); 
            user10300(channel_name,channelcreatlevel,channelcreatsay,channelcreatwaite,channelbewrite,user_manmsg1);
}



//创建频道函数
   function user10300 (channel_name,channelcreatlevel,channelcreatsay,channelcreatwaite,channelbewrite,user_manmsg1) {
            if(channel_name==''){
                 common._coverShow("频道名称不能为空！");
                        setTimeout(function (){
                        common._coverHide();
                    },2000); 
                        return;
            }
            $('.cover_loading').show();
        var body='{"Code":"10300","Body":{"SessionId":"'+sessionId+'","ChannelName":"'+channel_name+'","ChannelLevel":'+channelcreatlevel+',"Display":"'+channelbewrite+'","Countinqueue":'+channelcreatwaite+',"CrMemberTalkduration":'+channelcreatsay+',"Members":'+user_manmsg1+'}}'; 
          console.log(body);
        var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
          $.post(''+URI+'',
              function (ret){
                      var resp = decodeURIComponent(ret,'UTF-8');
                      var obj = $.parseJSON(resp);
                if(obj.Result==200){
                    $('.cover_loading').hide();         
                    var html5 = '';
                    var channel_levels = '';
                    var Level = channelcreatlevel;
                    var man = channelcreatwaite;
                    var time = channelcreatsay;
                    var cid = obj.ChannelId;
                    switch (Level) {
                    case 0:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + channelbewrite + '" cid="' + obj.ChannelId + '" man="' + channelcreatwaite + '"  time="' + channelcreatsay + '" name="' + channel_name + '" level="' + channelcreatlevel + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt=""></div><ul class="channel_level2"></ul></li>';
                        break;
                    case 1:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + channelbewrite + '" cid="' + obj.ChannelId + '" man="' + channelcreatwaite + '"  time="' + channelcreatsay + '" name="' + channel_name + '" level="' + channelcreatlevel + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt=""></div><ul class="channel_level2"></ul></li>';
                        break;
                    case 2:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" /><img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + channelbewrite + '" cid="' + obj.ChannelId + '" man="' + channelcreatwaite + '"  time="' + channelcreatsay + '" name="' + channel_name + '" level="' + channelcreatlevel + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt=""></div><ul class="channel_level2"></ul></li>';
                        break;
                    case 3:
                        channel_levels = '<img src="img/icon/channel/channel_level.png" alt="" />';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + channelbewrite + '" cid="' + obj.ChannelId + '" man="' + channelcreatwaite + '"  time="' + channelcreatsay + '" name="' + channel_name + '" level="' + channelcreatlevel + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt=""></div><ul class="channel_level2"></ul></li>';
                        break;
                    case 4:
                        channel_levels = '';
                        html5 += '<li id="' + obj.ChannelId + '" dtr="' + channelbewrite + '" cid="' + obj.ChannelId + '" man="' + channelcreatwaite + '"  time="' + channelcreatsay + '" name="' + channel_name + '" level="' + channelcreatlevel + '"><div onclick="channellevel2(this)" onmouseenter="channelMouseOver()" onmouseleave="channelMouseOut()"><i title="'+channel_name+'">' + channel_name + '</i>' + channel_levels + '<img src="img/icon/channel/channel_select.png" alt="" class="fr sessIconDown"><img src="img/icon/channel/channel_nolisten.png" class="channel_mr" onclick="channel_clicktwo(this)" alt=""></div><ul class="channel_level2"></ul></li>';
                        break;
                      }
                            // common._coverShow("频道创建成功!");
                            common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + " 频道创建成功！");
                            setTimeout(function() {
                                common._coverHide();
                            }, 2000);
                            //添加到频道列表中9.22
                            var newChannelObject = {
                                "Level": channelcreatlevel,
                                "Name": channel_name,
                                "Coutinqueue": channelcreatwaite,
                                "CrMemberTalkduration": channelcreatsay,
                                "Id": cid,
                                "Display": channelbewrite,
                                "Creator": loginId,
                            };
                            channelAlls.push(newChannelObject);
                            //添加到频道列表中9.22

                         if ($('.channel_main .channel_level1').children().eq(0).hasClass('help_wu')) {
                             $('.channel_main .channel_level1').empty();
                             $('.channel_main .channel_level1').append(html5);
                           } else {
                              $('.channel_main .channel_level1').append(html5);
                           }
                              $('.user_channelsure').hide();
                              $('#user_channelname').val('');
                              $('.user-channel').hide();
                              $('#bg-color').hide();
                           }else if(obj.Result==410){
                            $('.cover_loading').hide(); 
                             showAlert("频道名称不能超过30个汉字")
                           }else if(obj.Result==411){
                            $('.cover_loading').hide(); 
                             showAlert("该名称已存在，请重新命名！")

                           }else{ 
                            $('.cover_loading').hide(); 
                             showAlert("创建频道失败！")
                           }        
                        })
      } 



function doCreateChannel() {
     $('.user_addchannelmain').outerHeight($(window).height()-212);
     $('.user_addchannellevels').hide();
     $('.user_addchannellevel').children('img').attr('src','img/icon/channel/channel_select1.png');
     $('.user_channelsure').slideDown('slow');
   
}

function canceled(i) {
    $('#bg-color').hide();
    $('.' + i).slideUp('slow');
    //  $('.bg_checked').prop('checked',false);
    //  $('.checkstyle').prop('checked',false);
    //  $('.total').text(0);
}

function Get_BroadcastLimit (user_id) {
    
       var msg=usersAll.get(user_id);
       var inglist=0;
       if(!msg){

          return inglist;

        }

        if(msg.BroadCastRole==undefined){

            return inglist;

        }else if(msg.BroadCastRole==1){

            inglist=1; 
            return inglist;
        }else if (msg.BroadCastRole==0) {

           inglist=0; 
           return inglist;

        }

}

function Get_YaoBiLimit (user_id) {
    
       var msg=usersAll.get(user_id);
       var inglist=0;
       if(!msg){

          return inglist;

        }

        if(msg.RemoteCtl==undefined){

            return inglist;

        }else if(msg.RemoteCtl==1){

            inglist=1; 
            return inglist;
        }else if (msg.RemoteCtl==0) {

           inglist=0; 
           return inglist;

        }

}

function Get_LimitStatus (user_id) {
    
       var msg=usersAll.get(user_id);
       var inglist=0;
       if(!msg){

          return inglist;

        }

        if(msg.RemoteCtl==undefined){

            return inglist;

        }else if(msg.LimitStatus==1){

            inglist=1; 
            return inglist;
        }else if (msg.LimitStatus==0) {

           inglist=0; 
           return inglist;

        }

}



function IM_ImgShow (data) {
    var imgsrc=$(data).attr('src');


       var id='Channelplayvideo';
       var media_imgh = $('.channel_video').outerHeight();
       var media_imgw = $('.channel_video').outerWidth();
       var meidia_screenh = $(window).height();
       var meidia_screenw = $(window).width();
       var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
       var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
       $(".channel_video").css("top", media_top);
       $(".channel_video").css("left", media_left);
        channel_videolook();
        $('#Channelplayvideo').hide();
        $('#bg-color').show();
        $(".channel_video").show();
        $('.Channel_lookimgpt').children('img').attr('src',imgsrc);
        $('.Channel_lookimgpt').show();
    

}

function channel_ckphone (name) {

      var val=$(name).val().trim();
      var reg=/[^\d]/g;
      var xuanval=val.replace(reg,'');
       $(name).val(xuanval);
}

function Push_Ullist (data) {

    if(Ullistarr.length==0){

         Ullistarr.push(data);

    }else if(Ullistarr.length==1) {
       var listone=Ullistarr[0];
       if(listone!=data){

           Ullistarr.push(data);
       }
    }else if(Ullistarr.length==2){
         var listone=Ullistarr[0];
         var listtwo=Ullistarr[1];
         if(listone!=data && listtwo!=data) {
           
           Ullistarr.push(data);
           Ullistarr.splice(0,1);
         }
    }
}

function Video_Stopprev () {

     var listone=Ullistarr[0];
     var listtwo=Ullistarr[1];
      $('#saveicon').show();
      $('.mian_downuserbook').show();
     if(listone!= 'video'){

            var id='station_'+listone;
            navModuleShow(id);
            main_leftRemoveColor(listone);

      } else {

            var id='station_'+listtwo;
            navModuleShow(id);
            main_leftRemoveColor(listtwo);

     }

}

function main_leftRemoveColor (data) {

    var navLi = $('.leftNav').find('li');
    var navA = $('.radio_footer_set b'); 
    var ullist=['helper','user','channel','video','media'];
    var setlist=['radio','line','warn','task','set'];
    Nav_leftImg();
    ullist.forEach(function (item,index) {
           
         if(item==data){
            navLi.removeClass();
            navA.parent().removeClass('more_active');
            NavLeftindex(index);
            // navLi.eq(index).addClass('active');
            // navLi.eq(index).siblings().children('b').css('color','#9c9993');
            // navLi.eq(index).children('b').css('color','#fff');
            return;
         }  
    })

    setlist.forEach(function (item,index) {
           
         if(item==data){
            navLi.removeClass();
            navA.parent().removeClass('more_active');
            navLi.children('b').css('color','#9c9993');
         
            navA.parent().eq(index).addClass('more_active'); 
            return;
         }  
    }) 

}

function Channel_Cancelsure () {

        $('.User_Alls').hide();      
        $('.ul_ztree').show();
        treeAddUsers.clear();
        $('.media_selectremove').hide();
        $('.channel_addchannel').hide();
        // $(this).parent().parent().parent().hide();
        $('.channel_creatselect').hide();
        // $(this).parent().parent().parent().prev().hide();
        $('.channel_creat').hide();
        // $(this).parent().parent().parent().prev().prev().hide();
        $('.channel_coverleft').hide();
        // $(this).parent().parent().parent().prev().prev().prev().hide();
        $('#bg-color').hide();
        $('.channel_left1').show();
        $('.channel_addchannel').css('z-index','10005');
        $('.channel_creatselect').css('z-index','10000');

}

function channel_listens_tellall_pulley(){
	if(listens_of_tellall){
		if(!$('.ChannelMoredown').text()){
			return;
		}
		var Height_gdt=$(".channel_listens2").scrollTop();
		var Height_div =$(".channel_listens2")[0].scrollHeight-$(".channel_listens2").height();
		if(channel_tellall2_jilu!=Height_gdt){
			if(Height_gdt==Height_div&&channel_tellall2_onoff){
				channel_tellall2_onoff = false;
				channel_tellall2_jilu = Height_gdt;
				$('.ChannelMoredown').click();
			}
		}
	}else{
		if(!$('.ChanneltellMoredown').text()){
			return;
		}
		var Height_gdt=$(".channel_tellall2").scrollTop();
		var Height_div =$(".channel_tellall2")[0].scrollHeight-$(".channel_tellall2").height();
		if(channel_tellall2_jilu!=Height_gdt){
			if(Height_gdt==Height_div&&channel_tellall2_onoff){
				channel_tellall2_onoff = false;
				channel_tellall2_jilu = Height_gdt;
				$('.ChanneltellMoredown').click();
			}
		}
	}
}

function Channel_msgSay (objdiv, event) {
    var data =$(objdiv).parent();
    var event = event || window.event;
    $(data).next().children('').eq(1).slideUp();
    $(data).next().next().children('').eq(1).slideUp();
    $(data).next().next().next().children('').eq(1).slideUp();
    $(data).next().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    $(data).next().next().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    var showdiv = $(data).children('').eq(1);
    if( showdiv.is(':hidden')){
         showdiv.slideDown();
         showdiv.prev().css('border-bottom',"1px dashed #fff");
    }else {
         showdiv.slideUp();
         showdiv.prev().css('border-bottom',"1px dashed #ccc");
    }
    event.stopPropagation();
}
function Channel_MsgUser (objdiv, event) {
    var obj = $(objdiv).parent();
    var user_id = $(obj).parent().parent().attr('name');
    var event = event || window.event;
    
    if ( Channel_MSGuser == null) {
       channel_GetMoremsg(obj, user_id);
      return;
    }

    $(obj).prev().children('').eq(1).slideUp();
    $(obj).next().children('').eq(1).slideUp();
    $(obj).next().next().children('').eq(1).slideUp();
    $(obj).prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    $(obj).next().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    

    var showdiv = $(obj).children('').eq(1);
    if( showdiv.is(':hidden')){
         showdiv.slideDown();
         showdiv.prev().css('border-bottom',"1px dashed #fff");
    }else {
         showdiv.slideUp();
         showdiv.prev().css('border-bottom',"1px dashed #ccc");
    }
    event.stopPropagation();
}
function Channel_MsgUserStatus (objdiv, event) {
    var obj = $(objdiv).parent();
    var user_id = $(obj).parent().parent().attr('name');
    var event = event || window.event;
   
     if ( Channel_MSGuser == null) {
       channel_GetMoremsg(obj, user_id);
      return;
    }

    $(obj).prev().prev().prev().children('').eq(1).slideUp();
    $(obj).prev().prev().children('').eq(1).slideUp();
    $(obj).prev().children('').eq(1).slideUp();
    $(obj).prev().prev().prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    $(obj).prev().prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    $(obj).prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");

    var showdiv = $(obj).children('').eq(1);
    if( showdiv.is(':hidden')){
         showdiv.slideDown();
           
    }else {
         showdiv.slideUp();
          
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}
function Channel_MsgUserPsd (objdiv,event) {
    var obj = $(objdiv).parent();
    var user_id = $(obj).parent().parent().attr('name');
    var event = event || window.event;


    $(obj).prev().prev().children('').eq(1).slideUp();
    $(obj).prev().children('').eq(1).slideUp();
    $(obj).next().children('').eq(1).slideUp();
    $(obj).prev().prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");
    $(obj).prev().children('').eq(0).css('border-bottom',"1px dashed #ccc");
  
    var showdiv = $(obj).children('').eq(1);
    if( showdiv.is(':hidden')){
         showdiv.slideDown();
         showdiv.prev().css('border-bottom',"1px dashed #fff");
    }else {
         showdiv.slideUp();
         showdiv.prev().css('border-bottom',"1px dashed #ccc");
    }
    event.stopPropagation();
}
 
 function channel_GetMoremsg (objdiv, user_id) {

    var father = $(objdiv).parent(); 
    var user_power=ChannelAllcher.containsKey(user_id);
    if(user_power){
        showAlert('同级调度员，无权限修改信息！');
        return;
    }
    $('.cover_loading').show();
    var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":"[' + user_id + ']"}}';
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
        console.log(body);
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            console.log(JSON.stringify(obj));
            if (obj.Result == 200) {
                 $('.cover_loading').hide();
             
                var state;
                var answer;
                if (obj.Users[0].SetIsb == 0) {
                    state = '免打扰未开启';
                } else if (obj.Users[0].SetIsb == 1) {
                    state = '免打扰开启';
                }
                if (obj.Users[0].SetAm == 0) {
                    answer = '手动应答';
                } else if (obj.Users[0].SetAm == 1) {
                    answer = '自动应答';
                }
 
               father.find('.channel_msguserid').html(user_id);
               father.find('.channel_userRemarid').val(obj.Users[0].Name);
               father.find('.channel_userRemarphone').val(obj.Users[0].Phone);
               father.find('.channel_userRemaremail').val(obj.Users[0].Email);
               father.find('.channel_usermoduelmsg').html(state);
               father.find('.channel_usermoduelmsghand').html(answer);
               Channel_MSGuser = true;
               $(objdiv).children().eq(0).trigger("click");
            } else {
                $('.cover_loading').hide();
                showAlert('获取信息失败！');

            }
        })
}
function Channel_msguserKeep (obj) {

    var father = $(obj).parent();
    var channelmsg = '';
    var channelpower = '';
    var uids = father.find('.channel_msguserid ').html().trim();
    var channel_username = father.find('.channel_userRemarid').val().trim();
    var channel_phone = father.find('.channel_userRemarphone').val().trim();
    var channel_email = father.find('.channel_userRemaremail').val().trim();
    var channel_Nowid = $('.channelSelectedonly').attr('id');
    if (channel_email != '') {
         if (!isEmail(channel_email)) {
          common._coverShow("邮箱格式错误!");
          setTimeout(function() {
            common._coverHide();
         }, 2000);
         return;
        }
    }
    if(channel_phone!=''){
        if (!checkMobile(channel_phone)) {
            common._coverShow("手机格式错误!");
            setTimeout(function() {
                common._coverHide();
            }, 2000);
            return;
        }
    }
    
 
     var body = '{"Code":10113,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uids + '\","Name":\"' + channel_username + '\","Phone":\"' + channel_phone + '\","Email":\"' + channel_email + '\"}}';
     Channel_PostUsermsg (body, uids, channel_username,channel_Nowid);

}



function Channel_PostUsermsg (body, uids, channel_username,channel_Nowid) {
    var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    $.post('' + URI + '',
        function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
            var obj = $.parseJSON(resp);
            if (obj.Result == 200) {
                $('.cover_loading').hide();
                  common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  修改成功");
                   setTimeout(function() {
                       common._coverHide();
                    }, 2000);                 
                for (var i=0;i<currentChannelMembers.length;i++) {
                      if(currentChannelMembers[i].Uid==uids){     
                          currentChannelMembers[i].Name=channel_username;
                      }
                }
                currentChanneledMembersOn(channel_Nowid);
            } else {
                $('.cover_loading').hide();
                 showAlert('修改失败！');
            }
        })
}
function Channel_UserPsdKeep (obj) {
    var uids = $(obj).attr('userid');
    var password = $(obj).prev().prev().children('input').val().trim();
    var passwords = $(obj).prev().children('input').val().trim();
    var channel_Nowid = $('.channelSelectedonly').attr('id');
    var user_power=ChannelAllcher.containsKey(uids);
    if(user_power){
        showAlert('同级调度员，无权限修改信息！');
        return;
    }
    var body;
   
       if(password != passwords){

            showAlert('新密码与确认密码不一致，请检查并重新输入');
            return;  

       }
     var namevals=RegeMatchValC(password);
       if(namevals){
            showAlert('密码不允许有特殊字符！');
            return;
       } 

        var user_power=ChannelAllcher.containsKey(uids);
            if(user_power){
                   
                       if(password.length<8||password.length>15){
                            common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                               setTimeout(function() {
                                 common._coverHide();
                               }, 5000);
                            return;
                    }
                   
                 passwords=Setuser_Pwd(uids,passwords);
                body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uids+'","Pwd":"'+passwords+'"}}'

            }else{

                       if(password.length<8||password.length>15){
                                    common._coverShow("密码长度为8-15位!");
                                              setTimeout(function (){
                                                   common._coverHide();
                                          },2000);
                                           return;
                        }
                  
                body = '{"Code":"10107","Body":{"SessionId":"' + sessionId + '","Uid":"' + uids + '","Pwd":"' + passwords + '"}}';
            }             
          
      var arr=[user_power,channel_Nowid];
     var conword='修改密码失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Channel_PwdSuccess, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
}

function Channel_UserPsdrandKeep (obj) {
    var uids = $(obj).prev().attr('userid');
    var channel_Nowid = $('.channelSelectedonly').attr('id');
    var passwords = getRandomPassword();
    var user_power=ChannelAllcher.containsKey(uids);
    var return_pwdmsg;
    var body;
       if(user_power){
    
           passwords=passwords+'Pwd!';
           return_pwdmsg=passwords;
            console.log(passwords);
          $('.cover_loading').show();
          passwords=Setuser_Pwd(uids,passwords);
            body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uids+'","Pwd":"'+passwords+'"}}' 

            }else{
                    return_pwdmsg=passwords;
                    $('.cover_loading').show();
                    body = '{"Code":"10107","Body":{"SessionId":"' + sessionId + '","Uid":"' + uids + '","Pwd":"' + passwords + '"}}';
            }

    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            if (ret.Result == 200) {
                // $(data).parent().parent().slideUp('slow');
                 $('.cover_loading').hide();
                common._coverShow("设置密码成功,随机密码为" + return_pwdmsg + "");
                setTimeout(function() {
                    common._coverHide();
                }, 5000);
            }else if(ret.Result==406){
                $('.cover_loading').hide();
               common._coverShow("同级调度员不允许修改密码!");
                setTimeout(function() {
                    common._coverHide();
                }, 2000);
            } else if(ret.Result==418){ 
                   // var hang='<br>';
                    // showAlert('密码为8-15位数字和字母或字符组合!');
                   //    common._coverShow("密码为8-15位数字和字母和字符组合!" + hang + "如:Heduijiang123!!");
                   // setTimeout(function() {
                   //   common._coverHide();
                   // }, 5000);

                // $('.cover_loading').hide();
                // common._coverShow("设置密码失败!");
                // setTimeout(function() {
                //     common._coverHide();
                // }, 2000);
            }
        })
}