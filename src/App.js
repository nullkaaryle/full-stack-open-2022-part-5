import { useState, useEffect, useRef } from 'react'

import { Blog } from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import { Button } from './components/FormHelper'
import { ErrorNotification, SuccessNotification, showMessages } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const { showSuccessMessage, showErrorMessage } = showMessages(setSuccessMessage, setErrorMessage)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
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




  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      showSuccessMessage(`Goodbye ${user.name}`)
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      showErrorMessage('something went wrong, try to logout again')
    }

  }


  const loginUser = (userObject) => {
    loginService
      .login(userObject)
      .then(returnedUser => {
        setUser(returnedUser)
        blogService.setToken(returnedUser.token)
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(returnedUser)
        )
        showSuccessMessage(`Welcome ${returnedUser.name}`)
      })
      .catch(error => {
        showErrorMessage('wrong credentials')
      })
  }

  const loginView = () => {
    return (
      <div>
        <Togglable buttonLabel='PLEASE LOG IN'>
          <LoginForm loginHelper={loginUser} />
        </Togglable>
      </div>
    )
  }


  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showSuccessMessage(`New blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
      })
      .catch(error => {
        showErrorMessage('Sorry, something went wrong: ' + error.response.data.error)
      })
  }



  const blogView = () => {
    return (
      <div>
        {showLoggedUser()}

        <Togglable buttonLabel='ADD A NEW BLOG' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        <Togglable buttonLabel='SHOW ALL BLOGS'>
          {showBlogs()}
        </Togglable>

      </div >
    )
  }


  const showLoggedUser = () => (
    <div>
      {user.name} logged in {' '}
      <Button
        style={{ cursor: 'pointer' }}
        type='button'
        onClick={handleLogout}
        text='LOGOUT' />
    </div>
  )

  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h3> Click blog name for more details</h3>
        {blogs
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
              showSuccessMessage={showSuccessMessage}
              showErrorMessage={showErrorMessage}
            />)
        }

      </div>
    )
  }



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
