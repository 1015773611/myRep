 var Taskarr=[];
 var Task_userreportmsg=[];
 var task_listmsg;
 var task_body;
 var task_IMmsg=[];
 var task_selcetlist=new HashMap();
 var task_Selectnum;
 var Pulley_task_indx;
 var  Task_imgIconcolor=true;
 var Pulley_task_jishu = 1;
// var judge = true;
function task_fint(){
	var het = $(window).height() - MAIN_TOPHT;
	$('.task_height').height(het);
	$('.task_first').css('margin-left', '80px');
	$('.task_leftbtn').css('top',(het-50)/2);
	$('.task_detailsbtn').css('top',(het-50)/2);
	$('.task_ulmenu').css('height',het-250);
  // $('.task_ulmenu').css('height',het-50);
	$('.task_creatlistman').css('height',het-84);
	$('.task_tree').css('height',het-95);
	$('.task_creatmsgcon').css('height',het-150);
	$('.Task_detailslist').css('height',het-325);
  // $('.Task_detailslist_ul').css('height',het-245);
  $('.task_linecontainer').css('height',het-100);
  $('.task_Noteul').css('height',het-280);
  $('.task_conlistdeshow').css('height',het-150);

   $('#task_liststtime').fdatepicker({format: 'yyyy-mm-dd'});
   $('#task_listovertime').fdatepicker({format: 'yyyy-mm-dd'});
   var date = new Date();
   var timestarts = date.getFullYear()+'-' + getTimezero((date.getMonth() + 1))+'-'+getTimezero(date.getDate());
  $('#task_liststtime').val(timestarts);
  $('#task_listovertime').val(timestarts);
  
	Task11301();
	$('.task_ulmenu').on('click','.taskli_name ',function(){
		 var obj=$(this).parent();
		 var inde=$(this).parent().index();
		 var resid=$(this).parent().attr('resid');
		 var taskman=$('.task_details');
		if(taskman.is(':hidden')){
            Task_listshowFint();
            Task_listshow(obj,inde,resid);
		}else{
			var task_detailsid= $('.task_details').attr('resid');
			if(task_detailsid==resid){
				 Task_listhide(obj,inde,resid);
			}else{
               Task_listshowFint();
              Task_listdetshow(obj,inde,resid);
			}
		}
	})

	$('.task_creatbtn').click(function(){
        Task_Creat();
	}) 

	$('.task_creatmsgprev').click(function(){
		$('#bg-color').hide();
		$('.task_creatmsg').hide();
		$('.task_creatman').show();
	})

	$('.task_removetask').children().eq(1).click(function(e){
		 $('.task_removetask').hide();
		 $('.task_writenameinval').show();
		 e.stopPropagation();
	})

  $('.task_removename').children().eq(0).click(function(e){
     $('.task_writenameinval').hide();
     $('.task_removetask').show();
     e.stopPropagation();
  })

	$('.Task_detailslist').on('click','.Task_details_ulimg',function(){
         var inde=$(this).parent().index();
         var id=$(this).parent().attr('resid');
             $(this).parent().addClass('task_bgck');
             $(this).parent().siblings().removeClass('task_bgck');
             Task_Detailprevshow(id,inde);

	})

	$('.task_repostimgfooter').click(function(){
		$('.task_cover ').hide();
		$('.task_reportimg ').hide();
		$('.task_details ').show();
         removemeidamarker();
	})

  $('.task_searchlistbtn').on('click',function(){
        Task_GetTasklist();
  })

 /**************点击预览**************/
	$('.task_repostimg_mainimgbg').click(function(){
     $('.task_lookimgleft').hide();
     $('.task_lookimgright').hide();
		 task_imgpreview();
	})
 
  $('.task_repostline_mainimgbg').click(function(){
     task_imgpreview();
  })

  $('.task_reportlineclose').on('click','span',function(){
       $('.task_reportlinevideo').hide();
       $('.task_cover').hide();
       $('.task_details').show();
  })

    $('.task_conlistdeclose').on('click','span',function(){
       $('.task_conlisttails').hide();
       $('.task_cover').hide();
       $('.task_details').show();
  })

	$('#task_lookimg .task_imgclose').click(function(){
		 $('#bg-color').hide();
		 $('#task_lookimg').hide();
	})

	$('.task_repostimgnum ').on('click','.task_repostimgnums',function(){
          var inde=$(this);
          Task_GetImgnumshow(inde);

	})

  $('.task_Bale').click(function(e){
      $('.task_writename').hide();
      $('.task_removetask').hide();
      $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_set.png');
      $('.task_numNote').hide();
      if($('.task_Balediv').is(':hidden')){
         $('.task_Balediv').slideDown();
           e.stopPropagation();
      }else{
         $('.task_Balediv').slideUp();
           e.stopPropagation();
      }
  })
  
  $('.task_connum').click(function(e){
       $('.task_writename').hide();
       $('.task_removetask').hide();  
       $('.task_Balediv').slideUp();
       if($('.task_numNote').is(':hidden')){
           Task_ToNote();
       }else{
         $('.task_numNote').slideUp();
       }
       e.stopPropagation();
  })
	$('.task_reportimgUl').on('click','li',function(){
		 var inde=$(this).index();
		 Task_GetmsgMap();
	})

	$('.task_leftbtn').click(function(){
		 var father=$(this).parent();
		 if(father.css('margin-left')=='80px'){
           $('.task_first').animate({
             'margin-left': '-180px'
           })
            $(this).css('background-image', ' url(./img/right_icon.png)');
            // Close_window();
		 }else{
            $('.task_first').animate({
             'margin-left': '80px'
             })
            $(this).css('background-image', ' url(./img/left_icon.png)');
            // l_lose();
		 }
	})

	$('.task_detailsbtn').click(function(){
		if(!$('.task_details').is(':hidden')){
           $('.task_details').hide('slow');
           $(this).css('background-image', ' url(./img/left_icon.png)');
           setTimeout(function(){
           	 $('.task_leftbtn').show();
           },700)
		} 
	})

  $('.Task_detailslist_ul').on('click','.task_in',function(){
       var check=$(this).hasClass('userall_selected');
       var index=$(this).parent().index();
        if(check){
            $(this).removeClass('userall_selected');
            Task_SelectReduce(index);
        }else{
            $(this).addClass('userall_selected');
            Task_SelectAdd(index);
        }
  })

  $('.Taskinputall').on('click',function(){
     var check=$(this).hasClass('userall_selected');
         if(check){
            $(this).removeClass('userall_selected');
            $('.task_in').removeClass('userall_selected');
             Task_RemoveSelcetAll();
        }else{
             $('.task_in').addClass('userall_selected');
             $(this).addClass('userall_selected');
             // $('.Task_downbtn button').removeAttr('disabled','disabled');
              Task_SelcetAll();
        }
  })
  
  $('.task_Noteul').on('click','.task_conlistremoveimg',function(e){
    var removediv=$(this).parent().parent().children('.task_conlistremove');
      $('.task_addarea').hide();
      if(removediv.is(':hidden')){
           removediv.slideDown();
           $(this).attr('src','img/icon/fence/fence_bg_del2.png');
           $(this).parent().parent().siblings().children('.task_conlistremove').slideUp();
           $(this).parent().parent().siblings().find('.task_conlistremoveimg').attr('src','img/icon/channel/channeldes.png');
      }else{
           $(this).attr('src','img/icon/channel/channeldes.png');
            removediv.slideUp();
      }  
      e.stopPropagation();   
  })
 
  $('.task_Noteul').on('click','.task_conUid',function(e){
          var arr=[];
          arr[0]=$(this).parent().children().eq(0).html().trim();     
          arr[1]=$(this).parent().children().eq(2).html().trim();       
          arr[2]=$(this).parent().next().html().trim();       
          Task_DetailsShow(arr);
          e.stopPropagation();
  })
  
  $('.task_Noteul').on('click','.task_Noteconta',function(e){
          var arr=[];
          arr[0]=$(this).prev().children().eq(0).html().trim();     
          arr[1]=$(this).prev().children().eq(2).html().trim();       
          arr[2]=$(this).html().trim();       
          Task_DetailsShow(arr);
          e.stopPropagation();
  })
	$(document).on('click', function() {
			if ($('#station_task').css('display') === 'block') {
                Task_detailsfint();
			}
      // if ($('.task_numNote').css('display') === 'block') {
      //           Task_detailsfint();
      // }
    })


    $('.task_writename').click(function(e){
    	e.stopPropagation();
    })

    $('.task_detailsnext').click(function(){
    	 var loading='<img src="img/loading.gif" alt="" />';
    	 $(this).empty().append(loading);
    	 Task_Pagenext();
    })

    $('.task_detailstop').children('img').click(function(e){
      $('.task_Balediv').hide();
      $('.task_numNote').hide();
    if($('.task_writename').is(':hidden')){
      Task_imgIconcolor=false;
      $('.task_removetask').hide();
      $('.task_writenameinval').show();
      $('.task_writename').slideDown('slow');
      $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_sets.png');
     }else{
      Task_imgIconcolor=true;
      $('.task_writename').slideUp('slow');
      $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_set.png');
     }
    e.stopPropagation();
    })
     $('.task_detailstop').children('img').hover(function() {
         
          if(Task_imgIconcolor){

             $(this).attr('src','img/icon/newicon/channel_sets.png');
          }

     }, function() {
        if(Task_imgIconcolor){

             $(this).attr('src','img/icon/newicon/channel_set.png');
          }
     });

  

	task_drop();
	Task_Imgpositon();
}
 
 function Task_GetName(id){
   var msg=usersAll.get(id);
    if(!msg){
      return id;	 
   }
    if(msg.Name==undefined){
        return id;
    }else{
       return msg.Name;
    }
 }
 
  function Task_GetOrgName(id){
   var msg=usersAll.get(id);
   var orgname='';
    if(!msg){
      return orgname;   
   }
    if(msg.OrgName==undefined){
        return orgname;
    }else{
       return msg.OrgName;
    }
 }

   function Task_GetPhone(id){
   var msg=usersAll.get(id);
   var phone='';
    if(!msg){
      return phone;   
   }
    if(msg.Phone==undefined){
        return phone;
    }else{
       return msg.Phone;
    }
 }

   function Task_GetuserRole(id){
       var msg=usersAll.get(id);
       var role='';
        if(!msg){
          return role;   
       }
        if(msg.Role==undefined){
            return role;
        }else{
           return msg.Role;
        }
 }

  function Task_GetOrgId(id){
   var msg=usersAll.get(id);
   var orgId=0;
    if(!msg){
      return orgId;   
   }
    if(msg.OrgId==undefined){
        return orgId;
    }else{
       return msg.OrgId;
    }
 }
  

