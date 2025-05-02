jQuery.fn.imgFlash=function(parameters) {
	defaults = {
		selectBox: '.xiala',
		selectIDmain: '#mySel1',
		selectClass: 'move',
		selectMain: '<div id="SelectKong"></div>'
	};
	jQuery.extend(defaults,parameters);	
	$(defaults.selectBox).find('select').hide();
	$(defaults.selectMain).prependTo(defaults.selectBox);
	selectIDval=$(defaults.selectBox).find('div').attr('id') 
	selectID='#'+selectIDval;
	$(selectID).append("<b></b>");
	$(selectID).find('b').after('<ul class="selectUl_kong"></ul>');
	var num=$(defaults.selectIDmain).find('option').length;
	for (var i=0; i<num;i++ ){
		var txt0=$(defaults.selectIDmain).find('option').eq(i).html();
		var txt1=$(defaults.selectIDmain).find('option').eq(i).val();
		if(i==0) { 
			var txt0=$(defaults.selectIDmain).find('option').eq(i).html();
			$(selectID).find('b').html(txt0);
			$(selectID).find('ul').append('<li id="'+txt1+'">'+txt0+'</li>');
		} else {
			$(selectID).find('ul').append('<li id="'+txt1+'">'+txt0+'</li>');
		}
		if($(defaults.selectIDmain).find('option').eq(i).attr('selected')) {
		    if($('input[name="is_all"]').val() > 0) {
		        $(selectID).find('b').html(txt0);
		    }
		}
	};
	selet=0;
	$(selectID).click(function(event) {
		
		if (selet==0) {
			$('.selectUl_kong').hide();
			haha='#'+$(this).attr('id');
		 	$(haha).find('ul').show();
			selet=1;
			event.stopPropagation();
		} else {
			$('.selectUl_kong').hide();
			haha='#'+$(this).attr('id');
			$(haha).find('ul').hide();
			selet=0;
			event.stopPropagation();
		};
		
	});

	$(selectID).find('ul').find('li').click(
		function() {
			var numval=$(this).text();
			var numvalID=$(this).attr('id');
			$(haha).find('b').html(numval);
			var selectPval ='#'+ $(haha).next('select').attr('id');
			$(selectPval).find('option').attr('selected',false);
			if(numvalID > 0 && numvalID != 87) {
			    $(selectPval).val(numvalID);
			} else {
			    $(selectPval).val( $('#is_all').val());
			}
			//$(selectPval).find('option').eq(0).text(numval);
			//$(selectPval).find('option').eq(0).val(numvalID);
			if(numvalID == 0) {
			    if($(selectPval).val() == 87) {
			        $('#is_all').val("1");
			    } else {
			        $('#is_all').val("0");
			    }
			} else {
			    $('#is_all').val($(selectPval).val());
			}
		}									
	);
	$(selectID).find('ul').children('li').hover(
		function() {$(this).addClass(defaults.selectClass);},
		function() {$(this).removeClass(defaults.selectClass);}
	)
	$(document).click(function(){
if(typeof(haha) != 'undefined'){
  if(haha){
    $(haha).find('ul').hide();
	selet=0;
  }
}
	});
};