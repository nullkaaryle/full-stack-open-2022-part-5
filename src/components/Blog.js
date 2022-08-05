import { useState, useEffect } from 'react'
import { Button } from './FormHelper'
import blogService from '../services/blogs'


export const Blog = ({ blog, showSuccessMessage, showErrorMessage, user, removeBlog }) => {

  const [detailsShown, setDetailsShown] = useState(false)
  const toggleShowBlogDetails = () => setDetailsShown(!detailsShown)
  const [updatedLikes, setLikes] = useState(blog.likes)
  const [userIsBlogOwner, setUserIsBlogOwner] = useState(false)

  useEffect(() => {
    setUserIsBlogOwner(user.username === blog.user.username)
  }, [user.username, blog.user.username])


  const addLike = (blog) => {
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

  const RenderBlogDetails = ({ blog }) => {
    const renderAuthor = <li> <b>Author: </b> {blog.author} </li>
    const renderUrl = <li> <b> Url: </b> <a href={blog.url}> {blog.url} </a> </li>
    const renderLikesAndLikeButton = <li> <b> Likes: </b> {updatedLikes} {' '} <Button className='likeButton' onClick={() => addLike(blog)} text=' LIKE ' /> </li>
    const renderBlogUser = <li> <b> This blog was added by: </b> {blog.user.name} </li>
    const renderRemoveButton = <p> <Button className='deleteButton' onClick={() => removeBlog(blog)} text=' REMOVE ' /> </p>

    return (
      <div>
        <ul>
          {renderAuthor}
          {renderUrl}
          {renderLikesAndLikeButton}
          {renderBlogUser}
          {userIsBlogOwner && renderRemoveButton}
        </ul>
      </div >
    )
  }


  return (
    <div>
      <Button
        className='blogButton'
        onClick={toggleShowBlogDetails}
        text={blog.title}
      />

      {detailsShown && <RenderBlogDetails key={blog.id} blog={blog} />}

    </div >
  )
}



