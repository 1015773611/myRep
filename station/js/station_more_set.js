var MORE_setwriteIconcolor=true;
var MORE_setwaterIcon=true;
var MORE_setpsdIcon=true;
function more_set_start () {
  var MoreSetTime;
  var morelastlick=0;
 Map_Lineclear();
	
  var moreuserphone;
	var wh = $(window).height();
	$('.moreset_border_r').height(wh - 80);
   	$('.Heights').height(wh);
	$('.left_icon').css('top', (wh-120)/2);
  moregetcompaymsg();
    $('.moreset_top ul').children().eq(0).children('.fr').on('click',function(){
    	 var that=$(this).next()
    	 if(that.is(':hidden')) {
             MORE_setwriteIconcolor=false;
             $('.moreset_usershow').slideUp();
             $('.moresetwr').attr('src','img/icon/more_set/more_set.png');
             $('.more_set_watermarkshow').slideUp();
             $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
             $('.position_return_div').slideUp();
	     $('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
             that.slideDown('slow');
             moreuserphone=$('.seting_phone').html();
    	     $(this).children().attr('src','img/icon/more_set/more_set1.png');
           $('.moreset_phoneclick').hide();
           $('.moreset_phoneclick').html('点此获取短信验证码');
           clearInterval(MoreSetTime);
           $('.moreset_phonecode').hide();
           $('#MoreCode').val('');
           var vals=$('.seting_phone').html();
           $('#more_phone').val(vals);
           var mail=$('.seting_email').html();
           $('#more_email').val(mail);
           var name=$('.seting_name').html();
           $('#more_Name').val(name);
    	 }else {
           MORE_setwriteIconcolor=true;
    	 	  that.slideUp('slow');
    	 	  $(this).children().attr('src','img/icon/more_set/more_set.png');
    	 }
    })

    //水印设置 显示隐藏 
     $('.more_set_watermark').children('.fr').on('click',function(){
          var that=$(this).next()
       if($('.moreset_border_r').height()<610){
          if(that.is(':hidden')) {
               /****获取数据****/
               MORE_setwaterIcon=false;
               $('.position_return_div').slideUp();
						 $('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
               $('.moreset_usershow').slideUp();
               $('.moresetwr').attr('src','img/icon/more_set/more_set.png');
               $('.more_water_position1').hide();
               $('.more_water_position').children('img').attr('src','img/icon/channel/channel_select1.png');
               MoreWatergetIMG(that);
               More_setboderfint();
         }else {
           MORE_setwaterIcon=true;
           that.slideUp('slow');
           $(this).children().attr('src','img/icon/more_set/more_set.png');
         }
       }else{
         if(that.is(':hidden')) {
                 /*获取数据**/
                 MORE_setwaterIcon=false;
                 $('.more_water_position1').hide();
                 $('.more_water_position').children('img').attr('src','img/icon/channel/channel_select1.png');
                 $('.moreset_usershow').slideUp();
                 $('.moresetwr').attr('src','img/icon/more_set/more_set.png');
                 $('.position_return_div').slideUp();
						 $('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
               MoreWatergetIMG(that);
               More_setboderfint();
 
         }else{
            MORE_setwaterIcon=true;
            that.slideUp('slow');
            $(this).children().attr('src','img/icon/more_set/more_set.png');
         }
      }
    })  

   $('.morewatericon').hover(function() {
       
       if (MORE_setwaterIcon) {

            $(this).attr('src','img/icon/more_set/more_set1.png');

        }
   }, function() {

     if (MORE_setwaterIcon) {

           $(this).attr('src','img/icon/more_set/more_set.png');
        }
   })

   $('#watertext').focus(function(){
        $('.more_water_position').removeClass('more_setborder');
        $('.moreset_water_img').removeClass('more_setborder');
        $('.moreset_water_name').addClass('more_setborder');
   })
     /********修改账户密码*****/
      $('.moreset_user').children('.fr').on('click',function(){
           var that=$(this).next();
       if(that.is(':hidden')) {
             MORE_setpsdIcon=false;
              $('.moreset_userkeep ').attr('disabled','disabled');
             $('.more_set_account').slideUp('slow');
             $('.moreset_img').attr('src','img/icon/more_set/more_set.png');
             $('.more_set_watermarkshow').slideUp();
             $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
             $('.position_return_div').slideUp();
						 $('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
             that.slideDown('slow');
            $(this).children('.moresetwr').attr('src','img/icon/more_set/more_set1.png');
       }else {
             MORE_setpsdIcon=true;
            that.slideUp('slow');
            $(this).children('.moresetwr').attr('src','img/icon/more_set/more_set.png');
            $('.more_set_watermarkshow').slideUp();
            $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
            // $('.moreset_userkeep').css({'background-color':'#fff','color':'#dec1c9'});
            $('.moreset_userkeep').removeClass('more_setpsd');
            $('.moreset_userkeep').html('保存');
            // moreset_namereset ('#moreset_now','moreset_now');
            moreset_namereset1 ('#moreset_new','moreset_new');
            moreset_namereset1 ('#moreset_news','moreset_news');
            moreset_namereset1 ('#moreset_now','moreset_now');
        }
    })  
   $('.moresetwr').hover(function() {
      
       if (MORE_setpsdIcon) {

          $(this).attr('src','img/icon/more_set/more_set1.png');
       }
   }, function() {

     if (MORE_setpsdIcon) {

          $(this).attr('src','img/icon/more_set/more_set.png');  
       }
   });
   $('.moreset_img').hover(function() {
      
      if(MORE_setwriteIconcolor){
         $(this).attr('src','img/icon/more_set/more_set1.png');
      }

   }, function() {
    
      if(MORE_setwriteIconcolor){

         $(this).attr('src','img/icon/more_set/more_set.png');
      }    
   });

  $('.more_set_in').on('click',function(){
      var check=$(this).hasClass('userall_selected');
      if(check){
          $(this).removeClass('userall_selected');
      }else{
          $(this).addClass('userall_selected');
      }
  })
     
    $('#moreset_now').focus(function(){
       // $(this).select();
        $(this).parent().addClass('more_setborder');
        $(this).parent().parent().siblings().children('div').removeClass('more_setborder');
    }) 
    $('#moreset_new').focus(function(){
       // $(this).select();
       $(this).parent().addClass('more_setborder');
       $(this).parent().parent().siblings().children('div').removeClass('more_setborder');
    }) 
    $('#moreset_news').focus(function(){
       // $(this).select();
       $(this).parent().addClass('more_setborder');
       $(this).parent().parent().siblings().children('div').removeClass('more_setborder');
    }) 

    $('#more_phone').on('input propertychange',function(){
          var phonelenn=$('#more_phone').val().trim();
          if(phonelenn.length==11){
              if(phonelenn==moreuserphone){
                  $('.moreset_phoneclick ').slideUp();
              }else{
                  $('.moreset_phoneclick ').slideDown();
              }
          }else if(phonelenn.length<11){
              $('.moreset_phoneclick ').slideUp();
          }
      })
     function moreset_namereset (name,names){
       $(name).val('');
       $(name).next().hide();
       $(name).next().children().attr('src','img/icon/more_set/moreset_biyan.png');
       var  btn=document.getElementById(names);
            btn.setAttribute('type','password');
     }
     function moreset_namereset1 (name,names){
       $(name).val('');
       $(name).parent().removeClass('more_setborder');
       $(name).next().hide();
       $(name).next().children().attr('src','img/icon/more_set/moreset_biyan.png')
       var  btn=document.getElementById(names);
            btn.setAttribute('type','password');
     }
    // function moreset_namereset2 (name,names){
    //    $(name).val('');
    //    $(name).next().hide();
    //    $(name).next().children().attr('src','img/icon/more_set/moreset_biyan.png')
    //    var  btn=document.getElementById(names);
    //         btn.setAttribute('type','password');
    //  }
     
    //   function moreset_namereset3 (name,names){
    //    $(name).val('');
    //    $(name).next().hide();
    //    $(name).next().children().attr('src','img/icon/more_set/moreset_biyan.png')
    //    var  btn=document.getElementById(names);
    //         btn.setAttribute('type','password');
    //  }

    $('.moreset_usernow').children('input').focus(function(){
       $(this).next().show();
  })
  
  // var moreset_now=document.getElementById('moreset_now');
  var moreset_new=document.getElementById('moreset_new');
  var moreset_news=document.getElementById('moreset_news');
       $('#moreset_now').next().on('click',function(){
                 if($('#moreset_now').attr('type')=='password'){
                       moreset_now.setAttribute('type','text');
                      $(this).children().attr('src','img/icon/more_set/moreset_zheng.png');
                 }else {
                      moreset_now.setAttribute('type','password');
                      $(this).children().attr('src','img/icon/more_set/moreset_biyan.png');
                      }
               }) 

        $('#moreset_new').next().on('click',function(){
                 if($('#moreset_new').attr('type')=='password'){
                       moreset_new.setAttribute('type','text');
                      $(this).children().attr('src','img/icon/more_set/moreset_zheng.png');
                 }else {
                      moreset_new.setAttribute('type','password');
                      $(this).children().attr('src','img/icon/more_set/moreset_biyan.png');
                       }
               }) 
        $('#moreset_news').next().on('click',function(){
                 if($('#moreset_news').attr('type')=='password'){
                       moreset_news.setAttribute('type','text');
                      $(this).children().attr('src','img/icon/more_set/moreset_zheng.png');
                 }else {
                      moreset_news.setAttribute('type','password');
                      $(this).children().attr('src','img/icon/more_set/moreset_biyan.png');
                       }
               })  

    $('#moreset_now').on('input propertychange',function(){
          if($(this).val()!='' &&$('#moreset_new').val()!=''&&$('#moreset_news').val()!=''){
            // $('.moreset_userkeep').css({'background-color':'#FA7C01','color':'#fff'});
            $('.moreset_userkeep').addClass('more_setpsd');
            $('.moreset_userkeep').removeAttr('disabled');
            $('.moreset_userkeep').html('确认修改');
          }else{
            // $('.moreset_userkeep').css({'background-color':'#fff','color':'#dec1c9'}); 
            $('.moreset_userkeep').attr('disabled','disabled'); 
            $('.moreset_userkeep').removeClass('more_setpsd');
            $('.moreset_userkeep').html('保存');
          }
    })
        $('#moreset_new').on('input propertychange',function(){
          if($(this).val()!=''  &&$('#moreset_news').val()!=''){
            // $('.moreset_userkeep').css({'background-color':'#FA7C01','color':'#fff'});
            $('.moreset_userkeep').removeAttr('disabled');
            $('.moreset_userkeep').addClass('more_setpsd');
            $('.moreset_userkeep').html('确认修改');

          }else{
            // $('.moreset_userkeep').css({'background-color':'#fff','color':'#dec1c9'});
            $('.moreset_userkeep').attr('disabled');
            $('.moreset_userkeep').removeClass('more_setpsd');
            $('.moreset_userkeep').html('保存');


          }
    })
    $('#moreset_news').on('input propertychange',function(){
          if($(this).val()!='' &&$('#moreset_new').val()!='' ){
            // $('.moreset_userkeep').css({'background-color':'#FA7C01','color':'#fff'});
            $('.moreset_userkeep').removeAttr('disabled');
            $('.moreset_userkeep').addClass('more_setpsd');
            $('.moreset_userkeep').html('确认修改');

          }else{
            // $('.moreset_userkeep').css({'background-color':'#fff','color':'#dec1c9'});
            $('.moreset_userkeep').attr('disabled');
            $('.moreset_userkeep').removeClass('more_setpsd');
            $('.moreset_userkeep').html('保存');

          }
    }) 
    // $('#upload').on('click',function(){
    //    alert(23);
    //    setTimeout(function(){
    //      var val=$('#upload').val();
    //      alert(val);
    //    },1000)
    // })


        var moresettime=0;
      $('.moreset_waterset').on('click',function(){
        if(moresettime==0) {
              $(this).children().animate({left: '31px'},"slow")
              moresettime=1;
              $(this).children().css('background-color','#4AC663');
              $(this).parent().next().children().eq(0).css('height','0px');
          }else{
            $(this).children().animate({left:'1px'},"slow")
            moresettime=0;
             $(this).children().css('background-color','#A9A59F');  
                  $(this).parent().next().children().eq(0).css('height','370px');

           }
        })

  
      
       //发言时长 方法
   function moreset_hide (x,y) {
        $(x).click(function(){
            if($(this).children('div').is(":hidden")){
               var father=$(this);
                   // var that=$(this).children().eq('2').html();
                  $(this).children('img').attr('src','img/icon/channel/channel_select2.png')
                  $(this).addClass('more_setborder');
                     $(this).children('div').show();
                     $(this).find('li').each(function(){
                   $(this).click(function(){
                        var val=$(this).children().html();
                        father.children(y).html(val);
                        
                    })
                })

            }else{
                $(this).children('img').attr('src','img/icon/channel/channel_select1.png')
                $(this).children('div').hide();
            }
        
      })
}

 moreset_hide('.more_water_position','.more_water_positionval');

	$('.moreset_list li').find('input').on('focus', function (){
		$(this).parent().css('border','1px solid #FFA00C');
	}).on('blur', function (){
		$(this).parent().css('border','1px solid #AEAAA4');
	})

      $('.moreset_phoneclick').on('click',function(){
          if(morelastlick==0){
              morelastlick=5;
              var moretimes = setInterval(function(){
                    morelastlick--;
             if (morelastlick == 0) {
                 morelastlick=0;
                 clearInterval(moretimes);
                }
             }, 1000);
           if($(this).html()=='点此获取短信验证码'){
                 $('.moreset_phoneclick').addClass('moresetCodebg');
                 var phoneval=$('#more_phone').val().trim();
                if(!checkMobile(phoneval)){
                    common._coverShow("手机格式错误!");
                        setTimeout(function (){
                             common._coverHide();
                        },2000);
                        return;
                }
                 var body = '{"Code":10120,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + loginId + '\","Phone":\"'+phoneval+'\"}}';
                 // console.log(body);
                 $('.cover_loading').show();
                  var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
                 $.post(''+URI+'',
                function (ret){
                        var resp = decodeURIComponent(ret,'UTF-8');
                        var obj = $.parseJSON(resp);
                          if(obj.Result==200){
                             $('.cover_loading').hide();
                                 $('.moreset_phonecode').show('slow');
                                 $('.moreset_phoneclick').removeClass('moresetCodebg');
                                 var time=60;
                            MoreSetTime= setInterval(function(){                      
                                   $('.moreset_phoneclick').html( time+'s后重发');
                                    time--;
                                    if(time==-2){
                                        $('.moreset_phoneclick').html('点此获取短信验证码');
                                        clearInterval(MoreSetTime);
                                    }
                                 },1000)
                           }else if(obj.Result==406){
                               $('.cover_loading').hide();
                                 common._coverShow("指定手机号码已被该用户绑定，无需重新绑定!");
                                  setTimeout(function (){
                                       common._coverHide();
                                  },2500);
                           }else if(obj.Result==405){
                                  $('.cover_loading').hide();
                                  common._coverShow("指定的手机号码已被其他用户绑定!");
                                  setTimeout(function (){
                                       common._coverHide();
                                  },2500);
                           }else{
                            $('.cover_loading').hide();
                               common._coverShow("操作失败!");
                                  setTimeout(function (){
                                       common._coverHide();
                                  },2000);
                           }
                        })
           }else{
                 $('.moreset_phoneclick').removeClass('moresetCodebg');
             
           }

    }else{
      
    }
   })
}

//获取登录者信息
function loginerGetInfo(){
	var id = $('.seting_uid');
	var name = $('.seting_name');
	var phone = $('.seting_phone');
	var email = $('.seting_email');
	var ema = $('.moreset_mailbox input');
	var name1 = $('.moreset_username input');
	var id1 = $('.moreset_ID i');
	var body = '{"Code":10112,"Body":{"SessionId":\"' + sessionId + '\","Uids":[\"' + loginId + '\"]}}';
	
	id.html(loginId);
	id1.html(loginId);
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		if(ret.Result == 200){
			ret = ret.Users[0];
			name.html(ret.Name);
			phone.html(ret.Phone);
			email.html(ret.Email);
			ema.val(ret.Email);
			name1.val(ret.Name);
      $('#more_phone').val(ret.Phone);
		}else{
        common._coverShow("操作失败!");
          setTimeout(function (){
               common._coverHide();
          },2000);
    }
	})
}

function  More_setboderfint() {
   $('.more_water_position').removeClass('more_setborder');
   $('.moreset_water_name').removeClass('more_setborder');
   $('.moreset_water_img').removeClass('more_setborder');
}

function small_btnMove(){
	   var setmore = $('.moreset_border_r');
	   var more_btn = $('.more_btn');
	
    	if(setmore.css("margin-left") == '80px'){
    		more_btn.hide();
        $('.moreset_usershow').hide();
    		setmore.animate({
    			'margin-left': '-190px'
    		}, function (){
    			more_btn.show();
    			more_btn.css({
    				"background":"#bca48a url(./img/right_icon.png) no-repeat center center",
    			});	
          
          $('.moresetwr').attr('src','img/icon/more_set/more_set.png');

    		});
    		Close_window();
    	}else{
    		more_btn.hide();
    		setmore.animate({
    			'margin-left': '80px'
    		},function (){
    			more_btn.show();
    			more_btn.css({
    				"background":"#bca48a url(./img/left_icon.png) no-repeat center center",
    			});			
    		});
    		l_lose();
    	}		
};

function moresetpassword (data) {
    var oldpassword=getDAes($.cookie('userpassword'));
    var oldpass=$('#moreset_now').val().trim();
    if(oldpass!=oldpassword){
          showAlert('当前密码输入有误,请重新输入')
          return;
    }
    var password=$('#moreset_new').val().trim();
    var passwords=$('#moreset_news').val().trim();
    var passwordK=RegeMatchValC(password);
    var hang='<br>';
    if( oldpass != '' && password != '' && passwords != '') 
    {

    if(passwordK){
         common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!");
            setTimeout(function (){
                        common._coverHide();
                    },4000);
              return;
    }
     if(password.length<8||password.length>15){
         // common._coverShow("密码长度不符合要求!");
         //  setTimeout(function (){
         //               common._coverHide();
         //          },2000);
          showAlert("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                  return;
     }
    if(password==passwords &&password!=''){
        
           passwords=Setuser_Pwd(loginId,passwords);
          var body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+loginId+'","Pwd":"'+passwords+'"}}';
         // var body='{"Code":"10107","Body":{"SessionId":"'+sessionId+'","Uid":"'+loginId+'","Pwd":"'+passwords+'"}}';
        console.log(body);
       var arr=[];
       var conword='修改密码失败！';
       AjaxPostMsg(body, AJAXSET_TIME, MoreSetToPassWord, MediaErrorDown, MediaAjaxovertime, true, arr, conword);

       }else if(password!=passwords ){
         common._coverShow("两次密码不一致!");
              setTimeout(function (){
                common._coverHide();
          },2000);
      }else if(password==''||passwords==''){
          common._coverShow("密码不能为空!");
              setTimeout(function (){
                common._coverHide();
          },2000);
      }     
    }
}

//   $(document).keydown(function (e) {
//       var doPrevent;
     
//    if (e.keyCode == 8||e.keyCode==13) {    
//           var d = e.srcElement || e.target;
//        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
//            doPrevent = d.readOnly || d.disabled;
//          }
//         else
//          doPrevent = true;
//      }
//       else
//      doPrevent = false;
//     if (doPrevent)
//       e.preventDefault();
// });

$(document).keydown(function(event){
  // 在jquery中event已被封装，下面的语句没有意义了，event总是会被传递
  // event = event || window.event; 
  // IE的event.keyCode和非IE的event.charCode被封装成event.which
  if(event.which == 8){
    //当前焦点不在input或textarea时禁用delete键
    var name = document.activeElement.tagName.toUpperCase();
    var DIVID=document.activeElement.getAttribute("id");
    console.log('广播'+DIVID);
    if(name != 'INPUT' && name != 'TEXTAREA' && DIVID!='Radio_text'){
      return false;
    }
    // readonly element in IE
    if((name == 'INPUT' || name == 'TEXTAREA') && document.activeElement.readOnly){
      return false;
    }
  }
});
function MoreSetToPassWord(ret){
  
           $('.cover_loading').hide();
           var hang='<br>';
             if(ret.Result==200){
                    $(data).parent().parent().parent().slideUp('slow');
                    $('.moreset_user').find('.moresetwr').attr('src','img/icon/more_set/more_set.png');
                  showAlert('设置密码成功,请重新登录！');
                  setTimeout(function (){
                        var body = '{"Code":11507,"Body":{"SessionId":\"' + sessionId + '\"}}';
                         console.log(body);
                         var arrmsg=[];
                        var conword='退出失败！';
                        AjaxPostMsg(body, AJAXSET_TIME, Main_GetOutTo, MediaErrorDown, MediaAjaxovertime, true, arrmsg,conword);
                   },2000);
              }else if(ret.Result==410){
                   common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function (){
                            common._coverHide();
                        },4000);
              }else if(ret.Result== 415){ 
                   showAlert('5次以内不得设置相同的密码!');
              }else if(ret.Result== 418){
                  common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function (){
                            common._coverHide();
                        },4000);
              }else{
                  common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function (){
                            common._coverHide();
                        },4000);
              }
} 

