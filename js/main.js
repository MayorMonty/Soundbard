/** Settings Pane **/
// UI Changes
Event.listen("button.settings", function() {
  let icon = this.children[0];
  icon.classList.toggle("fa-plus");
  icon.classList.toggle("fa-times")
});

// Slide the Settings Pane into view
Event.listen("button.settings", function() {
  document.getElementsByClassName("settings")[0].classList.toggle("state-hidden")
})


/** Clicking the Settings Pane should open the upload prompt **/
Event.listen("button.settingsPane", function() {
  document.querySelector("input[type=file]").click();
})
