chrome.commands.onCommand.addListener(function(command) {
    if (command === "login-localhost") {
        chrome.storage.local.get(['incognito', 'loginUrl', 'clearCacheOnLogin'], function(data) {
            const useIncognito = data.incognito || false;
            const loginUrl = data.loginUrl || 'http://localhost:8000/accounts/login/';
            const clearCache = data.clearCacheOnLogin || false;

            function openUrl() {
                if (useIncognito) {
                    chrome.windows.create({
                        url: loginUrl,
                        incognito: true,
                        state: "maximized"
                    });
                } else {
                    chrome.tabs.create({
                        url: loginUrl
                    });
                }
            }

            if (clearCache) {
                chrome.browsingData.remove({
                    "since": 0
                }, {
                    "cache": true
                }, function() {
                    console.log('Cache cleared.');
                    openUrl();
                });
            } else {
                openUrl();
            }
        });
    }
});
