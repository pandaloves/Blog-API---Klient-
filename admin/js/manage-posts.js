"use strict";
// Fetch the posts and put them into the correct places
async function fetchPosts() {
    try {
        const response = await fetch(`https://api.quotable.io/quotes`);
        if (!response.ok) {
            throw new Error('Opps, something whent wrong!')
        }
        const tableBody = document.querySelector(".table-body");
        tableBody.innerHTML = "";
        const data = await response.json();
        data.results.forEach(quote => {
            const postDate = new Date(quote.dateAdded);
            const year = postDate.getFullYear();
            var month = postDate.getMonth()+1;
            var date = postDate.getDate();
           
            month = month < 10 ? '0' + month : month;
            date = date < 10 ? '0' + date : date;
           
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

            tableBody.innerHTML += `
            <tr class="table-row">
          
               <td class="table-column">${quote.author}</td>
               <td class="table-column">${quote.content}</td>
               <td class="table-column">${tag()}</td>
               <td class="table-column">${year}-${month}-${date} </td>
               <td class="table-column">
                 <a href="#"  class="delete-links" data-id="${quote._id}">Delete</a>
               </td>    
            </tr>
            `; 
        });
    }catch(error) {
     console.log('Error fetching post:', error);
    }

    
   // The delete link
    async function deleteLink(e) {
        if(e.target && e.target.matches("[data-id]")) {
            const postId = e.target.dataset.id;
            try{
                await fetch(`https://api.quotable.io/quotes/${postId}`,  {
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
