import { useEffect } from "react";
import request from "../../server/index";

import { Form, Input, Modal } from "antd";

import Skill from "../../types/skill";

import useSkill from "../../store/skill";
import SkillsCadr from "../../components/skills/SkillsCadr";

const Skills = () => {
  const pageTotal = 9

  const {
    user,
    skills,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    // search,
    // setSearch,
    getSkills,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useSkill();

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("skills", values);
      } else {
        await request.put(`skills/${selected}`, values);
      }
      getSkills();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`skills/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  }

  const deleteBtn = async (id: string) => {
    await request.delete(`skills/${id}`);
    getSkills();
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
      <button className="skills__button skills__button--add" onClick={() => showModal(form)}>
        Add
      </button>

      <div className="user__inner">
        {
          skills.map((skill) => <SkillsCadr key={skill._id} editBtn={editBtn} deleteBtn={deleteBtn} skills={skill} />)
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
          <Form.Item<Skill>
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

          <Form.Item<Skill>
            label="Percent"
            name="percent"
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