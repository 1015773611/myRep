var Scroll_bar_height_old = 0;
var currentClmembers_array;
var treeObj;
var gNodes = [],
	aNodes = [],
	idList2 = [],
	idList1 = [],
	nameList2 = [],
	nameList1 = [],
	useridArray1 = [],
	useridArray2 = [],
	addOrgFuzzSearch = [], //创建组织查询的名字
	addOrgFuzzSearchId = [], //创建组织查询的id
	limitStatusObj = null, //限制状态
	treeIdData = null;

//组织成员
var setting = {
	view: {
		showIcon: false, //showIconForTree
		showLine: false,
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom
	},
	check: {
		enable: true
	},
	data: {
		simpleData: {
			enable: true
		},
		keep: {
			parent: true
		}
	},
	callback: {
		onClick: nodeClick
	}
};

//
var gsetting = {
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont
	},
	check: {
		enable: false
	},
	data: {
		simpleData: {
			enable: true
		}
	}
};
//line 创建
var asetting_s = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilters
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall,
		
	}
};
//line
var asetting = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//channel
var csetting = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};
//channel 创建
var csetting_s = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilters
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};
//会话
var csettings = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckFn,
		onDblClick: ztreeDblclickCall
	}
};

//视频转发
var csettingss = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//任务
var csettingtask = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//监控列表
var jiankongseting = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//和助手转发
var helpcseting = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//媒体记录转发
var csetMedia = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheckHelper,
		onDblClick: ztreeDblclickCall
	}
};

//广播树
var csetRadio = {
	async: {
		enable: true,
		url: getAsyncUrl,
		dataFilter: dataFilter
	},
	view: {
		showIcon: false,
		showLine: false,
		fontCss: getFont,
		dblClickExpand: false
	},
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeCheck: ztreeBeforeCheck,
		onCheck: radioUserSelect,
		onDblClick: ztreeDblclickCall
	}
};

//异步加载
function getAsyncUrl(treeId, treeNode) {
	//return STATION_URL + '?Body=' + '{"Code":10111,"Body":{"SessionId":\"'+sessionId+'\","OrgId":'+treeNode.id+'}}'
	return STATION_URL + '?Body=' + '{"Code":10313,"Body":{"SessionId":\"' + sessionId + '\","OrgId":' + treeNode.id + '}}'
};


function getFont(treeId, node) {
	return node.font ? node.font : {};
}

function arrEmpty() {
	idList1.length = 0;
	nameList1.length = 0;
	idList2.length = 0;
	nameList2.length = 0;
}

function nodeClickDetail(treeNode) {
	$('.userSearch').val('');
	$('#searchUl1').hide();
	$('#searchUl2').hide();
	$('#org-listing').show();
	$('#org-no-list').show();
	$('.user_btn').hide();
	$('.edited-concent').hide();
	$('.user-remove').hide();
	$('.user-close').hide();
	$('.user-sort').hide();
	$('.set-div').hide();
	$('.set-logo').attr('src', 'img/icon/newicon/channel_set.png');
	arrEmpty();
	$('.treenode-only').val(treeNode.id);
	$('input[name="userListAll"]').prop("checked", false);
	$('.total').text(0).show();
	$('#user_nomohu').show();
	$('.totalMohu').hide();
	$('#user_mohu').hide();
	$('#squaredAll').next('label').removeClass('label-bg');
	$('.org-btm-con2').find('button').removeClass('btn-active').attr("disabled", true);
	$('#name_Id').prop('checked', false).next().removeClass('label-bg');
}


//节点点击事件	
function nodeClick(event, treeId, treeNode) {
	treeIdData = {id: treeNode.id, pid: treeNode.pId};
	var name = treeNode.name;
	var u_list_html = $('.user-list');
	var noneOrg = $('.org-mid1-name');
	name = name.slice(0, name.indexOf('('));
	noneOrg.removeData('id');
	noneOrg.data('id', treeNode.id);
	nodeClickDetail(treeNode);

	if (treeNode.isParent == true) { // && treeNode.id !== 0
		$('.cus-name').html(name).attr('oid', treeNode.id);
		$('.cover_loading').show();
		var body = '{"Code":10316,"Body":{"SessionId":\"' + sessionId + '\","OrgId":' + treeNode.id + '}}';
		
		$.getJSON('' + STATION_URL + '?Body=' + body + '', function(res) {			
			$('.cover_loading').hide();
			if (res.Result == 200) {
				currentOrgUsers.length = 0;
				currentOrgedUsers.length = 0;
				var user = res.Users,
					html1 = '',
					user_name,
					htmlsort1 = '';
				user = userOnshowSort(user, 0);
				$('#org-no-list').empty();
				$('#org-listing').empty();
				$('#user-sort-ul1').empty();
				$('#user-sort-ul2').empty();
				u_list_html.hide();
				u_list_html.show('slow');
				var hujiao = '<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />';
				var dingwei = '<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />';
				var shipin = '<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />';
				var dingwei_none = '<img style="display:none;" src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />';
				var shipin_none = '<img style="display:none;" src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />';
				var bianji = '<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,0,\'org-no-list\')" alt="img" />';
				var quanxian = '<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,0,\'org-no-list\')" alt="img" />';
				var shanchu = '<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="0" class="remove-img" onclick="userRemoveToPre(this,0,\'org-no-list\')" alt="img" />';
				var bianji1 = '<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,1,\'org-no-list\')" alt="img" />';
				var quanxian1 = '<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,1,\'org-no-list\')" alt="img" />';
				var shanchu1 = '<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="1" class="remove-img" onclick="userRemoveToPre(this,1,\'org-no-list\')" alt="img" />';
				
				var imgDie = '<img style="margin:0px 0px 10px 7px;" src="img/icon/userIcon/ic_yaobi.png" alt="img" class="channel_broadimg"/>';
				var imgDieHide = '<img style="margin:0px 0px 10px 7px; display:none;" src="img/icon/userIcon/ic_yaobi.png" alt="img" class="channel_broadimg"/>';
				var imgBroadcast = '<img style="margin:0px 0px 9px 7px;" src="img/icon/userIcon/ic_broadcast.png" alt="img" class="channel_broadimg"/>';
				var imgBroadcastHide = '<img style="margin:0px 0px 9px 7px; display:none;" src="img/icon/userIcon/ic_broadcast.png" alt="img" class="channel_broadimg"/>';
				var imgJurisdiction = '<img style="height:12px; width:12px;margin:0px 0px 10px 7px;" src="img/icon/newicon/power1.png" alt="img" class="channel_broadimg"/>';
				var imgJurisdictionHide = '<img style="height:12px; width:12px;margin:0px 0px 10px 7px; display:none;" src="img/icon/newicon/power1.png" alt="img" class="channel_broadimg"/>';
				
				for (var i = 0, len = user.length; i < len; i++) {
					nameList1.push(user[i].Name);
					idList1.push(user[i].Uid);
					htmlsort1 += '<li uid="' + user[i].Uid + '"><div class="fix"><span class="fl">' + user[i].Name + '</span><a class="fr color-bar"><span></span><span></span><span></span></a></div></li>';					
					var myCheckbox = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+user[i].Uid+'_z" name="list-1" /><label for="'+user[i].Uid+'_z"></label></div>';
					
					if (user[i].Uid == loginId) {
						var myCheckbox2 = '<div class="squaredbox"><input disabled=false class="bg_checked" type="checkbox" id="'+user[i].Uid+'_z" /><label for="'+user[i].Uid+'_z"></label></div>';
						if (usersAll.size() >0 && usersAll.get(loginId).BroadCastRole) {
							html1 += '<li class="' + user[i].Uid + '"><a class="org-listA">' + myCheckbox2 + '<span class="on only_one dis_on">' + user[i].Name + '</span>'+ imgBroadcast+imgJurisdiction+'<span class="userfn_icons"></span></a></li>';
						} else {
							html1 += '<li class="' + user[i].Uid + '"><a class="org-listA">' + myCheckbox2 + '<span class="on only_one dis_on">' + user[i].Name + '</span>'+ imgBroadcastHide+imgJurisdictionHide+'<span class="userfn_icons"></span></a></li>';		
						}
					} else {
						var roleUser = user[i].Role;
						
						if (user[i].userstate) {
							//在线
							user_name = roleUser ? '<span class="on only_one dis_on">' + user[i].Name + '</span>' : '<span class="on only_one on_user">' + user[i].Name + '</span>';
							var template = '<li class="' + user[i].Uid + '"><a class="org-listA">' +  myCheckbox + user_name;
							
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).BroadCastRole) {
								template += imgBroadcast;
							} else {
								template += imgBroadcastHide;
							}
							
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).RemoteCtl) {
								template += imgDie;
							} else {
								template += imgDieHide;
							}
							
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).LimitStatus==1) {
								template += imgJurisdiction;
							}else{
								template += imgJurisdictionHide;
							}
							if (treeIdData.pid == null) {
								//根级
								if (roleUser) {
									//调度员
									html1 += template + '<span class="userfn_icons">' + hujiao + '</span></a></li>';		
								} else {
									//非调度员
									html1 += template + '<span class="userfn_icons">' + hujiao + dingwei + shipin + bianji + quanxian + shanchu + '</span></a></li>';		  
								}
							} else {
								if (roleUser) {
									html1 += template + '<span class="userfn_icons">' + hujiao + dingwei_none + shipin_none + bianji +quanxian +shanchu +'</span></a></li>';
								} else {
									html1 += template + '<span class="userfn_icons">' +	hujiao +dingwei +shipin +bianji +quanxian +shanchu +'</span></a></li>';
								}
							}		
						} else {
							//离线
							user_name = roleUser ? '<span class="on only_one dis_off">' + user[i].Name + '</span>' : '<span class="on only_one nolineuser">' + user[i].Name + '</span>';
							template = '<li class="' + user[i].Uid + '"><a class="org-listA">' +  myCheckbox + user_name ;
							
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).BroadCastRole) {
								template += imgBroadcast;
							} else {
								template += imgBroadcastHide;
							}
							
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).RemoteCtl) {
								template += imgDie;
							} else {
								template += imgDieHide;
							}
							if (usersAll.size() >0 && usersAll.get(user[i].Uid).LimitStatus==1) {
								template += imgJurisdiction;
							}else{
								template += imgJurisdictionHide;
							}
							if (treeIdData.pid == null) {
								if (roleUser) {
									html1 += template + '<span class="userfn_icons">' +	hujiao + '</span></a></li>';
								} else {
									html1 += template + '<span class="userfn_icons">' +	hujiao +dingwei +shipin +bianji +quanxian +shanchu +'</span></a></li>';	
								}
							} else {
								//不是根级
								if (roleUser) {
									html1 += template + '<span class="userfn_icons">' + hujiao + dingwei_none + shipin_none +bianji +quanxian+shanchu +'</span></a></li>';
								} else {
									html1 += template + '<span class="userfn_icons">' + hujiao +dingwei +shipin +bianji +quanxian +shanchu +'</span></a></li>';
								}
							}		
						}
					}	
				}
				$('#org-no-list').append(html1);
				$('#user-sort-ul1').append(htmlsort1);

				var arr = res.ChildUsers, html2 = '', htmlsort2 = '';

				if (arr.length > 0) {
					arr = userOnshowSort(arr, 1);
					
					for (var k = 0, leng = arr.length; k < leng; k++) {
						var myCheckbox1 = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+arr[k].Uid+'_z" name="list-1" /><label for="'+arr[k].Uid+'_z"></label></div>';
						
						
						idList2.push(arr[k].Uid);
						nameList2.push(arr[k].Name);
						htmlsort2 += '<li uid="' + arr[k].Uid + '"><div class="fix"><span class="fl">' + arr[k].Name + '</span></div></li>';
						
						if (arr[k].userstate) {
							user_name = arr[k].Role ? '<span class="on only_one dis_on">' + arr[k].Name + '</span>' : '<span class="on only_one on_user">' + arr[k].Name + '</span>';
							var template1 = '<li class="' + arr[k].Uid + '"><a class="org-listA">' + myCheckbox1 + user_name;
							
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).BroadCastRole) {
								template1 += imgBroadcast;
							} else {
								template1 += imgBroadcastHide;
							}
							
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).RemoteCtl) {
								template1 += imgDie;
							} else {
								template1 += imgDieHide;
							}
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).LimitStatus==1) {
								template1 += imgJurisdiction;
							}else{
								template1 += imgJurisdictionHide;
							}
							if (arr[k].Role) {
								html2 += template1 + '<span class="userfn_icons">' + hujiao + dingwei_none + shipin_none +bianji1 +quanxian1 +shanchu1 +'</span></a></li>';
							} else {
								html2 += template1 + '<span class="userfn_icons">' + hujiao +dingwei +shipin +bianji1 +quanxian1 +shanchu1 +'</span></a></li>';
							}

						} else {
							user_name = arr[k].Role ? '<span class="on only_one dis_off">' + arr[k].Name + '</span>' : '<span class="on only_one nolineuser">' + arr[k].Name + '</span>';
							template1 = '<li class="' + arr[k].Uid + '"><a class="org-listA">' + myCheckbox1 + user_name;
							
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).BroadCastRole) {
								template1 += imgBroadcast;
							} else {
								template1 += imgBroadcastHide;
							} 
							
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).RemoteCtl) {
								template1 += imgDie;
							} else {
								template1 += imgDieHide;
							}
					
							if (usersAll.size() >0 && usersAll.get(arr[k].Uid).LimitStatus==1) {
								template1 += imgJurisdiction;
							}else{
								template1 += imgJurisdictionHide;
							}
							
							if (arr[k].Role) {
								html2 += template1 + '<span class="userfn_icons">' + hujiao + dingwei_none + shipin_none +bianji1 +quanxian1 +shanchu1 +'</span></a></li>';
							} else {
								html2 += template1 + '<span class="userfn_icons">' +  hujiao +dingwei +shipin +bianji1 +quanxian1 +shanchu1 +'</span></a></li>';	
							}
						}
					}
					$('#org-listing').append(html2);
					$('#user-sort-ul2').append(htmlsort2);
				}
				userCheckNumber = document.getElementsByName('list-1').length;
				checkBox('list-1', 'userListAll', 'total');
				userHover();
			} else if (res.Result == 404) {
				$('#org-no-list').empty();
				$('#org-listing').empty();
				$('#user-sort-ul1').empty();
				$('#user-sort-ul2').empty();
				u_list_html.hide();
				u_list_html.show('slow');
			} else {
				showAlert('加载该组织成员失败，请刷新页面重新加载！');
			}
		});
	}
}


