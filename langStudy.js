


var reqURL = "https://www.wanikani.com/api/user/52dc63de6f2650d7ca48ad2ccdf5a188/kanji/1"
var studyList = {};
var card = 0; //current card index
var rightAns;
var hideAns = true;


function apiRequest(level)
{
	reqURL = "https://www.wanikani.com/api/user/52dc63de6f2650d7ca48ad2ccdf5a188/kanji/"+level;
	$.ajax({
    	url: reqURL, 
    	async: false, 
    	success: function(result){
        	//$("div").html(result);
        	studyList = result;
        	//$.each(result, function(i, field){
            	//$("#char").append(field + " ");
            	$("#navmenu").html("Level: "+studyList.requested_information[0].level+" - "+studyList.user_information.level);
            	$("#char").html(studyList.requested_information[0].character);
            	rightAns = studyList.requested_information[0].meaning;
        	//});
    	}
	});
}

$(document).ready(function(){

	//load api data once page loads
    apiRequest(5);

    $(".answerBox").click(function(){
    	$(".answerBox").val("");
    });
    $(".answerBox").focusout(function(){
    	if($(".answerBox").val() == "")
    		$(this).val("input answer here");
    });

    $(".answerBox").keypress(function(event){

    	//enter key
    	if ( event.which == 13 ) {
    		if($(".answerBox").val() == rightAns)
    		{
    			$("#response").text('correct');
    			$("#response").css("background-color", "#66FF66");
    			$("#ansContainer").css("border", "#66FF66 solid 1px");
    		}
    		else
    		{
    			$("#response").text('wrong');
    			$("#response").css("background-color", "#FF6666");	
    			$("#ansContainer").css("border-color", "#FF6666");
    		}
    		if(hideAns == false)
    		{
		    	card++;
				newCard();
			}
			else
			{
				$("#ansContainer").show();
				hideAns = false;
				$("#onyomi").html("onyomi:<br>"+studyList.requested_information[card].onyomi);
    			$("#kunyomi").html("kunyomi:<br>"+studyList.requested_information[card].kunyomi);
    			if(studyList.requested_information[card].nanori)
    				$("#nanori").html("nanori:<br>"+studyList.requested_information[card].nanori);
    			else
    				$("#nanori").html("");
    			$("#meaning").html(studyList.requested_information[card].meaning);
			}

			
		}
		//let user review correct answer after guessing. don't allow if guessing
		if(hideAns == false)
		{
			if ( event.which == 97 ) { //a
				if(card > 0)
				{
			    	card--;
			    	newCard();
			    }
			}
			if ( event.which == 100 ) { //d
				card++;
				newCard();
			}
		}
		
    });

    function newCard()
    {
    	hideAns = true;
    	$(".answerBox").val("")
    	$("#navmenu").html("Level: "+studyList.requested_information[0].level+" - "+studyList.user_information.level);
	    $("#char").html(studyList.requested_information[card].character);
	    $("#response").html("");
	    //$("#response").css("background-color", "#FFFFFF");
	    $("#ansContainer").hide();
	    //$("#showAnswer").css("background-color", "#FFFFFF");
		//$("#ansContainer").css("border-color", "white");
	    rightAns = studyList.requested_information[card].meaning;
    }

});

