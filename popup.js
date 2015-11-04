/**
 * Created by codeforcoffee on 11/3/2015.
 */

var chromeApp = {} || new Object;
chromeApp.topics = [
  'Meet & Hire List',
  'Actively Hiring',
  'Interested in private hiring event',
  'Contribute to Outcomes Programming',
  'Employee Benefits Program',
  'Event Partner',
  'Community Benefits Program',
  'Promotional Partner',
  'Classes & Workshops Instructor',
];
chromeApp.usernameCheck = function() {
  chrome.storage.sync.get('username', function(value) {
    if (!value) {
      console.log('No username set. We\'ll fix that');
      chromeApp.saveUsername();
    }
    console.log('username exists. we are all set.');
  });
}
chromeApp.saveUsername = function() {
  var username = prompt("Hi! GA Chicago Contacts extension here. This will only appear once*. What is your name?");
  if (!username) {
    alert('Error: No username entered.');
    chromeApp.saveUsername();
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'username': username}, function() {
    // Notify that we saved.
    alert('Username saved.');
  });
}
chromeApp.renderDropdown = function(id, querySelectorContainer, listOfDropdownItems) {
  var dropdownObj = document.createElement('select');
  dropdownObj.id = id;
  for (var i = 0; i < listOfDropdownItems.length; i++) {
    var option = document.createElement("option");
    option.value = listOfDropdownItems[i];
    option.text = listOfDropdownItems[i];
    dropdownObj.appendChild(option);
  }
  querySelectorContainer.appendChild(dropdownObj);
  return true;
};


document.addEventListener('DOMContentLoaded', function() {

    chromeApp.saveUsername('bob');

    chromeApp.renderDropdown('contact-reason', document.getElementById('wrapper'), chromeApp.topics);

});
