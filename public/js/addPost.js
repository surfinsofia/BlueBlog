// then a new post is created, it will make a post request to the post route and create the post with the logged in users ID
async function newPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postText').value.trim();

    if (title && post_text) {
        const post = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title, post_text
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (post.ok) {
            // this will reload the page, so the new post is displayed
            document.location.reload();
        } else {
            alert("Please try again to create a post!")
        }
    }
}

document.querySelector(".newPostBtn").addEventListener("click", newPost)