import React, { useEffect } from 'react'
import Logo from '../ui/Logo'
import Mobile from './Mobile'
import Welcome from '../ui/Welcome';
import { Button } from '../ui/button';
import { logOut, reset } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(reset())
    navigate("/login")
  }

  return (
    <header className='sticky top-0'>
      <div className='flex items-center justify-between h-[12vh] bg-gradient-to-r from-primary via-cyan-500 to-primary px-2'>
        <div className='w-1/6'>
      <Welcome />
        </div>
        <div className='w-4/6 flex justify-center items-center'>
      <Logo />
        </div>
        <div className='w-1/6'>
      <Button variant='outline' onClick={handleLogout} >Logout</Button>
        </div>
      <Mobile />
      </div>
    </header>
  )
}

export default Navbar