function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}

var dsturl1 = "https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000";
var dsturl2 = "https://etk.srail.kr/hpg/hra/02/confirmReservationInfo.do?pageId=TK0101030000";
var dsturl3 = "https://etk.srail.kr/hpg/hra/03/selectSettleInfo.do?pageId=TK0101040000";
var dsturl4 = "https://etk.srail.kr/hpg/hra/03/completeSettleInfo.do?pageId=TK0101050000";
var realConfirm;

if (document.URL.substring(0, dsturl3.length) == dsturl3) {

	$(window).load(function() {
		injectJs(chrome.runtime.getURL('inject.js'));
	});
}
if (document.URL.substring(0, dsturl2.length) == dsturl2) {

	$(document).ready(function() {
		playSound();
	});
	$(window).load(function() {
		$(".btn_large.btn_blue_dark.val_m.mgr10")[0].click();
		var s = $(".btn_large.btn_blue_dark.val_m.mgr10")[0];
		console.log('s: ', s);
	});
}
if (document.URL.substring(0, dsturl1.length) == dsturl1) {

	$(window).load(function() {
		chrome.storage.sync.get(['botToken', 'chatId'], function(items) {
			console.log(items);
			chrome.runtime.sendMessage({type: 'setTelegram', botToken: items.botToken, chatId: items.chatId}, function(data) { });
    });
		injectJs(chrome.runtime.getURL('inject.js'));

		var coachSelected = JSON.parse(sessionStorage.getItem('coachSelected'));
		var firstSelected = JSON.parse(sessionStorage.getItem('firstSelected'));
		if (coachSelected == null) coachSelected = [];
		if (firstSelected == null) firstSelected = [];

		if (sessionStorage.getItem('macro') == "true") {
			$("#search_top_tag").append('<a href="#" onclick="macrostop();" style="margin-left:5px;"><img src="' + chrome.runtime.getURL('images/btn_stop.png') + '"></a>');
		} else {
			$("#search_top_tag").append('<a href="#" onclick="macro();" style="margin-left:5px;"><img src="' + chrome.runtime.getURL('images/btn_start.png') + '"></a>');
		}

		$("<style>")
    .prop("type", "text/css")
    .html("\
    .search-form form .button input, .search-form form .button a img{\
    	vertical-align: middle;\
    }")
    .appendTo("body");

		// Inserts the macro button into the table.
		if ($("#search-list").length != 0) {
			var rows = $('#search-list table tr');
			for (i = 1; i < rows.length; i++) {
				var columns = $(rows[i]).children('td');
				var first = $(columns[5]);
				var coach = $(columns[6]);
				if (coach.children().length > 0) {
					coach.append($("<p class='p5'></p>"));
					var checkbox = $("<label></label>").html('<input type="checkbox" name="checkbox" class="coachMacro" value="' + i + '"> 매크로');
					checkbox.children('input').prop('checked', coachSelected.indexOf(i+"") > -1);
					coach.append(checkbox);
				}
				if (first.children().length > 0) {
					first.append($("<p class='p5'></p>"));
					var checkbox = $("<label></label>").html('<input type="checkbox" name="checkbox" class="firstMacro" value="' + i + '"> 매크로');
					checkbox.children('input').prop('checked', firstSelected.indexOf(i+"") > -1);
					first.append(checkbox);
				}
			}
		}

		if (sessionStorage.getItem('macro') == "true") {
			// Restores user preferences
			$("#psgInfoPerPrnb1").val(sessionStorage.getItem('psgInfoPerPrnb1'));
			$("#psgInfoPerPrnb5").val(sessionStorage.getItem('psgInfoPerPrnb5'));
			$("#psgInfoPerPrnb4").val(sessionStorage.getItem('psgInfoPerPrnb4'));
			$("#psgInfoPerPrnb2").val(sessionStorage.getItem('psgInfoPerPrnb2'));
			$("#psgInfoPerPrnb3").val(sessionStorage.getItem('psgInfoPerPrnb3'));
			$("#locSeatAttCd1").val(sessionStorage.getItem('locSeatAttCd1'));
			$("#rqSeatAttCd1").val(sessionStorage.getItem('rqSeatAttCd1'));

			if ($("#search-list").length != 0) {
				var rows = $('#search-list table tr');

				var succeed = false;
				for (i = 1; i < rows.length; i++) {
					var columns = $(rows[i]).children('td');

					var first = $(columns[5]);
					var coach = $(columns[6]);

					if (coachSelected.indexOf(i+"") > -1) {
						var coachSpecials = coach.children("a");
						if (coachSpecials.length != 0) {
							for (j = 0; j < coachSpecials.length; j++) {
								name = $(coachSpecials[j]).attr('class');
								if (name == 'btn_small btn_burgundy_dark val_m wx90') {
									$(coachSpecials[0])[0].click();
									succeed = true;
									break;
								}
							}
							if (succeed == true) break;
						}
					}

					if (firstSelected.indexOf(i+"") > -1) {
						var firstSpecials = first.children("a");
						if (firstSpecials.length != 0) {
							for (j = 0; j < firstSpecials.length; j++) {
								name = $(firstSpecials[j]).attr('class');
								if (name == 'button button-02') {
									$(firstSpecials[0])[0].click();
									succeed = true;
									break;
								}
							}
							if (succeed == true) break;
						}
					}
				}

				if (succeed == true) {
					sessionStorage.removeItem('macro');
					sessionStorage.removeItem('coachSelected');
					sessionStorage.removeItem('firstSelected');
					sessionStorage.removeItem('psgInfoPerPrnb1');
					sessionStorage.removeItem('psgInfoPerPrnb5');
					sessionStorage.removeItem('psgInfoPerPrnb4');
					sessionStorage.removeItem('psgInfoPerPrnb2');
					sessionStorage.removeItem('psgInfoPerPrnb3');
					sessionStorage.removeItem('locSeatAttCd1');
					sessionStorage.removeItem('rqSeatAttCd1');
					sessionStorage.setItem('macroSucceed', "true");
					chrome.runtime.sendMessage({type: 'playSound', botToken: localStorage['botToken'], chatId: localStorage['chatId']}, function(data) { });
				} else {
					setTimeout(function() { 
					location.reload();
					}, 1000);
				}
			} else {
				history.go(-1);
			}
		}
	});
}

function playSound() {
	if (typeof(audio) != "undefined" && audio) {
		audio.pause();
		document.body.removeChild(audio);
		audio = null;
	}
	audio = document.createElement('audio');
	document.body.appendChild(audio);
	audio.autoplay = true;
	audio.src = chrome.runtime.getURL('assets/tada.mp3');
	audio.play();
}
