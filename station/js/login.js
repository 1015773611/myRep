
//判断选中状态
try {

    jQuery.support.cors = true;

} catch (e) {

    alert('jQuery加载失败。\n这有可能是因为您的浏览器正在兼容性视图中运行。\n请设置您的浏览器在非兼容性视图中运行，然后重试。');
}


// http://112.35.28.140:4480/station/mobile/serverGetapi.action
// var verifyCode = new GVerify("v_container");
function login_Selected() {

    if($.cookie('login_Selected') == 1) {

              $('#login_Rember').addClass('login_selected');
              login_val();

      } 

 }
      
$(function(){

  login_Selected();

})

    function inputdis(){
      $('#login_user').blur();
    }
    
  var codetime,
      code,
      login_uid,
      choose=true,
      codech=true,
      remberarr,
      login_ps=document.getElementById('index_new'), 
      login_psw=document.getElementById('index_news'),
      login_Oldpwd=document.getElementById('index_OldPwd'),
      login_Newpwd=document.getElementById('index_NewPwd'),
      login_Newpwdrd=document.getElementById('index_NewPwdrd'),
      login_userpwd=document.getElementById('login_userpassword');
  var AJAXSET_TIME=300000;
  // var remberarr=[{"Name":"100210002"},{"Name":"100510002"},{"Name":"100410002"}];
