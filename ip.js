// Set variables
var websiteIP_status, setPosition;
var url = window.location.host;

$(document).ready(function() {

	chrome.extension.sendMessage({name: "getIP"}, function(response) {
		var finalIP = response.domainToIP;
		chrome.extension.sendMessage({name: "getOptions"}, function(response) {
			var websiteIP_status = response.enableDisableIP;
			if (websiteIP_status == "Disable" || typeof websiteIP_status == 'undefined') {
				$("body").append('<div title="点击隐藏" id="chrome-website-ipaddr" >' + finalIP + '</div>');
			}
		});
	});
	
	$("#chrome-website-ipaddr").live('click', function() {
        $(this).hide();
        //var ip = $(this).text();
        //var url  = "http://ip.cn/index.php?ip=" + ip;
        //window.open(url);
	});
	
	loadOptions(); //To set default value on pop-up button

});

function loadOptions() {
	chrome.extension.sendMessage({name: "getOptions"}, function(response) {
		var enableDisableIP = response.enableDisableIP;
		
		// set default as disabled
		if (typeof enableDisableIP == 'undefined') {
			chrome.extension.sendMessage({name: "setOptions", status: 'Disable'}, function(response) {});
		}
	});
}

// popup button clicked
document.addEventListener('DOMContentLoaded', function () {
	chrome.extension.sendMessage({name: "getOptions"}, function(response) {
		$("#EnableDisableIP").val(response.enableDisableIP);
	});
	
	document.querySelector('#EnableDisableIP').addEventListener('click', function() {
		if ($('#EnableDisableIP').val() == "Disable") {
			// save to localstore
			chrome.extension.sendMessage({name: "setOptions", status: 'Enable'}, function(response) {});
			$('#EnableDisableIP').val('Enable')	
		}
		else if ($('#EnableDisableIP').val() == "Enable") {
			// save to localstore
			chrome.extension.sendMessage({name: "setOptions", status: 'Disable'}, function(response) {});
			$('#EnableDisableIP').val('Disable')
		}
	});
});