/*保存信息*/
function More_setusers (data){
    if(!($('.moreset_phoneclick').is(':hidden'))){
        More_settingphone();
        return;
    } 
    var email=$('#more_email').val().trim();
    var phone=$('#more_phone').val().trim();
    var name=$('#more_Name').val().trim();
    var namevals=RegeMatchValC(name);
       if(namevals){
            showAlert('名称不允许有特殊字符！');
            return;
       } 

     var body='{"Code":"10113","Body":{"SessionId":"'+sessionId+'","Uid":"'+loginId+'","Name":"'+name+'","Phone":"'+phone+'","Email":"'+email+'"}}'; 
             if(name==''){
                  common._coverShow("帐号名称不能为空!");
                            setTimeout(function (){
                                 common._coverHide();
                            },2000);
                            return;
             }  
            if(phone!=''){
                    if(!checkMobile(phone)){
                        common._coverShow("手机格式错误!");
                            setTimeout(function (){
                                 common._coverHide();
                            },2000);
                            return;
                    }
            } 
            if(email!=''){
                if(!isEmail(email)){
                  common._coverShow("邮箱格式错误!");
                    setTimeout(function (){
                      common._coverHide();
                  },2000);
                   return;
              }  
               if(email.length>30||email.length<6){
                  common._coverShow("邮箱长度!");
                  setTimeout(function (){
                     common._coverHide();
                   },2000);
                     return;
               } 
            }

          $('.cover_loading').show();
        var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
            $.post(''+URI+'',
                function (ret){
                       var resp = decodeURIComponent(ret,'UTF-8');
                        var obj = $.parseJSON(resp);
                        // console.log(JSON.stringify(obj));
                   if(obj.Result==200){
                    $('.cover_loading').hide();
                    	 $('.moreset_yancode').show();
                      common._coverShow("修改信息成功!");
                              setTimeout(function (){
                               common._coverHide();
                          },2000)
                      $('.more_set_account').slideUp('slow'); 
                      $('.moreset_img').attr('src','img/icon/more_set/more_set.png');
                      $('.seting_name').text(name);
                      $('.seting_phone').text(phone);
                      $('.seting_email').text(email);
                      $('#company_name').text(name);
                      var name_cookie = toBase64(name);
                      $.cookie('loginName',''+name_cookie+'',{expires:300});
                   }else if(obj.Result==410){
                    $('.cover_loading').hide();
                       common._coverShow("备注名不能超过10个字节!");
                                    setTimeout(function (){
                                      common._coverHide();
                                     },2000);
                   }else{
                    $('.cover_loading').hide();
                      common._coverShow("修改信息失败!");
                                    setTimeout(function (){
                                      common._coverHide();
                                     },2000);
                   }    
              })
}
function More_settingphone(){
   
    if($('.moreset_phonecode').is(':hidden')){
       common._coverShow("请点击获取验证码!");
            setTimeout(function (){
                  common._coverHide();
        },2000);
        return;
    }
    var email=$('#more_email').val().trim();
    var phone=$('#more_phone').val().trim();
    var name=$('#more_Name').val().trim();
    var code=$('#MoreCode').val().trim();
    var reg=/[^\d]/g; 
    if(reg.test(code)){
          common._coverShow("验证码不正确！");
                      setTimeout(function (){
                                 common._coverHide();
                     },2000);
              return;
    }
       if(code==''){
                   common._coverShow("请输入验证码!");
                        setTimeout(function (){
                                   common._coverHide();
                       },2000);
                       return;
                  }
       if(name==''){
                  common._coverShow("帐号名称不能为空!");
                            setTimeout(function (){
                                 common._coverHide();
                            },2000);
                            return;
             }  
            if(phone!=''){
                    if(!checkMobile(phone)){
                        common._coverShow("手机格式错误!");
                            setTimeout(function (){
                                 common._coverHide();
                            },2000);
                            return;
                    }
            } 
            if(email!=''){
                if(!isEmail(email)){
                  common._coverShow("邮箱格式错误!");
                    setTimeout(function (){
                      common._coverHide();
                  },2000);
                   return;
              }  
               if(email.length>30||email.length<6){
                  common._coverShow("邮箱长度!");
                  setTimeout(function (){
                     common._coverHide();
                   },2000);
                     return;
               } 
            }
     var body='{"Code":"10113","Body":{"SessionId":"'+sessionId+'","Uid":"'+loginId+'","Name":"'+name+'","Phone":"'+phone+'","Email":"'+email+'","VerifyCode":'+code+'}}'; 
      $('.cover_loading').show();
      var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
            $.post(''+URI+'',
                function (ret){
                       var resp = decodeURIComponent(ret,'UTF-8');
                        var obj = $.parseJSON(resp);
                        // console.log(JSON.stringify(obj));
                   if(obj.Result==200){
                    $('.cover_loading').hide();
                       $('.moreset_yancode').show();
                      common._coverShow("修改信息成功!");
                              setTimeout(function (){
                               common._coverHide();
                          },2000)
                      $('.more_set_account').slideUp('slow'); 
                      $('.moreset_img').attr('src','img/icon/more_set/more_set.png');
                      $('.seting_name').text(name);
                      $('.seting_phone').text(phone);
                      $('.seting_email').text(email);
                      $('#company_name').text(name);
                      var cookie_name = toBase64(cookie_name);
                      $.cookie('loginName',''+cookie_name+'',{expires:300});
                   }else if(obj.Result==410){
                    $('.cover_loading').hide();
                       common._coverShow("备注名不能超过10个字节!");
                                    setTimeout(function (){
                                      common._coverHide();
                                     },2000);
                   }else if(obj.Result==414){
                    $('.cover_loading').hide();
                    common._coverShow("验证码错误!");
                                    setTimeout(function (){
                                      common._coverHide();
                                     },2000);
                   }else{
                    $('.cover_loading').hide();
                      common._coverShow("修改信息失败!");
                                    setTimeout(function (){
                                      common._coverHide();
                                     },2000);
                   }    
              })

}


  function uploadImage(value){
        //    var id=$.cookie('loginId');
        //     console.log('提交图片');
        //   var time=14000000;
        //  var xhr=$.ajax({
        //     type: "post",
        //     url:'http://112.33.9.251:4489/station/mobile/fuploadmsg.action?ipocid='+id+'',
        //     data:value, //参数
        //     contentType:'application/json;charset=utf-8',
        //     timeout: time, //参数 
        //     dataType:'text',
        //     success: function(data) {
        //       console.log(JSON.stringify(data));
        //         // sucess(data, msgarr);
        //     },
        //     error:function(data){
        //        console.log(JSON.stringify(data));
        //          // error(conword);
        //        return;
        //     },
        //     complete: function (XMLHttpRequest,status) {
        //           if(status == 'timeout') {
        //               xhr.abort();
        //              overtime();
        //           }
        //       }
        // });
        // More_setimgborder();

               var val =$("#form2 input").val();
               console.log(val);
               // var imgreg=val.search("fakepath");
               var imgreg=val.lastIndexOf("\\");
               
               var imgName=val.substr(imgreg+1,val.length-1);
               var id = loginId;
               var val_l = val.substring(val.indexOf(".")+1,val.length);
               var regs = /(jpg|png)$/;
               console.log(val_l);
               var urlid = Water_ImgUrl+''+id+'';
               console.log('地址'+urlid);

               if (!regs.test(val_l)) {
               	return showAlert('请上传正确的文件格式(jpg或png)！');
               }
               
               if(val == "") return; 
               $('.cover_loading').show();
                    var options =
                    {
                    url : Water_ImgUrl+''+id+'',//跳转到相应的Action
                    type : 'POST',//提交方式
                    dataType : 'text',//数据类型
                      
                    success : function(data) {//调用Action后返回过来的数据
                      if(data != null)
                      {
                      var result = data.search("http://");
                      if(result >0)
                      {
                      var url = data.substr(result,data.length-1);
                      url = url.replace(/&amp;/g,"&");
                        MoreUploadimg(imgName, url);
                      }
                    }
                 },
                  error: function () {
                         MoreUploadimgerror();
                  }
            };
              $("#form2").ajaxSubmit(options);
  }

  function More_setimgborder () {
        $('.more_water_position').removeClass('more_setborder');
        $('.moreset_water_name').removeClass('more_setborder');
        $('.moreset_water_img').addClass('more_setborder');
  }

  function  MoreUploadimg (url, vals) {
      $('.cover_loading').hide();
      showAlert('图片上传成功！');
      $('.moreset_waterimgt').text(url);
      $('.moreset_waterimgt').attr('imgsrc',vals);


  }
  function MoreUploadimgerror(){
        $('.cover_loading').hide();
         showAlert('图片上传失败！');
  }

 
 function MoreWaterkeep () {

    var position=$('.more_water_positionval').text().trim();//位置
    var watertext=$('#watertext').val().trim();//文字
    // var waterImgsrc=$('.moreset_waterimgt').text();//图片地址
     var waterImgsrc=$('.moreset_waterimgt').attr('imgsrc');
 
     if(waterImgsrc==undefined){
        waterImgsrc='';
     }
     console.log('图片地址'+waterImgsrc);
    var waternumarray=[];
    var waterIMarray=[];
    var positionval;
    if(RegMatchAllte(watertext)){
      // if(RegeMatchValC(watertext)){}
       showAlert('文字水印不允许有特殊字符！');
       return;
    }    
    if(waterImgsrc=='请选择图片...'){
       waterImgsrc='';
    } 
    if(position=='左上'){
       positionval=0;
    }else if(position=='右上'){
       positionval=1;
    }else if(position=='左下'){
      positionval=2;
    }else if(position=='右下'){
      positionval=3;
    }
   for(var i=0;i<3;i++){
      var select=$('.watermessage').children().eq(i).children('.more_set_in').hasClass('userall_selected');
      if(select){
         waternumarray.push(1);
       }else{
         waternumarray.push(0);
      }
   }
    for(var i=0;i<3;i++){
      var select=$('.WaterIMIMG').children().eq(i).children('.more_set_in').hasClass('userall_selected');
      if(select){
         waterIMarray.push(1);
       }else{
         waterIMarray.push(0);
      }
   }
   var imgName=$('.moreset_waterimgt').html();
    // $('.cover_loading').show();
   var Waterbase='{"Logo":"'+waterImgsrc+'","Txt":"'+watertext+'","ShowCreator":'+waternumarray[0]+',"ShowTime":'+waternumarray[1]+',"ShowLocation":'+waternumarray[2]+'}';
       console.log(Waterbase);
       Waterbase=toBase64(Waterbase);
       Waterbase=Waterbase.replace(/\+/g,"%2B");
   var body='{"Code":11503,"Body":{"SessionId":\"' + sessionId + '\","WaterMark":"'+Waterbase+'","Position":'+positionval+',"ApplyToIm":'+waterIMarray[0]+',"ApplyToReport":'+waterIMarray[1]+',"ApplyToVideoCapture":'+waterIMarray[2]+',"WaterImageName":"'+imgName+'"}}';   
   console.log('报文'+body);
  
   var URI = encodeURI(encodeURI(STATION_URL+'?Body=' + body, 'UTF-8'), 'UTF-8');
   $.post('' + URI + '',
    function(ret) {
      var resp = decodeURIComponent(ret, 'UTF-8');
      var obj = $.parseJSON(resp);
    //  $.getJSON('' + STATION_URL + '?Body=' + body + '',
    // function(obj) {
    console.log(obj.Result);
      if (obj.Result == 200) {
            $('.cover_loading').hide();
            $('.more_set_watermarkshow ').slideUp();
            $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
           
            showAlert('水印设置成功！');
        }else{
           $('.cover_loading').hide();
            showAlert('水印设置失败！');
        }
    })


      // var arr=[];
      //  var conword='水印设置失败！';
      //  AjaxPostMsg(body, AJAXSET_TIME, MoreSetSucessImg, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
 } 



 function MoreSetSucessImg(obj){
           $('.cover_loading').hide();
           if(obj.Result==200){
               $('.more_set_watermarkshow ').slideUp();
               $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
               showAlert('水印设置成功！');
           }else{
               showAlert('水印设置失败！');
           }
 }

 function MoreWatergetIMG(data){
    $('.cover_loading').show();
    var body = '{"Code":11504,"Body":{"SessionId":\"' + sessionId + '\"}}';
    console.log('报文'+body);
 
     //  $('.more_set_watermarkshow').slideDown('slow');
     // $('.morewatericon').attr('src','img/icon/more_set/more_set1.png');
     // return;
   //  var URI = encodeURI(encodeURI(STATION_URL+'?Body=' + body, 'UTF-8'), 'UTF-8');
   // $.post('' + URI + '',
   //  function(ret) {
   //    var resp = decodeURIComponent(ret, 'UTF-8');
   //    var obj = $.parseJSON(resp);
    $.getJSON('' + STATION_URL + '?Body=' + body + '',
    function(obj) {
      // console.log(JSON.stringify(obj));        
      if (obj.Result == 200) {
               if(obj.ApplyToIm==undefined){
                   Morefinitshow();
                   return;
               }
             var  makerreplace = obj.WaterMark.replace(/%2B/g,"+");
            var markerbase=toBaseText(makerreplace); 
            // console.log('解码'+markerbase)
            var waterIMarrays=[];
                waterIMarrays[0]=obj.ApplyToIm;
                waterIMarrays[1]=obj.ApplyToReport;
                waterIMarrays[2]=obj.ApplyToVideoCapture;
            var pos=obj.Position;    
                MoreWaterGetShow(markerbase,waterIMarrays,pos,obj.WaterImageName);  
        }else if(obj.Result == 406){
            $('.cover_loading').hide();
            showAlert('只有企业下根级调度员才有权限设置水印！');
        }else{
            $('.cover_loading').hide();
            showAlert('水印获取失败！');
        }
     })
 }

 function Morefinitshow(){
      $('.cover_loading').hide();
      if($('.moreset_border_r').height()<610){
           $('.more_set_watermarkshow').addClass('more_watermark_sets');
       } 
     $('.more_set_watermarkshow').slideDown('slow');
     $('.morewatericon').attr('src','img/icon/more_set/more_set1.png');
 }
  
