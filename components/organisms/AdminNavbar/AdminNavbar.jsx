import React from 'react';

const AdminNavbar = ({ title }) => {
  return (
    <div className=" p-4 shadow-lg bg-white">
      <p className="font-semibold text-xl text-black">{title}</p>
    </div>
  );
};

export default AdminNavbar;
