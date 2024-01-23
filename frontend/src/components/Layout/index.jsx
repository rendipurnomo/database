import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  return (
    <div>
    <Navbar />
    <main className='px-2'>
      <Outlet />
    </main>
    <Footer />
    </div>
  )
}

export default Layout