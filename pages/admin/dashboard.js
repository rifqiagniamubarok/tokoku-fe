import AdminLayout from '@/components/templates/AdminLayout';
import { Card } from '@nextui-org/react';
import React from 'react';

const Dashboard = () => {
  return (
    <AdminLayout title={'Dashboard'} className={'grid grid-cols-4 gap-4'}>
      <Card className="p-4">
        <p>Product</p>
        <p className="font-semibold text-3xl">450</p>
      </Card>
      <Card className="p-4">
        <p>Transaction</p>
        <p className="font-semibold text-3xl">450</p>
      </Card>
      <Card className="p-4">
        <p>Need Confirmation</p>
        <p className="font-semibold text-3xl">450</p>
      </Card>
      <Card className="p-4">
        <p>Completed</p>
        <p className="font-semibold text-3xl">450</p>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
