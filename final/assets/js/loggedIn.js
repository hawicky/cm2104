/* js script checking for logged in user, where username is stored in localstorage */
document.addEventListener('DOMContentLoaded', () => {
  const userDetails = document.querySelector('#teamname');
  if (localStorage.getItem("username")) {
    userDetails.innerHTML = `Logged in as: ${localStorage.getItem("username")}<br>Favourite asteroid: ${localStorage.getItem("favouriteAsteroid")}`;
  }
});