if($.cookie('user_ever')==undefined){
     remberarr=[];
  }else{
       remberarr=JSON.parse($.cookie('user_ever'));
       console.log(remberarr);
  }
   
  $('#login_user').focus(function(){
      $(this).parent().next().hide();
      $(this).parent().addClass('login_bottom');
      // $('.logn_rembernum').show();
  })
  $('#login_user').blur(function(){
     $(this).parent().removeClass('login_bottom');
     // $('.logn_rembernum').hide();
  })
  
  $('#login_userpassword').focus(function(){
      $(this).parent().next().hide();
      $('#login_user').parent().next().hide();
      $(this).parent().addClass('login_bottom');
      $('.logn_rembernum').hide();
  })
   $('#login_userpassword').blur(function(){
     $(this).parent().removeClass('login_bottom');
  })
  $('#login_usercode').focus(function(){
      $(this).parent().next().hide();
      $(this).parent().addClass('login_bottom');
      $('.logn_rembernum').hide();
  })
  $('#login_usercode').blur(function(){
     $(this).parent().removeClass('login_bottom'); 
  })

  $('.login_INput').focus(function(){
      $(this).parent().next().hide();
  })

  $('#index_new,#index_news').blur(function(){
      if($(this).val() == ""){
       $(this).parent().next().show();
       $(this).parent().next().html('8-15位大小写字母、数字和字符（!@#$%^*）组合'); 
       $(this).parent().next().css("color","#595757");
      }
  });



  // $('.login_INput').focus(function(){
  //     $(this).parent().next().hide();
  // })
  // $('#index_code').focus(function(){
  //     $(this).parent().next().hide();
  // })
  // $('#index_NewPwd').focus(function(){
  //     $(this).parent().next().hide();
  // })
  // $('#index_NewPwdrd').focus(function(){
  //   $(this).parent().next().hide();
  // })
  // $('#index_OldPwd').focus(function(){
  //    $(this).parent().next().hide();
  // })


  $('#login_usercode').on('input propertychange',function(){
      $(this).parent().next().hide();
  })
   $('#login_company').on('input propertychange',function(){
      $('.login_msg').html('');
      var companyval=$('#login_company').val().trim();
      var phoneval=$('#login_phone').val().trim();
      if(companyval!='' &&  phoneval!=''){
         $('.index_sure').removeClass('login_btndisable');
         $('.index_sure').addClass('login_btnindex');
      }else{
         $('.index_sure ').addClass('login_btndisable');
         $('.index_sure').removeClass('login_btnindex');
      }
  })
  $('#login_phone').on('input propertychange',function(){
      $('.login_msg').html('');
       var companyval=$('#login_company').val().trim();
      var phoneval=$('#login_phone').val().trim();
      if(companyval!='' &&  phoneval!=''){
         $('.index_sure ').removeClass('login_btndisable');
         $('.index_sure ').addClass('login_btnindex');
      }else{
         $('.index_sure ').addClass('login_btndisable');
         $('.index_sure ').removeClass('login_btnindex');
      }
  })
  $("input").focus(function(){  
          this.select(); 
  })
  $('#login_user').on('input propertychange',function(){
        // if($(this).val()==''){
          var val='';
          $('#login_userpassword').val(val);
        // }
        var len=$(this).val().length;
  })
   $('#login_userpassword').on('input propertychange',function(){
        $('#login_user').parent().next().hide();
  })
  $('#login_Rember').on('click',function(){
     if($(this).hasClass('login_selected')){
          $(this).removeClass('login_selected');
          $.cookie('login_Selected',null);
     }else {
          $(this).addClass('login_selected');
          $.cookie('login_Selected','1',{expires:300});
      }
   })
  // $('#login_user').dblclick(function(){
  //       $('.logn_rembernum').show();
  // })
  // $('.login_contaienr').click(function(){
  //    return false;
  // })
  
  $('.login_timesure').on('click',function(){
    var val=$('.login_timepassworduser').html();
    if(val=='请您修改登录密码！'){
           $('.login_title').html('修改密码');
           $('.login_level2_title').html('修改密码');
           $('.login_timesure').hide();
           $('.login_change').show();
           $('.login-button').removeClass('btnbg');
           $('.login-button').removeAttr('disabled');
           $('.login-button').html('登录');
        }else{
          window.location.href='main.html';
        }
  })
  
  $('.login_oldversion').click(function(){
       $('.login_change').hide();
       $('.login_shadow1').show();
       $('.login_oldver').show();
  })
  $('.oldver').click(function(){
       $('.login_shadow1').hide();
       $('.login_oldver').hide();
  })
  $('.oldversure').click(function(){
      window.location.href='http://112.33.0.176:4470/station';   
  })
  
  $('.index_writepwdbtn').on('click',function(){
    var oldpsdval=$('#index_OldPwd').val().trim();
    var Newpsdval=$('#index_NewPwd').val().trim();
    var Newpsdvals=$('#index_NewPwdrd').val().trim();
    var pwdtestpwd=RegeMatchValC(Newpsdval); 
    var hang='\n';

    $('.index_oldptitle,.index_newptitle').css("color","#C43E3E");
    if(oldpsdval==''){
       $('.index_oldptitle').html('旧密码不能为空！');
       $('.index_oldptitle').show();
       return;
    }
    if(Newpsdval==''|| Newpsdvals==''){
       $('.index_newptitle').html('新密码不能为空！');
       $('.index_newptitle').show();
       return;
    }
    if(Newpsdval!=Newpsdvals&&Newpsdvals!=''){
        $('.index_newptitle').html('两次输入密码不一致，请重新输入');
        $('.index_newptitle').show();
       return;
    }
    if(Newpsdval.length<8||Newpsdval.length>15){
          $('.index_newptitle').html('8-15位大小写字母、数字和字符（!@#$%^*）组合');
          $('.index_newptitle').show();
          return; 
    }
    if(pwdtestpwd){
          $('.index_newptitle').html('8-15位大小写字母、数字和字符（!@#$%^*）组合');
          $('.index_newptitle').show();
       return;
    }
  
   var loginId=$('#login_user').val().trim();
       oldpsdval=login_nextPwd(loginId,oldpsdval);
       Newpsdval= login_nextPwd(loginId,Newpsdval);
    var body='{"Code":"10118","Body":{"Uid":"'+loginId+'","OldPwd":"'+oldpsdval+'","Pwd":"'+Newpsdval+'"}}';
    console.log(body);
     $.getJSON(''+STATION_URL+'?Body='+body+'',
              function (ret){
                console.log(ret);
                if(ret.Result==200){
                     $('.login_writepassword').hide();
                     // $('.login_shadow1').hide();
                     Write_PwdFint();
                     $('.login_set').html('设置成功!');
                     $('.login_set').show();
                       setTimeout(function (){
                               $('.login_set').hide(); 
                                $('.login_shadow1').hide();               
                       },2000);
                }else if(ret.Result==400){
                    //发送参数不正确
                   alert('操作失败！');
                }else if(ret.Result==416){
                   //不存在该用户，该用户不可用
                  alert('不存在该用户，该用户不可用');
                }else if(ret.Result==417){
                   //old密码错误
                  $('.index_oldptitle').html('旧密码错误！');
                  $('.index_oldptitle').show();
                }else if(ret.Result==415){
                  alert('5次以内不得设置相同的密码!');
                }else if(ret.Result==418){
                  alert("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!");
                }
               })
  })

  function createCode() {
        code = "";
        var codeLength = 4; //验证码的长度
        var checkCode = document.getElementById("checkCode");
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) 
            {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            if (checkCode) 
            {
                checkCode.className = "code";
                checkCode.innerHTML = code;
            }
  }
       createCode();
 function validateCode() {
            var inputCode = document.getElementById("login_usercode").value;
             if (inputCode.toUpperCase() != code.toUpperCase()) 
            {
                createCode();
                return false;
            }
            else 
            {      
                return true;
            }        
  }      

  //onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
  function loginuser(name){
      var val=$(name).val().trim();
      if(val.length>13){
      	val = val.substring(0,13);
      	$('.login_user').val(val);
      }
      console.log(val);
      var reg=/[^\d]/g;
      var xuanval=val.replace(reg,'');
      if(xuanval==''){
        $('.logn_rembernum').hide();
         $('#login_user').val(xuanval);
         return;
      }
      $('#login_user').val(xuanval);
      var userarr=[];
      // console.log(JSON.stringify(remberarr));
      for(var i=0;i<remberarr.length;i++){
        var name=remberarr[i].Name;
        // console.log('结果'+name);
          if((name.indexOf(xuanval) > -1)){
             userarr.push(remberarr[i]);
          }
      }
      login_usershow(userarr);
  }



  function login_usershow (data) {
      if(data.length==0){
         $('.logn_rembernum').hide();
         return;
      } 
      if(data.length>=1||data.length<=2){
           $('.logn_rembernum').removeClass('login_remberover'); 
      }
     if(data.length>=3){
          $('.logn_rembernum').addClass('login_remberover'); 
      }
      var html='';
      for(var i in data){
          html+='<li onclick="login_selectuser(this)">'+data[i].Name+'</li>';
      }
      $('.logn_rembernum').empty();
      $('.logn_rembernum').append(html);
      $('.logn_rembernum').show();
  }

  function login_selectuser(nameval){
       var user_idphone=$(nameval).text();
      $('#login_user').val(user_idphone);
      $(nameval).parent().hide();
  }

 function Getlogin(){
    $('.login_shadow1').hide();
     clearInterval(codetime);
 }

