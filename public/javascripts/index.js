import { handleErrors } from "./utils.js";

const fetchComments = async () => {
    const res = await fetch("http://localhost:8080/hobbyposts/:id(\\d+)");
    if (res.status === 401) {
      window.location.href = "/";
      return;
    }
    const { comment } = await res.json();
    const commentsContainer = document.querySelector(".comments-container");
  };

const form = document.querySelector(".create-comment-form");

form.addEventListener("submit", async (event) => {
    
    console.log("hello from javascript!")
})
