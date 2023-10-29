import { useContext, useEffect } from "react";
import request from "../../server/index";

import { Form, Input, Modal } from "antd";


import Expiriens from "../../types/expiriens";
import useExpiriens from "../../store/expiriens";

import { SearchContexts } from "../../context/Search";
import ExpiriensCard from "../../components/expiriens/ExpiriensCard";

const Skills = () => {
  const { searchContext } = useContext(SearchContexts)

  const pageTotal = 9

  const {
    user,
    expiriens,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    // search,
    getExpiriens,
    setPage,
    controlModal,
    showModal,
    setModalLoading,
    setSelected,
    setSearch,
  } = useExpiriens();

  useEffect(() => {
    getExpiriens();
  }, [getExpiriens, user]);

  useEffect(() => {
    setSearch(searchContext);
  }, [searchContext]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("experiences", values);
      } else {
        await request.put(`experiences/${selected}`, values);
      }
      getExpiriens();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`experiences/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  }

  const deleteBtn = async (id: string) => {
    await request.delete(`experiences/${id}`);
    getExpiriens();
  }

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

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <div className="search">
        <div className="totals ">
          {total}
        </div>
        <button className="btn btn-info" onClick={() => showModal(form)}>
          Add
        </button>
      </div>

      <div className="user__inner">
        {
          expiriens.length > 0 ?  (expiriens.map((expiriens) => <ExpiriensCard key={expiriens._id} editBtn={editBtn} deleteBtn={deleteBtn} expiriens={expiriens} />)) : (<div>Card not found</div>)
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
          <Form.Item<Expiriens>
            label="Work name"
            name="workName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Expiriens>
            label="Company name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Expiriens>
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Expiriens>
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Expiriens>
            label="End date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Skills