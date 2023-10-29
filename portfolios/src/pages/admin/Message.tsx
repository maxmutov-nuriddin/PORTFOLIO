import { useContext, useEffect } from "react";
import request from "../../server/index";

import { Form, Input, Modal } from "antd";


import { SearchContexts } from "../../context/Search";
import MessageCard from "../../components/message/MessageCard";
import Message from "../../types/message";
import useMessage from "../../store/message";

const Messages = () => {
  const { searchContext } = useContext(SearchContexts)

  const pageTotal = 9

  const {
    messages,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    // search,
    getMessage,
    setPage,
    controlModal,
    showModal,
    setModalLoading,
    setSelected,
    setSearch,
  } = useMessage();


  useEffect(() => {
    getMessage();
  }, [getMessage]);

  useEffect(() => {
    setSearch(searchContext);
  }, [searchContext]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("messages", values);
      } else {
        await request.put(`messages/${selected}`, values);
      }
      getMessage();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`messages/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  }

  const deleteBtn = async (id: string) => {
    await request.delete(`messages/${id}`);
    getMessage();
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
          messages.length > 0 ? (messages.map((messages) => <MessageCard key={messages._id} editBtn={editBtn} deleteBtn={deleteBtn} message={messages} />)) : (<div>Card not found</div>)
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
          <Form.Item<Message>
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Message>
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Message>
            label="First Name"
            name="whom"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Message>
            label="Number"
            name="user"
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

export default Messages