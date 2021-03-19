
const LoginRegisterForm = ({email, setEmail, pass, setPass, buttonText, handleSubmit}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" onChange={e => setEmail(e.target.value)} value={email} />
                    <small>We'll never share your email</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" onChange={e => setPass(e.target.value)} value={pass} />
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">{buttonText}</button>
            </div>
        </div>
    )
}


export default LoginRegisterForm;