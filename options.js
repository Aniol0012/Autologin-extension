document.addEventListener('DOMContentLoaded', function() {
    loadSettings();

    document.getElementById('save').addEventListener('click', function() {
        saveSettings();
    });

    document.getElementById('reset').addEventListener('click', function() {
        resetSettings();
    });
});

function loadSettings() {
    chrome.storage.local.get({
        incognito: false,
        username: 'admin',
        password: 'admin',
        loginUrl: 'http://localhost:8000/accounts/login/',
        shortcut: 'Ctrl+Shift+H',
        clearCacheOnLogin: false,
        usernameFieldId: 'id_username',
        passwordFieldId: 'id_password',
        formSelector: 'form'
    }, function(data) {
        document.getElementById('incognitoMode').checked = data.incognito;
        document.getElementById('loginUrl').value = data.loginUrl;
        document.getElementById('username').value = data.username;
        document.getElementById('password').value = data.password;
        document.getElementById('shortcut').value = data.shortcut;
        document.getElementById('clearCacheOnLogin').checked = data.clearCacheOnLogin;
        document.getElementById('usernameFieldId').value = data.usernameFieldId;
        document.getElementById('passwordFieldId').value = data.passwordFieldId;
        document.getElementById('formSelector').value = data.formSelector;
    });
}

function saveSettings() {
    chrome.storage.local.set({
        incognito: document.getElementById('incognitoMode').checked,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        loginUrl: document.getElementById('loginUrl').value,
        shortcut: document.getElementById('shortcut').value,
        clearCacheOnLogin: document.getElementById('clearCacheOnLogin').checked,
        usernameFieldId: document.getElementById('usernameFieldId').value,
        passwordFieldId: document.getElementById('passwordFieldId').value,
        formSelector: document.getElementById('formSelector').value
    }, function() {
        showNotification('Configuration saved successfully!');
    });
}

function resetSettings() {
    chrome.storage.local.set({
        incognito: false,
        username: 'admin',
        password: 'admin',
        loginUrl: 'http://localhost:8000/accounts/login/',
        shortcut: 'Ctrl+Shift+H',
        clearCacheOnLogin: false,
        usernameFieldId: 'id_username',
        passwordFieldId: 'id_password',
        formSelector: 'form'
    }, function() {
        loadSettings();
        showNotification('Configuration reset to default values!');
    });
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
        notification.style.display = 'none';
    }, 4000);
}
