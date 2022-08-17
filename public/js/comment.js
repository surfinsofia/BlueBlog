// this function will make a post request to the comment route endpoint and create a route with the logged in users ID
async function leaveComment(event) {
    event.preventDefault();

    const comment_text = document.querySelector("#commentTextArea").value.trim();
    // since the comment is made on a post endpoint which ends up the posts ID, we are splitting the specific value and saving it as the post_id
    const post_id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

    if (comment_text) {
        const comment = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text, post_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (comment.ok) {
            document.location.reload();
        } else {
            alert("Comment submission failed!")
        }
    }
}

document.querySelector(".commentButton").addEventListener('click', leaveComment)