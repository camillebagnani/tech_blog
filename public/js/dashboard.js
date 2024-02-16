async function createPost(event) {
    event.preventDefault();

    const blogTitle = document.querySelector('#blog-title').value;
    const blogContent = document.querySelector('#blog-content').value;
    
    const response = await fetch('api/dashboard', {
        method: 'POST',
        body: JSON.stringify({
            blogTitle,
            blogContent
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const newPostForm = document.querySelector('.new-post-container');
    newPostForm.classList.add('hidden');

    const blogPostContainer = document.querySelector('.blog-post-container');
    blogPostContainer.classList.remove('hidden');
    console.log('location',location)
    console.log('location.href', location.href)
    location.reload();
    
};

const showForm = () => {
    const newPostForm = document.querySelector('.new-post-container');
    newPostForm.classList.remove('hidden');

    const blogPostContainer = document.querySelector('.blog-post-container');
    blogPostContainer.classList.add('hidden');
}

document.querySelector('#new-post-btn').addEventListener('click', showForm)
document.querySelector('#create-btn').addEventListener('click', createPost)