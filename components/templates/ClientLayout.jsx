import React from 'react';
import ClientNavbar from '../organisms/ClientNavbar/ClientNavbar';

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen min-w-screen bg-white">
      <div>
        <ClientNavbar />
      </div>
      <div className="container mx-auto mt-4">{children}</div>
    </div>
  );
};

export default ClientLayout;
