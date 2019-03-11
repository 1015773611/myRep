
function system_start (){
	map.removeOverlay(Line);
	var wh = $(window).height();
	
 	$('.Heights').height(wh-70);
	$('.system_main').height(wh-209);
	$('.left_icon').css('top', (wh-120)/2);
}