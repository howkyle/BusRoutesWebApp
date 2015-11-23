
////////////////////screen loading animation////////////////////
window.addEventListener("load",function(){
    var load_screen = document.getElementById("loadscreen");
    setTimeout(function(){
    	$("#loadscreen").fadeToggle(1000);
    },500);
});
///////////////////////////////////////////////////////////////

$(function(){
	//insert the loading screen at the beginning of the page//
    $("<div id=\"load_screen\"><div id=\"loading\" class=\"centered vertAlign\">loading...</div></div>").insertBefore($("#overall"));
	//////////////////////////////////////////////////////////
});