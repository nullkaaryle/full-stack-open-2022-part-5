import { useState } from 'react'
import { Button } from './FormHelper'
import { BlogDetails } from './BlogDetails'

// Returns one blog,
// and uses BlogDetails component for rendering the blog details
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

  // Always renders the blog title.
  // If detailsShown is true, also renders the blog details.
  // Blog title is rendered as a button the user can click.
  // Clicking the title button the user can see that blog's details
  // under the blog title button.
  // Clicking the title button again hides that blog's details.
  // Similar behaviour could be achieved using the Togglable component.
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
        />
      }


      {/* Example of using Togglable component for viewing blog details:

      <Togglable buttonLabel={blog.title} className='blogTitleButton'>
        <BlogDetails
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
        />
      </Togglable>

      */}

    </div >
  )
}



