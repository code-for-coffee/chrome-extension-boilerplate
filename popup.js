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

    chromeApp.renderDropdown('contact-reason', document.getElementById('wrapper'), chromeApp.topics);

});
