async function deletePost(event) {
    if (event.target.hasAttribute('type')) {
        const selectedBlog = document.querySelector('#blog-title');
        const id = selectedBlog.dataset.id;


        const response = await fetch(`/api/editpost/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post.')
        }
    }
};

const deleteButton = document.querySelector('#delete-btn');

deleteButton.addEventListener('click', deletePost);