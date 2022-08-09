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
        <p>
          <Button
            style={ { cursor: 'pointer' } }
            type='button'
            onClick={toggleVisibility}
            text={props.buttonLabel}
          />
        </p>
      </div>

      <div style={showWhenVisible}>

        {props.children}
        <p>
          <Button
            style={{ cursor: 'pointer' }}
            type='button'
            onClick={toggleVisibility}
            text='close'
          />
        </p>
      </div>

    </div>
  )
})

Togglable.displayName = 'Togglable'
