"use strict";
// Fetch the specific post
// Get the id parameter from the URL


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

async function fetchPost() {
      try {
      const response = await fetch(`https://api.quotable.io/quotes/${postId}`);
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
   
      <i class="author-date">${post.author} | ${post.dateAdded}</i>
      <p class="tag"><b>Tags:</b> ${tag()}</p>
      <p class="content">${post.content}</p>
      <a href="index.html"><p class="back">&#8592; back</p><a>
    `;
  
    postContainer.appendChild(postElement);
  }
  
    