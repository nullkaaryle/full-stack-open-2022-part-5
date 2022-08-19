import { useState } from 'react'
import { Button, Input } from './FormHelper'

// Returns the login form where user can fill in login credentials.
// Uses button and input helpers from FormHelper component
// The LoginForm uses state to track the user inputs (typing to fields).
// loginUser is passed as property / parameter.
export const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  // loginUser is defined in App
  const signIn = (event) => {
    event.preventDefault()

    loginUser({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  const buttonStyle = {
    cursor: 'pointer'
  }

  // renders header "Login"
  // and under it the input fields for username and password
  // and the button that submits the form with text 'LOGIN'
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={signIn}>

        <Input
          id='login-username'
          text='username: '
          type='text'
          autoComplete='off'
          value={username}
          name='username'
          onChange={handleUsernameChange} />

        <Input
          id='login-password'
          text='password: '
          type='password'
          autoComplete='off'
          value={password}
          name='password'
          onChange={handlePasswordChange}
        />

        <Button
          id='login-button'
          style={buttonStyle}
          type='submit'
          text='LOGIN'
        />

      </form>
    </div>
  )
}
