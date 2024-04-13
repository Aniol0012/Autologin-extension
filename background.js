chrome.commands.onCommand.addListener(function(command) {
    if (command === "login-localhost") {
        chrome.storage.local.get(['incognito', 'loginUrl', 'clearCacheOnLogin', 'usernameFieldId', 'passwordFieldId', 'username', 'password'], function(data) {
            const useIncognito = data.incognito || false;
            const loginUrl = data.loginUrl || 'http://localhost:8000/accounts/login/';
            const clearCache = data.clearCacheOnLogin || false;

            function openUrl() {
                const createData = {
                    url: loginUrl,
                    state: "maximized"
                };
                if (useIncognito) {
                    createData.incognito = true;
                    chrome.windows.create(createData);
                } else {
                    chrome.tabs.create({ url: loginUrl }, tab => {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            function: () => {
                                login(data);
                            }
                        });
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

function login(data) {
    const {username, password, usernameFieldId, passwordFieldId} = data;
    const usernameInput = document.getElementById(usernameFieldId || 'id_username');
    const passwordInput = document.getElementById(passwordFieldId || 'id_password');
    const form = document.querySelector('form');

    if (usernameInput && passwordInput && form) {
        usernameInput.value = username;
        passwordInput.value = password;
        form.submit();
    } else {
        console.error('Cannot find form elements.');
    }
}
