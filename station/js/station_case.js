/***************************接口测试调用************************************/
//获取SessionId
// function getSessionId() {
// 	CustomPwd = hex_md5("111111");
// 	var body = '{"Code" : 10010,"Body" : {"ServiceCode" : "F5CB4D8A2B71468F2937F6F89802950C1EBEA6413EF1CE17C84CBB202F6CE88E","DispatcherId" : "100110002","DispatcherPwd" : \"' + CustomPwd + '\"}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		
// 	});
// }

//获取ServiceCode
// function getServiceCode() {
// 	var code = 10000,
// 		HostIp = "112.11.3.101",
// 		CustomId = "POC-1001",
// 		CustomPwd = hex_md5("123456");
// 	var body = '{"Code" : ' + code + ',"Body" : {"HostIp" : \"' + HostIp + '\","CustomId" : \"' + CustomId + '\","CustomPwd" : \"' + CustomPwd + '\"}}';

// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//获取指定组织下的成员和子组织
// function getTreeRootList() {
// 	var body = '{"Code": 10316,"Body": {"SessionId": \"' + sessionId + '\", "OrgId": "0"}}';
// 	console.log(body)
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '',
// 		function(ret) {
// 			console.log(ret);
// 		}
// 	)
// }

function orgGetGroup1() {
	var body = '{"Code" : 10100,"Body" : {"SessionId" : \"' + sessionId + '\"}}';
	console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(JSON.stringify(ret));
	});
}

//增加组织节点OrgId
function orgGroupAdd() {
	var body = '{"Code" : 10101,"Body" : {"SessionId" : \"' + sessionId + '\","OrgParentId":"0","OrgName":"456"}}';
	console.log(body)
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(JSON.stringify(ret));
	});
}

//删除组织节点
function orgGroupDelete1() {
	var body = '{"Code" : 10102,"Body" : {"SessionId" : \"' + sessionId + '\","OrgId":909}}';
	console.log(body);
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(JSON.stringify(ret));
	});
}

//修改组织节点
function orgGroupModify() {
	var body = '{"Code":10103,"Body":{"SessionId":\"' + sessionId + '\","OrgId":908,"OrgName":"3"}}';
	
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(JSON.stringify(ret));
	});
}

//成员归属
function memberToOrg() {
	var body = '{"Code":10110,"Body":{"SessionId":\"' + sessionId + '\","ToOrgId":956,"Users":[100110005]}}';
	
	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
		console.log(JSON.stringify(ret));
	});
}

function getMemberList1() {
	var body = '{"Code":10111,"Body":{"SessionId":\"' + sessionId + '\","OrgId":0}}';
	
	$.getJSON('' + STATION_URL + '?Body=' + body + '',
		function(res) {
			// console.log(JSON.stringify(res));
		}
	);
}

//修改用户基本信息
// function userInfoModify() {
// 	var name = '100110001';
// 	encodeURI(name, 'UTF-8');
// 	var body = '{"Code":10113,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110001","Name":\"' + name + '\","Phone":"13877654456","Email":"fu@qq.com"}}';

// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});

// }

//查询上报图文列表
// function picList() {
// 	var body = '{"Code":10400,"Body":{"SessionId":\"' + sessionId + '\","Uid":"","TimeFrom":"2017-01-01 18:40:28","TimeTo":"2017-05-08 19:48:19","PageSize":"30","PageIndex":"0"}}';
// 	var url = STATION_URL + '?Body=' + body; //''+STATION_URL+'?Body='+body+''

// 	//console.log(url);
// 	$.getJSON(url, function(ret) {
// 		//console.log(JSON.stringify(ret));

// 		console.log(ret);
// 	});
// }

//获取频道
// function getUserInfo1() {
// 	var body = '{"Code":10305,"Body":{"SessionId":\"' + sessionId + '\"}}';
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(ret);
// 	});
// }

//重置密码
// function mima() {
// 	var body = '{"Code":10108,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100210002" }}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));

// 	});
// }

//获取当前位置
// function weizhi() {
// 	var body = '{"Code":10200,"Body":{"SessionId":\"' + sessionId + '\","Uids":["100110003"]}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));

// 	});
// }

//查询历史位置
// function weizhi1() {
// 	var body = '{"Code":10201,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110009","TimeFrom":"2017-04-27 10:00:00","TimeTo":"2017-04-27 12:00:00","LocationType":2,"PageSize":30,"PageIndex":1}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//获取遥毙信息
// function yaobi() {
// 	var body = '{"Code":11205,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110002"}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//呼入呼出限制
// function huchu() {
// 	var body = '{"Code":11203,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110002","Action":12}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//限制用户组呼
// function zuhu() {
// 	var body = '{"Code":11204,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110002","SesId":"C1632","Action":0}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//查询历史位置
// function jiansuo() {
// 	var body = '{"Code":11100,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110002","TimeFrom":"2017-04-27 00:00:00","TimeTo":"2017-04-27 12:00:00","PageSize":30,"PageIndex":1}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//
// function cccd() {
// 	var body = '{"Code":11200,"Body":{"SessionId":\"' + sessionId + '\","Action":1}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//查询对讲录音记录

// function luyinjilu() {
// 	var body = '{"Code":11201,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110002","SesId":"C1632","TimeFrom":"2017-04-26 00:00:00","TimeTo":"2017-04-27 12:00:00","PageSize":30,"PageIndex":1}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//历史视频记录
// function shipinlishi() {
// 	var body = '{"Code":11101,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110008","TimeFrom":"2017-04-26 00:00:00","TimeTo":"2017-04-28 12:00:00","PageSize":30,"PageIndex":0}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//检索下载录音
// function xiazailuyin() {
// 	var body = '{"Code":11201,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110008","SesId":"C1625","TimeFrom":"2017-04-27 00:00:00","TimeTo":"2017-04-28 12:00:00","PageSize":30,"PageIndex":0}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//限制组呼
// function zuhuxianzhi() {
// 	var body = '{"Code":11204,"Body":{"SessionId":\"' + sessionId + '\","Uids":["100110052"],"SesId":"C1625","Action":0}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//获取用户遥毙，限制状态
// function code11205() {
// 	var body = '{"Code":11206,"Body":{"SessionId":\"' + sessionId + '\","Uid":"100110001"}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//5.2.69.	广播呼叫权限用户列表获取
// function code11321() {
// 	var body = '{"Code":11322,"Body":{"SessionId":\"' + sessionId + '\","Action":0,"Members":["100110002"]}}';
// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//搜索im记录
// function code10600() {
// 	var body = '{"Code":10600,"Body":{"SessionId":\"' + sessionId + '\","TimeFrom":"2017-04-27 00:00:00","TimeTo":"2017-04-28 12:00:00","SesId":"C1625","PageSize":30,"PageIndex":0}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }

//删除im记录
// function code10601() {
// 	var body = '{"Code":10601,"Body":{"SessionId":\"' + sessionId + '\","MessageId":"75344"}}';

// 	console.log(body);
// 	$.getJSON('' + STATION_URL + '?Body=' + body + '', function(ret) {
// 		console.log(JSON.stringify(ret));
// 	});
// }