function MoreWaterGetShow(markerbase, IMarray, pos, imgname){
    // console.log(markerbase);
    var markerjson=strmarkerToJson(markerbase);
    var waterTimearray=[];
        waterTimearray[0]=markerjson.ShowCreator;
        waterTimearray[1]=markerjson.ShowTime;
        waterTimearray[2]=markerjson.ShowLocation;
    var imgsrc=imgname;
  var watertext=markerjson.Txt;
   var poshtml;
    if(pos==0){
        $('.more_water_positionval').html('左上');
    }else if(pos==1){
        $('.more_water_positionval').html('右上');
    }else if(pos==2){
        $('.more_water_positionval').html('左下');
    }else if(pos==3){
        $('.more_water_positionval').html('右下');
    }
   $('#watertext').val(watertext);
     
     if(imgsrc==''){
       $('.moreset_waterimgt').text('请选择图片...');
     }else{
       $('.moreset_waterimgt').text(imgsrc);
     }
 
     for(var i=0;i<3;i++){
         if(waterTimearray[i]==1){
            $('.watermessage').children().eq(i).children('.more_set_in').addClass('userall_selected');
         }else{
            $('.watermessage').children().eq(i).children('.more_set_in').removeClass('userall_selected');
         }
     }

     for(var k=0;k<3;k++){
         if(IMarray[k]==1){
            $('.WaterIMIMG').children().eq(k).children('.more_set_in').addClass('userall_selected');
         }else{
            $('.WaterIMIMG').children().eq(k).children('.more_set_in').removeClass('userall_selected');
         }
     }

     $('.cover_loading').hide();
     if($('.moreset_border_r').height()<610){
         $('.more_set_watermarkshow').addClass('more_watermark_sets');
      } 
     $('.more_set_watermarkshow').slideDown('slow');
     $('.morewatericon').attr('src','img/icon/more_set/more_set1.png');
}


 function RegMatchAllte(data){
      // var pattern = new RegExp("[`@#$^&*=|''\\[\\]<>/@#￥……&*——\"|.。！!·~、/.,:;：%（）()-_+、；【】‘”“']");

      var pattern = new RegExp("[`@#$^&*=|''\\[\\]<>/@#￥……&*%——\"|~【】‘”“']");
       if (/[\\\/\.]/.test(data)) {
             return true; 
        }
        if(pattern.test(data)){   
            return true;  
        }else{
             return false;
        }
 }

