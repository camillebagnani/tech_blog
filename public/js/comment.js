const addComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment');
    const comment_content = comment.value.trim(); 
    const blog_id = comment.dataset.id;

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment_content,
            blog_id,
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.reload();
    } else {
        document.location.replace('/login')
    };
    
};

document.querySelector('#submit').addEventListener('click', addComment);