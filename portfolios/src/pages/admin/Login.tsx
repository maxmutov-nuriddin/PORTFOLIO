import { useNavigate } from "react-router-dom";
import useAuth from "../../store/auth";

import Login from "../../types/login";
import SingUp from "../../types/singup";

import './login.scss'
import { useState } from "react";

const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const register = useAuth((state) => state.register);

  const [showPassword, setShowPassword] = useState(true);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Login = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    login(user, navigate);
    console.log(user);
  };

  const singUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: SingUp = {
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    register(user, navigate);
    console.log(user);
  };

  return (
    <div>
      <div className="conic">
        <div className="mains">
          <input className="inputs" type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={singUp}>
              <label className="labels" htmlFor="chk" aria-hidden="true">Sign up</label>
              <input className="inputs" type="text" name="firstName" placeholder="First Name" required />
              <input className="inputs" type="text" name="lastName" placeholder="Last Name" required />
              <input className="inputs" type="text" name="username" placeholder="User name" required />
              <input className="inputs" type={showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
              <button className='password__show password__show-register' onClick={togglePasswordVisibility}>
                {!showPassword ? (<i className="bi bi-eye"></i>) : (<i className="bi bi-eye-slash"></i>)}
              </button>
              <button className="buttons">Sign up</button>
            </form>
          </div>
          <div className="login">
            <form onSubmit={logIn}>
              <label className="labels" htmlFor="chk" aria-hidden="true">Login</label>
              <input className="inputs" type="text" name="username" placeholder="User name" required />
              <input className="inputs" type={showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
              <button className='password__show password__show-login' onClick={togglePasswordVisibility}>
                {!showPassword ? (<i className="bi bi-eye"></i>) : (<i className="bi bi-eye-slash"></i>)}
              </button>
              <button className="buttons">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage