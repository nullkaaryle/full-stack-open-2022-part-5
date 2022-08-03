import { useState } from 'react'
import { Button } from './FormHelper'

// defines how the individual blogs are rendered in the list
// uses detailsShown boolean as a check
// if also the blog details should be shown in the list
// user toggles the blog details by pressing a button
export const Blog = ({ blog }) => {

  const [detailsShown, setDetailsShown] = useState(false)
  const toggleShowBlogDetails = () => setDetailsShown(!detailsShown)

  const blogStyle = {
    borderRadius: '10px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    fontSize: '16px',
  }


  // renders the detailed information of one blog
  const RenderBlogDetails = ({ blog }) => {
    return (
      <div>
        <p> <b>Author: </b> {blog.author} </p>
        <p> <b>Url: </b> <a href={blog.url}> {blog.url} </a> </p>
        <p> <b>Likes: </b> {blog.likes} </p>
        <p> <b>This blog was added by: </b> {blog.user.name} </p>

      </div>
    )
  }

  return (
    <div style={blogStyle} >

      <Button
        style={blogStyle}
        onClick={toggleShowBlogDetails}
        text={blog.title}
      />

      {detailsShown && <RenderBlogDetails key={blog.title} blog={blog} />}

    </div >
  )
}

