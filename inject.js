window.showModalDialog = window.showModalDialog || function(url, arg, opt) {
	window.open(url, arg, opt);
};

function macro() {
	coachSelected = [].map.call(document.querySelectorAll('.coachMacro:checked'), function (select) {
		return select.value;
	});
	firstSelected = [].map.call(document.querySelectorAll('.firstMacro:checked'), function (select) {
		return select.value;
	});

	if (coachSelected.length == 0 && firstSelected.length == 0) {
		alert("매크로를 실행하기 위해서는 예매하기 위한 열차 1개 이상을 선택하십시오.");
	} else {
		alert("매크로를 시작합니다.\n트럼펫 소리가 나면 바로 결제를 해주셔야 합니다.");

		sessionStorage.setItem('macro', true);
		sessionStorage.setItem('coachSelected', JSON.stringify(coachSelected));
		sessionStorage.setItem('firstSelected', JSON.stringify(firstSelected));

		// Stores user preferences.
		sessionStorage.setItem('psgInfoPerPrnb1', document.getElementsByName('psgInfoPerPrnb1')[0].value);
		sessionStorage.setItem('psgInfoPerPrnb5', document.getElementsByName('psgInfoPerPrnb5')[0].value);
		sessionStorage.setItem('psgInfoPerPrnb4', document.getElementsByName('psgInfoPerPrnb4')[0].value);
		sessionStorage.setItem('psgInfoPerPrnb2', document.getElementsByName('psgInfoPerPrnb2')[0].value);
		sessionStorage.setItem('psgInfoPerPrnb3', document.getElementsByName('psgInfoPerPrnb3')[0].value);
		sessionStorage.setItem('locSeatAttCd1', document.getElementsByName('locSeatAttCd1')[0].value);
		sessionStorage.setItem('rqSeatAttCd1', document.getElementsByName('rqSeatAttCd1')[0].value);

		location.reload();
	}
}

function macrostop() {
	alert("매크로를 중지합니다.\n조건을 변경하여 재조회하신 후 다시 시작하실 수 있습니다.");

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

	location.reload();
}
var dsturl3 = "https://etk.srail.kr/hpg/hra/03/selectSettleInfo.do?pageId=TK0101040000";

if (document.URL.substring(0, dsturl3.length) == dsturl3) {

		document.querySelector("#Tk_stlCrCrdNo14_checkbox")["checked"] = false;
		document.querySelector("#Tk_vanPwd1_checkbox")["checked"] = false;
		document.querySelector("#stlCrCrdNo11")["value"] = "1234";
		document.querySelector("#stlCrCrdNo12")["value"] = "1234";
		document.querySelector("#stlCrCrdNo13")["value"] = "1234";
		document.querySelector("#stlCrCrdNo14")["value"] = "1234";
		document.querySelector("#crdVlidTrm1M").value = "00";
		document.querySelector("#crdVlidTrm1Y").value = "11";
		document.querySelector("#ismtMnthNum1").value = "0";
		document.querySelector("#vanPwd1").value = "00";
		document.querySelector("#athnVal1").value = "111111";
		document.querySelector("#agree1").checked = true;
		document.querySelector("#requestIssue1").click();
		window.confirm = function(msg) { return true; }
}
