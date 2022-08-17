// sends a post requests to the user logout enpoint when the logout button is clicked, ending the session and "logging" the user out
async function logout() {
    const logout = await fetch('api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    })

    if (logout.ok) {
        document.location.replace('/')
    } else {
        alert("Logout failed, please try again")
    }
}



document.querySelector('#logoutBtn').addEventListener('click', logout)