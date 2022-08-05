import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from './FormHelper'

export const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ?
      'none' :
      ''
  }
  const showWhenVisible = {
    display: visible ?
      '' :
      'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(ref, () => ({ toggleVisibility }))

  const buttonStyle = {
    cursor: 'pointer'
  }

  return (
    <div>

      <div style={hideWhenVisible}>
        <p>
          <Button
            style={buttonStyle}
            onClick={toggleVisibility}
            text={props.buttonLabel}
          />
        </p>
      </div>

      <div style={showWhenVisible}>

        {props.children}
        <p>
          <Button
            style={buttonStyle}
            onClick={toggleVisibility}
            text='close'
          />
        </p>
      </div>

    </div>
  )
})
