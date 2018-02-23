var count = 2

var profileURLS = []

chrome.storage.sync.set({'count': count}, function() {
  // Notify that we saved.
  message('Settings saved');
});


chrome.storage.sync.set({'profileURLS': profileURLS}, function() {
  // Notify that we saved.
  message('Settings saved');
});