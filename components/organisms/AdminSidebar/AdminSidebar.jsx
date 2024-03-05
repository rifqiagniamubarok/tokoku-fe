import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdminSidebar = () => {
  const currentPathname = usePathname();
  const pageList = [
    {
      page: 'Dashboard',
      path: '/dashboard',
    },
    {
      page: 'Product',
      path: '/product',
    },
    {
      page: 'Transaction',
      path: '/transaction',
    },
    {
      page: 'Management',
      path: '/management',
    },
  ];
  const style = {
    active: 'text-primary cursor-pointer bg-white font-semibold',
    notActive: 'bg-primary text-white',
    general: 'py-2 px-4 rounded-md hover:bg-white hover:bg-opacity-75 hover:text-primary',
  };
  return (
    <div className="bg-primary w-[200px] p-4 flex flex-col justify-between">
      <div>
        <div>
          <p className="text-2xl font-semibold text-white text-center">TOKOKU</p>
        </div>
        <div className="mt-10 space-y-2">
          {pageList.map(({ page, path }, index) => {
            let targetPath = '/admin' + path;
            return (
              <div key={index}>
                <Link href={targetPath}>
                  <div className={classNames(style.general, targetPath.includes(currentPathname) ? style['active'] : style['notActive'])}>
                    <p>{page}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="cursor-pointer text-red-700 text-center p-2 bg-red-50 bg-opacity-50 rounded-md">Logout</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
