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
          text='username: '
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange} />

        <Input
          text='password: '
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />

        <Button
          style={buttonStyle}
          type='submit'
          text='login'
        />

      </form>
    </div>
  )
}
