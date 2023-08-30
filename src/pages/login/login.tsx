import { useContext, useRef } from "react";
import AuthContext from "./../../shared/authContext";
import "./login.css";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useContext(AuthContext);
  console.log(login);
  const handleLogin = async () => {
    let payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(payload);
    await login(payload);
  };

  return (
    <div>      
      <div className='main'>
        <p className='sign'>Sign in</p>
        <form className='form1'>
          <input type='text' className='email' ref={emailRef} />
          <input type='password' className="pass" ref={passwordRef} />

          <button className="submit" type="button" onClick={handleLogin}>Sign in</button>
          <p className='forgot'>
            <a href="/">Forgot Password? </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