function login_forget(data){
    clearInterval(codetime);
    $('.login_title').html('找回密码');
    $('.login_level2_title').html('找回密码');
    $('.logintimes').html('获取验证码');
    $('.login_change').show();
    $('.login_timesure').hide();
    $('.login_msg').html('');
    $('#login_company').val('');
    $('#login_phone').val('');
    $('#index_new').val('');
    $('#index_news').val('');
    $('#index_code').val('');
    $('.login_set').hide();
    $('.login_level2').hide();
    $('.login_shadow1').show();
    //$('.index_newpasswords').next().html('8-15位大小写字母、数字和字符（!@#$%^*）组合'); 
    $(".index_newpasswords").next().css("color","#595757");
    $(".index_newcode").next().hide();
    //$('.index_newpasswords').next().hide();
    //$('.index_newpassword').children('p').hide();
    $('.index_sure').addClass('login_btndisable');
    $('.index_sure').removeClass('login_btnindex');
}

function login_next(data){
    var company=$('#login_company').val();
    var phone=$('#login_phone').val();
    if($(data).hasClass('login_btndisable')){

      return;
    }
    if(company==''||phone==''){
        $('.login_msg').html('企业名称/调度员账号,不能为空');
        return;
    }
     if(phone==''){
        $('.login_msg').html('手机号,不能为空');
        return;
      }
    var body = '{"Code":10122,"Body":{"EnName":\"'+company+'\","Phone":\"'+phone+'\","Type":"1"}}';
       console.log(body);

       var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
          $.post(''+URI+'',
             function (ret){
                        var resp = decodeURIComponent(ret,'UTF-8');
                        var obj = $.parseJSON(resp);
                        console.log( JSON.stringify(obj));
          if(obj.Result==200){
                    login_uid=obj.Uid;
                    login_ps.setAttribute('type','password');
                    $('#index_new').next().removeClass('index_yan');
                    login_psw.setAttribute('type','password');
                    $('#index_news').next().removeClass('index_yan'); 
                    $('.index_username').html(company);       
                    $('.index_userphone').html(phone);
                    $('.login_change').hide();
                    $('.login_level2').show();
                    // logintimes();
           }else if(obj.Result==407){
               $('.login_msg').html('手机号码有误');
           }else{
               $('.login_msg').html('信息输入不匹配');
           }
    }) 
}



