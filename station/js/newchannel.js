
    /******Introduce file invocation*****/
    var channelcorde_down=[];
    var channelcorde_downmore=[];
    var channeltellcorde_down=[];
    var channeltellcorde_downmore=[];
    var luYin = true;
    var luYin1 = true;
    var channel_tellname_val = "";
    var addhuihua_set = false;
    var addhuihua_set_username = "";
		var channel_creates = true;

	var channel_keyTime = 0;
    var channel_keyTime_repeat;
    function GetChannel() {
    	Map_Lineclear();
      $('.sec').animate({
        'margin-left': '80px'
      })
      $('#Channel_Timeval').fdatepicker({format: 'yyyy-mm-dd'});
      $('#Channel_Timevals').fdatepicker({format: 'yyyy-mm-dd'});
      $('#channel_TimeStartdate').fdatepicker({format: 'yyyy-mm-dd'});
      $('#channel_TimeOverdate').fdatepicker({format: 'yyyy-mm-dd'});
      channelBoxHide();
      GetchannelOther();
      /**********左右边栏********/
      channel_lefthide();
      $('.Heights').height($(window).height());
      $('.channel_main1').height($(window).height() - 240);
      $('.channel_main2').height($(window).height() - 350);
      $('.channel_listens1').height($(window).height() - 183);
      //会话高度
      $('.channel_tellall1').height($(window).height() - 184);
      $('.channel_tellall2').height($(window).height() - 340);
      $('.channel_tellchat').height($(window).height() - 350);
      //创建频道高度
      $('.channel_addlist').height($('.wrap').height() - 163);
      //Get the channel list
      code10305();
      //Get the Conversation list
      channel1();

      //点击一级菜单 显示第二级菜单
      //   $(' ul.channel_level1>li').each(function(){
      //         $(this).children().eq(0).click(function() {
      //              if ($(this).parent().find('ul.channel_level2').is(":hidden"))
      //              {
      //                  $(this).parent().find('ul.channel_level2').show('slow');
      //                  $(this).children('.fr').attr('src','img/icon/channel/channel_up_03.png'); 
      //              }else{
      //                  $(this).parent().find('ul.channel_level2').hide('slow');
      //                  $(this).children('.fr').attr('src','img/icon/channel/channel_select.png');
      //             }
      //        })
      //    }) 
      //鼠标悬停 显示图标频道 编辑 遥弊
      $('.channel_main .channel_level2 li').hover(function() {
          $(this).children('.channel_level2_name').hide();
          $(this).children('.channel_level2_show').show();
        },
        function() {
          $(this).children('.channel_level2_show').hide();
          $(this).children('.channel_level2_name').show();

        })

      //会话悬停 显示图标   
      $('.channel_main_tell .channel_level2 li').hover(function() {
            $(this).children('.channel_telllevel2_show').show().siblings('.channel_telllevel2_name').hide();
          },
          function() {
            $(this).children('.channel_telllevel2_show').hide().siblings('.channel_telllevel2_name').show();
        })
        //会话设置
      $('.channel_set_select').click(function() {
        var father = $(this);
        if ($(this).children('.channel_set_select1').is(":hidden")) {
          $(this).children('img').attr('src', 'img/icon/channel/channel_select2.png')
          $(this).children('.channel_set_select1').show();
          var that = $(this).children('.channel_set_select1');
          that.find('li').each(function() {
            $(this).click(function() {
              var val = $(this).children().html();
              father.children('.channnel_select_val').html(val);
            })
          })
        } else {
          $(this).children('img').attr('src', 'img/icon/channel/channel_select1.png')
          $(this).children('.channel_set_select1').hide();
        }
      })
      // $('#Channel_AddInput').change(function(){
      //     var val = $(this).val();
      //     if(val){
      //        $('.channel_delete').show();
      //     }else{
      //        $('.channel_delete').hide();
      //     }

      // })
      $('#station_channel').hover(function () {
         $('.channel_details_bgcolor').css('opacity',1);
      },function () {
         $('.channel_details_bgcolor').css('opacity',0.4);
      })
      //发言时长  //发言时长   方法channel_hide
      $('.channel_saytime').click(function() {
        if ($(this).children('div').is(":hidden")) {
          var father = $(this)
          $(this).children('img').attr('src', 'img/icon/channel/channel_select2.png');
          $(this).children('div').show();
          $(this).find('li').each(function() {
            $(this).click(function() {
              var val = $(this).children().html();
              father.children('.channel_saytime_val').html(val);
            })
          })
        } else {
          $(this).children('img').attr('src', 'img/icon/channel/channel_select1.png')
          $(this).children('div').hide();
        }
      })

      channel_hide('.channel_listen_grade');
      channel_hide('.channel_listen_time');
      channel_hide('.channel_listen_list');
      channel_hide('.channel_addlists');

       

      // channel_hide('.channel_addchannellevel');
      // channel_hide('.channel_addchannelleves');
      // channel_hide('.channel_addchannellevess');
       channel_otherhide('.channel_addchannellevel');
       channel_otherhide('.channel_addchannelleves');
       channel_otherhide('.channel_addchannellevess');

       $('#channel_listen_name').focus(function() {
          $('.channel_listen_name').addClass('more_setborder').siblings('div').removeClass('more_setborder');
          $('.channel_listen_name').siblings().children('div').hide();
       })
       $('.channel_listen_write').find('textarea').focus(function() {
          $(this).siblings().children('div').hide();
          $(this).siblings('div').removeClass('more_setborder');
       })
      $('#channelcreatname').focus(function() {
          $('.channel_addchannelname').addClass('more_setborder').siblings('div').removeClass('more_setborder');
          $('.channel_addchannelname').siblings().children('div').hide();
       })
      $('#channelbewrite').focus(function(){
        $('#channelbewrite').siblings('div').removeClass('more_setborder');
        $('#channelbewrite').siblings().children('div').hide();

      })

      //更多设置 

      $('.channel_more_set').click(function() {
        var val = $(this).next();
        if ($(this).next().is(":hidden")) {
          $(this).next().show('slow');
          $(this).hide();
        } else {}
      })
      $('.channel_message_hide').click(function() {
          $(this).parent().prev().show('slow');
          $(this).parent().hide('slow');
        })
        //显示隐藏 
      if ($('.channel_listen_removes').is(':hidden')) {
        $('.channel_listen_setshow').click(function(event) {

          var channelLockBtn = $('.channel_listenfooterauto');
          var cid = $('.channel_box2').attr('id');
          var lockid = chatLockidGet();
          cid = cid.slice(0, cid.length - 1);
          var level = $('#' + cid).attr('level');
          var time = $('#' + cid).attr('time');
          var wait = $('#' + cid).attr('man');
          var dtr = $('#' + cid).attr('dtr');

          var levelval = $('.channel_listen_write').children('.channel-set-box1').children('.channel_listen_grade').children('.channel_listen_val');
          var timeval = $('.channel_listen_write').children('.channel-set-box1').children('.channel_listen_time').children('.channel_listentime_val');
          var waitlist = $('.channel_listen_write').children('.channel-set-box1').children('.channel_listen_list').children('.channel_listenlist_val');
          var text = $('.channel_listen_write').children('.channel-set-box1').children('textarea');
          text.val('');
          $('.channel-set-box2').hide();
          $('.channel-set-box1').show();

          if ($('.channel_listen_removes').is(':hidden') && $('.channel_listen_keeps').is(':hidden')) {

            if ($('.channel_listen_write').is(':hidden')) {
               CHANNEL_SETimgicon=false;
               console.log(typeof level);
              // switch(level){
              // case 0:
              //      levelval.html('高级');
              // break;
              // case 1:
              //      levelval.html('高级');
              // break;
              // case 2:
              //      levelval.html('高级');
              // break;
              // case 3:
              //      levelval.html('中级');
              // break;
              // case 4:
              //      levelval.html('低级');     
              // break;
              // }
              if(level==0){
                 levelval.html('高级');
              }else if(level==1){
                 levelval.html('高级');
              }else if(level==2){
                levelval.html('高级');
              }else if(level==3){
                levelval.html('中级');
              }else if(level==4){
                levelval.html('低级');  
              }
              
              if (time == 30) {
                timeval.html('30秒');
              } else if (time == 60) {
                timeval.html('60秒');
              } else if (time == 120) {
                timeval.html('120秒');
              } else if (time == -1) {
                timeval.html('无限制');
              }
              
              // switch(wait){
              // case 0:
              //     waitlist.html('无排队');
              //     break;
              // case 5:
              //     waitlist.html('5人');
              //     break;   
              // case 10:
              //     waitlist.html('10人');
              //     break;   
              // }
              if(wait==0){
                  waitlist.html('无排队');
              }else if(wait==5){
                  waitlist.html('5人');
              }else if(wait==10){
                  waitlist.html('10人');
              }
              text.val(dtr);



              $('.channel_listen_write').slideDown('slow');
              $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_sets.png');
              if (cid === lockid) {
                channelLockBtn.children().css('background-color', '#4AC663').animate({
                  left: '35px'
                }, "slow");
                channelLockBtn.attr('lock', cid);
              } else {
                channelLockBtn.children().css('background-color', '#A9A59F').animate({
                  left: '2px'
                }, "slow");
                channelLockBtn.attr('lock', '0');
              }
            } else {
              CHANNEL_SETimgicon=true;
              $('.channel_listen_write').slideUp('slow');
              $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');

              /**********隐藏fint***********/
              $('.channel_listen_grade img').attr('src', 'img/icon/channel/channel_select1.png');
              $('.channel_listen_time img').attr('src', 'img/icon/channel/channel_select1.png');
              $('.channel_listen_list').attr('src', 'img/icon/channel/channel_select1.png');
              $('.channel_listen_gradeval').hide();
              $('.channel_listen_timeval').hide();
              $('.channel_listen_listval').hide();
            }
          }
          event.stopPropagation();
        })
      }
      $('.channel_listen_setshow').hover(function() {
           if(CHANNEL_SETimgicon) {
              $(this).attr('src','img/icon/newicon/channel_sets.png');
           }
      }, function() {
          if (CHANNEL_SETimgicon) {
               $(this).attr('src','img/icon/newicon/channel_set.png');
           }
      });
      //解散频道
      $('.channel_listenfooters').children().eq(0).on('click', function() {
        var that = $(this).parent().parent().parent().parent();
        $(this).parent().parent().parent().slideUp();
        $(this).parent().parent().parent().next().slideDown('slow');
      })
      $('.channel_listen_removeselect').children().eq(0).on('click', function() {
        $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
        $(this).parent().parent().slideUp('slow');
        CHANNEL_SETimgicon=true;
      })
      $('.channel_listen_removeselect').children().eq(1).on('click', function() {
          $(this).parent().parent().slideUp('slow');
          var that = $(this).parent().parent().parent().parent();
          var id = $(this).parent().parent().parent().parent().attr('id');
          // var ids = id.substring(0, 5);
          var ids=id.replace(/a/,'');
          $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
           CHANNEL_SETimgicon=true;
          code10301(ids, that);
        })
        //保存频道内容
      $('.channel_listenfooters').children().eq(1).on('click', function() {
        var id = $(this).parent().parent().parent().parent().parent().attr('id');
        var channel_name = $(this).parent().parent().children('.channel_listen_name').children('input').val().trim(); //频道名称
        var channel_level = $(this).parent().parent().children('.channel_listen_grade').children('.channel_listen_val').html(); //频道权限
        var channel_saytime = $(this).parent().parent().children('.channel_listen_time').children('.channel_listentime_val').html(); //频道发言时长
        var channel_lineup = $(this).parent().parent().children('.channel_listen_list').children('.channel_listenlist_val').html(); //频道排队人数
        var channel_text = $(this).parent().parent().children('textarea').val().trim(); //频道描述
        var ids = id.substring(0, 5);
         var channel_names=RegeMatchValC(channel_name);
         var bewrite=RegeMatchValC(channel_text);
          if(channel_names){
                showAlert('频道名称不允许有特殊字符！');
                return;
            }  
            if(bewrite){
                showAlert('描述不允许有特殊字符！');
                return;
            } 
            if(channel_name.length==0){
                showAlert('频道名称不能为空！');
                return;
            }
            if(channel_name.length>30){
                showAlert('频道名称不能超过60个字符！');
                return;
            }
            channel_text=channel_text.replace(/\n|\r\n/g, "<br>"); 
// 						var test_name = channel_listen_test_name(channel_name);
// 						console.log("-----------"+test_name);
// 						if(test_name){
// 								showAlert("存在相同名称的频道！");
// 							return;
// 						}
						
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
          channel_saytime = 180;
        } else {
          channel_saytime = channel_saytime.replace(/[^0-9]/ig, "");
        }
        if (channel_lineup == '无排队') {
          channel_lineup = 0;
        } else {
          channel_lineup = channel_lineup.replace(/[^0-9]/ig, "");
        }
          $(this).parent().parent().parent().slideUp();
          $(this).parent().parent().parent().next().next().slideDown('slow'); 
        $('.channel_listen_keepselect').children().eq(0).on('click', function() {
            $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
            $(this).parent().parent().slideUp('slow');
            CHANNEL_SETimgicon=true;
          })
          // $('.channel_listen_keepselect').children().eq(1).on('click',function(){
          //         $(this).parent().parent().slideUp('slow');
          //         var father=$(this).parent().parent().parent();
          //         code10302(ids,channel_name,channel_level,channel_saytime,channel_lineup,channel_text);
          //       })
      })

      /*监听详情*/
      var time = 0;
      $('.channel_details_top').click(
          function() {
            var s = $(window).height();
            var ss = s - 110;
            var a = '+' + ss + 'px';
            var aa = '-' + ss + 'px';
            var img = $(this).children('img');
            if (time == 0) {
              if ($('.tracl').css('display') == 'block') {
                traclCancel();
              }
              $(this).next("div").animate({
                height: a
              }, "500");
              img.attr('src', 'img/icon/channel/channel_listen_down.png');
              time = 1;
            } else {
              $(this).next("div").animate({
                height: aa
              }, "500");
              img.attr('src', 'img/icon/channel/channel_listen_up.png');
              time = 0;
            }
          })

        //会话下载
      $('.channel_tellallsetli').children().eq(1).children().on('click', function() {
      	listens_of_tellall = false;
      	channel_tellall2_onoff = true;
      	channel_tellall2_jilu = 0;
        var that = $('.channel_tellall1');
        var id = $(this).parent().parent().parent().parent().parent().attr('id');
        if (that.is(":hidden")) {
          $(this).attr('src','img/icon/newicon/help_downloads.png');
          $("input[name='channeltelllistall']").prop("checked", false);
          $('.channeltellltotal').text('0');
          $('.channel_tell_downfooter button').attr('disabled','disabled');
          $('.channel_tell_downfooter button').removeClass('HelpReads');
          that.slideDown('slow');
          channeltell10600(id);
        } else {
          $(this).attr('src','img/icon/newicon/help_download.png');

          that.slideUp('slow');
          /*会话fint*/
          $('.channel_Timetotal').hide();
          $('.channel_TimeStarthour div').hide();
          $('.channel_TimeOverhour div').hide();
          $('.channel_tell_filter ').hide();
          $('.channel_tell_logos ').css('background-image','url(img/icon/channel/channel_search1.png');
          $('.channel_tellall2').height($(window).height() - 354);
          $('.channel_tell_filtertype li').each(function() {
            $(this).removeClass('channel_tell_typebg');
          })
          $('.channel_telltimeselect li').each(function() {
            $(this).removeClass('channel_tell_typebg');
          })
        }
      })


      /*交通一队筛选功能*/
      $('.channel_listen_logos').on('click', function() {
        var that = $(this).parent().next();
        if (that.css('display') == 'none') {
          $('.channel_listentimecenter').hide();
          $('.channel_listentimecenters').hide();
          $('.channel_listentype').children().removeClass('channel_listentypecbg');
          $('.channel_listentimes').children().removeClass('channel_listentimesbg');
          that.slideDown('slow');
          $('.channel_listens2').height($(window).height() - 495);
          $(this).css("background-image", "url(img/icon/channel/channel_search2.png)");
          var date = new Date();
          var timeto = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
          $('#Channel_Timeval').val(timeto);
          $('#Channel_Timevals').val(timeto);
        } else {
          that.slideUp('slow');
          $(this).css("background-image", "url(img/icon/channel/channel_search1.png)");
          $('.channel_listens2').height($(window).height() - 358);
          that.slideUp('slow');
          $('.channel_listentimecenters').hide();
          $('.channel_listentimecenter').hide();
          $('.channel_listentimevals div').hide();
          $('.channel_listentype li').each(function(i) {
            $(this).removeClass('channel_listentypecbg');
          })
          $('.channel_listentimes li').each(function(i) {
            $(this).removeClass('channel_listentimesbg');
          })
        }
      })
      $('.channel_tell_logos').on('click', function() {
        var that = $(this).parent().next();
        if (that.css('display') == 'none') {
          $('.channel_Timetotal').hide();
          $('.channel_tell_filtertype').children().removeClass('channel_tell_typebg');
          $('.channel_telltimeselect').children().removeClass('channel_tell_typebg');
          $('.channel_tellall2').height($(window).height() - 490);
          that.slideDown('slow');
          $(this).css("background-image", "url(img/icon/channel/channel_search2.png)");
        } else {
          $('.channel_tellall2').height($(window).height() - 340);
          that.slideUp('slow');
          $(this).css("background-image", "url(img/icon/channel/channel_search1.png)");
          /*会话fint*/
          $('.channel_Timetotal').hide();
          $('.channel_TimeStarthour div').hide();
          $('.channel_TimeOverhour div').hide();
          $('.channel_tell_filtertype li').each(function() {
            $(this).removeClass('channel_tell_typebg');
          })
          $('.channel_telltimeselect li').each(function() {
            $(this).removeClass('channel_tell_typebg');
          })
        }
      })

      /*频道会话 选项*/
      // $('.channel_topcenter').children().on('click',function(){
      //      if ($(this).is('.channel_color')) {
      //        }else{
      //         $(this).addClass('channel_color').siblings().removeClass('channel_color');
      //           if($(this).html()=='频道') {
      //               $('.channel_main').show();
      //               $('.channel_main_tell').hide();
      //               $('.channel_found').show();
      //               $('.channel_found_tell').hide();
      //               $('#chantellsearch').hide();
      //               $('#chansearch').show();
      //               $('.channel_tellall').hide('slow');
      //            }else {
      //              $('.channel_main').hide();
      //              $('.channel_main_tell').show();
      //              $('.channel_found').hide();
      //              $('.channel_found_tell').show();
      //               $('#chansearch').hide();
      //               $('#chantellsearch').show();
      //               $('.channel_box2').hide('slow');
      //           }
      //      }
      // })
      // 增加成员的时候删除成员
      $('.channel_removelist').on('click', function() {
          $(this).parent().remove();
        })
        //点击滑动
      $('.channel_listenfooterauto').on('click', function() {
          var cid = $('.channel_box2').attr('id');
          cid = cid.slice(0, cid.length - 1);
          var left = $(this).children().css('left');
          if (left == '2px') {
            // $(this).children().animate({left: '35px'},"slow");
            // $(this).children().css('background-color','#4AC663');
            // session_lock_opt(cid, 1);
            // $(this).attr('lock',cid);
            chatLockSetting(cid);
          } else {
            chatUnlockSetting(cid);
            // session_lock_opt(cid, 0);
            // $(this).children().animate({
            //   left: '2px'
            // }, "slow");
            // $(this).children().css('background-color', '#A9A59F');
            // $(this).attr('lock', '0');
          }
        })
        //点击滑动 添加频道文字编辑功能
        $(".channel_listen_select").hover(function(){
              $(this).children('span').show();
        },
          function(){
            $(this).children('span').hide(); 
         });
         $(".channel_telllisten_select").hover(function(){
              $(this).children('span').show();
        },
          function(){
            $(this).children('span').hide(); 
         });
      $('.channel_listen_select').on('click', function() {
        var left = $(this).children('div').css('left');
        if (left == '2px') {
          // if (!luYin) {//jiba
          //   return showAlert('请先结束录音！')
          // }
          $(this).children('div').animate({
            left: '25px'
          }, "slow");
          $('.file_input_box').hide();
          $(this).children('div').css('background-color', '#00FF00');
          // $(this).removeClass('channelbor');
          $(this).children('span').html('点击切换到消息');
          $('.channel_listenwrite').hide();
          $('.channel_listensay').show();
        } else {

          $(this).children('div').animate({
            left: '2px'
          }, "slow");
          $('.file_input_box').show();
          // $(this).addClass('channelbor');
          $(this).children('div').css('background-color', '#A9A59F');
          $(this).children('span').html('点击切换到对讲');
          $('.channel_listensay').hide();
          $('.channel_listenwrite').show();

        }
      })
      $('.channel_telllisten_select').on('click', function() {
          var left = $(this).children('div').css('left');
          if (left == '2px') {
            $(this).children('div').animate({
              left: '25px'
            }, "slow");
            $('.file_input_box1').hide();
            // $(this).removeClass('channelbor');
            $(this).children('div').css('background-color', '#00FF00');
            $(this).children('span').html('点击切换到消息');
            $('.channel_telllistenwrite').hide();
            $('.channel_telllistensay').show();
          } else {
            $(this).children('div').animate({
              left: '2px'
            }, "slow");
            $('.file_input_box1').show();
           // $(this).addClass('channelbor');
            $(this).children('div').css('background-color', '#A9A59F');
            $(this).children('span').html('点击切换到对讲');
            $('.channel_telllistensay').hide();
            $('.channel_telllistenwrite').show();
          }
        })
        /*频道和会话筛选*/
      $('.channel_listentype li').on('click', function() {
        if ($(this).hasClass('channel_listentypecbg')) {
          $(this).removeClass('channel_listentypecbg');
        } else {
          $(this).addClass('channel_listentypecbg');
        }
      })
      $('.channel_tell_filtertype li').on('click', function() {
        if ($(this).hasClass('channel_tell_typebg')) {
            $(this).removeClass('channel_tell_typebg');
         } else {
          $(this).addClass('channel_tell_typebg');
        }
      })

      $('.channel_listentimes li').on('click', function() {
          if ($(this).hasClass('channel_listentimesbg')) {
            $(this).removeClass('channel_listentimesbg');
            if ($(this).hasClass('channel_Date')) {
              $('.channel_listens2').height($(window).height() - 495);
              $('.channel_listentimecenter').slideUp('slow');
              $('.channel_listentimecenters').slideUp('slow');
            }
          } else {
            $(this).addClass('channel_listentimesbg').siblings().removeClass('channel_listentimesbg');
            if ($(this).hasClass('channel_Date')) {
              $('.channel_listens2').height($(window).height() - 585);
              $('.channel_listentimecenter').slideDown('slow');
              $('.channel_listentimecenters').slideDown('slow');
            } else {
              $('.channel_listens2').height($(window).height() - 495);
              $('.channel_listentimecenter').slideUp('slow');
              $('.channel_listentimecenters').slideUp('slow');
            }
          }
        })
        // $('.channel_listentype li').on('click',function(){
        //     if($(this).hasClass('channel_listentypecbg')){
        //       $(this).removeClass('channel_listentypecbg');
        //     }else{
        //       $(this).addClass('channel_listentypecbg').siblings().removeClass('channel_listentypecbg'); 
        //     }
        // })

      $('.channel_telltimeselect li').on('click', function() {
          if ($(this).hasClass('channel_tell_typebg')) {
            $(this).removeClass('channel_tell_typebg');
            if ($(this).hasClass('channel_tellDate')) {
              $('.channel_tellall2').height($(window).height() - 490);
              $('.channel_Timetotal').slideUp('slow');
              $('.channel_TimeStarthour div').hide();
              $('.channel_TimeOverhour div').hide();
            }
          } else {
            $(this).addClass('channel_tell_typebg').siblings().removeClass('channel_tell_typebg');
            if ($(this).hasClass('channel_tellDate')) {
              $('.channel_tellall2').height($(window).height() - 490);
              $('.channel_Timetotal').slideDown('slow');
            } else {
              $('.channel_tellall2').height($(window).height() - 490);
              $('.channel_Timetotal').slideUp('slow');
              $('.channel_TimeStarthour div').hide();
              $('.channel_TimeOverhour div').hide();
            }
          }
        })
        /******************具体时间******************/


      
      var luYinStart;
      $('.channel_listenwritespends').on('click', function() {
        var chatId = $('.channel_box2').attr('id');
        chatId = chatId.slice(0, chatId.length - 1);
        
        if (luYin) {
          luYinStart = Date.now();
          session_message_rec_start(chatId);
          // $(this).children('strong').html('再次点击发送');
          // $(this).css('background-color', '#4AC663');
          // luYin = false;
        } else {
          var end = Date.now();
          // $(this).children('strong').html('点击留言');
          // $(this).css('background-color', '#F9890C');
          // luYin = true;
          
          if (end - luYinStart < 1000) {
            session_message_rec_stop(chatId, 1);
            return showAlert('录音时长不得低于1秒！')
          } else {
             session_message_rec_stop(chatId, 0);
          }
         
        }
        
      })

      
      $('.channel_telllistenwritespends').on('click', function() {
        var target = $('.channel_telllistenwritespends');
        var chatId = $('.channel_tellall').attr('id');
        chatId = chatId.slice(0, chatId.length - 1);
        var foo = function() {
          session_message_rec_stop(chatId, 0);
        };
    
        if (luYin1) {
          session_message_rec_start(chatId);
          target.children('strong').html('再次点击发送');
          target.css('background-color', '#4AC663');
          luYin1 = false;
        } else {
          setTimeout(foo, 1000);
          target.children('strong').html('点击录音');
          target.css('background-color', '#F9890C');
          luYin1 = true;
        }
      })
		
      //创建频道点击事件
      $('.channel_found').on('click', function() {
      	  $("#channerAddtree").empty();
          $('.channel_creattopadd').hide();
          $('.channel_creattop').show();

          gChannelCreate = true;
          treeAddUsers.clear();
          $('#channelcreatname').val('');
          $('#channelbewrite').val(''); 
          $('#channel_addman').hide();
          $('.channel_addfooter').children('.fr').show();
          $('#channel_addlist').empty();
          $('.channel_creat').height($('.wrap').height()-80);
          $('.channel_container').height($('.wrap').height() - 186);
          $('.channel_addchannel').height($('.wrap').height() - 81);
          $('.channel_coverleft').height($('.wrap').height() - 80);
           $('.channel_addchannelfooter').height($('.wrap').height() - 240);
          $('.channel_creat').show();
          $('#bg-color').show();
          $('.channel_creatselect').show();
          var val2 = $('.channel_searchbox').children('.channel_search').val('');
          var val = '';
          $('#ChannelAdduser').find('input').attr('checked', false);
          ChannelUserSea(val, val2);
          initChannelTrees();
          channelcreatfinte();
          zTreeOnAsyncSuccess('channerAddtrees');
        })
        //挑选成员 取消
      $('.channel_addfooter').children().eq(0).on('click', function() {

       // $('.media_selectremove').children('h3').html('确认取消创建频道？');
       //  $('.media_selectremove').children('h3').attr('class','channelcre');
       // var media_imgh = $('.media_selectremove').outerHeight();
       // var media_imgw = $('.media_selectremove').outerWidth();
       // var meidia_screenh = $(window).height();
       // var meidia_screenw = $(window).width();
       // var media_left =(Number(meidia_screenw)-Number(media_imgw)) /2;
       // var media_top =(Number(meidia_screenh)-Number(media_imgh))/2;
       // $(".media_selectremove").css("top", media_top);
       // $(".media_selectremove").css("left", media_left);
       // $('.media_selectremove').show();
       // $('.channel_coverall').show();

		  $('.User_Alls').hide();      
          $('.ul_ztree').show();
          treeAddUsers.clear();
          $(this).parent().parent().hide();
          $(this).parent().parent().prev().hide();
          $('#bg-color').hide();
          $('.channel_left1').show();
          $('.channel-add-members').children('img').attr('src','img/icon/newicon/help_add.png');
        })
        //选完成员 点击下一步 
      $('.channel_addfooter').children('.fr').on('click', function() {
          var channel_manmsg = [];
          var channel_id = [];
          var channel_level = [];
          var UL_len=$('#channel_addlist').children().length;
          if(UL_len==0){
             showAlert('请选择用户！');
             return;
          }

          if(UL_len>499){
             showAlert('频道用户不能超过500人！');
             return;
          }
          $('#channel_addlist>li').each(function(i) {
            channel_id[i] = $(this).attr('name');
            channel_level[i] = $(this).find('.channnel_manpower').html();
          })
          for (var i = 0; i < channel_level.length; i++) {
            if (channel_level[i] == '高') {
              channel_level[i] = 0;
            } else if (channel_level[i] == '中') {
              channel_level[i] = 1;
            } else if (channel_level[i] == '低') {
              channel_level[i] = 2;
            } else if (channel_level[i] == '仅听') {
              channel_level[i] = -1;
            }
          }
          for (var i = 0; i < channel_level.length; i++) {
            channel_manmsg[i] = {
              "Uid": "" + channel_id[i] + "",
              "Level": channel_level[i]
            };
          }
         
          channel_manmsg1 = JSON.stringify(channel_manmsg);
          $(this).parent().parent().next().show();
          $(this).parent().parent().prev().prev().show();
          //$('.creat_channel').css("color","#A9A59F");
          //$('.creat_channel').css("border","1px solid #A9A59F");
          $(".creat_channel").removeClass("creat_channel_s");
          $(".creat_channel").addClass("creat_channel_a");
          $('#channelcreatname').on('keyup', function() {
          	if($('#channelcreatname').val()==""){
          		$(".creat_channel").attr('disabled',true);
          		$(".creat_channel").addClass("creat_channel_a");
          		$(".creat_channel").removeClass("creat_channel_s");
          	}else{
          		$(".creat_channel").attr('disabled',false);
          		$(".creat_channel").addClass("creat_channel_s");
          		$(".creat_channel").removeClass("creat_channel_a");
          	}
          })
        })
        //频道设置 点击上一步
      $('.channel_addchannelsetprev').on('click', function() {
        $(this).parent().parent().hide();
        $('.channel_coverleft').hide();
      })

      
      

      $('.channel_addchannelsetsure').children().eq(0).on('click', function() {
        //取消創建頻道
        //
        
        $('.media_popremove').hide();
        $('.channel_popremove').show();
        $('.channel_addchannel').css('z-index','9999');
        $('.channel_creatselect').css('z-index','9998');
        // $('.media_selectremove').children('.media_popremove').children().eq(1).show();
        // $('.media_selectremove').children('.media_popremove').children().eq(2).hide();
        $('.media_selectremove').children('h3').attr('class','meidadwn');
        $('.media_selectremove').children('h3').html('确认取消创建频道？');
        var media_imgh = $('.media_selectremove').outerHeight();
        var media_imgw = $('.media_selectremove').outerWidth();
        var meidia_screenh = $(window).height();
        var meidia_screenw = $(window).width();
        var media_left = (Number(meidia_screenw) - Number(media_imgw)) /2;
        var media_top = (Number(meidia_screenh) - Number(media_imgh))/2;
        $(".media_selectremove").css("top", media_top);
        $(".media_selectremove").css("left", media_left);
        $('.media_selectremove').show();
        $('.channel_popremove').children().eq(0).on('click', function() {
        $(this).parent().parent().hide();
        $('.channel_addchannel').css('z-index','10005');
        $('.channel_creatselect').css('z-index','10000');
     })

        //結束
      	// $('.User_Alls').hide();      
       //  $('.ul_ztree').show();
       //  treeAddUsers.clear();
       //  $(this).parent().parent().parent().hide();
       //  $(this).parent().parent().parent().prev().hide();
       //  $(this).parent().parent().parent().prev().prev().hide();
       //  $(this).parent().parent().parent().prev().prev().prev().hide();
       //  $('#bg-color').hide();
       //  $('.channel_left1').show();
      })
      $('#channel_addman').on('click', function(){
      	 
          
          //    var channel_addmanmsg=[];
          //    var channel_addid=[];
          //    var channel_addlevel=[];
          //    // var channel_addname=[];
          var obj = $(this);
          //   $('#channel_addlist>li').each(function(i){    
          //      channel_addid[i]=$(this).attr('name');
          //      channel_addlevel[i]=$(this).find('.channnel_manpower').html();
          //      // channel_addname[i]=$(this).children('i').html();
          //   })
          //    for (var i=0;i<channel_addlevel.length;i++) {
          //        if(channel_addlevel[i]=='高'){
          //           channel_addlevel[i]=0;
          //        }else if(channel_addlevel[i]=='中'){
          //           channel_addlevel[i]=1;
          //        }else if(channel_addlevel[i]=='低'){
          //           channel_addlevel[i]=2;
          //        }else if(channel_addlevel[i]=='仅听'){
          //           channel_addlevel[i]=-1;
          //        }
          //   }
          // for (var i=0;i<channel_addlevel.length;i++) {
          //      channel_addmanmsg[i]={"Uid":""+channel_addid[i]+"","Level":channel_addlevel[i]};
          //    }
          //  channel_addmanmsg1=JSON.stringify(channel_addmanmsg); 
          var channel_Addid1 = channel_Addid;
          //           channel_Addid='';
          // codeadd10303(channel_Addid1,channel_addmanmsg1,obj);
          codeadd10303(channel_Addid1, obj);
          $('.channel-add-members').children('img').attr('src','img/icon/newicon/help_add.png');
        })
        //会话二级菜单
      $('.channel_tellallsetshow').on('click', function(event) {
          var obj = $(this).parent().parent().next('.channel_telllisten_write');
          if ($(obj).is(":hidden") && $('.channel_telllisten_removes').is(":hidden")) {
            $(obj).slideDown('slow');
            $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_sets.png');
            CHANNELTELL_SETimgicon=false;
          } else {
            $(obj).slideUp('slow');
            $('.channel_telllisten_removes').slideUp('slow');
            $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png');
            CHANNELTELL_SETimgicon=true;

          }
          event.stopPropagation();
        })
       $('.channel_tellallsetshow').hover(function() {
          if(CHANNELTELL_SETimgicon){
            $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_sets.png');
          }
       }, function() {
         if(CHANNELTELL_SETimgicon){
            $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png');
          }
       });
        //修改会话名称
      $('.channel_tellkeepname').on('click', function() {
          var channel_tellid;
          var channel_tellname = $('#channel_telllistenname').val().trim();
          var channel_tellid1 = $(this).parent().parent().parent().attr('id');
          var creatcall=0;
           // alert(channel_tellid1);
           // alert(JSON.stringify(callArrList[0].Id));
           // return;
           if(channel_tellid1==''){
             channel_tellid=callArrList[0].Id;
           }else{
            creatcall=1;
            channel_tellid = channel_tellid1.substring(0, channel_tellid1.length-1);
           }
          var father = $(this).parent();
          var channel_tellnames=RegeMatchValC(channel_tellname);
          if(channel_tellnames){
                showAlert('会话名称不允许有特殊字符！');
                return;
            } 
          if (channel_tellname == '') {
            common._coverShow("会话名称不能为空!");
            setTimeout(function() {
              common._coverHide();
            }, 2000);
            return;
          }
          if(channel_tellname.length>30){
              common._coverShow("会话名称不能超过60个字符！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)   
                return;     
          }
          $('.cover_loading').show();
          CHANNELTELL_SETimgicon=true;
          var body = '{"Code":"10308","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_tellid + '","ConversationName":"' + channel_tellname + '"}}';
          console.log('临时会话'+body+'');
          var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
          $.post('' + URI + '',
            function(ret) {
              var resp = decodeURIComponent(ret, 'UTF-8');
              var obj = $.parseJSON(resp);
              if (obj.Result == 200) {
                 $('.cover_loading').hide();
                $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png')
                $('#' + channel_tellid).children('div').children('i').html(channel_tellname);
                $('#' + channel_tellid).children('div').children('i').attr('title',''+channel_tellname+'');
                $(father).hide();
                var channel_tellids = channel_tellid + 'a';
                $('#' + channel_tellids).find('.channel_telllevel2name').find('i').html(channel_tellname);
                 $('#' + channel_tellids).find('.channel_telllevel2name').find('i').attr('title',''+channel_tellname+'');
                
                 common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  修改会话名称成功!");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);
                // console.log('本地数据'+JSON.stringify(callArrList)+'');
                if(creatcall!=1){
                     // tellreashmamber(channel_tellid,channel_tellname);
                }
                for (var i = 0, len = callArrList.length; i < len; i++) {
                  if (callArrList[i].Id == channel_tellid) {
                    callArrList[i].Name = channel_tellname;
                  }
                }
              } else if (obj.Result == 411) {
                $('.cover_loading').hide();
                common._coverShow("该名称已存在，请重新命名！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              } else if (obj.Result == 404) {
                $('.cover_loading').hide();
                common._coverShow("您不是该会话创建者，无权限！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              } else if (obj.Result == 410) {
                $('.cover_loading').hide();
                common._coverShow("会话名称不能超过60个字符！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              } else {
                console.log(JSON.stringify(obj));
                $('.cover_loading').hide();
                common._coverShow("修改名称失败！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000)
              }
            })
        })
        //解散会话
      $('.channel_telldisbanded').on('click', function() {
        var channel_id;
        $(this).parent().slideUp('slow');
        $(this).parent().next().slideDown('slow');
      })
      $('.channel_telllisten1').on('click', function() {
        $(this).parent().parent().slideUp('slow');
        CHANNELTELL_SETimgicon=true;
      })
      $('.channel_telllisten_removeselect').on('click', '.fr', function() {
          var father = $(this).parent().parent();
          var grandfather = $(this).parent().parent().parent().parent().attr('id');
          if(grandfather==''){
             channel_id=callArrList[0].Id;
          }else{
              var len = grandfather.length;
                  channel_id = grandfather.substring(0, len - 1);
          }
          CHANNELTELL_SETimgicon=true;
          var body = '{"Code":"10307","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_id + '"}}';
          // console.log(JSON.stringify(body));
          var creator = '';       
          var helpwu='<h3 class="help_wu">暂无数据</h3>';
          
          // for (var i = 0, len = callArrList.length; i < len; i++) {
          //   if (callArrList[i].Id === channel_id) {
          //     creator = callArrList[i].Creator;
          //   }
          // }
       
          $('.cover_loading').show();
          $.getJSON('' + STATION_URL + '?Body=' + body + '',
            function(ret) {
              if (ret.Result == 200) {
                $('.cover_loading').hide();
                $('.channel_telllisten_removes').hide();
                $('.channel_right1').show();
                $('#' + channel_id).remove();
                $('#' + grandfather).hide();
                var metell=$('#chantell_ul').html();
                var othertell=$('#chantell_otherul').html();
                common._coverShow("已解散");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);
                if(metell==''&&othertell==''){
                  // console.log('该元素下无内容');
                  // $('#chantell_ul').append(helpwu);
                }
                for (var i = 0, len = callArrList.length; i < len; i++) {
                  if (callArrList[i].Id === channel_id) {
                    callArrList.splice(i, 1);
                    break;
                  }
                }
                var session = sessionGetById(channel_id);
                if (session) {
                  session_call_bye(channel_id);
                }
              } else if(ret.Result == 404){
                $('.cover_loading').hide();
                 showAlert('您不是创建者，不能解散此会话！');
                // alert('操作失败,错误码：' + ret.Result);
              }else{
                  $('.cover_loading').hide();
                  showAlert('解散失败！');
              }
            })
        })
        //创建会话
      $('.channel_found_tell').on('click', function() {
         $('.channel_tellcreattopadd').hide();
         $('.channel_tellcreattop').show();
          gChannelCreate = true;
					channel_creates = false;
          treeAddUsers.clear();
          $('.channel_telladdfooter').children('.fr').show();
          $('#channel_telladdman').hide();
          $('#channel_telladdlist').empty();
          $('.channel_tellcreat').height($('.wrap').height() - 80);
          $('.channel_tellcontainer').height($('.wrap').height() - 176);
          $('.channel_coverleft').height($('.wrap').height() - 80);
          $('.channel_telladdul').height($('.wrap').height() - 262);
          $('#bg-color').show();
          $('.channel_tellcreat').show();
          $('.channel_tellcreatselect').show();

          var val2 = $('.channel_tellsearchbox').children('.channel_tellsearch').val('');
          var val = '';
          $('#ChannelTellAdduser').find('input').attr('checked', false);
          ChannelTellUserSea(val, val2);

          initChannelTree();
          zTreeOnAsyncSuccess('channeltellAddtree');
        })
        //取消创建会话 
      $('.channel_telladdfooter').children().eq(0).on('click', function() {
//    	  var arr = "确认取消创建会话吗？";
//    	  var cs = this;
//    	  common._Box_on_or_off(arr,1,cs);
          treeAddUsers.clear();
          $(this).parent().parent().hide();
          $(this).parent().parent().prev().hide();
          $('#bg-color').hide();
          $('.channel_left1').show();
             $('.channel_tellallsetli ').children().eq(2).children('img').attr('src','img/icon/newicon/help_add.png');
        })
        //选中成员 点击下一步
      $('.channel_telladdfooter').on('click', '.fr', function() {
        var tellname=[];
          
          var ullen=$('#channel_telladdlist').children();
          if(ullen.length==0){
               showAlert('请选择用户！');
               return;
              // var tellnames=$('#company_name').html();
                  // $('#channel_tellname').val(tellnames);
          }
          if(ullen.length>0){
             for(var i=0;i<ullen.length;i++){
                  if (i<2) {
                     var ella=$('#channel_telladdlist').children().eq(i).children('i').text();
                     tellname.push(ella);
                  }
             }
           $('#channel_tellname').val(tellname);
          }
          $('.channel_coverleft').show();
          $('.channel_telladdchannel').show();
          channel_tellname_val = tellname;
          $("#channel_tellname").focus(function(){
          	if($('#channel_tellname').val()==tellname){
          		$('#channel_tellname').val("");
          	}
		  });
          
		   
        })
        //创建会话点击上一步
      $('.channel_telladdchannelsetprev').on('click', function() {
          $(this).parent().parent().hide();
          $('.channel_coverleft').hide();
        })
        //点击取消
      $('.channel_telladdchannelsetsure').children().eq(0).on('click', function() {
//    	  var arr = "确认取消创建会话吗？";
//    	  var cs = this;
//    	  common._Box_on_or_off(arr,3,cs);
          treeAddUsers.clear();
          $(this).parent().parent().parent().hide();
          $(this).parent().parent().parent().prev().hide();
          $(this).parent().parent().parent().prev().prev().hide();
          $('.channel_coverleft').hide();
          $('#bg-color').hide();
        })
        //点确认 创建频道
      $('.channel_telladdchannelsetsure').on('click', '.fr', function() {
          var objs = $(this);
          var channel_tellname = $('#channel_tellname').val().trim();
          var channel_tellnames=RegeMatchValC(channel_tellname);
          if (channel_tellnames){
             showAlert('会话名称不允许有特殊字符！');
             return;
          } 
          if (channel_tellname == '') {
            common._coverShow("会话名称不能为空!");
            setTimeout(function() {
              common._coverHide();
            }, 2000);
            return;
          }
          var channel_telluser = [];
          var channel_tellusers = '';
          $('#channel_telladdlist>li').each(function(i) {
            channel_telluser[i] = $(this).attr('name');
          })
          channel_tellusers = JSON.stringify(channel_telluser);
          var body = '{"Code":"10306","Body":{"SessionId":"' + sessionId + '","ConversationName":"' + channel_tellname + '","Members":' + channel_tellusers + ',"Match":0}}';
          console.log('会话创建'+body);
          // return;
          /*********开始******/
          var arrmsg=[channel_tellname,channel_tellusers,objs];
          var conword='创建会话失败';
        AjaxPostMsg(body, AJAXSET_TIME, TellPostCreat, MediaErrorDown, MediaAjaxovertime, true, arrmsg, conword);
         /*****结束*******/
        addhuihua_set =true;
        channel_tellusers = channel_tellusers.substring(2,channel_tellusers.length-2);
        var stryarr = channel_tellusers.split(",");
        for(var i=0;i<stryarr.length;i++){
        	addhuihua_set_username += usersAll.get(stryarr[i].substring(2,stryarr[i].length-2)).Name+",";
        }
        addhuihua_set_username = addhuihua_set_username.substring(0,addhuihua_set_username.length-1);
        
        })
        //增加会话成员
      $('#channel_telladdman').on('click', function() {
          var objs = $(this);
          var channel_telladdid = [];
          var channel_telladdname = [];
          var uladdlen=$('#channel_telladdlist').children().length;
          var openChat = [];
          // $('.channel_tellallsetli ').children().eq(1).children('img').attr('src','img/icon/newicon/help_add.png'); 
          if(uladdlen==0){
              showAlert('请选择添加用户!');
              return;
          }
          $('.chatOpenOnly').children('ul').children('li').each(function() {
            openChat.push($(this).attr('name'));
          })
          $('#channel_telladdlist>li').each(function(i) {
            var liName = $(this).attr('name');
            if (openChat.indexOf(liName) === -1) {
              channel_telladdid.push(liName);
              channel_telladdname.push($(this).children('i').html());
            }
            // channel_telladdid[i] = $(this).attr('name');
            // channel_telladdname[i] = $(this).children('i').html();
          })
          if (channel_telladdid.length === 0) {
            return showAlert('请勿重复添加成员!');
          }
         
          $('.cover_loading').show();
          var body = '{"Code":"10309","Body":{"SessionId":"' + sessionId + '","ConversationId":"' + channel_tellAddid + '","Action":"0","Members":[' + channel_telladdid + ']}}';
          var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
          // console.log(body)
          $.post('' + URI + '',
            function(ret) {
              var resp = decodeURIComponent(ret, 'UTF-8');
              var obj = $.parseJSON(resp);
              if (obj.Result == 200) {
                 $('.cover_loading').hide();
                var htmls1 = '';
                for (var i = 0; i < channel_telladdid.length; i++) {
                   htmls1  += '<li name="' +channel_telladdid[i]+ '" tellname="' + channel_telladdid[i].Name + '"><div class="channel_telllevel2_name"><img src="img/chat/outline.png" alt=""><i class="chat_memers">' + channel_telladdname[i] + '</i></div><div class="channel_telllevel2_show"><img onclick="channel_call_snapchat(\'' + channel_telladdid[i] + '\', \'' + channel_telladdname[i]+ '\')" src="img/icon/userIcon/user_phone.png" title="呼叫"><img onclick="channel_positon_get(\'' + channel_telladdid[i] + '\')" src="img/icon/userIcon/user_location.png" title="定位"><img onclick="channel_video_pull(\'' + channel_telladdid[i] + '\', \'' + channel_telladdname[i] + '\')" src="img/icon/userIcon/user_video.png" title="视频"><img src="img/icon/userIcon/user_bi.png" class="channel_level3_write" title="编辑" onclick="channeltell_memberset(this)"><img src="img/icon/channel/channeldes.png" title="移除" onclick="canneltell_memnersets(this)"/></div>' +'<div class="channel_set"><span class="tellchannel_pho_up"><img src="img/icon/pho_up.png" alt=""></span><p>会话中设置</p><div class="channel_set_remove" onclick="channel_remove10309(this)">移除成员</div><div class="channel_more_set" onclick="channeltell_moreset(this)">更多设置<img src="img/icon/channel/channel_select3.png" alt=""></div>' +'<div class="channel_message"><h6>用户资料</h6><p class="fix channel_messageid ">用户ID<i class="fr"></i></p><div class="channel_message_user channel_messagename"><span>备注名</span><input type="text" name="" id="" value="" maxlength="15" placeholder="最大长度为15个汉字"></div><div class="channel_message_user channel_messagephone"><span>手机号</span><input type="text" name="" class="fr" id="" value="" maxlength="11"></div><div class="channel_message_user channel_messagexiang"><span>邮箱</span><input type="text" name="" class="fr" id="" value=""></div><h6>应答状态</h6><p>应答状态：<i class="channelfaze">免打扰未启动</i></p><p>应答模式：<i class="channelanswer">手动应答</i></p><div class="channel_message_keeps" onclick="channeltellmsgret(this)">保存</div><h6>修改密码</h6><div class="channel_message_password"><span>新密码</span><input type="password" id="" name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_password"><span>确认密码</span><input type="password" id="" name="" placeholder="密码长度为8~15位" maxlength="15"></div><div class="channel_message_passwordbtn" onclick="channel_retpassword(this)">保存密码</div><div class="channel_message_passwordbtn" onclick="CHannelRET(this)">重置密码</div><div class="channel_message_hide" onclick="channel_moresethide(this)">更多设置<img src="img/icon/channel/channel_select4.png" alt=""></div></div>' +'</div><div class="channel_remove_select"><span class="tellchannel_pho_ups"><img src="img/icon/pho_up.png" alt=""></span><p>确认移除该成员?</p><div><span class="channel_remove_select2" onclick="chanelprev(this)">取消</span><span class="channel_remove_select3 fr" onclick="channel_tellremove309(this)">确认</span></div></div></li>';               
                }
                $('#' + channel_tellAddid).children('.channel_level2').append(htmls1);
                channeltell_hover();
                $(objs).parent().parent().hide();
                $(objs).parent().parent().prev().hide();
                $('#bg-color').hide();
                // common._coverShow("增加成员成功!");
                 common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  已添加");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);

                channel_telladdid.forEach(function (item) {
                  currentChatMembers.push({Uid: item})
                })
                treeAddUsers.clear();
                
              } else if (obj.Result == 402) {
                 $('.cover_loading').hide();
                common._coverShow("您不是该会话创建者,无权限！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);

              } else {
                $('.cover_loading').hide();
                common._coverShow("操作失败！");
                setTimeout(function() {
                  common._coverHide();
                }, 2000);
              }
            })
        })
        /**************************左右栏*****************/
      $('.channel2_left').on('click', function() {
        if (!luYin) {
          $('.channel_listenwritespends').trigger('click');
        }
        var target = $('.channelSelectedonly');
        var cid = target.attr('id');
        target.children('ul').css('display', 'none');
        target.removeClass('channelSelectedonly');
        //左推，监听图标改变
        var lockid = chatLockidGet(); 
        if (lockid === cid) {
           chatUnlockSetting(cid);
        }

        $('#' + cid).find('.channel_mr').attr('src', 'img/icon/channel/channel_nolisten.png');
        $('.' + cid + 'monitorimg').attr({
        'src': 'img/chat/chat_unmonitor.png',
        'state': 0 
        });
        
        session_channel_exit(cid);
        //以上挂断频道，11.10加
        $(this).parent().hide('slow');
        setTimeout(function() {
          $('.channel_right1').show();
        }, 700)
      })
      $('.channel_right2').on('click', function() {
        if (!luYin1) {
          $('.channel_telllistenwritespends').trigger('click')
        }
        
        if($('.channel_tellall').css("margin-left")==channel_column2){
        	//$('.channel_tellall').animate({'margin-left': '0px'});
        	$('.channel_tellall').css('margin-left','0px');
        	$('.channel_left1').css("margin-left","80px");
        	$('.channel_right1').hide();
        	$('.channel_right2').css('background-image', ' url(./img/left_icon.png)');
        }else{
        	$('.chatOpenOnly').children('div').trigger('click');
        	if($('.chatOpenOnly').length==0){
		        $('.channel_tellall').hide();
		        $('.channel_right1').show();
		        session_call_bye(callInId);
        	}
					$('.channel_main_tell').find('#' + callInId).children('div').trigger('click');
        }
        // var target = $('.chatOpenOnly');
        // var cid = target.attr('id');
        // target.children('ul').css('display', 'none');
        // target.removeClass('chatOpenOnly');
        // session_call_bye(cid);
        // //以上挂断频道，11.10加
        // $(this).parent().hide('slow');
        // setTimeout(function() {
        //   $('.channel_right1').show();
        // }, 700)
      })
      $('.channel_right1').on('click', function() {
        var fahter = $(this).parent().css('margin-left');
        if (fahter == '80px') {
          $('.channel_left1').animate({
            'margin-left': '-180px'
          })
          $(this).css('background-image', ' url(./img/right_icon.png)');
        } else {
          $('.channel_left1').animate({
            'margin-left': '80px'
          })
          $(this).css('background-image', ' url(./img/left_icon.png)');
        }
      })

      $('.channel_delete').on('click', function() {

        var INP_VAL = '';
        $(this).prev().val(INP_VAL);
        var obj=null;
        // var name='tellIN';
        // OnKeySearch(obj,name);
            $('.User_Alls').hide();      
            $('.ul_ztree').show();

      })
      $('.channel_tellsearchdel').on('click', function() {

        var INP_VAL = '';
        $(this).prev().val(INP_VAL);
        var obj=null;
        // var name='channelIN';
        // OnKeySearch(obj,name);
          $('.User_Alls').hide();      
          $('.ul_ztree').show();

      })

     $('.mian_useraskclose').click(function(){
        $(this).parent().hide();
        $('#bg-color').hide();
    })
    

    $('.mian_userAskcall').on('click','span',function(){
          var tabeltop='<tr><th>原企业</th><th>新企业</th><th>账号</th><th>时间</th><th>状态</th><th>操作</th></tr>';
          $('.main_usertable').empty().append(tabeltop);
          var trhtml='';
          var tableappcon='';
         for(var i=0;i<Mainuserlistarr.length;i++){

             if(Mainuserlistarr[i][4]==0){
                tableappcon='未处理';
             }
             trhtml+='<tr><td>'+Mainuserlistarr[i][0]+'</td><td>'+Mainuserlistarr[i][1]+'</td><td>'+Mainuserlistarr[i][2]+'</td><td>'+Mainuserlistarr[i][3]+'</td><td>'+tableappcon+'</td><td><span onclick="main_usercalllist(this)">同意</span><span onclick="main_usercalllist(this)">拒绝</span></td></tr>';
         }
         $('.main_usertable').append(trhtml);
         $('#bg-color').show();
         $('.mian_userasklist').show();
    })
    $('.channel_details_main ul').on('dblclick','li',function () {
         var ListIndexId=$(this).attr('class');
             $('#'+ListIndexId+'').children('div').click();
    })

 
    }



//2017.11.18 fu
function channelBoxHide() {
    $(document).on('click', function() {
        if ($('#station_channel').css('display') === 'block') {
            channelEventDispatch();
        }
    })


    $('.channel_listen_write').on('click', function(event) {
        event.stopPropagation();
    })

    $('.channel_listen_removes').on('click', function(event) {
        event.stopPropagation();
    })

    $('.channel_telllisten_write').on('click', function(event) {
        event.stopPropagation();
    })

    $('.channel_telllisten_removes').on('click', function(event) {
        event.stopPropagation();
    })

  
}


function channelEventDispatch() {
    channelEventMemberSet();
    channelSetAttributes();
    channelRemovesHide();
    channelRemovesMember();
    chatSetAttributes();
    chatRemovesHide();
}

//频道编辑
function channelEventMemberSet() {
    $('.channel_set').hide();   
}

//频道属性设置
function channelSetAttributes() {
    $('.channel_listen_write').hide();
    $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
}

//频道移除
function channelRemovesHide() {
    $('.channel_listen_removes').hide();
    $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
}

//频道成员移除
function channelRemovesMember() {
   $('.channel_remove_select').hide(); 
}

//会话属性设置
function chatSetAttributes() {
    $('.channel_telllisten_write').hide();
    $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png');
}

//会话移除
function chatRemovesHide() {
    $('.channel_telllisten_removes').hide();
    $('.channel_tellallsetshow').attr('src', 'img/icon/newicon/channel_set.png');
}

//2017.11.27 fu
function channelMemberSort() {
    var content = '';
    var list = $("#c-sort-ul");
    var channelid = $('.channelSelectedonly').attr('cid');
    var creator;
    for (var j=0,lon=channelAlls.length; j<lon; j++) {
        if (channelAlls[j].Id === channelid) {
            creator = channelAlls[j].Creator;
            break;
        }
    }
    if (isCurrentChannel) {
        $('.channel-set-box1').hide();
        $('.channel-set-box2').show();
        
        if (currentChannelMembers.length) {
            for (var i=0,len=currentChannelMembers.length; i<len; i++) {
                if (currentChannelMembers[i].Uid !== creator) {
                    content += '<li class="fix" data-uid="'+currentChannelMembers[i].Uid+'"><i class="fl">'+currentChannelMembers[i].Name+'</i><div class="fr sortGroupNode-logo"><i></i><i></i><i></i></div></li>'
                } 
            }
            list.empty().append(content);
        }

        var children = list.children('li');
        list.sortable();
        children.mousedown(function() {
            $(this).find('.sortGroupNode-logo').find('i').css("background", "#FF8B00")
        });
        children.mouseup(function() {
            $(this).find('.sortGroupNode-logo').find('i').css("background", "#ccc");
        });
    } else {
        return showAlert('频道成员加载中，请稍后操作...')
    }
}

function channelSortSave() {
    var arr = [],
        children = $('#c-sort-ul').children('li'),
        Id = $('.channelSelectedonly').attr('cid'),
        body;

    children.each(function() {
        arr.push($(this).attr('data-uid'))
    })
    arr1 = JSON.stringify(arr);
    body = '{"Code":11420,"Body":{"SessionId":\"' + sessionId + '\","Id":\"' + Id + '\","IdType":2,"ObjectIds":' + arr1 + '}}';
   
    coverShow();
    $.getJSON('' + STATION_URL + '?Body=' + body + '',
        function(ret) {
            coverHide();
            if (ret.Result == 200) {
                arr.unshift(loginId);
                channelSortSuccess(arr);   
                showAlert('排序成功！');  
            } else {
                showAlert('排序失败!');
            }
        }
    )    
}

function channelSortSuccess(array) {
    $('.channel_listen_write').hide();
    $('.channel_listen_setshow').attr('src', 'img/icon/newicon/channel_set.png');
    
    var channel = $('.channelSelectedonly');
    var obj = channel.children('div').eq(0);
    var grandfather = channel.parent().attr('class');
    var channel_id = channel.attr('cid');
    var arrnew = [];
    var newMembers = [];
    var members = channelInfoMap.get(channel_id).members;
   
    array.forEach(function (item) {
        for (var i=0,len=currentChannelMembers.length; i<len; i++) {
            if (currentChannelMembers[i].Uid === item) {
                arrnew.push(currentChannelMembers[i]);
                newMembers.push(members[i]);
                break;
            }
        }
    })
    channelInfoMap.get(channel_id).members = newMembers;
    currentChannelMembers = arrnew;
    refreshCurrentClList(obj, grandfather, currentChannelMembers);
    currentChanneledMembersOn(channel_id);    
}

//2017.11.28
function channel_send_pic(className) {
    var file = $('.' + className);
    var val = file.val();
    var chatId;
    var reg = /\.(jpg|jpeg|png|mp4)$/;
    var videoReg = /\.(MP4|mp4)$/;
    
    if (className === 'loadpic') {
        chatId = $('.chatOpenOnly').attr('id');
    } else {
        chatId = $('.channelSelectedonly').attr('cid');
    }

    if (val) {
        if (!reg.test(val)) {
          file.val('');
          return showAlert('请上传正确的文件格式！');
        }
        
        if(videoReg.test(val)){
        	session_message_send(chatId, MESSAGE_TYPE_VIDEO, val);
        }else{
        	session_message_send(chatId, MESSAGE_TYPE_PICTURE, val);
        }
       
    }
    
    file.val('');
}

//最后一步点击确定完成创建频道
function creat_channel() {
	var father = $('.creat_channel');
	var channel_name = $('#channelcreatname').val().trim(); //频道名称
	var channelcreatlevel = $('#channelcreatlevel').html(); //权限
	var channelcreatsay = $('#channelcreatsay').html(); //发言时长
	var channelcreatwaite = $('#channelcreatwaite').html(); //排队人数
	var channelbewrite = $('#channelbewrite').val().trim(); //描述
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
	if(channelbewrite.length>120){
		channelbewrite=channelbewrite.substr(0,120);
	}
	//权限选择
	if (channelcreatlevel == '最高') {
	// channelcreatlevel = 0;
	} else if (channelcreatlevel == '高级') {
		channelcreatlevel = 2;
	} else if (channelcreatlevel == '中级') {
		channelcreatlevel = 3;
	} else if (channelcreatlevel == '低级') {
		// channelcreatlevel = 3;
		channelcreatlevel = 4;
	} else if (channelcreatlevel == '最低') {
		// channelcreatlevel = 4;
	}
	//发言时长
	if (channelcreatsay == '无限制') {
	  channelcreatsay = -1;
	} else {
	 channelcreatsay = channelcreatsay.replace(/[^0-9]/ig, "");
	}
	//排队人数
	if (channelcreatwaite == '无排队') {
	  channelcreatwaite = 0;
	} else {
	  channelcreatwaite = channelcreatwaite.replace(/[^0-9]/ig, "");
	}
			       
	code10300(channel_name, channelcreatlevel, channelcreatsay, channelcreatwaite, channelbewrite, father);
	$('.User_Alls').hide();      
	$('.ul_ztree').show();
}
function channel_blur(){
	if($('#channel_tellname').val()==""){
				$('#channel_tellname').val(channel_tellname_val);
		}
}
function channel_onkeyup(){
	if(channel_keyTime==0){
		channel_delayed();
	}else{
		channel_keyTime = 1;
	}
}
function channel_delayed(){
	channel_keyTime = channel_keyTime+1;
	if(channel_keyTime>2){
		channel_keyTime = 0;
		channel_test_name();
		return;
	}
	channel_keyTime_repeat=setTimeout(function(){channel_delayed()},900);
}
function channel_test_name(){
	
	var val_name = $('#channel_tellname').val();
	var body = '{"Code":10317,"Body":{"SessionId":\"' + sessionId + '\","ConversationName":\"' + val_name + '\","ConversationType":\"0\"}}';
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
		console.log(ret)
			if (ret.Result == 200) {
				showAlert("存在相同名称的会话！");
			}
		});
}
// function channel_listen_test_name(val_name){
// 	var body = '{"Code":10317,"Body":{"SessionId":\"' + sessionId + '\","ConversationName":\"' + val_name + '\","ConversationType":\"1\"}}';
// 	$.ajaxSettings.async = false;
// 	$.getJSON(STATION_URL + '?Body=' + body,
// 		function(ret) {
// 		console.log(ret);
// 		return_number = ret.Result;
// 			if (ret.Result == 200) {
// 				return_number = true;
// 				console.log("存在相同名称的频道！");
// 				return true;
// 			}else{
// 				return false;
// 			}
// 		});
// }