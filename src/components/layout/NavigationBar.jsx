import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const NavigationBar = () => {
  return (

        <Navbar className='p-4 shadow-md fixed-top bg-light' expand="lg" bg="light">
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Container>
          <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="ms-auto gap-5 mt-5 mt-lg-0">
            <Link to="/" className="text-decoration-none text-black hover:text-green-500 transition duration-300">
              Dashboard
            </Link>
            <Link to="/blogs" className="text-decoration-none text-black hover:text-green-500 transition duration-300">
              All Posts
            </Link>
            <Link to="/create" className="text-decoration-none text-black hover:text-green-500 transition duration-300">
             Create Blog
            </Link>
          </Nav>
          </Container>
        </Navbar.Collapse>
           </Container>
      </Navbar>

//    <nav className='px-[80px] shadow-md py-[20px] flex items-center justify-between'>
//     <div className='flex gap-10 items-center justify-between'>
//         <div className='font-[600] text-[20px] pr-[30px]'>
//             <Link to='/'>
//             <img src="https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png" alt="logoImage" className='w-25' />
//             </Link>
//         </div>
//         <Link to='/dashboard' className='text-[14px] text-gray-600'>Dashboard</Link>
//         <Link to='/' className='text-[16px] text-gray-600'>All Blogs</Link>
//         <Link to='/create' className='text-[14px] text-gray-600'>Create a Blog</Link>
//     </div>
//     <div className='flex items-center justify-center gap-5'>
//         <div className='text-[20px] text-gray-500'>Welcome back, <span className='font-bold text-[23px] text-black'>Gaurav</span></div>
//         <div className='w-17 border-3 border-red-300 h-17 rounded-full bg-gray-300 overflow-fidden cursor-pointer'>
//         <img src="https://t4.ftcdn.net/jpg/05/30/01/09/360_F_530010960_WkmW6q8FIZ42LkEQoSRCLTNTw0WgJqKY.jpg" alt="avatar" className='w-full h-full rounded-full border-2 border-white object-cover'/>
//         </div>
//     </div>
//    </nav>
  )
}

export default NavigationBar