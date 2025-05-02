$(function(){
	/*焦点切换*/
	$('.change_bg').focus(function(){
	    if($(this).val()=='关键词' || $(this).val()=='作者'  || $(this).val()=='作者/编者') {
	        $(this).attr('dv',$(this).val());
	        $(this).val('');
	    }
	    $(this).addClass('current').siblings().removeClass('current');
	});
	$('.change_bg').blur(function(){
	    var t = $(this);
	    var txt_value=t.val();
	    if(txt_value=="" && $(this).attr('dv')){
		    $(this).val($(this).attr('dv'));
		    $(this).removeAttr('dv');
		}
	});
	/*$(".ipt_text").focus(function(){
	var txt_value=$(this).val();
	if(txt_value==this.defaultValue){
		$(this).val("").addClass('current');
		}
	});
	$(".ipt_text").blur(function(){
	var txt_value=$(this).val();
	$(this).removeClass('current');
	if(txt_value==""){
		$(this).val(this.defaultValue).removeClass('current');
		}
	});*/
	/*展览讯息选项卡*/
	var exhibition_tab = $('.exhibition_tab span,.zhanlantab span'),_this = $(this),exhibition_wen = $('.exhibition_wen .exhibition_a,.zhanlanwen ul');
	$('.exhibition_wen .exhibition_a:gt(0),.zhanlanwen ul:gt(0)').hide();
	exhibition_tab.click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		var index = exhibition_tab.index(this);
		exhibition_wen.eq(index).fadeIn().siblings().fadeOut();
		});
	/*画家资料*/
	var painter_pagesize = Math.ceil($('.painter_a ul li').size()/12);
	var painter_pos = 1;
	$('.painter .arrow a.up').bind('click',function(){
	    if(painter_pos <= 1) {
		    return;
	    }
	    if(painter_pos <= 2) {
		    $(this).addClass('wu').siblings().removeClass('wu');
	    }
	    painter_pos--;
		$('.painter_a ul').animate({
			top:-270*(painter_pos - 1)
			},"slow")
		})
	$('.painter .arrow a.down').bind('click',function(){
	    if(painter_pos >= (painter_pagesize)) {
		    return;
	    }
	    if(painter_pos >= (painter_pagesize-1)) {
		    $(this).addClass('wu').siblings().removeClass('wu');
	    }
	    painter_pos++;
		$('.painter_a ul').animate({
			top:-270*(painter_pos - 1)
			},"slow")
		})


	/*大事记*/
	$('.overview_dsjlist ul li:nth-child(5n)').addClass('five');

	/*图片弹出效果*/
	$(".showphodiv ul li").click(function(){
		var thisIndex=$(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		var thisimg = $('img',this),thistext = $('div',this);
		var bbb=thisimg.attr('datu');
		//$(".tt_pho").hide();
		$('.showdiv').show();
		$('#tt_pho2').attr('src',bbb).load(function(){$('.tt_pho').css('margin-top',(($(window).height()-$('.tt_pho').height())/2)+'px').css('top','0px');$(".tt_pho").show();if('no' != thisimg.attr('fangdajing')){fangdajing_init(bbb);}});
		$('#tt_text').html(thistext.html()).find('a').show();
		$('#tt_yuantu').attr('href',bbb);
		
		return false;
		});
	$('.div_close').click(function(){
		$('.showdiv').hide();
		});

	$('.div_prev').click(function(){
		$(".showphodiv ul").find(".current").prev().trigger('click');
		})
	$('.div_next').click(function(){
		$(".showphodiv ul").find(".current").next().trigger('click');
		})
	$('*[init]').each(function(){
		var func=$(this).attr('init');
		if(window[func]){
			var mixed=$(this).attr('mixed');
			if(mixed){
				eval('mixed={'+mixed+'};');
				(window[func])(this,mixed);
			}else{
				(window[func])(this);
			}
		}
	});
});
function go(obj,mixed){
	$(obj).click(function(){
		var input=$(this).prev(),srt=parseInt(input.attr('value'));
		if(srt>0){
			location.href=input.attr('basic')+'&'+input.attr('name')+'='+(srt-1)*parseInt(input.attr('length'));
		}else{
			alert('请输入正确的页数.');
		}
		return false;
	});
}
function check(obj,mixed){
	$(obj).click(function(){
	    if($('input[name="search"]').val().length == 0 || $('input[name="search"]').val() == '关键词') {
	        //alert('关键词不能为空');
	        //return false;
	    }
		if($('#is_all').val() == 0 && $('select[name="clg"]').val() == 0) {
		    $('select[name="clg"]').val('83');
		}
		var from=$(this).parents('form');
		var input=from.children('[place]');
		input.each(function(){
			var o=$(this);
			if(o.val()==o.attr('place')){
				o.attr('value','');
			}
		});
		from.submit();
		return false;
	});
}
document.writeln('<div class="showdiv">');
document.writeln('<div class="alpha"></div>');
document.writeln('<a href="javascript::" class="div_close"></a>');
document.writeln('<a href="javascript:;" class="div_prev"></a>');
document.writeln('<a href="javascript:;" class="div_next"></a>');
document.writeln('<div class="tt_pho"><img id="tt_pho2" style="max-width:700px;max-height:400px;"/><p id="tt_text"></p><a id="tt_yuantu" target="_blank" style="float:right;color:white;margin-right:-240px;"></a></div>');
document.writeln('<style type="text/css">');
document.writeln('    .mglass_wrapper_city {');
document.writeln('        margin: 0px auto;');
document.writeln('    }');
document.writeln('    .mglass_viewer_city {');
document.writeln('        width: 500px;');
document.writeln('        height: 500px;');
document.writeln('        border: 1px solid white;');
document.writeln('    }');
document.writeln('</style>');
document.writeln('<script type="text/javascript">');
document.writeln('    function fangdajing_init(pic_url){var config2 = {');
document.writeln('        wrapperClassName : "mglass_wrapper mglass_wrapper_city",');
document.writeln('        viewerClassName : "mglass_viewer mglass_viewer_city"');
document.writeln('    };');
document.writeln('    showdiv_init();new MGlass("tt_pho2",pic_url, config2);}');
document.writeln('</script>');
document.writeln('');
document.writeln('</div>');
function showdiv_init() {
    var img = $('.tt_pho img');
    $('.tt_pho').prepend(img);
    $('.mglass_wrapper').remove();
}
