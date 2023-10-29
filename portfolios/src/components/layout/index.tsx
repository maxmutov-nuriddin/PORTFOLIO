import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { TOKEN } from '../../constants';
import useAuth from '../../store/auth';

import { toast } from 'react-toastify';


import { SearchContexts } from '../../context/Search';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './layout.scss'

function Layout() {
  const user = useAuth((state) => state.user);
  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);
  const [messageDots, setMessageDots] = useState(false);
  const { searchContext, setSearchContext } = useContext(SearchContexts)

  const navigate = useNavigate();

  useEffect(() => {
    setMessageDots(true)
  })

  const toggleLeftSide = () => {
    setLeftSide(!leftSide);
  };

  const toggleRightSide = () => {
    setRightSide(!rightSide);
  };

  const logout = () => {
    const handleLogoutConfirmation = () => {
      Cookies.remove(TOKEN);
      toast.success('You have been logged out!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
        onClose: () => navigate('/login'),
      });
    };
    const handleNotLogoutConfirmation = () => {
      toast.success('You canceled the logout!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
      });
    };


    const handleLogout = () => {
      toast.dismiss();
      handleLogoutConfirmation();
    };

    const handleCancelLogout = () => {
      toast.dismiss();
      handleNotLogoutConfirmation()
    };

    toast.info(
      <div>
        <p>Are you Logout?</p>
        <button type="button" className="btn btn-success me-2" onClick={handleLogout}>Yes</button>
        <button type="button" className="btn btn-warning" onClick={handleCancelLogout}>No</button>
      </div>,
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
        hideProgressBar: true,
        closeButton: false,
      }
    );
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
            <NavLink to='/'><i className="bi bi-house-door"></i>Home</NavLink>
            <NavLink to='/portfolio'><i className="bi bi-briefcase"></i> Portfolio</NavLink>
            <NavLink to='/education'><i className="bi bi-backpack2"></i> Education</NavLink>
            <NavLink to='/skills'><i className="bi bi-gear"></i> Skills</NavLink>
            <NavLink to='/message'><i className="bi bi-chat-dots"></i> Message</NavLink>
            <NavLink to='/experiens'><i className="bi bi-chevron-bar-expand"></i> Experiens</NavLink>
            <NavLink to='/users'><i className="bi bi-people"></i> Users</NavLink>
          </div>
        </div>
        <a href="https://instagram.com/mv.nuriddin?igshid=OGQ5ZDc2ODk2ZA==" className="follow-me" target="blank">
          <span className="follow-text"><i className="bi bi-instagram"></i> Follow me on Instagram</span>
          <span className="developer"><i className="bi bi-instagram"></i> My instagram mv_nuriddin</span>
        </a>
      </div>
      <div className="main">
        <div className="search-bar">
          <input type="text" value={searchContext} onChange={(e) => setSearchContext(e.target.value)} placeholder="Search" />
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
            <NavLink to='/message' className='account-button'>
              <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </NavLink>
          </button>
          <button className={`account-button ${messageDots ? 'account__button-dots' : ''}`}>
            <NavLink to='/message' className='account-button'>
              <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </NavLink>
          </button>
          <span className="account-user side-menu">
            <NavLink to='/profile' className='account-user'>
              {user?.username}
              <img
                src={user?.photo || user?.photo !== '' ? user?.photo : './public/image-from-rawpixel-id-3012279-svg.svg'}
                alt=""
                className="account-profile"
              />
              {/* <img
                src={user?.fields?.length !== undefined && user.fields ? './public/image-from-rawpixel-id-3012279-svg.svg' : `https://ap-portfolio-backend.up.railway.app/api/v1/upload/${user.fields._id}.${user.fields.name?.split(".")[1]}`}
                alt=""
                className="account-profile"
              /> */}
            </NavLink>
          </span>
        </div>
        <div className="side-wrapper">
          <div className="side-title">Settings</div>
          <div className="side-menu">
            <NavLink to='/profile'><i className="bi bi-person-circle"></i> Profile</NavLink>
            <NavLink to='/account'><i className="bi bi-person-gear"></i> Account</NavLink>
            <NavLink to='/setting'><i className="bi bi-gear"></i> Setting</NavLink>
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