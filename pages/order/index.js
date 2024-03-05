import ClientLayout from '@/components/templates/ClientLayout';
import { Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

const Order = () => {
  let tabs = [
    {
      id: 'PaymentPending',
      label: 'Payment Pending',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 'ConfirmationPending',
      label: 'Confirmation Pending',
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 'Completed',
      label: 'Completed',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <ClientLayout>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card className="p-2 md:p-4">
              <div>
                <p className="text-center text-xl md:text-2xl mb-4">{item.label}</p>
              </div>
              <div>
                {[...Array(5)].map((_, index) => (
                  <Link href={'/order/' + 213}>
                    <Divider className="my-4" />
                    <div className="space-y-1">
                      <p className="text-primary">{dayjs(new Date()).format('MMM, DD YYYY HH:mm')}</p>
                      <p>Items : 10</p>
                      <p>Total : Rp. 100.000</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </Tab>
        )}
      </Tabs>
    </ClientLayout>
  );
};

export default Order;