function Login_writephonepsd (data) {

   
}

 function RegeMatchValC(data){
     // var pattern = new RegExp("[`@#$^&*=|''\\[\\]<>/@#￥……&*%——\"|~【】‘”“']");
     var pattern = new RegExp("[`&=|''\\[\\]<>/￥%&\"|【】‘”“']");
     
       if (/[\\\/\.]/.test(data)) {
             return true; 
        }
        if(pattern.test(data)){   
            return true;  
        }else{
             return false;
        } 
 }

 
function GetINdex(data){
    var id=$('#login_company').val();
    var psd=$('#index_news').val();
    var psds=$('#index_new').val();
    var code=$('#index_code').val();

    var hang='\n';
    var pwdtestpwd=RegeMatchValC(psd);
    if(psd.length>15||psd.length<8){
            // $('.index_newpasswords').next().html('密码为8-15位数字、大写字母、小写字母和字符组合!'); 
            $(".index_newpasswords").next().css("color","#C43E3E");
            $('.index_newpasswords').next().show();
            return;  
    }
    if(pwdtestpwd){
          // $('.index_newpasswords').next().html('密码为8-15位数字、大写字母、小写字母和字符组合!'); 
          $(".index_newpasswords").next().css("color","#C43E3E");
          $('.index_newpasswords').next().show();
          return;  

    }
     if( psd==''|| psds==''){
           $('.index_newpasswords').next().html('密码不能为空');  
           $(".index_newpasswords").next().css("color","#C43E3E");
           $('.index_newpasswords').next().show();
           return;    
     }else if(psds!=psd){
           $('.index_newpasswords').next().html('两次输入密码不一致，请重新输入'); 
           $(".index_newpasswords").next().css("color","#C43E3E");
           $('.index_newpasswords').next().show();
           return;   
     } 

     if(code==''){
          $('.index_newcode').next().html('请输入验证码'); 
          $('.index_newcode').next().show();
           return; 
     }
    
    var aesLoginUid = login_nextPwd("1000110123",login_uid);
    var aesPwd = login_nextPwd(login_uid,psd);

    var body = '{\"Code\": 10123,\"Body\":{\"Uid\":\"'+aesLoginUid+'\",\"Pwd\":\"'+aesPwd+'\",\"VerifyCode\":\"'+code+'\",\"SetPasswordType\":\"1\"}}';
    var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
          $.post(''+URI+'',
              function (ret){
                  var resp = decodeURIComponent(ret,'UTF-8');
                  var obj = $.parseJSON(resp);
        if(obj.Result==200){
               $('.login_level2').hide();
               $('.login_set').html('设置成功!');
               $('.login_set').show();
               setTimeout(function (){
                       $('.login_set').hide(); 
                        $('.login_shadow1').hide();               
               },2000);
          }else if(obj.Result==411){
            $('.index_newcode').next().html('验证码输入有误，请重新输入'); 
            $('.index_newcode').next().show();   
          }else if(obj.Result==415){
             alert('5次以内不得设置相同的密码!');
          }else{
             alert("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!");
          }
    })
}

