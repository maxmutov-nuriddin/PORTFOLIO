import React, { useState, useEffect } from 'react';
import './accountPage.scss';
import request from '../../server';
import useAccount from '../../store/account';
import { toast } from 'react-toastify';

const AccountPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    formDatas,
    loading,
    getAccount,
  } = useAccount();

  const [formDate, setFormData] = useState({
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
    photo: '',
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await request.post('auth/upload', formData);


      if (response.data) {
        setFormData((prevFormData) => ({ ...prevFormData, photo: response.data }));
      }

      await request.put('auth/updatedetails', formDate);

      await getAccount();

      setFormData((prevFormData) => ({ ...prevFormData, success: true }));
      toast.success('Changed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 700,
        hideProgressBar: true,
        onClose: () => location.reload(),
      });
    } catch (error) {
      console.log(error);
      toast.error('Error changing')
    }
  };

  if (loading) {
    return <div className='loading'>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>ё
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
              value={formDate.firstName}
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
              value={formDate.lastName}
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
              value={formDate.username}
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
              value={formDate.address}
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
              value={formDate.birthday === null ? '' : formDate.birthday}
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
              value={formDate.email}
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
              value={formDate.facebook}
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
              value={formDate.github}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Info</label>
            <textarea
              className="form-control"
              placeholder="Enter info"
              name="info"
              value={formDate.info}
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
              value={formDate.instagram}
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
              value={formDate.phoneNumber}
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
              value={formDate.telegram}
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
              value={formDate.youtube}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Foto</label>
            <input
              type="file"
              onChange={handleFileChange}

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