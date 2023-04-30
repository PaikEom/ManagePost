// this is to load the page here  
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/info')
  .then(response => response.json())
  .then(data => loadHTMLTable(data['data']));
  
});
// EDIT AND DELETE BACK END FUNCTIONALITY 
// eventlistener for the new added table 

document.querySelector('table tbody').addEventListener('click',function(event){
  if (event.target.className === "delete-row-btn"){
    deleteRow(event.target.dataset.id); // THIS NEEDS TO BE CHANGED
  }
  if( event.target.className === "edit-row-btn"){
    handleEditRow(event.target.dataset.id);
  }
})

// Create a post button
const createPostBtn = document.querySelector('#create-a-post');
createPostBtn.onclick = function(){
  const createPostForm = document.querySelector('#create-row');
  const closePostBtn = document.querySelector('#close-post-form');
  closePostBtn.hidden = false;
  createPostForm.hidden = false;
};
// to close the create form 
const closePostForm = document.querySelector('#close-post-form');
closePostForm.onclick = function(){
  const createPostForm = document.querySelector('#create-row');
  createPostForm.hidden = true;
  closePostForm.hidden = true;
};
// grabing the update btn
const updateBtn = document.querySelector('#update-row-btn');
// handleEditRow code
function handleEditRow(id){
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  const closeUpdateForm = document.querySelector('#close-update-form');
  closeUpdateForm.hidden = false;
  document.querySelector('#update-name-input').dataset.id = id;
  document.body.classList.add("overlay"); // Just added
  const hiddingDiv = document.querySelector('#update-section-div'); // Just added
  hiddingDiv.hidden = false; // Just added 
}
//to close the update form 
const closeUpdate = document.querySelector('#close-update-form');
closeUpdate.onclick = function(){
  const update = document.querySelector('#update-row');
  update.hidden = true;
  closeUpdate.hidden = true;
  document.body.classList.remove("overlay"); // just added
  const hiddingDiv = document.querySelector('#update-section-div');
  hiddingDiv.hidden = true;
};
// Sending the updated part to the back end 
updateBtn.onclick = function() {
  const updateNameInput = document.querySelector('#update-name-input');
  const updateLastnameInput = document.querySelector('#update-lastname-input');
  const updateLocationInput = document.querySelector('#update-location-input');
  const updateLengthInput = document.querySelector('#update-length-input');
  const updateWidthInput = document.querySelector('#update-width-input');
  const updatePriceInput = document.querySelector('#update-price-input');
  const updateTelephoneInput = document.querySelector('#update-telephone-input');
  const updateAboutInput = document.querySelector('#update-about-input');
  
  const data = {
    id: updateNameInput.dataset.id,
    name: updateNameInput.value,
    last_name: updateLastnameInput.value,
    location: updateLocationInput.value,
    length: updateLengthInput.value,
    width: updateWidthInput.value,
    price: updatePriceInput.value,
    telephone: updateTelephoneInput.value,
    about: updateAboutInput.value
  };

  // send the data to the server using fetch
  fetch('/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
    } else {
      console.log('Error updating row');
    }
  })
  .catch(error => console.log(error));
  
  // hide the update form
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = true;
  location.reload();
};

// TO DELETE DATA 
function deleteRow(id){
  fetch('/delete/'+ id,{
    method: 'DELETE'
  })
  .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

// SEND DATA TO THE DATABASE
const createBtn = document.querySelector('#create-row-btn');
createBtn.onclick = function() {
  const NameInput = document.querySelector('#name-input');
  const LastnameInput = document.querySelector('#lastname-input');
  const LocationInput = document.querySelector('#location-input');
  const LengthInput = document.querySelector('#length-input');
  const WidthInput = document.querySelector('#width-input');
  const PriceInput = document.querySelector('#price-input');
  const TelephoneInput = document.querySelector('#telephone-input');
  const AboutInput = document.querySelector('#about-input');
  
  const data = {
    name: NameInput.value,
    last_name: LastnameInput.value,
    location: LocationInput.value,
    length: LengthInput.value,
    width: WidthInput.value,
    price: PriceInput.value,
    telephone: TelephoneInput.value,
    about: AboutInput.value
  };

  // send the data to the server using fetch
  fetch('/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      location.reload();
    } else {
      console.log('Error updating row');
    }
  })
  .catch(error => console.log(error));
  
};

// this function is used to load the backend data 
function loadHTMLTable(data) {
  const table = document.querySelector('table tbody');

  if (data.length === 0) {
      table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
      return;
  }

  let tableHtml = "";

  data.forEach(function ({ id,name,last_name,location,length,width,price,telephone,about}) {
      tableHtml += "<tr>";
      tableHtml += `<td>${name}</td>`;
      tableHtml += `<td>${last_name}</td>`;
      tableHtml += `<td>${location}</td>`;
      tableHtml += `<td>${length}</td>`;
      tableHtml += `<td>${width}</td>`;
      tableHtml += `<td>${price}</td>`;
      tableHtml += `<td>${telephone}</td>`;
      tableHtml += `<td>${about}</td>`;
      tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
      tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}


// to make the form pop up 
document.body.addEventListener("click", function(event) {
  if (event.target === document.body) {
    // updateForm.classList.add("hidden");
    const update = document.querySelector('#update-row');
    update.hidden = true;
    closeUpdate.hidden = true;
    document.body.classList.remove("overlay");
    const hiddingDiv = document.querySelector('#update-section-div');
  hiddingDiv.hidden = true;
  }
});

// Search functionality 
function search() {
  
  var location = $("#location").val();
  console.log(`hi`);
  $.ajax({
    url: "/search",
    type: "GET",
    data: { location: location },
    dataType: "json",
    success: function(results) {
      var data = results.data;
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
      if (data.length == 0){

      }
      for (var i = 0; i < data.length; i++) {
        var result = data[i];
        var name = result.name;
        var lastName = result.last_name;
        var location = result.location;
        var telephone = result.telephone;
        var resultDiv = document.createElement("div");
        var nameElement = document.createElement("p");
        nameElement.innerHTML = "Name: " + name;
        var lastNameElement = document.createElement("p");
        lastNameElement.innerHTML = "Last name: " + lastName;
        var locationElement = document.createElement("p");
        locationElement.innerHTML = "Location: " + location;
        var telephoneElement = document.createElement("p");
        telephoneElement.innerHTML = "Telephone: " + telephone;
        resultDiv.appendChild(nameElement);
        resultDiv.appendChild(lastNameElement);
        resultDiv.appendChild(locationElement);
        resultDiv.appendChild(telephoneElement)
        resultsDiv.appendChild(resultDiv);

      }
    },
    
    error: function(xhr, status, error) {
      document.getElementById("results").innerHTML = "Error occurred while fetching data.";
      console.log("Error: " + error);
      $("#results").html("Error occurred while fetching data.");

    }
  });
}
