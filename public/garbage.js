// document.addEventListener('DOMContentLoaded', function () {
//   fetch('http://localhost:3000/info')
//   .then(response => response.json())
//   .then(data => loadHTMLTable(data['data']));
  
// });




// this is to load the data from the database 
// function loadHTMLinfo(data){
//   const table = document.querySelector('table tbody');
//   if (data.length=== 0){
//     table.innerHTML = "<tr><td class 'no_data' colspan='8'> NO Posts </td></tr>";
//     return;
//   }
//   let tablePost = "";

//   data.forEach(function ({name,last_name,location,lenght,width,price,telephone,about}){
//       tablePost += "<tr>";
//       tablePost += `<td>${name}</td>`;
//       // tablePost += `<td>${last_name}</td>`;
//       // tablePost += `<td>${location}</td>`;
//       // tablePost += `<td>${lenght}</td>`;
//       // tablePost += `<td>${width}</td>`;
//       // tablePost += `<td>${price}</td>`;
//       // tablePost += `<td>${telephone}</td>`;
//       // tablePost += `<td>${about}</td>`;
//       //tablePost += `<td><button class="delete-row-btn" data-id=${name}>Delete</td>`;
//       //tablePost += `<td><button class="edit-row-btn" data-id=${name}>Edit</td>`;
//       tablePost += "</tr>";
//   });
//   table.innerHTML = tablePost;

// }




//submitUrl= 'http://localhost:3000/insert'
// Get the form and submit button elements from the HTML

// const submitBtn = document.querySelector('#submitBtn');

// Add an event listener to the submit button
// submitBtn.addEventListener('click', () => {
//   // Prevent the default form submission behavior
//   // event.preventDefault();

//   // Get the input values from the form
//   const name = document.querySelector('#name').value;
//   const lastName = document.querySelector('#lastname').value;
//   const location = document.querySelector('#location').value;
//   const length = document.querySelector('#length').value;
//   const width = document.querySelector('#width').value;
//   const price = document.querySelector('#price').value;
//   const telephone = document.querySelector('#telephone').value;
//   const about = document.querySelector('#about').value;
//   document.querySelector('#name').value = "";
//   document.querySelector('#lastname').value= "";
//   document.querySelector('#location').value= "";
//   document.querySelector('#length').value= "";
//   document.querySelector('#width').value= "";
//   document.querySelector('#price').value= "";
//   document.querySelector('#telephone').value= "";
//   document.querySelector('#about').value= "";
//   // Create a data object with the input values
//   const data = {
//     name: name,
//     last_name: lastName,
//     location: location,
//     length: length,
//     width: width,
//     price: price,
//     telephone: telephone,
//     about: about
//   };

//   // Send a POST request to the API endpoint with the data object as the request body
//   fetch(submitUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

//   //cleaning the input fields 
  
// });
// function getInputValueAndClear(id) {
//   const inputElement = document.querySelector(`#${id}`);
//   const inputValue = inputElement.value;
//   inputElement.value = "";
//   return inputValue;
// }

// submitBtn.onclick = function () {
//   const name = getInputValueAndClear('name');
//   const last_name = getInputValueAndClear('lastname');
//   const price = getInputValueAndClear('price');
//   const location = getInputValueAndClear('location');
//   const length = getInputValueAndClear('length');
//   const width = getInputValueAndClear('width');
//   const telephone = getInputValueAndClear('telephone');
//   const about = getInputValueAndClear('about');

//   // use the extracted input values here
//   fetch(submitUrl, {
//       headers: {
//           'Content-type': 'application/json'
//       },
//       method: 'POST',
//       body: JSON.stringify({ 
//         name : name,
//         last_name: last_name,
//         location: location,
//         length:length,
//         width: width,
//         price: price,
//         telephone: telephone,
//         about: about
//       })
//   })
//   .then(response => response.json())
//   // .then(data => insertRowIntoTable(data['data']));
// };

// function insertRowIntoTable(data) {
//   console.log(data);
//   const table = document.querySelector('table tbody');
//   const isTableData = table.querySelector('.no-data');

//   let tableHtml = "<tr>";

//   for (var key in data) {
//       if (data.hasOwnProperty(key)) {
//           if (key === 'dateAdded') {
//               data[key] = new Date(data[key]).toLocaleString();
//           }
//           tableHtml += `<td>${data[key]}</td>`;
//       }
//   }

//   tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
//   tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

//   tableHtml += "</tr>";

//   if (isTableData) {
//       table.innerHTML = tableHtml;
//   } else {
//       const newRow = table.insertRow();
//       newRow.innerHTML = tableHtml;
//   }
// }


// to insert all the information 
  // async insertNewInfo(name,last_name,location,length,width,price,telephone,about){
  //   try {
  //     const insertID = await new Promise((resolve,reject)=>{
  //       const query = "INSERT INTO posts (name,last_name,location,length,width,price,telephone,about) VALUES (?,?,?,?,?,?,?,?);";

  //       database.query(query,[name,last_name,location,length,width,price,telephone,about],(err,result)=>{
  //         if(err) reject(new Error(err.message));
  //         resolve(result.insertID);
          
  //       })
  //     }) ;

  //     return {
  //       name: name,
  //       last_name: last_name,
  //       location: location,
  //       length: length,
  //       width: width,
  //       price: price,
  //       telephone: telephone,
  //       about: about
  //     };

  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }

  const printBtn = document.querySelector('#print-btn');

  printBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    console.log(`Hello, ${nameInput.value}!`);
  };
  