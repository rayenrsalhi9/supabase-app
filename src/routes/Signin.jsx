import { useActionState } from "react"
import { Link } from "react-router-dom"

export default function Signin() {

  const [error, handleSubmit, isPending] = useActionState(
    async(_, formData) => {
      const email = formData.get('email')
      const password = formData.get('password')
      if (email === 'rayen@me.com') {
        return 'Email already existing'
      } 
      console.log(email)
      return null
    }, null
  )

  return (
    <form className="form" action={handleSubmit}>
      <h1 className="form-title">Welcome back!</h1>
      <p>Log in with your email and password</p>
      {!isPending && error ? <p className="auth-error-msg">{error}</p> : null}
      <span className="input-span">
        <label htmlFor="email" className="label">Email</label>
        <input type="email" name="email" id="email" placeholder="example@domain.com" className={!isPending && error ? "input-error" : ''} />
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">Password</label>
        <input type="password" name="password" id="password" placeholder="********" className={!isPending && error ? "input-error" : ''} />
      </span>
      <button className="submit-btn" disabled={isPending}>
        {isPending ? 'Signing in' : 'Sign in'}
      </button>
      <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
    </form>
  )
}
