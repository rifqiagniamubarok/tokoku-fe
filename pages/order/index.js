import ClientLayout from '@/components/templates/ClientLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Order = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get('/transactions');
      // console.log({ data });
      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ClientLayout>
      <Card className="p-2 md:p-4">
        <div>
          <p className="text-center text-xl md:text-2xl mb-4">Orders</p>
        </div>
        <div>
          {order?.map(({ basket, updated_at, status, id }, index) => (
            <Link href={'/order/' + id}>
              <Divider className="my-4" />
              <div className="space-y-1">
                <p className="text-primary">{dayjs(updated_at).format('MMM, DD YYYY HH:mm')}</p>
                <p>Items : {basket?.items}</p>
                <p>Total : Rp. {basket?.total_price}</p>
                <p>Status: {status}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </ClientLayout>
  );
};

export default Order;
