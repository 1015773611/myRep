
var HelpManArrays=[];
var alldispatcher = []; //所有调度员
var userInfos = new HashMap();
var treeAddUsers = new HashMap();//树所选成员列表
var User_SetImgIcon=true;
var orgUser = {
	_init: function() {
		Map_Lineclear();
		orgTreeInit();
		
		//跨企业图标
		// $("#treeDemo").children("li:gt(0)").find('a').css({
		// 	"background-image": "url(img/icon/user_cross_logo.png)",
		// 	"background-position": "right center",
		// 	"background-repeat": "no-repeat"
		// });

		// $('.foucstyle').on('focus', function(e) {
		// 	e.target.style.border = '1px solid #FA7C01'
		// }).on('blur', function(e) {
		// 	e.target.style.border = '1px solid #ccc';
		// })


		//跨企业申请等隐藏页面的初始位置
		var ht = $('.content').height();
		// $('.usr-Cross').css({
		// 	"left": "70px",
		// 	"bottom": "0px"
		// });

		// $('.cus-apply').css({
		// 	"left": "70px",
		// 	"bottom": "0px"
		// });

		// $('.cus-addMine').css({
		// 	"left": "70px",
		// 	"bottom": "0px"
		// });

		//跨企业调度点击事件
		// $('.user-Cross-Enterprise').click(
		// 	function() {
		// 		$('.user-list').hide();
		// 		$('.usr-Cross').show();
		// 		$('.usr-Cross').animate({
		// 				"height": ht
		// 			},
		// 			1000,
		// 			function() {
		// 				$('.user-Cross-list a').css({
		// 					"background-image": "url(img/icon/user_cross_drop.png)",
		// 					"background-position": "200px 20px",
		// 					"background-repeat": "no-repeat"
		// 				});
		// 			}
		// 		)
		// 	}
		// );

		//跨企业调度页面收起
		// $('.user-Cross-list').click(function() {
		// 	$('.usr-Cross').animate({
		// 		height: 0
		// 	}, 1000, function() {
		// 		$('.usr-Cross').hide();
		// 		$('.user-Cross-list a').css({
		// 			"background-image": "none"
		// 		});
		// 	})
		// });

		//已关联企业点击事件
		// $('.user-Cross-relative1').click(function(event) {
		// 	$('.user-Cross4').show();
		// 	$('.user-Cross5').hide();
		// 	$('.user-Cross6').hide();
		// 	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		// });
		// $('.user-Cross-relative2').click(function() {
		// 	$('.user-Cross4').hide();
		// 	$('.user-Cross5').show();
		// 	$('.user-Cross6').hide();
		// 	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		// });
		// $('.user-Cross-relative3').click(function() {
		// 	$('.user-Cross4').hide();
		// 	$('.user-Cross5').hide();
		// 	$('.user-Cross6').show();
		// 	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		// });

		$('#name_Id').on('click', function() {
			users_list_appear_name_id()
		})

		$(document).click(function() {
			$('.user-Cross4').hide();
			$('.user-Cross5').hide();
			$('.user-Cross6').hide();
		});
		$('.user-Cross4').click(function() {
			return false;
		});
		$('.user-Cross5').click(function() {
			return false;
		});
		$('.user-Cross6').click(function() {
			return false;
		});

		//申请跨企业调度
		// $('.user-apply-info').click(function() {
		// 	$('.cus-apply').show();
		// 	$('.cus-apply').animate({
		// 		height: ht
		// 	}, 1000, function() {

		// 	});
		// });

		borderColor();
		$('.user-cancel').click(function() {
			cusNum = 1;
			$('.other').remove();
			$('.cus-apply').animate({
				height: 0
			}, 1000, function() {
				$('.cus-apply').hide();
			});
		});

		//跨企业调度信息验证后下一步按钮点击事件
		// $('.user-next').click(function() {
		// 	$('.cus-addMine').show();
		// 	$('.cus-addMine').animate({
		// 		height: ht
		// 	}, 1000, function() {
		// 		myTree();
		// 		$('.user-selected').show();
		// 	});

		// });

		// $('.user-prev').on('click', function() {
		// 	$('.user-selected').hide();
		// 	$('.cus-addMine').animate({
		// 		height: 0
		// 	}, 500);
		// })

		//我方成员，对方成员点击事件
		// $('.ourList').click(function() {
		// 	$('.ourList').css("background-color", "#9C9A95");
		// 	$('.otherList').css("background-color", "#DDD8D4");
		// 	$('.ul-our').show();
		// 	$('.ul-other').hide();
		// });
		// $('.otherList').click(function() {
		// 	$('.otherList').css("background-color", "#9C9A95");
		// 	$('.ourList').css("background-color", "#DDD8D4");
		// 	$('.ul-other').show();
		// 	$('.ul-our').hide();
		// });

		//set设置点击
		$('.set-logo').click(function(e) {
			if ($('.set-div').css("display") == 'block') {
				$('.set-div').hide();
				$('.part2').hide();
				$('.part1').hide();
				$('.set-logo').attr("src", "img/icon/newicon/channel_set.png");
				User_SetImgIcon=true;
			} else {
				$('.set-div').show();
				$('.part1').show();
				$('.part2').hide();
				$('.set-logo').attr("src", "img/icon/newicon/channel_sets.png");
				User_SetImgIcon=false;
			}
			e.stopPropagation();
		});
		$('.set-logo').hover(function() {
			 if(User_SetImgIcon){
     
                $('.set-logo').attr("src", "img/icon/newicon/channel_sets.png");
			 }
		}, function() {
			 if(User_SetImgIcon){
			 	$('.set-logo').attr("src", "img/icon/newicon/channel_set.png")
			 }
		});

		//org-Dissolute
		$('.org-Dissolute').click(function() {
			$('.part1').hide();
			$('.part2').show();
		});

		//点击组织侧边栏小按钮
		$('.orge_btn').on('click', function() {
			$('.user-list').hide('slow', function() {
				$('.user_btn').show();
			});
		});

	  $('.OrgName').on('input propertychange',function(){
        if($(this).val()!=''){
            $('#addGroupNode button').addClass('btn-active').removeAttr("disabled");
 
         }else{

             $('#addGroupNode button').removeClass('btn-active').attr("disabled", true);
        }
	})
	  $('.OrgNewName').on('input propertychange',function(){
        if($(this).val()!=''){
            $('#editGroupName button').addClass('btn-active').removeAttr("disabled");
 
         }else{

             $('#editGroupName button').removeClass('btn-active').attr("disabled", true);
        }
	})

		//点击成员排序侧边栏小按钮
		$('.user-sort_btn').on('click', function() {
			$('.user-sort').hide('slow');
		});

			//用户信息编辑清空错误项
		$('.editUserPwd').on('keyup', function() {
			if ($(this).val() === '') {
				$('.error').text('');
			}
		})

		$('.editUserPwdnew').on('keyup', function() {
			if ($(this).val() === '') {
				$('.error').text('');
			}
		})

		$(document).on('click', function() {
			if ($('#station_user').css('display') === 'block') {
				userEventDispatch();
			}
		})

		$('.edited-concent').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('.user-close').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('.user-remove').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('.set-div').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('#addGroupNode').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('#editGroupName').on('click', function(event) {
			event.stopPropagation(); 
		})

		$('#sortGroupNode').on('click', function(event) {
			event.stopPropagation(); 
		})					
	},

	appear: function() {
		var wH = $(window).height() - 80;
	 
		$('.Height').height(wH);
		$(".ht2").height(wH - 106);
		$('.user-column1').height(wH - $('.user-Cross-Enterprise').height());
		$('.org-mid').height(wH - $('.org-top').outerHeight() - $('.org-btm').outerHeight());
		$('.orgMid').height(wH - $('.org-top').outerHeight() - $('.org-btm').outerHeight());
		$('.middle_box').height(wH - $('.mon-add-top ').outerHeight() - $('.user-Cross-footer').outerHeight());
		$('.helpsec ').animate({
			'margin-left': '80px'
		});
		$('.left_icon').css("top", (wH - 50) / 2);
		$('.helpleft_icon').css("top", (wH - 50) / 2);
	}

};

