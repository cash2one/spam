function input_validate() {
	// check if input is bigger than 3
	var value = document.getElementById('newcontent').value;
	if (value.length > 140) {
		alert('too long');
		return false; // keep form from submitting
	}

	// else form is good let it submit, of course you will 
	// probably want to alert the user WHAT went wrong.
	return true;
}
function GetRequest() {

	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != - 1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
function on_text_area_change() {
	var num_of_input = $(this).parent().children("font.num_of_input");
	var length = this.value.length;
	num_of_input.html("已输入:" + length + "/140");
	if (length > 140) {
		num_of_input.attr("style", "color:#F00"); // red   
	}
	else {
		num_of_input.attr("style", "color:#000000"); //black
	}
}
$(document).ready(function() {
	$("#addmoreweibo").click(function(e) //on add input button click  
	{
		$(this).before('<div><font class="num_of_input" color="#000000"> 0 </font><br> </br><textarea class="newcontent" name="newcontent" cols="60" rows="10" ></textarea><a href="#" class="removeclass">del</a></div><br></br>');
		$(this).parent().find(".newcontent").unbind("input propertychange", on_text_area_change);
		$(this).parent().find(".newcontent").bind("input propertychange", on_text_area_change);
		console.log('little boy');
	});

	$("body").on("click", ".removeclass", function(e) { //user click on remove text  
		$(this).parent('div').remove(); //remove text box  
	});

	$(".newcontent").bind('input propertychange', on_text_area_change);

	$("#postnewcontent").click(function() {
		var data = new Array();
		$.each($(".newcontent"), function() {
			data.push($(this).val());
		});
		var newcontent = {
            "username": GetRequest()['username'],
			"newcontent": data,
		};
		$.post("update.php", JSON.stringify(newcontent), function()
        {
            $("html").html("edit ok");
            setTimeout("location.reload()", 1000);
        }
        );
	});
});