function Task_listshow (obj,inde,resid) {
	       Task_listLocaldeshow(resid);
	       $(obj).children('.task_ulman').slideDown();
           $(obj).children('.taskli_name').addClass('task_bgck');
           $(obj).children('.taskli_name').find('img').attr('src','img/icon/channel/channel_up_03.png');
           $(obj).siblings().children('.taskli_name').removeClass('task_bgck');
           $(obj).siblings().children('.taskli_name').find('img').attr('src','img/icon/channel/channel_select.png');
           $(obj).siblings().children('.task_ulman').slideUp();
           // $('.task_details').show('slow');
           $('.task_leftbtn').hide();
           $('.task_details').attr('resid',resid);
           $('.task_details').attr('ind',inde);
}

function Task_listshowFint(){
    $('.task_conlistremove').hide();
    $('.task_conlistremoveimg').attr('src','img/icon/channel/channeldes.png');
    $('.task_addarea').hide();
    $('.task_addarea').hide();
    $('.task_numNote').hide();
    $('.task_Balediv').hide();
    $('.task_writename').hide();
    $('.task_writename').hide();
    $('.task_detailstopname').next().attr('src','img/icon/newicon/channel_set.png');
    $('.task_removetask').hide();
    $('.Taskinputall').removeClass('userall_selected');
    $('.Task_downbtn button').attr('disabled',true);
     $('.Task_downbtn button').removeClass('HelpReads');
    $('.tasknumtotal').html(0);
    task_Selectnum=0;
    task_selcetlist.clear();
}

function Task_listLocaldeshow(id){
	var title;
	var Task_des;
	var task_time;
	var task_creatuser;
    for(var i=0;i<Taskarr.length;i++ ){
          if(Taskarr[i].TaskId==id){
             title=Taskarr[i].TaskTitle;
             Task_des=Taskarr[i].TaskContent;
             task_time=Taskarr[i].TimeCreate.slice(0,16);
             task_creatuser=Task_GetName(Taskarr[i].TaskCreater);

         }
     }
     
     Task_detailsfint();
     $('#Task_Name').val(title);
     $('#Task_deswrite').val(Task_des);
     $('.Task_detailscontent ').children('textarea').val(Task_des);
     $('.Task_creatuser').html('创建者:'+task_creatuser);
     $('.Task_creattime').html(task_time);
     $('.task_detailstopname').html(title);
     // $('.task_details').show('slow');
     Task_Get305(id);
}

function Task_detailsfint(){
	 $('.task_writename').slideUp();
	 $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_set.png');
   Task_imgIconcolor=true;
   // $('.task_numNote').hide();
}

function Task_listdetshow(obj,inde,resid){
	       $('.task_details').hide();
	       Task_listLocaldeshow(resid);
	       $(obj).children('.task_ulman').slideDown();
           $(obj).children('.taskli_name').addClass('task_bgck');
           $(obj).children('.taskli_name').find('img').attr('src','img/icon/channel/channel_up_03.png');
           $(obj).siblings().children('.taskli_name').removeClass('task_bgck');
           $(obj).siblings().children('.taskli_name').find('img').attr('src','img/icon/channel/channel_select.png');
           $(obj).siblings().children('.task_ulman').slideUp();
           // $('.task_details').show('slow');
           $('.task_leftbtn').hide();
           $('.task_details').attr('resid',resid);
           $('.task_details').attr('ind',inde);
}

function Task_listhide(obj,inde,resid){
	       $(obj).children('.task_ulman').slideUp();
           $(obj).children('.taskli_name').removeClass('task_bgck');
           (obj).children('.taskli_name').find('img').attr('src','img/icon/channel/channel_select.png');
           $('.task_details').hide('slow');
           setTimeout(function(){
           	$('.task_leftbtn').show();
           },700)
}

function Task_Creat(){
	   if($('.task_details').is(':hidden')){
	 	     task_select=true;
	   }else{
	 	     task_select=false;
	   }
	     inintTaskTree();
	     $('.User_Alls').hide();
	     $('#Tasktree').show();
	     $('#task_Input').val('');
	     $('.task_creatlistman').empty();
	     $('.task_first').hide();
	     $('.task_details').hide();
	     $('.task_creat').show();
	     $('.task_creatman').show();
	     zTreeOnAsyncSuccess('Tasktree');
}


function task_cancel(obj){
  treeAddUsers.clear();
	 $('.task_creat').hide();
	 $('.task_creatman').hide();
	 $('.task_first').show();
	 if(!task_select){
        $('.task_details').show();
	 } 
}

function task_next(obj){

	var len=$('#task_creatman').children().length;
	if(len==0){
         showAlert('请选择成员');
		return;
	} 
	$('#Task_creatName').val('');
	$('#task_wrt').val('');
	$('#bg-color').show();
    $('.task_creatman').hide();
    $('.task_creatmsg').show();
}

// function TaskAddtree(event, treeId, treeNode){
// 	 var html = '';
//     var select = treeNode.checked;
//     var  TaskSelect = [];
//     $('.task_creatlistman').children().each(function(i) {
//         TaskSelect.push($('.task_creatlistman').children('li').eq(i).attr('name'));
//     })
//     if(select){
//         var arraynum = $.inArray(treeNode.id, TaskSelect);
//         if (arraynum > -1) {
//             return
//         }
//         html='<li name="'+treeNode.id +'"><i>'+treeNode.name+'</i><img  onclick="channelremoveman(this)" src="img/icon/channel/channeldes.png" alt="" /></li>';
//         // $('#ChannelAdduser').children('li[user="' + treeNode.id + '"]').children('input').prop('checked', true);
//          // $('#Task_userall').children('li[user='+treeNode.id+']').children('div').addClass('userall_selected');
//         $('.task_creatlistman').append(html);
//     }else{
//        $('.task_creatlistman').children('li[name="' + treeNode.id + '"]').remove();
//         // $('#Task_userall').children('li[user='+treeNode.id+']').children('div').removeClass('userall_selected');
//     }
// }

function task_createrr(obj){
  treeAddUsers.clear();
	 $('.task_creatmsg').hide();
	 $('#bg-color').hide();
	 $('.task_creat').hide();
	 $('.task_creatman').hide();
	 $('.task_first').show();
	 if(!task_select){
        $('.task_details').show();
	 } 
}

// function tast_selectname(evevt){
//    if($('.task_writename').is(':hidden')){
//    	  $('.task_removetask').hide();
//       $('.task_writenameinval').show();
//       $('.task_writename').slideDown('slow');
//       $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_sets.png');
//       event.stopPropagation();
//    }else{
//       $('.task_writename').slideUp('slow');
//       $('.task_detailstop').children('img').attr('src','img/icon/newicon/channel_set.png');
//       event.stopPropagation();
//    }
// }

// function Task_remove(event){
//      $('.task_writenameinval').hide();
//      $('.task_removetask').show();
//      event.stopPropagation();
// }

function Task_removefint(){
	$('.task_writename').hide();
}

