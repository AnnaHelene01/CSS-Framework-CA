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
//<button class="btn btn-outline-primary" id="btnDelete">
    //   <img src="./images/icons8-trash-25.png" class="img-fluid">
  //     <a href="profile.html" class="text-decoration-none">DELETE</a>
//</img></button>
getAllPosts(getAllPostsURL);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";
    for (let post of list) {
        //console.log(card);
        const delBtn = `<button class="btnDelete" data-delete="${post.id}">DELETE</button>`;
        const updateBtn = `<button class="btnUpdate" data-update="${post.id}">UPDATE</button>`;
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
                     </div>
               </div>
            </div>
          </div>
        </div>`;
    }
    out.innerHTML = newDivs;
    const btns = document.querySelectorAll("button.btnDelete");
    console.log(btns);
    for (let btnDelete of btns){
         btnDelete.addEventListener("click", () => {
            console.log(btnDelete.getAttribute('data-delete'));
            if ( confirm('Er du heeeeeeeelt skikker på dette?')){
                deletePost(btnDelete.getAttribute('data-delete'));
            }
      }) 
    }


  
}



// DELETE POST
const btnDelete = document.getElementById("btnDelete");
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

//deletePost(deleteURL);





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
    if (response.status === 200) window.location='./main.html';
    } catch(error) {
        console.warn(error);
    }
}

//createNewPost(createPost);

submitPost.addEventListener("click", () => {
    
       createNewPost(createPost);
});


