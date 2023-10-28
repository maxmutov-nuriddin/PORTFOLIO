import { useNavigate } from "react-router-dom";
import useAuth from "../../store/auth";

import Login from "../../types/login";
import SingUp from "../../types/singup";

import './login.scss'

const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const register = useAuth((state) => state.register);

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
      <div className="mains">
        <input className="inputs" type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={singUp}>
            <label className="labels" htmlFor="chk" aria-hidden="true">Sign up</label>
            <input className="inputs" type="text" name="firstName" placeholder="First Name" required />
            <input className="inputs" type="text" name="lastName" placeholder="Last Name" required />
            <input className="inputs" type="text" name="username" placeholder="User name" required />
            <input className="inputs" type="password" name="password" placeholder="Password" required />
            <button className="buttons">Sign up</button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={logIn}>
            <label className="labels" htmlFor="chk" aria-hidden="true">Login</label>
            <input className="inputs" type="text" name="username" placeholder="User name" required />
            <input className="inputs" type="password" name="password" placeholder="Password" required />
            <button className="buttons">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage