import { useState } from 'react'
import { Button } from './FormHelper'
import { BlogDetails } from './BlogDetails'


export const Blog = ({ blog, user, blogs, setBlogs, showSuccessMessage, showErrorMessage }) => {

  const [detailsShown, setDetailsShown] = useState(false)
  const toggleShowBlogDetails = () => setDetailsShown(!detailsShown)

  const renderBlogTitleButton = (
    <Button
      className='blogTitleButton'
      type='button'
      onClick={toggleShowBlogDetails}
      text={blog.title}
    />
  )

  return (
    <div className='blog'>

      {renderBlogTitleButton}

      {detailsShown &&
        <BlogDetails
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
        />}

    </div >
  )
}



