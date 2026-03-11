let isRegistered = false;

localStorage.setItem("isRegistered", isRegistered);

const signinform = document.getElementById("signinForm");
const signinemailInput = document.getElementById("signinemail");
const signinpasswordInput = document.getElementById("signinpassword");

signinform.addEventListener("submit", (event) => {
    event.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (signinemailInput.value === storedEmail && signinpasswordInput.value === storedPassword) {
        alert("Sign in successful!");
        isRegistered = true;
        localStorage.setItem("isRegistered", isRegistered);
        signinform.reset();
    } else if (storedEmail === null || storedPassword === null) {
        alert("No account found. Please sign up first.");
    } else {
        alert("Invalid email or password. Please try again.");
    }
});