function strmarkerToJson(str) {
      var json = eval('(' + str + ')');
      return json;
  }

  function moreclearup(){
      $('.moreset_waterimgt').text('请选择图片...');
      $("#form2 input").val('');
      $('.more_water_position').removeClass('more_setborder');
      $('.moreset_water_name').removeClass('more_setborder');
      $('.moreset_water_img').addClass('more_setborder');
  }

  function moregetcompaymsg(){

      var company=$.cookie('GroupId');
      $('.versionID').html(company);
      var comanyname=decodeURIComponent($.cookie('GroupName'),'UTF-8');
      $('.loginfirmname').html(comanyname); 
      $('.loginfirmname').attr('title',comanyname);
       
  }

//更改当前登录帐号的Name
  function UserNameChange (json) {
    // {"t":300,"oprid":"100110054","users":"[{\"uid\":\"100110054\",\"uname\":\"一二三四\"}]"}
      var uid=json.users[0].uid;
      var name=json.users[0].uname;
      if(uid== loginId){
          var Groupname=encodeURI(name);
          $.cookie('GroupName',''+Groupname+'',{expires:300});
          $('#company_name').html(name);
      }

      if(Meidafirstdata!=undefined){
          MeidaPushChanngeName(json);
      } 
      if(Helpfirstdata!=undefined){
         HelpPushChanngeName(json);
      }
      var val=usersAll.get(uid);
          val.Name=name;
      var msg=usersAll.put(uid,val);
  }

 function MeidaPushChanngeName (json) {
      var uid=json.users[0].uid;
      var name=json.users[0].uname;
      var len=$('#media_main_222').children('.media_main_date').length;
      for(var i=0;i<len;i++){
          var leng=$('#media_main_222').children('.media_main_date').eq(i).find('ul').children().length;
          for(var k=0; k<leng; k++){
              var ID=$('#media_main_222').children().eq(i).find('ul').children().eq(k).attr('users');
             if(ID==uid){
               $('#media_main_222').children().eq(i).find('ul').children().eq(k).attr('user_id',name); 
               $('#media_main_222').children().eq(i).find('ul').children().eq(k).find('.meida_uidname').html(name);
             }
          }
      }
      var listID=$('.media_level2_ul ').attr('user_id');
      if(listID==uid){
         $('#Meida_UerName').html(name);
      }

 }

 function HelpPushChanngeName (json) {
      // var uid=json.uid;
      // var name=json.uname;
      var uid=json.users[0].uid;
      var name=json.users[0].uname;
      var len=$('#loaded').children('.help_main_date').length;
      for(var i=0;i<len;i++){
          var leng=$('#loaded').children('.help_main_date').eq(i).find('ul').children().length;
          for(var k=0;k<leng;k++){
          var  ID=$('#loaded').children('.help_main_date').eq(i).find('ul').children().eq(k).attr('users');
          if(ID==uid){
              $('#loaded').children('.help_main_date').eq(i).find('ul').children().eq(k).attr('username',name);
              $('#loaded').children('.help_main_date').eq(i).find('ul').children().eq(k).find('.help_uidname').html(name);
            }
          }
      }
      var listID=$('.helpfour').attr('user_id');
      if( listID == uid ){
           $('#helpimgname').html(name);
      }
 }


 function  Setuser_Pwd(loginId, newpwd) {
    // var data = "123456";
    var data=newpwd;
    //key为uid，uid不满16位前位补0
    //eg:100110001---->0000000100110001
    //iv为uid，uid不满16位后位补0
    //pwd AES加密后再base64加密
    var numBefore=Setuser_pad(loginId,16,0);
    var numAfter=Setuser_pad(loginId,16,1);
   
    var key  = CryptoJS.enc.Latin1.parse(numBefore);
    var iv   = CryptoJS.enc.Latin1.parse(numAfter);  
    //pwd AES加密
    var encrypted = CryptoJS.AES.encrypt(
      data,
      key,
      {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding
    });
    
   //将encrypted转化为字符串
   var encryptedStr = encrypted+"";
   //encryptedStr base64加密
   var pwdBase64 = toBase64(encryptedStr);
   //处理URL传输中存在加号的问题
   pwdBase64  = pwdBase64 .replace(/\+/g, '%2B');
    
 // STATION_URL = 'http://localhost:8080/airtalkeestation/mobile/serverGetapi.action';
 // var body = '{\"Code\": 100,\"Body\":{\"Password\":\"' + pwdBase64 + '\"}}';

  return pwdBase64;
 // var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
 // $.post('' + URI + '',
 //   function(ret) {
     
 //   })
}
         
 function Setuser_pad(num, n,type) {  
    var len = num.toString().length;  
    while(len < n) { 
      if(type == 0){
        num = "0" + num;  
      }else{
        num = num+"0" ;  
      }
        len++;
    }  
    return num;  
}         

