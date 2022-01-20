document.addEventListener("DOMContentloaded", (event)=>{

    const likesButton = document.querySelector('.likes');

    let count = 4
    likesButton.addEventListener('click', e => {
        //e.preventDefault()
        // const postId = parseInt(req.params.id, 10)
        // const res = await fetch(`http://localhost:8080/hobbyposts/${postId}`)

        // const likes = await res.json()
        // const div = document.createElement('div')
        // const p = document.createElement('p')
        // document.body.append(div)
        // p.innerText = ' hello '
        // div.append(p)
        likesButton.innerText = `likes ${count}`

        // if(likes){
        //     count--
             //p.innerText = `likes ${count}`

        // }else {
        //     count++
            // p.innerText = `likes ${count}`

        // }
       //const form = document.querySelector('form')

    }


)})