// function userCheckedModify(pos, event) {
// 	event = event || window.event;
// 	var target = $(event.target);
// 	var id = target.attr('id');
// 	var i;
// 	id = id.slice(0, id.length - 2);

// 	if (target.is(':checked')) {
// 		target.prop("checked", true);
// 		target.next('label').removeClass().addClass('labelcheck');
// 		if (pos == 0) {
// 			for (i=0; i<currentOrgUsers.length; i++) {
// 				if (currentOrgUsers[i].Uid == id) {
// 					currentOrgUsers[i].Ischeck = 1;
// 					break;
// 				}
// 			}
// 		} else {
// 			for (i=0; i<currentOrgedUsers.length; i++) {
// 				if (currentOrgedUsers[i].Uid == id) {
// 					currentOrgUsers[i].Ischeck = 1;
// 					break;
// 				}
// 			}
// 		}
// 	} else {
// 		target.prop("checked", false);
// 		target.next('label').removeClass().addClass('labelNocheck');
// 		if (pos == 0) {
// 			for (i=0; i<currentOrgUsers.length; i++) {
// 				if (currentOrgUsers[i].Uid == id) {
// 					currentOrgUsers[i].Ischeck = 0;
// 					break;
// 				}
// 			}
// 		} else {
// 			for (i=0; i<currentOrgedUsers.length; i++) {
// 				if (currentOrgedUsers[i].Uid == id) {
// 					currentOrgUsers[i].Ischeck = 0;
// 					break;
// 				}
// 			}
// 		}
// 	}
// }

function userRemoveToPre(tar, num, u, event) {
	var event = event || window.event;
	var list = $('.user-remove');
	var that = $(tar);
	var t = that.parent().parent().parent();
	var h = t.position().top;
	var high = $('#' + u).outerHeight() + $('.org-hav').outerHeight();
	var on = that.parent().siblings('span');
	var id = that.parent().siblings('.squaredbox').children('input').attr('id');
	id = id.slice(0, id.length - 2);
	var check = list.find('input'); 

	$('.userEdit_img').attr('src', 'img/icon/userIcon/user_bi.png');
	$('.userInfo_img').attr('src', 'img/icon/newicon/powers.png');
	$('.edited-concent').hide();
	$('.user-close').hide();
	on.removeClass('userDasName');


	if (that.attr('src') == 'img/icon/fence/fence_bg_del1.png') {
		list.hide().show();
		that.attr('src', 'img/icon/fence/fence_bg_del2.png');
		that.addClass('active_Img');
		
	} else {
		list.hide();
		that.removeClass('active_Img');
		that.attr('src', 'img/icon/fence/fence_bg_del1.png');
		check.prop('checked', false);
	}	
	if (num == 0) {
		list.css('top', h + 79);
	} else {
		list.css('top', high + h + 79);
	}
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;	
}

function removeCancelUser() {
	$('.user-remove').hide();
	$('.remove-img').attr('src', 'img/icon/fence/fence_bg_del1.png').removeClass('active_Img')
}


function removeDidUser() {
	var arr = [];
	var obj = $('.user-list').find('.active_Img');
	var uid = obj.parents('li').attr('class');
	var type = obj.attr('data-rm');
	var pid = type === '0' ? treeIdData.pid : treeIdData.id;
	arr.push(uid);
	var arr1 = JSON.stringify(arr);
	var body = '{"Code":10110,"Body":{"SessionId":\"' + sessionId + '\","ToOrgId":' + pid + ',"Users":'+arr1+'}}';

	if (pid == null) {
		return showAlert('该成员为根组织下用户，不能移除！')
	}

	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		$('.cover_loading').hide();
		if (ret.Result == 200) {
			$('.user-list').hide();
			showAlert('移除成员成功！');
			removeCancelUser();
			obj.parents('li').remove();
			userCheckNumber = document.getElementsByName('list-1').length;
			// checkBox('list-1', 'userListAll', 'total');
			allUsersDispatcherRemove(arr);
			alldispatcherRemove(arr);

			var userinfo = usersAll.get(uid);
			userinfo.Role = 0;
			userinfo.OrgId = orgNodesTree.data[userinfo.OrgId].pid;
			orgTreeUpdate();
		} else if (ret.Result == 406) {
			showAlert('移动成员中包含同级调度员，不允许归属！');
		} else if (ret.Result == 407) {
			showAlert('相同组织不能再次归属！');
		} else {
			showAlert('添加成员失败！');
		}
	})
}

var userfnFigObject = null;
//遥毙呼叫等权限图标开关
function userfnFig(tar, num, u, event) {
	var Scroll_height = $(".edited-concent").height();
	var Scroll_bar_height = $(".org-mid").scrollTop();
	var Scroll_p_top = $(tar).offset().top;
	
	var event = event || window.event;
	var list = $('.user-close');
	var that = $(tar);
	var t = that.parent().parent().parent();
	var h = t.position().top;
	var high = $('#' + u).outerHeight() + $('.org-hav').outerHeight();
	var on = that.parent().siblings('span');
	var id = that.parent().siblings('.squaredbox').children('input').attr('id');
	id = id.slice(0, id.length - 2);
	var check = list.find('input');
	userfnFigObject = null;
	var userinfo = usersAll.get(id);
	if (!userinfo) return showAlert('页面初始化中，请稍后点击...');
	var Role = userinfo.Role;
	// var BroadCastRole = userinfo.BroadCastRole;
	
	$('#userInfo-save-btn').removeData("uid");
	if (Role === 1) {
		$('.xianzhi-bar').hide();
		$('.xianzhi-yaobi').hide();
	} else {
		$('.xianzhi-bar').show();
		$('.xianzhi-yaobi').show();
	}
	
	$('.userEdit_img').attr('src', 'img/icon/userIcon/user_bi.png');
	$('.remove-img').attr('src', 'img/icon/fence/fence_bg_del1.png');
	$('.edited-concent').hide();
	$('.user-remove').hide();
	on.removeClass('userDasName');


	if (that.attr('src') == 'img/icon/newicon/powers.png') {
		$('#userInfo-save-btn').data("uid", id);
		list.hide().show();
		$('.userInfo_img').attr('src', 'img/icon/newicon/powers.png');
		that.attr('src', 'img/icon/newicon/power1.png');
		that.addClass('active_Img');
		//2018.1.4加
		userStatusShow(userinfo);
		userfnFigObject = that.parent();
		// userfnFigData(userinfo);
		// apperDispatcher(Role);
		// apperBccaller(BroadCastRole);
	} else {
		list.hide();
		that.removeClass('active_Img');
		that.attr('src', 'img/icon/newicon/powers.png');
		check.prop('checked', false);
		check.next('label').removeClass('label-bg');
	}

	if (num == 0) {
		list.css('top', h + 79);
	} else {
		list.css('top', high + h + 79);
	}
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	if (that.attr('src') == 'img/icon/newicon/power1.png') {
		Scroll_bar_height_old = Scroll_bar_height;
		var Scroll_height_h = parseInt(Scroll_bar_height)+parseInt(Scroll_p_top.toFixed(0));
		$(".org-mid").scrollTop(Scroll_height_h-132);
	}else{
		$(".org-mid").scrollTop(Scroll_bar_height_old);
		Scroll_bar_height_old =0;
	}
}


function userStatusShow(userInfo) {
	userStatusFindout('user-close-yaobi', userInfo.RemoteCtl);
	userStatusFindout('user-close-quanxian', userInfo.Role);
	userStatusFindout('user-close-guangbo', userInfo.BroadCastRole);
	userStatusFindout('user-close-shipin', userInfo.VideoPermissions);
	userStatusFindout('user-close-lincall', userInfo.LimitCallIn);
	userStatusFindout('user-close-linout', userInfo.LimitCallOut);
	userStatusFindout('user-close-call', userInfo.LimitCallChannel);
}

function userStatusFindout(id, status) {
	var checkbox = $('#' + id);
	var label = checkbox.next('label');

	if (status == 0) {
		checkbox.prop('checked', false);
		label.removeClass('label-bg');
	} else {
		checkbox.prop('checked', true);
		label.addClass('label-bg');
	}
}


function apperDispatcher(role) {
	var choose = $('.dispatcherCheck');
	if (role === 1) {
		choose.prop('checked', true);
		// choose.next('label').css({'background-color': '#2bbf5d', 'border-color': '#2bbf5d'});
		choose.next('label').addClass('label-bg');
	} else {
		choose.prop('checked', false);
		// choose.next('label').css({'background-color': '#ffffff', 'border-color': '#9a9a9a'});
		choose.next('label').removeClass('label-bg');
	}
}


