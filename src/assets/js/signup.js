const Patterns = {
    name: /^[a-zA-Z]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
}

const form = document.getElementById('signupForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('signupemail');
const passwordInput = document.getElementById('signuppassword');

function validateInput(input, pattern) {
    if (pattern.test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

nameInput.addEventListener('input', () => validateInput(nameInput, Patterns.name));
emailInput.addEventListener('input', () => validateInput(emailInput, Patterns.email));
passwordInput.addEventListener('input', () => validateInput(passwordInput, Patterns.password));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInput(nameInput, Patterns.name);
    validateInput(emailInput, Patterns.email);
    validateInput(passwordInput, Patterns.password);

    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('password', passwordInput.value);

    if (form.querySelectorAll('.is-invalid').length === 0) {
        alert('Form submitted successfully!');
        form.reset();
    }
    else {
        alert('Please correct the errors in the form.');
    }
});



