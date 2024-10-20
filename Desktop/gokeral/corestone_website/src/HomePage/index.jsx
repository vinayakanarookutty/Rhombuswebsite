import  { useState, useEffect, useRef } from 'react';
import { FaFacebook,  FaInstagram, FaLinkedin, FaBars, FaTimes, FaRocket, FaPalette, FaCog, FaSchool } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import {  Modal,Image, Button } from 'antd';
import CoreStoneLogo from "../../public/corestone-removebg-preview.png"
import GroupImage from "../../public/team.jpeg"
import GoKeral from "../../public/gokeral.jpeg"
import Spendy from "../../public/spendy.jpeg"
import Workshop from "../../public/workshop.jpeg"
import { Form, Input, Select,Typography,message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BookOutlined, SoundOutlined,  CommentOutlined } from '@ant-design/icons';
import { Table, Row, Col } from 'antd';
import { title } from 'framer-motion/client';
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
export const GlassCard = ({ children, className }) => (
  <div className={`${className} relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/20`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-50"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

const GlossyCard = ({ children, className }) => (
  <div className={`${className} relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl shadow-xl`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-50"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

export const GlowButton = ({ children, className }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
    whileTap={{ scale: 0.95 }}
    className={`${className} relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300"></div>
  </motion.button>
);
const GlowingButton = ({ children, className }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${className} relative overflow-hidden group`}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300"></div>
  </motion.button>
);

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [list, setList] = useState(false);
  const [loading, setLoading] = useState(true);
  const parallaxRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form] = Form.useForm();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('https://spendy-u3oz.onrender.com/List');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      message.error('Failed to fetch bookings');
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title:"College",
      dataIndex:'college',
      key:'college'
    },
    {
      title: 'Experience Level',
      dataIndex: 'experienceLevel',
      key: 'experienceLevel',
    },
    {
      title: 'Hear About Us',
      dataIndex: 'hearAboutUs',
      key: 'hearAboutUs',
    },
    {
      title: 'Special Requirements',
      dataIndex: 'specialRequirements',
      key: 'specialRequirements',
    },
  ];
  useEffect(() => {
  
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'About', 'Services', 'Products', 'Contact'];

  const NavItems = ({ mobile = false }) => (
    <>
      {menuItems.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={mobile ? 'mb-6' : ''}
        >
          <a
            href={`#${item.toLowerCase()}`}
            className="text-lg hover:text-purple-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        </motion.li>
      ))}
    </>
  );
  
  const handleSubmit = (values) => {
  setOpen(false)
    console.log(values); 
    fetch('https://spendy-u3oz.onrender.com/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setOpen(false)
        message.success('Registration successful!');
       
 
    })
    .catch((error) => {
      console.error('Error:', error);
      message.error('Registration failed. Please try again.');
    });
  };
  const onClose = () => {
    setOpen(false)
    setList(false)
    setIsModalOpen(false)
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Navbar */}

    
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              <div className='flex h-10 gap-2'>
              <img src={CoreStoneLogo}/>
              <h1 className='Abril Fatface'>Corestone </h1>
              </div>
             
            </motion.div>
            <ul className="hidden md:flex space-x-8">
              <NavItems />
            </ul>
            <button
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-lg"
          >
            <div className="flex items-center justify-center h-full">
              <ul className="text-center">
                <NavItems mobile />
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header id="home" className="relative min-h-screen flex items-center justify-center text-center pt-20">
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Innovate. Design. Deliver.
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">
            Transforming ideas into impactful software and design solutions.
          </p>
          <GlowButton className="px-8 py-3 text-lg">
            Explore Our Work
          </GlowButton>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            About Us
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <GlassCard>
                <img src={GroupImage} />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-gray-300">
                    At Corestone Innovations, we envision a world where technology seamlessly enhances human potential, driving progress and innovation across industries.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 space-y-6"
            >
              <p className="text-lg text-gray-300">
                Corestone Innovations is at the forefront of digital transformation, specializing in creating cutting-edge software and design solutions that empower businesses to thrive in the digital age.
              </p>
              <p className="text-lg text-gray-300">
                Our team of passionate experts is dedicated to pushing the boundaries of what s possible, turning your ideas into reality with simplicity and impact.
              </p>
              <GlowButton className="px-6 py-2 text-sm">
                Learn More About Us
              </GlowButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-blue-900 to-white-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Software Development', icon: FaRocket, description: 'Cutting-edge software solutions tailored to your business needs.' },
              { title: 'UI/UX Design', icon: FaPalette, description: 'Intuitive and visually stunning interfaces that captivate users.' },
              { title: 'Custom Solutions', icon: FaCog, description: 'Bespoke technology solutions to address your unique challenges.' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full p-6 flex flex-col items-center text-center">
                  <service.icon className="text-5xl mb-4 text-white-400" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Our Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'Spendy', description: 'Your personal money manager, helping you track expenses and reach savings goals.', imgSrc: Spendy},
              { name: 'Go Kerala', description: 'Seamless tourism vehicle booking for an unforgettable experience in Kerala.', imgSrc:GoKeral}
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <img src={product.imgSrc} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-300 mb-4">{product.description}</p>
                    <GlowButton className="px-6 py-2 text-sm">
                      Learn More
                    </GlowButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* Contact Section */}
     {/* Contact Section */}
     <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Contact Us
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <GlossyCard className="p-8">
              <form className="space-y-6">
                <input type="text" placeholder="Your Name" required className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="email" placeholder="Your Email" required className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <textarea placeholder="Your Message" required className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"></textarea>
                <GlowingButton className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold transition-all duration-300">
                  Send Message
                </GlowingButton>
              </form>
            </GlossyCard>
          </div>
        </div>
      </section>

    {/* Footer */}
  {/* ... (previous code remains the same) ... */}