//编辑图标开关
function userfnEdit(tar, num, u, event) {
	
	var Scroll_height = $(".edited-concent").height();
	var Scroll_bar_height = $(".org-mid").scrollTop();
	var Scroll_p_top = $(tar).offset().top;
	
	var event = event || window.event;
	var list = $('.edited-concent');
	var that = $(tar);
	var t = that.parent().parent().parent();
	var h = t.position().top;
	var parent = that.parent();
	var high = $('#' + u).outerHeight() + $('.org-hav').outerHeight();
	var id = that.parent().siblings('.squaredbox').children('input').attr('id');
	id = id.slice(0, id.length - 2);
	var on = parent.siblings('span');

	$('.editUserName').val('');
	$('.editUserPhone').val('');
	$('.editUserEmail').val('');
	$('.editUserPwd').val('');
	$('.editUserPwdnew').val('');
	$('.edited-concent').find('.userID').text(id);
	$('.userInfo_img').attr('src', 'img/icon/newicon/powers.png');
	$('.remove-img').attr('src', 'img/icon/fence/fence_bg_del1.png');
	$('.user-remove').hide();
	$('.user-close').hide();
	$('.active_Img').removeClass('active_Img');
	$('.error').text('');
	// $('.editSave').removeData('uid');


	if (that.attr('src') == 'img/icon/userIcon/user_bi.png') {
		// $('.editSave').data('uid', id);
		on.addClass('userDasName');
		list.hide().show();
		$('.userEdit_img').attr('src', 'img/icon/userIcon/user_bi.png');
		that.attr('src', 'img/icon/userIcon/user_bi2.png');

		var body = '{"Code":"10112","Body":{"SessionId":"' + sessionId + '","Uids":["' + id + '"]}}';
		$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
			if (ret.Result == 200) {
				// console.log(ret)
				var info = ret.Users[0];
				if (info.Name) {$('.editUserName').val(info.Name);};
				if (info.Phone) {
					if (info.Phone === ' ') {
						$('.editUserPhone').val('');
						// return;
					} else {
						$('.editUserPhone').val(info.Phone);
					}
				} else {
					$('.editUserPhone').val('');
				}
				if (info.Email) {
					if (info.Email === ' ') {
						$('.editUserEmail').val('');
						// return;
					} else {
						$('.editUserEmail').val(info.Email);
					}
				} else {
					$('.editUserEmail').val('');
				}
				
				$('.isMian').text(info.SetIsb ? '免打扰开启' : '免打扰未开启');
				$('.isShou').text(info.SetAm ? '自动应答' : '手动应答');
			} else {
				showAlert('获取用户信息失败！');
			}
		})
		
		
		
	} else {
		list.hide();
		that.attr('src', 'img/icon/userIcon/user_bi.png');
		on.removeClass('userDasName');
		
	}

	if (num == 0) {
		list.css('top', h + 79);
	} else {
		list.css('top', high + h + 79);
	}
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	if (that.attr('src') == 'img/icon/userIcon/user_bi2.png') {
		Scroll_bar_height_old = Scroll_bar_height;
		var Scroll_height_h = parseInt(Scroll_bar_height)+parseInt(Scroll_p_top.toFixed(0));
		$(".org-mid").scrollTop(Scroll_height_h-132);
	}else{
		$(".org-mid").scrollTop(Scroll_bar_height_old);
		Scroll_bar_height_old =0;
	}
	
	
}

//
function apperBccaller(broadCastRole) {
	var bccall = $('.bccallList');
	if (broadCastRole == 1) {
		bccall.prop('checked', true);
		bccall.next('label').addClass('label-bg');
	} else {
		bccall.prop('checked', false);
		bccall.next('label').removeClass('label-bg');
	}
}



function userfnFigData(userinfo) {
	userfnFigShow(userinfo);
}

function userfnFigShow(data) {
	//0是未限制，1是限制
	var r = data.RemoteCtl; 
	var i = data.LimitCallIn; 
	var o = data.LimitCallOut;
	var l = data.LimitCallChannel;
	var v = data.VideoPermissions;

	limitStatusObj = null;
	limitStatusObj = {
		"yaobi": userFigIschecked(r, 'remotectl'),
		"callin": userFigIschecked(i, 'limitcallIn'),
		"callout": userFigIschecked(o, 'limitcallout'),
		"chancall": userFigIschecked(l, 'lcchannel'),
		"velimit": userFigIschecked(v, 'velimit')
	};
}

function userFigIschecked(num, name) {
	var boo;

	if (num == 0) {
		$('.' + name).prop('checked', false);
		// $('.' + name).next('label').css({'background-color': '#ffffff', 'border-color': '#9a9a9a'});
		$('.' + name).next('label').removeClass('label-bg');
		boo = false;
	} else {
		$('.' + name).prop('checked', true);
		// $('.' + name).next('label').css({'background-color': '#2bbf5d', 'border-color': '#2bbf5d'});
		$('.' + name).next('label').addClass('label-bg');
		boo = true;
	}
	return boo;
}

//
function userAddOnlineInfo(array) {
	for (var i = 0, len = array.length; i < len; i++) {
		for (var j = 0, lon = userOnlineStatus.length; j<lon; j++) {
			if (array[i].Uid === userOnlineStatus[j].ipocid) {
				array[i].state = 1;
				break;
			}
		}
		// if (!array[i].state) {
		// 	array[i].Name = '<i class="offline">'+array[i].Name+'</i>';
		// }
	}
	return array;
}
//创建过滤器
function dataFilters(treeId, parentNode, responseData) {
	console.log(responseData);
	console.log(parentNode);
	console.log(responseData);

	if (responseData.Result == 200) {
		parentNode.nocheck = false;
		var user = responseData.Users,
			org = responseData.Orgs,
			node1,
			node2,
			childnodes = [];
		user = userAddOnlineInfo(user);
		for (var i = 0, len = org.length; i < len; i++) {
			node1 = {
				id: org[i].Id,
				pId: parentNode.id,
				name: org[i].Name,
				isParent: true,
				nocheck: true
			}
			childnodes.push(node1);
		}
		for (var j = 0, lon = user.length; j < lon; j++) {
			var switch_userId = true;
		    if(switch_userId){
		    	if (user[j].Uid === loginId) {
					node2 = {
						id: user[j].Uid,
						pId: parentNode.id,
						name: user[j].Name,
						chkDisabled: true
					}
				} else {
					var font = user[j].state ?  {'color':'#333'} :  {'color':'#ccc'};
					node2 = {
						id: user[j].Uid,
						pId: parentNode.id,
						name: user[j].Name,
						font: font
					}
				}
		    }
			
			childnodes.push(node2);
		}
	}
	return childnodes;
}
//过滤器
function dataFilter(treeId, parentNode, responseData) {
	console.log(responseData);
	console.log(parentNode);
	console.log(responseData);

	if (responseData.Result == 200) {
		parentNode.nocheck = false;
		var user = responseData.Users,
			org = responseData.Orgs,
			node1,
			node2,
			childnodes = [];
		user = userAddOnlineInfo(user);
		for (var i = 0, len = org.length; i < len; i++) {
			node1 = {
				id: org[i].Id,
				pId: parentNode.id,
				name: org[i].Name,
				isParent: true,
				nocheck: true
			}
			childnodes.push(node1);
		}
		var array_userID = [];
		if("channerAddtree"==treeId){
			array_userID = currentClmembers.keySet().splice(",");
			currentClmembers_array = currentClmembers.keySet().splice(",");
		}else if("userAddtree" == treeId){
			for(var i=0;i<fenceLine[line_index].Members.length;i++){
				array_userID.push(fenceLine[line_index].Members[i].Uid);
			}
		}else if("jiankong"==treeId){
			for(var i=0;i<Monitor_users_top.length;i++){
				array_userID.push(Monitor_users_top[i]);
			}
		}else if("channeltellAddtree"==treeId){
			if(channel_creates){
				for(var i=0;i<currentChatMembers.length;i++){
					array_userID.push(currentChatMembers[i].Uid);
				}
			}
		}
		for (var j = 0, lon = user.length; j < lon; j++) {
			var switch_userId = true;
			var font = user[j].state ?  {'color':'#333'} :  {'color':'#ccc'};
			
			if("channerAddtree"==treeId||"userAddtree" == treeId||"jiankong"==treeId||"channeltellAddtree"==treeId){
		    	currentClmembers_array = currentClmembers.keySet().splice(",");
		    	for(var i = 0;i<array_userID.length;i++){
		    		if(array_userID[i]==user[j].Uid){
		    			switch_userId = false;
		    			node2 = {
							id: user[j].Uid,
							pId: parentNode.id,
							name: user[j].Name,
							chkDisabled: true,
							font:font
						}
		    			break;
		    		}
		    	}
		    }
//			if("userAddtree" == treeId && fenceLine[line_index] != null){
//		    	for(var k = 0;k<fenceLine[line_index].Members.length;k++){
//		    		if(fenceLine[line_index].Members[k].Uid==user[j].Uid){
//		    			switch_userId = false;
//		    			node2 = {
//							id: user[j].Uid,
//							pId: parentNode.id,
//							name: user[j].Name,
//							chkDisabled: true,
//							font:font
//						}
//		    			break;
//		    		}
//		    	}
//		    }
//			
//			if("jiankong"==treeId){
//		    	for(var k = 0;k<Monitor_users_top.length;k++){
//		    		if(Monitor_users_top[k]==user[j].Uid){
//		    			switch_userId = false;
//		    			node2 = {
//							id: user[j].Uid,
//							pId: parentNode.id,
//							name: user[j].Name,
//							chkDisabled: true,
//							font:font
//						}
//		    			break;
//		    		}
//		    	}
//		    }
			
		    if(switch_userId){
		    	if (user[j].Uid === loginId) {
					node2 = {
						id: user[j].Uid,
						pId: parentNode.id,
						name: user[j].Name,
						chkDisabled: true
					}
				} else {
					node2 = {
						id: user[j].Uid,
						pId: parentNode.id,
						name: user[j].Name,
						font: font
					}
				}
		    }
			
			childnodes.push(node2);
		}
	}
	return childnodes;
}


function getGroupNodes(data, arr) {
	if (data.Result == 200) {
		arr.length = 0;
		var node, orgGroup;
		data = data.Orgs[0];
		node = {
			id: data.Id,
			pId: -1,
			name: data.Name,
			isParent: true,
			open: false,
			nocheck: true
		};
		arr.push(node);
	}
}

/**
 *Created on 2018.1.9
 *@author fuhaichao
 *涉及到节点的变化都要更新usersAll,originData,nodes,data数据
 */
