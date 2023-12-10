"use strict";
// Get the post's id
const urlParams = new URLSearchParams(location.search);
const postId =urlParams.get('id');
// Fetch the content of the original post
async function fetchPost() {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();
        console.log(post);

        document.getElementById('title-input').value = post.title;
        document.getElementById('author-input').value = post.author;
        document.getElementById('create-content-textarea').value = post.content;
        const select = document.getElementById('create-tags-select');
        const options = select.options;
        for (let option of options) {
            if (post.tags.includes(option.value)) {
                option.selected = true;
            }else {
              console.log("Without the choices.")
            }
        }
    } catch(error) {
        console.log('Error fetching post:', error)
    }  
}

fetchPost();

// Update the content of the post
async function updatePost(e) {
  e.preventDefault();
  let form = e.target;
  try {
      let formData = new FormData(form);
      let data = {
          "title": formData.get('create-title-input'),
          "author": formData.get('create-author-input'),
          "content": formData.get('create-content'),
          "tags": formData.getAll('create-tags') 
      };
      await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
          method: "PATCH",
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

document.getElementById('update-form').addEventListener('submit', updatePost);