function MainUser_listTop(){
       var media_imgh = $('.mian_userasklist').outerHeight();
       var media_imgw = $('.mian_userasklist').outerWidth();
       var meidia_screenh = $(window).height();
       var meidia_screenw = $(window).width();
       var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
       var media_top = (Number(meidia_screenh) - Number(media_imgh)) / 2;
       $(".mian_userasklist").css("top", media_top);
       $(".mian_userasklist").css("left", media_left);
}

function mainGetuser_list(){
    var body = '{"Code":11505,"Body":{"SessionId":\"' + sessionId + '\"}}';
    var arrmsg=[];
    var conword='获取关联用户失败';
     AjaxPostMsg(body, AJAXSET_TIME,main_userASK, mainGetUserError, MediaAjaxovertime, false, arrmsg,conword);
}

function mainGetUserError (){
  
     $('.cover_loading').hide();
   
}

function main_userASK(obj){
  // alert(JSON.stringify(obj));
     if(obj.Result==200){
        if(obj.BossLinkUserList.length>0) {
              Mainuserlistarr=[];
              for(var i=0;i<obj.BossLinkUserList.length;i++){
                  var listuser=[];
                  var oldid=obj.BossLinkUserList[i].OldGroupId;
                  var newid=obj.BossLinkUserList[i].NewGroupId;
                  var   uid=obj.BossLinkUserList[i].Uid;
                  var ApplyStatus=obj.BossLinkUserList[i].ApplyStatus;
                  var CreateTime=obj.BossLinkUserList[i].CreateTime;
                      listuser.push(oldid);
                      listuser.push(newid);
                      listuser.push(uid);
                      listuser.push(CreateTime);
                      listuser.push(ApplyStatus);
                      Mainuserlistarr.push(listuser);
               }
               var con='<span>有关联用户请求</span>';
          $('.mian_userAskcall').empty().html(con);    
        }
     }else{
        
     }
}

