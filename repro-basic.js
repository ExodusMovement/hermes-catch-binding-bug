// Basic repro: catch binding accessed in a closure called after catch exits.
// Run: hermes repro-basic.js
(function () {
  var callbacks = [];
  try {
    throw new Error('catch-binding-bug');
  } catch (error) {
    print('inside catch: ' + error.message);
    callbacks.push(function () {
      print('deferred: ' + error.message);
    });
  }
  callbacks[0]();
})();
