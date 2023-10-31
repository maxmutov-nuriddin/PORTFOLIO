import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/auth";
import { Modal } from "react-bootstrap";

import Login from "../../types/login";
import SingUp from "../../types/singup";

import { toast } from "react-toastify";

import './login.scss'

const LoginPage = () => {
  const [pass, setPass] = useState('')
  const login = useAuth((state) => state.login);
  const register = useAuth((state) => state.register);

  const [showPassword, setShowPassword] = useState(true);


  const [smShow, setSmShow] = useState(false);
  const username = "nuriddin_jone";
  const password = "12345";
  const usernameStyle = { color: 'red' };
  const passwordStyle = { color: 'red' };
  const nameStyle = { color: 'black' };


  useEffect(() => {
    setSmShow(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Login = {
      username: e.currentTarget.username.value.trim(),
      password: e.currentTarget.password.value.trim(),
    };
    login(user, navigate);
    toast.success('You are logged in successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      hideProgressBar: true,
    });
  };



  const singUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.password.value.trim() === e.currentTarget.repeatPassword.value.trim()) {
      setPass(e.currentTarget.password.value.trim());
      const user: SingUp = {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        username: e.currentTarget.username.value.trim(),
        password: pass,
      };
      register(user, navigate);
      toast.success('You have successfully registered!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 900,
        hideProgressBar: true,
      });
    } else {
      toast.error('Passwords do not match!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 900,
        hideProgressBar: true,
      });
    }
  };


  return (
    <div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            LOGIN: 👇
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={nameStyle}>User Name: <span style={usernameStyle}> {username}</span></div>
          <div style={nameStyle}>Password: <span style={passwordStyle}>{password}</span></div>
        </Modal.Body>
      </Modal>
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
              <input className="inputs" type={showPassword ? 'password' : 'text'} name="repeatPassword" placeholder="Repeat the password" required />
              <button className='password__show password__show-register' type="button" onClick={togglePasswordVisibility}>
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
              <button className='password__show password__show-login' type="button" onClick={togglePasswordVisibility}>
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