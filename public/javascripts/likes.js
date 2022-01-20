// document.addEventListener("DOMContentloaded", (event)=>{

    const likesButton = document.querySelector('.likes');

    let count = 4
    likesButton.addEventListener('click', async (e) => {
        // e.preventDefault()
        const postId = likesButton.id
        console.log(postId)
        const res = await fetch(`/hobbyposts/${postId}/likes`, {
            method: "POST"
        })

        const likes = await res.json()
        console.log('we made it!')
        const div = document.createElement('div')
        const p = document.createElement('p')
        document.body.append(div)
        p.innerText = ' hello '
        div.append(p)
        likesButton.innerText = `likes ${count}`

        if(likes){
            count--
             p.innerText = `likes ${count}`

        }else {
            count++
            p.innerText = `likes ${count}`

        }
       const form = document.querySelector('form')

    }


)
// })
