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
    console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    const welcome = localStorage.getItem('username');
    const htmlUsername = document.getElementById('html-username');

    htmlUsername.innerHTML = welcome;

    for (let post of list) {
        //console.log(card);
        const delBtn = `<button class="btnDelete btn btn-outline-primary" data-delete="${post.id}">DELETE</button>`;
        const updateBtn = `<button class="btnUpdate btn btn-primary text-white" data-update="${post.id}">UPDATE</button>`;
        newDivs += `<div class="col mb-5">
               <div class="card h-100">
                  <div class="card-body p-4">
                      <div class="text-center">
                        <div class="d-flex">
                           <div class="col-6">
                             <p><strong>@${post.author.name}</strong></p>
                           </div>
                           <div class="col-6">
                             <p>${post.created}</p>
                           </div>
                        </div>
                         <h2>${post.title}</h2>
                         <p>${post.body}</p>
                         <img src="${post.media}" class="img-fluid" alt="">
                         <a href="post-details.html?id=${post.id}"> <p>Click to read more</p></a>
                      <div>
                        ${localStorage.getItem('username') === post.author.name ? delBtn : ""}
                        ${localStorage.getItem('username') === post.author.name ? updateBtn : ""}
                     </div>
               </div>
            </div>
          </div>
        </div>`;
    }
    out.innerHTML = newDivs;
    //Delete posts
    const btns = document.querySelectorAll("button.btnDelete");
    console.log(btns);
    for (let btnDelete of btns){
         btnDelete.addEventListener("click", () => {
            console.log(btnDelete.getAttribute('data-delete'));
            if ( confirm('Are you totally sure?')){
                deletePost(btnDelete.getAttribute('data-delete'));
            }
      }) 
    }
    //Update posts
    const updatebtns = document.querySelectorAll("button.btnUpdate");
    console.log(updatebtns);
    for (let btnUpdate of updatebtns) {
        btnUpdate.addEventListener("click", () => {
            console.log(btnUpdate.getAttribute('data-update'));
        })
    }

    //Filtrere posts / search input
    const inputField = document.getElementById("queryString");
    inputField.addEventListener("keyup", filterPosts);

    function filterPosts () {
        const filterPosts = inputField.value;
        console.log(filterPosts);
        console.log(list.length);

        const filtered = list.filter((post)=> {
            console.log(post.title, filterPosts);
            console.log(post.title.toUpperCase().indexOf(filterPosts.toUpperCase()) > -1);
            //return post.name.toUpperCase().indexOf(filterPosts.toUpperCase()) > -1;
        })

        listData(filtered, outElement);
    }
}


// UPDATE POST
const updateEndPoint = '/api/v1/social/posts/'; 
const updateURL = `${API_BASE_URL}${updateEndPoint}`;

async function updatePost (id) {
    console.log(id);
    const upUrl = `${updateURL}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'PUT', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        console.log(upUrl, options);

        const response = await fetch(upUrl, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        if (response.status === 200) window.location = './main.html';
    } catch(error) {
         console.warn(error);
    }
}


// DELETE POST
const deleteEndPoint = '/api/v1/social/posts/'; 
const deleteURL = `${API_BASE_URL}${deleteEndPoint}`;

async function deletePost (id) {
    console.log(id);
    const url = `${deleteURL}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'DELETE', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        console.log(url, options);

        const response = await fetch(url, options); 
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        if (response.status === 200) window.location = './main.html';
    } catch(error) {
         console.warn(error);
    }
}












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
    if (response.status === 200) window.location='./main.html';
    } catch(error) {
        console.warn(error);
    }
}

//createNewPost(createPost);

submitPost.addEventListener("click", () => {
    
       createNewPost(createPost);
});