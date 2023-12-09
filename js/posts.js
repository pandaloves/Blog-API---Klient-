"use strict";

async function fetchPosts() {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/`);
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
          posts.innerHTML += `
          <article class="post">
             <h3 class="post-title">${post.title}</h3>
             <i class="post-author-date"><b>${post.author}</b> | ${post.date} </i>
             <p class="post-tag"><b>tags:</b> ${post.tags.join(", ")}</p>
             <p class="post-content">${post.content.slice(0, 101)}...<a href="post.html?id=${post._id}" ><span class="read-more">read more</span></a></p>
          </article>
          `;  }
    }catch(error) {
     console.log('Error fetching post:', error);
    }
}
fetchPosts();
