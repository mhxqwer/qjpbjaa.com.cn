var Browser = {
		'isIE' : (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0),
		'isFirefox' : navigator.userAgent.indexOf('Firefox') >= 0,
		'isOpera' : navigator.userAgent.indexOf('Opera') >= 0
};

function resizeImage(obj, MaxW, MaxH){
 try {
	var imageObject = obj;
	var stateIE = imageObject.readyState;
	var stateFF = imageObject.complete;
	if(Browser.isIE){
		if(stateIE != "complete"){
			setTimeout("resizeImage("+imageObject+","+MaxW+","+MaxH+")",50);
			return;
		}
	}else{
		if(!stateFF){
			setTimeout("resizeImage("+imageObject+","+MaxW+","+MaxH+")",50);
			return;
		}
	}
	var mt = Math.round((MaxH - imageObject.height)/2);
	var ml = Math.round((MaxW - imageObject.width)/2);
	obj.style.top = mt+'px'
	obj.style.left = ml+'px';
	$(obj).parent().parent().find('p').css('top',(mt*2+2)+'px');
}catch(e){}
}