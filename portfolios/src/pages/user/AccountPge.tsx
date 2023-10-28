import React, { useState, ChangeEvent, FormEvent } from 'react';
import './accountPage.scss';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  birthday: string;
  email: string;
  facebook: string;
  github: string;
  info: string;
  instagram: string;
  phoneNumber: string;
  telegram: string;
  youtube: string;
}

const AccountPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    birthday: '',
    email: '',
    facebook: '',
    github: '',
    info: '',
    instagram: '',
    phoneNumber: '',
    telegram: '',
    youtube: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      address: '',
      birthday: '',
      email: '',
      facebook: '',
      github: '',
      info: '',
      instagram: '',
      phoneNumber: '',
      telegram: '',
      youtube: '',
    });
  };

  return (
    <div>
      <h3 className='text-center mb-5'>Account</h3>
      <form className='form-data' onSubmit={handleSubmit}>
        <div className='form-box col-5  gap-3 d-flex flex-column'>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Birthday</label>
            <input
              type="text"
              className="form-control"
              placeholder="Birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Facebook</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter Facebook URL"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form-box col-5  gap-3 d-flex flex-column'>
          <div className="mb-3">
            <label>GitHub</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter GitHub URL"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Info</label>
            <textarea
              className="form-control"
              placeholder="Enter info"
              name="info"
              value={formData.info}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Instagram</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter Instagram URL"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Telegram</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter Telegram URL"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>YouTube</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter YouTube URL"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AccountPage;