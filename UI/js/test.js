let loggedIn = `<a href="home.html">Home</a>
<a href="profile.html" id="profile1">Profile</a>
<a href='post-question.html'>Post Question</a>
<a href="recent-questions.html">Recent Questions</a>
<a id="logout" onclick="{logoutUser()}">Logout</a>`

let looggedOut = `<a href="signup.html">Sign Up</a>
<a href="login.html">Login</a>`



{
    localStorage.getItem('token') ? 
    document.getElementsByClassName('header-right')[0].innerHTML = loggedIn
    : 
    document.getElementsByClassName('header-right')[0].innerHTML = looggedOut
     ;
}