function userEventDispatch() {
	userEditedEvent();
	userRemoveEvent();
	userLimitEvent();
	userSetEvent();
	userGroupaddEvent();
	userGroupEditedEvent();
	userGroupSortEvent();
}

function userEditedEvent() {
	$('.edited-concent').hide();
	$('.userEdit_img').attr('src', 'img/icon/userIcon/user_bi.png');
}

function userRemoveEvent() {
	$('.user-remove').hide();
	$('.remove-img').attr('src', 'img/icon/fence/fence_bg_del1.png');
}

function userLimitEvent() {
	$('.user-close').hide();
	$('.userInfo_img').attr('src', 'img/icon/newicon/powers.png');
}

function userSetEvent() {
	$('.set-div').hide();
	$('.set-logo').attr('src', 'img/icon/newicon/channel_set.png');	
}

function userGroupaddEvent() {
	$('#addGroupNode').hide();
}

function userGroupEditedEvent() {
	$('#editGroupName').hide();
}

function userGroupSortEvent() {
	$('#sortGroupNode').hide();
}

var userImgDeleteShow = function() {
	$(".user-delete").show();
};

var userImgDeleteHide = function() {
	$(".user-delete").hide();
};

var userImgDelete = function() {
	
};

//全部用户成员map表
function usersMap(array) {
	//其他业务请在这里实现
	usersToOtherOperate(array);

	if (array.length) {
		//生成usersAll
		for (var i = 0, len = array.length; i < len; i++) {
			usersAll.put(array[i].Uid, array[i]);
		}
		//初始化组织节点树
		var tree = orgNodesTree.loopUsers();
		if (tree) {
			orgNodesTree.initNodes(orgNodesTree.originData);
			var key = onlineInfo.keySet();
			var onlineusers = [];
			key.forEach(function(item) {
				onlineusers.push({ipocid: item, userstate: 1})
			})
			orgNodesTree.refreshNodes(onlineusers);
			orgNodesTree.initTreeTiming = +new Date();
			if (sideObj.user) {
				$('.userLoading').hide();
				initzTree();
			}
		}
	}

	// window.frames["veiframe"].HelpMansArrays = array;
}


