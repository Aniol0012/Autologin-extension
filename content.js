window.onload = function() {
    if (window.location.href.includes('/accounts/login/')) {
        chrome.storage.local.get(['username', 'password', 'usernameFieldId', 'passwordFieldId'], function(data) {
            const username = data.username || 'admin';
            const password = data.password || 'admin';
            const usernameFieldId = data.usernameFieldId || 'id_username';
            const passwordFieldId = data.passwordFieldId || 'id_password';
            const usernameInput = document.getElementById(usernameFieldId);
            const passwordInput = document.getElementById(passwordFieldId);
            const form = document.querySelector('form');

            if (usernameInput && passwordInput && form) {
                usernameInput.value = username;
                passwordInput.value = password;
                form.submit();
            } else {
                console.error('Cannot find form elements.');
            }
        });
    }
}
