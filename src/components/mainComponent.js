import React, { useState, useEffect } from "react";
import InputHandler from "./commonInput";
import { Table, Button, Popconfirm, Modal, Form, Input } from "antd";
import "antd/dist/antd.css";
import "../assets/css/style.css";


function MainComponent(props) {
  const { getUsers, userState, addUser, editUser, deleteUser } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setFormData({ id: record.id, name: record.name, email: record.email });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({ id: "", name: "", email: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await editUser(formData.id, { name: formData.name, email: formData.email });
    await getUsers();
    setIsModalVisible(false);
    setFormData({ id: "", name: "", email: "" });
  };

  const handleSubmit = ({ name, email }) => {
    addUser({ name, email });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit} />
      <Table
        dataSource={userState.users}
        columns={columns}
        rowKey={(record) => record.id}
      />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MainComponent;
