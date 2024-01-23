import React from 'react';
import { Home, PresentationIcon, Printer, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Mobile = () => {
  return (
    <nav className="fixed bottom-0 z-50 left-0 w-full bg-white flex gap-4 items-center justify-between h-[8vh] [&_.active]:bg-primary [&_.active]:text-white">
      {Nav_list.map((item, index) => (
        <NavLink
          to={item.href}
          key={index}
          className="h-full w-1/5 flex items-center justify-center flex-col gap-1 ">
          {item.icon}
          <h1 className="text-sm">{item.name}</h1>
        </NavLink>
      ))}
    </nav>
  );
};

export default Mobile;

const Nav_list = [
  { name: 'Home', href: '/dashboard', icon: <Home /> },
  { name: 'Product', href: '/products', icon: <Printer /> },
  { name: 'Category', href: '/category', icon: <PresentationIcon /> },
  { name: 'Order', href: '/order', icon: <ShoppingCart /> },
];
