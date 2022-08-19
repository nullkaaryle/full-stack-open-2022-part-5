import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from './FormHelper'


// Component for toggling elements
// The whole Togglable component is "wrapped" inside React's "forwardRef()" function.
// The forwardRef passes the ref and props to the component,
// which can be then used in the component.
// So the ref is "forwarded" to the component.
export const Togglable = forwardRef((props, ref) => {


  // The state for visible can be true or false,
  // initial value is false.
  // In this app the visible is true always when we want to show the user some content,
  // for example the list of blogs.
  // So, if the list of blogs is visible, visible is true.
  // On the other hand, if the user hides the blog list, (toggles visibility)
  // then it is not visible anymore, visible is false.
  const [visible, setVisible] = useState(false)


  // When called, sets the state of "visible" to the opposite.
  // So if visible is true in the state, changes it to false and vice versa.
  const toggleVisibility = () => {
    setVisible(!visible)
  }


  // Two styles that can be used for elements.
  // CSS property "display" is used to choose if an element
  // is rendered in the document or not.
  // If style for the element is display:none,
  // then the element is not displayed at all.

  // If visible is true, then the css property display
  // has keyword value none, and nothing is rendered of the element
  const hideWhenVisible = {
    display: visible ?
      'none' :
      ''
  }

  // If visible is true, then the css property display
  // has keyword value '', and the element is rendered
  const showWhenVisible = {
    display: visible ?
      '' :
      'none'
  }

  // useImperativeHandle is used with forwardRef.
  // Parameters are ref and a handle,
  // here handle is the toggleVisibility
  // useImperativeHandle defines that we only
  // want to give access to toggleVisibility,
  // so in the App when ref is used only that function
  // is available from Togglable
  useImperativeHandle(ref, () => (
    { togglableHandle: toggleVisibility }
  ))


  // returns two elements, but only one is rendered at a time.
  // The styles hideWhenVisible and showWhenVisible are defined so
  // that when state "visible" is false, then the first div is rendered
  // and the second div is not.
  // If "visible" is true, then the first div is not rendered,
  // but the second is.
  // The second div element contains props.children,
  // which means that this Togglable component renders
  // all the child elements given to it.
  return (
    <div>

      <div style={hideWhenVisible}>
        <p>
          <Button
            style={{ cursor: 'pointer' }}
            type='button'
            onClick={toggleVisibility}
            text={props.buttonLabel}
            className={props.className}
          />
        </p>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
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

// in this file we have defined the component with anonymous arrow function like this:
// const Togglable = forwardRef((props, ref) => component stuff here)
// and exporting that so we have no default display name like "normal" components
// and the displayname is set here just for debugging and eslint and good practices :)
Togglable.displayName = 'Togglable'