function usersToOtherOperate(array) {
	var loginid = loginId;
	for (var i = 0; i < array.length; i++) {
		if (array[i].Uid == loginid) {

		} else {
			HelpManArrays.push(array[i]);
		}
	}
}


//查了下，没有地方调用该函数，暂时注释。
// function HelpCodes10115() {
// 	var html = '';
// 	for (var i = 0; i < HelpManArrays.length; i++) {
// 		html += '<li name="' + HelpManArrays[i].Name + '" user="' + HelpManArrays[i].Uid + '"><input type="checkbox" onclick="user_Alls(this)" /><i>' + HelpManArrays[i].Name + '</i></li>';
// 	}
// 	$('.User_Alls').empty();
// 	$('.User_Alls').append(html);
// }


//成员排序
function userSort() {
	$('.user-sort').show('slow');
	$('.set-div').hide();
	$('.set-logo').attr("src", "img/icon/newicon/channel_set.png");
	$("#user-sort-ul1").sortable();
	//$("#user-sort-ul1").disableSelection();
	//$('#user-sort-ul2').sortable();
	//$('.user-sort-ul2').disableSelection();

	$('#user-sort-ul1 li').mousedown(function() {
		$(this).find('.color-bar').find('span').css("background", "#FF8B00")
	});
	$('#user-sort-ul1 li').mouseup(function() {
		$(this).find('.color-bar').find('span').css("background", "#ccc");
	});
	// $('#user-sort-ul2 li').mousedown(function() {
	// 	$(this).find('.color-bar').find('span').css("background", "#FF8B00");
	// });
	// $('#user-sort-ul2 li').mouseup(function() {
	// 	$(this).find('.color-bar').find('span').css("background", "#ccc")
	// });
}

function userSortSave() {

	var ul1 = $('#user-sort-ul1'),
		ul2 = $('#user-sort-ul2'),
		arr1 = [],
		Id = $('.org-mid1-name').data('id'),
		body;

	if (ul1.is(':empty')) {
		showAlert('排序列表中没有成员！');
		return;
	}
    User_SetImgIcon=true;
	ul1.children('li').each(function() {
		arr1.push($(this).attr('uid'));
	})
	arr1 = JSON.stringify(arr1);
	body = '{"Code":11420,"Body":{"SessionId":\"' + sessionId + '\","Id":' + Id + ',"IdType":1,"ObjectIds":' + arr1 + '}}';
	// console.log(body);
	coverShow();
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			coverHide();
			if (ret.Result == 200) {
				$('.user-sort').hide('slow');
				$('.user-list').hide();
				showAlert('排序成功！');
			} else {
				showAlert('排序失败!');
			}
		}
	)
}


//移动成员
function userMoving() {
	$('#bg-color').show();
	$('.user-move').slideDown('slow');
	initgTree();
}