function Task_creatBtn(obj){
    var name=$('#Task_creatName').val().trim();
    var task_de=$('#task_wrt').val().trim();
    if(name==''){
       showAlert('案件名称不能为空！');
		 return;
    }
    var titleval=RegeMatchValC(name);
	var task_conval=RegeMatchValC(task_de);
	if(titleval){
		 showAlert('案件名称不能有特殊字符！');
		 return;
	}
	if(task_conval){
		 showAlert('案件描述不能有特殊字符！');
		 return;
	}

    var member=[];
    $('#task_creatman li').each(function(){
    	var name=$(this).attr('name');
    	member.push(name);
     })
    var body = '{"Code":11300,"Body":{"SessionId":\"' + sessionId + '\","Task":{"TaskTitle":\"' + name + '\","TaskContent":\"' + task_de + '\"},"TaskMembers":['+member+']}}';
    // var task_addmsg={""}
    console.log('报文'+JSON.stringify(body));

     var arrmsg=[];
     var conword='创建案件失败';
     AjaxPostMsg(body, AJAXSET_TIME, TaskPostCreat, MediaErrorDown, MediaAjaxovertime, true, arrmsg, conword);

 //    $('.cover_loading').show();   
	// var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	// $.post('' + URI + '',
	// 	function(ret) {
	// 		var resp = decodeURIComponent(ret, 'UTF-8');
	// 		var obj = $.parseJSON(resp);
	// 		console.log('返回结果'+obj.Result);
	// 		if (obj.Result == 200) {
 //        console.log(JSON.stringify(obj));
 //                  treeAddUsers.clear();
 //                 $('.cover_loading').hide();
 //                 // Task_localpush(ret);
 //                 showAlert('创建案件成功！');
 //                 task_createrr();
 //                 Task11301();
	// 		  }else{
 //                 $('.cover_loading').hide();
 //                 showAlert('创建案件失败！');

	// 		 }
 //    })
}

function TaskPostCreat (obj) {

      $('.cover_loading').hide();
     if (obj.Result == 200) {
        console.log(JSON.stringify(obj));
                  treeAddUsers.clear();
                 // Task_localpush(ret);
                 showAlert('创建案件成功！');
                 task_createrr();
                 Task11301();
       }else{
                
                 showAlert('创建案件失败！');

      }



}

function Task_localpush(ret){
	var Task={};
	Task.TaskId=ret.TaskId;
	Task.TaskTitle=name;
	Task.TaskContent=task_de;
	// Task.TimeCreate=time;
}

function Task11301(){
  var index=0;
	  var body = '{"Code":11301,"Body":{"SessionId":\"' + sessionId + '\","PageSize":20,"PageIndex":0,"Uid":""}}';
	  var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
	  $('.task_ulmenu').empty();
	  $('.task_ulmenu').append(loading);
	  console.log(JSON.stringify(body));
	 var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	$.post('' + URI + '',
		function(ret) {
			var resp = decodeURIComponent(ret, 'UTF-8');
			var obj = $.parseJSON(resp);
			console.log('返回结果'+obj.Result);
			console.log(JSON.stringify(obj));
			if (obj.Result == 200) {
				  
			       Taskarr=obj.Tasks;
             Task_listshowarr(obj, index);
			   }else{ 
                 showAlert('获取案件失败！');
			 }
    })
}

function Task_listshowarr(obj, index){
   // console.log(JSON.stringify(obj));
   var html='';
   var htmlmen='';
   if(obj.Tasks.length==0){
   	   var list='<h3 class="fdataNull">此帐号暂无案件！</h3>';
   	   $('.task_ulmenu').empty().append(list);
   	   return;
   }
   for(var i=0;i<obj.Tasks.length;i++){
   	         htmlmen='';
   	       for(var k=0;k<obj.Tasks[i].TaskMembers.length;k++){
             htmlmen+='<li><span>'+Task_GetName(obj.Tasks[i].TaskMembers[k].Uid)+'</span></li>';
          }
       html+='<li  resid="'+obj.Tasks[i].TaskId+'"><div class="taskli_name fix"><span class="Task_nametitle">'+obj.Tasks[i].TaskTitle+'</span><span class="fr"><img src="img/icon/channel/channel_select.png" alt="" /></span></div><ul class="task_ulman">'+htmlmen+'</ul></li>';
   }
    $('.task_ulmenu').empty().append(html);
    if(obj.Tasks.length==20){
        Task_GetMore(index);
    }
}

function Task_Titlelistshowarr(obj, index){
   // console.log(JSON.stringify(obj));
   var html='';
   var htmlmen='';
   if(obj.Tasks.length==0){
       var list='<h3 class="fdataNull">暂无数据</h3>';
       $('.task_ulmenu').empty().append(list);
       return;
   }
   for(var i=0;i<obj.Tasks.length;i++){
             htmlmen='';
           for(var k=0;k<obj.Tasks[i].TaskMembers.length;k++){
             htmlmen+='<li><span>'+Task_GetName(obj.Tasks[i].TaskMembers[k].Uid)+'</span></li>';
          }
       html+='<li  resid="'+obj.Tasks[i].TaskId+'"><div class="taskli_name fix"><span class="Task_nametitle">'+obj.Tasks[i].TaskTitle+'</span><span class="fr"><img src="img/icon/channel/channel_select.png" alt="" /></span></div><ul class="task_ulman">'+htmlmen+'</ul></li>';
   }
    $('.task_ulmenu').empty().append(html);
    if(obj.Tasks.length==20){
        Task_GetMore(index);
    }
}

function Pulley_task(){
	if(!$('.Task_GetMore').text()){
//		if(judge){
//			showAlert('已经是最后一页');
//			judge = false;
//		}
 		return;
 	}
	var Height_gdt=$(".task_ulmenu").scrollTop();
	var Height_div =$(".task_ulmenu")[0].scrollHeight-$(".task_ulmenu").height();
	if(Pulley_task_jishu!=Height_gdt){
		if(Height_gdt == Height_div){
			Pulley_task_jishu = Height_gdt;
			Get_taskarrMore(Pulley_task_indx);
		}
	}
	
}

function Task_GetMore (indx){
    Pulley_task_indx = indx;
    var more='<div class="Task_GetMore" onclick="Get_taskarrMore('+indx+')">向下滑动加载更多</div>';
    $('.task_ulmenu').append(more);
}

function Get_taskarrMore(ine) {
        ine++;
    var body = '{"Code":11301,"Body":{"SessionId":\"' + sessionId + '\","PageSize":20,"PageIndex":'+ine+',"Uid":""}}';
    console.log(body);
     var arr=[ine];
     var conword='获取案件失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Task_GetMoreTask, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
}

function Task_GetMoreTask(obj,inde){
     $('.cover_loading').hide();
      var html='';
      var htmlmen='';
      if(obj.Tasks.length==0){
         $('.Task_GetMore').remove();
         return;
      }
      var index=inde[0];
      // Taskarr.push(obj.Tasks);
      Taskarr=Taskarr.concat(obj.Tasks);
     for(var i=0;i<obj.Tasks.length;i++){
               htmlmen='';
             for(var k=0;k<obj.Tasks[i].TaskMembers.length;k++){
                  htmlmen+='<li><span>'+Task_GetName(obj.Tasks[i].TaskMembers[k].Uid)+'</span></li>';
               }
         html+='<li  resid="'+obj.Tasks[i].TaskId+'"><div class="taskli_name fix"><span class="Task_nametitle">'+obj.Tasks[i].TaskTitle+'</span><span class="fr"><img src="img/icon/channel/channel_select.png" alt="" /></span></div><ul class="task_ulman">'+htmlmen+'</ul></li>';
     }
     $('.Task_GetMore').remove();
     $('.task_ulmenu').append(html);
     if(obj.Tasks.length==20){ 
           Task_GetMore(index);
     }     
}

function Task_Get305 (id) {
	    $('.Task_detailslist_ul ul').empty();
  	var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
    	$('.Task_detailslist_ul ul').append(loading); 
     var body = '{"Code":11305,"Body":{"SessionId":\"' +sessionId + '\","TaskId":\"' +id+'\","LocationType":1,"PageSize":20,"PageIndex":0}}';
     console.log('报文'+JSON.stringify(body));
	$.getJSON(STATION_URL + '?Body=' + body,
       function(obj) {
			console.log('返回结果'+JSON.stringify(obj));
			console.log('返回结果'+obj.Reports.length);
			if(obj.Result==200){
                 Task_usermsgshow(obj);
                 task_body={"TaskId":id,"LocationType":1,"PageSize":20,"PageIndex":0};
		  	}else{
                 $('.Task_detailslist_ul').hide();
                 $('.Task_detailslist_wu').show();
                 $('.task_details').show('slow');
			 }
		})
}

function Task_usermsgshow(data){
	Task_userreportmsg=[];
    if(data.Reports.length==0){
       $('.Task_detailslist_ul').hide();
       $('.Task_detailslist_wu').show();
    }else if(data.Reports.length==1){
       $('.Task_detailslist_wu').hide();
       Task_userreportmsg=data.Reports;
        Task_usermsghtmlshow(); 
        // $('.Task_detailslist_ul').show(); 
    }else{
       $('.Task_detailslist_wu').hide();
       Task_userreportmsg=data.Reports;
       Task_usermsghtmlshow();
    }
    $('.task_details').show('slow');
}

