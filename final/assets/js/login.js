document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.querySelector('#login');
  const logoutButton = document.querySelector('#logout');
  const signupForm = document.querySelector('#signup');
  /* sets the display to none */
  if(localStorage.getItem("username")) {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    logoutButton.style.display = "none";
  }
  /* logout button */
  logoutButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  })
  /* logIn */
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const credentials = {
      username: event.target["login-username"].value,
      password: event.target["login-password"].value
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(body => {
      if (body.status === 401) {
        alert(body.message);
      } else {
        alert(`Welcome, ${body.user.username}! Seen any good photos of your favourite asteroid (${body.user.favouriteAsteroid}) lately?`);
        localStorage.setItem("username", body.user.username);
        localStorage.setItem("favouriteAsteroid", body.user.favouriteAsteroid);
        location.reload();
      }
    })
  });
  /* gets the users sign up data */
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUser = {
      username: event.target["signup-username"].value,
      password: event.target["signup-password"].value,
      favouriteAsteroid: event.target["signup-favouriteAsteroid"].value
    };
    /* new user is added */
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => {
      localStorage.setItem("username", user.username);
      localStorage.setItem("favouriteAsteroid", user.favouriteAsteroid);
      location.reload();
    });
  });
});