function doMoveUser() {
	var oInput;
	var oInput2 = document.getElementsByName('list-1');
	var oInput1 = document.getElementsByName('list-3');
	var arr = [];
	var treeObj = $.fn.zTree.getZTreeObj("moveUserTree");
	var nodes = treeObj.getSelectedNodes();

	if ($('#org-no-list').is(':hidden')) {
		oInput = oInput1;
	} else {
		oInput = oInput2;
	}

	for (var i = 0, len = oInput.length; i < len; i++) {
		if (oInput[i].checked == true) {
			var userid = oInput[i].id;
			userid = userid.slice(0, userid.length - 2);
			arr.push(userid);
		}
	}

	if (nodes.length == 0) {
		showAlert('请选择要移动到的组织！');
		return;
	} else {
		var ToOrgId = nodes[0].id;
		var arr1 = JSON.stringify(arr);

		var body = '{"Code":10110,"Body":{"SessionId":\"' + sessionId + '\","ToOrgId":' + ToOrgId + ',"Users":' + arr1 + '}}';
		console.log(body);
		var ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var parentNode = ztreeObj.getNodeByParam("id", ToOrgId, null);
		var childNode;

		coverShow();
		$.getJSON('' + STATION_URL + '?Body=' + body + '',
			function(ret) {
				coverHide();
				if (ret.Result == 200) {
					for (var j = 0, log = arr.length; j < log; j++) {
						var userinfo = usersAll.get(arr[j]);
						userinfo.Role = 0;
						userinfo.OrgId = ToOrgId;
					}

					$('.user-move').slideUp('slow');
					$('#bg-color').hide();
					$('.user-list').hide();
					$('.checkstyle').prop('checked', false);
					$('.checkstyle').prop('indeterminate', false);
					$('.total').text(0);
					showAlert('移动成员成功！');
					alldispatcherRemove(arr);
					allUsersDispatcherRemove(arr);
					orgTreeUpdate();
				} else if (ret.Result == 406) {
					var userorgid=usersAll.get(HelploginId).OrgId;
					console.log('数组'+arr.length);
				    // var user_listlen=[];
				    var user_ALLmsg=[];
				    
					for(var i=0;i<arr.length;i++){
						var arrnum=Number(arr[i]);
					   var roleuser=usersAll.get(arrnum);
					   user_ALLmsg.push(roleuser);
					  
					}
                    userlist_seachAll(user_ALLmsg,userorgid);
					
					
					
					// showAlert('移动成员中包含同级调度员，不允许归属！')
				} else if (ret.Result == 407) {
					showAlert('相同组织不能再次归属！');
				} else {
					showAlert('移动成员失败！');
				}
			}
		);
	}
}

function userlist_seachAll (user_ALLmsg,userorgid) {
	var user_listlen=[];
    
	for(var i=0;i<user_ALLmsg.length;i++){

		  if(user_ALLmsg[i].Role!=0 && user_ALLmsg[i].OrgId>=userorgid){
			     user_listlen.push(user_ALLmsg[i].Uid);
		   }
	}
  user_listrole(user_listlen);

}

function user_listrole (user_listlen) {
	 var user_roleli='';
       
	    for(var i=0;i<user_listlen.length;i++){
						 user_roleli+='<li>'+user_listlen[i]+'</li>';

					}
	 var listulli='<p>下面成员为同级调度员</p><ul >'+user_roleli+'</ul>'
					common._coverShow('移动成员中包含同级调度员，不允许归属！'+listulli);
			              setTimeout(function (){
			                common._coverHide();
			          },5000);
}

function alldispatcherRemove(array) {
	if (array.length) {
		array.forEach(function(item) {
			for(var i=0, len=alldispatcher.length; i<len; i++) {
				if (item === alldispatcher[i].Uid) {
					alldispatcher.splice(i, 1)
					break;
				}
			}
		})
	}
}

function allUsersDispatcherRemove(array) {
	if (array.length) {
		array.forEach(function(item) {
			usersAll.get(item).Role = 0;
		})
	}
}