function login_changepps(data){
     var type=$(data).prev();
     if($(data).hasClass('index_yan')){
            if(type.attr('id')=='index_new'){
                login_ps.setAttribute('type','password');
                $(data).removeClass('index_yan'); 
            }else{
                login_psw.setAttribute('type','password');
                $(data).removeClass('index_yan');
            } 
       }else{
          if(type.attr('id')=='index_new'){
                 login_ps.setAttribute('type','text');
                 $(data).addClass('index_yan'); 
            }else{
                 login_psw.setAttribute('type','text');
                  $(data).addClass('index_yan'); 
            } 
     }
}   

function login_showpwd(data){
   var type=$(data).prev();
   if($(data).hasClass('index_yan')){
          if(type.attr('id')=='index_OldPwd'){
                login_Oldpwd.setAttribute('type','password');
                $(data).removeClass('index_yan'); 
            }else if(type.attr('id')=='index_NewPwd'){
                login_Newpwd.setAttribute('type','password');
                $(data).removeClass('index_yan');
            }else if(type.attr('id')=='index_NewPwdrd'){
                login_Newpwdrd.setAttribute('type','password');
                $(data).removeClass('index_yan');
            } 
      }else{
            if(type.attr('id')=='index_OldPwd'){
                login_Oldpwd.setAttribute('type','text');
                $(data).addClass('index_yan'); 
            }else if(type.attr('id')=='index_NewPwd'){
                login_Newpwd.setAttribute('type','text');
               $(data).addClass('index_yan'); 
            }else if(type.attr('id')=='index_NewPwdrd'){
                login_Newpwdrd.setAttribute('type','text');
                $(data).addClass('index_yan'); 
            } 
      }
}

function login_val (){
      var usernameBase = getDAes($.cookie('username'));
      var userpasdBase = getDAes($.cookie('userpassword'));
      
      $('#login_user').val(usernameBase);
      $('#login_userpassword').val(userpasdBase);      
}