{/* Footer */}
<footer className={`py-10 border-t border-white/20 `}>
  <div className="container mx-auto px-6 text-center">
  <p 
  className="mb-4 text-lg text-orange-300 "
  onClick={() => setList(true)}
  role="button"
  aria-hidden="true"
>
  Follow Us
</p>
    <div className="flex justify-center space-x-6 mb-6">
      {[
        { Icon: FaFacebook, link: "https://www.facebook.com/profile.php?id=61566946882177&mibextid=ZbWKwL" },
        { Icon: FaInstagram, link: "https://www.instagram.com/corestoneindia/" },
        { Icon: FaLinkedin, link: "https://www.linkedin.com/company/104797759/admin/inbox/" }
      ].map(({ Icon, link }, index) => (
        <motion.a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon 
            size={25} 
            className="text-gray-300 hover:text-orange-400 transition-colors duration-300" 
          />
        </motion.a>
      ))}
    </div>
    <p className="text-sm text-gray-300">© 2024 Corestone Innovations. All rights reserved.</p>
  </div>
</footer>
<Modal
        title="Mobile App Development Workshop"
        open={isModalOpen}
      
        centered
        footer={null} 
        width={400}
        onCancel={onClose}
        bodyStyle={{ display: "flex", justifyContent: "center"}}
      >
        <div className='flex flex-col'>
        <Image
          className="rounded-lg"
          src={Workshop}
          alt="Example"
          preview={true} // Enables zoom on click
          height={400}
          width={350}
          style={{ objectFit: "cover" }}
        />
       <a className=' mt-5 ml-[35%]' onClick={()=>{setOpen(true); setIsModalOpen(false)}}> <Button  className=' bg-orange-100'>Register Now</Button></a>
        </div>
       
      </Modal>
      <Modal
      title={<Title level={3} style={{ margin: 0 }}>Registration</Title>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={720}
    >
        
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="college"
          label="College/Department"
          rules={[{ required: true, message: 'Please enter your college name' }]}
        >
          <Input prefix={<FaSchool/>} placeholder="Enter your College/Department Name" />
        </Form.Item>
        <Form.Item
          name="experienceLevel"
          label="Experience Level"
          rules={[{ required: true, message: 'Please select your experience level' }]}
        >
          <Select placeholder="Select Experience Level" prefix={<BookOutlined />}>
            <Option value="Beginner">Beginner</Option>
            <Option value="Intermediate">Intermediate</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="hearAboutUs"
          label="Where did you hear about us?"
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <Select placeholder="Select an option" prefix={<SoundOutlined />}>
            <Option value="Social Media">Social Media</Option>
            <Option value="Friend">Friend or Colleague</Option>
            <Option value="Search Engine">Search Engine</Option>
            <Option value="Advertisement">Advertisement</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

       

        <Form.Item
          name="specialRequirements"
          label="Special Requirements or Questions"
        >
          <TextArea
            rows={4}
            placeholder="Enter any special requirements or questions you may have"
            prefix={<CommentOutlined />}
          />
        </Form.Item>

        <Form.Item>
            
          <Button type="primary" htmlType="submit" block size="large">
            Enroll Now
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      title={<Title level={3} style={{ margin: 0 }}>List of Participents</Title>}
      open={list}
      onCancel={onClose}
      footer={null}
      width={720}
    >
         <div style={{ padding: '20px'}}>
   
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Table
            dataSource={bookings}
            columns={columns}
            pagination={false}
            bordered
            rowKey="_id"
            scroll={{ x: 'max-content' }} // Enable horizontal scroll for smaller screens
          />
        </Col>
      </Row>
    </div> 
     
    </Modal>
  </div>
  );
};

export default HomePage;