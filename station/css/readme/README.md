1.增加了userInfos全局变量，用来存储用户信息，目前只有在地图显示在线用户这里更新了该变量。其他地方需完善，并注意实时更新。(待定)
2.callArrList临时会话的集合，也需要前端来维护这个数据。
遗留问题：

1.频道点击后监听按钮点击
2.频道成员增减，对在线状态的影响

/***视频*****/
会话挂断：先挂断视频，再挂断会话。

1.gSessionArray是一个对象数组。
	sessionId	//会话id，字符串
	precense	//再线成员uid，数组
	mediaSpeaker
	mediaState
	sessionIndex
	sessionState
	
2.session
	mediaSpeaker
	:
	null
	mediaState
	:
	0
	sessionId
	:
	"C1780"
	sessionIndex
	:
	"10"
	sessionState
	:
	1