function login_submit(){
      var user=$('#login_user').val();
      var userpasowrd=$('#login_userpassword').val();
      var usercode=$('#login_usercode').val();
      
      var user_cookie = getAES(user);
      var user_pascookie = getAES(userpasowrd);
      
      $.cookie("username",user_cookie,{expires:300});
      $.cookie("userpassword",user_pascookie,{expires:300});  

	    if (user=='') {
	           $('.login_riguser').children('p').html('账号不能为空').show();
             $('.login_rigusercode').children('p').html('验证码不能为空').hide();
	           return;
	        }
	   if(userpasowrd==''){
	         $('.login_riguserpass').children('p').html('密码不能为空').show();
	         return;
	        }
	    if(usercode==''){
	         $('.login_rigusercode').children('p').html('验证码不能为空').show();
	         return;
	        }
      if(!(validateCode())){
           $('.login_rigusercode').children('p').html(' 验证码输入有误，重新输入').show();
           $('#login_usercode').val('');
            return;
          } 
      if(!choose){
            return;
          }
          choose=false;
	        var password_val=hex_md5(''+userpasowrd+''); //加密   
           $('.login-button').attr('disabled','true');
           $('.login-button').addClass('btnbg');
           $('.login-button').html('正在登录...');
           $('.login_riuser').removeClass('login_bottom');
           $('.login_code').removeClass('login_bottom');

          var aesPwd = login_nextPwd(user,password_val);
          var body='{"Code":"10010","Body":{"ServiceCode":"F5CB4D8A2B71468F2937F6F89802950C3FB72FF74B724D3A1BAFFB7872AA3777","DispatcherId":"'+user+'","DispatcherPwd":"'+aesPwd+'","TypePwd":"1"}}';
          console.log(body); 
          console.log('请求10010',new Date());
          
         var xhr=$.ajax({
          type: "post",
          url:GetMsgUrl,
          // data:JSON.stringify(body),
          data:body,
          contentType:'application/json;charset=utf-8',
          timeout: AJAXSET_TIME,
          dataType:'json',
          success: function(data) {
             console.log(JSON.stringify(data));
             console.log('请求10010回来',new Date());
             Login_Sub(data);
						 $.cookie('lan',data.LangageType);
          },
          error:function(data){
               alert('请求超时,请重新登录！');
               $('.login_change').hide();
               $('.login_timesure').hide();
               $('.login_writepassword').show();
               $('.login_shadow1').hide();
               $('.login-button').removeClass('btnbg');
               $('.login-button').removeAttr('disabled');
               $('.login-button').html('登录');
               choose=true; 
          },
          complete: function (XMLHttpRequest,status) {
                if(status == 'timeout') {
                    xhr.abort();    // 超时后中断请求
                
                    alert('网络超时，请重新登录！');
                         // if(!navigator.onLine){
                         //    alert('网络不可用，请检查你的网络设置');
                         // }
                        choose=true;
                       $('.login_change').hide();
                       $('.login_timesure').hide();
                       $('.login_writepassword').show();
                       $('.login_shadow1').hide();
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录'); 
                }
            }
         });
    } 

  function Login_Sub (obj) {
          choose=true;
         var user=$('#login_user').val();
       if ( obj.Result==200) {
                                
                 var Groupname=encodeURI(obj.GroupName);
                 var loginName = getAES(obj.Name);
                 login_cookieuser(user);
                 var cookie_user = getAES(user);
                 // $.cookie('SessionId',''+obj.SessionId+'',{ expires:1});
                 sessionStorage.setItem('SessionId', obj.SessionId)
                 $.cookie('GroupId',''+obj.GroupId+'',{expires:300});
                 $.cookie('GroupName',''+Groupname+'',{expires:300});
                 $.cookie('Type',''+obj.Type+'',{expires:300});
                 $.cookie('loginId',''+cookie_user+'',{expires:300});
                 $.cookie('loginName',''+loginName+'',{expires:300});
                 $.cookie('LocationReturnSwitch',''+obj.LocationReturnSwitch+'');
                 $.cookie('LocationReturnFrequency',''+obj.LocationReturnFrequency+'');
       
                 if(obj.PasswordValid<=5){
                  var list='密码登录剩余有效时间：<b>'+obj.PasswordValid+'天</b>';
                  $('.login_timepassword').html(list);
                  $('.login_timepassworduser').html('请您及时修改登录密码！');
                  $('.login_timesure').show();
                  $('.login_writepassword').hide();
                  $('.login_change').hide();
                  $('.login_shadow1').show();
                  $('.login-button').removeClass('btnbg');
                  $('.login-button').removeAttr('disabled');
                  $('.login-button').html('登录');
               
                 }else{
                    window.location.href='main.html';
                 }
                              // window.location.href='main.html';
                 }else if(obj.Result==401){
                 
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('账号或密码输入有误！').show();
                       login_codefint();
                 }else if(obj.Result==403){
                      
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_ricontaner').children('p').html('账号或密码输入有误！').show();
                       login_codefint();
                 }else if(obj.Result==404){
                
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('账号或密码输入有误！').show();
                 }else if(obj.Result==503){
               
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('账号或密码输入有误！').show();
                       login_codefint();
                 }else if(obj.Result==405){
                       $('.login_change').hide();
                       $('.login_timesure').hide();
                       $('.login_writepassword').show();
                       $('.index_oldptitle,.index_newptitle').html("");
                       $('.login_shadow1').show();
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       login_codefint();
                 }else if(obj.Result==406){
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('已输入三次错误密码，请等十分钟后登录!').show();
                       login_codefint();

                 }else if(obj.Result==407){
                       $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('调度员用户所在企业被禁用或删除!').show();
                       login_codefint();
                 }else if(obj.Result==408){
                 	   $('.login-button').removeClass('btnbg');
                       $('.login-button').removeAttr('disabled');
                       $('.login-button').html('登录');
                       $('.login_riguser').children('p').html('调度员用户已过期!').show();
                       login_codefint();
                 }

  }

  function login_codefint () {
  
     $('#login_usercode').val('');
     createCode();
     $('#login_userpassword').val('');

  }


 function login_cookieuser(data){
        var useridname;
         for(var i=0;i<remberarr.length;i++){
             if(remberarr[i].Name==data){
               useridname=false;
             }
         }
         login_cookienum(data,useridname);
 }   
 
 function login_cookienum(data,useridname){
  
     if(useridname==undefined){
        var userid={"Name":""+data+""};
          remberarr.push(userid);
         var  newremberarr=JSON.stringify(remberarr);
         $.cookie('user_ever',''+newremberarr+'',{expires:300});
     }
 }

