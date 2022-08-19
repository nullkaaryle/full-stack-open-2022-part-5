import { useState, useEffect, useRef } from 'react'

import { Blog } from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import { Button } from './components/FormHelper'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  //***********************************************************************************
  // APP STATES


  // List of blogs, the user logged in, and messages
  // are stored in app state.
  // At first empty list or null is used for state.
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  //***********************************************************************************
  // APP EFFECTS
  //
  // useEffects run when React renders App component or if their dependency changes
  // The first argument is the function which we want the to run.
  // UseEffect can be given a second argument:
  // 1) if no argument is given, useEffect will run every time the component is rendered
  // 2) if an empty array is given as argument, then the useEffect will be run only once
  //     on first component rendering (like we do here)
  // 3) Inside the array we could also add the values that the useEffect depends on.
  // If any of those values would change, only then the effect would run again.

  // The effect gets all the blogs (from backend using blogService)
  // and sets them as blogs to the state.
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
      )
  }, [])

  // The effect takes the user from browser's web storage
  // and saves the user in state.
  // The effect also saves the token for blogService to use later, if needed
  // The user is saved in web storage as json string,
  // and we parse it back to object before setting the it as user.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  //***********************************************************************************
  // SETTING MESSAGE FOR NOTIFICATION

  // Sets a success message to state
  // and clears it after three seconds
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  // Sets a error message to state
  // and clears it after three seconds
  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }


  //**********************************************************************************
  // LOGIN VIEW, LOGGING IN and LOGGING OUT


  // logout is handled by
  // setting the token of the user to null
  // setting the user to null
  // and clearing the web storage
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

  // Handles the login attempt of the user.
  // loginService and blogService (to reach backend) are used for logging the user in.
  // The returned User object is saved as user in state,
  // and the user is also stored as json to web storage with key "loggedBloglistUser".
  // With failed login, shows a error message.
  //
  // Web storage stores data locally to the user's browser.
  // Data that has been saved to web storage has no expiration date.
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

  // returns the view with login functions
  // shows a button that toggles showing the login form
  // passes the loginUser as loginHelper to the component LoginForm
  //
  const loginView = () => {
    return (
      <div>
        <Togglable buttonLabel='PLEASE LOG IN'>
          <LoginForm loginUser={loginUser} />
        </Togglable>
      </div>
    )
  }

  //***************************************************************************************
  // BLOG VIEW, SHOWING BLOG LIST, ADDING BLOG

  // creating a variable called blogFormRef
  // blogFormRef is assigned to be a reference object.
  // Reference object has only one property called current.
  // here, no initial value is given as parameter to useRef,
  // so  at first the blogFormRef.current is 'undefined'.
  // reference is created because we want to access
  // a specific Togglabe component (and call it's function) from addBlog
  const blogFormRef = useRef()

  // Adding a new blog to the bloglist.
  // Uses blogService to create the blog.
  // The returned blog is added to the list of blogs stored in state
  // and a success message is showed for the user.
  // If there is a error (for example data missing) an error message is shown.
  // Success or error, the blog form is closed anyway.
  // To close the blog form automatically after submitting it,
  // we access the reference node with blogFormRef.current
  // and call it's handle (the "togglableHandle") as a function
  // In other words,when addBlog is called
  // also toggleVisibility is called for the Togglable component
  const addBlog = (blogObject) => {
    blogFormRef.current.togglableHandle()

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


  // Returns the view with blog functions (available for user after login).
  // The Togglable component is used for the toggling.
  // Togglable has both opening and closing tags,
  // so here the Togglable components are given child components for rendering,
  //
  // Blog view contains three sections:
  // 1) info for the logged in user is showed (showLoggedUser() is called)
  // 2) add new blog (togglable with button)
  // 3) view all the blogs (togglable with button).
  //
  // 2) If user wants to add new blog, the blog form is showed and
  // addBlog is passed to the BlogForm component as createBlog.
  // Also, we pass the created reference object (blogFormRef) as "ref" to this Togglable component.
  //
  // 3) If user wants to view the list of all blogs, showBlogs() is called.
  // However, if there are no blogs added in the app, a info text is shown instead.
  //
  const blogView = () => {
    return (
      <div>
        {showLoggedUser()}

        <Togglable buttonLabel='ADD A NEW BLOG' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>

        <Togglable buttonLabel='SHOW ALL BLOGS'>
          {blogs.length === 0 ?
            'Sorry, no blogs added at the moment' :
            showBlogs()
          }
        </Togglable>

      </div >
    )
  }

  // Returns the name of the user that is logged in,
  // (name is retrieved from the user saved in state)
  // and a button for logging out.
  const showLoggedUser = () => (
    <div>

      {user.name} logged in {' '}

      <Button
        style={{ cursor: 'pointer' }}
        type='button'
        onClick={handleLogout}
        text='LOGOUT'
      />

    </div>
  )

  // Returns the blogs saved in state, sorted by likes.
  // Uses Blog component for rendering individual blogs.
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

  //***************************************************************************************
  // THE APP RENDERING

  // Returns the app view.
  // After the header the notifications are showed (if some message is set in state at that moment).
  // If there is no user in state, that means there is no logged in user
  // and then the loginView is showed.
  // For the logged in user the blogView is showed instead.
  // Uses Notification component for rendering the messages.
  //
  // The ? and : is the ternary conditional operator.
  // After the condition is given (user === null) with a question mark ?
  // then we give the expression what happens
  // if condition is truthy (if user is null, show the login view)
  // and after the colon :  we give the expression
  // if the condition is falsy (there is a user, show the blog view).
  // In javascript every value is "truthy", if it is not
  // null, undefined, false, NaN, 0, -0, 0n, or "", which are the falsy ones.
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
