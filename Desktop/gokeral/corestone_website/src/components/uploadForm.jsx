import React, { useState } from 'react';
import { Form, Upload, Input, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (info) => {
    if (info.file.status === 'removed') {
      setFile(null);
      return;
    }
    setFile(info.file);
  };

  const handleFormSubmit = async (values) => {
    if (!file) {
      message.error('Please upload a file!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file.originFileObj || file); // Handle both Upload component and manual file selection
    formData.append('name', values.name);

    try {
      const response = await axios.post('https://spendy-u3oz.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('File uploaded successfully!');
      form.resetFields();
      setFile(null);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error(error.response?.data?.message || 'File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // Validate file type
      if (file.type !== 'application/pdf') {
        message.error('Only PDF files are allowed!');
        return false;
      }
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      return false; // Return false to prevent auto upload
    },
    onChange: handleFileChange,
    maxCount: 1,
    accept: '.pdf',
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      className="max-w-md mx-auto p-4"
    >
      <Form.Item
        name="name"
        label="Document Name"
        rules={[{ required: true, message: 'Please enter a document name' }]}
      >
        <Input placeholder="Enter document name" />
      </Form.Item>

      <Form.Item
        label="PDF File"
        required
        tooltip="File size should be less than 10MB"
      >
        <Upload {...uploadProps} fileList={file ? [file] : []}>
          <Button icon={<UploadOutlined />}>Select PDF File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={uploading}
          className="w-full"
        >
          Upload Document
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadForm;