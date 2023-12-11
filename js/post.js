"use strict";
// Fetch the specific post
const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

async function fetchPost() {
      try {
      const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Opps, something whent wrong!')
    }
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
    // Check if post.tags exists and if post.tags is not null or undefined
    const tag = () => {
    if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
    // Join the tags with ", "
    const tags = post.tags.join(", ");
    // return tags
    return tags;
    } else {
    // Deal with the case where tags are null, undefined, or an empty array
    return "";
    }
    }

    postElement.innerHTML = `
      <h2 class="title">${post.title}</h2>
      <i class="author-date">${post.author} | ${post.date}</i>
      <p class="tag"><b>tags:</b> ${tag()}</p>
      <p class="content">${post.content}</p>
      <a href="index.html"><p class="back">&#8592; back</p><a>
    `;
  
    postContainer.appendChild(postElement);
  }
  
    