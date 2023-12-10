"use strict";
// Fetch all the posts
async function fetchPosts() {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts`);
        if (!response.ok) {
            throw new Error('Opps, something whent wrong!')
        }
        const data = await response.json();
        console.log(data);
        const main = document.querySelector("main");
        const posts = document.createElement("div");  
        posts.classList.add("posts");
        main.appendChild(posts);
        posts.innerHTML = "";
        for(let post of data) {
          console.log(post);
          const string = JSON.stringify(post.content);
          const content = string.slice(0, 101);
          posts.innerHTML += `
          <article class="post">
             <h3 class="post-title">${post.title}</h3>
             <i class="post-author-date">${post.author} | ${post.date} </i>
             <p class="post-tag"><b>tags:</b> ${post.tags}</p>
             <p class="post-content">${content}...<a href="post.html?id=${post._id}" ><span class="read-more">read more</span></a></p>
          </article>
          `;  }
    }catch(error) {
     console.log('Error fetching post:', error);
    }
}
fetchPosts();
