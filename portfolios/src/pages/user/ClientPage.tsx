import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { TOKEN } from '../../constants';
import './cliet.scss'

const ClientPage = () => {
  const navigate = useNavigate();

  // logout
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


  //call
  const call = () => {
    const phoneNumber = '+998901206909';
    window.location.href = `tel:${phoneNumber}`;
  };

  //message
  const message = () => {
    const emailAddress = 'mahmudovnuriddin35@gmail.com';
    window.location.href = `mailto:${emailAddress}`;
  };


  return (
    <header className="showcase">
      <div className="showcase-inner">
        <div className='containers'>
          <h1 className='showcase-title'>Welcome to Our Portfolio Project</h1>
          <p className='showcase__text-title'>Dear User! Your Path in Our Project:</p>
          <p className='showcase__text'><span className='showcase__text-span'>Portfolio Owners:</span> If you're looking to showcase your work, skills, and accomplishments, you're in the right place! Our platform empowers you to create a stunning portfolio that reflects your expertise. The possibilities are endless, and your portfolio will be a true reflection of your unique talents.</p>
          <p className='showcase__text'><span className='showcase__text-span'>Clients and Visitors:</span> For clients seeking top-notch professionals or anyone visiting our platform, we invite you to explore the incredible portfolios our users have created. You'll find a diverse range of skills, styles, and experiences to choose from, making it easy to find the perfect match for your needs.</p>
          <p className='showcase__text'>If you're not a client but are eager to explore portfolios and experience the potential of our project, we kindly ask you to reach out to our admin team for more information. Our team is here to guide you and help you make the most of your journey with us. Feel free to contact us at <span className='showcase__text-span'>abdulaziz_programmer@gmail.com</span> Thank you for embarking on this exciting journey with us! We're dedicated to providing a platform that serves every user's portfolio needs and creates connections that lead to success.</p>
        </div>
        <div className='d-flex gap-5'>
          <button className='button-85' onClick={call}>Call Admin</button>
          <button className='button-85' onClick={message}>Message Admin</button>
          <button className='button-85' onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default ClientPage