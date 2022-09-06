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

function sendTelegramMessage(botToken, chatId) {
	var msg = encodeURI('Macro has been stopped. Please check your reservation status.');
	if (botToken != undefined && chatId != undefined) {
		var url = 'https://api.telegram.org/bot' + botToken + '/sendmessage?chat_id=' + chatId + '&text=' + msg;
		
		fetch(url);
	}
}

var botToken;
var chatId;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message && message.type == 'playSound') {
	    // cannot play sound in service_worker from Manifest v3
      //playSound();
	    sendTelegramMessage(botToken, chatId);
      sendResponse(true);
    }
		if (message && message.type == 'setTelegram') {
			botToken = message.botToken;
			chatId = message.chatId;
			console.log('botToken: ', botToken);
		}
});
