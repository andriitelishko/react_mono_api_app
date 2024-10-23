function Error ({ message, hideError }) {
    return (
      <div class="notification is-danger">
        <button class="delete" onClick={hideError}></button>
        {message}
    </div>
    )
}

export default Error