//解散组织
function orgGroupDelete() {
	var OrgId = parseInt($('.treenode-only').val(), 10);
	User_SetImgIcon=true;
	var body = '{"Code" : 10102,"Body" : {"SessionId" : \"' + sessionId + '\","OrgId":' + OrgId + '}}';
	var text = $('#User_level2top').html();
	console.log(text);
	// text = text.slice(0, text.indexOf('(')+1);
	if (OrgId !== 0) {
		coverShow();
		$.getJSON('' + STATION_URL + '?Body=' + body + '',
			function(ret) {
				coverHide();
				if (ret.Result == 200) {	
					orgNodesTree.dataRemoveOrgid(OrgId);
					orgTreeUpdate();
					
					$('.user-list').hide(function() {
						$('.user_btn').show()
					});
					$('.user-sort').hide();
					showAlert("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "  成功解散" + text + "！");
					cancelGroup();
					$('#addGroupNode').hide();
					$('#editGroupName').hide();
					$('#sortGroupNode').hide();
				} else if (ret.Result === 407) {
					showAlert('不能删除登录调度员所在的组织!');
				}
			}
		)
	} else {
		showAlert('根组织节点不能移除！');
	}

}

//解散组织取消按钮
function cancelGroup() {
	$('.set-div').hide();
	$('.part2').hide();
	$('.part1').hide();
	$('.set-logo').attr("src", "img/icon/newicon/channel_set.png");
	User_SetImgIcon=true;

}

//重置密码
function getRandomPassword(user_power) {
	var text = "";
	var possible = "123456789";

	for (var i = 0; i < 8; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	if(user_power){

        text+='Pwd!';

	}else{

      text;

	}
	return text;
}

//获取全部成员
function usersGetAll(fn) {
	var body = '{"Code":10115,"Body":{"SessionId":\"' + sessionId + '\"}}';
	console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log('全部成員'+JSON.stringify(ret));
		if (ret.Result === 200) {
			
			console.log(ret.Users.length);
			fn(ret.Users);
		} else {
			// console.log(ret);
			alert('获取用户信息失败，请刷新浏览器或退出重新登录！')
		}
	})
}


//保存限制状态
function saveAuthority() {
	var uid = $('#userInfo-save-btn').data('uid');
	userStatusSave(uid);
	$(".org-mid").scrollTop(Scroll_bar_height_old);
	Scroll_bar_height_old =0;
}

function userStatusSave(userid) {

	var yaobi = userCheckStatusFindout('user-close-yaobi');
	var dipatcher = userCheckStatusFindout('user-close-quanxian');
	var broadcast = userCheckStatusFindout('user-close-guangbo');
	var video = userCheckStatusFindout('user-close-shipin');
	var callin = userCheckStatusFindout('user-close-lincall');
	var callout = userCheckStatusFindout('user-close-linout');
	var channelcall = userCheckStatusFindout('user-close-call');
	var userinfo = usersAll.get(userid);
	var LimitStatus = 0;
     
	if (dipatcher == 1 && userinfo.OrgId == orgNodesTree.rootNodeId) {
		return showAlert('没有权限设置同级调度员！')
	}

	if (dipatcher == 1) {
		yaobi = 0;
		video = 0;
		callin = 0;
		callout = 0;
		channelcall = 0;
	}

	var status = {
		id: userid,
		yaobi: yaobi,
		dipatcher: dipatcher,
		broadcast: broadcast,
		video: video,
		callin: callin,
		callout: callout,
		channelcall: channelcall
	}

	var body = '{"Code":11209,"Body":{"SessionId":\"' + sessionId + '\","Uid":"' + userid + '",' +
		'"CtlRemoteAction":' + yaobi +
		',"CtlCallTempInAction":' + callin +
		',"CtlCallTempOutAction":' + callout +
		',"CtlCallChannelAction":' + channelcall +
		',"CtlAdminDispatcherAction":' + dipatcher +
		',"CtlBroadCastAction":' + broadcast +
		',"CtlRealTimeVideoAction":' + video + '}}';
	coverShow();
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		coverHide();
		if (ret.Result == 200) {
			var use = usersAll.get(userid);
			if(video==1||callin==1||callout==1||channelcall==1){
				use.LimitStatus = 1;
				LimitStatus = 1;
			}else{
				use.LimitStatus = 0;
				LimitStatus = 0;
			}
			var status = {
				id: userid,
				yaobi: yaobi,
				dipatcher: dipatcher,
				broadcast: broadcast,
				video: video,
				callin: callin,
				callout: callout,
				channelcall: channelcall,
				LimitStatus: LimitStatus
			}
				userStatusSaveSuccess(status);
			
			if(dipatcher==1){
				var user_power=ChannelAllcher.containsKey(uid);
				if(!user_power){
				   ChannelAllcher.put(userid,userid);
				}
			}
			
			if(dipatcher==0){
				var user_power=ChannelAllcher.containsKey(uid);
				if(user_power){
				   ChannelAllcher.remove(userid);
				}
			}
		} else {
			showAlert('保存失败！')
		}
	})
}


