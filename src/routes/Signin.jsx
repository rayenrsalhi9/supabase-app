import { Link } from "react-router-dom"

export default function Signin() {
  return (
    <form className="form">
      <h1 className="form-title">Welcome back!</h1>
      <p>Log in with your email and password</p>
      <span className="input-span">
        <label htmlFor="email" className="label">Email</label>
        <input type="email" name="email" id="email" placeholder="example@domain.com" />
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">Password</label>
        <input type="password" name="password" id="password" placeholder="********" />
      </span>
      <button className="submit-btn">Sign in</button>
      <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
    </form>
  )
}
