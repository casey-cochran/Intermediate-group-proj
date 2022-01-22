import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", async (e) => {



    const commentButton = document.querySelector('.submit-comment');
    const form = document.querySelector('.create-comment-form')
    //const divName = document.querySelector('.user-header')
    //console.log(divName.id)

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        console.log('are we in ')
        const postId = commentButton.id
        const formData = new FormData(form)
        const content = formData.get('content')
        const body = { content };
        const res = await fetch(`/hobbyposts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const comment = await res.json();

        let commentsBox = document.querySelector('.comments-box')

        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const h4 = document.createElement('h4')
        const newDiv = document.createElement('div')
        const options = { month: 'short', day: 'numeric' }

        const time = comment.comment.createdAt()
        time.toLocaleDateString(undefined, options)

        h3.innerText = `${comment.user.firstName} ${comment.user.lastName}`
        h4.innerText = `${time}`
        p.innerText = `${comment.comment.content}`
        newDiv.append(h3)
        newDiv.append(h4)
        newDiv.append(p);



        const text = document.querySelector('textarea')
        text.value=''
        h3.style.color= 'black'
        h3.style.marginTop= '10px'
        newDiv.style.borderBottom = 'solid 1px rgb(211, 211, 211)'

        commentsBox.prepend(newDiv)
        //}




    })
})
