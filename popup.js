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
  //  chromeApp.renderTextInput('entry.2070097122', document.getElementById('wrapper'), 'Submitted By', true, value.username);
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
chromeApp.renderTextInput = function(id, querySelectorContainer, placeholderText, isHidden, value) {
  // rendundancy check
  if (document.getElementById(id) != null) return false;
  var label = document.createElement("label");
  var div = document.createElement("div");
  div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = id;
  //textInput.placeholder = placeholderText;
  textInput.className = "mdl-textfield__input";
  label.innerHTML = placeholderText;
  label.className = "mdl-textfield__label";
  label.htmlFor = textInput.id;
  if (isHidden) {
    textInput.type = 'hidden';
  }
  if (value) {
    textInput.value = value;
  }
  div.appendChild(label);
  div.appendChild(textInput);
  querySelectorContainer.appendChild(div);
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
    option.className = "option";
  }
  querySelectorContainer.appendChild(dropdownObj);
  return true;
};
chromeApp.renderSubmitButton = function(id, querySelectorContainer) {
  //  <button id="form-submit" type="submit">Submit</button>
  var btn = document.createElement('button');
  btn.id = id;
  btn.type = 'submit';
  btn.className = "mdl-button mdl-js-button";
  btn.innerHTML = 'Submit Contact';
  querySelectorContainer.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', function() {

  var usernameObject = chromeApp.usernameCheck();
  var form = document.getElementById('input-form');


  chromeApp.usernameCheck();
  chromeApp.renderTextInput('entry.1806308001', form, 'Contact\'s Name');
  chromeApp.renderTextInput('entry.7748266', form, 'Title / Position');
  chromeApp.renderTextInput('entry.1882129234', form, 'Company');
  chromeApp.renderTextInput('entry.1110567511', form, 'Email Address');
  chromeApp.renderDropdown('entry_393917746', form, chromeApp.topics);
  chromeApp.renderSubmitButton('form-submit', document.getElementById('submitcontainer'))

  form.addEventListener('submit', function() {

    var baseURL = 'https://docs.google.com/forms/d/1oF36C6kGAFCaMN7yV2uZYJLRLwfDUAOXPp7YmHrn8Iw/formResponse?';
    var submitRef = '&submit=Submit';

    var submitURL = (baseURL + 'entry.1806308001' + "=" + encodeURIComponent(document.getElementById('entry.1806308001').value) + "&" +
                    'entry.7748266' + "=" + encodeURIComponent(document.getElementById('entry.7748266').value) + "&" +
                    'entry.1882129234' + "=" + encodeURIComponent(document.getElementById('entry.1882129234').value) + "&" +
                    'entry.1110567511' + "=" + encodeURIComponent(document.getElementById('entry.1110567511').value) + "&" +
                    'entry_393917746' + "=" + encodeURIComponent(document.getElementById('entry_393917746').value) + "&" +
                    'entry.2070097122' + "=" +encodeURIComponent( document.getElementById('entry.2070097122').value) + "&" +  submitRef);

    console.log(submitURL);
    this.action = submitURL;

    document.getElementById('status').innerHTML = 'Thank you... you are wonderful!';
    setTimeout(function() {
      window.close();
    }, 1000);

  });

});
