/**
  * A generator for the Sound Card Template
  */

function SoundCard(name, data) {
  console.log(name);
  // Save the new Audio Object for use later
  let audio = AudioObjects[name] = new Audio(data);

  Event.listen("action.play." + name, function() {
    audio.play();
  })

  var container = document.createElement("div");
  container.classList.add("soundcard");
  container.addEventListener("click", function() {
    Event.debug(true);
    Event.trigger("action.play." + name);
  });

  var label = document.createElement("p");
  label.innerText = name;

  container.appendChild(label);

  return container
}
