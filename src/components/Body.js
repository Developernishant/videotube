import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <div className='pt-5'>
      <div className='grid grid-flow-col'>
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  );
};

export default Body;
