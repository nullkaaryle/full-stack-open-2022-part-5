import { useState } from 'react'
import { Button, Input } from './FormHelper'

export const LoginForm = ({ loginHelper }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginUser = (event) => {
    event.preventDefault()

    loginHelper({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  const buttonStyle = {
    cursor: 'pointer'
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginUser}>

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
          text='login'
        />

      </form>
    </div>
  )
}
