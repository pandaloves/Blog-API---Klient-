"use strict";
// Fetch the specific post
const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

async function fetchPost() {
      try {
      const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
      const data = await response.json();
      displayPost(data);
      }catch(error) {
        console.error('Error fetching post:', error);
      };
  }
 fetchPost();

// Show the specific post 
  function displayPost(post) {
    const postContainer = document.querySelector("#my-blog");
    const postElement = document.createElement("div");
    postElement.classList.add("post-container");
    postElement.innerHTML = `
      <h2 class="title">${post.title}</h2>
      <i class="author-date">${post.author} | ${post.date}</i>
      <p class="tag"><b>tags:</b> ${post.tags.join(", ")}</p>
      <p class="content">${post.content}</p>
      <a href="index.html"><p class="back">&#8592; back</p><a>
    `;
  
    postContainer.appendChild(postElement);
  }
  
    