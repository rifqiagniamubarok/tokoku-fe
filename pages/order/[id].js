import ClientLayout from '@/components/templates/ClientLayout';
import axiosInstance from '@/utils/axiosInstance';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const OrderDetail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { id } = router.query;
      const {
        data: { data },
      } = await axiosInstance.get('/transactions/' + id);

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

  const fetchPay = async () => {
    try {
      setIsLoading(true);
      const { id } = router.query;
      const {
        data: { data },
      } = await axiosInstance.post('/transactions/pay/' + id);

      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusType = {
    payment_pending: {
      button: 'pay',
      disable: false,
    },
    confirmation_pending: {
      button: 'Await the admin confirm this transaction',
      disable: true,
    },
    completed: {
      button: 'This transaction is successfuly',
      disable: true,
    },
  };

  const handlePay = () => {
    fetchPay();
  };
  return (
    <ClientLayout className={'space-y-4'}>
      <div>
        <Breadcrumbs variant="solid" color="primary">
          <BreadcrumbItem>
            <Link className="" href={'/order'}>
              Order
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Order detail</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Card className="p-4">
        <Divider className="my-4" />
        <div>
          <p className="font-semibold mb-4">Detail :</p>
          <div>
            {order?.basket?.basket_items?.map(({ product, price_per_item, total_price, qty }, index) => (
              <div key={index} className="my-2">
                <p>{product.name}</p>
                <p className="text-primary font-semibold">Rp. {total_price}</p>
                <p>
                  @{price_per_item} x {qty}
                </p>
                <Divider />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="my-4">
            <p className="text-lg">Items : {order?.basket?.items}</p>
            <p className="text-xl text-primary">Price : Rp. {order?.basket?.total_price}</p>
          </div>
          <Button className="w-full" color="primary" isDisabled={statusType[order.status]?.disable || false} onClick={handlePay}>
            {statusType[order.status]?.button || 'pay'}
          </Button>
        </div>
      </Card>
    </ClientLayout>
  );
};

export default OrderDetail;