function userStatusSaveSuccess(status) {
	showAlert('保存成功！');
	
	var userinfo = usersAll.get(status.id);
	userinfo.BroadCastRole = status.broadcast;
	userinfo.LimitCallChannel = status.channelcall;
	userinfo.LimitCallIn = status.callin;
	userinfo.LimitCallOut = status.callout;
	userinfo.RemoteCtl = status.yaobi;
	userinfo.Role = status.dipatcher;
	userinfo.VideoPermissions = status.video;
	
	var div = $('#' + status.id + '_z').parent();
	var imgs = div.siblings('.userfn_icons').children();
    
    if(userfnFigObject.prev(".channel_broadimg").length>0){
       status.LimitStatus? userfnFigObject.prev().show() : userfnFigObject.prev().hide();
       status.yaobi? userfnFigObject.prev().prev().show() : userfnFigObject.prev().prev().hide();
	   status.broadcast? userfnFigObject.prev().prev().prev().show() : userfnFigObject.prev().prev().prev().hide();
    }

	if (status.dipatcher == 1) {

		if (onlineInfo.containsKey(status.id)) {
			div.next().removeClass('dis_on on_user').addClass('dis_on');
		} else {
			div.next().removeClass('dis_off nolineuser').addClass('dis_off');
		}

		imgs.eq(1).hide();
		imgs.eq(2).hide();

	} else {

		if (onlineInfo.containsKey(status.id)) {
			$('#' + status.id + '_z').parent().next().removeClass('dis_on on_user').addClass('on_user');
		} else {
			$('#' + status.id + '_z').parent().next().removeClass('dis_off nolineuser').addClass('nolineuser');
		}

		imgs.eq(1).show();
		imgs.eq(2).show();
	}

	$('.user-close').hide();
	$('.active_Img').attr('src', 'img/icon/newicon/powers.png');
	$('.active_Img').removeClass('active_Img');

	if(status.yaobi==1){
	   var UserMsgLimityaobi=[{
                                "ipocid":userinfo.Uid,
                                "name":userinfo.Name,
                                "userstate":3
	 	                      }];
	  
       cbPresence(UserMsgLimityaobi);
	 }
}

function userCheckStatusFindout(id) {
	var checkbox = $('#' + id).prop('checked');
	return checkbox ? 1 : 0;
}

function callLimitType(id, type) {
	var body = '{"Code":11203,"Body":{"SessionId":\"' + sessionId + '\","Uid":"' + id + '","Action":' + type + '}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		if (ret.Result == 200) {
			callLimitTypesucess(id, type);
		} else if (ret.Result === 406) {
			showAlert('同级调度员不允许修改信息！');
		} else {
			callLimitTypefail(type);
		}
	});
}

function callLimitTypefail(type) {
	switch (type) {
		case 0:
			showAlert('限制临时会话呼入失败！');
			break;
		case 1:
			showAlert('限制临时会话呼出失败！');
			break;
		case 2:
			showAlert('限制频道呼叫失败！');
			break;
		case 10:
			showAlert('解除限制临时会话呼入失败！');
			break;
		case 11:
			showAlert('解除限制临时会话呼出失败！');
			break;
		case 12:
			showAlert('解除限制频道呼叫失败！');
			break;
		default:
			break;
	}
}

function callLimitTypesucess(id, type) {
	var userinfo = usersAll.get(id);
	switch (type) {
		case 0:
			userinfo.LimitCallIn = 1;
			break;
		case 1:
			userinfo.LimitCallOut = 1;
			break;
		case 2:
			userinfo.LimitCallChannel = 1;
			break;
		case 10:
			userinfo.LimitCallIn = 0;
			break;
		case 11:
			userinfo.LimitCallOut = 0;
			break;
		case 12:
			userinfo.LimitCallChannel = 0;
			break;
		default:
			break;
	}
}

