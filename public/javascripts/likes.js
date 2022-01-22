    const likesButton = document.querySelector('.likes');
    const div = document.querySelector('.auth');

    if(likesButton){
    likesButton.addEventListener('click', async (e) => {
        // e.preventDefault()
        if(div){
            if(div.id === null) return;
        }

        const postId = likesButton.id
        const res = await fetch(`/hobbyposts/${postId}/likes`, {
            method: "POST"
        })

        const likes = await res.json()

        if (likes.status === 'liked'){
            // count++
            likesButton.innerText = likes.count
        } else {
            // count--
            likesButton.innerText = likes.count
        }
    })
}