var orgNodesTree = {
	rootNodeId: 0,
	originData: [],
	nodes: [],
	data: {},
	onlinePushTimes: 0,
	onlineFirstTiming: 0,
	initTreeTiming: 0,
	/**
	 *@method 生成内存树的数据格式
	 *@param 组织节点数据
	 *
	 */
	initData: function(data) {
		if (Array.isArray(data) && data.length > 0) {
			for (var i = 0, len = data.length; i < len; i++) {
				var pid = data[i].ParentId === undefined ? -1 : data[i].ParentId;
				var x = data[i].Id === this.rootNodeId ? 1 : 0;
				this.data[data[i].Id] = {id: data[i].Id, pid: pid, x: x, y: 0};
				if (data[i].Orgs && data[i].Orgs.length > 0) {
					this.initData(data[i].Orgs)
				}
			}
		}
	},
	/**
	 *@method delete node and refresh properties of usersmap
	 *@param org nodeId
	 *
	 */
	dataRemoveOrgid: function(orgid) {
		var orgList = [],
			users = usersAll.values(),
			data = this.data,
			thisPid = data[orgid].pid,
			findOrgid = function(orgid) {
				for (var key in data) {
					if (data[key].pid == orgid) {
						orgList.push(data[key].id);
						findOrgid(data[key].id);
					}
				}
			};
		orgList.push(orgid);
		delete data[orgid];
		findOrgid(orgid);
		users.forEach(function(item) {
			for (var i = 0, len = orgList.length; i < len; i++) {
				if (item.OrgId == orgList[i]) {
					item.OrgId = thisPid;
					item.Role = 0;
				}
			}
		});
	},
	/**
	 *@method 遍历全体成员，初始化内存树的数据。
	 *
	 *@return 布尔值，判断是否初始化。
	 */
	loopUsers: function() {
		var users,
			that = this,
			orgid,
			isOnline;
		  var sizelist=usersAll.size();
		  console.log(sizelist);
		if (JSON.stringify(this.data) !== '{}' && usersAll.size() > 0) {
			users = usersAll.values();
			users.forEach(function(item) {
				orgid = item.OrgId;
				isOnline = onlineInfo.containsKey(item.Uid);
				that.initDataXY(orgid, isOnline);
			});
			return true;
		} else {
			return false;
		}
	},
	/**
	 *@method 递归更新节点x，y的属性。
	 *
	 *
	 */
	initDataXY: function(orgid, isOnline) {
		var node = this.data[orgid];
		if (isOnline) {
			node.x += 1;
		}
		if (!node) {console.log(orgid)}
		node.y += 1;

		if (node.id !== this.rootNodeId) {
			this.initDataXY(node.pid, isOnline);
		}
	},
	/**
	 *@method 根据节点的在线状态，更新内存数据，同时刷新页面数节点
	 *
	 *
	 */
	refreshDataXY: function(orgid, isOnline) {
		var index,
			treeNode,
			node = this.data[orgid],
			treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		
		if (treeObj) {
			treeNode = treeObj.getNodeByParam("id", orgid, null);
		} else {
			return; 
		}

		isOnline ? node.x += 1 : node.x -= 1;
		index = treeNode.name.indexOf('(');
		treeNode.name = treeNode.name.slice(0, index) +  '(' + node.x + '/' + node.y + ')';
		treeObj.updateNode(treeNode);
		
		if (node.id !== this.rootNodeId) {
			this.refreshDataXY(node.pid, isOnline);
		}
	},
	/**
	 *@method 初始化页面组织树的数据
	 *
	 *
	 */
	initNodes: function(nodes) {
		var node = nodes[0],
			that = this,
			x = this.data[node.Id].x,
			y = this.data[node.Id].y;
		
		this.nodes.length = 0;
		this.nodes.push({
			id: node.Id,
			pId: -1,
			name: node.Name + '(' + x + '/' + y + ')',
			isParent: true,
			open: true,
			nocheck: true
		});
		if (node.Orgs && node.Orgs.length > 0) {
			this.addNode(node.Orgs);
		}
	},
	addNode: function(orgs) {
		var that = this,
			x,
			y;

		orgs.forEach(function(item) {
			x = that.data[item.Id].x;
			y = that.data[item.Id].y;
			that.nodes.push({
				id: item.Id,
				pId: item.ParentId,
				name: item.Name + '(' + x + '/' + y + ')',
				isParent: true,
				nocheck: true
			});
			if (item.Orgs && item.Orgs.length > 0) {
				that.addNode(item.Orgs);
			}
		})
	},
	/**
	 *@method 根据上下线推送的数据，动态更新页面节点
	 *
	 *
	 */
	refreshNodes: function(users) {
		var nodeId,
			that = this;

		if (users.length > 0 && usersAll.size() > 0 && JSON.stringify(this.data) !== '{}' && this.nodes.length > 0) {
			users.forEach(function(item) {
				nodeId = usersAll.get(item.ipocid);
				if (nodeId && item.userstate === USER_STATE_ON_LINE && !onlineInfo.containsKey(item.ipocid)) {
					that.refreshDataXY(nodeId.OrgId, true);//上线
				} else if (nodeId && item.userstate === USER_STATE_OFFLINE && onlineInfo.containsKey(item.ipocid)) {
					that.refreshDataXY(nodeId.OrgId, false);//下线
				}
				return true;
			})
		} else {
			return false;
		}
	},
	/**
	 *@method 请求10100接口的回调
	 */
	getOrgNodesCallback: function(data) {
		console.log('組織結果'+data.Result);
		if (data.Result == 200) {
			var orgs = data.Orgs;
			// console.log(JSON.stringify(orgs));
			this.originData = orgs;
			this.rootNodeId = orgs[0].Id;
			this.initData(orgs);
			if (this.loopUsers()) {
				this.initNodes(orgs);
				console.log('下一步');
				this.initTreeTiming = +new Date();

				if (sideObj.user) {
					$('.userLoading').hide();
					initzTree();
				}
			}
		} else {
			alert('组织数据获取失败，请刷新浏览器或重新登录！')
		}			
	}
};


function orgTreeInit() {
	if (orgNodesTree.nodes.length) {
		$('.userLoading').hide();
		initzTree();
	}
}


function orgTreeUpdate() {
	$('#treeDemo').empty();
	$('.userLoading').show();
	var getNodeData = orgNodesTree.getOrgNodesCallback.bind(orgNodesTree);
	orgGetGroup(getNodeData);
}


function initzTree() {
	$.fn.zTree.init($("#treeDemo"), setting, orgNodesTree.nodes);
	if (orgNodesTree.onlinePushTimes === 1 && orgNodesTree.onlineFirstTiming > orgNodesTree.initTreeTiming) {
		console.log('第一次特殊生成树！')
		var users = onlineInfo.keySet();
		users.forEach(function(item) {
			var nodeId = usersAll.get(item);
			if (nodeId)
				orgNodesTree.refreshDataXY(nodeId.OrgId, true);
		});
		orgNodesTree.onlinePushTimes = 2;
	}
}

function getSpecifyNodeContent() {
	var body = '{"Code": 10313,"Body": {"SessionId": \"' + sessionId + '\", "OrgId": 919}}';

	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			// console.log(JSON.stringify(ret));
			if (ret.Result == 200) {
				//alert(9);
			} else {
				showAlert('未请求成功，请刷新页面重新加载');
			}
		}
	)
}

function addGroup(orgGroup, pid, t) {
	for (var i = 0, len = orgGroup.length; i < len; i++) {
		var group = orgGroup[i];
		node = {
			id: group.Id,
			pId: pid,
			name: group.Name,
			isParent: true,
			nocheck: true
		};
		t.push(node);
		//递归取组织
		if (group.Orgs && group.Orgs.length > 0) {
			addGroup(group.Orgs, group.Id, t);
		}
	}
}

function getMemberListCallBack(array, res) {
	//console.log(JSON.stringify(res));	
	//	var arr = res.Users;
	//	var obj;
	//	for(var i=0,len=arr.length; i<len; i++){
	//		obj = {
	//			id: arr[i].Uid,
	//			pId: '0',
	//			name: arr[i].Name,
	//			isParent: false
	//		};
	//		array.push(obj);
	//	}
	//console.log(JSON.stringify(zNodes))
	if (zNodes.length !== 0) {
		initzTree();
	}
	//initzTree();
}

function radioUserSelect(event, treeId, treeNode) {
	radioUserSelectEvent(event, treeId, treeNode);
}

function ztreeBeforeCheck(treeId, treeNode) {
	return ztreeBeforeCheck_broadcast(treeId, treeNode) 
}


function ztreeBeforeCheckFn(treeId, treeNode) {
    var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes;
    var nodesNoRepeat = [];
    
    if (treeNode.isParent) {
    	
    	if (treeNode.checked) {
    		nodes = ztreeObj.getNodesByFilter(nodeWillNoCheckFilter, false, treeNode);
    		nodes.forEach(function(item) {
    			treeAddUsers.remove(item.id);
    		});
    		chatAddTreeuserView(nodes, 'channel_telladdlist',  false);
    	} else {
    		if (!gChannelCreate) {

	    		nodes = ztreeObj.getNodesByFilter(nodeWillCheckFilterChat, false, treeNode);
	    		
	    		if (nodes.length + treeAddUsers.size() + currentChatMembers.length > RADIO_CALL_TOTAL) {
	    			showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
	    			return false;
	    		} else {
		    		nodes.forEach(function(item) {
		    			if (!treeAddUsers.containsKey(item.id)) {
		    				treeAddUsers.put(item.id, {id: item.id, name: item.name});
		    				nodesNoRepeat.push(item);
		    			}
		    		});
	    		}
    		} else {
    			nodes = ztreeObj.getNodesByFilter(nodeWillCheckFilter, false, treeNode);

    			if (nodes.length + treeAddUsers.size() + 1 > RADIO_CALL_TOTAL) {
    				showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
	    			return false;
    			} else {
    				nodes.forEach(function(item) {
		    			if (!treeAddUsers.containsKey(item.id)) {
		    				treeAddUsers.put(item.id, {id: item.id, name: item.name});
		    				nodesNoRepeat.push(item);
		    			}
		    		});
    			}
    		}
    		chatAddTreeuserView(nodesNoRepeat, 'channel_telladdlist', true);
    	}

    } else {
    	if (treeNode.checked) {
    		treeAddUsers.remove(treeNode.id);
    		chatAddTreeuserView(treeNode, 'channel_telladdlist', false);
    	} else {
    		if (!gChannelCreate) {
    			if (!isInCurrentChatMembers(treeNode)) {
    				// showAlert('该成员已存在会话中，请勿重复添加！');
    				return false;
    			}

    			if (1 + treeAddUsers.size() + currentChatMembers.length > RADIO_CALL_TOTAL) {
	    			showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
	    			return false;
	    		} else {
	    			if (!treeAddUsers.containsKey(treeNode.id)) {
						treeAddUsers.put(treeNode.id, {id: treeNode.id, name: treeNode.name});
						chatAddTreeuserView(treeNode, 'channel_telladdlist', true);
					};
	    		}
    		} else {
    			if (1 + treeAddUsers.size() + 1 > RADIO_CALL_TOTAL) {
    				showAlert('会话成员不能超过' + RADIO_CALL_TOTAL + '人！');
	    			return false;
    			} else {
    				if (!treeAddUsers.containsKey(treeNode.id)) {
						treeAddUsers.put(treeNode.id, {id: treeNode.id, name: treeNode.name});
						chatAddTreeuserView(treeNode, 'channel_telladdlist', true);
					};
    			}
    		}
    	}
    }	
}


function doZtreeChecked(treeId, uid, isChecked) {

	//doZtreeChecked('userAddtree', id, false);
	var	ztreeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = ztreeObj.getCheckedNodes(!isChecked);
	console.log(JSON.stringify(nodes));
    treeAddUsers.remove(uid);
	for (var i = 0; i < nodes.length; i++) {
		if (uid == nodes[i].id) {
			ztreeObj.checkNode(nodes[i], isChecked, true);
    		break;
		}
	}
}
var isFirst = true;
function zTreeOnAsyncSuccess(treeId){
	if (isFirst) {
		treeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodes = treeObj.getNodes();
		 if (nodes.length>0) {

          for(var i=0;i<nodes.length;i++){

          treeObj.expandNode(nodes[i], true, false, false);

          }

      }

	}
	
}
function ztreeDblclickCall(event, treeId, treeNode) {
	var target = event.target || event.srcElement;
	var parent;
	if (target.nodeName == 'A') {
		parent = $(target).prev();
	} else if (target.nodeName == 'SPAN') {
		parent = $(target).parent().prev();
	}
	parent.trigger('click');
}