function Task_usermsghtmlshow () {
	var html='';
	var imgs;
    Task_usermsgaddname();
    $('.task_detailsnext').hide();
     if(Task_userreportmsg.length==1){

       	var time=Task_userreportmsg[0].CreateTime.split(" ");
       	var time2=time[1];
     	   if(Task_userreportmsg[0].ResType==0){
       	   	   if(Task_userreportmsg[0].ResUrl.length==1){
                    imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
       	   	   }else{
                    imgs='<img src="img/icon/newicon/meida_nums.png" alt="" />';
       	   	   }
     	   }else if(Task_userreportmsg[0].ResType==1){
              imgs='<img src="img/icon/newicon/help_video.png" alt="" />';
     	   }else if(Task_userreportmsg[0].ResType==2){
              imgs='<img src="img/icon/newicon/help_img.png" alt="" />';
         }else if(Task_userreportmsg[0].ResType==3){
              imgs='<img src="img/icon/newicon/help_videoline.png" alt="" />';
         }

         html='<li class="fix" resid="'+Task_userreportmsg[0].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_userreportmsg[0].Name+'</span><p><span class="">'+Task_userreportmsg[0].CreateTime+'</span></p></div></li>';
          $('.Task_detailslist_ul ul').empty().append(html);
     }else{
     	for(var i=0;i<Task_userreportmsg.length;i++){
     		   var time=Task_userreportmsg[i].CreateTime.split(" ");
     	     var time2=time[1];
           var Task_CreatTime=Task_userreportmsg[i].CreateTime.slice(0,16);
     	    if(Task_userreportmsg[i].ResType==0){
       	    	if(Task_userreportmsg[i].ResUrl.length==1){
                     imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
       	    	}else{
                     imgs='<img src="img/icon/newicon/meida_nums.png" alt="" />';
       	    	}
     	     html+='<li class="fix" resid="'+Task_userreportmsg[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_userreportmsg[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></div></li>';	
     	    }else if(Task_userreportmsg[i].ResType==1){
     	    	imgs='<img src="img/icon/newicon/help_video.png" alt="" />';
     	    	 html+='<li class="fix" resid="'+Task_userreportmsg[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_userreportmsg[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></div></li>';
     	    }else if(Task_userreportmsg[i].ResType==2){
             imgs='<img src="img/icon/newicon/help_img.png" alt="" />';
             html+='<li class="fix" resid="'+Task_userreportmsg[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_userreportmsg[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
          }else if(Task_userreportmsg[i].ResType==3) {
             imgs='<img src="img/icon/newicon/help_videoline.png" alt="" />';
             html+='<li class="fix" resid="'+Task_userreportmsg[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_userreportmsg[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
          }
     	}
     	if(Task_userreportmsg.length==20){
     		Task_pagenextshow();
     	}
     	$('.Task_detailslist_ul ul').empty().append(html);
     }
      $('.Task_detailslist_ul').show();
}

function Task_usermsgaddname(){
	if(Task_userreportmsg.length==1){
		 Task_userreportmsg[0].Name=Task_GetName(Task_userreportmsg[0].Uid);
	}else{
		for(var i=0;i<Task_userreportmsg.length;i++){
			Task_userreportmsg[i].Name=Task_GetName(Task_userreportmsg[i].Uid);
		}
	}
}

function Task_pagenextshow(){
	  $('.task_detailsnext').empty().html('点击加载更多');
    $('.task_detailsnext').show();
}

function Task_Removesure () {
	var id=$('.task_details').attr('resid');
	var inde=$('.task_details').attr('ind');
	$('.cover_loading').show();
	var body = '{"Code":11303,"Body":{"SessionId":\"' + sessionId + '\","TaskId":\"' +id+ '\"}}';
	console.log('报文'+JSON.stringify(body));
	  var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	$.post('' + URI + '',
		function(ret) {
            var resp = decodeURIComponent(ret, 'UTF-8');
			var obj = $.parseJSON(resp);
      console.log(JSON.stringify(obj))
			if(obj.Result==200){
			   $('.cover_loading').hide();	
               showAlert('删除成功');
               $('.task_details').hide();
               $('.task_ulmenu').children().eq(inde).remove();
               $('.task_leftbtn').show();
			 }else if(obj.Result==404){
			   $('.cover_loading').hide();
               showAlert('您不是该案件创建者,无权限');
			}else{
			   $('.cover_loading').hide();
               showAlert('删除失败'); 
			}
		})
	event.stopPropagation();
  return false;
}

function Task_keeptask(){

	var id=$('.task_details').attr('resid');
	var inde=$('.task_details').attr('ind');
	var title=$('#Task_Name').val().trim();
	var task_con=$('#Task_deswrite').val().trim();
	var titleval=RegeMatchValC(title);
	var task_conval=RegeMatchValC(task_con);
	if(title==''){
		 showAlert('案件名称不能为空');
		 return;
	}
	if(titleval){
		 showAlert('案件名称不能有特殊字符！');
		 return;
	}
	if(task_conval){
		 showAlert('案件描述不能有特殊字符！');
		 return;
	}
   // task_con=task_con.replace(/\n|\r\n/g, "<br>");
	var json={"TaskId":id,"TaskTitle":title,"TaskContent":task_con};
	$('.cover_loading').show();

	var body = '{"Code":11302,"Body":{"SessionId":\"' + sessionId + '\","TaskId":\"' + id + '\","TaskTitle":\"' + title + '\","TaskContent":"' + task_con + '"}}';
	console.log('报文'+JSON.stringify(body));
	// var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
	// $.post('' + URI + '',
	// 	function(ret) {
	// 		 var resp = decodeURIComponent(ret, 'UTF-8');
	// 		 var obj = $.parseJSON(resp);
 //                if(obj.Result==200){
 //                    showAlert('修改成功！');
 //                    $('.cover_loading').hide();
 //                    Task_11302local(json,inde);
 //                }else if(obj.Result==404){
 //                	 $('.cover_loading').hide();
 //                    showAlert('您不是该任务创建者，无权限!');
 //                }else{
 //                   $('.cover_loading').hide();
 //                    showAlert('修改失败！');
 //                }
	// 		 }) 
     var arr=[json,inde];
     var conword='修改失败！';
   AjaxPostMsg(body, AJAXSET_TIME, Task_Writlecon, MediaErrorDown, MediaAjaxovertime, true, arr, conword); 
	     event.stopPropagation();	   
}

function Task_Writlecon(obj,arr){
        $('.cover_loading').hide();
         if(obj.Result==200){
                showAlert('修改成功！');
                Task_11302local(arr[0],arr[1]);
            }else if(obj.Result==404){
                showAlert('您不是该案件创建者，无权限!');
            }else{
                showAlert('修改失败！');
            }
}

function Task_11302local (data,inde){
	 for(var i=0;i<Taskarr.length;i++){
	 	if(Taskarr[i].TaskId==data.TaskId){
	 	   Taskarr[i].TaskTitle=data.TaskTitle;
	 	   Taskarr[i].TaskContent=data.TaskContent;	
	 	}
	 }
	 $('#Task_deswrite').val(data.TaskContent);
	 $('#Task_Name').val(data.TaskTitle);
	 $('.Task_detailscontent').children('textarea').val(data.TaskContent);
	 $('.task_ulmenu').children().eq(inde).find('.Task_nametitle').html(data.TaskTitle);
	 $('.task_detailstopname').html(data.TaskTitle);
	 Task_detailsfint();
}

function Task_Detailprevshow(id,inde){
	   task_listmsg;
    for(var i=0;i<Task_userreportmsg.length;i++){
    	if(Task_userreportmsg[i].Id==id){
    		task_listmsg=Task_userreportmsg[i];
    		task_listmsg.Name=Task_GetName(task_listmsg.Uid);
    	}
    }
    Task_Detailgetarrshow();
}

function Task_Detailgetarrshow () {
   var Task_CreatTime=task_listmsg.CreateTime.slice(0,16);
	 $('.task_reportimguser').html(Task_GetName(task_listmsg.Uid));
	 $('.task_reportimgtime').html(Task_CreatTime);
	 $('.task_repostdetext').html(task_listmsg.Detail);
	 if(task_listmsg.ResType==0){
         if(task_listmsg.ResUrl.length==1){
             $('.task_repostimgnum').hide();
             $('#task_MEDIA').hide();
             $('.task_repostimg_mainimgbg').css('background-image','url('+task_listmsg.ResUrl[0]+')');
             $('.task_repostimg_mainshadow span').removeClass('help_level2_imgsicons');
             $('.task_repostimg_mainimgbg').show();
             $('.task_details').hide();
	           $('.task_cover').show();
	           $('.task_reportimg').show();
         }else{
             Task_GetDeatilImgnum();
         }
	 }else if(task_listmsg.ResType==1){
             $('#task_MEDIA').remove();
             Task_GetDeatilvideo();
	 }else if(task_listmsg.ResType==2){
             // $('.task_repostimgnum').hide();
             // $('#task_MEDIA').hide();
             // $('.task_repostimg_mainimgbg').css('background-image','url("'+task_listmsg.ResUrl+'")');
             // $('.task_repostimg_mainshadow span').removeClass('help_level2_imgsicons');
             // $('.task_repostimg_mainimgbg').show();
             // $('.task_details').hide();
             // $('.task_cover').show();
             // $('.task_reportimg').show();
              
             $('#Task_Linevideo').hide();
             $('.task_repostline_mainimgbg').css('background-image','url("'+task_listmsg.ResUrl+'")');
             $('.task_repostline_mainshadow span').removeClass('help_level2_imgsicons');
             $('.task_repostline_mainimgbg').show();
             $('.task_details').hide();
             $('.task_cover').show();
             $('.task_reportlineul').hide();
             $('.task_msgul').hide();
             $('.task_reportlinevideo').show();
   }else if(task_listmsg.ResType==3){
         $('#Task_Linevideo').remove();
         Task_GetLineVdieo();
         //查询录音接口
         Task_Get10600(); 
 
    }
}

function Task_Get10600(){
    var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"' + task_listmsg.Longitude + '","TimeTo":"' + task_listmsg.Latitude + '","SesId":"' + task_listmsg.ChannelID + '","ResTypes":"[4,5]","PageSize":60,"PageIndex":0}}';
    var arr=[];
     var conword='查询IM消息失败！';
   AjaxPostMsg(body, AJAXSET_TIME, Task_GetImshow, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
}

function Task_GetImshow(obj){
  // console.log('录音'+JSON.stringify(obj));
  $('.cover_loading').hide();
  var html='';
  var time;
  var time2;
    if(obj.Result==200){
      task_IMmsg=obj.Messages;
        if(obj.Messages.length==0){
           
          $('.task_msgul').empty();
        }else if(obj.Messages.length==1){
              time=obj.Messages[0].Time.split(" ");
              time2=time[0];
         html='<li class="fix" id="Ta'+obj.Messages[0].Id+'"><div class="fl"><img src="img/chat/recording.png" alt="" onclick="recordingSpeak(\''+obj.Messages[0].Id+'\',\''+obj.Messages[0].ResUrl+'\')" /><span>'+obj.Messages[0].Name+'</span></div><div class="fr"><span>'+obj.Messages[0].Time+'</span></div></li>';
        }else{

          for(var i=0;i<obj.Messages.length;i++){
                time=obj.Messages[i].Time.split(" ");
              time2=time[0];
             html+='<li class="fix" id="Ta'+obj.Messages[i].Id+'"><div class="fl"><img src="img/chat/recording.png" alt="" onclick="recordingSpeak(\''+obj.Messages[i].Id+'\',\''+obj.Messages[i].ResUrl+'\')" /><span>'+obj.Messages[i].Name+'</span></div><div class="fr"><span>'+obj.Messages[i].Time+'</span></div></li>'; 
           }
        }
         $('.task_msgul').empty().append(html);
         $('.task_msgul').show();
    }   
}

 

function Task_GetDeatilvideo(){
	var vide='<video width="240" height="240" style="background:black" id="task_MEDIA" src=""><source src=""></video>';
	$('.task_repostimg_mainimgbg').append(vide);
	$('.task_repostimgnum').hide();
	$('#task_MEDIA').attr('src',task_listmsg.ResUrl[0]);
	$('.task_repostimg_mainshadow span').addClass('help_level2_imgsicons');
	$('#task_MEDIA').show();
	$('.task_repostimg_mainimgbg').show();
	$('.task_details ').hide();
	$('.task_cover').show();
	$('.task_reportimg').show();
}

function Task_GetLineVdieo(){
    $('#Task_Linevideo').remove();
    var vide='<video width="240" height="240" style="background:black" id="Task_Linevideo" src=""><source src=""></video>';
    $('.task_repostline_mainimgbg').append(vide);
   if(task_listmsg.ResUrl.length==1){
           $('#Task_Linevideo').attr('src',task_listmsg.ResUrl[0]);
           $('.task_repostline_mainimgbg span').addClass('help_level2_imgsicons');
           $('#Task_Linevideo').show();
           $('.task_repostline_mainimgbg').show();
           $('.task_details ').hide();
           $('.task_reportlineul').hide();
           $('.task_cover').show();
           $('.task_reportlinevideo').show();



        $('.task_msgul').hide(); //暂时

    }else{
       $('.task_repostline_mainimgbg').hide();
       $('.task_reportlinevideoul').empty();
       var html='';
         for(var i=0;i<task_listmsg.ResUrl.length;i++){
             html+='<li class="media_videomore" onclick="Task_Lookulvideo(this)"><video src="'+task_listmsg.ResUrl[i]+'"  type="video/mp4"></video><div class="task_linevideoshaow" ><span></span></div></li>';
         }
        $('.task_reportlinevideoul').append(html);
        $('.task_reportlineul').show();
        $('.task_details ').hide();
        $('.task_cover').show();
        $('.task_reportlinevideo').show();
        $('.task_msgul').hide(); //暂时
   }
}

function Task_GetDeatilImgnum(){
	    var imglen=task_listmsg.ResUrl.length;
        $('.task_repostimgone').empty();
        $('.task_repostimgtwo').empty();
        $('.task_repostimgthree').empty();
        for(var i=0;i<task_listmsg.ResUrl.length;i++){
            if (i < 3) {
                 $('.task_repostimgone').append('<li><img src="'+task_listmsg.ResUrl[i]+'" alt="" /><div class="task_repostimgnums"><span></span></div></li>');
               } else if (i < 6 && 3 <= i) {
                 $('.task_repostimgtwo').append('<li><img src="'+task_listmsg.ResUrl[i]+'" alt="" /><div class="task_repostimgnums"><span></span></div></li>');
               } else if (6 <= i) {
                 $('.task_repostimgthree').append('<li><img src="'+task_listmsg.ResUrl[i]+'" alt="" /><div class="task_repostimgnums"><span></span></div></li>');
               }
        }
        var imgli = '<li></li>';
        var imglis = '<li></li><li></li>';
         if (imglen <= 3) {
               var num = 3 - imglen;
               if (num == 1) {
                 $('.task_repostimgone').append(imgli);
               } else if (num == 2) {
                 $('.task_repostimgone').append(imglis);
               }
               $('.task_repostimgtwo').append('<li></li><li></li><li></li>');
               $('.task_repostimgthree').append('<li></li><li></li><li></li>');
         }
        if (3 < imglen && imglen <= 6) {
           var num = 6 - imglen;
           if (num == 1) {
             $('.task_repostimgtwo').append(imgli);
           } else if (num == 2) {
             $('.task_repostimgtwo').append(imglis);
           }
           $('.task_repostimgthree').append('<li></li><li></li><li></li>');
         }
        if (imglen <= 9) {
               var num = 9 - imglen;
               if (num == 1) {
                 $('.task_repostimgthree').append(imgli);
               } else if (num == 2) {
                 $('.task_repostimgthree').append(imglis);
               }
        }
        $('.task_repostimg_mainimgbg').hide();
        $('.task_repostimgnum ').show();
    	$('.task_details ').hide();
        $('.task_cover').show();
        $('.task_reportimg').show();
}

function  task_drop() {　　
     var div1 = document.getElementById("task_lookimg");　　
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

 function Task_Imgpositon(){
 	 var media_imgh = $('#task_lookimg').outerHeight();
     var media_imgw = $('#task_lookimg').outerWidth();
     var meidia_screenh = $(window).height();
     var meidia_screenw = $(window).width();
     var media_left = (Number(meidia_screenw) - Number(media_imgw)) / 2;
     var media_top = (Number(meidia_screenh) - Number(media_imgh) - 100) / 2;
     $("#task_lookimg").css("top", media_top);
     $("#task_lookimg").css("left", media_left);
 }

function task_imgpreview(){
	$('#bg-color').show();
    if(task_listmsg.ResType==0){ //img
         $('#task_video').hide();
         $('#TASK_play').hide();
         $('.task_lookimgpt img').attr('src',task_listmsg.ResUrl[0]);
         $('.task_lookimgpt').show();
       }else if(task_listmsg.ResType==1){ //video
       	$('#task_video').remove();
        var video=' <video width="700" height="500" style="background:black" id="task_video" controls="controls"  src=""><source src=""></video>';
        $('#task_lookimg').append(video);
        $('.task_lookimgpt').hide();
        Task_Getvideoarrshow();
     }else if(task_listmsg.ResType==2){ //抓拍
         $('#task_video').hide();
         $('#TASK_play').hide();
         $('.task_lookimgpt img').attr('src',task_listmsg.ResUrl);
         $('.task_lookimgpt').show();
     }else if(task_listmsg.ResType==3){ // video 
          $('#task_video').remove();
        var video=' <video width="700" height="500" style="background:black" id="task_video" controls="controls"  src=""><source src=""></video>';
         $('#task_lookimg').append(video);
         $('.task_lookimgpt').hide();
        Task_Getvideoarrshow();
     }
     $('#task_lookimg').show();
 }

function Task_GetImgnumshow (inde) {

       $('.task_lookimgleft').show();
       $('.task_lookimgright').show();
       var indes=$(inde).parent().index();
       $('.task_lookimgleft').attr('index',indes);
       $('.task_lookimgright').attr('index',indes);
       var src=$(inde).prev().attr('src');
	     $('#task_video').hide();
	     $('#TASK_play').hide();
	     $('#bg-color').show();
       $('.task_lookimgpt img').attr('src',src);
       $('.task_lookimgpt').show();
       $('#task_lookimg').show();
}

function Task_Getvideoarrshow(){
      var vison = IEVersion();
      var id='TASK_play';
        if (vison <= 10) {
            Helpplayrs(task_listmsg.ResUrl[0],id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }else if (vison == 11) {
         	// console.log(task_listmsg.ResUrl[0]);
          //   $('#task_video').attr('src', ''+task_listmsg.ResUrl[0]+'');
          //   $('#TASK_play').hide();
          //   $('#task_video').show();
            Helpplayrs(task_listmsg.ResUrl[0],id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }else {
            Helpplayrs(task_listmsg.ResUrl[0],id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }
}

function Task_GetmsgMap(){

 

    /***开始****/
    var sContent;
    var myIcon = new BMap.Icon("./img/icon/media/mapicon.png", new BMap.Size(24, 24));
	if (task_listmsg.ResType== 0) {
		sContent = '<p class="MapName"> <i>' +Task_GetName(task_listmsg.Uid)+ '</i></p><div class="media_mapimg"><img src="' +task_listmsg.ResUrl[0]+ '" alt=""></div>'+'<p class="media_mapimgp">'+task_listmsg.Detail+'</p><p class="media_mapimgp"><b>上报时间:</b>' +task_listmsg.CreateTime +'</p><p class="media_mapimgp"><b>经度:</b>'+task_listmsg.Longitude+'</p><p class="media_mapimgp"><b>纬度:</b>'+task_listmsg.Latitude+'</p>';
	} else if (task_listmsg.ResType== 1) {
		sContent = '<p class="MapName"> <i>'+Task_GetName(task_listmsg.Uid)+'</i></p><div class="media_mapimg"><video width="300" height="200" style="background:black"><source src="' + task_listmsg.ResUrl[0]+ '" type="video/mp4" media=""></video></div><p class="media_mapimgp">' +task_listmsg.Detail+ '</p><p class="media_mapimgp"><b>上报时间:</b>' +task_listmsg.CreateTime+ '</p><p class="media_mapimgp"><b>经度:</b>'+task_listmsg.Longitude+'</p><p class="media_mapimgp"><b>纬度:</b>'+task_listmsg.Latitude+'</p>';
	}
	var point = new BMap.Point(task_listmsg.Latitude, task_listmsg.Longitude);
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
  /***结束****/


}

function Task_Pagenext(){
	var index=task_body.PageIndex;
	    index++;
   var body = '{"Code":11305,"Body":{"SessionId":\"' +sessionId + '\","TaskId":\"' +task_body.TaskId+'\","LocationType":1,"PageSize":20,"PageIndex":'+index+'}}';
       console.log('报文'+JSON.stringify(body));
	$.getJSON(STATION_URL + '?Body=' + body,
       function(obj) {
			console.log('返回结果'+JSON.stringify(obj));
			// console.log('返回结果'+obj.Reports.length);
			if(obj.Result==200){
                 Task_usernextarr(obj);
                 task_body={"TaskId":task_body.TaskId,"LocationType":1,"PageSize":20,"PageIndex":index};
			}else{
                 $('.Task_detailslist_ul').hide();
                 $('.Task_detailslist_wu').show();
			}
		})
}

function Task_usernextarr(data){
	    if(data.Reports.length==0){
          $('.task_detailsnext').hide();
      }else if(data.Reports.length==1){
        $('.Taskinputall').removeClass('userall_selected');
        Task_usernextaddname(data);
        // Task_userreportmsg.push(data.Reports);
       Task_userreportmsg=Task_userreportmsg.concat(data.Reports);
        Task_usermsgnextshow(data); 
        $('.task_detailsnext').hide();
      }else{
         $('.Taskinputall').removeClass('userall_selected');
      	 Task_usernextaddname(data);
         // Task_userreportmsg.push(data.Reports);
         Task_userreportmsg=Task_userreportmsg.concat(data.Reports);
         Task_usermsgnextshow(data);
    }
}

function Task_usernextaddname(data){
   if(data.Reports.length==1){
   	  data.Reports[0].Name=Task_GetName(data.Reports[0].Uid);
   }else{
   	  for(var i=0;i<data.Reports.length;i++){
			data.Reports[i].Name=Task_GetName(data.Reports[i].Uid);
		}
   }
}

/*******TaskNext********/
function Task_usermsgnextshow(data){
      var html='';
	    var imgs;
   if(data.Reports.length==1){
   //   	var time=data.Reports[0].CreateTime.split(" ");
   //   	var time2=time[1];
   //   	   if(data.Reports[0].ResType==0){
   //   	   	   if(data.Reports[0].ResUrl.length==1){
   //                imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
   //   	   	   }else{
   //                imgs='<img src="img/icon/newicon/meida_nums.png" alt="" />';
   //   	   	   }
   //   	   }else{
   //                imgs='<img src="img/icon/newicon/help_video.png" alt="" />';
   //   	   }
   //   	          imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
   //     html='<li class="fix" resid="'+data.Reports[0].Id+'"><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+Task_GetName(data.Reports[0].Uid)+'</span><span class="fr">'+time2+'</span><p>'+data.Reports[0].Detail+'</p></div></li>';
      
        var time=data.Reports[0].CreateTime.split(" ");
        var time2=time[1];
         if(data.Reports[0].ResType==0){
               if(data.Reports[0].ResUrl.length==1){
                    imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
               }else{
                    imgs='<img src="img/icon/newicon/meida_nums.png" alt="" />';
               }
         }else if(data.Reports[0].ResType==1){
              imgs='<img src="img/icon/newicon/help_video.png" alt="" />';

         }else if(data.Reports[0].ResType==2){

              imgs='<img src="img/icon/newicon/help_img.png" alt="" />';

         }else if(Tdata.Reports[0].ResType==3){
              imgs='<img src="img/icon/newicon/help_videoline.png" alt="" />';
         }

         html='<li class="fix" resid="'+data.Reports[0].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+data.Reports[0].Name+'</span><p><span class="">'+data.Reports[0].CreateTime+'</span></p></div></li>';
           $('.task_detailsnext').hide();
           $('.Task_detailslist_ul ul').append(html);
     }else{
     	for(var i=0;i<data.Reports.length;i++){
     		var time=data.Reports[i].CreateTime.split(" ");
     	    var time2=time[1];
        var Task_CreatTime=data.Reports[i].CreateTime.slice(0,16);
     	    if(data.Reports[i].ResType==0){
     	    	if(data.Reports[i].ResUrl.length==1){
                   imgs='<img src="img/icon/newicon/help_img2.png" alt="" />';
     	    	}else{
                   imgs='<img src="img/icon/newicon/meida_nums.png" alt="" />';
     	    	}
     	       html+='<li class="fix" resid="'+data.Reports[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+data.Reports[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
     	    }else if(data.Reports[i].ResType==1){
     	    	  imgs='<img src="img/icon/newicon/help_video.png" alt="" />';
     	    	 html+='<li class="fix" resid="'+data.Reports[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+data.Reports[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
     	    }else if(data.Reports[i].ResType==2){
             imgs='<img src="img/icon/newicon/help_img.png" alt="" />';
             html+='<li class="fix" resid="'+data.Reports[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+data.Reports[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
          }else if(data.Reports[i].ResType==3){
             imgs='<img src="img/icon/newicon/help_videoline.png" alt="" />';
             html+='<li class="fix" resid="'+data.Reports[i].Id+'"><div class="task_in"></div><div class="fl Task_details_ulimg">'+imgs+'</div><div class="fr task_detailmsgtype"><span class="fl">'+data.Reports[i].Name+'</span><p><span class="">'+Task_CreatTime+'</span></p></div></li>';
          }
     	}
     	if(data.Reports.length==20){
     		Task_pagenextshow();
     	}else{
     		$('.task_detailsnext').hide();
     	}
     	$('.Task_detailslist_ul ul').append(html);
     }
        $('.Task_detailslist_ul').show();
}

function Task_ToNote (){

   var task_id=$('.task_details').attr('resid');
   var body = '{"Code":11307,"Body":{"SessionId":\"' + sessionId + '\","TaskId":"'+task_id+'"}}';
     var arr=[];
     var conword='查询案件备注失败！';
     
    AjaxPostMsg(body, AJAXSET_TIME, Task_GetTaskCon, MediaErrorDown, MediaAjaxovertime, true, arr, conword);  
   
}

 
 function Task_GetTaskCon(obj){
     console.log(JSON.stringify(obj));
     $('.cover_loading').hide();
     $('.task_Noteul').empty();
     $('.task_addarea').hide();
     var html='';
     if(obj.Result==200){
          if(obj.Reports.length==0){
              // showAlert('')
          }else if(obj.Reports.length==1){
          html+='<li resid="'+obj.Reports[0].TmId+'"><p><span class="task_conUid">'+obj.Reports[0].Uid+'</span><img src="img/icon/channel/channeldes.png" alt="" class="task_conlistremoveimg" /><span class="fr">'+obj.Reports[0].CreateTime+'</span></p><p class="task_Noteconta">'+obj.Reports[0].Content+'</p><div class="task_conlistremove"><span></span><p>您确定删除该备注？</p><div class="task_conlistremovebtn"><span onclick="task_conimgremove(this)">取消</span><span class="fr" onclick="task_conimgsure(this)">确定</span></div></div></li>';

          }else {
           for(var i=0;i<obj.Reports.length;i++){
                 html+='<li resid="'+obj.Reports[i].TmId+'"><p><span class="task_conUid">'+obj.Reports[i].Uid+'</span><img src="img/icon/channel/channeldes.png" alt="" class="task_conlistremoveimg"  /><span class="fr">'+obj.Reports[i].CreateTime+'</span></p><p class="task_Noteconta">'+obj.Reports[i].Content+'</p><div class="task_conlistremove"><span></span><p>您确定删除该备注？</p><div class="task_conlistremovebtn"><span onclick="task_conimgremove(this)">取消</span><span class="fr" onclick="task_conimgsure(this)">确定</span></div></div></li>';
             }
          }
         $('.task_Noteul').append(html);
         $('.task_numNote').show();
     }
 }

 function Task_Lookulvideo(obj){
      var url=$(obj).children('video').attr('src');
         $('#task_video').remove();
         var video=' <video width="700" height="500" style="background:black" id="task_video" controls="controls"  src=""><source src=""></video>';
        $('#task_lookimg').append(video);
        $('.task_lookimgpt').hide();
        $('#bg-color').show();
        $('#task_lookimg').show();
        Task_GetvideoarrUlshow(url);
 }
 
 function Task_GetvideoarrUlshow (url){
      var vison = IEVersion();
      var id='TASK_play';
        if (vison <= 10) {
            Helpplayrs(url,id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }else if (vison == 11) {
          console.log(url);
            // $('#task_video').attr('src', ''+url+'');
            // $('#TASK_play').hide();
            // $('#task_video').show();
             Helpplayrs(url,id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }else {
            Helpplayrs(url,id);
            $('#task_video').hide();
            $('#TASK_play').show();
         }
 }

 function Task_10600can () {
        $('.task_Balediv').slideUp();
 }

 function Task_10600sure() {
  var task_id=$('.task_details').attr('resid');

   var body = '{"Code":11306,"Body":{"SessionId":\"' + sessionId + '\","TaskId":"'+task_id+'"}}';
     var arr=[];
     var conword='打包案件失败！';
    AjaxPostMsg(body, AJAXSET_TIME, TaskSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
 }
  
  function TaskSucessDown (obj) { 
  console.log('下载'+JSON.stringify(obj));
     $('.cover_loading').hide();

      if (obj.Result == 200) {
         $('.task_Balediv').slideUp();
           var address = obj.URL;
           var  address1 = '';
               savepics(address);
         }else{
           showAlert('下载失败！');
         }
  } 


function task_addcon(){
      $('.task_conlistremoveimg').attr('src','img/icon/channel/channeldes.png');
      $('.task_conlistremove').hide();
    if($('.task_addarea').is(':hidden')){
       $('#task_Notecon').val('');
       $('.task_addarea').slideDown();
     }else{
       $('.task_addarea').slideUp();
    }
}

function task_addconsure(){
    var task_id=$('.task_details').attr('resid');
    var conval=$('#task_Notecon').val().trim();
    var body = '{"Code":11308,"Body":{"SessionId":\"' + sessionId + '\","TaskId":"'+task_id+'","Content":"'+conval+'"}}';
    var date = new Date();
     var timeover = date.getFullYear() + '-' + ((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
     var arr=[task_id,conval,timeover];
     var conword='添加案件备注失败！';
    AjaxPostMsg(body, AJAXSET_TIME, TaskAddcon, MediaErrorDown, MediaAjaxovertime, true, arr, conword); 

}

function task_addconerror (){
   $('.task_addarea').slideUp();
}

/*****增加备注********/
function TaskAddcon(obj,arr){
    $('.cover_loading').hide();
    var uid = loginId;

    if(obj.Result==200){
        showAlert('添加备注成功!');
     var  html='<li resid="'+obj.TmId+'"><p><span class="task_conUid">'+uid+'</span><img src="img/icon/channel/channeldes.png" alt="" class="task_conlistremoveimg" /><span class="fr">'+arr[2]+'</span></p><p class="task_Noteconta">'+arr[1]+'</p><div class="task_conlistremove"><span></span><p>您确定删除该备注？</p><div class="task_conlistremovebtn"><span onclick="task_conimgremove(this)">取消</span><span class="fr" onclick="task_conimgsure(this)">确定</span></div></div></li>';
     $('.task_Noteul').append(html);
     $('.task_addarea').slideUp();
    }else{
        showAlert('添加备注失败!');
    }
}

function task_conimgremove(obj){
    $(obj).parent().parent().slideUp();
    // $(obj).parent().parent().parent().find('.task_conlistremoveimg').attr('src','img/icon/fence/fence_bg_del2.png');
    $('.task_conlistremoveimg').attr('src','img/icon/channel/channeldes.png');
    
}

function task_conimgsure(obj){
    var task_id=$('.task_details').attr('resid');
    var imid=$(obj).parent().parent().parent().attr('resid');
    var inde=$(obj).parent().parent().parent().index();

    var body = '{"Code":11309,"Body":{"SessionId":\"' + sessionId + '\","TaskId":"'+task_id+'","TmId":'+imid+'}}';
    var arr=[inde];
    var conword='删除案件备注失败！';
    AjaxPostMsg(body, AJAXSET_TIME, Task_listremovecon, MediaErrorDown, MediaAjaxovertime, true, arr, conword);
}


function Task_listremovecon(obj,arr){
    $('.cover_loading').hide();
    if(obj.Result==200){
       $('.task_Noteul').children().eq(arr[0]).remove();
       showAlert('删除备注成功!');
       // $('.task_numNote').hide();
    }else{
       showAlert('删除备注失败!');
    }
}

function Task_DetailsShow(arr){
     var Task_CreatTime=arr[1].slice(0,16);
     $('.task_reportimguser').html(arr[0]);
     $('.task_reportimgtime').html(Task_CreatTime);
     $('.task_conlistdeshow p').html(arr[2]);
     $('.task_details ').hide();
     $('.task_cover').show();
     $('.task_conlisttails').show();
}

 function Task_SelcetAll(){
        task_selcetlist.clear();
       if(Task_userreportmsg.length==0){
           task_Selectnum=0;
              return;
       }else if(Task_userreportmsg.length==1){
          task_Selectnum=1;
          task_selcetlist.put(Task_userreportmsg[0].Id,Task_userreportmsg[0]);
           $('.Task_downbtn button').removeAttr('disabled','disabled'); 
           $('.Task_downbtn button').addClass('HelpReads');
           $('.tasknumtotal').html(task_Selectnum);
       }else{
         task_Selectnum=Task_userreportmsg.length;
          // for( var i in Task_userreportmsg){
         
          //     console.log(Task_userreportmsg[i].Id);
          // }
          for(var i=0;i<Task_userreportmsg.length;i++){
              task_selcetlist.put(Task_userreportmsg[i].Id,Task_userreportmsg[i]);
          }
          $('.Task_downbtn button').removeAttr('disabled','disabled');
          $('.Task_downbtn button').addClass('HelpReads');
          $('.tasknumtotal').html(task_Selectnum);
       }
 }
 
 function Task_RemoveSelcetAll(){
       task_Selectnum=0;
       $('.tasknumtotal').html(task_Selectnum);
       task_Selectnum=0;
       task_selcetlist.clear();
       $('.Task_downbtn button').attr('disabled',true);
       $('.Task_downbtn button').removeClass('HelpReads');
 }

 function Task_SelectAdd(index){
     task_Selectnum++;
     $('.tasknumtotal').html(task_Selectnum);
     task_selcetlist.put(Task_userreportmsg[index].Id,Task_userreportmsg[index]);
      $('.Task_downbtn button').removeAttr('disabled','disabled');
      $('.Task_downbtn button').addClass('HelpReads');
     if(task_Selectnum==Task_userreportmsg.length){
        $('.Taskinputall').addClass('userall_selected');
     }
 }

 function Task_SelectReduce(index){
     task_Selectnum--;
    $('.tasknumtotal').html(task_Selectnum);
     task_selcetlist.remove(Task_userreportmsg[index].Id,Task_userreportmsg[index]);
     if(task_Selectnum==Task_userreportmsg.length-1){
        $('.Taskinputall').removeClass('userall_selected');
     }
     if(task_Selectnum==0){
       $('.Task_downbtn button').attr('disabled',true);
       $('.Task_downbtn button').removeClass('HelpReads');
     }
 }



function Task_GetTasklist(){
      var index=0;
      var taskname=$('#task_listval').val().trim();
      // var taskbetime=$('#task_liststtime').val();
      // var taskovertime=$('#task_listovertime').val();


     var date = new Date();
     var over;
     var dataday = date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate()) + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
     var datanowday=date.getFullYear() + '-' + getTimezero((date.getMonth() + 1)) + '-' + getTimezero(date.getDate());
     var start = $('#task_liststtime').val() + ' ' + '00:00:00';
     var overval=$('#task_listovertime').val();
       if(datanowday==overval){
             over = $('#task_listovertime').val() + ' ' + getTimezero(date.getHours()) + ':' + getTimezero(date.getMinutes()) + ':' + getTimezero(date.getSeconds());
       }else{
             over = $('#task_listovertime').val() + ' 23:59:59'; 
       }
      
    var type = '';
    var hang = '<br>';
    if (start > over) {
      common._coverShow("开始时间必须早于结束时间" + hang + "请重新选择");
      setTimeout(function() {
        common._coverHide();
      }, 3000);
      return;
    }
    if (over > dataday) {
      common._coverShow("结束时间必须不能大于现在时间" + hang + "请重新选择");
      setTimeout(function() {
        common._coverHide();
      }, 3000);
      return;
    }





      var body = '{"Code":11301,"Body":{"SessionId":\"' + sessionId + '\","PageSize":20,"PageIndex":0,"Uid":"","TaskTitle":"'+taskname+'","TimeBegin":"'+start+'","TimeEnd":"'+over+'"}}';
      var loading='<div class="channelloadings"><img src="img/loading.gif" alt="" /><p>加载中，请稍等...</p></div>';
      $('.task_ulmenu').empty();
      $('.task_details').hide();
      $('.task_ulmenu').append(loading);
      console.log(JSON.stringify(body));
     
     console.log(body);
     var arr=[index];
     var conword='获取案件失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Task_GetTitleTask, MediaErrorDown, MediaAjaxovertime, false, arr, conword);
      return;
    //  var URI = encodeURI(encodeURI(STATION_URL + '?Body=' + body, 'UTF-8'), 'UTF-8');
    // $.post('' + URI + '',
    //   function(ret) {
    //     var resp = decodeURIComponent(ret, 'UTF-8');
    //     var obj = $.parseJSON(resp);
    //     console.log('返回结果'+obj.Result);
    //     console.log(JSON.stringify(obj));
    //     if (obj.Result == 200) {
            
    //            Taskarr=obj.Tasks;
    //            Task_listshowarr(obj, index);
    //        }else{ 
    //                showAlert('获取任务失败！');
    //      }
    //   })
}

function Task_GetTitleTask(obj,arr){
        if (obj.Result == 200) {
               Taskarr=obj.Tasks;
               Task_Titlelistshowarr(obj, arr[0]);
           }else{ 
                $('.task_ulmenu').empty();
                showAlert('获取案件失败！');
           }
}

function Task_Down(){
  
     var tasklist=task_selcetlist.values();
     var datas = [];

     for (var i = 0; i < tasklist.length; i++) {
       var type = tasklist[i].ResType; //类型
       var urllen=tasklist[i].ResUrl.length;//长度
       var url;
       if (type == 3) {
          // type = 1;
           url=toBase64(tasklist[i].Detail);
       } else if (type == 2) {
         // type = 0;
         console.log(tasklist[i].ResUrl);
          url=toBase64(tasklist[i].ResUrl);
          urllen=1;
       }else{
         url=toBase64(tasklist[i].ResUrl[0]);
       }
       datas[i] = '{"Url":"' + url+ '","ResType":' + type + ',"Uid":"' + tasklist[i].Uid+'","ReportIds":"' + tasklist[i].ReportID + '","ResCount":"' + urllen+'","ResourceTime":"'+tasklist[i].CreateTime+'"}';
     }
    
    var body = '{"Code":"11310","Body":{"SessionId":"' + sessionId + '","Resources":['+datas+']}}';
        console.log('正常字符串'+body);
       // $('.cover_loading').show();
       var arr=[];
       var conword='下载失败！';
       // alert(datas.length);
       var timeto=datas.length*60000;
       AjaxPostMsgDown(body, timeto, MediaSucessDown, MediaErrorDown, MediaAjaxovertime, true, arr, conword);

}

 function Media_topFintleft (){

   var WINDOW_WIDTH = $(window).width();
   var left = 100 * (WINDOW_WIDTH - 350) / (2 * WINDOW_WIDTH) + '%';
   $('#Media_Topmsg').css('left', left);

 }

 function bgTwinklemedia() {
  $('#Media_Topmsg').show();
  var notice = $('#Media_Topmsg');
  notice.css('opacity', 1);
  var foo = function() {
    if (notice.css('opacity') == 1) {
      notice.animate({
        opacity: '0.5'
      }, 500)
    } else {
      notice.animate({
        opacity: '1'
      }, 500)
    }
  };
  Media_veTime = setInterval(foo, 510);
}


   function Getcode11400Top () {

     var body = '{"Code":"11400","Body":{"SessionId":"' + sessionId + '"}}';
     // console.log(body);
     $.getJSON('' + STATION_URL + '?Body=' + body + '',
       function(ret) {
             console.log('fN结果'+JSON.stringify(ret));  
         if (ret.Result == 200) {
         
         
              var Report_Img=ret.SpaceMediaUsed/ret.SpaceMediaTotal;
              var Report_Video=ret.SpaceVideoUsed/ret.SpaceVideoTotal;
                // var Report_Img=0.1;
                // var Report_Video=0.98;
              console.log('空間'+Report_Img);
              console.log('视频存储空间'+Report_Video);
              var cleartime=5000;
              /****** 开始******/

              if(Report_Img>=0.99 && Report_Video>=0.99){
                   var Top_content='您的上报记录和实时视频存储容量已满<br/>为了不影响继续存储新内容，请及时清理';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img>=0.99 && Report_Video<0.99){
                   var Top_content='您的上报记录存储容量已满<br/>为了不影响继续存储新内容，请及时清理';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img<0.99 && Report_Video>=0.99){
                  var Top_content='您的实时视频存储容量已满<br/>为了不影响继续存储新内容，请及时清理';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                    return;
              }


              if(Report_Img>=0.95 && Report_Video>=0.95){
                   var Top_content='您的上报记录和实时视频存储容量已经达到95%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img>=0.95 && Report_Video<0.95){
                   var Top_content='您的上报记录存储容量已经达到95%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img<0.95 && Report_Video>=0.95){
                  var Top_content='您的实时视频存储容量已经达到95%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                    return;
              }

              if(Report_Img>=0.85 && Report_Video>=0.85){
                   var Top_content='您的上报记录和实时视频存储容量已经达到85%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img>=0.85 && Report_Video<0.85){
                   var Top_content='您的上报记录存储容量已经达到85%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                return;

              }else if(Report_Img<0.85 && Report_Video>=0.85){
                  var Top_content='您的实时视频存储容量已经达到85%，请尽快扩容';
                $('#Media_Topmsg').html(Top_content);
                Media_topFintleft();
                bgTwinklemedia();
                setTimeout(Media_topclear,cleartime);
                    return;
              }

              /*******结束**********/


              // if(Report_Img>=1){
              //   var Top_content='您的上报记录存储容量已满,为了不影响继续存储新内容,请及时处理';
              //   $('#Media_Topmsg').html(Top_content);
              //   Media_topFintleft();
              //   bgTwinklemedia();
              //   setTimeout(Media_topclear,5000);
              //    return;

              // }else if(Report_Img>=0.95){
              //   var Top_content='您的上报记录存储容量已达到95%,请尽快扩容';
              //   $('#Media_Topmsg').html(Top_content);
              //    Media_topFintleft();
              //    bgTwinklemedia();
              //    setTimeout(Media_topclear,5000);
              //    return;

              // }else if(Report_Img>=0.85){
              //   var Top_content='您的上报记录存储容量已达到85%,请尽快扩容';
              //   $('#Media_Topmsg').html(Top_content);
              //     Media_topFintleft();
              //     bgTwinklemedia();
              //     setTimeout(Media_topclear,5000);
              //      return;
              // }

              // if(Report_Video>=1){
              //   var Top_content='您的实时视频存储容量已满,为了不影响继续存储新内容,请及时处理';
              //    $('#Media_Topmsg').html(Top_content);
              //      Media_topFintleft();
              //      bgTwinklemedia();
              //      setTimeout(Media_topclear,5000);
              //       return;

              // }else if(Report_Video>=0.95){
              //    var Top_content='您的实时视频存储容量已达到95%,请尽快扩容';
              //     $('#Media_Topmsg').html(Top_content);
              //       Media_topFintleft();
              //       bgTwinklemedia();
              //       setTimeout(Media_topclear,5000);
              //        return;

              // }else if(Report_Video>=0.85){
              //    var Top_content='您的实时视频存储容量已达到85%,请尽快扩容';
              //    $('#Media_Topmsg').html(Top_content);
              //      Media_topFintleft();
              //      bgTwinklemedia();
              //      setTimeout(Media_topclear,5000);
              //       return;

              // }

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
 

function Media_topclear () {

     clearInterval(Media_veTime);
     $('#Media_Topmsg').hide();
     
}

function task_lookimgprev (data){

      var inde=$(data).attr('index');
      var len=task_listmsg.ResUrl.length;
      if(inde==0){

         $(data).attr('index',len-1);
         $('.task_lookimgright').attr('index',len-1);
         $(data).next().attr('src',task_listmsg.ResUrl[len-1]);
 

      }else{
        inde--;
        $(data).attr('index',inde);
        $('.task_lookimgright').attr('index',inde);
        $(data).next().attr('src',task_listmsg.ResUrl[inde]);
 
      }

}

function task_lookimgnext (data){

      var inde=$(data).attr('index');
      var len=task_listmsg.ResUrl.length;
      if(inde==len-1){

         $(data).attr('index',0);
         $('.task_lookimgleft').attr('index',0);
         $(data).prev().attr('src',task_listmsg.ResUrl[0]);
 

      }else{
        inde++;
        $(data).attr('index',inde);
        $('.task_lookimgleft').attr('index',inde);
        $(data).prev().attr('src',task_listmsg.ResUrl[inde]);
 
      }
 

  
}
 