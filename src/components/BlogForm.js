import { useState } from 'react'
import { Button, Input } from './FormHelper'

// Returns the blog form where user can fill in details of new blog.
// Uses button and input helpers from FormHelper component
// The BlogForm uses state to track the user inputs (typing to fields).
// addBlog is passed as property/parameter.
export const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const resetInputFields = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  // addBlog is defined in App
  const saveBlog = (event) => {
    event.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url
    })

    resetInputFields()
  }

  const buttonStyle = {
    cursor: 'pointer'
  }


  return (
    <div>

      <h3>Please fill all fields</h3>

      <form onSubmit={saveBlog}>

        <Input
          id='blogform-title'
          text='title: '
          type='text'
          value={title}
          name='title'
          onChange={handleTitleChange}
        />

        <Input
          id='blogform-author'
          text='author: '
          type='text'
          value={author}
          name='author'
          onChange={handleAuthorChange}
        />

        <Input
          id='blogform-url'
          text='url: '
          type='text'
          value={url}
          name='url'
          onChange={handleUrlChange}
        />

        <Button
          id='blogform-button'
          style={buttonStyle}
          type='submit'
          text='SAVE BLOG'
        />

      </form>

    </div>
  )
}

