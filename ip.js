function placeIPDiv() {
    chrome.extension.sendMessage({op: "getip"}, function (response) {
        var ip = response.ip;
        chrome.extension.sendMessage({op: "is_enabled"}, function (response) {
            var ext_enabled = response.ext_enabled;
            if (ext_enabled == 1 || ext_enabled === undefined) {
                $("body").append('<div title="点击隐藏" id="chrome-website-ip" >' + ip + '</div>');
            }
        });
    });
}

$(document).ready(placeIPDiv);

window.lastKeyCode = 0;
window.lastHitTime = new Date();

$(document).keyup(function (e) {
    // If the 'Esc' key is pressed before the HTML (yes, HTML only) could
    // fully load, show the IP <div> as $(document).ready() doesn't execute.
    if (document.getElementById('chrome-website-ip') === null && e.keyCode == 27) {
        placeIPDiv();
    } else {
        now = new Date();
        timeDiff = now - window.lastHitTime;
        window.lastHitTime = now;
        if (e.keyCode == 113 && window.lastKeyCode == 113 &&  // two "F2" keystrokes
            timeDiff < 900) {             // within 900ms
            window.lastKeyCode = 0;
            window.prompt('IP of "' + window.location.host + '":',
                document.getElementById('chrome-website-ip').innerText);
        }
    }
    window.lastKeyCode = e.keyCode;
});
