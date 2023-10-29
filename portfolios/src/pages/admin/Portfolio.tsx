import React, { useContext, useEffect, useState } from "react";
import request from "../../server/index";
import { Form, Input, Modal } from 'antd';
import Portfolio from "../../types/portfolio";
import { SearchContexts } from "../../context/Search";
import usePortfolio from "../../store/portfolio";
import PortfolioCard from "../../components/portfolioCard/PortfolioCard";

const Portfolios = () => {
  const { searchContext } = useContext(SearchContexts);
  const pageTotal = 9;

  const {
    user,
    portfolio,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    getPortfolio,
    setPage,
    controlModal,
    showModal,
    setModalLoading,
    setSelected,
    setSearch,
  } = usePortfolio();

  useEffect(() => {
    getPortfolio();
  }, [getPortfolio, user]);

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

        const response = await request.post("/upload", formData);
        values.photo = response.data;
        console.log(response);

        if (selected === null) {
          await request.post("portfolios", values);
        } else {
          await request.put(`portfolios/${selected}`, values);
        }

        if (selected) {
          await request.put(`portfolios/${selected}`, values);
        }
      }

      getPortfolio();
      controlModal(false);
      form.resetFields();
      setSelectedFile(null);
    } finally {
      setModalLoading(false);
    }
  };

  const editBtn = async (id: string) => {
    const { data } = await request.get(`portfolios/${id}`);
    console.log(data);

    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deleteBtn = async (id: string) => {
    await request.delete(`portfolios/${id}`);
    getPortfolio();
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
        {portfolio.map((portfolio) => (
          <PortfolioCard
            key={portfolio._id}
            editBtn={editBtn}
            deleteBtn={deleteBtn}
            portfolio={portfolio}
          />
        ))}
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
          <Form.Item<Portfolio>
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

          <Form.Item<Portfolio>
            label="Url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Portfolio>
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

          <Form.Item label="File">
            <input type="file" onChange={handleFileChange} value={mySelectedFile ? mySelectedFile.name : ""} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Portfolios;