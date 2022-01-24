import { handleErrors } from "./utils.js";

document.addEventListener("DOMContentLoaded", async (e) => {



    const commentButton = document.querySelector('.submit-comment');
    const form = document.querySelector('.create-comment-form')
    //const divName = document.querySelector('.user-header')
    //console.log(divName.id)

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
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
        console.log(comment)

        let commentsBox = document.querySelector('.comments-container')


        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const h4 = document.createElement('h4')
        const newDiv = document.createElement('div')
        const a = document.createElement('a')
        a.setAttribute("href", `/hobbyposts/${comment.comment.hobbyPostId}/comments/${comment.comment.id}/edit`)
        const options = { month: 'short', day: 'numeric' }

        const createdDate = comment.comment.createdAt
        const newDate= new Date(`${createdDate}`)
        const displayDate= newDate.toLocaleDateString(undefined, options)

        h3.innerText = `${comment.user.firstName} ${comment.user.lastName}`
        h4.innerText = `${displayDate}`
        p.innerText = `${comment.comment.content}`
        a.innerText = `edit`
        newDiv.append(h3)
        newDiv.append(h4)
        newDiv.append(p);
        newDiv.append(a)



        const text = document.querySelector('textarea')
        text.value=''
        h3.style.color= 'goldenrod'
        h3.style.marginTop= '10px'
        h3.style.fontWeight= 'bold'
        newDiv.style.borderBottom = 'solid 1px rgb(211, 211, 211)'
        p.style.lineHeight= '1.6'

        a.style.display= 'flex'
        a.style.justifyContent= 'flex-end'
        a.style.fontFamily= 'Helvetica Neue, Helvetica, Arial, sans-serif'
        a.style.color= 'white'
        a.style.backgroundColor= 'black'
        a.style.border= 'solid 1px black'
        a.style.borderRadius= '50px'
        a.style.fontWeight= '1px'
        a.style.padding= '6px 10px'
        a.style.textAlign= 'center'
        a.style.textDecoration= 'none'
        a.style.marginTop= '5px'
        a.style.marginBottom= '10px'
        a.style.marginLeft= '600px'
        a.style.fontSize= '15px'


        // .edit-comment-btn{
            //     display: flex;
            //     justify-content: flex-end;
            //     font-family: sohne, Helvetica Neue, Helvetica, Arial, sans-serif;
            //     /* text-shadow: 0 1px #fff; */
            //     color: rgb(255, 255, 255);
            //     font-weight: 1px;
            //     border: black solid;
            //     border-radius: 50px;
            //     padding: 4px 8px;
            //     text-align: center;
            //     background-color: rgb(0, 0, 0);
            //     transition-duration: 00.2s;
            //     text-decoration: none;
            //     margin-top: 5px;
            //     margin-bottom: 10px;
            //     margin-left: 600px;
            // }
            commentsBox.prepend(newDiv)
            //}




        })
})
