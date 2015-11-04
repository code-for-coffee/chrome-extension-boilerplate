/**
 * Created by codeforcoffee on 11/3/2015.
 */

var chromeApp = {} || new Object;
chromeApp.topics = [
  '-- Area of Engagement --',
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
chromeApp.renderTextInput = function(id, querySelectorContainer, placeholderText, isHidden) {
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = id;
  textInput.placeholder = placeholderText;
  if (isHidden) {
    textInput.type = 'hidden';
  }
  querySelectorContainer.appendChild(textInput);
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

    chromeApp.usernameCheck();
    chromeApp.renderTextInput('entry.1806308001', document.getElementById('wrapper'), 'Contact\'s Name');
    chromeApp.renderTextInput('entry.7748266', document.getElementById('wrapper'), 'Title / Position');
    chromeApp.renderTextInput('entry.1882129234', document.getElementById('wrapper'), 'Company');
    chromeApp.renderTextInput('entry.1110567511', document.getElementById('wrapper'), 'Email Address');
    chromeApp.renderTextInput('entry.2070097122', document.getElementById('wrapper'), 'Submitted By', true);
    chromeApp.renderDropdown('entry_393917746', document.getElementById('wrapper'), chromeApp.topics);

});
