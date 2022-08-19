// helpers to render error and success messages
// the styles can be found from index.css

export const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}


export const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}