function GetCode(data){
        var company=$('.index_username').html();  
        var phone=$('.index_userphone').html();
        var textcon=$(data).html();
        var psd=$('#index_news').val();
        var psds=$('#index_new').val();
    if(psd.length>15||psd.length<8){
            $('.index_newpasswords').next().html('8-15位大小写字母、数字和字符（!@#$%^*）组合'); 
            $('.index_newpasswords').next().show();
           return;  
    }
     if( psd==''|| psds==''){
           $('.index_newpasswords').next().html('密码不能为空');  
           $('.index_newpasswords').next().show();
           return;    
     }else if(psds!=psd){
           $('.index_newpasswords').next().html('两次输入密码不一致，请重新输入'); 
           $('.index_newpasswords').next().show();
           return;   
     } 
        if(textcon!='获取验证码'){
            return;
          }
          if(!codech){
            return;
        }
        codech=false;
     var body = '{"Code":10122,"Body":{"EnName":\"'+company+'\","Phone":\"'+phone+'\","Type":"0"}}';
        var URI = encodeURI(encodeURI(STATION_URL+'?Body='+body,'UTF-8'),'UTF-8');
        console.log(body);
          $.post(''+URI+'',
              function (ret){
                       var resp = decodeURIComponent(ret,'UTF-8');
                        var obj = $.parseJSON(resp);
                if(obj.Result==200){
                     $('.logintimes').html('60s后重发');
                      codech=true;
                      logintimes();
                 }else{
                      codech=true;
                }
          })
}

function logintimes(){
    var Times=60;
      codetime= setInterval(function(){                      
      $('.logintimes').html( Times+'s后重发');
            Times--;
        if(Times==-2){
             clearInterval(codetime);
            $('.logintimes').html('获取验证码');
                    
            }
      },1000)
}

function Write_PwdFint(){
     $('#index_OldPwd').val('');
     $('#index_NewPwd').val('');
     $('#index_NewPwdrd').val('');
     login_Oldpwd.setAttribute('type','password');
     login_Newpwd.setAttribute('type','password');
     login_Newpwdrd.setAttribute('type','password');
     $('.index_newpasswords span').removeClass('index_yan');

}

function Write_close(data){
   $('.login_writepassword').hide();
   $('.login_shadow1').hide();
   Write_PwdFint();
}

function loginEnterCode() {
    document.onkeydown = function(e){ 
        var ev = document.all ? window.event : e;
        if (ev.keyCode==13) {
                login_submit();
        }
    }
}

//2017.9.26
var gEvtNoSvcToastCount = 0;
function onRpcEvent(evt, param) {
	//if (evt == EVT_NO_SVC) {
	//   cbGetVersion(null);
	//}
}

function loginReady() {
    $('.login_down').children('a').attr('href', END_DOWNLOAD_URL);
	  gEvtNoSvcToastCount = 0;
    testEnv('localhost', 41301, envHandler);
}

