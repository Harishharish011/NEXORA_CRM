import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import searchIcon from './assets/search.png';
import thingImg from './assets/thing-removebg-preview.png';
import ChatBotBadge from './components/ChatBotBadge';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { ToastProvider, ErrorBoundary } from './components/common';

const LandingPage = () => {
  const navigate = useNavigate();
  const { startDemo } = useAuth();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleStartDemo = () => {
    startDemo();
    navigate('/app/dashboard');
  };

  const handleLogin = () => {
    navigate('/login');
  };



  return (
    <div className="min-h-screen bg-[#E6E6E6] text-gray-900">
      {/* Hero Section */}
      <section className="fixed h-20 flex justify-center overflow-hidden top-0 left-0 right-0 z-50">
        {/* Navbar */}
        <div className={`absolute top-0 left-0 right-0 z-10 flex justify-between items-center py-4 pl-64 pr-52 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-[#E6E6E6]'}`}>
          {/* Logo */}
          <div className="text-2xl font-bold text-black font-sans">Nexora</div>
          {/* Menu Items */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Products</a>
            <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Solutions</a>
            <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Pricing</a>
            <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Resources</a>
            <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">About</a>
          </nav>
          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-white ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col space-y-2 p-4">
              <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Products</a>
              <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Solutions</a>
              <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Pricing</a>
              <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">Resources</a>
              <a href="#" className="text-black hover:text-gray-600 transition font-sans font-bold">About</a>
            </nav>
          </div>
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-1 bg-black mb-1"></div>
              <div className="w-6 h-1 bg-black mb-1"></div>
              <div className="w-6 h-1 bg-black"></div>
            </div>
            <button 
              onClick={handleLogin}
              className="button-style-black shadow-md hover:shadow-lg transition"
            >
              Log In
            </button>
            <button 
              onClick={handleStartDemo}
              className="button-style-black shadow-md hover:shadow-lg transition"
            >
              Start Demo
            </button>
          </div>
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="relative h-screen flex justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}>
            <Spline
              scene="https://prod.spline.design/BrcvZbUCTXJb6o2W/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
              onMouseMove={(e) => {
                // Pass normalized mouse position for scene reactivity if configured
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                // Scene can use this via Spline events; assume internal handling
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* CRM Growth Potential Section */}
      <section className="py-20 bg-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-bold text-black"
              >
                The CRM With Unlimited Growth Potential
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Unlock endless possibilities for your business with Nexora's scalable CRM platform designed for growth at every stage.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="button-style-black shadow-lg hover:shadow-xl transition"
                onClick={() => window.location.href = '/dashboard'}
              >
                Start Demo
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="w-full aspect-video bg-gradient-to-br from-gray-700 to-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  {/* Make Sense of Customer Data Section */}
  <section className="pt-28 pb-10 bg-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold text-black"
            >
              Make Sense of Customer Data
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              With a unified view of every customer and powerful reporting, you'll have all the insights you need to build better customer relationships at every step.
            </motion.p>

          </motion.div>
        </div>
      </section>

  {/* CRM Features Section */}
  <section className="pt-8 pb-20 bg-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center text-center h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-600 transition-colors duration-300 group-hover:bg-black group-hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-4">Contact management</h3>
              <p className="text-gray-700">Create contacts, keep records up to date, log sales activities, and  all in one place.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center text-center h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-600 transition-colors duration-300 group-hover:bg-black group-hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-4">CRM import</h3>
              <p className="text-gray-700">Easily and quickly import your CRM data into HubSpot from another tool.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center text-center h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-600 transition-colors duration-300 group-hover:bg-black group-hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-4">Deals</h3>
              <p className="text-gray-700">Store, track, manage, and report on the deals or "opportunities" your team is working.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-white p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center text-center h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-600 transition-colors duration-300 group-hover:bg-black group-hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-4">Task & activities</h3>
              <p className="text-gray-700">Keep track of all the to-do's and activities that help you build customer.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Get More Done With AI Section */}
      <section className="py-20 bg-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold text-black"
            >
              Get More Done With AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Say hi to your digital teammate. With AI tools woven throughout Nexora's free CRM, you'll automate routine tasks, surface customer insights, and accelerate your growth.
            </motion.p>
            <div className="mt-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left: feature list */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="space-y-6 text-left"
                  >
                    {[
                      { title: 'AI content writer', desc: 'Generate engaging content and scale content creation with AI, all at the click of a button.' },
                      { title: 'Chatbot builder', desc: 'Qualify leads, book meetings, provide customer support, and scale your one-to-one conversations — all with chatbots.' },
                      { title: 'Shared inbox', desc: 'Connect all your messaging tools in one shared inbox, and use AI to streamline personalized conversations with customers.' },
                      { title: 'Email tracking', desc: 'Get notified as soon as prospects open your emails so you can turn them into deals faster with perfectly timed follow-ups.' },
                      { title: 'Email templates', desc: 'Turn winning emails into AI-powered templates your team can customize and share to close more deals.' }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="transition-all duration-300"
                      >
                        <h4 className="text-lg font-bold text-black">{feature.title}</h4>
                        <p className="text-gray-700">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Right: demo image with animated contacts card behind */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="relative flex items-center justify-center"
                  >
                    <motion.img
                      src={thingImg}
                      alt="demo"
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      className="w-96 rounded-2xl z-10"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-2xl font-bold text-white mb-4">Nexora</div>
              <p className="text-gray-300 mb-4">Empowering businesses with scalable CRM solutions for unlimited growth.</p>
              <div className="flex space-x-4">
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.75c-.4 0-.78-.03-1.16-.09 1.96.63 4.29 1 6.76 1a9.56 9.56 0 0 0 9.68-9.43c0-.14 0-.28-.01-.42.66-.48 1.23-1.07 1.68-1.74z"/>
                  </svg>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}><a href="#" className="hover:text-white transition">Features</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 }}><a href="#" className="hover:text-white transition">Pricing</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 }}><a href="#" className="hover:text-white transition">Integrations</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}><a href="#" className="hover:text-white transition">Security</a></motion.li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 }}><a href="#" className="hover:text-white transition">About Us</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 }}><a href="#" className="hover:text-white transition">Careers</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}><a href="#" className="hover:text-white transition">Press</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 }}><a href="#" className="hover:text-white transition">Blog</a></motion.li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 }}><a href="#" className="hover:text-white transition">Help Center</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}><a href="#" className="hover:text-white transition">Contact Us</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 }}><a href="#" className="hover:text-white transition">Community</a></motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.8 }}><a href="#" className="hover:text-white transition">Status</a></motion.li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-gray-300">&copy; 2025 Nexora. All rights reserved.</p>
            <div className="flex space-x-6">
              <motion.a initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }} whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</motion.a>
              <motion.a initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 }} whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white transition">Terms of Service</motion.a>
              <motion.a initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.8 }} whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
      <ChatBotBadge />
    </div>
  );
};

/**
 * Main App Component
 * Handles routing between landing page and CRM app
 */
const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <SidebarProvider>
            <ToastProvider>
              <Routes>
                {/* Landing Page Route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* App Routes (CRM Dashboard and pages) */}
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
            </ToastProvider>
          </SidebarProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
