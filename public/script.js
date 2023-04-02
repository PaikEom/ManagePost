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
}
//to close the update form 
const closeUpdate = document.querySelector('#close-update-form');
closeUpdate.onclick = function(){
  const update = document.querySelector('#update-row');
  update.hidden = true;
  closeUpdate.hidden = true;
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
  
  // hide the update form
  // const updateSection = document.querySelector('#update-row');
  // updateSection.hidden = true;
  // location.reload();
};
//Get the form element by id
// let postForm = document.getElementById("post-form");

// // when we submit the stuff 
// postForm.addEventListener("submit",async(e)=>{
//   //preventing the browser default behavior, aka reload
//   e.preventDefault();

//   let form = e.currentTarget;

  
//     // form fields instance
//     let formFields = new FormData(form)
//     let formDataObject = Object.fromEntries(formFields.entries());
//     fetch('/insert', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formDataObject)
//     })
//     .then(response => {
//       if (response.ok) {
//         location.reload();
//       } else {
//         console.log('Error updating row');
//       }
//     })
//     .catch(error => console.log(error));
//     // calling postFormFieldsAsJson() fucntion to send the data 

  

// });

// async function postFormFieldsAsJson({formData}){
//   // creating an object from the form data entries 
//   let formDataObject = Object.fromEntries(formData.entries());

//   // Format the plain form data as Json
//   // let formDataJsonString = JSON.stringify(formDataObject);

//   //setting the fetch options 
//   // let fetchOptions = {
//   //   method: 'POST',

//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     // Accept: "application/json",
//   //   },
//   //   // Post request body as JSON string. 
//   //   body: formDataJsonString,
//   // };


//   // //Get the response body as JSON
//   // let res = await fetch(url,fetchOptions);

//   // // checking for errors
//   // if(!res.ok){
//   //   let error = await res.text();
//   //   throw new Error(error);
//   // }
//   // if(res.ok){
//   //   location.reload();
//   fetch('/insert', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formDataObject)
//   })
//   .then(response => {
//     if (response.ok) {
//       location.reload();
//     } else {
//       console.log('Error updating row');
//     }
//   })
//   .catch(error => console.log(error));
  
//   // hide the update form
//   // const updateSection = document.querySelector('#update-row');
//   // updateSection.hidden = true;
//   // location.reload();
//   }

  





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