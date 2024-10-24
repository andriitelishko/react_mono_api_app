function Button ({ children, handleClick }) {
    return <button className="button is-link is-small is-block mb-2" onClick={handleClick}>{children}</button>
};

export default Button