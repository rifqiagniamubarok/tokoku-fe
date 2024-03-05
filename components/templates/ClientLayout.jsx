import React from 'react';
import ClientNavbar from '../organisms/ClientNavbar/ClientNavbar';
import classNames from 'classnames';

const ClientLayout = ({ children, className }) => {
  return (
    <div className="min-h-screen min-w-screen bg-white  flex flex-col w-full">
      <div>
        <ClientNavbar />
      </div>
      <div className={classNames('px-2 lg:px-10 lg:container lg:mx-auto mt-4 h-full  grow flex flex-col')}>
        <div className={classNames(className, 'grow')}>{children}</div>
      </div>
    </div>
  );
};

export default ClientLayout;
