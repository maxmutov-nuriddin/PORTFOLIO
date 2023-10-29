import React, { useState, useEffect } from 'react';
import './accountPage.scss';
import request from '../../server';
import useAccount from '../../store/account';


const AccountPage = () => {
  const {
    formDatas,
    loading,
    getAccount,
  } = useAccount();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    updateFormData();
  }, [formDatas]);


  const updateFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...formDatas,
    }));
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put('auth/updatedetails', formData);
      setFormData((prevFormData) => ({ ...prevFormData, success: true }));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className='loading'>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  }

  return (
    <div className='form-bg'>
      <h3 className='text-center mb-3 fw-bolder fs-1'>Account</h3>
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
              value={formData.birthday === null ? '' : formData.birthday.split('T')[0] }
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
              type="text"
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
      </form >
    </div >
  );
};

export default AccountPage;