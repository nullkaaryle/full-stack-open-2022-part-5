import PropTypes from 'prop-types'

// helper for buttons
export const Button = (props) => (

  <button
    className={props.className}
    style={props.style}
    type={props.type}
    onClick={props.onClick}
    id={props.id}
  >

    {props.text}

  </button>

)

// helper for input fields
export const Input = (props) => (
  <p>
    {props.text}
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      id={props.id}
      autoComplete={props.autoComplete}
    />
  </p>
)


// some properties are required properties for Button and Input
// it helps to use the components correctly.
// If for example some Button component is missing text property,
// then the button is rendered without any text (not good)
// a warning is printed in console: "Warning: Failed prop type..."
Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
