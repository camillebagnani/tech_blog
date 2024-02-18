async function loginFormHandler (event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password,}),
            headers: { 'Content-Type': 'application/json'},
        });

       

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
};

async function signUpFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                username, 
                password
            }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }

};

const signUpSwitch = (event) => {
    event.preventDefault();
    document.querySelector('.login-div').classList.add('hidden');
    document.querySelector('.signup-div').classList.remove('hidden');
}

document.querySelector('.sign-up-link').addEventListener('click', signUpSwitch);

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);

