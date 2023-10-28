import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';

import './layout.scss'
import Cookies from 'js-cookie';
import { TOKEN } from '../../constants';
import useAuth from '../../store/auth';

function Layout() {
  const user = useAuth((state) => state.user);

  const navigate = useNavigate();

  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);

  const toggleLeftSide = () => {
    setLeftSide(!leftSide);
  };

  const toggleRightSide = () => {
    setRightSide(!rightSide);
  };

  const logout = () => {
    const confirmDelete = window.confirm("Are you Logout?");
    if (confirmDelete) {
      Cookies.remove(TOKEN);
      navigate("/login");
    }

  };

  return (
    <div className="container">
      <div className={`left-side ${leftSide ? 'active' : ''}`}>
        <div className="left-side-button" onClick={toggleLeftSide}>
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="logo">PORTFOLIO</div>
        <div className="side-wrapper">
          <div className="side-title">MENU</div>
          <div className="side-menu">
            <Link to='/'><i className="bi bi-house-door"></i>Home</Link>
            <Link to='/portfolio'><i className="bi bi-briefcase"></i> Portfolio</Link>
            <Link to='/education'><i className="bi bi-backpack2"></i> Education</Link>
            <Link to='/skills'><i className="bi bi-gear"></i> Skills</Link>
            <Link to='/message'><i className="bi bi-chat-dots"></i> Message</Link>
            <Link to='/users'><i className="bi bi-people"></i> Users</Link>
          </div>
        </div>
        <a href="https://instagram.com/mv.nuriddin?igshid=OGQ5ZDc2ODk2ZA==" className="follow-me" target="blank">
          <span className="follow-text"><i className="bi bi-instagram"></i> Follow me on Instagram</span>
          <span className="developer"><i className="bi bi-instagram"></i> My instagram mv_nuriddin</span>
        </a>
      </div>
      <div className="main">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="right-side-button" onClick={toggleRightSide}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        <div className="main-container">
          <Outlet />
        </div>
      </div>
      <div className={`right-side ${rightSide ? 'active' : ''}`}>
        <div className="account">
          <button className="account-button">
            <Link to='/message' className='account-button'>
              <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </Link>
          </button>
          <button className="account-button">
            <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <span className="account-user">
            <Link to='/profile' className='account-user'>
              {user?.username}
              <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg" alt="" className="account-profile" />
            </Link>
          </span>
        </div>
        <div className="side-wrapper">
          <div className="side-title">Settings</div>
          <div className="side-menu">
            <Link to='/profile'><i className="bi bi-person-circle"></i> Profile</Link>
            <Link to='/account'><i className="bi bi-person-gear"></i> Account</Link>
            <Link to='/setting'><i className="bi bi-gear"></i> Setting</Link>
            <hr />
            <a onClick={logout}><i className="bi bi-box-arrow-in-left"></i> Logout</a>
          </div>
        </div>
      </div>
      <div className={`overlay ${rightSide || leftSide ? 'active' : ''}`} onClick={() => { setRightSide(false); setLeftSide(false); }}></div>
    </div >
  );
}

export default Layout;