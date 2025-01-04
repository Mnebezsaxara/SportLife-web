const loginForm = document.getElementById('login-form');
const registerButton = document.getElementById('register-button');

// Функция для авторизации пользователя (Login)
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); 

        if (response.ok) {
            alert('Login successful: ' + JSON.stringify(data.message));
            localStorage.setItem('token', data.token); // Сохраняем токен
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для регистрации пользователя (Register)
registerButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/auth/register', { // Исправлено URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            // Выполнить автоматический логин после регистрации
            const loginResponse = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();
            if (loginResponse.ok) {
                localStorage.setItem('token', loginData.token); // Сохраняем токен
            } else {
                alert('Login failed: ' + loginData.error);
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

