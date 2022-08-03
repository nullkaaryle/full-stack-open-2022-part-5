
// helper for buttons
export const Button = (props) => (
  <p>
    <button
      type={props.type}
      onClick={props.onClick}>
      {props.text}
    </button>
  </p>
)

// helper for input fields
export const Input = (props) => (
  <p>
    {props.text}
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      onChange={props.onChange} />
  </p>
)
