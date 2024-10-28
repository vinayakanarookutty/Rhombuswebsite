import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const CertificateModal = ({ isModalVisible, handleModalClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (values) => {
    setLoading(true);
    try {
      // First fetch the PDF metadata by name
      const response = await axios.get(`https://spendy-u3oz.onrender.com/pdfs/byName/${values.name}`);
      
      if (response.data && response.data._id) {
        // Get the actual PDF file using the ID
        const pdfResponse = await axios.get(`https://spendy-u3oz.onrender.com/pdf/${response.data._id}`, {
          responseType: 'blob'  // Important for handling PDF data
        });

        // Create a blob URL and trigger download
        const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${values.name}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        message.success('PDF downloaded successfully!');
        handleModalClose();
      } else {
        message.error('PDF not found with this name!');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      message.error('Failed to download PDF!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Certificate Form"
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleDownload}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the PDF name!' }]}
        >
          <Input placeholder="Enter the Candidate Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
           Get Certificate
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CertificateModal;