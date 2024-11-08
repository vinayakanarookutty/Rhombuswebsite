import React, { useState, useEffect } from "react";
import { AutoComplete,  } from 'antd';
import { MessageSquare, Menu, Calendar,  } from 'lucide-react';
import Logo from "../../../public/gokeral.png";
import background_img from "../../../public/background.jpg";
import MoreDetails from "../../components/moreDetailsHomePage";
interface PlaceOption {
  value: string;
  coordinates: [number, number];
}
import axios from 'axios';
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href}
    onClick={onClick}
    className="text-zinc-100 hover:text-golden transition-colors duration-300 flex items-center gap-2 px-4 py-2 text-sm tracking-wider uppercase"
    style={{ fontFamily: 'Montserrat, sans-serif' }}
  >
    {children}
  </a>
);

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState<{ value: string; label: string }[]>([]);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  // Sample locations - replace with your actual data
 
  // const handleSearch = (value: string) => {
  //   const filtered = locations
  //     .filter(location => location.toLowerCase().includes(value.toLowerCase()))
  //     .map(location => ({ value: location, label: location }));
  //   setSearchOptions(filtered);
  // };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

 

  const searchPlace = async (query: string) => {
    const keralaBoundingBox = [74.85, 8.18, 77.65, 12.78];
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&country=IN&bbox=${keralaBoundingBox.join(
        ","
      )}`
    );
    const suggestions = response.data.features.map((feature: any) => ({
      value: feature.place_name,
      coordinates: feature.center as [number, number],
    }));
    setSearchOptions(suggestions);
  };

  const onSelect = (option: PlaceOption) => {
    console.log("Selected place:", option);
    // You can perform additional actions here, such as updating the map or redirecting to a details page
  };
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Custom CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap');
          
          .text-golden {
            color: #D4AF37;
          }
          
          .bg-golden {
            background-color: #D4AF37;
          }
          
          .hover:text-golden:hover {
            color: #D4AF37;
          }
          
          .hover:bg-golden:hover {
            background-color: #D4AF37;
          }
          
          .border-golden {
            border-color: #D4AF37;
          }

          .content-blur {
            filter: blur(8px);
            transition: filter 0.3s ease-in-out;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: #D4AF37;
            border: 3px solid transparent;
            background-clip: content-box;
            border-radius: 6px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #B4941F;
            border: 3px solid transparent;
            background-clip: content-box;
          }

          /* Custom AutoComplete Styling */
          .ant-select-selector {
            background-color: rgba(0, 0, 0, 0.5) !important;
            border: 1px solid #D4AF37 !important;
            height: 48px !important;
            display: flex;
            align-items: center;
          }

          .ant-select {
            width: 100%;
            max-width: 400px;
          }

          .ant-select-selection-search-input {
            height: 46px !important;
            color: white !important;
          }

          .ant-select-selection-placeholder,
          .ant-select-selection-item {
            color: rgba(255, 255, 255, 0.8) !important;
            font-family: Montserrat, sans-serif;
          }

          .ant-select:hover .ant-select-selector {
            border-color: #B4941F !important;
          }

          .ant-select-focused .ant-select-selector {
            border-color: #D4AF37 !important;
            box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2) !important;
          }

          .ant-select-dropdown {
            background-color: rgba(0, 0, 0, 0.9) !important;
            backdrop-filter: blur(10px);
            border: 1px solid #D4AF37;
          }

          .ant-select-item {
            color: white !important;
            font-family: Montserrat, sans-serif;
          }

          .ant-select-item-option-active {
            background-color: rgba(212, 175, 55, 0.1) !important;
          }

          .ant-select-item-option-selected {
            background-color: rgba(212, 175, 55, 0.2) !important;
          }
        `}
      </style>
  {/* Main background with gradient overlay */}
  <div className={`fixed inset-0 z-0 transition-all duration-300 ${isMenuOpen ? 'content-blur' : ''}`}>
        <div 
          style={{ backgroundImage: `url(${background_img})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
       {/* Header */}
       
       <header className="fixed w-full z-20 bg-black/30 backdrop-blur-sm border-b border-zinc-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo section */}
            <div className="flex items-center space-x-2">
              <a 
                href="#" 
                style={{fontFamily: "Playfair Display, serif"}}
                className="text-golden text-2xl md:text-4xl font-bold hover:text-white transition-colors duration-300"
              >
                Go Keral
              </a>
              <img 
                src={Logo} 
                alt="Go Keral Logo" 
                className="h-12 md:h-16"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              
              {/* {user.email ? (
                <a href="/userProfile">
                  <Button className="ml-6 bg-transparent text-golden hover:text-white border border-golden hover:border-white px-6 py-4 h-auto transition-all duration-300">
                    <p style={{fontFamily: "Montserrat"}} className="flex text-sm tracking-wider uppercase">Profile</p>
                  </Button>
                </a>
              ) : (
                <a href="/userRegistration">
                  <Button className="ml-6 bg-transparent text-golden hover:text-white border border-golden hover:border-white px-6 py-4 h-auto transition-all duration-300">
                    <p style={{fontFamily: "Montserrat"}} className="flex text-sm tracking-wider uppercase">Register</p>
                  </Button>
                </a>
              )} */}
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-golden hover:text-white transition-colors duration-300 z-50"
            >
             <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full screen overlay */}
        <div 
          className={`
            fixed 
            inset-0 
            bg-black/95
            backdrop-blur-xl
            z-40 
            md:hidden
            transition-all
            duration-300 
            ease-in-out
            flex
            flex-col
            ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          <div className="flex flex-col h-full pt-24 px-6">
            <div className="flex flex-col space-y-8">
              <NavLink href="/" onClick={closeMenu}>Home</NavLink>
              <NavLink href="/services" onClick={closeMenu}>Services</NavLink>
              <NavLink href="/about" onClick={closeMenu}>About</NavLink>
              <NavLink href="/contact" onClick={closeMenu}>Contact</NavLink>
              
              {/* {user.email ? (
                <a href="/userProfile" onClick={closeMenu} className="mt-4">
                  <Button className="w-full bg-transparent text-golden hover:text-white border border-golden hover:border-white h-auto py-4 transition-all duration-300">
                    <p style={{fontFamily: "Montserrat"}} className="flex justify-center text-sm tracking-wider uppercase">Profile</p>
                  </Button>
                </a>
              ) : (
                <a href="/userRegistration" onClick={closeMenu} className="mt-4">
                  <Button className="w-full bg-transparent text-golden hover:text-white border border-golden hover:border-white h-auto py-4 transition-all duration-300">
                    <p style={{fontFamily: "Montserrat"}} className="flex justify-center text-sm tracking-wider uppercase">Register</p>
                  </Button>
                </a>
              )} */}
            </div>

            {/* Additional mobile menu content */}
            <div className="mt-auto mb-12">
              <div className="text-zinc-400 space-y-4" style={{fontFamily: "Montserrat"}}>
                <p className="text-sm uppercase tracking-wider text-golden">Contact Us</p>
                <p className="text-sm">contact@gokeral.com</p>
                <p className="text-sm">+91 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={`relative min-h-screen pt-24 transition-all duration-300 ${isMenuOpen ? 'content-blur' : ''}`}>
        <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-8 py-20 md:py-32">
            <div className="space-y-2">
              <p className="text-golden tracking-widest uppercase text-sm md:text-base"
                 style={{fontFamily: "Montserrat"}}>
                Premium Travel Experience
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  style={{fontFamily: "Playfair Display"}}>
                Discover Kerala <br />in Luxury
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed"
               style={{fontFamily: "Montserrat"}}>
              Experience the beauty of God's own country with our premium vehicle booking service
            </p>
            <div className="flex flex-col gap-4 pt-4 max-w-md">
            <AutoComplete
        placeholder="Where would you like to go?"
        options={searchOptions}
        onSearch={searchPlace}
        onSelect={onSelect}
        className="custom-autocomplete"
      />
              <a href="/maps" className="sm:w-fit">
                <button className="
                mt-5
                  bg-transparent
                  hover:bg-golden 
                  border
                  border-golden
                  text-golden
                  hover:text-black
                  px-8 
                  py-4
                  rounded-none
                  w-full 
                  transition-all 
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2
                  group
                "
                style={{fontFamily: "Montserrat"}}
                >
                  <Calendar className="w-5 h-5 text-golden group-hover:text-black transition-colors duration-300" />
                  <span className="tracking-wider uppercase text-sm ">Book Now</span>
                </button>
              </a>
              
            </div>
            <MoreDetails/>
      </div>
      </div>
      </div>

      {/* Chat Bot Button */}
      <button className={`
        fixed 
        right-4 
        bottom-4 
        md:right-6 
        md:bottom-6 
        bg-golden
        hover:bg-transparent 
        text-black
        hover:text-golden
        border
        border-golden
        w-12 
        h-12 
        md:w-16 
        md:h-16 
        rounded-none
        flex 
        items-center 
        justify-center 
        shadow-lg 
        transition-all 
        duration-300
        ${isMenuOpen ? 'content-blur' : ''}
      `}>
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </div>
  );
};

export default HomePage;