import { handleErrors } from "./utils.js";
const commentButton = document.querySelector('.submit-comment');
const form = document.querySelector('.create-comment-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('are we in ')
  const postId = commentButton.id
  const formData = new FormData(form)
  const content = formData.get('content')
  const body  = {content};
  const res = await fetch(`/hobbyposts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const comment = await res.json();
  const commentContainer = document.querySelector('.comments-body')
  // commentContainer.append(comment.comment.content)
  
})