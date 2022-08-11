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


export const showMessages = (setSuccessMessage, setErrorMessage) => {

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }


  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return { showSuccessMessage, showErrorMessage }
}
