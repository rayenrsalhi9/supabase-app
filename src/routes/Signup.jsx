import { useActionState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Signup() {

  const {setSession, signUserUp} = useAuth()
  const navigate = useNavigate()

  const [error, handleSubmit, isPending] = useActionState(
    async(_, formData) => {

      const email = formData.get('email')
      const password = formData.get('password')

      const {success, data, error: signUpError} = await signUserUp(email, password)

      if (signUpError) return signUpError

      if (success && data) {
        setSession(data.session)
        navigate('/dashboard')
        return null
      }
      
      return null
    }, null
  )

  return (
    <form 
      className="form" 
      action={handleSubmit}
      aria-label="Sign up form"
      aria-describedby="form-description"
    >

      <div id="form-description" className="sr-only">
        Use this form to sign up for an account. Enter your email and
        password.
      </div>

      <h1 className="form-title">Create an account</h1>
      <p>Create an account and start tracking your sales</p>

      {
        !isPending && error 
        ? <p id="auth-error-msg" role="alert" className="auth-error-msg">{error}</p> 
        : null
      }

      <span className="input-span">
        <label htmlFor="email" className="label">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="example@domain.com" 
          className={!isPending && error ? "input-error" : ''} 
          required
          aria-required='true'
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'auth-error-msg' : undefined}
          disabled={isPending}
        />
      </span>

      <span className="input-span">
        <label htmlFor="password" className="label">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="********" 
          className={!isPending && error ? "input-error" : ''} 
          required
          aria-required='true'
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'auth-error-msg' : undefined}
          disabled={isPending}
        />
      </span>

      <button 
        className="submit-btn" 
        disabled={isPending}
        aria-busy={isPending}
        type="submit"
      >
        {isPending ? 'Signing up...' : 'Sign up'}
      </button>

      <span className="span">Already have an account? <Link to="/">Sign in</Link></span>
      
    </form>
  )
}