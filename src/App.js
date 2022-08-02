import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])


  // sets success message in status
  // after three seconds clears the message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  // sets error message in status
  // after three seconds clears the message
  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  // sets empty strings to title, author, url, username and password
  // used to reset all input fields
  // after submitting the new blog creation form
  // and after logging in or logging out
  const resetInputFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setUsername('')
    setPassword('')
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      resetInputFields()
      showSuccessMessage(`Welcome ${user.name}`)
    } catch (exception) {
      showErrorMessage('wrong credentials')
    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      showSuccessMessage(`Goodbye ${user.name}`)
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      resetInputFields()
    } catch (exception) {
      showErrorMessage('something went wrong, try to logout again')
    }

  }


  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        showSuccessMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
        resetInputFields()
      })
      .catch(error => {
        showErrorMessage('Sorry, something went wrong: ' + error.response.data.error)
      })
  }


  const loginForm = () => (

    <form onSubmit={handleLogin}>

      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">
        login
      </button>

    </form>

  )


  const blogForm = () => (
    <div>

      <h3>Create new blog</h3>

      <form onSubmit={handleBlogCreation}>

        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">
          create
        </button>

      </form>

    </div>
  )


  const showBlogs = () => (
    <div>
      <h3> All blogs</h3>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )


  const loginView = () => (
    <div>
      <p> Please log in </p>

      {loginForm()}
    </div>
  )


  const blogView = () => (
    <div>
      <p> {user.name} logged in </p>

      <button onClick={handleLogout}>
        logout
      </button>

      {blogForm()}
      {showBlogs()}
    </div>
  )


  return (
    <div>

      <h2>BLOGS</h2>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ?
        loginView() :
        blogView()
      }

    </div>
  )
}

export default App