function main_usercalllist (obj) {
     var context=$(obj).html().trim();
     var calluser='';
     var indexuser=$(obj).parent().parent().index()-1;
     if(context=='同意'){
        calluser=1;
     }else if(context=='拒绝'){
        calluser=2;
     }
     var body = '{"Code":11506,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' +Mainuserlistarr[indexuser][2] + '\","\"ApplyStatus":\"'+calluser+'\"}}';
     var arr=[indexuser];
     var conword='操作失败！';
     AjaxPostMsg(body, AJAXSET_TIME, MainUser11506, MediaErrorDown, MediaAjaxovertime, true, arr,conword);
}

function MainUser11506(obj, arr){
   $('#bg-color').hide();
   if(obj.Result==200){
       showAlert('操作成功！');
       var index=arr[0]+1;
       $('.main_usertable').children().eq(index).remove();
       Mainuserlistarr.splice(arr[0],1);
       if(Mainuserlistarr.length==0){
          $('#bg-color').hide();
          $('.mian_userasklist').hide();
          $('.mian_userAskcall').empty();
       }
   }else{
      showAlert('操作失败!');
   }
}

function Main_GetOutTo(obj){ 
     $('.cover_loading').hide();
     console.log(obj.Result);
     if(obj.Result==200){
           sessionStorage.removeItem('SessionId');
           account_loginOut();
      }else{
        showAlert('退出失败！');
        window.setTimeout(function()
	    {							
	    logoutHerf();
	    }, 2 * 1000); 
      }
} 



