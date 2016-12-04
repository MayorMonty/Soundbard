/**
 * event.js - Simple Event Registration
 *
 **/

// I'm using a Self-Executing Function to give myself a module feel and give me a local scope
const Event = (function() {
  // Stores all instances of events and their callbacks in an {"event": [callback, callback, ...]} style
  let events = {};
  let debug = false;

  function trigger(name, data) {

    if  (!events.hasOwnProperty(name)) throw new ReferenceError("Unknown event `"+name+"` (in event.trigger)")

    console.log("[Event] Trigger " + name);

    for (var i = 0; i < events[name].length; i++) {
      // .call(<this>, param1, param2, ...) - I'm using .call instead of () in order to set the <this> of the function
      events[name][i].call(data, data);
    }
  }

  function listen(name, callback) {
    if (typeof callback !== "function") throw new TypeError("`callback` must be a function (in event.listen)");

    // Create the event if it does not exist
    if (!events.hasOwnProperty(name)) events[name] = [];

    if (debug) console.log("[Event] Added listener to `"+name+"`: " + callback)

    return events[name].push(callback);

  }

  return {
    "trigger": trigger,
    "listen": listen,
    "debug": debug
  };
})();
