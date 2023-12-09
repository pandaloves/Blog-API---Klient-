"use strict";

async function fetchPosts() {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/`);
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
            tableBody.innerHTML += `
          <tr class="table-row">
             <td class="table-column">${post.title}</td>
             <td class="table-column">${post.author}</td>
             <td class="table-column">${post.tags.join(", ")}</td>
             <td class="table-column">${year}-${month}-${date} ${hour}:${minute}</td>
             <td class="table-column">
                 <a href="update-post.html?id=${post._id}" class="update">Update</a><br>|
                 <br><a href="#"  class="delete-links" data-id="${post._id}">Delete</a>
             </td>    
          </tr>
          `;  }
    }catch(error) {
     console.log(error);
    }

    async function deleteLink(e) {
        if(e.target && e.target.matches("[data-id]")) {
            let postId = e.target.dataset.id;
            try{
                await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`,  {
                    method: "DELETE", // GET, POST, PATCH, DELETE, etc.
                  }); 
                e.target.parentNode.parentNode.remove();
            }catch(error) {
                console.log('Error fetching blog:', error);
            }
        }
    }
  document.addEventListener('click', deleteLink);
  
}
fetchPosts();
