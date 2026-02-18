const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
});

document.getElementById("loginForm").addEventListener("submit", function(event){
            event.preventDefault();
            form_handler();
        });

function form_handler() {
    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("success_msg");
    if (username === "admin" && password === "password123") {
        msg.style.display = "flex";
        msg.textContent = "Login successful! Redirecting...";
        msg.style.color = "#2ecc71"; // green success

        sessionStorage.setItem("loader_action", "company_login");

        setTimeout(() => {
            window.location.href = "loader_page.html";
        }, 1000);

    } 
    else if(username === "user" && password === "userpass") {
        msg.style.display = "flex";
        msg.textContent = "Login successful! Redirecting...";
        msg.style.color = "#2ecc71"; // green success   

        sessionStorage.setItem("loader_action", "user_login");

        setTimeout(() => {
            window.location.href = "loader_page.html";
        }, 1000);
    }
    else {
        msg.style.display = "flex";
        msg.textContent = "Invalid username or password.";
        msg.style.color = "#e74c3c"; // red error
    }
}

function logout(){

    sessionStorage.setItem("loader_action", "logout");
    
    window.location.href = "loader_page.html";
}