function Dispatcher_UserStateOffline () {
   console.log('測試離綫')
    if(User_stateLine){
     cbLoginErrorState();
    	$('.main_linkstate').children('i').html('离线');
		$('.main_linkstate').children('i').css('color', '#dadfda');
		$('.main_linkstate').children('img').attr('src', 'img/icon/onlineerror.png');
 
       alert('您当前处于离线状态！');
       User_stateLine=false;

      }else{
        
         User_stateLine=false;

     }

}

function Dispatcher_UserStateOline () {

      if(User_stateLine){
       // alert('您当前处于离线状态！');
        
       User_stateLine=true;
      console.log('登陸成功');
      }else{
          console.log('登陸成功');
         User_stateLine=true;

     }
}


 function AjaxPostMsgDown (body, time, sucess, error, overtime, tp, msgarr, conword) {
        if(tp){
           $('.cover_loading').show();
        }
        console.log(body);
       var xhr=$.ajax({
            type: "post",
            url:GetMsgUrl_DOWN,
         
            // url:STATION_URL,
            data:body, //参数
            contentType:'application/json;charset=utf-8',
            timeout: time, //参数 
            dataType:'json',
            success: function(data) {
       //      	var getHelpcode=data.Resources;
				   // if(getHelpcode.length==0){
				   // 	   $('.HelpPagemore').remove();
				   // 	    showAlert('已经是最后一页');
				   // 	    return;
				   // }
              console.log(JSON.stringify(data));
                sucess(data, msgarr);
            },
            error:function(data){
                 error(conword);
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


function position_return_f(){
	var arrs_s = $('.position_return>a>img').attr("src").split("/");
	var user=$('#login_user').val();
  var userpasowrd=$('#login_userpassword').val();
  var Switch  = $.cookie('LocationReturnSwitch');
	var Frequency = $.cookie('LocationReturnFrequency');
  
	if(arrs_s[arrs_s.length-1]=="Triangle.png"){
		$('.moreset_usershow').slideUp();
    $('.moresetwr').attr('src','img/icon/more_set/more_set.png');
    $('.more_set_watermarkshow').slideUp();
    $('.morewatericon').attr('src','img/icon/more_set/more_set.png');
    $('.more_set_account').slideUp('slow');
    $('.moreset_img').attr('src','img/icon/more_set/more_set.png');
		$('.position_return_div').slideDown();
		$('.position_return>a>img').attr("src","img/icon/more_set/Triangle1.png");
		$("input[name='option'][value='"+Switch+"']").attr("checked",true);
	  $("input[name='time'][value='"+Frequency+"']").attr("checked",true);
	  $('.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
		$("input[name='option']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
		$("input[name='option']:checked").parent().css("color","#000000");
		
		if(Switch==0){
			$("input[name='time']").enable(false);
			$('.fugaidiv').show();
			$('.position_return_option_sr').css("color","#8B8884");
		}else{
			$("input[name='time']").enable(true);
			$('.fugaidiv').hide();
			$("input[name='time']:checked").parent().css("color","#000000");
			$("input[name='time']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
		}
		
		$('.position_return_option_so').on("click",function(){
			Switch = $("input[name='option']:checked").val();
			$('.c_1').css({"background":"white"});
			$('.position_return_option_so').css("color","#8B8884");
			$('.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			$("input[name='option']:checked").parent().css("color","#000000");
			if(Switch==0){
				$("input[name='time']").enable(false);
				$('.fugaidiv').show();
				$('.position_return_option_sr').css("color","#8B8884");
				$('.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			}else{
				$("input[name='time']").enable(true);
				$('.fugaidiv').hide();
				$("input[name='time']:checked").parent().css("color","#000000");
				$("input[name='time']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
				
			}
			$("input[name='option']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
			LocationReturn(Switch,Frequency);
			
		});
		$('.position_return_option_sr').on("click",function(){
			Frequency = $("input[name='time']:checked").val();
			$('.c_2').css({"background":"white"});
			$('.position_return_option_sr').css("color","#8B8884");
			$('.position_return_option_sr>.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			$("input[name='time']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
			$("input[name='time']:checked").parent().css("color","#000000");
			LocationReturn(Switch,Frequency);
		});
	}else{
		$('.position_return_option_so').off("click");
		$('.position_return_option_sr').off("click");
		$('.position_return_div').slideUp();
		$('.position_return>a>img').attr("src","img/icon/more_set/Triangle.png");
	}
}
function set_Language_settings_f(){
	var lan_number;
	var arrs_a = $('.set_Language_settings>a>img').attr("src").split("/");
	var language_len = $.cookie('lan');
	if(language_len=="0"){
		language_len= "3";
	}
	if(arrs_a[arrs_a.length-1]=="Triangle.png"){
		$('.set_Language_settings_div').slideDown();
		$('.set_Language_settings>a>img').attr("src","img/icon/more_set/Triangle1.png");
		if(language_len==3){
			$('.lan_all').css("color","#8B8884");
			$('.lan_all>.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			$("input[name='lan'][value='"+language_len+"']").attr("checked",true);
			$("input[name='lan']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
			$("input[name='lan']:checked").parent().css("color","#000000");
		}else if(language_len==1){
			$('.lan_all').css("color","#8B8884");
			$('.lan_all>.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			$("input[name='lan'][value='"+language_len+"']").attr("checked",true);
			$("input[name='lan']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
			$("input[name='lan']:checked").parent().css("color","#000000");
		}
		$('.lan_all').off("click").on("click",function(event){
			language_len = $("input[name='lan']:checked").val();
			$('.lan_all').css("color","#8B8884");
			$('.lan_all>.radio-bg').css({"background":"url(img/icon/danxuan1.png)"});
			$("input[name='lan']:checked").prev().css({"background":"url(img/icon/danxuan.png)"});
			$("input[name='lan']:checked").parent().css("color","#000000");
			language_set_up(language_len);
		});
		
	}else{
		$('.lan_all').off("click");
		$('.set_Language_settings_div').slideUp();
		$('.set_Language_settings>a>img').attr("src","img/icon/more_set/Triangle.png");
		
	}
}
function language_set_up(language_len){
	var body='{"Code":"11210","Body":{"SessionId":"' + sessionId + '","LangageType":"'+language_len+'"}}';
	console.log(body);
			var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
			$.post(''+URI+'',
						function (ret){
									console.log(ret);
									var resp = decodeURIComponent(ret, 'UTF-8');
									var obj = $.parseJSON(resp);
									if(obj.Result=="200"){
										$.cookie('lan',''+language_len+'');
									}else{
										console.log('发送报文参数不正确!');
									}
						});
}
function LocationReturn(Switch,Frequency){
	var body='{"Code":"10204","Body":{"SessionId":"' + sessionId + '","LocationReturnSwitch":"'+Switch+'","LocationReturnFrequency":"'+Frequency+'"}}';
      var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
      $.post(''+URI+'',
             function (ret){
                	console.log(ret);
                	var resp = decodeURIComponent(ret, 'UTF-8');
									var obj = $.parseJSON(resp);
                	if(obj.Result=="200"){
                		$.cookie('LocationReturnSwitch',''+Switch+'');
                 		$.cookie('LocationReturnFrequency',''+Frequency+'');
                	}else{
                		if(obj.Result=="400"){
                			console.log('发送参数存在问题！');
                		}else if(obj.Result=="405"){
                			console.log('LocationReturnSwitch参数不正确！');
                		}else if(obj.Result=="406"){
                			console.log('LocationReturnFrequency参数不正确！');
                		}
                	}
            });
}
 
function more_phone_11(){
	var value_p = $('#more_phone').val();
	
	if(value_p.length>11){
		value_p = value_p.substring(0,11);
		$('#more_phone').val(value_p);
		return;
	}
	var reg=/[^\d]/g;
  var xuanval=value_p.replace(reg,'');
  $('#more_phone').val(xuanval);
  
}
