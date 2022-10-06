//Hente alle poster - method: GET
// Endpoints
const API_BASE_URL = "https://nf-api.onrender.com";
const allPostsEndpoint = '/api/v1/social/posts?_author=true&_comments=true&_reactions=true';


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
                         <p><strong>@${post.author.name}</strong></p>
                         <h2>${post.title}</h2>
                         <p>${post.body}</p>
                         <img src="${post.media}" class="img-fluid" alt="">
                         <a href="post-details.html?id=${post.id}"><p>Click to read more</p></a>
                      <div>
                        <button class="btn btn-primary">
                          <img src="./images/icons8-update-30.png" class="img-fluid w-25">
                          <a href="login.html" class="text-white text-decoration-none">UPDATE</a>
                        </button>
                        <button class="btn btn-outline-primary">
                        <img src="./images/icons8-trash-25.png" class="img-fluid">
                        <a href="profile.html" class="text-decoration-none">DELETE</a>
                        </button>
                     </div>
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

//Hente create post verdier:
const form = document.getElementById("create-container");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const submitPost = document.getElementById("submitPost");


//Create a new post - method: POST
const createPost = `${API_BASE_URL}${allPostsEndpoint}`;

async function createNewPost (url, data) {
    const postData = {
        title: postTitle.value,
        body: postContent.value
       };

    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'POST', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(postData),
        };
        console.log(url, data, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);

    } catch(error) {
        console.warn(error);
    }
}

createNewPost(createPost);

submitPost.addEventListener("click", () => {
    
       createNewPost(createPost);
});