function ztreeBeforeCheckHelper(treeId, treeNode) {
    var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes;
    var nodesNorepeat = [];
    var ck = true;
    if (treeNode.isParent) {
    	
    	if (treeNode.checked) {
    		nodes = ztreeObj.getNodesByFilter(nodeWillNoCheckFilter, false, treeNode);
    		nodes.forEach(function(item) {
    			treeAddUsers.remove(item.id);
    		});
    		addTreeuserView(treeId, nodes, false);
    	} else {
    		nodes = ztreeObj.getNodesByFilter(nodeWillCheckFilter, false, treeNode);
    		nodes.forEach(function(item) {
    			if(treeId=="userAddtree"){
    				for(var i=0;i<fenceLine[line_index].Members.length;i++){
	    				if(fenceLine[line_index].Members[i].Uid==item.id){
	    					ck = false;
	    					break;
	    				}else{
	    					ck = true;
	    				}
    				}
    			}
    			if(treeId=="channerAddtree"){
    				for(var j=0;j<currentClmembers_array.length;j++){
    					if(currentClmembers_array[j]==item.id){
    						ck = false;
	    					break;
    					}else{
	    					ck = true;
	    				}
    				}
    			}
    			if (!treeAddUsers.containsKey(item.id)&&ck) {
    				treeAddUsers.put(item.id, {id: item.id, name: item.name});
    				nodesNorepeat.push(item);
    			}
    		});
    		addTreeuserView(treeId, nodesNorepeat, true);
    	}

    } else {
    	if (treeNode.checked) {
    		treeAddUsers.remove(treeNode.id);
    		addTreeuserView(treeId, treeNode, false);
    	} else {
    		if (!treeAddUsers.containsKey(treeNode.id)) {
				treeAddUsers.put(treeNode.id, {id: treeNode.id, name: treeNode.name});
				addTreeuserView(treeId, treeNode, true);
			};
    	}
    }
}

function addTreeuserView(treeId, nodes, isAdd) {
	switch (treeId) {
		case 'helptree':
			helperAddTreeuserView(nodes, 'help_memberselect1', isAdd);
			break;
		case 'Mediatree':
			helperAddTreeuserView(nodes, 'media_memberselect1', isAdd);
			break;
		case 'userAddtree':
			lineAddTreeuserView(nodes, 'fenceUsers', isAdd);
			break;
		case 'userAddtrees':
			lineAddTreeuserView(nodes, 'fenceUsers', isAdd);
			break;
		case 'Tasktree':
			taskAddTreeuserView(nodes, 'task_creatman', isAdd);
			break;
		case 'jiankong':
			monitorAddTreeuserView(nodes, isAdd);
			break;
		case 'channerAddtree':
			channelAddTreeuserView(nodes, 'channel_addlist', isAdd);
			break;
		case 'channerAddtrees':
			channelAddTreeuserView(nodes, 'channel_addlist', isAdd);
			break;
		case 'tramitvideo':
			videoAddTreeuserView(nodes, 'media_memberselect2', isAdd);
			break;
		default:
			break;
	}
}

function helperAddTreeuserView(data, list, isAdd) {
	var list = $('#' + list);
	var html = '';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
			}) 
		} else {
			html = '<li name="' + data.id + '" class="channeladdmanlist" name="channelman"><i>' + data.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
		}
		list.append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				list.children('li[name="' + item.id + '"]').remove();
			})
		} else {
			list.children('li[name="' + data.id + '"]').remove();
		}
	}	
}

function lineAddTreeuserView(data, list, isAdd) {
	var list = $('#' + list);
	var html = '';
	var str = $('.noAllin').prop('checked') ? '禁入' : '禁出';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="'+item.id+'" class="fix user-fenceSelect-item"><span class="fl">'+item.name+'</span>'+
				  '<img class="fr fenceSelDel" onclick="fenceSelectedUsersDel(\''+item.id+'\')" src="img/icon/fence/fence_bg_del1.png" alt="img" />'+
				  '<div class="fence-list-right fence-mem" onclick="fenceUsersOperate(this)"><span class="fencerType">'+str+'</span>'+
				  '<img src="img/icon/fence/fence_bg_downSmall.png" />' + '<ul><li class="first">禁出</li><li>禁入</li></ul></div></li>';
			})
		} else {
			html = '<li name="'+data.id+'" class="fix user-fenceSelect-item"><span class="fl">'+data.name+'</span>'+
				  '<img class="fr fenceSelDel" onclick="fenceSelectedUsersDel(\''+data.id+'\')" src="img/icon/fence/fence_bg_del1.png" alt="img" />'+
				  '<div class="fence-list-right fence-mem" onclick="fenceUsersOperate(this)"><span class="fencerType">'+str+'</span>'+
				  '<img src="img/icon/fence/fence_bg_downSmall.png" />' + '<ul><li class="first">禁出</li><li>禁入</li></ul></div></li>';
		}
		list.append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				list.children('li[name="' + item.id + '"]').remove();
			})
		} else {
			list.children('li[name="' + data.id + '"]').remove();
		}
	}		
}

function taskAddTreeuserView(data, list, isAdd) {
	var list = $('#' + list);
	var html = '';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="'+ item.id +'"><i>'+ item.name +'</i><img  onclick="channelremoveman(this)" src="img/icon/channel/channeldes.png" alt="" /></li>';
			})
		} else {
			html = '<li name="'+ data.id +'"><i>'+ data.name +'</i><img  onclick="channelremoveman(this)" src="img/icon/channel/channeldes.png" alt="" /></li>';
		}
		list.append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				list.children('li[name="' + item.id + '"]').remove();
			})
		} else {
			list.children('li[name="' + data.id + '"]').remove();
		}
	}	
}

function channelAddTreeuserView(data, list, isAdd) {
	var list = $('#' + list);
	var html = '';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span>'+
						'<div class="channel_addlists" onclick="channelselect(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt="" />'+
						'<span class="channnel_manpower">低</span><div class="channel_addlistselect">'+
						'<ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';
			})
		} else {
			html = '<li name="' + data.id + '" class="channeladdmanlist" name="channelman"><i>' + data.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span>'+
					'<div class="channel_addlists" onclick="channelselect(this)"><i>优先级</i><img src="img/icon/channel/channel_select1.png" alt="" />'+
					'<span class="channnel_manpower">低</span><div class="channel_addlistselect">'+
					'<ul><li><span>高</span></li><li><span>中</span></li><li><span>低</span></li><li><span>仅听</span></li></ul></div></div></li>';
		}
		list.append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				list.children('li[name="' + item.id + '"]').remove();
			})
		} else {
			list.children('li[name="' + data.id + '"]').remove();
		}
	}	
}

function chatAddTreeuserView(data, list, isAdd) {
	var list = $('#' + list);
	var html = '';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
			})
		} else {
			html = '<li name="' + data.id + '" class="channeladdmanlist" name="channelman"><i>' + data.name + '</i><span class="channel_removelist" onclick="channelremoveman(this)"></span></li>';
		}
		list.append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				list.children('li[name="' + item.id + '"]').remove();
			})
		} else {
			list.children('li[name="' + data.id + '"]').remove();
		}
	}		
}

function videoAddTreeuserView(data, list, isAdd) {
	var doc = $(window.frames["veiframe"].document);
	// var list = $('#' + list);
	var html = '';

	if (isAdd) {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				html += '<li name="' + item.id + '" class="channeladdmanlist" name="channelman"><i>' + item.name + '</i><span class="channel_removelist" onclick="channelremovemanfram(this)"></span></li>';
			})
		} else {
			html = '<li name="' + data.id + '" class="channeladdmanlist" name="channelman"><i>' + data.name + '</i><span class="channel_removelist" onclick="channelremovemanfram(this)"></span></li>';
		}
		doc.find('#' + list).append(html);
	} else {
		if (Array.isArray(data)) {
			data.forEach(function(item) {
				doc.find('#' + list).children('li[name="' + item.id + '"]').remove();
			})
		} else {
			doc.find('#' + list).children('li[name="' + data.id + '"]').remove();
		}
	}	
}

function nodeWillNoCheckFilter(node) {
	return !node.isParent && node.id !== loginId && node.checked;
}

function nodeWillCheckFilterChat(node) {
	var result = isInCurrentChatMembers(node);
	return !node.isParent && node.id !== loginId && result;
}

function isInCurrentChatMembers(node) {
	var result = true;
	for (var i = 0; i < currentChatMembers.length; i++) {
		if (currentChatMembers[i].Uid == node.id) {
			result = false;
			break;
		}
	}
	return result;	
}

function addTreeGroupNode(self, treeId, treeNode) {
	var oDiv = document.getElementById('addGroupNode');
	var img = oDiv.getElementsByTagName('img')[0];
	var obj = $("#" + treeNode.tId + "_a");
	var d = obj.offset().top - 50;
	var l = self.offset().left - 78;

	$('.OrgName').val('');

	if (oDiv.style.display == 'none') {
		$('#addGroupNode').children('button').removeClass('btn-active').attr('disabled','disabled');
		$('#editGroupName').hide();
		$('#sortGroupNode').hide();
		oDiv.style.top = d + 'px';
		img.style.left = l + 'px';
		oDiv.style.display = 'block';
		$('.treeId_add').val(treeNode.id);
	} else {
		oDiv.style.display = 'none';
		$('.treeId_add').val('');
	}
}

function doAddGroup() {
	var OrgParentId = $('.treeId_add').val();
	var newName = $('.OrgName').val();
	var specialCode = RegeMatchValC(newName);
	
	if (specialCode) {
		return showAlert('组织名称不允许有特殊字符！');
	}

	if (newName == '') {
		showAlert("名字不能为空");
		return;
	}
	if (newName.length > 30) {
		return showAlert("名字不能为空或超过30个字符！");
	}
	
	var OrgName = encodeURI(encodeURI(newName));
	var body = '{"Code": 10101,"Body": {"SessionId": \"' + sessionId + '\","OrgParentId": \"' + OrgParentId + '\","OrgName": \"' + OrgName + '\"}}';
	var ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var parentNode = ztreeObj.getNodeByParam("id", OrgParentId, null);
	
	ztreeObj.expandNode(parentNode, true, false, true);
	coverShow();
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		
		if (ret.Result == 200) {
			var newId = ret.OrgId;

			//2018.1.9
			$('.treeId_add').val(newId);
			//---------
			$('#groupNewId').val(ret.OrgId);
			$('.addedGroupName').html(newName);
			nogroupUserList(OrgParentId);

		} else if (ret.Result == 410) {
			showAlert("名字不能为空或超过30个字符！");
		} else {
			showAlert('添加失败！');
		}
	});

	$('#squaredthat').prop('checked', false);
	$('#squaredthat').next('label').removeClass('label-bg');
	$('.totalUsers').text(0);
	$('#addGroupNode').hide();
	$("#diyBtn1_" + OrgParentId).css("background", "url(img/chat/userOrgAdd.png) no-repeat");

}

function nogroupUserList(orgId) {
	var body = '{"Code":10111,"Body":{"SessionId":\"' + sessionId + '\","OrgId":'+orgId+'}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(res) {
		$('.cover_loading').hide();
		var users, html = '';
		if (res.Result == 200) {
			users = res.Users;
			addOrgFuzzSearch = [];
			addOrgFuzzSearchId = [];
			users = userArrayAddonlineProperty(users);
			for (var i = 0, len = users.length; i < len; i++) {
				name = users[i].Name;
				id = users[i].Uid;
				addOrgFuzzSearch.push(name);
				addOrgFuzzSearchId.push(id);
				var mycheckbox =  '<div class="squaredbox"><input class="' + id + '" name="list-2" type="checkbox" id="'+id+'_x" /><label for="'+id+'_x"></label></div>';
				var span = users[i].state ? '<span class="on only_one">' + name + '</span>' : '<span class="on only_one offline">' + name + '</span>';
				html += '<li><a class="org-listA">' + mycheckbox + span +'</a></li>';
			}
			$('#newGroup-userlist').append(html);
			$('.groupAddUsers').show();
			$('#bg-color').show();
			userCheckNumber = document.getElementsByName('list-2').length;
			checkBox('list-2', 'listUserAll', 'totalUsers');
		} else {
			showAlert('获取未分组成员失败！');
		}
	});

}


