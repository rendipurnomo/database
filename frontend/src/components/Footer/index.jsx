import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className='my-24 w-full flex justify-center items-center h-[7%]'>
      <p>Copyright &copy; Rendidev All rights reserved - {date} </p>
    </footer>
  )
}

export default Footer