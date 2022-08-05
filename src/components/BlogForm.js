import { useState } from 'react'
import { Button, Input } from './FormHelper'

export const BlogForm = ({ createBlog }) => {

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

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
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

      <form onSubmit={addBlog}>

        <Input
          text='title: '
          type='text'
          value={title}
          name='title'
          onChange={handleTitleChange}
        />

        <Input
          text='author: '
          type='text'
          value={author}
          name='author'
          onChange={handleAuthorChange}
        />

        <Input
          text='url: '
          type='text'
          value={url}
          name='url'
          onChange={handleUrlChange}
        />

        <Button
          style={buttonStyle}
          type='submit'
          text='SAVE BLOG'
        />

      </form>

    </div>
  )
}

