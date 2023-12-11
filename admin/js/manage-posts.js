"use strict";
// Fetch the posts and put them into the correct places
async function fetchPosts() {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts`);
        if (!response.ok) {
            throw new Error('Opps, something whent wrong!')
        }
        const data = await response.json();
        console.log(data);
        const tableBody = document.querySelector(".table-body");
        tableBody.innerHTML = "";
        for(let post of data) {
            console.log(post);
            const postDate = new Date(post.date);
            const year = postDate.getFullYear();
            var month = postDate.getMonth()+1;
            var date = postDate.getDate();
            var hour = postDate.getHours();
            var minute = postDate.getMinutes();
            month = month < 10 ? '0' + month : month;
            date = date < 10 ? '0' + date : date;
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
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

            tableBody.innerHTML += `
          <tr class="table-row">
             <td class="table-column">${post.title}</td>
             <td class="table-column">${post.author}</td>
             <td class="table-column">${tag()}</td>
             <td class="table-column">${year}-${month}-${date} ${hour}:${minute}</td>
             <td class="table-column">
                 <a href="update-post.html?id=${post._id}" class="update">Update</a><br>|
                 <br><a href="#"  class="delete-links" data-id="${post._id}">Delete</a>
             </td>    
          </tr>
          `;  }
    }catch(error) {
     console.log('Error fetching post:', error);
    }
   // The delete link
    async function deleteLink(e) {
        if(e.target && e.target.matches("[data-id]")) {
            const postId = e.target.dataset.id;
            try{
                await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`,  {
                    method: "DELETE", 
                  }); 
                e.target.parentNode.parentNode.remove();
            }catch(error) {
                console.log('Error fetching post:', error);
            }
        }
    }
  document.addEventListener('click', deleteLink);
  
}
fetchPosts();
