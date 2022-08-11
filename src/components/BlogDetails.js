import { Button } from './FormHelper'
import { useState, useEffect } from 'react'
import { addLike, removeBlog } from './BlogActions'


export const BlogDetails = ({ blog, blogs, setBlogs, user, showSuccessMessage, showErrorMessage }) => {

  const [userIsBlogOwner, setUserIsBlogOwner] = useState(false)
  const [updatedLikes, setLikes] = useState(blog.likes)

  useEffect(() => {
    setUserIsBlogOwner(user.username === blog.user.username)
  }, [user.username, blog.user.username])


  const renderAuthor = (
    <li>
      <b> Author: </b> {blog.author}
    </li>
  )


  const renderUrl = (
    <li>
      <b> Url: </b> <a href={blog.url}> {blog.url} </a>
    </li>
  )


  const renderLikesAndLikeButton = (
    <li>
      <b> Likes: </b> {updatedLikes}
      {' '}
      <Button
        className='likeButton'
        type='button'
        onClick={() => addLike(blog, setLikes, showSuccessMessage, showErrorMessage)}
        text=' LIKE '
      />
    </li>
  )


  const renderBlogUser = (
    <li>
      <b> This blog was added by: </b> {blog.user.name}
    </li>
  )


  const renderRemoveButton = (
    <p> <Button
      className='deleteButton'
      type='button'
      onClick={() => removeBlog(blog, blogs, setBlogs, showSuccessMessage, showErrorMessage)}
      text=' REMOVE ' />
    </p>
  )



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
