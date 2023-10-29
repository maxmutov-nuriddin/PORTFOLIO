import { useState } from "react";
import useAuth from "../../store/auth";

import Password from "../../types/password";
import { toast } from "react-toastify";

import './password.scss'

const SettingPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const paswword = useAuth((state) => state.password);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Password = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    paswword(user);
    toast.success('You are logged in successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      hideProgressBar: true,
    });
  };


  return (
    <div>
      <div className="password">
        <form onSubmit={logIn}>
          <label className="labels" htmlFor="chk" aria-hidden="true">Change Password</label>
          <input className="inputs" type="text" name="username" placeholder="User name" required />
          <input className="inputs" type={showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
          <input className="inputs" type={showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
          <div className=" d-flex align-items-center flex-column">
            <button className='password__shows password__show-password' type="button" onClick={togglePasswordVisibility}>
              {!showPassword ? (<i className="bi bi-eye bi-color"></i>) : (<i className="bi bi-eye-slash"></i>)}
            </button>
          </div>
          <button className="buttons">Change</button>
        </form>
      </div>
    </div>
  )
}

export default SettingPage