function userArrayAddonlineProperty(array) {
	for (var i = 0, len = array.length; i < len; i++) {
		for (var j = 0, lon = userOnlineStatus.length; j<lon; j++) {
			if (array[i].Uid === userOnlineStatus[j].ipocid) {
				array[i].state = 1;
				break;
			}
		}
	}

	return array	
}

function usersBelong() {
	var el;
	var arr = [];
	var ToOrgId = $('#groupNewId').val();

	if ($('#newGroup-userlist').is(':hidden')) {
		el = document.getElementsByName('list-4');
	} else {
		el = document.getElementsByName('list-2');
	}

	for (var i = 0, len = el.length; i < len; i++) {
		if (el[i].checked == true) {
			arr.push(el[i].className)
		}
	}
	if (arr.length !== 0) {
		var body = '{"Code":10110,"Body":{"SessionId":\"' + sessionId + '\","ToOrgId":' + ToOrgId + ',"Users":' + "[" + arr + "]" + '}}';
		var ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var childNode;
		var parentNode = ztreeObj.getNodeByParam("id", ToOrgId, null);
	
		ztreeObj.expandNode(parentNode, true, false, true);
		coverShow();
		$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
			coverHide();
			if (ret.Result == 200) {
				var orgid = $('.treeId_add').val();
				for (var j = 0, log = arr.length; j < log; j++) {
					var userinfo = usersAll.get(arr[j]);
					userinfo.Role = 0;
					userinfo.OrgId = orgid;
				}

				showAlert('移动成员成功!');
				groupAddUsersHide();
				alldispatcherRemove(arr);
				allUsersDispatcherRemove(arr);
			} else if (ret.Result == 406) {
				// showAlert('移动成员中包含同级调度员，不允许归属！');
					var userorgid=usersAll.get(HelploginId).OrgId;
				    var user_ALLmsg=[];

					for(var i=0;i<arr.length;i++){

						var arrnum=Number(arr[i]);
					    var roleuser=usersAll.get(arrnum);
					    user_ALLmsg.push(roleuser);
					  
					}
					
                    userlist_seachAll(user_ALLmsg,userorgid);
			} else if (ret.Result == 407) {
				showAlert('相同组织不能再次归属！');
			} else {
				showAlert('添加成员失败！');
			}

		});

	} else {
		showAlert('请选择用户！');
		return;
	}
}

function groupAddUsersHide() {
	$('.groupAddUsers').hide();
	$('#bg-color').hide();
	$('.user-list').hide();
	$('#newGroup-userlist').empty();
	$('.addOrguserFuzz').val('');
	addOrguserFuzzSearch();
	orgTreeUpdate();
}

function groupEdit(self, treeId, treeNode) {
	var box = $('#editGroupName');
	var l = self.offset().left - 81;
	var obj = $("#" + treeNode.tId + "_a");
	var d = obj.offset().top - 50;
	var name = treeNode.name;
	name = name.slice(0, name.indexOf('('));

	$('.OrgNewName').val(name);
	if (box.is(':hidden')) {
		$('#addGroupNode').hide();
		$('#sortGroupNode').hide();
		$('.editGroup_img').css("left", l);
		box.css("top", d);
		box.show();
		$('.treeId_edit').val(treeNode.id);
	} else {
		box.hide();
	}

	return false;
}

var treeSortData = null;
function groupSort(self, treeId, treeNode) {
	var childNode = treeNode.children;
	var content = '';
	var box = $('#sortGroupNode');
	var l = self.offset().left - 73;
	var obj = $("#" + treeNode.tId + "_a");
	var d = obj.offset().top - 40;

	if (box.is(':hidden')) {
		treeSortData = treeNode;
		if (childNode && childNode.length) {
			for (var i=0,len=childNode.length; i<len; i++) {
				var name = childNode[i].name;
				name = name.slice(0, name.indexOf('('));
				content += '<li class="fix" data-id="'+childNode[i].id+'"><i class="fl">'+ name +'</i><div class="fr sortGroupNode-logo"><i></i><i></i><i></i></div></li>';
			}
			$('#sortGroupNode-ul').empty().append(content);
		
			$('#addGroupNode').hide();
			$('#editGroupName').hide();
			$("#sortGroupNode-ul").sortable();
			$('#sortGroupNode-ul li').mousedown(function() {
				$(this).find('.sortGroupNode-logo').find('i').css("background", "#FF8B00")
			});
			$('#sortGroupNode-ul li').mouseup(function() {
				$(this).find('.sortGroupNode-logo').find('i').css("background", "#ccc");
			});
			
			$('.sortGroup_img').css("left", l);
			box.css("top", d);
			box.show();
		} else {
			showAlert('当前节点没有子节点！')
		}	
	} else {
		treeSortData = null;
		box.hide();
	}

	return false;	
}

function doGroupSorting() {
	var arr = [],
		children = $('#sortGroupNode-ul').children('li'),
		Id = treeSortData.id,
		body;

	children.each(function() {
		arr.push($(this).attr('data-id'))
	})
	body = '{"Code":11420,"Body":{"SessionId":\"' + sessionId + '\","Id":' + Id + ',"IdType":0,"ObjectIds":[' + arr + ']}}';
	
	$('.cover_loading').show();
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(ret) {
			$('.cover_loading').hide();
			if (ret.Result == 200) {
				$('#treeDemo').empty();
				$('.userLoading').show();
				showAlert('排序成功！');
				$('#sortGroupNode').hide();
				var getNodeData = orgNodesTree.getOrgNodesCallback.bind(orgNodesTree);
				orgGetGroup(getNodeData);
			} else {
				showAlert('排序失败!');
			}
		}
	)	
}


function doGroupEdit() {
	var OrgId = $('.treeId_edit').val();
	var OrgNewName = $('.OrgNewName').val();
	var specialCode = RegeMatchValC(OrgNewName);
	
	if (specialCode) {
		return showAlert('组织名称不允许有特殊字符！');
	}

	if (OrgNewName == '' || OrgNewName.trim().length === 0) {
		showAlert("名字不能为空");
		return;
	}

	if (OrgNewName.length > 30) {
		return showAlert('名字不能超过30个字符！')
	}
	
	OrgName = encodeURI(encodeURI(OrgNewName));
	$('.cover_loading').show();
	var body = '{"Code":10103,"Body":{"SessionId":\"' + sessionId + '\","OrgId":' + OrgId + ',"OrgName":\"' + OrgName + '\"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		$('.cover_loading').hide();
		if (ret.Result == 200) {
			updateNodeName("treeDemo", OrgId, OrgNewName);
			// var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			// var node = treeObj.getNodeByParam("id", OrgId, null);
			// var nodeData = orgNodesTree.data[OrgId];
			// node.name = OrgNewName + '(' + nodeData.x + '/' + nodeData.y + ')';
			// treeObj.updateNode(node);
			showAlert('修改名称成功！')
		} else if (ret.Result == 410) {
			showAlert('名字不能为空或超过30个字符！');
		} else {
			showAlert('修改名称失败！');
		}
	});
	$('#editGroupName').hide();
	$('#diyBtn2_' + OrgId).css("background", "url(img/chat/pengray.png) no-repeat");
}


function updateNodeName(treeId, orgId, orgName) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var originNode = orgNodesTree.nodes;
	var nodeData = orgNodesTree.data[orgId];
	var newName = orgName + '(' + nodeData.x + '/' + nodeData.y + ')';

	for (var i = 0, len = originNode.length; i < len; i++) {
		if (originNode[i].id == orgId) {
			originNode[i].name = newName;
			break;
		}
	}
	
	if (!treeObj) return; 
	var node = treeObj.getNodeByParam("id", orgId, null);
	if (!node) return;
	node.name = newName;
	treeObj.updateNode(node);
	
	var obj = $('.cus-name');
	var id = obj.attr('oid');
	if (id == orgId) {
		obj.text(orgName)
	}
	
}

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
}

function addHoverDom(treeId, treeNode) {
	
	if (!treeNode.isParent) return;
	if ($("#diyBtn1_" + treeNode.id).length > 0) return;
	if ($("#diyBtn2_" + treeNode.id).length > 0) return;
	
	var aObj = $("#" + treeNode.tId + "_a"),addStr;
	if (treeNode.pId == null) {
		addStr = "<span class='button icon01' id='diyBtn1_" + treeNode.id + "' title='添加组织' onfocus='this.blur();'></span>" +
				"<span id='diyBtn_space3_" + treeNode.id + "'>&nbsp;</span><span class='button icon03' title='组织排序' id='diyBtn3_" + treeNode.id + "' onfocus='this.blur();'></span>";		
	} else {
		addStr = "<span class='button icon01' id='diyBtn1_" + treeNode.id + "' title='添加组织' onfocus='this.blur();'></span>" +
		"<span id='diyBtn_space2_" + treeNode.id + "'>&nbsp;</span><span class='button icon02' title='修改名称' id='diyBtn2_" + treeNode.id + "' onfocus='this.blur();'></span>" +
		"<span id='diyBtn_space3_" + treeNode.id + "'>&nbsp;</span><span class='button icon03' title='组织排序' id='diyBtn3_" + treeNode.id + "' onfocus='this.blur();'></span>";
	}

	aObj.append(addStr);
	var btn1 = $("#diyBtn1_" + treeNode.id);
	var btn2 = $("#diyBtn2_" + treeNode.id);
	var btn3 = $("#diyBtn3_" + treeNode.id);

	if (btn1) btn1.on("click", function() {
		addTreeGroupNode($(this), treeId, treeNode);
		return false;
	});
	if (btn2) btn2.bind("click", function() {
		groupEdit($(this), treeId, treeNode);
		return false;
	});
	if (btn3) btn3.bind("click", function() {
		groupSort($(this), treeId, treeNode);
		return false;
	});
};

function removeHoverDom(treeId, treeNode) {
	if (!treeNode.isParent) return;
	$("#diyBtn1_" + treeNode.id).unbind().remove();
	$("#diyBtn2_" + treeNode.id).unbind().remove();
	$("#diyBtn3_" + treeNode.id).unbind().remove();
	$("#diyBtn_space1_" + treeNode.id).unbind().remove();
	$("#diyBtn_space2_" + treeNode.id).unbind().remove();
	$("#diyBtn_space3_" + treeNode.id).unbind().remove();
};



function initaTree() {
	$.fn.zTree.init($('#userAddtree'), asetting, aNodes);
}
function initaTrees() {
	$.fn.zTree.init($('#userAddtrees'), asetting_s, aNodes);

}
function initChannelTrees() {
	$.fn.zTree.init($('#channerAddtrees'), csetting_s, aNodes);
	$.fn.zTree.init($('#channeltellAddtree'), csettings, aNodes);
}
function initChannelTree() {
	$.fn.zTree.init($('#channerAddtree'), csetting, aNodes);
	$.fn.zTree.init($('#channeltellAddtree'), csettings, aNodes);
}
function inintTaskTree() {
	$.fn.zTree.init($('#Tasktree'), csettingtask, aNodes);
}
function inintChnanneVideoTree() {
	$.fn.zTree.init($('#tramitvideo'), csettingss, aNodes);
}

function jiankongUsertree() {
	$.fn.zTree.init($('#jiankong'), jiankongseting, aNodes);
}

function inintChnanneMideaTree() {
	$.fn.zTree.init($('#Mediatree'), csetMedia, aNodes);
}

function inintRadioTree() {
	$.fn.zTree.init($('#radio_tree'), csetRadio, aNodes);
}

