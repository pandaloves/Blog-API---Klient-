"use strict";
// Fetch all the posts
async function fetchPosts() {
    try {
        const response = await fetch(`https://api.quotable.io/quotes`);
        if (!response.ok) {
            throw new Error('Opps, something whent wrong!')
        }
        const main = document.querySelector("main");
        const posts = document.createElement("div");  
        posts.classList.add("posts");
        main.appendChild(posts);
        posts.innerHTML = "";

        const data = await response.json();
        // Get the quote list in data
        data.results.forEach(quote => {
            const string = JSON.stringify(quote.content);
            const content = string.slice(0, 101);
            // Check if post.tags exists and if post.tags is not null or undefined
          const tag = () => {
            if (quote.tags && Array.isArray(quote.tags) && quote.tags.length > 0) {
             // Join the tags with ", "
             const tags = quote.tags.join(", ");
             // return tags
             return tags;
             } else {
             // Deal with the case where tags are null, undefined, or an empty array
             return "";
             }
            }
            posts.innerHTML += `
          <article class="post">
             <i class="post-author-date">${quote.author} | ${quote.dateAdded} </i>
             <p class="post-tag"><b>tags:</b> ${tag()}</p>
             <p class="post-content">${content}...<a href="post.html?id=${quote._id}" ><span class="read-more">read more</span></a></p>
          </article>
          `;  }
        )      
    }catch(error) {
     console.log('Error fetching post:', error);
    }
}
fetchPosts();
