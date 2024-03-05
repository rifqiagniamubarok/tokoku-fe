import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div className="w-screeen h-screen flex items-stretch bg-blue-50">
      <div className="bg-blue-400 w-[200px]"></div>
      <div className="bg-green-400 grow overflow-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
