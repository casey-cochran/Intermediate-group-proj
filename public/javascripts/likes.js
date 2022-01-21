    const likesButton = document.querySelector('.likes');

    likesButton.addEventListener('click', async (e) => {
        // e.preventDefault()
        const postId = likesButton.id
        const res = await fetch(`/hobbyposts/${postId}/likes`, {
            method: "POST"
        })

        const likes = await res.json()

        if (likes.status === 'liked'){
            // count++
            likesButton.innerText = `Shaka'd ${likes.count}`
        } else {
            // count--
            likesButton.innerText = `Shaka ${likes.count}`
        }
    })

