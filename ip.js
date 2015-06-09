var appHoverTitle = chrome.i18n.getMessage('appHoverTitle');

function placeIPDiv() {
    chrome.extension.sendMessage({op: "getip"}, function (response) {
        var ip = response.ip;
        chrome.extension.sendMessage({op: "is_enabled"}, function (response) {
            var ext_enabled = response.ext_enabled;
            if (ext_enabled == 1 || ext_enabled === undefined) {
                $("body").append('<div title="' + appHoverTitle + '" id="chrome-website-ip" >' + ip + '</div>');

                // 点击隐藏
                $("#chrome-website-ip").on('click', function(){
                    copy("chrome-website-ip");
                    //hideIPDiv();
                });
            }
        });
    });
}

function copy(id){
    $("#" + id).select();
    //Copy Content
    document.execCommand("Copy", false, null);
}

function hideIPDiv() {
    document.getElementById('chrome-website-ip').remove();
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

        //  双击`F2`弹出可复制的`ip`
/*        if (e.keyCode == 113 && window.lastKeyCode == 113 &&  // two "F2" keystrokes
            timeDiff < 900) {             // within 900ms
            window.lastKeyCode = 0;
            window.prompt('IP of "' + window.location.host + '":',
                document.getElementById('chrome-website-ip').innerText);
        }*/

        //  双击`F4` 去项目主页
        if (e.keyCode == 115 && window.lastKeyCode == 115 && timeDiff < 900) {
            window.lastKeyCode = 0;
            window.open("http://git.oschina.net/surprise/Chrome.Website.Ip#git-readme");
        }

        // 再次按ESC隐藏
        if ( e.keyCode == 27 ) {
            hideIPDiv();
        }
    }
    window.lastKeyCode = e.keyCode;
});
