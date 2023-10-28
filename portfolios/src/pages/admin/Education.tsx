import { useContext, useEffect } from "react";
import request from "../../server/index";

import { Form, Input, Modal } from "antd";

import useEducation from "../../store/education";
import Educations from "../../types/education";

import EducationCard from "../../components/education/EducationCard";

import { SearchContexts } from "../../context/Search";

const Education = () => {
  const { searchContext } = useContext(SearchContexts)

  const pageTotal = 9

  const {
    user,
    education,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    // search,
    getEducation,
    setPage,
    controlModal,
    showModal,
    setModalLoading,
    setSelected,
    setSearch,
  } = useEducation();

  useEffect(() => {
    getEducation();
  }, [getEducation, user]);

  useEffect(() => {
    setSearch(searchContext);
  }, [searchContext]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("education", values);
      } else {
        await request.put(`education/${selected}`, values);
      }
      getEducation();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`education/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  }

  const deleteBtn = async (id: string) => {
    await request.delete(`education/${id}`);
    getEducation();
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
          education.map((education) => <EducationCard key={education._id} editBtn={editBtn} deleteBtn={deleteBtn} education={education} />)
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
          <Form.Item<Educations>
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Educations>
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Educations>
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

          <Form.Item<Educations>
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

          <Form.Item<Educations>
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

export default Education