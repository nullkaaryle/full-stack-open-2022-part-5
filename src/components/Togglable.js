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


  return (
    <div>

      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          text={props.buttonLabel}
        />
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          text='close'
        />
      </div>

    </div>
  )
})
