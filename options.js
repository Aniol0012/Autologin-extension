document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['incognito', 'username', 'password', 'loginUrl', 'shortcut', 'clearCacheOnLogin'], function(data) {
        document.getElementById('incognitoMode').checked = data.incognito || false;
        document.getElementById('loginUrl').value = data.loginUrl || 'http://localhost:8000/accounts/login/';
        document.getElementById('username').value = data.username || 'admin';
        document.getElementById('password').value = data.password || 'admin';
        document.getElementById('shortcut').value = data.shortcut || 'Ctrl+Shift+H';
        document.getElementById('clearCacheOnLogin').checked = data.clearCacheOnLogin || false;
    });

    document.getElementById('save').addEventListener('click', function() {
        const incognito = document.getElementById('incognitoMode').checked;
        const username = document.getElementById('username').value || 'admin';
        const password = document.getElementById('password').value || 'admin';
        const loginUrl = document.getElementById('loginUrl').value;
        const shortcut = document.getElementById('shortcut').value;
        const clearCacheOnLogin = document.getElementById('clearCacheOnLogin').checked;

        chrome.storage.local.set({ incognito, username, password, loginUrl, shortcut, clearCacheOnLogin }, function() {
            const notification = document.getElementById('notification');

            notification.style.display = 'block';
            notification.classList.remove('hide');

            notification.textContent = 'Configuration saved successfully!';
            notification.classList.add('show');

            setTimeout(function() {
                notification.classList.remove('show');
                notification.classList.add('hide');

                setTimeout(() => {
                    notification.style.display = 'none';
                    notification.classList.remove('hide');
                }, 500);
            }, 4000);
        });
    });
});
