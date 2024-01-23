import React from 'react'
import {useSelector} from 'react-redux'

const Welcome = () => {

  const user = useSelector(state => state.auth.user)

  return (
    <div className='flex flex-col text-white'>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2 className="text-2xl font-semibold">Welcome back {user && user.first_name}</h2>
    </div>
  )
}

export default Welcome