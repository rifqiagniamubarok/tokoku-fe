import React from 'react';
import AdminSidebar from '../organisms/AdminSidebar/AdminSidebar';
import AdminNavbar from '../organisms/AdminNavbar/AdminNavbar';
import classNames from 'classnames';

const AdminLayout = ({ children, title, className }) => {
  return (
    <div className="w-screeen h-screen flex items-stretch bg-white">
      <AdminSidebar />
      <div className=" grow overflow-auto ">
        <AdminNavbar title={title} />
        <div className="p-4">
          <div className={classNames(className)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
