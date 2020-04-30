/* this function keeps an active countdown timer based on the next close approach on the home page */
function calculateTimeDifference(time) {
  /* converting time of close approach into milliseconds */
  const dateOfApproach = (new Date(time).getTime() / 1000).toFixed()
  const now = (new Date().getTime() / 1000).toFixed(0);
  
  /* sets the time and date in the correct format */
  const delta = dateOfApproach - now;
  const hours = (delta / 3600) - 1;
  const minutes = (delta % 3600) / 60;
  const seconds = (delta % 3600) % 60;
  const countDown = `${hours.toFixed(0)}:${minutes.toFixed(0)}:${seconds.toFixed(0)}`
  return countDown;
}
/* updating countdown */
function updateTime(timeToCompare) {
  const timer = document.querySelector('#countdown');
  timer.textContent = calculateTimeDifference(timeToCompare);
}
/* initialising countdown timer */
function initialiseTimer(time) {
  setInterval(() => updateTime(time), 1000);
}
