
////////////////////screen loading animation////////////////////
window.addEventListener("load",function(){
    var load_screen = document.getElementById("load_screen");
    setTimeout(function(){
    	$("#load_screen").fadeToggle(1000);
    },500);
});
///////////////////////////////////////////////////////////////

$(function(){
	//insert the leading screen at the beginning of the page//
    $("<div id=\"load_screen\"><div id=\"loading\" class=\"centered vertAlign\">loading...</div></div>").insertBefore($("#overall"));
	//////////////////////////////////////////////////////////

	//ASSIGN CLASSES TO ELEMENTS DEPENDING ON DEVICE BEING USED
	var windowWidth = $(window).width();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("#header").addClass("smallbanner");
		$("#footer").addClass("smallbanner");
		$("#pagecontentbox").each(function(){
			$(this).find('.block').addClass("smallblock centered vertAlign");
			$(this).find('.tab').addClass("smalltab centered vertAlign");
		});
		$("#search").addClass("smallsearch");
		$("#searchicon").addClass("smallsearchicon");
		$("#pagecontentbox").addClass("smallcontentbox");
	}
	else{
		$("#searchicon").toggle();
		$("#header").addClass("bigbanner");
		$("#footer").addClass("bigbanner");
		$("#pagecontentbox").each(function(){
			$(this).find('.block').addClass("bigblock centered vertAlign");
			$(this).find('.tab').addClass("bigtab centered vertAlign");
		});				
		$("#search").addClass("bigsearch");
		$("#pagecontentbox").addClass("bigcontentbox");
	}
	///////////////////////////////////////////////////////////

	//TOGGLE MENU IF MENU ICON IS ACTIVATED////////////////////
	$("#header img").click(function(){
		$("#search").toggle("fade",300);
	});
	///////////////////////////////////////////////////////////
});