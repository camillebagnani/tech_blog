async function editPost(event) {
    event.preventDefault();

    const blogTitle = document.querySelector('#blog-title').value;
    const blogContent = document.querySelector('#blog-content').value;
    const blogDataSet = document.querySelector('#blog-title');
    const blog_id = blogDataSet.dataset.id;

    const response = await fetch(`/api/editpost/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blogTitle,
            blogContent
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#update-btn').addEventListener('click', editPost);