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
    chromeApp.renderTextInput('entry.2070097122', document.getElementById('wrapper'), 'Submitted By', true, value.username);
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
chromeApp.googleFormIdCheck = function() {
  chrome.storage.sync.get('google-form-id', function(value) {
    if (!value) {
      console.log('No google-form-id set. We\'ll fix that');
      chromeApp.saveUsername();
    }
    console.log('google-form-id exists. we are all set.');
    chromeApp.createSubmitButton()
  });
}
chromeApp.saveGoogleFormId = function() {
  var username = prompt("You have been provided a secret form ID. Copy and paste it here.");
  if (!username) {
    alert('Error: No google-form-id entered.');
    chromeApp.saveGoogleFormId();
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'google-form-id': username}, function() {
    // Notify that we saved.
    alert('google-form-id saved.');
  });
}
chromeApp.renderTextInput = function(id, querySelectorContainer, placeholderText, isHidden, value) {
  // rendundancy check
  if (document.getElementById(id) != null) return false;
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = id;
  textInput.placeholder = placeholderText;
  if (isHidden) {
    textInput.type = 'hidden';
  }
  if (value) {
    textInput.value = value;
  }
  querySelectorContainer.appendChild(textInput);
  return true;
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
chromeApp.renderSubmitButton = function(id, querySelectorContainer) {
  //  <button id="form-submit" type="submit">Submit</button>
  var btn = document.createElement('button');
  btn.id = id;
  btn.type = 'submit';
  btn.innerHTML = 'Submit Contact';
  querySelectorContainer.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', function() {

  var usernameObject = chromeApp.usernameCheck();

  chromeApp.usernameCheck();
  chromeApp.renderTextInput('entry.1806308001', document.getElementById('input-form'), 'Contact\'s Name');
  chromeApp.renderTextInput('entry.7748266', document.getElementById('input-form'), 'Title / Position');
  chromeApp.renderTextInput('entry.1882129234', document.getElementById('input-form'), 'Company');
  chromeApp.renderTextInput('entry.1110567511', document.getElementById('input-form'), 'Email Address');
  chromeApp.renderDropdown('entry_393917746', document.getElementById('input-form'), chromeApp.topics);
  chromeApp.renderSubmitButton('form-submit', document.getElementById('input-form'));

});
