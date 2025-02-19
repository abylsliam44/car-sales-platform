const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token') && 
        !['/index.html', '/register.html', '/login.html'].includes(window.location.pathname)) {
        window.location.href = '/index.html';
    }

    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', register);
    }
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', login);
    }
});

async function register(e) {
    e.preventDefault();
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        alert('Registration successful');
        window.location.href = 'login.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function login(e) {
    e.preventDefault();
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');

        console.log("Token:", data.token);
        console.log("Role:", data.user?.role); 
        if (!data.user || !data.user.role) {
            throw new Error("User role is missing in response!");
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        window.location.href = data.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
}
