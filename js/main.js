/**
  * main.js - Outlines all the UI interactions in this very simple app, in an event based format
  */

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


/** Handle File Uploads - i.e. when the user clicks "upload" or similar on the file selector dialog **/
Event.listen("action.handleFile", function(files) {
  let reader;
  for (var i = 0; i < files.length; i++) {
    Event.trigger("action.saveFile", files[i])
  }
});

Event.listen("action.saveFile", function() {

});
