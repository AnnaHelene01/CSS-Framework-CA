//Hente alle poster - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const allPostsEndpoint = '/api/v1/social/posts';


const getAllPostsURL = `${API_BASE_URL}${allPostsEndpoint}`;
//let posts = [];

async function getAllPosts (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        //posts = posts.post;
        console.log(posts);
        listData(posts, outElement)
    } catch(error) {
        console.warn(error);
    }
}

getAllPosts(getAllPostsURL);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    //console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";
    for (let post of list) {
        //console.log(card);
        newDivs += `<div class="col mb-5">
          <div class="card h-100">
            <div class="card-body p-4">
               <div class="text-center">
                  <h2>${post.title}</h2>
                  <p>From: ${post.body}</p>
                  <img src="${post.media}" class="img-fluid">
               </div>
            </div>
          </div>
        </div>`;
    }
    out.innerHTML = newDivs;
}

//const inputField = document.getElementById("queryString");
//inputField.addEventListener("keyup", filterPosts);

//function filterPosts () {
    //const filterQuery = inputField.value;
    //console.log(filterQuery);
    //console.log(posts.length);

    //const filtered = posts.filter((post)=> {
      //  return post.name.toUpperCase().indexOf(filterQuery.toUpperCase()) > -1;
    //})

  //  listData(filtered, outElement);
//}


//Create a new post - method: POST
const createPost = `${API_BASE_URL}${allPostsEndpoint}`;

async function createNewPost (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);

    } catch(error) {
        console.warn(error);
    }
}

createNewPost(createPost);