function inintHelpFtree() {
	$.fn.zTree.init($('#helptree'), helpcseting, aNodes);
}

function initgTree() {
	var body = '{"Code" : 10100,"Body" : {"SessionId" : \"' + sessionId + '\"}}';
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(data) {
		if (data.Result == 200) {
			gNodes.length = 0;
			var node, orgGroup;
			data = data.Orgs[0];
			node = {
				id: data.Id,
				pId: -1,
				name: data.Name,
				isParent: true,
				open: true
			};
			gNodes.push(node);
			addGroup(data.Orgs, data.Id, gNodes);
			$.fn.zTree.init($("#moveUserTree"), gsetting, gNodes);
		} else {
			showAlert('未请求成功，请重新加载');
		}
	});
}


var userSearchTime = 0;

function userValueSearch() {
    if (userSearchTime === 0) {
    	userValueSearchNext();
    } else {
    	userSearchTime = 1;
    }
}


function userValueSearchNext() {
	++userSearchTime;
	if (userSearchTime > 2) {
		userSearchTime = 0;
		userSearch();
		return;
	} 
	setTimeout(function(){userValueSearchNext()},900);
}

function userSearch() {
	$('.window-user').hide();
	useridArray1.length = 0;
	useridArray2.length = 0;
	console.log('开始所搜',new Date());
	var k = $('.userSearch').val();

	if (k == '+' || k == '[' || k == '(' || k == '\\' || k == '^' || k == '$' || k == '|' || k == ')' || k == '?' || k == '*' || k == '.' || k == ']') {
		$('.userSearch').val('')
		return;
	}
	var btns = $('.org-btm-con2').find('button');
	btns.removeClass('btn-active').attr("disabled", true);
	// k = codeWritedMofify(k);
	var searList1 = searchRegExp(k, nameList1, useridArray1, idList1);
	var searList2 = searchRegExp(k, nameList2, useridArray2, idList2);
    // console.log('数据加载',new Date());
	// checkReset1();	
	if (k !== '') {
		$('#org-no-list').hide();
		$('#org-listing').hide();
		$('#searchUl1').show();
		$('#searchUl2').show();
		filterMenu(k, searList1, useridArray1, 'searchUl1', 3, 0);
		filterMenu(k, searList2, useridArray2, 'searchUl2', 3, 1);
		 
		userCheckNumber = document.getElementsByName('list-3').length;
		$('.totalMohu').text(0).show();
		$('.total').hide();
		$('#user_mohu').show();
		$('#user_nomohu').hide();
		$('#squaredAllMohu').prop('checked', false);
		$('#squaredAllMohu').next('label').removeClass('label-bg');
		checkBox('list-3', 'listAllMohu', 'totalMohu');
		userHover();
		console.log('DOM加载',new Date());
	} else {
		$('#searchUl1').hide();
		$('#searchUl2').hide();
		$('#org-no-list').show();
		$('#org-listing').show();
		userCheckNumber = document.getElementsByName('list-1').length;
		$('.total').show();
		$('#user_nomohu').show();
		$('.totalMohu').hide();
		$('#user_mohu').hide();
		if ($('.total').text() != '0') {
			btns.addClass('btn-active').removeAttr("disabled");
		}
		// checkBox('list-1', 'listAll', 'total');
		
	}

}


function userSearchDataUpdate(uid, username) {
	var index = idList1.indexOf(uid);
	if (index !== -1) {
		nameList1[index] = username;
		$('#user-sort-ul1').children('li').eq(index).children('div').children('span').text(username);
	} else {
		var index1 = idList2.indexOf(uid);
		nameList2[index1] = username;
		$('#user-sort-ul2').children('li').eq(index1).children('div').children('span').text(username);
	}
}

//过滤列表
function filterMenu(key, arr, arrid, target, num, type) {
	var html = '';
	var at = target + '_a';
	var keycode = new RegExp(key, 'g');
	var name = 'list-' + num;

	$('#' + target).empty();
	if (arr.length === 0) {
		$('#' + target).append('<div style="text-align:center;">无相关人员！</div>')
	}

	for (var k = 0, leng = arr.length; k < leng; k++) {
		var text = arr[k].replace(keycode, '<span class="sf-color">' + key + '</span>');
		var roleUser = usersAll.get(arrid[k]).Role;
		
		if (target == 'searchUl1') {
	
			if (arrid[k] == loginId) {
				var myCheckbox = '<div class="squaredbox"><input disabled=false class="bg_checked" type="checkbox" id="'+arrid[k]+'_u" /><label for="'+arrid[k]+'_u"></label></div>';
				
				html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox +
					'<span class="on only_one">' + text + '</span><span class="userfn_icons">' + '</span></a></li>';
					
			} else {
				myCheckbox = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+arrid[k]+'_u" name="'+name+'" /><label for="'+arrid[k]+'_u"></label></div>';
				if (treeIdData.pid == null) {
					if (roleUser) {
						html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox +
							'<span class="on only_one">' + text + '</span>' + '<span class="userfn_icons">' +
							'<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />' +
							'</span></a></li>';
					} else {
						html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox +
							'<span class="on only_one">' + text + '</span>' + '<span class="userfn_icons">' +
							'<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />' +
							'<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />' +
							'<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />' +
							'<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="0" class="remove-img" onclick="userRemoveToPre(this,0,\'searchUl1\')" alt="img" />' +
							'</span></a></li>';
					}
				} else {
					if (roleUser) {
						html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox +
							'<span class="on only_one">' + text + '</span>' + '<span class="userfn_icons">' +
							'<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />' +
							'<img style="display:none;" src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />' +
							'<img style="display:none;" src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />' +
							'<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="0" class="remove-img" onclick="userRemoveToPre(this,0,\'searchUl1\')" alt="img" />' +
							'</span></a></li>';
					} else {
						html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox +
							'<span class="on only_one">' + text + '</span>' + '<span class="userfn_icons">' +
							'<img src="img/icon/userIcon/user_phone.png" title="呼叫" alt="img" onclick="callmake_org(this,0)" />' +
							'<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />' +
							'<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />' +
							'<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,0,\'searchUl1\')" alt="img" />' +
							'<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="0" class="remove-img" onclick="userRemoveToPre(this,0,\'searchUl1\')" alt="img" />' +
							'</span></a></li>';
					}
				}
			}	

		} else {
			var myCheckbox1 = '<div class="squaredbox"><input class="bg_checked" type="checkbox" id="'+arrid[k]+'_u" name="'+name+'" /><label for="'+arrid[k]+'_u"></label></div>';
			if (roleUser) {
				html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox1 +
					'<span class="on only_one">' + text + '</span>' + '</span><span class="userfn_icons">' +
					'<img src="img/icon/userIcon/user_phone.png" title="呼叫" onclick="callmake_org(this,0)" alt="img" />' +
					'<img style="display:none;" src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />' +
					'<img style="display:none;" src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />' +
					'<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,1,\'searchUl1\')" alt="img" />' +
					'<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,1,\'searchUl1\')" alt="img" />' +
					'<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="1" class="remove-img" onclick="userRemoveToPre(this,1,\'searchUl1\')" alt="img" />' +
					'</span></a></li>';
			} else {
				html += '<li class="' + arrid[k] + '"><a class="org-listA ' + at + '">' + myCheckbox1 +
					'<span class="on only_one">' + text + '</span>' + '</span><span class="userfn_icons">' +
					'<img src="img/icon/userIcon/user_phone.png" title="呼叫" onclick="callmake_org(this,0)" alt="img" />' +
					'<img src="img/icon/userIcon/user_location.png" title="定位" alt="img" onclick="getNowPos(this)" />' +
					'<img src="img/icon/userIcon/user_video.png" title="视频" alt="img" onclick="callmake_org(this,1)" />' +
					'<img src="img/icon/userIcon/user_bi.png" title="编辑" class="userEdit_img" onclick="userfnEdit(this,1,\'searchUl1\')" alt="img" />' +
					'<img src="img/icon/newicon/powers.png" title="权限" class="userInfo_img" onclick="userfnFig(this,1,\'searchUl1\')" alt="img" />' +
					'<img src="img/icon/fence/fence_bg_del1.png" title="删除" data-rm="1" class="remove-img" onclick="userRemoveToPre(this,1,\'searchUl1\')" alt="img" />' +
					'</span></a></li>';
			}

		}
	}

	$('#' + target).append(html);
	 console.log('绘制完成',new Date());
}

function searchRegExp(key, list, list1, list2) {
	// (k, nameList1, useridArray1, idList1);
	if (!(list instanceof Array)) {
		return;
	}
	var arr = [],
		len = list.length,
		reg = new RegExp(key);
	for (var i = 0; i < len; i++) {
		if (list[i].match(reg)) {
			arr.push(list[i]);
			list1.push(list2[i]);
		} else {
			if (key === list2[i]) {
				arr.push(usersAll.get(key).Name);
				list1.push(key);
			}
		}
	}

	// if (usersAll.containsKey(key)) {
	// 	arr.push(usersAll.get(key).Name);
	// 	list1.push(key);
	// }
	console.log('数据加载',new Date());
	return arr;
}

//组织成员明细重置密码
function userDetailspwdReset() {
	var hang='<br>';
	var uid = $('.userID').text();
	var user_power=ChannelAllcher.containsKey(uid);
	var pwd = getRandomPassword(user_power);
	var body;
	var that;
	console.log('重置密码'+pwd);
	if(user_power ){
 
         var userpwd=Setuser_Pwd(uid,pwd);
		    body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uid+'","Pwd":"'+userpwd+'"}}' 
		    that = $('#pwd_chongzhi');

	}else{

		    body = '{"Code": 10107,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uid + '\","Pwd":\"' + pwd + '\"}}';


	}
	
	
	// that.off('click', userDetailspwdReset);
	// that.css({'background': '#ccc', 'cursor': 'not-allowed'});
	$('.cover_loading').show();
	$.getJSON(STATION_URL + '?Body=' + body,
		function(ret) {
			$('.cover_loading').hide();
			if (ret.Result == 200) {
				common._coverShow('<span>重置密码为</span><br/><span>' + pwd + '</span>');
				setTimeout(function() {
					common._coverHide();
				}, 4000);
				fnUserInfoSuccessBack();
			} else if (ret.Result === 406) {
				showAlert('同级调度员不允许修改信息！');
				// that.on('click', userDetailspwdReset);
				// that.css({'background': '#FA7C01', 'cursor': 'pointer'})
			}else if(ret.Result === 410){
				   common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function() {
                     common._coverHide();
                   }, 5000);
			}else if(ret.Result === 415){
				showAlert('5次以内不得设置相同的密码!');
			}else if(ret.Result === 418) {
				     common._coverShow("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
                   setTimeout(function() {
                     common._coverHide();
                   }, 5000);

			}
		}
	)
	$(".org-mid").scrollTop(Scroll_bar_height_old);
	Scroll_bar_height_old =0;
}

//修改信息成功后状态
function fnUserInfoSuccessBack(id, name) {
	var title = $('.userDasName');
	$('.editUserName').val('');
	$('.editUserPhone').val('');
	$('.editUserEmail').val('');
	$('.editUserPwd').val('');
	$('.editUserPwdnew').val('');
	$('.edited-concent').hide();
	title.siblings('.userfn_icons').find('.userEdit_img').attr('src', 'img/icon/userIcon/user_bi.png');
	title.removeClass('userDasName');

}