////idList1,nameList1
function users_list_appear_name_id() {
	var checkbox = $('#name_Id');
	var list1 = $('#org-no-list');
	var list2 = $('#org-listing');

	if (checkbox.prop('checked')) {
		checkbox.prop('checked', true);
		checkbox.next().addClass('label-bg');
		nameList1.forEach(function(item, index) {
			nameList1[index] = item + '(' + idList1[index] + ')';
		});
		nameList2.forEach(function(item, index) {
			nameList2[index] = item + '(' + idList2[index] + ')';
		});
	} else {
		checkbox.prop('checked', false);
		checkbox.next().removeClass('label-bg');
		nameList1.forEach(function(item, index) {
			nameList1[index] = usersAll.get(idList1[index]).Name;
		});
		nameList2.forEach(function(item, index) {
			nameList2[index] = usersAll.get(idList2[index]).Name;
		});
	}

	list1.children().each(function(i) {
		$(this).find('.only_one').text(nameList1[i]).attr('title', nameList1[i]);
	});
	list2.children().each(function(i) {
		$(this).find('.only_one').text(nameList2[i]).attr('title', nameList2[i]);
	});
}

/***************************跨企业*******************************/
var cusNum = 1;

function userAddCustomer() {
	cusNum++;
	var text = '<li class="other"><div><div class="user-Cross-addName fix"><span class="fl">企业</span><span>' + cusNum + '</span><span class="fr"><img class="crossDel" src="img/icon/user_cross_delete.png" /></span>' +
		'</div><input type="text" name="" placeholder="输入企业ID" /><input type="text" name="" placeholder="输入企业全称" /></div></li>';

	$('#userCustomerlist').append(text);

	$('.crossDel').on('click', function() {
		$(this).parents('li').remove();
	})

	borderColor();
}

function borderColor() {
	$('#userCustomerlist').find('input').on('focus', function() {
		$(this).css("border", "1px solid #FBA110")
	})

	$('#userCustomerlist').find('input').on('blur', function() {
		$(this).css("border", "1px solid #D2CEC8")
	})
}

//获取调度员列表
function getDispatcher() {
	var body = '{"Code" : 10011,"Body" : {"SessionId" : \"' + sessionId + '\"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		if (ret.Result == 200) {
			alldispatcher = ret.Dispatcher;
            // alert(JSON.stringify(ret));
			Channel_GetAllcher(ret.Dispatcher);
		} else {
			showAlert('获取调度员列表失败！');
		}
	});
}


//获取组织
function orgGetGroup(fn, arr) {
	var body = '{"Code" : 10100,"Body" : {"SessionId" : \"' + sessionId + '\"}}';
	console.log('组织成员获取',new Date());
     console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log('组织成员获取成功',new Date());
		// console.log('h'+ret)
		fn(ret, arr);
	})
}

//获取用户列表（获取某组织下的成员)
function getMemberList(fn, arr) {
	var body = '{"Code":10111,"Body":{"SessionId":\"' + sessionId + '\","OrgId":0}}';

	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		fn(arr, ret);
	});
}


//----------------------------名称推送-------------------------------------------

//给企业下所有有效调度员推送组织的变更，包括组织节点增删、组织下成员移动、组织排序
function doPushOrgStructChanged(json) {
	var body = '{"Code":10115,"Body":{"SessionId":\"' + sessionId + '\"}}';
	
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		if (ret.Result === 200) {
			var array = ret.Users;
			usersAll.clear();
			for (var i = 0, len = array.length; i < len; i++) {
				usersAll.put(array[i].Uid, array[i]);
			}
			var getNodeData = orgNodesTree.getOrgNodesCallback.bind(orgNodesTree);
			orgGetGroup(getNodeData);
			$('.Height1').hide();
			$('#bg-color').hide();
		} else {
			alert('获取用户信息失败，请刷新浏览器或退出重新登录！')
		}
	})
}


//给企业下所有有效调度员推送指定组织名称的变更
/*
{
	"t": 301,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"orgs":
	[
		{"oid": "xxx", "oname": "xxxx"},
		...
	]
}
*/
function doPushOrgNameChanged(json) {
	var orgs = json.orgs;
	orgs.forEach(function(item) {
		updateNodeName("treeDemo", item.oid, item.oname)
	})
}


//给企业下所有有效用户推送指定用户名称的变更
/*
{
	"t": 300,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"users":
	[
		{"uid": "xxx", "uname": "xxxx"},
		...
	]
}
*/

