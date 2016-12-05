/**
  * main.js - Outlines all the UI interactions in this very simple app, in an event based format
  */


// "redraw" (i.e. draw) the sound cards upon page load
document.addEventListener("load", function() {
  console.log("Document Loaded")
  Event.trigger("action.redrawSounds", JSON.parse(localStorage["list"]));
});



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

// Parse through each, file and only save the audio ones
Event.listen("action.handleFile", function(files) {
  let file;
  for (var i = 0; i < files.length; i++) {
    file = files[i]
    // Make sure we only have audio files (that we could assume this agent could use; maybe I'll change this filter later to drop files for which the agent cannot play, but later)
    if (/\.(wav|mp3|oga|webm)$/i.test(file.name)) {
      Event.trigger("action.saveFile", file);
    } else {
      console.log("Dropped " + file.name + " because it has an invalid extension");
    }
  }
});

// Save the file to the "disk"
Event.listen("action.saveFile", function(file) {
  // Get the list from localStorage or instaniate if it does not exist
  let list = JSON.parse(localStorage["list"] || "[]")
  let reader = new FileReader();


  reader.addEventListener("load", function() {

    // Save the DataURL in a localStorage as the file name, and add it to the list
    localStorage[file.name] = reader.result;
    list.push(file.name);

    console.log("Saved " + file.name);
    // Indicate to the UI an update in the List of songs (and save list in localStorage);
    Event.trigger("action.updateList", list);
  });

  reader.readAsDataURL(file);

});

/** Update the List of Sounds on the Board **/
// Update the localStorage
Event.listen("action.updateList", function(list) {
  localStorage["list"] = JSON.stringify(list);
  Event.trigger("action.redrawSounds", list);
});

// Stores all of the Audio Objects for playing
var AudioObjects = {};

/** Draw the Sound Cards **/
Event.listen("action.redrawSounds", function(list) {
  let main = document.getElementsByTagName("main")[0];

  // Clear the existing Cards
  main.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    let soundcard = new SoundCard(list[i], localStorage[list[i]]);

    main.appendChild(soundcard);
  }

});
