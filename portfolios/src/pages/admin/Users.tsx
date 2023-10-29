import { useContext, useEffect, useState } from "react";
import request from "../../server/index";

import {  Form, Input, Modal } from "antd";
import { SearchContexts } from "../../context/Search";


import User from "../../types/user";
import useUsers from "../../store/user";

import UserCard from "../../components/user/UserCard";

const Users = () => {
  const { searchContext } = useContext(SearchContexts);
  const pageTotal = 9;

  const {
    user,
    users,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    getUser,
    setPage,
    controlModal,
    showModal,
    setModalLoading,
    setSelected,
    setSearch,
  } = useUsers();

  useEffect(() => {
    getUser();
  }, [getUser, user]);

  useEffect(() => {
    setSearch(searchContext);
  }, [searchContext]);

  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mySelectedFile, setMySelectedFile] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
    setMySelectedFile(selectedFile);
  };

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      console.log(values);

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // console.log(mySelectedFile);
        

        const response = await request.post("/upload", formData);
        values.photo = response.data;

        if (selected === null) {
          await request.post("users", values);
        } else {
          await request.put(`users/${selected}`, values);
        }
        if (selected) {
          await request.put(`users/${selected}`, values);
        }
      }

      getUser();
      controlModal(false);
      form.resetFields();
      setSelectedFile(null);
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`users/${id}`);

    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deleteBtn = async (id: string) => {
    await request.delete(`users/${id}`);
    getUser();
  };

  if (loading) {
    return (
      <div className='loading'>
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <div className="search">
        <div className="totals ">{total}</div>
        <button className="btn btn-info" onClick={() => showModal(form)}>
          Add
        </button>
      </div>

      <div className="user__inner">
        {users.length > 0 ? (users.map((users) => (
          <UserCard
            key={users._id}
            editBtn={editBtn}
            deleteBtn={deleteBtn}
            users={users}
          />
        ))) : (<div>Card not found</div>)
        }
      </div>
      {totalPages > 1 && (
        <div className="skills__pagination">
          <button
            className="skills__pagination-button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="skills__pagination-current">{page}</span>
          <button
            className="skills__pagination-button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={modalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => controlModal(false)}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item<User>
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item<User>
            label="Password"
            name="password"
          >
            <Input />
          </Form.Item>

          <Form.Item label="File">
            <input type="file" onChange={handleFileChange} value={mySelectedFile ? mySelectedFile.name : ""} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;