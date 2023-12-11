"use strict";
// Create a post
async function createPost(e) {
  e.preventDefault();
  const form = e.target;
  try {
      const formData = new FormData(form);
      const data = {
          "title": formData.get('create-title-input'),
          "author": formData.get('create-author-input'),
          "content": formData.get('create-content'),
          "tags": formData.getAll('create-tags') 
      };
      await fetch(`https://blog-api-assignment.up.railway.app/posts`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      });
      location.replace('index.html'); 
  } catch (error) {
      console.log('Error fetching post:', error);
  }
}

document.getElementById('create-form').addEventListener("submit", createPost);