// 入口、公共内容
function doPushUserNameChanged() {
	var users = loginId;
	 console.log('欢迎你'+users);
     // {"t":300,"oprid":"100110054","users":"[{\"uid\":\"100110054\",\"uname\":\"一二三四\"}]"}
	// users.forEach(function(item) {
	// 	if (usersAll.size() > 0 && usersAll.get(item.uid)) {
	// 		usersAll.get(item.uid).Name = item.uname;
	// 	}
	// 	updateUserName(item.uid, item.uname)
	// })
	 $('.radio_footer_set').find('li').eq(4).children('b').click();


}

// 各个模块
function updateUserName(userId, userName) {
	updateUserName_usersList(userId, userName);
	updateUserName_broadcast(userId, userName);
	updateUserName_line(userId, userName);
}

//组织成员列表,排序列表
function updateUserName_usersList(userId, userName) {
	if (sideObj.user) {
		var index = idList1.indexOf(userId);
		var index2 = idList2.indexOf(userId);
		
		if (index !== -1) {
			nameList1[index] = userName;
			$('#org-no-list').children().eq(index).find('.only_one').text(userName);
			$('#user-sort-ul1').children().eq(index).children('div').children('span').text(userName);
		}
		if (index2 !== -1) {
			nameList2[index2] = userName;
			$('#org-listing').children().eq(index2).find('.only_one').text(userName);
			$('#user-sort-ul2').children().eq(index2).children('div').children('span').text(userName);
		}
	}	
}


/*
{
	"t": 302,
	"oprid": "操作人ID",		//如果是管理台触发则此值为admin
	"adms":
	[
		{"uid": "xxx", "type": 0},			//type: 0: 取消 1：设定
		...
	]
}*/
function doPushUserRoleChanged(json) {
	var users = json.adms;
	users.forEach(function (item) {
		var uid = item.uid;
		var index1 = idList1.indexOf(uid);
		var index2 = idList2.indexOf(uid);
		var oLi;
		var oSpan;
		var img;

		if (index1 != -1) {
			oLi = $('#org-no-list').children('.' + uid);
			oSpan = oLi.find('.only_one');
			img = oLi.find('.userfn_icons').children();
		}

		if (index2 != -1) {
			oLi = $('#org-listing').children('.' + uid);
			oSpan = oLi.find('.only_one');
			img = oLi.find('.userfn_icons').children();
		}

		if (idList1.indexOf(uid) != -1 || idList2.indexOf(uid) != -1) {
			if (item.type) {
				img.eq(1).hide();
				img.eq(2).hide();
				if (oSpan.hasClass('nolineuser')) {
					oSpan.removeClass('nolineuser').addClass('dis_off');
				} else if (oSpan.hasClass('on_user')) {
					oSpan.removeClass('nolineuser').addClass('dis_on');
				}
				if (usersAll.size()) usersAll.get(uid).Role = 1;
			} else {
				img.eq(1).show();
				img.eq(2).show();
				if (oSpan.hasClass('dis_off')) {
					oSpan.removeClass('dis_off').addClass('nolineuser');
				} else if (oSpan.hasClass('dis_on')) {
					oSpan.removeClass('dis_on').addClass('on_user');
				}
				if (usersAll.size()) usersAll.get(uid).Role = 0;
			}
		}
		
	})
}

function updateUserName_broadcast(userId, userName) {
	if (sideObj.radio) {
		var broadcastList1 = $('#broadcastUl');
		if (userId !== loginId) {
			broadcastList1.children('.' + userId).find('.username').text(userName);
		}
		if ($('.radio_radio').css('display') == 'block' && $('.brodcast_name').attr('userid') == userId) {
			$('.brodcast_name').text(userName);
		}

		broadcastList.forEach(function(item) {
			if (item.Uid === userId) {
				item.Name = userName
			}
		})
	}
}

function updateUserName_line(userId, userName) {
	if (sideObj.line) {
		$('.fence-list').children().each(function() {
			var oUl = $(this).children('ul');
			if (oUl.css('display') === 'block') {
				oUl.children().each(function() {
					if ($(this).attr('uid') === userId) {
						$(this).children().eq(0).text(userName)
					}
				})
			}
		})
		fenceLine.forEach(function(item) {
			var members = item.Members;
			members.forEach(function(self) {
				if (self.Uid === userId) {
					self.MemberName = userName;
				}
			})
		})

		$('#warnRecord').children('li').each(function() {
			if ($(this).hasClass(userId)) {
				$(this).find('.username').text(userName)
			}
		})
	}
}