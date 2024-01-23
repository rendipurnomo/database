import React from 'react'

const Helmet = ({ children,title }) => {
  document.title = 'DigiShop - ' + title
  return (
    <section>{children}</section>
  )
}

export default Helmet