function envHandler(code) {
	var btnState = 0;			//0：可正常登录； 1：需下载库版本； 2：隐藏登录按钮
    if(code != ERR_POCSVC_NOT_AVAIL && code != ERR_WS_COMPAT_VIEW) {
        // retrieve Pocsvc version
        var ver = window['PocsvcVer'];
        console.log(ver);
        ver = ver.slice(0, ver.length - 20);
        if (ver != POCSVC_VERSION) {
        	btnState = 1;
	    }
    }
    
    var errMsg = '网络连接失败。\n\n';
    switch(code) {
    case ERR_OK:
        break;
    case ERR_POCSVC_NOT_AVAIL:
        errMsg = '没有检测到对讲服务。';
        //alert(errMsg);
        btnState = 1;
        break;
    case ERR_WS_NOT_AVAIL:
        errMsg += '检测到您的浏览器不支持WebSocket技术，\n建议您使用Windows IE11或Windows Edge浏览器！';
        // btnState = 2;
        btnState =0;
     
        alert(errMsg);
        break;
    case ERR_WS_INTRANET:
        errMsg += '请先将该网址加入到信任站点,如果“自动检测 Intranet 网络”处于未勾选状态，请将其勾选并刷新页面。\n如果其已经处于勾选状态，请将其连同其下面3项一起置于非勾选状态，并刷新页面。';
        //弹出按照ERR_WS_INTRANET.docx设计的弹出框
        loginExplain();
        btnState = 2;
        break;
    case ERR_WS_COMPAT_VIEW:
        errMsg += '此站点不能在“兼容性视图”里运行，请关闭兼容性视图模式！';
        btnState = 2;
        alert(errMsg);
        break;
    case ERR_WS_UNSUPPORTED_IE:
        errMsg += '请升级您的IE浏览器至版本10或11！';
        btnState = 2;
        alert(errMsg);
        break;
    case ERR_WS_UNSPECIFIED:
    default:
        errMsg += '出现未知错误，请联系客服人员！';
        btnState = 2;
        alert(errMsg);
        break;
    }
    if(code != ERR_OK)
        console.log(errMsg);
        
    var loginBtn = document.getElementById('loginBtn');
    if (btnState == 0) {
    	var btn = document.createElement('button');
        btn.textContent = '登录';
        btn.addEventListener('click', login_submit, false);
        btn.setAttribute('class', 'login-button');
        loginEnterCode();
        loginBtn.innerHTML = '';
        loginBtn.appendChild(btn);
	}
    else if (btnState == 1) {
        var alink = document.createElement('a');
        alink.href = POCSVC_DOWNOAD_URL;
        alink.textContent = '下载最新版本库';
        alink.setAttribute('class', 'login-a');
        loginBtn.innerHTML = '';
        loginBtn.appendChild(alink);
        //alert('检测到你的通信组件不是最新版本或未正常安装运行，请点击下载并安装！');
    }
    else if (btnState == 2) {
    	// 隐藏登录按钮
    	loginBtn.style.display = 'none';
    }
}

function loginExplain() {
    var info = $('#windowInfo');
    var w = $(window).width() -  info.width();
    var h = $(window).height() -  info.height();

    info.css({left: w/2, top: h/2});
    $('.cover').show();
    $('#windowInfo').show();
}

$('.windowInfo-close').on('click', function() {
    $('.cover').hide();
    $('#windowInfo').hide();  
})

 
function login_nextPwd(loginId, newpwd) {
    // var data = "123456";
    var data=newpwd;
    //key为uid，uid不满16位前位补0
    //eg:100110001---->0000000100110001
    //iv为uid，uid不满16位后位补0
    //pwd AES加密后再base64加密
    var numBefore=pad(loginId,16,0);
    var numAfter=pad(loginId,16,1);

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
   return pwdBase64;
}
         
 function pad(num, n,type) {  
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

function login_pwdlok (data) {

       var type=$(data).prev();
   if($(data).hasClass('index_useryan')){
          
                login_userpwd.setAttribute('type','password');
                $(data).removeClass('index_useryan'); 
           
      }else{
            
                login_userpwd.setAttribute('type','text');
                $(data).addClass('index_useryan'); 
             
      }

}



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