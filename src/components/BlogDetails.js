import { Button } from './FormHelper'
import { useState, useEffect } from 'react'
import { addLike, removeBlog } from './BlogActions'

// Returns details of one blog
// Button functions for adding like and removing the blog (addLike and removeBlog)
// are imported from BlogActions
export const BlogDetails = ({ blog, blogs, setBlogs, user, showSuccessMessage, showErrorMessage }) => {

  const [userIsBlogOwner, setUserIsBlogOwner] = useState(false)
  const [updatedLikes, setLikes] = useState(blog.likes)

  // This effect is not run every time this component is rendered
  // which is the default behaviour for useEffect
  // if no dependency array is not given as second argument.
  // Instead it is run every time the logged in user or blog owner changes
  // because here we give them as second arguments in the array.
  // After rendering this component React will check if user's or blog owner's
  // username is different than in the last render.
  // If there is a change, then this effect will be applied.
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


  // removeButton is only rendered only if the user is the blog owner
  // (blog owner = the one who added the blog originally)
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