//个人信息保存
function userDetailsaveInfo() {
	var that = $('.editSave');
	var title = $('.userDasName');
	var title_name = title.text()
	var uid = $('.userID').text();
	var username = $('.editUserName').val();
	var userphone = $('.editUserPhone').val();
	var useremail = $('.editUserEmail').val();

	var modifyname =  $('.org-mid').find('.' + uid).find('.squaredbox').next();
	//用户名
	var specialCode = RegeMatchValC(username);
	
	if (specialCode) {
		return showAlert('备注名不允许有特殊字符！');
	}

	if (username == '') {
		username = uid;
	}
	var username1 = encodeURI(encodeURI(username));
	var body = '{"Code":10113,"Body":{"SessionId":\"' + sessionId + '\","Uid":\"' + uid + '\","Name":\"' + username1 + '\","Phone":\"' + userphone + '\","Email":\"' + useremail + '\"}}';
	var num = /^1\d{10}$/;
	var num1 = /^1\d{12}$/;
	var email = /^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

	//手机号
	if (userphone !== '') {
		if (!num.test(userphone) && !num1.test(userphone)) {
			showAlert('请输入有效的手机号码');
			return
		}
	}
	//邮箱
	if (useremail != '' && !email.test(useremail)) {
		showAlert('请输入有效的邮箱格式！');
		return;
	}
	
	$('.cover_loading').show();

	$.getJSON(STATION_URL + '?Body=' + body, function(ret) {
		$('.cover_loading').hide();
		if (ret.Result == 200) {
			if (uid == loginId) {
				$('#company_name').text(username);
				var cookie_username = toBase64(username);
				$.cookie('loginName', '' + cookie_username + '', {
					expires: 10
				});
			}

			common._coverShow("<img class='bg_ok' src='img/icon/userIcon/bg_ok.png' />" + "   已保存");
			 setTimeout(function() {
                    common._coverHide();
                }, 2000);
			var index = idList1.indexOf(uid);
			usersAll.get(uid).Name = username;
			if ($('#name_Id').prop('checked')) {
				modifyname.text(username + '(' + uid + ')');
				$('.org-mid').find('.' + uid).find('.squaredbox').next().attr('title',username + '(' + uid + ')');
				if (index != -1) {
					nameList1[index] = username + '(' + uid + ')';
					$('#user-sort-ul1').children('li').eq(index).children('div').children('span').text(username);
					 // $('#user-sort-ul1').children('li').eq(index).children('div').children('span').attr('title',username + '(' + uid + ')');
					 
				} else {
					nameList2[index] = username + '(' + uid + ')';
					$('#user-sort-ul2').children('li').eq(index1).children('div').children('span').text(username);
					// $('#user-sort-ul2').children('li').eq(index1).children('div').children('span').attr('title',username + '(' + uid + ')');
				}
				
			} else {
				modifyname.text(username);
				if (index != -1) {
					nameList1[index] = username;
					$('#user-sort-ul1').children('li').eq(index).children('div').children('span').text(username);
					
				} else {
					nameList2[index] = username;
					$('#user-sort-ul2').children('li').eq(index1).children('div').children('span').text(username);
					
				}
			}

			fnUserInfoSuccessBack(uid, username);
			// resetName(uid, username);
			// userSearchDataUpdate(uid, username);

		} else if (ret.Result == 406){
			showAlert('同级调度员不允许修改信息！');
		} else if (ret.Result == 405){
			showAlert('该手机号已被其他用户使用！');
		} else {
			showAlert('用户信息保存未成功！');
		}
	});
	$(".org-mid").scrollTop(Scroll_bar_height_old);
	Scroll_bar_height_old =0;
}

function userPasswordSave() {
	var uid = $('.userID').text();
	var userpwd = $('.editUserPwd').val();
	var userpwdnew = $('.editUserPwdnew').val();
	// var pwd = /^([a-zA-Z0-9.]+)$/;
	var that = $('#pwd_baocun');
    var body;
    var hang='<br>';
     var user_power=ChannelAllcher.containsKey(uid);
	//密码
	if (userpwd == userpwdnew) {
		if (userpwd !== '') {
             var namevals=RegeMatchValC(name);
			if (!namevals) {
				if (userpwd.length < 8 || userpwd.length > 15) {
					// $('.error').text('密码长度为8-15位！');
					 if(user_power){
              
                        showAlert("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
              
					 }else{

	                    showAlert("密码长度为8-15位");
					 }
					return
				}
			} else {
				// $('.error').text('密码只能输入数字和字母和字符组合！');
				 if(user_power){
              
                     showAlert("密码为8-15位数字、大写字母,小写字母和字符组合!" + hang + "如:Heduijiang123!!");
              
				 }else{

                     showAlert("密码不能输入特殊字符");
				 }
				return
			}

		 } else {

				showAlert('密码不能为空!');
				return;
		}
	} else {
		// $('.error').text('新密码与确认密码不一致，请检查并重新输入！');
		showAlert('新密码与确认密码不一致，请检查并重新输入');
		return
	}
	// that.off('click', userPasswordSave);
	// that.css({'background': '#ccc', 'cursor': 'not-allowed'});
	$('.cover_loading').show();
	 
   
    
            if(user_power){
                 userpwd=Setuser_Pwd(uid,userpwd);
                body='{"Code":"10117","Body":{"SessionId":"'+sessionId+'","Uid":"'+uid+'","Pwd":"'+userpwd+'"}}'  
            }else{
                body = '{"Code":"10107","Body":{"SessionId":"' + sessionId + '","Uid":"' + uid + '","Pwd":"' + userpwd + '"}}';
            } 

        var arr=[user_power];
     var conword='修改密码失败！';
     AjaxPostMsg(body, AJAXSET_TIME, Treeuser_PwdSuccess, MediaErrorDown, MediaAjaxovertime, true, arr, conword);



	// $.getJSON(STATION_URL + '?Body=' + body1,
	// 	function(res) {
	// 		$('.cover_loading').hide();
	// 		if (res.Result == 200) {
	// 			showAlert('已保存！');
	// 			$('.error').text('');
	// 			fnUserInfoSuccessBack();
	// 		} else if (res.Result == 406){
	// 			showAlert('同级调度员不允许修改信息！');
	// 			// that.on('click', userPasswordSave);
	// 			// that.css({'background': '#FA7C01', 'cursor': 'pointer'})
	// 		} else if(res.Result==410){
	// 			showAlert('密码为8-15位数字和字母和字符组合!');
	// 		}else if(res.Result==415){
 //                showAlert('5次以内不得设置相同的密码!');
	// 		}else {
	// 			showAlert('保存密码未成功！');
	// 			// that.on('click', userPasswordSave);
	// 			// that.css({'background': '#FA7C01', 'cursor': 'pointer'})
	// 		}
	// 	}
	// )
	$(".org-mid").scrollTop(Scroll_bar_height_old);
	Scroll_bar_height_old =0;
}

function Treeuser_PwdSuccess (res,arr) {
        var hang='<br>';
        var arrpower=arr[0];
	 	$('.cover_loading').hide();
			if (res.Result == 200) {
				 
				showAlert('已保存！');
				$('.error').text('');
				fnUserInfoSuccessBack();
			} else if (res.Result == 406){
				showAlert('同级调度员不允许修改信息！');
			} else if(res.Result==410){
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
			}else if(res.Result==415){
                showAlert('5次以内不得设置相同的密码!');
			}else if(res.Result==418){
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
				 
			}else{
				 showAlert('保存失败！');
			}
}

function userHover() {
	//组织成员页面鼠标移入、移出之后显示
	$('.org-listA').hover(function() {
		$('.userfn_icons').hide();
		$(this).find('.userfn_icons').show();
	}, function() {
		var that = $(this).find('.userfn_icons');
		var img1 = that.children('.userInfo_img').attr('src');
		var img2 = that.children('.userEdit_img').attr('src');
		var img3 = that.children('.remove-img').attr('src');
		var box1 = $('.user-close');
		var box2 = $('.edited-concent');
		if (img1 == 'img/icon/newicon/power1.png' || img2 == 'img/icon/userIcon/user_bi2.png' || img3 == 'img/icon/fence/fence_bg_del2.png') {
			that.show()
		} else {
			that.hide();
		}

	});
}
//更新成员名称
function resetName(id, name) {
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var node = treeObj.getNodeByParam('id', id, null);
	if (node) node.name = name;
	treeObj.updateNode(node);
}


function addOrguserFuzzSearch() {
	var k = $('.addOrguserFuzz').val();
	var ul2 = $('#newGroup-userlist2');
	var ul1 = $('#newGroup-userlist');
	var result;
	var idList = [];

	// checkReset();
	if (k == '+' || k == '[' || k == '(' || k == '\\' || k == '^' || k == '$' || k == '|' || k == ')' || k == '?' || k == '*' || k == '.' || k == ']') {
		$('.addOrguserFuzz').val('')
		return;
	}
	k = codeWritedMofify(k);	
	if (k == '') {
		ul1.show();
		ul2.hide();
		userCheckNumber = document.getElementsByName('list-2').length;
		// checkBox('list-2', 'listUserAll', 'totalUsers');
		$('#addnoMohu').show();
		$('.totalUsers').show();
		$('#addMohu').hide();
		$('.totalUsersMohu').hide();
	} else {
		ul1.hide();
		ul2.show();
		$('#addnoMohu').hide();
		$('.totalUsers').hide();
		$('#addMohu').show();
		$('.totalUsersMohu').show().text(0);
		$('#squaredthat1').prop('checked', false);
		$('#squaredthat1').next('label').removeClass('label-bg');
		result = ouFuzzySearchRegExp(k, addOrgFuzzSearch, idList);
		ouSearchResultShow(k, result, idList);
	}
}

function ouFuzzySearchRegExp(key, list, idList) {
	if (!(list instanceof Array)) return;
	var arr = [],
		len = list.length,
		reg = new RegExp(key);
	for (var i = 0; i < len; i++) {
		if (list[i].match(reg)) {
			arr.push(list[i]);
			idList.push(addOrgFuzzSearchId[i])
		}
	}
	return arr;
}

function ouSearchResultShow(key, arr, idList) {
	var ul = $('#newGroup-userlist2');
	var html = '';
	var name;
	ul.empty();
	if (arr.length === 0) {
		ul.append('<div style="text-align:center;">无相关人员！</div>');
		return;
	}
	keycode = new RegExp(key, 'g');

	for (var i = 0, len = arr.length; i < len; i++) {
		name = arr[i].replace(keycode, '<span class="sf-color">' + key + '</span>');
		var mycheckbox = '<div class="squaredbox"><input class="' + idList[i] + '" type="checkbox" id="'+idList[i]+'_y" name="list-4" /><label for="'+idList[i]+'_y"></label></div>';
		//<input type="checkbox" name="list-4" class="' + idList[i] + '" />
		html += '<li><a class="org-listA">'+mycheckbox+'<span class="on only_one">' + name + '</span></a></li>';
	}
	ul.append(html);
	userCheckNumber = document.getElementsByName('list-4').length;
	checkBox('list-4', 'listUserAllMohu', 'totalUsersMohu');
}

function checkReset() {
	var checkbox = $('.checkstyle2');
	var totalUsers = $('.totalUsers');
	var all = $("[name = 'list-2']:checkbox")

	all.prop("checked", false);
	checkbox.prop("checked", false);
	checkbox.prop('indeterminate', false);
	totalUsers.text(0);
}

function checkReset1() {
	var checkbox = $('.checkstyle3');
	var totalUsers = $('.total');
	var all = $("[name = 'list-1']:checkbox")

	// all.prop("checked", false);
	// checkbox.prop("checked", false);
	// checkbox.prop('indeterminate', false);
	// totalUsers.text(0);
}


function userCloseInput(event) {
	var ev = event || window.event;
	var target = ev.target || ev.srcElement;
	// var that = target.checked;
	target = $(target);
		
	if (target.prop('checked')) {
		target.next('label').addClass('label-bg');
	} else {
		target.next('label').removeClass('label-bg');
	}
		
}