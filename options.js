document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get([
        'incognito', 'username', 'password', 'loginUrl', 'shortcut',
        'clearCacheOnLogin', 'usernameFieldId', 'passwordFieldId'
    ], function(data) {
        document.getElementById('incognitoMode').checked = data.incognito || false;
        document.getElementById('loginUrl').value = data.loginUrl || 'http://localhost:8000/accounts/login/';
        document.getElementById('username').value = data.username || 'admin';
        document.getElementById('password').value = data.password || 'admin';
        document.getElementById('shortcut').value = data.shortcut || 'Ctrl+Shift+H';
        document.getElementById('clearCacheOnLogin').checked = data.clearCacheOnLogin || false;
        document.getElementById('usernameFieldId').value = data.usernameFieldId || 'id_username';
        document.getElementById('passwordFieldId').value = data.passwordFieldId || 'id_password';
    });

    document.getElementById('save').addEventListener('click', function() {
        const incognito = document.getElementById('incognitoMode').checked;
        const username = document.getElementById('username').value || 'admin';
        const password = document.getElementById('password').value || 'admin';
        const loginUrl = document.getElementById('loginUrl').value;
        const shortcut = document.getElementById('shortcut').value;
        const clearCacheOnLogin = document.getElementById('clearCacheOnLogin').checked;
        const usernameFieldId = document.getElementById('usernameFieldId').value || 'id_username';
        const passwordFieldId = document.getElementById('passwordFieldId').value || 'id_password';

        chrome.storage.local.set({
            incognito, username, password, loginUrl, shortcut, clearCacheOnLogin,
            usernameFieldId, passwordFieldId
        }, function() {
            const notification = document.getElementById('notification');
            notification.style.display = 'block';
            notification.textContent = 'Configuration saved successfully!';
            notification.classList.add('show');

            setTimeout(function() {
                notification.classList.remove('show');
                notification.style.display = 'none';
            }, 4000);
        });
    });
});
