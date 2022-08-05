import { useState } from 'react'
import { Button } from './FormHelper'
import blogService from '../services/blogs'


export const Blog = ({ blog }) => {

  const [detailsShown, setDetailsShown] = useState(false)
  const toggleShowBlogDetails = () => setDetailsShown(!detailsShown)
  const [updatedLikes, setLikes] = useState(blog.likes)


  const findBlogAddUser = async (blogId) => {
    console.log('teen tämän aina')
    const allBlogs = await blogService.getAll()
    const blogToUpdate = allBlogs.find(n => n.id === blogId)

    return (
      { ...blogToUpdate, user: blogToUpdate.user.id }
    )
  }

  const addLike = (blogId) => {
    const blogWithUser = findBlogAddUser(blogId)

    blogService
      .updateLike(blogId, blogWithUser)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
        console.log(`You liked blog ${returnedBlog.title} which has now ${returnedBlog.likes} likes `)
      })
      .catch(error => {
        console.log('something went wrong, please log in')
      })
  }

  const blogButtonStyle = {
    borderRadius: '10px',
    cursor: 'pointer',
    width: '75%',
    textAlign: 'left',
    fontSize: '16px',
  }

  const likeButtonStyle = {
    cursor: 'pointer'
  }

  const RenderBlogDetails = ({ blog }) => {
    return (
      <div>
        <ul>
          <li>
            <b>Author: </b> {blog.author}
          </li>
          <li>
            <b>Url: </b> <a href={blog.url}> {blog.url} </a>
          </li>
          <li>
            <b>Likes: </b> {updatedLikes} {' '}
            <Button
              style={likeButtonStyle}
              onClick={() => addLike(blog.id)}
              text=' like '
            />
          </li>
          <li>
            <b>This blog was added by: </b> {blog.user.name}
          </li>
        </ul>
      </div>
    )
  }


  return (
    <div>
      <Button
        style={blogButtonStyle}
        onClick={toggleShowBlogDetails}
        text={blog.title}
      />

      {detailsShown && <RenderBlogDetails key={blog.title} blog={blog} />}

    </div >
  )
}

