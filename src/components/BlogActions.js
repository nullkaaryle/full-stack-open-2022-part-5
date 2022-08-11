import blogService from '../services/blogs'


export const addLike = (blog, setLikes, showSuccessMessage, showErrorMessage) => {
  blogService
    .updateLike(blog.id, blog)
    .then(returnedBlog => {
      setLikes(returnedBlog.likes)
      showSuccessMessage(`You liked blog "${returnedBlog.title}" which has now ${returnedBlog.likes} likes in total!`)
    })
    .catch(error => {
      showErrorMessage('sorry, something went wrong: ' + error.response.data.error)
    })
}


export const removeBlog = (blog, blogs, setBlogs, showSuccessMessage, showErrorMessage) => {
  const blogId = blog.id
  const blogTitle = blog.title

  if (window.confirm(`Remove ${blogTitle}?`)) {

    blogService
      .remove(blogId)
      .then(() => {
        showSuccessMessage(`You removed blog "${blogTitle}"`)
        setBlogs(blogs.filter(n => n.id !== blogId))
      })
      .catch(error => {
        showErrorMessage('You cannot remove blogs added by another user: ' + error.response.data.error)
      })

  }
}
