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
      setUsername('')
      setPassword('')
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
      setUsername('')
      setPassword('')
    } catch (exception) {
      showErrorMessage('something went wrong, try to logout again')
    }

  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>

      <div>
        username: {' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password: {' '}
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
      <h3> All blogs</h3>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )

  return (
    <div>

      <h2>BLOGS</h2>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ?
        (<div>
          <p> Please log in </p>
          { loginForm() }
        </div>
        ) :
        (<div>
          <p> {user.name} logged in </p>
          <button onClick={handleLogout}>
            logout
          </button>
          { blogForm() }
        </div>
        )
      }

    </div>
  )
}

export default App
