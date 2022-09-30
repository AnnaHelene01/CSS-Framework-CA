// REGISTER USER TEST
//Hente ut elementer
const form = document.querySelector("form#registerForm");
const usernameInput = document.querySelector("input#inputUsername");
const emailInput = document.querySelector("input#inputEmail");
const passwordInput = document.querySelector("input#inputPassword");
const submitButton = document.querySelector("button#submitBtn")

console.log(form, usernameInput, emailInput, passwordInput, submitButton);

//Get form-data on the register btn, validate and process
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("You've pressed submit bro");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
})

/**
 * Endpoints
 */
 const APIurl = "https://nf-api.onrender.com/api/v1";
 const registerEndpoint = "/social/auth/register"; // POST
 const loginEndpoint = "/social/auth/login"; // POST
 const allPostsEndpoint = "/social/posts"; // GET
 
 
 const registerUrl = `${APIurl}${registerEndpoint}`;
 //console.log(registerUrl);
 const newUserData = {
     name: "anna",
     email: "YOUR NOROFF MAIL",
     password: "YOUR PASSWORD",
 }
 
 /**
  * Register new user, this can only be run once for each new user
  * @param {string} url URL to API endpoint
  * @param {object} data Object with data for new user
  */
 async function registerNewUser(url, data) {
     try {
         const options = {
             method: 'POST', 
             headers: {
                 'Content-Type': 'application/json', 
             },
             body: JSON.stringify(data),
         };
         console.log(url, data, options);
     
         const response = await fetch(url, options);
         console.log(response);
         const answer = await response.json();
         console.log(answer); 
     } catch(error) {
         console.warn(error);
     }
 }
 
 //registerNewUser(registerUrl, newUserData);
 
 // Success with user id 1131
 
 /**
  * Login Demo
  * Docs: https://noroff-api-docs.netlify.app/social-endpoints/authentication#login
  */
 const loginURL = `${APIurl}${loginEndpoint}`;
 
 const loginData = {
     email: "YOUR NOROFF MAIL",
     password: "YOUR PASSWORD",
 }
 
 /**
  * Login an existing user and set access token in Local Storage
  * @param {string} url URL to API endpoint
  * @param {object} data Object with data for user to be logged in
  */
 async function loginUser (url, data) {
     try {
         const options = {
             method: 'POST', 
             headers: {
                 'Content-Type': 'application/json', 
             },
             body: JSON.stringify(data),
         };
         console.log(url, data, options);
 
         const resonse = await fetch(url, options); 
         console.log(resonse);
         const answer = await resonse.json();
         console.log(answer);
 
         localStorage.setItem('username', answer.name);
         localStorage.setItem('accessToken', answer.accessToken);
 
     } catch(error) {
         console.warn(error);
     }
 }
 
 //loginUser(loginURL, loginData);