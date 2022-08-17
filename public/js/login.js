// function ran when the login form is entered, it checks whether the login credentials are correct, then redirects the user to their dashboard if the credentials are correct
async function login(event) {
    event.preventDefault();

    const user = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    // both user and password must be entered
    if (!user || !password) {
        alert('Please enter your email and password')
    } else {
        const loginCheck = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (loginCheck.ok) {
            document.location.replace('/dashboard')
        } else {
            alert("Incorrect Login Credentials Entered")
        }
    }
}

// when the signup form is entered, this function creates a new user with the post user endpoint
async function signup(event) {
    event.preventDefault();

    const email = document.querySelector('#emailSignup').value.trim();
    const user = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    // ensures that email user and password are entered
    if (!email || !user || !password) {
        alert("Please enter all required fields to sign up")
    } else {
        const signup = await fetch("/api/users", {
            method: 'post',
            body: JSON.stringify({
                email, user, password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (signup.ok) {
            document.location.replace("/dashboard")
        } else {
            alert('Signup Failed. Please try again')
        }
    }

}

document.querySelector('.login').addEventListener('submit', login);
document.querySelector('.signup').addEventListener('submit', signup);